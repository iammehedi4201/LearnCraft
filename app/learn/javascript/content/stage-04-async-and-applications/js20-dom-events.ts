import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js20DomEventsContent: StandardLessonContent = {
  slug: "js20-dom-events",
  code: "JS-20",
  title: "DOM Events",
  subtitle: "Select elements from the Document Object Model and listen for user interactions.",
  difficulty: "Moderate",
  scenario: {
    question: "A button is visible, but clicking it does nothing. What would you check?",
    answer: "Check that JavaScript selected the correct button, that the event listener was attached, and that there are no errors in the browser console. Also check that the script runs after the button exists.",
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
    title: "DOM Events",
    bigPicture: "The DOM is the browser's object representation of the page. JavaScript can find page elements and respond to events such as clicks, typing, and form submission.",
    codeSnippet: "<button id=\"helloButton\">Say hello</button>\n<p id=\"message\"></p>\n\n<script>\n  const button = document.querySelector(\"#helloButton\");\n  const message = document.querySelector(\"#message\");\n\n  button.addEventListener(\"click\", () => {\n    message.textContent = \"Hello!\";\n  });\n</script>",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "document.querySelector",
            "desc": "Finds HTML elements on the page using standard CSS selectors (#id, .class)."
      },
      {
            "title": "addEventListener",
            "desc": "Attaches callback functions to listen for events like \"click\", \"input\", and \"submit\"."
      },
      {
            "title": "textContent",
            "desc": "Safely modifies the visible text of an element without creating XSS vulnerabilities."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "DOM Timing Rule",
      content: "Always make sure DOM elements exist before querying them or attaching event listeners.",
    },
    cards: [
      {
            "number": "01",
            "tag": "SELECTION",
            "title": "document.querySelector",
            "description": "Finds HTML elements on the page using standard CSS selectors (#id, .class).",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "INTERACTION",
            "title": "addEventListener",
            "description": "Attaches callback functions to listen for events like \"click\", \"input\", and \"submit\".",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "UPDATING",
            "title": "textContent",
            "description": "Safely modifies the visible text of an element without creating XSS vulnerabilities.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. The DOM represents your HTML",
            "content": "Browsers turn HTML into a tree of JavaScript objects called the DOM that code can inspect and modify."
      },
      {
            "title": "2. Select elements with querySelector",
            "content": "document.querySelector(\"#btn\") finds an element by ID, returning the element object or null if not found."
      },
      {
            "title": "3. Listen with addEventListener",
            "content": "button.addEventListener(\"click\", handler) registers your callback to run whenever the user clicks."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "// Script placed in <head> without waiting for DOM:\nconst btn = document.querySelector(\"#btn\"); // null!\n// TypeError: Cannot read property \"addEventListener\" of null\nbtn.addEventListener(\"click\", () => {});",
      explanation: "Querying elements before the HTML has parsed returns null and crashes.",
    },
    good: {
      title: "Recommended Approach",
      code: "// Run after DOM elements exist:\nconst btn = document.querySelector(\"#btn\");\nif (btn) {\n  btn.addEventListener(\"click\", () => {\n    console.log(\"Handled successfully\");\n  });\n}",
      explanation: "Verifying the element exists before adding event listeners prevents null reference crashes.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-20: DOM Events\nconst btn = typeof document !== \"undefined\" ? document.querySelector(\"#helloButton\") : null;\nif (btn) {\n  btn.addEventListener(\"click\", () => {\n    console.log(\"Button clicked!\");\n  });\n  console.log(\"Event listener attached successfully\");\n} else {\n  console.log(\"Simulating DOM event registration in sandbox\");\n}",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What method is used to listen for user events on a DOM element?",
      options: ["element.attachEvent()","element.addEventListener()","element.listen()","element.on()"],
      correctIndex: 1,
      explanation: "addEventListener() is the standard modern DOM method for attaching event handlers to elements.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Element Discovery",
            "desc": "Use document.querySelector to find elements by selector."
      },
      {
            "title": "Event Registration",
            "desc": "addEventListener binds callbacks to user actions."
      },
      {
            "title": "Existence Check",
            "desc": "Always verify elements are in the DOM before attaching listeners."
      }
],
    nextLessonPreview: {
      title: "JSON, fetch(), and API Responses",
      desc: "Learn how web apps communicate with external backends and handle JSON responses.",
    },
  },
};
