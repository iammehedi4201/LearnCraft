"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  ArrowLeft,
  Award,
  ChevronRight,
} from "../../components/icons";
import { TYPESCRIPT_CAPSTONE } from "../../data/typescript-curriculum";

export default function TypeScriptCapstonePage(): JSX.Element {
  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      {/* Breadcrumb Bar */}
      <div className="border-b border-white/[0.06] bg-[#090C14]/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <Link href="/learn" className="hover:text-purple-300 transition-colors">
              LearnCraft
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <Link
              href="/learn/typescript"
              className="hover:text-purple-300 transition-colors font-medium text-slate-300"
            >
              TypeScript
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-purple-300 font-mono font-bold">
              Final Capstone
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              +{TYPESCRIPT_CAPSTONE.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 w-full space-y-10">
        {/* Capstone Hero */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-xl relative overflow-hidden">
          <div className="max-w-4xl space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>Capstone Project · {TYPESCRIPT_CAPSTONE.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {TYPESCRIPT_CAPSTONE.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                {TYPESCRIPT_CAPSTONE.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>{TYPESCRIPT_CAPSTONE.estimatedMinutes} Minutes</span>
              <span>·</span>
              <span>{TYPESCRIPT_CAPSTONE.stepsCount} Architecture Milestones</span>
              <span>·</span>
              <span className="text-purple-400 font-mono font-semibold">
                Pure Zero-Dependency TypeScript
              </span>
            </div>
          </div>
        </section>

        {/* Skills & Architecture Goals */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Capstone Architecture Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {TYPESCRIPT_CAPSTONE.skillsTaught.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090C14] border border-white/[0.05] flex items-start gap-3"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Capstone Playground Starter */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interactive Capstone Workspace
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Implement the generic store and type-safe query builder directly in this workspace.
              </p>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
            <Playground
              runtime="typescript"
              language="TypeScript"
              height="450px"
              starterCode={`// =========================================================================
// LearnCraft TypeScript Capstone: Type-Safe In-Memory Query Engine
// =========================================================================

interface BaseEntity {
  id: string;
  createdAt: Date;
}

// 1. Generic Entity Store
class TypeSafeStore<T extends BaseEntity> {
  private items = new Map<string, T>();

  insert(item: T): T {
    this.items.set(item.id, Object.freeze({ ...item }));
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  // Type-safe filter using keyof T and indexed access
  findWhere<K extends keyof T>(key: K, value: T[K]): T[] {
    const results: T[] = [];
    for (const item of this.items.values()) {
      if (item[key] === value) {
        results.push(item);
      }
    }
    return results;
  }
}

// 2. Demo User Entity
interface User extends BaseEntity {
  name: string;
  email: string;
  role: "admin" | "author" | "learner";
}

const userStore = new TypeSafeStore<User>();

userStore.insert({
  id: "usr_1",
  name: "Mehedi",
  email: "mehedi@example.com",
  role: "learner",
  createdAt: new Date(),
});

userStore.insert({
  id: "usr_2",
  name: "Alex",
  email: "alex@example.com",
  role: "admin",
  createdAt: new Date(),
});

const admins = userStore.findWhere("role", "admin");
console.log("Found admins:", admins);
`}
            />
          </div>
        </section>

        {/* Return to hub */}
        <div className="flex items-center justify-between pt-6 border-t border-white/[0.08]">
          <Link
            href="/learn/typescript"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-slate-400 hover:text-purple-300 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to TypeScript Hub</span>
          </Link>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
