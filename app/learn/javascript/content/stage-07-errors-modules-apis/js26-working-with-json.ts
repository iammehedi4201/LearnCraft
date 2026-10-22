import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js26WorkingWithJsonContent: StandardLessonContent = {
  slug: "js26-working-with-json",
  code: "JS-26",
  title: "Working with JSON",
  subtitle: "Serialize JavaScript objects into JSON text with JSON.stringify(), safely parse incoming data with JSON.parse(), and handle non-serializable edge cases.",
  sections: [
    {
      id: "part1",
      label: "JSON Format",
      icon: "📜",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "stringify & parse",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Serialization Rules",
      icon: "⚠️",
      tag: "LIMITATIONS"
    },
    {
      id: "part4",
      label: "Malformed JSON Crash",
      icon: "💥",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "JSON Sandbox",
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
    title: "JSON: The Universal Web Data Format",
    bigPicture: "JSON (JavaScript Object Notation) is a lightweight, text-based data interchange format. Because network cables and APIs can only transmit raw text bytes, data objects must be serialized into JSON strings before sending, and parsed back into objects upon receipt.",
    analogy: "Like flat-packing furniture for shipping: you disassemble the physical furniture into a flat cardboard box (JSON.stringify) for transport, and the customer reassembles it into 3D furniture at home (JSON.parse).",
    diagram: "+-----------------------------+       +-----------------------------+\n| JavaScript Object in Memory | ----> | JSON String over Network    |\n| { id: 1, name: \"Sarah\" }    |       | '{\"id\":1,\"name\":\"Sarah\"}'   |\n+-----------------------------+       +-----------------------------+\n               ^                                     |\n               |          JSON.parse()               |\n               +-------------------------------------+",
    breakdownTitle: "JSON Format Rules",
    breakdownItems: [
      {
        title: "Strict Double Quotes",
        desc: "All keys and strings in valid JSON MUST be wrapped in double quotes (\"key\"). Single quotes (') are illegal in JSON syntax."
      },
      {
        title: "Allowed Data Types",
        desc: "JSON only supports strings, numbers, booleans, null, arrays, and objects."
      },
      {
        title: "No Functions or Undefined",
        desc: "Functions, methods, undefined, symbols, and circular references cannot be represented in JSON format."
      }
    ]
  },
  part2: {
    title: "JSON.stringify() and JSON.parse()",
    intro: "Two core methods manage serialization and deserialization in JavaScript.",
    cards: [
      {
        number: "01",
        tag: "Serialize",
        title: "JSON.stringify()",
        description: "Converts a JavaScript object or array into a valid JSON string.",
        codeSnippet: "const user = { name: \"Maya\", role: \"admin\" };\nconst jsonString = JSON.stringify(user);\nconsole.log(jsonString); // Output: '{\"name\":\"Maya\",\"role\":\"admin\"}'",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Deserialize",
        title: "JSON.parse()",
        description: "Parses a JSON string back into a live JavaScript object.",
        codeSnippet: "const raw = '{\"id\":42,\"active\":true}';\nconst parsed = JSON.parse(raw);\nconsole.log(parsed.id, parsed.active); // Output: 42 true",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Format",
        title: "Pretty Printing JSON",
        description: "Supply formatting indentation parameters for human-readable output.",
        codeSnippet: "const data = { status: \"ok\", count: 1 };\n// 3rd parameter sets indentation spaces:\nconsole.log(JSON.stringify(data, null, 2));",
        color: "purple"
      }
    ],
    rule: {
      title: "Parsing Rule",
      content: "JSON.parse() throws a fatal SyntaxError if the input string is not valid JSON. Always wrap JSON.parse() in a try/catch block."
    }
  },
  part3: {
    title: "What Happens to Unsupported Values in JSON?",
    intro: "Understand how JSON.stringify handles non-serializable JavaScript types.",
    points: [
      {
        title: "1. undefined and Functions are Dropped",
        content: "When serializing an object, properties with undefined values or functions are silently omitted from the result.",
        codeSnippet: "const data = {\n  title: \"Book\",\n  discount: undefined, // Dropped!\n  calculate() {}       // Dropped!\n};\nconsole.log(JSON.stringify(data)); // Output: '{\"title\":\"Book\"}'"
      },
      {
        title: "2. Dates Become Strings",
        content: "Date objects are converted to ISO 8601 strings. When parsed back, they remain strings, not Date objects!",
        codeSnippet: "const event = { time: new Date() };\nconst json = JSON.stringify(event);\nconst parsed = JSON.parse(json);\nconsole.log(typeof parsed.time); // Output: string (Must manually new Date(parsed.time))"
      },
      {
        title: "3. Circular References Crash Stringify",
        content: "If an object contains a reference back to itself, JSON.stringify throws a fatal TypeError.",
        codeSnippet: "const circular = {};\ncircular.self = circular;\n// JSON.stringify(circular); // TypeError: Converting circular structure to JSON"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Unhandled JSON.parse() Crash",
    bad: {
      title: "❌ Raw JSON.parse() on User or API Input",
      code: "function readSavedConfig(rawInput) {\n  // Bug: If rawInput is empty or malformed, entire script crashes!\n  const config = JSON.parse(rawInput);\n  return config.theme;\n}\n// readSavedConfig(\"invalid string\"); // Uncaught SyntaxError: Unexpected token",
      explanation: "Uncaught JSON.parse errors terminate application execution when reading corrupted localStorage data or malformed API responses."
    },
    good: {
      title: "✅ Wrap JSON.parse() in try / catch",
      code: "function readSavedConfig(rawInput) {\n  try {\n    return JSON.parse(rawInput);\n  } catch (err) {\n    console.warn(\"Corrupted config, falling back to default:\", err.message);\n    return { theme: \"light\" }; // Safe fallback\n  }\n}\nconsole.log(readSavedConfig(\"bad json\")); // Output: { theme: 'light' }",
      explanation: "Wrapping JSON.parse in try/catch guarantees the application can recover with safe fallback defaults."
    }
  },
  part5: {
    title: "JSON Sandbox",
    intro: "Practice serializing objects, pretty printing, and safely parsing JSON with try/catch.",
    starterCode: "const sessionData = {\n  user: \"developer_99\",\n  cart: [\"Monitor\", \"HDMI Cable\"],\n  loginDate: new Date()\n};\n\n// 1. Serialize to JSON with 2-space indentation:\nconst formattedJson = JSON.stringify(sessionData, null, 2);\nconsole.log(\"Pretty JSON:\\n\", formattedJson);\n\n// 2. Safely parse JSON:\nfunction safeParse(str) {\n  try {\n    return JSON.parse(str);\n  } catch (err) {\n    return null;\n  }\n}\n\nconsole.log(\"Safe parse result:\", safeParse('{\"status\": \"active\"}'));\nconsole.log(\"Failed parse result:\", safeParse('invalid text'));\n"
  },
  part6: {
    title: "Key Takeaways: JSON",
    takeaways: [
      {
        title: "Text Representation",
        desc: "JSON is string text used to transmit data across HTTP networks and storage."
      },
      {
        title: "Always try/catch Parse",
        desc: "JSON.parse throws SyntaxError on invalid input; always protect with try/catch."
      },
      {
        title: "Serialization Limits",
        desc: "JSON does not support functions, undefined, or circular references."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does `JSON.stringify({ a: 10, b: undefined, c: () => {} })` produce?",
      options: [
        "'{\"a\":10,\"b\":null,\"c\":null}'",
        "'{\"a\":10}'",
        "TypeError: undefined cannot be serialized",
        "'{\"a\":10,\"b\":undefined,\"c\":[Function]}'"
      ],
      correctIndex: 1,
      explanation: "In standard JSON serialization of objects, properties whose values are `undefined` or functions are silently omitted, producing `'{\"a\":10}'`."
    }
  }
};
