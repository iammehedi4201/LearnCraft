import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js14DestructuringContent: StandardLessonContent = {
  slug: "js14-destructuring",
  code: "JS-14",
  title: "Destructuring Objects and Arrays",
  subtitle: "Extract properties from objects and elements from arrays into distinct variables with concise, readable syntax.",
  sections: [
    {
      id: "part1",
      label: "Destructuring Basics",
      icon: "📦",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Object & Array Syntax",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "Defaults & Renaming",
      icon: "🏷️",
      tag: "PATTERNS"
    },
    {
      id: "part4",
      label: "Null Destructuring Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Destructuring Sandbox",
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
    title: "Unpacking Values with Destructuring",
    bigPicture: "Destructuring is a concise syntax that allows you to extract multiple properties from objects or elements from arrays into individual variables in a single statement.",
    analogy: "Like unpacking a delivery box: instead of taking out the whole box every time you need an item, you pull out and label the exact items you want on your desk.",
    diagram: "+-------------------------------------------+\n| Object: { name: \"Sarah\", role: \"Admin\" }  |\n+-------------------------------------------+\n                     |\n    const { name, role } = user;\n                     |\n                     v\nname = \"Sarah\"             role = \"Admin\"",
    breakdownTitle: "Key Destructuring Concepts",
    breakdownItems: [
      {
        title: "Object Destructuring by Key Name",
        desc: "Extracts values matching the exact property key names inside curly braces {}."
      },
      {
        title: "Array Destructuring by Position",
        desc: "Extracts values based on their index order inside square brackets []."
      },
      {
        title: "Default Fallback Values",
        desc: "Provide fallback values automatically if a property is undefined in the source data."
      }
    ]
  },
  part2: {
    title: "Core Destructuring Syntax",
    intro: "Two primary syntaxes for unpacking objects and arrays.",
    cards: [
      {
        number: "01",
        tag: "Objects",
        title: "Object Destructuring",
        description: "Matches variable names directly to property keys.",
        codeSnippet: "const user = { id: 101, username: \"AlexDev\" };\nconst { id, username } = user;\nconsole.log(id, username); // Output: 101 AlexDev",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Arrays",
        title: "Array Destructuring",
        description: "Assigns variables according to item order, skipping positions with commas.",
        codeSnippet: "const coordinates = [40.7128, -74.0060];\nconst [latitude, longitude] = coordinates;\nconsole.log(latitude, longitude); // Output: 40.7128 -74.0060",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Functions",
        title: "Function Parameter Destructuring",
        description: "Unpack object properties directly in the function argument list.",
        codeSnippet: "function printBadge({ name, role = \"Member\" }) {\n  return `${name} - ${role}`;\n}\nconsole.log(printBadge({ name: \"Maya\" })); // Output: Maya - Member",
        color: "purple"
      }
    ],
    rule: {
      title: "Syntax Rule",
      content: "Use curly braces { ... } to destructure objects by key. Use square brackets [ ... ] to destructure arrays by position."
    }
  },
  part3: {
    title: "Renaming Variables & Setting Defaults",
    intro: "Customize extracted variable names and handle missing values cleanly.",
    points: [
      {
        title: "1. Renaming Properties (oldName: newName)",
        content: "Rename extracted variables to avoid name collisions in the local scope.",
        codeSnippet: "const apiResponse = { user_name: \"jdoe\" };\nconst { user_name: username } = apiResponse;\nconsole.log(username); // Output: jdoe"
      },
      {
        title: "2. Setting Default Values",
        content: "Assign fallback values if the property is undefined in the source object.",
        codeSnippet: "const settings = { theme: \"dark\" };\nconst { theme, fontSize = 14 } = settings;\nconsole.log(theme, fontSize); // Output: dark 14"
      },
      {
        title: "3. Skipping Array Items",
        content: "Use commas without identifiers to ignore elements you do not need.",
        codeSnippet: "const rgb = [255, 128, 0];\nconst [red, , blue] = rgb; // Skip green\nconsole.log(red, blue); // Output: 255 0"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Destructuring null or undefined",
    bad: {
      title: "❌ Destructuring null Without a Fallback",
      code: "const response = null;\n// Bug: Throws fatal TypeError!\n// const { data } = response;\n// TypeError: Cannot destructure property 'data' of null",
      explanation: "Attempting to destructure null or undefined crashes the program because primitives cannot be unpacked."
    },
    good: {
      title: "✅ Provide a Fallback Object Default ({})",
      code: "const response = null;\n// Safe: Default fallback empty object prevents crashes\nconst { data } = response || {};\nconsole.log(data); // Output: undefined",
      explanation: "Using response || {} ensures there is always a valid object to destructure from."
    }
  },
  part5: {
    title: "Destructuring Sandbox",
    intro: "Practice unpacking objects, renaming properties, and setting fallback defaults.",
    starterCode: "const serverConfig = {\n  host: \"db.internal.net\",\n  port: 5432,\n  auth: { user: \"postgres\" }\n};\n\n// 1. Destructure with default:\nconst { host, port, timeout = 3000 } = serverConfig;\n\n// 2. Destructure and rename:\nconst { host: dbHost } = serverConfig;\n\nconsole.log(\"Host:\", host, \"Port:\", port, \"Timeout:\", timeout);\nconsole.log(\"Renamed host variable:\", dbHost);\n"
  },
  part6: {
    title: "Key Takeaways: Destructuring",
    takeaways: [
      {
        title: "Object vs Array",
        desc: "Objects destructure by key name; arrays destructure by positional order."
      },
      {
        title: "Renaming and Defaults",
        desc: "Use key: alias to rename; use key = fallback to provide default values."
      },
      {
        title: "Protect Against null",
        desc: "Always provide a fallback (obj || {}) when destructuring data from APIs."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In `const { a: first, b = 10 } = { a: 5 };`, what are the values of `first` and `b`?",
      options: [
        "first = 5, b = 10",
        "first = undefined, b = 10",
        "first = 5, b = undefined",
        "SyntaxError: Invalid renaming syntax"
      ],
      correctIndex: 0,
      explanation: "Property `a` is extracted and renamed to `first` with value 5. Property `b` does not exist in the source object, so it receives its default fallback value 10."
    }
  }
};
