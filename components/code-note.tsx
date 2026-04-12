/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * CODE-NOTE COMPONENT — Explanation Display
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * This component displays the structured explanation comment in a formatted,
 * visually appealing way. It extracts the comment content and renders each
 * section with proper styling.
 *
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

interface CodeNoteProps {
  featureCode: string;
  featureName: string;
  tanstackConcept: string;
  howItWorks: string;
  nextjsConcept: string;
  whenToUse: string;
}

export function CodeNote({
  featureCode,
  featureName,
  tanstackConcept,
  howItWorks,
  nextjsConcept,
  whenToUse,
}: CodeNoteProps): JSX.Element {
  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-md mb-8">
      <div className="mb-6 pb-4 border-b-2 border-blue-200">
        <h3 className="text-lg font-bold text-gray-800">
          {featureCode} — {featureName}
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
            TanStack Query Concept
          </h4>
          <p className="text-gray-700 leading-relaxed">{tanstackConcept}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
            How It Works Under the Hood
          </h4>
          <p className="text-gray-700 leading-relaxed">{howItWorks}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
            Next.js Concept
          </h4>
          <p className="text-gray-700 leading-relaxed">{nextjsConcept}</p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 mb-2 text-sm uppercase tracking-wide">
            When to Use This
          </h4>
          <p className="text-gray-700 leading-relaxed">{whenToUse}</p>
        </div>
      </div>
    </div>
  );
}
