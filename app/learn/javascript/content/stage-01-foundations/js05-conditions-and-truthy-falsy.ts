import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js05ConditionsAndTruthyFalsyContent: StandardLessonContent = {
  slug: "js05-conditions-and-truthy-falsy",
  code: "JS-05",
  title: "Conditions and Truthy/Falsy Values",
  subtitle: "Control code flow with if/else statements and understand truthy versus falsy evaluations.",
  difficulty: "Easy",
  scenario: {
    question: "A developer writes if (items) { ... } to check whether an array has any items. Why could that check be wrong?",
    answer: "An empty array [] is truthy in JavaScript. Check items.length > 0 to see whether the array contains items.",
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
    title: "Conditions and Truthy/Falsy Values",
    bigPicture: "Conditions let code choose what to do. JavaScript treats some values as false in a condition, including false, 0, \"\", null, undefined, and NaN. Most other values are truthy, including empty arrays and empty objects.",
    codeSnippet: "const cartCount = 0;\n\nif (cartCount > 0) {\n  console.log(\"Cart has items\");\n} else {\n  console.log(\"Cart is empty\");\n}\n// Cart is empty",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "The 6 Core Falsy",
            "desc": "false, 0, \"\" (empty string), null, undefined, and NaN evaluate to false in if checks."
      },
      {
            "title": "Empty Collections",
            "desc": "Empty arrays [] and empty objects {} are truthy in JavaScript! Do not check if (arr)."
      },
      {
            "title": "Length Checks",
            "desc": "To check if an array has items, always write if (items.length > 0)."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Conditional Rule",
      content: "Never use if (array) to test for items. Empty arrays [] are truthy. Always check array.length > 0.",
    },
    cards: [
      {
            "number": "01",
            "tag": "FALSY VALUES",
            "title": "The 6 Core Falsy",
            "description": "false, 0, \"\" (empty string), null, undefined, and NaN evaluate to false in if checks.",
            "color": "rose"
      },
      {
            "number": "02",
            "tag": "SURPRISING TRUTHY",
            "title": "Empty Collections",
            "description": "Empty arrays [] and empty objects {} are truthy in JavaScript! Do not check if (arr).",
            "color": "amber"
      },
      {
            "number": "03",
            "tag": "EXPLICIT CHECKS",
            "title": "Length Checks",
            "description": "To check if an array has items, always write if (items.length > 0).",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Conditions branch execution",
            "content": "if / else allows your app to make decisions based on whether a condition evaluates to true or false."
      },
      {
            "title": "2. Remember the 6 falsy values",
            "content": "false, 0, empty text \"\", null, undefined, and NaN are the only values that turn into false."
      },
      {
            "title": "3. Empty arrays and objects are truthy",
            "content": "Writing if ([]) passes the check! Always inspect .length if you want to know if a list has elements."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const items = [];\n// Bug: [] is truthy, so this branch executes!\nif (items) {\n  console.log(\"Rendering items...\"); // Runs even when empty!\n}",
      explanation: "Testing an array reference directly tests whether the object exists, not whether it contains items.",
    },
    good: {
      title: "Recommended Approach",
      code: "const items = [];\nif (items.length > 0) {\n  console.log(\"Rendering items...\");\n} else {\n  console.log(\"No items in cart\");\n}",
      explanation: "Checking items.length > 0 directly reflects whether the array has elements.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-05: Conditions and Truthy/Falsy\nconst cart = [];\n\nif (cart.length > 0) {\n  console.log(\"Proceed to checkout\");\n} else {\n  console.log(\"Cart is empty - add products first\");\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which of the following values is truthy in a JavaScript if statement?",
      options: ["0","\"\" (empty string)","[] (empty array)","null"],
      correctIndex: 2,
      explanation: "Empty arrays [] and objects {} are truthy. Only false, 0, \"\", null, undefined, and NaN are falsy.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "The Falsy Six",
            "desc": "false, 0, \"\", null, undefined, and NaN evaluate as false."
      },
      {
            "title": "Truthy Arrays",
            "desc": "[] and {} are objects and evaluate as truthy."
      },
      {
            "title": "Explicit Length",
            "desc": "Check array.length > 0 to see if an array has items."
      }
],
    nextLessonPreview: {
      title: "Loops",
      desc: "Learn how to repeat actions over collections with for...of loops.",
    },
  },
};
