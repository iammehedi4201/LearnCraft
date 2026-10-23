import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js26WorkingWithJsonContent: StandardLessonContent = {
  slug: "js26-working-with-json",
  code: "JS-26",
  title: "Working with JSON",
  subtitle: "Convert JavaScript objects to JSON text (stringify) and parse JSON text back to objects (parse).",
  sections: [
    {
      id: "part1",
      label: "Working with JSON",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "stringify & parse",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "JSON Data Rules",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "JSON Parse Crashes",
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
    title: "Working with JSON",
    bigPicture: "JSON is the universal text format for sending and receiving data over the internet. Use `JSON.stringify()` to turn objects into text, and `JSON.parse()` to turn text back into objects.",
    breakdownTitle: "The Two Core JSON Methods",
    breakdownItems: [
      {
        title: "JSON.stringify(object)",
        desc: "Serializes in-memory JavaScript objects into a text string ready for network transfer."
      },
      {
        title: "JSON.parse(string)",
        desc: "Deserializes incoming JSON text back into a live JavaScript object."
      },
      {
        title: "Language-Agnostic Format",
        desc: "JSON is standard text understood by every backend language, API, and database."
      }
    ]
  },
  part2: {
    title: "JSON.stringify and JSON.parse in Code",
    intro: "Two built-in methods handle all JSON data conversions.",
    cards: [
      {
        number: "01",
        tag: "To String",
        title: "JSON.stringify()",
        description: "Serializes an object into a JSON string.",
        codeSnippet: "const user = { name: \"Alex\", age: 28 };\nconst jsonText = JSON.stringify(user);\nconsole.log(jsonText);\n// Output: '{\"name\":\"Alex\",\"age\":28}'",
        color: "emerald"
      },
      {
        number: "02",
        tag: "To Object",
        title: "JSON.parse()",
        description: "Deserializes JSON text back into a live object.",
        codeSnippet: "const rawText = '{\"id\":101,\"status\":\"active\"}';\nconst parsed = JSON.parse(rawText);\nconsole.log(parsed.id); // Output: 101",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Formatting",
        title: "Pretty-Printing JSON",
        description: "Add indentation to JSON.stringify for clean, readable debugging output.",
        codeSnippet: "const data = { theme: \"dark\", version: 2 };\nconsole.log(JSON.stringify(data, null, 2));",
        color: "purple"
      }
    ],
    rule: {
      title: "Double Quotes Rule",
      content: "In valid JSON text, all property keys and strings MUST be wrapped in double quotes (\"). Single quotes ('') are illegal in JSON."
    }
  },
  part3: {
    title: "JSON Data Rules and Limitations",
    intro: "Understand what JSON does and does NOT support.",
    points: [
      {
        title: "1. No Functions or undefined",
        content: "JSON only supports strings, numbers, booleans, null, arrays, and objects. Functions and undefined are automatically omitted by JSON.stringify.",
        codeSnippet: "const user = { name: \"Maya\", secret: undefined, greet() {} };\nconsole.log(JSON.stringify(user)); // Output: {\"name\":\"Maya\"}"
      },
      {
        title: "2. No Trailing Commas",
        content: "Unlike modern JavaScript, JSON strictly forbids trailing commas after the last item.",
        codeSnippet: "// Legal JS: { a: 1, b: 2, }\n// ILLEGAL JSON: {\"a\": 1, \"b\": 2,} (Throws SyntaxError!)"
      },
      {
        title: "3. Storing in LocalStorage",
        content: "Browsers only store plain strings in localStorage, making JSON.stringify and JSON.parse essential for saving user objects.",
        codeSnippet: "localStorage.setItem(\"user\", JSON.stringify(user));\nconst saved = JSON.parse(localStorage.getItem(\"user\"));"
      }
    ]
  },
  part4: {
    title: "Common Trap: Parsing Malformed JSON Without try/catch",
    bad: {
      title: "❌ Calling JSON.parse() on Unverified Strings",
      code: "const badInput = \"{ name: Maya }\"; // Missing quotes around key and value!\n// BUG: Throws an unhandled SyntaxError and crashes the program!\nconst data = JSON.parse(badInput);\n// SyntaxError: Unexpected token n in JSON at position 2",
      explanation: "If a network response or storage string contains corrupted JSON, JSON.parse crashes immediately."
    },
    good: {
      title: "✅ Wrap JSON.parse() Inside try / catch",
      code: "function safeParse(str, fallback = {}) {\n  try {\n    return JSON.parse(str);\n  } catch (err) {\n    console.warn(\"Invalid JSON received:\", err.message);\n    return fallback; // Safe fallback prevents crash\n  }\n}\nconst data = safeParse(\"{ badJson }\", { defaultData: true });\nconsole.log(data); // Output: { defaultData: true }",
      explanation: "Always protect JSON.parse calls with try/catch to ensure your app stays resilient."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Convert user records to JSON text and parse them back safely.",
    starterCode: "const studentRecord = {\n  id: 42,\n  name: \"Maya Patel\",\n  courses: [\"JavaScript\", \"TypeScript\"],\n  isEnrolled: true\n};\n\n// 1. Serialize object to formatted JSON text:\nconst jsonString = JSON.stringify(studentRecord, null, 2);\nconsole.log(\"--- Formatted JSON String ---\");\nconsole.log(jsonString);\n\n// 2. Parse JSON text back into a real JavaScript object:\nconst parsedRecord = JSON.parse(jsonString);\nconsole.log(\"Parsed name:\", parsedRecord.name);\nconsole.log(\"First course:\", parsedRecord.courses[0]);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "JSON is Plain Text",
        desc: "A universal text-based format for transferring and saving object data."
      },
      {
        title: "stringify Converts to Text",
        desc: "Use JSON.stringify(obj) to convert a JavaScript object into a JSON string."
      },
      {
        title: "parse Converts to Object",
        desc: "Use JSON.parse(str) inside try/catch to turn JSON text into a real object."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which method is used to convert a JavaScript object into a JSON text string?",
      options: [
        "JSON.stringify()",
        "JSON.parse()",
        "object.toJSON()",
        "JSON.convert()"
      ],
      correctIndex: 0,
      explanation: "JSON.stringify() serializes a JavaScript object or array into a plain JSON text string. JSON.parse() performs the reverse operation."
    }
  }
};
