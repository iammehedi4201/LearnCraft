"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER SERVICE MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top Beginner Service Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Mistakes with NestJS Services"
          description="Avoid these common pitfalls when creating and injecting providers."
          color="primary"
        />

        <MistakeBox
          title="Calling 'new Service()' Inside the Controller"
          description="Hardcoding service creation with 'new' breaks Dependency Injection, tightly couples your code, and prevents easy unit testing."
          wrong={`@Controller('users')
export class UsersController {
  // ❌ WRONG: Calling 'new' directly inside class!
  private usersService = new UsersService();

  @Get()
  findAll() { return this.usersService.findAll(); }
}`}
          right={`@Controller('users')
export class UsersController {
  // ✅ RIGHT: Let NestJS inject it via constructor!
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() { return this.usersService.findAll(); }
}`}
        />

        <MistakeBox
          title="Forgetting the @Injectable() Decorator"
          description="A plain TypeScript class cannot be properly managed by NestJS's dependency injection container unless decorated with @Injectable()."
          wrong={`// ❌ Missing @Injectable():
export class UsersService {
  findAll() { return ["Alice", "Bob"]; }
}`}
          right={`// ✅ Properly decorated:
@Injectable()
export class UsersService {
  findAll() { return ["Alice", "Bob"]; }
}`}
        />

        <MistakeBox
          title="Forgetting to Register in Module Providers"
          description="Creating a service file but forgetting to add it to providers: [UsersService] in the module."
          wrong={`@Module({
  controllers: [UsersController],
  // ❌ Forgot providers: [UsersService]!
  // NestJS crashes with 'can't resolve dependencies'!
})`}
          right={`@Module({
  controllers: [UsersController],
  // ✅ Registered in providers:
  providers: [UsersService],
})`}
        />

        <QuickCheck
          question="Why should you never write 'private usersService = new UsersService()' inside a NestJS controller?"
          answer="Because it bypasses NestJS's Dependency Injection system, prevents singleton reuse across the app, and makes mock testing impossible."
        />
      </div>
    </SectionContainer>
  );
}
