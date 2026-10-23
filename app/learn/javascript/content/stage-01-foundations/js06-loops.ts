import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js06LoopsContent: StandardLessonContent = {
  slug: "js06-loops",
  code: "JS-06",
  title: "Loops",
  subtitle: "Iterate over collections and repeat actions predictably with for...of loops.",
  difficulty: "Moderate",
  scenario: {
    question: "An app has a list of product prices and needs the total before checkout. What could you use, and what should happen for each price?",
    answer: "You can use a loop to visit each price and add it to a running total. For this job, reduce() is another option, but a loop is often easy to read for beginners.",
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
    title: "Loops",
    bigPicture: "Loops repeat code. Use a loop when you need to do the same kind of work for several items. for...of is useful when you want each value from an array.",
    codeSnippet: "const prices = [100, 200, 300];\nlet total = 0;\n\nfor (const price of prices) {\n  total += price;\n}\n\nconsole.log(total); // 600",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "for...of",
            "desc": "Visits each value in an array directly without index bookkeeping."
      },
      {
            "title": "Running Totals",
            "desc": "Initialize a let accumulator before the loop and update it on each iteration."
      },
      {
            "title": "break and continue",
            "desc": "break exits the loop immediately; continue skips ahead to the next item."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Looping Rule",
      content: "Use for...of for clean, readable iterations over array items.",
    },
    cards: [
      {
            "number": "01",
            "tag": "MODERN LOOP",
            "title": "for...of",
            "description": "Visits each value in an array directly without index bookkeeping.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "ACCUMULATION",
            "title": "Running Totals",
            "description": "Initialize a let accumulator before the loop and update it on each iteration.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "CONTROL FLOW",
            "title": "break and continue",
            "description": "break exits the loop immediately; continue skips ahead to the next item.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Loops repeat code for you",
            "content": "Instead of manually repeating lines for item 1, item 2, and item 3, a loop does the work for every item."
      },
      {
            "title": "2. for...of gives you the value",
            "content": "for (const item of list) gives you each item directly, avoiding index errors."
      },
      {
            "title": "3. Accumulate with an external variable",
            "content": "Keep a total or result outside the loop and update it on each step."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Manual repetition without a loop:\nconst p = [10, 20, 30];\nlet sum = 0;\nsum += p[0];\nsum += p[1];\nsum += p[2]; // Breaks if the array length changes!",
      explanation: "Hardcoding indexes fails whenever array lengths change or data is loaded dynamically.",
    },
    good: {
      title: "Recommended Approach",
      code: "const p = [10, 20, 30];\nlet sum = 0;\nfor (const price of p) {\n  sum += price;\n}\nconsole.log(\"Sum:\", sum); // 60",
      explanation: "A loop handles any number of items cleanly and stops automatically when finished.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-06: Loops\nconst scores = [85, 92, 78, 90];\nlet total = 0;\n\nfor (const score of scores) {\n  total += score;\n}\n\nconsole.log(\"Total Score:\", total);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the advantage of using for...of over manual index loops?",
      options: ["It works only in Node.js backend code","It directly provides each element in the array without needing manual index tracking","It converts strings into numbers automatically","It runs in reverse order by default"],
      correctIndex: 1,
      explanation: "for...of gives you direct access to each value in the iterable without needing index variables like i = 0; i < len; i++.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Direct Access",
            "desc": "for...of provides elements directly for clean code."
      },
      {
            "title": "Accumulator Pattern",
            "desc": "Initialize let sum = 0 before the loop to accumulate results."
      },
      {
            "title": "Flexible Length",
            "desc": "Loops adapt automatically whether an array has 0 or 1,000 items."
      }
],
    nextLessonPreview: {
      title: "Functions and Return Values",
      desc: "Learn how functions accept arguments and send back results using return.",
    },
  },
};
