import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js12OptionalChainingAndNullishCoalescingContent: StandardLessonContent = {
  slug: "js12-optional-chaining-and-nullish-coalescing",
  code: "JS-12",
  title: "Optional Chaining and Nullish Coalescing",
  subtitle: "Safely access nested properties with ?. and provide defaults with ?? without masking zero or false.",
  difficulty: "Easy",
  scenario: {
    question: "A product quantity can be 0, but a developer uses quantity || 1 as a fallback. Why might the result be wrong?",
    answer: "Because 0 is falsy, || replaces it with 1. If the fallback should apply only when the value is missing, use quantity ?? 1.",
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
    title: "Optional Chaining and Nullish Coalescing",
    bigPicture: "Optional chaining (?.) safely reads a property when something before it may be null or undefined. Nullish coalescing (??) provides a fallback only when the left side is null or undefined.",
    codeSnippet: "const user = { profile: null };\nconst city = user.profile?.city ?? \"Unknown\";\n\nconsole.log(city); // Unknown",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Optional Chaining ?.",
            "desc": "Short-circuits to undefined if the target is null or undefined, avoiding crashes."
      },
      {
            "title": "Nullish Coalescing ??",
            "desc": "Applies fallback ONLY for null or undefined. Keeps 0, false, and \"\" intact."
      },
      {
            "title": "|| vs ??",
            "desc": "|| replaces 0 and \"\" because they are falsy. ?? keeps 0 and \"\" as valid values."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Fallback Rule",
      content: "Use ?? when 0, false, or \"\" are valid values and you only want to catch null or undefined.",
    },
    cards: [
      {
            "number": "01",
            "tag": "SAFE ACCESS",
            "title": "Optional Chaining ?.",
            "description": "Short-circuits to undefined if the target is null or undefined, avoiding crashes.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "STRICT FALLBACK",
            "title": "Nullish Coalescing ??",
            "description": "Applies fallback ONLY for null or undefined. Keeps 0, false, and \"\" intact.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "COMMON PITFALL",
            "title": "|| vs ??",
            "description": "|| replaces 0 and \"\" because they are falsy. ?? keeps 0 and \"\" as valid values.",
            "color": "amber"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. ?. prevents crash on missing properties",
            "content": "Writing user.profile?.city returns undefined instead of throwing a TypeError if profile is null."
      },
      {
            "title": "2. ?? gives fallbacks for missing data only",
            "content": "?? triggers fallback only when a value is null or undefined, not when it is 0, false, or \"\"."
      },
      {
            "title": "3. Avoid using || for defaults",
            "content": "Writing quantity || 1 turns a valid quantity of 0 into 1! Use quantity ?? 1 instead."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const quantity = 0;\n// Bug: 0 is falsy, so || overrides it!\nconst displayQty = quantity || 1;\nconsole.log(displayQty); // 1 - Wrong! User chose 0!",
      explanation: "Logical OR (||) treats 0 as falsy and mistakenly replaces it with the default.",
    },
    good: {
      title: "Recommended Approach",
      code: "const quantity = 0;\nconst displayQty = quantity ?? 1;\nconsole.log(displayQty); // 0 - Correct!",
      explanation: "Nullish coalescing (??) recognizes 0 as a valid value and keeps it.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-12: Optional Chaining and Nullish Coalescing\nconst data = { config: { timeout: 0 } };\nconst timeout = data.config?.timeout ?? 5000;\nconst retries = data.config?.retries ?? 3;\n\nconsole.log(\"Timeout:\", timeout, \"| Retries:\", retries);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the value of result in: const val = 0; const result = val ?? 10;",
      options: ["10","0","undefined","null"],
      correctIndex: 1,
      explanation: "?? only falls back when the left side is null or undefined. Since 0 is neither, the value 0 is preserved.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Safe Navigation",
            "desc": "?. prevents Cannot read properties of undefined crashes."
      },
      {
            "title": "Falsy vs Nullish",
            "desc": "?? protects 0, false, and \"\" from unintended overrides."
      },
      {
            "title": "Reliable Defaults",
            "desc": "Combine ?. and ?? for rock-solid nested data access."
      }
],
    nextLessonPreview: {
      title: "Spread vs. Rest",
      desc: "Master the two sides of the ... syntax: spreading arrays and gathering rest parameters.",
    },
  },
};
