"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 13 — CODING EXERCISES (HANDS-ON RELATIONS)
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises: Relational Queries">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Put your relational data skills into practice! Complete the exercises below and click <strong>Check</strong> to verify your solutions.
        </p>
      </div>

      {/* ── Exercise 1: Relational Join Simulation ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Eager-Load Relation Joiner</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "relations-ex-01",
              title: "1. Build Relational Include Resolver",
              instructions: `Implement 'joinUserPosts(users: any[], posts: any[])':
Returns a new array of users where each user has a 'posts' array containing all posts where post.authorId === user.id.`,
              starterCode: `function joinUserPosts(users: any[], posts: any[]) {
  // Your code here:
}

const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const mockPosts = [
  { id: 101, title: "Post 1", authorId: 1 },
  { id: 102, title: "Post 2", authorId: 1 },
  { id: 103, title: "Post 3", authorId: 2 }
];
console.log("Joined:", JSON.stringify(joinUserPosts(mockUsers, mockPosts), null, 2));`,
              solutionCode: `function joinUserPosts(users: any[], posts: any[]) {
  return users.map((u) => {
    return {
      ...u,
      posts: posts.filter((p) => p.authorId === u.id),
    };
  });
}

const mockUsers = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
const mockPosts = [
  { id: 101, title: "Post 1", authorId: 1 },
  { id: 102, title: "Post 2", authorId: 1 },
  { id: 103, title: "Post 3", authorId: 2 }
];
console.log("Joined:", JSON.stringify(joinUserPosts(mockUsers, mockPosts), null, 2));`,
              hints: [
                "Map over users and attach posts: posts.filter((p) => p.authorId === u.id).",
              ],
              tests: [
                {
                  name: "Eager loads related posts onto users",
                  code: `const r = joinUserPosts([{ id: 1 }], [{ id: 10, authorId: 1 }]); if (!r || !r[0].posts || r[0].posts.length !== 1) throw new Error("Join failed");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Exercise 2: Cascade Delete Simulation ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Cascade Delete Simulator</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "relations-ex-02",
              title: "2. Build Cascade Delete Simulator",
              instructions: `Implement 'cascadeDeleteUser(userId: number, state: { users: any[], posts: any[], profiles: any[] })':
1. Removes user with userId from state.users.
2. Removes all posts where post.authorId === userId from state.posts.
3. Removes profile where profile.userId === userId from state.profiles.
4. Returns the updated state.`,
              starterCode: `function cascadeDeleteUser(userId: number, state: { users: any[], posts: any[], profiles: any[] }) {
  // Your code here:
}

const db = {
  users: [{ id: 1 }, { id: 2 }],
  posts: [{ id: 10, authorId: 1 }, { id: 20, authorId: 2 }],
  profiles: [{ id: 100, userId: 1 }]
};
console.log("After delete:", cascadeDeleteUser(1, db));`,
              solutionCode: `function cascadeDeleteUser(userId: number, state: { users: any[], posts: any[], profiles: any[] }) {
  return {
    users: state.users.filter((u) => u.id !== userId),
    posts: state.posts.filter((p) => p.authorId !== userId),
    profiles: state.profiles.filter((pr) => pr.userId !== userId),
  };
}

const db = {
  users: [{ id: 1 }, { id: 2 }],
  posts: [{ id: 10, authorId: 1 }, { id: 20, authorId: 2 }],
  profiles: [{ id: 100, userId: 1 }]
};
console.log("After delete:", cascadeDeleteUser(1, db));`,
              hints: [
                "Filter users, posts, and profiles by removing items matching userId.",
              ],
              tests: [
                {
                  name: "Deletes parent and cascades to child posts and profiles",
                  code: `const r = cascadeDeleteUser(1, { users: [{ id: 1 }], posts: [{ authorId: 1 }], profiles: [{ userId: 1 }] }); if (r.users.length !== 0 || r.posts.length !== 0 || r.profiles.length !== 0) throw new Error("Cascade delete failed");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>
    </SectionContainer>
  );
}
