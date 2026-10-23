import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js04ComparisonsAndStrictEqualityContent: StandardLessonContent = {
  slug: "js04-comparisons-and-strict-equality",
  code: "JS-04",
  title: "Comparisons and ===",
  subtitle: "Use strict equality to compare values predictably without accidental type coercion.",
  difficulty: "Moderate",
  scenario: {
    question: "A form sends a user ID as the string \"42\", but the selected record has the number 42. Why might id === selectedId return false?",
    answer: "One value is a string and the other is a number. Convert the ID to the intended type before comparing, rather than changing === to == without understanding the data.",
  },
  interviewQuestion: {
    question: "Why is === usually preferred over ==?",
    answer: "=== does not convert the values to another type before comparing them, so its result is usually easier to predict.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Comparisons and ===",
    bigPicture: "Comparisons check how values relate. Use === for strict equality because it compares values without converting their types. Avoid == unless you understand and specifically want its type-conversion behavior.",
    codeSnippet: "console.log(5 === 5);   // true\nconsole.log(5 === \"5\"); // false\nconsole.log(5 == \"5\");  // true",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "=== Operator",
            "desc": "Checks both value and type without converting anything. Highly predictable."
      },
      {
            "title": "== Coercion",
            "desc": "Converts types behind the scenes (e.g., \"5\" == 5 is true), leading to subtle bugs."
      },
      {
            "title": "Explicit Conversion",
            "desc": "Convert values intentionally (e.g., Number(id) === selectedId) instead of relying on ==."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Comparison Rule",
      content: "Always default to === (strict equality) and !== (strict inequality) to avoid silent type-coercion bugs.",
    },
    cards: [
      {
            "number": "01",
            "tag": "STRICT EQUALITY",
            "title": "=== Operator",
            "description": "Checks both value and type without converting anything. Highly predictable.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "LOOSE EQUALITY",
            "title": "== Coercion",
            "description": "Converts types behind the scenes (e.g., \"5\" == 5 is true), leading to subtle bugs.",
            "color": "amber"
      },
      {
            "number": "03",
            "tag": "BEST PRACTICE",
            "title": "Explicit Conversion",
            "description": "Convert values intentionally (e.g., Number(id) === selectedId) instead of relying on ==.",
            "color": "emerald"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Strict equality checks type and value",
            "content": "5 === \"5\" evaluates to false because a number is not a string. This avoids confusing mistakes."
      },
      {
            "title": "2. Loose equality converts types silently",
            "content": "== attempts automatic type coercion, causing surprising results like false == 0 being true."
      },
      {
            "title": "3. Convert types explicitly",
            "content": "If an ID arrives as text from a form, convert it with Number(id) or keep both as strings."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const formId = \"42\";\nconst dbId = 42;\n\n// Using == hides the type difference:\nif (formId == dbId) {\n  console.log(\"Matched via loose coercion\");\n}",
      explanation: "Relying on == can lead to unexpected edge cases like \"\" == 0 and null == undefined being true.",
    },
    good: {
      title: "Recommended Approach",
      code: "const formId = \"42\";\nconst dbId = 42;\n\n// Explicit conversion with strict equality:\nif (Number(formId) === dbId) {\n  console.log(\"Safe strict match\");\n}",
      explanation: "Explicit type conversion clarifies your exact intent and avoids accidental matches.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-04: Comparisons and ===\nconst inputVal = \"10\";\nconst targetVal = 10;\n\nconsole.log(\"Strict === :\", inputVal === targetVal);\nconsole.log(\"Explicit strict === :\", Number(inputVal) === targetVal);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why is === preferred over == in JavaScript?",
      options: ["=== runs twice as fast in the V8 engine","=== compares values without converting their types, making behavior predictable","=== works only on numbers and strings","== is deprecated and causes runtime syntax errors in modern browsers"],
      correctIndex: 1,
      explanation: "=== does not perform type coercion, ensuring that two values must share both the same type and the same value to be considered equal.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Strict Equality",
            "desc": "=== verifies type and value without automatic coercion."
      },
      {
            "title": "Avoid Loose Equality",
            "desc": "== introduces surprising coercion rules that cause hard-to-find bugs."
      },
      {
            "title": "Explicit Conversion",
            "desc": "Convert types manually with Number(), String(), or Boolean() when needed."
      }
],
    nextLessonPreview: {
      title: "Conditions and Truthy/Falsy Values",
      desc: "Understand how JavaScript evaluates conditions and which values count as false.",
    },
  },
};
