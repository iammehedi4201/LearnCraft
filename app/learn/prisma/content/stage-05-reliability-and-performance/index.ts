import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

import { pri16TransactionsContent } from "./pri16-transactions";
import { pri17PaginationContent } from "./pri17-pagination";
import { pri18IndexesAndQueryPerformanceContent } from "./pri18-indexes-and-query-performance";
import { pri19ReusePrismaClientAndManageConnectionsContent } from "./pri19-reuse-prisma-client-and-manage-connections";
import { pri20UseRawSqlOnlyWhenNeededContent } from "./pri20-use-raw-sql-only-when-needed";

export {
  pri16TransactionsContent,
  pri17PaginationContent,
  pri18IndexesAndQueryPerformanceContent,
  pri19ReusePrismaClientAndManageConnectionsContent,
  pri20UseRawSqlOnlyWhenNeededContent,
};

export const STAGE_05_PRISMA_LESSONS: StandardLessonContent[] = [
  pri16TransactionsContent,
  pri17PaginationContent,
  pri18IndexesAndQueryPerformanceContent,
  pri19ReusePrismaClientAndManageConnectionsContent,
  pri20UseRawSqlOnlyWhenNeededContent,
];
