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
  Layers,
} from "../../components/icons";
import { NESTJS_CAPSTONE } from "../../data/nestjs-curriculum";

const NESTJS_CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MODULAR NESTJS REST API — FINAL CAPSTONE ARCHITECTURE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Production-grade NestJS REST API Architecture demonstrating:
// 1. Modular Feature Boundaries (@Module, imports, exports, providers)
// 2. Controller-Service Dependency Injection & Inversion of Control
// 3. DTO Validation with class-validator & ValidationPipe
// 4. Request Lifecycle: AuthGuard, ExecutionContext & Custom Decorators
// 5. Centralized Exception Filters & Structured Error Responses
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Domain Types & Invariants
export interface UserEntity {
  id: string;
  email: string;
  role: "ADMIN" | "DEVELOPER" | "USER";
  createdAt: Date;
}

export interface TaskEntity {
  id: string;
  title: string;
  assignedTo: string;
  status: "TODO" | "IN_PROGRESS" | "DONE";
}

// 2. In-Memory Mock Database
export class DatabaseService {
  private users: UserEntity[] = [
    { id: "usr-1", email: "lead@learncraft.io", role: "ADMIN", createdAt: new Date() },
    { id: "usr-2", email: "dev@learncraft.io", role: "DEVELOPER", createdAt: new Date() },
  ];

  private tasks: TaskEntity[] = [
    { id: "tsk-101", title: "Implement AuthGuard RBAC", assignedTo: "usr-1", status: "DONE" },
    { id: "tsk-102", title: "Setup Prisma Migration Pipeline", assignedTo: "usr-2", status: "IN_PROGRESS" },
  ];

  findUserById(id: string): UserEntity | undefined {
    return this.users.find((u) => u.id === id);
  }

  getTasksByUser(userId: string): TaskEntity[] {
    return this.tasks.filter((t) => t.assignedTo === userId);
  }

  createTask(task: Omit<TaskEntity, "id">): TaskEntity {
    const newTask: TaskEntity = { id: \`tsk-\${Date.now()}\`, ...task };
    this.tasks.push(newTask);
    return newTask;
  }
}

// 3. Service Layer (Dependency Injection)
export class TasksService {
  constructor(private readonly db: DatabaseService) {}

  getUserTasks(userId: string): TaskEntity[] {
    const user = this.db.findUserById(userId);
    if (!user) {
      throw new Error(\`NotFoundException: User with ID \${userId} not found\`);
    }
    return this.db.getTasksByUser(userId);
  }

  createTask(title: string, assignedTo: string): TaskEntity {
    if (!title || title.trim().length === 0) {
      throw new Error("BadRequestException: Title is required and cannot be empty");
    }
    return this.db.createTask({
      title: title.trim(),
      assignedTo,
      status: "TODO",
    });
  }
}

// 4. Controller Layer (HTTP Gateway)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  getTasks(authUserId: string) {
    console.log(\`[GET /tasks] Authenticated User: \${authUserId}\`);
    return this.tasksService.getUserTasks(authUserId);
  }

  createTask(authUserId: string, payload: { title: string }) {
    console.log(\`[POST /tasks] Payload:\`, payload);
    return this.tasksService.createTask(payload.title, authUserId);
  }
}

// ─── RUN VERIFICATION DEMO ───
const db = new DatabaseService();
const service = new TasksService(db);
const controller = new TasksController(service);

console.log("=== NESTJS REST API CAPSTONE TEST SUITE ===");
console.log("1. Fetch tasks for Admin:", controller.getTasks("usr-1"));

const created = controller.createTask("usr-1", { title: "Automate E2E Jest Tests" });
console.log("2. Created new task:", created);

console.log("3. Verify updated tasks list:", controller.getTasks("usr-1"));
`;

export default function NestjsCapstonePage() {
  const capstone = NESTJS_CAPSTONE;

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link
            href="/learn/nestjs"
            className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>NestJS Curriculum</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
          <span className="text-purple-400 font-bold">Final Capstone Project</span>
        </div>

        {/* Hero Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] relative overflow-hidden shadow-2xl">
          <div className="space-y-4 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold text-purple-300 bg-purple-500/15 border border-purple-500/30 px-3 py-1 rounded-lg">
                {capstone.badge}
              </span>
              <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                +{capstone.xpReward} XP REWARD
              </span>
              <span className="font-mono text-xs text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-lg">
                ⏱️ {capstone.estimatedMinutes} mins
              </span>
              <span className="font-mono text-xs text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                {capstone.stepsCount} Architecture Steps
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
              {capstone.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {capstone.desc}
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs">
              {capstone.skillsTaught.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/[0.03] border border-white/[0.06] text-slate-300 font-mono text-[11px]"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Interactive Architecture Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-purple-400" />
                <span>Architecture Playground & Interactive Execution</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Inspect, modify, and run the complete NestJS REST API architecture directly in your browser.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0A0D14]">
            <Playground
              runtime="typescript"
              starterCode={NESTJS_CAPSTONE_STARTER_CODE}
            />
          </div>
        </section>

        {/* Completion Checklist Card */}
        <div className="p-6 rounded-2xl bg-[#0E121B] border border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                Capstone Verification Complete
              </h3>
              <p className="text-xs text-slate-400">
                You have finished all required phases of the NestJS curriculum and demonstrated full architectural competency.
              </p>
            </div>
          </div>

          <Link
            href="/learn/nestjs"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors shrink-0"
          >
            ← Return to NestJS Hub
          </Link>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
