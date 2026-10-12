"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  ArrowLeft,
  Award,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "../../components/icons";
import { JS_CAPSTONE } from "../../data/javascript-curriculum";

const CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JAVASCRIPT CAPSTONE: INTERACTIVE TASK & WORKFLOW MANAGER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A complete, modular Vanilla JavaScript application demonstrating:
// 1. Data Modeling with Objects & Arrays (immutability with map/filter/reduce)
// 2. Pure Functions & Modular Architecture
// 3. Asynchronous Sync with Promises & async/await
// 4. In-Memory / LocalStorage State Persistence
// 5. Error Handling with try / catch
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. In-Memory Persistence Storage Adapter
class StorageAdapter {
  constructor(storageKey = "learncraft_tasks") {
    this.key = storageKey;
    this.memoryStore = new Map();
  }

  save(data) {
    try {
      const json = JSON.stringify(data);
      this.memoryStore.set(this.key, json);
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(this.key, json);
      }
      return true;
    } catch (err) {
      console.error("Storage save failed:", err.message);
      return false;
    }
  }

  load() {
    try {
      let raw = null;
      if (typeof localStorage !== "undefined") {
        raw = localStorage.getItem(this.key);
      }
      if (!raw && this.memoryStore.has(this.key)) {
        raw = this.memoryStore.get(this.key);
      }
      return raw ? JSON.parse(raw) : [];
    } catch (err) {
      console.error("Storage load failed:", err.message);
      return [];
    }
  }
}

// 2. Simulated Async Server API
const TaskAPI = {
  async syncToServer(tasks) {
    console.log("📡 [API] Syncing", tasks.length, "tasks with remote server...");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.05) {
          resolve({ status: 200, syncedAt: new Date().toISOString() });
        } else {
          reject(new Error("Network timeout while syncing"));
        }
      }, 300);
    });
  }
};

// 3. Task Workflow Manager Controller
class TaskManager {
  constructor(storage = new StorageAdapter()) {
    this.storage = storage;
    this.tasks = this.storage.load();
    console.log("🚀 [TaskManager] Initialized with", this.tasks.length, "persisted tasks.");
  }

  // Create a new task with validation & default values
  addTask(title, priority = "MEDIUM", category = "Feature") {
    if (!title || typeof title !== "string" || !title.trim()) {
      throw new Error("Task title must be a non-empty string.");
    }

    const newTask = {
      id: "task-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      title: title.trim(),
      priority,
      category,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    // Immutable addition using spread operator
    this.tasks = [...this.tasks, newTask];
    this.storage.save(this.tasks);
    console.log("➕ Added Task:", newTask.title, \`(\${newTask.priority})\`);
    return newTask;
  }

  // Toggle completion immutably with Array.prototype.map
  toggleTask(taskId) {
    let found = false;
    this.tasks = this.tasks.map((task) => {
      if (task.id === taskId) {
        found = true;
        return { ...task, completed: !task.completed };
      }
      return task;
    });

    if (!found) {
      console.warn("⚠️ Task not found:", taskId);
      return null;
    }

    this.storage.save(this.tasks);
    return this.tasks.find((t) => t.id === taskId);
  }

  // Remove task immutably with Array.prototype.filter
  removeTask(taskId) {
    const prevCount = this.tasks.length;
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
    this.storage.save(this.tasks);
    return prevCount !== this.tasks.length;
  }

  // Filter tasks dynamically
  getFilteredTasks({ status = "ALL", priority = "ALL" } = {}) {
    return this.tasks.filter((task) => {
      const matchStatus =
        status === "ALL" ||
        (status === "COMPLETED" && task.completed) ||
        (status === "ACTIVE" && !task.completed);

      const matchPriority =
        priority === "ALL" || task.priority === priority;

      return matchStatus && matchPriority;
    });
  }

  // Calculate metrics using Array.prototype.reduce
  getStats() {
    return this.tasks.reduce(
      (acc, task) => {
        acc.total++;
        if (task.completed) {
          acc.completed++;
        } else {
          acc.active++;
        }
        acc.byPriority[task.priority] = (acc.byPriority[task.priority] || 0) + 1;
        return acc;
      },
      { total: 0, active: 0, completed: 0, byPriority: {} }
    );
  }

  // Async sync routine with robust error handling
  async performCloudBackup() {
    try {
      const response = await TaskAPI.syncToServer(this.tasks);
      console.log("✅ [Cloud Sync Successful]:", response);
      return true;
    } catch (err) {
      console.error("❌ [Cloud Sync Error]:", err.message);
      return false;
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. Execution & Demonstration
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function runDemo() {
  const manager = new TaskManager();

  // Populate sample workflow tasks
  const t1 = manager.addTask("Build Navigation and Search bar", "HIGH", "UI");
  const t2 = manager.addTask("Implement JWT Authentication Guard", "CRITICAL", "Security");
  const t3 = manager.addTask("Optimize Database Queries with Indexing", "MEDIUM", "Backend");
  const t4 = manager.addTask("Write Unit Tests for Payment Webhook", "HIGH", "Testing");

  // Toggle tasks to completed
  manager.toggleTask(t1.id);
  manager.toggleTask(t3.id);

  console.log("\\n📊 --- CURRENT WORKFLOW STATS ---");
  console.log(manager.getStats());

  console.log("\\n🎯 --- ACTIVE CRITICAL & HIGH TASKS ---");
  const highPriority = manager.getFilteredTasks({ status: "ACTIVE", priority: "HIGH" });
  console.log(highPriority);

  console.log("\\n☁️ --- INITIATING ASYNC BACKUP ---");
  await manager.performCloudBackup();
}

runDemo();
`;

const CAPSTONE_MILESTONES = [
  {
    step: 1,
    title: "Data Modeling & Immutability",
    desc: "Represent tasks as pure JavaScript objects and update collections immutably using Array.map, Array.filter, and object spread.",
    skills: ["Objects & Arrays", "Immutability", "Pure Functions"],
  },
  {
    step: 2,
    title: "Persistent Storage Adapter",
    desc: "Create an isolated storage abstraction with fallback memory handling and JSON serialization (JSON.stringify / parse).",
    skills: ["localStorage", "JSON", "Error Handling (try/catch)"],
  },
  {
    step: 3,
    title: "Metrics & Analytics with Reduce",
    desc: "Compute real-time stats (total, active, completed, category breakdowns) efficiently in a single pass using Array.reduce.",
    skills: ["Array.prototype.reduce", "Data Aggregation"],
  },
  {
    step: 4,
    title: "Asynchronous API Synchronization",
    desc: "Implement non-blocking server synchronization routines using Promises, async/await, and realistic error handling.",
    skills: ["Async / Await", "Promises", "Error Recovery"],
  },
  {
    step: 5,
    title: "Event-Driven Controller & Validation",
    desc: "Wire the components together in a clean controller with parameter validation, edge-case guards, and structured logging.",
    skills: ["ES6 Classes", "Validation", "Clean Architecture"],
  },
];

export default function JSCapstonePage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<number>(0);

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
              href="/learn/javascript"
              className="hover:text-purple-300 transition-colors font-medium text-slate-300"
            >
              JavaScript Fundamentals
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-purple-300 font-mono font-bold">
              Final Capstone
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              +{JS_CAPSTONE.xpReward} XP
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
              <span>Capstone Project · {JS_CAPSTONE.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {JS_CAPSTONE.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                {JS_CAPSTONE.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>⏱️ {JS_CAPSTONE.estimatedMinutes} Minutes</span>
              <span>·</span>
              <span>🎯 {JS_CAPSTONE.stepsCount} Architecture Milestones</span>
              <span>·</span>
              <span className="text-purple-400 font-mono font-semibold">
                Pure Modern Vanilla JavaScript
              </span>
            </div>
          </div>
        </section>

        {/* Capstone Architecture Requirements */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Capstone Architecture Requirements
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {JS_CAPSTONE.skillsTaught.map((skill, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-[#090C14] border border-white/[0.05] flex items-start gap-3 hover:border-purple-500/20 transition-colors"
              >
                <div className="w-6 h-6 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-mono text-xs shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </div>
                <span className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Guided Step-by-Step Milestones */}
        <section className="p-6 sm:p-8 rounded-2xl bg-[#0E121B] border border-white/[0.08] space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span>Implementation Roadmap & Milestones</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              5 Modular Steps
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {CAPSTONE_MILESTONES.map((m, idx) => (
              <button
                key={idx}
                onClick={() => setActiveTab(idx)}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  activeTab === idx
                    ? "bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-600/10"
                    : "bg-[#090C14] border-white/[0.06] text-slate-400 hover:text-slate-200 hover:border-white/10"
                }`}
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider font-bold text-purple-400">
                    Step {m.step}
                  </span>
                  <div className="text-xs font-bold mt-1 text-white line-clamp-2">
                    {m.title}
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1">
                  {m.skills.slice(0, 2).map((s, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.04] text-slate-400 border border-white/[0.05]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>

          {/* Active Milestone Detail Box */}
          <div className="p-5 rounded-xl bg-[#090C14] border border-purple-500/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
                Step {CAPSTONE_MILESTONES[activeTab].step} Focus · {CAPSTONE_MILESTONES[activeTab].title}
              </span>
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Runnable in Sandbox</span>
              </span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {CAPSTONE_MILESTONES[activeTab].desc}
            </p>
          </div>
        </section>

        {/* Interactive Architecture Playground */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Interactive Capstone Code Sandbox
            </h2>
            <Link
              href="/learn/javascript"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to JavaScript Track</span>
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
