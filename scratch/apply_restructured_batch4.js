const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 4: JS-10, JS-11, JS-12, JS-13
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch4Lessons = {
  "js10-arrays-and-indexing": {
    slug: "js10-arrays-and-indexing",
    code: "JS-10",
    title: "Arrays & Indexing: Managing Ordered Lists",
    subtitle: "Store ordered collections of data, access elements with zero-based indexing, read array length, and add or remove items using push, pop, and slice.",
    sections: [
      { id: "part1", label: "Ordered Lists", icon: "📋", tag: "FOUNDATION" },
      { id: "part2", label: "Zero-Based Indices", icon: "🔢", tag: "OPERATIONS" },
      { id: "part3", label: "Reading & Slicing", icon: "✂️", tag: "MANIPULATION" },
      { id: "part4", label: "Off-by-One Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Arrays Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Why Arrays Matter: Storing Ordered Lists Under One Name",
      bigPicture: "Imagine organizing a playlist of your favorite songs or a grocery shopping list. Without arrays, you would need separate variables like song1, song2, and song3—which becomes unmanageable the moment your list grows or changes! An array is a single container that holds an ordered list of items, keeping them in the exact order you put them in.",
      breakdownTitle: "Core Concepts of JavaScript Arrays:",
      breakdownItems: [
        {
          title: "The Square Bracket Container",
          desc: "Create an array by wrapping items in square brackets separated by commas: const fruits = ['apple', 'banana', 'orange']."
        },
        {
          title: "Zero-Based Indexing",
          desc: "JavaScript numbers array slots starting from 0. The first item is at index [0], the second at [1], and so on."
        },
        {
          title: "The .length Property",
          desc: "JavaScript automatically tracks the total number of items with .length, keeping your counts up to date as items are added or removed."
        }
      ]
    },
    part2: {
      title: "Zero-Based Indices & Adding/Removing Elements",
      intro: "Understanding how indices count distance from the start, and modifying array ends with push and pop:",
      cards: [
        {
          number: "01",
          tag: "Index",
          title: "Zero-Based Index [0]",
          description: "Think of an index as the distance or steps from the starting line. The very first item has 0 distance from the start, so it sits at index [0].",
          color: "purple"
        },
        {
          number: "02",
          tag: "Add & Remove",
          title: "push() & pop()",
          description: "Use .push(item) to append an item to the end of the array. Use .pop() to remove and return the last item from the array.",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Count",
          title: "The .length Property",
          description: "array.length gives the total count of items. Because counting starts at 0, the last item is always at index array.length - 1.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Array Length",
        content: "An array's total length is always 1 greater than its highest index! If an array has 3 items, its valid indices are 0, 1, and 2. Reading array[3] returns undefined because slot 3 does not exist."
      }
    },
    part3: {
      title: "Reading, Updating & Safe Extraction with slice()",
      intro: "Working with elements directly, modifying values in place, and extracting non-destructive slices:",
      points: [
        {
          title: "1. Reading and Updating by Index",
          content: "Access an item using square brackets: const first = fruits[0]. You can replace an existing item by assigning to its index: fruits[1] = 'blueberry'."
        },
        {
          title: "2. Safe Copying with slice(start, end)",
          content: "Use array.slice(start, end) to grab a portion of your array without modifying the original. The start index is included, but the end index is excluded."
        },
        {
          title: "3. Out-of-Bounds Returns undefined",
          content: "If you try to read an index that doesn't exist (like fruits[99]), JavaScript doesn't crash your application—it safely returns undefined."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Off-by-One Bugs and Bracket Confusion",
      bad: {
        title: "❌ Bad: Reading array[array.length] or using parentheses",
        code: `const colors = ["red", "green", "blue"];

// Bug 1: Off-by-one! colors has 3 items, so colors[3] is undefined!
const lastColor = colors[colors.length];
console.log(lastColor); // undefined!

// Bug 2: Using parentheses instead of square brackets:
// const first = colors(0); // TypeError: colors is not a function!`,
        explanation: "Because indices start at 0, an array with 3 items has slots 0, 1, and 2. colors[colors.length] searches for slot 3, which does not exist."
      },
      good: {
        title: "✅ Clean: Safe last item access and non-destructive slicing",
        code: `const colors = ["red", "green", "blue"];

// Safe last item access: length - 1
const lastColor = colors[colors.length - 1];
console.log("Last color:", lastColor); // "blue"

// Safe copy of the first two colors:
const topColors = colors.slice(0, 2);
console.log("Top colors:", topColors); // ["red", "green"]
console.log("Original colors untouched:", colors); // ["red", "green", "blue"]`,
        explanation: "Using colors[colors.length - 1] reliably grabs the last element. Using .slice(0, 2) makes a fresh copy without modifying the original array."
      }
    },
    part5: {
      title: "Interactive Arrays Playground",
      intro: "Create a movie watchlist, inspect its length, access items by index, push and pop, and copy a slice:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-10: ARRAYS & INDEXING PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Create an array of movies:
const watchlist = ["Inception", "Interstellar", "The Matrix"];

console.log("Total movies in list:", watchlist.length);
console.log("First movie [0]:", watchlist[0]);
console.log("Second movie [1]:", watchlist[1]);
console.log("Last movie [length - 1]:", watchlist[watchlist.length - 1]);

// 2. Add a new movie to the end:
watchlist.push("Spirited Away");
console.log("After push:", watchlist);
console.log("New length:", watchlist.length);

// 3. Remove the last movie:
const removedMovie = watchlist.pop();
console.log("Popped movie:", removedMovie);
console.log("After pop:", watchlist);

// 4. Update an item in place:
watchlist[0] = "Inception (Extended)";
console.log("Updated first movie:", watchlist[0]);

// 5. Extract a safe slice (first 2 movies) without touching original:
const weekendPicks = watchlist.slice(0, 2);
console.log("Weekend picks:", weekendPicks);
console.log("Original watchlist is intact:", watchlist);
`
    },
    part6: {
      title: "Key Takeaways: Arrays & Indexing",
      takeaways: [
        {
          title: "1. Square Brackets for Lists",
          desc: "Arrays group multiple values into an ordered list using square brackets []."
        },
        {
          title: "2. Zero-Based Indexing",
          desc: "First item is at index 0, second is at 1, and the last item is at array.length - 1."
        },
        {
          title: "3. push & pop at the End",
          desc: "Use .push(item) to append to the end, and .pop() to remove and retrieve the last item."
        },
        {
          title: "4. Non-Destructive Slicing",
          desc: "Use .slice(start, end) to copy a portion of the array without altering the original list."
        },
        {
          title: "5. Next Step: Array Methods",
          desc: "In JS-11, we learn powerful declarative methods: map, filter, find, and reduce!"
        }
      ],
      nextLessonPreview: {
        title: "JS-11: Essential Array Methods: map, filter, find & reduce",
        desc: "Transform lists with map, keep matching items with filter, locate single items with find, and calculate totals with reduce."
      }
    },
    part7: {
      title: "Knowledge Check: Arrays & Indexing",
      quiz: {
        question: "What is the index of the first item in any JavaScript array?",
        options: [
          "1",
          "0",
          "-1",
          "It depends on the array length"
        ],
        correctIndex: 1,
        explanation: "JavaScript arrays are zero-indexed. The very first item is always located at index 0."
      }
    }
  },

  "js11-essential-array-methods": {
    slug: "js11-essential-array-methods",
    code: "JS-11",
    title: "Essential Array Methods: map, filter, find & reduce",
    subtitle: "Transform lists with map, keep matching items with filter, locate single items with find, and calculate totals with reduce.",
    sections: [
      { id: "part1", label: "Declarative Lists", icon: "✨", tag: "FOUNDATION" },
      { id: "part2", label: "The Core Four", icon: "🛠️", tag: "METHODS" },
      { id: "part3", label: "Callbacks & Pipelines", icon: "🔗", tag: "PIPELINES" },
      { id: "part4", label: "Callback Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Methods Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Declarative Arrays: Letting Methods Do the Heavy Lifting",
      bigPicture: "In JS-09, you learned how to pass functions into other functions as callbacks. Now, array methods are where that superpower shines! In the past, developers had to write repetitive for-loops with index counters (let i = 0) just to double numbers or filter out unpaid orders. Modern JavaScript gives us expressive array methods: you provide a short callback function describing what to do with each item, and JavaScript handles the looping automatically.",
      breakdownTitle: "The Big Four Methods at a Glance:",
      breakdownItems: [
        {
          title: "map() — Transform Every Item",
          desc: "Transforms each element into something new and returns a brand-new array of equal length."
        },
        {
          title: "filter() — Keep What Matches",
          desc: "Tests each item against a condition and returns a new array with only the items that passed the test."
        },
        {
          title: "find() & reduce() — Lookup and Aggregate",
          desc: "find() returns the first matching item directly; reduce() accumulates all items into a single final value like a total price."
        }
      ]
    },
    part2: {
      title: "The Big Four: How map, filter, find & reduce Work",
      intro: "Understanding the exact inputs and outputs of each core method:",
      cards: [
        {
          number: "01",
          tag: "Transform",
          title: "map(item => newItem)",
          description: "Runs your callback on every item and builds a new array of the exact same length. Original array is untouched.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Selection",
          title: "filter(item => boolean)",
          description: "Keeps only items where your callback returns true. Returns a new array with 0 up to N items.",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Aggregation",
          title: "find() & reduce()",
          description: "find() returns the first matching item directly. reduce((acc, curr) => ..., initial) rolls all items into a single result.",
          color: "amber"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Array Methods",
        content: "Methods like map and filter NEVER change the original array—they always produce a brand-new array! Always make sure your callback returns the new value inside map, and returns a boolean inside filter."
      }
    },
    part3: {
      title: "Understanding reduce() and Method Chaining",
      intro: "How the accumulator works in reduce(), and how chaining methods creates clean data pipelines:",
      points: [
        {
          title: "1. The reduce() Accumulator",
          content: "In reduce((accumulator, current) => accumulator + current, 0), the accumulator is your running tally (like a cash register) and 0 is the starting value. Each step updates the running tally."
        },
        {
          title: "2. find() vs filter()",
          content: "find() stops the moment it finds the first match and returns that single element (or undefined). filter() always checks every single item and returns an array."
        },
        {
          title: "3. Clean Method Chaining",
          content: "Because filter and map return arrays, you can chain them: products.filter(p => p.inStock).map(p => p.name). Filter first so map has fewer items to process!"
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Missing return in Curly-Braced Callbacks",
      bad: {
        title: "❌ Bad: Forgetting to return inside curly braces, or manual loops",
        code: `const prices = [10, 20, 30];

// Bug: Opening curly braces without writing 'return'!
const discounted = prices.map(price => {
  price * 0.9; // Missing return!
});
console.log(discounted); // [undefined, undefined, undefined]!`,
        explanation: "In arrow functions, if you add curly braces {}, you MUST write an explicit return statement. Otherwise, the callback returns undefined for every item!"
      },
      good: {
        title: "✅ Clean: Concise implicit return or explicit return statement",
        code: `const prices = [10, 20, 30];

// Clean 1-line arrow function (implicit return):
const discounted = prices.map(price => price * 0.9);
console.log("Discounted prices:", discounted); // [9, 18, 27]

// Explicit return when multi-line logic is needed:
const formatted = prices.map(price => {
  const finalPrice = price * 0.9;
  return "$" + finalPrice.toFixed(2);
});
console.log("Formatted:", formatted); // ["$9.00", "$18.00", "$27.00"]`,
        explanation: "1-line arrow functions automatically return the expression. When using curly braces, explicitly writing return ensures your transformed values are kept."
      }
    },
    part5: {
      title: "Array Methods Playground",
      intro: "Filter available products, format their display names with map, locate a product with find, and calculate cart total with reduce:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-11: ESSENTIAL ARRAY METHODS PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const inventory = [
  { id: 1, name: "Mechanical Keyboard", price: 120, inStock: true },
  { id: 2, name: "Wireless Mouse", price: 45, inStock: false },
  { id: 3, name: "USB-C Monitor", price: 280, inStock: true },
  { id: 4, name: "Desk Pad", price: 20, inStock: true }
];

// 1. filter(): Keep only items that are in stock
const availableItems = inventory.filter(item => item.inStock);
console.log("In-stock items count:", availableItems.length);

// 2. map(): Format available items into readable strings
const productTags = availableItems.map(item => item.name + " ($" + item.price + ")");
console.log("Product tags:", productTags);

// 3. find(): Locate a specific item by its ID
const mouse = inventory.find(item => item.id === 2);
console.log("Found item by ID 2:", mouse.name, "| inStock:", mouse.inStock);

// 4. reduce(): Calculate the total value of all in-stock inventory
const totalValue = availableItems.reduce((runningTotal, item) => {
  return runningTotal + item.price;
}, 0);

console.log("Total value of available stock: $" + totalValue);

// 5. Method Chaining: Filter items under $100 and get just their uppercase names
const budgetNames = inventory
  .filter(item => item.price < 100)
  .map(item => item.name.toUpperCase());

console.log("Budget item names:", budgetNames);
`
    },
    part6: {
      title: "Key Takeaways: Essential Array Methods",
      takeaways: [
        {
          title: "1. map for 1-to-1 Transformations",
          desc: "Transforms each item into something new, returning an array of the same length."
        },
        {
          title: "2. filter for Selection",
          desc: "Returns a new array containing only elements that pass your true/false test."
        },
        {
          title: "3. find for Single Match",
          desc: "Returns the first matching item directly, or undefined if no item matches."
        },
        {
          title: "4. reduce for Aggregation",
          desc: "Folds all elements into a single value, such as a sum or count. Always provide an initial value!"
        },
        {
          title: "5. Next Step: Objects & Methods",
          desc: "In JS-12, we learn how to model real-world entities using key-value pairs and object methods!"
        }
      ],
      nextLessonPreview: {
        title: "JS-12: Objects & Methods: Key-Value Pairs & Behaviors",
        desc: "Model real-world entities using labeled key-value pairs, understand dot vs bracket notation, and attach reusable methods."
      }
    },
    part7: {
      title: "Knowledge Check: Array Methods",
      quiz: {
        question: "What is the primary difference between .find() and .filter()?",
        options: [
          ".find() returns the first matching item directly (or undefined), while .filter() returns an array of all matching items",
          ".find() changes the original array, but .filter() does not",
          ".filter() can only be used on numbers, while .find() works on any data",
          "There is no difference; .find() is an alias for .filter()"
        ],
        correctIndex: 0,
        explanation: ".find() stops evaluating as soon as it encounters the first matching element and returns that element directly. .filter() checks every item and returns an array containing all matches."
      }
    }
  },

  "js12-objects-and-methods": {
    slug: "js12-objects-and-methods",
    code: "JS-12",
    title: "Objects & Methods: Key-Value Pairs & Behaviors",
    subtitle: "Model real-world entities using labeled key-value pairs, understand dot vs bracket notation, and attach reusable methods.",
    sections: [
      { id: "part1", label: "Key-Value Pairs", icon: "🗂️", tag: "FOUNDATION" },
      { id: "part2", label: "Dot vs Bracket", icon: "🔍", tag: "NOTATION" },
      { id: "part3", label: "Methods & this", icon: "⚙️", tag: "METHODS" },
      { id: "part4", label: "Dynamic Key Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Objects Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Why Objects Matter: Modeling Real-World Data with Labels",
      bigPicture: "Arrays are great for ordered lists of similar items, like a list of high scores: [90, 85, 92]. But what if you need to describe a user or a product? Storing a user as ['Alex', 28, 'alex@test.com', true] is confusing because slot 0 is a name, slot 1 is an age, and slot 3 is a status, but none of them have labels! An object solves this by attaching a descriptive name (a key) to every value. Together, they are called key-value pairs.",
      breakdownTitle: "Core Concepts of JavaScript Objects:",
      breakdownItems: [
        {
          title: "The Object Literal {}",
          desc: "Curly braces create an object. You write labeled properties as key: value pairs separated by commas."
        },
        {
          title: "Dot Notation (user.name)",
          desc: "The cleanest and most common way to read or change a property when you know the key name ahead of time."
        },
        {
          title: "Bracket Notation (user['name'])",
          desc: "Required when property names are stored inside variables or contain spaces or special characters."
        }
      ]
    },
    part2: {
      title: "Reading & Updating Properties: Dot vs Bracket Notation",
      intro: "When to use standard dot notation and when bracket notation is required:",
      cards: [
        {
          number: "01",
          tag: "Standard",
          title: "Dot Notation (obj.prop)",
          description: "Clean and standard for everyday property access when the property name is a known, valid identifier.",
          color: "cyan"
        },
        {
          number: "02",
          tag: "Dynamic",
          title: "Bracket Notation (obj[key])",
          description: "Required when the key is stored in a variable (user[field]) or has spaces or hyphens (user['postal-code']).",
          color: "purple"
        },
        {
          number: "03",
          tag: "Behavior",
          title: "Object Methods",
          description: "Functions stored as properties inside an object. They allow objects to perform actions using their own data.",
          color: "emerald"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Property Access",
        content: "Always use dot notation by default! Switch to bracket notation only when the key name comes from a variable (e.g. user[dynamicKey]) or contains hyphens or spaces."
      }
    },
    part3: {
      title: "Object Methods, the this Keyword & Built-in Helpers",
      intro: "Giving objects behaviors with methods, referencing properties with this, and inspecting keys:",
      points: [
        {
          title: "1. The this Keyword in Methods",
          content: "When an object method runs, this points to the object that owns the method. Inside user.greet(), this.name reads the name property from that user."
        },
        {
          title: "2. Adding and Updating Properties on const Objects",
          content: "Declaring an object with const prevents reassigning the variable to a different object, but the properties inside can still be updated freely: user.age = 29."
        },
        {
          title: "3. Object.keys() and Object.values()",
          content: "Use Object.keys(obj) to get an array of all property names, and Object.values(obj) to get an array of all property values."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Using Dot Notation with Variables",
      bad: {
        title: "❌ Bad: Using dot notation when the property name is in a variable",
        code: `const user = { name: "Alice", email: "alice@example.com" };

const propertyToRead = "email";

// Bug: Searches for a property literally named "propertyToRead"!
console.log(user.propertyToRead); // undefined!`,
        explanation: "Dot notation (user.propertyToRead) looks for the literal word 'propertyToRead' on the object. Because that property does not exist, it evaluates to undefined."
      },
      good: {
        title: "✅ Clean: Evaluating dynamic variable keys with square brackets",
        code: `const user = { name: "Alice", email: "alice@example.com" };

const propertyToRead = "email";

// Square brackets evaluate the variable's value ("email"):
console.log(user[propertyToRead]); // "alice@example.com"

// Also works for keys with hyphens or spaces:
user["account-status"] = "ACTIVE";
console.log(user["account-status"]); // "ACTIVE"`,
        explanation: "Bracket notation evaluates the variable inside the brackets first, correctly looking up user['email']."
      }
    },
    part5: {
      title: "Objects & Methods Playground",
      intro: "Build a game character profile with stats, access properties dynamically, call a method with this, and inspect keys:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-12: OBJECTS & METHODS PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const player = {
  username: "PixelKnight",
  level: 1,
  hp: 100,
  skills: ["Slash", "Shield Block"],

  // Method that uses 'this' to access its own properties:
  levelUp() {
    this.level += 1;
    this.hp += 20;
    return this.username + " reached Level " + this.level + "! HP is now " + this.hp;
  }
};

// 1. Read properties with dot notation:
console.log("Player name:", player.username);
console.log("Current level:", player.level);
console.log("First skill:", player.skills[0]);

// 2. Read properties dynamically with bracket notation:
const statToQuery = "hp";
console.log("Queried stat (" + statToQuery + "):", player[statToQuery]);

// 3. Call the method:
console.log(player.levelUp());
console.log("Updated level:", player.level);

// 4. Add a new property:
player.guild = "DragonSlayers";
console.log("Joined guild:", player.guild);

// 5. Inspect keys and values using built-in Object utilities:
console.log("Object keys:", Object.keys(player));
console.log("Total property count:", Object.keys(player).length);
`
    },
    part6: {
      title: "Key Takeaways: Objects & Methods",
      takeaways: [
        {
          title: "1. Labeled Data with {}",
          desc: "Objects group related information into labeled key-value pairs using curly braces."
        },
        {
          title: "2. Dot for Known, Bracket for Dynamic",
          desc: "Use dot notation obj.key by default; use brackets obj[variable] for dynamic keys."
        },
        {
          title: "3. Methods and this",
          desc: "Methods are functions stored on objects. Inside a method, this refers to the object itself."
        },
        {
          title: "4. const Objects are Mutable",
          desc: "const locks the variable reference, but you can freely add, update, and delete properties inside."
        },
        {
          title: "5. Next Step: Object References",
          desc: "In JS-13, we learn how objects live in memory and why copying them requires special care!"
        }
      ],
      nextLessonPreview: {
        title: "JS-13: Object References & Copying: References, Shallow vs Deep Cloning",
        desc: "Understand how objects live in memory, why copying variables creates shared references, and how to safely clone objects with spread and structuredClone."
      }
    },
    part7: {
      title: "Knowledge Check: Objects & Methods",
      quiz: {
        question: "When MUST you use bracket notation (obj[key]) instead of dot notation (obj.key)?",
        options: [
          "When the property name is stored inside a variable or contains spaces/hyphens",
          "Only when the object contains more than 10 properties",
          "Whenever you want to call an object method",
          "Bracket notation is obsolete; dot notation is always required"
        ],
        correctIndex: 0,
        explanation: "Bracket notation is required when the key name is stored inside a variable or contains characters that aren't valid in JavaScript identifiers (like hyphens or spaces)."
      }
    }
  },

  "js13-object-references-and-copying": {
    slug: "js13-object-references-and-copying",
    code: "JS-13",
    title: "Object References & Copying: References, Shallow vs Deep Cloning",
    subtitle: "Understand how objects live in memory, why copying variables creates shared references, and how to safely clone objects with spread and structuredClone.",
    sections: [
      { id: "part1", label: "Values vs Pointers", icon: "📍", tag: "MEMORY" },
      { id: "part2", label: "The Reference Trap", icon: "🔗", tag: "REFERENCES" },
      { id: "part3", label: "Shallow vs Deep", icon: "🧬", tag: "CLONING" },
      { id: "part4", label: "Mutation Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Cloning Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Values vs Memory References: How JavaScript Stores Data",
      bigPicture: "In JavaScript, primitive values (numbers, strings, booleans) and objects behave completely differently when you copy them. Primitives are copied by value—like printing a second copy of a document on paper. If you write notes on your paper copy, your friend's paper copy doesn't change. But objects are stored in memory and copied by reference—like sharing a Google Docs link. If you give someone the link and they edit the document, you see the edits immediately because you are both looking at the exact same document!",
      breakdownTitle: "Core Concepts of Object Memory:",
      breakdownItems: [
        {
          title: "Primitives Copy by Value",
          desc: "let a = 5; let b = a; b = 10; leaves a untouched at 5. Primitives are completely independent copies."
        },
        {
          title: "Objects Copy by Reference",
          desc: "const b = a does NOT copy an object. It simply creates a second variable pointing to the exact same object in memory."
        },
        {
          title: "Object Equality with ===",
          desc: "Two objects are only === if they point to the exact same memory address. Even if two separate objects have identical properties ({ score: 10 } === { score: 10 }), the result is false!"
        }
      ]
    },
    part2: {
      title: "The Shared Reference Trap & Safe Cloning Techniques",
      intro: "Why assigning variables shares memory, and how to make safe shallow and deep copies:",
      cards: [
        {
          number: "01",
          tag: "Trap",
          title: "Shared Reference (b = a)",
          description: "Both variables point to the same memory box. Changing a property on b will silently modify a as well!",
          color: "rose"
        },
        {
          number: "02",
          tag: "Shallow",
          title: "Shallow Copy ({ ...obj })",
          description: "Copies the top-level properties into a new object. Perfect for flat objects with no nested objects or arrays.",
          color: "purple"
        },
        {
          number: "03",
          tag: "Deep",
          title: "Deep Clone (structuredClone)",
          description: "Standard modern function that recursively clones every nested layer into independent memory.",
          color: "emerald"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Object Copying",
        content: "Never assume that const b = a creates a new copy of an object! If you need an independent copy, use shallow spread { ...a } for flat objects, or structuredClone(a) when the object has nested objects or arrays."
      }
    },
    part3: {
      title: "Shallow Copy Limits vs Modern structuredClone()",
      intro: "Understanding where shallow copying falls short and when deep cloning is necessary:",
      points: [
        {
          title: "1. The Shallow Copy Limitation",
          content: "Spread { ...user } creates a new outer object. However, if user has a nested object (like address: { city: 'Tokyo' }), the address property in both copies still points to the same inner address object!"
        },
        {
          title: "2. Native structuredClone() for Deep Copies",
          content: "Modern JavaScript provides structuredClone(original) as a native global function. It makes a complete deep clone of nested objects and arrays without third-party libraries."
        },
        {
          title: "3. Object Comparison Gotcha",
          content: "Checking { name: 'Sam' } === { name: 'Sam' } evaluates to false because each curly-brace literal creates a brand-new, distinct object in memory."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Accidental Mutation via Shared Pointers",
      bad: {
        title: "❌ Bad: Modifying an object through a shared reference",
        code: `const originalUser = { name: "Sarah", role: "Viewer" };

// Bug: Not a copy! Both variables point to the same object in memory!
const updatedUser = originalUser;
updatedUser.role = "Admin";

// Original user was accidentally changed!
console.log("Original role:", originalUser.role); // "Admin" (Security bug!)`,
        explanation: "Assigning updatedUser = originalUser does not duplicate the object. Modifying updatedUser.role mutates the original object."
      },
      good: {
        title: "✅ Clean: Safe shallow copy with property overrides",
        code: `const originalUser = { name: "Sarah", role: "Viewer" };

// Clean: Spread creates a fresh independent object:
const updatedUser = { ...originalUser, role: "Admin" };

console.log("Original role:", originalUser.role); // "Viewer" (Safe and untouched!)
console.log("Updated role:", updatedUser.role);   // "Admin"`,
        explanation: "Using the spread operator ({ ...originalUser }) creates a new object in memory, leaving the original object completely untouched."
      }
    },
    part5: {
      title: "Object References & Cloning Playground",
      intro: "Observe shared reference mutations, see where shallow copy stops, and perform a deep clone with structuredClone:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-13: OBJECT REFERENCES & CLONING PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Primitive copy by value (independent):
let scoreA = 100;
let scoreB = scoreA;
scoreB = 200;
console.log("Primitives are independent -> scoreA:", scoreA, "| scoreB:", scoreB);

// 2. The Shared Reference Trap:
const hero1 = { name: "Aria", level: 10 };
const hero2 = hero1; // Shares the same reference!
hero2.level = 99;
console.log("Shared reference -> hero1.level:", hero1.level); // 99 (Mutated!)

// 3. Safe Shallow Copy for flat objects:
const userProfile = { name: "Maya", theme: "dark" };
const userProfileCopy = { ...userProfile, theme: "light" };
console.log("Original theme:", userProfile.theme);     // "dark" (Untouched)
console.log("Copy theme:", userProfileCopy.theme);     // "light"

// 4. Nested Objects: Shallow copy vs structuredClone():
const gameSettings = {
  volume: 80,
  graphics: { resolution: "1080p", shadows: true }
};

// Shallow copy:
const shallowSettings = { ...gameSettings };

// Deep clone:
const deepSettings = structuredClone(gameSettings);

// Modifying nested property on shallow copy affects original!
shallowSettings.graphics.resolution = "4K";
console.log("Original graphics after shallow edit:", gameSettings.graphics.resolution); // "4K"!

// Modifying deep clone leaves original safe:
deepSettings.graphics.resolution = "1440p";
console.log("Original graphics after deep clone edit:", gameSettings.graphics.resolution); // "4K" (Untouched)
console.log("Deep clone graphics:", deepSettings.graphics.resolution);                    // "1440p"
`
    },
    part6: {
      title: "Key Takeaways: Object References & Copying",
      takeaways: [
        {
          title: "1. Values vs References",
          desc: "Primitives copy values independently; objects copy memory pointers to the same data."
        },
        {
          title: "2. The b = a Trap",
          desc: "Assigning an object variable to another does not clone it. Changes to one affect the other."
        },
        {
          title: "3. Shallow Copy with Spread",
          desc: "Use { ...obj } to clone top-level properties of flat objects."
        },
        {
          title: "4. Deep Clone with structuredClone",
          desc: "Use structuredClone(obj) when cloning objects that contain nested objects or arrays."
        },
        {
          title: "5. Next Step: Modern ES6+ Syntax",
          desc: "In JS-14, we begin Stage 4 with Destructuring to easily unpack objects and arrays into variables!"
        }
      ],
      nextLessonPreview: {
        title: "JS-14: Destructuring: Unpacking Objects & Arrays with Ease",
        desc: "Extract properties directly into named variables with fallback defaults and key renaming."
      }
    },
    part7: {
      title: "Knowledge Check: Object References",
      quiz: {
        question: "Why does modifying b.score also modify a.score after running 'const b = a'?",
        options: [
          "Because both variables point to the exact same object in computer memory",
          "Because const variables automatically sync their values",
          "Because JavaScript creates a background timer that copies changes",
          "It does not; b is an independent copy"
        ],
        correctIndex: 0,
        explanation: "Assigning const b = a copies the memory reference (pointer), not the object. Both a and b point to the exact same object in memory."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 4 QUIZZES: JS-10, JS-11, JS-12, JS-13
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch4Quizzes = [
  {
    id: "quiz-javascript-js10",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js10-arrays-and-indexing",
    lessonCode: "JS-10",
    lessonTitle: "Arrays & Indexing: Managing Ordered Lists",
    description: "Evaluate your understanding of zero-based array indexing, array length, push, pop, and safe slicing.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js10-q1",
        type: "multiple_choice",
        title: "Zero-Based Indexing and Length",
        prompt: "If an array contains 4 items (items.length === 4), what is the index of the very last item in that array?",
        options: [
          "4",
          "3",
          "0",
          "undefined"
        ],
        correctAnswer: 1,
        explanation: "Because JavaScript arrays start counting indices at 0, the items sit at slots 0, 1, 2, and 3. The last item is always at index items.length - 1 (4 - 1 = 3).",
        hint: "The 4 items are stored at slots 0, 1, 2, 3.",
        hintCostXP: 5
      },
      {
        id: "js10-q2",
        type: "code_output",
        title: "Array push and pop",
        prompt: "What will this code print to the console?",
        codeSnippet: `const tasks = ["Write tests", "Fix bugs"];
tasks.push("Deploy app");
const completed = tasks.pop();
console.log(tasks.length + " | " + completed);`,
        language: "javascript",
        options: [
          "'2 | Deploy app'",
          "'3 | Deploy app'",
          "'2 | Fix bugs'",
          "'3 | Write tests'"
        ],
        correctAnswer: 0,
        explanation: "tasks.push('Deploy app') adds a 3rd item. Then tasks.pop() removes and returns that last item ('Deploy app'), leaving 2 items in tasks.",
        hint: "push adds to the end, pop removes and returns the last item.",
        hintCostXP: 5
      },
      {
        id: "js10-q3",
        type: "multiple_choice",
        title: "Safe Copying with slice()",
        prompt: "What happens to the original array when you call const subset = original.slice(0, 2)?",
        options: [
          "The first two items are deleted from the original array",
          "The original array remains completely untouched, and slice() returns a new array with the selected items",
          "The original array is converted into a string",
          "slice() modifies the original array in place"
        ],
        correctAnswer: 1,
        explanation: "array.slice(start, end) is non-destructive. It extracts a shallow copy of the requested elements into a fresh array without altering the original array.",
        hint: "slice makes a safe copy; it does not cut items out of the original list.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js11",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js11-essential-array-methods",
    lessonCode: "JS-11",
    lessonTitle: "Essential Array Methods: map, filter, find & reduce",
    description: "Check your knowledge of transforming lists with map, selecting with filter, looking up items with find, and calculating totals with reduce.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js11-q1",
        type: "code_output",
        title: "Chaining filter and map",
        prompt: "What will this chained array pipeline print?",
        codeSnippet: `const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 10);
console.log(result);`,
        language: "javascript",
        options: [
          "[20, 40]",
          "[10, 20, 30, 40, 50]",
          "[2, 4]",
          "[60]"
        ],
        correctAnswer: 0,
        explanation: "filter(n => n % 2 === 0) keeps only the even numbers [2, 4]. Then map(n => n * 10) multiplies each remaining number by 10, producing [20, 40].",
        hint: "Filter for even numbers first, then multiply those numbers by 10.",
        hintCostXP: 5
      },
      {
        id: "js11-q2",
        type: "multiple_choice",
        title: "find() vs filter()",
        prompt: "What is the key difference between array.find() and array.filter()?",
        options: [
          "find() returns the first matching item directly (or undefined), whereas filter() returns an array of all matching items",
          "find() modifies the original array, while filter() does not",
          "filter() only works on numbers, while find() only works on strings",
          "There is no difference; they are identical aliases"
        ],
        correctAnswer: 0,
        explanation: "find() stops searching as soon as it finds the first element that satisfies the condition and returns that single item. filter() checks all elements and returns an array of matches.",
        hint: "One returns a single element directly; the other returns an array.",
        hintCostXP: 5
      },
      {
        id: "js11-q3",
        type: "code_output",
        title: "Calculating totals with reduce",
        prompt: "What number will this reduce accumulator calculate?",
        codeSnippet: `const cart = [
  { price: 10 },
  { price: 25 },
  { price: 15 }
];
const total = cart.reduce((runningSum, item) => runningSum + item.price, 0);
console.log(total);`,
        language: "javascript",
        options: [
          "50",
          "25",
          "0",
          "NaN"
        ],
        correctAnswer: 0,
        explanation: "Starting with 0: 0 + 10 = 10, then 10 + 25 = 35, and finally 35 + 15 = 50. The final accumulated sum is 50.",
        hint: "Add up the prices starting from initial value 0: 0 + 10 + 25 + 15.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js12",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js12-objects-and-methods",
    lessonCode: "JS-12",
    lessonTitle: "Objects & Methods: Key-Value Pairs & Behaviors",
    description: "Test your understanding of object properties, dot notation vs bracket notation, object methods, and const object mutability.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js12-q1",
        type: "multiple_choice",
        title: "When to Use Bracket Notation",
        prompt: "When MUST you use bracket notation (user[field]) instead of dot notation (user.field)?",
        options: [
          "When the property name is stored inside a variable or contains spaces/hyphens",
          "Whenever the object has more than 3 properties",
          "Only when reading numbers from an object",
          "Dot notation is deprecated; bracket notation is always required"
        ],
        correctAnswer: 0,
        explanation: "Dot notation only works for fixed, valid JavaScript identifiers. If the property key is stored in a variable (e.g. const key = 'email') or has special characters, bracket notation is required.",
        hint: "Think: user[variableKey] evaluates the variable.",
        hintCostXP: 5
      },
      {
        id: "js12-q2",
        type: "code_output",
        title: "Updating Properties in a const Object",
        prompt: "What will this code print to the console?",
        codeSnippet: `const product = { name: "Desk", price: 200 };
product.price = 250;
product["inStock"] = true;
console.log(product.price + " | " + product.inStock);`,
        language: "javascript",
        options: [
          "'250 | true'",
          "'200 | undefined'",
          "TypeError: Assignment to constant variable",
          "'250 | undefined'"
        ],
        correctAnswer: 0,
        explanation: "Declaring an object with const prevents reassigning the variable product to a different object, but the internal properties can be freely updated or added.",
        hint: "const locks the variable reference, not the properties inside.",
        hintCostXP: 5
      },
      {
        id: "js12-q3",
        type: "multiple_choice",
        title: "Inspecting Properties with Object.keys()",
        prompt: "What does Object.keys(obj) return?",
        options: [
          "An array containing all the property names (keys) of the object",
          "A single string with all keys separated by commas",
          "The number of properties in the object as a number",
          "A deep clone of the object"
        ],
        correctAnswer: 0,
        explanation: "Object.keys(obj) returns an array of strings representing all the enumerable property keys defined on the object.",
        hint: "It returns an array of strings: the names of the keys.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js13",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js13-object-references-and-copying",
    lessonCode: "JS-13",
    lessonTitle: "Object References & Copying: References, Shallow vs Deep Cloning",
    description: "Check your grasp of memory references, the shared reference trap, shallow copy with spread, and native deep cloning with structuredClone.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js13-q1",
        type: "code_output",
        title: "The Shared Reference Trap",
        prompt: "What will this code output to the console?",
        codeSnippet: `const a = { count: 10 };
const b = a;
b.count = 25;
console.log(a.count);`,
        language: "javascript",
        options: [
          "10",
          "25",
          "undefined",
          "NaN"
        ],
        correctAnswer: 1,
        explanation: "Assigning const b = a copies the memory reference (pointer), not the object. Both a and b point to the exact same object in memory, so modifying b.count modifies a.count.",
        hint: "Both variables point to the exact same object in memory.",
        hintCostXP: 5
      },
      {
        id: "js13-q2",
        type: "multiple_choice",
        title: "Shallow Copy Limitations",
        prompt: "Why is the spread operator ({ ...user }) considered a SHALLOW copy rather than a deep copy?",
        options: [
          "It copies top-level properties into a new object, but any nested objects or arrays are still shared by reference",
          "It only copies the first property and ignores the rest",
          "It converts all numbers into strings",
          "It only works on arrays, not objects"
        ],
        correctAnswer: 0,
        explanation: "Spread ({ ...user }) creates a new outer object, but if user has nested properties (like user.address = { city: 'Paris' }), the nested object is still shared by memory reference.",
        hint: "Shallow means only 1 layer deep.",
        hintCostXP: 5
      },
      {
        id: "js13-q3",
        type: "multiple_choice",
        title: "Native Deep Cloning with structuredClone",
        prompt: "Which modern built-in JavaScript function creates a true deep clone of an object, including all nested objects and arrays?",
        options: [
          "Object.assign()",
          "structuredClone()",
          "Object.freeze()",
          "JSON.clone()"
        ],
        correctAnswer: 1,
        explanation: "structuredClone() is the standard modern JavaScript function built into browsers and Node.js to create a complete, recursive deep clone of complex objects.",
        hint: "It has 'clone' in its name and is a native global function.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

for (const [slug, lessonObj] of Object.entries(batch4Lessons)) {
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find ${slug} in ${lessonFilePath}`);
  }

  // Find end of this lesson entry: look for next lesson entry or end of object
  const nextSlugs = [
    'js11-essential-array-methods',
    'js12-objects-and-methods',
    'js13-object-references-and-copying',
    'js14-destructuring'
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
console.log('Successfully updated javascript-lesson-content.ts for JS-10, JS-11, JS-12, and JS-13!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (const quizObj of batch4Quizzes) {
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
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-10, JS-11, JS-12, and JS-13!');
