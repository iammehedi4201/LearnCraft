import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import { mdb13IndexesContent } from "./mdb13-indexes";
import { mdb14CheckAQueryWithExplainContent } from "./mdb14-check-a-query-with-explain";
import { mdb15PaginationContent } from "./mdb15-pagination";
import { mdb16AggregationPipelineContent } from "./mdb16-aggregation-pipeline";
import { mdb17CombineDataWithLookupContent } from "./mdb17-combine-data-with-lookup";

export {
  mdb13IndexesContent,
  mdb14CheckAQueryWithExplainContent,
  mdb15PaginationContent,
  mdb16AggregationPipelineContent,
  mdb17CombineDataWithLookupContent,
};

export const STAGE_04_LESSONS: StandardLessonContent[] = [
  mdb13IndexesContent,
  mdb14CheckAQueryWithExplainContent,
  mdb15PaginationContent,
  mdb16AggregationPipelineContent,
  mdb17CombineDataWithLookupContent,
];

