const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 6: JS-17, JS-18, JS-19
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch6Lessons = {
  "js17-the-this-keyword": {
    slug: "js17-the-this-keyword",
    code: "JS-17",
    title: "The this Keyword: Who Called Me?",
    subtitle: "Learn how this gets its value dynamically at call time, how arrow functions borrow this, and how to avoid losing context in callbacks.",
    sections: [
      { id: "part1", label: "Who Called Me?", icon: "👤", tag: "FOUNDATION" },
      { id: "part2", label: "The Dot Rule", icon: "🎯", tag: "RULES" },
      { id: "part3", label: "Arrows & Callbacks", icon: "🏹", tag: "ARROWS" },
      { id: "part4", label: "Detached Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "this Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The this Keyword: Who Is Speaking Right Now?",
      bigPicture: "The 'this' keyword is famously one of the most misunderstood topics in JavaScript. But you can master it with a simple analogy: think of 'this' like the pronoun 'I' or 'My'. If Alice says 'I am hungry', the word 'I' refers to Alice. If Bob says 'I am hungry', the word 'I' refers to Bob! The pronoun 'I' has no permanent identity—its meaning depends on who is speaking right now. In JavaScript, 'this' works the exact same way: its value depends on how a function is called, not where it was typed.",
      breakdownTitle: "The Three Core Rules of 'this':",
      breakdownItems: [
        {
          title: "The Dot Rule (user.speak())",
          desc: "Look immediately to the left of the dot when a function is called. Whatever is to the left of the dot becomes 'this' inside that function."
        },
        {
          title: "Arrow Functions Borrow 'this'",
          desc: "Arrow functions do NOT have their own 'this'. They simply borrow the 'this' value from the surrounding code where they were written."
        },
        {
          title: "The Detached Callback Trap",
          desc: "When an object method is passed as a detached callback without parentheses (like setTimeout(user.speak)), the dot disappears and 'this' is lost!"
        }
      ]
    },
    part2: {
      title: "The Dot Rule: Determining this at Call Time",
      intro: "Understanding how the object before the dot controls execution context:",
      cards: [
        {
          number: "01",
          tag: "Method Call",
          title: "The Dot Rule (obj.method())",
          description: "When invoked as player.attack(), the player object is directly to the left of the dot, so this points to player.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Lexical Scope",
          title: "Arrow Functions (() => {})",
          description: "Arrow functions never create their own this. They inherit this from the outer scope where they were written. Never use them as object methods!",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Fixed Context",
          title: "Explicit Binding (.bind())",
          description: "fn.bind(target) creates a brand-new function where this is permanently locked to the target object, even when passed as a callback.",
          color: "emerald"
        }
      ],
      rule: {
        title: "💡 Golden Rule of this and Methods",
        content: "Always use standard method syntax (greet() {}) for defining methods on objects. Use arrow functions inside methods when passing callbacks, so the callback safely borrows this from the method!"
      }
    },
    part3: {
      title: "Arrow Functions & Keeping Context in Nested Callbacks",
      intro: "Why arrow functions are the perfect solution for nested callbacks inside methods:",
      points: [
        {
          title: "1. The Missing Dot in Callbacks",
          content: "If you pass an object method as a raw callback (e.g., setTimeout(user.greet, 100)), the timer calls greet() on its own without the dot. In strict mode, this becomes undefined."
        },
        {
          title: "2. The Arrow Function Fix",
          content: "Because arrow functions borrow this from their enclosing scope, wrapping the callback in an arrow function (() => user.greet()) or using an arrow callback inside setTimeout(() => this.name) keeps this intact."
        },
        {
          title: "3. Explicit Control with .call() and .apply()",
          content: "You can manually tell a function which object to use right now with fn.call(targetObject, arg1, arg2). It runs the function immediately with this set to targetObject."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Arrow Methods vs Detached Callbacks",
      bad: {
        title: "❌ Bad: Arrow function as an object method, losing this to global scope",
        code: `const robot = {
  name: "Atlas",
  battery: 100,

  // Bug: Arrow function does NOT create its own 'this'!
  // It borrows 'this' from the file/window, so this.name is undefined!
  checkStatus: () => {
    console.log("Robot:", this.name, "| Battery:", this.battery);
  }
};

robot.checkStatus(); // "Robot: undefined | Battery: undefined"`,
        explanation: "Because checkStatus is an arrow function, it inherits 'this' from the outside file scope (module/window) instead of the robot object."
      },
      good: {
        title: "✅ Clean: Standard method with nested arrow function callback",
        code: `const robot = {
  name: "Atlas",
  battery: 100,

  // Clean standard method syntax:
  checkStatus() {
    console.log("Robot:", this.name, "| Battery:", this.battery);
  },

  // Nested arrow callback safely borrows 'this' from charge():
  charge() {
    console.log("Charging " + this.name + "...");
    setTimeout(() => {
      this.battery = 100;
      console.log(this.name + " is fully charged: " + this.battery + "%!");
    }, 100);
  }
};

robot.checkStatus(); // "Robot: Atlas | Battery: 100"
robot.charge();      // Works perfectly!`,
        explanation: "Standard method syntax binds 'this' to the robot object when called with robot.checkStatus(), and the arrow function inside setTimeout borrows that same robot reference."
      }
    },
    part5: {
      title: "The this Keyword Playground",
      intro: "Trace method calls, test arrow function inheritance, fix detached callbacks, and use .bind():",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-17: THE THIS KEYWORD PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const hero = {
  heroName: "Valkyrie",
  health: 120,

  // 1. Regular method call (this = hero)
  takeDamage(amount) {
    this.health -= amount;
    return \`\${this.heroName} took \${amount} damage! HP remaining: \${this.health}\`;
  },

  // 2. Nested arrow function borrowing 'this'
  delayedHeal(amount) {
    console.log(\`Preparing heal for \${this.heroName}...\`);
    setTimeout(() => {
      this.health += amount;
      console.log(\`✨ \${this.heroName} healed to \${this.health} HP!\`);
    }, 100);
  }
};

// 1. Normal method call (The Dot Rule):
console.log(hero.takeDamage(30)); // this is hero!

// 2. Delayed heal using borrowed arrow this:
hero.delayedHeal(25);

// 3. Explicit binding with .call():
const villain = { heroName: "Shadowfang", health: 200 };
// Borrow hero's takeDamage method, but execute it on villain:
console.log(hero.takeDamage.call(villain, 50));

// 4. Permanent binding with .bind():
const boundVillainDamage = hero.takeDamage.bind(villain, 20);
console.log(boundVillainDamage());
`
    },
    part6: {
      title: "Key Takeaways: The this Keyword",
      takeaways: [
        {
          title: "1. The Dot Rule",
          desc: "Look immediately to the left of the dot at call time (obj.method() -> this is obj)."
        },
        {
          title: "2. Arrow Functions Borrow this",
          desc: "Arrow functions have no this; they borrow this from the surrounding code."
        },
        {
          title: "3. Avoid Arrow Object Methods",
          desc: "Use standard methods (greet() {}) for object properties, not arrow functions."
        },
        {
          title: "4. Use .bind() for Callbacks",
          desc: "Lock this permanently to an object before passing methods as detached callbacks."
        },
        {
          title: "5. Next Step: Prototypes",
          desc: "In JS-18, we discover how objects share methods behind the scenes with prototypes!"
        }
      ],
      nextLessonPreview: {
        title: "JS-18: Prototypes & The Prototype Chain: Inheritance Under the Hood",
        desc: "Understand how JavaScript objects share methods by delegating lookups up the prototype chain to save memory."
      }
    },
    part7: {
      title: "Knowledge Check: The this Keyword",
      quiz: {
        question: "How do Arrow Functions determine the value of 'this'?",
        options: [
          "They dynamically point to the object to the left of the dot",
          "They borrow 'this' from the surrounding code where the arrow function was created",
          "They always bind 'this' to the global window object",
          "They automatically convert 'this' into an empty object"
        ],
        correctIndex: 1,
        explanation: "Arrow functions do not have their own 'this'. They adopt ('borrow') the 'this' binding from the surrounding lexical scope where they were written."
      }
    }
  },

  "js18-prototypes-and-prototype-chain": {
    slug: "js18-prototypes-and-prototype-chain",
    code: "JS-18",
    title: "Prototypes & The Prototype Chain: Inheritance Under the Hood",
    subtitle: "Understand how JavaScript objects share methods by delegating lookups up the prototype chain to save memory.",
    sections: [
      { id: "part1", label: "Delegation System", icon: "🧬", tag: "FOUNDATION" },
      { id: "part2", label: "The Prototype Chain", icon: "🪜", tag: "LOOKUP" },
      { id: "part3", label: "Memory & Object.create", icon: "💾", tag: "EFFICIENCY" },
      { id: "part4", label: "Common Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Prototypes Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Prototypes: JavaScript's Delegation System",
      bigPicture: "In JavaScript, inheritance is based on delegation rather than copying. Think of prototypes like borrowing tools from a neighbor: if you need a lawnmower, you check your own garage first. If you don't have one, you ask your neighbor (your prototype). If your neighbor doesn't have one either, they ask their parent! Only if nobody in the chain has the tool does JavaScript throw up its hands and say: 'undefined'.",
      breakdownTitle: "Core Concepts of JavaScript Prototypes:",
      breakdownItems: [
        {
          title: "The Hidden Prototype Link",
          desc: "Every JavaScript object has a hidden link ([[Prototype]]) pointing to another object from which it can borrow features."
        },
        {
          title: "Property Delegation",
          desc: "When you access obj.greet(), if greet is missing on obj, JavaScript automatically walks up the chain to find it on the prototype."
        },
        {
          title: "Massive RAM Savings",
          desc: "Instead of copying a 50-line method onto 10,000 separate object instances, you store it once on the prototype and let all instances share it."
        }
      ]
    },
    part2: {
      title: "The Prototype Chain: How JavaScript Looks Up Properties",
      intro: "Understanding the step-by-step lookup path from object to Object.prototype to null:",
      cards: [
        {
          number: "01",
          tag: "Own Property",
          title: "Step 1: Check Own Object",
          description: "JavaScript first checks if the property exists directly on the object itself. If found, it uses it immediately.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Prototype",
          title: "Step 2: Check Prototype",
          description: "If missing, JavaScript inspects the object's prototype. This is how all arrays get methods like .map() and .filter()!",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Chain End",
          title: "Step 3: Object.prototype -> null",
          description: "The top of every chain is Object.prototype. If the property still isn't found, it hits null and returns undefined.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Prototypes",
        content: "Never modify built-in prototypes like Array.prototype or Object.prototype! Adding custom methods to native prototypes causes unpredictable bugs, security issues, and conflicts with libraries."
      }
    },
    part3: {
      title: "Object.create() & Checking Direct Properties with Object.hasOwn()",
      intro: "Creating linked objects explicitly and distinguishing own properties from inherited ones:",
      points: [
        {
          title: "1. Linking Prototypes with Object.create(proto)",
          content: "Object.create(parentObject) creates a brand-new, empty object whose hidden prototype points directly to parentObject."
        },
        {
          title: "2. Object.hasOwn(obj, prop)",
          content: "Modern JavaScript provides Object.hasOwn(obj, 'prop') to verify whether a property belongs directly to the object or is being borrowed from its prototype."
        },
        {
          title: "3. Classes Are Built on Prototypes",
          content: "ES6 class syntax does not introduce a new object model—it is clean, readable syntax sugar that configures prototypes behind the scenes!"
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Duplicating Methods on Every Single Instance",
      bad: {
        title: "❌ Bad: Creating duplicate function copies inside factory functions",
        code: `function createPlayer(name, role) {
  return {
    name,
    role,
    // Bad: Every player creates a duplicate copy of this function in RAM:
    attack() {
      console.log(this.name + " attacks!");
    }
  };
}

const p1 = createPlayer("Aria", "Warrior");
const p2 = createPlayer("Leo", "Mage");
console.log(p1.attack === p2.attack); // false (Two different copies in RAM!)`,
        explanation: "If you create 1,000 players, you create 1,000 identical attack functions in memory, wasting system resources."
      },
      good: {
        title: "✅ Clean: Sharing methods through prototype delegation",
        code: `const playerMethods = {
  attack() {
    console.log(this.name + " attacks!");
  }
};

function createPlayer(name, role) {
  // Link new object to shared prototype:
  const player = Object.create(playerMethods);
  player.name = name;
  player.role = role;
  return player;
}

const p1 = createPlayer("Aria", "Warrior");
const p2 = createPlayer("Leo", "Mage");
console.log(p1.attack === p2.attack); // true (Shared in RAM!)`,
        explanation: "Both player instances share the exact same attack function in memory, saving memory while keeping code clean and modular."
      }
    },
    part5: {
      title: "Prototypes Playground",
      intro: "Create prototype-linked objects with Object.create(), verify shared memory, and inspect with Object.hasOwn():",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-18: PROTOTYPES & THE PROTOTYPE CHAIN PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Shared methods prototype:
const vehicleActions = {
  drive(miles) {
    this.mileage += miles;
    return \`\${this.model} drove \${miles} miles. Total: \${this.mileage} miles.\`;
  },
  honk() {
    return \`\${this.model} says: BEEP BEEP! 🚗\`;
  }
};

// 2. Create instance using Object.create():
const carA = Object.create(vehicleActions);
carA.model = "CyberTruck";
carA.mileage = 1500;

const carB = Object.create(vehicleActions);
carB.model = "Model 3";
carB.mileage = 8000;

// 3. Both cars borrow methods from vehicleActions:
console.log(carA.drive(50));
console.log(carB.honk());

// 4. Verify shared function in memory:
console.log("Do both cars share the exact same drive function in RAM?:", carA.drive === carB.drive); // true!

// 5. Inspecting Direct vs Inherited properties with Object.hasOwn():
console.log("Is 'model' carA's own direct property?:", Object.hasOwn(carA, "model")); // true
console.log("Is 'drive' carA's own direct property?:", Object.hasOwn(carA, "drive")); // false (Borrowed!)

// 6. Inspecting the prototype link:
console.log("carA's prototype is vehicleActions?:", Object.getPrototypeOf(carA) === vehicleActions); // true
`
    },
    part6: {
      title: "Key Takeaways: Prototypes & Prototype Chain",
      takeaways: [
        {
          title: "1. Delegation, Not Copying",
          desc: "JavaScript objects borrow missing properties by delegating lookups up the chain."
        },
        {
          title: "2. Memory Efficiency",
          desc: "Storing methods on a prototype lets thousands of objects share one function in RAM."
        },
        {
          title: "3. Object.create(proto)",
          desc: "Creates a fresh object whose prototype is set to the provided parent object."
        },
        {
          title: "4. Check Direct Keys",
          desc: "Use Object.hasOwn(obj, prop) to check if a property is direct or borrowed."
        },
        {
          title: "5. Next Step: ES6 Classes",
          desc: "In JS-19, we learn modern class syntax: constructors, extends, and super()!"
        }
      ],
      nextLessonPreview: {
        title: "JS-19: ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
        desc: "Write clean object-oriented code using the class blueprint syntax, constructors, extends for inheritance, and the super() rule."
      }
    },
    part7: {
      title: "Knowledge Check: Prototypes",
      quiz: {
        question: "What happens when you access a property on an object that does NOT exist directly on that object?",
        options: [
          "JavaScript immediately throws a PropertyNotFoundError crash",
          "JavaScript automatically looks up the prototype chain to find it on the object's prototype",
          "JavaScript creates the property and sets it to null",
          "The object is deleted from memory"
        ],
        correctIndex: 1,
        explanation: "JavaScript checks the object's [[Prototype]]. If the property is missing, it walks up the prototype chain until it finds the property or hits null, returning undefined if not found anywhere."
      }
    }
  },

  "js19-classes-extends-and-super": {
    slug: "js19-classes-extends-and-super",
    code: "JS-19",
    title: "ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
    subtitle: "Write clean object-oriented code using the class blueprint syntax, constructors, extends for inheritance, and the super() rule.",
    sections: [
      { id: "part1", label: "Class Blueprints", icon: "🏗️", tag: "CLASSES" },
      { id: "part2", label: "Constructors & Methods", icon: "⚙️", tag: "SYNTAX" },
      { id: "part3", label: "extends & super()", icon: "🧬", tag: "INHERITANCE" },
      { id: "part4", label: "The super() Rule", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Classes Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "ES6 Classes: The Architectural Blueprint for Objects",
      bigPicture: "Creating prototype links with Object.create() worked, but it felt awkward and required multiple disconnected steps. ES6 introduced the class keyword to package everything into a single, clean blueprint! Think of a class like an architectural blueprint for a house: the blueprint describes what rooms and doors the house should have, and calling 'new House()' constructs an actual physical house from that blueprint.",
      breakdownTitle: "Core Elements of JavaScript Classes:",
      breakdownItems: [
        {
          title: "The constructor() Function",
          desc: "The initialization function that runs automatically when you create a new instance with 'new ClassName()'."
        },
        {
          title: "Shared Prototype Methods",
          desc: "Methods defined inside a class body are automatically placed on the prototype so all instances share them."
        },
        {
          title: "Inheritance with extends and super()",
          desc: "Create child classes that inherit and specialize parent classes, using super() to initialize the parent foundation."
        }
      ]
    },
    part2: {
      title: "Constructors, Instance State & Prototype Methods",
      intro: "How class declarations organize object creation and method sharing:",
      cards: [
        {
          number: "01",
          tag: "Blueprint",
          title: "class User {}",
          description: "Defines the blueprint. Inside, the constructor(name) initializes personal properties (this.name = name).",
          color: "purple"
        },
        {
          number: "02",
          tag: "Instantiate",
          title: "new User('Alice')",
          description: "The new operator creates a fresh object, sets its prototype to User.prototype, and executes the constructor.",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Subclassing",
          title: "class Admin extends User",
          description: "Admin inherits all properties and methods from User, allowing you to reuse and extend code cleanly.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Subclasses",
        content: "In any subclass constructor that uses 'extends', you MUST call super() before accessing 'this'! The parent class must build the foundation before the child class can add its own properties."
      }
    },
    part3: {
      title: "Subclassing with extends and Calling super()",
      intro: "Reusing parent functionality and overriding methods gracefully:",
      points: [
        {
          title: "1. Calling super(...args)",
          content: "In a child constructor, super(name, email) invokes the parent class constructor to set up inherited properties."
        },
        {
          title: "2. Method Overriding",
          content: "A child class can define a method with the same name as a parent method. It can call super.methodName() to reuse parent behavior while adding custom features."
        },
        {
          title: "3. Under the Hood, It's Still Prototypes",
          content: "JavaScript classes do not introduce a different memory model. Under the hood, class methods are stored on the prototype, giving you the same high performance and memory efficiency."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Accessing this Before super() in Subclasses",
      bad: {
        title: "❌ Bad: Using 'this' before calling super() in a child constructor",
        code: `class Employee {
  constructor(name) {
    this.name = name;
  }
}

class Manager extends Employee {
  constructor(name, department) {
    // Bug: Accessing 'this' before super() throws ReferenceError!
    this.department = department;
    super(name);
  }
}`,
        explanation: "JavaScript requires the parent constructor to construct the object first via super(). Accessing this before calling super() crashes with a ReferenceError."
      },
      good: {
        title: "✅ Clean: Calling super() first and method extension",
        code: `class Employee {
  constructor(name) {
    this.name = name;
  }
  describe() {
    return \`Employee: \${this.name}\`;
  }
}

class Manager extends Employee {
  constructor(name, department) {
    super(name); // Must be called first!
    this.department = department;
  }

  // Extend parent method cleanly:
  describe() {
    return \`\${super.describe()} (Lead of \${this.department})\`;
  }
}

const boss = new Manager("Elena", "Engineering");
console.log(boss.describe()); // "Employee: Elena (Lead of Engineering)"`,
        explanation: "Calling super(name) initializes the parent class properly, enabling the child class to safely add its own unique department property."
      }
    },
    part5: {
      title: "Classes & Inheritance Playground",
      intro: "Create a class hierarchy, instantiate objects with new, call super methods, and inspect prototype sharing:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-19: ES6 CLASSES, EXTENDS & SUPER PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Base Class (Parent Blueprint)
class BankAccount {
  constructor(accountHolder, initialBalance = 0) {
    this.accountHolder = accountHolder;
    this.balance = initialBalance;
  }

  deposit(amount) {
    this.balance += amount;
    return \`[\${this.accountHolder}] Deposited $\${amount}. Balance: $\${this.balance}\`;
  }

  withdraw(amount) {
    if (amount > this.balance) {
      return \`[\${this.accountHolder}] Insufficient funds! Balance is $\${this.balance}\`;
    }
    this.balance -= amount;
    return \`[\${this.accountHolder}] Withdrew $\${amount}. Balance: $\${this.balance}\`;
  }
}

// 2. Subclass inheriting with extends:
class SavingsAccount extends BankAccount {
  constructor(accountHolder, initialBalance, interestRate = 0.05) {
    super(accountHolder, initialBalance); // Must initialize parent first!
    this.interestRate = interestRate;
  }

  // Add subclass-specific method:
  applyInterest() {
    const interest = this.balance * this.interestRate;
    this.balance += interest;
    return \`🎉 Added $\${interest.toFixed(2)} interest! New Balance: $\${this.balance.toFixed(2)}\`;
  }
}

// 3. Create instances:
const account = new SavingsAccount("Marcus Vance", 1000, 0.04);
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.applyInterest());

// 4. Verify prototype inheritance:
console.log("Is account an instance of SavingsAccount?:", account instanceof SavingsAccount); // true
console.log("Is account an instance of BankAccount?:", account instanceof BankAccount);       // true
`
    },
    part6: {
      title: "Key Takeaways: ES6 Classes",
      takeaways: [
        {
          title: "1. class Blueprint",
          desc: "Pack constructor and shared methods into a single, clean declaration."
        },
        {
          title: "2. The constructor()",
          desc: "Runs on 'new ClassName()', initializing personal instance properties on this."
        },
        {
          title: "3. Inheritance with extends",
          desc: "Subclasses inherit all methods and getters from their parent class."
        },
        {
          title: "4. super() Must Be First",
          desc: "Child constructors must call super() before touching 'this' to set up the parent."
        },
        {
          title: "5. Next Step: Asynchronous JS",
          desc: "In Stage 6, we begin Asynchronous JavaScript: Event Loop, Promises, and async/await!"
        }
      ],
      nextLessonPreview: {
        title: "JS-20: Synchronous vs Asynchronous: Why JavaScript Never Freezes",
        desc: "Learn how single-threaded JavaScript handles long tasks using timers, background Web APIs, and the event loop without freezing."
      }
    },
    part7: {
      title: "Knowledge Check: Classes & Inheritance",
      quiz: {
        question: "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
        options: [
          "super() is optional and only used for debug logging",
          "super() calls the parent constructor to initialize the instance foundation before 'this' can be accessed",
          "super() converts the class into an arrow function",
          "super() creates a background web worker thread"
        ],
        correctIndex: 1,
        explanation: "In JavaScript derived classes, instances are constructed by the parent constructor. Calling super() runs the parent constructor; attempting to access 'this' before super() throws a ReferenceError."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 6 QUIZZES: JS-17, JS-18, JS-19
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch6Quizzes = [
  {
    id: "quiz-javascript-js17",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js17-the-this-keyword",
    lessonCode: "JS-17",
    lessonTitle: "The this Keyword: Who Called Me?",
    description: "Check your understanding of the 'this' keyword: method calls, arrow functions, and how 'this' gets its value dynamically at call time.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js17-q1",
        type: "code_output",
        title: "The Dot Rule at Call Time",
        prompt: "Predict what will be logged when this method is called:",
        codeSnippet: `const robot = {
  model: "T-800",
  identify() {
    return "Model: " + this.model;
  }
};
console.log(robot.identify());`,
        language: "javascript",
        options: [
          "'Model: T-800'",
          "'Model: undefined'",
          "TypeError: cannot read property model of undefined",
          "'Model: Object'"
        ],
        correctAnswer: 0,
        explanation: "Because robot is immediately to the left of the dot at call time (robot.identify()), 'this' points directly to the robot object.",
        hint: "Look immediately to the left of the dot when the function is called.",
        hintCostXP: 5
      },
      {
        id: "js17-q2",
        type: "multiple_choice",
        title: "Arrow Functions and this",
        prompt: "Why should you avoid using Arrow Functions for object methods?",
        options: [
          "Arrow functions execute too slowly",
          "Arrow functions do not have their own 'this'; they borrow 'this' from the outer scope where they were created",
          "Arrow functions cannot return strings",
          "Arrow functions can only be called once"
        ],
        correctAnswer: 1,
        explanation: "Arrow functions do not create their own 'this'. When used as an object method, 'this' refers to the outer scope (e.g. window or module exports) rather than the object instance.",
        hint: "Arrow functions borrow 'this' directly from the code around them.",
        hintCostXP: 5
      },
      {
        id: "js17-q3",
        type: "code_output",
        title: "Explicit Binding with .call()",
        prompt: "What will this explicit binding snippet log?",
        codeSnippet: `function greet() {
  return "Hello, " + this.name;
}
const user = { name: "Aria" };
console.log(greet.call(user));`,
        language: "javascript",
        options: [
          "'Hello, Aria'",
          "'Hello, undefined'",
          "TypeError: greet is not a function",
          "'Hello, user'"
        ],
        correctAnswer: 0,
        explanation: ".call(user) executes the function immediately, explicitly setting 'this' to the user object.",
        hint: ".call() binds 'this' to the first argument and invokes immediately.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js18",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js18-prototypes-and-prototype-chain",
    lessonCode: "JS-18",
    lessonTitle: "Prototypes & The Prototype Chain: Inheritance Under the Hood",
    description: "Test your understanding of object prototypes, method delegation, and property lookup across the chain.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js18-q1",
        type: "multiple_choice",
        title: "Prototype Delegation Mechanism",
        prompt: "What happens when you access a property on an object that does NOT exist directly on that object?",
        options: [
          "JavaScript immediately throws a PropertyNotFoundError crash",
          "JavaScript looks up the prototype chain to see if the property exists on the object's prototype",
          "JavaScript creates the property and sets it to null",
          "The object is deleted from memory"
        ],
        correctAnswer: 1,
        explanation: "If JavaScript cannot find a property directly on an object, it automatically looks at the object's prototype to find it. This lets multiple objects share the same helper methods without duplicating them in memory.",
        hint: "It delegates the lookup to the object's prototype.",
        hintCostXP: 5
      },
      {
        id: "js18-q2",
        type: "code_output",
        title: "Object.create Prototype Link",
        prompt: "What is printed by this prototype delegation snippet?",
        codeSnippet: `const parent = { role: "standard", greet() { return "Hi"; } };
const child = Object.create(parent);
child.role = "super";
console.log(child.role + " | " + child.greet());`,
        language: "javascript",
        options: [
          "'super | Hi'",
          "'standard | Hi'",
          "'super | undefined'",
          "TypeError: child.greet is not a function"
        ],
        correctAnswer: 0,
        explanation: "child has its own direct role ('super'). When child.greet() is called, greet is missing on child, so it delegates up to parent.greet() and returns 'Hi'.",
        hint: "child overrides role, but borrows greet from parent.",
        hintCostXP: 5
      },
      {
        id: "js18-q3",
        type: "multiple_choice",
        title: "Checking Direct Properties",
        prompt: "How can you verify whether a property exists directly on an object rather than on its prototype chain?",
        options: [
          "Object.hasOwn(obj, prop) or obj.hasOwnProperty(prop)",
          "prop in obj",
          "obj[prop] !== undefined",
          "typeof obj.prop === 'direct'"
        ],
        correctAnswer: 0,
        explanation: "Object.hasOwn(obj, prop) specifically checks if the property belongs directly to the object itself rather than being inherited from its prototype.",
        hint: "Look for 'hasOwn' or 'hasOwnProperty'.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js19",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js19-classes-extends-and-super",
    lessonCode: "JS-19",
    lessonTitle: "ES6 Classes, Constructors & Inheritance: Clean Object-Oriented JS",
    description: "Test your understanding of modern JavaScript classes, constructors, inheritance with extends, and calling super().",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js19-q1",
        type: "multiple_choice",
        title: "The super() Rule in Subclasses",
        prompt: "In a subclass constructor that uses 'extends', why must you call super() before accessing 'this'?",
        options: [
          "super() is optional and only recommended for logging",
          "super() calls the parent constructor to initialize the instance foundation before 'this' can be accessed",
          "super() converts the class to an arrow function",
          "super() binds event listeners automatically"
        ],
        correctAnswer: 1,
        explanation: "In JavaScript, derived class instances are initialized by the parent constructor. Calling super() runs the parent constructor; accessing 'this' before super() throws a ReferenceError.",
        hint: "The parent constructor must initialize the object before the child can use 'this'.",
        hintCostXP: 5
      },
      {
        id: "js19-q2",
        type: "code_output",
        title: "Method Overriding with super",
        prompt: "What will this class hierarchy log?",
        codeSnippet: `class Vehicle {
  start() { return "Engine on"; }
}
class Car extends Vehicle {
  start() { return super.start() + ", Seatbelt buckled"; }
}
const myCar = new Car();
console.log(myCar.start());`,
        language: "javascript",
        options: [
          "'Engine on, Seatbelt buckled'",
          "'Engine on'",
          "'Seatbelt buckled'",
          "TypeError: super.start is not a function"
        ],
        correctAnswer: 0,
        explanation: "Car overrides start(), but calls super.start() to reuse the parent's logic before adding ', Seatbelt buckled'.",
        hint: "super.methodName() invokes the parent class's version of that method.",
        hintCostXP: 5
      },
      {
        id: "js19-q3",
        type: "multiple_choice",
        title: "Classes Under the Hood",
        prompt: "What is an ES6 class under the hood in JavaScript?",
        options: [
          "A completely separate memory architecture unrelated to prototypes",
          "A cleaner, modern blueprint syntax built on top of JavaScript's prototype system",
          "A compiled C++ binary structure",
          "A plain JSON object"
        ],
        correctAnswer: 1,
        explanation: "ES6 classes provide a cleaner, more readable syntax, but under the hood they still create standard constructor functions and prototype chains.",
        hint: "Classes provide cleaner syntax over JavaScript prototypes.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

for (const [slug, lessonObj] of Object.entries(batch6Lessons)) {
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find ${slug} in ${lessonFilePath}`);
  }

  // Find end of this lesson entry: look for next lesson entry or end of object
  const nextSlugs = [
    'js18-prototypes-and-prototype-chain',
    'js19-classes-extends-and-super',
    'js20-synchronous-vs-asynchronous'
  ];
  
  let endIdx = -1;
  for (const nextSlug of nextSlugs) {
    if (nextSlug === slug) continue;
    const nextMarker = `  "${nextSlug}": {`;
    const foundIdx = lessonContent.indexOf(nextMarker, startIdx);
    if (foundIdx !== -1) {
      if (endIdx === -1 || foundIdx < endIdx) {
        endIdx = foundIdx;
      }
    }
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end index for ${slug}`);
  }

  const replacement = `  "${slug}": ` + JSON.stringify(lessonObj, null, 2) + ',\n\n';
  lessonContent = lessonContent.substring(0, startIdx) + replacement + lessonContent.substring(endIdx);
}

fs.writeFileSync(lessonFilePath, lessonContent, 'utf8');
console.log('Successfully updated javascript-lesson-content.ts for JS-17, JS-18, and JS-19!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (const quizObj of batch6Quizzes) {
  const marker = `"lessonSlug": "${quizObj.lessonSlug}"`;
  const markerIdx = quizContent.indexOf(marker);
  if (markerIdx === -1) {
    throw new Error(`Could not find quiz for ${quizObj.lessonSlug} in ${quizFilePath}`);
  }

  // Find the opening brace of this quiz object: last "  {" before markerIdx
  const startIdx = quizContent.lastIndexOf('  {', markerIdx);
  if (startIdx === -1) {
    throw new Error(`Could not find start of quiz object for ${quizObj.lessonSlug}`);
  }

  // Find the closing brace of this quiz object: "\n  }," or "\n  }"
  const closeComma = quizContent.indexOf('\n  },', startIdx);
  const closeBrace = quizContent.indexOf('\n  }\n];', startIdx);
  
  let endIdx = -1;
  let hasTrailingComma = true;
  if (closeComma !== -1 && (closeBrace === -1 || closeComma < closeBrace)) {
    endIdx = closeComma + 5; // length of "\n  },"
    hasTrailingComma = true;
  } else if (closeBrace !== -1) {
    endIdx = closeBrace + 4; // length of "\n  }"
    hasTrailingComma = false;
  }

  if (endIdx === -1) {
    throw new Error(`Could not find end of quiz object for ${quizObj.lessonSlug}`);
  }

  const formattedQuiz = '  ' + JSON.stringify(quizObj, null, 2).replace(/\n/g, '\n  ') + (hasTrailingComma ? ',' : '');
  quizContent = quizContent.substring(0, startIdx) + formattedQuiz + quizContent.substring(endIdx);
}

fs.writeFileSync(quizFilePath, quizContent, 'utf8');
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-17, JS-18, and JS-19!');
