"use client";

// ═══════════════════════════════════════════════════════════
// Learning Craft — Autocomplete Popover Component
// ═══════════════════════════════════════════════════════════

import { useEffect, useLayoutEffect, useState, useRef, type ReactNode } from "react";
import type { AutocompleteSuggestion, CaretCoordinates } from "./types";

interface AutocompletePopoverProps {
  suggestions: AutocompleteSuggestion[];
  selectedIndex: number;
  onSelectIndex: (index: number) => void;
  onApply: (suggestion: AutocompleteSuggestion) => void;
  caretCoords: CaretCoordinates;
  filterText: string;
}

/**
 * Kind badge color and label configuration
 */
function getKindBadge(kind: string): { label: string; className: string } {
  switch (kind) {
    case "keyword":
      return { label: "KW", className: "playground-ac-badge--keyword" };
    case "function":
      return { label: "ƒn", className: "playground-ac-badge--function" };
    case "method":
      return { label: "mtd", className: "playground-ac-badge--method" };
    case "snippet":
      return { label: "snp", className: "playground-ac-badge--snippet" };
    case "variable":
      return { label: "var", className: "playground-ac-badge--variable" };
    case "class":
      return { label: "cls", className: "playground-ac-badge--class" };
    case "interface":
      case "type":
      return { label: "typ", className: "playground-ac-badge--type" };
    case "property":
      return { label: "prop", className: "playground-ac-badge--property" };
    case "constant":
      return { label: "const", className: "playground-ac-badge--constant" };
    default:
      return { label: "item", className: "playground-ac-badge--default" };
  }
}

/**
 * Highlights matching letters in the suggestion label
 */
function renderHighlightedLabel(label: string, query: string): ReactNode {
  if (!query) return label;

  const cleanQuery = query.toLowerCase().replace(/^[a-zA-Z_$0-9]+\./, ""); // match after dot if any
  const lowerLabel = label.toLowerCase();

  const idx = lowerLabel.indexOf(cleanQuery);
  if (idx === -1) {
    // try full query
    const fullIdx = lowerLabel.indexOf(query.toLowerCase());
    if (fullIdx === -1) return label;
    return (
      <>
        {label.substring(0, fullIdx)}
        <span className="playground-ac-match">{label.substring(fullIdx, fullIdx + query.length)}</span>
        {label.substring(fullIdx + query.length)}
      </>
    );
  }

  return (
    <>
      {label.substring(0, idx)}
      <span className="playground-ac-match">{label.substring(idx, idx + cleanQuery.length)}</span>
      {label.substring(idx + cleanQuery.length)}
    </>
  );
}

export function AutocompletePopover({
  suggestions,
  selectedIndex,
  onSelectIndex,
  onApply,
  caretCoords,
  filterText,
}: AutocompletePopoverProps) {
  const popoverRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [adjustedTop, setAdjustedTop] = useState<number | null>(null);
  const activeItem = suggestions[selectedIndex];

  // Auto-scroll selected item into view
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.querySelector<HTMLElement>(".playground-ac-item--active");
      if (activeEl) {
        activeEl.scrollIntoView({ block: "nearest" });
      }
    }
  }, [selectedIndex]);

  // Adjust vertical placement to fit within parent
  useLayoutEffect(() => {
    if (popoverRef.current) {
      const popoverEl = popoverRef.current;
      const parentEl = popoverEl.parentElement;
      if (parentEl) {
        const parentHeight = parentEl.clientHeight;
        const popoverHeight = popoverEl.offsetHeight;

        if (caretCoords.top + popoverHeight > parentHeight) {
          // Position above the cursor line
          const aboveTop = caretCoords.top - caretCoords.lineHeight - 8 - popoverHeight;
          setAdjustedTop(Math.max(4, aboveTop));
        } else {
          setAdjustedTop(caretCoords.top);
        }
      }
    }
  }, [caretCoords.top, caretCoords.lineHeight, suggestions, activeItem]);

  if (!suggestions.length || !caretCoords.visible) {
    return null;
  }

  // Adjust left/top to avoid clipping inside the editor
  // Offset by line number column padding (approx 44px)
  const leftPos = Math.max(50, Math.min(caretCoords.left + 44, 450));
  const topPos = adjustedTop !== null ? adjustedTop : caretCoords.top;

  return (
    <div
      ref={popoverRef}
      className="playground-ac-popover"
      style={{
        top: `${topPos}px`,
        left: `${leftPos}px`,
        visibility: adjustedTop === null ? "hidden" : "visible",
      }}
      role="listbox"
      aria-label="Code suggestions"
    >
      <div className="playground-ac-main">
        {/* Suggestion List */}
        <div ref={listRef} className="playground-ac-list">
          {suggestions.map((suggestion, index) => {
            const isSelected = index === selectedIndex;
            const badge = getKindBadge(suggestion.kind);

            return (
              <div
                key={`${suggestion.label}-${index}`}
                role="option"
                aria-selected={isSelected}
                className={`playground-ac-item ${isSelected ? "playground-ac-item--active" : ""}`}
                onMouseEnter={() => onSelectIndex(index)}
                onMouseDown={(e) => {
                  e.preventDefault(); // prevent losing focus
                  onApply(suggestion);
                }}
              >
                {/* Kind Badge */}
                <span className={`playground-ac-badge ${badge.className}`}>{badge.label}</span>

                {/* Label with highlighted match */}
                <span className="playground-ac-label">
                  {renderHighlightedLabel(suggestion.label, filterText)}
                </span>

                {/* Detail short description */}
                {suggestion.detail && (
                  <span className="playground-ac-detail">{suggestion.detail}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Documentation / Signature panel */}
        {activeItem && (activeItem.documentation || activeItem.detail) && (
          <div className="playground-ac-doc-panel">
            {activeItem.detail && (
              <div className="playground-ac-doc-signature">{activeItem.detail}</div>
            )}
            {activeItem.documentation && (
              <div className="playground-ac-doc-text">{activeItem.documentation}</div>
            )}
          </div>
        )}
      </div>

      {/* Keyboard Shortcuts Footer */}
      <div className="playground-ac-footer">
        <span className="playground-ac-hint">
          <kbd className="playground-ac-kbd">Tab</kbd> or <kbd className="playground-ac-kbd">↵</kbd> insert
        </span>
        <span className="playground-ac-hint">
          <kbd className="playground-ac-kbd">↑↓</kbd> navigate
        </span>
        <span className="playground-ac-hint">
          <kbd className="playground-ac-kbd">Esc</kbd> dismiss
        </span>
      </div>
    </div>
  );
}
