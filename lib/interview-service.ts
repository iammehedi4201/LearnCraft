/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERVIEW QUESTION SERVICE & PROVIDER ARCHITECTURE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Decouples question storage/source (curated in-code vs database-backed)
 * from question consumers (flashcards, mock interviews, search).
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  InterviewQuestion,
  Difficulty,
  QuestionSource,
} from "@/types/interview";
import { ALL_INTERVIEW_QUESTIONS, getInterviewTracks, InterviewTrackInfo } from "@/lib/interview-questions";

export interface QuestionFilter {
  trackKey?: string;
  topic?: string;
  subtopic?: string;
  difficulty?: "all" | Difficulty;
  category?: string;
  searchQuery?: string;
  source?: QuestionSource;
  limit?: number;
  offset?: number;
}

export interface QuestionProvider {
  name: string;
  getQuestions(filter?: QuestionFilter): Promise<InterviewQuestion[]> | InterviewQuestion[];
}

/**
 * In-Memory Curated Question Provider
 */
export class CuratedQuestionProvider implements QuestionProvider {
  name = "curated";

  getQuestions(filter?: QuestionFilter): InterviewQuestion[] {
    let result = [...ALL_INTERVIEW_QUESTIONS];

    if (!filter) return result;

    const track = filter.trackKey || filter.topic;
    if (track && track !== "all") {
      result = result.filter(
        (q) => q.trackKey.toLowerCase() === track.toLowerCase()
      );
    }

    if (filter.subtopic) {
      result = result.filter(
        (q) => q.subtopic && q.subtopic.toLowerCase() === filter.subtopic?.toLowerCase()
      );
    }

    if (filter.difficulty && filter.difficulty !== "all") {
      const targetDiff = filter.difficulty.toLowerCase();
      result = result.filter((q) => {
        const d = q.difficulty.toLowerCase();
        // Support alias matching: easy <=> beginner, medium <=> intermediate, hard <=> advanced
        if (targetDiff === "easy" || targetDiff === "beginner") {
          return d === "easy" || d === "beginner";
        }
        if (targetDiff === "medium" || targetDiff === "intermediate") {
          return d === "medium" || d === "intermediate";
        }
        if (targetDiff === "hard" || targetDiff === "advanced") {
          return d === "hard" || d === "advanced";
        }
        return d === targetDiff;
      });
    }

    if (filter.category) {
      result = result.filter(
        (q) => q.category.toLowerCase() === filter.category?.toLowerCase()
      );
    }

    if (filter.searchQuery) {
      const qLower = filter.searchQuery.toLowerCase();
      result = result.filter(
        (q) =>
          q.question.toLowerCase().includes(qLower) ||
          q.answer.toLowerCase().includes(qLower) ||
          q.tags.some((t) => t.toLowerCase().includes(qLower)) ||
          (q.subtopic && q.subtopic.toLowerCase().includes(qLower))
      );
    }

    if (filter.offset !== undefined && filter.offset > 0) {
      result = result.slice(filter.offset);
    }

    if (filter.limit !== undefined && filter.limit > 0) {
      result = result.slice(0, filter.limit);
    }

    return result;
  }
}

/**
 * Approved Database Question Provider Interface / Stub
 * Ready to integrate with Prisma or external databases without breaking offline/curated mode.
 */
export class ApprovedDbQuestionProvider implements QuestionProvider {
  name = "database";
  private dbQuestions: InterviewQuestion[] = [];

  constructor(initialQuestions: InterviewQuestion[] = []) {
    this.dbQuestions = initialQuestions;
  }

  setApprovedQuestions(questions: InterviewQuestion[]) {
    this.dbQuestions = questions;
  }

  getQuestions(filter?: QuestionFilter): InterviewQuestion[] {
    let result = this.dbQuestions.filter((q) => q.status === "approved" || !q.status);

    if (!filter) return result;

    const track = filter.trackKey || filter.topic;
    if (track && track !== "all") {
      result = result.filter((q) => q.trackKey.toLowerCase() === track.toLowerCase());
    }

    if (filter.difficulty && filter.difficulty !== "all") {
      result = result.filter((q) => q.difficulty.toLowerCase() === filter.difficulty?.toLowerCase());
    }

    if (filter.category) {
      result = result.filter((q) => q.category.toLowerCase() === filter.category?.toLowerCase());
    }

    return result;
  }
}

/**
 * Unified Interview Question Service
 * Combines curated and database-backed providers, deduplicating questions by ID.
 */
export class InterviewQuestionService {
  private providers: QuestionProvider[] = [];

  constructor(providers: QuestionProvider[] = [new CuratedQuestionProvider()]) {
    this.providers = providers;
  }

  registerProvider(provider: QuestionProvider) {
    this.providers.push(provider);
  }

  async getAllQuestions(filter?: QuestionFilter): Promise<InterviewQuestion[]> {
    const questionMap = new Map<string, InterviewQuestion>();

    for (const provider of this.providers) {
      const questions = await provider.getQuestions(filter);
      for (const q of questions) {
        // First provider (e.g. curated) or explicitly approved questions take precedence
        if (!questionMap.has(q.id)) {
          questionMap.set(q.id, q);
        }
      }
    }

    return Array.from(questionMap.values());
  }

  async getQuestionById(id: string): Promise<InterviewQuestion | undefined> {
    for (const provider of this.providers) {
      const questions = await provider.getQuestions();
      const match = questions.find((q) => q.id === id);
      if (match) return match;
    }
    return undefined;
  }

  async getQuestionsByTrack(trackKey: string): Promise<InterviewQuestion[]> {
    return this.getAllQuestions({ trackKey });
  }

  getTracks(): InterviewTrackInfo[] {
    return getInterviewTracks();
  }
}

// Global default service instance
export const defaultQuestionService = new InterviewQuestionService([
  new CuratedQuestionProvider(),
]);
