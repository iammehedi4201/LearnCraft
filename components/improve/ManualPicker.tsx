"use client";

import { useState, useEffect } from "react";
import type { LessonStructure, SectionFileInfo, BlockSelection, MultiBlockSelection } from "@/lib/improve-types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LessonStructurePickerProps {
  onSelectionChange: (selection: MultiBlockSelection | null) => void;
  className?: string;
}

// ─── Known topics ─────────────────────────────────────────────────────────────

const TOPICS = [
  { id: "nestjs",   label: "NestJS",         icon: "🦁", color: "from-red-500 to-orange-500" },
  { id: "nextjs",   label: "Next.js",         icon: "⚡", color: "from-slate-400 to-slate-600" },
  { id: "tanstack", label: "TanStack Query",  icon: "🔄", color: "from-rose-500 to-pink-600" },
];

// ─── Spinner ──────────────────────────────────────────────────────────────────

function Spinner({ size = "sm" }: { size?: "xs" | "sm" }) {
  const cls = size === "xs" ? "w-3 h-3" : "w-4 h-4";
  return (
    <svg className={`${cls} animate-spin text-slate-500`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LessonStructurePicker({
  onSelectionChange,
  className = "",
}: LessonStructurePickerProps) {
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedLesson, setSelectedLesson] = useState<string>("");

  const [lessonsLoading, setLessonsLoading] = useState(false);
  const [lessons, setLessons] = useState<{ id: string; title: string }[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [structure, setStructure] = useState<LessonStructure | null>(null);
  const [structureLoading, setStructureLoading] = useState(false);

  // Restore previous selection from localStorage
  useEffect(() => {
    const savedTopic = localStorage.getItem("lc_improve_topic");
    const savedLesson = localStorage.getItem("lc_improve_lesson");
    if (savedTopic) setSelectedTopic(savedTopic);
    if (savedLesson) setSelectedLesson(savedLesson);
  }, []);

  // Save selection to localStorage
  useEffect(() => {
    if (selectedTopic) localStorage.setItem("lc_improve_topic", selectedTopic);
    if (selectedLesson) localStorage.setItem("lc_improve_lesson", selectedLesson);
  }, [selectedTopic, selectedLesson]);

  // 1. Fetch available lessons for the selected topic
  useEffect(() => {
    if (!selectedTopic) {
      setLessons([]);
      setSelectedLesson("");
      return;
    }
    const fetchLessons = async () => {
      setLessonsLoading(true);
      try {
        const res = await fetch(`/api/improve?action=list-lessons&topic=${encodeURIComponent(selectedTopic)}`);
        if (res.ok) {
          const data = await res.json();
          setLessons(data.lessons || []);
          if (data.lessons?.length > 0 && !selectedLesson) {
             // Keep the current selection if valid, otherwise clear
             const isValid = data.lessons.some((l: any) => l.id === selectedLesson);
             if (!isValid) setSelectedLesson("");
          }
        }
      } catch (e) {
        console.error("Failed to load lessons", e);
      } finally {
        setLessonsLoading(false);
      }
    };
    fetchLessons();
  }, [selectedTopic]); // Do not include selectedLesson as dependency here

  // 2. Fetch the lesson structure when both topic and lesson are selected
  useEffect(() => {
    if (!selectedTopic || !selectedLesson) {
      setStructure(null);
      return;
    }
    const fetchStructure = async () => {
      setStructureLoading(true);
      try {
        const res = await fetch(
          `/api/improve?action=structure&topic=${encodeURIComponent(selectedTopic)}&lesson=${encodeURIComponent(selectedLesson)}`
        );
        if (res.ok) {
          const data = await res.json();
          setStructure(data);
        }
      } catch (e) {
        console.error("Failed to load lesson structure", e);
      } finally {
        setStructureLoading(false);
      }
    };
    fetchStructure();
  }, [selectedTopic, selectedLesson]);

  // 3. Listen for section selection from the iframe overlay
  useEffect(() => {
    const handleMessage = async (e: MessageEvent) => {
      if ((e.data?.type === "SECTION_SELECTED" || e.data?.type === "BLOCKS_UPDATED") && e.data.section && structure) {
        const section: SectionFileInfo = e.data.section;
        const blocks: BlockSelection[] = e.data.blocks || [];
        
        // Find the module this section belongs to
        const parentModule = structure.modules.find((m) =>
          m.sectionFiles.some((s) => s.filePath === section.filePath)
        );
        
        if (!parentModule) {
          console.error("Could not find parent module for section:", section);
          onSelectionChange(null);
          return;
        }

        try {
          if (e.data.type === "SECTION_SELECTED") {
            const res = await fetch(`/api/improve?action=extract-section&path=${encodeURIComponent(section.filePath)}`);
            if (!res.ok) {
              console.error("Failed to extract section");
              onSelectionChange(null);
              return;
            }
            const data = await res.json();
            
            onSelectionChange({
              topicId: selectedTopic,
              lessonSlug: selectedLesson,
              section,
              blocks: [
                {
                  id: "section:all",
                  type: "section",
                  label: `Entire Section: ${section.title}`,
                  index: 0,
                  filePath: section.filePath,
                  sourceRange: {
                    startLine: data.startLine,
                    endLine: data.endLine,
                    blockSource: data.blockSource
                  },
                  currentBlockContent: data.blockSource,
                  improvedBlockContent: data.blockSource
                }
              ]
            });
          } else {
            // Fetch the extracted block boundaries for each selected block
            const blocksWithSource = await Promise.all(blocks.map(async (block) => {
              const res = await fetch(`/api/improve?action=extract-block&path=${encodeURIComponent(section.filePath)}&blockType=${block.type}&blockIndex=${block.index}`);
              let sourceRange = null;
              if (res.ok) {
                const data = await res.json();
                sourceRange = {
                  blockSource: data.blockSource,
                  startLine: data.startLine,
                  endLine: data.endLine
                };
              } else {
                console.warn(`Failed to extract block ${block.type}:${block.index}`, await res.text());
              }
              
              return {
                ...block,
                id: `${block.type}:${block.index}`,
                filePath: section.filePath,
                sourceRange,
                currentBlockContent: sourceRange?.blockSource || "",
                improvedBlockContent: sourceRange?.blockSource || "",
              };
            }));

            onSelectionChange({
              topicId: selectedTopic,
              lessonSlug: selectedLesson,
              section,
              blocks: blocksWithSource
            });
          }
        } catch (err) {
          console.error("Failed to fetch selection content", err);
          onSelectionChange(null);
        }
      } else if (e.data?.type === "IMPROVE_MODE_READY" && structure) {
        // The iframe overlay has mounted and is ready to receive the structure
        const iframe = document.querySelector('iframe[title="Lesson Preview"]') as HTMLIFrameElement;
        if (iframe?.contentWindow) {
          iframe.contentWindow.postMessage({
            type: "ENABLE_IMPROVE_MODE",
            structure
          }, "*");
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [selectedTopic, selectedLesson, structure, onSelectionChange]);

  // 4. Send structure to iframe when it loads (fallback for standard load)
  const handleIframeLoad = (e: React.SyntheticEvent<HTMLIFrameElement, Event>) => {
    if (structure) {
      const iframe = e.target as HTMLIFrameElement;
      iframe.contentWindow?.postMessage({
        type: "ENABLE_IMPROVE_MODE",
        structure
      }, "*");
    }
  };

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {/* ── Topic + Lesson row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Topic selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            Topic
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {TOPICS.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTopic(t.id)}
                className={`
                  flex items-center justify-center gap-1.5 px-2.5 h-[58px] rounded-xl text-xs font-bold border transition-all duration-150 flex-1 sm:flex-none
                  ${selectedTopic === t.id
                    ? "bg-indigo-600/20 border-indigo-500/50 text-indigo-200"
                    : "bg-slate-800/40 border-slate-700/40 text-slate-500 hover:text-slate-300 hover:border-slate-600/60"
                  }
                `}
              >
                <span>{t.icon}</span>
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Lesson selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600 flex items-center justify-between">
            <span>Lesson</span>
            {lessonsLoading && <Spinner size="xs" />}
          </label>
          <div className="relative w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              disabled={!selectedTopic || lessonsLoading || lessons.length === 0}
              className="w-full flex items-center justify-between bg-slate-800/40 hover:bg-slate-800/60 border border-slate-700/40 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed text-left transition-colors"
            >
              <div className="flex flex-col truncate pr-4">
                {!selectedTopic ? (
                  <span className="text-slate-500 py-1">Select a topic first...</span>
                ) : lessonsLoading ? (
                  <span className="text-slate-400 py-1">Loading lessons...</span>
                ) : !selectedLesson ? (
                  <span className="text-slate-400 py-1">Select a lesson...</span>
                ) : (
                  <>
                    <span className="text-slate-200 font-bold truncate tracking-tight">{lessons.find(l => l.id === selectedLesson)?.title || selectedLesson}</span>
                    <span className="text-[10px] text-slate-500 font-mono truncate mt-0.5">{selectedLesson}</span>
                  </>
                )}
              </div>
              <svg className={`w-4 h-4 shrink-0 text-slate-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isDropdownOpen && (
              <>
                <div 
                  className="fixed inset-0 z-[90]" 
                  onClick={() => setIsDropdownOpen(false)} 
                />
                <div className="absolute top-full left-0 right-0 mt-2 z-[100] max-h-[350px] overflow-y-auto bg-slate-800 border border-slate-700/80 rounded-xl shadow-2xl shadow-black/80 py-1.5 custom-scrollbar">
                  {lessons.map((l) => (
                    <button
                      key={l.id}
                      onClick={() => {
                        setSelectedLesson(l.id);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 hover:bg-slate-700/50 flex flex-col transition-colors border-l-2 ${selectedLesson === l.id ? 'bg-indigo-500/10 border-indigo-400' : 'border-transparent'}`}
                    >
                      <span className={`text-sm font-bold truncate tracking-tight ${selectedLesson === l.id ? 'text-indigo-300' : 'text-slate-200'}`}>
                        {l.title}
                      </span>
                      <span className={`text-[10px] font-mono truncate mt-0.5 ${selectedLesson === l.id ? 'text-indigo-400/60' : 'text-slate-500'}`}>
                        {l.id}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Lesson Preview Iframe ── */}
      {selectedTopic && selectedLesson && (
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              Lesson Preview
              {structureLoading && <Spinner size="xs" />}
            </label>
            <span className="text-[10px] font-mono text-slate-600">
              {structure ? `${structure.modules.flatMap(m => m.sectionFiles).length} sections found` : "Parsing structure..."}
            </span>
          </div>
          
          <div className="w-full h-[800px] border border-slate-700/50 rounded-2xl overflow-hidden bg-white/5 relative">
            <iframe 
              src={`/learn/${selectedTopic}/${selectedLesson}?improveMode=true`} 
              className="w-full h-full border-none"
              title="Lesson Preview"
              onLoad={handleIframeLoad}
            />
            {/* Loading overlay */}
            {structureLoading && (
              <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <Spinner />
                <span className="text-xs font-bold text-slate-300 tracking-wide uppercase">Preparing preview...</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
