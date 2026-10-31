import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import { pri01WhatIsPrismaContent } from "./pri01-what-is-prisma";
import { pri02PrismaProjectSetupAndMainFilesContent } from "./pri02-prisma-project-setup-and-main-files";
import { pri03PrismaSchemaAndModelsContent } from "./pri03-prisma-schema-and-models";
import { pri04FieldTypesAndSchemaAttributesContent } from "./pri04-field-types-and-schema-attributes";

export {
  pri01WhatIsPrismaContent,
  pri02PrismaProjectSetupAndMainFilesContent,
  pri03PrismaSchemaAndModelsContent,
  pri04FieldTypesAndSchemaAttributesContent,
};

export const STAGE_01_PRISMA_LESSONS: StandardLessonContent[] = [
  pri01WhatIsPrismaContent,
  pri02PrismaProjectSetupAndMainFilesContent,
  pri03PrismaSchemaAndModelsContent,
  pri04FieldTypesAndSchemaAttributesContent,
];
