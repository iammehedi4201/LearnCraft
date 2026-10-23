import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js09ArraysAndCommonMethodsContent: StandardLessonContent = {
  slug: "js09-arrays-and-common-methods",
  code: "JS-09",
  title: "Arrays and Common Methods",
  subtitle: "Transform, filter, and inspect array collections using map(), filter(), and find().",
  difficulty: "Moderate",
  scenario: {
    question: "You need to show only products that cost at least 250. Which array method is a good fit, and why?",
    answer: "Use filter(), because it creates a new array containing only the products that pass the price condition.",
  },
  interviewQuestion: {
    question: "What is the difference between map() and filter()?",
    answer: "map() changes each item into a result and returns a new array of those results. filter() returns a new array containing only the items that pass a condition.",
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
    title: "Arrays and Common Methods",
    bigPicture: "An array stores an ordered list of values. Common methods help you find, change, or create lists.",
    codeSnippet: "const prices = [100, 250, 400];\n\nconst discounted = prices.map((price) => price * 0.9);\nconst expensive = prices.filter((price) => price >= 250);\n\nconsole.log(discounted); // [90, 225, 360]\nconsole.log(expensive);  // [250, 400]",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "map()",
            "desc": "Produces a new array with transformed items, preserving length."
      },
      {
            "title": "filter()",
            "desc": "Produces a new array with only elements that satisfy a condition."
      },
      {
            "title": "Pure Returns",
            "desc": "Leaves the original array unchanged when callbacks do not mutate items."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Array Methods Rule",
      content: "Use map() to transform each item, filter() to keep matching items, and find() to get the first match.",
    },
    cards: [
      {
            "number": "01",
            "tag": "TRANSFORMATION",
            "title": "map()",
            "description": "Produces a new array with transformed items, preserving length.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "SELECTION",
            "title": "filter()",
            "description": "Produces a new array with only elements that satisfy a condition.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "IMMUTABILITY",
            "title": "Pure Returns",
            "description": "Leaves the original array unchanged when callbacks do not mutate items.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. map transforms each item",
            "content": "If you have an array of 5 numbers, map() returns a new array of 5 transformed results without changing the original array."
      },
      {
            "title": "2. filter keeps only matches",
            "content": "filter() inspects each item and includes it in the new array only if the test function returns true."
      },
      {
            "title": "3. Built-in immutability",
            "content": "These methods create and return fresh arrays, keeping your original data clean and intact."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Using map() when you want to filter items:\nconst nums = [10, 50, 100];\nconst over40 = nums.map(n => n >= 40);\nconsole.log(over40); // [false, true, true] - Not the filtered numbers!",
      explanation: "map() returns boolean values for tests instead of filtering the numbers out.",
    },
    good: {
      title: "Recommended Approach",
      code: "const nums = [10, 50, 100];\nconst over40 = nums.filter(n => n >= 40);\nconsole.log(over40); // [50, 100]",
      explanation: "filter() creates a new array containing only elements that pass the comparison.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-09: Arrays and Common Methods\nconst prices = [100, 250, 400];\nconst discounted = prices.map(p => p * 0.9);\nconst premium = prices.filter(p => p >= 250);\n\nconsole.log(\"Discounted:\", discounted);\nconsole.log(\"Premium:\", premium);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary difference between map() and filter()?",
      options: ["map() changes the original array, filter() does not","map() transforms each item into a new array of identical length, while filter() returns only items matching a condition","filter() works only on numbers, map() works on strings","filter() runs asynchronously in a worker thread"],
      correctIndex: 1,
      explanation: "map() transforms every element, preserving total length. filter() checks each element and returns only those that return true for the condition.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "map() for Transformations",
            "desc": "Converts items into new representations."
      },
      {
            "title": "filter() for Selections",
            "desc": "Extracts matching elements into a fresh array."
      },
      {
            "title": "Safe Immutable Operations",
            "desc": "Neither method mutates the source array."
      }
],
    nextLessonPreview: {
      title: "Objects, Destructuring, and Spread",
      desc: "Learn how to group data into objects and extract values with destructuring.",
    },
  },
};
