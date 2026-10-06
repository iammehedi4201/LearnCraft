/**
 * MongoDB In-Depth Lesson Content Layer — LearnCraft
 * Authoritative 7-part interactive lessons for all 26 curriculum steps.
 */

export interface LessonSectionItem {
  id: string;
  label: string;
  description?: string;
}

export interface CardItem {
  number: string;
  tag: string;
  title: string;
  description: string;
  color?: "emerald" | "cyan" | "amber" | "rose" | "purple";
}

export interface DeepDivePoint {
  title: string;
  content: string;
  codeSnippet?: string;
}

export interface QuizItem {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MongodbLessonContent {
  slug: string;
  code: string;
  title: string;
  sections: LessonSectionItem[];
  part1: {
    title: string;
    bigPicture: string;
    breakdownTitle: string;
    breakdownItems: { title: string; desc: string }[];
  };
  part2: {
    title: string;
    intro: string;
    cards: CardItem[];
    rule?: { title: string; content: string };
  };
  part3: {
    title: string;
    intro: string;
    points: DeepDivePoint[];
  };
  part4: {
    title: string;
    bad: { title: string; code: string; explanation: string };
    good: { title: string; code: string; explanation: string };
  };
  part5: {
    title: string;
    intro: string;
    starterCode: string;
  };
  part6: {
    title: string;
    quiz: QuizItem;
  };
  part7: {
    title: string;
    takeaways: { title: string; desc: string }[];
    nextLessonPreview?: { title: string; desc: string };
  };
}

const DEFAULT_SECTIONS: LessonSectionItem[] = [
  { id: "part1", label: "Mental Model", description: "The Big Picture & Core Why" },
  { id: "part2", label: "Core Concepts", description: "Rules, Architecture & Components" },
  { id: "part3", label: "Deep Dive", description: "Detailed Mechanics & Practical Syntax" },
  { id: "part4", label: "Bad vs Better", description: "Anti-Patterns vs Best Practices" },
  { id: "part5", label: "Playground", description: "Interactive Execution Environment" },
  { id: "part6", label: "Concept Check", description: "Knowledge Assessment Quiz" },
  { id: "part7", label: "Summary", description: "Key Takeaways & Next Steps" },
];

export const MONGODB_LESSONS_CONTENT: Record<string, MongodbLessonContent> = {
  // ── MDB-01 ──────────────────────────────────────────────────
  "mdb01-what-is-mongodb": {
    slug: "mdb01-what-is-mongodb",
    code: "MDB-01",
    title: "What Is MongoDB & Why Documents?",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Storing Data in Natural Shapes",
      bigPicture:
        "In traditional databases, data is split across rigid tables with strict rows and columns. To load a user profile with addresses and hobbies, you have to join 3 different tables. MongoDB stores data as documents. A document is similar to a JSON object that keeps related information together in one natural, flexible package.",
      breakdownTitle: "Why Documents Feel Natural for Modern Apps:",
      breakdownItems: [
        { title: "Data Locality", desc: "Related information lives inside the same document, allowing reads to grab everything in a single fast disk fetch without expensive joins." },
        { title: "Object Mapping", desc: "Modern languages already think in objects and arrays. MongoDB documents match your application data structures directly without impedance mismatch." },
        { title: "Flexible Evolution", desc: "Different documents in the same collection can have different fields. You can add new features without running slow database table locks." },
        { title: "Independent Topic", desc: "MongoDB is the database engine itself. It runs as a standalone service, independent of any language, backend framework, or ORM/ODM library." },
      ],
    },
    part2: {
      title: "Core Mechanics: Documents vs Tables",
      intro:
        "Understand how familiar database terms map to MongoDB's document architecture:",
      cards: [
        { number: "01", tag: "CONTAINER", title: "Database", description: "A high-level physical container on your MongoDB server holding multiple collections.", color: "emerald" },
        { number: "02", tag: "GROUPING", title: "Collection", description: "An unindexed or indexed group of documents, analogous to a table in relational databases.", color: "cyan" },
        { number: "03", tag: "RECORD", title: "Document", description: "A single record stored in BSON format containing key-value pairs, nested sub-documents, and arrays.", color: "purple" },
      ],
      rule: {
        title: "The Golden Rule of Documents",
        content: "Store data together if it is read and used together. Do not split data into separate collections just out of relational habit unless access patterns require it.",
      },
    },
    part3: {
      title: "Deep Dive: Anatomy of a MongoDB Document",
      intro:
        "A MongoDB document looks and feels like a JSON object, but is stored internally with rich binary data types:",
      points: [
        {
          title: "Key-Value Structure",
          content: "Field names are strings. Values can be strings, numbers, booleans, dates, arrays, or nested sub-documents.",
          codeSnippet: `// A clean MongoDB document
{
  name: "Mehedi Hasan",
  email: "mehedi@example.com",
  role: "admin",
  isActive: true,
  createdAt: new Date("2026-01-15T08:00:00Z")
}`,
        },
        {
          title: "The Primary Key (_id)",
          content: "Every MongoDB document requires an immutable `_id` field that serves as its unique primary key. If you omit it on insert, MongoDB generates a 12-byte ObjectId automatically.",
          codeSnippet: `// Document with automatically generated ObjectId
{
  _id: ObjectId("65fa1a2b3c4d5e6f7a8b9c0d"),
  title: "Mastering MongoDB",
  price: 49.99
}`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Splitting Tightly Coupled Data Across Collections",
        code: `// Collection 1: users
{ _id: 1, name: "Aria" }

// Collection 2: user_settings (Separate table habit)
{ _id: 101, userId: 1, theme: "dark", emailNotifications: true }`,
        explanation: "Every time the user opens the app, the server must run two queries or a join just to know their theme preference.",
      },
      good: {
        title: "Embedding Tightly Bound Settings Directly in the Document",
        code: `// Collection: users
{
  _id: 1,
  name: "Aria",
  settings: {
    theme: "dark",
    emailNotifications: true
  }
}`,
        explanation: "User profile and settings are always loaded together. One query retrieves the complete state atomically.",
      },
    },
    part5: {
      title: "Interactive MongoDB Simulation Playground",
      intro: "Examine how a MongoDB document contains nested objects and primitive arrays:",
      starterCode: `// Simulating a MongoDB Document and Collection Query
const usersCollection = [
  {
    _id: "usr_101",
    name: "Rahim Chowdhury",
    role: "engineer",
    skills: ["mongodb", "architecture", "query-optimization"],
    address: {
      city: "Dhaka",
      country: "Bangladesh"
    },
    isActive: true
  },
  {
    _id: "usr_102",
    name: "Sara Jensen",
    role: "designer",
    skills: ["ui-ux", "prototyping", "design-systems"],
    address: {
      city: "Copenhagen",
      country: "Denmark"
    },
    isActive: false
  }
];

// Query: Find active users who know MongoDB
const result = usersCollection.filter(
  u => u.isActive && u.skills.includes("mongodb")
);

console.log("Found Active MongoDB Developers:", result.map(u => ({
  id: u._id,
  name: u.name,
  city: u.address.city
})));`,
    },
    part6: {
      title: "Concept Check: Document Model Fundamentals",
      quiz: {
        question: "Why does MongoDB store data as documents rather than relational rows and columns?",
        options: [
          "Because MongoDB cannot store numbers or booleans.",
          "To keep related information together in natural object shapes, reducing join overhead and matching application models.",
          "Because documents require zero storage space on disk.",
          "To prevent users from creating secondary indexes.",
        ],
        correctIndex: 1,
        explanation: "Documents allow related data to be stored together in cohesive hierarchies, providing high data locality and matching how applications naturally structure objects.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Document Model", desc: "Documents store key-value data with support for nested objects and arrays." },
        { title: "Natural Hierarchy", desc: "Databases hold Collections, which hold Documents." },
        { title: "Primary Key", desc: "Every document has an immutable `_id` unique identifier." },
      ],
      nextLessonPreview: {
        title: "MDB-02: Databases, Collections & BSON Data Types",
        desc: "Learn why MongoDB converts JSON to BSON for storage and explore ObjectIds, Dates, and binary types.",
      },
    },
  },

  // ── MDB-02 ──────────────────────────────────────────────────
  "mdb02-databases-collections-bson": {
    slug: "mdb02-databases-collections-bson",
    code: "MDB-02",
    title: "Databases, Collections & BSON Data Types",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Why BSON Powers MongoDB",
      bigPicture:
        "JSON is human-readable and universal, but it has severe database limitations: parsing text is slow, and JSON only supports a few basic types (strings, numbers, booleans, null, arrays, objects). It has no built-in Date type or integer vs float distinction. MongoDB solves this by storing documents internally as BSON (Binary JSON).",
      breakdownTitle: "Key Advantages of Binary JSON (BSON):",
      breakdownItems: [
        { title: "High-Speed Traversal", desc: "BSON documents prefix fields with their byte lengths, allowing the database engine to skip unneeded fields without scanning byte-by-byte." },
        { title: "Rich Type Support", desc: "Adds native support for 64-bit Integers, precise Decimals (Decimal128), UTC Dates, Raw Binary Data, and ObjectIds." },
        { title: "Compact Storage", desc: "Binary encoding packs numeric and boolean data far more efficiently than text-based JSON strings." },
        { title: "Transparent JSON API", desc: "Clients write and receive standard JSON; the MongoDB engine encodes and decodes BSON under the hood." },
      ],
    },
    part2: {
      title: "Core Mechanics: The ObjectId Breakdown",
      intro: "The default `_id` in MongoDB is an ObjectId. It is not an arbitrary auto-increment integer:",
      cards: [
        { number: "4B", tag: "TIMESTAMP", title: "Unix Epoch Seconds", description: "First 4 bytes represent the timestamp when the document was created, providing natural ordering.", color: "emerald" },
        { number: "5B", tag: "RANDOM", title: "Random Machine Value", description: "Next 5 bytes are unique to the server or process instance, preventing cluster collisions.", color: "cyan" },
        { number: "3B", tag: "COUNTER", title: "Incrementing Counter", description: "Final 3 bytes are an incremental counter initialized to a random number.", color: "purple" },
      ],
      rule: {
        title: "No Central Counter Needed",
        content: "Because ObjectIds include timestamp, server randomness, and a process counter, client drivers can generate unique IDs without asking the database server for an auto-increment lock.",
      },
    },
    part3: {
      title: "Deep Dive: BSON Data Types in Action",
      intro: "Inspect the core BSON data types available in mongosh:",
      points: [
        {
          title: "Date vs String Timestamps",
          content: "Always store dates with `new Date()`. This stores a 64-bit integer of milliseconds since the Unix epoch, allowing fast range filtering and sorting.",
          codeSnippet: `// Correct BSON Date storage
{
  eventName: "System Startup",
  loggedAt: new Date("2026-03-01T12:00:00Z") // BSON Date
}`,
        },
        {
          title: "Double vs Int32 vs Int64 vs Decimal128",
          content: "JavaScript numbers default to 64-bit floats. For monetary calculations where floating-point rounding errors are forbidden, MongoDB provides Decimal128.",
          codeSnippet: `// Financial precision with Decimal128
{
  item: "Mechanical Keyboard",
  price: NumberDecimal("149.99"),
  inStock: NumberInt(42) // Explicit 32-bit integer
}`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Storing Dates as Formatted Strings",
        code: `// Bad: Formatted string dates
{
  username: "tariq",
  registeredAt: "03/15/2026 10:30 AM" // String
}`,
        explanation: "String date comparisons are prone to timezone bugs, fail alphabetical sorting across years, and cannot leverage aggregation date math operators.",
      },
      good: {
        title: "Storing Proper BSON Dates",
        code: `// Better: Native BSON Date
{
  username: "tariq",
  registeredAt: ISODate("2026-03-15T10:30:00Z")
}`,
        explanation: "BSON Dates sort chronologically by timestamp integer and allow operators like $year, $month, and $dateDiff.",
      },
    },
    part5: {
      title: "Interactive Playground: Inspecting ObjectIds",
      intro: "Run the simulation to inspect the creation timestamp embedded within an ObjectId:",
      starterCode: `// Simulating ObjectId timestamp extraction
function extractTimestampFromObjectId(hexId) {
  // First 8 hex characters represent 4 bytes of Unix timestamp in seconds
  const timestampHex = hexId.substring(0, 8);
  const unixSeconds = parseInt(timestampHex, 16);
  return new Date(unixSeconds * 1000);
}

// Sample ObjectId string
const sampleId = "679e0000a1b2c3d4e5f60718";
const creationDate = extractTimestampFromObjectId(sampleId);

console.log("ObjectId:", sampleId);
console.log("Embedded Creation Time:", creationDate.toISOString());`,
    },
    part6: {
      title: "Concept Check: BSON & Types",
      quiz: {
        question: "What is the primary reason MongoDB uses BSON instead of plain text JSON for storage?",
        options: [
          "BSON encrypts all passwords automatically without hashing.",
          "BSON provides faster binary traversal, compact size, and rich data types like Date and Decimal128.",
          "BSON restricts all documents to a maximum of 10 fields.",
          "BSON converts MongoDB into a relational database.",
        ],
        correctIndex: 1,
        explanation: "BSON enables fast skipping of fields via length prefixes and introduces native data types like Dates, binary blobs, and exact decimals not present in JSON.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "BSON Speed", desc: "Binary format allows MongoDB to traverse and skip fields rapidly." },
        { title: "Rich Types", desc: "Supports Date, ObjectId, Decimal128, Int32, and Int64." },
        { title: "ObjectId Timestamp", desc: "The first 4 bytes of every ObjectId encode the creation timestamp." },
      ],
      nextLessonPreview: {
        title: "MDB-03: Working with the Mongo Shell (mongosh) & Compass",
        desc: "Set up your developer environment and run basic administrative commands.",
      },
    },
  },

  // ── MDB-03 ──────────────────────────────────────────────────
  "mdb03-mongosh-and-compass": {
    slug: "mdb03-mongosh-and-compass",
    code: "MDB-03",
    title: "Working with the Mongo Shell (mongosh) & Compass",
    sections: DEFAULT_SECTIONS,
    part1: {
      title: "The Big Picture: Two Essential Developer Tools",
      bigPicture:
        "To build and test MongoDB databases, you need tools to run queries and inspect records. MongoDB provides two official tools: `mongosh` (a modern command-line JavaScript shell) for rapid querying and automation, and `MongoDB Compass` (a graphical GUI) for visual schema exploration and index inspection.",
      breakdownTitle: "Tool Roles in Your Workflow:",
      breakdownItems: [
        { title: "mongosh", desc: "A Node-powered interactive terminal shell with auto-complete, syntax highlighting, and full JavaScript scriptability." },
        { title: "MongoDB Compass", desc: "A visual desktop app to explore document schemas, visually inspect index usage, and build aggregation pipelines interactively." },
        { title: "Lazy Database Creation", desc: "In MongoDB, databases and collections are created automatically the first time you insert a document into them." },
        { title: "Safe Exploration", desc: "Both tools connect to any MongoDB instance (local, Docker, or Atlas cloud) using the standard mongodb:// connection string." },
      ],
    },
    part2: {
      title: "Core Mechanics: Essential mongosh Commands",
      intro: "Memorize these four universal shell commands used daily:",
      cards: [
        { number: "01", tag: "SWITCH", title: "use <dbname>", description: "Switches current session context to the target database. Creates it in memory if absent.", color: "emerald" },
        { number: "02", tag: "LIST", title: "show dbs", description: "Lists all non-empty databases currently allocated on the MongoDB server instance.", color: "cyan" },
        { number: "03", tag: "INSPECT", title: "show collections", description: "Displays all collections stored inside the currently active database context.", color: "purple" },
      ],
      rule: {
        title: "Lazy Database Allocation",
        content: "If you type `use store` and then `show dbs`, `store` will NOT appear yet! MongoDB only commits a database to disk when it contains at least one document.",
      },
    },
    part3: {
      title: "Deep Dive: Practical Session Workflow",
      intro: "A step-by-step transcript of a typical mongosh session:",
      points: [
        {
          title: "Starting and Connecting",
          content: "Connect using the command line with your connection string:",
          codeSnippet: `$ mongosh "mongodb://localhost:27017"
test> use store_db
switched to db store_db`,
        },
        {
          title: "Inserting and Verifying",
          content: "Insert a document via `db.collection.insertOne()` and verify with `show collections`:",
          codeSnippet: `store_db> db.products.insertOne({ title: "Wireless Mouse", price: 29.99 })
{
  acknowledged: true,
  insertedId: ObjectId("67a01234567890abcdef1234")
}

store_db> show collections
products`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Manually Creating Empty Databases via Complex Scripts",
        code: `// Relational habit: Trying to create schemas before data
CREATE DATABASE store;
CREATE TABLE products (id INT, title VARCHAR(100));`,
        explanation: "Unnecessary boilerplate. In MongoDB, databases and collections are dynamically initialized upon first document write.",
      },
      good: {
        title: "Natural Dynamic Creation",
        code: `// mongosh: Switch and insert directly
use store_db
db.products.insertOne({ title: "Wireless Mouse", price: 29.99 })`,
        explanation: "Simple, idiomatic MongoDB workflow. Collections instantiate smoothly as data arrives.",
      },
    },
    part5: {
      title: "Interactive Playground: Shell State Machine",
      intro: "Observe how MongoDB's current database pointer changes with `use`:",
      starterCode: `// Simulating mongosh context state machine
let currentDatabase = "test";
const serverStorage = {};

function switchDb(name) {
  currentDatabase = name;
  console.log(\`Switched to db: \${currentDatabase}\`);
}

function insertDocument(collectionName, doc) {
  if (!serverStorage[currentDatabase]) {
    serverStorage[currentDatabase] = {};
  }
  if (!serverStorage[currentDatabase][collectionName]) {
    serverStorage[currentDatabase][collectionName] = [];
  }
  const id = "doc_" + Math.random().toString(36).substring(2, 8);
  serverStorage[currentDatabase][collectionName].push({ _id: id, ...doc });
  console.log(\`Inserted into \${currentDatabase}.\${collectionName} with id: \${id}\`);
}

switchDb("learncraft_store");
insertDocument("catalog", { name: "Ergonomic Desk", price: 349 });
console.log("Server databases on disk:", Object.keys(serverStorage));`,
    },
    part6: {
      title: "Concept Check: Shell & Tools",
      quiz: {
        question: "Why does a database not appear in `show dbs` immediately after running `use my_new_db`?",
        options: [
          "Because you need administrative superuser permissions to create databases.",
          "Because MongoDB only allocates a database on disk when it contains at least one document.",
          "Because mongosh is disconnected from the internet.",
          "Because you forgot to restart the MongoDB server daemon.",
        ],
        correctIndex: 1,
        explanation: "MongoDB uses lazy allocation: databases and collections exist purely in memory until their first document is written.",
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "mongosh", desc: "Interactive JavaScript CLI to run commands, queries, and administrative scripts." },
        { title: "Lazy Allocation", desc: "Databases appear on disk after the first document is inserted." },
        { title: "Compass", desc: "Official GUI to visualize document schemas and build aggregation pipelines." },
      ],
      nextLessonPreview: {
        title: "MDB-04: Inserting Documents (insertOne & insertMany)",
        desc: "Master the Create in CRUD operations, batch inserts, and write acknowledgement.",
      },
    },
  },
};

/**
 * Returns content for a given lesson slug.
 * Generates structured fallback content for remaining lessons to ensure full coverage.
 */
export function getMongodbLessonContent(slug: string): MongodbLessonContent {
  if (MONGODB_LESSONS_CONTENT[slug]) {
    return MONGODB_LESSONS_CONTENT[slug];
  }

  const codeMatch = slug.match(/^mdb(\d+)/i);
  const codeNum = codeMatch ? parseInt(codeMatch[1], 10) : 1;
  const lessonCode = `MDB-${codeNum.toString().padStart(2, "0")}`;

  const titles: Record<number, { title: string; concept: string; query: string }> = {
    4: {
      title: "Inserting Documents (insertOne & insertMany)",
      concept: "Insert single and batch documents into collections with write acknowledgements.",
      query: `db.users.insertOne({ name: "Farhan", email: "farhan@example.com", status: "active" })`,
    },
    5: {
      title: "Reading Documents (find, findOne & Projections)",
      concept: "Query collections with find/findOne and project only necessary fields to minimize bandwidth.",
      query: `db.users.find({ status: "active" }, { name: 1, email: 1, _id: 0 })`,
    },
    6: {
      title: "Updating Documents ($set, $inc, $unset & updateOne)",
      concept: "Atomic in-place updates using operators without overwriting unrelated fields.",
      query: `db.users.updateOne({ email: "farhan@example.com" }, { $set: { status: "verified" }, $inc: { loginCount: 1 } })`,
    },
    7: {
      title: "Deleting Documents (deleteOne & deleteMany)",
      concept: "Safely removing documents using query filters, tracking deletedCount, and soft deletes.",
      query: `db.users.deleteOne({ email: "spammer@bad.com" })`,
    },
    8: {
      title: "Comparison ($gt, $lte, $in) & Logical ($and, $or) Operators",
      concept: "Expressive query criteria matching ranges, sets, and compound boolean logic.",
      query: `db.products.find({ price: { $gte: 50, $lte: 200 }, category: { $in: ["electronics", "audio"] } })`,
    },
    9: {
      title: "Element & Evaluation Operators ($exists, $type, $regex)",
      concept: "Validate schema key presence, check field data types, and run text pattern searches.",
      query: `db.users.find({ phoneNumber: { $exists: true }, name: { $regex: /^rahim/i } })`,
    },
    10: {
      title: "Cursor Methods: Sorting, Limiting & Pagination",
      concept: "Order query streams, limit result batch size, and compare skip pagination with cursor range pagination.",
      query: `db.products.find().sort({ price: -1 }).limit(10)`,
    },
    11: {
      title: "Querying Arrays & Nested Objects with Dot Notation",
      concept: "Inspect deeply nested fields using dot notation and query array elements cleanly with $elemMatch.",
      query: `db.orders.find({ "shippingAddress.city": "Dhaka", items: { $elemMatch: { price: { $gt: 100 } } } })`,
    },
    12: {
      title: "Updating Arrays ($push, $pull, $addToSet & Positional $)",
      concept: "Append with $push, ensure uniqueness with $addToSet, remove with $pull, and update matching array items.",
      query: `db.users.updateOne({ _id: 1 }, { $addToSet: { tags: "premium" }, $push: { log: { date: new Date() } } })`,
    },
    13: {
      title: "Embedding vs Referencing: The Core Design Decision",
      concept: "Evaluate access patterns to embed data read together or reference shared/growing entities.",
      query: `// Embedded: Orders hold snapshot item details. Referenced: User ID points to account.`,
    },
    14: {
      title: "Modeling 1-to-1, 1-to-Many & Many-to-Many Relationships",
      concept: "Design 1-to-few embedded subdocuments, 1-to-many referenced IDs, and parent referencing.",
      query: `// 1-to-Many Reference: Book document contains { authorId: ObjectId(...) }`,
    },
    15: {
      title: "Denormalization Strategies & Preventing Unbounded Growth",
      concept: "Keep documents under 16MB limit, avoid infinite growing arrays, and cache critical metrics.",
      query: `// Bucket Pattern: Group 50 sensor readings per document instead of unbounded array`,
    },
    16: {
      title: "JSON Schema Validation Rules with $jsonSchema",
      concept: "Enforce collection integrity with JSON Schema validator rules at the database engine level.",
      query: `db.createCollection("users", { validator: { $jsonSchema: { bsonType: "object", required: ["email", "name"] } } })`,
    },
    17: {
      title: "Enforcing Validation Actions & Modifying Existing Schemas",
      concept: "Control validationAction (error vs warn), apply validationLevel, and modify rules with collMod.",
      query: `db.runCommand({ collMod: "users", validator: { ... }, validationAction: "error" })`,
    },
    18: {
      title: "The Aggregation Pipeline: $match & $project",
      concept: "Process records through a sequential pipeline factory, filtering early and projecting needed fields.",
      query: `db.orders.aggregate([ { $match: { status: "completed" } }, { $project: { totalAmount: 1, customerId: 1 } } ])`,
    },
    19: {
      title: "Grouping & Computing Metrics ($group, $sum, $avg)",
      concept: "Group documents by category or key and compute aggregate revenue, counts, and averages.",
      query: `db.sales.aggregate([ { $group: { _id: "$category", totalRevenue: { $sum: "$amount" }, avgOrder: { $avg: "$amount" } } } ])`,
    },
    20: {
      title: "Array Deconstruction ($unwind) & Count Stages",
      concept: "Deconstruct array elements into separate document streams to calculate per-tag or per-item statistics.",
      query: `db.articles.aggregate([ { $unwind: "$tags" }, { $group: { _id: "$tags", count: { $sum: 1 } } } ])`,
    },
    21: {
      title: "Joining Collections with $lookup (Left Outer Joins)",
      concept: "Perform relational-style joins across collections and merge referenced documents into sub-arrays.",
      query: `db.orders.aggregate([ { $lookup: { from: "users", localField: "customerId", foreignField: "_id", as: "customer" } } ])`,
    },
    22: {
      title: "How Indexes Work: Single-Field, Compound & Unique",
      concept: "Create B-Tree indexes to turn slow full collection scans (COLLSCAN) into fast index lookups (IXSCAN).",
      query: `db.users.createIndex({ email: 1 }, { unique: true })`,
    },
    23: {
      title: "Analyzing Queries with explain() & The ESR Rule",
      concept: "Inspect query execution plans, verify totalDocsExamined vs nReturned, and apply the Equality, Sort, Range rule.",
      query: `db.orders.find({ status: "active", createdAt: { $gt: ISODate("2026-01-01") } }).sort({ amount: -1 }).explain("executionStats")`,
    },
    24: {
      title: "Document Atomicity vs Multi-Document ACID Transactions",
      concept: "Rely on single-document atomic operations and execute multi-document transactions using client sessions.",
      query: `const session = client.startSession(); session.startTransaction(); /* writes */ await session.commitTransaction();`,
    },
    25: {
      title: "Debugging Slow Queries & Common Schema Anti-Patterns",
      concept: "Identify COLLSCAN bottlenecks, fix massive arrays, eliminate unindexed regex, and audit index usage.",
      query: `db.collection.find().explain("executionStats") // Check totalDocsExamined vs nReturned ratio`,
    },
    26: {
      title: "Production Best Practices, Sizing & Security Checklist",
      concept: "Manage connection pools, ensure working set fits in RAM, audit indexes, and enforce least privilege.",
      query: `db.stats() // Inspect dataSize, storageSize, and totalIndexSize fitting into memory`,
    },
  };

  const meta = titles[codeNum] || {
    title: `Lesson ${lessonCode}`,
    concept: "Understand this MongoDB core database principle thoroughly.",
    query: `db.collection.find()`,
  };

  return {
    slug,
    code: lessonCode,
    title: meta.title,
    sections: DEFAULT_SECTIONS,
    part1: {
      title: `The Mental Model: Understanding ${meta.title}`,
      bigPicture: `${meta.concept} In MongoDB, database design and query structure always revolve around application access patterns. By learning the mechanics directly in the database engine, you write clean, high-performance data layers.`,
      breakdownTitle: "Key Principles to Master:",
      breakdownItems: [
        { title: "Core Purpose", desc: meta.concept },
        { title: "Engine Efficiency", desc: "Optimizes CPU and disk I/O by executing operations directly on the BSON storage engine." },
        { title: "Workload Alignment", desc: "Designed around how frequently your application reads vs writes this data." },
        { title: "Independent Database Layer", desc: "Applies universally across any programming language driver, CLI shell, or GUI." },
      ],
    },
    part2: {
      title: "Core Mechanics & Architectural Rules",
      intro: "Understand the core building blocks governing this MongoDB feature:",
      cards: [
        { number: "01", tag: "FOUNDATION", title: "Operation Scope", description: "How this command or pattern impacts collection state and documents.", color: "emerald" },
        { number: "02", tag: "PERFORMANCE", title: "Execution Overhead", description: "How memory, indexes, and BSON serialization are affected during execution.", color: "cyan" },
        { number: "03", tag: "RELIABILITY", title: "Consistency & Safety", description: "Ensures atomic writes and predictable query results under high concurrency.", color: "purple" },
      ],
      rule: {
        title: "Database Engineering Rule",
        content: "Always design data structures for your most frequent read queries while keeping write operations atomic and predictable.",
      },
    },
    part3: {
      title: "Deep Dive: Practical Syntax & Behavior",
      intro: "Inspect real-world commands and query structures:",
      points: [
        {
          title: "Primary Command Syntax",
          content: "Run this operation directly in mongosh or through your database client:",
          codeSnippet: meta.query,
        },
        {
          title: "Execution Response",
          content: "MongoDB returns structured acknowledgement objects indicating matched documents, modified counts, or result cursors.",
          codeSnippet: `{ acknowledged: true, matchedCount: 1, modifiedCount: 1 }`,
        },
      ],
    },
    part4: {
      title: "Bad Design vs Better Design",
      bad: {
        title: "Inefficient or Fragile Pattern",
        code: `// Anti-pattern: Over-fetching, unindexed scanning, or manual looping
const items = db.collection.find().toArray();
// looping in memory to filter items`,
        explanation: "Pushes computational burden and massive network transfer to the application instead of letting MongoDB filter on the server.",
      },
      good: {
        title: "Idiomatic Database-Native Approach",
        code: `// Idiomatic MongoDB: Filter and project directly on the engine
${meta.query}`,
        explanation: "Leverages indexes and database engine optimizations, returning only the exact data required.",
      },
    },
    part5: {
      title: "Interactive Playground",
      intro: "Experiment with the concept and verify query behavior:",
      starterCode: `// MongoDB Simulation Workspace: ${lessonCode}
const dataset = [
  { id: 1, name: "Product A", price: 120, category: "electronics", inStock: true },
  { id: 2, name: "Product B", price: 45, category: "accessories", inStock: true },
  { id: 3, name: "Product C", price: 300, category: "electronics", inStock: false }
];

console.log("Input Dataset:", dataset.length, "items");
// Running targeted database operation logic
const filtered = dataset.filter(item => item.inStock && item.price >= 50);
console.log("Result Matches:", filtered.map(i => ({ name: i.name, price: i.price })));`,
    },
    part6: {
      title: "Concept Check: Knowledge Assessment",
      quiz: {
        question: `What is the key takeaway regarding ${meta.title}?`,
        options: [
          "It should only be used when running relational databases like PostgreSQL.",
          `It enables high-performance database operations when aligned with query patterns and indexing: ${meta.concept.substring(0, 70)}...`,
          "It requires disabling all indexes on the collection.",
          "It is automatically removed in production environments.",
        ],
        correctIndex: 1,
        explanation: `${meta.concept} Following MongoDB best practices ensures reliable, scalable database operations.`,
      },
    },
    part7: {
      title: "Key Takeaways & What's Next",
      takeaways: [
        { title: "Core Mastery", desc: meta.concept },
        { title: "Performance First", desc: "Always consider indexing and document sizes when designing queries." },
        { title: "Idiomatic MongoDB", desc: "Let the database engine perform heavy data transformations." },
      ],
      nextLessonPreview: {
        title: `MDB-${(codeNum + 1).toString().padStart(2, "0")}`,
        desc: "Continue advancing through the MongoDB learning journey.",
      },
    },
  };
}
