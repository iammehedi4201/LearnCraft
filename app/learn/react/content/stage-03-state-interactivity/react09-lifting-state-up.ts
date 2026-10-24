import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react09LiftingStateUpContent: StandardLessonContent = {
  slug: "react09-lifting-state-up",
  code: "REACT-09",
  title: "Lifting State Up: Sharing State Between Siblings",
  subtitle: "When multiple components need to use and update the same data, lift state up to their closest common ancestor.",
  difficulty: "Moderate",
  scenario: {
    question: "A cart button in the navigation bar and a cart summary panel on the page must show the exact same item count. Each component currently stores a different count in local state. What should you change?",
    answer: "Move the count into their closest common parent component and pass it down to both components through props, along with an update callback.",
  },
  interviewQuestion: {
    question: "What does 'lifting state up' mean in React, and when should you do it?",
    answer: "Lifting state up means removing state from individual child components and moving it to their closest common parent. You should do it whenever two or more sibling components need to share or coordinate the same state.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Single Source of Truth", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Sharing State Between Components",
    bigPicture: "In React, state is local and private to the component that declares it. If two sibling components need to synchronize their values, neither sibling can directly peek into the other's state. The solution is to 'lift state up' to their closest common parent, which passes the state down as props and handles updates via callback props.",
    codeSnippet: `import { useState } from "react";

function QuantityControls({ quantity, onChange }) {
  return (
    <div className="quantity-controls">
      <button onClick={() => onChange(Math.max(1, quantity - 1))}>-</button>
      <span>{quantity}</span>
      <button onClick={() => onChange(quantity + 1)}>+</button>
    </div>
  );
}

function OrderSummary({ quantity, pricePerItem }) {
  return (
    <div className="order-summary">
      <p>Items selected: <strong>{quantity}</strong></p>
      <p>Total: <strong>\${quantity * pricePerItem}</strong></p>
    </div>
  );
}

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);

  return (
    <main>
      <QuantityControls quantity={quantity} onChange={setQuantity} />
      <OrderSummary quantity={quantity} pricePerItem={25} />
    </main>
  );
}`,
    analogy: "Think of two pilots in a cockpit. If pilot A adjusts altitude on their own private dial, pilot B won't know unless the central avionics computer (the parent) holds the single authoritative altitude reading and displays it on both screens.",
    breakdownTitle: "How Lifting State Works",
    breakdownItems: [
      {
        title: "1. Identify Common Parent",
        desc: "Find the lowest component in the tree that sits above all components needing the shared data.",
      },
      {
        title: "2. Move useState Up",
        desc: "Remove local state from child components and place useState inside that common parent.",
      },
      {
        title: "3. Pass Down as Props",
        desc: "Pass the current value down to children that need to display it.",
      },
      {
        title: "4. Pass Callbacks for Updates",
        desc: "Pass callback functions down to children that trigger updates.",
      },
    ],
  },
  part2: {
    title: "The Single Source of Truth Principle",
    rule: {
      title: "The Single Source of Truth Rule",
      content: "For each piece of data in a React application, there should be exactly one component that owns it in state. Never duplicate the same state in multiple sibling components.",
    },
    cards: [
      {
        number: "01",
        tag: "SYNCHRONIZATION",
        title: "Zero Desync Bugs",
        description: "Because only one component owns the state, it is impossible for sibling components to show conflicting information.",
        color: "purple",
      },
      {
        number: "02",
        tag: "UNIDIRECTIONAL",
        title: "Predictable Tracing",
        description: "Bugs are easy to isolate because you can follow props down from the single owner component.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "REUSABLE CHILDREN",
        title: "Controlled Children",
        description: "Children become pure 'controlled' presentation components, making them easy to test and repurpose across different pages.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step state sharing between sibling components:",
    points: [
      {
        title: "1. Common Parent Owns State",
        content: "ProductPage declares const [quantity, setQuantity] = useState(1).",
      },
      {
        title: "2. Controller Child Updates",
        content: "QuantityControls receives onChange={setQuantity} to trigger increments/decrements.",
        codeSnippet: `<QuantityControls quantity={quantity} onChange={setQuantity} />`,
      },
      {
        title: "3. Consumer Child Displays",
        content: "OrderSummary receives quantity directly as a prop, staying 100% in sync.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Mirroring Props into Child Local State",
      code: `// ❌ ANTI-PATTERN: If parent passes a new initialQty, local state won't update!
function QuantityInput({ initialQty }) {
  const [qty, setQty] = useState(initialQty);
  return <input value={qty} onChange={e => setQty(e.target.value)} />;
}`,
      explanation: "Initial state in useState only evaluates on mount. If the parent updates initialQty later, child state remains out of sync.",
    },
    good: {
      title: "Controlled Component Driven by Props",
      code: `// ✅ Clean: Controlled component reads prop directly and calls callback
function QuantityInput({ qty, onQtyChange }) {
  return <input value={qty} onChange={e => onQtyChange(e.target.value)} />;
}`,
      explanation: "Controlled components read props directly on every render and trigger parent callbacks to request changes.",
    },
    whyItMatters: "Single source of truth eliminates difficult-to-reproduce synchronization bugs across navigation bars and carts.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Edit temperature in either Celsius or Fahrenheit to see both inputs stay synchronized via lifted state:",
    starterCode: `import { useState } from "react";

function TemperatureInput({ scale, temperature, onTemperatureChange }) {
  const scaleNames = { c: "Celsius", f: "Fahrenheit" };
  return (
    <div style={{ margin: "10px 0" }}>
      <label>
        Enter temperature in {scaleNames[scale]}:{" "}
        <input
          type="number"
          value={temperature}
          onChange={(e) => onTemperatureChange(e.target.value)}
          style={{ padding: "6px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </label>
    </div>
  );
}

export default function Calculator() {
  const [celsius, setCelsius] = useState(20);

  const fahrenheit = (celsius * 9) / 5 + 32;

  function handleCelsiusChange(val) {
    setCelsius(Number(val));
  }

  function handleFahrenheitChange(val) {
    setCelsius(((Number(val) - 32) * 5) / 9);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Lifting State: Temperature Sync</h3>
      <TemperatureInput scale="c" temperature={Math.round(celsius)} onTemperatureChange={handleCelsiusChange} />
      <TemperatureInput scale="f" temperature={Math.round(fahrenheit)} onTemperatureChange={handleFahrenheitChange} />
      <p>Water {celsius >= 100 ? "would boil" : "would not boil"}.</p>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Lift State to Common Parent",
        desc: "Move state to the closest common ancestor when sibling components must share data.",
      },
      {
        title: "Single Source of Truth",
        desc: "Ensure exactly one component owns each piece of state in the application.",
      },
      {
        title: "Controlled Children",
        desc: "Pass the state down via props and pass setter callbacks for updates.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When should you lift state up in React?",
      options: [
        "Whenever any component has more than 3 lines of code",
        "When two or more components need to share and synchronize the same data",
        "Only when connecting to an external database",
        "State should never be lifted up in modern React",
      ],
      correctIndex: 1,
      explanation: "Lifting state up is the standard technique when sibling or related components must coordinate around shared values.",
    },
  },
};
