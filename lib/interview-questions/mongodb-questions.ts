import { InterviewQuestion } from "@/types/interview";

export const MONGODB_QUESTIONS: InterviewQuestion[] = [
  {
    id: "mongo-q01",
    trackKey: "mongodb",
    category: "Data Modeling",
    subtopic: "Embedding vs Referencing",
    type: "conceptual",
    difficulty: "medium",
    source: "curated",
    question: "When should you Embed documents vs Reference documents in MongoDB data modeling?",
    answer: `### Simple answer:
In MongoDB NoSQL design, you choose between **Embedding** (storing nested subdocuments inside the parent document) and **Referencing** (storing document IDs that link to other collections like a relational foreign key).

### When to Embed (Denormalize):
1. **1-to-1 or 1-to-Few relationships:** A user has 1 to 3 delivery addresses.
2. **Data accessed together:** The sub-data is always read alongside the parent (e.g. blog post with its tags).
3. **Atomic updates:** Updates to subdocuments within a single document are **atomic by default** in MongoDB without transactions.

### When to Reference (Normalize):
1. **Unbounded 1-to-Many:** A product with thousands of reviews (documents hit MongoDB's **16MB BSON size limit** if unbounded!).
2. **Many-to-Many relationships:** Students and Courses, Products and Categories.
3. **Frequently changing shared data:** If updating an author profile would require updating 10,000 embedded blog posts, reference the author instead.

### Interview answer:
Embed when data is 1-to-few, read together, and bounded in size to benefit from single-seek reads and atomic updates. Reference when relationships are unbounded 1-to-many to avoid the 16MB document limit, or for many-to-many relationships with frequently mutating shared entities.`,
    followUps: [
      "What is the 16MB document size limit in MongoDB and how does GridFS handle larger files?",
      "How does the `$lookup` aggregation stage perform cross-collection joins?",
      "What is the Extended Reference Pattern?"
    ],
    keyPoints: [
      "Embed for 1-to-few and data that is read and written atomically together",
      "Reference for unbounded 1-to-many to avoid the 16MB BSON document limit",
      "Reference for Many-to-Many and frequently mutated shared entities",
      "Embedding provides superior single-seek read performance"
    ],
    tags: ["mongodb", "nosql", "data-modeling", "embed-vs-reference", "bson"],
    relatedLessonSlug: "/learn/mongodb/mg03-schema-design-patterns",
    relatedLessonName: "MG-03: Schema Design: Embedding vs Referencing"
  },
  {
    id: "mongo-q02",
    trackKey: "mongodb",
    category: "Fundamentals",
    subtopic: "Document Model",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is MongoDB, and how does a Document Database differ from a Relational Database (SQL)?",
    answer: `### Simple answer:
MongoDB is a NoSQL document database that stores data in flexible, JSON-like documents instead of rigid relational tables with fixed columns and rows.

### Comparison Table:
| Concept | Relational (SQL) | MongoDB (NoSQL) |
|---|---|---|
| **Data Container** | Table | **Collection** |
| **Row / Record** | Row | **Document** |
| **Column** | Column | **Field** |
| **Joins** | SQL \`JOIN\` | Embedded subdocuments or \`$lookup\` |
| **Schema** | Rigid, predefined schema | Dynamic, flexible schema |
| **Scaling** | Vertical (bigger hardware) | Horizontal sharding out-of-the-box |

### Example Document:
\`\`\`json
{
  "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
  "name": "Alex",
  "skills": ["JavaScript", "React", "MongoDB"],
  "address": {
    "city": "Austin",
    "country": "USA"
  }
}
\`\`\`

### Interview answer:
MongoDB is a document-oriented NoSQL database that stores data as flexible BSON documents organized into collections. Unlike relational databases with strict table schemas and joins, MongoDB allows nested subdocuments and arrays, providing high developer velocity and easy horizontal scalability.`,
    followUps: [
      "Does MongoDB have schema validation capabilities (JSON Schema)?",
      "When is a relational SQL database a better choice than MongoDB?",
      "What is the CAP theorem and where does MongoDB sit?"
    ],
    keyPoints: [
      "Stores data as flexible BSON documents in collections",
      "Nested documents replace relational joins for 1-to-few data",
      "Dynamic schema accommodates rapid iterative product development",
      "Native support for horizontal sharding and replica sets"
    ],
    tags: ["mongodb", "nosql", "document-database", "fundamentals"],
    relatedLessonSlug: "/learn/mongodb/mg01-what-is-mongodb",
    relatedLessonName: "MG-01: Document Modeling & BSON Internals"
  },
  {
    id: "mongo-q03",
    trackKey: "mongodb",
    category: "Internals & Formats",
    subtopic: "BSON vs JSON",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is BSON in MongoDB, and how does it differ from standard JSON?",
    answer: `### Simple answer:
BSON stands for **Binary JSON**. It is a binary serialization format used by MongoDB to store documents and perform remote procedure calls.

### Why not just use JSON?
Standard JSON has several major limitations for a database:
1. **Limited Data Types:** JSON only supports string, number, boolean, array, object, and null. It lacks native types for **Date**, **Binary data**, **Decimal128** (currency), **Int32 vs Int64**, and **ObjectId**.
2. **Slow Parsing:** JSON is plain text. Finding a field at the end of a large JSON string requires parsing the entire text.
3. **BSON Advantages:**
   - **Type Rich:** Preserves exact Dates, ObjectIds, and 64-bit integers.
   - **Fast Traversal:** Includes length prefixes for fields, allowing MongoDB to skip irrelevant fields quickly without parsing them.

### Interview answer:
BSON is a binary representation of JSON used by MongoDB. It extends JSON with additional data types like Date, ObjectId, and Decimal128, and encodes field lengths in binary for fast traversal and indexing.`,
    followUps: [
      "What is MongoDB's maximum document size limit (16MB BSON)?",
      "How does EJSON (Extended JSON) represent BSON types in API responses?",
      "Why is Decimal128 important for financial calculations in MongoDB?"
    ],
    keyPoints: [
      "BSON is binary serialized JSON",
      "Adds data types missing in JSON: Date, ObjectId, Decimal128, Binary",
      "Field length headers enable fast binary seeks",
      "Maximum single document size is 16MB"
    ],
    tags: ["bson", "json", "binary", "internals", "mongodb"],
    relatedLessonSlug: "/learn/mongodb/mg01-what-is-mongodb",
    relatedLessonName: "MG-01: Document Modeling & BSON Internals"
  },
  {
    id: "mongo-q04",
    trackKey: "mongodb",
    category: "Data Modeling",
    subtopic: "ObjectId",
    type: "conceptual",
    difficulty: "easy",
    source: "curated",
    question: "What is the `_id` field in MongoDB, and what is the internal 12-byte structure of an `ObjectId`?",
    answer: `### Simple answer:
Every MongoDB document requires an \`_id\` field as its unique primary key. If you insert a document without an \`_id\`, MongoDB automatically generates a 12-byte **\`ObjectId\`**.

### 12-Byte Structure of an ObjectId:
An ObjectId consists of 12 bytes (24 hex characters):
1. **4 bytes (Timestamp):** Epoch seconds when the document was created.
2. **5 bytes (Random value):** Unique to the specific machine / process.
3. **3 bytes (Incrementing counter):** Incremental counter initialized to a random value.

\`\`\`
|  4 bytes  |    5 bytes   |  3 bytes  |
| Timestamp | Random Value |  Counter  |
\`\`\`

### Hidden Superpower: Creation Timestamps
Because the first 4 bytes contain the creation timestamp, you can extract the exact creation date directly from the \`_id\` without needing a separate \`createdAt\` column:
\`\`\`javascript
const id = new ObjectId("64f1a2b3c4d5e6f7a8b9c0d1");
console.log(id.getTimestamp()); // 2023-09-01T08:30:11.000Z
\`\`\`
Also, ObjectIds are naturally roughly sorted by creation time!

### Interview answer:
The \`_id\` field is the unique primary key in MongoDB collections. Its default type, \`ObjectId\`, is a 12-byte identifier containing a 4-byte timestamp, a 5-byte random machine/process value, and a 3-byte incrementing counter. Because of this timestamp prefix, ObjectIds are roughly sequentially sorted and allow extracting creation dates directly.`,
    followUps: [
      "Can you use custom values (like UUID or email) as the _id field instead of ObjectId?",
      "Why does MongoDB automatically create a unique index on _id?",
      "How do ObjectIds compare to UUID v4 vs UUID v7?"
    ],
    keyPoints: [
      "12-byte identifier represented as 24 hexadecimal characters",
      "Contains 4-byte timestamp + 5-byte random value + 3-byte counter",
      "Naturally ordered by creation time",
      "getTimestamp() extracts creation time without createdAt field"
    ],
    tags: ["objectId", "_id", "primary-key", "bson", "mongodb"],
    relatedLessonSlug: "/learn/mongodb/mg01-what-is-mongodb",
    relatedLessonName: "MG-01: Document Modeling & BSON Internals"
  },
  {
    id: "mongo-q05",
    trackKey: "mongodb",
    category: "CRUD Operations",
    subtopic: "Basic CRUD",
    type: "practical",
    difficulty: "easy",
    source: "curated",
    question: "How do basic CRUD operations work in MongoDB (`insertOne`, `find`, `updateOne`, `deleteOne`)?",
    answer: `### Simple answer:
MongoDB provides standard methods on collections for Create, Read, Update, and Delete operations using JSON query objects:

### 1. Create:
\`\`\`javascript
// Insert one document:
await db.collection("users").insertOne({
  name: "Sarah",
  role: "admin",
  status: "active"
});
\`\`\`

### 2. Read (Querying with operators):
\`\`\`javascript
// Find active users with age >= 18:
const users = await db.collection("users").find({
  status: "active",
  age: { $gte: 18 } // $gte = Greater Than or Equal
}).sort({ name: 1 }).limit(10).toArray();
\`\`\`

### 3. Update (Atomic Operators):
Always use update operators like **\`$set\`**, **\`$inc\`**, or **\`$push\`**; otherwise, you overwrite the entire document!
\`\`\`javascript
await db.collection("users").updateOne(
  { email: "sarah@example.com" }, // filter
  {
    $set: { status: "inactive" },  // updates specific field
    $inc: { loginCount: 1 }        // increments counter by 1
  }
);
\`\`\`

### 4. Delete:
\`\`\`javascript
await db.collection("users").deleteOne({ _id: new ObjectId(id) });
\`\`\`

### Interview answer:
MongoDB uses JSON-like query filters for CRUD. Updates must use atomic update operators like \`$set\` and \`$inc\` to mutate specific fields without replacing the whole document. Query filters support comparison operators like \`$eq\`, \`$gt\`, \`$in\`, and logical operators like \`$and\` and \`$or\`.`,
    followUps: [
      "What happens if you omit $set in an updateOne operation in older MongoDB drivers?",
      "What is upsert: true in update operations?",
      "What is findOneAndUpdate and how is it useful for queues?"
    ],
    keyPoints: [
      "insertOne and insertMany for creation",
      "find returns a cursor; chain .sort(), .limit(), .skip(), .toArray()",
      "Always use $set, $inc, $push for partial updates",
      "upsert: true inserts a new document if filter finds no match"
    ],
    tags: ["crud", "find", "updateOne", "set", "mongodb-queries"],
    relatedLessonSlug: "/learn/mongodb/mg02-crud-and-query-operators",
    relatedLessonName: "MG-02: Query Operators & Document CRUD"
  },
  {
    id: "mongo-q06",
    trackKey: "mongodb",
    category: "Indexing & Performance",
    subtopic: "Compound Indexes & ESR",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "How do Compound Indexes work in MongoDB, and what is the ESR (Equality, Sort, Range) rule?",
    answer: `### Simple answer:
A Compound Index indexes multiple fields together (e.g. \`{ status: 1, age: 1 }\`). The **ESR Rule** is the golden standard for ordering fields in a compound index to maximize query speed.

### The ESR Rule:
1. **E — Equality first:** Fields tested with exact values (\`status: "active"\`).
2. **S — Sort second:** Fields used in the \`sort()\` clause (\`sort({ score: -1 })\`).
3. **R — Range last:** Fields tested with ranges (\`age: { $gte: 21 }\`).

### Why ESR is critical:
- Placing Equality fields first narrows the index search space immediately.
- Placing the Sort field next allows MongoDB to return rows in sorted order directly from the index **without an in-memory sort** (which crashes if memory exceeds 100MB!).
- Placing Range fields last allows the scan to slice the remainder of the index.

### Example:
\`\`\`javascript
// Query:
db.users.find({ country: "US", age: { $gte: 18 } }).sort({ createdAt: -1 });

// Best Index according to ESR:
// E (country), S (createdAt), R (age)
db.users.createIndex({ country: 1, createdAt: -1, age: 1 });
\`\`\`

### Interview answer:
A compound index indexes multiple fields together. To optimize queries that filter, sort, and range-check, follow the ESR rule: index Equality fields first, followed by Sort fields to avoid in-memory sorts, and Range fields last.`,
    followUps: [
      "What is index prefixing and why does an index on {a, b, c} also cover queries on {a} and {a, b}?",
      "What is a Covered Query in MongoDB?",
      "What is the 100MB RAM limit for in-memory sorts in MongoDB?"
    ],
    keyPoints: [
      "Compound indexes index multiple fields in specified sort orders",
      "ESR rule: Equality -> Sort -> Range",
      "Avoids expensive in-memory sort stage (SORT)",
      "Covers left-to-right index prefixes automatically"
    ],
    tags: ["indexes", "compound-index", "esr-rule", "performance", "query-optimization"],
    relatedLessonSlug: "/learn/mongodb/mg04-indexing-strategies",
    relatedLessonName: "MG-04: Compound Indexes & The ESR Rule"
  },
  {
    id: "mongo-q07",
    trackKey: "mongodb",
    category: "Aggregation Pipeline",
    subtopic: "Aggregation Pipeline",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "Explain the MongoDB Aggregation Pipeline: How do `$match`, `$group`, `$project`, `$unwind`, and `$lookup` work?",
    answer: `### Simple answer:
The Aggregation Pipeline processes documents through a series of stages like an assembly line. Each stage transforms the documents and passes the output to the next stage.

### Common Pipeline Stages:
- **\`$match\`**: Filters documents (like SQL \`WHERE\`). Place this first to reduce document volume early!
- **\`$group\`**: Groups documents by a key and calculates totals (like SQL \`GROUP BY\` with \`SUM\`, \`AVG\`).
- **\`$project\`**: Reshapes documents, including, excluding, or creating new computed fields.
- **\`$unwind\`**: Deconstructs an array field from input documents to output a document for **each element** in the array.
- **\`$lookup\`**: Performs a left outer join to another collection in the same database.

### Example:
\`\`\`javascript
db.orders.aggregate([
  // 1. Filter completed orders (uses index!)
  { $match: { status: "completed" } },

  // 2. Unwind items array into individual records
  { $unwind: "$items" },

  // 3. Group by product and calculate total revenue
  {
    $group: {
      _id: "$items.productId",
      totalRevenue: { $sum: { $multiply: ["$items.price", "$items.quantity"] } },
      orderCount: { $sum: 1 }
    }
  },

  // 4. Sort descending by revenue
  { $sort: { totalRevenue: -1 } }
]);
\`\`\`

### Interview answer:
The Aggregation Pipeline transforms documents sequentially through stages. Key stages include \`$match\` for filtering, \`$group\` for calculating summary metrics, \`$project\` for reshaping output fields, \`$unwind\` for flattening arrays, and \`$lookup\` for cross-collection joins.`,
    followUps: [
      "Why should $match and $sort be placed at the very beginning of the pipeline?",
      "How does the allowDiskUse option help with 100MB aggregation stage RAM limits?",
      "How does $lookup compare to relational SQL joins in terms of performance?"
    ],
    keyPoints: [
      "Pipeline processes documents sequentially through transform stages",
      "$match filters; $group aggregates; $project reshapes; $unwind flattens arrays",
      "$lookup performs cross-collection left outer joins",
      "Placing $match first allows index usage and reduces memory consumption"
    ],
    tags: ["aggregation", "pipeline", "group", "lookup", "unwind"],
    relatedLessonSlug: "/learn/mongodb/mg05-aggregation-pipeline",
    relatedLessonName: "MG-05: Aggregation Pipeline & Group Operations"
  },
  {
    id: "mongo-q08",
    trackKey: "mongodb",
    category: "Specialized Collections",
    subtopic: "Capped & TTL Collections",
    type: "practical",
    difficulty: "medium",
    source: "curated",
    question: "What are Capped Collections and TTL (Time-To-Live) Indexes in MongoDB? What are their use cases?",
    answer: `### Simple answer:
- **Capped Collection:** A fixed-size circular collection that automatically overwrites its oldest documents once it reaches its allocated size limit (FIFO).
- **TTL Index:** A single-field index on a Date field that automatically deletes documents after a specified number of seconds has passed.

### 1. TTL Index Example (Auto-expiring sessions / cache):
\`\`\`javascript
// Automatically delete documents 1 hour (3600 seconds) after createdAt:
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }
);

db.sessions.insertOne({
  sessionId: "abc",
  createdAt: new Date() // Must be a Date object!
});
\`\`\`
A background thread runs every 60 seconds and removes expired records automatically.

### 2. Capped Collection Example (High-throughput logging):
\`\`\`javascript
// Max 10MB or 1,000 documents:
db.createCollection("audit_logs", {
  capped: true,
  size: 10485760, // bytes (10MB)
  max: 1000
});
\`\`\`
Preserves insertion order on disk with very fast write throughput. You cannot delete individual documents from a capped collection.

### Interview answer:
TTL indexes automatically delete documents after a configured number of seconds on a Date field, ideal for auth sessions, OTP codes, and caching. Capped collections are fixed-size circular buffers that overwrite oldest records when full, perfect for high-speed activity logs and event feeds.`,
    followUps: [
      "Why must the field in a TTL index be a BSON Date and not a timestamp integer?",
      "Can a Capped Collection be sharded?",
      "What are Tailable Cursors on Capped Collections and how do they enable pub-sub streaming?"
    ],
    keyPoints: [
      "TTL indexes delete documents based on expireAfterSeconds on a Date field",
      "Background thread purges expired documents approximately once every 60 seconds",
      "Capped collections are fixed-size circular buffers preserving insertion order",
      "Ideal for sessions, temporary verification codes, and high-volume logging"
    ],
    tags: ["ttl-index", "capped-collections", "auto-expiration", "logging"],
    relatedLessonSlug: "/learn/mongodb/mg04-indexing-strategies",
    relatedLessonName: "MG-04: Compound Indexes & Specialized Collections"
  },
  {
    id: "mongo-q09",
    trackKey: "mongodb",
    category: "High Availability",
    subtopic: "Replica Sets",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "How do Replica Sets work in MongoDB, and how does Automatic Failover occur?",
    answer: `### Simple answer:
A Replica Set is a cluster of MongoDB nodes that maintain the exact same dataset to provide high availability, fault tolerance, and data redundancy.

### Standard Topology (Minimum 3 nodes):
- **1 Primary Node:** The only node that receives **all write operations**. Writes are recorded to the **oplog (operations log)**.
- **2 Secondary Nodes:** Continuously replicate the Primary's oplog and apply changes to their datasets.
- *(Optional Arbiter):* A lightweight vote-only node with no data used for breaking tie-breaker elections.

### Automatic Failover & Heartbeats:
1. Every 2 seconds, members send heartbeat pings to each other.
2. If the Primary does not respond for **10 seconds**, the Secondaries detect the failure.
3. Secondaries initiate an election using the **Raft consensus algorithm**.
4. The Secondary with the most up-to-date oplog wins the majority vote and becomes the new Primary.
5. Clients automatically discover the new Primary without manual intervention.

### Interview answer:
A MongoDB Replica Set provides high availability through a Primary that handles writes and Secondaries that replicate its oplog. If the Primary fails to respond to heartbeats for 10 seconds, Secondaries hold an election and promote the most up-to-date node to Primary automatically.`,
    followUps: [
      "What is the oplog in MongoDB and how is it structured as a capped collection?",
      "Why is an odd number of voting members (3, 5, 7) required for consensus elections?",
      "What is an Arbiter node and why is deploying a data-bearing secondary usually preferred?"
    ],
    keyPoints: [
      "Minimum 3 nodes (Primary + 2 Secondaries) for high availability",
      "Only the Primary accepts write operations",
      "Secondaries replicate the Primary's oplog asynchronously",
      "Elections promote a healthy secondary to Primary within ~10 seconds"
    ],
    tags: ["replica-sets", "high-availability", "failover", "oplog", "architecture"],
    relatedLessonSlug: "/learn/mongodb/mg06-replica-sets-and-failover",
    relatedLessonName: "MG-06: Replica Sets, Oplog & Automatic Failover"
  },
  {
    id: "mongo-q10",
    trackKey: "mongodb",
    category: "Consistency & Durability",
    subtopic: "Read and Write Concern",
    type: "architecture",
    difficulty: "medium",
    source: "curated",
    question: "What is the difference between Write Concern (`w`) and Read Concern (`readConcern`) in MongoDB?",
    answer: `### Simple answer:
- **Write Concern:** Controls the level of acknowledgment requested from MongoDB before considering a write successful.
- **Read Concern:** Controls the consistency and isolation of data returned by read queries across replica set nodes.

### Write Concern Levels:
- **\`w: 1\` (Default):** Acknowledged once written to memory on the Primary node only. Fast, but if Primary crashes before replicating, data could roll back!
- **\`w: "majority"\`:** Acknowledged only after written to a majority of replica set nodes. Prevents rollbacks on failover.
- **\`j: true\` (Journaled):** Guarantees write is flushed to disk on the Write-Ahead Journal before returning.

### Read Concern Levels:
- **\`"local"\` (Default):** Returns current node's data; does not guarantee data was written to majority.
- **\`"majority"\`:** Returns data that has been acknowledged by a majority of nodes (guaranteed will never roll back).
- **\`"linearizable"\`:** Real-time fresh read that waits for all concurrent writes to complete before returning.

### Example:
\`\`\`javascript
// High durability financial transaction write:
await db.collection("accounts").insertOne(
  { balance: 5000 },
  { writeConcern: { w: "majority", j: true, wtimeout: 5000 } }
);
\`\`\`

### Interview answer:
Write Concern specifies how many replica nodes must acknowledge a write (e.g. \`w: "majority"\` guarantees durability across failovers). Read Concern controls the isolation of reads, where \`majority\` guarantees reading data that has been replicated and will never roll back.`,
    followUps: [
      "What is Read Preference (primary, secondaryPreferred) and how does it relate to read concern?",
      "What is an uncontrolled rollback in MongoDB?",
      "What does wtimeout protect against?"
    ],
    keyPoints: [
      "Write concern controls write acknowledgments (w: 1 vs w: majority)",
      "j: true ensures write is committed to on-disk journal",
      "Read concern controls consistency of retrieved data",
      "Combining w: majority and readConcern: majority prevents dirty reads and rollbacks"
    ],
    tags: ["write-concern", "read-concern", "durability", "consistency", "mongodb"],
    relatedLessonSlug: "/learn/mongodb/mg06-replica-sets-and-failover",
    relatedLessonName: "MG-06: Replica Sets, Oplog & Automatic Failover"
  },
  {
    id: "mongo-q11",
    trackKey: "mongodb",
    category: "Horizontal Scaling",
    subtopic: "Sharding",
    type: "architecture",
    difficulty: "hard",
    source: "curated",
    question: "How does Sharding work in MongoDB, and what components make up a Sharded Cluster?",
    answer: `### Simple answer:
Sharding is MongoDB's method for horizontally partitioning data across multiple independent database servers (shards) when data size or write throughput exceeds the capacity of a single machine.

### The Three Components of a Sharded Cluster:
1. **Shards:** Independent Replica Sets that each hold a subset of the sharded data.
2. **Mongos (Query Routers):** Stateless routing processes that act as the interface between client applications and the cluster. The app connects to \`mongos\` as if it were a single MongoDB instance.
3. **Config Servers:** A dedicated replica set that stores cluster metadata and mapping of chunk ranges to specific shards.

\`\`\`
Client Application
       │
       ▼
    Mongos (Router)
    ┌──┴──┐
    ▼     ▼
 Config Shards (Replica Sets)
 Server [Shard 1] [Shard 2] [Shard 3]
\`\`\`

### The Shard Key:
The choice of **Shard Key** is the most critical architectural decision:
- **Ranged Sharding:** Groups data by range. Good for range queries, but sequential keys (like timestamps) cause all writes to bottleneck on a single shard!
- **Hashed Sharding:** Hashes the key to distribute writes evenly across all shards.

### Interview answer:
A sharded cluster consists of Mongos query routers, Config Servers storing chunk metadata, and Shards holding partitioned data. Choosing a good Shard Key with high cardinality and even distribution is vital to avoid write bottlenecks on a single shard.`,
    followUps: [
      "What is a Jumbo Chunk in MongoDB sharding?",
      "Why does a monotonically increasing shard key (like timestamp) create hotspotting?",
      "Can you change a shard key after sharding a collection in modern MongoDB?"
    ],
    keyPoints: [
      "Horizontally partitions collections across multiple replica sets",
      "Mongos routers route client queries to relevant shards",
      "Config servers maintain routing metadata and chunk mappings",
      "Good shard keys require high cardinality, low frequency, and non-monotonically increasing values"
    ],
    tags: ["sharding", "horizontal-scaling", "mongos", "shard-key", "architecture"],
    relatedLessonSlug: "/learn/mongodb/mg07-sharding-and-scaling",
    relatedLessonName: "MG-07: Sharded Clusters, Chunk Balancers & Shard Keys"
  },
  {
    id: "mongo-q12",
    trackKey: "mongodb",
    category: "Transactions & Concurrency",
    subtopic: "ACID Transactions",
    type: "conceptual",
    difficulty: "hard",
    source: "curated",
    question: "How do Multi-Document ACID Transactions work in MongoDB, and when should you use them?",
    answer: `### Simple answer:
Historically, MongoDB only offered single-document atomic updates. Since MongoDB 4.0 (and 4.2 for sharded clusters), MongoDB supports **Multi-Document ACID Transactions** across collections using Sessions.

### Example: Money Transfer
\`\`\`javascript
const session = client.startSession();

try {
  session.startTransaction({
    readConcern: { level: "snapshot" },
    writeConcern: { w: "majority" }
  });

  // Step 1: Deduct from Account A
  await accounts.updateOne(
    { _id: "acc_A" },
    { $inc: { balance: -100 } },
    { session }
  );

  // Step 2: Add to Account B
  await accounts.updateOne(
    { _id: "acc_B" },
    { $inc: { balance: 100 } },
    { session }
  );

  // Commit transaction:
  await session.commitTransaction();
} catch (error) {
  // Abort and rollback on any failure:
  await session.abortTransaction();
  throw error;
} finally {
  await session.endSession();
}
\`\`\`

### Rule of Thumb:
In 90% of MongoDB applications, proper **document embedding** makes multi-document transactions unnecessary because single-document updates are already atomic! Reserve transactions for financial ledger transfers or multi-entity synchronization.

### Interview answer:
MongoDB supports multi-document ACID transactions using Client Sessions with \`startTransaction()\`, \`commitTransaction()\`, and \`abortTransaction()\`. While transactions guarantee atomicity across multiple collections, good schema design with embedded subdocuments usually solves atomicity without transaction overhead.`,
    followUps: [
      "What is the maximum execution time limit for a MongoDB transaction (default 60 seconds)?",
      "How do multi-document transactions impact write lock contention and performance?",
      "Can you create collections inside an active transaction in MongoDB?"
    ],
    keyPoints: [
      "Multi-document ACID transactions use Client Sessions",
      "Snapshot isolation level guarantees consistent reads",
      "Transactions carry performance overhead and time out after 60s by default",
      "Embedded documents provide atomic updates without needing transactions"
    ],
    tags: ["transactions", "acid", "sessions", "concurrency", "mongodb"],
    relatedLessonSlug: "/learn/mongodb/mg06-replica-sets-and-failover",
    relatedLessonName: "MG-06: Replica Sets, Oplog & Automatic Failover"
  }
];
