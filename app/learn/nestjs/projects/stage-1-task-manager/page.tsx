"use client";

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * STAGE 1 CAPSTONE PROJECT — CLI TASK MANAGER & SYSTEM LOGGER
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * An interactive, multi-step capstone project where learners combine
 * TypeScript Essentials (NJ-01), OOP Foundations (NJ-02), and Decorators (NJ-03)
 * into a real-world command-line task management application.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import { recordActivity } from "@/lib/gamification";
import { markLessonComplete, isLessonComplete } from "@/app/learn/nestjs/data/progress-store";
import { STAGE_1_CAPSTONE } from "@/app/learn/nestjs/data/nestjs-curriculum";

interface ProjectStep {
  id: number;
  title: string;
  tag: string;
  desc: string;
  instructions: string[];
  starterCode: string;
  solutionCode: string;
  hints: string[];
  tests: { name: string; code: string }[];
}

const PROJECT_STEPS: ProjectStep[] = [
  {
    id: 1,
    title: "Domain Entities & Enums",
    tag: "Step 1: Domain Modeling",
    desc: "Define the core Task entity, status and priority enums, and encapsulation methods.",
    instructions: [
      "1. Define a `Priority` enum with values: `LOW = 'LOW'`, `MEDIUM = 'MEDIUM'`, `HIGH = 'HIGH'`.",
      "2. Define a `Status` type: `'TODO' | 'IN_PROGRESS' | 'DONE'`.",
      "3. Define an `ITask` interface with `id: string`, `title: string`, `priority: Priority`, `status: Status`, and `createdAt: Date`.",
      "4. Create a `Task` class implementing `ITask` with constructor `(public id: string, public title: string, public priority: Priority = Priority.MEDIUM)`.",
      "5. Implement method `markDone(): void` that sets `status = 'DONE'`.",
      "6. Implement method `getFormattedSummary(): string` that returns `[PRIORITY] Title (STATUS)` (e.g. `[HIGH] Build API (TODO)`)."
    ],
    starterCode: `// ─── STEP 1: DOMAIN ENTITIES & ENUMS ───

// 1. Define Priority enum
export enum Priority {
  // Add LOW, MEDIUM, HIGH
}

// 2. Define Status type
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

// 3. Define ITask interface
export interface ITask {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

// 4. Implement Task class
export class Task implements ITask {
  public status: Status = 'TODO';
  public createdAt: Date = new Date();

  constructor(
    public id: string,
    public title: string,
    public priority: Priority = Priority.MEDIUM
  ) {}

  markDone(): void {
    // Set status to DONE
  }

  getFormattedSummary(): string {
    // Return: [PRIORITY] Title (STATUS)
    return \`[\${this.priority}] \${this.title} (\${this.status})\`;
  }
}

// Test your class:
const sample = new Task("task-1", "Design Database Schema", Priority.HIGH);
console.log(sample.getFormattedSummary());
sample.markDone();
console.log("After completion:", sample.getFormattedSummary());
`,
    solutionCode: `export enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
}

export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export interface ITask {
  id: string;
  title: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}

export class Task implements ITask {
  public status: Status = 'TODO';
  public createdAt: Date = new Date();

  constructor(
    public id: string,
    public title: string,
    public priority: Priority = Priority.MEDIUM
  ) {}

  markDone(): void {
    this.status = 'DONE';
  }

  getFormattedSummary(): string {
    return \`[\${this.priority}] \${this.title} (\${this.status})\`;
  }
}

const sample = new Task("task-1", "Design Database Schema", Priority.HIGH);
console.log(sample.getFormattedSummary());
sample.markDone();
console.log("After completion:", sample.getFormattedSummary());`,
    hints: [
      "Define Priority enum with LOW = 'LOW', MEDIUM = 'MEDIUM', HIGH = 'HIGH'.",
      "Inside markDone(), set this.status = 'DONE'.",
      "In getFormattedSummary(), return `[${this.priority}] ${this.title} (${this.status})`."
    ],
    tests: [
      {
        name: "Priority enum has correct values",
        code: `if (Priority.LOW !== 'LOW' || Priority.HIGH !== 'HIGH') throw new Error("Priority enum missing expected keys.");`,
      },
      {
        name: "Task instantiates with default status TODO",
        code: `const t = new Task('1', 'Test', Priority.LOW); if (t.status !== 'TODO' || t.title !== 'Test') throw new Error("Task initial state incorrect.");`,
      },
      {
        name: "markDone() updates task status",
        code: `const t = new Task('2', 'Review', Priority.MEDIUM); t.markDone(); if (t.status !== 'DONE') throw new Error("markDone() did not set status to DONE.");`,
      },
      {
        name: "getFormattedSummary() returns correct string format",
        code: `const t = new Task('3', 'Deploy', Priority.HIGH); const s = t.getFormattedSummary(); if (s !== '[HIGH] Deploy (TODO)') throw new Error("Formatted summary mismatch: " + s);`,
      },
    ],
  },
  {
    id: 2,
    title: "Generic Repository & Logger",
    tag: "Step 2: Architecture & Storage",
    desc: "Build a generic in-memory repository with query filters and a polymorphic console logger.",
    instructions: [
      "1. Define a generic `IRepository<T>` interface with `add(item: T): void`, `getAll(): T[]`, `getById(id: string): T | undefined`, and `count(): number`.",
      "2. Implement `TaskRepository` implementing `IRepository<Task>` with internal array `private items: Task[] = []`.",
      "3. Add `filterByStatus(status: Status): Task[]` to `TaskRepository`.",
      "4. Define an `ILogger` interface with `log(message: string): void` and `error(message: string): void`.",
      "5. Implement `ConsoleLogger` class implementing `ILogger`."
    ],
    starterCode: `// ─── STEP 2: GENERIC REPOSITORY & LOGGER ───

// (From Step 1)
export enum Priority { LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH" }
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export class Task {
  public status: Status = 'TODO';
  constructor(public id: string, public title: string, public priority: Priority = Priority.MEDIUM) {}
  markDone() { this.status = 'DONE'; }
}

// 1. Generic Repository Interface
export interface IRepository<T> {
  add(item: T): void;
  getAll(): T[];
  getById(id: string): T | undefined;
  count(): number;
}

// 2. Task Repository Implementation
export class TaskRepository implements IRepository<Task> {
  private items: Task[] = [];

  add(item: Task): void {
    // Add item to items array
  }

  getAll(): Task[] {
    // Return copy of items
    return [...this.items];
  }

  getById(id: string): Task | undefined {
    // Find task by id
    return this.items.find(t => t.id === id);
  }

  count(): number {
    return this.items.length;
  }

  filterByStatus(status: Status): Task[] {
    // Return tasks matching status
    return this.items.filter(t => t.status === status);
  }
}

// 3. Logger Interface & Console Logger
export interface ILogger {
  log(msg: string): void;
  error(msg: string): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string): void {
    console.log("[INFO] " + msg);
  }
  error(msg: string): void {
    console.log("[ERROR] " + msg);
  }
}

// Test your repository:
const repo = new TaskRepository();
const logger = new ConsoleLogger();

repo.add(new Task("1", "Setup NestJS App", Priority.HIGH));
repo.add(new Task("2", "Write Unit Tests", Priority.MEDIUM));

logger.log("Total tasks in repository: " + repo.count());
console.log("All tasks:", repo.getAll().map(t => t.title));
`,
    solutionCode: `export enum Priority { LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH" }
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';
export class Task {
  public status: Status = 'TODO';
  constructor(public id: string, public title: string, public priority: Priority = Priority.MEDIUM) {}
  markDone() { this.status = 'DONE'; }
}

export interface IRepository<T> {
  add(item: T): void;
  getAll(): T[];
  getById(id: string): T | undefined;
  count(): number;
}

export class TaskRepository implements IRepository<Task> {
  private items: Task[] = [];

  add(item: Task): void {
    this.items.push(item);
  }

  getAll(): Task[] {
    return [...this.items];
  }

  getById(id: string): Task | undefined {
    return this.items.find(t => t.id === id);
  }

  count(): number {
    return this.items.length;
  }

  filterByStatus(status: Status): Task[] {
    return this.items.filter(t => t.status === status);
  }
}

export interface ILogger {
  log(msg: string): void;
  error(msg: string): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string): void {
    console.log("[INFO] " + msg);
  }
  error(msg: string): void {
    console.log("[ERROR] " + msg);
  }
}

const repo = new TaskRepository();
const logger = new ConsoleLogger();
repo.add(new Task("1", "Setup NestJS App", Priority.HIGH));
repo.add(new Task("2", "Write Unit Tests", Priority.MEDIUM));
logger.log("Total tasks in repository: " + repo.count());`,
    hints: [
      "In TaskRepository.add(item), use this.items.push(item).",
      "In TaskRepository.filterByStatus(status), use this.items.filter(t => t.status === status).",
      "ConsoleLogger implements ILogger with log() and error() methods."
    ],
    tests: [
      {
        name: "TaskRepository adds and counts items",
        code: `const r = new TaskRepository(); r.add(new Task('1', 'A')); r.add(new Task('2', 'B')); if (r.count() !== 2) throw new Error("Expected count to be 2.");`,
      },
      {
        name: "getById finds correct task",
        code: `const r = new TaskRepository(); r.add(new Task('t-99', 'Target')); if (r.getById('t-99')?.title !== 'Target') throw new Error("getById did not return task.");`,
      },
      {
        name: "filterByStatus filters completed tasks",
        code: `const r = new TaskRepository(); const t1 = new Task('1', 'A'); const t2 = new Task('2', 'B'); t2.markDone(); r.add(t1); r.add(t2); if (r.filterByStatus('DONE').length !== 1) throw new Error("filterByStatus failed.");`,
      },
      {
        name: "ConsoleLogger implements ILogger",
        code: `const l = new ConsoleLogger(); if (typeof l.log !== 'function' || typeof l.error !== 'function') throw new Error("ConsoleLogger missing methods.");`,
      },
    ],
  },
  {
    id: 3,
    title: "Complete CLI App Engine",
    tag: "Step 3: CLI Runner & Assembly",
    desc: "Assemble TaskManagerApp with dependency injection, commands, and formatted terminal reports.",
    instructions: [
      "1. Create `TaskManagerApp` class with constructor `(private repository: TaskRepository, private logger: ILogger)`.",
      "2. Implement `createTask(id: string, title: string, priority: Priority): Task` which creates, stores, and logs task creation.",
      "3. Implement `completeTask(id: string): boolean` which marks task done and logs success/failure.",
      "4. Implement `printReport(): string` which returns a clean ASCII summary table with total, completed, and pending counts.",
      "5. Run the complete application demo!"
    ],
    starterCode: `// ─── STEP 3: COMPLETE TASK MANAGER CLI APP ───

export enum Priority { LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH" }
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export class Task {
  public status: Status = 'TODO';
  constructor(public id: string, public title: string, public priority: Priority = Priority.MEDIUM) {}
  markDone() { this.status = 'DONE'; }
  getSummary() { return \`[\${this.priority}] \${this.title} (\${this.status})\`; }
}

export class TaskRepository {
  private items: Task[] = [];
  add(item: Task) { this.items.push(item); }
  getAll(): Task[] { return [...this.items]; }
  getById(id: string) { return this.items.find(t => t.id === id); }
  count() { return this.items.length; }
}

export interface ILogger {
  log(msg: string): void;
  error(msg: string): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string) { console.log("✨ [APP INFO] " + msg); }
  error(msg: string) { console.log("❌ [APP ERROR] " + msg); }
}

// ─── ASSEMBLE TASK MANAGER APP ───
export class TaskManagerApp {
  constructor(
    private repository: TaskRepository,
    private logger: ILogger
  ) {}

  createTask(id: string, title: string, priority: Priority = Priority.MEDIUM): Task {
    const task = new Task(id, title, priority);
    this.repository.add(task);
    this.logger.log(\`Task created: "\${title}" with priority \${priority}\`);
    return task;
  }

  completeTask(id: string): boolean {
    const task = this.repository.getById(id);
    if (!task) {
      this.logger.error(\`Task with id "\${id}" not found!\`);
      return false;
    }
    task.markDone();
    this.logger.log(\`Task completed: "\${task.title}"\`);
    return true;
  }

  printReport(): string {
    const all = this.repository.getAll();
    const completed = all.filter(t => t.status === 'DONE').length;
    const pending = all.length - completed;

    const report = [
      "════════════════════════════════════════════",
      "        📋 TASK MANAGER SYSTEM REPORT       ",
      "════════════════════════════════════════════",
      \`Total Tasks:     \${all.length}\`,
      \`Completed:       \${completed} ✅\`,
      \`Pending:         \${pending} ⏳\`,
      "────────────────────────────────────────────",
      ...all.map((t, idx) => \`  \${idx + 1}. \${t.getSummary()}\`),
      "════════════════════════════════════════════",
    ].join("\\n");

    console.log(report);
    return report;
  }
}

// 🚀 RUN THE APPLICATION:
const app = new TaskManagerApp(new TaskRepository(), new ConsoleLogger());

app.createTask("task-1", "Master TypeScript Generics", Priority.HIGH);
app.createTask("task-2", "Build OOP Domain Models", Priority.HIGH);
app.createTask("task-3", "Learn NestJS Decorators", Priority.MEDIUM);

app.completeTask("task-1");
app.completeTask("task-2");

app.printReport();
`,
    solutionCode: `export enum Priority { LOW = "LOW", MEDIUM = "MEDIUM", HIGH = "HIGH" }
export type Status = 'TODO' | 'IN_PROGRESS' | 'DONE';

export class Task {
  public status: Status = 'TODO';
  constructor(public id: string, public title: string, public priority: Priority = Priority.MEDIUM) {}
  markDone() { this.status = 'DONE'; }
  getSummary() { return \`[\${this.priority}] \${this.title} (\${this.status})\`; }
}

export class TaskRepository {
  private items: Task[] = [];
  add(item: Task) { this.items.push(item); }
  getAll(): Task[] { return [...this.items]; }
  getById(id: string) { return this.items.find(t => t.id === id); }
  count() { return this.items.length; }
}

export interface ILogger {
  log(msg: string): void;
  error(msg: string): void;
}

export class ConsoleLogger implements ILogger {
  log(msg: string) { console.log("✨ [APP INFO] " + msg); }
  error(msg: string) { console.log("❌ [APP ERROR] " + msg); }
}

export class TaskManagerApp {
  constructor(
    private repository: TaskRepository,
    private logger: ILogger
  ) {}

  createTask(id: string, title: string, priority: Priority = Priority.MEDIUM): Task {
    const task = new Task(id, title, priority);
    this.repository.add(task);
    this.logger.log(\`Task created: "\${title}" with priority \${priority}\`);
    return task;
  }

  completeTask(id: string): boolean {
    const task = this.repository.getById(id);
    if (!task) {
      this.logger.error(\`Task with id "\${id}" not found!\`);
      return false;
    }
    task.markDone();
    this.logger.log(\`Task completed: "\${task.title}"\`);
    return true;
  }

  printReport(): string {
    const all = this.repository.getAll();
    const completed = all.filter(t => t.status === 'DONE').length;
    const pending = all.length - completed;

    const report = [
      "════════════════════════════════════════════",
      "        📋 TASK MANAGER SYSTEM REPORT       ",
      "════════════════════════════════════════════",
      \`Total Tasks:     \${all.length}\`,
      \`Completed:       \${completed} ✅\`,
      \`Pending:         \${pending} ⏳\`,
      "────────────────────────────────────────────",
      ...all.map((t, idx) => \`  \${idx + 1}. \${t.getSummary()}\`),
      "════════════════════════════════════════════",
    ].join("\\n");

    console.log(report);
    return report;
  }
}

const app = new TaskManagerApp(new TaskRepository(), new ConsoleLogger());
app.createTask("task-1", "Master TypeScript Generics", Priority.HIGH);
app.completeTask("task-1");
app.printReport();`,
    hints: [
      "TaskManagerApp receives repository and logger in its constructor via dependency injection.",
      "createTask instantiates a Task, calls repository.add(), and logs the event.",
      "completeTask finds task via repository.getById(id), marks it done, and returns true.",
      "printReport aggregates total, completed, and pending counts into a formatted summary."
    ],
    tests: [
      {
        name: "TaskManagerApp creates and stores tasks",
        code: `const repo = new TaskRepository(); const app = new TaskManagerApp(repo, new ConsoleLogger()); app.createTask('t-1', 'Build API', Priority.HIGH); if (repo.count() !== 1) throw new Error("Task was not added to repository.");`,
      },
      {
        name: "completeTask marks task completed",
        code: `const repo = new TaskRepository(); const app = new TaskManagerApp(repo, new ConsoleLogger()); app.createTask('t-2', 'Write Tests'); const res = app.completeTask('t-2'); if (!res || repo.getById('t-2')?.status !== 'DONE') throw new Error("completeTask failed.");`,
      },
      {
        name: "completeTask returns false for non-existent task",
        code: `const app = new TaskManagerApp(new TaskRepository(), new ConsoleLogger()); const res = app.completeTask('missing-id'); if (res !== false) throw new Error("Should return false for unknown id.");`,
      },
      {
        name: "printReport generates formatted summary",
        code: `const app = new TaskManagerApp(new TaskRepository(), new ConsoleLogger()); app.createTask('t-3', 'Deploy'); const rep = app.printReport(); if (!rep.includes('TASK MANAGER') || !rep.includes('Total Tasks')) throw new Error("Report output format mismatch.");`,
      },
    ],
  },
];

function renderFormattedInstruction(instruction: string) {
  const clean = instruction.replace(/^\d+\.\s*/, "");
  const parts = clean.split(/`([^`]+)`/g);

  return (
    <div className="inline leading-relaxed">
      {parts.map((part, i) => {
        if (i % 2 === 1) {
          return (
            <code
              key={i}
              className="font-mono text-[11px] sm:text-xs font-semibold px-2 py-0.5 mx-1 rounded-md bg-purple-950/60 text-purple-200 border border-purple-500/30 inline-block my-0.5 shadow-xs"
            >
              {part}
            </code>
          );
        }

        if (part.includes("→")) {
          const arrowSegments = part.split("→");
          return (
            <span key={i}>
              {arrowSegments.map((seg, sIdx) => (
                <span key={sIdx}>
                  {seg}
                  {sIdx < arrowSegments.length - 1 && (
                    <span className="text-purple-400 font-bold mx-1.5 inline-block">
                      →
                    </span>
                  )}
                </span>
              ))}
            </span>
          );
        }

        return <span key={i}>{part}</span>;
      })}
    </div>
  );
}

export default function Stage1TaskManagerProjectPage(): JSX.Element {
  const [activeStepId, setActiveStepId] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [showCelebration, setShowCelebration] = useState(false);
  const [isCompletedInDb, setIsCompletedInDb] = useState(false);

  const activeStep = useMemo(
    () => PROJECT_STEPS.find((s) => s.id === activeStepId) || PROJECT_STEPS[0],
    [activeStepId]
  );

  useEffect(() => {
    setIsCompletedInDb(isLessonComplete("stage-1-task-manager"));
  }, []);

  const handleStepPassed = (stepId: number) => {
    setCompletedSteps((prev) => {
      const updated = { ...prev, [stepId]: true };
      
      // If all 3 steps completed
      const allPassed = PROJECT_STEPS.every((s) => updated[s.id]);
      if (allPassed && !isCompletedInDb) {
        // Award 100 XP
        recordActivity("project_complete", "Stage 1 Capstone: CLI Task Manager & System Engine");
        markLessonComplete("stage-1-task-manager");
        setIsCompletedInDb(true);
        setShowCelebration(true);
      }
      return updated;
    });
  };

  return (
    <InteractiveGrid className="min-h-screen bg-[#0A0D14] text-white selection:bg-purple-500/20 font-sans">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
        {/* ─── BREADCRUMB & CAPSTONE HEADER ─── */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium flex-wrap">
            <Link href="/learn/nestjs" className="hover:text-white transition-colors flex items-center gap-1">
              <span>←</span>
              <span>NestJS Curriculum</span>
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400 font-mono font-bold">Stage 01</span>
            <span className="text-slate-600">/</span>
            <span className="text-purple-300 font-semibold">Capstone Project</span>
          </div>

          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-purple-500/30 shadow-2xl relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                    🛠️ Stage 1 Capstone Project
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-purple-500/15 text-purple-300 border border-purple-500/30">
                    +100 XP Reward
                  </span>
                  {isCompletedInDb && (
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Project Mastered ✅</span>
                    </span>
                  )}
                </div>

                <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white font-display">
                  CLI Task Manager & System Logger
                </h1>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                  Put your TypeScript and Object-Oriented knowledge to work. Build a complete, modular, and extensible command-line task management application combining <strong>Domain Modeling</strong>, <strong>Generic Repositories</strong>, <strong>Polymorphic Logging</strong>, and <strong>SOLID Principles</strong>.
                </p>

                {/* Skills tags */}
                <div className="flex items-center gap-2 flex-wrap pt-1">
                  {STAGE_1_CAPSTONE.skillsTaught.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.06] text-[11px] font-mono text-slate-300"
                    >
                      ✓ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Progress Summary Card */}
              <div className="shrink-0 p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] flex flex-col gap-3 min-w-[240px]">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400 font-medium">Project Progress</span>
                  <span className="font-mono font-bold text-purple-400">
                    {Object.values(completedSteps).filter(Boolean).length} / {PROJECT_STEPS.length} Steps
                  </span>
                </div>

                {/* Step Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-500 to-emerald-400 rounded-full transition-all duration-500"
                    style={{
                      width: `${(Object.values(completedSteps).filter(Boolean).length / PROJECT_STEPS.length) * 100}%`,
                    }}
                  />
                </div>

                <div className="pt-2 border-t border-white/[0.06] space-y-1.5">
                  {PROJECT_STEPS.map((step) => {
                    const isStepPassed = !!completedSteps[step.id];
                    const isCurrent = step.id === activeStepId;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setActiveStepId(step.id)}
                        className={`w-full flex items-center justify-between p-2 rounded-xl text-xs font-semibold transition-all cursor-pointer text-left ${
                          isCurrent
                            ? "bg-purple-600/20 text-white border border-purple-500/40"
                            : isStepPassed
                            ? "text-emerald-300 hover:bg-white/[0.04]"
                            : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                        }`}
                      >
                        <span className="truncate">Step {step.id}: {step.title}</span>
                        {isStepPassed ? (
                          <span className="text-emerald-400 font-bold">✓</span>
                        ) : isCurrent ? (
                          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        ) : (
                          <span className="text-[10px] text-slate-500 font-mono">TODO</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── WORKBENCH AREA: STEP DETAILS & PLAYGROUND ─── */}
        <div className="space-y-6">
          {/* Active Step Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#0E121B] border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-purple-600/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-mono font-black text-sm">
                0{activeStep.id}
              </span>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-white">
                  {activeStep.tag}: {activeStep.title}
                </h2>
                <p className="text-xs text-slate-400">{activeStep.desc}</p>
              </div>
            </div>

            {/* Step Switcher Buttons */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                disabled={activeStepId === 1}
                onClick={() => setActiveStepId((prev) => Math.max(1, prev - 1))}
                className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-xs font-bold text-slate-300 hover:text-white transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                ← Previous Step
              </button>
              <button
                disabled={activeStepId === PROJECT_STEPS.length}
                onClick={() => setActiveStepId((prev) => Math.min(PROJECT_STEPS.length, prev + 1))}
                className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-colors disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
              >
                Next Step →
              </button>
            </div>
          </div>

          {/* Requirements Callout */}
          <div className="p-6 rounded-2xl bg-[#090D16] border border-white/[0.08] shadow-xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/[0.06] pb-3.5">
              <div className="flex items-center gap-2.5">
                <span className="text-base">📋</span>
                <div>
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300">
                    Requirements & Specification
                  </h4>
                  <p className="text-[11px] text-slate-400">
                    Implement the required domain models and methods in the playground below:
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-semibold text-purple-300 bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20 self-start sm:self-auto">
                {activeStep.instructions.length} Tasks Required
              </span>
            </div>

            <div className="space-y-3">
              {activeStep.instructions.map((inst, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3.5 p-4 rounded-xl bg-[#0E131F] border border-white/[0.06] hover:border-purple-500/30 transition-all text-xs sm:text-sm text-slate-200 leading-relaxed shadow-sm group"
                >
                  <span className="shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-900/40 text-purple-300 border border-purple-500/30 flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 shadow-xs">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1 min-w-0 pt-0.5">
                    {renderFormattedInstruction(inst)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sandboxed Interactive Playground */}
          <div className="rounded-3xl border border-white/[0.08] bg-[#0E121B] overflow-hidden shadow-2xl">
            <Playground
              key={`step-${activeStep.id}`}
              runtime="typescript"
              language="TypeScript"
              exercise={{
                id: `capstone-1-step-${activeStep.id}`,
                title: activeStep.title,
                instructions: activeStep.desc,
                starterCode: activeStep.starterCode,
                solutionCode: activeStep.solutionCode,
                hints: activeStep.hints,
                tests: activeStep.tests,
                difficulty: activeStep.id === 3 ? "intermediate" : "beginner",
              }}
              onSuccess={() => handleStepPassed(activeStep.id)}
              height="500px"
            />
          </div>
        </div>

        {/* ─── CELEBRATION MODAL ─── */}
        {showCelebration && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <div className="max-w-md w-full p-8 rounded-3xl bg-[#0E121B] border border-purple-500/40 shadow-[0_25px_60px_rgba(125,82,244,0.3)] text-center space-y-5 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-purple-600 to-emerald-400 flex items-center justify-center text-4xl shadow-xl shadow-purple-600/30 animate-bounce">
                🏆
              </div>

              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400">
                  Capstone Mastered
                </span>
                <h3 className="text-2xl font-black text-white mt-1">
                  Stage 1 Complete! 🎉
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  You successfully built the <strong>CLI Task Manager & System Logger</strong>. You&apos;ve demonstrated mastery of Types, OOP, Encapsulation, Generics, and SOLID principles!
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-between">
                <span className="text-xs text-slate-300 font-semibold">Reward Earned:</span>
                <span className="text-sm font-mono font-black text-purple-300">
                  +100 XP &amp; Stage 1 Badge 🎖️
                </span>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setShowCelebration(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Stay in Lab
                </button>
                <Link
                  href="/learn/nestjs/nj05-setup"
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-xs font-bold text-white transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>Go to Stage 2</span>
                  <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ─── FOOTER NAVIGATION ─── */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/learn/nestjs/nj03-decorators"
            className="flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Previous: NJ-03 Decorators</span>
          </Link>

          <Link
            href="/learn/nestjs/nj05-setup"
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white transition-all flex items-center gap-2 shadow-lg shadow-purple-600/20"
          >
            <span>Continue to Stage 2: NJ-05 Project Setup</span>
            <span>→</span>
          </Link>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
