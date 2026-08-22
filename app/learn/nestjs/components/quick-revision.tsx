import { CheckCircle2, BookmarkCheck } from "./icons";

interface QuickRevisionProps {
  title?: string;
  points: string[];
  takeaway?: string;
}

export function QuickRevision({
  title = "Quick Revision",
  points,
  takeaway,
}: QuickRevisionProps) {
  if (!points || points.length === 0) return null;

  return (
    <section
      aria-label="Quick Revision"
      className="my-10 rounded-2xl border border-ds-stroke-soft bg-ds-bg-white p-6 md:p-8 shadow-sm transition-all"
    >
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-ds-stroke-soft">
        <div className="p-2 rounded-xl bg-ds-success-lighter text-ds-success-dark">
          <BookmarkCheck className="w-5 h-5" />
        </div>
        <div>
          <h3 className="text-base font-black text-ds-text-strong tracking-tight">
            {title}
          </h3>
          <p className="text-xs text-ds-text-sub">
            Core takeaways to remember before moving to the next lesson
          </p>
        </div>
      </div>

      <ul className="space-y-3 text-sm text-ds-text-strong">
        {points.map((point, index) => (
          <li key={index} className="flex items-start gap-3 leading-relaxed">
            <CheckCircle2 className="w-4 h-4 mt-1 shrink-0 text-ds-success-base" />
            <span className="text-ds-text-sub text-sm">{point}</span>
          </li>
        ))}
      </ul>

      {takeaway && (
        <div className="mt-6 pt-4 border-t border-ds-stroke-soft flex items-start gap-3 text-xs text-ds-text-sub">
          <span className="font-bold text-ds-feature-dark uppercase tracking-wider text-[10px] bg-ds-feature-lighter px-2.5 py-1 rounded-md">
            Key Rule
          </span>
          <p className="italic text-ds-text-strong font-medium">{takeaway}</p>
        </div>
      )}
    </section>
  );
}
