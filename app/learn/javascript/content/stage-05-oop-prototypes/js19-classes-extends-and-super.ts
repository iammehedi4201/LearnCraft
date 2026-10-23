import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js19ClassesExtendsAndSuperContent: StandardLessonContent = {
  slug: "js19-classes-extends-and-super",
  code: "JS-19",
  title: "Working with Classes",
  subtitle: "Write clean object-oriented code using the class blueprint syntax, constructors, extends for inheritance, and the super() rule.",
  sections: [
    {
      id: "part1",
      label: "Working with Classes",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "Class Syntax & Constructors",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "extends & super()",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "this Before super()",
      icon: "🛡️",
      tag: "COMMON PITFALL"
    },
    {
      id: "part5",
      label: "Code Playground",
      icon: "💻",
      tag: "PLAYGROUND"
    },
    {
      id: "part6",
      label: "Key Takeaways",
      icon: "🎓",
      tag: "KEY TAKEAWAYS"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "Working with Classes",
    bigPicture: "Classes provide blueprints for creating objects with shared methods and constructor state. Child classes use `extends` and `super()` to inherit behavior from parent classes.",
    breakdownTitle: "Class Architecture",
    breakdownItems: [
      {
        title: "The constructor Method",
        desc: "Initializes instance properties when instantiated with `new ClassName()`."
      },
      {
        title: "Instance Methods",
        desc: "Functions defined inside the class body that all instances share through the prototype."
      },
      {
        title: "Inheritance (extends & super)",
        desc: "Child classes inherit parent methods and call `super()` to initialize parent constructors."
      }
    ]
  },
  part2: {
    title: "Class Syntax, Constructors, and Methods",
    intro: "Step through how to define and instantiate classes.",
    cards: [
      {
        number: "01",
        tag: "Class",
        title: "Defining a Class",
        description: "Use the class keyword and define initial properties inside constructor().",
        codeSnippet: "class Account {\n  constructor(owner, initialBalance = 0) {\n    this.owner = owner;\n    this.balance = initialBalance;\n  }\n  deposit(amount) {\n    this.balance += amount;\n    return this.balance;\n  }\n}\nconst acc = new Account(\"Maya\", 100);\nacc.deposit(50);\nconsole.log(acc.balance); // Output: 150",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Inherit",
        title: "Subclassing with extends",
        description: "Child classes inherit all properties and methods from their parent.",
        codeSnippet: "class PremiumAccount extends Account {\n  getPerks() {\n    return \"Zero transaction fees & priority support\";\n  }\n}\nconst vip = new PremiumAccount(\"Alex\", 500);\nconsole.log(vip.deposit(100)); // Output: 600 (Inherited!)\nconsole.log(vip.getPerks());   // Output: Zero transaction fees & priority support",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Parent",
        title: "Calling super()",
        description: "Calls the parent constructor to initialize inherited fields.",
        codeSnippet: "class Admin extends Account {\n  constructor(owner, role) {\n    super(owner); // Passes owner to parent constructor\n    this.role = role;\n  }\n}\nconst admin = new Admin(\"Sam\", \"SuperUser\");\nconsole.log(admin.owner, admin.role); // Output: Sam SuperUser",
        color: "purple"
      }
    ],
    rule: {
      title: "The 'new' Requirement",
      content: "Classes MUST always be called with the 'new' keyword (new User()). Calling User() directly without 'new' throws a TypeError."
    }
  },
  part3: {
    title: "Inheritance with extends and super()",
    intro: "Understand how subclasses build upon parent logic.",
    points: [
      {
        title: "1. Calling super() in Constructors",
        content: "If a child class has its own constructor, it MUST call super() before touching this. super() invokes the parent class's constructor.",
        codeSnippet: "class Vehicle {\n  constructor(wheels) {\n    this.wheels = wheels;\n  }\n}\nclass Car extends Vehicle {\n  constructor(make) {\n    super(4); // Tells Vehicle that cars have 4 wheels\n    this.make = make;\n  }\n}"
      },
      {
        title: "2. Overriding Parent Methods",
        content: "A child class can replace or enhance a parent method by declaring a method with the same name.",
        codeSnippet: "class User {\n  getPermissions() { return \"Read-only\"; }\n}\nclass Admin extends User {\n  getPermissions() { return \"Full Admin Access\"; } // Overrides parent!\n}\nconsole.log(new Admin().getPermissions()); // Output: Full Admin Access"
      },
      {
        title: "3. Calling Parent Methods with super.method()",
        content: "You can reuse and extend the parent method's work by calling super.methodName().",
        codeSnippet: "class User {\n  describe() { return \"Registered user\"; }\n}\nclass Moderator extends User {\n  describe() {\n    return `${super.describe()} with moderator privileges`;\n  }\n}\nconsole.log(new Moderator().describe()); // Output: Registered user with moderator privileges"
      }
    ]
  },
  part4: {
    title: "Common Trap: Accessing 'this' Before super()",
    bad: {
      title: "❌ Accessing 'this' Before Calling super()",
      code: "class Employee extends Account {\n  constructor(name, department) {\n    this.department = department; // BUG: Used this before super!\n    super(name);\n  }\n}\n// ReferenceError: Must call super constructor in derived class before accessing 'this'",
      explanation: "JavaScript requires the parent class to initialize its state first. Accessing this before calling super() triggers a fatal ReferenceError."
    },
    good: {
      title: "✅ Call super() First",
      code: "class Employee extends Account {\n  constructor(name, department) {\n    super(name); // Always first line!\n    this.department = department;\n  }\n}\nconst emp = new Employee(\"Maya\", \"Engineering\");\nconsole.log(emp.owner, emp.department);\n// Output: Maya Engineering",
      explanation: "Always make super() the very first statement inside a child constructor."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Create a base Product class and extend it with a DiscountedProduct child class.",
    starterCode: "class Product {\n  constructor(title, price) {\n    this.title = title;\n    this.price = price;\n  }\n\n  getInfo() {\n    return `${this.title}: $${this.price}`;\n  }\n}\n\n// Subclass extending Product:\nclass DiscountedProduct extends Product {\n  constructor(title, price, discountPercent) {\n    super(title, price); // Initialize parent fields\n    this.discountPercent = discountPercent;\n  }\n\n  getSalePrice() {\n    const discount = this.price * (this.discountPercent / 100);\n    return this.price - discount;\n  }\n}\n\nconst saleItem = new DiscountedProduct(\"Mechanical Keyboard\", 120, 25);\nconsole.log(\"Standard info:\", saleItem.getInfo());\nconsole.log(\"Discounted sale price:\", `$${saleItem.getSalePrice()}`);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "Classes are Blueprints",
        desc: "Use class with constructor() to create structured object instances using 'new'."
      },
      {
        title: "extends Inherits Behavior",
        desc: "Child classes inherit methods and properties from parent classes."
      },
      {
        title: "super() Must Be Called First",
        desc: "In child constructors, always call super() before accessing 'this'."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "Why must super() be called in a child class constructor before accessing 'this'?",
      options: [
        "Because the parent class constructor must initialize its state before the child can use 'this'",
        "Because super() is required to connect to the database",
        "Because without super(), the child class is automatically deleted",
        "It is not required; super() is completely optional"
      ],
      correctIndex: 0,
      explanation: "In JavaScript derived classes, the parent constructor must run first to establish the object's instance state. Attempting to use 'this' before super() throws a ReferenceError."
    }
  }
};
