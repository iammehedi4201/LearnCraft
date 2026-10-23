import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js19TheEventLoopABasicViewContent: StandardLessonContent = {
  slug: "js19-the-event-loop-a-basic-view",
  code: "JS-19",
  title: "The Event Loop: A Basic View",
  subtitle: "Understand how the single-threaded JavaScript runtime coordinates microtasks and timers.",
  difficulty: "Difficult",
  scenario: {
    question: "A developer expects a setTimeout(..., 0) callback to run before the next line, but it does not. Why?",
    answer: "The timer callback is scheduled to run later, after the current synchronous code finishes. A zero delay does not make it run immediately.",
  },
  interviewQuestion: {
    question: "In this example, why does the Promise callback run before the timer callback?",
    answer: "Promise callbacks run as microtasks. After the current synchronous code finishes, microtasks are processed before timer callbacks in this example.",
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
    bigPicture: "JavaScript often runs one piece of synchronous code at a time in a given execution thread. The event loop helps the runtime handle scheduled work, such as Promise callbacks and timers, without making a long-running operation block all future work in the same way a synchronous wait would.",
    codeSnippet: "console.log(\"A\");\n\nsetTimeout(() => console.log(\"B\"), 0);\n\nPromise.resolve().then(() => console.log(\"C\"));\n\nconsole.log(\"D\");\n// A\n// D\n// C\n// B",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Call Stack",
            "desc": "Synchronous code executes immediately from top to bottom before any queued callbacks run."
      },
      {
            "title": "Microtask Queue",
            "desc": "Promises drain completely right after synchronous code finishes and before timer macrotasks."
      },
      {
            "title": "Macrotask Queue",
            "desc": "setTimeout and setInterval callbacks queue up behind the current synchronous work and microtasks."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Execution Order",
      content: "1. Synchronous Stack runs first -> 2. Microtasks (Promises) drain next -> 3. Macrotasks (setTimeout) execute.",
    },
    cards: [
      {
            "number": "01",
            "tag": "SYNCHRONOUS FIRST",
            "title": "Call Stack",
            "description": "Synchronous code executes immediately from top to bottom before any queued callbacks run.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "HIGH PRIORITY",
            "title": "Microtask Queue",
            "description": "Promises drain completely right after synchronous code finishes and before timer macrotasks.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "TIMERS & IO",
            "title": "Macrotask Queue",
            "description": "setTimeout and setInterval callbacks queue up behind the current synchronous work and microtasks.",
            "color": "amber"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Synchronous code runs first",
            "content": "JavaScript always executes all normal synchronous lines of code on the call stack before looking at any queued callbacks."
      },
      {
            "title": "2. Microtasks have priority",
            "content": "Promise callbacks (.then) sit in the microtask queue. As soon as the call stack is clear, all microtasks run before any timer callbacks."
      },
      {
            "title": "3. setTimeout(..., 0) is not immediate",
            "content": "A delay of 0ms simply queues the callback into the task queue to run after synchronous code and microtasks finish."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "console.log(\"1\");\nsetTimeout(() => console.log(\"2\"), 0);\nconsole.log(\"3\");\n// Incorrect assumption: \"1\", \"2\", \"3\"",
      explanation: "Assuming setTimeout with 0ms executes synchronously is false. Output is \"1\", \"3\", \"2\".",
    },
    good: {
      title: "Recommended Approach",
      code: "console.log(\"1\");\nsetTimeout(() => console.log(\"2 (Timer)\"), 0);\nPromise.resolve().then(() => console.log(\"3 (Promise)\"));\nconsole.log(\"4\");\n// Output: 1, 4, 3 (Promise), 2 (Timer)",
      explanation: "Synchronous lines run first (1, 4), then microtasks (3), then macrotasks (2).",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-19: The Event Loop\nconsole.log(\"A: Start\");\nsetTimeout(() => console.log(\"B: Timer\"), 0);\nPromise.resolve().then(() => console.log(\"C: Microtask\"));\nconsole.log(\"D: End\");",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the order of execution for: synchronous code, Promise.then callback, and setTimeout(..., 0)?",
      options: ["setTimeout -> Promise.then -> Synchronous code","Synchronous code -> Promise.then (Microtask) -> setTimeout (Macrotask)","Synchronous code -> setTimeout -> Promise.then","Promise.then -> Synchronous code -> setTimeout"],
      correctIndex: 1,
      explanation: "Synchronous execution finishes first, then all waiting microtasks (Promises) run, followed by macrotasks (timers).",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Single Threaded",
            "desc": "Synchronous execution runs uninterrupted on the call stack."
      },
      {
            "title": "Microtask Priority",
            "desc": "Promise resolutions drain before timer callbacks."
      },
      {
            "title": "Queued Delays",
            "desc": "setTimeout schedules future execution after current stack clears."
      }
],
    nextLessonPreview: {
      title: "DOM Events",
      desc: "Learn how JavaScript queries page elements and responds to user interactions like clicks.",
    },
  },
};
