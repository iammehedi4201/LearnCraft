import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js29EventsAndDelegationContent: StandardLessonContent = {
  "slug": "js29-events-and-delegation",
  "code": "JS-29",
  "title": "Events & Delegation: Bubbling & Event Handlers",
  "subtitle": "Respond to clicks and form submissions, master event bubbling, and use event delegation for high performance.",
  "sections": [
    {
      "id": "part1",
      "label": "User Interaction",
      "icon": "🖱️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Event Listeners",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Delegation & AI Traps",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Form Refresh Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Events Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Responding to User Actions",
    "bigPicture": "Events are signals fired by the browser when the user interacts with the page (clicks, keystrokes, form submissions). Using `addEventListener`, your JavaScript listens for these signals and runs responsive logic.",
    "analogy": "Think of an event listener like a doorbell. It sits silently on the wall. When a guest presses the button (event), the chime rings (callback function).",
    "diagram": "User clicks button\n        |\n        v\n[ Event Dispatched: \"click\" ]\n        |\n        v (Bubbles upward through parents)\n[ Parent Container catches event via Delegation ]",
    "breakdownTitle": "Event System Mechanics",
    "breakdownItems": [
      {
        "title": "addEventListener()",
        "desc": "Attaches an event handler function to an element without overwriting existing handlers."
      },
      {
        "title": "Event Bubbling",
        "desc": "An event triggered on an inner child bubbles upward through each ancestor element."
      },
      {
        "title": "Event Delegation",
        "desc": "Placing a single listener on a parent container to manage all child items efficiently."
      }
    ]
  },
  "part2": {
    "title": "Event Listener Patterns",
    "intro": "Attach listeners, prevent default behavior, and delegate events.",
    "cards": [
      {
        "number": "01",
        "tag": "Listener",
        "title": "addEventListener()",
        "description": "Listen for clicks, inputs, or keypresses with clean callback functions.",
        "codeSnippet": "// btn.addEventListener(\"click\", (e) => {\n//   console.log(\"Clicked:\", e.target);\n// });\nconsole.log(\"Event listener pattern configured\");",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Delegation",
        "title": "Event Delegation",
        "description": "Listen on a common parent container and use `e.target.closest()`.",
        "codeSnippet": "function onContainerClick(e) {\n  const btn = e.target.closest(\".action-btn\");\n  if (btn) console.log(\"Button clicked:\", btn.dataset.action);\n}",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Default",
        "title": "preventDefault()",
        "description": "Stops default browser actions like form submission page reloads.",
        "codeSnippet": "function handleSubmit(e) {\n  e.preventDefault(); // Prevents full page reload!\n  console.log(\"Form processed in JavaScript\");\n}",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Event Delegation Rule",
      "content": "For dynamic lists or tables with many items, attach one listener to the parent container instead of one listener per item."
    }
  },
  "part3": {
    "title": "Event Bubbling & Reading AI Code",
    "intro": "Understand bubbling and use delegation to handle dynamically added items.",
    "points": [
      {
        "title": "1. The Power of Event Delegation",
        "content": "When you add new items to a list dynamically, event delegation automatically works for the new items with zero extra listeners.",
        "codeSnippet": "function simulateDelegation(clickedClass, itemId) {\n  if (clickedClass === \"delete-btn\") {\n    console.log(\"Deleting item #\" + itemId);\n  }\n}\n\nsimulateDelegation(\"delete-btn\", 42); // Output: Deleting item #42"
      },
      {
        "title": "2. The Form Submit Default Trap",
        "content": "HTML forms refresh the entire browser page on submit by default. Always call `e.preventDefault()` inside submit listeners.",
        "codeSnippet": "function onFormSubmit(event) {\n  event.preventDefault(); // Stops full page reload\n  console.log(\"Form validated and handled with JavaScript fetch\");\n}\n\nonFormSubmit({ preventDefault: () => {} });\n// Output: Form validated and handled with JavaScript fetch"
      },
      {
        "title": "3. Stopping Propagation with e.stopPropagation()",
        "content": "Use `e.stopPropagation()` when you want an event to stop bubbling up to parent listeners.",
        "codeSnippet": "function onDropdownItemClick(e) {\n  e.stopPropagation(); // Prevents closing parent modal\n  console.log(\"Selected item without bubbling to parent\");\n}\n\nonDropdownItemClick({ stopPropagation: () => {} });\n// Output: Selected item without bubbling to parent"
      }
    ]
  },
  "part4": {
    "title": "Missing preventDefault Refreshes Page",
    "bad": {
      "title": "❌ Form Submit Triggers Full Page Reload",
      "code": "// Bug: Missing e.preventDefault()!\nform.addEventListener(\"submit\", () => {\n  // Page reloads immediately! All JavaScript state is wiped out!\n  saveUserData();\n});",
      "explanation": "By default, submitting a form refreshes the page, wiping all state and aborting pending JavaScript network requests."
    },
    "good": {
      "title": "✅ preventDefault Keeps Page Interactive",
      "code": "form.addEventListener(\"submit\", (e) => {\n  e.preventDefault(); // Prevents page reload!\n  saveUserData(); // Executes cleanly\n});",
      "explanation": "`e.preventDefault()` keeps the current page alive so JavaScript can handle submission seamlessly in the background."
    }
  },
  "part5": {
    "title": "Interactive Events Sandbox",
    "intro": "Experiment with event handler logic and event delegation in the live editor.",
    "starterCode": "// Simulating event delegation on a task list:\nfunction handleTaskListAction(event) {\n  const { action, taskId } = event;\n  \n  if (action === \"toggle\") {\n    console.log(\"Task #\" + taskId + \" toggled\");\n  } else if (action === \"delete\") {\n    console.log(\"Task #\" + taskId + \" deleted\");\n  }\n}\n\n// Simulating clicks on different delegated items:\nhandleTaskListAction({ action: \"toggle\", taskId: 101 });\nhandleTaskListAction({ action: \"delete\", taskId: 102 });\n"
  },
  "part6": {
    "title": "Key Takeaways: Events & Delegation",
    "takeaways": [
      {
        "title": "Event Bubbling",
        "desc": "Events travel up from target elements to parent containers."
      },
      {
        "title": "Event Delegation",
        "desc": "Attach one listener to a parent element to handle dynamic children cleanly."
      },
      {
        "title": "Call preventDefault()",
        "desc": "Always call e.preventDefault() on form submissions to stop full page reloads."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why is event delegation beneficial when managing a list of 500 interactive items?",
      "options": [
        "It attaches only 1 event listener to the parent instead of 500 individual listeners, saving memory",
        "It forces all click events to run synchronously",
        "It converts click events into promises automatically",
        "It prevents CSS styles from being applied"
      ],
      "correctIndex": 0,
      "explanation": "Event delegation leverages event bubbling to handle clicks on hundreds of items using a single parent listener, dramatically reducing memory usage and handling newly added items automatically."
    }
  }
};
