"use client";

import {
  SectionContainer,
  ExerciseBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 17 — HANDS-ON CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function SectionCodingExercises() {
  return (
    <SectionContainer number={17} title="Hands-On Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your TypeScript skills into practice! Solve each exercise on your own first, then reveal the solution to compare your approach.
        </p>
      </div>

      {/* ── Exercise 1: Beginner ── */}
      <div className="mb-12">
        <ExerciseBox
          level="beginner"
          title="Exercise 1: Typed User Profile & Role Validation"
          description={`Create a typed user profile system with the following rules:
1. A String Enum 'Role' with values: 'ADMIN', 'MODERATOR', 'USER'.
2. An Interface 'UserProfile' with fields: id (number), username (string), email (string), role (Role), and optional bio (string).
3. A function 'formatUserSummary(user: UserProfile): string' that returns a formatted badge like: "[ADMIN] Alice (alice@test.com)".`}
          solution={`enum Role {
  ADMIN = "ADMIN",
  MODERATOR = "MODERATOR",
  USER = "USER",
}

interface UserProfile {
  id: number;
  username: string;
  email: string;
  role: Role;
  bio?: string;
}

function formatUserSummary(user: UserProfile): string {
  const bioText = user.bio ? \` - "\${user.bio}"\` : "";
  return \`[\${user.role}] \${user.username} (\${user.email})\${bioText}\`;
}

const sampleUser: UserProfile = {
  id: 1,
  username: "Mehedi",
  email: "mehedi@nest.com",
  role: Role.ADMIN,
  bio: "Lead Developer",
};

console.log(formatUserSummary(sampleUser));`}
        />
      </div>

      <Divider />

      {/* ── Exercise 2: Intermediate ── */}
      <div className="mb-12">
        <ExerciseBox
          level="intermediate"
          title="Exercise 2: Generic Paginated API Response Wrapper"
          description={`Build a universal pagination wrapper for NestJS APIs:
1. Define a Generic Interface 'PaginatedResponse<T>' with:
   - data: T[] (array of items)
   - totalCount: number
   - page: number
   - limit: number
   - hasNextPage: boolean
2. Write a Generic Function 'createPaginatedResult<T>(items: T[], total: number, page: number, limit: number): PaginatedResponse<T>'.
3. Test it with an array of string product names or product objects.`}
          solution={`interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  limit: number;
  hasNextPage: boolean;
}

function createPaginatedResult<T>(
  items: T[],
  totalCount: number,
  page: number,
  limit: number
): PaginatedResponse<T> {
  return {
    data: items,
    totalCount,
    page,
    limit,
    hasNextPage: page * limit < totalCount,
  };
}

interface Product {
  id: number;
  name: string;
  price: number;
}

const productList: Product[] = [
  { id: 1, name: "Mechanical Keyboard", price: 129.99 },
  { id: 2, name: "Ergonomic Mouse", price: 79.99 },
];

const result = createPaginatedResult(productList, 45, 1, 10);
console.log("Pagination Result:", result);`}
        />
      </div>

      <Divider />

      {/* ── Exercise 3: Real-World NestJS ── */}
      <div className="mb-12">
        <ExerciseBox
          level="real-world"
          title="Exercise 3: Multi-Entity DTO Transformation Pipeline"
          description={`Implement a complete DTO pipeline from a master entity:
1. Master Interface 'CourseEntity': id (string), title (string), description (string), price (number), authorId (string), published (boolean), createdAt (Date).
2. 'CreateCourseDto': Omits 'id' and 'createdAt'.
3. 'UpdateCourseDto': Partial of 'CreateCourseDto'.
4. 'CourseCardDto': Picks only 'id', 'title', 'price', and 'published'.
5. A Type Guard function 'isCoursePublished(course: CourseCardDto): boolean'.`}
          solution={`interface CourseEntity {
  id: string;
  title: string;
  description: string;
  price: number;
  authorId: string;
  published: boolean;
  createdAt: Date;
}

// 1. Create DTO (Client provides content, server assigns ID and timestamp)
type CreateCourseDto = Omit<CourseEntity, "id" | "createdAt">;

// 2. Update DTO (Any field can be updated in PATCH)
type UpdateCourseDto = Partial<CreateCourseDto>;

// 3. Card Preview DTO (Minimal lightweight payload)
type CourseCardDto = Pick<CourseEntity, "id" | "title" | "price" | "published">;

// 4. Type Guard
function isCoursePublished(course: CourseCardDto): boolean {
  return course.published === true;
}

const sampleCourse: CourseCardDto = {
  id: "course_101",
  title: "NestJS Elite Mastery",
  price: 99.99,
  published: true,
};

console.log("Is Published?", isCoursePublished(sampleCourse));`}
        />
      </div>
    </SectionContainer>
  );
}

// Re-export for legacy compatibility
export const SectionMiniChallenge = SectionCodingExercises;
