import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js18PrototypesAndPrototypeChainContent: StandardLessonContent = {
  slug: "js18-prototypes-and-prototype-chain",
  code: "JS-18",
  title: "How Prototypes Work",
  subtitle: "Understand how JavaScript objects share methods by delegating lookups up the prototype chain to save memory.",
  sections: [
    {
      id: "part1",
      label: "How Prototypes Work",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "The Prototype Chain",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Modern Prototypes",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Duplicate Instance Methods",
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
    title: "How Prototypes Work",
    bigPicture: "In JavaScript, objects share methods through prototypes. If a property or method is not found on an object, JavaScript looks up the prototype chain until it finds it or reaches `null`.",
    breakdownTitle: "Prototype Concepts",
    breakdownItems: [
      {
        title: "Delegation, Not Copying",
        desc: "Objects link to a shared prototype rather than copying common methods into every instance."
      },
      {
        title: "The Prototype Chain",
        desc: "Property lookups traverse upward from the instance to Object.prototype."
      },
      {
        title: "Foundation of Classes",
        desc: "JavaScript `class` syntax is modern syntactic sugar on top of prototypes."
      }
    ]
  },
  part2: {
    title: "The Prototype Chain and Property Lookup",
    intro: "Step through how JavaScript navigates the prototype chain.",
    cards: [
      {
        number: "01",
        tag: "Check Self",
        title: "1. Check the Object First",
        description: "JavaScript checks if the property or method exists directly on the object itself.",
        codeSnippet: "const user = { name: \"Maya\" };\nconsole.log(user.name); // Found directly on user: 'Maya'",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Check Proto",
        title: "2. Check Prototype Link",
        description: "If not found, JavaScript automatically steps up to check its prototype.",
        codeSnippet: "const numbers = [1, 2, 3];\n// .map is not on numbers; it is found on Array.prototype:\nconsole.log(typeof numbers.map); // Output: function",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Chain Top",
        title: "3. End of the Chain (null)",
        description: "If the property is not found anywhere up to Object.prototype, JavaScript returns undefined.",
        codeSnippet: "console.log(user.nonExistentField); // Output: undefined",
        color: "purple"
      }
    ],
    rule: {
      title: "The Delegation Rule",
      content: "When reading obj.prop, JavaScript searches up the chain. But when writing obj.prop = val, it creates or updates the property directly on obj without modifying the prototype."
    }
  },
  part3: {
    title: "Object.create and Modern Prototype Patterns",
    intro: "Understand how built-ins use prototypes to save memory.",
    points: [
      {
        title: "1. Why All Arrays Share .map() and .filter()",
        content: "If you create 1,000 arrays, JavaScript does NOT create 1,000 copies of map. All 1,000 arrays link to the single Array.prototype.",
        codeSnippet: "const a = [1];\nconst b = [2];\nconsole.log(a.map === b.map); // Output: true (Exact same function in memory!)"
      },
      {
        title: "2. Inspecting an Object's Prototype",
        content: "Use the modern Object.getPrototypeOf() method to inspect an object's prototype link.",
        codeSnippet: "const user = { name: \"Sam\" };\nconst proto = Object.getPrototypeOf(user);\nconsole.log(proto === Object.prototype); // Output: true"
      },
      {
        title: "3. Classes are Prototypes Under the Hood",
        content: "Methods declared inside an ES6 class are automatically placed on the class's prototype object.",
        codeSnippet: "class Player {}\nconsole.log(typeof Player.prototype); // Output: object"
      }
    ]
  },
  part4: {
    title: "Common Trap: Recreating Methods on Every Instance",
    bad: {
      title: "❌ Defining Methods Inside Constructor Instances",
      code: "function User(name) {\n  this.name = name;\n  // BUG: Creates a new function object in memory for EVERY user!\n  this.greet = function() {\n    return \"Hello, \" + this.name;\n  };\n}\nconst u1 = new User(\"Maya\");\nconst u2 = new User(\"Alex\");\nconsole.log(u1.greet === u2.greet); // Output: false (Wasted memory!)",
      explanation: "Attaching methods directly inside a constructor creates thousands of duplicate functions in memory."
    },
    good: {
      title: "✅ Place Shared Methods on the Prototype",
      code: "function User(name) {\n  this.name = name;\n}\n// Place on prototype: single shared function in memory\nUser.prototype.greet = function() {\n  return \"Hello, \" + this.name;\n};\nconst u1 = new User(\"Maya\");\nconst u2 = new User(\"Alex\");\nconsole.log(u1.greet === u2.greet); // Output: true (Efficient!)",
      explanation: "All instances share the exact same method reference through the prototype chain."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Create instances and verify that shared methods on the prototype point to the exact same function in memory.",
    starterCode: "function Member(username, points) {\n  this.username = username;\n  this.points = points;\n}\n\n// Attach a shared method to Member.prototype:\nMember.prototype.addPoints = function(earned) {\n  this.points += earned;\n  console.log(`${this.username} now has ${this.points} points.`);\n};\n\nconst member1 = new Member(\"alex_chen\", 100);\nconst member2 = new Member(\"maya_dev\", 250);\n\nmember1.addPoints(50);\nmember2.addPoints(25);\n\nconsole.log(\"Do both instances share the exact same method?\", member1.addPoints === member2.addPoints);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Prototypes Share Behavior",
        desc: "Objects delegate method lookups to their prototype to avoid duplicating functions in memory."
      },
      {
        title: "Lookups Search Upward",
        desc: "JavaScript searches the object first, then its prototype, up to Object.prototype."
      },
      {
        title: "Classes Use Prototypes",
        desc: "Modern JavaScript classes use prototype delegation behind clean, readable syntax."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens when you call a method on an object, but that method is not defined on the object itself?",
      options: [
        "JavaScript searches up the prototype chain to see if the method exists on its prototype",
        "JavaScript immediately crashes with a fatal SyntaxError",
        "JavaScript automatically creates an empty function with that name on the object",
        "JavaScript reboots the browser window"
      ],
      correctIndex: 0,
      explanation: "If a property or method is not found directly on an object, JavaScript delegates the lookup up the prototype chain, searching parent prototypes until it is found or returns undefined."
    }
  }
};
