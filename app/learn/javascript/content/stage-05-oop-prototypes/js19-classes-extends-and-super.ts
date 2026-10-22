import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js19ClassesExtendsAndSuperContent: StandardLessonContent = {
  slug: "js19-classes-extends-and-super",
  code: "JS-19",
  title: "Working with Classes",
  subtitle: "Write clean object-oriented code with ES6 class syntax, inheritance with extends, and initialize derived classes with super().",
  sections: [
    {
      id: "part1",
      label: "Classes & Prototypes",
      icon: "🏛️",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "Class Syntax & Methods",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "extends & super()",
      icon: "🧬",
      tag: "INHERITANCE"
    },
    {
      id: "part4",
      label: "Missing super() Bug",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Classes Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Summary Takeaways",
      icon: "🎓",
      tag: "SUMMARY"
    },
    {
      id: "part7",
      label: "Knowledge Check",
      icon: "🎯",
      tag: "ASSESSMENT"
    }
  ],
  part1: {
    title: "ES6 Classes: Prototypes Under the Hood",
    bigPicture: "ES6 class syntax provides a clean, familiar syntax for object-oriented programming. Under the hood, classes still use JavaScript's prototypal inheritance model.",
    analogy: "A class is like an architectural blueprint for a house: the constructor sets up the unique rooms (properties), and class methods are the shared plumbing and electrical connections (prototype).",
    diagram: "class User { ... }                 Under the Hood:\n-------------------------------    ----------------------------------\nconstructor(name) { ... }    -->   function User(name) { ... }\nlogin() { ... }              -->   User.prototype.login = function()",
    breakdownTitle: "Class Architecture",
    breakdownItems: [
      {
        title: "The constructor() Method",
        desc: "Executes automatically when creating a new instance with new. Initializes own instance properties on this."
      },
      {
        title: "Class Methods on Prototype",
        desc: "Methods defined in a class body are placed automatically onto the prototype, avoiding function duplication."
      },
      {
        title: "Private Fields (#)",
        desc: "Prefixing a field with # makes it strictly private and inaccessible outside the class body."
      }
    ]
  },
  part2: {
    title: "Defining Classes and Private Fields",
    intro: "Modern syntax for constructors, methods, and encapsulation.",
    cards: [
      {
        number: "01",
        tag: "Class",
        title: "Class Definition",
        description: "Defines constructors and shared prototype methods in one readable block.",
        codeSnippet: "class Account {\n  constructor(owner) {\n    this.owner = owner;\n  }\n  greet() {\n    return `Welcome, ${this.owner}`;\n  }\n}\nconst acc = new Account(\"Alex\");\nconsole.log(acc.greet()); // Output: Welcome, Alex",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Private",
        title: "Private Fields (#field)",
        description: "True language-enforced encapsulation that cannot be read or modified outside the class.",
        codeSnippet: "class Wallet {\n  #balance = 0;\n  deposit(amount) { this.#balance += amount; }\n  getBalance() { return this.#balance; }\n}\nconst w = new Wallet();\nw.deposit(50);\nconsole.log(w.getBalance()); // Output: 50\n// console.log(w.#balance); // SyntaxError!",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Static",
        title: "Static Methods",
        description: "Methods attached to the class constructor itself rather than instances.",
        codeSnippet: "class MathUtils {\n  static cube(n) { return n * n * n; }\n}\nconsole.log(MathUtils.cube(3)); // Output: 27",
        color: "purple"
      }
    ],
    rule: {
      title: "new Invocation Invariant",
      content: "Classes must always be called with the new keyword (e.g. new User()). Calling a class like a regular function throws a TypeError."
    }
  },
  part3: {
    title: "Inheritance with extends & super()",
    intro: "Derive child classes from parent classes cleanly.",
    points: [
      {
        title: "1. The extends Keyword",
        content: "extends sets up the prototype chain between the parent and child classes.",
        codeSnippet: "class Animal {\n  constructor(name) { this.name = name; }\n  eat() { return `${this.name} is eating.`; }\n}\nclass Dog extends Animal {}\nconst dog = new Dog(\"Buddy\");\nconsole.log(dog.eat()); // Output: Buddy is eating."
      },
      {
        title: "2. The super() Constructor Call",
        content: "In derived classes, super() invokes the parent class constructor to initialize inherited properties.",
        codeSnippet: "class Dog extends Animal {\n  constructor(name, breed) {\n    super(name); // Calls Animal constructor\n    this.breed = breed;\n  }\n}\nconst pup = new Dog(\"Rover\", \"Golden\");\nconsole.log(pup.name, pup.breed); // Output: Rover Golden"
      },
      {
        title: "3. Overriding and super.method()",
        content: "Child classes can override parent methods and call the parent version with super.method().",
        codeSnippet: "class LoudDog extends Dog {\n  eat() {\n    return super.eat() + \" Enthusiastically!\";\n  }\n}\nconst loud = new LoudDog(\"Max\", \"Husky\");\nconsole.log(loud.eat()); // Output: Max is eating. Enthusiastically!"
      }
    ]
  },
  part4: {
    title: "Common Pitfall: Using this Before super() in Subclasses",
    bad: {
      title: "❌ Accessing this Before super()",
      code: "class AdminUser extends User {\n  constructor(name, role) {\n    // Bug: Must call super() first!\n    // this.role = role; // ReferenceError: Must call super constructor before accessing 'this'\n    // super(name);\n  }\n}",
      explanation: "In JavaScript derived classes, the parent constructor allocates the instance object for this. Accessing this before super() throws a fatal ReferenceError."
    },
    good: {
      title: "✅ Call super() Before Accessing this",
      code: "class AdminUser extends User {\n  constructor(name, role) {\n    super(name); // Initializes 'this' from parent first!\n    this.role = role; // Safe to use 'this' now\n  }\n}\nconst admin = new AdminUser(\"Sarah\", \"SuperAdmin\");\nconsole.log(admin.name, admin.role); // Output: Sarah SuperAdmin",
      explanation: "Always call super() as the very first statement in a derived class constructor."
    }
  },
  part5: {
    title: "Classes Sandbox",
    intro: "Build a base Vehicle class and extend it with a Car subclass using extends and super().",
    starterCode: "class Vehicle {\n  constructor(make, model) {\n    this.make = make;\n    this.model = model;\n  }\n  getInfo() {\n    return `${this.make} ${this.model}`;\n  }\n}\n\nclass ElectricCar extends Vehicle {\n  constructor(make, model, batteryCapacity) {\n    super(make, model); // Call parent constructor\n    this.batteryCapacity = batteryCapacity;\n  }\n  getInfo() {\n    return `${super.getInfo()} (${this.batteryCapacity} kWh)`;\n  }\n}\n\nconst ev = new ElectricCar(\"Tesla\", \"Model Y\", 75);\nconsole.log(ev.getInfo());\n"
  },
  part6: {
    title: "Key Takeaways: Classes & OOP",
    takeaways: [
      {
        title: "Sugar Over Prototypes",
        desc: "Classes offer a clean OOP syntax while delegating to prototypes under the hood."
      },
      {
        title: "super() Initializes this",
        desc: "Derived class constructors must call super() before accessing this."
      },
      {
        title: "Private Fields with #",
        desc: "Use #fieldName to encapsulate private state securely within the class body."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if a child class constructor accesses `this.property` before calling `super()`?",
      options: [
        "It sets the property to undefined",
        "It throws a ReferenceError because the instance object has not yet been initialized by the parent",
        "It creates a new prototype link automatically",
        "It calls the parent constructor silently in the background"
      ],
      correctIndex: 1,
      explanation: "In derived classes, `this` is created by the parent class constructor. Accessing `this` before calling `super()` results in a fatal `ReferenceError`."
    }
  }
};
