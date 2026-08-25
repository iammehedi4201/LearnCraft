"use client";

import { useEffect, useState, useCallback } from "react";
import type { LessonStructure, SectionFileInfo } from "@/lib/improve-types";

interface SectionDomRect {
  info: SectionFileInfo;
  rect: DOMRect;
  subSectionText?: string;
  isSubSection: boolean;
}

export function LessonImprovementOverlay() {
  const [enabled, setEnabled] = useState(false);
  const [structure, setStructure] = useState<LessonStructure | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [sectionsDom, setSectionsDom] = useState<SectionDomRect[]>([]);

  useEffect(() => {
    // Only run if we are inside an iframe
    if (typeof window === "undefined" || window.self === window.top) return;

    const handleMessage = (e: MessageEvent) => {
      if (e.data?.type === "ENABLE_IMPROVE_MODE") {
        console.log("ImproveMode: received ENABLE_IMPROVE_MODE");
        setEnabled(true);
        setStructure(e.data.structure);
      }
    };
    
    window.addEventListener("message", handleMessage);
    
    // Announce to the parent that we are ready to receive the structure
    window.parent.postMessage({ type: "IMPROVE_MODE_READY" }, "*");
    
    // Also check if we were already in improveMode via URL (optional fallback)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("improveMode") === "true") {
      setEnabled(true);
      // We will wait for the parent to send the structure
    }

    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const updateRects = useCallback(() => {
    if (!enabled || !structure) return;

    const allSections = structure.modules.flatMap(m => m.sectionFiles);
    const newRects: SectionDomRect[] = [];

    // 1. Find all sections on the page
    const sections = document.querySelectorAll("section");
    
    sections.forEach(sectionEl => {
      const h2 = sectionEl.querySelector("h2");
      const titleText = h2?.textContent?.trim();
      if (!titleText) return;
      
      const matchedSection = allSections.find(s => 
        s.title === titleText || 
        titleText.includes(s.title) || 
        s.title.includes(titleText)
      );

      if (matchedSection) {
        // Add a rect for the whole section (large target)
        newRects.push({
          info: matchedSection,
          rect: sectionEl.getBoundingClientRect(),
          isSubSection: false
        });
      }
    });

    setSectionsDom(newRects);
  }, [enabled, structure]);

  useEffect(() => {
    if (!enabled || !structure) return;

    // Initial calculation
    // Use a small timeout to ensure the DOM is fully rendered
    const timer = setTimeout(updateRects, 500);

    // Re-calculate on scroll and resize
    window.addEventListener("scroll", updateRects);
    window.addEventListener("resize", updateRects);

    // Also observe DOM changes (e.g. lazy loaded components)
    const observer = new MutationObserver(updateRects);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", updateRects);
      window.removeEventListener("resize", updateRects);
      observer.disconnect();
    };
  }, [enabled, structure, updateRects]);

  if (!enabled) return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none" style={{ backgroundColor: 'rgba(0,0,0,0.02)' }}>
      {/* Informative banner */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-indigo-600/90 backdrop-blur text-white px-6 py-2.5 rounded-full font-bold shadow-xl pointer-events-auto flex items-center gap-2 border border-indigo-500">
        <svg className="w-4 h-4 text-indigo-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" /><path d="M12 8v4m0 4h.01" />
        </svg>
        Improve Mode Active: Click a section to select it
      </div>

      {sectionsDom.map((item, i) => {
        const id = `${item.info.fileName}-${i}`;
        const isHovered = hoveredSection === id;
        
        return (
          <div
            key={id}
            className="absolute transition-all cursor-pointer pointer-events-auto rounded-3xl"
            style={{
              top: item.rect.top,
              left: item.rect.left,
              width: item.rect.width,
              height: item.rect.height,
              border: isHovered ? '3px solid #6366f1' : '3px dashed rgba(99, 102, 241, 0.4)',
              backgroundColor: isHovered ? 'rgba(99, 102, 241, 0.05)' : 'transparent',
              boxShadow: isHovered ? '0 0 0 4px rgba(99, 102, 241, 0.1)' : 'none',
              zIndex: isHovered ? 10000 : 9999
            }}
            onMouseEnter={() => setHoveredSection(id)}
            onMouseLeave={() => setHoveredSection(null)}
            onClick={(e) => {
              e.stopPropagation();
              window.parent.postMessage({ 
                type: "SECTION_SELECTED", 
                section: item.info
              }, "*");
            }}
          >
            {isHovered && (
              <div className="absolute -top-3 -right-3 bg-indigo-600 text-white text-xs font-black tracking-wide px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-indigo-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Select: {item.info.title}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
