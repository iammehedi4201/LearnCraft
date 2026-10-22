import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js13ObjectReferencesAndCopyingContent: StandardLessonContent = {
  "slug": "js13-object-references-and-copying",
  "code": "JS-13",
  "title": "Object References: Shallow Copy vs Deep Copy",
  "subtitle": "Understand how objects are stored by reference in memory, and master shallow copying with spread vs deep cloning.",
  "sections": [
    {
      "id": "part1",
      "label": "Reference Memory",
      "icon": "🧠",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Shallow vs Deep",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Safe Cloning & AI Bugs",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Shared Reference Mutation",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Cloning Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "How Objects Live in Memory",
    "bigPicture": "In JavaScript, primitive values (numbers, strings) are copied by value. Objects and arrays are copied by reference. When you assign an object to a new variable, both variables point to the exact same object in memory.",
    "analogy": "Think of a primitive like a photocopy of a page (each person has their own independent sheet). An object is like a shared Google Doc link: anyone who edits the document alters it for everyone.",
    "diagram": "Variable A: [ Points to Memory 0x4F ] ----+\n                                          |---> [ { name: \"Alex\", score: 10 } ]\nVariable B: [ Points to Memory 0x4F ] ----+",
    "breakdownTitle": "Memory Rules",
    "breakdownItems": [
      {
        "title": "Copy by Reference",
        "desc": "Assigning an object variable creates a second pointer to the original memory address."
      },
      {
        "title": "Shallow Copying ({ ...obj })",
        "desc": "Copies the top-level keys into a new object, but nested objects remain shared references."
      },
      {
        "title": "Deep Copying (structuredClone)",
        "desc": "Recursively clones all nested objects and arrays into completely independent memory."
      }
    ]
  },
  "part2": {
    "title": "Copying Techniques",
    "intro": "Compare assignment, shallow copy, and deep copy.",
    "cards": [
      {
        "number": "01",
        "tag": "Shared",
        "title": "Direct Assignment",
        "description": "Both variables share the exact same reference. Modifying one modifies the other.",
        "codeSnippet": "const a = { val: 10 };\nconst b = a; // Shares reference!\nb.val = 99;\nconsole.log(a.val); // Output: 99 (mutated!)",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Shallow",
        "title": "Shallow Copy ({ ... })",
        "description": "Clones the top-level object. Safe for flat objects without nested structures.",
        "codeSnippet": "const user = { name: \"Alex\", age: 25 };\nconst copy = { ...user };\ncopy.age = 26;\nconsole.log(user.age); // Output: 25 (untouched!)",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Deep",
        "title": "Deep Copy (structuredClone)",
        "description": "Completely duplicates all nested objects and arrays independently.",
        "codeSnippet": "const original = { data: { count: 5 } };\nconst deep = structuredClone(original);\ndeep.data.count = 10;\nconsole.log(original.data.count); // Output: 5 (safe!)",
        "color": "emerald"
      }
    ],
    "rule": {
      "title": "The Cloning Rule",
      "content": "Use `{ ...obj }` for flat objects. Always use `structuredClone(obj)` when copying nested data."
    }
  },
  "part3": {
    "title": "Safe State Updates & Reading AI Code",
    "intro": "Avoid accidental mutations in state management and backend services.",
    "points": [
      {
        "title": "1. The Nested Spread Trap",
        "content": "The spread operator `{ ...obj }` only duplicates the first level. Any nested objects or arrays are still shared references.",
        "codeSnippet": "const state = { user: \"Sam\", settings: { theme: \"dark\" } };\nconst shallow = { ...state };\n\n// ❌ Modifying nested property mutates original!\nshallow.settings.theme = \"light\";\nconsole.log(state.settings.theme); // Output: light (mutated!)"
      },
      {
        "title": "2. Clean Nested Updates with Spread",
        "content": "In modern React and Redux, shallow copy each nested level explicitly to preserve immutability.",
        "codeSnippet": "const state = { user: \"Sam\", settings: { theme: \"dark\" } };\n\n// ✅ Properly copying nested level:\nconst safeState = {\n  ...state,\n  settings: { ...state.settings, theme: \"light\" },\n};\nconsole.log(state.settings.theme);     // Output: dark (safe!)\nconsole.log(safeState.settings.theme); // Output: light"
      },
      {
        "title": "3. Deep Cloning with structuredClone",
        "content": "Built into modern JavaScript browsers and Node.js. It safely clones deeply nested data structures.",
        "codeSnippet": "const complexData = {\n  id: 1,\n  metadata: { tags: [\"dev\", \"web\"] },\n};\n\nconst isolatedClone = structuredClone(complexData);\nisolatedClone.metadata.tags.push(\"react\");\nconsole.log(complexData.metadata.tags.length); // Output: 2 (unaffected!)"
      }
    ]
  },
  "part4": {
    "title": "Accidental Reference Mutation in Functions",
    "bad": {
      "title": "❌ Function Mutates Passed Object",
      "code": "function applyDiscount(item) {\n  // Bug: Modifies the original item object directly!\n  item.price = item.price * 0.8;\n  return item;\n}\n\nconst originalProduct = { name: \"Shoes\", price: 100 };\napplyDiscount(originalProduct);\nconsole.log(\"Original price:\", originalProduct.price); // Output: 80 (mutated!)",
      "explanation": "Modifying object arguments directly inside functions creates side effects that cause unpredictable bugs elsewhere in the app."
    },
    "good": {
      "title": "✅ Pure Function Returns New Object",
      "code": "function applyDiscount(item) {\n  // Clean: Returns a new object, leaving original untouched\n  return {\n    ...item,\n    price: item.price * 0.8,\n  };\n}\n\nconst originalProduct = { name: \"Shoes\", price: 100 };\nconst discounted = applyDiscount(originalProduct);\n\nconsole.log(\"Original:\", originalProduct.price); // Output: 100 (safe!)\nconsole.log(\"Discounted:\", discounted.price);     // Output: 80",
      "explanation": "Pure functions return a new copy with modified properties, leaving the original data untouched."
    }
  },
  "part5": {
    "title": "Interactive Cloning Sandbox",
    "intro": "Observe the difference between reference assignment, spread, and structuredClone.",
    "starterCode": "// 1. Original nested object:\nconst original = {\n  name: \"LearnCraft\",\n  stats: { users: 500 },\n};\n\n// 2. Deep clone with structuredClone:\nconst deepCopy = structuredClone(original);\ndeepCopy.stats.users = 1000;\n\nconsole.log(\"Original users:\", original.stats.users); // 500\nconsole.log(\"Deep copy users:\", deepCopy.stats.users); // 1000\n\n// PRACTICE:\n// Try creating a shallow copy with const shallow = { ...original };\n// Change shallow.stats.users and observe what happens to original.stats.users!\n"
  },
  "part6": {
    "title": "Key Takeaways: References & Copying",
    "takeaways": [
      {
        "title": "Passed by Reference",
        "desc": "Objects and arrays share memory references when assigned with =."
      },
      {
        "title": "Spread is Shallow",
        "desc": "{ ...obj } copies only top-level properties; nested objects remain linked."
      },
      {
        "title": "structuredClone for Deep",
        "desc": "Use structuredClone(obj) when you need complete independence for nested data."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why does `const b = { ...a }; b.nested.count = 5;` also change `a.nested.count`?",
      "options": [
        "Because the spread operator only copies top-level properties; nested objects remain shared references",
        "Because count is a reserved keyword in JavaScript",
        "Because variables declared with const cannot be copied",
        "Because numbers are always passed by reference"
      ],
      "correctIndex": 0,
      "explanation": "The spread operator performs a shallow copy. Top-level keys are duplicated, but any nested objects retain their original memory references."
    }
  }
};
