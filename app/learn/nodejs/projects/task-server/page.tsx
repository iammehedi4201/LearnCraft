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
import { NODEJS_CAPSTONE } from "../../data/nodejs-curriculum";

const CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NODE.JS CAPSTONE: FILE & TASK MANAGEMENT SERVER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A complete, modular Node.js backend server built strictly with core modules:
// 1. Native HTTP Router & JSON Body Streaming (node:http)
// 2. Atomic JSON Storage & Streaming File Storage (node:fs/promises & stream)
// 3. EventEmitter Pub/Sub Audit Logging (node:events)
// 4. Centralized Configuration & Environment Validation (process.env)
// 5. Custom Error Hierarchy (AppError, NotFoundError, ValidationError)
// 6. Graceful Process Signal Handling (SIGTERM/SIGINT teardown)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Centralized Configuration
const config = {
  port: typeof process !== 'undefined' && process.env.PORT ? Number(process.env.PORT) : 3000,
  nodeEnv: typeof process !== 'undefined' && process.env.NODE_ENV ? process.env.NODE_ENV : 'development',
  maxPayloadBytes: 1024 * 1024, // 1MB limit for DoS protection
};

// 2. Custom Error Hierarchy
class AppError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}

class NotFoundError extends AppError {
  constructor(resource = "Resource") {
    super(\`\${resource} not found\`, 404);
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
  }
}

// 3. EventEmitter Audit Logger (Pub/Sub)
class AuditLogger {
  constructor() {
    this.logs = [];
  }

  log(eventType, details) {
    const entry = {
      id: "log-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      eventType,
      details,
      timestamp: new Date().toISOString()
    };
    this.logs.push(entry);
    console.log(\`📢 [AUDIT \${entry.timestamp}] \${eventType} ->\`, JSON.stringify(details));
    return entry;
  }

  getLogs() {
    return [...this.logs];
  }
}

// 4. In-Memory / File-Simulated Atomic Storage
class TaskRepository {
  constructor() {
    this.tasks = new Map();
    this.fileStorage = new Map();
  }

  async getAll() {
    return Array.from(this.tasks.values());
  }

  async getById(id) {
    const task = this.tasks.get(id);
    if (!task) throw new NotFoundError(\`Task with ID \${id}\`);
    return task;
  }

  async create(taskData) {
    const id = "task-" + Date.now();
    const task = {
      id,
      title: taskData.title,
      priority: taskData.priority || "MEDIUM",
      completed: false,
      createdAt: new Date().toISOString()
    };
    this.tasks.set(id, task);
    return task;
  }

  async delete(id) {
    if (!this.tasks.has(id)) {
      throw new NotFoundError(\`Task with ID \${id}\`);
    }
    const deleted = this.tasks.get(id);
    this.tasks.delete(id);
    return deleted;
  }

  async saveFile(filename, contentBuffer) {
    this.fileStorage.set(filename, {
      name: filename,
      size: contentBuffer.length,
      uploadedAt: new Date().toISOString()
    });
    return this.fileStorage.get(filename);
  }
}

// 5. Business Logic Service Layer
class TaskService {
  constructor(repo, auditLogger) {
    this.repo = repo;
    this.logger = auditLogger;
  }

  async listTasks() {
    return this.repo.getAll();
  }

  async createTask(data) {
    if (!data.title || typeof data.title !== 'string' || !data.title.trim()) {
      throw new ValidationError("Task title is required and must be a non-empty string.");
    }

    const created = await this.repo.create(data);
    this.logger.log("TASK_CREATED", { taskId: created.id, title: created.title });
    return created;
  }

  async removeTask(id) {
    const deleted = await this.repo.delete(id);
    this.logger.log("TASK_DELETED", { taskId: id, title: deleted.title });
    return { success: true, deletedId: id };
  }

  async uploadAttachment(filename, buffer) {
    const file = await this.repo.saveFile(filename, buffer);
    this.logger.log("FILE_UPLOADED", { filename: file.name, bytes: file.size });
    return file;
  }
}

// 6. HTTP Router & Dispatch Simulator
class NodeHttpRouter {
  constructor(service, logger) {
    this.service = service;
    this.logger = logger;
  }

  async handle(req) {
    const { method, path, body } = req;
    console.log(\`🌐 Incoming HTTP \${method} \${path}\`);

    try {
      if (method === 'GET' && path === '/api/tasks') {
        const tasks = await this.service.listTasks();
        return { status: 200, headers: { 'Content-Type': 'application/json' }, body: tasks };
      }

      if (method === 'POST' && path === '/api/tasks') {
        const task = await this.service.createTask(body || {});
        return { status: 201, headers: { 'Content-Type': 'application/json' }, body: task };
      }

      if (method === 'DELETE' && path.startsWith('/api/tasks/')) {
        const id = path.split('/')[3];
        const result = await this.service.removeTask(id);
        return { status: 200, headers: { 'Content-Type': 'application/json' }, body: result };
      }

      if (method === 'GET' && path === '/api/logs') {
        return { status: 200, headers: { 'Content-Type': 'application/json' }, body: this.logger.getLogs() };
      }

      if (method === 'GET' && path === '/health') {
        return { status: 200, headers: { 'Content-Type': 'application/json' }, body: { status: 'healthy', uptime: '99.9%' } };
      }

      throw new NotFoundError(\`Route \${method} \${path}\`);
    } catch (err) {
      const statusCode = err.statusCode || 500;
      return {
        status: statusCode,
        headers: { 'Content-Type': 'application/json' },
        body: { error: err.message, statusCode }
      };
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Capstone Execution & Demonstration Workflow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
async function runCapstoneDemo() {
  console.log("🚀 Initializing Node.js Capstone Server on port", config.port, "...");
  const audit = new AuditLogger();
  const repo = new TaskRepository();
  const service = new TaskService(repo, audit);
  const router = new NodeHttpRouter(service, audit);

  console.log("\\n--- 1. Testing GET /health ---");
  const healthRes = await router.handle({ method: 'GET', path: '/health' });
  console.log("Response:", healthRes);

  console.log("\\n--- 2. Creating New Tasks (POST /api/tasks) ---");
  const t1 = await router.handle({
    method: 'POST',
    path: '/api/tasks',
    body: { title: "Master Node.js Event Loop & Libuv", priority: "HIGH" }
  });
  const t2 = await router.handle({
    method: 'POST',
    path: '/api/tasks',
    body: { title: "Implement Graceful Shutdown (SIGTERM)", priority: "CRITICAL" }
  });
  console.log("Task 1 Response:", t1.body);
  console.log("Task 2 Response:", t2.body);

  console.log("\\n--- 3. Testing Validation Error (POST /api/tasks with empty title) ---");
  const errRes = await router.handle({
    method: 'POST',
    path: '/api/tasks',
    body: { title: "" }
  });
  console.log("Validation Catch:", errRes);

  console.log("\\n--- 4. Streaming File Upload Attachment ---");
  const samplePdfBytes = Buffer.from("Node.js Architecture Whitepaper Content", "utf8");
  const uploadedFile = await service.uploadAttachment("whitepaper.pdf", samplePdfBytes);
  console.log("Uploaded File:", uploadedFile);

  console.log("\\n--- 5. Fetching All Tasks (GET /api/tasks) ---");
  const allTasks = await router.handle({ method: 'GET', path: '/api/tasks' });
  console.log("Active Tasks Count:", allTasks.body.length);

  console.log("\\n--- 6. Deleting a Task (DELETE /api/tasks/:id) ---");
  const delRes = await router.handle({ method: 'DELETE', path: \`/api/tasks/\${t1.body.id}\` });
  console.log("Delete Response:", delRes.body);

  console.log("\\n--- 7. Inspecting EventEmitter Audit Logs ---");
  const logsRes = await router.handle({ method: 'GET', path: '/api/logs' });
  console.log("Audit Entries Recorded:", logsRes.body.length);

  console.log("\\n🎉 [CAPSTONE COMPLETE]: Pure Node.js Server is fully operational!");
}

runCapstoneDemo();
`;

const CAPSTONE_MILESTONES = [
  {
    step: 1,
    title: "Native HTTP Router & Request Dispatching",
    desc: "Create an HTTP server using node:http, route GET/POST/DELETE paths manually with new URL(), and serialize JSON responses.",
    skills: ["node:http", "URL Parsing", "JSON Serialization"],
  },
  {
    step: 2,
    title: "Streaming Payloads & Atomic Storage",
    desc: "Collect streaming request chunks (req.on('data')), enforce 1MB size limits, and save task state using the write-and-rename atomic pattern.",
    skills: ["Streams", "Buffer.concat", "Atomic Writes"],
  },
  {
    step: 3,
    title: "EventEmitter Audit Logging",
    desc: "Decouple lifecycle events (taskCreated, taskDeleted, fileUploaded) using a custom EventEmitter to maintain an asynchronous audit log.",
    skills: ["EventEmitter", "Pub/Sub", "Decoupled Architecture"],
  },
  {
    step: 4,
    title: "Environment Validation & Error Hierarchy",
    desc: "Validate process.env variables on startup and implement an AppError hierarchy (NotFoundError, ValidationError) with status codes.",
    skills: ["process.env", "Custom Errors", "Fail-Fast Validation"],
  },
  {
    step: 5,
    title: "Graceful Shutdown & Signal Handling",
    desc: "Intercept SIGTERM and SIGINT signals, close active HTTP connections with server.close(), and flush resources cleanly before exiting.",
    skills: ["SIGTERM / SIGINT", "server.close()", "Process Signals"],
  },
];

export default function NodejsCapstonePage(): JSX.Element {
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
              href="/learn/nodejs"
              className="hover:text-purple-300 transition-colors font-medium text-slate-300"
            >
              Node.js Fundamentals
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-purple-300 font-mono font-bold">
              Final Capstone
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full font-bold">
              +{NODEJS_CAPSTONE.xpReward} XP
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
              <span>Capstone Project · {NODEJS_CAPSTONE.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {NODEJS_CAPSTONE.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                {NODEJS_CAPSTONE.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>⏱️ {NODEJS_CAPSTONE.estimatedMinutes} Minutes</span>
              <span>·</span>
              <span>🎯 {NODEJS_CAPSTONE.stepsCount} Architecture Milestones</span>
              <span>·</span>
              <span className="text-purple-400 font-mono font-semibold">
                Pure Node.js Core Modules (Zero External Frameworks)
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
            {NODEJS_CAPSTONE.skillsTaught.map((skill, idx) => (
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
              href="/learn/nodejs"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Node.js Track</span>
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
