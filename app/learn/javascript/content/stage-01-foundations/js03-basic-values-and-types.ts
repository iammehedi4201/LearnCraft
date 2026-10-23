import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js03BasicValuesAndTypesContent: StandardLessonContent = {
  slug: "js03-basic-values-and-types",
  code: "JS-03",
  title: "Basic Values and Types",
  subtitle: "Distinguish primitives including strings, numbers, booleans, undefined, and null.",
  difficulty: "Easy",
  scenario: {
    question: "A user has not selected a delivery date yet. The app needs to represent that no date is currently set. Which value might be used, and what should the app remember?",
    answer: "The app may use null to mean there is deliberately no selected date. It should check for null before trying to use the date. If a variable was never assigned a value, it will usually be undefined.",
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
    title: "Basic Values and Types",
    bigPicture: "JavaScript values include text (string), numbers (number), true/false values (boolean), missing values (undefined), intentionally empty values (null), and objects.",
    codeSnippet: "const productName = \"Keyboard\";\nconst price = 1200;\nconst isAvailable = true;\nlet selectedProduct;\nconst chosenColor = null;\n\nconsole.log(typeof productName); // \"string\"\nconsole.log(typeof price);       // \"number\"\nconsole.log(typeof isAvailable); // \"boolean\"\nconsole.log(selectedProduct);    // undefined",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Core Types",
            "desc": "string for text, number for all numbers, boolean for true or false."
      },
      {
            "title": "null vs undefined",
            "desc": "undefined means unassigned; null represents an intentional empty value."
      },
      {
            "title": "typeof null",
            "desc": "typeof null returns \"object\" due to a legacy bug. Always check with value === null."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Checking Types Safely",
      content: "Use typeof for strings, numbers, and booleans. Use value === null to verify null values.",
    },
    cards: [
      {
            "number": "01",
            "tag": "PRIMITIVES",
            "title": "Core Types",
            "description": "string for text, number for all numbers, boolean for true or false.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "ABSENCE OF VALUE",
            "title": "null vs undefined",
            "description": "undefined means unassigned; null represents an intentional empty value.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "HISTORICAL QUIRK",
            "title": "typeof null",
            "description": "typeof null returns \"object\" due to a legacy bug. Always check with value === null.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Basic values represent your data",
            "content": "Strings hold text, numbers hold counts or decimals, and booleans store true/false toggle flags."
      },
      {
            "title": "2. undefined means never set",
            "content": "When a variable is declared without a value, or a function returns nothing, JavaScript assigns undefined."
      },
      {
            "title": "3. null is an intentional blank",
            "content": "Use null when you want to explicitly state that there is no value right now (e.g., no delivery date chosen yet)."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const selectedDate = null;\n// Buggy check:\nif (typeof selectedDate === \"object\") {\n  // This runs unexpectedly because typeof null === \"object\"!\n  console.log(\"Date object ready!\");\n}",
      explanation: "Checking typeof null === \"object\" causes false positives because of JavaScript historical quirk.",
    },
    good: {
      title: "Recommended Approach",
      code: "const selectedDate = null;\nif (selectedDate === null) {\n  console.log(\"No delivery date selected yet\");\n}",
      explanation: "Always check value === null directly using strict equality.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-03: Basic Values and Types\nconst item = \"Monitor\";\nconst cost = 299;\nlet buyer = null;\n\nconsole.log(typeof item, typeof cost, buyer === null);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does the operator typeof null return in JavaScript?",
      options: ["\"null\"","\"undefined\"","\"object\"","\"boolean\""],
      correctIndex: 2,
      explanation: "typeof null returns \"object\" due to an original legacy implementation bug in JavaScript. Always check value === null.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Core Primitives",
            "desc": "string, number, boolean form the foundation of basic data."
      },
      {
            "title": "Missing vs Blank",
            "desc": "undefined means not assigned; null means intentionally empty."
      },
      {
            "title": "Safe Null Checking",
            "desc": "Always compare with value === null rather than typeof."
      }
],
    nextLessonPreview: {
      title: "Comparisons and ===",
      desc: "Learn why strict equality (===) is preferred over loose equality (==).",
    },
  },
};
