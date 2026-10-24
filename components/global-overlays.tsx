"use client";

import dynamic from "next/dynamic";

const ReadingControlPanel = dynamic(
  () =>
    import("@/components/reading-mode/reading-control-panel").then(
      (mod) => mod.ReadingControlPanel
    ),
  { ssr: false }
);

const SelectionToolbar = dynamic(
  () =>
    import("@/components/revision/SelectionToolbar").then(
      (mod) => mod.SelectionToolbar
    ),
  { ssr: false }
);

const NoteDialog = dynamic(
  () =>
    import("@/components/revision/NoteDialog").then((mod) => mod.NoteDialog),
  { ssr: false }
);

const ExistingHighlightPopover = dynamic(
  () =>
    import("@/components/revision/ExistingHighlightPopover").then(
      (mod) => mod.ExistingHighlightPopover
    ),
  { ssr: false }
);

const LessonAnnotationLayer = dynamic(
  () =>
    import("@/components/revision/LessonAnnotationLayer").then(
      (mod) => mod.LessonAnnotationLayer
    ),
  { ssr: false }
);

const LessonImprovementOverlay = dynamic(
  () =>
    import("@/components/improve/LessonImprovementOverlay").then(
      (mod) => mod.LessonImprovementOverlay
    ),
  { ssr: false }
);

const CommandPalette = dynamic(
  () =>
    import("@/components/command-palette/CommandPalette").then(
      (mod) => mod.CommandPalette
    ),
  { ssr: false }
);

export function GlobalOverlays(): JSX.Element {
  return (
    <>
      <ReadingControlPanel />
      <SelectionToolbar />
      <NoteDialog />
      <ExistingHighlightPopover />
      <LessonAnnotationLayer />
      <LessonImprovementOverlay />
      <CommandPalette />
    </>
  );
}
