import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react26TestingFundamentalsContent: StandardLessonContent = {
  slug: "react26-testing-fundamentals",
  code: "REACT-26",
  title: "Testing Fundamentals: User-Centric Component Tests",
  subtitle: "Write robust component tests that verify what users see and do, not brittle internal implementation details.",
  difficulty: "Moderate",
  scenario: {
    question: "Should you write tests that directly inspect a component's internal state variables, or tests that verify what users see and do on screen?",
    answer: "Test what users see and do. Testing user-visible behavior (e.g. clicking a button and asserting that the displayed text updates) makes your tests resilient to internal refactoring.",
  },
  interviewQuestion: {
    question: "Why does React Testing Library prioritize querying by user-facing roles and visible text rather than internal state or CSS classes?",
    answer: "Querying by accessible roles (`getByRole('button')`) and visible text mirrors how real users and assistive technologies interact with your software. It keeps tests robust: refactoring internal state names or CSS class structures won't break your test suite as long as the user experience is preserved.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Testing Trophy", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "User-Centric Testing Philosophy",
    bigPicture: "The more your tests resemble the way your software is used, the more confidence they can give you. Instead of testing internal implementation details (like whether a variable is named `liked` or `isLiked`), test the user contract: does clicking the button toggle the text between 'Like' and 'Liked'?",
    codeSnippet: `// 1. Component to test
import { useState } from "react";

export function LikeButton() {
  const [liked, setLiked] = useState(false);

  return (
    <button onClick={() => setLiked((current) => !current)}>
      {liked ? "Liked" : "Like"}
    </button>
  );
}

// 2. Vitest / React Testing Library Test
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test } from "vitest";

test("toggles button text when clicked", () => {
  render(<LikeButton />);

  // Assert initial user-visible text
  const button = screen.getByRole("button", { name: /like/i });
  expect(button).toHaveTextContent("Like");

  // User interacts with the component
  fireEvent.click(button);

  // Assert updated output
  expect(button).toHaveTextContent("Liked");
});`,
    analogy: "Think of testing an automobile. You test by turning the ignition key and pressing the gas pedal to verify the car moves. You don't take apart the engine cylinder block to measure oil pressure just to know if the headlights turned on.",
    breakdownTitle: "Three Steps of a Component Test",
    breakdownItems: [
      {
        title: "1. Arrange (render)",
        desc: "Mount the component into the virtual jsdom container using render(<Component />).",
      },
      {
        title: "2. Act (fireEvent / userEvent)",
        desc: "Simulate user interactions like typing into inputs, clicking buttons, or submitting forms.",
      },
      {
        title: "3. Assert (expect)",
        desc: "Check that the expected text, element, or accessible role is present in screen.",
      },
    ],
  },
  part2: {
    title: "Guiding Testing Principles",
    rule: {
      title: "The Implementation Detail Rule",
      content: "Do not test component internals (state variables, private methods, class names). Test inputs (props and user events) and outputs (rendered DOM text and accessibility roles).",
    },
    cards: [
      {
        number: "01",
        tag: "ACCESSIBILITY",
        title: "Role-First Queries",
        description: "Prefer `getByRole('button')`, `getByLabelText('Name')`, and `getByText('Submit')` over brittle CSS class selectors.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REFACTOR PROOF",
        title: "Confidence in Refactoring",
        description: "If you migrate state from `useState` to `useReducer`, user-centric tests continue passing because the UI contract didn't change.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "ASYNC APIS",
        title: "findBy... for Async UI",
        description: "Use `await screen.findByText('Loaded data')` to automatically wait for async useEffect data fetching to resolve.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step Arrange-Act-Assert testing pattern:",
    points: [
      {
        title: "1. Render Component",
        content: "render(<LikeButton />) mounts the component in memory.",
      },
      {
        title: "2. Simulate User Interaction",
        content: "fireEvent.click(button) simulates a real browser mouse click.",
        codeSnippet: `fireEvent.click(screen.getByRole("button"));`,
      },
      {
        title: "3. Assert Rendered Changes",
        content: "expect(button).toHaveTextContent('Liked') verifies the screen updated.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Querying Elements by CSS Class Names",
      code: `// ❌ BRITTLE: Breaks the moment you rename Tailwind or CSS classes!
const button = container.querySelector(".btn-primary-blue");`,
      explanation: "Users don't see CSS class names; they see button text and roles. Testing by class couples tests to styling details.",
    },
    good: {
      title: "Query by Accessible Role and Label",
      code: `// ✅ Correct: Accessible, user-centric query
const button = screen.getByRole("button", { name: /save/i });`,
      explanation: "Accessible role queries verify that elements are usable by real humans and screen readers alike.",
    },
    whyItMatters: "Role-based testing guarantees accessibility while keeping test suites resilient to visual design updates.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Test button state toggles and observe simulated automated test assertions:",
    starterCode: `import { useState } from "react";

// The component to test
function LikeButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked(c => !c)}
      style={{
        padding: "8px 16px",
        backgroundColor: liked ? "#10b981" : "#64748b",
        color: "white",
        border: "none",
        borderRadius: "4px"
      }}
    >
      {liked ? "Liked ❤️" : "Like 🤍"}
    </button>
  );
}

// Simulated Test Runner
export default function App() {
  const [testResult, setTestResult] = useState(null);

  function runSimulatedTest() {
    setTestResult("Running: 'toggles button text when clicked'...");
    setTimeout(() => {
      setTestResult("PASS: 1 test passed. Button text updated from 'Like' to 'Liked' correctly!");
    }, 600);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>User-Centric Component Testing</h3>
      <div style={{ marginBottom: "16px" }}>
        <h4>Live Component:</h4>
        <LikeButton />
      </div>

      <div style={{ padding: "12px", border: "1px solid #cbd5e1", borderRadius: "6px" }}>
        <h4>Test Suite:</h4>
        <button onClick={runSimulatedTest} style={{ padding: "6px 12px" }}>
          Run Vitest Test Suite
        </button>
        {testResult && (
          <p style={{ marginTop: "12px", color: testResult.startsWith("PASS") ? "#16a34a" : "#3b82f6", fontWeight: "bold" }}>
            {testResult}
          </p>
        )}
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Test What Users See",
        desc: "Test what users see and do, not internal component implementation details.",
      },
      {
        title: "Accessible Queries",
        desc: "Prefer accessible role queries: screen.getByRole('button', { name: /save/i }).",
      },
      {
        title: "Async Waiting",
        desc: "Use findBy... queries to cleanly test asynchronous operations and loading states.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Which query is most recommended by React Testing Library?",
      options: [
        "container.querySelector('#submit-btn-2')",
        "screen.getByRole('button', { name: /submit/i })",
        "screen.getByClassName('btn-blue')",
        "screen.getState('submitPending')",
      ],
      correctIndex: 1,
      explanation: "Accessible role queries (getByRole) verify that elements are accessible and visible to all users.",
    },
  },
};
