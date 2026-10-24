import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react12RenderingListsAndKeysContent: StandardLessonContent = {
  slug: "react12-rendering-lists-and-keys",
  code: "REACT-12",
  title: "Rendering Lists with map() & Why Keys Matter",
  subtitle: "Transform data arrays into UI elements using JavaScript map() and stable, unique keys.",
  difficulty: "Moderate",
  scenario: {
    question: "A console warning says 'Each child in a list should have a unique \"key\" prop.' What should you do?",
    answer: "Add a stable, unique key attribute such as `key={course.id}` to the outermost element or component returned directly inside your `.map()` callback.",
  },
  interviewQuestion: {
    question: "Why does React need keys for list items, and why shouldn't you use array indexes as keys?",
    answer: "Keys provide a persistent identity that helps React determine which items have been added, removed, or reordered during reconciliation. Using array indexes as keys breaks this identity when items are sorted, inserted at the top, or deleted, leading to state corruption, input bugs, and animation glitches.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "The Key Identity Rule", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Summary & Key Takeaways", icon: "🎓" },
    { id: "part7", label: "Knowledge Check Quiz", icon: "🎯" },
  ],
  part1: {
    title: "Rendering Lists with map()",
    bigPicture: "To display collections of similar data — like a list of courses, products, or comments — you use JavaScript's built-in `.map()` method to transform an array of data objects into an array of JSX elements. React requires each item in the list to have a unique `key` prop.",
    codeSnippet: `const courses = [
  { id: 1, title: "React Basics" },
  { id: 2, title: "Next.js Architecture" },
  { id: 3, title: "TypeScript Mastery" },
];

export default function CourseList() {
  return (
    <ul>
      {courses.map((course) => (
        <li key={course.id}>
          {course.title}
        </li>
      ))}
    </ul>
  );
}`,
    analogy: "Think of coat check tags at a cloakroom. If people give you coats, giving each coat a unique claim number (key) means you can fetch the exact coat later even if the coats on the rack get rearranged. If you just numbered the coat hangers by position 1, 2, 3, moving coat 1 leaves everyone with the wrong coat!",
    breakdownTitle: "How List Rendering Works",
    breakdownItems: [
      {
        title: "1. Data Array",
        desc: "An array of objects containing stable identifiers (e.g. database IDs or UUIDs).",
      },
      {
        title: "2. The .map() Function",
        desc: "Transforms each data item into a corresponding JSX element.",
      },
      {
        title: "3. The key Prop",
        desc: "Assigned to the outermost element returned by map(). Used internally by React's reconciliation engine.",
      },
      {
        title: "4. React Inlines the Array",
        desc: "React seamlessly flattens and renders arrays of JSX elements directly inside parent tags.",
      },
    ],
  },
  part2: {
    title: "Rules of React Keys",
    rule: {
      title: "The Stable Key Rule",
      content: "Keys must be unique among siblings and stable across renders. Use IDs from your data (like `course.id`). Do not generate keys on the fly with `Math.random()`, and do not use array indexes when items can change order.",
    },
    cards: [
      {
        number: "01",
        tag: "RECONCILIATION",
        title: "DOM Reordering vs Rebuilding",
        description: "With stable keys, React knows when an item was merely reordered, moving the existing DOM node instead of destroying and recreating it.",
        color: "purple",
      },
      {
        number: "02",
        tag: "COMPONENT STATE",
        title: "Preserving Child State",
        description: "Internal component state (such as checkboxes, text inputs, and animations) is tied to its key. Correct keys prevent input values jumping to neighboring rows.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "SIBLING SCOPE",
        title: "Unique Among Siblings Only",
        description: "Keys do not need to be globally unique across the whole app; they only need to be unique among their direct list siblings.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Step-by-step transformation of arrays into virtual DOM lists:",
    points: [
      {
        title: "1. Transform Data",
        content: "courses.map(course => <li key={course.id}>{course.title}</li>) yields an array of elements.",
      },
      {
        title: "2. Key Placement",
        content: "The key prop goes on the outermost element returned by the map callback.",
        codeSnippet: `<li key={course.id}>{course.title}</li>`,
      },
      {
        title: "3. Reconciliation Match",
        content: "When sorting or filtering, React matches old and new virtual nodes by their stable keys.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    bad: {
      title: "Using Array Index as Key for Dynamic Lists",
      code: `// ❌ BUG: Deleting item 0 causes item 1 to inherit index 0, corrupting input states!
{todos.map((todo, index) => (
  <TodoItem key={index} todo={todo} />
))}`,
      explanation: "Using array indices as keys creates visual artifacts, focus jumping, and input value bleeding when items are deleted or rearranged.",
    },
    good: {
      title: "Use Stable Data ID as Key",
      code: `// ✅ Correct: Stable database ID keeps identity tied to data
{todos.map((todo) => (
  <TodoItem key={todo.id} todo={todo} />
))}`,
      explanation: "Stable unique IDs allow React to track which item was added, moved, or removed without corrupting child state.",
    },
    whyItMatters: "Stable keys prevent subtle focus bugs and save CPU cycles by reusing existing DOM nodes during list reordering.",
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Add and vote on courses to observe how stable keys allow React to reorder DOM nodes efficiently:",
    starterCode: `import { useState } from "react";

export default function App() {
  const [courses, setCourses] = useState([
    { id: "c1", title: "React Fundamentals", votes: 12 },
    { id: "c2", title: "Next.js Fullstack", votes: 24 },
    { id: "c3", title: "TypeScript for Devs", votes: 18 },
  ]);

  function handleVote(id) {
    setCourses(courses.map(c => 
      c.id === id ? { ...c, votes: c.votes + 1 } : c
    ));
  }

  function handleAdd() {
    const id = "c" + (courses.length + 1);
    setCourses([...courses, { id, title: "New Elective Course", votes: 0 }]);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif" }}>
      <h3>Course Catalog (Rendered with Keys)</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {courses.map(course => (
          <li key={course.id} style={{ display: "flex", alignItems: "center", gap: "12px", margin: "8px 0", padding: "8px", border: "1px solid #e2e8f0", borderRadius: "6px" }}>
            <span style={{ flex: 1 }}>{course.title}</span>
            <span style={{ fontWeight: "bold", color: "#3b82f6" }}>⭐ {course.votes}</span>
            <button onClick={() => handleVote(course.id)} style={{ padding: "4px 8px" }}>+ Vote</button>
          </li>
        ))}
      </ul>
      <button onClick={handleAdd} style={{ marginTop: "12px", padding: "8px 14px", backgroundColor: "#3b82f6", color: "white", border: "none", borderRadius: "4px" }}>
        Add New Course
      </button>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "JavaScript map()",
        desc: "Use .map() to transform data arrays into lists of JSX elements.",
      },
      {
        title: "Stable Identifiers",
        desc: "Always assign unique, stable data IDs to the outermost element returned by map().",
      },
      {
        title: "Avoid Index Keys",
        desc: "Avoid using array indexes as keys when items can be sorted, inserted, or removed.",
      },
    ],
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Where should the `key` attribute be placed when rendering a list of custom components?",
      options: [
        "Inside the custom component's outermost tag",
        "On the custom component itself directly inside the .map() callback",
        "On the parent <ul> container element",
        "Inside the document <head>",
      ],
      correctIndex: 1,
      explanation: "The key must always be specified directly on the element or component returned inside the `map()` call.",
    },
  },
};
