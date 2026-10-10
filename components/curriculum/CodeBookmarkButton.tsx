"use client";

import { useState, useEffect } from "react";
import {
  isCodeBookmarked,
  toggleBookmark,
} from "@/lib/notes-bookmarks";

interface CodeBookmarkButtonProps {
  trackKey: string;
  lessonSlug: string;
  title: string;
  code: string;
  language?: string;
  sectionId?: string;
  className?: string;
}

export function CodeBookmarkButton({
  trackKey,
  lessonSlug,
  title,
  code,
  language = "typescript",
  sectionId,
  className = "",
}: CodeBookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    setBookmarked(isCodeBookmarked(trackKey, lessonSlug, code));

    const handleUpdate = () => {
      setBookmarked(isCodeBookmarked(trackKey, lessonSlug, code));
    };

    window.addEventListener("learncraft-bookmarks-updated", handleUpdate);
    return () => {
      window.removeEventListener("learncraft-bookmarks-updated", handleUpdate);
    };
  }, [trackKey, lessonSlug, code]);

  const handleToggle = () => {
    const next = toggleBookmark(
      trackKey,
      lessonSlug,
      title,
      code,
      language,
      sectionId
    );
    setBookmarked(next);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <button
        type="button"
        onClick={handleToggle}
        title={bookmarked ? "Remove Bookmark" : "Bookmark Code Snippet"}
        className={`px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium transition-all flex items-center gap-1.5 cursor-pointer ${
          bookmarked
            ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30"
            : "bg-white/[0.04] text-slate-400 border border-white/[0.08] hover:text-white hover:bg-white/[0.08]"
        }`}
      >
        <span>{bookmarked ? "⭐" : "☆"}</span>
        <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
      </button>

      <button
        type="button"
        onClick={handleCopy}
        title="Copy Code"
        className="px-2 py-1 rounded-lg text-[11px] font-mono text-slate-400 bg-white/[0.04] border border-white/[0.08] hover:text-white hover:bg-white/[0.08] transition-all cursor-pointer"
      >
        {copied ? "✓ Copied" : "Copy"}
      </button>
    </div>
  );
}
