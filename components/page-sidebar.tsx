"use client";

export interface SidebarSection {
  id: string;
  label: string;
  icon: string;
}

interface PageSidebarProps {
  sections: SidebarSection[];
  activeSection: string;
  completedSections: Set<string>;
  onSectionChange: (sectionId: string) => void;
}

export function PageSidebar({
  sections,
  activeSection,
  completedSections,
  onSectionChange,
}: PageSidebarProps): JSX.Element {
  const currentIndex = sections.findIndex((s) => s.id === activeSection);

  const getStepState = (
    index: number,
  ): "done" | "active" | "todo" => {
    const section = sections[index];
    if (section.id === activeSection) return "active";
    if (completedSections.has(section.id) || index < currentIndex)
      return "done";
    return "todo";
  };

  const handleSectionChange = (sectionId: string) => {
    onSectionChange(sectionId);
  };

  return (
    <aside className="lg:w-[270px] shrink-0 lg:sticky lg:top-32 border border-slate-200 dark:border-slate-700 rounded-2xl lg:bg-white lg:dark:bg-[#0f172a] p-5">
      <div className="py-2">
        {/* Header */}
        <div className="px-2 mb-6">
          <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">
            Modules
          </p>
        </div>

        {/* Stepper */}
        <nav className="relative">
          {/* Vertical connector track behind all steps */}
          <div
            className="absolute left-[22px] top-[22px] w-[2px] bg-slate-300 dark:bg-slate-700 rounded-full"
            style={{ height: `calc(100% - 44px)` }}
          />
          {/* Filled progress track */}
          <div
            className="absolute left-[22px] top-[22px] w-[2px] bg-indigo-500 rounded-full transition-all duration-700 ease-out"
            style={{
              height: `calc(${(currentIndex / (sections.length - 1)) * 100}% - 0px)`,
            }}
          />

          <ol className="space-y-1 relative">
            {sections.map((section, index) => {
              const state = getStepState(index);
              const isActive = state === "active";
              const isDone = state === "done";
              const isTodo = state === "todo";

              return (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionChange(section.id)}
                    disabled={isTodo}
                    className={`
                      group relative w-full flex items-center gap-3.5 px-3 py-2.5 rounded-xl
                      transition-all duration-300
                      ${
                        isActive
                          ? "bg-indigo-50 dark:bg-indigo-950/40"
                          : isDone
                            ? "hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer"
                            : "opacity-40 cursor-not-allowed"
                      }
                    `}
                  >
                    {/* Step indicator circle */}
                    <div
                      className={`
                        relative z-10 flex-shrink-0 w-[30px] h-[30px] rounded-full flex items-center justify-center
                        text-[11px] font-bold transition-all duration-300
                        ${
                          isActive
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30 scale-110"
                            : isDone
                              ? "bg-indigo-600 text-white"
                              : "bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600"
                        }
                      `}
                    >
                      {isDone ? (
                        /* Checkmark SVG */
                        <svg
                          className="w-3.5 h-3.5"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="2,7 5.5,10.5 12,3.5" />
                        </svg>
                      ) : (
                        <span>{index + 1}</span>
                      )}
                    </div>

                    {/* Label area */}
                    <div className="flex flex-col items-start gap-0.5 min-w-0">
                      <span
                        className={`
                          text-[13px] font-semibold leading-tight truncate transition-colors duration-300
                          ${
                            isActive
                              ? "text-indigo-700 dark:text-indigo-300"
                              : isDone
                                ? "text-slate-500 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200"
                                : "text-slate-400 dark:text-slate-600"
                          }
                        `}
                      >
                        {section.label}
                      </span>
                      {isActive && (
                        <span className="text-[10px] text-indigo-400 dark:text-indigo-500 font-medium animate-pulse">
                          In progress
                        </span>
                      )}
                      {isDone && (
                        <span className="text-[10px] text-emerald-500 font-medium">
                          Completed
                        </span>
                      )}
                    </div>

                    {/* Active indicator dot */}
                    {isActive && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_6px_2px_rgba(99,102,241,0.4)]" />
                    )}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* Progress box */}
        <div className="mt-8 px-4 py-5 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-700">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
              Progress
            </span>
            <span className="text-[13px] font-bold text-slate-800 dark:text-white">
              {Math.round(((currentIndex + 1) / sections.length) * 100)}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-700 ease-out"
              style={{
                width: `${((currentIndex + 1) / sections.length) * 100}%`,
              }}
            />
          </div>
          <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">
            {currentIndex + 1} of {sections.length} modules
          </p>
        </div>

        {/* Prev / Next navigation */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() =>
              currentIndex > 0 &&
              handleSectionChange(sections[currentIndex - 1].id)
            }
            disabled={currentIndex === 0}
            className="flex-1 py-2 rounded-xl text-[12px] font-semibold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            ← Prev
          </button>
          <button
            onClick={() =>
              currentIndex < sections.length - 1 &&
              handleSectionChange(sections[currentIndex + 1].id)
            }
            disabled={currentIndex === sections.length - 1}
            className="flex-1 py-2 rounded-xl text-[12px] font-semibold bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-500/20"
          >
            Next →
          </button>
        </div>
      </div>
    </aside>
  );
}
