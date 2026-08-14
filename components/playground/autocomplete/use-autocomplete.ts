// ═══════════════════════════════════════════════════════════
// Learning Craft — Playground Autocomplete Custom Hook
// ═══════════════════════════════════════════════════════════

import { useState, useCallback, useRef, useEffect, type RefObject } from "react";
import type { AutocompleteSuggestion, CaretCoordinates } from "./types";
import { getSuggestionsForLanguage } from "./suggestion-data";
import { getCaretCoordinates } from "./caret-position";

interface UseAutocompleteOptions {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (value: string) => void;
  language: string;
  readOnly?: boolean;
}

/**
 * Extracts identifiers declared within the current code text.
 */
function extractDynamicSymbols(code: string): AutocompleteSuggestion[] {
  const symbols = new Map<string, AutocompleteSuggestion>();

  // Extract variables: const / let / var [name]
  const varRegex = /(?:const|let|var)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  let match: RegExpExecArray | null;
  while ((match = varRegex.exec(code)) !== null) {
    const name = match[1];
    if (!symbols.has(name)) {
      symbols.set(name, {
        label: name,
        insertText: name,
        kind: "variable",
        detail: `(local variable) ${name}`,
        documentation: "Variable declared in current editor.",
        boost: 98,
      });
    }
  }

  // Extract functions: function [name](...)
  const fnRegex = /function\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(([^)]*)\)/g;
  while ((match = fnRegex.exec(code)) !== null) {
    const name = match[1];
    const params = match[2].trim();
    if (!symbols.has(name)) {
      symbols.set(name, {
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

  // Extract arrow function constants: const [name] = (...) =>
  const arrowFnRegex = /(?:const|let)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)\s*=\s*(?:\([^)]*\)|[a-zA-Z_$][a-zA-Z0-9_$]*)\s*=>/g;
  while ((match = arrowFnRegex.exec(code)) !== null) {
    const name = match[1];
    if (!symbols.has(name)) {
      symbols.set(name, {
        label: `${name}()`,
        insertText: `${name}()`,
        cursorOffset: name.length + 1,
        kind: "function",
        detail: `const ${name}: (...) => any`,
        documentation: "Arrow function declared in current editor.",
        boost: 99,
      });
    }
  }

  // Extract classes: class [name]
  const classRegex = /class\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  while ((match = classRegex.exec(code)) !== null) {
    const name = match[1];
    if (!symbols.has(name)) {
      symbols.set(name, {
        label: name,
        insertText: name,
        kind: "class",
        detail: `class ${name}`,
        documentation: "Class declared in current editor.",
        boost: 97,
      });
    }
  }

  // Extract types/interfaces: interface/type [name]
  const typeRegex = /(?:interface|type)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g;
  while ((match = typeRegex.exec(code)) !== null) {
    const name = match[1];
    if (!symbols.has(name)) {
      symbols.set(name, {
        label: name,
        insertText: name,
        kind: "type",
        detail: `type/interface ${name}`,
        documentation: "Type declared in current editor.",
        boost: 95,
      });
    }
  }

  return Array.from(symbols.values());
}

/**
 * Calculates a match score between a suggestion and the user query.
 */
function calculateScore(suggestion: AutocompleteSuggestion, query: string): number {
  const label = suggestion.label.toLowerCase();
  const insert = (suggestion.insertText || "").toLowerCase();
  const q = query.toLowerCase();
  const boost = suggestion.boost || 50;

  // Clean label without parens for matching
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

  // 4. Dot-accessor / member match (e.g. "log" matches "console.log()")
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
  const [tokenRange, setTokenRange] = useState<{ start: number; end: number; prefix: string }>({
    start: 0,
    end: 0,
    prefix: "",
  });

  // Track if user explicitly closed the popover (e.g. pressed Escape)
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

    // Find the current identifier/word token immediately before cursor
    // Match letters, digits, underscores, dollar signs, and dots (e.g. "console.l", "arr.map", "con")
    const match = textBefore.match(/([a-zA-Z_$][a-zA-Z0-9_$.]*)$/);

    if (!match) {
      setIsOpen(false);
      return;
    }

    const fullMatchedWord = match[1];
    const tokenStart = cursorPos - fullMatchedWord.length;
    const tokenEnd = cursorPos;

    // Determine query prefix (handling dot access, e.g. "console.lo" -> "lo" or "console.lo")
    const query = fullMatchedWord;

    // Minimum 1 character typed
    if (query.length < 1) {
      setIsOpen(false);
      return;
    }

    // Static suggestions for language + dynamic in-file symbols
    const staticSuggestions = getSuggestionsForLanguage(language);
    const dynamicSymbols = extractDynamicSymbols(value);

    // Merge and deduplicate by label
    const combinedMap = new Map<string, AutocompleteSuggestion>();
    dynamicSymbols.forEach((s) => combinedMap.set(s.label, s));
    staticSuggestions.forEach((s) => {
      if (!combinedMap.has(s.label)) {
        combinedMap.set(s.label, s);
      }
    });

    // Score and filter
    const scoredList: { item: AutocompleteSuggestion; score: number }[] = [];

    // If query contains a dot (e.g. "console.l"), test both full token and member after dot
    const dotIndex = query.lastIndexOf(".");
    const afterDotQuery = dotIndex !== -1 ? query.substring(dotIndex + 1) : null;

    combinedMap.forEach((item) => {
      let score = calculateScore(item, query);

      // If user typed dot member, test against after-dot query as well
      if (afterDotQuery && score === 0) {
        const memberScore = calculateScore(item, afterDotQuery);
        if (memberScore > 0) {
          score = memberScore - 50; // slightly lower score than direct match
        }
      }

      if (score > 0) {
        scoredList.push({ item, score });
      }
    });

    scoredList.sort((a, b) => b.score - a.score);

    // Top 8 suggestions
    const topSuggestions = scoredList.slice(0, 8).map((entry) => entry.item);

    if (topSuggestions.length === 0) {
      setIsOpen(false);
      return;
    }

    // Calculate caret coordinates
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

      const { start, end, prefix } = tokenRange;
      let textToInsert = suggestion.insertText ?? suggestion.label;

      // If query has a dot (e.g. "console.l") and suggestion is just "log()",
      // handle insertion after the dot.
      let replacementStart = start;
      const dotIndex = prefix.lastIndexOf(".");
      if (dotIndex !== -1 && !suggestion.label.includes(".")) {
        replacementStart = start + dotIndex + 1;
      }

      const before = value.substring(0, replacementStart);
      const after = value.substring(end);
      const newValue = before + textToInsert + after;

      onChange(newValue);
      setIsOpen(false);
      isManuallyClosedRef.current = false;

      // Calculate target cursor position
      let targetCursorPos: number;
      if (typeof suggestion.cursorOffset === "number") {
        targetCursorPos = replacementStart + suggestion.cursorOffset;
      } else {
        targetCursorPos = replacementStart + textToInsert.length;
      }

      // Restore cursor position and focus
      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = targetCursorPos;
        }
      });
    },
    [value, onChange, tokenRange, textareaRef]
  );

  /**
   * Closes the suggestions popup.
   */
  const closeSuggestions = useCallback(() => {
    setIsOpen(false);
    isManuallyClosedRef.current = true;
  }, []);

  /**
   * Intercepts key events for autocomplete navigation and selection.
   * Returns true if the key event was consumed by the autocomplete system.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>): boolean => {
      if (!isOpen || suggestions.length === 0) {
        if (e.key !== "Escape") {
          isManuallyClosedRef.current = false;
        }
        return false;
      }

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % suggestions.length);
        return true;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
        return true;
      }

      if (e.key === "Tab" || e.key === "Enter") {
        e.preventDefault();
        const selected = suggestions[selectedIndex];
        if (selected) {
          applySuggestion(selected);
          return true;
        }
      }

      if (e.key === "Escape") {
        e.preventDefault();
        closeSuggestions();
        return true;
      }

      // Reset manual close flag on normal character typing
      isManuallyClosedRef.current = false;
      return false;
    },
    [isOpen, suggestions, selectedIndex, applySuggestion, closeSuggestions]
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
