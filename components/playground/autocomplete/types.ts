// ═══════════════════════════════════════════════════════════
// Learning Craft — Playground Autocomplete Type Definitions
// ═══════════════════════════════════════════════════════════

export type SuggestionKind =
  | "keyword"
  | "function"
  | "method"
  | "snippet"
  | "variable"
  | "property"
  | "type"
  | "class"
  | "interface"
  | "constant"
  | "module";

export interface AutocompleteSuggestion {
  /** Unique identifier or display text */
  label: string;
  /** Text to insert when selected (defaults to label) */
  insertText?: string;
  /** Relative offset for cursor after insertion (e.g. inside parens) */
  cursorOffset?: number;
  /** Classification for badge styling and icon */
  kind: SuggestionKind;
  /** Short type or signature signature preview, e.g. `(val: any) => void` */
  detail?: string;
  /** Markdown or plain text explanation of the item */
  documentation?: string;
  /** Priority weighting (higher = earlier in list) */
  boost?: number;
}

export interface CaretCoordinates {
  top: number;
  left: number;
  lineHeight: number;
  visible: boolean;
}

export interface ActiveSuggestionState {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  filterText: string;
  tokenStart: number;
  tokenEnd: number;
  caretCoords: CaretCoordinates;
  isOpen: boolean;
}
