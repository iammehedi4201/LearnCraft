import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react23PerformanceMemoUsememoUsecallbackContent: StandardLessonContent = {
  slug: "react23-performance-memo-usememo-usecallback",
  code: "REACT-23",
  title: "Performance: When to use memo, useMemo & useCallback",
  subtitle: "Measure bottlenecks before optimizing. Learn how React.memo, useMemo, and useCallback prevent redundant work.",
  difficulty: "Moderate",
  scenario: {
    question: "A developer adds `useMemo`, `React.memo`, and `useCallback` to every single component and function before checking whether the app is actually slow. Is this a good practice?",
    answer: "No. Premature optimization adds code complexity and memory overhead. Always write clear code first, profile using React DevTools Profiler to identify genuine bottlenecks, and optimize only the parts that actually need it.",
  },
  interviewQuestion: {
    question: "What is the difference between `useMemo`, `useCallback`, and `React.memo`?",
    answer: "`React.memo` is a higher-order component that skips re-rendering a component if its props haven't changed. `useMemo` caches the *result* of an expensive calculation. `useCallback` caches a *function definition* between renders so passing it to a memoized child component doesn't break prop equality.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Memoization Trio", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Optimize Only When Needed",
    bigPicture: "React is designed to be fast by default. When a parent re-renders, React re-renders its children. In 95% of cases, this virtual DOM check takes less than a millisecond and is completely imperceptible to users. When an app does experience lag, use React DevTools Profiler to identify the slow component, then apply memoization purposefully.",
    codeSnippet: `import { useMemo, useCallback, memo, useState } from "react";

// 1. React.memo: Only re-renders if props change
const ExpensiveList = memo(function ExpensiveList({ items, onItemClick }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id} onClick={() => onItemClick(item.id)}>
          {item.name}
        </li>
      ))}
    </ul>
  );
});

export default function App() {
  const [query, setQuery] = useState("");
  const [count, setCount] = useState(0);

  // 2. useMemo: Caches expensive computation result
  const filteredItems = useMemo(() => {
    return items.filter(i => i.name.includes(query));
  }, [query]);

  // 3. useCallback: Caches stable function reference
  const handleClick = useCallback((id) => {
    console.log("Selected item:", id);
  }, []);

  return (
    <div>
      <input value={query} onChange={e => setQuery(e.target.value)} />
      <button onClick={() => setCount(c => c + 1)}>Counter: {count}</button>
      <ExpensiveList items={filteredItems} onItemClick={handleClick} />
    </div>
  );
}`,
    analogy: "Think of an expensive restaurant menu. If a guest asks 'What's the chef's special today?', the waiter doesn't call a 30-minute kitchen meeting every time. They remember the answer (useMemo) until the menu changes. But for simple questions like 'What time is it?', they just check their watch directly without taking notes.",
    breakdownTitle: "The Performance Toolkit",
    breakdownItems: [
      {
        title: "React.memo(Component)",
        desc: "Wraps a component to prevent re-renders when parent renders with unchanged props.",
      },
      {
        title: "useMemo(() => calculate(), [deps])",
        desc: "Caches the return value of an expensive calculation until dependencies change.",
      },
      {
        title: "useCallback(fn, [deps])",
        desc: "Caches a function instance between renders, preserving referential equality for child props.",
      },
    ],
  },
  part2: {
    title: "The Profile-First Rule",
    rule: {
      title: "The Profiling Rule",
      content: "Never optimize blindly. Open the React DevTools Profiler, record an interaction, identify which component took significant time to render, and verify that memoization actually made it faster.",
    },
    cards: [
      {
        number: "01",
        tag: "MEASURE FIRST",
        title: "DevTools Profiler",
        description: "The Flamegraph and Ranked chart show exact millisecond render times and why each component rendered.",
        color: "purple",
      },
      {
        number: "02",
        tag: "COST OF MEMO",
        title: "Memoization Has a Cost",
        description: "Every `useMemo` and `useCallback` requires allocating a dependency array, comparing values, and holding references in memory.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "COMPILER FUTURE",
        title: "React Compiler",
        description: "Modern React tooling (React Compiler) is designed to automate memoization at build time, reducing the need for manual memo hooks.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step optimization using the memoization toolkit:",
    points: [
      {
        title: "1. Identify Expensive Calculation",
        content: "Use Profiler to identify functions taking > 16ms of execution time.",
      },
      {
        title: "2. Wrap in useMemo",
        content: "const memoized = useMemo(() => heavyMath(data), [data]) re-runs only on data change.",
        codeSnippet: `const filtered = useMemo(() => heavyFilter(list, query), [list, query]);`,
      },
      {
        title: "3. Preserve Function References",
        content: "useCallback(() => onClick(id), []) guarantees child components skip re-rendering.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Wrapping Cheap Calculations in useMemo",
      code: `// ❌ OVERHEAD: Compounding costs for trivial operations!
const total = useMemo(() => price * quantity, [price, quantity]);`,
      explanation: "Simple arithmetic is faster than the overhead of allocating closures and checking dependency arrays.",
    },
    good: {
      title: "Calculate Simple Derived Data Directly",
      code: `// ✅ Correct: Simple arithmetic during render is virtually free
const total = price * quantity;`,
      explanation: "Writing plain JavaScript without hooks is cleaner, faster, and easier to debug.",
    },
    whyItMatters: "Avoiding premature optimization keeps code clean and prevents unnecessary memory allocations.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Toggle the theme to see how useMemo skips re-running expensive calculations when inputs haven't changed:",
    starterCode: `import { useState, useMemo } from "react";

function slowCalculation(num) {
  let result = 0;
  for (let i = 0; i < 1000000; i++) {
    result += num;
  }
  return result;
}

export default function App() {
  const [count, setCount] = useState(1);
  const [theme, setTheme] = useState("light");

  // useMemo re-computes only when count changes
  const computedTotal = useMemo(() => {
    return slowCalculation(count);
  }, [count]);

  return (
    <div style={{
      padding: "16px",
      fontFamily: "sans-serif",
      backgroundColor: theme === "dark" ? "#1e293b" : "#ffffff",
      color: theme === "dark" ? "#ffffff" : "#000000"
    }}>
      <h3>useMemo Benchmark</h3>
      <p>Calculated (1,000,000 iterations): <strong>{computedTotal}</strong></p>

      <button onClick={() => setCount(c => c + 1)} style={{ marginRight: "8px", padding: "6px 12px" }}>
        Increment Number (Re-calculates)
      </button>

      <button onClick={() => setTheme(t => t === "light" ? "dark" : "light")} style={{ padding: "6px 12px" }}>
        Toggle Theme (Skips calculation!)
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Measure Before Optimizing",
        desc: "React is fast by default; optimize only when you have measured a real performance issue.",
      },
      {
        title: "useMemo for Values",
        desc: "useMemo caches the result of computationally expensive calculations.",
      },
      {
        title: "useCallback for Functions",
        desc: "useCallback caches function definitions to keep references stable for memoized children.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "When does `useMemo(() => compute(x), [x])` recompute its cached value?",
      options: [
        "On every single component render",
        "Only when the dependency `x` changes between renders",
        "Every 500 milliseconds automatically",
        "Only on the server",
      ],
      correctIndex: 1,
      explanation: "useMemo checks its dependency array; it only recalculates if one of its dependencies has changed.",
    },
  },
};
