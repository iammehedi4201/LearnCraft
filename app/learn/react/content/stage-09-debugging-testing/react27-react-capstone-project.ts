import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const react27ReactCapstoneProjectContent: StandardLessonContent = {
  slug: "react27-react-capstone-project",
  code: "REACT-27",
  title: "React Capstone: Course Explorer & Task Dashboard",
  subtitle: "Synthesize all core React concepts into an interactive, modular, production-ready course application.",
  difficulty: "Difficult",
  scenario: {
    question: "You are building the LearnCraft Course Explorer dashboard with live search, level filtering, and a favorites list. How do you avoid state synchronization bugs between search results and favorites?",
    answer: "Maintain a single source of truth for the raw courses data and favorite IDs in state. Derive the filtered results on the fly during render based on the search query and level filter, and pass down a toggle callback prop.",
  },
  interviewQuestion: {
    question: "How would you architect a complete React feature connecting components, state lifting, controlled inputs, and async data?",
    answer: "Structure into container and presentation layers: 1) The container manages async loading and error states with `useEffect` and `AbortController`, 2) Controlled inputs capture search terms in state, 3) Filtered items are computed as derived state on every render, 4) Pure presentation components (`CourseCard`) receive read-only props and notify parents via callbacks (`onToggleFavorite`), and 5) Persistent state can be cleanly abstracted into a custom hook.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Architecture", icon: "🧠" },
    { id: "part2", label: "Component Tree Blueprint", icon: "⚙️" },
    { id: "part3", label: "Step-by-Step Build Walkthrough", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Production Checklist", icon: "🛡️" },
    { id: "part5", label: "Interactive Capstone App", icon: "💻" },
    { id: "part6", label: "Summary & Graduation", icon: "🎓" },
    { id: "part7", label: "Capstone Knowledge Check", icon: "🎯" },
  ],
  part1: {
    title: "The Capstone Project Architecture",
    bigPicture: "The Capstone Project ties together every concept learned throughout this track: reusable components, JSX expressions, props and data flow, state with useState/useReducer, controlled inputs, conditional rendering, list keys, useEffect fetching, and user-centric testing.",
    codeSnippet: `// Suggested Final Practice: Modular Course Explorer
import { useState, useMemo } from "react";

// 1. Reusable CourseCard with Props & Callbacks
export function CourseCard({ course, isFavorite, onToggleFavorite }) {
  return (
    <article className="course-card">
      <div className="card-header">
        <h3>{course.title}</h3>
        <button onClick={() => onToggleFavorite(course.id)}>
          {isFavorite ? "★ Favorited" : "☆ Favorite"}
        </button>
      </div>
      <p>Level: <span className="badge">{course.level}</span></p>
    </article>
  );
}

// 2. Main Dashboard Component
export default function CourseExplorer() {
  const [courses, setCourses] = useState(INITIAL_COURSES);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState("All");
  const [favorites, setFavorites] = useState(new Set());

  // 3. Derived State: Instant filtering without extra state
  const visibleCourses = useMemo(() => {
    return courses.filter(c => {
      const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
      const matchesLevel = levelFilter === "All" || c.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [courses, search, levelFilter]);

  function handleToggleFavorite(id) {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <main>
      <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search..." />
      <div className="grid">
        {visibleCourses.map(course => (
          <CourseCard
            key={course.id}
            course={course}
            isFavorite={favorites.has(course.id)}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </main>
  );
}`,
    analogy: "Think of an orchestra. Each musician (component) plays their own instrument. The conductor (parent dashboard) keeps the tempo and sheet music (state), signaling changes to everyone simultaneously so the performance is harmonious.",
    breakdownTitle: "Capstone Specifications",
    breakdownItems: [
      {
        title: "1. Presentation Layer",
        desc: "Reusable CourseCard component accepting title, level, and isFavorite props.",
      },
      {
        title: "2. Controlled Search & Filters",
        desc: "Controlled text input and level dropdown updating React state on every keystroke.",
      },
      {
        title: "3. Derived Filtering",
        desc: "Calculating matching courses on the fly during render, avoiding duplicated state.",
      },
      {
        title: "4. Callbacks & Immutability",
        desc: "Toggling favorites using immutable state updates and passing callbacks down cleanly.",
      },
    ],
  },
  part2: {
    title: "Component Tree Hierarchy",
    rule: {
      title: "The Architecture Blueprint",
      content: "Keep state at the highest necessary parent (`CourseExplorer`), derive all filtered views on the fly, and keep leaf components (`CourseCard`, `FilterBar`) strictly controlled and stateless.",
    },
    cards: [
      {
        number: "01",
        tag: "SINGLE SOURCE",
        title: "Centralized State",
        description: "The parent owns the raw course list and active filter strings. No child maintains out-of-sync local mirrors.",
        color: "purple",
      },
      {
        number: "02",
        tag: "REUSABILITY",
        title: "Pure Presentation Cards",
        description: "CourseCard has no hardcoded network calls or global dependencies. It can be rendered anywhere in the app.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "RESPONSIVE UI",
        title: "Instant UI Feedback",
        description: "Instantaneous filtering and visual favorite stars give users immediate tactile feedback.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Step-by-Step Build Walkthrough",
    intro: "Step-by-step implementation pattern for the Capstone Explorer:",
    points: [
      {
        title: "Step 1 & 2: Controlled Search with Derived Results",
        content: "By avoiding a separate filteredCourses useState variable, you eliminate every possibility of the results being out of sync with the search bar.",
        codeSnippet: `const [search, setSearch] = useState("");
const [selectedLevel, setSelectedLevel] = useState("All");

// Derived list on every render
const filteredCourses = courses.filter(c => {
  const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
  const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
  return matchesSearch && matchesLevel;
});`,
      },
      {
        title: "Step 3: Favorite Set Toggle",
        content: "Updating the array immutably with .filter() and [...prev, id] triggers an instant re-render with updated star icons.",
        codeSnippet: `const [favoriteIds, setFavoriteIds] = useState([]);

function toggleFavorite(id) {
  setFavoriteIds(prev => 
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );
}`,
      },
    ],
  },
  part4: {
    title: "Production Readiness Checklist",
    bad: {
      title: "Forgetting Empty Search State",
      code: `// ❌ Rendering blank area with no message when search yields 0 items
{filteredCourses.map(c => <CourseCard key={c.id} course={c} />)}`,
      explanation: "Users might think the application is frozen if an empty search simply renders nothing without explanation.",
    },
    good: {
      title: "Explicit Empty State Feedback",
      code: `// ✅ Clear empty state message for the user
{filteredCourses.length === 0 ? (
  <p className="empty-message">No courses found matching "{search}".</p>
) : (
  filteredCourses.map(c => <CourseCard key={c.id} course={c} />)
)}`,
      explanation: "Always provide feedback when a filter produces zero results so users know the search succeeded with zero matches.",
    },
    whyItMatters: "Polished empty states and robust list keys prevent silent UX failures and ensure smooth React reconciliation.",
  },
  part5: {
    title: "Interactive Capstone App",
    intro: "Try searching 'hook', filtering by 'Intermediate', and toggling favorite stars. Notice how seamlessly search, filters, and favorites work together without desynchronization.",
    starterCode: `import { useState, useMemo } from "react";

const INITIAL_COURSES = [
  { id: "c1", title: "React Fundamentals & Mental Model", level: "Beginner" },
  { id: "c2", title: "State Management with Hooks", level: "Intermediate" },
  { id: "c3", title: "Asynchronous UI & AbortController", level: "Advanced" },
  { id: "c4", title: "Custom Hooks & Architecture", level: "Intermediate" },
  { id: "c5", title: "Component Testing Fundamentals", level: "Beginner" },
];

function CourseCard({ course, isFavorite, onToggle }) {
  return (
    <div style={{
      border: "1px solid #e2e8f0",
      borderRadius: "8px",
      padding: "12px",
      margin: "8px 0",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: isFavorite ? "#f0fdf4" : "#ffffff"
    }}>
      <div>
        <h4 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>{course.title}</h4>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Level: <strong>{course.level}</strong></span>
      </div>
      <button
        onClick={() => onToggle(course.id)}
        style={{
          padding: "6px 12px",
          backgroundColor: isFavorite ? "#16a34a" : "#f1f5f9",
          color: isFavorite ? "#ffffff" : "#0f172a",
          border: "1px solid #cbd5e1",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        {isFavorite ? "★ Saved" : "☆ Save"}
      </button>
    </div>
  );
}

export default function App() {
  const [courses] = useState(INITIAL_COURSES);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const filteredCourses = useMemo(() => {
    return courses.filter(c => {
      const matchQuery = c.title.toLowerCase().includes(query.toLowerCase());
      const matchLevel = level === "All" || c.level === level;
      return matchQuery && matchLevel;
    });
  }, [courses, query, level]);

  function handleToggle(id) {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }

  return (
    <div style={{ padding: "16px", fontFamily: "sans-serif", maxWidth: "600px" }}>
      <h2>React Capstone: Course Explorer</h2>
      <p style={{ color: "#64748b" }}>Favorites saved: <strong>{favorites.length}</strong></p>

      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search courses..."
          style={{ flex: 1, padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
        />
        <select
          value={level}
          onChange={e => setLevel(e.target.value)}
          style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
        >
          <option value="All">All Levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </div>

      <div>
        {filteredCourses.length === 0 ? (
          <p style={{ color: "#94a3b8" }}>No courses found matching "{query}".</p>
        ) : (
          filteredCourses.map(course => (
            <CourseCard
              key={course.id}
              course={course}
              isFavorite={favorites.includes(course.id)}
              onToggle={handleToggle}
            />
          ))
        )}
      </div>
    </div>
  );
}`,
  },
  part6: {
    title: "Summary & Graduation",
    takeaways: [
      {
        title: "Declarative UI & Data Flow",
        desc: "You have mastered React's declarative mental model, JSX, props, and one-way data flow.",
      },
      {
        title: "State & Derived Calculations",
        desc: "You understand state snapshots, functional updates, lifting state, and derived calculations.",
      },
      {
        title: "Hooks & Component Architecture",
        desc: "You know how to synchronize with useEffect, avoid race conditions with AbortController, organize complex logic with useReducer, and build accessible, testable components.",
      },
      {
        title: "LearnCraft React Mastery",
        desc: "Congratulations on completing the entire LearnCraft React Curriculum and building modular, production-ready apps!",
      },
    ],
  },
  part7: {
    title: "Capstone Knowledge Check",
    quiz: {
      question: "Why should `filteredCourses` be calculated during render rather than kept in a separate useState?",
      options: [
        "Because React doesn't allow more than two useState calls per component",
        "Because calculating derived values during render guarantees that search results can never become out of sync with the search query",
        "Because arrays cannot be stored in useState",
        "Because useMemo makes JavaScript compile faster",
      ],
      correctIndex: 1,
      explanation: "Deriving values directly during render eliminates synchronization bugs and avoids redundant re-renders.",
    },
  },
};
