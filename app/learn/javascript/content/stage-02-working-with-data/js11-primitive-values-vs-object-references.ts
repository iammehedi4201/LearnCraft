import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js11PrimitiveValuesVsObjectReferencesContent: StandardLessonContent = {
  slug: "js11-primitive-values-vs-object-references",
  code: "JS-11",
  title: "Primitive Values vs. Object References",
  subtitle: "Master the fundamental difference between copying values and sharing memory references.",
  difficulty: "Difficult",
  scenario: {
    question: "A developer copies a settings object into another variable, changes the copy, and unexpectedly sees the original settings change too. What may have happened?",
    answer: "Both variables may point to the same object. To make a separate shallow copy, use { ...settings }. If it contains nested objects that also need to be separate, a shallow copy is not enough.",
  },
  interviewQuestion: {
    question: "What is the difference between copying a primitive and assigning an object to another variable?",
    answer: "A primitive assignment copies the value. An object assignment copies the reference, so both variables can refer to the same object.",
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
    title: "Primitive Values vs. Object References",
    bigPicture: "Primitive values such as numbers and strings are copied as values. Objects and arrays are accessed through references. When you assign an object to another variable, both variables can refer to the same object.",
    codeSnippet: "let firstScore = 10;\nlet secondScore = firstScore;\nsecondScore = 20;\nconsole.log(firstScore); // 10\n\nconst firstUser = { name: \"Rina\" };\nconst secondUser = firstUser;\nsecondUser.name = \"Mehedi\";\nconsole.log(firstUser.name); // Mehedi",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Primitives",
            "desc": "Numbers, strings, and booleans create independent copies upon assignment."
      },
      {
            "title": "Objects & Arrays",
            "desc": "Variables store a pointer to the memory location. Assignments share the same target."
      },
      {
            "title": "Cloning",
            "desc": "To make an independent copy, use spread { ...obj } or structuredClone(obj)."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Reference Rule",
      content: "Assigning an object to a new variable does NOT clone it. Both variables point to the exact same object in memory.",
    },
    cards: [
      {
            "number": "01",
            "tag": "COPIED BY VALUE",
            "title": "Primitives",
            "description": "Numbers, strings, and booleans create independent copies upon assignment.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "SHARED BY REFERENCE",
            "title": "Objects & Arrays",
            "description": "Variables store a pointer to the memory location. Assignments share the same target.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "ISOLATION",
            "title": "Cloning",
            "description": "To make an independent copy, use spread { ...obj } or structuredClone(obj).",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Primitives clone their data",
            "content": "Assigning a string or number makes a completely independent copy. Changing one never affects the other."
      },
      {
            "title": "2. Objects share a memory address",
            "content": "Assigning an object copies the pointer. Changing firstUser.name changes what secondUser sees because they are the same object."
      },
      {
            "title": "3. Clone intentionally when needed",
            "content": "If you need an independent object copy, use { ...settings } for shallow copies or structuredClone() for deep copies."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const original = { theme: \"dark\" };\nconst copy = original; // Only copies reference!\ncopy.theme = \"light\";\nconsole.log(original.theme); // \"light\" - Mutated unexpectedly!",
      explanation: "Assigning an object without spread creates an alias pointing to the same memory object.",
    },
    good: {
      title: "Recommended Approach",
      code: "const original = { theme: \"dark\" };\nconst copy = { ...original }; // Fresh shallow clone\ncopy.theme = \"light\";\nconsole.log(original.theme); // \"dark\" - Preserved!",
      explanation: "Using spread creates a new memory object, isolating changes between variables.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-11: Primitives vs References\nconst userA = { name: \"Rina\" };\nconst userB = userA;\nuserB.name = \"Mehedi\";\nconsole.log(\"Shared Reference:\", userA.name === userB.name);\n\nconst userC = { ...userA };\nuserC.name = \"Amina\";\nconsole.log(\"Cloned Independent:\", userA.name, \"!=\", userC.name);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when you assign an existing object to a new variable (const b = a)?",
      options: ["JavaScript creates a full deep clone of the object","Both variables point to the exact same object in memory","The original variable becomes undefined","JavaScript converts the object into a primitive string"],
      correctIndex: 1,
      explanation: "Objects are assigned by reference. Both variables point to the same memory location, so mutating one mutates both.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Pass by Value",
            "desc": "Primitives are copied independently in memory."
      },
      {
            "title": "Pass by Reference",
            "desc": "Objects share the same memory instance across variables."
      },
      {
            "title": "Explicit Cloning",
            "desc": "Always clone using spread or structuredClone() when independence is needed."
      }
],
    nextLessonPreview: {
      title: "Optional Chaining and Nullish Coalescing",
      desc: "Learn how ?. and ?? safely navigate missing values without runtime errors.",
    },
  },
};
