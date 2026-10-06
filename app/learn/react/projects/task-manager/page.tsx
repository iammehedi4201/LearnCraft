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
import { REACT_CAPSTONE } from "../../data/react-curriculum";

const REACT_CAPSTONE_STARTER_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// INTERACTIVE TASK & WORKFLOW DASHBOARD — REACT CAPSTONE ARCHITECTURE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Pure React.js Architecture demonstrating:
// 1. Single Source of Truth & State Lifting
// 2. Controlled Inputs with Inline Form Validation
// 3. Derived State for Search & Priority Filtering
// 4. Custom Hook for Local Storage Persistence
// 5. Component Composition (Board, Column, Card, Toolbar)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Initial Mock Tasks
const INITIAL_TASKS = [
  { id: "task-1", title: "Master React Declarative Mental Model", column: "DONE", priority: "HIGH", tag: "Core" },
  { id: "task-2", title: "Implement Controlled Form Validation", column: "IN_PROGRESS", priority: "HIGH", tag: "Forms" },
  { id: "task-3", title: "Build Custom useLocalStorage Hook", column: "IN_PROGRESS", priority: "MEDIUM", tag: "Hooks" },
  { id: "task-4", title: "Optimize Derived Calculations", column: "TODO", priority: "LOW", tag: "Performance" },
];

const COLUMNS = [
  { id: "TODO", label: "📋 To Do", color: "#6366f1" },
  { id: "IN_PROGRESS", label: "⚡ In Progress", color: "#f59e0b" },
  { id: "DONE", label: "✅ Completed", color: "#10b981" },
];

// 2. Custom Hook: Persistent Storage
function usePersistentTasks(key, defaultData) {
  const [tasks, setTasks] = React.useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultData;
    } catch {
      return defaultData;
    }
  });

  React.useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(tasks));
    } catch (err) {
      console.error("Storage error:", err);
    }
  }, [key, tasks]);

  return [tasks, setTasks];
}

// 3. Task Card Component (Leaf)
function TaskCard({ task, onMove, onDelete }) {
  const nextColumn = task.column === "TODO" ? "IN_PROGRESS" : task.column === "IN_PROGRESS" ? "DONE" : null;
  const prevColumn = task.column === "DONE" ? "IN_PROGRESS" : task.column === "IN_PROGRESS" ? "TODO" : null;

  return (
    <div style={{
      background: "#090C14",
      border: "1px solid #1e293b",
      borderRadius: "8px",
      padding: "12px",
      marginBottom: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "8px"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "10px", fontWeight: "bold", padding: "2px 6px", borderRadius: "4px", background: "#7c3aed20", color: "#c084fc", border: "1px solid #7c3aed40" }}>
          {task.tag}
        </span>
        <button
          onClick={() => onDelete(task.id)}
          style={{ background: "transparent", border: "none", color: "#64748b", cursor: "pointer", fontSize: "12px" }}
          title="Delete task"
        >
          ✕
        </button>
      </div>

      <p style={{ margin: 0, fontSize: "13px", fontWeight: 600, color: "#f8fafc" }}>
        {task.title}
      </p>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "4px" }}>
        <span style={{ fontSize: "11px", color: task.priority === "HIGH" ? "#f87171" : "#94a3b8" }}>
          {task.priority === "HIGH" ? "🔥 High" : "Normal"}
        </span>

        <div style={{ display: "flex", gap: "4px" }}>
          {prevColumn && (
            <button
              onClick={() => onMove(task.id, prevColumn)}
              style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "#1e293b", color: "#cbd5e1", border: "1px solid #334155", cursor: "pointer" }}
            >
              ← Back
            </button>
          )}
          {nextColumn && (
            <button
              onClick={() => onMove(task.id, nextColumn)}
              style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "4px", background: "#7c3aed", color: "#fff", border: "none", cursor: "pointer" }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// 4. Main App Dashboard
function TaskDashboardApp() {
  const [tasks, setTasks] = usePersistentTasks("learncraft_capstone_tasks", INITIAL_TASKS);
  const [search, setSearch] = React.useState("");
  const [filterPriority, setFilterPriority] = React.useState("ALL");
  const [newTitle, setNewTitle] = React.useState("");
  const [newPriority, setNewPriority] = React.useState("MEDIUM");
  const [newTag, setNewTag] = React.useState("General");

  // Derived State: Computed freshly during render
  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase()) ||
                          task.tag.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = filterPriority === "ALL" || task.priority === filterPriority;
    return matchesSearch && matchesPriority;
  });

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask = {
      id: "task-" + Date.now(),
      title: newTitle.trim(),
      column: "TODO",
      priority: newPriority,
      tag: newTag.trim() || "General",
    };

    setTasks(prev => [newTask, ...prev]);
    setNewTitle("");
  };

  const handleMoveTask = (id, targetColumn) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, column: targetColumn } : t));
  };

  const handleDeleteTask = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return (
    <div style={{ fontFamily: "sans-serif", padding: "20px", color: "#e2e8f0", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <header style={{ borderBottom: "1px solid #334155", paddingBottom: "16px", marginBottom: "20px" }}>
        <h2 style={{ margin: "0 0 6px", color: "#fff" }}>🚀 Task & Workflow Dashboard</h2>
        <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
          Total: {tasks.length} tasks | Showing: {filteredTasks.length} active filters
        </p>
      </header>

      {/* Add Task Form (Controlled Form) */}
      <form onSubmit={handleAddTask} style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
        <input
          placeholder="New task title..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ flex: "1 1 240px", padding: "8px 12px", borderRadius: "6px", background: "#090C14", border: "1px solid #334155", color: "#fff" }}
        />
        <select
          value={newPriority}
          onChange={(e) => setNewPriority(e.target.value)}
          style={{ padding: "8px", borderRadius: "6px", background: "#090C14", border: "1px solid #334155", color: "#fff" }}
        >
          <option value="LOW">Low Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="HIGH">🔥 High Priority</option>
        </select>
        <button
          type="submit"
          disabled={!newTitle.trim()}
          style={{ padding: "8px 16px", borderRadius: "6px", background: "#7c3aed", color: "#fff", border: "none", fontWeight: "bold", cursor: newTitle.trim() ? "pointer" : "not-allowed" }}
        >
          + Add Task
        </button>
      </form>

      {/* Filter Toolbar */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "20px", alignItems: "center" }}>
        <input
          placeholder="🔍 Filter tasks by title or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ flex: 1, padding: "6px 10px", borderRadius: "6px", background: "#090C14", border: "1px solid #334155", color: "#fff", fontSize: "13px" }}
        />
        <select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          style={{ padding: "6px 10px", borderRadius: "6px", background: "#090C14", border: "1px solid #334155", color: "#fff", fontSize: "13px" }}
        >
          <option value="ALL">All Priorities</option>
          <option value="HIGH">High Priority</option>
          <option value="MEDIUM">Medium Priority</option>
          <option value="LOW">Low Priority</option>
        </select>
      </div>

      {/* Board Columns Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        {COLUMNS.map(col => {
          const columnTasks = filteredTasks.filter(t => t.column === col.id);
          return (
            <div key={col.id} style={{ background: "#0E121B", border: "1px solid #334155", borderRadius: "10px", padding: "14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", borderBottom: \`2px solid \${col.color}\`, paddingBottom: "6px" }}>
                <h4 style={{ margin: 0, fontSize: "14px", color: "#f8fafc" }}>{col.label}</h4>
                <span style={{ fontSize: "11px", fontWeight: "bold", background: "#1e293b", padding: "2px 8px", borderRadius: "10px" }}>
                  {columnTasks.length}
                </span>
              </div>

              {columnTasks.length === 0 ? (
                <div style={{ padding: "20px 0", textAlign: "center", color: "#64748b", fontSize: "12px" }}>
                  No tasks here
                </div>
              ) : (
                columnTasks.map(task => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={handleMoveTask}
                    onDelete={handleDeleteTask}
                  />
                ))
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

console.log("TaskDashboardApp ready.");
`;

export default function ReactCapstonePage(): JSX.Element {
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
              href="/learn/react"
              className="hover:text-purple-300 transition-colors font-medium text-slate-300"
            >
              React Curriculum
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
            <span className="text-purple-300 font-mono font-bold">
              Final Capstone
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
              +{REACT_CAPSTONE.xpReward} XP
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
              <span>Capstone Project · {REACT_CAPSTONE.badge}</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                {REACT_CAPSTONE.title}
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-3 font-normal leading-relaxed">
                {REACT_CAPSTONE.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-400 pt-1">
              <span>{REACT_CAPSTONE.estimatedMinutes} Minutes</span>
              <span>·</span>
              <span>{REACT_CAPSTONE.stepsCount} Architecture Milestones</span>
              <span>·</span>
              <span className="text-purple-400 font-mono font-semibold">
                Pure React.js Architecture & Mental Models
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
            {REACT_CAPSTONE.skillsTaught.map((skill, idx) => (
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
              href="/learn/react"
              className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Curriculum</span>
            </Link>
          </div>

          <div className="rounded-2xl border border-white/[0.08] overflow-hidden bg-[#0E121B] p-2">
            <Playground
              runtime="typescript"
              starterCode={REACT_CAPSTONE_STARTER_CODE}
            />
          </div>
        </section>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
