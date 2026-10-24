import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const ts14ClassesAndObjectsContent: StandardLessonContent = {
  slug: "ts14-classes-and-objects",
  code: "TS-14",
  title: "Classes, Objects, and Constructors",
  subtitle: "Master blueprints, instances, and the 4 foundational pillars of OOP in TypeScript.",
  difficulty: "Easy",
  scenario: {
    question: "You need to model shopping cart items with a name and price, and display each item's details. How would you structure this using a class and constructor?",
    answer: "Create a CartItem class with name and price properties, assign them inside constructor(name: string, price: number), and add a display() method that returns the item details.",
  },
  sections: [
    { id: "part1", label: "Core Concept & Syntax", icon: "🧠" },
    { id: "part2", label: "Why It Matters & Rules", icon: "⚙️" },
    { id: "part3", label: "How It Works in Practice", tag: "IN PRACTICE", icon: "🎯" },
    { id: "part4", label: "Common Pitfalls & Fixes", icon: "🛡️" },
    { id: "part5", label: "Interactive Sandbox", icon: "💻" },
    { id: "part6", label: "Knowledge Check Quiz", icon: "🎯" },
    { id: "part7", label: "Summary & Key Takeaways", icon: "🎓" },
  ],
  part1: {
    title: "Classes, Objects, and the 4 Pillars of OOP",
    bigPicture: "A class is a blueprint that defines properties and behaviors. An object is a concrete living instance created with 'new'. The constructor initializes instance data. Classes serve as the foundation for Object-Oriented Programming (OOP) and its 4 core pillars: Encapsulation, Abstraction, Inheritance, and Polymorphism.",
    codeSnippet: `class User {
  name: string;
  role: string;

  // The constructor runs automatically when 'new User()' is called
  constructor(name: string, role: string) {
    this.name = name;
    this.role = role;
  }

  // A method shared by all instances
  introduce(): string {
    return \`\${this.name} is a \${this.role}.\`;
  }
}

// Creating concrete object instances from the blueprint:
const user1 = new User("Rina", "Designer");
const user2 = new User("Mehedi", "Engineer");

console.log(user1.introduce()); // "Rina is a Designer."
console.log(user2.introduce()); // "Mehedi is an Engineer."`,
    breakdownTitle: "Key Concepts Explained",
    breakdownItems: [
      {
        title: "1. Class Blueprint",
        desc: "Defines the shape, properties (name, role), and methods (introduce()) that every created instance will have.",
      },
      {
        title: "2. Constructor Function",
        desc: "Executes automatically when 'new' is called, safely initializing each object's unique property values.",
      },
      {
        title: "3. Object Instances",
        desc: "Each instance (user1, user2) holds its own distinct values in memory while sharing the same class methods.",
      },
      {
        title: "4. The 4 OOP Pillars Roadmap",
        desc: "Classes enable: 1) Encapsulation (protecting data), 2) Abstraction (hiding complexity), 3) Inheritance (reusing code), and 4) Polymorphism (many forms).",
      },
    ],
  },
  part2: {
    title: "Why and When to Use It",
    rule: {
      title: "The Class Blueprint Rule",
      content: "Use classes when you need reusable blueprints that bundle state properties together with related methods.",
    },
    cards: [
      {
        number: "01",
        tag: "BLUEPRINT",
        title: "Class Definition",
        description: "Declares the shape, fields, and behaviors that all instances will share.",
        color: "purple",
      },
      {
        number: "02",
        tag: "INITIALIZATION",
        title: "Constructor",
        description: "Accepts initial arguments and assigns them to 'this' properties when creating instances.",
        color: "cyan",
      },
      {
        number: "03",
        tag: "INSTANCE",
        title: "Objects ('new')",
        description: "Creates independent living objects that maintain their own separate state.",
        color: "emerald",
      },
    ],
  },
  part3: {
    title: "How It Works in Practice",
    intro: "Here is how classes, objects, and constructors function in TypeScript:",
    points: [
      {
        title: "1. Classes define state and actions together",
        content: "Instead of having loose functions and disconnected objects, a class groups related data and functions in one coherent place.",
      },
      {
        title: "2. The constructor initializes state safely",
        content: "TypeScript checks that all non-optional class properties are properly assigned in the constructor.",
      },
      {
        title: "3. Multiple objects share the same methods",
        content: "Methods defined on the class are shared across all instances, saving memory while keeping individual data separate.",
      },
    ],
  },
  part4: {
    title: "Common Pitfall vs Clean Solution",
    bad: {
      title: "Uninitialized Properties",
      code: `class Product {\n  title: string; // ❌ Error under strictPropertyInitialization\n  price: number;\n}`,
      explanation: "Declaring properties without initializing them or setting them in a constructor causes runtime undefined errors.",
    },
    good: {
      title: "Constructor Initialization",
      code: `class Product {\n  title: string;\n  price: number;\n\n  constructor(title: string, price: number) {\n    this.title = title;\n    this.price = price;\n  }\n}`,
      explanation: "Using a constructor guarantees that every required property has a valid value before the object is used.",
    },
  },
  part5: {
    title: "Interactive Code Sandbox",
    intro: "Run this example to see how classes and constructors initialize objects:",
    starterCode: `class CartItem {
  name: string;
  price: number;

  constructor(name: string, price: number) {
    this.name = name;
    this.price = price;
  }

  display(): string {
    return \`Item: \${this.name} costs $\${this.price}\`;
  }
}

const item1 = new CartItem("Mechanical Keyboard", 120);
const item2 = new CartItem("Wireless Mouse", 45);

console.log(item1.display());
console.log(item2.display());`,
  },
  part6: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary role of a constructor in a TypeScript class?",
      options: [
        "To initialize an object's properties when a new instance is created",
        "To delete the class from computer memory",
        "To convert TypeScript types into HTML elements",
        "To prevent any new instances from being created",
      ],
      correctIndex: 0,
      explanation: "The constructor is a special method that executes automatically when 'new' is called to initialize property values.",
    },
  },
  part7: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "1. Blueprints & Instances",
        desc: "A class is the blueprint; 'new ClassName()' creates concrete instances.",
      },
      {
        title: "2. Constructors",
        desc: "Constructors run upon instantiation to initialize instance properties.",
      },
      {
        title: "3. The 4 OOP Pillars",
        desc: "Classes form the bedrock for Encapsulation, Abstraction, Inheritance, and Polymorphism.",
      },
    ],
    nextLessonPreview: {
      title: "Access Modifiers and Encapsulation",
      desc: "Learn how public, private, protected, and readonly protect your class state.",
    },
  },
};

