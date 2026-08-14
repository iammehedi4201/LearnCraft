"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * REVISION CONTEXT & STATE MANAGER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Universal context provider that manages text selections, floating toolbars,
 * note creation modals, in-lesson highlight click popovers, and persistent storage.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  AnnotationItem,
  HighlightColor,
  RevisionStats,
  TextSelectionRangeData,
} from "@/types/revision";
import {
  getAllAnnotations,
  addAnnotation as storageAddAnnotation,
  updateAnnotation as storageUpdateAnnotation,
  deleteAnnotation as storageDeleteAnnotation,
  computeRevisionStats,
  REVISION_EVENT_NAME,
} from "@/lib/revision-storage";
import { resolveLessonInfo } from "@/lib/topic-registry";

interface ExistingPopoverState {
  annotation: AnnotationItem;
  rect: {
    top: number;
    left: number;
    bottom: number;
    right: number;
    width: number;
    height: number;
  };
}

interface RevisionContextType {
  annotations: AnnotationItem[];
  stats: RevisionStats;
  currentLessonAnnotations: AnnotationItem[];
  activeSelection: TextSelectionRangeData | null;
  isNoteDialogOpen: boolean;
  editingAnnotation: AnnotationItem | null;
  existingHighlightPopover: ExistingPopoverState | null;
  // Actions
  addHighlight: (color?: HighlightColor) => AnnotationItem | null;
  openNoteDialog: (existingAnnotation?: AnnotationItem) => void;
  closeNoteDialog: () => void;
  saveNote: (
    noteText: string,
    color?: HighlightColor,
    questionText?: string
  ) => AnnotationItem | null;
  updateNote: (id: string, noteText: string) => void;
  deleteAnnotation: (id: string) => void;
  openExistingHighlightPopover: (
    annotation: AnnotationItem,
    rect: DOMRect,
  ) => void;
  closeExistingHighlightPopover: () => void;
  clearSelection: () => void;
  toggleFavorite: (id: string) => void;
  toggleMastered: (id: string) => void;
}

const RevisionContext = createContext<RevisionContextType | undefined>(
  undefined,
);

export function RevisionProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const pathname = usePathname();
  const [annotations, setAnnotations] = useState<AnnotationItem[]>([]);
  const [activeSelection, setActiveSelection] =
    useState<TextSelectionRangeData | null>(null);
  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState<boolean>(false);
  const [editingAnnotation, setEditingAnnotation] =
    useState<AnnotationItem | null>(null);
  const [existingHighlightPopover, setExistingHighlightPopover] =
    useState<ExistingPopoverState | null>(null);

  // Load annotations from storage
  const reloadAnnotations = useCallback(() => {
    const data = getAllAnnotations();
    setAnnotations(data);
  }, []);

  // Initialize and listen for storage & sync events
  useEffect(() => {
    reloadAnnotations();

    const handleSync = () => reloadAnnotations();
    window.addEventListener(REVISION_EVENT_NAME, handleSync);
    window.addEventListener("storage", handleSync);

    return () => {
      window.removeEventListener(REVISION_EVENT_NAME, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [reloadAnnotations]);

  // Compute live statistics
  const stats = computeRevisionStats(annotations);

  // Filter annotations for current lesson
  const currentLessonAnnotations = React.useMemo(() => {
    if (!pathname) return [];
    const cleanPath = pathname.split("?")[0].split("#")[0].replace(/\/+$/, "");
    return annotations.filter((item) => {
      const itemClean = item.lessonPath
        .split("?")[0]
        .split("#")[0]
        .replace(/\/+$/, "");
      return itemClean === cleanPath;
    });
  }, [annotations, pathname]);

  // Text selection listener for lesson content
  useEffect(() => {
    const handleMouseUp = (e: MouseEvent) => {
      // Ignore clicks inside toolbars, popovers, or interactive inputs
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("[data-revision-ui]") ||
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "BUTTON"
      ) {
        return;
      }

      // Small delay to allow selection range to finalize
      setTimeout(() => {
        const selection = window.getSelection();
        if (!selection || selection.isCollapsed) {
          // If clicking outside and not on UI, clear active selection
          if (!target?.closest("[data-revision-ui]")) {
            setActiveSelection(null);
          }
          return;
        }

        const rawText = selection.toString();
        const trimmed = rawText.trim();

        // Require minimum selection length (at least 3 chars)
        if (trimmed.length < 3) {
          setActiveSelection(null);
          return;
        }

        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();

        if (rect.width === 0 && rect.height === 0) {
          setActiveSelection(null);
          return;
        }

        // Get surrounding context text for resilient matching
        let contextBefore = "";
        let contextAfter = "";
        try {
          const container = range.commonAncestorContainer;
          const fullText = container.textContent || "";
          const selStart = fullText.indexOf(trimmed);
          if (selStart !== -1) {
            contextBefore = fullText.substring(
              Math.max(0, selStart - 40),
              selStart,
            );
            contextAfter = fullText.substring(
              selStart + trimmed.length,
              Math.min(fullText.length, selStart + trimmed.length + 40),
            );
          }
        } catch {
          // Context extraction fallback
        }

        // Section anchor detection (if inside a part section)
        let sectionId: string | undefined = undefined;
        let node: HTMLElement | null = range.startContainer.parentElement;
        while (node && node !== document.body) {
          if (node.id && node.id.startsWith("part")) {
            sectionId = node.id;
            break;
          }
          node = node.parentElement;
        }

        setActiveSelection({
          text: trimmed,
          rect: {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height,
          },
          contextBefore,
          contextAfter,
          sectionId,
        });
      }, 10);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveSelection(null);
        setExistingHighlightPopover(null);
      }
    };

    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("touchend", handleMouseUp as any);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchend", handleMouseUp as any);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const clearSelection = useCallback(() => {
    setActiveSelection(null);
    try {
      window.getSelection()?.removeAllRanges();
    } catch {}
  }, []);

  // Add plain Highlight
  const addHighlight = useCallback(
    (color: HighlightColor = "feature"): AnnotationItem | null => {
      if (!activeSelection || !pathname) return null;

      const lessonInfo = resolveLessonInfo(pathname);

      const newItem = storageAddAnnotation({
        userId: "user_default",
        topicId: lessonInfo.topicId,
        topicTitle: lessonInfo.topicTitle,
        lessonId: lessonInfo.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        lessonTitle: lessonInfo.name,
        lessonPath: lessonInfo.path,
        sectionId: activeSelection.sectionId,
        selectedText: activeSelection.text,
        contextBefore: activeSelection.contextBefore,
        contextAfter: activeSelection.contextAfter,
        color,
      });

      clearSelection();
      reloadAnnotations();
      return newItem;
    },
    [activeSelection, pathname, clearSelection, reloadAnnotations],
  );

  // Open note dialog for creating or editing
  const openNoteDialog = useCallback((existingAnnotation?: AnnotationItem) => {
    if (existingAnnotation) {
      setEditingAnnotation(existingAnnotation);
    } else {
      setEditingAnnotation(null);
    }
    setIsNoteDialogOpen(true);
    setExistingHighlightPopover(null);
  }, []);

  const closeNoteDialog = useCallback(() => {
    setIsNoteDialogOpen(false);
    setEditingAnnotation(null);
  }, []);

  // Save Note (either creates a new annotation with note or updates existing)
  const saveNote = useCallback(
    (
      noteText: string,
      color: HighlightColor = "feature",
      questionText?: string,
    ): AnnotationItem | null => {
      if (editingAnnotation) {
        // Updating existing note
        const updated = storageUpdateAnnotation(editingAnnotation.id, {
          note: noteText ? noteText : undefined,
          question: questionText !== undefined ? (questionText ? questionText : undefined) : editingAnnotation.question,
          color,
        });
        closeNoteDialog();
        reloadAnnotations();
        return updated;
      }

      if (!activeSelection || !pathname) return null;

      const lessonInfo = resolveLessonInfo(pathname);

      const newItem = storageAddAnnotation({
        userId: "user_default",
        topicId: lessonInfo.topicId,
        topicTitle: lessonInfo.topicTitle,
        lessonId: lessonInfo.code.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        lessonTitle: lessonInfo.name,
        lessonPath: lessonInfo.path,
        sectionId: activeSelection.sectionId,
        selectedText: activeSelection.text,
        contextBefore: activeSelection.contextBefore,
        contextAfter: activeSelection.contextAfter,
        question: questionText ? questionText : undefined,
        note: noteText ? noteText : undefined,
        color,
      });

      clearSelection();
      closeNoteDialog();
      reloadAnnotations();
      return newItem;
    },
    [
      editingAnnotation,
      activeSelection,
      pathname,
      closeNoteDialog,
      clearSelection,
      reloadAnnotations,
    ],
  );

  // Update existing note
  const updateNote = useCallback(
    (id: string, noteText: string) => {
      storageUpdateAnnotation(id, { note: noteText });
      reloadAnnotations();
    },
    [reloadAnnotations],
  );

  // Delete annotation
  const deleteAnnotation = useCallback(
    (id: string) => {
      storageDeleteAnnotation(id);
      if (existingHighlightPopover?.annotation.id === id) {
        setExistingHighlightPopover(null);
      }
      reloadAnnotations();
    },
    [existingHighlightPopover, reloadAnnotations],
  );

  // Toggle favorite
  const toggleFavorite = useCallback(
    (id: string) => {
      const item = annotations.find((a) => a.id === id);
      if (item) {
        storageUpdateAnnotation(id, { isFavorite: !item.isFavorite });
        reloadAnnotations();
      }
    },
    [annotations, reloadAnnotations],
  );

  // Toggle mastered
  const toggleMastered = useCallback(
    (id: string) => {
      const item = annotations.find((a) => a.id === id);
      if (item) {
        storageUpdateAnnotation(id, { mastered: !item.mastered });
        reloadAnnotations();
      }
    },
    [annotations, reloadAnnotations],
  );

  // Open existing highlight in-lesson popover
  const openExistingHighlightPopover = useCallback(
    (annotation: AnnotationItem, rect: DOMRect) => {
      setActiveSelection(null);
      setExistingHighlightPopover({
        annotation,
        rect: {
          top: rect.top,
          left: rect.left,
          bottom: rect.bottom,
          right: rect.right,
          width: rect.width,
          height: rect.height,
        },
      });
    },
    [],
  );

  const closeExistingHighlightPopover = useCallback(() => {
    setExistingHighlightPopover(null);
  }, []);

  return (
    <RevisionContext.Provider
      value={{
        annotations,
        stats,
        currentLessonAnnotations,
        activeSelection,
        isNoteDialogOpen,
        editingAnnotation,
        existingHighlightPopover,
        addHighlight,
        openNoteDialog,
        closeNoteDialog,
        saveNote,
        updateNote,
        deleteAnnotation,
        openExistingHighlightPopover,
        closeExistingHighlightPopover,
        clearSelection,
        toggleFavorite,
        toggleMastered,
      }}
    >
      {children}
    </RevisionContext.Provider>
  );
}

export function useRevision(): RevisionContextType {
  const context = useContext(RevisionContext);
  if (!context) {
    throw new Error("useRevision must be used within a RevisionProvider");
  }
  return context;
}
