/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURRICULUM CONTENT REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 22-lesson JavaScript curriculum matching the LearnCraft
 * curriculum source of truth across 4 sequential stages.
 *
 * Fully backward-compatible with all 30 legacy lesson slugs.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1: Foundations
import {
  js01WhatJavascriptDoesContent,
  js02VariablesConstAndLetContent,
  js03BasicValuesAndTypesContent,
  js04ComparisonsAndStrictEqualityContent,
  js05ConditionsAndTruthyFalsyContent,
  js06LoopsContent,
  js07FunctionsAndReturnValuesContent,
  js08ScopeAndBlockScopeContent,
} from "./stage-01-foundations";

// Stage 2: Working with Data
import {
  js09ArraysAndCommonMethodsContent,
  js10ObjectsDestructuringAndSpreadContent,
  js11PrimitiveValuesVsObjectReferencesContent,
  js12OptionalChainingAndNullishCoalescingContent,
  js13SpreadVsRestContent,
} from "./stage-02-working-with-data";

// Stage 3: Functions and Behavior
import {
  js14CallbacksAndHigherOrderFunctionsContent,
  js15ClosuresContent,
  js16TheThisKeywordContent,
  js17ErrorsAndDebuggingContent,
} from "./stage-03-functions-and-behavior";

// Stage 4: Async JavaScript and Real Applications
import {
  js18PromisesAndAsyncAwaitContent,
  js19TheEventLoopABasicViewContent,
  js20DomEventsContent,
  js21JsonFetchAndApiResponsesContent,
  js22JavascriptModulesContent,
} from "./stage-04-async-and-applications";

// Re-export all stage modules
export * from "./stage-01-foundations";
export * from "./stage-02-working-with-data";
export * from "./stage-03-functions-and-behavior";
export * from "./stage-04-async-and-applications";

// Re-export old stages to preserve import integrity
export * from "./stage-02-functions";
export * from "./stage-03-collections";
export * from "./stage-04-modern-syntax";
export * from "./stage-05-oop-prototypes";
export * from "./stage-06-async-event-loop";
export * from "./stage-07-errors-modules-apis";
export * from "./stage-08-browser-capstone";

export const JAVASCRIPT_LESSON_CONTENT: Record<string, StandardLessonContent> = {
  // ── Authoritative 22 Lessons (Curriculum Source of Truth) ──
  "js01-what-javascript-does": js01WhatJavascriptDoesContent,
  "js02-variables-const-and-let": js02VariablesConstAndLetContent,
  "js03-basic-values-and-types": js03BasicValuesAndTypesContent,
  "js04-comparisons-and-strict-equality": js04ComparisonsAndStrictEqualityContent,
  "js05-conditions-and-truthy-falsy": js05ConditionsAndTruthyFalsyContent,
  "js06-loops": js06LoopsContent,
  "js07-functions-and-return-values": js07FunctionsAndReturnValuesContent,
  "js08-scope-and-block-scope": js08ScopeAndBlockScopeContent,
  "js09-arrays-and-common-methods": js09ArraysAndCommonMethodsContent,
  "js10-objects-destructuring-and-spread": js10ObjectsDestructuringAndSpreadContent,
  "js11-primitive-values-vs-object-references": js11PrimitiveValuesVsObjectReferencesContent,
  "js12-optional-chaining-and-nullish-coalescing": js12OptionalChainingAndNullishCoalescingContent,
  "js13-spread-vs-rest": js13SpreadVsRestContent,
  "js14-callbacks-and-higher-order-functions": js14CallbacksAndHigherOrderFunctionsContent,
  "js15-closures": js15ClosuresContent,
  "js16-the-this-keyword": js16TheThisKeywordContent,
  "js17-errors-and-debugging": js17ErrorsAndDebuggingContent,
  "js18-promises-and-async-await": js18PromisesAndAsyncAwaitContent,
  "js19-the-event-loop-a-basic-view": js19TheEventLoopABasicViewContent,
  "js20-dom-events": js20DomEventsContent,
  "js21-json-fetch-and-api-responses": js21JsonFetchAndApiResponsesContent,
  "js22-javascript-modules": js22JavascriptModulesContent,

  // ── Backward-Compatible Legacy Aliases (Preserve Progress, Bookmarks & Notes) ──
  "js01-how-javascript-runs": js01WhatJavascriptDoesContent,
  "js02-variables-and-data-types": js02VariablesConstAndLetContent,
  "js03-operators-and-equality": js04ComparisonsAndStrictEqualityContent,
  "js04-conditional-logic": js05ConditionsAndTruthyFalsyContent,
  "js05-loops-and-iteration": js06LoopsContent,
  "js06-functions-and-arrow-syntax": js07FunctionsAndReturnValuesContent,
  "js07-scope-global-function-block": js08ScopeAndBlockScopeContent,
  "js08-closures": js15ClosuresContent,
  "js09-callbacks-and-higher-order-functions": js14CallbacksAndHigherOrderFunctionsContent,
  "js10-arrays-and-indexing": js09ArraysAndCommonMethodsContent,
  "js11-essential-array-methods": js09ArraysAndCommonMethodsContent,
  "js12-objects-and-methods": js10ObjectsDestructuringAndSpreadContent,
  "js13-object-references-and-copying": js11PrimitiveValuesVsObjectReferencesContent,
  "js14-destructuring": js10ObjectsDestructuringAndSpreadContent,
  "js15-spread-and-rest-operators": js13SpreadVsRestContent,
  "js16-optional-chaining-and-nullish-coalescing": js12OptionalChainingAndNullishCoalescingContent,
  "js17-the-this-keyword": js16TheThisKeywordContent,
  "js18-prototypes-and-prototype-chain": js16TheThisKeywordContent,
  "js19-classes-extends-and-super": js16TheThisKeywordContent,
  "js20-synchronous-vs-asynchronous": js18PromisesAndAsyncAwaitContent,
  "js21-promises-and-chaining": js18PromisesAndAsyncAwaitContent,
  "js22-async-await": js18PromisesAndAsyncAwaitContent,
  "js23-the-event-loop": js19TheEventLoopABasicViewContent,
  "js24-error-handling": js17ErrorsAndDebuggingContent,
  "js25-es-modules": js22JavascriptModulesContent,
  "js26-working-with-json": js21JsonFetchAndApiResponsesContent,
  "js27-the-fetch-api": js21JsonFetchAndApiResponsesContent,
  "js28-dom-essentials": js20DomEventsContent,
  "js29-events-and-delegation": js20DomEventsContent,
  "js30-browser-storage-and-debugging": js17ErrorsAndDebuggingContent,
};

/**
 * Legacy alias for test suites and existing consumers
 */
export const JS_LESSONS_CONTENT: Record<string, StandardLessonContent> = JAVASCRIPT_LESSON_CONTENT;

/**
 * Retrieve lesson content by slug, code, or alias with guaranteed fallback to the first lesson
 */
export function getJSLessonContent(slug: string): StandardLessonContent {
  const normalized = slug.toLowerCase().trim();
  if (JAVASCRIPT_LESSON_CONTENT[normalized]) {
    return JAVASCRIPT_LESSON_CONTENT[normalized];
  }

  // Match by lesson code (e.g., "JS-01", "js01")
  const byCode = Object.values(JAVASCRIPT_LESSON_CONTENT).find(
    (l) =>
      l.code?.toLowerCase() === normalized ||
      l.code?.toLowerCase().replace("-", "") === normalized.replace("-", "") ||
      l.slug?.toLowerCase() === normalized
  );
  if (byCode) return byCode;

  // Fallback to first authoritative lesson
  return js01WhatJavascriptDoesContent;
}
