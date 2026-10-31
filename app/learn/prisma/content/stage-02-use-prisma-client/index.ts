import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import { pri05WhatIsPrismaClientContent } from "./pri05-what-is-prisma-client";
import { pri06CreateAndReadRecordsContent } from "./pri06-create-and-read-records";
import { pri07UpdateAndDeleteRecordsContent } from "./pri07-update-and-delete-records";
import { pri08FilteringAndSortingDataContent } from "./pri08-filtering-and-sorting-data";
import { pri09SelectOnlyTheFieldsYouNeedContent } from "./pri09-select-only-the-fields-you-need";

export {
  pri05WhatIsPrismaClientContent,
  pri06CreateAndReadRecordsContent,
  pri07UpdateAndDeleteRecordsContent,
  pri08FilteringAndSortingDataContent,
  pri09SelectOnlyTheFieldsYouNeedContent,
};

export const STAGE_02_PRISMA_LESSONS: StandardLessonContent[] = [
  pri05WhatIsPrismaClientContent,
  pri06CreateAndReadRecordsContent,
  pri07UpdateAndDeleteRecordsContent,
  pri08FilteringAndSortingDataContent,
  pri09SelectOnlyTheFieldsYouNeedContent,
];
