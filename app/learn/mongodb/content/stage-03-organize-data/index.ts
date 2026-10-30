import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import { mdb10ArraysAndEmbeddedDocumentsContent } from "./mdb10-arrays-and-embedded-documents";
import { mdb11EmbeddingVsReferencingRelatedDataContent } from "./mdb11-embedding-vs-referencing-related-data";
import { mdb12SchemaValidationContent } from "./mdb12-schema-validation";

export {
  mdb10ArraysAndEmbeddedDocumentsContent,
  mdb11EmbeddingVsReferencingRelatedDataContent,
  mdb12SchemaValidationContent,
};

export const STAGE_03_LESSONS: StandardLessonContent[] = [
  mdb10ArraysAndEmbeddedDocumentsContent,
  mdb11EmbeddingVsReferencingRelatedDataContent,
  mdb12SchemaValidationContent,
];

