import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const node13BuffersAndStreamsContent: StandardLessonContent = {
  slug: "node13-buffers-and-streams",
  code: "NODE-13",
  title: "Buffers and Streams",
  subtitle: "Buffers store raw bytes and streams process data piece by piece to keep memory usage low.",
  difficulty: "Difficult",
  scenario: {
    question: "Your app needs to send a very large file. Why might a stream be better than reading the entire file first?",
    answer: "A stream processes the file in smaller pieces, so the app does not need to keep the whole file in memory at once.",
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
    title: "Buffers and Streams",
    bigPicture:
      "A Buffer stores bytes. A stream lets Node.js process data piece by piece instead of requiring the whole thing in memory at once. You will encounter both when working with files, uploads, downloads, and network data.",
    codeSnippet: `// 1. Create a Buffer:
const data = Buffer.from("Hello", "utf8");
console.log(data.length); // 5 bytes for these ASCII letters

// 2. Read a large file using a stream:
import { createReadStream } from "node:fs";

const stream = createReadStream("./large-file.txt", {
  encoding: "utf8",
});

stream.on("data", (chunk) => {
  console.log("Received a piece of the file");
});

stream.on("error", (error) => {
  console.error("File reading failed", error.message);
});`,
    breakdownTitle: "Step by step",
    breakdownItems: [
      {
        title: "1. createReadStream()",
        desc: "`createReadStream()` opens a stream for the file.",
      },
      {
        title: "2. Chunks",
        desc: "Node.js supplies pieces of data called chunks.",
      },
      {
        title: "3. 'data' event listener",
        desc: "The `data` listener runs as chunks arrive.",
      },
      {
        title: "4. 'error' event listener",
        desc: "The `error` listener handles a stream error.",
      },
    ],
  },
  part2: {
    title: "Memory Efficiency & Safe Pipelines",
    intro:
      "A stream can reduce memory use for large files, but it needs correct error handling. When sending data from one stream to another, helpers such as `pipeline()` are usually safer than manually wiring every event because they handle important completion and error cases.",
    rule: {
      title: "Streaming Memory Rule",
      content:
        "Never buffer multi-hundred-megabyte files entirely into RAM. Use streams to pipe data chunk-by-chunk, and use `pipeline()` from `node:stream/promises` for robust automatic cleanup and error handling.",
    },
    cards: [
      {
        number: "01",
        tag: "BUFFER",
        title: "Buffer",
        description:
          "Fixed-size chunk of raw binary memory allocated outside the V8 JavaScript heap.",
        color: "amber",
      },
      {
        number: "02",
        tag: "STREAM",
        title: "Stream",
        description:
          "Sequentially processes chunks of data over time to prevent memory exhaustion.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "PIPELINE",
        title: "pipeline() Helper",
        description:
          "Safely forwards data between readable and writable streams, closing both on error or completion.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "Scenario & Large File Processing",
    intro: "Why streaming architecture is essential for servers handling media and large uploads:",
    points: [
      {
        title: "Constant Low Memory Footprint",
        content:
          "Reading a 2GB video file into a Buffer requires 2GB of RAM immediately. Multiple concurrent downloads will crash the server with out-of-memory errors. Streaming keeps memory usage to a small buffer window of a few kilobytes.",
      },
      {
        title: "Immediate Data Flow",
        content:
          "Clients receive initial bytes instantly instead of waiting for the entire multi-gigabyte file to be loaded from disk into server memory first.",
      },
    ],
  },
  part4: {
    title: "Common Pitfalls & Fixes",
    problem:
      "Reading entire large files into memory with `readFile` leads to Out-Of-Memory (OOM) fatal crashes.",
    bad: {
      title: "Buffering Large Files Completely",
      code: `import { readFile } from "node:fs/promises";\n\n// Bad: Allocates 4GB buffer in memory!\nconst bigFile = await readFile("./huge-video.mp4");\nres.end(bigFile);`,
      explanation:
        "Large files buffered in memory can instantly trigger Node.js process Out-Of-Memory termination.",
    },
    good: {
      title: "Streaming with pipeline()",
      code: `import { createReadStream } from "node:fs";\nimport { pipeline } from "node:stream/promises";\n\n// Good: Streams chunk by chunk\nawait pipeline(\n  createReadStream("./huge-video.mp4"),\n  res\n);`,
      explanation:
        "pipeline streams data chunk by chunk with minimal RAM footprint and safe error cleanup.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Inspect simulated buffer byte lengths:",
    starterCode: `const sampleText = "Hello from Node.js Streams!";\nconst byteLength = new TextEncoder().encode(sampleText).length;\n\nconsole.log("Text content:", sampleText);\nconsole.log(\`Calculated byte size: \${byteLength} bytes\`);`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Your app needs to send a very large file. Why might a stream be better than reading the entire file first?",
      options: [
        "A stream processes the file in smaller pieces, so the app does not need to keep the whole file in memory at once.",
        "Streams automatically compress files using gzip without CPU overhead.",
        "Streams bypass network bandwidth limits.",
        "Streams convert binary data to JSON format automatically.",
      ],
      correctIndex: 0,
      explanation:
        "A stream processes data in small sequential chunks, avoiding massive memory spikes and keeping memory usage low.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Buffer",
        desc: "A Buffer stores raw bytes in memory outside the V8 heap.",
      },
      {
        title: "Streams for Large Data",
        desc: "A stream processes data chunk by chunk instead of requiring the whole file in memory at once.",
      },
      {
        title: "Safe Pipelines",
        desc: "Use stream helpers like pipeline() to handle errors and stream completion reliably.",
      },
    ],
  },
};
