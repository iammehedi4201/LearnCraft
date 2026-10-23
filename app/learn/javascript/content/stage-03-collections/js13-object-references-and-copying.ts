import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js13ObjectReferencesAndCopyingContent: StandardLessonContent = {
  slug: "js13-object-references-and-copying",
  code: "JS-13",
  title: "Object References and Copying",
  subtitle: "Understand how objects live in memory, why copying variables creates shared references, and how to safely clone objects with spread and structuredClone.",
  sections: [
    {
      id: "part1",
      label: "References & Copying",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Value vs Reference",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Shallow vs Deep Copy",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Accidental Mutation",
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
    title: "Object References and Copying",
    bigPicture: "Primitives (numbers, strings) copy by value (independent duplicates). Objects and arrays copy by reference (pointing to the same memory). Use `{ ...obj }` or `structuredClone()` to make safe clones.",
    breakdownTitle: "Memory Behavior Rules",
    breakdownItems: [
      {
        title: "Primitives: Copy by Value",
        desc: "Each variable holds its own independent value. Reassigning one never affects another."
      },
      {
        title: "Objects: Copy by Reference",
        desc: "Variables hold a pointer to the memory location. Mutating through one variable affects all references."
      },
      {
        title: "Safe Copying",
        desc: "Use spread `{ ...obj }` for shallow copies, or `structuredClone(obj)` for deeply nested objects."
      }
    ]
  },
  part2: {
    title: "Value vs Reference in JavaScript",
    intro: "Step through how shared references create unexpected side effects.",
    cards: [
      {
        number: "01",
        tag: "By Value",
        title: "Primitives Stay Independent",
        description: "Modifying a copied primitive never changes the original variable.",
        codeSnippet: "let scoreA = 100;\nlet scoreB = scoreA;\nscoreB = 200;\nconsole.log(scoreA); // Output: 100 (Unchanged!)",
        color: "emerald"
      },
      {
        number: "02",
        tag: "By Reference",
        title: "Objects Share One Memory Space",
        description: "Assigning an object to a new variable creates a shared reference, not a duplicate.",
        codeSnippet: "const teamA = { title: \"Engineering\" };\nconst teamB = teamA; // Shared reference!\nteamB.title = \"Product\";\nconsole.log(teamA.title); // Output: Product (Mutated!)",
        color: "rose"
      },
      {
        number: "03",
        tag: "Shallow Clone",
        title: "Shallow Copy with Spread ({...})",
        description: "Creates a brand new top-level object containing copies of the original properties.",
        codeSnippet: "const original = { theme: \"dark\", version: 1 };\nconst copy = { ...original }; // Fresh object!\ncopy.theme = \"light\";\nconsole.log(original.theme); // Output: dark (Safe!)",
        color: "cyan"
      }
    ],
    rule: {
      title: "Equality Comparison with Objects",
      content: "obj1 === obj2 is only true if both variables point to the EXACT same memory reference. Two distinct objects with identical properties are never strictly equal."
    }
  },
  part3: {
    title: "Shallow Copying vs Deep Copying",
    intro: "Understand when shallow cloning is enough and when deep cloning is required.",
    points: [
      {
        title: "1. Shallow Copying with Spread ({...})",
        content: "The spread operator copies top-level properties. It works perfectly for flat objects with no nested objects or arrays.",
        codeSnippet: "const config = { api: \"https://api.dev\", timeout: 5000 };\nconst configCopy = { ...config };\nconfigCopy.timeout = 1000;\nconsole.log(config.timeout); // Output: 5000 (Original is untouched)"
      },
      {
        title: "2. The Nested Reference Problem",
        content: "If an object contains nested child objects or arrays, spread only copies the references to those children!",
        codeSnippet: "const user = { name: \"Sam\", settings: { dark: true } };\nconst clone = { ...user };\nclone.settings.dark = false; // Mutates nested object in BOTH!\nconsole.log(user.settings.dark); // Output: false"
      },
      {
        title: "3. Deep Copying with structuredClone()",
        content: "Use the modern built-in structuredClone() function to clone deeply nested objects and arrays 100% safely.",
        codeSnippet: "const user = { name: \"Sam\", settings: { dark: true } };\nconst safeClone = structuredClone(user); // True deep clone\nsafeClone.settings.dark = false;\nconsole.log(user.settings.dark); // Output: true (Original is protected!)"
      }
    ]
  },
  part4: {
    title: "Common Trap: Accidental Object Mutation",
    bad: {
      title: "❌ Passing Objects to Functions Mutates Original",
      code: "const cart = { items: 2, total: 50 };\nfunction applyDiscount(c) {\n  c.total = c.total - 10; // Mutates original cart directly!\n  return c;\n}\napplyDiscount(cart);\nconsole.log(cart.total); // Output: 40 (Original modified unintentionally)",
      explanation: "Functions that modify incoming object arguments directly alter the caller's data because objects are passed by reference."
    },
    good: {
      title: "✅ Clone Before Modifying (Immutability)",
      code: "const cart = { items: 2, total: 50 };\nfunction applyDiscount(c) {\n  return { ...c, total: c.total - 10 }; // Return fresh object\n}\nconst updatedCart = applyDiscount(cart);\nconsole.log(cart.total);        // Output: 50 (Original intact!)\nconsole.log(updatedCart.total); // Output: 40",
      explanation: "Cloning with spread produces an updated new object while leaving the original data completely safe and unchanged."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test the difference between direct assignment, shallow spread copying, and structuredClone in action.",
    starterCode: "const originalUser = {\n  username: \"alex_dev\",\n  profile: { role: \"Junior Developer\", verified: true }\n};\n\n// 1. Direct assignment shares reference:\nconst refUser = originalUser;\n\n// 2. Deep clone creates a 100% independent copy:\nconst deepUser = structuredClone(originalUser);\ndeepUser.profile.role = \"Lead Architect\";\n\nconsole.log(\"Original role:\", originalUser.profile.role);\nconsole.log(\"Deep copy role:\", deepUser.profile.role);\nconsole.log(\"Are they the same object?\", originalUser === deepUser);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Objects Copy by Reference",
        desc: "Direct assignment const b = a shares the same object in memory."
      },
      {
        title: "Use Spread for Flat Objects",
        desc: "Use const copy = { ...original } to duplicate objects with single-level properties."
      },
      {
        title: "Use structuredClone for Nested Objects",
        desc: "Use structuredClone(obj) when objects contain inner objects or arrays."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when you run: const b = a; b.score = 99; where 'a' is an object { score: 50 }?",
      options: [
        "Both a.score and b.score become 99 because objects are copied by reference",
        "Only b.score changes to 99; a.score remains 50",
        "JavaScript throws a TypeError because objects cannot be reassigned",
        "A new object is automatically cloned behind the scenes"
      ],
      correctIndex: 0,
      explanation: "Objects in JavaScript are stored and assigned by reference. Both 'a' and 'b' point to the exact same object in memory, so modifying b.score also changes a.score."
    }
  }
};
