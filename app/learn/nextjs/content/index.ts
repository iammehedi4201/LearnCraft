/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NEXT.JS CURRICULUM CONTENT REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 20-lesson Next.js App Router curriculum matching the
 * LearnCraft source of truth across 5 sequential stages.
 *
 * Fully backward-compatible with all legacy lesson slugs and aliases.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1: The Next.js Basics
import {
  nx01WhatIsNextjsContent,
  nx02AppFolderAndRoutesContent,
  nx03PagesAndLayoutsContent,
  nx04MovingBetweenPagesWithLinkContent,
  nx05DynamicRoutesContent,
} from "./stage-01-basics";

// Stage 2: Server and Client Components
import {
  nx06ServerAndClientComponentsContent,
  nx07ClientSideInteractionContent,
} from "./stage-02-server-client";

// Stage 3: Loading and Showing Data
import {
  nx08FetchingDataServerComponentContent,
  nx09UrlAndSearchParametersContent,
  nx10LoadingUiContent,
  nx11MissingPagesAndErrorsContent,
} from "./stage-03-loading-data";

// Stage 4: Changing Data and Building Endpoints
import {
  nx12FormsAndServerActionsContent,
  nx13RouteHandlersContent,
  nx14RevalidatingDataContent,
} from "./stage-04-mutations-endpoints";

// Stage 5: Page Details and Project Safety
import {
  nx15PageTitlesAndMetadataContent,
  nx16ImagesAndStaticFilesContent,
  nx17EnvironmentVariablesAndSecretsContent,
  nx18AuthenticationAndAuthorizationContent,
  nx19ValidatingUserInputContent,
  nx20DebuggingNextjsProblemsContent,
  nx21WebsitePerformanceOptimizationContent,
} from "./stage-05-details-safety";

export * from "./stage-01-basics";
export * from "./stage-02-server-client";
export * from "./stage-03-loading-data";
export * from "./stage-04-mutations-endpoints";
export * from "./stage-05-details-safety";

export const ALL_NEXTJS_LESSONS: Record<string, StandardLessonContent> = {
  // ── Stage 1: The Next.js Basics (NX-01 to NX-05) ──
  "nx01-what-is-nextjs": nx01WhatIsNextjsContent,
  "nx02-app-folder-and-routes": nx02AppFolderAndRoutesContent,
  "nx03-pages-and-layouts": nx03PagesAndLayoutsContent,
  "nx04-moving-between-pages-with-link": nx04MovingBetweenPagesWithLinkContent,
  "nx05-dynamic-routes": nx05DynamicRoutesContent,

  // ── Stage 2: Server and Client Components (NX-06 to NX-07) ──
  "nx06-server-and-client-components": nx06ServerAndClientComponentsContent,
  "nx07-client-side-interaction": nx07ClientSideInteractionContent,

  // ── Stage 3: Loading and Showing Data (NX-08 to NX-11) ──
  "nx08-fetching-data-server-component": nx08FetchingDataServerComponentContent,
  "nx09-url-and-search-parameters": nx09UrlAndSearchParametersContent,
  "nx10-loading-ui": nx10LoadingUiContent,
  "nx11-missing-pages-and-errors": nx11MissingPagesAndErrorsContent,

  // ── Stage 4: Changing Data and Building Endpoints (NX-12 to NX-14) ──
  "nx12-forms-and-server-actions": nx12FormsAndServerActionsContent,
  "nx13-route-handlers": nx13RouteHandlersContent,
  "nx14-revalidating-data": nx14RevalidatingDataContent,

  // ── Stage 5: Performance Optimization and Safety (NX-15 to NX-21) ──
  "nx15-page-titles-and-metadata": nx15PageTitlesAndMetadataContent,
  "nx16-images-and-static-files": nx16ImagesAndStaticFilesContent,
  "nx17-environment-variables-and-secrets": nx17EnvironmentVariablesAndSecretsContent,
  "nx18-authentication-and-authorization": nx18AuthenticationAndAuthorizationContent,
  "nx19-validating-user-input": nx19ValidatingUserInputContent,
  "nx20-debugging-nextjs-problems": nx20DebuggingNextjsProblemsContent,
  "nx21-website-performance-optimization": nx21WebsitePerformanceOptimizationContent,
  "nx21-performance-optimization": nx21WebsitePerformanceOptimizationContent,

  // ── Backward-Compatible Legacy Aliases ──
  "nx01-app-router": nx01WhatIsNextjsContent,
  "nx02-navigation": nx04MovingBetweenPagesWithLinkContent,
  "nx02-routing": nx02AppFolderAndRoutesContent,
  "nx03-layouts": nx03PagesAndLayoutsContent,
  "nx03-server-client": nx06ServerAndClientComponentsContent,
  "nx04-dynamic-routes": nx05DynamicRoutesContent,
  "nx04-layouts": nx03PagesAndLayoutsContent,
  "nx05-dynamic": nx05DynamicRoutesContent,
  "nx05-images-fonts": nx16ImagesAndStaticFilesContent,
  "nx06-server-fetch": nx08FetchingDataServerComponentContent,
  "nx07-server-data-fetching": nx08FetchingDataServerComponentContent,
  "nx07-client-fetch": nx07ClientSideInteractionContent,
  "nx08-streaming-suspense": nx10LoadingUiContent,
  "nx08-errors": nx11MissingPagesAndErrorsContent,
  "nx09-error-handling": nx11MissingPagesAndErrorsContent,
  "nx09-loading": nx10LoadingUiContent,
  "nx10-server-actions": nx12FormsAndServerActionsContent,
  "nx11-form-state": nx12FormsAndServerActionsContent,
  "nx11-middleware": nx18AuthenticationAndAuthorizationContent,
  "nx12-optimistic-updates": nx12FormsAndServerActionsContent,
  "nx12-metadata": nx15PageTitlesAndMetadataContent,
  "nx13-zod-validation": nx19ValidatingUserInputContent,
  "nx13-images": nx16ImagesAndStaticFilesContent,
  "nx14-static-dynamic-rendering": nx06ServerAndClientComponentsContent,
  "nx14-fonts": nx16ImagesAndStaticFilesContent,
  "nx15-caching-layers": nx14RevalidatingDataContent,
  "nx15-scripts": nx16ImagesAndStaticFilesContent,
  "nx16-revalidation": nx14RevalidatingDataContent,
  "nx16-ssg": nx14RevalidatingDataContent,
  "nx17-metadata-seo": nx15PageTitlesAndMetadataContent,
  "nx17-isr": nx14RevalidatingDataContent,
  "nx18-caching": nx14RevalidatingDataContent,
  "nx19-authentication-sessions": nx18AuthenticationAndAuthorizationContent,
  "nx19-env": nx17EnvironmentVariablesAndSecretsContent,
  "nx20-edge-middleware": nx18AuthenticationAndAuthorizationContent,
  "nx20-deployment": nx20DebuggingNextjsProblemsContent,
  "nx21-env-security": nx17EnvironmentVariablesAndSecretsContent,
  "nx22-production-docker": nx20DebuggingNextjsProblemsContent,
};
