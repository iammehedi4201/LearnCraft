import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts18ClassAccessModifiersContent: StandardLessonContent = {
  slug: "ts18-class-access-modifiers",
  code: "TS-18",
  title: "Class Fields and Access Modifiers",
  subtitle: "Control member visibility with public, private, protected, and readonly, and master encapsulation for backend services.",
  sections: [
    {
      id: "part1",
      label: "Class Access Modifiers",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "public, private, protected",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "TS private vs JS #private",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Runtime private Trap",
      icon: "🛡️",
      tag: "COMMON PITFALL",
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND",
    },
    {
      id: "part6",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT",
    },
    {
      id: "part7",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS",
    },
  ],
  part1: {
    title: "Class Fields and Access Modifiers",
    bigPicture:
      "Access modifiers (public, private, protected, and readonly) control visibility on classes. In backend frameworks like NestJS, they hide internal database connections and secret tokens while exposing clean route handlers.",
    breakdownTitle: "Four Core Modifiers",
    breakdownItems: [
      {
        title: "public (Default)",
        desc: "Accessible from anywhere: inside the declaring class, child subclasses, and external consumer code like controllers.",
      },
      {
        title: "private",
        desc: "Accessible ONLY within the declaring class. Subclasses and outside callers cannot read or modify it.",
      },
      {
        title: "protected",
        desc: "Accessible within the declaring class AND any child classes that extend it (ideal for base service utilities).",
      },
      {
        title: "readonly",
        desc: "Can only be assigned during declaration or inside the constructor; immutable thereafter to prevent accidental state mutation.",
      },
    ],
  },
  part2: {
    title: "How public, private, and protected Work",
    intro:
      "Observe how access modifiers create clean encapsulation boundaries in backend services:",
    cards: [
      {
        number: "01",
        tag: "public",
        title: "1. public (Open API)",
        description:
          "Default visibility. Calling code and controllers invoke these methods to perform actions.",
        codeSnippet:
          "class UsersService {\n  public findById(id: string) {\n    return { id, name: 'Alice' };\n  }\n}\nconst svc = new UsersService();\nconsole.log(svc.findById('u1').name);\n// Output: Alice",
        color: "purple",
      },
      {
        number: "02",
        tag: "private",
        title: "2. private (Encapsulated)",
        description:
          "Hides internal state, secret credentials, or helper algorithms so callers cannot tamper with them.",
        codeSnippet:
          "class AuthService {\n  private saltRounds = 10;\n  public hash(pw: string) {\n    return `${pw}_hashed_${this.saltRounds}`;\n  }\n}\nconsole.log(new AuthService().hash('secret'));\n// Output: secret_hashed_10",
        color: "rose",
      },
      {
        number: "03",
        tag: "protected",
        title: "3. protected (Subclasses)",
        description:
          "Allows derived classes to inherit internal helper logic without exposing it to the public API.",
        codeSnippet:
          "class BaseService {\n  protected baseUrl = 'https://api.internal';\n}\nclass OrderService extends BaseService {\n  public getOrderUrl(id: string) {\n    return `${this.baseUrl}/orders/${id}`;\n  }\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Compile-Time Privacy Rule",
      content:
        "TypeScript's 'private' keyword is enforced during compile time. At runtime, all TS private modifiers are erased. For hard runtime privacy that survives serialization and reflection, use JavaScript's native #field syntax.",
    },
  },
  part3: {
    title: "TypeScript private vs Native JS #private",
    intro:
      "Understand the crucial difference between compile-time type safety and native JavaScript runtime privacy:",
    points: [
      {
        title: "1. TypeScript 'private' (Compile-Time Soft Privacy)",
        content:
          "TypeScript's 'private' keyword flags access errors in your editor and during build. However, in compiled JavaScript, the property is a normal property. It can still be inspected via Object.keys or runtime reflection.",
        codeSnippet:
          "class Vault {\n  private key = 'secret_123';\n}\nconst v = new Vault();\n// v.key; // Compile error in TS!\n// console.log((v as any).key); // Works at runtime! Outputs: secret_123",
      },
      {
        title: "2. JavaScript '#private' (Hard Engine Privacy)",
        content:
          "Native private fields (prefixed with #) are enforced directly by the JavaScript V8 engine at runtime. No type casting or introspection can bypass them.",
        codeSnippet:
          "class SecureVault {\n  #hardSecret = 'super_secret';\n  public check() { return this.#hardSecret.length > 0; }\n}\nconst sv = new SecureVault();\n// (sv as any).#hardSecret // SyntaxError: Private field must be declared in an enclosing class",
      },
      {
        title: "3. readonly for Critical Service Invariants",
        content:
          "Marking dependencies or configuration properties as readonly guarantees that references cannot be overwritten after instantiation.",
        codeSnippet:
          "class ApiClient {\n  constructor(public readonly timeoutMs: number = 5000) {}\n}\nconst client = new ApiClient();\n// client.timeoutMs = 10000; // Error: Cannot assign to 'timeoutMs' because it is a read-only property.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Relying on TS private at Runtime",
    bad: {
      title: "❌ Expecting TS 'private' to Hide Sensitive Data from JSON",
      code:
        "class UserRecord {\n  public id = 'usr_101';\n  private passwordHash = 'hash_xyz_secret';\n}\n\nconst user = new UserRecord();\n// At runtime, private is erased:\nconsole.log(JSON.stringify(user));\n// Leaks: {\"id\":\"usr_101\",\"passwordHash\":\"hash_xyz_secret\"}!",
      explanation:
        "Because TypeScript compiles away private modifiers, fields declared with `private` are standard public properties in the emitted JavaScript object.",
    },
    good: {
      title: "✅ Use Native #private or Explicit DTO Projections",
      code:
        "class UserRecord {\n  public id = 'usr_101';\n  #passwordHash = 'hash_xyz_secret'; // Invisible to JSON.stringify\n\n  public verify(pwd: string) {\n    return this.#passwordHash === pwd;\n  }\n}\nconsole.log(JSON.stringify(new UserRecord()));\n// Output: {\"id\":\"usr_101\"} (passwordHash is completely omitted)",
      explanation:
        "Native #private fields are omitted by JSON.stringify and invisible to Object.keys at runtime, preventing accidental data leaks.",
    },
    whyItMatters:
      "In backend frameworks like NestJS, understanding compile-time encapsulation vs runtime data serialization prevents security vulnerabilities and state corruption.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with public, private, protected, and readonly modifiers in this backend service model:",
    starterCode:
      "// TS-18: Class Fields & Encapsulation\nclass UsersService {\n  public readonly serviceName = \"UsersService\";\n  protected activeSessions = 0;\n  private userStore = new Map<string, string>();\n\n  public register(id: string, name: string): void {\n    this.userStore.set(id, name);\n    this.activeSessions++;\n  }\n\n  public findUser(id: string): string | undefined {\n    return this.userStore.get(id);\n  }\n\n  public getStatus(): string {\n    return `${this.serviceName}: ${this.userStore.size} users registered, ${this.activeSessions} active sessions.`;\n  }\n}\n\nconst service = new UsersService();\nservice.register(\"u1\", \"Alice\");\nservice.register(\"u2\", \"Bob\");\nconsole.log(service.getStatus());\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What is the primary difference between TypeScript's `private` keyword and JavaScript's native `#private` field syntax?",
      options: [
        "TypeScript's `private` keyword is only allowed inside abstract classes.",
        "TypeScript's `private` is a compile-time check erased at runtime; `#private` is enforced by the JavaScript engine at runtime and cannot be bypassed.",
        "Native `#private` fields cannot be used in TypeScript.",
        "TypeScript's `private` works only in Node.js, while `#private` works only in browsers.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript's `private` modifier exists solely for developer safety during compile time and vanishes in the emitted JavaScript. In contrast, JavaScript's native `#private` fields provide true runtime privacy enforced by the JavaScript engine.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Service Encapsulation",
        desc: "Use public for exposed APIs, protected for subclass helpers, and private for internal service logic.",
      },
      {
        title: "readonly for Immutability",
        desc: "Mark class fields and dependencies as readonly to prevent accidental reassignment after construction.",
      },
      {
        title: "TS private vs JS #private",
        desc: "Remember that TS private is compile-time only. Use native #private when hard runtime security is required.",
      },
    ],
    nextLessonPreview: {
      title: "TS-19: Constructor Parameter Properties",
      desc: "Learn the clean parameter property shorthand and how it powers modern Dependency Injection in NestJS.",
    },
  },
};
