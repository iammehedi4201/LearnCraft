import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js14DestructuringContent: StandardLessonContent = {
  "slug": "js14-destructuring",
  "code": "JS-14",
  "title": "Destructuring: Unpacking Objects & Arrays",
  "subtitle": "Extract values cleanly from objects and arrays with destructuring, renaming, and default values.",
  "sections": [
    {
      "id": "part1",
      "label": "Unpacking Data",
      "icon": "📦",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Objects vs Arrays",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Parameters & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Missing Property Crash",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Destructuring Sandbox",
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
    "title": "Unpacking Values Cleanly",
    "bigPicture": "Destructuring syntax allows you to unpack values from arrays or properties from objects into distinct variables in a single, concise line of code.",
    "analogy": "Think of destructuring like opening a shipment box and placing the items immediately onto designated shelves, rather than pulling them out one by one.",
    "diagram": "const user = { name: \"Alex\", role: \"admin\", points: 85 };\n\n// Destructuring:\nconst { name, role } = user;\n// name = \"Alex\", role = \"admin\"",
    "breakdownTitle": "Destructuring Features",
    "breakdownItems": [
      {
        "title": "Object Destructuring",
        "desc": "Pulls properties out of objects matching their key names."
      },
      {
        "title": "Array Destructuring",
        "desc": "Extracts values from arrays in order of position."
      },
      {
        "title": "Default Fallbacks",
        "desc": "Assigns default values if a property is missing or undefined."
      }
    ]
  },
  "part2": {
    "title": "Destructuring Patterns",
    "intro": "Compare object destructuring, array destructuring, and property renaming.",
    "cards": [
      {
        "number": "01",
        "tag": "Objects",
        "title": "Object Destructuring",
        "description": "Extract properties by name directly into variables.",
        "codeSnippet": "const config = { host: \"localhost\", port: 3000 };\nconst { host, port } = config;\nconsole.log(\"Listening:\", host, port); // Output: Listening: localhost 3000",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Arrays",
        "title": "Array Destructuring",
        "description": "Extract items in sequential order from an array.",
        "codeSnippet": "const coords = [40.71, -74.00];\nconst [lat, lng] = coords;\nconsole.log(\"Latitude:\", lat); // Output: Latitude: 40.71",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Rename",
        "title": "Renaming Variables",
        "description": "Assign properties to new variable names using a colon `key: newName`.",
        "codeSnippet": "const api = { data: [1, 2] };\nconst { data: userList } = api;\nconsole.log(userList); // Output: [ 1, 2 ]",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Clean Parameter Rule",
      "content": "Destructure function arguments directly in the signature: `function log({ id, name })`."
    }
  },
  "part3": {
    "title": "Parameter Destructuring & Reading AI Code",
    "intro": "Destructure function arguments and use default values to prevent undefined errors.",
    "points": [
      {
        "title": "1. Parameter Destructuring with Defaults",
        "content": "Destructure incoming object options directly in function parameter lists and provide fallbacks.",
        "codeSnippet": "function sendEmail({ to, subject, priority = \"normal\" }) {\n  console.log(\"Sending to: \" + to + \" [Priority: \" + priority + \"]\");\n}\n\nsendEmail({ to: \"sam@learncraft.dev\", subject: \"Welcome!\" });\n// Output: Sending to: sam@learncraft.dev [Priority: normal]"
      },
      {
        "title": "2. Skipping Array Elements",
        "content": "Use commas without variable names to skip unwanted positions in array destructuring.",
        "codeSnippet": "const rgb = [255, 128, 0];\n// Skip green (second item):\nconst [r, , b] = rgb;\nconsole.log(\"Red:\", r, \"Blue:\", b); // Output: Red: 255 Blue: 0"
      },
      {
        "title": "3. Safe Nested Destructuring",
        "content": "Provide a default empty object `= {}` when destructuring nested properties so missing data does not crash the app.",
        "codeSnippet": "const payload = {};\n// Safe: defaults to empty object if profile is missing\nconst { profile: { name = \"Guest\" } = {} } = payload;\nconsole.log(\"Profile name:\", name); // Output: Profile name: Guest"
      }
    ]
  },
  "part4": {
    "title": "Destructuring Undefined Crash",
    "bad": {
      "title": "❌ Destructuring null or undefined",
      "code": "function printUser(user) {\n  // Bug: If user is undefined, destructuring crashes!\n  const { name, email } = user;\n  console.log(name, email);\n}\n\nprintUser(); // TypeError: Cannot destructure property 'name' of undefined",
      "explanation": "Attempting to destructure `undefined` or `null` throws a fatal `TypeError`."
    },
    "good": {
      "title": "✅ Default Parameter Fallback",
      "code": "// Safe: defaults to empty object if no argument is passed\nfunction printUser(user = {}) {\n  const { name = \"Anonymous\", email = \"none\" } = user;\n  console.log(\"User:\", name, \"| Email:\", email);\n}\n\nprintUser(); // Output: User: Anonymous | Email: none",
      "explanation": "Provide a default `= {}` in the parameter list to ensure destructuring always receives a valid object."
    }
  },
  "part5": {
    "title": "Interactive Destructuring Sandbox",
    "intro": "Practice object and array destructuring in the live editor.",
    "starterCode": "// 1. Object destructuring with renaming and default:\nconst userProfile = {\n  id: 101,\n  username: \"alex_dev\",\n  roles: [\"admin\", \"editor\"],\n};\n\nconst { username: handle, roles: [primaryRole] } = userProfile;\nconsole.log(\"Handle:\", handle);\nconsole.log(\"Primary Role:\", primaryRole);\n\n// PRACTICE:\n// Destructure 'id' and a fallback 'theme = \"dark\"' from userProfile.\n"
  },
  "part6": {
    "title": "Key Takeaways: Destructuring",
    "takeaways": [
      {
        "title": "Unpack on Assignment",
        "desc": "Extract multiple properties in a single readable line."
      },
      {
        "title": "Default Fallbacks",
        "desc": "Assign fallback values with = in case properties are missing."
      },
      {
        "title": "Clean Signatures",
        "desc": "Destructure function arguments directly in parameter lists."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "How do you rename a property `originalKey` to `newKey` during object destructuring?",
      "options": [
        "const { originalKey as newKey } = obj;",
        "const { originalKey: newKey } = obj;",
        "const { originalKey -> newKey } = obj;",
        "const { newKey = originalKey } = obj;"
      ],
      "correctIndex": 1,
      "explanation": "In object destructuring, `key: newName` specifies the existing object property on the left and the new variable name on the right."
    }
  }
};
