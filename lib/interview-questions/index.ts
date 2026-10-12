import { InterviewQuestion } from "@/types/interview";
import { TOPICS_META } from "@/lib/topic-registry";
import { JAVASCRIPT_QUESTIONS } from "./javascript-questions";
import { TYPESCRIPT_QUESTIONS } from "./typescript-questions";
import { REACT_QUESTIONS } from "./react-questions";
import { NEXTJS_QUESTIONS } from "./nextjs-questions";
import { NODEJS_QUESTIONS } from "./nodejs-questions";
import { SYSTEM_DESIGN_QUESTIONS } from "./system-design-questions";
import { POSTGRESQL_QUESTIONS } from "./postgresql-questions";
import { MONGODB_QUESTIONS } from "./mongodb-questions";
import { PRISMA_QUESTIONS } from "./prisma-questions";
import { NESTJS_QUESTIONS } from "./nestjs-questions";
import { EXPRESS_QUESTIONS } from "./express-questions";
import { REDUX_QUESTIONS } from "./redux-questions";
import { OOP_QUESTIONS } from "./oop-questions";
import { TANSTACK_QUESTIONS } from "./tanstack-questions";

// Legacy exports for backward compatibility
export { BACKEND_DB_QUESTIONS } from "./backend-db-questions";
export { ARCHITECTURE_QUESTIONS } from "./architecture-questions";

// Export individual track question arrays
export {
  JAVASCRIPT_QUESTIONS,
  TYPESCRIPT_QUESTIONS,
  REACT_QUESTIONS,
  NEXTJS_QUESTIONS,
  NODEJS_QUESTIONS,
  SYSTEM_DESIGN_QUESTIONS,
  POSTGRESQL_QUESTIONS,
  MONGODB_QUESTIONS,
  PRISMA_QUESTIONS,
  NESTJS_QUESTIONS,
  EXPRESS_QUESTIONS,
  REDUX_QUESTIONS,
  OOP_QUESTIONS,
  TANSTACK_QUESTIONS,
};

// Unified registry of all interview questions across tracks
export const ALL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  ...JAVASCRIPT_QUESTIONS,
  ...TYPESCRIPT_QUESTIONS,
  ...REACT_QUESTIONS,
  ...NEXTJS_QUESTIONS,
  ...NODEJS_QUESTIONS,
  ...SYSTEM_DESIGN_QUESTIONS,
  ...POSTGRESQL_QUESTIONS,
  ...MONGODB_QUESTIONS,
  ...PRISMA_QUESTIONS,
  ...NESTJS_QUESTIONS,
  ...EXPRESS_QUESTIONS,
  ...REDUX_QUESTIONS,
  ...OOP_QUESTIONS,
  ...TANSTACK_QUESTIONS,
];

/**
 * Retrieve all interview questions for a specific track
 */
export function getQuestionsByTrack(trackKey: string): InterviewQuestion[] {
  return ALL_INTERVIEW_QUESTIONS.filter((q) => q.trackKey === trackKey);
}

/**
 * Find a specific question by its unique identifier
 */
export function getQuestionById(id: string): InterviewQuestion | undefined {
  return ALL_INTERVIEW_QUESTIONS.find((q) => q.id === id);
}

export const getInterviewQuestionById = getQuestionById;

/**
 * Retrieve summary metadata for all active tracks with interview questions
 */
export interface InterviewTrackInfo {
  trackKey: string;
  title: string;
  icon: string;
  description: string;
  badgeColor: string;
  questionCount: number;
  categories: string[];
}

export function getInterviewTracks(): InterviewTrackInfo[] {
  // Group questions by track
  const trackMap = new Map<string, InterviewQuestion[]>();
  ALL_INTERVIEW_QUESTIONS.forEach((q) => {
    const list = trackMap.get(q.trackKey) || [];
    list.push(q);
    trackMap.set(q.trackKey, list);
  });

  const tracks: InterviewTrackInfo[] = [];

  trackMap.forEach((questions, trackKey) => {
    const meta = TOPICS_META[trackKey] || {
      title: trackKey.toUpperCase(),
      icon: "🎯",
      description: "Technical Interview Mastery",
      badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    };

    const categories = Array.from(new Set(questions.map((q) => q.category)));

    tracks.push({
      trackKey,
      title: meta.title,
      icon: meta.icon,
      description: meta.description,
      badgeColor: meta.badgeColor,
      questionCount: questions.length,
      categories,
    });
  });

  // Sort tracks: high question count first or logical order
  const priorityOrder = [
    "react",
    "javascript",
    "typescript",
    "nextjs",
    "nodejs",
    "system-design",
    "postgresql",
    "mongodb",
    "prisma",
    "nestjs",
    "express",
    "redux",
    "oop",
    "tanstack",
  ];

  tracks.sort((a, b) => {
    const indexA = priorityOrder.indexOf(a.trackKey);
    const indexB = priorityOrder.indexOf(b.trackKey);
    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
    if (indexA !== -1) return -1;
    if (indexB !== -1) return 1;
    return b.questionCount - a.questionCount;
  });

  return tracks;
}
