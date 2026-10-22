import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js19ClassesExtendsAndSuperContent: StandardLessonContent = {
  "slug": "js19-classes-extends-and-super",
  "code": "JS-19",
  "title": "Classes: Modern OOP with extends, super & Private Fields",
  "subtitle": "Write modern object-oriented code using classes, constructor functions, inheritance, and private fields.",
  "sections": [
    {
      "id": "part1",
      "label": "Class Syntax",
      "icon": "🏛️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "Inheritance & super",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Private Fields & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Missing super() Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Classes Sandbox",
      "icon": "🚀",
      "tag": "SANDBOX"
    },
    {
      "id": "part6",
      "label": "Key Takeaways",
      "icon": "🎓",
      "tag": "SUMMARY"
    },
    {
      "id": "part7",
      "label": "Knowledge Check",
      "icon": "🎯",
      "tag": "QUIZ"
    }
  ],
  "part1": {
    "title": "Modern Class Architecture",
    "bigPicture": "ES6 classes provide a clean, readable syntax for creating blueprints of objects. Under the hood, classes still use prototypes, but eliminate verbose constructor boilerplate.",
    "analogy": "Think of a class like an architectural blueprint for a house. The blueprint defines rooms and doors; you use `new House()` to build real houses from it.",
    "diagram": "class Vehicle { ... }\n        |\n        +---> class Car extends Vehicle {\n                constructor(brand) {\n                  super(\"Car\"); // Calls Vehicle constructor\n                }\n              }",
    "breakdownTitle": "Class Capabilities",
    "breakdownItems": [
      {
        "title": "constructor()",
        "desc": "The initialization method called automatically when creating instances with `new`."
      },
      {
        "title": "extends & super()",
        "desc": "`extends` inherits from a parent class; `super()` calls the parent constructor."
      },
      {
        "title": "Private Fields (#)",
        "desc": "Enforces true privacy; fields starting with `#` cannot be accessed from outside."
      }
    ]
  },
  "part2": {
    "title": "Class Syntax & Inheritance",
    "intro": "Create classes, inherit with `extends`, and encapsulate private fields.",
    "cards": [
      {
        "number": "01",
        "tag": "Blueprint",
        "title": "Basic Class",
        "description": "Define constructors and instance methods with clean syntax.",
        "codeSnippet": "class User {\n  constructor(name) { this.name = name; }\n  sayHello() { return \"Hi, \" + this.name; }\n}\nconst user = new User(\"Alex\");\nconsole.log(user.sayHello()); // Output: Hi, Alex",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Inheritance",
        "title": "extends & super()",
        "description": "Inherit parent behavior and call the parent constructor.",
        "codeSnippet": "class Admin extends User {\n  constructor(name) {\n    super(name);\n    this.role = \"admin\";\n  }\n}\nconst admin = new Admin(\"Maria\");\nconsole.log(admin.sayHello(), admin.role); // Output: Hi, Maria admin",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Private",
        "title": "Private Fields (#)",
        "description": "Hide internal state with the `#` prefix for true encapsulation.",
        "codeSnippet": "class BankAccount {\n  #balance = 100;\n  getBalance() { return this.#balance; }\n}\nconst acc = new BankAccount();\nconsole.log(acc.getBalance()); // Output: 100",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "super() First Rule",
      "content": "Always call `super()` before accessing `this` inside a subclass constructor."
    }
  },
  "part3": {
    "title": "Private Fields & Reading AI Code",
    "intro": "Master true class encapsulation and method overriding.",
    "points": [
      {
        "title": "1. Calling super() in Derived Classes",
        "content": "In subclasses, JavaScript requires `super()` to initialize the parent before `this` can be referenced.",
        "codeSnippet": "class Animal {\n  constructor(name) { this.name = name; }\n}\n\nclass Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // Must be first!\n    this.breed = breed;\n  }\n}\n\nconst dog = new Dog(\"Rex\", \"Shepherd\");\nconsole.log(dog.name, dog.breed); // Output: Rex Shepherd"
      },
      {
        "title": "2. Truly Private State with #",
        "content": "Private fields cannot be read or modified outside the class, preventing external code from corrupting internal state.",
        "codeSnippet": "class Wallet {\n  #funds = 50;\n  \n  deposit(amount) {\n    if (amount > 0) this.#funds += amount;\n  }\n  \n  get balance() {\n    return this.#funds;\n  }\n}\n\nconst w = new Wallet();\nw.deposit(25);\nconsole.log(\"Wallet balance:\", w.balance); // Output: Wallet balance: 75"
      },
      {
        "title": "3. Static Class Methods",
        "content": "Static methods are called on the class itself, not on instances. Ideal for factory methods and utility helpers.",
        "codeSnippet": "class MathHelper {\n  static square(n) {\n    return n * n;\n  }\n}\n\nconsole.log(MathHelper.square(5)); // Output: 25"
      }
    ]
  },
  "part4": {
    "title": "Accessing this Before super()",
    "bad": {
      "title": "❌ Accessing this Before super()",
      "code": "class Employee extends User {\n  constructor(name, role) {\n    // Bug: Accessing this before calling super()!\n    this.role = role;\n    super(name);\n  }\n}\n\n// Throws: ReferenceError: Must call super constructor before using 'this'",
      "explanation": "Subclasses do not own `this` until `super()` has executed and initialized the parent class."
    },
    "good": {
      "title": "✅ Call super() First",
      "code": "class Employee extends User {\n  constructor(name, role) {\n    super(name); // Initialized parent first!\n    this.role = role; // Now safe to use this\n  }\n}\n\nconst emp = new Employee(\"Sam\", \"Developer\");\nconsole.log(emp.name, emp.role); // Output: Sam Developer",
      "explanation": "Always call `super(...)` on the first line of subclass constructors."
    }
  },
  "part5": {
    "title": "Interactive Classes Sandbox",
    "intro": "Create classes, extend subclasses, and use private fields.",
    "starterCode": "class Task {\n  #completed = false;\n  \n  constructor(title) {\n    this.title = title;\n  }\n  \n  complete() {\n    this.#completed = true;\n  }\n  \n  getStatus() {\n    return this.title + \" is \" + (this.#completed ? \"Done\" : \"Pending\");\n  }\n}\n\nconst myTask = new Task(\"Write Documentation\");\nconsole.log(myTask.getStatus());\nmyTask.complete();\nconsole.log(myTask.getStatus());\n"
  },
  "part6": {
    "title": "Key Takeaways: Classes & OOP",
    "takeaways": [
      {
        "title": "Class Blueprint",
        "desc": "Classes provide clean OOP syntax built on top of JavaScript prototypes."
      },
      {
        "title": "Call super() First",
        "desc": "Subclasses must call super() before accessing this in their constructors."
      },
      {
        "title": "Private Fields with #",
        "desc": "Use #fieldName to create truly private variables inside classes."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What happens if a subclass constructor accesses `this.prop` before calling `super()`?",
      "options": [
        "It throws a ReferenceError",
        "It silently assigns to the global object",
        "It defaults to undefined without error",
        "It converts the class to an arrow function"
      ],
      "correctIndex": 0,
      "explanation": "JavaScript enforces that derived constructors must call `super()` before accessing `this`. Accessing `this` beforehand throws a `ReferenceError`."
    }
  }
};
