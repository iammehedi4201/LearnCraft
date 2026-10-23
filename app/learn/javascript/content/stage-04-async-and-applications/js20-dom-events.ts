import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js20DomEventsContent: StandardLessonContent = {
  slug: "js20-dom-events",
  code: "JS-20",
  title: "DOM Events",
  subtitle: "How JavaScript makes webpages interactive: Find it, Listen for clicks, and Change the text.",
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
    bigPicture: "The DOM is simply your webpage turned into JavaScript. It gives you a 3-step superpower: Find an element on the screen, Listen for user clicks or typing, and Change what is displayed.",
    codeSnippet: `<button id="helloButton">Say hello</button>
<p id="message"></p>

<script>
  // 1. Find the elements on the page
  const button = document.querySelector("#helloButton");
  const message = document.querySelector("#message");

  // 2. Listen for the user's click
  button.addEventListener("click", () => {
    // 3. Change what is on screen!
    message.textContent = "Hello from JavaScript!";
  });
</script>`,
    breakdownTitle: "The 3-Step Recipe to Interactive Pages",
    breakdownItems: [
      {
        title: "1. Find it (document.querySelector)",
        desc: "Point to an element on the page using its ID (like #helloButton) or class name.",
      },
      {
        title: "2. Listen for it (addEventListener)",
        desc: "Tell the browser what user action to wait for: 'click', 'input', or 'submit'.",
      },
      {
        title: "3. Change it (textContent)",
        desc: "Change the text inside an element so the user sees the new result on screen.",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The 3-Step Interactivity Recipe",
      content: "1. Find the element with querySelector. 2. Listen for user actions with addEventListener. 3. Change the page with textContent.",
    },
    cards: [
      {
        number: "01",
        tag: "STEP 1: FIND IT",
        title: "document.querySelector",
        description: "Finds an HTML element on the page, like a button, input box, or heading.",
        color: "purple",
      },
      {
        number: "02",
        tag: "STEP 2: LISTEN",
        title: "addEventListener",
        description: "Waits for the user to do something, like clicking a button or typing text.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "STEP 3: CHANGE",
        title: "textContent",
        description: "Changes the text inside an element so the user sees the new result instantly.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how the browser connects user actions to your code:",
    points: [
      {
        title: "1. HTML becomes interactive",
        content: "HTML by itself is static. JavaScript brings it to life by responding whenever a user clicks, hovers, or types.",
      },
      {
        title: "2. Common user events",
        content: "You can listen for different events: 'click' for buttons, 'input' when typing in a text field, and 'submit' when submitting forms.",
      },
      {
        title: "3. The element must exist first",
        content: "JavaScript cannot find a button that hasn't appeared on the page yet. Place your <script> at the bottom of the body so elements load first.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Running Script Before Elements Exist",
      code: `// ❌ If <script> runs in <head> before HTML loads:\nconst button = document.querySelector("#btn"); // null!\n// TypeError: Cannot read property 'addEventListener' of null\nbutton.addEventListener("click", () => {});`,
      explanation: "The button doesn't exist on the page yet, so querySelector returns null and crashes.",
    },
    good: {
      title: "Place Script at the Bottom",
      code: `// ✅ Put script at the bottom of <body> or check first:\nconst button = document.querySelector("#btn");\nif (button) {\n  button.addEventListener("click", () => {\n    console.log("Button clicked!");\n  });\n}`,
      explanation: "Placing scripts at the bottom ensures the HTML elements are on screen before JavaScript looks for them.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test the 3-step DOM event flow:",
    starterCode: `// JS-20: DOM Events in 3 Simple Steps

// Step 1: Find the button (simulated on page)
console.log("Step 1: Finding element with document.querySelector('#btn')");

// Step 2: Attach event listener
console.log("Step 2: Listening for 'click' with addEventListener");

// Step 3: Run code when user clicks!
function onButtonClick() {
  const newText = "Hello! Button was clicked!";
  console.log("Step 3: Updating textContent ->", newText);
  return newText;
}

onButtonClick();`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What are the 3 steps to make a webpage button interactive with JavaScript?",
      options: [
        "1. Find it (querySelector), 2. Listen for clicks (addEventListener), 3. Update the page (textContent)",
        "1. Restart browser, 2. Add CSS, 3. Refresh",
        "1. Use var, 2. Set timer, 3. Create loop",
        "1. Download HTML, 2. Upload file, 3. Close tab",
      ],
      correctIndex: 0,
      explanation: "The core DOM recipe is: select the element with querySelector, attach a listener with addEventListener, and update the element when clicked.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Find with querySelector",
        desc: "Point to any HTML element using its ID like #btn or class name.",
      },
      {
        title: "2. Listen with addEventListener",
        desc: "Wait for user actions like 'click' without freezing the webpage.",
      },
      {
        title: "3. Change with textContent",
        desc: "Change what the user sees on screen immediately.",
      },
    ],
    nextLessonPreview: {
      title: "JSON, fetch(), and API Responses",
      desc: "Learn how web apps communicate with external backends and handle JSON responses.",
    },
  },
};
