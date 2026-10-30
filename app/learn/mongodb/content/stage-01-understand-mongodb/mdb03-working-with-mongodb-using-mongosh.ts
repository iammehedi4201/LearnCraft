import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb03WorkingWithMongodbUsingMongoshContent: StandardLessonContent = {
  slug: "mdb03-working-with-mongodb-using-mongosh",
  code: "MDB-03",
  title: "Working with MongoDB Using mongosh",
  subtitle: "Use the interactive MongoDB Shell (mongosh) and MongoDB Compass to manage databases and collections.",
  difficulty: "Easy",
  scenario: {
    question: "You ran `use learncraft`, but the database does not appear in `show dbs`. Did the command fail?",
    answer: "Not necessarily. Selecting a database does not create stored data. MongoDB normally shows the database after data has been written to it.",
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
    title: "Working with MongoDB Using mongosh",
    bigPicture:
      "`mongosh` is a command-line tool for working with MongoDB. You can use it to select a database, view collections, and run queries.",
    codeSnippet: `// Illustrative mongosh commands:
show dbs
use learncraft
show collections
db.courses.find()`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. show dbs",
        desc: "`show dbs` lists databases that contain data.",
      },
      {
        title: "2. use learncraft",
        desc: "`use learncraft` switches the shell to the `learncraft` database. It does not necessarily create the database immediately.",
      },
      {
        title: "3. show collections",
        desc: "`show collections` lists the collections in the selected database.",
      },
      {
        title: "4. db.courses.find()",
        desc: "`db.courses.find()` reads documents from the `courses` collection.",
      },
    ],
  },
  part2: {
    title: "Lazy Creation & Developer Tools",
    intro:
      "MongoDB creates a database and collection when data is first written if they do not already exist. You can also use MongoDB Compass, a graphical tool that lets you view documents and run queries without typing every command. The commands in these lessons use `mongosh` because they make MongoDB operations clear.",
    rule: {
      title: "Lazy Creation Rule",
      content:
        "MongoDB defers physical allocation of databases and collections on disk until the first document is actually inserted.",
    },
    cards: [
      {
        number: "01",
        tag: "CLI",
        title: "mongosh Interactive Shell",
        color: "emerald",
        description:
          "Full Node.js-powered REPL shell for querying, administering, and scripting database operations.",
      },
      {
        number: "02",
        tag: "GUI",
        title: "MongoDB Compass",
        color: "cyan",
        description:
          "Official GUI tool for visual document inspection, schema analysis, and index visualization.",
      },
      {
        number: "03",
        tag: "LIFECYCLE",
        title: "On-Demand Creation",
        color: "purple",
        description:
          "Databases and collections spring into existence the moment you insert your first document.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Navigating databases with mongosh in development environments:",
    points: [
      {
        title: "Switching Databases",
        content:
          "Running `use learncraft` sets the shell's active context pointer (`db`). Future collection references like `db.courses` point directly to that database.",
      },
      {
        title: "Empty Database Behavior",
        content:
          "If a database has 0 collections or 0 documents, `show dbs` omits it by design to save storage and keep the listing clean.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Panicking when an empty database does not show up in `show dbs` immediately after `use <dbname>`.",
    bad: {
      title: "Assuming Database Creation Failed",
      code: `use learncraft;
show dbs;
// learncraft is NOT listed! Developer panics and assumes mongosh crashed.`,
      explanation:
        "MongoDB does not allocate files for empty databases until you write at least one record.",
    },
    good: {
      title: "Writing a First Document to Persist Database",
      code: `use learncraft;
db.courses.insertOne({ title: "First Course" });
show dbs;
// learncraft now appears with its allocated storage size!`,
      explanation:
        "Once a write operation occurs, MongoDB allocates the namespace on disk and displays it in `show dbs`.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. The snippet below simulates mongosh context switching and lazy creation:",
    starterCode: `// Simulating mongosh shell state in JavaScript
class MongoShell {
  constructor() {
    this.currentDb = "test";
    this.dbs = { test: { users: [ { name: "Admin" } ] } };
  }

  use(dbName) {
    this.currentDb = dbName;
    console.log("switched to db " + dbName);
  }

  showDbs() {
    return Object.keys(this.dbs).filter(name => Object.keys(this.dbs[name]).length > 0);
  }
}

const sh = new MongoShell();
console.log("Initial dbs:", sh.showDbs());
sh.use("learncraft");
console.log("Dbs before write (lazy allocation):", sh.showDbs());`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "You ran `use learncraft`, but the database does not appear in `show dbs`. Did the command fail?",
      options: [
        "Not necessarily. Selecting a database does not create stored data. MongoDB normally shows the database after data has been written to it.",
        "Yes, the command failed because MongoDB only supports databases named 'test'.",
        "Yes, `use` requires root administrative permissions to switch namespaces.",
        "No, `show dbs` only displays databases that have over 1 million records.",
      ],
      correctIndex: 0,
      explanation:
        "MongoDB creates databases and collections lazily on disk upon the first document write, so empty databases are omitted from `show dbs`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "mongosh Navigation",
        desc: "Use `show dbs`, `use <dbname>`, `show collections`, and `db.<collection>.find()` for standard shell workflow.",
      },
      {
        title: "Lazy Namespace Allocation",
        desc: "Databases and collections are created on-demand as soon as the first document is inserted.",
      },
      {
        title: "Developer Tool Options",
        desc: "Use `mongosh` for fast terminal queries and scripts, or MongoDB Compass for visual exploration.",
      },
    ],
    nextLessonPreview: {
      title: "Lesson 4: Insert Documents",
      desc: "Move into Part 2: Create, Find, Change, and Delete Data by mastering insertOne() and insertMany().",
    },
  },
};

