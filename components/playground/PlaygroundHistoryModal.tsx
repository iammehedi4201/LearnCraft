"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * PLAYGROUND HISTORY MODAL
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean modal dialog displaying code execution snapshots, enabling instant
 * restore and comparison of previous iterations.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState } from "react";
import { PlaygroundSnapshot, deletePlaygroundSnapshot } from "@/lib/playground-history";

interface PlaygroundHistoryModalProps {
  isOpen: boolean;
  contextKey: string;
  snapshots: PlaygroundSnapshot[];
  onClose: () => void;
  onRestore: (code: string) => void;
  onSnapshotsUpdated: () => void;
}

export function PlaygroundHistoryModal({
  isOpen,
  contextKey,
  snapshots,
  onClose,
  onRestore,
  onSnapshotsUpdated,
}: PlaygroundHistoryModalProps) {
  const [selectedSnapshotId, setSelectedSnapshotId] = useState<string | null>(
    snapshots[0]?.id || null
  );

  if (!isOpen) return null;

  const selectedSnapshot =
    snapshots.find((s) => s.id === selectedSnapshotId) || snapshots[0];

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deletePlaygroundSnapshot(contextKey, id);
    onSnapshotsUpdated();
    if (selectedSnapshotId === id) {
      setSelectedSnapshotId(snapshots.find((s) => s.id !== id)?.id || null);
    }
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0E121B] border border-white/[0.08] rounded-3xl p-6 sm:p-7 shadow-2xl z-10 animate-in zoom-in-95 duration-150 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-sm font-bold">
              🕒
            </span>
            <div>
              <h3 className="text-base font-bold text-white">Code Snapshot History</h3>
              <p className="text-xs text-slate-400">
                Browse and restore previous runs from this exercise
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Content Body: List on Left, Code Preview on Right */}
        {snapshots.length === 0 ? (
          <div className="py-16 text-center text-slate-400">
            <p className="text-sm">No saved runs yet for this exercise.</p>
            <p className="text-xs text-slate-500 mt-1">
              Run or check code to automatically save snapshots.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 flex-1 min-h-0">
            {/* Snapshots list */}
            <div className="md:col-span-4 space-y-2 overflow-y-auto pr-1 max-h-[50vh]">
              {snapshots.map((snap) => {
                const isSelected = snap.id === selectedSnapshot?.id;
                const timeStr = new Date(snap.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                });
                const dateStr = new Date(snap.timestamp).toLocaleDateString();

                return (
                  <div
                    key={snap.id}
                    onClick={() => setSelectedSnapshotId(snap.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all group ${
                      isSelected
                        ? "bg-purple-600/15 border-purple-500/40 text-white"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-400 hover:bg-white/[0.05] hover:text-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-mono font-bold text-slate-300">
                        {timeStr}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[9px] font-bold uppercase px-1.5 py-0.2 rounded ${
                            snap.status === "success" || snap.status === "tested"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : snap.status === "error"
                              ? "bg-rose-500/20 text-rose-300"
                              : "bg-white/10 text-slate-300"
                          }`}
                        >
                          {snap.status}
                        </span>
                        <button
                          onClick={(e) => handleDelete(snap.id, e)}
                          className="opacity-0 group-hover:opacity-100 p-0.5 text-slate-500 hover:text-rose-400 transition-opacity"
                          title="Delete snapshot"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 truncate">
                      {snap.preview}
                    </p>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      {dateStr} &middot; {snap.linesCount} lines
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Code Preview & Restore */}
            <div className="md:col-span-8 flex flex-col rounded-2xl bg-black/40 border border-white/[0.06] overflow-hidden min-h-0">
              <div className="flex items-center justify-between px-4 py-2 bg-white/[0.03] border-b border-white/[0.06] text-xs">
                <span className="text-slate-400 font-mono">
                  {selectedSnapshot ? `${selectedSnapshot.linesCount} lines` : ""}
                </span>
                {selectedSnapshot && (
                  <button
                    onClick={() => {
                      onRestore(selectedSnapshot.code);
                      onClose();
                    }}
                    className="px-3 py-1 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-all active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
                  >
                    <span>⚡ Restore this version</span>
                  </button>
                )}
              </div>

              <div className="p-4 overflow-y-auto flex-1 font-mono text-xs text-slate-200 leading-relaxed whitespace-pre select-text">
                {selectedSnapshot?.code}
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 shrink-0">
          <span>Automatic snapshots saved on each code run</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white font-bold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
