import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js19TheEventLoopABasicViewContent: StandardLessonContent = {
  slug: "js19-the-event-loop-a-basic-view",
  code: "JS-19",
  title: "The Event Loop: A Basic View",
  subtitle: "JavaScript runs normal code first, Promise callbacks second, and timers last.",
  difficulty: "Difficult",
  scenario: {
    question: "A developer expects a setTimeout(..., 0) callback to run before the next line, but it does not. Why?",
    answer: "The timer callback is placed in the waiting line. It only runs after the current normal code finishes. A zero delay does not skip the line.",
  },
  interviewQuestion: {
    question: "In this example, why does the Promise callback run before the timer callback?",
    answer: "Promise callbacks have VIP priority (microtasks). After normal code finishes, JavaScript processes Promises before looking at timer callbacks.",
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
    title: "The Event Loop: A Basic View",
    bigPicture: "JavaScript can only do one thing at a time. The Event Loop is the traffic manager that decides what runs next: it always finishes normal code first, runs Promise callbacks second, and runs timers last.",
    codeSnippet: `console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");

// Output:
// 1. Start
// 2. End
// 3. Promise
// 4. Timer`,
    breakdownTitle: "The 3 Priority Levels",
    breakdownItems: [
      {
        title: "1. Normal Code (Immediate)",
        desc: "JavaScript executes your regular lines of code first from top to bottom (Start, then End). Nothing can interrupt it.",
      },
      {
        title: "2. Promises (VIP Line)",
        desc: "Promise callbacks (.then) run right after normal code finishes, before any timers.",
      },
      {
        title: "3. Timers (Waiting Line)",
        desc: "setTimeout callbacks must wait in line until normal code AND all Promises are done, even with 0 milliseconds.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The 3-Step Priority Rule",
      content: "1. Normal code runs first. 2. Promises (VIP line) run second. 3. Timers (waiting line) run last.",
    },
    cards: [
      {
        number: "01",
        tag: "FIRST PRIORITY",
        title: "Normal Code",
        description: "Runs immediately line-by-line. JavaScript never stops in the middle of normal code.",
        color: "purple",
      },
      {
        number: "02",
        tag: "VIP LINE",
        title: "Promise Callbacks",
        description: "Runs right after normal code finishes. Promises jump ahead of all timers.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "WAITING LINE",
        title: "Timers (setTimeout)",
        description: "Runs last. Even setTimeout(..., 0) must wait until normal code and Promises finish.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Think of JavaScript like a busy cashier with a VIP line:",
    points: [
      {
        title: "1. Normal code runs first (Start & End)",
        content: "JavaScript reads the file and immediately prints 'Start' and 'End'. It never leaves the counter until normal code is done.",
      },
      {
        title: "2. Promises get VIP treatment (Promise)",
        content: "As soon as 'End' prints, JavaScript looks at the VIP line. The Promise callback runs next.",
      },
      {
        title: "3. Timers wait for the counter to clear (Timer)",
        content: "A 0ms delay just means 'join the waiting line now'. The timer callback only runs after all normal code and Promises finish.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Expecting setTimeout(..., 0) to Run Instantly",
      code: `console.log("A");\nsetTimeout(() => console.log("B"), 0);\nconsole.log("C");\n// ❌ Wrong expectation: "A", "B", "C"`,
      explanation: "Even with 0 milliseconds, setTimeout sends the callback to the waiting line. It runs AFTER line C.",
    },
    good: {
      title: "Understanding the Real Order",
      code: `console.log("A");\nsetTimeout(() => console.log("C (Timer)"), 0);\nconsole.log("B");\n// ✅ Correct output: A, B, then C (Timer)`,
      explanation: "Normal code (A and B) runs first, and the timer callback (C) runs only when the counter is clear.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this code to see the 3 priority levels print in action:",
    starterCode: `// JS-19: The Event Loop Priority
console.log("Start");

setTimeout(() => {
  console.log("Timer");
}, 0);

Promise.resolve().then(() => {
  console.log("Promise");
});

console.log("End");`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the execution order of: normal code, Promise.then, and setTimeout(..., 0)?",
      options: [
        "Normal code -> Promise.then (VIP line) -> setTimeout (Waiting line)",
        "setTimeout -> Promise.then -> Normal code",
        "Normal code -> setTimeout -> Promise.then",
        "Promise.then -> Normal code -> setTimeout",
      ],
      correctIndex: 0,
      explanation: "Normal code executes first, followed by all waiting Promise callbacks (microtasks), and finally timer callbacks (macrotasks).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Normal Code First",
        desc: "Regular lines always finish before any callbacks are checked.",
      },
      {
        title: "2. Promises are VIP",
        desc: "Promise .then callbacks run immediately after normal code, before timers.",
      },
      {
        title: "3. Timers Run Last",
        desc: "setTimeout callbacks must wait in line, even with 0 milliseconds.",
      },
    ],
    nextLessonPreview: {
      title: "DOM Events",
      desc: "Learn how JavaScript responds to user clicks, typing, and browser actions.",
    },
  },
};
