import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts06FunctionTypesContent: StandardLessonContent = {
  slug: "ts06-function-types",
  code: "TS-06",
  title: "Typing Functions and Return Values",
  subtitle: "Learn parameter types, optional parameters, and reusable function signatures in plain, simple words.",
  sections: [
    {
      id: "part1",
      label: "Function Types",
      icon: "🧠",
      tag: "CORE CONCEPT",
    },
    {
      id: "part2",
      label: "Function Syntax",
      icon: "⚙️",
      tag: "SYNTAX & RULES",
    },
    {
      id: "part3",
      label: "Reusable Signatures",
      icon: "📖",
      tag: "STEP-BY-STEP",
    },
    {
      id: "part4",
      label: "Implicit any Trap",
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
    title: "Typing Functions and Return Values",
    bigPicture:
      "Always type your function parameters so TypeScript knows what values can enter. Return types are usually inferred automatically, but you can write them explicitly.",
    breakdownTitle: "Three Function Essentials",
    breakdownItems: [
      {
        title: "Parameter Types",
        desc: "Must be typed explicitly so callers cannot pass the wrong data (e.g. (id: string, count: number)).",
      },
      {
        title: "Optional & Default Params",
        desc: "Use '?' for optional arguments or assign defaults like (rate = 0.05) to infer the type automatically.",
      },
      {
        title: "Function Types",
        desc: "Define reusable callable signatures for callbacks (e.g. type Formatter = (text: string) => string).",
      },
    ],
  },
  part2: {
    title: "How Function Typing Works",
    intro:
      "Observe the standard ways to type parameters, default values, and function variables:",
    cards: [
      {
        number: "01",
        tag: "Parameters",
        title: "1. Typed Parameters",
        description:
          "Type each parameter. The return type is inferred automatically.",
        codeSnippet:
          "function add(a: number, b: number) {\n  return a + b; // Return inferred as number\n}",
        color: "purple",
      },
      {
        number: "02",
        tag: "Defaults",
        title: "2. Default Parameters",
        description:
          "Default values automatically infer the parameter type.",
        codeSnippet:
          "function greet(name: string, prefix = 'Hello') {\n  return `${prefix}, ${name}!`;\n}\nconsole.log(greet('Alex')); // 'Hello, Alex!'",
        color: "cyan",
      },
      {
        number: "03",
        tag: "Type Alias",
        title: "3. Function Type Alias",
        description:
          "Create reusable shapes for callback functions.",
        codeSnippet:
          "type MathOp = (x: number, y: number) => number;\nconst multiply: MathOp = (a, b) => a * b;",
        color: "emerald",
      },
    ],
    rule: {
      title: "The Parameter Annotation Rule",
      content:
        "Parameters are never automatically inferred from callers. You must always annotate function parameters to prevent unsafe implicit 'any'.",
    },
  },
  part3: {
    title: "Why and When to Use Function Types",
    intro:
      "Everyday situations where function types make your code cleaner and safer:",
    points: [
      {
        title: "1. Type-Safe Callback Functions",
        content:
          "Passing callbacks to higher-order functions ensures arguments and return values match expectations.",
        codeSnippet:
          "function runTask(onComplete: (success: boolean) => void) {\n  onComplete(true);\n}",
      },
      {
        title: "2. Rest Parameters with Arrays",
        content:
          "Type rest parameters as arrays to safely accept any number of arguments.",
        codeSnippet:
          "function sum(...numbers: number[]): number {\n  return numbers.reduce((acc, curr) => acc + curr, 0);\n}",
      },
      {
        title: "3. Explicit Return Types for Public APIs",
        content:
          "Writing explicit return types prevents accidental changes when editing a function body.",
        codeSnippet:
          "function getUser(id: string): { id: string; name: string } {\n  return { id, name: 'Alice' };\n}",
      },
    ],
  },
  part4: {
    title: "Common Pitfall: Forgetting Parameter Types",
    bad: {
      title: "❌ Leaving Parameters Untyped",
      code:
        "// Implicit any: TypeScript cannot protect callers from bugs:\nfunction calculate(price, discount) {\n  return price - discount;\n}",
      explanation:
        "Without types, callers can pass strings like calculate('100', '10') causing unexpected NaN bugs.",
    },
    good: {
      title: "✅ Add Types to All Function Parameters",
      code:
        "function calculate(price: number, discount: number): number {\n  return price - discount;\n}\nconsole.log(calculate(100, 20)); // Output: 80",
      explanation:
        "Explicit parameter types block invalid inputs right inside your editor.",
    },
    whyItMatters:
      "Functions are your code's input gates. Explicit parameter types prevent 90% of runtime data bugs.",
  },
  part5: {
    title: "Interactive Code Playground",
    intro:
      "Practice declaring and calling typed functions in the live editor:",
    starterCode:
      "// TS-06: Function Types\ntype DiscountCalculator = (price: number, percent: number) => number;\n\nconst applyDiscount: DiscountCalculator = (price, percent) => {\n  return price * (1 - percent / 100);\n};\n\nfunction formatCurrency(amount: number, symbol = \"$\"): string {\n  return `${symbol}${amount.toFixed(2)}`;\n}\n\nconst finalPrice = applyDiscount(120, 15);\nconsole.log(`Final Price: ${formatCurrency(finalPrice)}`);\n",
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question:
        "Why does TypeScript require explicit type annotations on function parameters?",
      options: [
        "Because JavaScript engines crash if parameters don't have types.",
        "Because parameters are the entry points to functions; without types, they default to unsafe `implicit any`.",
        "Because functions cannot return values without parameter types.",
        "Because arrow functions cannot have default parameters.",
      ],
      correctIndex: 1,
      explanation:
        "TypeScript cannot safely guess what callers intend to pass into a function. Parameter annotations are required to prevent functions from falling back to unsafe `implicit any`.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Annotate Parameters",
        desc: "Always type function parameters; return types can usually be inferred automatically.",
      },
      {
        title: "Default & Optional",
        desc: "Use ? for optional parameters and = value for defaults that infer their own type.",
      },
      {
        title: "Function Type Aliases",
        desc: "Use type Op = (a: number) => void to describe reusable callback and handler shapes.",
      },
    ],
    nextLessonPreview: {
      title: "TS-07: Function Overloads",
      desc: "Learn when and how to write function overloads when a function returns different types based on input arguments.",
    },
  },
};
