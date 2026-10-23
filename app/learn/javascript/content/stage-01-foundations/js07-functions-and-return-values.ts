import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js07FunctionsAndReturnValuesContent: StandardLessonContent = {
  slug: "js07-functions-and-return-values",
  code: "JS-07",
  title: "Functions and Return Values",
  subtitle: "Package reusable logic with parameters and pass computed values back using return.",
  difficulty: "Moderate",
  scenario: {
    question: "A function calculates a discount, but the code calling it receives undefined. The function only uses console.log(discount). What should you check?",
    answer: "The function may be printing the discount instead of returning it. Add return discount if the calling code needs to use the result.",
  },
  interviewQuestion: {
    question: "What is the difference between return and console.log()?",
    answer: "return sends a value back from a function. console.log() displays a value in the console for checking or debugging.",
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
    title: "Functions and Return Values",
    bigPicture: "A function is a reusable block of code. It can receive information through parameters and send a result back with return.",
    codeSnippet: "function calculateTotal(price, quantity) {\n  return price * quantity;\n}\n\nconst total = calculateTotal(250, 3);\nconsole.log(total); // 750",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Parameters & Return",
            "desc": "Parameters receive data; return hands the result back to the caller."
      },
      {
            "title": "console.log()",
            "desc": "Prints text to screen for developers; does NOT give data to calling code."
      },
      {
            "title": "Implicit undefined",
            "desc": "A function without an explicit return statement returns undefined automatically."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Return Rule",
      content: "Functions that calculate data must use return. console.log() only prints to output and returns nothing.",
    },
    cards: [
      {
            "number": "01",
            "tag": "INPUT & OUTPUT",
            "title": "Parameters & Return",
            "description": "Parameters receive data; return hands the result back to the caller.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "DEBUGGING VS DATA",
            "title": "console.log()",
            "description": "Prints text to screen for developers; does NOT give data to calling code.",
            "color": "amber"
      },
      {
            "number": "03",
            "tag": "DEFAULT RETURN",
            "title": "Implicit undefined",
            "description": "A function without an explicit return statement returns undefined automatically.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Reusable blocks of logic",
            "content": "Functions allow you to write a calculation once and call it as many times as you need with different inputs."
      },
      {
            "title": "2. return gives data back",
            "content": "The return statement passes the calculated answer back so other code can save it, display it, or use it."
      },
      {
            "title": "3. console.log is only for inspection",
            "content": "Printing a message to the console helps during development, but calling code cannot capture or use that message."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "function getDiscount(price) {\n  const discount = price * 0.1;\n  console.log(discount); // Only prints, does not return!\n}\n\nconst savings = getDiscount(100);\nconsole.log(savings); // undefined!",
      explanation: "Missing return causes the caller to receive undefined.",
    },
    good: {
      title: "Recommended Approach",
      code: "function getDiscount(price) {\n  return price * 0.1;\n}\n\nconst savings = getDiscount(100);\nconsole.log(savings); // 10",
      explanation: "Using return hands the discount value back to the caller.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-07: Functions and Return Values\nfunction computeTax(amount, rate) {\n  return amount * rate;\n}\n\nconst tax = computeTax(200, 0.05);\nconsole.log(\"Computed Tax:\", tax);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What does a JavaScript function return if it has no return statement?",
      options: ["null","0","undefined","false"],
      correctIndex: 2,
      explanation: "In JavaScript, functions that finish execution without hitting a return statement implicitly return undefined.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Parameters as Inputs",
            "desc": "Accept data dynamically when the function is invoked."
      },
      {
            "title": "return for Outputs",
            "desc": "Sends the computed result back to the caller."
      },
      {
            "title": "Logging vs Returning",
            "desc": "console.log() is for viewing; return is for sharing data with code."
      }
],
    nextLessonPreview: {
      title: "Scope and Block Scope",
      desc: "Understand where variables live and why block scope prevents bugs.",
    },
  },
};
