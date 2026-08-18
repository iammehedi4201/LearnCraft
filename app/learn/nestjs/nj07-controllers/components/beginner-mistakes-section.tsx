"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER CONTROLLER MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top Beginner Controller Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Mistakes with NestJS Controllers"
          description="Avoid these common pitfalls when building routes and controllers."
          color="primary"
        />

        <MistakeBox
          title="The Route Ordering Trap (:id before /search)"
          description="NestJS evaluates routes in the exact order they are defined. If you put @Get(':id') first, a request to /users/search will treat 'search' as an ID!"
          wrong={`@Controller('users')
export class UsersController {
  // ❌ WRONG ORDER: Catch-all parameter comes first!
  @Get(':id')
  findOne(@Param('id') id: string) {}

  // ⚠️ Never reached! 'search' is captured as :id above!
  @Get('search')
  searchUsers() {}
}`}
          right={`@Controller('users')
export class UsersController {
  // ✅ RIGHT ORDER: Specific static routes come FIRST!
  @Get('search')
  searchUsers() {}

  // Parameterized dynamic routes come AFTER:
  @Get(':id')
  findOne(@Param('id') id: string) {}
}`}
        />

        <MistakeBox
          title="Putting Database Queries Inside Controllers"
          description="Controllers should only handle HTTP routing and delegate all database queries to Services."
          wrong={`@Controller('users')
export class UsersController {
  @Get()
  async findAll() {
    // ❌ Raw database logic inside controller!
    return await db.query("SELECT * FROM users");
  }
}`}
          right={`@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll() {
    // ✅ Clean delegation to Service:
    return this.usersService.findAll();
  }
}`}
        />

        <MistakeBox
          title="Forgetting the Method Decorator"
          description="A plain TypeScript method in a Controller class will NOT respond to HTTP requests unless you add @Get(), @Post(), etc."
          wrong={`@Controller('users')
export class UsersController {
  // ❌ Missing @Get()! This method is ignored by NestJS!
  findAll() {
    return ["Alice", "Bob"];
  }
}`}
          right={`@Controller('users')
export class UsersController {
  // ✅ Has @Get() decorator!
  @Get()
  findAll() {
    return ["Alice", "Bob"];
  }
}`}
        />

        <QuickCheck
          question="Why must static routes like @Get('profile') be defined BEFORE dynamic routes like @Get(':id') in a controller?"
          answer="Because NestJS matches routes in order from top to bottom. If @Get(':id') is defined first, visiting /users/profile will treat the word 'profile' as the :id parameter!"
        />
      </div>
    </SectionContainer>
  );
}
