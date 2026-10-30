import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import { mdb18AtomicUpdatesAndTransactionsContent } from "./mdb18-atomic-updates-and-transactions";
import { mdb19DatabaseSecurityBasicsContent } from "./mdb19-database-security-basics";
import { mdb20BackupsReplicationAndScalingContent } from "./mdb20-backups-replication-and-scaling";

export {
  mdb18AtomicUpdatesAndTransactionsContent,
  mdb19DatabaseSecurityBasicsContent,
  mdb20BackupsReplicationAndScalingContent,
};

export const STAGE_05_LESSONS: StandardLessonContent[] = [
  mdb18AtomicUpdatesAndTransactionsContent,
  mdb19DatabaseSecurityBasicsContent,
  mdb20BackupsReplicationAndScalingContent,
];

