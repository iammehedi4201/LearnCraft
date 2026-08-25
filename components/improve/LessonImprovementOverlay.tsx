"use client";

import { useEffect, useState, useCallback } from "react";
import type { LessonStructure, SectionFileInfo, BlockSelection } from "@/lib/improve-types";

export function LessonImprovementOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [structure, setStructure] = useState<LessonStructure | null>(null);
  const [phase, setPhase] = useState<"section" | "block">("section");
  const [focusedSection, setFocusedSection] = useState<{ info: SectionFileInfo; element: HTMLElement } | null>(null);
  const [selectedBlocks, setSelectedBlocks] = useState<Map<string, BlockSelection>>(new Map());

  useEffect(() => {
    if (typeof window === "undefined" || window.self === window.top) return;

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "ENABLE_IMPROVE_MODE") {
        console.log("ImproveMode: received ENABLE_IMPROVE_MODE");
        setEnabled(true);
        setStructure(e.data.structure);
      }
    };
    
    window.addEventListener("message", handleMessage);
    window.parent.postMessage({ type: "IMPROVE_MODE_READY" }, "*");
    
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("improveMode") === "true") {
      setEnabled(true);
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleDocumentClick = useCallback((e: MouseEvent) => {
    if (!enabled || !structure) return;

    const target = e.target as HTMLElement;

    if (phase === "section") {
      const sectionEl = target.closest("section[data-section-title]") as HTMLElement;
      if (!sectionEl) return;

      const titleText = sectionEl.getAttribute("data-section-title");
      if (!titleText) return;

      const allSections = structure.modules.flatMap(m => m.sectionFiles);
      const matchedSection = allSections.find(s => 
        s.title === titleText || 
        titleText.includes(s.title) || 
        s.title.includes(titleText)
      );

      if (matchedSection) {
        e.preventDefault();
        e.stopPropagation();
        setFocusedSection({ info: matchedSection, element: sectionEl });
        setPhase("block");
        
        // Add a class to the focused section for CSS highlighting
        document.querySelectorAll("section.lc-focused").forEach(el => el.classList.remove("lc-focused"));
        sectionEl.classList.add("lc-focused");
      }
    } else if (phase === "block" && focusedSection) {
      // Check if clicked inside the focused section
      if (!focusedSection.element.contains(target)) {
        // Clicked outside, reset to section phase
        setPhase("section");
        setFocusedSection(null);
        setSelectedBlocks(new Map());
        document.querySelectorAll("section.lc-focused").forEach(el => el.classList.remove("lc-focused"));
        document.querySelectorAll(".lc-selected").forEach(el => el.classList.remove("lc-selected"));
        
        window.parent.postMessage({ 
          type: "BLOCKS_UPDATED", 
          section: focusedSection.info,
          blocks: []
        }, "*");
        
        return;
      }

      const blockEl = target.closest("[data-improve-block]") as HTMLElement;
      if (!blockEl) return;

      e.preventDefault();
      e.stopPropagation();

      const blockType = blockEl.getAttribute("data-improve-block") || "unknown";
      
      // UX fix for interactive components like Playground
      if (blockType === "playground") {
        const selectBtn = target.closest("[data-improve-select-btn]");
        if (!selectBtn) {
          return; // Let normal clicks interact with the playground
        }
      }

      e.preventDefault();
      e.stopPropagation();

      const siblings = Array.from(focusedSection.element.querySelectorAll(`[data-improve-block="${blockType}"]`));
      const index = siblings.indexOf(blockEl);
      
      let label = blockType;
      const heading = blockEl.querySelector("h3, h4, h5, strong, [data-section-title]");
      if (heading && heading.textContent) {
        label = `${blockType}: ${heading.textContent.trim().substring(0, 40)}`;
      } else if (blockType === "playground") {
        label = "Code Playground Example";
      }

      const blockId = `${blockType}:${index}`;

      const blockSelection: BlockSelection = {
        type: blockType,
        label: label,
        index: index !== -1 ? index : 0
      };

      setSelectedBlocks(prev => {
        const next = new Map(prev);
        if (next.has(blockId)) {
          next.delete(blockId);
          blockEl.classList.remove("lc-selected");
        } else {
          next.set(blockId, blockSelection);
          blockEl.classList.add("lc-selected");
        }
        
        window.parent.postMessage({ 
          type: "BLOCKS_UPDATED", 
          section: focusedSection.info,
          blocks: Array.from(next.values()).map(b => ({ ...b, id: `${b.type}:${b.index}` }))
        }, "*");
        
        return next;
      });
    }
  }, [enabled, structure, phase, focusedSection]);

  useEffect(() => {
    if (!enabled) return;
    document.addEventListener("click", handleDocumentClick, { capture: true });
    return () => document.removeEventListener("click", handleDocumentClick, { capture: true });
  }, [enabled, handleDocumentClick]);

  if (!enabled) return null;

  // Determine current module info for the nav bar
  let currentModuleName = "Learning Path";
  if (structure) {
    const activeModuleId = new URLSearchParams(window.location.search).get("section");
    if (activeModuleId) {
      const mod = structure.modules.find(m => m.id === activeModuleId);
      if (mod) currentModuleName = `${mod.stage}: ${mod.label}`;
    }
  }

  const navModule = (direction: "prev" | "next") => {
    window.dispatchEvent(new CustomEvent("lc-navigate-module", { detail: { direction } }));
  };

  const handleUseWholeSection = () => {
    if (focusedSection) {
      window.parent.postMessage({ 
        type: "SECTION_SELECTED", 
        section: focusedSection.info 
      }, "*");
      
      // Fake a selection state for the whole section
      document.querySelectorAll(".lc-selected").forEach(el => el.classList.remove("lc-selected"));
      focusedSection.element.classList.add("lc-selected");
    }
  };

  const handleBack = () => {
    setPhase("section");
    setFocusedSection(null);
    setSelectedBlocks(new Map());
    window.parent.postMessage({ type: "BLOCKS_UPDATED", section: null, blocks: [] }, "*");
    document.querySelectorAll("section.lc-focused").forEach(el => el.classList.remove("lc-focused"));
    document.querySelectorAll(".lc-selected").forEach(el => el.classList.remove("lc-selected"));
  };

  return (
    <>
      <style>{`
        /* Safety-net overflow fixes */
        body { overflow-x: hidden; }
        [data-improve-block] { box-sizing: border-box; transition: all 0.2s ease; cursor: pointer; }
        pre { overflow-x: auto; }
        
        /* Section Phase Hover */
        ${phase === "section" ? `
          section[data-section-title]:hover {
            outline: 3px solid rgba(99,102,241,0.5);
            background-color: rgba(99,102,241,0.02);
            cursor: pointer;
            border-radius: 1.5rem;
          }
        ` : ""}

        /* Block Phase Hover */
        ${phase === "block" ? `
          section.lc-focused {
            outline: 3px solid rgba(99,102,241,0.4);
            border-radius: 1.5rem;
          }
          section.lc-focused [data-improve-block]:hover {
            outline: 2px solid rgba(99,102,241,0.6);
            background-color: rgba(99,102,241,0.05);
            border-radius: 0.5rem;
          }
          .lc-selected {
            outline: 2px solid #6366f1 !important;
            background-color: rgba(99,102,241,0.1) !important;
          }
        ` : ""}
      `}</style>

      {/* Compact Sticky Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] bg-slate-900/95 backdrop-blur border-b border-slate-700/50 shadow-md text-slate-200 px-4 py-2.5 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3">
          {phase === "block" ? (
            <button 
              onClick={handleBack}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-md text-xs font-semibold border border-slate-600 transition-colors"
            >
              ← Back to Sections
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                onClick={() => navModule("prev")}
                className="px-2 py-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors"
              >
                ←
              </button>
              <span className="font-semibold text-slate-300 truncate max-w-[200px] md:max-w-xs">{currentModuleName}</span>
              <button 
                onClick={() => navModule("next")}
                className="px-2 py-1 hover:bg-slate-800 rounded text-slate-400 hover:text-slate-200 transition-colors"
              >
                →
              </button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">🎯 Selected:</span>
            <span className="font-semibold text-indigo-300">
              {phase === "section" ? "None" : `${selectedBlocks.size} block${selectedBlocks.size === 1 ? '' : 's'}`}
            </span>
          </div>
          
          {phase === "block" && focusedSection && selectedBlocks.size === 0 && (
            <button
              onClick={handleUseWholeSection}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-md text-xs font-bold text-white shadow-sm transition-colors"
            >
              Use Whole Section ✓
            </button>
          )}
        </div>
      </div>
      
      {/* Floating Tray for multi-selection at bottom */}
      {phase === "block" && selectedBlocks.size > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[9999] bg-slate-900/95 backdrop-blur border border-slate-700/50 shadow-2xl rounded-full px-4 py-2 flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-400 mr-1">Selection:</span>
          {Array.from(selectedBlocks.values()).map(block => (
            <div key={`${block.type}:${block.index}`} className="flex items-center gap-1 px-2.5 py-1 bg-indigo-900/50 border border-indigo-700/50 rounded-full text-xs text-indigo-200">
              <span className="max-w-[120px] truncate">{block.label}</span>
              <button 
                className="hover:text-white rounded-full p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedBlocks(prev => {
                    const next = new Map(prev);
                    next.delete(`${block.type}:${block.index}`);
                    
                    const blockEls = focusedSection?.element.querySelectorAll(`[data-improve-block="${block.type}"]`);
                    if (blockEls && blockEls[block.index]) {
                      blockEls[block.index].classList.remove("lc-selected");
                    }
                    
                    window.parent.postMessage({ 
                      type: "BLOCKS_UPDATED", 
                      section: focusedSection?.info,
                      blocks: Array.from(next.values()).map(b => ({ ...b, id: `${b.type}:${b.index}` }))
                    }, "*");
                    
                    return next;
                  });
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
