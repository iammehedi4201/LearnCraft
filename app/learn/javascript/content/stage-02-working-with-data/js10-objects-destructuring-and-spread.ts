import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js10ObjectsDestructuringAndSpreadContent: StandardLessonContent = {
  slug: "js10-objects-destructuring-and-spread",
  code: "JS-10",
  title: "Objects, Destructuring, and Spread",
  subtitle: "Group properties into objects, unpack them with destructuring, and clone them with spread.",
  difficulty: "Moderate",
  scenario: {
    question: "You need to update a user's city in UI state without changing the existing object directly. What could you do?",
    answer: "Create a new object with { ...user, city: 'Sylhet' }. This keeps the old object's city unchanged. Remember that this is a shallow copy, so nested objects need extra care.",
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
    title: "Objects, Destructuring, and Spread",
    bigPicture: "Objects group related information into named properties. Destructuring takes properties out of an object, while the spread syntax (...) copies enumerable properties into a new object.",
    codeSnippet: "const user = { name: \"Rina\", city: \"Dhaka\" };\nconst { name } = user;\n\nconst updatedUser = { ...user, city: \"Sylhet\" };\n\nconsole.log(name);             // Rina\nconsole.log(updatedUser.city); // Sylhet\nconsole.log(user.city);        // Dhaka",
    breakdownTitle: "Core Foundations",
    breakdownItems: [
      {
            "title": "Destructuring",
            "desc": "const { name } = user extracts property values cleanly into local variables."
      },
      {
            "title": "Spread Operator",
            "desc": "{ ...user, city: \"Sylhet\" } shallow-copies properties and overrides specified fields."
      },
      {
            "title": "Shallow Copies",
            "desc": "Spread only copies top-level properties; nested objects remain shared by reference."
      }
],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "Immutability with Spread",
      content: "Use { ...obj, prop: newValue } to update object state without mutating the original object.",
    },
    cards: [
      {
            "number": "01",
            "tag": "EXTRACTION",
            "title": "Destructuring",
            "description": "const { name } = user extracts property values cleanly into local variables.",
            "color": "purple"
      },
      {
            "number": "02",
            "tag": "CLONING",
            "title": "Spread Operator",
            "description": "{ ...user, city: \"Sylhet\" } shallow-copies properties and overrides specified fields.",
            "color": "cyan"
      },
      {
            "number": "03",
            "tag": "CAUTION",
            "title": "Shallow Copies",
            "description": "Spread only copies top-level properties; nested objects remain shared by reference.",
            "color": "amber"
      }
],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how to think about this in everyday code, followed by a realistic scenario:",
    points: [
      {
            "title": "1. Group related data into properties",
            "content": "An object represents a single entity, like a user profile or a product with id, name, and price."
      },
      {
            "title": "2. Destructuring unpacks properties cleanly",
            "content": "Instead of writing user.name and user.email repeatedly, const { name, email } = user grabs both directly."
      },
      {
            "title": "3. Spread creates shallow copies",
            "content": "The ... spread operator copies existing fields into a new object so you can change properties safely without affecting the original."
      }
],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Common Mistake",
      code: "const user = { name: \"Rina\", city: \"Dhaka\" };\n// Direct mutation in state management:\nuser.city = \"Sylhet\"; // Overwrites original object directly!",
      explanation: "Directly mutating objects can break UI state detection in libraries like React.",
    },
    good: {
      title: "Recommended Approach",
      code: "const user = { name: \"Rina\", city: \"Dhaka\" };\nconst updatedUser = { ...user, city: \"Sylhet\" };\nconsole.log(user.city); // \"Dhaka\"\nconsole.log(updatedUser.city); // \"Sylhet\"",
      explanation: "Spread creates a fresh object with the new city while preserving the original unchanged.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Practice this concept directly in the browser playground:",
    starterCode: "// JS-10: Objects, Destructuring, and Spread\nconst settings = { theme: \"dark\", notifications: true };\nconst { theme } = settings;\nconst updated = { ...settings, theme: \"light\" };\n\nconsole.log(\"Original theme:\", theme);\nconsole.log(\"Updated theme:\", updated.theme);",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the effect of const updated = { ...user, status: \"active\" }?",
      options: ["It mutates user.status to \"active\"","It creates a new shallow copy of user with status overridden to \"active\"","It deletes all existing properties from user","It deeply freezes the user object"],
      correctIndex: 1,
      explanation: "Spread creates a new object containing all properties of user, with status set or updated to \"active\", leaving the original user unchanged.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
            "title": "Concise Extraction",
            "desc": "Destructuring pulls named properties into scope."
      },
      {
            "title": "State Updates",
            "desc": "Spread allows non-destructive property modifications."
      },
      {
            "title": "Shallow Nature",
            "desc": "Nested objects still share references unless copied individually."
      }
],
    nextLessonPreview: {
      title: "Primitive Values vs. Object References",
      desc: "Understand how memory references work and why modifying objects can affect other variables.",
    },
  },
};
