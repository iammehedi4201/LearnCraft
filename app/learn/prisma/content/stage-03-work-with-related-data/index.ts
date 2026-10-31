import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import { pri10UnderstandRelationshipsBetweenModelsContent } from "./pri10-understand-relationships-between-models";
import { pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent } from "./pri11-read-related-records-with-include-and-nested-select";
import { pri12CreateRelatedRecordsWithNestedWritesContent } from "./pri12-create-related-records-with-nested-writes";

export {
  pri10UnderstandRelationshipsBetweenModelsContent,
  pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent,
  pri12CreateRelatedRecordsWithNestedWritesContent,
};

export const STAGE_03_PRISMA_LESSONS: StandardLessonContent[] = [
  pri10UnderstandRelationshipsBetweenModelsContent,
  pri11ReadRelatedRecordsWithIncludeAndNestedSelectContent,
  pri12CreateRelatedRecordsWithNestedWritesContent,
];
