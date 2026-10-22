import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js13ObjectReferencesAndCopyingContent: StandardLessonContent = {
  slug: "js13-object-references-and-copying",
  code: "JS-13",
  title: "Object References and Copying",
  subtitle: "Understand how objects and arrays are stored in memory by reference, avoid accidental mutation side-effects, and master shallow vs deep copying.",
  sections: [
    {
      id: "part1",
      label: "Value vs Reference",
      icon: "🧠",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Memory Pointers in Heap",
      icon: "💾",
      tag: "MECHANICS"
    },
    {
      id: "part3",
      label: "Shallow vs Deep Copying",
      icon: "📑",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Accidental Mutation Bug",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "References Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Primitives vs Reference Types in Memory",
    bigPicture: "Primitives (strings, numbers, booleans) are copied by value. Objects, arrays, and functions are copied by reference: variables store a memory address pointer to the object in heap memory, not the object itself.",
    analogy: "Passing a primitive is like printing a physical copy of a document: changes to your copy do not affect the original. Passing an object is like sharing a link to a Google Doc: any edit made via the link alters the single document everyone sees.",
    diagram: "STACK MEMORY                      HEAP MEMORY (Address 0x401)\n+-----------------------+         +--------------------------+\n| originalObj: 0x401    | ------> | { name: \"LearnCraft\",    |\n+-----------------------+         |   version: 1.0 }         |\n| copyAlias:   0x401    | ------> +--------------------------+\n+-----------------------+         (BOTH variables point here!)",
    breakdownTitle: "Memory Rules",
    breakdownItems: [
      {
        title: "Primitive Copy by Value",
        desc: "let b = a creates a completely independent copy of the value. Modifying b has zero impact on a."
      },
      {
        title: "Object Copy by Reference",
        desc: "const b = a copies only the pointer address. Both variables point to the exact same heap memory block."
      },
      {
        title: "Equality Comparison Rule",
        desc: "== and === compare memory address pointers for objects. Two objects with identical contents evaluate to false if they occupy different memory addresses."
      }
    ]
  },
  part2: {
    title: "The Mechanics of Object References",
    intro: "Step through how reference assignment affects variables and equality checks.",
    cards: [
      {
        number: "01",
        tag: "Reference Alias",
        title: "Shared Memory Mutation",
        description: "Assigning an object to a new variable copies the address, not the data.",
        codeSnippet: "const userA = { name: \"Alex\" };\nconst userB = userA; // Copies memory address\nuserB.name = \"Jordan\"; // Mutates the single shared object!\nconsole.log(userA.name); // Output: Jordan (Changed!)",
        color: "rose"
      },
      {
        number: "02",
        tag: "Equality",
        title: "Reference Equality (===)",
        description: "Two distinct object literals always evaluate to false because each has a unique memory address.",
        codeSnippet: "console.log({ id: 1 } === { id: 1 }); // Output: false (Different addresses)\nconst ref1 = { id: 1 };\nconst ref2 = ref1;\nconsole.log(ref1 === ref2); // Output: true (Same address)",
        color: "amber"
      },
      {
        number: "03",
        tag: "const Mutability",
        title: "const Objects Can Mutate",
        description: "const prevents reassigning the variable identifier; it does NOT make object properties immutable.",
        codeSnippet: "const profile = { plan: \"Free\" };\nprofile.plan = \"Pro\"; // Valid: mutates properties\n// profile = {}; // TypeError: Assignment to constant variable\nconsole.log(profile.plan); // Output: Pro",
        color: "purple"
      }
    ],
    rule: {
      title: "The Reference Invariant",
      content: "When you pass an object or array into a function, any property mutation inside that function directly mutates the caller's object in memory."
    }
  },
  part3: {
    title: "Shallow Copying vs Deep Copying",
    intro: "Learn how to clone objects safely without unexpected shared reference side effects.",
    points: [
      {
        title: "1. Shallow Copy with Spread ({ ...obj })",
        content: "The spread operator copies top-level properties into a new object. However, nested objects still share reference pointers!",
        codeSnippet: "const user = { name: \"Maya\", settings: { darkTheme: true } };\nconst shallowCopy = { ...user };\nshallowCopy.name = \"Sarah\"; // Safe (top-level)\nshallowCopy.settings.darkTheme = false; // DANGER: mutates user.settings too!\nconsole.log(user.settings.darkTheme); // Output: false"
      },
      {
        title: "2. Deep Copy with structuredClone()",
        content: "Modern JavaScript provides structuredClone() to recursively duplicate every nested object and array into separate memory addresses.",
        codeSnippet: "const original = { title: \"Course\", tags: [\"js\", \"web\"] };\nconst deepClone = structuredClone(original);\ndeepClone.tags.push(\"react\"); // Completely isolated!\nconsole.log(original.tags); // Output: ['js', 'web']\nconsole.log(deepClone.tags); // Output: ['js', 'web', 'react']"
      },
      {
        title: "3. Object.freeze() (Shallow Immutability)",
        content: "Prevents adding, removing, or modifying top-level properties on an object.",
        codeSnippet: "const config = Object.freeze({ api: \"https://api.com\" });\n// config.api = \"http://hack.com\"; // Fails silently or throws in strict mode\nconsole.log(config.api); // Output: https://api.com"
      }
    ]
  },
  part4: {
    title: "Real-World Bug: Unintended Mutation in Redux & State",
    bad: {
      title: "❌ Direct Mutation of Application State",
      code: "function updateUserRole(currentUser, newRole) {\n  // Bug: Direct mutation modifies the original state object in place!\n  currentUser.role = newRole;\n  return currentUser;\n}\nconst state = { user: { name: \"Alex\", role: \"guest\" } };\nupdateUserRole(state.user, \"admin\");\n// Breaks React change detection because reference address did not change!",
      explanation: "Directly mutating state objects breaks change-detection algorithms in React and Redux, which rely on comparing previous and new object memory references."
    },
    good: {
      title: "✅ Immutable Update Returning a New Object",
      code: "function updateUserRole(currentUser, newRole) {\n  // Safe: Returns a brand new object reference with updated property\n  return {\n    ...currentUser,\n    role: newRole\n  };\n}\nconst state = { user: { name: \"Alex\", role: \"guest\" } };\nconst nextUser = updateUserRole(state.user, \"admin\");\nconsole.log(state.user.role); // Output: guest (Preserved!)\nconsole.log(nextUser.role);   // Output: admin",
      explanation: "Spreading creates a new object address in heap memory, preserving original state for reliable change tracking."
    }
  },
  part5: {
    title: "Object References Sandbox",
    intro: "Observe how reference aliases share mutations, and compare with structuredClone.",
    starterCode: "const originalConfig = {\n  env: \"production\",\n  db: { host: \"localhost\", port: 5432 }\n};\n\n// 1. Reference alias (mutates original):\nconst alias = originalConfig;\nalias.env = \"staging\";\nconsole.log(\"Original env after alias change:\", originalConfig.env);\n\n// 2. Deep clone with structuredClone:\nconst isolated = structuredClone(originalConfig);\nisolated.db.host = \"remote-server\";\n\nconsole.log(\"Original db host:\", originalConfig.db.host);\nconsole.log(\"Isolated db host:\", isolated.db.host);\n"
  },
  part6: {
    title: "Key Takeaways: Object References",
    takeaways: [
      {
        title: "Stored by Reference",
        desc: "Objects and arrays live in Heap memory; variables hold pointer addresses."
      },
      {
        title: "Shallow vs Deep Copy",
        desc: "Spread {...obj} copies top-level fields only. Use structuredClone() for nested objects."
      },
      {
        title: "Immutable State Updates",
        desc: "Always return new object references rather than mutating state directly in modern web apps."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `const copy = { ...user }` still allow accidental mutations on `user.address.city`?",
      options: [
        "Because spread operators only work on arrays, not objects",
        "Because the spread operator only creates a shallow copy; nested objects still share their original memory address reference",
        "Because JavaScript automatically freezes all copied objects",
        "Because dot notation overrides spread operators"
      ],
      correctIndex: 1,
      explanation: "Spread syntax `{ ...user }` creates a shallow copy. While the top-level object is new, any nested properties (like `address`) still hold reference pointers to the exact same nested objects in heap memory."
    }
  }
};
