import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react10DerivedStateVsStoredStateContent: StandardLessonContent = {
  slug: "react10-derived-state-vs-stored-state",
  code: "REACT-10",
  title: "Updating Objects and Arrays in State & Derived State",
  subtitle: "Treat state as read-only. Learn immutable update patterns and avoid redundant state by computing values on the fly.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer runs user.city = 'Sylhet' and then calls setUser(user) with the same object, but the UI does not update. What is the correct approach?",
    answer: "Create a new object using spread syntax: setUser({ ...user, city: 'Sylhet' }). React checks object references; mutating the existing object keeps the reference identical, so React skips re-rendering.",
  },
  interviewQuestion: {
    question: "Why shouldn't you store derived values (like fullName or totalPrice) in separate state variables?",
    answer: "Storing derived values in state causes synchronization bugs when one variable updates but the derived one is forgotten. Calculating derived state on the fly during render guarantees consistency, eliminates redundant re-renders, and keeps state minimal.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Immutability & Derived Values", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Updating Objects & Arrays Immutably",
    bigPicture: "In React, state values are considered immutable (read-only). When you update an object or array in state, you must never modify the existing data directly. Instead, create a brand-new copy with the changes applied using spread syntax (`...`) or non-mutating array methods.",
    codeSnippet: `import { useState } from "react";

export default function UserSettings() {
  const [user, setUser] = useState({ name: "Rina", city: "Dhaka" });

  // 1. Updating an Object
  function changeCity(newCity) {
    setUser({ ...user, city: newCity });
  }

  // 2. Derived State (Computed on the fly)
  const isDhakaResident = user.city === "Dhaka";

  return (
    <div>
      <p>{user.name} lives in {user.city}</p>
      <p>Resident status: {isDhakaResident ? "Capital Citizen" : "Regional Citizen"}</p>
      <button onClick={() => changeCity("Sylhet")}>Relocate to Sylhet</button>
    </div>
  );
}`,
    analogy: "Think of updating state like issuing a new passport. Officials don't scribble over your old passport with a marker. They photocopy your unchanged details, write your new stamp, and hand you a fresh new document.",
    breakdownTitle: "Immutable Update Patterns",
    breakdownItems: [
      {
        title: "Object Spread ({ ...obj, key: val })",
        desc: "Copies all existing properties into a new object and overwrites the specified key.",
      },
      {
        title: "Array Addition ([...arr, newItem])",
        desc: "Appends an element to a new array without calling mutating methods like push().",
      },
      {
        title: "Array Removal (arr.filter(...))",
        desc: "Returns a new array containing only items that match a condition.",
      },
      {
        title: "Derived Values",
        desc: "If something can be calculated from props or existing state, calculate it directly in the component body rather than storing it in useState.",
      },
    ],
  },
  part2: {
    title: "Don't Duplicate State: Derive It!",
    rule: {
      title: "The Derived State Rule",
      content: "If a value can be computed from existing props or state, do not put it in state. Calculate it during rendering: `const total = items.reduce(...)`.",
    },
    cards: [
      {
        number: "01",
        tag: "REFERENCE EQUALITY",
        title: "Why Mutation Fails",
        description: "React compares `prevObject === nextObject`. Direct mutations modify the object in place, so the reference doesn't change and React skips the render.",
        color: "purple",
      },
      {
        number: "02",
        tag: "CLEAN ARCHITECTURE",
        title: "Zero Desync Bugs",
        description: "Calculating `fullName = firstName + ' ' + lastName` means fullName can never become outdated or out of sync with firstName.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PERFORMANCE",
        title: "Minimal State",
        description: "Fewer state variables mean fewer re-renders and simpler mental overhead when debugging component behavior.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step immutable updates and derived calculations:",
    points: [
      {
        title: "1. Spreading Properties",
        content: "setUser({ ...user, city: 'Sylhet' }) creates a new object reference with updated fields.",
        codeSnippet: `setUser({ ...user, city: "Sylhet" });`,
      },
      {
        title: "2. Immutable Array Appends",
        content: "setCourses([...courses, newCourse]) appends items without mutating the original array.",
        codeSnippet: `setCourses([...courses, { id: 3, title: "React Hooks" }]);`,
      },
      {
        title: "3. On-The-Fly Calculations",
        content: "Compute totals and lengths directly: const total = items.reduce((s, i) => s + i.price, 0).",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Direct Mutation with Array.push",
      code: `// ❌ MUTATION BUG: modifies existing array reference!
function handleAdd(item) {
  items.push(item);
  setItems(items);
}`,
      explanation: "Mutating the existing array in place leaves the object reference identical. React skips re-rendering.",
    },
    good: {
      title: "Spread Syntax for Fresh Array",
      code: `// ✅ Correct: creates a new array with spread syntax
function handleAdd(item) {
  setItems([...items, item]);
}`,
      explanation: "Spread syntax creates a brand-new array reference, notifying React to schedule a re-render.",
    },
    whyItMatters: "Immutable updates ensure React's shallow comparison checks function reliably across all components.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Observe how items are added and removed immutably while the total is calculated as derived state:",
    starterCode: `import { useState } from "react";

export default function CartApp() {
  const [items, setItems] = useState([
    { id: 1, name: "Keyboard", price: 79 },
    { id: 2, name: "Mouse", price: 49 },
  ]);

  // Derived state: computed on every render
  const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

  function addItem() {
    const newItem = { id: Date.now(), name: "Cable " + (items.length + 1), price: 15 };
    setItems([...items, newItem]);
  }

  function removeItem(id) {
    setItems(items.filter(item => item.id !== id));
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Shopping Cart (Immutable State &amp; Derived Total)</h3>
      <ul>
        {items.map(item => (
          <li key={item.id} style={{ margin: "4px 0" }}>
            {item.name} - \${item.price}{" "}
            <button onClick={() => removeItem(item.id)} style={{ marginLeft: "8px" }}>Remove</button>
          </li>
        ))}
      </ul>
      <p><strong>Total Items:</strong> {items.length}</p>
      <p><strong>Total Price:</strong> \${totalPrice}</p>
      <button onClick={addItem} style={{ padding: "8px 12px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}>
        Add Accessory (\$15)
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Treat State as Read-Only",
        desc: "Never mutate existing state objects or arrays in place.",
      },
      {
        title: "Object & Array Spread",
        desc: "Use { ...obj, key: val } and [...arr, item] to create updated copies.",
      },
      {
        title: "Derive Values During Render",
        desc: "Avoid storing redundant data in state if it can be computed on the fly.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why does `user.city = 'Sylhet'; setUser(user);` fail to cause a re-render in React?",
      options: [
        "React doesn't allow city names to change",
        "React checks reference equality (prev === next), and since the reference is unchanged, it assumes no state update occurred",
        "Because setUser requires a string, not an object",
        "Because React only updates arrays",
      ],
      correctIndex: 1,
      explanation: "React relies on shallow reference equality. Mutating an object keeps its reference the same, so React skips re-rendering.",
    },
  },
};
