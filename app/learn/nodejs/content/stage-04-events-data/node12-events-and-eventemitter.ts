import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node12EventsAndEventemitterContent: StandardLessonContent = {
  slug: "node12-events-and-eventemitter",
  code: "NODE-12",
  title: "Events and EventEmitter",
  subtitle: "EventEmitter lets your code send and listen for events to notify different parts of your application.",
  difficulty: "Moderate",
  scenario: {
    question: "After an order is created, another part of the app should write a log entry. How could an event help?",
    answer: "The order code can emit an event, and a listener can respond by writing the log. For reliable work that must survive a crash, a stronger queue or storage system may be needed.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Events and EventEmitter",
    bigPicture:
      "An event is a signal that something happened. Node.js uses events in many places. `EventEmitter` lets your own code send and listen for events.",
    codeSnippet: `import { EventEmitter } from "node:events";

const bus = new EventEmitter();

bus.on("orderCreated", (orderId) => {
  console.log(\`Order \${orderId} created\`);
});

bus.emit("orderCreated", 42);`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. new EventEmitter()",
        desc: "`new EventEmitter()` creates an event emitter.",
      },
      {
        title: "2. .on() registration",
        desc: "`.on()` registers a listener for the `orderCreated` event.",
      },
      {
        title: "3. .emit() dispatch",
        desc: "`.emit()` sends that event with the value `42`.",
      },
      {
        title: "4. Listener execution",
        desc: "The listener runs and prints `Order 42 created`.",
      },
    ],
  },
  part2: {
    title: "In-Process Pub/Sub vs Durable Queues",
    intro:
      "This is useful when one part of a program needs to notify another part about an event. Do not use events when a simple function call would be clearer. Event listeners run in the same process; this alone is not a durable job queue.",
    rule: {
      title: "EventEmitter Boundaries Rule",
      content:
        "EventEmitter is an in-memory pub/sub pattern within a single Node.js process. It is not durable; events are lost if the server crashes or restarts. Use external queues (like RabbitMQ or Redis) for mission-critical jobs.",
    },
    cards: [
      {
        number: "01",
        tag: "PUB/SUB",
        title: "Decoupled Notification",
        description:
          "Lets producer code emit events without hardcoding direct references to every consumer.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SIMPLICITY",
        title: "Use Simple Calls When Direct",
        description:
          "Do not use EventEmitter when a direct function call or promise chain is clearer and more straightforward.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "MEMORY BOUND",
        title: "In-Process Only",
        description:
          "Listeners run in the same Node.js memory space and cannot survive process restarts.",
        color: "amber",
      },
    ],
  },
  part3: {
    title: "Scenario & Durability Considerations",
    intro: "Evaluating when to use EventEmitter vs durable background task runners:",
    points: [
      {
        title: "Decoupled Side Effects",
        content:
          "Emitting an `orderCreated` event lets auditing, email notifications, and metric collectors respond independently without cluttering order placement logic.",
      },
      {
        title: "Crash Resilience",
        content:
          "If the server crashes midway through processing an in-memory event, unhandled events disappear. Financial transactions or critical emails need persistent queues.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Treating EventEmitter as a persistent background worker and losing business-critical tasks when a process terminates.",
    bad: {
      title: "Relying on In-Memory Events for Critical Tasks",
      code: `// Danger: If server restarts, this critical email is lost forever\nbus.on("userSignedUp", async (user) => {\n  await sendConfirmationEmail(user.email);\n});`,
      explanation:
        "In-memory listeners are not durable. Critical jobs should be persisted to a database or message queue.",
    },
    good: {
      title: "Using Events for Decoupled In-Process Notifications",
      code: `// Clean: In-process logging and metric tracking\nbus.on("orderCreated", (orderId) => {\n  console.log(\`[Audit Log] Order \${orderId} initiated\`);\n});`,
      explanation:
        "EventEmitter is perfect for lightweight, in-memory decoupling and diagnostic logging.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Trigger and handle custom events with EventEmitter:",
    starterCode: `// Simulating EventEmitter pattern in standard JavaScript\nclass MiniEmitter {\n  constructor() { this.events = {}; }\n  on(name, fn) { (this.events[name] = this.events[name] || []).push(fn); }\n  emit(name, data) { (this.events[name] || []).forEach(fn => fn(data)); }\n}\n\nconst bus = new MiniEmitter();\nbus.on("orderCreated", (id) => console.log(\`Order \${id} processed successfully!\`));\nbus.emit("orderCreated", 42);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "After an order is created, another part of the app should write a log entry. How could an event help?",
      options: [
        "The order code can emit an event, and a listener can respond by writing the log. For reliable work that must survive a crash, a stronger queue or storage system may be needed.",
        "EventEmitter guarantees that all messages survive sudden server crashes automatically.",
        "EventEmitter replaces the need for any database or filesystem storage.",
        "Events run faster because they bypass the Node.js event loop completely.",
      ],
      correctIndex: 0,
      explanation:
        "An event decouples the order code from logging, but since listeners run in-memory in the same process, persistent work requires a durable queue or database.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "EventEmitter",
        desc: "Lets your own code send and listen for events across application modules.",
      },
      {
        title: ".on() and .emit()",
        desc: "Register listeners with .on() and dispatch signals with .emit().",
      },
      {
        title: "In-Process Scope",
        desc: "Event listeners run in the same process; they are not a durable crash-resilient queue.",
      },
    ],
  },
};
