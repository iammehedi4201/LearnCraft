import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import { pri13WhatArePrismaMigrationsContent } from "./pri13-what-are-prisma-migrations";
import { pri14PrismaStudioAndSeedDataContent } from "./pri14-prisma-studio-and-seed-data";
import { pri15HandlePrismaErrorsContent } from "./pri15-handle-prisma-errors";

export {
  pri13WhatArePrismaMigrationsContent,
  pri14PrismaStudioAndSeedDataContent,
  pri15HandlePrismaErrorsContent,
};

export const STAGE_04_PRISMA_LESSONS: StandardLessonContent[] = [
  pri13WhatArePrismaMigrationsContent,
  pri14PrismaStudioAndSeedDataContent,
  pri15HandlePrismaErrorsContent,
];
