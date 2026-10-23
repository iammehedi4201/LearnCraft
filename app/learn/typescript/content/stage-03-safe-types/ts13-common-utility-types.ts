import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts13CommonUtilityTypesContent: StandardLessonContent = {
  slug: "ts13-common-utility-types",
  code: "TS-13",
  title: "Common Utility Types",
  subtitle: "Transform existing types with Pick, Partial, Omit, and Record.",
  difficulty: "Moderate",
  scenario: {
    question: "A form updates only a user's name or email, and it does not require both fields every time. Which utility type could help make those fields optional?",
    answer: "Use `Partial`, applied to the fields the form can update. For example, `type UserUpdate = Partial<Pick<User, \"name\" | \"email\">>`. That makes both fields optional for an update.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Common Utility Types",
    bigPicture: "Utility types help you create new types from existing types so you never have to repeat the same fields by hand.",
    codeSnippet: `type User = {
  id: number;
  name: string;
  email: string;
};

// 1. Pick: Choose specific fields
type UserPreview = Pick<User, "id" | "name">;

// 2. Partial: Make all fields optional
type UserUpdate = Partial<User>;

// 3. Omit: Remove specific fields
type NewUser = Omit<User, "id">;

// 4. Record: Key-value dictionary
type UserMap = Record<number, User>;`,
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
        title: "Pick<T, Keys>",
        desc: "Constructs a type by picking only the specified properties from type T.",
      },
      {
        title: "Partial<T>",
        desc: "Constructs a type with all properties of T set to optional (adds ? to each field).",
      },
      {
        title: "Omit<T, Keys>",
        desc: "Constructs a type with all properties from T except the ones you remove.",
      },
      {
        title: "Record<K, V>",
        desc: "Constructs an object type whose keys are of type K and values are of type V.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Core Utility Types Overview",
      content: "- `Pick` keeps the fields you name. - `Partial` makes fields optional. - `Omit` removes fields you name. - `Record` describes an object dictionary. Learn to use these built-in helpers instead of recreating types manually.",
    },
    cards: [
      {
        number: "01",
        tag: "PICK & OMIT",
        title: "Pick & Omit",
        description: "Pick chooses only the fields you want. Omit removes the fields you do not want (like leaving out IDs or passwords).",
        color: "purple",
      },
      {
        number: "02",
        tag: "PARTIAL",
        title: "Partial<T>",
        description: "Turns all properties into optional fields with '?', perfect for update forms and patch requests.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RECORD",
        title: "Record<K, V>",
        description: "Defines key-value dictionary objects, like mapping user IDs (number) to User objects.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how each utility type fits into real applications, followed by a realistic scenario:",
    points: [
      {
        title: "1. Pick and Omit for fine-tuning fields",
        content: "Use `Pick<User, 'id' | 'name'>` when a card only displays summary info. Use `Omit<User, 'id'>` when a registration form accepts user data before an ID is created.",
      },
      {
        title: "2. Partial makes edits flexible",
        content: "`Partial<User>` makes every field optional. When a user edits their profile, they might only change their name without sending their email again.",
      },
      {
        title: "3. Record creates structured dictionaries",
        content: "`Record<number, User>` models a lookup map where every key is a number ID and its value is a full User object.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Duplicating Types Manually",
      code: `type User = { id: number; name: string; email: string };

// ❌ Manually typed duplicates fall out of sync when User changes!
type NewUser = { name: string; email: string };
type UserMap = { [id: number]: { id: number; name: string; email: string } };`,
      explanation: "Copying fields by hand causes drift and maintenance bugs when the base model evolves.",
    },
    good: {
      title: "Deriving Types with Built-in Utilities",
      code: `type User = { id: number; name: string; email: string };

// ✅ Clean, single source of truth:
type NewUser = Omit<User, "id">;
type UserMap = Record<number, User>;`,
      explanation: "Utility types keep your data models connected to their single source of truth.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test and run all four utility types live in the editor:",
    starterCode: `// Lesson 13: Common Utility Types
type User = {
  id: number;
  name: string;
  email: string;
};

// 1. Pick: Choose specific fields
type UserPreview = Pick<User, "id" | "name">;
const preview: UserPreview = { id: 1, name: "Rina" };

// 2. Partial: Make fields optional
type UserUpdate = Partial<User>;
const update: UserUpdate = { email: "new@example.com" };

// 3. Omit: Remove the 'id' field
type NewUser = Omit<User, "id">;
const newUser: NewUser = { name: "Mehedi", email: "mehedi@example.com" };

// 4. Record: Dictionary of Users by ID
type UserMap = Record<number, User>;
const userLookup: UserMap = {
  101: { id: 101, name: "Rina", email: "rina@example.com" },
  102: { id: 102, name: "Mehedi", email: "mehedi@example.com" }
};

console.log("Pick:", preview);
console.log("Partial:", update);
console.log("Omit:", newUser);
console.log("Record:", userLookup[101]);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `Partial<User>` do in TypeScript?",
      options: [
        "Makes every property in User optional",
        "Removes all properties from User",
        "Makes every property in User readonly",
        "Picks only the first two properties of User",
      ],
      correctIndex: 0,
      explanation: "`Partial<T>` wraps all properties of type T in `?`, making every property optional.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Utility Types",
        desc: "Built-in helpers that create new types from existing types without repetition.",
      },
      {
        title: "Pick & Omit",
        desc: "Pick keeps the fields you want; Omit removes the fields you do not want.",
      },
      {
        title: "Partial & Record",
        desc: "Partial makes fields optional; Record creates typed key-value dictionary maps.",
      },
    ],
  },
};
