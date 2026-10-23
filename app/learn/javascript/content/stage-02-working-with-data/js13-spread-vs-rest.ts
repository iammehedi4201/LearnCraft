import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js13SpreadVsRestContent: StandardLessonContent = {
  slug: "js13-spread-vs-rest",
  code: "JS-13",
  title: "Spread vs. Rest",
  subtitle: "Distinguish expanding values with spread from collecting arguments with rest.",
  difficulty: "Moderate",
  scenario: {
    question: "A helper function should accept any number of prices and return their total. Which syntax can collect the prices?",
    answer: "Use a rest parameter like function total(...prices). It gathers all arguments into an array that the function can loop over or reduce.",
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
    title: "Spread vs. Rest",
    bigPicture: "The ... syntax is used in more than one way. Spread expands values; rest gathers remaining values into one array or object.",
    codeSnippet: "const first = [1, 2];\nconst combined = [...first, 3];\n\nfunction addAll(...numbers) {\n  return numbers.reduce((total, number) => total + number, 0);\n}\n\nconsole.log(combined);       // [1, 2, 3]\nconsole.log(addAll(1, 2, 3)); // 6",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Spread (...)",
            "desc": "Unpacks elements of an array or properties of an object into a new container."
      },
      {
            "title": "Rest (...)",
            "desc": "Gathers multiple function arguments or remaining object properties into an array."
      },
      {
            "title": "Rest Position",
            "desc": "Rest parameters must always be the last parameter in a function signature."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Distinction Rule",
      content: "Spread unpacks elements out of an array; Rest gathers multiple loose elements into an array.",
    },
    cards: [
      {
            "number": "01",
            "tag": "EXPANSION",
            "title": "Spread (...)",
            "description": "Unpacks elements of an array or properties of an object into a new container.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "COLLECTION",
            "title": "Rest (...)",
            "description": "Gathers multiple function arguments or remaining object properties into an array.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "POSITION",
            "title": "Rest Position",
            "description": "Rest parameters must always be the last parameter in a function signature.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Spread unpacks values",
            "content": "Spread is used when creating arrays or objects: [...arr, 4] spreads items out into a new array."
      },
      {
            "title": "2. Rest gathers values together",
            "content": "Rest is used in function parameters: function fn(...args) collects whatever arguments were passed into an array."
      },
      {
            "title": "3. Rest must be at the end",
            "content": "You can write function log(prefix, ...items), but the rest parameter must always be the final parameter."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Using spread in parameter position incorrectly:\n// SyntaxError: Rest parameter must be last formal parameter\nfunction calc(...numbers, tax) {\n  return numbers;\n}",
      explanation: "A rest parameter collects all remaining items, so no parameters can follow it.",
    },
    good: {
      title: "Recommended Approach",
      code: "function calc(tax, ...numbers) {\n  const total = numbers.reduce((sum, n) => sum + n, 0);\n  return total + tax;\n}\nconsole.log(calc(5, 10, 20)); // 35",
      explanation: "Placing the rest parameter at the end collects all trailing arguments cleanly.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-13: Spread vs. Rest\nconst base = [10, 20];\nconst full = [...base, 30, 40]; // Spread\n\nfunction sumAll(...nums) { // Rest\n  return nums.reduce((a, b) => a + b, 0);\n}\n\nconsole.log(\"Spread array:\", full);\nconsole.log(\"Rest sum:\", sumAll(1, 2, 3, 4));",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "In the signature function compute(multiplier, ...values), what is ...values doing?",
      options: ["Spreading an array into separate variables","Gathering all remaining arguments into an array using rest syntax","Converting arguments into numbers automatically","Exporting the function to another module"],
      correctIndex: 1,
      explanation: "In parameter position, the ... operator represents rest syntax, gathering any number of remaining arguments into an array.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Spread Unpacks",
            "desc": "Expands items into arrays, objects, or function calls."
      },
      {
            "title": "Rest Gathers",
            "desc": "Collects multiple arguments into a single array parameter."
      },
      {
            "title": "Signature Order",
            "desc": "Rest parameters must always occupy the final position."
      }
],
    nextLessonPreview: {
      title: "Callbacks and Higher-Order Functions",
      desc: "Learn how functions pass functions as arguments to handle asynchronous events and array methods.",
    },
  },
};
