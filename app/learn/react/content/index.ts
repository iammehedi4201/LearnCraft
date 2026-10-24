import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import {
  react01WhatIsReactContent,
  react02JsxAndElementsContent,
  react03ComponentsAndCompositionContent,
} from "./stage-01-fundamentals";

import {
  react04PropsAndDataFlowContent,
  react05PassingFunctionsAndCallbacksContent,
  react06ChildrenAndSlotCompositionContent,
} from "./stage-02-props-communication";

import {
  react07StateAndUsestateContent,
  react08EventHandlingAndUpdatesContent,
  react09LiftingStateUpContent,
  react10DerivedStateVsStoredStateContent,
} from "./stage-03-state-interactivity";

import {
  react11ConditionalRenderingContent,
  react12RenderingListsAndKeysContent,
  react13ControlledInputsAndFormsContent,
} from "./stage-04-lists-forms";

import {
  react14UseeffectFundamentalsContent,
  react15EffectCleanupAndMistakesContent,
  react16UserefAndDomAccessContent,
  react17UsecontextAndSharedStateContent,
} from "./stage-05-core-hooks";

import {
  react18RenderCycleAndReconciliationContent,
  react19ComponentIdentityAndStatePreservationContent,
} from "./stage-06-render-cycle";

import {
  react20DataFetchingAndAsyncUiContent,
  react21RaceConditionsAndCleanupContent,
} from "./stage-07-async-data";

import {
  react22UsereducerComplexStateContent,
  react23PerformanceMemoUsememoUsecallbackContent,
  react24CustomHooksContent,
} from "./stage-08-advanced-state";

import {
  react25ErrorBoundariesAndDebuggingContent,
  react26TestingFundamentalsContent,
  react27ReactCapstoneProjectContent,
} from "./stage-09-debugging-testing";

export * from "./stage-01-fundamentals";
export * from "./stage-02-props-communication";
export * from "./stage-03-state-interactivity";
export * from "./stage-04-lists-forms";
export * from "./stage-05-core-hooks";
export * from "./stage-06-render-cycle";
export * from "./stage-07-async-data";
export * from "./stage-08-advanced-state";
export * from "./stage-09-debugging-testing";

export const ALL_REACT_LESSONS: Record<string, StandardLessonContent> = {
  // ── Stage 1: React Fundamentals & Mental Model ──
  "react01-what-is-react": react01WhatIsReactContent,
  "react02-jsx-and-elements": react02JsxAndElementsContent,
  "react03-components-and-composition": react03ComponentsAndCompositionContent,

  // ── Stage 2: Props & Component Communication ──
  "react04-props-and-data-flow": react04PropsAndDataFlowContent,
  "react05-passing-functions-and-callbacks": react05PassingFunctionsAndCallbacksContent,
  "react06-children-and-slot-composition": react06ChildrenAndSlotCompositionContent,

  // ── Stage 3: State & Interactivity ──
  "react07-state-and-usestate": react07StateAndUsestateContent,
  "react08-event-handling-and-updates": react08EventHandlingAndUpdatesContent,
  "react09-lifting-state-up": react09LiftingStateUpContent,
  "react10-derived-state-vs-stored-state": react10DerivedStateVsStoredStateContent,

  // ── Stage 4: Lists, Conditional UI & Forms ──
  "react11-conditional-rendering": react11ConditionalRenderingContent,
  "react12-rendering-lists-and-keys": react12RenderingListsAndKeysContent,
  "react13-controlled-inputs-and-forms": react13ControlledInputsAndFormsContent,

  // ── Stage 5: Core Hooks & Side Effects ──
  "react14-useeffect-fundamentals": react14UseeffectFundamentalsContent,
  "react15-effect-cleanup-and-mistakes": react15EffectCleanupAndMistakesContent,
  "react16-useref-and-dom-access": react16UserefAndDomAccessContent,
  "react17-usecontext-and-shared-state": react17UsecontextAndSharedStateContent,

  // ── Stage 6: How React Renders & Reconciles ──
  "react18-render-cycle-and-reconciliation": react18RenderCycleAndReconciliationContent,
  "react19-component-identity-and-state-preservation": react19ComponentIdentityAndStatePreservationContent,

  // ── Stage 7: Async Data Fetching & State Handling ──
  "react20-data-fetching-and-async-ui": react20DataFetchingAndAsyncUiContent,
  "react21-race-conditions-and-cleanup": react21RaceConditionsAndCleanupContent,

  // ── Stage 8: Advanced State & Performance ──
  "react22-usereducer-complex-state": react22UsereducerComplexStateContent,
  "react23-performance-memo-usememo-usecallback": react23PerformanceMemoUsememoUsecallbackContent,
  "react24-custom-hooks": react24CustomHooksContent,

  // ── Stage 9: Debugging, Testing & Capstone ──
  "react25-error-boundaries-and-debugging": react25ErrorBoundariesAndDebuggingContent,
  "react26-testing-fundamentals": react26TestingFundamentalsContent,
  "react27-react-capstone-project": react27ReactCapstoneProjectContent,
};
