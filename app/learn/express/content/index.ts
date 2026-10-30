import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

// Stage 1
export * from "./stage-01-understand-express";
import { STAGE_01_LESSONS } from "./stage-01-understand-express";

// Stage 2
export * from "./stage-02-routes-middleware";
import { STAGE_02_LESSONS } from "./stage-02-routes-middleware";

// Stage 3
export * from "./stage-03-build-apis";
import { STAGE_03_LESSONS } from "./stage-03-build-apis";

// Stage 4
export * from "./stage-04-access-safety";
import { STAGE_04_LESSONS } from "./stage-04-access-safety";

// Stage 5
export * from "./stage-05-improve-test";
import { STAGE_05_LESSONS } from "./stage-05-improve-test";

/**
 * All 22 official Express.js lessons derived from the authoritative curriculum specification.
 */
export const ALL_EXPRESS_LESSONS: StandardLessonContent[] = [
  ...STAGE_01_LESSONS,
  ...STAGE_02_LESSONS,
  ...STAGE_03_LESSONS,
  ...STAGE_04_LESSONS,
  ...STAGE_05_LESSONS,
];

/**
 * Backward compatibility map from legacy lesson slugs and codes (EXP-01 through EXP-28)
 * to the authoritative 22-lesson schema.
 */
export const EXPRESS_LEGACY_SLUG_MAP: Record<string, string> = {
  // Direct legacy slugs
  "exp01-what-is-express": "exp01-what-is-express",
  "exp02-app-object": "exp02-starting-an-express-project",
  "exp03-req-res-cycle": "exp03-requests-and-responses",
  "exp04-http-methods-routes": "exp04-http-methods-and-status-codes",
  "exp05-route-query-params": "exp05-routes-and-route-parameters",
  "exp06-express-router": "exp09-routers-and-organizing-routes",
  "exp07-headers-status-json": "exp10-sending-json-and-choosing-a-response",
  "exp08-body-parsing": "exp07-reading-a-request-body",
  "exp09-response-helpers": "exp10-sending-json-and-choosing-a-response",
  "exp10-middleware-mental-model": "exp08-middleware",
  "exp11-middleware-scopes": "exp08-middleware",
  "exp12-custom-middleware-order": "exp08-middleware",
  "exp13-rest-crud-endpoints": "exp11-build-rest-style-routes",
  "exp14-pagination-filtering": "exp06-query-parameters",
  "exp15-api-response-envelopes": "exp10-sending-json-and-choosing-a-response",
  "exp16-request-validation": "exp12-validate-user-input",
  "exp17-validation-middleware": "exp12-validate-user-input",
  "exp18-sync-async-errors": "exp13-handling-errors",
  "exp19-error-handling-middleware": "exp13-handling-errors",
  "exp20-404-global-error-handling": "exp13-handling-errors",
  "exp21-controller-service-separation": "exp15-separate-route-logic-from-business-logic",
  "exp22-env-config-bootstrap": "exp19-environment-variables-and-configuration",
  "exp23-auth-concepts": "exp17-authentication-and-authorization-basics",
  "exp24-jwt-auth-middleware": "exp17-authentication-and-authorization-basics",
  "exp25-rbac-guards": "exp17-authentication-and-authorization-basics",
  "exp26-debugging-common-mistakes": "exp21-logging-and-debugging-requests",
  "exp27-testing-express-supertest": "exp20-testing-express-routes",
  "exp28-production-best-practices": "exp18-basic-express-security",

  // Legacy code aliases
  "exp-01": "exp01-what-is-express",
  "exp-02": "exp02-starting-an-express-project",
  "exp-03": "exp03-requests-and-responses",
  "exp-04": "exp04-http-methods-and-status-codes",
  "exp-05": "exp05-routes-and-route-parameters",
  "exp-06": "exp06-query-parameters",
  "exp-07": "exp07-reading-a-request-body",
  "exp-08": "exp08-middleware",
  "exp-09": "exp09-routers-and-organizing-routes",
  "exp-10": "exp10-sending-json-and-choosing-a-response",
  "exp-11": "exp11-build-rest-style-routes",
  "exp-12": "exp12-validate-user-input",
  "exp-13": "exp13-handling-errors",
  "exp-14": "exp14-async-route-handlers",
  "exp-15": "exp15-separate-route-logic-from-business-logic",
  "exp-16": "exp16-cors",
  "exp-17": "exp17-authentication-and-authorization-basics",
  "exp-18": "exp18-basic-express-security",
  "exp-19": "exp19-environment-variables-and-configuration",
  "exp-20": "exp20-testing-express-routes",
  "exp-21": "exp21-logging-and-debugging-requests",
  "exp-22": "exp22-build-a-small-rest-api",
  "exp-23": "exp17-authentication-and-authorization-basics",
  "exp-24": "exp17-authentication-and-authorization-basics",
  "exp-25": "exp17-authentication-and-authorization-basics",
  "exp-26": "exp21-logging-and-debugging-requests",
  "exp-27": "exp20-testing-express-routes",
  "exp-28": "exp18-basic-express-security",
};

export const EXPRESS_LESSONS_BY_SLUG: Record<string, StandardLessonContent> = {};
export const EXPRESS_LESSONS_BY_CODE: Record<string, StandardLessonContent> = {};

for (const lesson of ALL_EXPRESS_LESSONS) {
  if (lesson.slug) EXPRESS_LESSONS_BY_SLUG[lesson.slug] = lesson;
  if (lesson.code) EXPRESS_LESSONS_BY_CODE[lesson.code] = lesson;
}

/**
 * Resolves a lesson slug, code, or legacy alias to its StandardLessonContent.
 */
export function getExpressLessonBySlug(slugOrCode: string): StandardLessonContent | undefined {
  if (!slugOrCode) return undefined;
  const normalized = slugOrCode.toLowerCase().trim();

  // 1. Direct match by slug
  const directMatch = ALL_EXPRESS_LESSONS.find(
    (l) => l.slug?.toLowerCase() === normalized || l.code?.toLowerCase() === normalized
  );
  if (directMatch) return directMatch;

  // 2. Lookup in legacy alias map
  const mappedSlug = EXPRESS_LEGACY_SLUG_MAP[normalized];
  if (mappedSlug) {
    return ALL_EXPRESS_LESSONS.find((l) => l.slug?.toLowerCase() === mappedSlug.toLowerCase());
  }

  return undefined;
}
