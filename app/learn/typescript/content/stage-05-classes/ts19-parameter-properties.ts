import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts19ParameterPropertiesContent: StandardLessonContent = {
  slug: "ts19-parameter-properties",
  code: "TS-19",
  title: "Constructor Parameter Properties",
  subtitle: "Master parameter properties shorthand and understand how it powers modern Dependency Injection in NestJS.",
  sections: [
    {
      id: "part1",
      label: "Parameter Properties",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Parameter Property Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Dependency Injection",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Duplicate Fields",
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
    title: "Constructor Parameter Properties",
    bigPicture:
      "Parameter Properties eliminate repetitive constructor boilerplate. Prefixing constructor arguments with public, private, or readonly automatically declares and initializes the class field in one line.",
    breakdownTitle: "Three Key Advantages",
    breakdownItems: [
      {
        title: "Zero Boilerplate",
        desc: "Declares the field on the class instance, types the argument, and performs this.x = x in one concise signature.",
      },
      {
        title: "All Modifiers Supported",
        desc: "Works seamlessly with public, private, protected, and readonly modifiers (or combinations like private readonly).",
      },
      {
        title: "NestJS Dependency Injection Standard",
        desc: "The universal idiom in NestJS controllers and services for injecting database connections, loggers, and repositories.",
      },
    ],
  },
  part2: {
    title: "How Parameter Properties Work",
    intro:
      "Observe how modifier keywords in constructor parameters transform into class fields:",
    cards: [
      {
        number: "01",
        tag: "private readonly",
        title: "1. private readonly (NestJS DI)",
        description:
          "The most common pattern in backend services: injects a dependency that cannot be modified or accessed externally.",
        codeSnippet:
          "class UsersController {\n  constructor(private readonly usersService: UsersService) {}\n  public getProfile(id: string) {\n    return this.usersService.findById(id);\n  }\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "public readonly",
        title: "2. public readonly (DTOs)",
        description:
          "Creates public read-only properties for domain models, DTOs, or configuration objects.",
        codeSnippet:
          "class AppConfig {\n  constructor(\n    public readonly port: number,\n    public readonly nodeEnv: string = 'development'\n  ) {}\n}\nconst cfg = new AppConfig(3000);\nconsole.log(cfg.port); // 3000",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Mixed",
        title: "3. Mixing Shorthand & Normal Parameters",
        description:
          "Combine parameter properties with normal temporary constructor arguments and custom logic.",
        codeSnippet:
          "class Order {\n  public createdAt: Date;\n  constructor(public id: string, initialTotal: number) {\n    this.createdAt = new Date();\n    // initialTotal is a temporary argument, not a field!\n  }\n}",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Parameter Property Rule",
      content:
        "Prefixing a constructor argument with any access modifier (public, private, protected, readonly) turns it into a class property automatically. If you omit the modifier, it remains a standard temporary constructor parameter.",
    },
  },
  part3: {
    title: "Dependency Injection and Inversion of Control",
    intro:
      "Understand why parameter properties are the backbone of modern backend architectures like NestJS:",
    points: [
      {
        title: "1. Avoiding Hardcoded Dependencies",
        content:
          "Without Dependency Injection, a controller creates its own service with `new UsersService()`. This tightly couples them and makes unit testing nearly impossible.",
        codeSnippet:
          "// Tight coupling (Hard to test):\nclass BadController {\n  private service = new UsersService(); // Fixed dependency\n}",
      },
      {
        title: "2. Inversion of Control (IoC) with Parameter Properties",
        content:
          "With constructor injection, the class simply declares what it needs. An IoC container (like NestJS) instantiates the dependencies and passes them in.",
        codeSnippet:
          "// Loose coupling (Easy to test & mock):\nclass GoodController {\n  constructor(private readonly service: UsersService) {}\n}",
      },
      {
        title: "3. Effortless Unit Testing and Mocking",
        content:
          "Because dependencies are passed via the constructor, you can test classes in isolation by passing mock objects without spinning up a real database or server.",
        codeSnippet:
          "const mockService = { findById: (id: string) => ({ id, name: 'Mock' }) };\nconst controller = new GoodController(mockService as any);\nconsole.log(controller); // Tested in isolation!",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Duplicate Field Declarations",
    bad: {
      title: "❌ Declaring the Field Both at the Top AND in the Constructor",
      code:
        "class OrderService {\n  private readonly db: DatabaseService; // Redundant declaration!\n  constructor(private readonly db: DatabaseService) { // Duplicates property\n    // TypeScript flags this or creates confusion\n  }\n}",
      explanation:
        "Declaring the property at the top of the class AND using a parameter property creates redundant code and triggers compiler or linter warnings.",
    },
    good: {
      title: "✅ Use the Parameter Property Alone",
      code:
        "class OrderService {\n  // No top-level field declaration needed:\n  constructor(\n    private readonly db: DatabaseService,\n    private readonly logger: LoggerService\n  ) {}\n}\n// Clean, concise, and fully type-safe!",
      explanation:
        "Let the constructor parameter property handle both the field declaration and the initialization in one clean step.",
    },
    whyItMatters:
      "When working in NestJS codebases, you will write hundreds of service and controller constructors. Avoiding duplicate declarations keeps files clean and maintainable.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Explore parameter properties and dependency injection in this live backend service model:",
    starterCode:
      "// TS-19: Parameter Properties & Dependency Injection\nclass DatabaseService {\n  query(sql: string) {\n    return `Executed: ${sql}`;\n  }\n}\n\nclass UsersService {\n  // Injects DatabaseService via parameter property shorthand:\n  constructor(\n    private readonly db: DatabaseService,\n    public readonly serviceName: string = \"UsersService\"\n  ) {}\n\n  getUser(id: string) {\n    return this.db.query(`SELECT * FROM users WHERE id = '${id}'`);\n  }\n}\n\nconst db = new DatabaseService();\nconst usersSvc = new UsersService(db);\nconsole.log(usersSvc.serviceName);\nconsole.log(usersSvc.getUser(\"usr_42\"));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "What happens when you write `constructor(private readonly db: DatabaseService) {}` in a TypeScript class?",
      options: [
        "It only creates a temporary local variable inside the constructor that is discarded after execution.",
        "It automatically declares a private readonly field `db` on the class, types it as `DatabaseService`, and assigns `this.db = db`.",
        "It generates a runtime error unless `db` is explicitly declared at the top of the class body.",
        "It exposes `db` as a public mutable property on instance objects.",
      ],
      correctIndex: 1,
      explanation:
        "Prefixing a constructor parameter with an access modifier (`public`, `private`, `protected`, or `readonly`) creates a parameter property: TypeScript declares the field on the class instance and assigns the argument to `this.db` automatically.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Shorthand Syntax",
        desc: "Prefix constructor parameters with access modifiers to declare and initialize class fields in one step.",
      },
      {
        title: "Dependency Injection",
        desc: "Parameter properties are the standard convention in NestJS controllers and services for injecting dependencies.",
      },
      {
        title: "No Redundancy",
        desc: "Never declare the property at the top of the class when using parameter properties in the constructor.",
      },
    ],
    nextLessonPreview: {
      title: "TS-20: Abstract Classes and Interfaces",
      desc: "Learn abstract class vs interface: Base blueprint enforcement, NestJS framework contracts, and polymorphism.",
    },
  },
};
