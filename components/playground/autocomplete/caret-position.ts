// ═══════════════════════════════════════════════════════════
// Learning Craft — Textarea Caret Coordinates Calculator
// ═══════════════════════════════════════════════════════════

import type { CaretCoordinates } from "./types";

const PROPERTIES = [
  "direction",
  "boxSizing",
  "width",
  "height",
  "overflowX",
  "overflowY",
  "borderTopWidth",
  "borderRightWidth",
  "borderBottomWidth",
  "borderLeftWidth",
  "borderStyle",
  "paddingTop",
  "paddingRight",
  "paddingBottom",
  "paddingLeft",
  "fontStyle",
  "fontVariant",
  "fontWeight",
  "fontStretch",
  "fontSize",
  "fontSizeAdjust",
  "lineHeight",
  "fontFamily",
  "textAlign",
  "textTransform",
  "textIndent",
  "textDecoration",
  "letterSpacing",
  "wordSpacing",
  "tabSize",
  "MozTabSize",
] as const;

let mirrorDiv: HTMLDivElement | null = null;

function getMirrorDiv(): HTMLDivElement {
  if (!mirrorDiv && typeof document !== "undefined") {
    mirrorDiv = document.createElement("div");
    mirrorDiv.id = "__learncraft_textarea_caret_mirror";
    mirrorDiv.style.position = "absolute";
    mirrorDiv.style.top = "-99999px";
    mirrorDiv.style.left = "-99999px";
    mirrorDiv.style.visibility = "hidden";
    mirrorDiv.style.whiteSpace = "pre";
    mirrorDiv.style.wordWrap = "normal";
    mirrorDiv.style.pointerEvents = "none";
    document.body.appendChild(mirrorDiv);
  }
  return mirrorDiv!;
}

/**
 * Calculates the exact (top, left) coordinates of the caret inside an HTMLTextAreaElement
 * relative to the textarea itself.
 */
export function getCaretCoordinates(
  element: HTMLTextAreaElement,
  position: number
): CaretCoordinates {
  if (typeof window === "undefined" || !element) {
    return { top: 0, left: 0, lineHeight: 26, visible: false };
  }

  const div = getMirrorDiv();
  const style = window.getComputedStyle(element);

  // Copy style properties
  PROPERTIES.forEach((prop) => {
    // @ts-ignore
    div.style[prop] = style[prop];
  });

  div.style.whiteSpace = "pre";
  div.style.wordBreak = "normal";
  div.style.width = `${element.clientWidth}px`;

  // Text up to caret
  const textBefore = element.value.substring(0, position);
  div.textContent = textBefore;

  // Caret marker
  const marker = document.createElement("span");
  marker.textContent = element.value.substring(position, position + 1) || "\u200b";
  div.appendChild(marker);

  // Parse line height
  let lineHeight = parseFloat(style.lineHeight);
  if (isNaN(lineHeight)) {
    const fontSize = parseFloat(style.fontSize) || 14;
    lineHeight = fontSize * 1.625;
  }

  const spanTop = marker.offsetTop;
  const spanLeft = marker.offsetLeft;

  // Coordinates relative to textarea viewport
  const top = spanTop - element.scrollTop + lineHeight + 4;
  const left = spanLeft - element.scrollLeft;

  return {
    top,
    left,
    lineHeight,
    visible: true,
  };
}
