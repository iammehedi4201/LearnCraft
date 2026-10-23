import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js29EventsAndDelegationContent: StandardLessonContent = {
  slug: "js29-events-and-delegation",
  code: "JS-29",
  title: "Handling User Events",
  subtitle: "Listen for clicks and inputs, manage event bubbling, and use event delegation for dynamic lists.",
  sections: [
    {
      id: "part1",
      label: "Handling User Events",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "addEventListener Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Bubbling & Delegation",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Listeners in Loops",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Handling User Events",
    bigPicture: "JavaScript reacts to interactions (clicks, keystrokes, submits) with `addEventListener()`. Event delegation attaches a single listener on a parent element to manage dynamic children efficiently.",
    breakdownTitle: "Key Event Concepts",
    breakdownItems: [
      {
        title: "addEventListener()",
        desc: "Registers an event handler function on any target DOM element."
      },
      {
        title: "The Event Object (event)",
        desc: "Contains interaction details like `event.target` and methods like `event.preventDefault()`."
      },
      {
        title: "Event Delegation",
        desc: "Listens on a parent element to handle events triggered by current or future child elements."
      }
    ]
  },
  part2: {
    title: "addEventListener and the Event Object",
    intro: "Step through how to attach listeners and prevent unwanted default actions.",
    cards: [
      {
        number: "01",
        tag: "Listen",
        title: "Listening for Clicks",
        description: "Attach a click handler to any button or link.",
        codeSnippet: "const btn = document.querySelector(\"#save-btn\");\nbtn.addEventListener(\"click\", () => {\n  console.log(\"Save button clicked!\");\n});",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Target",
        title: "Inspecting event.target",
        description: "Identifies the exact HTML element that the user clicked on.",
        codeSnippet: "document.addEventListener(\"click\", (e) => {\n  console.log(\"User clicked on tag:\", e.target.tagName);\n});",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Prevent",
        title: "e.preventDefault()",
        description: "Stops default browser actions, like forms refreshing the page on submit.",
        codeSnippet: "const form = document.querySelector(\"#login-form\");\nform.addEventListener(\"submit\", (e) => {\n  e.preventDefault(); // Stops page reload!\n  console.log(\"Form submitted via AJAX\");\n});",
        color: "purple"
      }
    ],
    rule: {
      title: "The Form Submit Rule",
      content: "Always call e.preventDefault() on form submit events in Single-Page Apps (SPAs) so the browser doesn't wipe your state and reload the page."
    }
  },
  part3: {
    title: "Event Bubbling and Event Delegation",
    intro: "Understand how events bubble up the DOM tree and how to use it to your advantage.",
    points: [
      {
        title: "1. What is Event Bubbling?",
        content: "When an event happens on an element, it doesn't just trigger on that element: it 'bubbles' upward through its parents all the way to the document.",
        codeSnippet: "// Clicking <li> bubbles up to <ul>, then <div>, then <body>"
      },
      {
        title: "2. The Event Delegation Pattern",
        content: "Instead of adding separate click listeners to 100 <li> items, add ONE listener to the parent <ul> and check e.target.closest('li')!",
        codeSnippet: "const list = document.querySelector(\"#task-list\");\nlist.addEventListener(\"click\", (e) => {\n  if (e.target.matches(\".delete-btn\")) {\n    console.log(\"Delete button clicked for task!\");\n  }\n});"
      },
      {
        title: "3. Works for Future Dynamic Items",
        content: "Because the listener is on the parent container, items added to the list in the future work automatically with zero new listeners required.",
        codeSnippet: "// New items added dynamically inherit the parent's event handler immediately!"
      }
    ]
  },
  part4: {
    title: "Common Trap: Adding Duplicate Listeners in Loops",
    bad: {
      title: "❌ Attaching 100 Separate Listeners in a Loop",
      code: "const allItems = document.querySelectorAll(\".item\");\n// BUG: Attaches 100 individual functions in memory!\n// Plus: newly added items will NOT have the listener!\nallItems.forEach(item => {\n  item.addEventListener(\"click\", handleItemClick);\n});",
      explanation: "Attaching listeners to every list item wastes memory and fails whenever new items are added dynamically."
    },
    good: {
      title: "✅ Use Event Delegation on the Parent Container",
      code: "const container = document.querySelector(\"#items-container\");\n// Single listener handles all existing AND future items:\ncontainer.addEventListener(\"click\", (e) => {\n  const item = e.target.closest(\".item\");\n  if (item) {\n    console.log(\"Handled item click:\", item.textContent);\n  }\n});",
      explanation: "A single listener on the parent handles all children cleanly and automatically supports new items."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Test event delegation by simulating click events dispatched to a container.",
    starterCode: "// Simulating an interactive button in the LearnCraft runtime:\nconst actionBtn = document.querySelector(\".action-btn\");\n\nactionBtn.addEventListener(\"click\", (event) => {\n  console.log(\"Button clicked successfully!\");\n  console.log(\"Event type:\", event.type || \"click\");\n  console.log(\"Target text content:\", actionBtn.textContent);\n});\n\nconsole.log(\"Event listener attached and ready for user interactions.\");\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "addEventListener Listens for Actions",
        desc: "Use addEventListener('click', handler) to respond to user interactions."
      },
      {
        title: "e.preventDefault() Stops Reloads",
        desc: "Prevent default browser actions on forms and links using e.preventDefault()."
      },
      {
        title: "Use Event Delegation",
        desc: "Attach one listener to the parent container instead of separate listeners on each child item."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary benefit of Event Delegation when managing a list of interactive items?",
      options: [
        "A single listener on the parent container handles events for all items, including items added in the future",
        "It prevents JavaScript from using memory entirely",
        "It speeds up internet connection speeds for the user",
        "It automatically turns buttons into HTML form elements"
      ],
      correctIndex: 0,
      explanation: "Event Delegation utilizes event bubbling to manage all child elements using a single listener on the parent container. This saves memory and automatically supports new elements added to the list later."
    }
  }
};
