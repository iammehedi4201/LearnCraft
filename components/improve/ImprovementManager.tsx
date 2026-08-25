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

import { useState, useCallback, useEffect, useRef } from "react";
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

type ApplyStep = "paste" | "detecting" | "reviewing" | "confirming" | "done" | "error";


function ApplyTab({ onImprovementApplied }: { onImprovementApplied: () => void }) {
  const [pastedContent, setPastedContent]     = useState("");
  const [step, setStep]                       = useState<ApplyStep>("paste");
  const [pickerSelection, setPickerSelection] = useState<PickerSelection | null>(null);
  const [mergedContent, setMergedContent]    = useState("");
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const [description, setDescription]        = useState("");
  const [errorMessage, setErrorMessage]      = useState("");
  const [successRecord, setSuccessRecord]    = useState<ImprovementRecord | null>(null);
  const [diffReviewed, setDiffReviewed]      = useState(false);

  // When selection changes, reset merged content and auto-scroll/select
  useEffect(() => {
    if (pickerSelection) {
      setMergedContent(pickerSelection.currentContent);
      
      if (pickerSelection.subSectionText && editorRef.current) {
        const lines = pickerSelection.currentContent.split("\n");
        const query = pickerSelection.subSectionText.split(" ")[0]; // simple heuristic
        const targetIndex = lines.findIndex(line => line.includes(pickerSelection.subSectionText!) || line.includes(query));
        
        if (targetIndex !== -1) {
          // Find block bounds
          let startIdx = targetIndex;
          while (startIdx > 0 && !lines[startIdx].match(/<[A-Z]/)) {
            startIdx--;
          }
          
          let endIdx = targetIndex;
          let openTags = 0;
          let foundStart = false;
          
          for (let i = startIdx; i < lines.length; i++) {
            const line = lines[i];
            const opens = (line.match(/<[A-Z][a-zA-Z0-9]*/g) || []).length;
            const selfCloses = (line.match(/\/>/g) || []).length;
            const closes = (line.match(/<\/[A-Z][a-zA-Z0-9]*/g) || []).length;
            
            openTags += opens - selfCloses - closes;
            if (opens > 0) foundStart = true;
            if (foundStart && openTags <= 0) {
              endIdx = i;
              break;
            }
          }
          
          // Calculate character indices
          const startChar = lines.slice(0, startIdx).join("\n").length + (startIdx > 0 ? 1 : 0);
          const endChar = lines.slice(0, endIdx + 1).join("\n").length;

          setTimeout(() => {
            if (editorRef.current) {
              editorRef.current.scrollTop = Math.max(0, (startIdx * 20) - 100);
              editorRef.current.focus();
              editorRef.current.setSelectionRange(startChar, endChar);
            }
          }, 100);
        }
      }
    }
  }, [pickerSelection]);

  const handleAutoReplace = () => {
    if (!pickerSelection?.subSectionText || !pastedContent) return;
    
    // We try to find a block (e.g. <TopicHeader ... /> or <WhyBox>...</WhyBox>)
    // Since regex for nested JSX is impossible, we'll try a naive approach:
    // Find the line with the target text. Scan up to find the nearest '<[A-Z]'.
    // Then scan down to find the closing tag.
    const lines = mergedContent.split("\n");
    const targetIdx = lines.findIndex(l => l.includes(pickerSelection.subSectionText!));
    if (targetIdx === -1) {
      setErrorMessage("Could not find the target text in the source code to auto-replace.");
      return;
    }

    let startIdx = targetIdx;
    while (startIdx > 0 && !lines[startIdx].match(/<[A-Z]/)) {
      startIdx--;
    }

    let endIdx = targetIdx;
    let openTags = 0;
    let foundStart = false;
    
    // A very simple tag counter
    for (let i = startIdx; i < lines.length; i++) {
      const line = lines[i];
      const opens = (line.match(/<[A-Z][a-zA-Z0-9]*/g) || []).length;
      const selfCloses = (line.match(/\/>/g) || []).length;
      const closes = (line.match(/<\/[A-Z][a-zA-Z0-9]*/g) || []).length;
      
      openTags += opens - selfCloses - closes;
      
      if (opens > 0) foundStart = true;
      
      if (foundStart && openTags <= 0) {
        endIdx = i;
        break;
      }
    }

    // Replace the block
    const newLines = [
      ...lines.slice(0, startIdx),
      pastedContent,
      ...lines.slice(endIdx + 1)
    ];
    setMergedContent(newLines.join("\n"));
  };

  // Can the user proceed to apply?
  const canApply = pickerSelection !== null && diffReviewed && mergedContent.trim().length > 10;

  const handleStartManualSelection = () => {
    if (!pastedContent.trim()) return;
    setStep("reviewing");
    setPickerSelection(null);
    setDiffReviewed(false);
    setErrorMessage("");
  };

  const handleApply = useCallback(async () => {
    if (!canApply || !pickerSelection) return;
    setStep("confirming");

    try {
      const record = await applyImprovement({
        filePath: pickerSelection.section.filePath,
        newContent: mergedContent,
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
  }, [canApply, pickerSelection, mergedContent, description, onImprovementApplied]);

  const handleReset = () => {
    setPastedContent("");
    setStep("paste");
    setPickerSelection(null);
    setMergedContent("");
    setDescription("");
    setErrorMessage("");
    setSuccessRecord(null);
    setDiffReviewed(false);
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

  return (
    <div className="flex flex-col gap-6">

      {/* ── Step 1: Paste ── */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            1 · Paste Improved Section Content
          </label>
          {pastedContent && (
            <button
              onClick={() => { setPastedContent(""); if (step !== "paste") setStep("paste"); }}
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
            if (step !== "paste") { setStep("paste"); setPickerSelection(null); setDiffReviewed(false); }
          }}
          placeholder={`Paste the full updated section .tsx file here...\n\nexport function MethodsSection() {\n  return (\n    <SectionContainer number={4} title="Methods">\n      ...\n    </SectionContainer>\n  );\n}`}
          className="w-full h-44 bg-[#0d1117] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-slate-300 placeholder-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 resize-none transition-all leading-5"
          spellCheck={false}
        />
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-700">
            {pastedContent.length.toLocaleString()} chars · {pastedContent.split("\n").length} lines
          </span>
          <button
            onClick={handleStartManualSelection}
            disabled={pastedContent.trim().length < 20}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm transition-all shadow-lg shadow-indigo-900/20"
          >
            <IcBolt /> Select Target Section
          </button>
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

      {/* ── Step 2 + 3: Lesson structure picker ── */}
      {(step === "reviewing" || step === "confirming") && (
        <div className="flex flex-col gap-4">

          {/* ── Step 2: Lesson structure picker ── */}
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/20 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-700/30 bg-slate-800/40 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                2 · Select Target Section
              </span>
              {pickerSelection && (
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Section confirmed
                </span>
              )}
            </div>
            <div className="p-4">
              <LessonStructurePicker
                onSelectionChange={(sel) => {
                  setPickerSelection(sel);
                  setDiffReviewed(false);
                }}
              />
            </div>
          </div>

          {/* ── Step 3: Merge Editor ── */}
          {pickerSelection && (
            <div className="rounded-2xl border border-slate-700/40 bg-slate-800/20 overflow-hidden">
              <div className="px-4 py-3 border-b border-slate-700/30 bg-slate-800/40 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">
                  3 · Merge Improvement
                </span>
                {pickerSelection.subSectionText && (
                  <span className="text-[10px] text-indigo-400 font-bold bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-500/20">
                    Target: {pickerSelection.subSectionText}
                  </span>
                )}
              </div>
              <div className="p-4 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">
                    You are editing the full file <code className="text-slate-300 font-bold">{pickerSelection.section.fileName}</code>. 
                    Paste your improvements in the correct spot below.
                  </p>
                  {pickerSelection.subSectionText && (
                    <button
                      onClick={handleAutoReplace}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[11px] transition-all flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                      </svg>
                      Auto-Replace Block
                    </button>
                  )}
                </div>
                <textarea
                  ref={editorRef}
                  value={mergedContent}
                  onChange={(e) => {
                    setMergedContent(e.target.value);
                    setDiffReviewed(false);
                  }}
                  className="w-full h-[500px] bg-[#0d1117] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y leading-5 whitespace-pre"
                  spellCheck={false}
                />
              </div>
            </div>
          )}

          {/* ── Step 3: Diff Preview ── */}
          {pickerSelection && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                  3 · Review Changes
                </span>
                <div className="flex items-center gap-2">
                  {diffReviewed ? (
                    <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Reviewed
                    </span>
                  ) : (
                    <span className="text-[10px] text-amber-500 font-bold">Review the diff below before applying</span>
                  )}
                </div>
              </div>

              <DiffViewer
                oldContent={pickerSelection.currentContent}
                newContent={mergedContent}
                oldLabel={`Current: ${pickerSelection.section.fileName}`}
                newLabel="Your Improvement"
              />

              {/* Mark as reviewed checkbox */}
              {!diffReviewed && (
                <label className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-800/40 border border-slate-700/30 cursor-pointer hover:border-slate-600/40 transition-all">
                  <input
                    type="checkbox"
                    onChange={(e) => setDiffReviewed(e.target.checked)}
                    className="w-4 h-4 rounded accent-indigo-500"
                  />
                  <span className="text-xs text-slate-300">
                    I have reviewed the diff and the changes look correct
                  </span>
                </label>
              )}
            </div>
          )}

          {/* ── Step 4: Confirm & Apply ── */}
          {canApply && (
            <div className="flex flex-col gap-3 border-t border-slate-700/30 pt-4">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                4 · Apply
              </span>

              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Optional description (e.g. 'Rewrote method chaining examples with better analogies')"
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              />

              <div className="flex items-center gap-2 text-xs text-slate-600 px-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                </svg>
                Writing to:{" "}
                <span className="font-mono text-slate-400">{pickerSelection!.section.filePath}</span>
              </div>

              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={handleReset}
                  className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleApply}
                  disabled={step === "confirming"}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold text-sm transition-all shadow-lg shadow-emerald-900/20"
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
          )}
        </div>
      )}
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
