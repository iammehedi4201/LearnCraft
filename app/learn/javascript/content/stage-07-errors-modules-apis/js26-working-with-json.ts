import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js26WorkingWithJsonContent: StandardLessonContent = {
  "slug": "js26-working-with-json",
  "code": "JS-26",
  "title": "Working with JSON: Serialization & Parsing",
  "subtitle": "Convert JavaScript data to and from JSON, format output, and handle malformed strings safely.",
  "sections": [
    {
      "id": "part1",
      "label": "Data Interchange",
      "icon": "📄",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "parse & stringify",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Safe Parsing & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Malformed JSON Crash",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "JSON Sandbox",
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
    "title": "The Universal Data Format",
    "bigPicture": "JSON (JavaScript Object Notation) is the universal text format for sending data across the web. While it looks like a JavaScript object, JSON is strictly a text string governed by precise formatting rules.",
    "analogy": "Think of an object like a piece of furniture in your room. JSON is the flat-packed IKEA box version you ship across the world in the mail. When it arrives, you unpack it (`JSON.parse`) back into furniture.",
    "diagram": "JavaScript Object                JSON Text String\n{ id: 1, name: \"Alex\" }  <===>   '{\"id\":1,\"name\":\"Alex\"}'\n           |                                |\n    JSON.stringify()                   JSON.parse()",
    "breakdownTitle": "JSON Strict Rules",
    "breakdownItems": [
      {
        "title": "Double Quotes Only",
        "desc": "All keys and strings must use double quotes `\"key\"`. Single quotes are invalid."
      },
      {
        "title": "No Trailing Commas",
        "desc": "Trailing commas after the last item cause fatal parse errors."
      },
      {
        "title": "No Functions or undefined",
        "desc": "JSON only stores strings, numbers, booleans, null, arrays, and plain objects."
      }
    ]
  },
  "part2": {
    "title": "JSON Methods in Action",
    "intro": "Convert objects to JSON strings and parse JSON back into JavaScript objects.",
    "cards": [
      {
        "number": "01",
        "tag": "Serialize",
        "title": "JSON.stringify()",
        "description": "Converts a JavaScript object or array into a valid JSON string.",
        "codeSnippet": "const user = { name: \"Alex\", active: true };\nconst jsonStr = JSON.stringify(user);\nconsole.log(jsonStr); // Output: {\"name\":\"Alex\",\"active\":true}",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Parse",
        "title": "JSON.parse()",
        "description": "Parses a valid JSON string into a live JavaScript object.",
        "codeSnippet": "const raw = '{\"id\": 101, \"role\": \"admin\"}';\nconst data = JSON.parse(raw);\nconsole.log(data.role); // Output: admin",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Prettify",
        "title": "Formatted Indentation",
        "description": "Pass `null, 2` to pretty-print formatted JSON strings for logs.",
        "codeSnippet": "const config = { port: 3000 };\nconsole.log(JSON.stringify(config, null, 2));\n// Formatted with 2 spaces",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Always Wrap JSON.parse()",
      "content": "Always wrap `JSON.parse()` in a `try...catch` block. Malformed JSON throws a fatal SyntaxError."
    }
  },
  "part3": {
    "title": "Safe Parsing & Reading AI Code",
    "intro": "Build safe JSON parsing helpers and understand what JSON strips away.",
    "points": [
      {
        "title": "1. Safe JSON Parser Helper",
        "content": "Create a safe parsing utility function that catches invalid JSON and returns a fallback value without crashing.",
        "codeSnippet": "function safeParse(str, fallback = {}) {\n  try {\n    return JSON.parse(str);\n  } catch {\n    console.log(\"Invalid JSON, using fallback\");\n    return fallback;\n  }\n}\n\nconsole.log(safeParse(\"{ broken json\", { valid: false }));\n// Output: Invalid JSON, using fallback -> { valid: false }"
      },
      {
        "title": "2. Unsupported Data Types in JSON",
        "content": "`JSON.stringify()` silently ignores functions, `undefined`, and Symbols. Dates are converted into strings.",
        "codeSnippet": "const original = {\n  title: \"Lesson\",\n  secret: undefined, // Stripped!\n  calculate() { return 1; }, // Stripped!\n};\n\nconst result = JSON.stringify(original);\nconsole.log(result); // Output: {\"title\":\"Lesson\"}"
      },
      {
        "title": "3. Circular References Break JSON",
        "content": "If an object references itself, `JSON.stringify()` throws a `TypeError: Converting circular structure to JSON`.",
        "codeSnippet": "const nodeA = { name: \"A\" };\nconst nodeB = { name: \"B\", link: nodeA };\n// nodeA.link = nodeB; // Circular!\n// JSON.stringify(nodeA); // Would throw TypeError!\nconsole.log(\"Avoid circular links before stringifying\");"
      }
    ]
  },
  "part4": {
    "title": "Uncaught JSON.parse SyntaxError",
    "bad": {
      "title": "❌ Unprotected JSON.parse Crashes App",
      "code": "const userInput = \"Not valid JSON\";\n// Bug: Calling parse without try/catch!\nconst data = JSON.parse(userInput);\n// Fatal Crash: SyntaxError: Unexpected token 'N', \"Not valid JSON\" is not valid JSON",
      "explanation": "`JSON.parse()` throws an uncaught `SyntaxError` on malformed text, crashing the whole process."
    },
    "good": {
      "title": "✅ Protected try/catch Parsing",
      "code": "const userInput = \"Not valid JSON\";\nlet data = null;\n\ntry {\n  data = JSON.parse(userInput);\n} catch (err) {\n  console.log(\"Gracefully handled malformed JSON\");\n  data = { fallback: true };\n}\n\nconsole.log(data); // Output: { fallback: true }",
      "explanation": "Always wrap `JSON.parse` in `try...catch` to handle corrupt or unexpected strings cleanly."
    }
  },
  "part5": {
    "title": "Interactive JSON Sandbox",
    "intro": "Experiment with stringifying, parsing, and pretty-printing JSON data in the editor.",
    "starterCode": "// 1. Create a JavaScript object:\nconst appState = {\n  user: \"Alex\",\n  theme: \"dark\",\n  tags: [\"javascript\", \"web\"],\n};\n\n// 2. Stringify with 2-space indentation:\nconst jsonOutput = JSON.stringify(appState, null, 2);\nconsole.log(\"Formatted JSON:\\n\" + jsonOutput);\n\n// 3. Parse it back:\nconst parsedBack = JSON.parse(jsonOutput);\nconsole.log(\"Parsed back user:\", parsedBack.user);\n"
  },
  "part6": {
    "title": "Key Takeaways: JSON",
    "takeaways": [
      {
        "title": "Text Format",
        "desc": "JSON is pure text; keys and strings must always use double quotes."
      },
      {
        "title": "Catch SyntaxErrors",
        "desc": "Always wrap JSON.parse in try/catch to handle invalid input safely."
      },
      {
        "title": "No Functions",
        "desc": "JSON cannot store functions or undefined values."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Which of the following is valid JSON?",
      "options": [
        "{ 'name': 'Alex' }",
        "{ name: \"Alex\" }",
        "{\"name\": \"Alex\"}",
        "{\"name\": \"Alex\",}"
      ],
      "correctIndex": 2,
      "explanation": "In valid JSON, keys and strings must use double quotes `\"name\": \"Alex\"`, and trailing commas are strictly forbidden."
    }
  }
};
