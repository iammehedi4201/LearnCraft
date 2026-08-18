"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 5 — THE REPOSITORY PATTERN IN NESTJS
// ═══════════════════════════════════════════════════════════

export function RepositoryPatternSection() {
  return (
    <SectionContainer number={5} title="The Repository Pattern with Prisma">
      {/* ── 5.1 Repository Pattern ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Clean Architecture &amp; Database Decoupling"
          description="Abstract database operations behind interfaces for testability and domain independence."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🏛️</span> Interface-Driven Repositories
          </h4>
          <EnhancedCodeBlock
            code={`// 1. Domain Interface contract:
export interface IUsersRepository {
  findById(id: number): Promise<User | null>;
  create(data: Prisma.UserCreateInput): Promise<User>;
}

// 2. Concrete Prisma Implementation:
@Injectable()
export class PrismaUsersRepository implements IUsersRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
}

// 3. Module Binding with DI Token:
@Module({
  providers: [
    { provide: 'USERS_REPOSITORY', useClass: PrismaUsersRepository },
    UsersService,
  ],
})
export class UsersModule {}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the primary benefit of decoupling NestJS services from Prisma using the Repository pattern?"
          answer="It makes unit testing trivial (you can inject an InMemoryRepository in tests without a live database) and isolates business logic from database driver specifics."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
