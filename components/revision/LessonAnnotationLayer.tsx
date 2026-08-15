"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LESSON ANNOTATION LAYER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Non-destructive client-side highlight renderer for lesson pages.
 * Scans text nodes, wraps saved annotations with design-system mark tags,
 * attaches note indicator badges, and handles smooth auto-scrolling with glow
 * animations when deep-linking from the My Revision page.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRevision } from "@/context/revision-context";
import { AnnotationItem, HighlightColor } from "@/types/revision";

const COLOR_CLASSES: Record<HighlightColor, string> = {
  feature: "border-b-2 border-dashed border-ds-feature-base hover:border-solid",
  away: "border-b-2 border-dashed border-ds-away-base hover:border-solid",
  highlighted: "border-b-2 border-dashed border-ds-highlighted-base hover:border-solid",
  success: "border-b-2 border-dashed border-ds-success-base hover:border-solid",
  info: "border-b-2 border-dashed border-ds-info-base hover:border-solid",
};

export function LessonAnnotationLayer(): JSX.Element | null {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { currentLessonAnnotations, openExistingHighlightPopover } =
    useRevision();
  const highlightedElementsRef = useRef<HTMLElement[]>([]);

  // Apply highlights to DOM
  useEffect(() => {
    if (typeof window === "undefined" || !pathname) return;

    // Do not highlight on revision hub or design system pages
    if (pathname === "/revision" || pathname.startsWith("/design-system"))
      return;

    // Helper: remove existing applied marks
    const cleanupExistingMarks = () => {
      const marks = document.querySelectorAll("mark[data-lc-highlight='true']");
      marks.forEach((mark) => {
        const badges = mark.querySelectorAll(".lc-note-pill");
        badges.forEach((b) => b.remove());
        const parent = mark.parentNode;
        if (parent) {
          // Replace mark with text content
          const textNode = document.createTextNode(mark.textContent || "");
          parent.replaceChild(textNode, mark);
          parent.normalize(); // merge adjacent text nodes
        }
      });
      highlightedElementsRef.current = [];
    };

    cleanupExistingMarks();

    if (!currentLessonAnnotations.length) return;

    // Target the main content area of the lesson
    const mainContent =
      document.querySelector("main") ||
      document.querySelector("#lesson-content") ||
      document.body;

    if (!mainContent) return;

    // Recursive text node walker
    const highlightAnnotationInNode = (
      rootNode: Node,
      annotation: AnnotationItem,
    ): boolean => {
      const walker = document.createTreeWalker(rootNode, NodeFilter.SHOW_TEXT, {
        acceptNode: (node) => {
          // Ignore code blocks or existing UI buttons
          const parent = node.parentElement;
          if (
            !parent ||
            parent.tagName === "SCRIPT" ||
            parent.tagName === "STYLE" ||
            parent.tagName === "TEXTAREA" ||
            parent.tagName === "INPUT" ||
            parent.closest("[data-revision-ui]") ||
            parent.closest(".cm-editor") ||
            parent.closest("pre") ||
            parent.closest("code")
          ) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        },
      });

      const textToFind = annotation.selectedText.trim();
      if (!textToFind) return false;

      let currentNode = walker.nextNode();
      while (currentNode) {
        const nodeText = currentNode.nodeValue || "";
        const matchIndex = nodeText.indexOf(textToFind);

        if (matchIndex !== -1) {
          const parent = currentNode.parentElement;
          if (parent) {
            // Split text node
            const range = document.createRange();
            range.setStart(currentNode, matchIndex);
            range.setEnd(currentNode, matchIndex + textToFind.length);

            const mark = document.createElement("mark");
            mark.setAttribute("data-lc-highlight", "true");
            mark.setAttribute("data-highlight-id", annotation.id);
            mark.id = `rev-highlight-${annotation.id}`;

            const colorClass =
              COLOR_CLASSES[annotation.color] || COLOR_CLASSES.feature;
            mark.className = `lc-annotation-mark ${colorClass} bg-transparent text-inherit cursor-pointer transition-all duration-200 inline`;

            // Wrap content
            try {
              range.surroundContents(mark);

              // If note or question attached, append note pill badge
              if ((annotation.note && annotation.note.trim()) || (annotation.question && annotation.question.trim())) {
                const noteBadge = document.createElement("span");
                noteBadge.className =
                  "lc-note-pill inline-flex items-center justify-center text-[10px] w-4.5 h-4.5 rounded-full bg-ds-feature-base text-ds-static-white font-bold ml-1.5 align-middle shrink-0 shadow-sm transition-transform hover:scale-110";
                noteBadge.innerHTML = "📝";
                noteBadge.title = annotation.question
                  ? `Question: ${annotation.question}`
                  : `Note: ${annotation.note}`;
                mark.appendChild(noteBadge);
              }

              // Click handler for mark
              mark.addEventListener("click", (e) => {
                e.stopPropagation();
                e.preventDefault();
                const rect = mark.getBoundingClientRect();
                openExistingHighlightPopover(annotation, rect);
              });

              highlightedElementsRef.current.push(mark);
              return true; // Match found and wrapped
            } catch (err) {
              // Ignore DOM range boundary exceptions for cross-element selections
            }
          }
        }
        currentNode = walker.nextNode();
      }
      return false;
    };

    // Apply each annotation
    currentLessonAnnotations.forEach((anno) => {
      highlightAnnotationInNode(mainContent, anno);
    });

    // Handle deep linking / scroll to target highlight
    const highlightIdParam =
      searchParams?.get("highlightId") ||
      (typeof window !== "undefined" && window.location.hash.replace("#", ""));

    if (highlightIdParam) {
      const targetId = highlightIdParam
        .replace(/^rev-highlight-/, "")
        .replace(/^rev_/, "rev_");
      const targetElement =
        document.getElementById(`rev-highlight-${targetId}`) ||
        document.querySelector(`mark[data-highlight-id="${targetId}"]`) ||
        document.querySelector(`mark[data-highlight-id="rev_${targetId}"]`);

      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: "smooth", block: "center" });
          targetElement.classList.add(
            "ring-4",
            "ring-ds-feature-base",
            "shadow-xl",
            "animate-pulse",
          );
          setTimeout(() => {
            targetElement.classList.remove(
              "ring-4",
              "ring-ds-feature-base",
              "shadow-xl",
              "animate-pulse",
            );
          }, 3500);

          // Clear highlightId query parameter after consumption so page refresh preserves current position
          try {
            if (typeof window !== "undefined" && window.location.search.includes("highlightId")) {
              const cleanUrl = new URL(window.location.href);
              cleanUrl.searchParams.delete("highlightId");
              window.history.replaceState(null, "", cleanUrl.toString());
            }
          } catch {}
        }, 300);
      }
    }

    return () => {
      cleanupExistingMarks();
    };
  }, [
    pathname,
    currentLessonAnnotations,
    searchParams,
    openExistingHighlightPopover,
  ]);

  return null;
}
