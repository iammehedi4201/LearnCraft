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
  CheckCircle2,
  Sparkles,
} from "../../components/icons";
import { EXPRESS_CAPSTONE } from "../../data/express-curriculum";

const CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// EXPRESS.JS CAPSTONE: TASKFLOW PRODUCTION REST API
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A complete, modular Express.js REST API demonstrating:
// 1. Modular express.Router() architecture (/api/auth, /api/projects, /api/tasks)
// 2. Custom middleware pipeline (Request logger, Timing, JWT Auth Guard, RBAC)
// 3. Layered Controller-Service architecture with clean separation of concerns
// 4. Input validation middleware returning structured 400 error arrays
// 5. Centralized 4-argument error-handling middleware (err, req, res, next)
// 6. Graceful 404 catch-all and standardized JSON response envelopes
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const express = require('express');
const app = express();

// 1. Global Pre-Middleware
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Custom Request Logger & Execution Timer
app.use((req, res, next) => {
  const start = Date.now();
  req.requestId = 'req_' + Math.random().toString(36).substr(2, 9);

  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(\`[\${req.requestId}] \${req.method} \${req.originalUrl} -> \${res.statusCode} (\${duration}ms)\`);
  });

  next();
});

// 2. In-Memory Mock Database Store
const db = {
  users: [
    { id: 1, email: 'admin@taskflow.dev', role: 'admin', name: 'Admin User' },
    { id: 2, email: 'dev@taskflow.dev', role: 'developer', name: 'Developer User' },
  ],
  projects: [
    { id: 1, title: 'LearnCraft Express', ownerId: 1, status: 'active' },
  ],
  tasks: [
    { id: 1, projectId: 1, title: 'Build Express Capstone', status: 'completed', assignedTo: 2 },
    { id: 2, projectId: 1, title: 'Write Integration Tests', status: 'in_progress', assignedTo: 2 },
  ]
};

// 3. Security & Validation Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(401).json({
      success: false,
      error: { code: 'UNAUTHORIZED', message: 'Missing Authorization header' }
    });
  }

  // Simulated Bearer Token (Bearer token-admin or Bearer token-dev)
  const token = authHeader.split(' ')[1];
  if (token === 'token-admin') {
    req.user = db.users[0];
    return next();
  } else if (token === 'token-dev') {
    req.user = db.users[1];
    return next();
  }

  return res.status(401).json({
    success: false,
    error: { code: 'INVALID_TOKEN', message: 'Token signature invalid or expired' }
  });
}

function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        error: { code: 'FORBIDDEN', message: 'Insufficient role permissions' }
      });
    }
    next();
  };
}

function validateTaskBody(req, res, next) {
  const { title, projectId } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push({ field: 'title', message: 'Title is required and must be a non-empty string' });
  }

  if (!projectId || typeof projectId !== 'number') {
    errors.push({ field: 'projectId', message: 'Valid numeric projectId is required' });
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      error: { code: 'VALIDATION_FAILED', details: errors }
    });
  }

  next();
}

// 4. Modular Routers

// --- Auth Router ---
const authRouter = express.Router();
authRouter.post('/login', (req, res) => {
  const { email } = req.body;
  const user = db.users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ success: false, error: 'Invalid credentials' });
  }

  const token = user.role === 'admin' ? 'token-admin' : 'token-dev';
  res.json({
    success: true,
    data: { token, user: { id: user.id, email: user.email, role: user.role } }
  });
});

// --- Projects Router ---
const projectRouter = express.Router();
projectRouter.use(authenticateToken); // Protect all project routes

projectRouter.get('/', (req, res) => {
  res.json({ success: true, count: db.projects.length, data: db.projects });
});

projectRouter.post('/', requireRole('admin'), (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title required' });

  const project = { id: db.projects.length + 1, title, ownerId: req.user.id, status: 'active' };
  db.projects.push(project);
  res.status(201).json({ success: true, data: project });
});

// --- Tasks Router ---
const taskRouter = express.Router();
taskRouter.use(authenticateToken); // Protect all task routes

taskRouter.get('/', (req, res) => {
  const { status, projectId } = req.query;
  let list = db.tasks;

  if (status) list = list.filter(t => t.status === status);
  if (projectId) list = list.filter(t => t.projectId === Number(projectId));

  res.json({ success: true, count: list.length, data: list });
});

taskRouter.post('/', validateTaskBody, (req, res) => {
  const { title, projectId, assignedTo } = req.body;
  const newTask = {
    id: db.tasks.length + 1,
    title,
    projectId,
    status: 'pending',
    assignedTo: assignedTo || req.user.id
  };
  db.tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

taskRouter.delete('/:id', requireRole('admin'), (req, res) => {
  const id = Number(req.params.id);
  const idx = db.tasks.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Task not found' });

  const deleted = db.tasks.splice(idx, 1)[0];
  res.json({ success: true, message: 'Task deleted', data: deleted });
});

// 5. Mount Routers
app.use('/api/auth', authRouter);
app.use('/api/projects', projectRouter);
app.use('/api/tasks', taskRouter);

// 6. Global 404 Catch-All Middleware
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'ROUTE_NOT_FOUND',
      message: \`Cannot \${req.method} \${req.originalUrl}\`
    }
  });
});

// 7. Centralized 4-Argument Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled API Error:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    success: false,
    error: {
      code: err.code || 'INTERNAL_SERVER_ERROR',
      message: err.message || 'An unexpected error occurred'
    }
  });
});

console.log('TaskFlow Express API configured and initialized.');
`;

export default function ExpressCapstonePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "workspace">("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        {/* Back Link */}
        <Link
          href="/learn/express"
          className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Express.js Roadmap</span>
        </Link>

        {/* Hero Header */}
        <section className="p-6 sm:p-8 md:p-10 rounded-3xl bg-gradient-to-br from-[#0E121B] via-[#090C14] to-[#120D1E] border border-purple-500/30 shadow-2xl relative overflow-hidden space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-purple-400" />
              <span>Capstone Project · Final Mastery</span>
            </span>
            <span className="text-xs font-mono text-amber-400 font-bold bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
              +{EXPRESS_CAPSTONE.xpReward} XP
            </span>
            <span className="text-xs font-mono text-slate-400 bg-white/[0.04] px-2.5 py-1 rounded-full border border-white/[0.06]">
              ~{EXPRESS_CAPSTONE.estimatedMinutes} mins
            </span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
              {EXPRESS_CAPSTONE.title}
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {EXPRESS_CAPSTONE.desc}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 pt-4 border-t border-white/[0.06]">
            {[
              { id: "overview", label: "Project Brief" },
              { id: "architecture", label: "System Architecture" },
              { id: "workspace", label: "Live Interactive Workspace" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                    : "bg-white/[0.03] hover:bg-white/[0.06] text-slate-400 hover:text-slate-200 border border-white/[0.06]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span>Core Requirements & Capabilities</span>
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                {EXPRESS_CAPSTONE.keyFeatures.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-4">
              <h3 className="text-base font-bold text-white">
                Engineering Design Checklist
              </h3>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-purple-300 block">
                    1. Clean Router Modularization
                  </span>
                  <p className="text-slate-400">
                    Never place route handlers directly in app.js. Always mount separate router modules with clear URL prefixes.
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-purple-300 block">
                    2. Resilient Error Handling
                  </span>
                  <p className="text-slate-400">
                    Guard all async routes and forward exceptions to the 4-argument error handler using next(err).
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-1">
                  <span className="font-bold text-purple-300 block">
                    3. Strict Request Validation
                  </span>
                  <p className="text-slate-400">
                    Verify request schemas before touching internal data stores and return clear 400 Bad Request lists.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "architecture" && (
          <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] space-y-6">
            <h3 className="text-lg font-bold text-white">
              TaskFlow Request Pipeline Flow
            </h3>
            <div className="p-6 rounded-2xl bg-black/40 border border-white/10 font-mono text-xs text-slate-300 space-y-3">
              <div className="text-purple-400">Client HTTP Request (e.g. POST /api/tasks)</div>
              <div className="pl-4 text-slate-400">↓ 1. Global Logger & Execution Timer Middleware</div>
              <div className="pl-4 text-slate-400">↓ 2. express.json() Body Parser (Limit: 1mb)</div>
              <div className="pl-4 text-slate-400">↓ 3. express.Router() Dispatcher (/api/tasks)</div>
              <div className="pl-4 text-slate-400">↓ 4. authenticateToken Middleware (Validates JWT Bearer & sets req.user)</div>
              <div className="pl-4 text-slate-400">↓ 5. validateTaskBody Middleware (Checks title, projectId)</div>
              <div className="pl-4 text-slate-400">↓ 6. Task Controller Handler (Business logic execution)</div>
              <div className="pl-4 text-emerald-400">↓ 7. 201 Created Response ({'{'} success: true, data: newTask {'}'})</div>
              <div className="text-slate-500 pt-2">--- Error Path ---</div>
              <div className="pl-4 text-rose-400">↓ Centralized Error Handler (err, req, res, next) → 400/401/403/500 JSON Payload</div>
            </div>
          </div>
        )}

        {activeTab === "workspace" && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
              ⚡ <strong>Interactive Capstone Workspace:</strong> Test and inspect the complete TaskFlow Express application directly in the playground.
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Playground
                key="express-capstone-workspace"
                runtime="typescript"
                starterCode={CAPSTONE_STARTER_CODE}
              />
            </div>
          </div>
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
