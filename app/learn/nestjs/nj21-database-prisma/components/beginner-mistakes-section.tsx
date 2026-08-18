"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER PRISMA SETUP MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Prisma Setup Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Setup Pitfalls"
          description="Avoid these common errors when integrating Prisma with NestJS."
          color="primary"
        />

        <MistakeBox
          title="Instantiating new PrismaClient() in Multiple Services"
          description="Creating separate PrismaClient instances in each service opens multiple independent connection pools, quickly exceeding PostgreSQL max connections."
          wrong={`// ❌ Anti-pattern: New client created in every service:
@Injectable()
export class UsersService {
  private prisma = new PrismaClient();
}`}
          right={`// ✅ Correct: Inject the singleton PrismaService:
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
}`}
        />

        <MistakeBox
          title="Forgetting to Run prisma generate"
          description="TypeScript compiler errors will occur if you edit schema.prisma without running npx prisma generate to update generated types."
          wrong={`// Editing schema.prisma -> Directly writing TypeScript code -> Type errors!`}
          right={`// Editing schema.prisma -> Run npx prisma generate -> TypeScript types update!`}
        />

        <MistakeBox
          title="Hardcoding Database Credentials in schema.prisma"
          description="Exposing credentials in schema.prisma risks accidental Git commits."
          wrong={`datasource db {
  provider = "postgresql"
  url      = "postgresql://postgres:password@localhost:5432/mydb"
}`}
          right={`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}`}
        />

        <QuickCheck
          question="Why should you never write 'new PrismaClient()' inside your NestJS services?"
          answer="Because it creates a new database connection pool for every service instance. Always inject the singleton PrismaService through NestJS Dependency Injection."
        />
      </div>
    </SectionContainer>
  );
}
