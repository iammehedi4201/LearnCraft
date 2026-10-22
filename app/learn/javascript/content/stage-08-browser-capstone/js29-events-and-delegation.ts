import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js29EventsAndDelegationContent: StandardLessonContent = {
  slug: "js29-events-and-delegation",
  code: "JS-29",
  title: "Handling User Events",
  subtitle: "Master the 3 phases of event propagation, understand event.target vs event.currentTarget, and scale event listeners with Event Delegation.",
  sections: [
    {
      id: "part1",
      label: "Event Propagation",
      icon: "🌊",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Event Delegation",
      icon: "🎯",
      tag: "PATTERNS"
    },
    {
      id: "part3",
      label: "target vs currentTarget",
      icon: "🔍",
      tag: "MECHANICS"
    },
    {
      id: "part4",
      label: "Listener Memory Leak",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Events Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "How Browser Events Travel: The 3 Phases",
    bigPicture: "When a user clicks on an element in the browser, the event does not just fire on that single element. It travels through the entire DOM tree in three distinct phases: Capturing (down), Target, and Bubbling (up).",
    analogy: "Like dropping a pebble into a pond: the pebble sinks down through the water to the bottom (capturing), touches the sand (target), and ripples bubble all the way back up to the surface (bubbling).",
    diagram: "+--------------------------------------------------------+\n| 1. CAPTURING PHASE: window -> document -> body -> div  |\n+--------------------------------------------------------+\n                           |\n                           v\n+--------------------------------------------------------+\n| 2. TARGET PHASE: Fires on the clicked <button>         |\n+--------------------------------------------------------+\n                           |\n                           v\n+--------------------------------------------------------+\n| 3. BUBBLING PHASE: button -> div -> body -> document   |\n|    (99% of event listeners listen here by default)     |\n+--------------------------------------------------------+",
    breakdownTitle: "Propagation Components",
    breakdownItems: [
      {
        title: "Event Bubbling (Default)",
        desc: "After reaching the target, the event bubbles upward through every parent ancestor all the way to window."
      },
      {
        title: "event.stopPropagation()",
        desc: "Stops the event from traveling further up or down the DOM tree."
      },
      {
        title: "event.preventDefault()",
        desc: "Prevents the default browser action (like following a hyperlink or submitting a form reload)."
      }
    ]
  },
  part2: {
    title: "The Event Delegation Pattern",
    intro: "Why attaching 1 listener to a parent element outperforms attaching 1,000 listeners to children.",
    cards: [
      {
        number: "01",
        tag: "Delegation",
        title: "Single Parent Listener",
        description: "Attach one listener on the parent container (like <ul>) and let clicks bubble up to it.",
        codeSnippet: "const list = document.querySelector(\"#todo-list\");\nlist.addEventListener(\"click\", (e) => {\n  if (e.target.matches(\".delete-btn\")) {\n    e.target.closest(\"li\").remove();\n  }\n});",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Dynamic Elements",
        title: "Handles Future Elements",
        description: "New items added to the list dynamically work immediately without attaching new listeners.",
        codeSnippet: "// Newly appended items are automatically handled by the parent listener!\nconst newItem = document.createElement(\"li\");\nnewItem.innerHTML = 'New task <button class=\"delete-btn\">X</button>';\nlist.appendChild(newItem);",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Cleanup",
        title: "removeEventListener()",
        description: "Remove listeners to prevent memory leaks when components unmount.",
        codeSnippet: "function onScroll() { console.log(\"scrolling\"); }\nwindow.addEventListener(\"scroll\", onScroll);\n// Cleanup later:\nwindow.removeEventListener(\"scroll\", onScroll);",
        color: "purple"
      }
    ],
    rule: {
      title: "Delegation Rule",
      content: "Whenever you have a list of recurring elements (table rows, list items, card grids), attach a single delegated event listener on the parent container instead of individual listeners on each child."
    }
  },
  part3: {
    title: "event.target vs event.currentTarget",
    intro: "Understand the crucial distinction between the element clicked and the element listening.",
    points: [
      {
        title: "1. event.target (The Clicked Element)",
        content: "event.target is the innermost element that the user physically clicked on (e.g. the <span> or <i> icon inside a button).",
        codeSnippet: "button.addEventListener(\"click\", (e) => {\n  console.log(e.target); // The actual icon or span clicked\n});"
      },
      {
        title: "2. event.currentTarget (The Listener Element)",
        content: "event.currentTarget is the element to which the event listener was explicitly attached (e.g. the <button> itself).",
        codeSnippet: "button.addEventListener(\"click\", (e) => {\n  console.log(e.currentTarget); // The <button> element owning this listener\n});"
      },
      {
        title: "3. event.target.closest()",
        content: "Use closest() in delegated handlers to find the target element even if the user clicked an icon inside it.",
        codeSnippet: "list.addEventListener(\"click\", (e) => {\n  const btn = e.target.closest(\".action-btn\");\n  if (btn) {\n    console.log(\"Action triggered for item ID:\", btn.dataset.id);\n  }\n});"
      }
    ]
  },
  part4: {
    title: "The Performance Pitfall: 1,000 Redundant Event Listeners",
    bad: {
      title: "❌ Attaching Event Listeners Inside a Loop (Memory Waste)",
      code: "const allItems = document.querySelectorAll(\".list-item\");\n// Bug: Attaches 1,000 separate function listeners in Heap memory!\n// Does NOT work for any new items appended later!\nallItems.forEach(item => {\n  item.addEventListener(\"click\", () => {\n    console.log(\"Clicked:\", item.id);\n  });\n});",
      explanation: "Attaching listeners to every child consumes memory and fails to respond to new elements added dynamically to the DOM."
    },
    good: {
      title: "✅ One Delegated Listener on the Parent Container",
      code: "const container = document.querySelector(\"#item-container\");\n// Safe: 1 single listener in memory handles all present AND future items!\ncontainer.addEventListener(\"click\", (e) => {\n  const item = e.target.closest(\".list-item\");\n  if (item) {\n    console.log(\"Clicked:\", item.id);\n  }\n});",
      explanation: "Event delegation leverages bubbling, keeping memory footprint minimal and handling dynamic elements effortlessly."
    }
  },
  part5: {
    title: "Event Delegation Simulator Sandbox",
    intro: "Observe simulated event bubbling and delegation across parent and child nodes.",
    starterCode: "// Simulated DOM event bubbling simulation:\nfunction simulateClick(targetName, parentContainer) {\n  const event = {\n    target: targetName,\n    currentTarget: parentContainer.name,\n    stopped: false,\n    stopPropagation() { this.stopped = true; }\n  };\n  \n  console.log(`[Event Bubbles]: Click on '${event.target}' bubbled to '${event.currentTarget}'`);\n  \n  if (event.target.includes(\"delete\")) {\n    console.log(\"--> Delegated action: Deleted item!\");\n  }\n}\n\nsimulateClick(\"button.delete-btn\", { name: \"ul#task-list\" });\nsimulateClick(\"span.task-title\", { name: \"ul#task-list\" });\n"
  },
  part6: {
    title: "Key Takeaways: Events & Delegation",
    takeaways: [
      {
        title: "Event Bubbling",
        desc: "Events propagate up from the target element through all ancestor nodes to window."
      },
      {
        title: "target vs currentTarget",
        desc: "target is the exact clicked node; currentTarget is the node holding the listener."
      },
      {
        title: "Scale with Delegation",
        desc: "Attach 1 listener to parent containers to handle thousands of dynamic child items cleanly."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the difference between `event.target` and `event.currentTarget`?",
      options: [
        "They are completely identical in all situations",
        "`event.target` is the element that triggered the event, while `event.currentTarget` is the element where the event listener is attached",
        "`event.currentTarget` is always the window object",
        "`event.target` only works for keyboard events"
      ],
      correctIndex: 1,
      explanation: "`event.target` is the actual innermost DOM element that received the user's click, while `event.currentTarget` is the element that registered the event listener currently executing."
    }
  }
};
