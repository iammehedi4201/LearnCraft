"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  Sparkles,
} from "../components/icons";
import {
  getLessonBySlug,
  getStageByLessonSlug,
  getAllLessons,
  LessonMeta,
} from "../data/typescript-curriculum";
import {
  setCurrentLesson,
} from "../data/progress-store";
import { LessonNavFooter } from "../components/lesson-nav-footer";
import { TypeScriptLessonSidebar } from "../components/lesson-sidebar";
import {
  useTypeScriptModuleProgress,
  TypeScriptSectionItem,
} from "../hooks/use-typescript-module-progress";

const TS01_SECTIONS: TypeScriptSectionItem[] = [
  { id: "part1", label: "Static Typing Mental Model", icon: "🧠" },
  { id: "part2", label: "The `tsc` Compiler Pipeline", icon: "⚙️" },
  { id: "part3", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part4", label: "Type Annotations vs Inference", icon: "🏷️" },
  { id: "part5", label: "Common Traps & Pitfalls", icon: "⚠️" },
  { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
  { id: "part7", label: "Key Takeaways & Summary", icon: "🎓" },
];

const DEFAULT_SECTIONS: TypeScriptSectionItem[] = [
  { id: "part1", label: "Topic Overview & Goals", icon: "🎯" },
  { id: "part2", label: "Core Mechanics & Syntax", icon: "📖" },
  { id: "part3", label: "Interactive Code Sandbox", icon: "💻" },
  { id: "part4", label: "Real-World Application", icon: "⚡" },
  { id: "part5", label: "Knowledge Check & Quiz", icon: "🧠" },
  { id: "part6", label: "Summary & Progression", icon: "🎓" },
];

export default function TypeScriptLessonPage(): JSX.Element {
  const params = useParams();
  const rawSlug = params?.slug as string;
  const slug = rawSlug || "ts01-mental-model";

  const { data: session } = useSession();
  const isAuthenticated = Boolean(session?.user);

  const [lesson, setLesson] = useState<LessonMeta | null>(null);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(
    null
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const isTS01 = slug === "ts01-mental-model" || slug === "TS-01";
  const sections = isTS01 ? TS01_SECTIONS : DEFAULT_SECTIONS;

  const {
    activeSection,
    currentIndex,
    progressPercent,
    completedSectionsCount,
    isLessonCompleted,
    handleSectionChange,
    handlePrev,
    handleNext,
    getStepState,
  } = useTypeScriptModuleProgress({
    lessonSlug: slug,
    sections,
  });

  useEffect(() => {
    const foundLesson = getLessonBySlug(slug) || getAllLessons()[0];
    setLesson(foundLesson);
    setCurrentLesson(foundLesson.slug);
  }, [slug]);

  if (!lesson) {
    return (
      <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans">
        <Nav />
        <main className="flex-1 flex items-center justify-center p-8">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold text-white">Lesson Loading...</h1>
            <p className="text-sm text-slate-400">Fetching curriculum data.</p>
          </div>
        </main>
        <Footer />
      </InteractiveGrid>
    );
  }

  const stage = getStageByLessonSlug(lesson.slug);

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full">
        {/* =========================================================================
            2-COLUMN LAYOUT: SIDEBAR (LEFT) + CONTENT (RIGHT)
           ========================================================================= */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Stepper Sidebar */}
          <TypeScriptLessonSidebar
            lessonCode={lesson.code}
            stageName={stage?.name}
            sections={sections}
            currentIndex={currentIndex}
            progressPercent={progressPercent}
            completedSectionsCount={completedSectionsCount}
            isAuthenticated={isAuthenticated}
            isLessonCompleted={isLessonCompleted}
            getStepState={getStepState}
            onSelectSection={handleSectionChange}
            onPrev={handlePrev}
            onNext={handleNext}
          />

          {/* Right Side Main Content */}
          <div className="flex-1 min-w-0 w-full space-y-8">
            {/* Lesson Header Hero */}
            <section className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl relative overflow-hidden">
              <div className="space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-black tracking-wider text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-lg">
                    {lesson.code}
                  </span>
                  <span className="text-xs font-mono font-medium text-purple-400 bg-purple-500/10 px-2.5 py-0.5 rounded border border-purple-500/20">
                    {lesson.tag}
                  </span>
                  {lesson.prerequisite && (
                    <span className="text-xs text-slate-400 bg-white/[0.04] px-2.5 py-0.5 rounded border border-white/[0.06]">
                      Prerequisite: {lesson.prerequisite}
                    </span>
                  )}
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
                    {lesson.name}
                  </h1>
                  <p className="text-sm sm:text-base text-slate-300 mt-2 font-normal leading-relaxed">
                    {lesson.desc}
                  </p>
                </div>
              </div>
            </section>

            {/* =========================================================================
                LESSON BODY SECTIONS
               ========================================================================= */}
            {isTS01 ? (
              <div className="space-y-8">
                {/* Part 1: The Core Mental Model */}
                <section
                  id="part1"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part1"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      01
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        The Static Typing Mental Model
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Why TypeScript exists and how its type system differs from runtime languages.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="p-5 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-3">
                      <div className="flex items-center gap-2 text-rose-400 text-xs font-mono font-bold">
                        <span>JavaScript (Dynamic Runtime Typing)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        In JavaScript, variables have no types — only the values in memory have types. Mistakes are discovered only at runtime in production.
                      </p>
                      <pre className="p-3 rounded-lg bg-black/40 text-xs font-mono text-slate-300 overflow-x-auto">
{`// JavaScript: Crashes at 3 AM in production
function sendWelcomeEmail(user) {
  return "Sending to: " + user.profile.email.toLowerCase();
}
// TypeError: Cannot read properties of undefined`}
                      </pre>
                    </div>

                    <div className="p-5 rounded-xl bg-[#090C14] border border-purple-500/30 space-y-3">
                      <div className="flex items-center gap-2 text-purple-300 text-xs font-mono font-bold">
                        <span>TypeScript (Static Ahead-of-Time Checking)</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        TypeScript evaluates shapes, contracts, and data flow <em>before</em> code runs, validating assumptions right inside your editor.
                      </p>
                      <pre className="p-3 rounded-lg bg-black/40 text-xs font-mono text-purple-200 overflow-x-auto">
{`// TypeScript: Caught immediately in editor
interface User {
  id: string;
  profile?: { email: string };
}

function sendWelcomeEmail(user: User): string {
  // TS Error: Object is possibly 'undefined'
  return "Sending to: " + user.profile.email;
}`}
                      </pre>
                    </div>
                  </div>

                  {/* The Erasure Principle Callout */}
                  <div className="p-4 rounded-xl bg-purple-500/[0.06] border border-purple-500/20 space-y-2">
                    <div className="flex items-center gap-2 text-purple-300 text-xs font-bold uppercase tracking-wider font-mono">
                      <Sparkles className="w-4 h-4" />
                      <span>The Golden Rule: Type Erasure</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      TypeScript types exist <strong>strictly at compile time</strong>. When the compiler finishes, all types, interfaces, generics, and annotations are completely stripped away (erased). The resulting JavaScript has <strong>zero runtime overhead</strong>.
                    </p>
                  </div>
                </section>

                {/* Part 2: The Compilation Pipeline */}
                <section
                  id="part2"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part2"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      02
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        The TypeScript Compiler Pipeline (`tsc`)
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        From source text to clean executable JavaScript.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
                    {[
                      {
                        step: "1. Scanner",
                        desc: "Converts raw characters into a stream of tokens.",
                        tag: "Lexical",
                      },
                      {
                        step: "2. Parser",
                        desc: "Constructs an Abstract Syntax Tree (AST).",
                        tag: "Syntactic",
                      },
                      {
                        step: "3. Binder",
                        desc: "Associates declarations with Symbols in scopes.",
                        tag: "Semantic",
                      },
                      {
                        step: "4. Type Checker",
                        desc: "Validates types, assignability, and interfaces.",
                        tag: "Verification",
                      },
                      {
                        step: "5. Emitter",
                        desc: "Erases types and outputs clean JS and .d.ts files.",
                        tag: "Output",
                      },
                    ].map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-2"
                      >
                        <span className="text-[10px] font-mono text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/20">
                          {item.tag}
                        </span>
                        <h3 className="font-bold text-xs sm:text-sm text-white">
                          {item.step}
                        </h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 space-y-1">
                    <span className="text-xs font-mono font-bold text-amber-300">
                      ⚠️ Critical TypeScript Fact: `tsc` emits even on errors!
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      By default, TypeScript emits `.js` output even if type errors exist. To enforce strict build-breaking behavior in production CI/CD, always set <code className="font-mono text-amber-300 font-bold">&quot;noEmitOnError&quot;: true</code> in your <code className="font-mono text-amber-300">tsconfig.json</code>.
                    </p>
                  </div>
                </section>

                {/* Part 3: Interactive Coding Playground */}
                <section
                  id="part3"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part3"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      03
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Interactive Playground: Static Analysis in Action
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Edit the TypeScript code below and click Run:
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                    <Playground
                      runtime="typescript"
                      language="TypeScript"
                      height="340px"
                      starterCode={`// TS-01 Mental Model Demo: Static Typing in Action

interface Lesson {
  id: string;
  title: string;
  minutes: number;
  isComplete: boolean;
}

function calculateReadTime(lessons: Lesson[]): string {
  const totalMinutes = lessons.reduce((sum, l) => sum + l.minutes, 0);
  return \`Total study time: \${totalMinutes} minutes\`;
}

const currentCourse: Lesson[] = [
  { id: "ts-01", title: "Mental Model", minutes: 20, isComplete: true },
  { id: "ts-02", title: "Type Annotations", minutes: 25, isComplete: false },
  { id: "ts-03", title: "Arrays & Tuples", minutes: 30, isComplete: false },
];

console.log(calculateReadTime(currentCourse));

// Try uncommenting the line below to see TypeScript catch the error before execution!
// currentCourse.push({ id: "ts-04", title: "Object Types", minutes: "thirty", isComplete: true });`}
                    />
                  </div>
                </section>

                {/* Part 4: Type Annotations vs Inference */}
                <section
                  id="part4"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part4"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      04
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Type Annotations vs Type Inference
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        When to explicitly annotate vs when to let the compiler infer.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-2">
                      <span className="text-xs font-bold text-purple-300 font-mono">
                        Rule 1: Annotate Boundaries
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Always annotate function parameters, public class methods, and external API return shapes. This creates explicit architectural contracts.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-2">
                      <span className="text-xs font-bold text-purple-300 font-mono">
                        Rule 2: Infer Local Variables
                      </span>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Let TypeScript infer local variable declarations (e.g. <code className="text-purple-300">let x = 42;</code>). Redundant annotations create clutter without safety benefits.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Part 5: Common Traps */}
                <section
                  id="part5"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part5"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      05
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Common Beginner Traps & Misconceptions
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Critical mental model pitfalls to avoid.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="p-4 rounded-xl bg-[#090C14] border border-rose-500/20 space-y-1">
                      <span className="text-xs font-mono font-bold text-rose-300">
                        Trap: Assuming TypeScript validates external JSON/network data
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Typing <code className="font-mono text-rose-300">const user: User = await fetch(...).then(r =&gt; r.json())</code> does NOT validate that the payload actually matches <code className="font-mono text-rose-300">User</code> at runtime. Use schema libraries (Zod) for runtime validation.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-[#090C14] border border-amber-500/20 space-y-1">
                      <span className="text-xs font-mono font-bold text-amber-300">
                        Trap: Overusing `any` as an escape hatch
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        Using <code className="font-mono text-amber-300">any</code> completely disables the type checker for that variable and all downstream expressions. Prefer <code className="font-mono text-purple-300">unknown</code> with type narrowing instead.
                      </p>
                    </div>
                  </div>
                </section>

                {/* Part 6: Quick Knowledge Check */}
                <section
                  id="part6"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-6 ${
                    activeSection === "part6"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      06
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Quick Knowledge Check
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Test your understanding of the TypeScript mental model.
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-4">
                    <h3 className="font-bold text-white text-sm sm:text-base">
                      Question: What happens to a TypeScript interface when your application is compiled to JavaScript and runs in Node.js or the browser?
                    </h3>

                    <div className="space-y-2">
                      {[
                        "It converts into a JavaScript class with runtime property getters.",
                        "It is completely erased (zero bytes in the compiled JavaScript output).",
                        "It creates a hidden Proxy object that checks types on assignment.",
                        "It becomes a global JSON schema validator.",
                      ].map((option, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSelectedQuizAnswer(idx);
                            setQuizSubmitted(true);
                          }}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between gap-3 ${
                            selectedQuizAnswer === idx
                              ? idx === 1
                                ? "bg-emerald-500/15 border-emerald-500/50 text-emerald-300 font-medium"
                                : "bg-rose-500/15 border-rose-500/50 text-rose-300 font-medium"
                              : "bg-white/[0.02] border-white/[0.06] text-slate-300 hover:border-purple-500/40 hover:bg-white/[0.04]"
                          }`}
                        >
                          <span>
                            {String.fromCharCode(65 + idx)}. {option}
                          </span>
                          {quizSubmitted && idx === 1 && (
                            <span className="text-emerald-400 font-bold text-xs">
                              ✓ Correct
                            </span>
                          )}
                        </button>
                      ))}
                    </div>

                    {quizSubmitted && (
                      <div
                        className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                          selectedQuizAnswer === 1
                            ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                            : "bg-rose-500/10 text-rose-300 border border-rose-500/20"
                        }`}
                      >
                        {selectedQuizAnswer === 1
                          ? "Correct! TypeScript types undergo complete type erasure. They guide compilation and IDE diagnostics, but exist nowhere at runtime."
                          : "Not quite. Remember the Type Erasure rule: TypeScript types do NOT generate runtime code, classes, or proxies. They are completely erased."}
                      </div>
                    )}
                  </div>
                </section>

                {/* Part 7: Summary */}
                <section
                  id="part7"
                  className={`p-6 sm:p-8 rounded-2xl bg-[#0E121B] border transition-all duration-200 space-y-4 ${
                    activeSection === "part7"
                      ? "border-purple-500/50 ring-1 ring-purple-500/20"
                      : "border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      07
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Key Takeaways & Summary
                      </h2>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs sm:text-sm text-slate-300 list-disc list-inside">
                    <li>TypeScript is ahead-of-time static analysis for JavaScript.</li>
                    <li>Type Erasure guarantees zero runtime overhead and predictable JS output.</li>
                    <li>The compiler analyzes ASTs, binds symbol tables, checks types, and emits JS.</li>
                    <li>Configure <code>noEmitOnError: true</code> in tsconfig to enforce build safety.</li>
                  </ul>
                </section>
              </div>
            ) : (
              <div className="space-y-8">
                <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      01
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Topic Overview: {lesson.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        {stage?.milestone || "Core TypeScript competence topic"}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-[#090C14] border border-white/[0.05] space-y-3">
                    <h3 className="font-bold text-sm text-purple-300 font-mono">
                      {lesson.code} Concept Goals
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {lesson.desc}
                    </p>
                    {stage?.description && (
                      <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-white/[0.05]">
                        {stage.description}
                      </p>
                    )}
                  </div>
                </section>

                <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold font-mono text-sm">
                      02
                    </span>
                    <div>
                      <h2 className="text-xl font-bold text-white tracking-tight">
                        Interactive Code Sandbox
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-400">
                        Practice the concepts of {lesson.name} in real-time.
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                    <Playground
                      runtime="typescript"
                      language="TypeScript"
                      height="320px"
                      starterCode={`// ${lesson.code} - ${lesson.name}
// Practice and explore this TypeScript feature:

console.log("Practicing ${lesson.code}: ${lesson.name}");
`}
                    />
                  </div>
                </section>
              </div>
            )}

            {/* Lesson Navigation Footer */}
            <LessonNavFooter currentSlug={lesson.slug} />
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
