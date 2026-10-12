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
 * Helper: parse a comma-separated parameter list and return individual parameter
 * names + types as general symbols.
 */
function extractParamsAsSymbols(
  paramString: string,
  symbolMap: Map<string, AutocompleteSuggestion>,
) {
  if (!paramString.trim()) return;

  const params = paramString.split(",");
  for (const rawParam of params) {
    const trimmed = rawParam.trim();
    if (!trimmed) continue;

    // Match optional destructuring patterns like { a, b }: Type — skip them
    if (trimmed.startsWith("{") || trimmed.startsWith("[")) continue;

    // Match: (public|private|protected|readonly)? paramName (: type)? (= default)?
    const paramMatch = trimmed.match(
      /(?:(?:public|private|protected|readonly)\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?:\?\s*)?(?::\s*([^,)=;]+))?/,
    );
    if (paramMatch) {
      const paramName = paramMatch[1];
      const paramType = paramMatch[2]?.trim() || "any";

      // Don't overwrite existing symbols with higher priority
      if (!symbolMap.has(paramName)) {
        symbolMap.set(paramName, {
          label: paramName,
          insertText: paramName,
          kind: "variable",
          detail: `(parameter) ${paramName}: ${paramType}`,
          documentation: "Function parameter.",
          boost: 101, // Parameters should rank high inside their function
        });
      }
    }
  }
}

/**
 * Helper: parse property members from an interface/type body string.
 * Handles patterns like:  name: string;  age?: number;  readonly id: string;
 */
function parseInterfaceBody(
  body: string,
  typeName: string,
): AutocompleteSuggestion[] {
  const members: Map<string, AutocompleteSuggestion> = new Map();

  // Match property members: (readonly)? propName(?): type;
  const propRegex =
    /(?:readonly\s+)?([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\??\s*:\s*([^;,\n]+)/g;
  let match: RegExpExecArray | null;
  while ((match = propRegex.exec(body)) !== null) {
    const propName = match[1];
    const propType = match[2].trim();

    if (!members.has(propName)) {
      members.set(propName, {
        label: propName,
        insertText: propName,
        kind: "property",
        detail: `(property) ${typeName}.${propName}: ${propType}`,
        documentation: `Property of ${typeName}.`,
        boost: 100,
      });
    }
  }

  // Match method signatures: methodName(params): returnType;
  const methodRegex =
    /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)\s*:\s*([^;,\n]+)/g;
  while ((match = methodRegex.exec(body)) !== null) {
    const methodName = match[1];
    const params = match[2].trim();
    const returnType = match[3].trim();

    if (!members.has(methodName)) {
      members.set(methodName, {
        label: `${methodName}()`,
        insertText: `${methodName}()`,
        cursorOffset: methodName.length + 1,
        kind: "method",
        detail: `(method) ${typeName}.${methodName}(${params}): ${returnType}`,
        documentation: `Method of ${typeName}.`,
        boost: 99,
      });
    }
  }

  return Array.from(members.values());
}

/**
 * Deeply parses code to extract classes, objects, instances, methods, properties, and types.
 */
function parseCodeScope(code: string) {
  const classModels = new Map<string, ClassModel>();
  const objectModels = new Map<string, AutocompleteSuggestion[]>();
  const instanceMap = new Map<string, string>(); // instanceName -> className
  const generalSymbols = new Map<string, AutocompleteSuggestion>();
  const interfaceModels = new Map<string, AutocompleteSuggestion[]>(); // Bug 2: interface/type member models
  const enumModels = new Map<string, AutocompleteSuggestion[]>(); // Bug 8: enum member models
  const typeAnnotationMap = new Map<string, string>(); // Bug 3: varName -> typeName

  // ─── 1. Extract Classes and their properties/methods ───
  const classHeaderRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s+extends\s+([a-zA-Z_$][a-zA-Z0-9_$]*))?(?:\s+implements\s+[a-zA-Z_$][a-zA-Z0-9_$,\s]*)?\s*\{/g;
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

  // ─── 4. Extract Variables, Functions, Interfaces, Types, Enums ───

  // Bug 3: Enhanced variable regex to capture type annotations
  const varRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?::\s*([a-zA-Z_$][a-zA-Z0-9_$<>,\s\[\]|&]*))?/g;
  let vMatch: RegExpExecArray | null;
  while ((vMatch = varRegex.exec(code)) !== null) {
    const name = vMatch[1];
    const typeAnnotation = vMatch[2]?.trim();

    // Track type annotation for later dot-access resolution
    if (typeAnnotation) {
      // Strip generics for lookup: e.g. "Array<string>" → "Array", "User" → "User"
      const baseType = typeAnnotation.replace(/<.*>$/, "").replace(/\[\]$/, "").trim();
      if (baseType && /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(baseType)) {
        typeAnnotationMap.set(name, baseType);
      }
    }

    if (!generalSymbols.has(name)) {
      generalSymbols.set(name, {
        label: name,
        insertText: name,
        kind: "variable",
        detail: typeAnnotation ? `(variable) ${name}: ${typeAnnotation}` : `(local variable) ${name}`,
        documentation: "Variable declared in current editor.",
        boost: 96,
      });
    }
  }

  // Bug 1: Extract function declarations AND their parameters
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

    // Bug 1: Also extract parameters as symbols
    extractParamsAsSymbols(params, generalSymbols);
  }

  // Bug 4: Extract arrow function / const function expression parameters
  const arrowFnRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s+)?(?:function\s*)?(?:\s*[a-zA-Z_$][a-zA-Z0-9_$]*)?\s*\(([^)]*)\)\s*(?::\s*[^=>{]+)?\s*=>/g;
  let arrowMatch: RegExpExecArray | null;
  while ((arrowMatch = arrowFnRegex.exec(code)) !== null) {
    const fnName = arrowMatch[1];
    const params = arrowMatch[2].trim();

    // Register the arrow function itself if not already registered
    if (!generalSymbols.has(fnName)) {
      generalSymbols.set(fnName, {
        label: `${fnName}()`,
        insertText: `${fnName}()`,
        cursorOffset: fnName.length + 1,
        kind: "function",
        detail: `const ${fnName} = (${params}) => ...`,
        documentation: "Arrow function declared in current editor.",
        boost: 99,
      });
    }

    // Bug 4: Extract arrow function parameters as symbols
    extractParamsAsSymbols(params, generalSymbols);
  }

  // Also catch const fn = function(params) { ... } (non-arrow)
  const constFnRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:async\s+)?function\s*\(([^)]*)\)/g;
  let constFnMatch: RegExpExecArray | null;
  while ((constFnMatch = constFnRegex.exec(code)) !== null) {
    const fnName = constFnMatch[1];
    const params = constFnMatch[2].trim();

    if (!generalSymbols.has(fnName)) {
      generalSymbols.set(fnName, {
        label: `${fnName}()`,
        insertText: `${fnName}()`,
        cursorOffset: fnName.length + 1,
        kind: "function",
        detail: `const ${fnName} = function(${params})`,
        documentation: "Function expression declared in current editor.",
        boost: 99,
      });
    }

    extractParamsAsSymbols(params, generalSymbols);
  }

  // Bug 5: Distinguish interface vs type kind
  const interfaceRegex = /interface\s+([a-zA-Z_$][a-zA-Z0-9_$]*)(?:\s+extends\s+[^{]*)?\s*\{([\s\S]*?)\n\s*\}/g;
  let ifaceMatch: RegExpExecArray | null;
  while ((ifaceMatch = interfaceRegex.exec(code)) !== null) {
    const ifaceName = ifaceMatch[1];
    const ifaceBody = ifaceMatch[2];

    // Bug 2: Parse interface members
    const members = parseInterfaceBody(ifaceBody, ifaceName);
    interfaceModels.set(ifaceName, members);

    // Register interface as a symbol with correct kind
    generalSymbols.set(ifaceName, {
      label: ifaceName,
      insertText: ifaceName,
      kind: "interface",
      detail: `interface ${ifaceName}`,
      documentation: "Interface declared in current editor.",
      boost: 95,
    });
  }

  // Type aliases: type Name = { ... } (object-shaped types get member parsing)
  const typeAliasRegex = /type\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*\{([\s\S]*?)\n\s*\}/g;
  let typeAliasMatch: RegExpExecArray | null;
  while ((typeAliasMatch = typeAliasRegex.exec(code)) !== null) {
    const typeName = typeAliasMatch[1];
    const typeBody = typeAliasMatch[2];

    // Bug 2: Parse type object members
    const members = parseInterfaceBody(typeBody, typeName);
    interfaceModels.set(typeName, members);

    generalSymbols.set(typeName, {
      label: typeName,
      insertText: typeName,
      kind: "type",
      detail: `type ${typeName}`,
      documentation: "Type alias declared in current editor.",
      boost: 95,
    });
  }

  // Catch remaining type aliases that aren't object-shaped (e.g. type ID = string | number)
  const simpleTypeRegex = /type\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=/g;
  let simpleTypeMatch: RegExpExecArray | null;
  while ((simpleTypeMatch = simpleTypeRegex.exec(code)) !== null) {
    const typeName = simpleTypeMatch[1];
    if (!generalSymbols.has(typeName)) {
      generalSymbols.set(typeName, {
        label: typeName,
        insertText: typeName,
        kind: "type",
        detail: `type ${typeName}`,
        documentation: "Type alias declared in current editor.",
        boost: 95,
      });
    }
  }

  // Bug 8: Extract enum declarations and their members
  const enumRegex = /enum\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\{([^}]*)\}/g;
  let enumMatch: RegExpExecArray | null;
  while ((enumMatch = enumRegex.exec(code)) !== null) {
    const enumName = enumMatch[1];
    const enumBody = enumMatch[2];
    const enumMembers: AutocompleteSuggestion[] = [];

    // Parse enum members: Name, Name = value, Name = "string"
    const memberRegex = /([a-zA-Z_$][a-zA-Z0-9_$]*)\s*(?:=\s*[^,\n}]+)?/g;
    let memberMatch: RegExpExecArray | null;
    while ((memberMatch = memberRegex.exec(enumBody)) !== null) {
      const memberName = memberMatch[1];
      enumMembers.push({
        label: memberName,
        insertText: memberName,
        kind: "constant",
        detail: `(enum member) ${enumName}.${memberName}`,
        documentation: `Member of enum ${enumName}.`,
        boost: 100,
      });
    }

    enumModels.set(enumName, enumMembers);

    // Register the enum as a type symbol
    generalSymbols.set(enumName, {
      label: enumName,
      insertText: enumName,
      kind: "type",
      detail: `enum ${enumName}`,
      documentation: "Enum declared in current editor.",
      boost: 96,
    });
  }

  return {
    classModels,
    objectModels,
    instanceMap,
    interfaceModels,
    enumModels,
    typeAnnotationMap,
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

/**
 * Bug 7: Checks whether the colon at the cursor position is a type annotation colon
 * (not a ternary operator, object literal value, case label, etc.)
 */
function isTypeAnnotationColon(textBefore: string): boolean {
  // Strip the trailing `: identifier?` to get the context before the colon
  const beforeColon = textBefore.replace(/:\s*[a-zA-Z_$][a-zA-Z0-9_$]*$/, "").replace(/:\s*$/, "").trimEnd();

  // Type annotation contexts:
  // 1. After parameter name:     function foo(name: ...   or   (name: ...
  // 2. After variable name:      const x: ...   let y: ...   var z: ...
  // 3. After property name in interface/type:   name: ...  (inside { })
  // 4. After function return:    function foo(): ...  or  (): ...
  // 5. After class field:        class { name: ... }

  // Check: variable declaration →  const/let/var identifier:
  if (/(?:const|let|var)\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s*$/.test(beforeColon)) return true;

  // Check: function parameter → inside parentheses, after identifier
  // Look for an unclosed paren with an identifier at the end
  if (/\(\s*(?:(?:public|private|protected|readonly)\s+)?[a-zA-Z_$][a-zA-Z0-9_$]*\s*$/.test(beforeColon)) return true;
  if (/,\s*(?:(?:public|private|protected|readonly)\s+)?[a-zA-Z_$][a-zA-Z0-9_$]*\s*$/.test(beforeColon)) return true;

  // Check: function return type → after closing paren
  if (/\)\s*$/.test(beforeColon)) return true;

  // Check: class field / interface property → identifier at start of line or after access modifier
  if (/^\s*(?:(?:public|private|protected|readonly|static)\s+)*[a-zA-Z_$][a-zA-Z0-9_$]*\??\s*$/m.test(beforeColon.split("\n").pop() || "")) return true;

  // Reject: ternary operator → look for a ? before the : without matching it as optional param
  // Reject: object literal key → { key:
  // Reject: case/default labels

  return false;
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
  const prevValueRef = useRef(value); // Bug 6: Track previous value to detect new typing

  // Bug 6: Reset isManuallyClosedRef when the user types new content
  useEffect(() => {
    if (value !== prevValueRef.current) {
      isManuallyClosedRef.current = false;
      prevValueRef.current = value;
    }
  }, [value]);

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
    const { classModels, objectModels, instanceMap, interfaceModels, enumModels, typeAnnotationMap, generalSymbols } = parseCodeScope(value);

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
      } else if (enumModels.has(receiver)) {
        // Bug 8: Enum dot-access: e.g. Status.Active
        candidateMembers = enumModels.get(receiver) || [];
      } else if (typeAnnotationMap.has(receiver)) {
        // Bug 3: Type-annotated variable: e.g. const user: User -> user.
        const typeName = typeAnnotationMap.get(receiver)!;

        // First check interface/type models
        if (interfaceModels.has(typeName)) {
          candidateMembers = interfaceModels.get(typeName) || [];
        }
        // Then check class models
        else if (classModels.has(typeName)) {
          const cls = classModels.get(typeName)!;
          candidateMembers = cls.members;
        }
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

    // ─── Trigger Context: class inheritance after 'extends' (e.g. class Dog extends ) ───
    const extendsMatch = textBefore.match(/\bextends\s+([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);

    if (extendsMatch) {
      const extendsPrefix = extendsMatch[1] || "";
      const tokenStart = cursorPos - extendsPrefix.length;
      const tokenEnd = cursorPos;

      const classCandidates = new Map<string, AutocompleteSuggestion>();

      // 1. In-file declared classes
      classModels.forEach((cls) => {
        classCandidates.set(cls.name, {
          label: cls.name,
          insertText: cls.name,
          kind: "class",
          detail: `class ${cls.name}`,
          documentation: `Class defined in current file.`,
          boost: 98,
        });
      });

      // 2. Built-in classes/types from static suggestions
      const staticList = getSuggestionsForLanguage(language);
      staticList.forEach((s) => {
        if (s.kind === "class" || ["Error", "Array", "Map", "Set", "Promise", "Object", "Date", "RegExp"].includes(s.label)) {
          classCandidates.set(s.label, s);
        }
      });

      // Also custom symbols that are classes
      generalSymbols.forEach((s) => {
        if (s.kind === "class") {
          classCandidates.set(s.label, s);
        }
      });

      // Avoid self-inheritance suggestion
      const currentClassMatch = textBefore.match(/class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s+extends/);
      if (currentClassMatch) {
        classCandidates.delete(currentClassMatch[1]);
      }

      const scored: { item: AutocompleteSuggestion; score: number }[] = [];
      classCandidates.forEach((item) => {
        const score = calculateScore(item, extendsPrefix);
        if (score > 0) scored.push({ item, score });
      });

      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 8).map((s) => s.item);

      if (top.length > 0) {
        const coords = getCaretCoordinates(textarea, cursorPos);
        setSuggestions(top);
        setSelectedIndex(0);
        setTokenRange({ start: tokenStart, end: tokenEnd, prefix: extendsPrefix });
        setCaretCoords(coords);
        setIsOpen(true);
        return;
      }
    }

    // ─── Bug 9: Trigger Context: class implementation after 'implements' ───
    const implementsMatch = textBefore.match(/\bimplements\s+(?:[a-zA-Z_$][a-zA-Z0-9_$]*\s*,\s*)*([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);

    if (implementsMatch) {
      const implPrefix = implementsMatch[1] || "";
      const tokenStart = cursorPos - implPrefix.length;
      const tokenEnd = cursorPos;

      const interfaceCandidates = new Map<string, AutocompleteSuggestion>();

      // 1. In-file declared interfaces
      interfaceModels.forEach((_members, ifaceName) => {
        interfaceCandidates.set(ifaceName, {
          label: ifaceName,
          insertText: ifaceName,
          kind: "interface",
          detail: `interface ${ifaceName}`,
          documentation: `Interface defined in current file.`,
          boost: 98,
        });
      });

      // 2. In-file declared types (type aliases can also be implemented)
      generalSymbols.forEach((s) => {
        if (s.kind === "interface" || s.kind === "type") {
          if (!interfaceCandidates.has(s.label)) {
            interfaceCandidates.set(s.label, s);
          }
        }
      });

      // Avoid self-implementation
      const currentClassImplMatch = textBefore.match(/class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s+(?:extends\s+[a-zA-Z_$][a-zA-Z0-9_$]*\s+)?implements/);
      if (currentClassImplMatch) {
        interfaceCandidates.delete(currentClassImplMatch[1]);
      }

      const scored: { item: AutocompleteSuggestion; score: number }[] = [];
      interfaceCandidates.forEach((item) => {
        const score = calculateScore(item, implPrefix);
        if (score > 0) scored.push({ item, score });
      });

      scored.sort((a, b) => b.score - a.score);
      const top = scored.slice(0, 8).map((s) => s.item);

      if (top.length > 0) {
        const coords = getCaretCoordinates(textarea, cursorPos);
        setSuggestions(top);
        setSelectedIndex(0);
        setTokenRange({ start: tokenStart, end: tokenEnd, prefix: implPrefix });
        setCaretCoords(coords);
        setIsOpen(true);
        return;
      }
    }

    // ─── Trigger Context 2: Type Annotation after ':' (e.g. name: string, price: Number) ───
    const typeMatch = textBefore.match(/:\s*([a-zA-Z_$][a-zA-Z0-9_$]*)?$/);

    // Bug 7: Only trigger if the colon is actually a type annotation colon
    if (typeMatch && isTypeAnnotationColon(textBefore)) {
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

      const domValue = textarea.value;
      const before = domValue.substring(0, start);
      const after = domValue.substring(end);
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

        case "ArrowLeft":
        case "ArrowRight": {
          // Close suggestions and allow natural cursor navigation horizontally
          setIsOpen(false);
          return false;
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
