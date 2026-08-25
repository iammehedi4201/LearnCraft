import type { Metadata } from "next";
import { Inter, Rajdhani, Manrope } from "next/font/google";
import "./globals.css";
import "@/components/reading-control-panel.css";
import "@/components/playground/playground.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { ReadingControlPanel } from "@/components/reading-control-panel";
import { RevisionProvider } from "@/context/revision-context";
import { SelectionToolbar } from "@/components/revision/SelectionToolbar";
import { NoteDialog } from "@/components/revision/NoteDialog";
import { ExistingHighlightPopover } from "@/components/revision/ExistingHighlightPopover";
import { LessonAnnotationLayer } from "@/components/revision/LessonAnnotationLayer";
import { Suspense } from "react";
import { LessonImprovementOverlay } from "@/components/improve/LessonImprovementOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rajdhani",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-manrope",
});

export const metadata: Metadata = {
  title: "LearnCraft — Master Modern Web Tech",
  description: "High-impact engineering education for modern developers.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body
        suppressHydrationWarning
        className={`${manrope.variable} ${inter.variable} ${rajdhani.variable} min-h-screen`}
      >
        <QueryProvider>
          <ThemeProvider>
            <RevisionProvider>
              <Suspense fallback={<div className="min-h-screen bg-ds-bg-weak" />}>
                {children}
              </Suspense>
              <ReadingControlPanel />
              <SelectionToolbar />
              <NoteDialog />
              <ExistingHighlightPopover />
              <LessonAnnotationLayer />
              <LessonImprovementOverlay />
            </RevisionProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
