import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js28DomEssentialsContent: StandardLessonContent = {
  slug: "js28-dom-essentials",
  code: "JS-28",
  title: "Finding and Changing HTML Elements",
  subtitle: "Select HTML elements with querySelector, update textContent, and toggle CSS classes dynamically.",
  sections: [
    {
      id: "part1",
      label: "Finding HTML Elements",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Selecting & Updating",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Creating DOM Elements",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Null Element Queries",
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
    title: "Finding and Changing HTML Elements",
    bigPicture: "The DOM is the browser's live tree representation of HTML. Use `document.querySelector()` to select elements, `textContent` to update text, and `classList` to modify styles dynamically.",
    breakdownTitle: "Key DOM Operations",
    breakdownItems: [
      {
        title: "querySelector()",
        desc: "Finds the first matching element using CSS selectors (`#id`, `.class`, tag name)."
      },
      {
        title: "textContent",
        desc: "Safely reads or replaces text without opening cross-site scripting (XSS) risks."
      },
      {
        title: "classList",
        desc: "Dynamically manages CSS classes with `.add()`, `.remove()`, and `.toggle()`."
      }
    ]
  },
  part2: {
    title: "querySelector and Updating Element Content",
    intro: "Step through the fundamental methods for interacting with HTML elements.",
    cards: [
      {
        number: "01",
        tag: "Select One",
        title: "document.querySelector()",
        description: "Returns the first element matching any valid CSS selector.",
        codeSnippet: "const heading = document.querySelector(\"#main-title\");\nheading.textContent = \"Welcome to LearnCraft!\";\nconsole.log(heading.textContent);",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Select All",
        title: "document.querySelectorAll()",
        description: "Returns a list of all matching elements that you can loop through.",
        codeSnippet: "const cards = document.querySelectorAll(\".card\");\ncards.forEach(card => card.classList.add(\"active\"));",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Classes",
        title: "element.classList",
        description: "Dynamically alter CSS styling by toggling classes.",
        codeSnippet: "const btn = document.querySelector(\"button\");\nbtn.classList.toggle(\"dark-theme\");\nbtn.classList.add(\"btn-primary\");",
        color: "purple"
      }
    ],
    rule: {
      title: "textContent vs innerHTML",
      content: "Always use textContent when inserting user text to prevent XSS security vulnerabilities. Only use innerHTML when you intentionally want to parse raw HTML tags."
    }
  },
  part3: {
    title: "Creating and Modifying DOM Elements",
    intro: "Dynamically generate new HTML elements on the fly.",
    points: [
      {
        title: "1. document.createElement()",
        content: "Creates a brand new element in memory before attaching it to the visible page.",
        codeSnippet: "const newBadge = document.createElement(\"span\");\nnewBadge.textContent = \"PRO\";\nnewBadge.classList.add(\"badge\");"
      },
      {
        title: "2. appendChild() & append()",
        content: "Attaches your newly created element into an existing container in the DOM.",
        codeSnippet: "const container = document.querySelector(\"#profile\");\ncontainer.appendChild(newBadge);"
      },
      {
        title: "3. Changing Element Attributes",
        content: "Update image sources, links, or disabled states directly.",
        codeSnippet: "const submitBtn = document.querySelector(\"#submit\");\nsubmitBtn.disabled = true; // Disables button during API call"
      }
    ]
  },
  part4: {
    title: "Common Trap: Calling Methods on Null Elements",
    bad: {
      title: "❌ Selector Typo or Premature Execution",
      code: "// If #submit-bttn is misspelled or script runs before HTML loads:\nconst btn = document.querySelector(\"#submit-bttn\"); // Returns null!\nbtn.classList.add(\"active\");\n// TypeError: Cannot read properties of null (reading 'classList')",
      explanation: "If querySelector cannot find a matching element, it returns null. Trying to read properties on null crashes your script."
    },
    good: {
      title: "✅ Check That the Element Exists First",
      code: "const btn = document.querySelector(\"#submit-bttn\");\nif (btn) {\n  btn.classList.add(\"active\");\n} else {\n  console.warn(\"Button element not found in DOM\");\n}",
      explanation: "Always check if (element) or use optional chaining (btn?.classList.add(...)) before manipulating DOM nodes."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Practice selecting elements, updating text content, and toggling CSS classes.",
    starterCode: "// Selecting mock elements in the LearnCraft sandbox environment:\nconst cardTitle = document.querySelector(\".card-title\");\ncardTitle.textContent = \"Advanced JavaScript Fundamentals\";\n\n// Toggle interactive classes:\ncardTitle.classList.add(\"highlighted\");\nconsole.log(\"Updated element text:\", cardTitle.textContent);\n\n// Inspect multiple elements:\nconst items = document.querySelectorAll(\".list-item\");\nconsole.log(\"Found items count:\", items.length);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "DOM Represents HTML in JS",
        desc: "Use the DOM to dynamically read, change, add, or remove elements on the webpage."
      },
      {
        title: "Use querySelector",
        desc: "Select elements with standard CSS selectors: #id, .class, or tag names."
      },
      {
        title: "Prefer textContent",
        desc: "Use textContent for safe text updates without XSS security vulnerabilities."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which property is the safest and recommended way to update the plain text displayed inside an HTML element?",
      options: [
        "textContent",
        "innerHTML",
        "outerHTML",
        "document.write()"
      ],
      correctIndex: 0,
      explanation: "textContent safely sets the element's text without parsing it as HTML, which completely prevents Cross-Site Scripting (XSS) injection attacks."
    }
  }
};
