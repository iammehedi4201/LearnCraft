import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js16TheThisKeywordContent: StandardLessonContent = {
  slug: "js16-the-this-keyword",
  code: "JS-16",
  title: "The this Keyword",
  subtitle: "Master execution context binding in methods versus lexical this in arrow functions.",
  difficulty: "Difficult",
  scenario: {
    question: "A method works when called as user.greet(), but breaks after the function is stored in a separate variable and called alone. What should you check?",
    answer: "Check how the function is called. The separate call may no longer provide user as this. You may need to bind the method, call it through the object, or use a design that does not depend on this.",
  },
  interviewQuestion: {
    question: "How does this behave in an arrow function compared with a normal function?",
    answer: "A normal function's this depends on how it is called. An arrow function does not create its own this; it uses the one from the surrounding scope.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "The this Keyword",
    bigPicture: "In many normal function calls, this depends on how the function is called. In a method call like user.greet(), this usually refers to the object before the dot. Arrow functions do not create their own this; they use it from the surrounding scope.",
    codeSnippet: "const user = { \n  name: \"Rina\",\n  greet() {\n    return `Hello, ${this.name}`;\n  },\n};\n\nconsole.log(user.greet()); // Hello, Rina",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Before the Dot",
            "desc": "In user.greet(), this binds to the object preceding the dot at invocation time."
      },
      {
            "title": "Arrow Functions",
            "desc": "Arrow functions do not bind their own this; they inherit it from their enclosing lexical scope."
      },
      {
            "title": "Unbound Calls",
            "desc": "Storing a method into a variable and calling it alone loses its original this binding."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Binding Rule",
      content: "In normal functions, this is determined by HOW the function is called. In arrow functions, this is inherited from surrounding code.",
    },
    cards: [
      {
            "number": "01",
            "tag": "METHOD CALL",
            "title": "Before the Dot",
            "description": "In user.greet(), this binds to the object preceding the dot at invocation time.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "LEXICAL BINDING",
            "title": "Arrow Functions",
            "description": "Arrow functions do not bind their own this; they inherit it from their enclosing lexical scope.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "STANDALONE CALL",
            "title": "Unbound Calls",
            "description": "Storing a method into a variable and calling it alone loses its original this binding.",
            "color": "amber"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Method calls bind to the object",
            "content": "When you call user.greet(), the object before the dot (user) becomes this inside greet()."
      },
      {
            "title": "2. Detaching a method loses this",
            "content": "If you do const fn = user.greet; fn(), this is no longer user—it becomes undefined in strict mode."
      },
      {
            "title": "3. Arrow functions use lexical this",
            "content": "Arrow functions do not have their own this. They capture this from the surrounding function or scope."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const user = { name: \"Rina\", greet() { return this.name; } };\n// Storing into a detached variable:\nconst sayHello = user.greet;\n// console.log(sayHello()); // TypeError: Cannot read property \"name\" of undefined",
      explanation: "Calling sayHello() alone strips the user context from this.",
    },
    good: {
      title: "Recommended Approach",
      code: "const user = { name: \"Rina\", greet() { return this.name; } };\n// Call through the object or bind it:\nconsole.log(user.greet()); // \"Rina\"\nconst boundSayHello = user.greet.bind(user);\nconsole.log(boundSayHello()); // \"Rina\"",
      explanation: "Calling via the object or using .bind(user) guarantees this points to user.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-16: The this Keyword\nconst user = {\n  name: \"Rina\",\n  greet() {\n    return `Hello, ${this.name}`;\n  }\n};\n\nconsole.log(\"Method call:\", user.greet());",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the value of this inside an arrow function?",
      options: ["The global window or globalThis object always","It is determined dynamically by who called the function","It is inherited lexically from the scope where the arrow function was defined","It is always undefined"],
      correctIndex: 2,
      explanation: "Arrow functions do not bind their own this. They inherit this from the surrounding lexical scope.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Dynamic in Normal Functions",
            "desc": "Determined at call-time by the object preceding the dot."
      },
      {
            "title": "Lexical in Arrow Functions",
            "desc": "Inherited from the surrounding enclosing context."
      },
      {
            "title": "Context Loss",
            "desc": "Detached methods lose their context unless called via the object or bound."
      }
],
    nextLessonPreview: {
      title: "Errors and Debugging",
      desc: "Learn how to handle runtime errors gracefully using try/catch and throw.",
    },
  },
};
