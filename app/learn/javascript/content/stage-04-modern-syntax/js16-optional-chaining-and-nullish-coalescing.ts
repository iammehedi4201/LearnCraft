import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js16OptionalChainingAndNullishCoalescingContent: StandardLessonContent = {
  slug: "js16-optional-chaining-and-nullish-coalescing",
  code: "JS-16",
  title: "Safe Property Access with ?. and ??",
  subtitle: "Prevent runtime crashes by navigating nested data with ?. and setting safe fallbacks with ??.",
  sections: [
    {
      id: "part1",
      label: "?. and ?? Operators",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Optional Chaining (?.)",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "?? vs || Operator",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Falsy Overrides with ||",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Safe Property Access with ?. and ??",
    bigPicture: "Optional chaining (`?.`) prevents fatal crashes by safely returning `undefined` when reading nested nullish values. Nullish coalescing (`??`) provides fallbacks specifically for `null` and `undefined`.",
    breakdownTitle: "Modern Safe Operators",
    breakdownItems: [
      {
        title: "Optional Chaining (?.)",
        desc: "Short-circuits safely to undefined if the target object or property is null or undefined."
      },
      {
        title: "Nullish Coalescing (??)",
        desc: "Provides a default fallback only when a value is strictly null or undefined (not 0 or false)."
      },
      {
        title: "Safe Indexing & Calling",
        desc: "Works with arrays (`items?.[0]`) and function calls (`callback?.()`)."
      }
    ]
  },
  part2: {
    title: "How Optional Chaining (?.) Prevents Crashes",
    intro: "Two operators designed to handle missing and nullish data cleanly.",
    cards: [
      {
        number: "01",
        tag: "Chaining",
        title: "Optional Chaining (?.)",
        description: "Safely reads nested properties without crashing if an intermediate key is missing.",
        codeSnippet: "const user = { name: \"Maya\" };\n// address is missing, but doesn't crash:\nconsole.log(user.address?.city); // Output: undefined",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Fallback",
        title: "Nullish Coalescing (??)",
        description: "Returns the right-hand value only if the left-hand value is null or undefined.",
        codeSnippet: "const serverPort = undefined;\nconst port = serverPort ?? 3000;\nconsole.log(port); // Output: 3000",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Combined",
        title: "Combining ?. and ??",
        description: "Navigate safely and provide a fallback in a single readable line.",
        codeSnippet: "const user = {};\nconst country = user.location?.country ?? \"Unknown\";\nconsole.log(country); // Output: Unknown",
        color: "purple"
      }
    ],
    rule: {
      title: "The Nullish Rule",
      content: "Nullish means strictly null or undefined. Values like 0, false, and empty string \"\" are NOT nullish."
    }
  },
  part3: {
    title: "Why Nullish Coalescing (??) is Safer Than OR (||)",
    intro: "Understand the subtle bug caused by using || for default values.",
    points: [
      {
        title: "1. How || (OR) Treats Falsy Values",
        content: "The || operator replaces ANY falsy value: false, 0, \"\", null, undefined. This causes bugs when 0 or false are valid user inputs!",
        codeSnippet: "const userScore = 0; // Valid game score of zero\nconst score = userScore || 10; // BUG: 0 is falsy, so it replaces it with 10!\nconsole.log(score); // Output: 10 (Incorrect!)"
      },
      {
        title: "2. How ?? (Nullish Coalescing) Solves This",
        content: "?? only triggers on null and undefined. It respects 0, false, and empty strings.",
        codeSnippet: "const userScore = 0;\nconst score = userScore ?? 10;\nconsole.log(score); // Output: 0 (Preserved correctly!)"
      },
      {
        title: "3. Safe Function and Array Access",
        content: "Check if an optional callback or array exists before invoking or indexing.",
        codeSnippet: "const data = null;\nconsole.log(data?.[0]); // Output: undefined (No crash)"
      }
    ]
  },
  part4: {
    title: "Common Trap: Overriding 0 or Empty Strings with ||",
    bad: {
      title: "❌ Using || to Set Default Options",
      code: "function setVolume(vol) {\n  // Bug: If vol is 0 (mute), || replaces it with 50!\n  const activeVolume = vol || 50;\n  console.log(\"Volume:\", activeVolume);\n}\nsetVolume(0);\n// Output: Volume: 50 (User cannot mute audio!)",
      explanation: "Because 0 is falsy, || mistakenly triggers the default, preventing users from setting a volume of 0."
    },
    good: {
      title: "✅ Use ?? to Allow 0 and false",
      code: "function setVolume(vol) {\n  // Safe: Only replaces null or undefined!\n  const activeVolume = vol ?? 50;\n  console.log(\"Volume:\", activeVolume);\n}\nsetVolume(0);\n// Output: Volume: 0 (Correct!)",
      explanation: "?? only applies the default fallback when vol is null or undefined."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test optional chaining and nullish coalescing on incomplete user profiles.",
    starterCode: "const apiUser = {\n  id: 42,\n  name: \"Alex\",\n  preferences: {\n    theme: \"dark\",\n    unreads: 0 // Zero is valid unread count!\n  }\n};\n\n// 1. Safe access to missing nested contact data:\nconst phone = apiUser.contact?.phone ?? \"Not provided\";\nconsole.log(\"Phone number:\", phone);\n\n// 2. Testing ?? vs || on 0 unread messages:\nconsole.log(\"Unreads using ||:\", apiUser.preferences?.unreads || 5); // Buggy: replaces 0 with 5\nconsole.log(\"Unreads using ??:\", apiUser.preferences?.unreads ?? 5); // Correct: keeps 0\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "?. Stops Crashes",
        desc: "Use optional chaining obj?.prop to safely read nested data without TypeErrors."
      },
      {
        title: "?? for Safe Defaults",
        desc: "Use ?? to provide defaults only when values are strictly null or undefined."
      },
      {
        title: "Avoid || for Numbers & Booleans",
        desc: "Do not use || for defaults when 0 or false are legitimate values in your application."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the result of the expression: 0 ?? 10?",
      options: [
        "0, because ?? only falls back if the left value is null or undefined",
        "10, because 0 is falsy",
        "undefined, because numbers cannot be coalesced",
        "NaN, because numbers and default values conflict"
      ],
      correctIndex: 0,
      explanation: "The Nullish Coalescing operator (??) only checks for null and undefined. Because 0 is a defined number, it is preserved and returned."
    }
  }
};
