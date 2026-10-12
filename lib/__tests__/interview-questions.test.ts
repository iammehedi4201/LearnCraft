import { describe, it, expect } from "vitest";
import {
  ALL_INTERVIEW_QUESTIONS,
  JAVASCRIPT_QUESTIONS,
  TYPESCRIPT_QUESTIONS,
  REACT_QUESTIONS,
  NEXTJS_QUESTIONS,
  NODEJS_QUESTIONS,
  POSTGRESQL_QUESTIONS,
  MONGODB_QUESTIONS,
  PRISMA_QUESTIONS,
  NESTJS_QUESTIONS,
  EXPRESS_QUESTIONS,
  REDUX_QUESTIONS,
  OOP_QUESTIONS,
  TANSTACK_QUESTIONS,
  SYSTEM_DESIGN_QUESTIONS,
  getInterviewTracks,
  getQuestionsByTrack,
  getInterviewQuestionById,
} from "../interview-questions";
import {
  POSTGRESQL_QUESTIONS as RE_EXPORTED_PG,
  MONGODB_QUESTIONS as RE_EXPORTED_MONGO,
  PRISMA_QUESTIONS as RE_EXPORTED_PRISMA,
  NESTJS_QUESTIONS as RE_EXPORTED_NEST,
  EXPRESS_QUESTIONS as RE_EXPORTED_EXPRESS,
} from "../interview-questions/backend-db-questions";
import {
  OOP_QUESTIONS as RE_EXPORTED_OOP,
  SYSTEM_DESIGN_QUESTIONS as RE_EXPORTED_SYS,
} from "../interview-questions/architecture-questions";

describe("Curated Interview Question Bank (Phase 2 Expansion)", () => {
  it("should contain exactly 193 high-quality questions across 14 tracks", () => {
    expect(ALL_INTERVIEW_QUESTIONS.length).toBe(193);
  });

  it("should ensure every question ID across the entire bank is unique", () => {
    const idSet = new Set<string>();
    for (const q of ALL_INTERVIEW_QUESTIONS) {
      expect(idSet.has(q.id), `Duplicate ID found: ${q.id}`).toBe(false);
      idSet.add(q.id);
    }
    expect(idSet.size).toBe(193);
  });

  it("should preserve all legacy baseline question IDs without breakage", () => {
    const legacyIds = [
      // JavaScript (5)
      "js-q01", "js-q02", "js-q03", "js-q04", "js-q05",
      // TypeScript (4)
      "ts-q01", "ts-q02", "ts-q03", "ts-q04",
      // React (5)
      "react-q01", "react-q02", "react-q03", "react-q04", "react-q05",
      // Next.js (3)
      "next-q01", "next-q02", "next-q03",
      // Node.js (3)
      "node-q01", "node-q02", "node-q03",
      // PostgreSQL (2)
      "pg-q01", "pg-q02",
      // MongoDB (1)
      "mongo-q01",
      // Prisma (1)
      "prisma-q01",
      // NestJS (1)
      "nest-q01",
      // Express.js (1)
      "express-q01",
      // Redux (1)
      "redux-q01",
      // OOP (1)
      "oop-q01",
      // TanStack Query (1)
      "tanstack-q01",
      // System Design (3)
      "sys-q01", "sys-q02", "sys-q03",
    ];

    for (const id of legacyIds) {
      const found = getInterviewQuestionById(id);
      expect(found, `Legacy question ID ${id} must exist`).toBeDefined();
      expect(found?.id).toBe(id);
    }
  });

  it("should meet target question quotas for all 14 tracks", () => {
    expect(JAVASCRIPT_QUESTIONS.length).toBe(20);
    expect(TYPESCRIPT_QUESTIONS.length).toBe(18);
    expect(REACT_QUESTIONS.length).toBe(20);
    expect(NEXTJS_QUESTIONS.length).toBe(15);
    expect(NODEJS_QUESTIONS.length).toBe(15);
    expect(POSTGRESQL_QUESTIONS.length).toBe(12);
    expect(MONGODB_QUESTIONS.length).toBe(12);
    expect(PRISMA_QUESTIONS.length).toBe(10);
    expect(NESTJS_QUESTIONS.length).toBe(12);
    expect(EXPRESS_QUESTIONS.length).toBe(12);
    expect(REDUX_QUESTIONS.length).toBe(10);
    expect(OOP_QUESTIONS.length).toBe(12);
    expect(TANSTACK_QUESTIONS.length).toBe(10);
    expect(SYSTEM_DESIGN_QUESTIONS.length).toBe(15);
  });

  it("should have complete, beginner-friendly structured metadata for every question", () => {
    for (const q of ALL_INTERVIEW_QUESTIONS) {
      expect(q.id).toBeTruthy();
      expect(q.trackKey).toBeTruthy();
      expect(q.category).toBeTruthy();
      expect(q.type).toBeTruthy();
      expect(q.difficulty).toBeTruthy();
      expect(q.question.trim().length).toBeGreaterThan(15);
      expect(q.answer.trim().length).toBeGreaterThan(50);
      expect(Array.isArray(q.followUps)).toBe(true);
      expect(q.followUps.length).toBeGreaterThanOrEqual(1);
      expect(Array.isArray(q.keyPoints)).toBe(true);
      expect(q.keyPoints.length).toBeGreaterThanOrEqual(2);
      expect(Array.isArray(q.tags)).toBe(true);
      expect(q.tags.length).toBeGreaterThanOrEqual(2);
    }
  });

  it("should return the correct track list via getInterviewTracks", () => {
    const tracks = getInterviewTracks();
    expect(tracks.length).toBe(14);
    const keys = tracks.map((t) => t.trackKey);
    expect(keys).toContain("javascript");
    expect(keys).toContain("typescript");
    expect(keys).toContain("react");
    expect(keys).toContain("nextjs");
    expect(keys).toContain("nodejs");
    expect(keys).toContain("postgresql");
    expect(keys).toContain("mongodb");
    expect(keys).toContain("prisma");
    expect(keys).toContain("nestjs");
    expect(keys).toContain("express");
    expect(keys).toContain("redux");
    expect(keys).toContain("oop");
    expect(keys).toContain("tanstack");
    expect(keys).toContain("system-design");
  });

  it("should fetch questions by track key accurately", () => {
    const reactQs = getQuestionsByTrack("react");
    expect(reactQs.length).toBe(20);
    expect(reactQs.every((q) => q.trackKey === "react")).toBe(true);

    const jsQs = getQuestionsByTrack("javascript");
    expect(jsQs.length).toBe(20);
    expect(jsQs.every((q) => q.trackKey === "javascript")).toBe(true);

    const nonExistent = getQuestionsByTrack("non-existent-track");
    expect(nonExistent).toEqual([]);
  });

  it("should re-export backwards compatible arrays without breakage", () => {
    expect(RE_EXPORTED_PG).toBe(POSTGRESQL_QUESTIONS);
    expect(RE_EXPORTED_MONGO).toBe(MONGODB_QUESTIONS);
    expect(RE_EXPORTED_PRISMA).toBe(PRISMA_QUESTIONS);
    expect(RE_EXPORTED_NEST).toBe(NESTJS_QUESTIONS);
    expect(RE_EXPORTED_EXPRESS).toBe(EXPRESS_QUESTIONS);
    expect(RE_EXPORTED_OOP).toBe(OOP_QUESTIONS);
    expect(RE_EXPORTED_SYS).toBe(SYSTEM_DESIGN_QUESTIONS);
  });
});
