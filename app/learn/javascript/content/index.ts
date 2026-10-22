/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * JAVASCRIPT CURRICULUM CONTENT REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Clean modular folder structure organized into 8 sequential stages.
 * Each lesson has its own typed TypeScript file with separated code blocks,
 * syntax highlighting, runnable sandbox starter code, and knowledge quizzes.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Re-export all stages
export * from "./stage-01-foundations";
export * from "./stage-02-functions";
export * from "./stage-03-collections";
export * from "./stage-04-modern-syntax";
export * from "./stage-05-oop-prototypes";
export * from "./stage-06-async-event-loop";
export * from "./stage-07-errors-modules-apis";
export * from "./stage-08-browser-capstone";

// Import all individual lessons to build the authoritative content record
import { js01HowJavascriptRunsContent } from "./stage-01-foundations/js01-how-javascript-runs";
import { js02VariablesAndDataTypesContent } from "./stage-01-foundations/js02-variables-and-data-types";
import { js03OperatorsAndEqualityContent } from "./stage-01-foundations/js03-operators-and-equality";
import { js04ConditionalLogicContent } from "./stage-01-foundations/js04-conditional-logic";
import { js05LoopsAndIterationContent } from "./stage-01-foundations/js05-loops-and-iteration";
import { js06FunctionsAndArrowSyntaxContent } from "./stage-02-functions/js06-functions-and-arrow-syntax";
import { js07ScopeGlobalFunctionBlockContent } from "./stage-02-functions/js07-scope-global-function-block";
import { js08ClosuresContent } from "./stage-02-functions/js08-closures";
import { js09CallbacksAndHigherOrderFunctionsContent } from "./stage-02-functions/js09-callbacks-and-higher-order-functions";
import { js10ArraysAndIndexingContent } from "./stage-03-collections/js10-arrays-and-indexing";
import { js11EssentialArrayMethodsContent } from "./stage-03-collections/js11-essential-array-methods";
import { js12ObjectsAndMethodsContent } from "./stage-03-collections/js12-objects-and-methods";
import { js13ObjectReferencesAndCopyingContent } from "./stage-03-collections/js13-object-references-and-copying";
import { js14DestructuringContent } from "./stage-04-modern-syntax/js14-destructuring";
import { js15SpreadAndRestOperatorsContent } from "./stage-04-modern-syntax/js15-spread-and-rest-operators";
import { js16OptionalChainingAndNullishCoalescingContent } from "./stage-04-modern-syntax/js16-optional-chaining-and-nullish-coalescing";
import { js17TheThisKeywordContent } from "./stage-05-oop-prototypes/js17-the-this-keyword";
import { js18PrototypesAndPrototypeChainContent } from "./stage-05-oop-prototypes/js18-prototypes-and-prototype-chain";
import { js19ClassesExtendsAndSuperContent } from "./stage-05-oop-prototypes/js19-classes-extends-and-super";
import { js20SynchronousVsAsynchronousContent } from "./stage-06-async-event-loop/js20-synchronous-vs-asynchronous";
import { js21PromisesAndChainingContent } from "./stage-06-async-event-loop/js21-promises-and-chaining";
import { js22AsyncAwaitContent } from "./stage-06-async-event-loop/js22-async-await";
import { js23TheEventLoopContent } from "./stage-06-async-event-loop/js23-the-event-loop";
import { js24ErrorHandlingContent } from "./stage-07-errors-modules-apis/js24-error-handling";
import { js25EsModulesContent } from "./stage-07-errors-modules-apis/js25-es-modules";
import { js26WorkingWithJsonContent } from "./stage-07-errors-modules-apis/js26-working-with-json";
import { js27TheFetchApiContent } from "./stage-07-errors-modules-apis/js27-the-fetch-api";
import { js28DomEssentialsContent } from "./stage-08-browser-capstone/js28-dom-essentials";
import { js29EventsAndDelegationContent } from "./stage-08-browser-capstone/js29-events-and-delegation";
import { js30BrowserStorageAndDebuggingContent } from "./stage-08-browser-capstone/js30-browser-storage-and-debugging";

export const JAVASCRIPT_LESSON_CONTENT: Record<string, StandardLessonContent> = {
  "js01-how-javascript-runs": js01HowJavascriptRunsContent,
  "js02-variables-and-data-types": js02VariablesAndDataTypesContent,
  "js03-operators-and-equality": js03OperatorsAndEqualityContent,
  "js04-conditional-logic": js04ConditionalLogicContent,
  "js05-loops-and-iteration": js05LoopsAndIterationContent,
  "js06-functions-and-arrow-syntax": js06FunctionsAndArrowSyntaxContent,
  "js07-scope-global-function-block": js07ScopeGlobalFunctionBlockContent,
  "js08-closures": js08ClosuresContent,
  "js09-callbacks-and-higher-order-functions": js09CallbacksAndHigherOrderFunctionsContent,
  "js10-arrays-and-indexing": js10ArraysAndIndexingContent,
  "js11-essential-array-methods": js11EssentialArrayMethodsContent,
  "js12-objects-and-methods": js12ObjectsAndMethodsContent,
  "js13-object-references-and-copying": js13ObjectReferencesAndCopyingContent,
  "js14-destructuring": js14DestructuringContent,
  "js15-spread-and-rest-operators": js15SpreadAndRestOperatorsContent,
  "js16-optional-chaining-and-nullish-coalescing": js16OptionalChainingAndNullishCoalescingContent,
  "js17-the-this-keyword": js17TheThisKeywordContent,
  "js18-prototypes-and-prototype-chain": js18PrototypesAndPrototypeChainContent,
  "js19-classes-extends-and-super": js19ClassesExtendsAndSuperContent,
  "js20-synchronous-vs-asynchronous": js20SynchronousVsAsynchronousContent,
  "js21-promises-and-chaining": js21PromisesAndChainingContent,
  "js22-async-await": js22AsyncAwaitContent,
  "js23-the-event-loop": js23TheEventLoopContent,
  "js24-error-handling": js24ErrorHandlingContent,
  "js25-es-modules": js25EsModulesContent,
  "js26-working-with-json": js26WorkingWithJsonContent,
  "js27-the-fetch-api": js27TheFetchApiContent,
  "js28-dom-essentials": js28DomEssentialsContent,
  "js29-events-and-delegation": js29EventsAndDelegationContent,
  "js30-browser-storage-and-debugging": js30BrowserStorageAndDebuggingContent,
};

/**
 * Legacy alias for test suites and existing consumers
 */
export const JS_LESSONS_CONTENT: Record<string, any> = JAVASCRIPT_LESSON_CONTENT;

/**
 * Retrieve lesson content by slug with guaranteed fallback to the first lesson
 */
export function getJSLessonContent(slug: string): any {
  const content = JAVASCRIPT_LESSON_CONTENT[slug];
  if (!content) {
    const firstSlug = Object.keys(JAVASCRIPT_LESSON_CONTENT)[0];
    return JAVASCRIPT_LESSON_CONTENT[firstSlug];
  }
  return content;
}
