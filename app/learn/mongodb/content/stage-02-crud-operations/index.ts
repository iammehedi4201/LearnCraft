import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import { mdb04InsertDocumentsContent } from "./mdb04-insert-documents";
import { mdb05FindDocumentsContent } from "./mdb05-find-documents";
import { mdb06FilterDocumentsWithQueryOperatorsContent } from "./mdb06-filter-documents-with-query-operators";
import { mdb07ChooseFieldsSortResultsAndLimitResultsContent } from "./mdb07-choose-fields-sort-results-and-limit-results";
import { mdb08UpdateDocumentsContent } from "./mdb08-update-documents";
import { mdb09DeleteDocumentsSafelyContent } from "./mdb09-delete-documents-safely";

export {
  mdb04InsertDocumentsContent,
  mdb05FindDocumentsContent,
  mdb06FilterDocumentsWithQueryOperatorsContent,
  mdb07ChooseFieldsSortResultsAndLimitResultsContent,
  mdb08UpdateDocumentsContent,
  mdb09DeleteDocumentsSafelyContent,
};

export const STAGE_02_LESSONS: StandardLessonContent[] = [
  mdb04InsertDocumentsContent,
  mdb05FindDocumentsContent,
  mdb06FilterDocumentsWithQueryOperatorsContent,
  mdb07ChooseFieldsSortResultsAndLimitResultsContent,
  mdb08UpdateDocumentsContent,
  mdb09DeleteDocumentsSafelyContent,
];

