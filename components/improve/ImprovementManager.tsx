"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * ImprovementManager v2 — Lesson Content Improvement UI
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * Tab 1: Apply  — Paste → Auto-detect → Show lesson structure →
 *                 User selects/confirms section → Diff preview → Confirm
 * Tab 2: History — Browse, undo, redo improvements
 * Tab 3: Compare — Full diff for any history record
 *
 * Key improvements over v1:
 *  - Always shows LessonStructurePicker so user can visually confirm the target
 *  - Auto-detection result merged into the lesson structure view (highlights section)
 *  - Current section content is loaded immediately when section is selected
 *  - Diff preview appears inline below the picker — no extra step
 *  - Low confidence → no auto-selection, user must click the target section
 *  - "Apply" button blocked until user has reviewed the diff
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useCallback, useEffect } from "react";
import type { ImprovementRecord } from "@/lib/improvement-history";
import {
  loadHistory,
  applyImprovement,
  undoImprovement,
  redoImprovement,
} from "@/lib/improvement-history";
import { DiffViewer } from "./DiffViewer";
import { LessonStructurePicker, type PickerSelection } from "./ManualPicker";


// ─── Icons ────────────────────────────────────────────────────────────────────

const IcBolt = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IcHistory = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.02" />
  </svg>
);
const IcCompare = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IcCheck = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcX = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcUndo = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 14 4 9 9 4" /><path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
);
const IcRedo = () => (
  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 14 20 9 15 4" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" />
  </svg>
);


// ─── Apply Tab ────────────────────────────────────────────────────────────────

type ApplyStep = "idle" | "section-selected" | "confirming" | "done" | "error";

function ApplyTab({ onImprovementApplied }: { onImprovementApplied: () => void }) {
  const [pastedContent, setPastedContent]     = useState("");
  const [step, setStep]                       = useState<ApplyStep>("idle");
  const [pickerSelection, setPickerSelection] = useState<PickerSelection | null>(null);
  const [description, setDescription]        = useState("");
  const [errorMessage, setErrorMessage]      = useState("");
  const [successRecord, setSuccessRecord]    = useState<ImprovementRecord | null>(null);
  
  // Advanced manual editor state
  const [manualEditContent, setManualEditContent] = useState("");
  const [isManualEditOpen, setIsManualEditOpen] = useState(false);

  // When selection changes or paste changes, reset step appropriately
  useEffect(() => {
    if (pickerSelection) {
      setStep("section-selected");
      // Initialize manual editor with paste if opened
      setManualEditContent(pastedContent);
    } else {
      setStep("idle");
    }
  }, [pickerSelection, pastedContent]);

  // Can the user proceed to apply?
  const canApply = pickerSelection !== null && (isManualEditOpen ? manualEditContent.trim().length > 10 : pastedContent.trim().length > 10);
  
  const finalContent = isManualEditOpen ? manualEditContent : pastedContent;

  const handleApply = useCallback(async () => {
    if (!canApply || !pickerSelection) return;
    setStep("confirming");

    try {
      const record = await applyImprovement({
        filePath: pickerSelection.section.filePath,
        newContent: finalContent,
        topic: { id: pickerSelection.topicId, title: pickerSelection.topicId },
        lesson: { slug: pickerSelection.lessonSlug, name: pickerSelection.lessonSlug },
        section: {
          fileName: pickerSelection.section.fileName,
          exportName: pickerSelection.section.exportName,
          title: pickerSelection.section.title,
          sectionNumber: pickerSelection.section.sectionNumber,
        },
        description: description || `Updated ${pickerSelection.section.fileName}`,
      });
      setSuccessRecord(record);
      setStep("done");
      onImprovementApplied();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to apply improvement");
      setStep("error");
    }
  }, [canApply, pickerSelection, finalContent, description, onImprovementApplied]);

  const handleReset = () => {
    setPastedContent("");
    setStep("idle");
    setPickerSelection(null);
    setDescription("");
    setErrorMessage("");
    setSuccessRecord(null);
    setIsManualEditOpen(false);
  };

  // ── Done ──
  if (step === "done" && successRecord) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-100">Improvement Applied</h3>
          <p className="text-sm text-slate-400 mt-1">
            <span className="font-mono text-slate-300">{successRecord.section.fileName}</span> updated and saved to history.
          </p>
        </div>
        <div className="flex items-center gap-4 text-sm font-mono">
          <span className="text-emerald-400 font-bold">+{successRecord.stats.linesAdded} added</span>
          <span className="text-red-400 font-bold">−{successRecord.stats.linesRemoved} removed</span>
        </div>
        <button
          onClick={handleReset}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-sm transition-all"
        >
          Apply Another Improvement
        </button>
      </div>
    );
  }
  
  // Determine progress state
  const isPasteDone = pastedContent.trim().length > 20;
  const isSectionDone = pickerSelection !== null;
  const progressStep = isSectionDone ? 3 : (isPasteDone ? 2 : 1);

  return (
    <div className="flex flex-col gap-6">
    
      {/* ── Progress Bar ── */}
      <div className="flex items-center justify-between p-1 bg-slate-900/80 rounded-2xl border border-slate-800/80">
        <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${progressStep === 1 ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-500'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${progressStep > 1 ? 'bg-emerald-500/20 text-emerald-400' : (progressStep === 1 ? 'bg-indigo-500 text-white' : 'bg-slate-800')}`}>
            {progressStep > 1 ? <IcCheck /> : "1"}
          </div>
          Paste content
        </div>
        <svg className="w-4 h-4 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${progressStep === 2 ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-500'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${progressStep > 2 ? 'bg-emerald-500/20 text-emerald-400' : (progressStep === 2 ? 'bg-indigo-500 text-white' : 'bg-slate-800')}`}>
            {progressStep > 2 ? <IcCheck /> : "2"}
          </div>
          Click a section
        </div>
        <svg className="w-4 h-4 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        <div className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${progressStep === 3 ? 'bg-indigo-600/20 text-indigo-300 font-bold' : 'text-slate-500'}`}>
          <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${progressStep === 3 ? 'bg-indigo-500 text-white' : 'bg-slate-800'}`}>
            3
          </div>
          Apply
        </div>
      </div>
      
      {/* ── Error ── */}
      {step === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-sm text-red-300">
          <svg className="w-4 h-4 mt-0.5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* ── Two-Column Layout ── */}
      <div className="flex flex-col lg:flex-row gap-6">
      
        {/* Left Column: Lesson Preview */}
        <div className="flex-1 lg:max-w-[55%] flex flex-col gap-4">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/20 overflow-hidden flex flex-col h-full">
            <div className="p-4 bg-slate-800/40 border-b border-slate-700/30">
               <LessonStructurePicker
                 onSelectionChange={(sel) => setPickerSelection(sel)}
               />
            </div>
          </div>
        </div>

        {/* Right Column: Paste & Apply */}
        <div className="flex-1 lg:max-w-[45%] flex flex-col gap-4">
        
          {/* Step 1: Paste */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                1 · Improvement Content
              </label>
              {pastedContent && (
                <button
                  onClick={() => { setPastedContent(""); setPickerSelection(null); }}
                  className="text-[10px] text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
                >
                  <IcX />
                  Clear
                </button>
              )}
            </div>
            
            <textarea
              value={pastedContent}
              onChange={(e) => {
                setPastedContent(e.target.value);
                if (isManualEditOpen) setManualEditContent(e.target.value);
              }}
              placeholder={`Paste the full updated section .tsx file here...\n\nexport function MethodsSection() {\n  return (\n    <SectionContainer number={4} title="Methods">\n      ...\n    </SectionContainer>\n  );\n}`}
              className="w-full h-44 bg-[#0d1117] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-slate-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-y transition-all leading-5"
              spellCheck={false}
            />
            
            <div className="text-[10px] font-mono text-slate-600 px-1">
              {pastedContent.length.toLocaleString()} chars · {pastedContent.split("\n").length} lines
            </div>
          </div>
          
          {/* Awaiting Selection State */}
          {!pickerSelection && isPasteDone && (
             <div className="flex items-center justify-center py-10 mt-4 rounded-xl border border-indigo-500/20 bg-indigo-950/10 text-indigo-400 text-sm gap-2 animate-pulse">
               <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                 <path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle>
               </svg>
               Now click a section in the left preview panel
             </div>
          )}

          {/* Step 3: Confirm & Apply */}
          {pickerSelection && (
            <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <IcCheck />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-indigo-500/70">Target Section</span>
                    <span className="text-sm font-bold text-indigo-300">{pickerSelection.section.fileName}</span>
                  </div>
                </div>
              </div>
              
              {/* Diff Preview */}
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  Diff Preview
                </span>
                <DiffViewer
                  oldContent={pickerSelection.currentContent}
                  newContent={finalContent}
                  oldLabel="Current"
                  newLabel="Improvement"
                />
              </div>
              
              {/* Advanced: Manual Edit Toggle */}
              <details className="group border border-slate-700/30 rounded-xl bg-slate-800/20 overflow-hidden" onToggle={(e) => setIsManualEditOpen(e.currentTarget.open)}>
                <summary className="px-4 py-2.5 text-xs font-bold text-slate-500 hover:text-slate-300 cursor-pointer list-none flex items-center justify-between select-none">
                  <span>Advanced: Edit manually before applying</span>
                  <svg className="w-4 h-4 transition-transform group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9" /></svg>
                </summary>
                <div className="p-4 border-t border-slate-700/30 bg-[#0d1117]">
                  <textarea
                    value={manualEditContent}
                    onChange={(e) => setManualEditContent(e.target.value)}
                    className="w-full h-[400px] bg-transparent font-mono text-xs text-slate-300 focus:outline-none resize-y leading-5 whitespace-pre"
                    spellCheck={false}
                  />
                </div>
              </details>

              {/* Apply Bar */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-700/30">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description (e.g. 'Rewrote method chaining examples')"
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setPickerSelection(null)}
                    className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApply}
                    disabled={step === "confirming" || !canApply}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/20"
                  >
                    {step === "confirming" ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Applying...
                      </>
                    ) : (
                      <><IcCheck /> Apply Improvement</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
}

// ─── History Card ─────────────────────────────────────────────────────────────

function HistoryCard({
  record,
  onUndo,
  onRedo,
  onViewDiff,
  isLoading,
}: {
  record: ImprovementRecord;
  onUndo: (id: string) => void;
  onRedo: (id: string) => void;
  onViewDiff: (record: ImprovementRecord) => void;
  isLoading: boolean;
}) {
  const date = new Date(record.timestamp);
  const dateStr = date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeStr = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className={`rounded-2xl border bg-slate-800/40 overflow-hidden transition-all duration-200 ${record.undone ? "border-slate-700/20 opacity-55" : "border-slate-700/50 hover:border-slate-600/50"}`}>
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-slate-700/30 bg-slate-800/60">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
            <span className="font-black text-indigo-400">{record.topic.title}</span>
            <span className="text-slate-700">›</span>
            <span className="font-mono text-slate-500 truncate">{record.lesson.slug}</span>
            <span className="text-slate-700">›</span>
            <span className="font-mono text-slate-400">{record.section.fileName}</span>
          </div>
          <p className="text-xs text-slate-300 font-medium truncate">{record.description}</p>
        </div>
        <div className="flex flex-col items-end shrink-0 gap-0.5">
          <span className="text-[10px] font-bold text-slate-400">{dateStr}</span>
          <span className="text-[10px] text-slate-600">{timeStr}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3 text-[11px] font-mono">
          {record.stats.linesAdded > 0 && <span className="text-emerald-400 font-bold">+{record.stats.linesAdded}</span>}
          {record.stats.linesRemoved > 0 && <span className="text-red-400 font-bold">−{record.stats.linesRemoved}</span>}
          <span className="text-slate-600">{record.stats.totalLinesOld}→{record.stats.totalLinesNew} lines</span>
          {record.undone && (
            <span className="px-2 py-0.5 rounded-full bg-slate-700/50 border border-slate-600/30 text-slate-500 text-[9px] font-black uppercase tracking-wider">
              Reverted
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onViewDiff(record)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-700/50 transition-all"
          >
            <IcCompare />
            Diff
          </button>
          {record.undone ? (
            <button
              onClick={() => onRedo(record.id)}
              disabled={isLoading}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-indigo-400 hover:text-indigo-200 hover:bg-indigo-950/40 border border-transparent hover:border-indigo-500/30 transition-all disabled:opacity-40"
            >
              <IcRedo />
              Re-apply
            </button>
          ) : (
            <button
              onClick={() => onUndo(record.id)}
              disabled={isLoading}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-amber-400 hover:text-amber-200 hover:bg-amber-950/40 border border-transparent hover:border-amber-500/30 transition-all disabled:opacity-40"
            >
              <IcUndo />
              Undo
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── History Tab ──────────────────────────────────────────────────────────────

function HistoryTab({
  records,
  isLoading,
  onUndo,
  onRedo,
  onViewDiff,
}: {
  records: ImprovementRecord[];
  isLoading: boolean;
  onUndo: (id: string) => void;
  onRedo: (id: string) => void;
  onViewDiff: (record: ImprovementRecord) => void;
}) {
  const [filterLesson, setFilterLesson] = useState("");
  const [filterTopic, setFilterTopic]   = useState("");

  const lessonSlugs = Array.from(new Set(records.map((r) => r.lesson.slug)));
  const topicIds    = Array.from(new Set(records.map((r) => r.topic.id)));
  const filtered    = records
    .filter((r) => !filterLesson || r.lesson.slug === filterLesson)
    .filter((r) => !filterTopic  || r.topic.id    === filterTopic);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-600 gap-2">
        <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        Loading history...
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {records.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {[
            { value: filterTopic, setter: setFilterTopic, options: topicIds, placeholder: "All topics" },
            { value: filterLesson, setter: setFilterLesson, options: lessonSlugs, placeholder: "All lessons" },
          ].map(({ value, setter, options, placeholder }) => (
            <select
              key={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="appearance-none bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            >
              <option value="">{placeholder}</option>
              {options.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          ))}
          {(filterTopic || filterLesson) && (
            <button
              onClick={() => { setFilterTopic(""); setFilterLesson(""); }}
              className="text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
            >
              <IcX />
              Clear
            </button>
          )}
          <span className="text-xs text-slate-600 ml-auto">{filtered.length} record{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      )}

      {records.length === 0 ? (
        <div className="flex flex-col items-center gap-3 py-16 text-center text-slate-700">
          <IcHistory />
          <p className="text-sm">No improvements recorded yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((record) => (
            <HistoryCard
              key={record.id}
              record={record}
              onUndo={onUndo}
              onRedo={onRedo}
              onViewDiff={onViewDiff}
              isLoading={isLoading}
            />
          ))}
          {filtered.length === 0 && (
            <p className="text-sm text-slate-600 text-center py-8">No records match the filter.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Compare Tab ──────────────────────────────────────────────────────────────

function CompareTab({ record }: { record: ImprovementRecord | null }) {
  if (!record) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center text-slate-700">
        <IcCompare />
        <p className="text-sm">Select "Diff" on a history record to compare versions here.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3 flex-wrap text-xs">
        <span className="font-black text-indigo-400">{record.topic.title}</span>
        <span className="text-slate-600">›</span>
        <span className="font-mono text-slate-400">{record.lesson.slug}</span>
        <span className="text-slate-600">›</span>
        <span className="font-mono text-slate-300">{record.section.fileName}</span>
        <span className="text-slate-600 ml-2">{new Date(record.timestamp).toLocaleString()}</span>
        {record.undone && (
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/30">
            Reverted
          </span>
        )}
      </div>
      {record.description && (
        <p className="text-sm text-slate-400 italic">&ldquo;{record.description}&rdquo;</p>
      )}
      <DiffViewer
        oldContent={record.previousContent}
        newContent={record.newContent}
        oldLabel={`Before: ${record.section.fileName}`}
        newLabel="After Improvement"
      />
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

type Tab = "apply" | "history" | "compare";

export function ImprovementManager() {
  const [activeTab, setActiveTab]           = useState<Tab>("apply");
  const [history, setHistory]               = useState<ImprovementRecord[]>([]);
  const [isHistoryLoading, setHistoryLoad]  = useState(false);
  const [compareRecord, setCompareRecord]   = useState<ImprovementRecord | null>(null);
  const [actionLoading, setActionLoading]   = useState(false);

  const fetchHistory = useCallback(async () => {
    setHistoryLoad(true);
    try {
      const records = await loadHistory();
      setHistory(records);
    } finally {
      setHistoryLoad(false);
    }
  }, []);

  useEffect(() => { fetchHistory(); }, [fetchHistory]);

  const handleUndo = async (id: string) => {
    setActionLoading(true);
    try { await undoImprovement(id); await fetchHistory(); }
    finally { setActionLoading(false); }
  };

  const handleRedo = async (id: string) => {
    setActionLoading(true);
    try { await redoImprovement(id); await fetchHistory(); }
    finally { setActionLoading(false); }
  };

  const handleViewDiff = (record: ImprovementRecord) => {
    setCompareRecord(record);
    setActiveTab("compare");
  };

  const TABS: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "apply",   label: "Apply",   icon: <IcBolt /> },
    { id: "history", label: "History", icon: <IcHistory />, count: history.length || undefined },
    { id: "compare", label: "Compare", icon: <IcCompare /> },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Tab bar */}
      <div className="flex items-center gap-1 border-b border-slate-700/50 mb-6">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex items-center gap-2 px-4 py-3 text-sm font-bold rounded-t-xl transition-all duration-150
              ${activeTab === tab.id
                ? "text-indigo-300 bg-slate-800/60 border-b-2 border-indigo-500 -mb-px"
                : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"
              }
            `}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-indigo-500/30 text-indigo-300" : "bg-slate-700 text-slate-500"}`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === "apply" && (
        <ApplyTab onImprovementApplied={fetchHistory} />
      )}
      {activeTab === "history" && (
        <HistoryTab
          records={history}
          isLoading={isHistoryLoading || actionLoading}
          onUndo={handleUndo}
          onRedo={handleRedo}
          onViewDiff={handleViewDiff}
        />
      )}
      {activeTab === "compare" && <CompareTab record={compareRecord} />}
    </div>
  );
}
