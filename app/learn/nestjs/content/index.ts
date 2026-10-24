/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * NESTJS CURRICULUM CONTENT REGISTRY
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative 20-lesson NestJS curriculum matching the LearnCraft source
 * of truth across 5 sequential stages.
 *
 * Fully backward-compatible with all legacy lesson slugs and aliases.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1: Understand the NestJS Structure
import {
  nj01WhatIsNestjsContent,
  nj03ProjectStructureAndMainContent,
  nj04ModulesContent,
} from "./stage-01-structure";

// Stage 2: Handle Requests and Organize Logic
import {
  nj05ControllersContent,
  nj06RoutesAndHttpMethodsContent,
  nj07ParametersAndRequestBodiesContent,
  nj08ProvidersAndServicesContent,
  nj09DependencyInjectionContent,
  nj10DecoratorsContent,
} from "./stage-02-requests-logic";

// Stage 3: Check Inputs and Handle Errors
import {
  nj11DtosDataTransferObjectsContent,
  nj12ValidationAndPipesContent,
  nj13HandlingErrorsContent,
} from "./stage-03-validation-errors";

// Stage 4: Control the Request Process
import {
  nj14MiddlewareContent,
  nj15GuardsAndRouteProtectionContent,
  nj16InterceptorsContent,
  nj17TheRequestLifecycleContent,
} from "./stage-04-request-lifecycle";

// Stage 5: Authentication, Testing, and Good Structure
import {
  nj18AuthenticationVsAuthorizationContent,
  nj19TestingANestjsServiceContent,
  nj20OrganizeAFeatureAndDebugContent,
} from "./stage-05-auth-testing";

export * from "./stage-01-structure";
export * from "./stage-02-requests-logic";
export * from "./stage-03-validation-errors";
export * from "./stage-04-request-lifecycle";
export * from "./stage-05-auth-testing";

export const ALL_NESTJS_LESSONS: Record<string, StandardLessonContent> = {
  // ── Stage 1: Understand the NestJS Structure (NJ-01, NJ-03, NJ-04) ──
  "nj01-what-is-nestjs": nj01WhatIsNestjsContent,
  "nj03-project-structure-and-main": nj03ProjectStructureAndMainContent,
  "nj04-modules": nj04ModulesContent,

  // ── Stage 2: Handle Requests and Organize Logic (NJ-05 to NJ-10) ──
  "nj05-controllers": nj05ControllersContent,
  "nj06-routes-and-http-methods": nj06RoutesAndHttpMethodsContent,
  "nj07-parameters-and-request-bodies": nj07ParametersAndRequestBodiesContent,
  "nj08-providers-and-services": nj08ProvidersAndServicesContent,
  "nj09-dependency-injection": nj09DependencyInjectionContent,
  "nj10-decorators": nj10DecoratorsContent,

  // ── Stage 3: Check Inputs and Handle Errors (NJ-11 to NJ-13) ──
  "nj11-dtos-data-transfer-objects": nj11DtosDataTransferObjectsContent,
  "nj12-validation-and-pipes": nj12ValidationAndPipesContent,
  "nj13-handling-errors": nj13HandlingErrorsContent,

  // ── Stage 4: Control the Request Process (NJ-14 to NJ-17) ──
  "nj14-middleware": nj14MiddlewareContent,
  "nj15-guards-and-route-protection": nj15GuardsAndRouteProtectionContent,
  "nj16-interceptors": nj16InterceptorsContent,
  "nj17-the-request-lifecycle": nj17TheRequestLifecycleContent,

  // ── Stage 5: Authentication, Testing, and Good Structure (NJ-18 to NJ-20) ──
  "nj18-authentication-vs-authorization": nj18AuthenticationVsAuthorizationContent,
  "nj19-testing-a-nestjs-service": nj19TestingANestjsServiceContent,
  "nj20-organize-a-feature-and-debug": nj20OrganizeAFeatureAndDebugContent,

  // ── Backward-Compatible Legacy Aliases ──
  "nj01-typescript-essentials": nj01WhatIsNestjsContent,
  "nj02-oop-foundations": nj03ProjectStructureAndMainContent,
  "nj02-typescript-basics": nj03ProjectStructureAndMainContent,
  "nj03-decorators": nj10DecoratorsContent,
  "nj04-solid": nj08ProvidersAndServicesContent,
  "nj05-setup": nj03ProjectStructureAndMainContent,
  "nj06-modules": nj04ModulesContent,
  "nj07-controllers": nj05ControllersContent,
  "nj08-services": nj08ProvidersAndServicesContent,
  "nj10-dto-validation": nj11DtosDataTransferObjectsContent,
  "nj11-request-lifecycle": nj17TheRequestLifecycleContent,
  "nj12-pipes": nj12ValidationAndPipesContent,
  "nj13-guards": nj15GuardsAndRouteProtectionContent,
  "nj14-interceptors": nj16InterceptorsContent,
  "nj15-exception-filters": nj13HandlingErrorsContent,
  "nj16-middleware": nj14MiddlewareContent,
  "nj17-custom-decorators": nj10DecoratorsContent,
  "nj18-auth-jwt": nj18AuthenticationVsAuthorizationContent,
  "nj19-rbac": nj18AuthenticationVsAuthorizationContent,
  "nj20-security": nj18AuthenticationVsAuthorizationContent,
  "nj21-database-prisma": nj20OrganizeAFeatureAndDebugContent,
  "nj22-entities-relations": nj20OrganizeAFeatureAndDebugContent,
  "nj23-migrations-seeding": nj20OrganizeAFeatureAndDebugContent,
  "nj24-pagination-filtering": nj07ParametersAndRequestBodiesContent,
  "nj25-serialization": nj16InterceptorsContent,
  "nj26-config": nj03ProjectStructureAndMainContent,
  "nj27-logging": nj14MiddlewareContent,
  "nj28-testing": nj19TestingANestjsServiceContent,
  "nj29-swagger": nj11DtosDataTransferObjectsContent,
  "nj30-file-uploads": nj07ParametersAndRequestBodiesContent,
  "nj31-caching": nj16InterceptorsContent,
  "nj32-deployment": nj20OrganizeAFeatureAndDebugContent,
};
