// ═══════════════════════════════════════════════════════════
// Learning Craft — Playground Autocomplete Custom Hook
// ═══════════════════════════════════════════════════════════

import { useState, useCallback, useRef, useEffect, type RefObject } from "react";
import type { AutocompleteSuggestion, CaretCoordinates } from "./types";
import { getSuggestionsForLanguage, TS_TYPE_SUGGESTIONS } from "./suggestion-data";
import { getCaretCoordinates } from "./caret-position";

interface UseAutocompleteOptions {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

interface ClassModel {
  name: string;
  members: AutocompleteSuggestion[];
  startPos: number;
  endPos: number;
}

/**
 * Deeply parses code to extract classes, objects, instances, methods, properties, and types.
 */
function parseCodeScope(code: string) {
  const classModels = new Map<string, ClassModel>();
  const objectModels = new Map<string, AutocompleteSuggestion[]>();
  const instanceMap = new Map<string, string>(); // instanceName -> className
  const generalSymbols = new Map<string, AutocompleteSuggestion>();

  // ─── 1. Extract Classes and their properties/methods ───
  const classHeaderRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s+extends\s+([a-zA-Z_$][a-zA-Z0-9_$]*))?\s*\{/g;
  let classMatch: RegExpExecArray | null;

  while ((classMatch = classHeaderRegex.exec(code)) !== null) {
    const className = classMatch[1];
    const startIndex = classMatch.index;

    // Extract class body using balanced brace search
    let braceCount = 1;
    let bodyEnd = -1;
    for (let i = classMatch.index + classMatch[0].length; i < code.length; i++) {
      if (code[i] === "{") braceCount++;
      else if (code[i] === "}") {
        braceCount--;
        if (braceCount === 0) {
          bodyEnd = i;
          break;
        }
      }
    }

    const classBody = bodyEnd !== -1
      ? code.substring(classMatch.index + classMatch[0].length, bodyEnd)
      : code.substring(classMatch.index + classMatch[0].length);

    const members = new Map<string, AutocompleteSuggestion>();

    // A. Constructor Parameter Properties: constructor(public name: string, public price: number)
    const ctorMatch = classBody.match(/constructor\s*\(([^)]*)\)/);
    if (ctorMatch && ctorMatch[1]) {
      const params = ctorMatch[1].split(",");
      for (const rawParam of params) {
        const trimmed = rawParam.trim();
        // Match access modifier or standard param: (public|private|protected|readonly)? name: type
        const paramMatch = trimmed.match(/(?:(?:public|private|protected|readonly)\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*([^,)=;]+))?/);
        if (paramMatch) {
          const propName = paramMatch[1];
          const propType = paramMatch[2]?.trim() || "any";
          if (!members.has(propName)) {
            members.set(propName, {
              label: propName,
              insertText: propName,
              kind: "property",
              detail: `(property) ${className}.${propName}: ${propType}`,
              documentation: `Property of ${className} class.`,
              boost: 100,
            });
          }
        }
      }
    }

    // B. Class Field Properties: name: string; or age = 25;
    const fieldRegex = /(?:public|private|protected|readonly|static)?\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*([^=;\n]+))?\s*(?:=[^;\n]+)?;(?:\s*\/\/[^\n]*)?/g;
    let fieldMatch: RegExpExecArray | null;
    while ((fieldMatch = fieldRegex.exec(classBody)) !== null) {
      const fieldName = fieldMatch[1];
      const fieldType = fieldMatch[2]?.trim() || "any";
      // Ignore reserved keywords
      if (!["constructor", "async", "public", "private", "protected", "readonly", "static", "return", "if", "for", "while", "class"].includes(fieldName)) {
        if (!members.has(fieldName)) {
          members.set(fieldName, {
            label: fieldName,
            insertText: fieldName,
            kind: "property",
            detail: `(property) ${className}.${fieldName}: ${fieldType}`,
            documentation: `Field property of ${className}.`,
            boost: 100,
          });
        }
      }
    }

    // C. this.propName assignments inside methods/constructor
    const thisPropRegex = /this\.([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
    let thisMatch: RegExpExecArray | null;
    while ((thisMatch = thisPropRegex.exec(classBody)) !== null) {
      const propName = thisMatch[1];
      if (!members.has(propName)) {
        members.set(propName, {
          label: propName,
          insertText: propName,
          kind: "property",
          detail: `(property) ${className}.${propName}: any`,
          documentation: `Property assigned on ${className}.`,
          boost: 100,
        });
      }
    }

    // D. Class Methods: greet() { ... } or async calculateTotal(tax: number): number { ... }
    const methodRegex = /(?:async\s+)?(?:public|private|protected|readonly|static)?\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*(?::\s*([^{]+))?\s*\{/g;
    let methodMatch: RegExpExecArray | null;
    while ((methodMatch = methodRegex.exec(classBody)) !== null) {
      const methodName = methodMatch[1];
      const params = methodMatch[2].trim();
      const returnType = methodMatch[3]?.trim() || "void";

      if (!["constructor", "if", "for", "while", "switch", "catch"].includes(methodName)) {
        if (!members.has(methodName)) {
          members.set(methodName, {
            label: `${methodName}()`,
            insertText: `${methodName}()`,
            cursorOffset: methodName.length + 1,
            kind: "method",
            detail: `(method) ${className}.${methodName}(${params}): ${returnType}`,
            documentation: `Method of ${className} class.`,
            boost: 99,
          });
        }
      }
    }

    classModels.set(className, {
      name: className,
      members: Array.from(members.values()),
      startPos: startIndex,
      endPos: bodyEnd !== -1 ? bodyEnd : code.length,
    });

    // Also register the class itself as a global symbol
    generalSymbols.set(className, {
      label: className,
      insertText: className,
      kind: "class",
      detail: `class ${className}`,
      documentation: `Class declared in current file.`,
      boost: 97,
    });
  }

  // ─── 2. Extract Object Literals & their properties ───
  const objRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\{([\s\S]*?)\n\s*\};?/g;
  let objMatch: RegExpExecArray | null;
  while ((objMatch = objRegex.exec(code)) !== null) {
    const objName = objMatch[1];
    const objBody = objMatch[2];
    const objMembers = new Map<string, AutocompleteSuggestion>();

    // Property keys: key: value
    const propKeyRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:\s*([^,\n]+)/g;
    let propMatch: RegExpExecArray | null;
    while ((propMatch = propKeyRegex.exec(objBody)) !== null) {
      const propName = propMatch[1];
      const propVal = propMatch[2].trim();
      if (!objMembers.has(propName)) {
        objMembers.set(propName, {
          label: propName,
          insertText: propName,
          kind: "property",
          detail: `(property) ${objName}.${propName}: ${propVal}`,
          documentation: `Property of object ${objName}.`,
          boost: 100,
        });
      }
    }

    // Object methods: fnName() { ... }
    const objMethodRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*\{/g;
    let objMethodMatch: RegExpExecArray | null;
    while ((objMethodMatch = objMethodRegex.exec(objBody)) !== null) {
      const methodName = objMethodMatch[1];
      const params = objMethodMatch[2].trim();
      if (!objMembers.has(methodName)) {
        objMembers.set(methodName, {
          label: `${methodName}()`,
          insertText: `${methodName}()`,
          cursorOffset: methodName.length + 1,
          kind: "method",
          detail: `(method) ${objName}.${methodName}(${params})`,
          documentation: `Method on object ${objName}.`,
          boost: 99,
        });
      }
    }

    objectModels.set(objName, Array.from(objMembers.values()));

    generalSymbols.set(objName, {
      label: objName,
      insertText: objName,
      kind: "variable",
      detail: `const ${objName}: object`,
      documentation: `Object declared in current file.`,
      boost: 98,
    });
  }

  // ─── 3. Extract Instances (const product1 = new product(...)) ───
  const instanceRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*([a-zA-Z_$][a-zA-Z0-9_$]*))?\s*=\s*new\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let instMatch: RegExpExecArray | null;
  while ((instMatch = instanceRegex.exec(code)) !== null) {
    const instName = instMatch[1];
    const className = instMatch[3] || instMatch[2];
    instanceMap.set(instName, className);

    generalSymbols.set(instName, {
      label: instName,
      insertText: instName,
      kind: "variable",
      detail: `(instance) ${instName}: ${className}`,
      documentation: `Instance of ${className} class.`,
      boost: 98,
    });
  }

  // ─── 4. Extract Variables, Functions, Interfaces, Types ───
  const varRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let vMatch: RegExpExecArray | null;
  while ((vMatch = varRegex.exec(code)) !== null) {
    const name = vMatch[1];
    if (!generalSymbols.has(name)) {
      generalSymbols.set(name, {
        label: name,
        insertText: name,
        kind: "variable",
        detail: `(local variable) ${name}`,
        documentation: "Variable declared in current editor.",
        boost: 96,
      });
    }
  }

  const fnRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)/g;
  let fMatch: RegExpExecArray | null;
  while ((fMatch = fnRegex.exec(code)) !== null) {
    const name = fMatch[1];
    const params = fMatch[2].trim();
    if (!generalSymbols.has(name)) {
      generalSymbols.set(name, {
        label: `${name}()`,
        insertText: `${name}()`,
        cursorOffset: name.length + 1,
        kind: "function",
        detail: `function ${name}(${params})`,
        documentation: "Function declared in current editor.",
        boost: 99,
      });
    }
  }

  const typeRegex = /(?:interface|type)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let tMatch: RegExpExecArray | null;
  while ((tMatch = typeRegex.exec(code)) !== null) {
    const name = tMatch[1];
    if (!generalSymbols.has(name)) {
      generalSymbols.set(name, {
        label: name,
        insertText: name,
        kind: "type",
        detail: `type/interface ${name}`,
        documentation: "Type declared in current editor.",
        boost: 95,
      });
    }
  }

  return {
    classModels,
    objectModels,
    instanceMap,
    generalSymbols: Array.from(generalSymbols.values()),
  };
}

/**
 * Calculates a match score between a suggestion and the user query.
 */
function calculateScore(suggestion: AutocompleteSuggestion, query: string): number {
  const label = suggestion.label.toLowerCase();
  const insert = (suggestion.insertText || "").toLowerCase();
  const q = query.toLowerCase();
  const boost = suggestion.boost || 50;

  // Empty query (e.g. immediately after typing ".") matches everything with its boost score
  if (!q) {
    return 500 + boost;
  }

  const cleanLabel = label.replace(/\(\)$/, "");

  // 1. Exact match
  if (label === q || cleanLabel === q) {
    return 1000 + boost;
  }

  // 2. Starts with query (prefix match)
  if (label.startsWith(q) || cleanLabel.startsWith(q)) {
    return 800 + boost - (label.length - q.length);
  }

  // 3. InsertText starts with query
  if (insert.startsWith(q)) {
    return 750 + boost;
  }

  // 4. Substring / member match
  if (label.includes("." + q) || label.includes(q)) {
    return 500 + boost - label.indexOf(q);
  }

  return 0;
}

export function useAutocomplete({
  textareaRef,
  value,
  onChange,
  language,
  readOnly = false,
}: UseAutocompleteOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<AutocompleteSuggestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [caretCoords, setCaretCoords] = useState<CaretCoordinates>({
    top: 0,
    left: 0,
    lineHeight: 26,
    visible: false,
  });
  const [tokenRange, setTokenRange] = useState<{ start: number; end: number; prefix: string; receiver?: string }>({
    start: 0,
    end: 0,
    prefix: "",
  });

  const isManuallyClosedRef = useRef(false);

  /**
   * Evaluates current caret position in textarea and triggers suggestions.
   */
  const updateAutocompleteState = useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea || readOnly || isManuallyClosedRef.current) {
      setIsOpen(false);
      return;
    }

    const cursorPos = textarea.selectionStart;
    const textBefore = value.substring(0, cursorPos);

    // Parse code models & scope
    const { classModels, objectModels, instanceMap, generalSymbols } = parseCodeScope(value);

    // ─── Trigger Context 1: Member Access via Dot (e.g. this. or product1. or user. or console.) ───
    const dotMemberMatch = textBefore.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)\.([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);

    if (dotMemberMatch) {
      const receiver = dotMemberMatch[1];
      const memberPrefix = dotMemberMatch[2] || "";
      const tokenStart = cursorPos - memberPrefix.length;
      const tokenEnd = cursorPos;

      let candidateMembers: AutocompleteSuggestion[] = [];

      if (receiver === "this") {
        // Find which class the cursor is currently inside
        let enclosingClass: ClassModel | undefined;
        for (const cls of classModels.values()) {
          if (cursorPos >= cls.startPos && cursorPos <= cls.endPos) {
            enclosingClass = cls;
            break;
          }
        }
        // If cursor inside class, use that class's members; otherwise combine all class members
        if (enclosingClass) {
          candidateMembers = enclosingClass.members;
        } else {
          classModels.forEach((cls) => candidateMembers.push(...cls.members));
        }
      } else if (instanceMap.has(receiver)) {
        // Instance of a class: e.g. const product1 = new product(...) -> product1.
        const className = instanceMap.get(receiver)!;
        const cls = classModels.get(className);
        if (cls) {
          candidateMembers = cls.members;
        }
      } else if (objectModels.has(receiver)) {
        // Object literal: e.g. const user = { name: "Alice" } -> user.
        candidateMembers = objectModels.get(receiver) || [];
      } else {
        // Built-ins: console., Math., JSON., Array., Object., Promise., String., Number.
        const staticList = getSuggestionsForLanguage(language);
        candidateMembers = staticList.filter((item) => item.label.startsWith(`${receiver}.`)).map((item) => ({
          ...item,
          label: item.label.replace(`${receiver}.`, ""),
          insertText: (item.insertText || item.label).replace(`${receiver}.`, ""),
        }));

        // If still empty (e.g. unknown object), provide universal array/string/object members
        if (candidateMembers.length === 0) {
          candidateMembers = staticList.filter((item) => item.kind === "method" || item.kind === "property");
        }
      }

      // Deduplicate
      const memberMap = new Map<string, AutocompleteSuggestion>();
      candidateMembers.forEach((m) => memberMap.set(m.label, m));

      // Score against memberPrefix
      const scored: { item: AutocompleteSuggestion; score: number }[] = [];
      memberMap.forEach((item) => {
        const score = calculateScore(item, memberPrefix);
        if (score > 0) scored.push({ item, score });
      });

      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 8).map((s) => s.item);

      if (top.length > 0) {
        const coords = getCaretCoordinates(textarea, cursorPos);
        setSuggestions(top);
        setSelectedIndex(0);
        setTokenRange({ start: tokenStart, end: tokenEnd, prefix: memberPrefix, receiver });
        setCaretCoords(coords);
        setIsOpen(true);
        return;
      }
    }

    // ─── Trigger Context 2: Type Annotation after ':' (e.g. name: string, price: Number) ───
    const typeMatch = textBefore.match(/:\s*([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);

    if (typeMatch) {
      const typePrefix = typeMatch[1] || "";
      const tokenStart = cursorPos - typePrefix.length;
      const tokenEnd = cursorPos;

      const typeCandidates = new Map<string, AutocompleteSuggestion>();

      // 1. Primitive and built-in types
      TS_TYPE_SUGGESTIONS.forEach((t) => typeCandidates.set(t.label, t));

      // 2. In-file declared classes and types
      classModels.forEach((cls) => {
        typeCandidates.set(cls.name, {
          label: cls.name,
          insertText: cls.name,
          kind: "class",
          detail: `class ${cls.name}`,
          documentation: `Class type defined in current file.`,
          boost: 98,
        });
      });

      generalSymbols.filter((s) => s.kind === "type" || s.kind === "class" || s.kind === "interface").forEach((s) => {
        if (!typeCandidates.has(s.label)) typeCandidates.set(s.label, s);
      });

      const scored: { item: AutocompleteSuggestion; score: number }[] = [];
      typeCandidates.forEach((item) => {
        const score = calculateScore(item, typePrefix);
        if (score > 0) scored.push({ item, score });
      });

      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 8).map((s) => s.item);

      if (top.length > 0) {
        const coords = getCaretCoordinates(textarea, cursorPos);
        setSuggestions(top);
        setSelectedIndex(0);
        setTokenRange({ start: tokenStart, end: tokenEnd, prefix: typePrefix });
        setCaretCoords(coords);
        setIsOpen(true);
        return;
      }
    }

    // ─── Trigger Context 3: General Word Token Completion (e.g. con, for, pro, let) ───
    const wordMatch = textBefore.match(/([a-zA-Z_$][a-zA-Z0-9_$]*)$/);

    if (!wordMatch) {
      setIsOpen(false);
      return;
    }

    const query = wordMatch[1];
    const tokenStart = cursorPos - query.length;
    const tokenEnd = cursorPos;

    if (query.length < 1) {
      setIsOpen(false);
      return;
    }

    const staticSuggestions = getSuggestionsForLanguage(language);
    const combinedMap = new Map<string, AutocompleteSuggestion>();

    // Dynamic symbols in current file take top precedence
    generalSymbols.forEach((s) => combinedMap.set(s.label, s));
    staticSuggestions.forEach((s) => {
      if (!combinedMap.has(s.label)) {
        combinedMap.set(s.label, s);
      }
    });

    const scoredList: { item: AutocompleteSuggestion; score: number }[] = [];
    combinedMap.forEach((item) => {
      const score = calculateScore(item, query);
      if (score > 0) {
        scoredList.push({ item, score });
      }
    });

    scoredList.sort((a, b) => b.score - a.score);
    const topSuggestions = scoredList.slice(0, 8).map((entry) => entry.item);

    if (topSuggestions.length === 0) {
      setIsOpen(false);
      return;
    }

    const coords = getCaretCoordinates(textarea, cursorPos);
    setSuggestions(topSuggestions);
    setSelectedIndex(0);
    setTokenRange({ start: tokenStart, end: tokenEnd, prefix: query });
    setCaretCoords(coords);
    setIsOpen(true);
  }, [value, language, readOnly, textareaRef]);

  /**
   * Applies the selected autocomplete suggestion.
   */
  const applySuggestion = useCallback(
    (suggestion: AutocompleteSuggestion) => {
      const textarea = textareaRef.current;
      if (!textarea) return;

      const { start, end } = tokenRange;
      const textToInsert = suggestion.insertText ?? suggestion.label;

      const before = value.substring(0, start);
      const after = value.substring(end);
      const newValue = before + textToInsert + after;

      onChange(newValue);
      setIsOpen(false);
      isManuallyClosedRef.current = false;

      // Calculate target cursor position
      let targetCursorPos: number;
      if (typeof suggestion.cursorOffset === "number") {
        targetCursorPos = start + suggestion.cursorOffset;
      } else {
        targetCursorPos = start + textToInsert.length;
      }

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = targetCursorPos;
          textareaRef.current.selectionEnd = targetCursorPos;
        }
      });
    },
    [tokenRange, value, onChange, textareaRef]
  );

  /**
   * Closes the suggestions popup.
   */
  const closeSuggestions = useCallback(() => {
    setIsOpen(false);
  }, []);

  /**
   * Intercepts key events for autocomplete navigation and selection.
   * Returns true if the key event was consumed by the autocomplete system.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
      if (!isOpen || suggestions.length === 0) return false;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev + 1) % suggestions.length);
          return true;
        }

        case "ArrowUp": {
          e.preventDefault();
          setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
          return true;
        }

        case "Tab":
        case "Enter": {
          e.preventDefault();
          const selected = suggestions[selectedIndex];
          if (selected) {
            applySuggestion(selected);
          }
          return true;
        }

        case "Escape": {
          e.preventDefault();
          setIsOpen(false);
          isManuallyClosedRef.current = true;
          return true;
        }

        default:
          return false;
      }
    },
    [isOpen, suggestions, selectedIndex, applySuggestion]
  );

  // Trigger autocomplete calculation whenever value or cursor changes
  useEffect(() => {
    const timer = setTimeout(() => {
      updateAutocompleteState();
    }, 10);
    return () => clearTimeout(timer);
  }, [value, updateAutocompleteState]);

  return {
    isOpen,
    suggestions,
    selectedIndex,
    setSelectedIndex,
    caretCoords,
    tokenRange,
    applySuggestion,
    closeSuggestions,
    handleKeyDown,
    updateAutocompleteState,
  };
}
