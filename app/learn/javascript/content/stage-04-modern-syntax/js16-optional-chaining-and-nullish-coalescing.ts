import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js16OptionalChainingAndNullishCoalescingContent: StandardLessonContent = {
  "slug": "js16-optional-chaining-and-nullish-coalescing",
  "code": "JS-16",
  "title": "Optional Chaining & Nullish Coalescing: Safe Navigation",
  "subtitle": "Safely read deeply nested properties with ?. and handle default fallbacks cleanly with ?? without bugs.",
  "sections": [
    {
      "id": "part1",
      "label": "Defensive Coding",
      "icon": "🛡️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "?. and ?? Operators",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Preserving 0 & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Falsy Default Value Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Navigation Sandbox",
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
    "title": "Preventing TypeError Crashes",
    "bigPicture": "Real-world data from APIs is often incomplete or null. Optional chaining (`?.`) stops navigation when encountering nullish values, and nullish coalescing (`??`) provides fallbacks only when data is genuinely missing.",
    "analogy": "Optional chaining is like a cautious courier: if a building does not exist, they stop and return notice rather than knocking on empty air.",
    "diagram": "user?.address?.city\n   |\n   +--> If user is undefined?        --> Returns undefined immediately\n   +--> If user.address is null?      --> Returns undefined immediately\n   +--> If user.address.city exists?  --> Returns the city string!",
    "breakdownTitle": "Modern Safe Operators",
    "breakdownItems": [
      {
        "title": "Optional Chaining (?.)",
        "desc": "Safely accesses nested properties and methods without throwing TypeError."
      },
      {
        "title": "Nullish Coalescing (??)",
        "desc": "Returns the fallback only if the left operand is null or undefined."
      },
      {
        "title": "Preserving 0 & Empty Strings",
        "desc": "`??` correctly keeps `0`, `false`, and `\"\"` as valid data, unlike `||`."
      }
    ]
  },
  "part2": {
    "title": "Safe Navigation Operators",
    "intro": "Compare optional chaining and nullish coalescing against legacy workarounds.",
    "cards": [
      {
        "number": "01",
        "tag": "Safe Read",
        "title": "Optional Chaining (?.)",
        "description": "Safely navigates nested properties, returning undefined if missing.",
        "codeSnippet": "const response = {};\nconsole.log(response.user?.profile?.avatar);\n// Output: undefined (no TypeError crash!)",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Safe Fallback",
        "title": "Nullish Coalescing (??)",
        "description": "Provides a fallback value only for null or undefined.",
        "codeSnippet": "const timeout = null;\nconst safeTimeout = timeout ?? 3000;\nconsole.log(safeTimeout); // Output: 3000",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Call",
        "title": "Optional Call (?.())",
        "description": "Calls a function only if it actually exists as a function.",
        "codeSnippet": "const handler = null;\nhandler?.(); // Safely does nothing without error!",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Use ?? Over || for Defaults",
      "content": "Always use `??` instead of `||` when providing default values for numbers, strings, and booleans."
    }
  },
  "part3": {
    "title": "Preserving Valid Falsy Data & Reading AI Code",
    "intro": "Avoid common bugs where 0 or false are accidentally replaced by default values.",
    "points": [
      {
        "title": "1. The Falsy 0 Fallback Bug",
        "content": "The `||` operator treats `0` as falsy and accidentally replaces it with the fallback. `??` safely preserves `0`.",
        "codeSnippet": "const userScore = 0; // Legitimate score of zero\n\n// ❌ Bug with ||:\nconsole.log(userScore || 10); // Output: 10 (0 was erased!)\n\n// ✅ Safe with ??:\nconsole.log(userScore ?? 10); // Output: 0 (correct!)"
      },
      {
        "title": "2. Safe Optional Array Indexing",
        "content": "Use `?.[index]` when accessing an element in an array that might be null or undefined.",
        "codeSnippet": "const apiResult = { items: null };\nconsole.log(apiResult.items?.[0]); // Output: undefined (no crash!)"
      },
      {
        "title": "3. Combining ?. and ?? for Bulletproof Reads",
        "content": "Chain `?.` to safely read nested properties and `??` to supply a sensible fallback in one line.",
        "codeSnippet": "const order = { customer: { name: \"Alex\" } };\nconst city = order.customer?.address?.city ?? \"Local Pickup\";\nconsole.log(\"Delivery City:\", city); // Output: Delivery City: Local Pickup"
      }
    ]
  },
  "part4": {
    "title": "The Boolean Default Trap with ||",
    "bad": {
      "title": "❌ Using || Replaces Valid false Values",
      "code": "const settings = { showNotifications: false };\n// Bug: false is falsy, so || overrides it!\nconst show = settings.showNotifications || true;\nconsole.log(\"Show notifications:\", show); // Output: true (overridden!)",
      "explanation": "Because `false` is a falsy value, `||` ignores it and picks `true`, breaking user settings."
    },
    "good": {
      "title": "✅ ?? Preserves Boolean false",
      "code": "const settings = { showNotifications: false };\n// Safe: ?? only triggers on null or undefined\nconst show = settings.showNotifications ?? true;\nconsole.log(\"Show notifications:\", show); // Output: false (preserved!)",
      "explanation": "`??` only falls back when values are `null` or `undefined`, keeping valid `false` values intact."
    }
  },
  "part5": {
    "title": "Interactive Safe Navigation Sandbox",
    "intro": "Practice using `?.` and `??` in the live editor.",
    "starterCode": "const serverResponse = {\n  status: 200,\n  config: {\n    retries: 0, // Valid 0 value\n  },\n};\n\n// 1. Safely read nested port with fallback:\nconst port = serverResponse.config?.port ?? 8080;\nconsole.log(\"Port:\", port);\n\n// 2. Safely read retries (must preserve 0):\nconst retries = serverResponse.config?.retries ?? 3;\nconsole.log(\"Retries allowed:\", retries);\n"
  },
  "part6": {
    "title": "Key Takeaways: Safe Navigation",
    "takeaways": [
      {
        "title": "?. Prevents Crashes",
        "desc": "Optional chaining stops navigation and returns undefined if any segment is nullish."
      },
      {
        "title": "?? Preserves Valid Falsy",
        "desc": "Nullish coalescing preserves 0, false, and empty strings."
      },
      {
        "title": "Combine Together",
        "desc": "Use obj?.prop ?? 'fallback' for clean, bulletproof data access."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What will `console.log(0 ?? 10)` print to the console?",
      "options": [
        "10",
        "0",
        "undefined",
        "NaN"
      ],
      "correctIndex": 1,
      "explanation": "`??` only falls back when the left operand is `null` or `undefined`. Because `0` is a defined number, it evaluates to `0`."
    }
  }
};
