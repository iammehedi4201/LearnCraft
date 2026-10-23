import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import {
  ts01WhatTypeScriptDoesContent,
  ts02TypeAnnotationsInferenceContent,
  ts03BasicTypesArraysContent,
  ts04FunctionParametersReturnTypesContent,
} from "./stage-01-basics";

import {
  ts05ObjectTypesContent,
  ts06TypeAndInterfaceContent,
  ts07UnionAndLiteralTypesContent,
  ts08OptionalValuesNullUndefinedContent,
  ts09TypeNarrowingContent,
} from "./stage-02-describe-data";

import {
  ts10AnyVsUnknownContent,
  ts11TypeAssertionsContent,
  ts12GenericsContent,
  ts13CommonUtilityTypesContent,
  ts15ModulesAndTypeImportsContent,
} from "./stage-03-safe-types";

import {
  ts14ClassesAndObjectsContent,
  ts15AccessModifiersEncapsulationContent,
  ts16InheritanceAbstractClassesContent,
  ts17PolymorphismCompositionDiContent,
} from "./stage-04-oop";

import {
  ts16PromisesAndAsyncFunctionsContent,
  ts17CheckApiDataContent,
  ts18FindAndFixTypeErrorsContent,
} from "./stage-04-real-projects";

export * from "./stage-01-basics";
export * from "./stage-02-describe-data";
export * from "./stage-03-safe-types";
export * from "./stage-04-oop";
export * from "./stage-04-real-projects";

export const ALL_TYPESCRIPT_LESSONS: Record<string, StandardLessonContent> = {
  // ── Authoritative 21 Lessons (Curriculum Source of Truth) ──
  "ts01-what-typescript-does": ts01WhatTypeScriptDoesContent,
  "ts02-type-annotations-inference": ts02TypeAnnotationsInferenceContent,
  "ts03-basic-types-arrays": ts03BasicTypesArraysContent,
  "ts04-function-parameters-return-types": ts04FunctionParametersReturnTypesContent,
  "ts05-object-types": ts05ObjectTypesContent,
  "ts06-type-and-interface": ts06TypeAndInterfaceContent,
  "ts07-union-and-literal-types": ts07UnionAndLiteralTypesContent,
  "ts08-optional-values-null-undefined": ts08OptionalValuesNullUndefinedContent,
  "ts09-type-narrowing": ts09TypeNarrowingContent,
  "ts10-any-vs-unknown": ts10AnyVsUnknownContent,
  "ts11-type-assertions": ts11TypeAssertionsContent,
  "ts12-generics": ts12GenericsContent,
  "ts13-common-utility-types": ts13CommonUtilityTypesContent,

  // Dedicated OOP Phase (TS-14 to TS-17)
  "ts14-classes-and-objects": ts14ClassesAndObjectsContent,
  "ts15-access-modifiers-encapsulation": ts15AccessModifiersEncapsulationContent,
  "ts16-inheritance-abstract-classes": ts16InheritanceAbstractClassesContent,
  "ts17-polymorphism-composition-di": ts17PolymorphismCompositionDiContent,

  // Real Projects Phase (TS-18 to TS-21)
  "ts18-modules-and-type-imports": ts15ModulesAndTypeImportsContent,
  "ts19-promises-and-async-functions": ts16PromisesAndAsyncFunctionsContent,
  "ts20-check-api-data": ts17CheckApiDataContent,
  "ts21-find-and-fix-type-errors": ts18FindAndFixTypeErrorsContent,

  // ── Backward-Compatible Aliases to Preserve Student Notes, Bookmarks & Quizzes ──
  "ts14-classes-and-implements": ts14ClassesAndObjectsContent,
  "ts15-modules-and-type-imports": ts15ModulesAndTypeImportsContent,
  "ts16-promises-and-async-functions": ts16PromisesAndAsyncFunctionsContent,
  "ts17-check-api-data": ts17CheckApiDataContent,
  "ts18-find-and-fix-type-errors": ts18FindAndFixTypeErrorsContent,

  "ts01-mental-model": ts01WhatTypeScriptDoesContent,
  "ts02-primitives-inference": ts02TypeAnnotationsInferenceContent,
  "ts03-arrays-tuples": ts03BasicTypesArraysContent,
  "ts04-object-types": ts05ObjectTypesContent,
  "ts05-special-types": ts10AnyVsUnknownContent,
  "ts06-function-types": ts04FunctionParametersReturnTypesContent,
  "ts07-function-overloads": ts04FunctionParametersReturnTypesContent,
  "ts08-unions-intersections": ts07UnionAndLiteralTypesContent,
  "ts09-type-vs-interface": ts06TypeAndInterfaceContent,
  "ts10-control-flow-guards": ts09TypeNarrowingContent,
  "ts11-custom-type-predicates": ts09TypeNarrowingContent,
  "ts12-discriminated-unions": ts07UnionAndLiteralTypesContent,
  "ts13-exhaustive-checking": ts09TypeNarrowingContent,
  "ts14-generic-functions": ts12GenericsContent,
  "ts15-generic-interfaces": ts12GenericsContent,
  "ts16-generic-constraints": ts12GenericsContent,
  "ts17-generics-keyof": ts12GenericsContent,
  "ts18-class-access-modifiers": ts15AccessModifiersEncapsulationContent,
  "ts19-parameter-properties": ts15AccessModifiersEncapsulationContent,
  "ts20-abstract-classes": ts16InheritanceAbstractClassesContent,
  "ts21-indexed-access-typeof": ts13CommonUtilityTypesContent,
  "ts22-conditional-types-infer": ts12GenericsContent,
  "ts23-mapped-template-types": ts13CommonUtilityTypesContent,
  "ts24-utility-types": ts13CommonUtilityTypesContent,
  "ts25-modules-type-imports": ts15ModulesAndTypeImportsContent,
  "ts26-tsconfig-strict-mode": ts18FindAndFixTypeErrorsContent,
  "ts27-declarations-type-erasure": ts01WhatTypeScriptDoesContent,
  "ts28-assertions-vs-satisfies": ts11TypeAssertionsContent,
  "ts29-safe-error-handling": ts10AnyVsUnknownContent,
  "ts30-api-contracts-immutability": ts17CheckApiDataContent,
  "ts31-debugging-compiler-errors": ts18FindAndFixTypeErrorsContent,
  "ts32-type-architecture-smells": ts18FindAndFixTypeErrorsContent,
};
