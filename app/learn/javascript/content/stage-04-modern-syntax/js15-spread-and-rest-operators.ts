import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js15SpreadAndRestOperatorsContent: StandardLessonContent = {
  slug: "js15-spread-and-rest-operators",
  code: "JS-15",
  title: "Using Spread and Rest",
  subtitle: "Use the three dots (...) to unpack collections with spread and collect variable arguments with rest parameters.",
  sections: [
    {
      id: "part1",
      label: "Spread & Rest Operators",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Spread in Action",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Rest Parameters",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Rest Parameter Order",
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
    title: "Using Spread and Rest",
    bigPicture: "The three dots (`...`) serve two distinct roles: Spread expands elements out of an array or object, while Rest gathers remaining arguments into a single array.",
    breakdownTitle: "Summary of Roles",
    breakdownItems: [
      {
        title: "Spread Operator (Expanding)",
        desc: "Unpacks items into new arrays or merges object properties immutably."
      },
      {
        title: "Rest Parameters (Collecting)",
        desc: "Captures multiple function arguments into a single real array."
      },
      {
        title: "Immutable Updates",
        desc: "Allows modifying properties cleanly: `{ ...user, role: 'admin' }` without mutating the original."
      }
    ]
  },
  part2: {
    title: "The Spread Operator (...) for Arrays and Objects",
    intro: "Use spread (...) to clone and combine arrays and objects without mutating originals.",
    cards: [
      {
        number: "01",
        tag: "Arrays",
        title: "Combining Arrays",
        description: "Unpack items from multiple arrays into a new combined array.",
        codeSnippet: "const frontend = [\"React\", \"Vue\"];\nconst backend = [\"Node.js\", \"PostgreSQL\"];\nconst fullStack = [...frontend, ...backend];\nconsole.log(fullStack); // Output: ['React', 'Vue', 'Node.js', 'PostgreSQL']",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Objects",
        title: "Merging & Updating Objects",
        description: "Copy properties into a new object and override specific fields.",
        codeSnippet: "const user = { name: \"Maya\", role: \"guest\" };\nconst admin = { ...user, role: \"admin\", verified: true };\nconsole.log(admin); // Output: { name: 'Maya', role: 'admin', verified: true }",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Arguments",
        title: "Passing Array Items to Functions",
        description: "Spread array values directly into functions expecting multiple separate arguments.",
        codeSnippet: "const scores = [85, 92, 78, 99];\nconst highest = Math.max(...scores);\nconsole.log(highest); // Output: 99",
        color: "purple"
      }
    ],
    rule: {
      title: "The Overwrite Rule",
      content: "When spreading objects, keys defined later override keys defined earlier: { ...defaultSettings, theme: 'dark' }."
    }
  },
  part3: {
    title: "Rest Parameters in Functions",
    intro: "Use rest (...) to create flexible functions that accept any number of arguments.",
    points: [
      {
        title: "1. Gathering Variable Arguments",
        content: "Rest parameters collect all incoming arguments into a real JavaScript array.",
        codeSnippet: "function sumAll(...numbers) {\n  return numbers.reduce((total, n) => total + n, 0);\n}\nconsole.log(sumAll(5, 10, 15, 20)); // Output: 50"
      },
      {
        title: "2. Combining Named Parameters with Rest",
        content: "You can accept specific named parameters first, and collect the rest at the end.",
        codeSnippet: "function sendEmail(subject, ...recipients) {\n  console.log(`Subject: ${subject} | Sending to ${recipients.length} users`);\n}\nsendEmail(\"Welcome!\", \"alex@dev.io\", \"sam@dev.io\"); // Output: Subject: Welcome! | Sending to 2 users"
      },
      {
        title: "3. Rest in Destructuring",
        content: "Collect remaining object properties or array elements when destructuring.",
        codeSnippet: "const [first, ...remaining] = [\"Gold\", \"Silver\", \"Bronze\", \"Iron\"];\nconsole.log(first);     // Output: Gold\nconsole.log(remaining); // Output: ['Silver', 'Bronze', 'Iron']"
      }
    ]
  },
  part4: {
    title: "Common Trap: Putting Rest Before Other Parameters",
    bad: {
      title: "❌ Rest Parameter Must Be the Last Parameter",
      code: "function createLog(...tags, message) {\n  // SyntaxError: Rest parameter must be last formal parameter\n  console.log(message);\n}",
      explanation: "JavaScript has no way to know when variable arguments end unless the rest parameter is at the very end of the parameter list."
    },
    good: {
      title: "✅ Place Rest as the Final Parameter",
      code: "function createLog(message, ...tags) {\n  console.log(`Message: ${message} | Tags: ${tags.join(', ')}`);\n}\ncreateLog(\"Server started\", \"v1.0\", \"production\");\n// Output: Message: Server started | Tags: v1.0, production",
      explanation: "Always place rest parameters at the very end of your parameter list."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Merge configuration objects using spread and write a versatile calculator with rest parameters.",
    starterCode: "// 1. Merge default and user settings with spread:\nconst defaultSettings = { theme: \"light\", notifications: true, volume: 80 };\nconst userPreferences = { theme: \"dark\", volume: 100 };\n\nconst activeConfig = { ...defaultSettings, ...userPreferences };\nconsole.log(\"Active configuration:\", activeConfig);\n\n// 2. Flexible averaging function using rest parameters:\nfunction average(...scores) {\n  const sum = scores.reduce((acc, curr) => acc + curr, 0);\n  return sum / scores.length;\n}\n\nconsole.log(\"Calculated average:\", average(90, 85, 95, 100));\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Spread Expands",
        desc: "Use ... to unpack arrays into elements or copy object properties."
      },
      {
        title: "Rest Collects",
        desc: "Use ...args inside function definitions to gather arguments into an array."
      },
      {
        title: "Rest Must Be Last",
        desc: "Rest parameters must always be the final parameter in a function definition."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In the code: function record(event, ...details) {}, what does '...details' represent?",
      options: [
        "A rest parameter that collects all arguments passed after 'event' into an array",
        "A spread operator that unpacks details into separate global variables",
        "A syntax error because three dots are not allowed in parameters",
        "A default parameter that sets details to null"
      ],
      correctIndex: 0,
      explanation: "When ... appears in a function's parameter declaration, it is a Rest Parameter. It gathers all remaining arguments into a single JavaScript array."
    }
  }
};
