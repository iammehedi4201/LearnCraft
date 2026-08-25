export const BLOCK_COMPONENT_MAP: Record<string, string> = {
  WhyBox: "why-box",
  AnalogyBox: "analogy-box",
  CalloutBox: "callout-box",
  ConceptTable: "concept-table",
  ComparisonTable: "comparison-table",
  ImportantNote: "important-note",
  ProTip: "pro-tip",
  MistakeBox: "mistake-box",
  DeepDiveBox: "deep-dive",
  WarningBox: "warning-box",
  CodePlayground: "playground",
  Playground: "playground",
  ExerciseBox: "exercise-box",
  KnowledgeCheck: "knowledge-check",
  ExplanationBlock: "explanation",
};

export function getBlockTypeForComponent(componentName: string): string | null {
  return BLOCK_COMPONENT_MAP[componentName] || null;
}
