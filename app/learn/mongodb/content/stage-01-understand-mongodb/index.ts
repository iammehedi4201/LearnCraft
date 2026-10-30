import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";
import { mdb01WhatIsMongodbContent } from "./mdb01-what-is-mongodb";
import { mdb02DatabasesCollectionsDocumentsBsonContent } from "./mdb02-databases-collections-documents-bson";
import { mdb03WorkingWithMongodbUsingMongoshContent } from "./mdb03-working-with-mongodb-using-mongosh";

export {
  mdb01WhatIsMongodbContent,
  mdb02DatabasesCollectionsDocumentsBsonContent,
  mdb03WorkingWithMongodbUsingMongoshContent,
};

export const STAGE_01_LESSONS: StandardLessonContent[] = [
  mdb01WhatIsMongodbContent,
  mdb02DatabasesCollectionsDocumentsBsonContent,
  mdb03WorkingWithMongodbUsingMongoshContent,
];

