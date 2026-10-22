import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js16OptionalChainingAndNullishCoalescingContent: StandardLessonContent = {
  slug: "js16-optional-chaining-and-nullish-coalescing",
  code: "JS-16",
  title: "Safe Property Access with ?. and ??",
  subtitle: "Navigate nested objects safely without runtime crashes using ?. and provide precise defaults with ?? without corrupting valid 0 or false values.",
  sections: [
    {
      id: "part1",
      label: "Safe Navigation",
      icon: "🛡️",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "?. and ?? Syntax",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "?? vs || Difference",
      icon: "⚖️",
      tag: "COMPARISON"
    },
    {
      id: "part4",
      label: "Falsy Zero Bug",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Operators Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
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
    title: "Safe Data Access in Modern JavaScript",
    bigPicture: "Modern JavaScript provides two operators to eliminate common runtime crashes: optional chaining (?.) stops evaluation if an intermediate property is null or undefined, and nullish coalescing (??) provides a fallback only when a value is nullish.",
    analogy: "Optional chaining (?.) is like knocking on each door before opening it: if the room doesn't exist, you stop safely instead of walking off a cliff.",
    diagram: "WITHOUT ?.:\nuser.address.street  --> If user.address is null --> CRASH: TypeError!\n\nWITH ?.:\nuser?.address?.street --> If address is null --> Returns undefined safely!",
    breakdownTitle: "Modern Operators",
    breakdownItems: [
      {
        title: "Optional Chaining (?.)",
        desc: "Short-circuits to undefined if the reference before ?. is null or undefined, preventing fatal TypeErrors."
      },
      {
        title: "Nullish Coalescing (??)",
        desc: "Returns the right-hand operand only if the left-hand operand is null or undefined."
      },
      {
        title: "Falsy Value Preservation",
        desc: "Unlike ||, ?? preserves legitimate falsy values like 0, \"\", and false without replacing them."
      }
    ]
  },
  part2: {
    title: "Optional Chaining and Coalescing Syntax",
    intro: "Two complementary operators for robust nested property access.",
    cards: [
      {
        number: "01",
        tag: "Safe Read",
        title: "Optional Chaining (?.)",
        description: "Safely reads deep nested properties without throwing errors.",
        codeSnippet: "const user = { name: \"Alex\" };\n// address is undefined, but ?. prevents a crash:\nconsole.log(user?.address?.city); // Output: undefined",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Fallback",
        title: "Nullish Coalescing (??)",
        description: "Provides fallback values only for null or undefined.",
        codeSnippet: "const rawScore = null;\nconst finalScore = rawScore ?? 100;\nconsole.log(finalScore); // Output: 100",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Combined",
        title: "Combined Safe Navigation",
        description: "Pair ?. with ?? for safe deep reads with guaranteed fallbacks.",
        codeSnippet: "const account = {};\nconst plan = account?.membership?.tier ?? \"Standard\";\nconsole.log(plan); // Output: Standard",
        color: "purple"
      }
    ],
    rule: {
      title: "Coalescing Rule",
      content: "Use ?? instead of || when 0, false, or \"\" are legitimate valid values in your application."
    }
  },
  part3: {
    title: "Understanding ?? vs ||",
    intro: "Why nullish coalescing replaces logical OR for default values.",
    points: [
      {
        title: "1. The Logical OR (||) Behavior",
        content: "|| checks for ANY falsy value: 0, \"\", false, null, undefined, or NaN.",
        codeSnippet: "const cartItems = 0; // Legitimate valid count\nconsole.log(cartItems || 5); // Output: 5 (Bug: Overwrote valid 0!)"
      },
      {
        title: "2. The Nullish (??) Precision",
        content: "?? triggers ONLY on null or undefined, preserving 0 and empty strings.",
        codeSnippet: "const cartItems = 0;\nconsole.log(cartItems ?? 5); // Output: 0 (Preserved!)"
      },
      {
        title: "3. Optional Method Calls (?.())",
        content: "Safely call methods that might not exist on an object without throwing.",
        codeSnippet: "const obj = {};\nconsole.log(obj.nonExistentMethod?.()); // Output: undefined (No crash!)"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: The Falsy Zero Bug with ||",
    bad: {
      title: "❌ Using || for Numerical Defaults",
      code: "function setSpeed(speed) {\n  // Bug: If speed is 0 (stopped), 0 is falsy, so it defaults to 50!\n  return speed || 50;\n}\nconsole.log(setSpeed(0)); // Output: 50 (Car cannot stop!)",
      explanation: "Logical OR treats 0 as falsy, accidentally overwriting a valid stopped vehicle speed with the default 50."
    },
    good: {
      title: "✅ Use ?? to Preserve Zero and False",
      code: "function setSpeed(speed) {\n  // Safe: 0 is preserved; only null or undefined gets default 50\n  return speed ?? 50;\n}\nconsole.log(setSpeed(0));         // Output: 0 (Vehicle stopped)\nconsole.log(setSpeed(undefined)); // Output: 50",
      explanation: "Nullish coalescing respects 0 as a valid numeric value, triggering only on missing data."
    }
  },
  part5: {
    title: "Safe Navigation Sandbox",
    intro: "Test optional chaining and nullish coalescing with nested objects.",
    starterCode: "const apiPayload = {\n  profile: {\n    settings: {\n      notificationsCount: 0,\n      soundEnabled: false\n    }\n  }\n};\n\n// 1. Safe nested read:\nconst userCity = apiPayload?.profile?.location?.city ?? \"Unknown City\";\n\n// 2. Preserving 0 and false:\nconst count = apiPayload.profile.settings.notificationsCount ?? 10;\nconst sound = apiPayload.profile.settings.soundEnabled ?? true;\n\nconsole.log(\"City:\", userCity);\nconsole.log(\"Notifications count:\", count); // Expected: 0\nconsole.log(\"Sound enabled:\", sound);       // Expected: false\n"
  },
  part6: {
    title: "Key Takeaways: Modern Safe Operators",
    takeaways: [
      {
        title: "?. Prevents Crashes",
        desc: "Short-circuits to undefined if any property in the chain is null or undefined."
      },
      {
        title: "?? Preserves Falsy Values",
        desc: "Fallbacks occur only for null or undefined, preserving 0, \"\", and false."
      },
      {
        title: "Optional Method Calls",
        desc: "Use obj.method?.() to invoke optional callbacks safely without crashing."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `const count = 0; console.log(count ?? 10, count || 10);` output?",
      options: [
        "0 10",
        "10 10",
        "0 0",
        "undefined 10"
      ],
      correctIndex: 0,
      explanation: "`count ?? 10` returns `0` because 0 is not nullish (not null or undefined). `count || 10` returns `10` because 0 is a falsy value."
    }
  }
};
