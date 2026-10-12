/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * INTERVIEW QUESTION QUALITY CONTROL & DUPLICATE DETECTION
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Provides text normalization, fuzzy similarity scoring, duplicate detection,
 * and beginner-friendly answer quality checks.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { InterviewQuestion, Difficulty } from "@/types/interview";

export interface DuplicateCheckResult {
  isDuplicate: boolean;
  similarityScore: number; // 0.0 to 1.0
  matchedQuestionId?: string;
  matchedQuestionPrompt?: string;
  reason?: string;
}

export interface QualityValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  readabilityScore: number; // 0 to 100
}

/**
 * Normalize text for deterministic comparison:
 * Lowercases, strips punctuation, normalizes whitespace.
 */
export function normalizeText(text: string): string {
  if (!text) return "";
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, " ") // replace punctuation with spaces
    .replace(/\s+/g, " ")     // collapse multiple spaces
    .trim();
}

/**
 * Generate word n-grams (default bigrams) from text
 */
function getBigrams(text: string): Set<string> {
  const words = normalizeText(text).split(" ").filter(Boolean);
  const bigrams = new Set<string>();
  if (words.length <= 1) {
    if (words.length === 1) bigrams.add(words[0]);
    return bigrams;
  }
  for (let i = 0; i < words.length - 1; i++) {
    bigrams.add(`${words[i]} ${words[i + 1]}`);
  }
  return bigrams;
}

/**
 * Dice Coefficient similarity between two strings based on bigrams (0.0 to 1.0)
 */
export function calculateTextSimilarity(text1: string, text2: string): number {
  const norm1 = normalizeText(text1);
  const norm2 = normalizeText(text2);

  if (norm1 === norm2) return 1.0;
  if (!norm1 || !norm2) return 0.0;

  const bigrams1 = getBigrams(norm1);
  const bigrams2 = getBigrams(norm2);

  let intersection = 0;
  for (const b of bigrams1) {
    if (bigrams2.has(b)) intersection++;
  }

  const total = bigrams1.size + bigrams2.size;
  return total === 0 ? 0 : (2.0 * intersection) / total;
}

/**
 * Check whether a candidate question is a duplicate of any existing question
 * Threshold defaults to 0.75 (75% similarity).
 */
export function detectDuplicateQuestion(
  candidatePrompt: string,
  existingQuestions: InterviewQuestion[],
  threshold = 0.75
): DuplicateCheckResult {
  const normCandidate = normalizeText(candidatePrompt);

  let highestScore = 0;
  let closestQuestion: InterviewQuestion | null = null;

  for (const existing of existingQuestions) {
    const normExisting = normalizeText(existing.question);

    // Exact match
    if (normCandidate === normExisting) {
      return {
        isDuplicate: true,
        similarityScore: 1.0,
        matchedQuestionId: existing.id,
        matchedQuestionPrompt: existing.question,
        reason: "Exact match with existing question",
      };
    }

    const similarity = calculateTextSimilarity(normCandidate, normExisting);
    if (similarity > highestScore) {
      highestScore = similarity;
      closestQuestion = existing;
    }
  }

  if (highestScore >= threshold && closestQuestion) {
    return {
      isDuplicate: true,
      similarityScore: Number(highestScore.toFixed(3)),
      matchedQuestionId: closestQuestion.id,
      matchedQuestionPrompt: closestQuestion.question,
      reason: `Near-exact similarity (${(highestScore * 100).toFixed(1)}%) with question [${closestQuestion.id}]`,
    };
  }

  return {
    isDuplicate: false,
    similarityScore: Number(highestScore.toFixed(3)),
    matchedQuestionId: closestQuestion?.id,
    matchedQuestionPrompt: closestQuestion?.question,
  };
}

/**
 * Validate question structure and beginner-friendly quality guidelines
 */
export function validateQuestionQuality(question: Partial<InterviewQuestion>): QualityValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // 1. Required field checks
  if (!question.id || question.id.trim() === "") {
    errors.push("Question ID is required and cannot be empty.");
  }
  if (!question.trackKey || question.trackKey.trim() === "") {
    errors.push("Track key (topic) is required.");
  }
  if (!question.question || question.question.trim().length < 10) {
    errors.push("Question prompt must be at least 10 characters long.");
  }
  if (!question.answer || question.answer.trim().length < 20) {
    errors.push("Answer must be at least 20 characters long.");
  }

  // 2. Difficulty validation
  const validDifficulties: Difficulty[] = [
    "easy",
    "medium",
    "hard",
    "beginner",
    "intermediate",
    "advanced",
  ];
  if (question.difficulty && !validDifficulties.includes(question.difficulty)) {
    errors.push(`Invalid difficulty: "${question.difficulty}". Must be one of: ${validDifficulties.join(", ")}`);
  }

  // 3. Beginner-friendly quality heuristics
  let readabilityScore = 80;

  if (question.answer) {
    const answer = question.answer;

    // Check for structure (simple answer / how it works / interview answer)
    const hasStructure =
      answer.includes("### Simple answer") ||
      answer.includes("### How it works") ||
      answer.includes("### Interview answer") ||
      answer.includes("### Example");

    if (!hasStructure) {
      warnings.push("Answer lacks beginner-friendly section headers (e.g. Simple answer, How it works, Interview answer).");
      readabilityScore -= 15;
    }

    // Check sentence length: long dense paragraphs reduce readability
    const sentences = answer.split(/[.!?]+/).map((s) => s.trim()).filter((s) => s.length > 0);
    const longSentences = sentences.filter((s) => s.split(" ").length > 35);
    if (longSentences.length > 2) {
      warnings.push("Answer contains overly long sentences. Break dense paragraphs into simpler short sentences.");
      readabilityScore -= 10;
    }

    // Check code example for coding/practical questions
    if (question.type === "coding" && !answer.includes("```") && !question.codeSnippet) {
      errors.push("Coding questions must include a code snippet or formatted code block in the answer.");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    readabilityScore: Math.max(0, Math.min(100, readabilityScore)),
  };
}
