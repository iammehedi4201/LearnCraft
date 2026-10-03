"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { InteractiveGrid } from "@/components/interactive-grid";
import {
  Sparkles,
  Layers,
} from "../components/icons";
import { NextjsLessonNavFooter } from "../components/lesson-nav-footer";
import { NextjsLessonSidebar } from "../components/lesson-sidebar";
import {
  useNextjsModuleProgress,
  NextjsSectionItem,
} from "../hooks/use-nextjs-module-progress";

const SECTIONS: NextjsSectionItem[] = [
  { id: "part1", label: "Media Foundation Concept", icon: "🖼️" },
  { id: "part2", label: "next/image Optimization", icon: "⚡" },
  { id: "part3", label: "Interactive CLS Simulator", icon: "🧪" },
  { id: "part4", label: "Self-Hosted Typography", icon: "🔤" },
  { id: "part5", label: "Common Pitfalls & Traps", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🧠" },
];

export default function NX05ImagesFontsPage(): JSX.Element {
  const {
    isAuthenticated,
    activeSection,
    completedSections,
    isLessonCompleted,
    currentIndex,
    progressPercent,
    handleSectionChange,
    completeLesson,
    getStepState,
  } = useNextjsModuleProgress({
    lessonSlug: "nx05-images-fonts",
    sections: SECTIONS,
  });

  const [useNextImage, setUseNextImage] = useState<boolean>(true);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const triggerReload = () => {
    setImageLoaded(false);
    setTimeout(() => setImageLoaded(true), 600);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "part1":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 01 · CORE CONCEPT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Why Media Optimization Belongs in Foundation Stage 1
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Images and typography make up over <strong>70% of total page weight</strong> on modern websites. Poorly loaded images push content down abruptly as they download, creating jarring layout shifts that ruin user experience and tank Google search rankings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] shadow-lg space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center shrink-0">
                  <Layers className="w-5 h-5 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    The Two Pillars of Next.js Media
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                      <strong className="text-white font-mono text-xs block text-purple-400">
                        🖼️ next/image
                      </strong>
                      <p className="text-xs text-slate-400">
                        Automatically converts heavy PNGs/JPEGs to WebP and AVIF on the fly. Pre-reserves bounding box space to guarantee <strong>0 Cumulative Layout Shift</strong>.
                      </p>
                    </div>
                    <div className="p-3.5 rounded-xl bg-black/40 border border-white/[0.06] space-y-1">
                      <strong className="text-white font-mono text-xs block text-emerald-400">
                        🔤 next/font
                      </strong>
                      <p className="text-xs text-slate-400">
                        Downloads Google Fonts at build time and hosts them on your own domain. No external network requests to Google servers, zero flash of unstyled text (FOUT).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        );

      case "part2":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 02 · ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                next/image vs Standard &lt;img&gt;
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Why standard HTML image tags fail modern performance audits:
              </p>
            </div>

            <div className="overflow-x-auto rounded-xl border border-white/[0.08] bg-[#0E121B]">
              <table className="w-full text-xs text-left">
                <thead className="bg-white/[0.03] text-slate-300 font-mono border-b border-white/[0.08]">
                  <tr>
                    <th className="p-3.5">Capability</th>
                    <th className="p-3.5 text-slate-400">Standard &lt;img&gt;</th>
                    <th className="p-3.5 text-purple-400">Next.js &lt;Image&gt;</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04] text-slate-400 font-mono">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Format Conversion</td>
                    <td className="p-3.5">Serves original uploaded format (large PNG/JPG)</td>
                    <td className="p-3.5 text-emerald-400 font-bold">Auto-converts to AVIF and WebP</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Layout Shift (CLS)</td>
                    <td className="p-3.5 text-rose-400">Severe jump when image arrives</td>
                    <td className="p-3.5 text-emerald-400 font-bold">Zero CLS (aspect box pre-calculated)</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Responsive Resizing</td>
                    <td className="p-3.5">Requires manual srcset creation</td>
                    <td className="p-3.5 text-purple-300">Generates device-sized variants automatically</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Blur Placeholder</td>
                    <td className="p-3.5">None (blank box)</td>
                    <td className="p-3.5 text-purple-300">Inline base64 blur or color shimmer</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        );

      case "part3":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20 mb-2">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PART 03 · INTERACTIVE LAB</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    Interactive CLS Simulator
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setUseNextImage(!useNextImage);
                      triggerReload();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                      useNextImage
                        ? "bg-purple-500/20 border-purple-500 text-purple-300"
                        : "bg-rose-500/20 border-rose-500 text-rose-300"
                    }`}
                  >
                    {useNextImage ? "Next.js <Image /> (Zero CLS)" : "Standard <img /> (Layout Shift)"}
                  </button>
                  <button
                    onClick={triggerReload}
                    className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-mono text-slate-300 border border-white/10 cursor-pointer"
                  >
                    Reload
                  </button>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Observe how standard HTML <code>&lt;img&gt;</code> causes content jump, while Next.js <code>&lt;Image&gt;</code> maintains a steady layout:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-5">
              <div className="p-5 rounded-xl bg-black/50 border border-white/[0.06] space-y-4 max-w-lg mx-auto">
                <h3 className="text-sm font-bold text-white">
                  Article: Modern Web Engineering
                </h3>

                <div
                  className={`transition-all duration-300 ${
                    useNextImage
                      ? "w-full h-44 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center relative overflow-hidden"
                      : imageLoaded
                      ? "w-full h-44 rounded-lg bg-slate-800 flex items-center justify-center"
                      : "w-full h-0 overflow-hidden"
                  }`}
                >
                  {useNextImage ? (
                    <div className="text-center p-4">
                      <span className="text-xs font-mono text-purple-300 font-bold block">
                        next/image Container (Aspect Ratio Reserved)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        format: image/avif · size: 34kb (originally 1.2mb)
                      </span>
                    </div>
                  ) : imageLoaded ? (
                    <div className="text-center p-4">
                      <span className="text-xs font-mono text-rose-300 font-bold block">
                        Standard &lt;img&gt; loaded!
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Content below was pushed down abruptly!
                      </span>
                    </div>
                  ) : null}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  Notice the reading text right here! If you toggle to <strong>Standard &lt;img&gt;</strong> and click <strong>Reload Image</strong>, the text abruptly starts at the top, then violently jumps down when the image finishes loading. With <strong>next/image</strong>, space is pre-reserved!
                </p>
              </div>
            </div>
          </section>
        );

      case "part4":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 04 · TYPOGRAPHY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Self-Hosting Fonts with next/font
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                <code>next/font</code> automatically downloads font files at build time and embeds them into your static bundle:
              </p>
            </div>

            <pre className="p-4 rounded-2xl bg-black/60 border border-white/[0.08] text-xs font-mono text-slate-300 overflow-x-auto leading-relaxed">
{`// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap", // Prevents invisible text during load
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${jetbrainsMono.variable}\`}>
      <body className="font-sans bg-slate-950 text-white">{children}</body>
    </html>
  );
}`}
            </pre>
          </section>
        );

      case "part5":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 text-xs font-mono font-bold border border-rose-500/20">
                <span>⚠️</span>
                <span>PART 05 · PITFALLS & DEBUGGING</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Common Mistakes with Images & Fonts
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Avoid these pitfalls when handling media:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  1. Missing `remotePatterns` in next.config.js
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  Next.js blocks unauthorized external images for security. If fetching from an external CDN (e.g. AWS S3, Cloudinary), you must register the hostname in <code>remotePatterns</code> in <code>next.config.js</code> or it throws a runtime error.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
                <strong className="text-white block font-mono text-xs">
                  2. Using `fill` without a relative parent
                </strong>
                <p className="text-slate-400 text-xs leading-relaxed">
                  When using <code>&lt;Image fill ... /&gt;</code>, the image is positioned absolutely. The parent container <em>must</em> have <code>position: relative</code> and a specified height/width, or the image will expand to fill the entire viewport!
                </p>
              </div>
            </div>
          </section>
        );

      case "part6":
        return (
          <section className="space-y-6 animate-in fade-in duration-300">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 text-xs font-mono font-bold border border-purple-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>PART 06 · KNOWLEDGE CHECK</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Check Your Understanding
              </h2>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Test your mastery of media optimization:
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                Why does `next/font/google` have superior privacy and performance compared to adding a traditional &lt;link&gt; tag to Google Fonts?
              </h3>

              <div className="space-y-2">
                {[
                  { id: 0, text: "It converts text directly into SVG images", correct: false },
                  { id: 1, text: "It downloads and self-hosts the font files at build time, so no requests are sent to Google when users browse your website", correct: true },
                  { id: 2, text: "It restricts fonts to Arial only", correct: false },
                  { id: 3, text: "It only works when offline", correct: false },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setQuizAnswer(option.id);
                      if (option.correct) {
                        completeLesson();
                      }
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-xs sm:text-sm font-mono transition-all flex items-center justify-between border cursor-pointer ${
                      quizAnswer === option.id
                        ? option.correct
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-rose-500/20 border-rose-500 text-rose-300"
                        : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:bg-white/[0.05]"
                    }`}
                  >
                    <span>{option.text}</span>
                    {quizAnswer === option.id && (
                      <span className="font-bold">
                        {option.correct ? "✓ Exactly right! Zero external network requests at runtime (+20 XP)" : "✗ Try again"}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-300">
      <Nav />

      <div className="relative z-10 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1">
        {/* 2-Column Layout: Sidebar Stepper + Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Stepper Sidebar */}
          <NextjsLessonSidebar
            lessonCode="NX-05"
            sections={SECTIONS}
            currentIndex={currentIndex}
            progressPercent={progressPercent}
            completedSectionsCount={completedSections.size}
            isAuthenticated={isAuthenticated}
            isLessonCompleted={isLessonCompleted}
            getStepState={getStepState}
            onSelectSection={handleSectionChange}
            onPrev={() =>
              currentIndex > 0 &&
              handleSectionChange(SECTIONS[currentIndex - 1].id)
            }
            onNext={() => {
              if (currentIndex < SECTIONS.length - 1) {
                handleSectionChange(SECTIONS[currentIndex + 1].id);
              } else {
                completeLesson();
              }
            }}
          />

          {/* Main Content Pane */}
          <main className="flex-1 min-w-0 max-w-5xl space-y-8">
            <header className="space-y-2 border-b border-white/[0.08] pb-6">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/25">
                  NX-05
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {SECTIONS[currentIndex]?.label}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Core UI Primitives: Images & Fonts
              </h1>
              <p className="text-sm text-slate-300">
                Eliminate Cumulative Layout Shift (CLS), serve automatic AVIF/WebP formats, and self-host Google Fonts with zero privacy leaks.
              </p>
            </header>

            {renderSectionContent()}

            <NextjsLessonNavFooter currentSlug="nx05-images-fonts" />
          </main>
        </div>
      </div>
    </InteractiveGrid>
  );
}
