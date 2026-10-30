import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb11EmbeddingVsReferencingRelatedDataContent: StandardLessonContent = {
  slug: "mdb11-embedding-vs-referencing-related-data",
  code: "MDB-11",
  title: "Embedding vs. Referencing Related Data",
  subtitle: "Choose between embedded documents (denormalization) and referenced ObjectId links (normalization).",
  difficulty: "Difficult",
  scenario: {
    question: "A course page always shows a small instructor summary. Should you embed the instructor summary or reference a separate instructor document?",
    answer: "Embedding a small summary can work well because the page reads it with the course. If the full instructor record is shared and updated separately by many courses, use a reference instead.",
  },
  interviewQuestion: {
    question: "When would you embed data and when would you use references?",
    answer: "I embed data when related information is usually read together and is a good fit inside the parent document. I use references when the data is shared, large, or managed separately. I decide based on how the application reads and updates the data.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "Real-World Scenarios & Practice", tag: "SCENARIOS & PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Code Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Embedding vs. Referencing Related Data",
    bigPicture:
      "When two kinds of data are related, you need to decide whether to put them in one document or keep them in separate documents and link them.\n\nThere is no rule that every relationship must use embedding or every relationship must use references. MongoDB data modeling should follow how the application uses the data.",
    codeSnippet: `// Option 1: Embedding (illustrative)
{
  title: "React Basics",
  instructor: {
    name: "Rina",
    city: "Dhaka"
  }
}

// Option 2: Referencing
// In 'courses' collection:
{
  title: "React Basics",
  instructorId: ObjectId("65a000000000000000000010")
}

// In 'instructors' collection:
{
  _id: ObjectId("65a000000000000000000010"),
  name: "Rina"
}`,
    breakdownTitle: "How to choose step by step",
    breakdownItems: [
      {
        title: "1. Read together",
        desc: "Ask whether the data is usually read together.",
      },
      {
        title: "2. Size and containment",
        desc: "Ask whether the related data is small and belongs naturally to its parent.",
      },
      {
        title: "3. Shared entities",
        desc: "Ask whether many documents need to share the same related record.",
      },
      {
        title: "4. Frequency of change",
        desc: "Consider how often each piece of data changes.",
      },
      {
        title: "5. Workload alignment",
        desc: "Choose the structure that fits the application's common queries and updates.",
      },
    ],
  },
  part2: {
    title: "Trade-offs: Embedding vs Referencing",
    intro:
      "Embedding gives faster single-disk reads and atomic updates. Referencing prevents duplicate data across documents and avoids hitting MongoDB's 16MB document size limit.",
    rule: {
      title: "Data Modeling Decision Rule",
      content:
        "Embed when data is 1-to-few, bounded in size, and read together. Reference when relationships are unbounded 1-to-many, frequently mutated by independent workflows, or shared across multiple collections.",
    },
    cards: [
      {
        number: "01",
        tag: "EMBEDDING",
        title: "When to Embed",
        color: "emerald",
        description:
          "Small sub-records, read alongside parent, 1-to-few, and updated atomically in a single write operation.",
      },
      {
        number: "02",
        tag: "REFERENCING",
        title: "When to Reference",
        color: "cyan",
        description:
          "Shared entities (e.g. instructors), unbounded growth (e.g. comments, logs), or records mutated frequently on their own.",
      },
      {
        number: "03",
        tag: "BOUNDARIES",
        title: "16MB Document Limit",
        color: "purple",
        description:
          "MongoDB enforces a maximum size of 16MB per BSON document. Unbounded embedding will eventually fail.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Evaluating schema designs for real application models:",
    points: [
      {
        title: "Course with Instructor Summary",
        content:
          "A course card embeds `{ instructorName: 'Rina', avatarUrl: '...' }` to render the catalog instantly without joining, but references `instructorId` for the full bio and payroll records.",
      },
      {
        title: "Order Items Snapshot",
        content:
          "Orders embed the line items and price at the exact moment of purchase so future price adjustments never alter historical order receipts.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Embedding an unbounded array of reviews, comments, or log entries directly inside a parent document, eventually exceeding the 16MB document limit.",
    bad: {
      title: "Unbounded Array Growth Inside a Single Document",
      code: `// Danger: unbounded growth antipattern
{
  title: "React Basics",
  reviews: [
    /* What happens when there are 100,000 reviews? */
    /* Exceeds 16MB document limit and crashes writes! */
  ]
}`,
      explanation:
        "Every write rewrites the whole growing document on disk, causing memory fragmentation and eventual crash at 16MB.",
    },
    good: {
      title: "Referencing Unbounded 1-to-Many Relationships",
      code: `// Safe: separate reviews collection with courseId reference
// In 'reviews' collection:
{
  _id: ObjectId("..."),
  courseId: ObjectId("65a000000000000000000001"),
  rating: 5,
  comment: "Great course!"
}`,
      explanation:
        "Each review is an independent document with no upper limit on the total number of reviews.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of embedding vs referencing queries:",
    starterCode: `// Simulating embedding vs referencing in JavaScript
// 1. Embedded model: 1 lookup gets everything
const embeddedCourse = {
  id: "c1",
  title: "React Basics",
  instructor: { id: "ins1", name: "Rina", city: "Dhaka" }
};
console.log("Embedded read (0 extra lookups):", embeddedCourse.instructor.name);

// 2. Referenced model: requires looking up instructor by ID
const referencedCourse = { id: "c1", title: "React Basics", instructorId: "ins1" };
const instructorsDb = { ins1: { name: "Rina", city: "Dhaka" } };

const instructor = instructorsDb[referencedCourse.instructorId];
console.log("Referenced read (1 extra lookup):", instructor.name);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "When would you embed data and when would you use references in MongoDB?",
      options: [
        "Embed when related data is usually read together and bounded in size; reference when data is shared, large, or managed separately.",
        "Always embed everything, because MongoDB documents have no size limit.",
        "Always reference every field in a separate collection like SQL third normal form.",
        "Never use references because MongoDB does not support ObjectIds.",
      ],
      correctIndex: 0,
      explanation:
        "Choose embedding when data is read together and bounded in size; choose referencing when data is shared, large, or updated independently.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Embedding for Locality",
        desc: "Colocate bounded 1-to-few data that is always accessed together for fast single-seek disk reads.",
      },
      {
        title: "Referencing for Scalability",
        desc: "Use references for unbounded relationships, shared entities, and independently mutating records.",
      },
      {
        title: "Application-Driven Modeling",
        desc: "Model data based on your application's actual read and write queries, not rigid theoretical rules.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 12: Schema Validation",
      desc: "Learn how to enforce collection-level data integrity and field types using $jsonSchema rules.",
    },
  },
};

