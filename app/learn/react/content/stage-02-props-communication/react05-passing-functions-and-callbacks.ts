import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react05PassingFunctionsAndCallbacksContent: StandardLessonContent = {
  slug: "react05-passing-functions-and-callbacks",
  code: "REACT-05",
  title: "Callback Props: Child-to-Parent Communication",
  subtitle: "Pass handler functions as props so child components can notify parent components when user actions happen.",
  difficulty: "Easy",
  scenario: {
    question: "A button runs its handler immediately when the page opens instead of waiting for a click. The code uses onClick={handleSave()}. What should change?",
    answer: "Pass the function reference without calling it: onClick={handleSave}.",
  },
  interviewQuestion: {
    question: "How does a child component communicate with or send data up to a parent component in React?",
    answer: "React uses callback props for upward communication. The parent defines a handler function and passes it down as a prop. When an event happens, the child executes that callback function, optionally passing data back as arguments.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Callback Mechanics", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Handling Events & Passing Callbacks",
    bigPicture: "Events let components respond to user actions like clicking a button or typing into an input. In React, event handlers are passed as functions. To let child components notify parent components of actions, parents pass functions as props — known as callback props.",
    codeSnippet: `// 1. Basic event handler
export function SaveButton() {
  function handleSave() {
    alert("Course saved!");
  }

  return <button onClick={handleSave}>Save course</button>;
}

// 2. Child-to-parent callback prop
function CourseItem({ title, onSelect }) {
  return (
    <div className="course-item">
      <span>{title}</span>
      <button onClick={() => onSelect(title)}>View Details</button>
    </div>
  );
}`,
    analogy: "Think of a callback prop like giving someone your phone number. You (the parent) tell the babysitter (the child): 'When the baby wakes up, call this number.' The child doesn't change your house rules; it just rings the bell when an event happens.",
    breakdownTitle: "How Callbacks Work",
    breakdownItems: [
      {
        title: "Pass Function by Reference",
        desc: "Write onClick={handleSave}, NOT onClick={handleSave()}. Passing the function lets React call it when the user clicks.",
      },
      {
        title: "Callback Props",
        desc: "Naming convention: Props representing events usually start with 'on' (e.g. onSelect), while handlers start with 'handle' (e.g. handleSelect).",
      },
      {
        title: "Passing Arguments",
        desc: "Use an inline arrow function () => onSelect(id) when you need to pass specific item arguments to the callback.",
      },
    ],
  },
  part2: {
    title: "Rules of Event Handlers",
    rule: {
      title: "The Function Reference Rule",
      content: "Always pass a function, not the result of calling a function, to event listeners: write `onClick={handleClick}` or `onClick={() => handleClick(id)}`. If you write `onClick={handleClick()}`, the function runs immediately during render.",
    },
    cards: [
      {
        number: "01",
        tag: "UPWARD DATA FLOW",
        title: "Child-to-Parent Communication",
        description: "Because data only flows downward via props, the only way a child communicates upward is by triggering a function provided by the parent.",
        color: "purple",
      },
      {
        number: "02",
        tag: "SYNTHETIC EVENTS",
        title: "Cross-Browser Normalization",
        description: "React wraps native browser events in SyntheticEvent objects so behavior is identical across Chrome, Safari, Firefox, and Edge.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "NAMING CONVENTION",
        title: "onEvent vs handleEvent",
        description: "Standard React convention: Props are named `onAction` (`onDelete`, `onSave`), while internal handler functions are named `handleAction` (`handleDelete`, `handleSave`).",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step upward communication using callback props:",
    points: [
      {
        title: "1. Parent Defines Handler",
        content: "Parent creates handleSelect(course) containing the logic to execute when selected.",
      },
      {
        title: "2. Passes as Prop",
        content: "Parent renders <CourseItem onSelect={handleSelect} /> passing the function down.",
      },
      {
        title: "3. Child Executes on Event",
        content: "Child attaches onClick={() => onSelect(course)} to notify parent upon user click.",
        codeSnippet: `<button onClick={() => onSelect(course)}>Select Course</button>`,
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Calling Function Immediately in JSX",
      code: `// ❌ ERROR: Runs immediately when rendered, causing infinite loops with setState!
<button onClick={handleClick()}>Click Me</button>`,
      explanation: "Writing parentheses () invokes the function immediately during component rendering rather than when clicked.",
    },
    good: {
      title: "Pass Function by Reference",
      code: `// ✅ Correct: Passes the function reference to be called on click
<button onClick={handleClick}>Click Me</button>`,
      explanation: "Omitting parentheses passes the function reference so React executes it only upon user interaction.",
    },
    whyItMatters: "Accidental execution during render causes unexpected alerts, network calls, and 'Too many re-renders' crashes.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test how child components trigger parent handlers through callback props:",
    starterCode: `function ActionButton({ label, onAction }) {
  return (
    <button
      onClick={onAction}
      style={{
        padding: "8px 16px",
        margin: "4px",
        backgroundColor: "#6366f1",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer"
      }}
    >
      {label}
    </button>
  );
}

export default function App() {
  function handleNotify(message) {
    alert("Parent received: " + message);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Child to Parent Callbacks</h3>
      <ActionButton label="Enroll Now" onAction={() => handleNotify("Enrolled in React 18")} />
      <ActionButton label="Bookmark" onAction={() => handleNotify("Added to Bookmarks")} />
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Function References",
        desc: "Always pass functions by reference: onClick={handleSave}, not onClick={handleSave()}.",
      },
      {
        title: "Arrow Wrappers for Arguments",
        desc: "Wrap calls in arrow functions when passing parameters: onClick={() => handleSave(id)}.",
      },
      {
        title: "Upward Notification",
        desc: "Callback props are the primary mechanism for child components to send data up to parents.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you write onClick={showAlert()} instead of onClick={showAlert}?",
      options: [
        "React will display a syntax error and refuse to compile",
        "The function runs immediately when the component renders",
        "Nothing happens until the user double-clicks",
        "The function will run on every user keystroke",
      ],
      correctIndex: 1,
      explanation: "Adding parentheses calls the function immediately during the render phase rather than waiting for user interaction.",
    },
  },
};
