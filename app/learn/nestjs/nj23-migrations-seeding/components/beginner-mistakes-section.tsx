"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER LIFECYCLE & SEEDING MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Lifecycle & Seeding Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={10}
          title="Common Bootstrap & Teardown Pitfalls"
          description="Avoid these common errors when initializing state and handling lifecycle hooks in NestJS."
          color="primary"
        />

        <MistakeBox
          title="Performing Async Seeding in TypeScript Constructors"
          description="Constructors cannot be async. Fire-and-forget promises inside constructors cause race conditions and crash silently."
          wrong={`// ❌ Wrong: Unawaited async seed in constructor:
@Injectable()
export class UsersService {
  constructor(private repo: UsersRepo) {
    this.seedDefaults(); // Race condition: unhandled promise!
  }
}`}
          right={`// ✅ Correct: Implement OnModuleInit:
@Injectable()
export class UsersService implements OnModuleInit {
  constructor(private repo: UsersRepo) {}
  async onModuleInit(): Promise<void> {
    await this.seedDefaults(); // Awaited cleanly before app listens!
  }
}`}
        />

        <MistakeBox
          title="Non-Idempotent Seeding Causing Duplicate Key Errors"
          description="Assuming the repository is always empty causes the application to crash on the second restart."
          wrong={`// ❌ Blindly inserting without checking existence:
await this.usersRepo.create({ email: 'admin@learncraft.dev' }); // Crashes on restart!`}
          right={`// ✅ Check existence or upsert before creation:
const exists = await this.usersRepo.findByEmail('admin@learncraft.dev');
if (!exists) {
  await this.usersRepo.create({ email: 'admin@learncraft.dev' });
}`}
        />

        <MistakeBox
          title="Forgetting app.enableShutdownHooks() in main.ts"
          description="Without this method call, OnModuleDestroy and BeforeApplicationShutdown hooks are completely ignored by NestJS."
          wrong={`// ❌ Missing shutdown hooks in main.ts:
const app = await NestFactory.create(AppModule);
await app.listen(3000);`}
          right={`// ✅ Explicitly enabling shutdown hooks:
const app = await NestFactory.create(AppModule);
app.enableShutdownHooks(); // Allows OnModuleDestroy to fire on SIGINT/SIGTERM
await app.listen(3000);`}
        />

        <QuickCheck
          question="What happens when an unhandled exception is thrown inside an onModuleInit() hook?"
          answer="NestJS aborts the application bootstrap sequence, logs the error stack trace, and exits the process with a non-zero exit code without starting the HTTP server."
        />
      </div>
    </SectionContainer>
  );
}
