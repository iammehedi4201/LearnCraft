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

import { useState, useCallback, useEffect, useMemo } from "react";
import type { ImprovementRecord } from "@/lib/improvement-history";
import {
  loadHistory,
  applyImprovementPatch,
  undoImprovement,
  redoImprovement,
} from "@/lib/improvement-history";
import { DiffViewer } from "./DiffViewer";
import { LessonStructurePicker } from "./ManualPicker";
import type { MultiBlockSelection } from "@/lib/improve-types";
import {
  extractContentFields,
  applyFieldPatch,
  ContentField,
} from "@/lib/content-field-extractor";
import {
  parseSectionFileIntoSubSections,
  patchBlockField,
  SubSectionBlock,
} from "@/lib/section-parser";

// ─── Icons ────────────────────────────────────────────────────────────────────

const IcBolt = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IcHistory = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.02" />
  </svg>
);
const IcCompare = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="20" x2="18" y2="10" />
    <line x1="12" y1="20" x2="12" y2="4" />
    <line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);
const IcCheck = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IcX = () => (
  <svg
    className="w-4 h-4"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IcUndo = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9 14 4 9 9 4" />
    <path d="M20 20v-7a4 4 0 0 0-4-4H4" />
  </svg>
);
const IcRedo = () => (
  <svg
    className="w-3.5 h-3.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="15 14 20 9 15 4" />
    <path d="M4 20v-7a4 4 0 0 1 4-4h12" />
  </svg>
);

// ─── Section-Wise Component Editor ──────────────────────────────────────────

function SectionWiseEditor({
  block,
  editedContent,
  onChange,
}: {
  block: any;
  editedContent: string;
  onChange: (newContent: string) => void;
}) {
  const [viewMode, setViewMode] = useState<"sections" | "code">("sections");
  const [activeSubSectionId, setActiveSubSectionId] = useState<string | null>(null);
  const [editingBlock, setEditingBlock] = useState<{
    subSectionIndex: number;
    block: SubSectionBlock;
    values: Record<string, string>;
  } | null>(null);

  const subSections = useMemo(
    () => parseSectionFileIntoSubSections(editedContent),
    [editedContent],
  );

  // Auto-expand first sub-section by default
  useEffect(() => {
    if (!activeSubSectionId && subSections.length > 0) {
      setActiveSubSectionId(subSections[0].id);
    }
  }, [subSections, activeSubSectionId]);

  const handleStartEditBlock = (
    subSectionIndex: number,
    subBlock: SubSectionBlock,
  ) => {
    const initialValues: Record<string, string> = {};
    subBlock.fields.forEach((f) => {
      initialValues[f.key] = f.value;
    });
    setEditingBlock({
      subSectionIndex,
      block: subBlock,
      values: initialValues,
    });
  };

  const handleSaveBlockEdit = () => {
    if (!editingBlock) return;

    let patchedSource = editingBlock.block.rawSource;
    for (const [key, val] of Object.entries(editingBlock.values)) {
      patchedSource = patchBlockField(patchedSource, key, val);
    }

    if (editedContent.includes(editingBlock.block.rawSource)) {
      const newFileContent = editedContent.replace(
        editingBlock.block.rawSource,
        patchedSource,
      );
      onChange(newFileContent);
    }
    setEditingBlock(null);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* View Switcher Tabs */}
      <div className="flex items-center justify-between p-1 bg-slate-900/90 rounded-xl border border-slate-800">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setViewMode("sections");
              setEditingBlock(null);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "sections"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <span>🗂️</span>
            Section-Wise Blocks
            <span className="px-1.5 py-0.2 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-[10px] text-indigo-300">
              {subSections.length}
            </span>
          </button>

          <button
            onClick={() => {
              setViewMode("code");
              setEditingBlock(null);
            }}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              viewMode === "code"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-900/20"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
            }`}
          >
            <span>💻</span>
            Raw Source Code
          </button>
        </div>

        {editedContent !== block.currentBlockContent && (
          <button
            onClick={() => onChange(block.currentBlockContent)}
            className="text-[11px] text-emerald-400 hover:text-emerald-300 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 transition-colors flex items-center gap-1.5"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Revert all changes
          </button>
        )}
      </div>

      {/* ── MODE 1: Section-Wise Structured Editor ── */}
      {viewMode === "sections" && (
        <div className="flex flex-col gap-3">
          {/* Active Modal / Inline Block Editor */}
          {editingBlock ? (
            <div className="flex flex-col gap-4 p-5 bg-slate-900/90 rounded-2xl border border-indigo-500/40 shadow-xl animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{editingBlock.block.icon}</span>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-indigo-400">
                      Editing {editingBlock.block.type}
                    </span>
                    <h4 className="text-sm font-bold text-slate-200">
                      {editingBlock.block.label}
                    </h4>
                  </div>
                </div>
                <button
                  onClick={() => setEditingBlock(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <IcX />
                </button>
              </div>

              {/* Form Fields for this specific block */}
              <div className="flex flex-col gap-3.5">
                {editingBlock.block.fields.map((field) => (
                  <div key={field.key} className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {field.label}
                    </label>
                    {field.multiline || field.isCode ? (
                      <textarea
                        value={editingBlock.values[field.key] ?? field.value}
                        onChange={(e) =>
                          setEditingBlock({
                            ...editingBlock,
                            values: {
                              ...editingBlock.values,
                              [field.key]: e.target.value,
                            },
                          })
                        }
                        className={`w-full min-h-[100px] bg-[#0d1117] border border-slate-700/70 rounded-xl p-3 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y leading-relaxed ${
                          field.isCode ? "font-mono" : ""
                        }`}
                        wrap="soft"
                        spellCheck={false}
                      />
                    ) : (
                      <input
                        type="text"
                        value={editingBlock.values[field.key] ?? field.value}
                        onChange={(e) =>
                          setEditingBlock({
                            ...editingBlock,
                            values: {
                              ...editingBlock.values,
                              [field.key]: e.target.value,
                            },
                          })
                        }
                        className="w-full bg-[#0d1117] border border-slate-700/70 rounded-xl px-3.5 py-2 text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                      />
                    )}
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-800">
                <button
                  onClick={() => setEditingBlock(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveBlockEdit}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-900/20"
                >
                  Save to Section
                </button>
              </div>
            </div>
          ) : (
            /* Sub-Sections Accordion List */
            <div className="flex flex-col gap-3">
              {subSections.map((sub, idx) => {
                const isOpen = activeSubSectionId === sub.id;
                return (
                  <div
                    key={sub.id}
                    className={`rounded-2xl border transition-all overflow-hidden ${
                      isOpen
                        ? "border-indigo-500/40 bg-slate-900/70 shadow-lg"
                        : "border-slate-800/80 bg-slate-900/30 hover:border-slate-700/80 hover:bg-slate-900/50"
                    }`}
                  >
                    {/* Header */}
                    <button
                      onClick={() =>
                        setActiveSubSectionId(isOpen ? null : sub.id)
                      }
                      className="w-full px-4 py-3.5 flex items-center justify-between text-left transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-bold text-xs flex items-center justify-center">
                          {sub.number || idx + 1}
                        </span>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-200 tracking-tight">
                            {sub.title}
                          </span>
                          {sub.description && (
                            <span className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                              {sub.description}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-500">
                          {sub.blocks.length} block{sub.blocks.length === 1 ? "" : "s"}
                        </span>
                        <svg
                          className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </button>

                    {/* Content (Expanded) */}
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 flex flex-col gap-2.5 border-t border-slate-800/60">
                        {sub.blocks.length > 0 ? (
                          sub.blocks.map((subBlock) => (
                            <div
                              key={subBlock.id}
                              className="p-3 bg-slate-950/60 hover:bg-slate-950/90 border border-slate-800/80 hover:border-indigo-500/30 rounded-xl flex items-center justify-between transition-all group"
                            >
                              <div className="flex items-center gap-3 min-w-0 pr-3">
                                <span className="text-base flex-shrink-0">
                                  {subBlock.icon}
                                </span>
                                <div className="flex flex-col min-w-0">
                                  <span className="text-xs font-bold text-slate-200 truncate">
                                    {subBlock.label}
                                  </span>
                                  <span className="text-[10px] text-slate-500 font-mono">
                                    {subBlock.fields
                                      .map((f) => f.label)
                                      .join(" • ")}
                                  </span>
                                </div>
                              </div>

                              <button
                                onClick={() => handleStartEditBlock(idx, subBlock)}
                                className="px-3 py-1.5 rounded-lg bg-indigo-600/10 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 text-xs font-semibold flex items-center gap-1.5 transition-colors flex-shrink-0 group-hover:border-indigo-400"
                              >
                                Edit Block ✏️
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="py-4 text-center text-xs text-slate-500 italic">
                            No structured components detected in this sub-section.
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── MODE 2: Raw Full Code Editor ── */}
      {viewMode === "code" && (
        <div className="flex flex-col gap-2">
          <textarea
            value={editedContent}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[350px] bg-[#0d1117] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y leading-5 whitespace-pre-wrap break-words overflow-x-hidden"
            wrap="soft"
            spellCheck={false}
          />
        </div>
      )}

      {/* Global Diff Preview */}
      {editedContent !== block.currentBlockContent && (
        <div className="mt-2 border border-slate-700/30 rounded-xl overflow-hidden">
          <div className="bg-slate-800/40 px-3 py-1.5 border-b border-slate-700/30 text-[10px] font-black uppercase tracking-wider text-slate-500 flex items-center justify-between">
            <span>Diff Preview (Entire Section)</span>
            <span className="text-emerald-400 font-normal lowercase">modified</span>
          </div>
          <DiffViewer
            oldContent={block.currentBlockContent}
            newContent={editedContent}
            oldLabel="Original"
            newLabel="Improved"
          />
        </div>
      )}
    </div>
  );
}

// ─── Single Block Editor (For individual component selection) ────────────────

function SmartBlockEditor({
  block,
  editedContent,
  onChange,
}: {
  block: any;
  editedContent: string;
  onChange: (newContent: string) => void;
}) {
  // If whole section or entire file is selected, use the SectionWiseEditor
  if (block.type === "section" || block.id === "section:all") {
    return (
      <SectionWiseEditor
        block={block}
        editedContent={editedContent}
        onChange={onChange}
      />
    );
  }

  const [activeFieldKey, setActiveFieldKey] = useState<string | null>(null);
  const [fieldValue, setFieldValue] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const fields = useMemo(
    () => extractContentFields(editedContent),
    [editedContent],
  );
  const activeField = fields.find((f) => f.key === activeFieldKey) || null;

  const handleFieldClick = (field: ContentField) => {
    setActiveFieldKey(field.key);
    setFieldValue(field.currentValue);
  };

  const applyFieldEdit = () => {
    if (!activeField) return;
    const newBlockSource = applyFieldPatch(
      editedContent,
      activeField,
      fieldValue,
    );
    onChange(newBlockSource);
    setActiveFieldKey(null);
  };

  const contentFields = fields.filter((f) => f.category === "content");
  const configFields = fields.filter((f) => f.category === "config");

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Source Editor */}
      <div className="flex flex-col gap-2">
        <span className="text-xs text-slate-400">Block Source</span>
        <textarea
          value={editedContent}
          onChange={(e) => onChange(e.target.value)}
          className="w-full min-h-[180px] bg-[#0d1117] border border-slate-700/60 rounded-xl p-4 font-mono text-xs text-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y transition-all leading-5 whitespace-pre-wrap break-words overflow-x-hidden"
          wrap="soft"
          spellCheck={false}
        />

        {/* Diff preview */}
        {editedContent !== block.currentBlockContent && (
          <div className="mt-2 border border-slate-700/30 rounded-xl overflow-hidden">
            <div className="bg-slate-800/40 px-3 py-1.5 border-b border-slate-700/30 text-[10px] font-black uppercase tracking-wider text-slate-500">
              Diff Preview
            </div>
            <DiffViewer
              oldContent={block.currentBlockContent}
              newContent={editedContent}
              oldLabel="Original"
              newLabel="Edited"
            />
          </div>
        )}
      </div>

      {/* 2. Focused Field Editor */}
      {activeField ? (
        <div className="flex flex-col gap-3 p-4 bg-slate-900/50 rounded-xl border border-indigo-500/30">
          <button
            onClick={() => setActiveFieldKey(null)}
            className="self-start flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            ← Back to Fields
          </button>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Editing Field
            </span>
            <span className="text-sm font-bold text-indigo-300">
              {activeField.label}
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Current Value
            </span>
            <div className="p-3 bg-slate-800/40 rounded-lg border border-slate-700/50 text-sm text-slate-300 font-mono whitespace-pre-wrap">
              {activeField.currentValue || (
                <span className="opacity-50 italic">Empty</span>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
              Improved Value
            </span>
            <textarea
              value={fieldValue}
              onChange={(e) => setFieldValue(e.target.value)}
              className="w-full min-h-[120px] bg-[#0d1117] border border-slate-700/60 rounded-xl p-3 font-mono text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y transition-all leading-relaxed whitespace-pre-wrap break-words"
              wrap="soft"
              spellCheck={false}
            />
          </div>

          <div className="flex justify-end gap-3 mt-2">
            <button
              onClick={() => setActiveFieldKey(null)}
              className="px-4 py-2 rounded-xl text-sm font-bold text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={applyFieldEdit}
              disabled={fieldValue === activeField.currentValue}
              className="px-5 py-2 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white transition-all shadow-lg shadow-indigo-900/20"
            >
              Apply to Block
            </button>
          </div>
        </div>
      ) : (
        <>
          {contentFields.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                Editable Content Fields
              </span>
              <div className="flex flex-wrap gap-2">
                {contentFields.map((f) => (
                  <button
                    key={f.key}
                    onClick={() => handleFieldClick(f)}
                    className="px-3 py-1.5 bg-indigo-950/30 border border-indigo-500/30 hover:border-indigo-400 hover:bg-indigo-900/50 rounded-lg text-sm text-indigo-300 transition-all font-medium flex items-center gap-2"
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {configFields.length > 0 && (
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-slate-700/30">
              <button
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="self-start text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-300 flex items-center gap-1 transition-colors"
              >
                <svg
                  className={`w-3 h-3 transition-transform ${showAdvanced ? "rotate-90" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                Advanced Configuration
              </button>

              {showAdvanced && (
                <div className="flex flex-wrap gap-2 mt-1">
                  {configFields.map((f) => (
                    <button
                      key={f.key}
                      onClick={() => handleFieldClick(f)}
                      className="px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 hover:border-slate-500 hover:bg-slate-700/50 rounded-lg text-sm text-slate-300 transition-all font-medium"
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

// ─── Apply Tab ────────────────────────────────────────────────────────────────

type ApplyStep = "idle" | "section-selected" | "confirming" | "done" | "error";

function ApplyTab({
  onImprovementApplied,
}: {
  onImprovementApplied: () => void;
}) {
  const [step, setStep] = useState<ApplyStep>("idle");
  const [pickerSelection, setPickerSelection] =
    useState<MultiBlockSelection | null>(null);
  const [blockEdits, setBlockEdits] = useState<Record<string, string>>({});
  const [description, setDescription] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successRecord, setSuccessRecord] = useState<ImprovementRecord | null>(
    null,
  );

  // When selection changes, reset step and block edits
  const handleSelectionChange = useCallback(
    (sel: MultiBlockSelection | null) => {
      if (!sel || sel.blocks.length === 0) {
        setPickerSelection(null);
        setStep("idle");
        setBlockEdits({});
        return;
      }
      setPickerSelection(sel);
      setStep("section-selected");
      const initialEdits: Record<string, string> = {};
      sel.blocks.forEach((b) => {
        initialEdits[b.id] = b.currentBlockContent;
      });
      setBlockEdits(initialEdits);
    },
    [],
  );

  const hasChanges =
    pickerSelection?.blocks.some(
      (b) => blockEdits[b.id] !== b.currentBlockContent,
    ) || false;
  const canApply = pickerSelection !== null && hasChanges;

  const handleApply = useCallback(async () => {
    if (!canApply || !pickerSelection) return;
    setStep("confirming");

    try {
      let lastRecord: ImprovementRecord | null = null;

      const blocksToApply = [...pickerSelection.blocks]
        .filter(
          (b) => blockEdits[b.id] && blockEdits[b.id] !== b.currentBlockContent,
        )
        .sort((a, b) => {
          const aStart = a.sourceRange?.startLine || 0;
          const bStart = b.sourceRange?.startLine || 0;
          return bStart - aStart; // descending line number sort
        });

      if (blocksToApply.length === 0) {
        throw new Error("No changes made to any blocks.");
      }

      for (const block of blocksToApply) {
        const editedContent = blockEdits[block.id];

        // Resolve sourceRange — fetch from API if missing
        let resolvedRange = block.sourceRange;
        if (!resolvedRange) {
          // Try file fetch first (for whole-section blocks)
          if (block.type === "section") {
            const res = await fetch(
              `/api/improve?action=file&path=${encodeURIComponent(pickerSelection.section.filePath)}`,
            );
            if (res.ok) {
              const data = await res.json();
              resolvedRange = {
                blockSource: data.content,
                startLine: 1,
                endLine: data.lines || data.content.split("\n").length,
              };
            }
          } else {
            // Try extract-block for individual blocks
            const res = await fetch(
              `/api/improve?action=extract-block&path=${encodeURIComponent(pickerSelection.section.filePath)}&blockType=${block.type}&blockIndex=${block.index}`,
            );
            if (res.ok) {
              const data = await res.json();
              resolvedRange = {
                blockSource: data.blockSource,
                startLine: data.startLine,
                endLine: data.endLine,
              };
            }
          }
        }

        if (!resolvedRange) {
          throw new Error(
            `Could not locate block "${block.label}" in the source file. Please re-select the block and try again.`,
          );
        }

        lastRecord = await applyImprovementPatch({
          filePath: pickerSelection.section.filePath,
          startLine: resolvedRange.startLine,
          endLine: resolvedRange.endLine,
          newBlockSource: editedContent,
          topic: {
            id: pickerSelection.topicId,
            title: pickerSelection.topicId,
          },
          lesson: {
            slug: pickerSelection.lessonSlug,
            name: pickerSelection.lessonSlug,
          },
          section: pickerSelection.section,
          description:
            description ||
            `Updated ${pickerSelection.section.fileName} (${block.label})`,
        });
      }

      setSuccessRecord(lastRecord);
      setStep("done");
      onImprovementApplied();
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Failed to apply improvement",
      );
      setStep("error");
    }
  }, [
    canApply,
    pickerSelection,
    blockEdits,
    description,
    onImprovementApplied,
  ]);

  const handleReset = () => {
    setStep("idle");
    setPickerSelection(null);
    setBlockEdits({});
    setDescription("");
    setErrorMessage("");
    setSuccessRecord(null);
  };

  // ── Done ──
  if (step === "done" && successRecord) {
    return (
      <div className="flex flex-col items-center gap-6 py-16 text-center">
        <div className="w-16 h-16 rounded-full bg-emerald-950/60 border-2 border-emerald-500/50 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-emerald-400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg font-black text-slate-100">
            Improvement Applied
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            <span className="font-mono text-slate-300">
              {successRecord.section.fileName}
            </span>{" "}
            updated and saved to history.
          </p>
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

  const isSectionDone = pickerSelection !== null;
  const progressStep = isSectionDone ? 2 : 1;

  return (
    <div className="flex flex-col gap-6">
      {/* ── Progress Bar ── */}
      <div className="flex items-center justify-between p-1 bg-slate-900/80 rounded-2xl border border-slate-800/80">
        <div
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${progressStep === 1 ? "bg-indigo-600/20 text-indigo-300 font-bold" : "text-slate-500"}`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${progressStep > 1 ? "bg-emerald-500/20 text-emerald-400" : progressStep === 1 ? "bg-indigo-500 text-white" : "bg-slate-800"}`}
          >
            {progressStep > 1 ? <IcCheck /> : "1"}
          </div>
          Click blocks in Preview
        </div>
        <svg
          className="w-4 h-4 text-slate-700 shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <polyline points="9 18 15 12 9 6" />
        </svg>
        <div
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl transition-all ${progressStep === 2 ? "bg-indigo-600/20 text-indigo-300 font-bold" : "text-slate-500"}`}
        >
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${progressStep === 2 ? "bg-indigo-500 text-white" : "bg-slate-800"}`}
          >
            2
          </div>
          Edit inline & Apply
        </div>
      </div>

      {/* ── Error ── */}
      {step === "error" && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-950/40 border border-red-500/30 text-sm text-red-300">
          <svg
            className="w-4 h-4 mt-0.5 shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {errorMessage}
        </div>
      )}

      {/* ── Two-Column Layout ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[55%_45%] gap-6">
        {/* Left Column */}
        <div className="min-w-0 flex flex-col">
          <div className="rounded-2xl border border-slate-700/40 bg-slate-800/20">
            <div className="p-4 bg-slate-800/40 rounded-2xl">
              <LessonStructurePicker
                onSelectionChange={handleSelectionChange}
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="min-w-0 flex flex-col gap-4">
          {/* Awaiting Selection State */}
          {(!pickerSelection || pickerSelection.blocks.length === 0) && (
            <div className="flex items-center justify-center py-10 rounded-xl border border-indigo-500/20 bg-indigo-950/10 text-indigo-400 text-sm gap-2 animate-pulse">
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
                <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
                <path d="M2 2l7.586 7.586"></path>
                <circle cx="11" cy="11" r="2"></circle>
              </svg>
              Select blocks in the left preview panel to edit
            </div>
          )}

          {/* Inline Editors & Apply */}
          {pickerSelection && pickerSelection.blocks.length > 0 && (
            <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center">
                    <IcCheck />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black uppercase text-indigo-500/70">
                      {pickerSelection.blocks.length === 1 &&
                      pickerSelection.blocks[0].id === "section:all"
                        ? "Whole Section Target"
                        : "Target Section"}
                    </span>
                    <span className="text-sm font-bold text-indigo-300">
                      {pickerSelection.section.title}{" "}
                      <span className="text-xs font-mono text-indigo-400/60 font-normal">
                        ({pickerSelection.section.fileName})
                      </span>
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleSelectionChange(null)}
                  className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
                >
                  <IcX />
                  Clear Selection
                </button>
              </div>

              {pickerSelection.blocks.map((block) => (
                <div key={block.id} className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      {block.label}
                    </span>
                    {block.sourceRange && (
                      <span className="text-[9px] font-mono text-slate-600">
                        Lines {block.sourceRange.startLine}-
                        {block.sourceRange.endLine}
                      </span>
                    )}
                  </div>
                  <SmartBlockEditor
                    block={block}
                    editedContent={blockEdits[block.id] || ""}
                    onChange={(newContent) =>
                      setBlockEdits((prev) => ({
                        ...prev,
                        [block.id]: newContent,
                      }))
                    }
                  />
                </div>
              ))}

              {/* Apply Bar */}
              <div className="flex flex-col gap-3 pt-4 border-t border-slate-700/30 mt-4">
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Optional description (e.g. 'Rewrote method chaining examples')"
                  className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl px-4 py-2.5 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => handleSelectionChange(null)}
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
                        <svg
                          className="w-4 h-4 animate-spin"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                        </svg>
                        Applying...
                      </>
                    ) : (
                      <>
                        <IcCheck /> Apply Improvement
                      </>
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
  const dateStr = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  const timeStr = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={`rounded-2xl border bg-slate-800/40 overflow-hidden transition-all duration-200 ${record.undone ? "border-slate-700/20 opacity-55" : "border-slate-700/50 hover:border-slate-600/50"}`}
    >
      <div className="flex items-start justify-between gap-3 px-4 py-3 border-b border-slate-700/30 bg-slate-800/60">
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap text-[10px]">
            <span className="font-black text-indigo-400">
              {record.topic.title}
            </span>
            <span className="text-slate-700">›</span>
            <span className="font-mono text-slate-500 truncate">
              {record.lesson.slug}
            </span>
            <span className="text-slate-700">›</span>
            <span className="font-mono text-slate-400">
              {record.section.fileName}
            </span>
          </div>
          <p className="text-xs text-slate-300 font-medium truncate">
            {record.description}
          </p>
        </div>
        <div className="flex flex-col items-end shrink-0 gap-0.5">
          <span className="text-[10px] font-bold text-slate-400">
            {dateStr}
          </span>
          <span className="text-[10px] text-slate-600">{timeStr}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-3 px-4 py-2.5">
        <div className="flex items-center gap-3 text-[11px] font-mono">
          {record.stats.linesAdded > 0 && (
            <span className="text-emerald-400 font-bold">
              +{record.stats.linesAdded}
            </span>
          )}
          {record.stats.linesRemoved > 0 && (
            <span className="text-red-400 font-bold">
              −{record.stats.linesRemoved}
            </span>
          )}
          <span className="text-slate-600">
            {record.stats.totalLinesOld}→{record.stats.totalLinesNew} lines
          </span>
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
  const [filterTopic, setFilterTopic] = useState("");

  const lessonSlugs = Array.from(new Set(records.map((r) => r.lesson.slug)));
  const topicIds = Array.from(new Set(records.map((r) => r.topic.id)));
  const filtered = records
    .filter((r) => !filterLesson || r.lesson.slug === filterLesson)
    .filter((r) => !filterTopic || r.topic.id === filterTopic);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-16 text-slate-600 gap-2">
        <svg
          className="w-4 h-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
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
            {
              value: filterTopic,
              setter: setFilterTopic,
              options: topicIds,
              placeholder: "All topics",
            },
            {
              value: filterLesson,
              setter: setFilterLesson,
              options: lessonSlugs,
              placeholder: "All lessons",
            },
          ].map(({ value, setter, options, placeholder }) => (
            <select
              key={placeholder}
              value={value}
              onChange={(e) => setter(e.target.value)}
              className="appearance-none bg-slate-800/60 border border-slate-700/50 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-300 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
            >
              <option value="">{placeholder}</option>
              {options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ))}
          {(filterTopic || filterLesson) && (
            <button
              onClick={() => {
                setFilterTopic("");
                setFilterLesson("");
              }}
              className="text-xs text-slate-600 hover:text-slate-400 flex items-center gap-1 transition-colors"
            >
              <IcX />
              Clear
            </button>
          )}
          <span className="text-xs text-slate-600 ml-auto">
            {filtered.length} record{filtered.length !== 1 ? "s" : ""}
          </span>
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
            <p className="text-sm text-slate-600 text-center py-8">
              No records match the filter.
            </p>
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
        <p className="text-sm">
          Select "Diff" on a history record to compare versions here.
        </p>
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
        <span className="font-mono text-slate-300">
          {record.section.fileName}
        </span>
        <span className="text-slate-600 ml-2">
          {new Date(record.timestamp).toLocaleString()}
        </span>
        {record.undone && (
          <span className="text-[10px] font-bold text-amber-500 uppercase tracking-wider px-2 py-0.5 rounded-full border border-amber-500/30 bg-amber-950/30">
            Reverted
          </span>
        )}
      </div>
      {record.description && (
        <p className="text-sm text-slate-400 italic">
          &ldquo;{record.description}&rdquo;
        </p>
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
  const [activeTab, setActiveTab] = useState<Tab>("apply");
  const [history, setHistory] = useState<ImprovementRecord[]>([]);
  const [isHistoryLoading, setHistoryLoad] = useState(false);
  const [compareRecord, setCompareRecord] = useState<ImprovementRecord | null>(
    null,
  );
  const [actionLoading, setActionLoading] = useState(false);

  const fetchHistory = useCallback(async () => {
    setHistoryLoad(true);
    try {
      const records = await loadHistory();
      setHistory(records);
    } finally {
      setHistoryLoad(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const handleUndo = async (id: string) => {
    setActionLoading(true);
    try {
      await undoImprovement(id);
      await fetchHistory();
    } finally {
      setActionLoading(false);
    }
  };

  const handleRedo = async (id: string) => {
    setActionLoading(true);
    try {
      await redoImprovement(id);
      await fetchHistory();
    } finally {
      setActionLoading(false);
    }
  };

  const handleViewDiff = (record: ImprovementRecord) => {
    setCompareRecord(record);
    setActiveTab("compare");
  };

  const TABS: {
    id: Tab;
    label: string;
    icon: React.ReactNode;
    count?: number;
  }[] = [
    { id: "apply", label: "Apply", icon: <IcBolt /> },
    {
      id: "history",
      label: "History",
      icon: <IcHistory />,
      count: history.length || undefined,
    },
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
              ${
                activeTab === tab.id
                  ? "text-indigo-300 bg-slate-800/60 border-b-2 border-indigo-500 -mb-px"
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800/30"
              }
            `}
          >
            {tab.icon}
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? "bg-indigo-500/30 text-indigo-300" : "bg-slate-700 text-slate-500"}`}
              >
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
