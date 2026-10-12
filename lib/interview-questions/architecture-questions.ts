import { InterviewQuestion } from "@/types/interview";
import { REDUX_QUESTIONS } from "./redux-questions";
import { OOP_QUESTIONS } from "./oop-questions";
import { TANSTACK_QUESTIONS } from "./tanstack-questions";
import { SYSTEM_DESIGN_QUESTIONS } from "./system-design-questions";

// Re-export for backward compatibility
export {
  REDUX_QUESTIONS,
  OOP_QUESTIONS,
  TANSTACK_QUESTIONS,
  SYSTEM_DESIGN_QUESTIONS,
};

export const ARCHITECTURE_QUESTIONS: InterviewQuestion[] = [
  ...REDUX_QUESTIONS,
  ...OOP_QUESTIONS,
  ...TANSTACK_QUESTIONS,
];
