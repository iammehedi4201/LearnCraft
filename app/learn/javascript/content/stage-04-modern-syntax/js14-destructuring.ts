import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js14DestructuringContent: StandardLessonContent = {
  slug: "js14-destructuring",
  code: "JS-14",
  title: "Destructuring Objects and Arrays",
  subtitle: "Extract properties from objects and items from arrays into standalone variables with renaming and fallback defaults.",
  sections: [
    {
      id: "part1",
      label: "Destructuring Syntax",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Object Destructuring",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Array & Parameter Unpacking",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Destructuring undefined",
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
    title: "Destructuring Objects and Arrays",
    bigPicture: "Destructuring lets you unpack properties from objects (`const { name } = user`) or values from arrays (`const [first] = items`) directly into distinct variables.",
    breakdownTitle: "Key Destructuring Capabilities",
    breakdownItems: [
      {
        title: "Clean and Concise",
        desc: "Eliminates repetitive object property prefixes across your code."
      },
      {
        title: "Renaming Variables",
        desc: "Rename fields during extraction using syntax like `const { id: userId } = user`."
      },
      {
        title: "Default Values",
        desc: "Provide fallback values (`const { role = 'guest' } = user`) if a property is undefined."
      }
    ]
  },
  part2: {
    title: "Object Destructuring Syntax and Defaults",
    intro: "Learn the core techniques for unpacking object properties.",
    cards: [
      {
        number: "01",
        tag: "Basic",
        title: "Property Unpacking",
        description: "Variable names match the object keys enclosed in curly braces { }.",
        codeSnippet: "const user = { name: \"Maya\", points: 250 };\nconst { name, points } = user;\nconsole.log(name, points); // Output: Maya 250",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Renaming",
        title: "Renaming with Colon (:)",
        description: "Extract a property and assign it to a new local variable name.",
        codeSnippet: "const apiResponse = { user_id: 1042 };\nconst { user_id: id } = apiResponse;\nconsole.log(id); // Output: 1042",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Defaults",
        title: "Fallback Default Values (=)",
        description: "Specify a default value if the property is missing or undefined.",
        codeSnippet: "const settings = { theme: \"dark\" };\nconst { theme, sound = \"enabled\" } = settings;\nconsole.log(theme, sound); // Output: dark enabled",
        color: "purple"
      }
    ],
    rule: {
      title: "Colon vs Equal Sign Rule",
      content: "Use colon (key: newName) to RENAME a property. Use equal sign (key = defaultValue) to set a FALLBACK."
    }
  },
  part3: {
    title: "Array and Function Parameter Destructuring",
    intro: "Destructuring also works with array positions and function arguments.",
    points: [
      {
        title: "1. Array Destructuring by Position",
        content: "Values are unpacked based on their index order inside square brackets [ ].",
        codeSnippet: "const coordinates = [40.7128, -74.0060];\nconst [latitude, longitude] = coordinates;\nconsole.log(\"Lat:\", latitude, \"Lng:\", longitude); // Output: Lat: 40.7128 Lng: -74.006"
      },
      {
        title: "2. Function Parameter Destructuring",
        content: "Unpack properties directly in function arguments (used constantly in React component props).",
        codeSnippet: "function displayProduct({ title, price }) {\n  console.log(`${title} costs $${price}`);\n}\ndisplayProduct({ title: \"Keyboard\", price: 80 }); // Output: Keyboard costs $80"
      },
      {
        title: "3. Skipping Unwanted Array Items",
        content: "Use commas to skip index positions you don't need.",
        codeSnippet: "const rgb = [255, 128, 0];\nconst [red, , blue] = rgb; // Skips green\nconsole.log(red, blue); // Output: 255 0"
      }
    ]
  },
  part4: {
    title: "Common Trap: Destructuring from undefined or null",
    bad: {
      title: "❌ Unpacking a Missing or Null Object",
      code: "let data; // data is undefined!\n// Destructuring from undefined throws a fatal TypeError!\nconst { title } = data;\n// TypeError: Cannot destructure property 'title' of 'undefined'",
      explanation: "JavaScript cannot extract properties from undefined or null. If the source data is missing, the program crashes."
    },
    good: {
      title: "✅ Provide a Fallback Empty Object ({})",
      code: "let data;\n// Safe: fall back to an empty object if data is undefined\nconst { title = \"Untitled\" } = data || {};\nconsole.log(title);\n// Output: Untitled (Safe and resilient!)",
      explanation: "Using (data || {}) provides a safe object target so destructuring never throws an error."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Unpack API user profiles, rename identifiers, and apply default fallbacks.",
    starterCode: "const serverResponse = {\n  status: \"success\",\n  payload: {\n    account_id: \"usr_882\",\n    name: \"Alex Chen\",\n    tier: \"Gold\"\n  }\n};\n\n// 1. Destructure top-level status and nested payload:\nconst { status, payload } = serverResponse;\n\n// 2. Destructure with renaming and defaults:\nconst { account_id: id, name, tier, role = \"Member\" } = payload;\n\nconsole.log(`[Status: ${status}] User: ${name} (ID: ${id}) | Tier: ${tier} | Role: ${role}`);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Objects Use Key Names",
        desc: "const { name, role } = obj matches properties by their key name."
      },
      {
        title: "Arrays Use Position",
        desc: "const [first, second] = arr matches values by their index position."
      },
      {
        title: "Always Guard Missing Data",
        desc: "Use (data || {}) to prevent fatal crashes when destructuring optional API data."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In the statement: const { count = 10 } = options; what does '= 10' represent?",
      options: [
        "A default fallback value used if options.count is undefined",
        "It renames the variable count to 10",
        "It reassigns options.count to 10 permanently",
        "A syntax error because equal signs cannot be used inside destructuring"
      ],
      correctIndex: 0,
      explanation: "The equal sign (=) specifies a default fallback value. If options.count is undefined or omitted, count will automatically default to 10."
    }
  }
};
