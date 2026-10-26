/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NODE.JS CURRICULUM CONTENT REGISTRY — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 20-lesson Node.js curriculum matching the LearnCraft source
 * of truth across 6 sequential parts/stages.
 *
 * Full backward-compatibility with all legacy lesson slugs, codes, and aliases.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1: Understand Node.js and Start a Project
import {
  node01WhatIsNodejsContent,
  node02StartAndRunANodejsProjectContent,
  node03WhatAreNpmAndPackagesContent,
  node04ImportAndExportCodeContent,
} from "./stage-01-understand-nodejs";

// Stage 2: Work with Files and Settings
import {
  node05ReadEnvironmentVariablesSafelyContent,
  node06ReadAndWriteFilesContent,
  node07WhyThePathModuleMattersContent,
} from "./stage-02-files-settings";

// Stage 3: Understand Asynchronous JavaScript in Node.js
import {
  node08SynchronousVsAsynchronousWorkContent,
  node09UseAsyncAndAwaitContent,
  node10UnderstandTheEventLoopContent,
  node11HandleErrorsWithTryCatchContent,
} from "./stage-03-async-javascript";

// Stage 4: Handle Events and Data
import {
  node12EventsAndEventemitterContent,
  node13BuffersAndStreamsContent,
} from "./stage-04-events-data";

// Stage 5: Build Basic Server Features
import {
  node14UnderstandHttpRequestsAndResponsesContent,
  node15MakeAnHttpRequestWithFetchContent,
} from "./stage-05-server-features";

// Stage 6: Protect and Maintain the Application
import {
  node16ValidateInputAndAvoidTrustingUsersContent,
  node17UseProcessAndExitCodesContent,
  node18DebugNodejsCodeContent,
  node19WriteBasicTestsContent,
  node20KeepANodejsApplicationResponsiveContent,
} from "./stage-06-protect-maintain";

export * from "./stage-01-understand-nodejs";
export * from "./stage-02-files-settings";
export * from "./stage-03-async-javascript";
export * from "./stage-04-events-data";
export * from "./stage-05-server-features";
export * from "./stage-06-protect-maintain";

export const ALL_NODEJS_LESSONS: Record<string, StandardLessonContent> = {
  // ── Stage 1: Understand Node.js and Start a Project (NODE-01 to NODE-04) ──
  "node01-what-is-nodejs": node01WhatIsNodejsContent,
  "node02-start-and-run-a-nodejs-project": node02StartAndRunANodejsProjectContent,
  "node03-what-are-npm-and-packages": node03WhatAreNpmAndPackagesContent,
  "node04-import-and-export-code": node04ImportAndExportCodeContent,

  // ── Stage 2: Work with Files and Settings (NODE-05 to NODE-07) ──
  "node05-read-environment-variables-safely": node05ReadEnvironmentVariablesSafelyContent,
  "node06-read-and-write-files": node06ReadAndWriteFilesContent,
  "node07-why-the-path-module-matters": node07WhyThePathModuleMattersContent,

  // ── Stage 3: Understand Asynchronous JavaScript in Node.js (NODE-08 to NODE-11) ──
  "node08-synchronous-vs-asynchronous-work": node08SynchronousVsAsynchronousWorkContent,
  "node09-use-async-and-await": node09UseAsyncAndAwaitContent,
  "node10-understand-the-event-loop": node10UnderstandTheEventLoopContent,
  "node11-handle-errors-with-try-catch": node11HandleErrorsWithTryCatchContent,

  // ── Stage 4: Handle Events and Data (NODE-12 to NODE-13) ──
  "node12-events-and-eventemitter": node12EventsAndEventemitterContent,
  "node13-buffers-and-streams": node13BuffersAndStreamsContent,

  // ── Stage 5: Build Basic Server Features (NODE-14 to NODE-15) ──
  "node14-understand-http-requests-and-responses": node14UnderstandHttpRequestsAndResponsesContent,
  "node15-make-an-http-request-with-fetch": node15MakeAnHttpRequestWithFetchContent,

  // ── Stage 6: Protect and Maintain the Application (NODE-16 to NODE-20) ──
  "node16-validate-input-and-avoid-trusting-users": node16ValidateInputAndAvoidTrustingUsersContent,
  "node17-use-process-and-exit-codes": node17UseProcessAndExitCodesContent,
  "node18-debug-nodejs-code": node18DebugNodejsCodeContent,
  "node19-write-basic-tests": node19WriteBasicTestsContent,
  "node20-keep-a-nodejs-application-responsive": node20KeepANodejsApplicationResponsiveContent,

  // ── Short prefix aliases ──
  node01: node01WhatIsNodejsContent,
  node02: node02StartAndRunANodejsProjectContent,
  node03: node03WhatAreNpmAndPackagesContent,
  node04: node04ImportAndExportCodeContent,
  node05: node05ReadEnvironmentVariablesSafelyContent,
  node06: node06ReadAndWriteFilesContent,
  node07: node07WhyThePathModuleMattersContent,
  node08: node08SynchronousVsAsynchronousWorkContent,
  node09: node09UseAsyncAndAwaitContent,
  node10: node10UnderstandTheEventLoopContent,
  node11: node11HandleErrorsWithTryCatchContent,
  node12: node12EventsAndEventemitterContent,
  node13: node13BuffersAndStreamsContent,
  node14: node14UnderstandHttpRequestsAndResponsesContent,
  node15: node15MakeAnHttpRequestWithFetchContent,
  node16: node16ValidateInputAndAvoidTrustingUsersContent,
  node17: node17UseProcessAndExitCodesContent,
  node18: node18DebugNodejsCodeContent,
  node19: node19WriteBasicTestsContent,
  node20: node20KeepANodejsApplicationResponsiveContent,

  // ── Code aliases ──
  "NODE-01": node01WhatIsNodejsContent,
  "NODE-02": node02StartAndRunANodejsProjectContent,
  "NODE-03": node03WhatAreNpmAndPackagesContent,
  "NODE-04": node04ImportAndExportCodeContent,
  "NODE-05": node05ReadEnvironmentVariablesSafelyContent,
  "NODE-06": node06ReadAndWriteFilesContent,
  "NODE-07": node07WhyThePathModuleMattersContent,
  "NODE-08": node08SynchronousVsAsynchronousWorkContent,
  "NODE-09": node09UseAsyncAndAwaitContent,
  "NODE-10": node10UnderstandTheEventLoopContent,
  "NODE-11": node11HandleErrorsWithTryCatchContent,
  "NODE-12": node12EventsAndEventemitterContent,
  "NODE-13": node13BuffersAndStreamsContent,
  "NODE-14": node14UnderstandHttpRequestsAndResponsesContent,
  "NODE-15": node15MakeAnHttpRequestWithFetchContent,
  "NODE-16": node16ValidateInputAndAvoidTrustingUsersContent,
  "NODE-17": node17UseProcessAndExitCodesContent,
  "NODE-18": node18DebugNodejsCodeContent,
  "NODE-19": node19WriteBasicTestsContent,
  "NODE-20": node20KeepANodejsApplicationResponsiveContent,

  // ── Backward-compatible legacy aliases (preserves user data & existing links) ──
  "node02-nodejs-vs-browser": node02StartAndRunANodejsProjectContent,
  "node03-event-loop-and-async-io": node10UnderstandTheEventLoopContent,
  "node04-commonjs-vs-esm": node04ImportAndExportCodeContent,
  "node05-npm-and-package-json": node03WhatAreNpmAndPackagesContent,
  "node06-path-module-and-filenames": node07WhyThePathModuleMattersContent,
  "node07-fs-module-reading-writing": node06ReadAndWriteFilesContent,
  "node08-fs-promises-safe-operations": node06ReadAndWriteFilesContent,
  "node09-event-emitter-pattern": node12EventsAndEventemitterContent,
  "node10-buffers-and-binary-data": node13BuffersAndStreamsContent,
  "node11-streams-readable-writable": node13BuffersAndStreamsContent,
  "node12-piping-and-backpressure": node13BuffersAndStreamsContent,
  "node13-http-module-server-basics": node14UnderstandHttpRequestsAndResponsesContent,
  "node14-http-routing-and-json": node14UnderstandHttpRequestsAndResponsesContent,
  "node15-parsing-http-request-bodies": node14UnderstandHttpRequestsAndResponsesContent,
  "node16-process-env-and-configuration": node05ReadEnvironmentVariablesSafelyContent,
  "node17-error-handling-and-exit-codes": node11HandleErrorsWithTryCatchContent,
  "node18-graceful-shutdown-signals": node17UseProcessAndExitCodesContent,
  "node19-application-architecture-clean-design": node20KeepANodejsApplicationResponsiveContent,
  "node20-debugging-node-inspector": node18DebugNodejsCodeContent,
  "node21-testing-with-node-test-runner": node19WriteBasicTestsContent,
  "node22-best-practices-and-anti-patterns": node20KeepANodejsApplicationResponsiveContent,
  "node23-core-interview-concepts": node20KeepANodejsApplicationResponsiveContent,
  "node24-nodejs-capstone-project": node20KeepANodejsApplicationResponsiveContent,

  // Interview Question cross-reference aliases
  "node02-event-loop-libuv": node10UnderstandTheEventLoopContent,
  "node03-modules-cjs-vs-esm": node04ImportAndExportCodeContent,
  "node04-event-emitter-pattern": node12EventsAndEventemitterContent,
  "node05-streams-and-buffers": node13BuffersAndStreamsContent,
  "node06-native-http-server": node14UnderstandHttpRequestsAndResponsesContent,
  "node08-worker-threads-and-cluster": node20KeepANodejsApplicationResponsiveContent,
};
