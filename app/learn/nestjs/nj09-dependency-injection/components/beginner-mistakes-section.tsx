"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER DI MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top Beginner DI Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Mistakes with Dependency Injection"
          description="Avoid these common pitfalls when configuring providers and tokens."
          color="primary"
        />

        <MistakeBox
          title="Missing @Inject('TOKEN') on Custom String Tokens"
          description="TypeScript cannot infer string tokens automatically. You must add @Inject('TOKEN') in the constructor!"
          wrong={`@Injectable()
export class ApiService {
  // ❌ WRONG: TypeScript thinks 'apiKey' is just a string type!
  constructor(private apiKey: string) {}
}`}
          right={`@Injectable()
export class ApiService {
  // ✅ RIGHT: Tells NestJS to lookup the 'API_KEY' custom token!
  constructor(@Inject('API_KEY') private apiKey: string) {}
}`}
        />

        <MistakeBox
          title="Forgetting the 'inject' Array on useFactory"
          description="If your factory function accepts arguments, you must list the providers in the 'inject: [...]' array."
          wrong={`{
  provide: 'DB',
  // ❌ Missing inject array! 'config' will be undefined!
  useFactory: (config: ConfigService) => createDB(config),
}`}
          right={`{
  provide: 'DB',
  useFactory: (config: ConfigService) => createDB(config),
  // ✅ RIGHT: Injects ConfigService into the factory:
  inject: [ConfigService],
}`}
        />

        <MistakeBox
          title="Circular Dependency Deadlock"
          description="When ServiceA depends on ServiceB, and ServiceB depends on ServiceA, NestJS cannot decide which one to create first."
          wrong={`// In AuthService:
constructor(private usersService: UsersService) {}

// In UsersService:
// ❌ Circular deadlock!
constructor(private authService: AuthService) {}`}
          right={`// In AuthService:
constructor(@Inject(forwardRef(() => UsersService)) private usersService: UsersService) {}

// In UsersService:
// ✅ RIGHT: Uses forwardRef() on both sides:
constructor(@Inject(forwardRef(() => AuthService)) private authService: AuthService) {}`}
        />

        <QuickCheck
          question="What must you add to a constructor parameter when injecting a provider that was registered with a string token like 'JWT_SECRET'?"
          answer="@Inject('JWT_SECRET') (e.g. constructor(@Inject('JWT_SECRET') private secret: string))"
        />
      </div>
    </SectionContainer>
  );
}
