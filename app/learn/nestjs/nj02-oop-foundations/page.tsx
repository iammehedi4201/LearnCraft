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
  const nextSection = SECTIONS[currentIndex + 1];
  const prevSection = SECTIONS[currentIndex - 1];

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
    <div className="min-h-screen text-slate-300 selection:bg-primary/30">
      {/* Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <Nav />

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Vibrant Sidebar Navigation */}
          <aside className="lg:w-80 shrink-0">
            <div className="sticky top-24 glass-card p-5 rounded-[1rem] border border-slate-200/10 shadow-2xl backdrop-blur-2xl">
              <div className="px-4 mb-6">
                <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  Modules
                </h3>
              </div>
              <nav className="space-y-2">
                {SECTIONS.map((section, idx) => {
                  const isActive = activeSection === section.id;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`group relative w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive
                        ? `bg-gradient-to-r ${section.color} text-white shadow-lg scale-[1.03] ring-4 ring-white/10`
                        : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                        }`}
                    >
                      <span className={`text-xl transition-transform duration-500 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                        {section.icon}
                      </span>
                      <span className={`text-sm font-bold tracking-tight ${isActive ? "text-white" : ""}`}>
                        {section.label}
                      </span>
                      {isActive && (
                        <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Progress Box */}
              <div className="mt-8 px-4 py-5 rounded-3xl bg-slate-900/50 border border-slate-800/50">
                <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  <span>Progress</span>
                  <span className="text-white">{Math.round(((currentIndex + 1) / SECTIONS.length) * 100)}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-primary transition-all duration-1000 ease-out"
                    style={{ width: `${((currentIndex + 1) / SECTIONS.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
              {renderContent()}
            </div>

            {/* Premium Pagination Cards */}
            <div className="mt-12 pt-8 border-t border-slate-800/50 grid grid-cols-1 md:grid-cols-2 gap-4 pb-16">
              {prevSection ? (
                <button
                  onClick={() => setActiveSection(prevSection.id)}
                  className="group relative p-4 rounded-2xl border border-slate-800 bg-slate-900/40 hover:bg-slate-800/60 transition-all text-left flex items-center gap-4 overflow-hidden backdrop-blur-md"
                >
                  <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700 group-hover:scale-105 transition-transform">
                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-0.5">Previous</p>
                    <h4 className="text-base font-bold text-slate-200 group-hover:text-white transition-colors tracking-tight">{prevSection.label}</h4>
                  </div>
                </button>
              ) : <div />}

              {nextSection ? (
                <button
                  onClick={() => setActiveSection(nextSection.id)}
                  className="group relative p-4 rounded-2xl border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all text-right flex flex-row-reverse items-center gap-4 overflow-hidden backdrop-blur-md shadow-lg shadow-primary/5"
                >
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${nextSection.color} shadow-lg shadow-primary/20 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-0.5">Next Module</p>
                    <h4 className="text-base font-bold text-white group-hover:scale-[1.01] transition-transform tracking-tight">{nextSection.label}</h4>
                  </div>
                </button>
              ) : (
                <div className="md:col-span-2 p-10 rounded-[2rem] border border-emerald-500/20 bg-emerald-500/5 text-center flex flex-col items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-3xl">🏆</div>
                  <div>
                    <h4 className="text-2xl font-bold text-emerald-400">Foundation Complete!</h4>
                    <p className="text-sm text-slate-500 uppercase tracking-[0.2em] mt-1">You mastered the 5 pillars of OOP</p>
                  </div>
                </div>
              )}
            </div>
          </main>

        </div>
      </div>
    </div>
  );
}
