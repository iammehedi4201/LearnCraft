import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const mdb20BackupsReplicationAndScalingContent: StandardLessonContent = {
  slug: "mdb20-backups-replication-and-scaling",
  code: "MDB-20",
  title: "Backups, Replication, and Scaling — The Basic Idea",
  subtitle: "Understand disaster recovery (backups), high availability (replica sets), and horizontal scaling (sharding).",
  difficulty: "Moderate",
  scenario: {
    question: "A company wants to recover data after someone accidentally deletes records. Which idea helps?",
    answer: "A backup helps recover deleted data. The company should also test the restore process so it knows the backup works.",
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
    title: "Backups, Replication, and Scaling — The Basic Idea",
    bigPicture:
      "These are important database ideas, but beginners do not need to configure every one of them in this lesson.\n\n### Backups\nA backup is a separate copy of data that can be used to recover after accidental deletion, corruption, or another failure. A backup is useful only if you can restore it. Teams should make backups regularly and test that recovery works.\n\n### Replication\nReplication keeps copies of data on more than one MongoDB server. It helps a deployment stay available if one server fails. A replica set is a group of MongoDB servers that maintain the same data.\n\n### Sharding\nSharding splits data across multiple servers. It is used when one server is not enough for the size or workload of the data.",
    codeSnippet: `// Illustrative architecture comparison:
// 1. Backups:
// mongodump --db=learncraft --out=/backups/$(date +%F)
// mongorestore --db=learncraft /backups/2026-03-01/learncraft

// 2. Replica Set (High Availability):
// Primary Node (writes & reads) ---> Secondary Node 1 (replicated copy)
//                              ---> Secondary Node 2 (replicated copy)

// 3. Sharding (Horizontal Scaling):
// Router (mongos) ---> Shard 1 (Accounts A-M)
//                 ---> Shard 2 (Accounts N-Z)`,
    breakdownTitle: "Remember the core differences",
    breakdownItems: [
      {
        title: "1. Backup",
        desc: "Backup helps recover data after accidental deletion, corruption, or catastrophic loss.",
      },
      {
        title: "2. Replication",
        desc: "Replication keeps the database available (automatic failover) when a physical server crashes.",
      },
      {
        title: "3. Sharding",
        desc: "Sharding spreads data horizontally across multiple clusters to support massive workloads and storage beyond a single machine.",
      },
      {
        title: "4. Scope",
        desc: "These ideas are useful to recognize when reading production architecture, but detailed setup belongs in a database administration or infrastructure track.",
      },
    ],
  },
  part2: {
    title: "Architecture & Operational Roles",
    intro:
      "Replication is not a backup! If someone runs `deleteMany({})`, that delete replicates instantly to all replica set secondaries. Backups are the only safeguard against logical deletion.",
    rule: {
      title: "Operational Boundary Rule",
      content:
        "Maintain automated, regularly tested backups for disaster recovery. Deploy replica sets (1 Primary, 2 Secondaries) for high-availability uptime. Introduce sharding only when data volume or throughput exceeds single-node hardware capabilities.",
    },
    cards: [
      {
        number: "01",
        tag: "RECOVERY",
        title: "Tested Backups",
        color: "emerald",
        description:
          "Point-in-time snapshots to restore data after human error or corruption. Backups are unverified until tested with a restore drill.",
      },
      {
        number: "02",
        tag: "UPTIME",
        title: "Replica Sets",
        color: "cyan",
        description:
          "Maintains synchronized copies on multiple servers. If the Primary server fails, an automatic election promotes a Secondary in seconds.",
      },
      {
        number: "03",
        tag: "SCALE",
        title: "Sharded Clusters",
        color: "purple",
        description:
          "Horizontal partitioning across shards driven by a shard key to distribute multi-terabyte datasets across clusters.",
      },
    ],
  },
  part3: {
    title: "Real-World Scenarios & Practice",
    intro: "Understanding operational decisions in production:",
    points: [
      {
        title: "Accidental Deletion Recovery",
        content:
          "When an admin accidentally deletes customer records, a replica set replicates the delete to all nodes within milliseconds. The team must restore from the hourly snapshot backup to recover.",
      },
      {
        title: "Hardware Failure Failover",
        content:
          "When a cloud availability zone experiences a hardware outage taking down the Primary node, the remaining replica set members elect a new Primary automatically without downtime.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Assuming a replica set replaces the need for backups, or jumping straight into sharding before optimizing queries and indexes.",
    bad: {
      title: "Assuming Replication Protects Against Deletion",
      code: `// Danger: mistaken assumption: "We have 3 replica nodes, so we don't need backups!"
db.users.deleteMany({}); // Instant deletion across Primary AND all Secondaries!
// Without backups, all user data is gone forever!`,
      explanation:
        "Replication mirrors all write operations, including accidental deletions. Only separate backups can restore deleted data.",
    },
    good: {
      title: "Automated Backups with Periodic Restore Testing",
      code: `// Best practice: automated snapshot policy + restore drills
// 1. Daily automated backups with 30-day retention
// 2. Monthly tested restoration to a staging environment
// 3. Replica set for seamless 99.99% operational uptime`,
      explanation:
        "Combining replica sets for uptime with regular tested backups for recovery ensures true production resilience.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro:
      "Note: In-browser playground executes JavaScript. Below is a simulation of replica set election and backup restore:",
    starterCode: `// Simulating replica set failover and backup restore in JavaScript
class ReplicaSet {
  constructor() {
    this.primary = "Node-1 (Primary)";
    this.secondaries = ["Node-2 (Secondary)", "Node-3 (Secondary)"];
  }

  simulateCrash() {
    console.log("CRASH: " + this.primary + " is unreachable!");
    const newPrimary = this.secondaries.shift();
    this.primary = newPrimary.replace("Secondary", "Primary");
    console.log("ELECTION: " + this.primary + " has been elected as new Primary.");
  }
}

const cluster = new ReplicaSet();
console.log("Initial state: Primary is", cluster.primary);
cluster.simulateCrash();
console.log("Current cluster status:", cluster);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "A company wants to recover data after someone accidentally deletes records. Which idea helps?",
      options: [
        "A backup helps recover deleted data. The company should also test the restore process so it knows the backup works.",
        "Replication alone recovers the deleted data because secondaries refuse to delete records.",
        "Sharding automatically undeletes any document after 5 minutes.",
        "Restarting the computer undoes all delete operations.",
      ],
      correctIndex: 0,
      explanation:
        "Backups provide point-in-time copies for data recovery. Testing the restore process ensures the backup can be used successfully during an incident.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Backups for Recovery",
        desc: "Create and periodically test backups to recover from accidental deletions or corruption.",
      },
      {
        title: "Replication for Uptime",
        desc: "Replica sets maintain synchronized copies for high availability and automatic failover.",
      },
      {
        title: "Sharding for Scale",
        desc: "Sharding partitions data horizontally across clusters when workloads exceed single-node limits.",
      },
    ],
    nextLessonPreview: {
      title: "Capstone: ShopSphere Database & Analytics",
      desc: "Complete your learning journey by building a comprehensive production MongoDB data architecture.",
    },
  },
};

