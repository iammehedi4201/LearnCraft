/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * LEARNCRAFT QUIZ EVALUATOR ENGINE
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Authoritative scoring, answer validation, hint XP tracking,
 * and duplicate-submission prevention engine.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import {
  ModuleQuiz,
  QuizEvaluationResult,
  QuestionEvaluation,
  QuizSubmissionPayload,
} from "./quiz-types";

export interface EvaluationOptions {
  previousBestScore?: number | null;
  now?: string;
}

/**
 * Evaluates a quiz submission against the authoritative quiz definition.
 */
export function evaluateQuizSubmission(
  quiz: ModuleQuiz,
  submission: QuizSubmissionPayload,
  options: EvaluationOptions = {}
): QuizEvaluationResult {
  const { previousBestScore = null, now = new Date().toISOString() } = options;

  let correctCount = 0;
  const evaluations: QuestionEvaluation[] = [];

  // 1. Evaluate each question deterministically
  for (const question of quiz.questions) {
    const userAnswer = submission.answers[question.id] ?? null;
    const isCorrect = userAnswer !== null && userAnswer === question.correctAnswer;
    const hintUsed = Boolean(submission.hintsUsed?.includes(question.id));

    if (isCorrect) {
      correctCount += 1;
    }

    evaluations.push({
      questionId: question.id,
      questionType: question.type,
      prompt: question.prompt,
      codeSnippet: question.type === "code_output" ? question.codeSnippet : undefined,
      language: question.type === "code_output" ? question.language : undefined,
      options: question.options,
      userAnswer,
      correctAnswer: question.correctAnswer,
      isCorrect,
      hintUsed,
      explanation: question.explanation,
    });
  }

  const totalQuestions = quiz.questions.length;
  const score = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const passed = score >= quiz.passingScore;

  // 2. Calculate Hint Deductions
  let xpSpentOnHints = 0;
  for (const qId of submission.hintsUsed || []) {
    const q = quiz.questions.find((x) => x.id === qId);
    if (q && q.hint) {
      xpSpentOnHints += q.hintCostXP ?? 5;
    }
  }

  // 3. XP Awarding & Anti-Duplicate Prevention Logic
  let baseXpEarned = 0;
  let perfectBonusXp = 0;
  const isRepeat = previousBestScore !== null && previousBestScore >= quiz.passingScore;

  if (passed) {
    if (!isRepeat) {
      // First time passing the module quiz
      baseXpEarned = quiz.baseXpReward;
      if (score === 100) {
        perfectBonusXp = quiz.perfectScoreBonusXp;
      }
    } else {
      // Repeat attempt: User already passed previously.
      // Only award incremental XP if user beat their previous high score!
      if (score > (previousBestScore ?? 0)) {
        const deltaImprovement = (score - (previousBestScore ?? 0)) / 100;
        baseXpEarned = Math.round(quiz.baseXpReward * deltaImprovement);
        if (score === 100 && (previousBestScore ?? 0) < 100) {
          perfectBonusXp = quiz.perfectScoreBonusXp;
        }
      } else {
        // Did not beat best score -> 0 duplicate XP
        baseXpEarned = 0;
        perfectBonusXp = 0;
      }
    }
  }

  const grossXp = baseXpEarned + perfectBonusXp;
  // Ensure user cannot end up with negative net XP award
  const netXpEarned = Math.max(0, grossXp - xpSpentOnHints);

  return {
    quizId: quiz.id,
    trackKey: quiz.trackKey,
    trackTitle: quiz.trackTitle,
    lessonSlug: quiz.lessonSlug,
    lessonCode: quiz.lessonCode,
    lessonTitle: quiz.lessonTitle,
    totalQuestions,
    correctAnswers: correctCount,
    score,
    passed,
    baseXpEarned,
    perfectBonusXp,
    xpSpentOnHints,
    netXpEarned,
    isRepeat,
    previousBestScore,
    evaluations,
    completedAt: now,
  };
}
