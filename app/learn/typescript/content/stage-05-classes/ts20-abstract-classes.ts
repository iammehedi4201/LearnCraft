import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts20AbstractClassesContent: StandardLessonContent = {
  slug: "ts20-abstract-classes",
  code: "TS-20",
  title: "Abstract Classes and Interfaces",
  subtitle: "Master architectural blueprints with abstract classes, compare them with interfaces, and build extensible NestJS contracts.",
  sections: [
    {
      id: "part1",
      label: "Abstract Classes & Interfaces",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Abstract Classes vs Interfaces",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Contracts & Polymorphism",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Instantiation Trap",
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
    title: "Abstract Classes and Interfaces",
    bigPicture:
      "Interfaces are pure contracts with zero runtime code (used for NestJS Guards and Pipes). Abstract classes are base templates that cannot be instantiated directly, but let subclasses share reusable concrete code.",
    breakdownTitle: "Three Structural Differences",
    breakdownItems: [
      {
        title: "Runtime Presence",
        desc: "Abstract classes emit real JavaScript classes into production bundles. Interfaces are completely erased at compile time.",
      },
      {
        title: "Shared Implementation",
        desc: "Abstract classes provide concrete shared helper methods that all derived subclasses inherit without rewriting.",
      },
      {
        title: "Single vs Multiple Inheritance",
        desc: "A class can extend only one abstract class, but can implement dozens of interfaces simultaneously (e.g. CanActivate, OnModuleInit).",
      },
    ],
  },
  part2: {
    title: "When to Use Abstract Classes vs Interfaces",
    intro:
      "Observe the functional differences between pure contracts and partial implementations in backend services:",
    cards: [
      {
        number: "01",
        tag: "Interface",
        title: "1. Interface: Framework Contract",
        description:
          "Zero runtime bytes. Defines method signatures that classes fulfill using the 'implements' keyword (like NestJS Guards).",
        codeSnippet:
          "interface CanActivate {\n  canActivate(req: any): boolean;\n}\nclass AuthGuard implements CanActivate {\n  canActivate(req: any) { return !!req.headers.auth; }\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "Abstract Class",
        title: "2. Abstract Class: Base Repository",
        description:
          "Mixes concrete shared methods with abstract declarations that child classes must supply.",
        codeSnippet:
          "abstract class BaseRepo<T> {\n  abstract tableName: string;\n  findById(id: string) {\n    return `SELECT * FROM ${this.tableName} WHERE id = '${id}'`;\n  }\n}",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Subclass",
        title: "3. Concrete Subclass",
        description:
          "Subclasses extend the abstract parent, providing the required table name or specific overrides.",
        codeSnippet:
          "class UsersRepo extends BaseRepo<{ id: string; name: string }> {\n  tableName = 'users';\n}\nconsole.log(new UsersRepo().findById('u1'));\n// Output: SELECT * FROM users WHERE id = 'u1'",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Architecture Decision Rule",
      content:
        "Use an interface when defining pure behavioral contracts (Guards, Pipes, Interceptors, DTOs). Use an abstract class when subclasses need to inherit concrete reusable code alongside required blueprint methods.",
    },
  },
  part3: {
    title: "Contracts and Polymorphism in Action",
    intro:
      "Explore how interfaces and abstract classes enable polymorphism and swappable backend services:",
    points: [
      {
        title: "1. Defining Contracts for Framework Plugins",
        content:
          "In NestJS, decorators and pipelines accept any object that satisfies an interface contract, decoupling framework internals from your business logic.",
        codeSnippet:
          "interface PipeTransform<T = any, R = any> {\n  transform(value: T): R;\n}\nclass ParseIntPipe implements PipeTransform<string, number> {\n  transform(val: string): number { return parseInt(val, 10); }\n}",
      },
      {
        title: "2. Template Method Pattern with Abstract Classes",
        content:
          "Abstract classes can define a standard workflow algorithm while leaving individual execution details to child classes.",
        codeSnippet:
          "abstract class PaymentProcessor {\n  public processOrder(amount: number) {\n    this.logTransaction(amount);\n    return this.executeCharge(amount);\n  }\n  private logTransaction(amt: number) { console.log(`Processing: $${amt}`); }\n  protected abstract executeCharge(amount: number): boolean;\n}",
      },
      {
        title: "3. Polymorphism & Swappable Implementations",
        content:
          "Functions depend on the interface or abstract base class, allowing you to swap production and test mock implementations seamlessly.",
        codeSnippet:
          "class StripeProcessor extends PaymentProcessor {\n  protected executeCharge(amt: number) { return true; }\n}\nfunction checkout(processor: PaymentProcessor) {\n  return processor.processOrder(100);\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Trying to Instantiate Abstract Classes",
    bad: {
      title: "❌ Calling 'new' Directly on an Abstract Class",
      code:
        "abstract class BaseService {\n  abstract execute(): void;\n}\n\n// Compile Error: Cannot create an instance of an abstract class:\n// const svc = new BaseService();",
      explanation:
        "Abstract classes are incomplete blueprints by design. They cannot be instantiated directly because their abstract methods have no executable implementation.",
    },
    good: {
      title: "✅ Instantiate a Derived Concrete Subclass",
      code:
        "abstract class BaseService {\n  abstract execute(): void;\n}\nclass RealService extends BaseService {\n  execute() { console.log('Service running'); }\n}\nconst svc = new RealService();\nsvc.execute();\n// Output: Service running",
      explanation:
        "Subclasses supply the missing method implementations, producing complete, instantiable classes ready for execution or dependency injection.",
    },
    whyItMatters:
      "In NestJS, abstract classes serve as base providers or custom strategies (e.g. PassportStrategy). Knowing that only concrete subclasses can be instantiated prevents runtime and compile errors.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Experiment with interface contracts, abstract base classes, and polymorphism in this backend authentication model:",
    starterCode:
      "// TS-20: Interface Contracts & Abstract Classes in Backends\ninterface CanActivate {\n  canActivate(role: string): boolean;\n}\n\nabstract class BaseGuard implements CanActivate {\n  constructor(public readonly guardName: string) {}\n\n  // Abstract method child guards must implement:\n  abstract canActivate(role: string): boolean;\n\n  public logAttempt(role: string): void {\n    console.log(`[${this.guardName}] Checking access for role: ${role}`);\n  }\n}\n\nclass AdminGuard extends BaseGuard {\n  constructor() {\n    super(\"AdminGuard\");\n  }\n\n  canActivate(role: string): boolean {\n    this.logAttempt(role);\n    return role === \"admin\";\n  }\n}\n\nconst guard = new AdminGuard();\nconsole.log(\"Is User allowed:\", guard.canActivate(\"user\"));\nconsole.log(\"Is Admin allowed:\", guard.canActivate(\"admin\"));\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "When is it better to use an `abstract class` instead of an `interface` in TypeScript?",
      options: [
        "When you want zero runtime code in your production JavaScript bundle.",
        "When related subclasses need to share concrete method implementations or state alongside required abstract contracts.",
        "When you need a class to implement multiple contracts simultaneously.",
        "When defining simple data shape types for API responses.",
      ],
      correctIndex: 1,
      explanation:
        "Use an `abstract class` when you want to provide shared, reusable method implementations and state across related subclasses. An `interface` cannot contain any executable implementation and exists only at compile time.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Interfaces as Contracts",
        desc: "Use interfaces for zero-runtime framework contracts (like NestJS Guards, Pipes, and Lifecycle Hooks).",
      },
      {
        title: "Abstract Classes for Base Logic",
        desc: "Use abstract classes when subclasses need to share concrete executable methods alongside required abstract contracts.",
      },
      {
        title: "Polymorphism",
        desc: "Depend on abstractions rather than concrete classes to easily swap production services for test mocks.",
      },
    ],
    nextLessonPreview: {
      title: "TS-21: Indexed Access and typeof",
      desc: "Learn lookup types (T[K]) and how to extract types directly from runtime constants using the typeof query.",
    },
  },
};
