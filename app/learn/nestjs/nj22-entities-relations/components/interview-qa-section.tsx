"use client";

import { useState } from "react";
import {
  SectionContainer,
  TopicHeader,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — TOP 5 INTERVIEW QUESTIONS (DOMAIN MODELING)
// ═══════════════════════════════════════════════════════════

export function InterviewQaSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const qas = [
    {
      q: "Q1: What is the architectural difference between a DTO, a Domain Entity, and a Value Object in NestJS?",
      a: "• DTO (Data Transfer Object): Validates and structures incoming HTTP payloads across network boundaries (class-validator).\n• Domain Entity: Has unique identity (ID), encapsulates business logic, and manages mutable lifecycle state.\n• Value Object: Immutable object without identity, defined purely by its values (e.g. Money, EmailAddress).",
    },
    {
      q: "Q2: Why is an Anemic Domain Model considered an anti-pattern in enterprise NestJS systems?",
      a: "An Anemic model contains only public properties with zero business logic, forcing controllers and services to duplicate validation rules, state transitions, and calculations throughout the codebase rather than co-locating them with the data they govern.",
    },
    {
      q: "Q3: How do you prevent circular JSON serialization crashes when domain entities reference each other?",
      a: "Instead of embedding circular object references, entities should store ID references (e.g., authorId: string, tagIds: Set<string>). When full nested representations are required for the client, map the data into a dedicated response DTO.",
    },
    {
      q: "Q4: What is an Aggregate Root and how does it protect business consistency boundaries?",
      a: "An Aggregate Root is the primary domain entity that acts as the single gateway for modifying a cluster of related child entities. External callers cannot directly mutate child entities; all modifications pass through root methods (e.g., Order.addItem), ensuring all invariants are respected.",
    },
    {
      q: "Q5: How do you safely strip sensitive properties (e.g. passwordHash) from entity responses in NestJS?",
      a: "Decorate the sensitive property with @Exclude() from class-transformer and apply ClassSerializerInterceptor at the controller or global level, or explicitly map the entity to a SanitizedUserDto before returning.",
    },
  ];

  return (
    <SectionContainer number={11} title="Top 5 Interview Questions on Domain Modeling">
      {/* ── 11.1 Interview Q&As ── */}
      <div className="mb-16">
        <TopicHeader
          number={11}
          title="Senior-Level Architecture Questions"
          description="Master these frequently asked questions on domain entities, aggregate roots, and encapsulation in NestJS."
          color="amber"
        />

        <div className="space-y-3">
          {qas.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm transition-all"
            >
              <div
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="flex items-center justify-between gap-4 cursor-pointer"
              >
                <h4 className="font-bold text-xs sm:text-sm text-ds-text-strong">
                  {item.q}
                </h4>
                <button className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-bold bg-ds-bg-white border border-ds-stroke-soft text-ds-feature-dark">
                  {openIdx === idx ? "Hide" : "Answer"}
                </button>
              </div>

              {openIdx === idx && (
                <div className="mt-3 pt-3 border-t border-ds-stroke-soft text-xs sm:text-sm text-ds-text-sub whitespace-pre-wrap leading-relaxed animate-in fade-in duration-200">
                  <strong className="text-ds-text-strong block mb-1">Interview-Winning Answer:</strong>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Divider />
    </SectionContainer>
  );
}
