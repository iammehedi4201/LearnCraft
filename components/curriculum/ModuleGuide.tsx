"use client";

export type LearningModuleGuideData = {
  id?: string;
  stage: string;
  label: string;
  description: string;
  lessons: string[];
  optional?: boolean;
};

export interface ModuleGuideProps {
  module: LearningModuleGuideData;
  moduleNumber: number;
  onLessonClick?: (index: number, lesson: string) => void;
  className?: string;
}

export function ModuleGuide({
  module,
  moduleNumber,
  onLessonClick,
  className = "",
}: ModuleGuideProps): JSX.Element {
  const isTwoOrLess = module.lessons.length <= 2;
  const formattedModuleNum =
    moduleNumber < 10 ? `0${moduleNumber}` : `${moduleNumber}`;

  return (
    <section
      className={`relative mb-8 overflow-hidden rounded-3xl border border-ds-stroke-soft bg-ds-bg-white p-6 shadow-sm sm:p-8 lg:p-10 ${className}`}
    >
      <div>
        {/* Top Badges & Metadata */}
        <div className="mb-5 flex flex-wrap items-center gap-2 sm:gap-2.5">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-ds-feature-light bg-ds-feature-lighter px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ds-feature-dark shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-ds-feature-base animate-pulse" />
            Module {formattedModuleNum}
          </span>

          <span className="inline-flex items-center rounded-full border border-ds-stroke-soft bg-ds-bg-weak px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ds-text-sub">
            {module.stage}
          </span>

          <span className="inline-flex items-center gap-1.5 rounded-full border border-ds-stroke-soft bg-ds-bg-weak px-2.5 py-1 text-[10px] font-bold text-ds-text-sub">
            <svg
              className="h-3 w-3 text-ds-text-soft"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            {module.lessons.length}{" "}
            {module.lessons.length === 1 ? "Lesson" : "Lessons"}
          </span>

          {module.optional && (
            <span className="inline-flex items-center gap-1 rounded-full border border-ds-stroke-soft bg-ds-bg-weak px-3 py-1 text-[10px] font-black uppercase tracking-widest text-ds-text-sub">
              Optional
            </span>
          )}
        </div>

        {/* Title & Description */}
        <div className="mb-8 max-w-3xl">
          <h1 className="mb-3 font-display text-2xl font-black tracking-tight text-ds-text-strong sm:text-3xl lg:text-4xl">
            {module.label}
          </h1>
          <p className="text-sm font-normal leading-relaxed text-ds-text-sub sm:text-base sm:leading-7">
            {module.description}
          </p>
        </div>

        {/* "Learn in this order" Section */}
        <div className="pt-2">
          <div className="mb-3.5 flex items-center justify-between border-b border-ds-stroke-soft pb-3">
            <div className="flex items-center gap-2">
              <svg
                className="h-3.5 w-3.5 text-ds-feature-base"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-ds-text-soft">
                Learn in this order
              </span>
            </div>
            <span className="text-[10px] font-bold text-ds-text-soft">
              Recommended Sequence
            </span>
          </div>

          <ol
            className={`grid gap-2.5 sm:gap-3 ${
              isTwoOrLess
                ? "grid-cols-1 sm:grid-cols-2"
                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
            }`}
          >
            {module.lessons.map((lesson, index) => {
              const formattedIndex =
                index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
              const isInteractive = Boolean(onLessonClick);

              return (
                <li
                  key={`${lesson}-${index}`}
                  onClick={() => onLessonClick?.(index, lesson)}
                  className={`group/item relative flex min-h-[3.25rem] items-center gap-3 rounded-2xl border border-ds-stroke-soft bg-ds-bg-weak p-3 text-xs font-semibold leading-5 text-ds-text-strong shadow-xs transition-all duration-200 hover:border-ds-stroke-sub hover:bg-ds-bg-soft sm:p-3.5 sm:text-[13px] ${
                    isInteractive ? "cursor-pointer" : "cursor-default"
                  }`}
                >
                  {/* Step Index Badge */}
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-ds-stroke-soft bg-ds-bg-white font-mono text-[11px] font-black text-ds-feature-dark shadow-xs transition-all duration-200 group-hover/item:border-transparent group-hover/item:bg-ds-feature-base group-hover/item:text-ds-static-white">
                    {formattedIndex}
                  </span>

                  {/* Lesson Name */}
                  <span className="flex-1 text-ds-text-strong transition-colors duration-200">
                    {lesson}
                  </span>

                  {/* Trailing arrow indicator */}
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-ds-text-soft opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:text-ds-text-strong group-hover/item:opacity-100 group-hover/item:translate-x-0"
                  >
                    →
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default ModuleGuide;
