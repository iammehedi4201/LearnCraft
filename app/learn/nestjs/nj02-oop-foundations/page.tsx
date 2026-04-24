"use client";

import { useState, useEffect } from "react";
import { Nav } from "@/components/nav";
import { HeaderSection } from "./components/header-section";
import { ClassesObjectsSection } from "./components/classes-objects-section";
import { EncapsulationSection } from "./components/encapsulation-section";
import { InheritanceSection } from "./components/inheritance-section";
import { PolymorphismSection } from "./components/polymorphism-section";
import { AbstractionSection } from "./components/abstraction-section";
import { ClosingSections } from "./components/closing-sections";

const SECTIONS = [
  { id: "intro", label: "Welcome", icon: "🚀", color: "from-blue-500 to-cyan-500" },
  { id: "classes", label: "Classes & Objects", icon: "📦", color: "from-amber-500 to-orange-500" },
  { id: "encapsulation", label: "Encapsulation", icon: "🔒", color: "from-emerald-500 to-teal-500" },
  { id: "inheritance", label: "Inheritance", icon: "🧬", color: "from-rose-500 to-pink-500" },
  { id: "polymorphism", label: "Polymorphism", icon: "✨", color: "from-purple-500 to-indigo-500" },
  { id: "abstraction", label: "Abstraction", icon: "☁️", color: "from-sky-500 to-indigo-500" },
  { id: "closing", label: "Review & Challenge", icon: "🏆", color: "from-yellow-500 to-amber-600" },
];

export default function NJ02OOP(): JSX.Element {
  const [activeSection, setActiveSection] = useState("intro");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);


  const renderContent = () => {
    switch (activeSection) {
      case "intro": return <HeaderSection />;
      case "classes": return <ClassesObjectsSection />;
      case "encapsulation": return <EncapsulationSection />;
      case "inheritance": return <InheritanceSection />;
      case "polymorphism": return <PolymorphismSection />;
      case "abstraction": return <AbstractionSection />;
      case "closing": return <ClosingSections />;
      default: return <HeaderSection />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0f172a] text-slate-900 dark:text-slate-300 selection:bg-primary/30">
      {/* Ambient Glows - Subtler for the clean look */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />
      </div>

      <Nav />

      <div className="relative z-10 max-w-[90rem] mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-7 items-start justify-center">

          {/* Clean Sidebar Navigation */}
          <aside className="lg:w-[280px] shrink-0 lg:sticky lg:top-32">
            <div className="py-2">
              <div className="px-4 mb-8">
                <h3 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
                  Modules
                </h3>
              </div>
              <nav className="space-y-1.5">
                {SECTIONS.map((section) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`group relative w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl transition-all duration-500 ${isActive
                        ? `bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25 scale-[1.02]`
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200"
                        }`}
                    >
                      <span className={`text-xl transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                        {section.icon}
                      </span>
                      <span className={`text-[13px] font-bold tracking-tight ${isActive ? "text-white" : ""}`}>
                        {section.label}
                      </span>
                      {isActive && (
                        <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Progress Box */}
              <div className="mt-8 px-4 py-5 rounded-[1.5rem] bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50">
                <div className="flex items-center justify-between text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                  <span>Progress</span>
                  <span className="text-slate-900 dark:text-white">{Math.round(((currentIndex + 1) / SECTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                    style={{ width: `${((currentIndex + 1) / SECTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0 max-w-4xl">
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 ease-out">
              {renderContent()}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
