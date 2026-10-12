import { InterviewQuestion } from "@/types/interview";
import { POSTGRESQL_QUESTIONS } from "./postgresql-questions";
import { MONGODB_QUESTIONS } from "./mongodb-questions";
import { PRISMA_QUESTIONS } from "./prisma-questions";
import { NESTJS_QUESTIONS } from "./nestjs-questions";
import { EXPRESS_QUESTIONS } from "./express-questions";

// Re-export for backward compatibility
export {
  POSTGRESQL_QUESTIONS,
  MONGODB_QUESTIONS,
  PRISMA_QUESTIONS,
  NESTJS_QUESTIONS,
  EXPRESS_QUESTIONS,
};

export const BACKEND_DB_QUESTIONS: InterviewQuestion[] = [
  ...POSTGRESQL_QUESTIONS,
  ...MONGODB_QUESTIONS,
  ...PRISMA_QUESTIONS,
  ...NESTJS_QUESTIONS,
  ...EXPRESS_QUESTIONS,
];
