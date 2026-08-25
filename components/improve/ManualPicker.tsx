"use client";

import { useState, useEffect } from "react";
import type { LessonStructure, SectionFileInfo, LessonModule } from "@/lib/improve-types";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface PickerSelection {
  topicId: string;
  lessonSlug: string;
  module: LessonModule;
  section: SectionFileInfo;
  currentContent: string;
  subSectionText?: string;
}

interface LessonStructurePickerProps {
  onSelectionChange: (selection: PickerSelection | null) => void;
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

  const [structure, setStructure] = useState<LessonStructure | null>(null);
  const [structureLoading, setStructureLoading] = useState(false);

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
      if (e.data?.type === "SECTION_SELECTED" && e.data.section && structure) {
        const section: SectionFileInfo = e.data.section;
        
        // Find the module this section belongs to
        const parentModule = structure.modules.find((m) =>
          m.sectionFiles.some((s) => s.filePath === section.filePath)
        );
        
        if (!parentModule) {
          console.error("Could not find parent module for section:", section);
          onSelectionChange(null);
          return;
        }

        // Fetch the current content of the section file
        try {
          const res = await fetch(`/api/improve?action=file&path=${encodeURIComponent(section.filePath)}`);
          const currentContent = res.ok ? (await res.json()).content ?? "" : "";

          onSelectionChange({
            topicId: selectedTopic,
            lessonSlug: selectedLesson,
            module: parentModule,
            section,
            currentContent,
            subSectionText: e.data.subSectionText
          });
        } catch (err) {
          console.error("Failed to load current content", err);
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
                  flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all duration-150
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
          
          <select
            value={selectedLesson}
            onChange={(e) => setSelectedLesson(e.target.value)}
            disabled={!selectedTopic || lessonsLoading || lessons.length === 0}
            className="w-full bg-slate-800/40 border border-slate-700/40 rounded-xl px-3 py-2 text-sm text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:opacity-50 disabled:cursor-not-allowed appearance-none"
          >
            <option value="">
              {!selectedTopic 
                ? "Select a topic first" 
                : lessonsLoading 
                ? "Loading lessons..." 
                : "Select a lesson..."}
            </option>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.id} — {l.title}
              </option>
            ))}
          </select>
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
