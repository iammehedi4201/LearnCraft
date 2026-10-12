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
import { OOP_CAPSTONE } from "../../data/oop-curriculum";

const CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// OBJECT-ORIENTED TASK & WORKFLOW ENGINE — CAPSTONE ARCHITECTURE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pure Object-Oriented Design demonstrating:
// 1. Encapsulated Domain Entities & Protected Invariants
// 2. Polymorphic Step Execution (Strategy / Command Pattern)
// 3. Composition over Inheritance for Logging & Audit Listeners
// 4. Strict SOLID compliance & Clean Boundaries
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Domain Types & Enums
type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
type TaskStatus = "DRAFT" | "IN_PROGRESS" | "COMPLETED" | "FAILED";

interface AuditObserver {
  onStatusChanged(taskId: string, from: TaskStatus, to: TaskStatus): void;
}

// 2. Behavioral Step Contract (Polymorphism)
interface WorkflowStep {
  readonly name: string;
  execute(context: Record<string, unknown>): Promise<boolean> | boolean;
}

// 3. Encapsulated Task Entity
class TaskEntity {
  private _status: TaskStatus = "DRAFT";
  private _steps: WorkflowStep[] = [];
  private _observers: AuditObserver[] = [];

  constructor(
    public readonly id: string,
    public readonly title: string,
    public priority: TaskPriority = "MEDIUM"
  ) {
    if (!title || title.trim().length === 0) {
      throw new Error("Task title cannot be empty");
    }
  }

  public addStep(step: WorkflowStep): void {
    if (this._status !== "DRAFT") {
      throw new Error("Cannot modify steps once task is started");
    }
    this._steps.push(step);
  }

  public attachObserver(observer: AuditObserver): void {
    this._observers.push(observer);
  }

  public run(): boolean {
    if (this._steps.length === 0) {
      throw new Error("Cannot execute task with zero steps");
    }

    this.transitionStatus("IN_PROGRESS");
    const context: Record<string, unknown> = {};

    for (const step of this._steps) {
      console.log(\`[Engine] Running Step: \${step.name}\`);
      const success = step.execute(context);
      if (!success) {
        this.transitionStatus("FAILED");
        return false;
      }
    }

    this.transitionStatus("COMPLETED");
    return true;
  }

  private transitionStatus(next: TaskStatus): void {
    const prev = this._status;
    this._status = next;
    for (const obs of this._observers) {
      obs.onStatusChanged(this.id, prev, next);
    }
  }

  public get status(): TaskStatus {
    return this._status;
  }
}

// 4. Concrete Steps (Polymorphic strategies)
class ValidationStep implements WorkflowStep {
  readonly name = "Payload Validation";
  execute(context: Record<string, unknown>): boolean {
    context.validatedAt = Date.now();
    return true;
  }
}

class ExecutionStep implements WorkflowStep {
  readonly name = "Core Business Execution";
  execute(context: Record<string, unknown>): boolean {
    context.processed = true;
    return true;
  }
}

// 5. Audit Logger (Observer)
class ConsoleAuditLogger implements AuditObserver {
  onStatusChanged(taskId: string, from: TaskStatus, to: TaskStatus): void {
    console.log(\`[Audit Log] Task \${taskId} transitioned: \${from} -> \${to}\`);
  }
}

// 6. Assembling the Engine
const task = new TaskEntity("task-999", "Deploy Payment Microservice", "HIGH");
task.attachObserver(new ConsoleAuditLogger());
task.addStep(new ValidationStep());
task.addStep(new ExecutionStep());

console.log("Initial Status:", task.status);
const success = task.run();
console.log("Final Status:", task.status, "| Success:", success);
`;

export default function OOPCapstonePage(): JSX.Element {
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
              href="/learn/oop"
              className="hover:text-purple-300 transition-colors font-medium text-slate-300"
            >
              OOP Fundamentals
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-purple-300 font-mono font-bold">
              Final Capstone
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              +{OOP_CAPSTONE.xpReward} XP
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
              <span>Capstone Project · {OOP_CAPSTONE.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {OOP_CAPSTONE.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                {OOP_CAPSTONE.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>{OOP_CAPSTONE.estimatedMinutes} Minutes</span>
              <span>·</span>
              <span>{OOP_CAPSTONE.stepsCount} Architecture Milestones</span>
              <span>·</span>
              <span className="text-purple-400 font-mono font-semibold">
                Pure Language-Agnostic OOP Architecture
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
            {OOP_CAPSTONE.skillsTaught.map((skill, idx) => (
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

        {/* Interactive Architecture Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Interactive Capstone Code Sandbox
            </h2>
            <Link
              href="/learn/oop"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Curriculum</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0E121B] p-2">
            <Playground
              runtime="typescript"
              starterCode={CAPSTONE_STARTER_CODE}
            />
          </div>
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
