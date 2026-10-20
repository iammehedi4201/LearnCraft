const fs = require('fs');

const lessonFilePath = 'app/learn/javascript/data/javascript-lesson-content.ts';
const quizFilePath = 'lib/quiz/javascript-quizzes.ts';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 5: JS-14, JS-15, JS-16
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch5Lessons = {
  "js14-destructuring": {
    slug: "js14-destructuring",
    code: "JS-14",
    title: "Destructuring: Unpacking Objects & Arrays with Ease",
    subtitle: "Extract properties from objects and items from arrays into standalone variables with renaming and fallback defaults.",
    sections: [
      { id: "part1", label: "Unpacking Values", icon: "📦", tag: "FOUNDATION" },
      { id: "part2", label: "Object Extraction", icon: "🏷️", tag: "OBJECTS" },
      { id: "part3", label: "Arrays & Parameters", icon: "📑", tag: "ARRAYS" },
      { id: "part4", label: "Clean Code & Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Destructuring Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Unpacking Values: The Clean Modern Shortcut",
      bigPicture: "Imagine receiving a delivery box of groceries. Rather than keeping everything sealed inside the box and writing box.milk, box.bread, and box.eggs every time you cook, you unpack the items onto your kitchen counter where you can grab them directly! In JavaScript, destructuring is the exact same concept: it is a modern, clean syntax that unpacks properties from objects or items from arrays into standalone variables in a single line.",
      breakdownTitle: "Core Concepts in This Lesson:",
      breakdownItems: [
        {
          title: "Object Destructuring ({ name, age } = user)",
          desc: "Extracts values by their matching property names. Because objects are labeled collections, order does not matter."
        },
        {
          title: "Array Destructuring ([first, second] = list)",
          desc: "Extracts values by their numbered position (index). The first variable receives index [0], the second receives [1]."
        },
        {
          title: "Renaming & Fallback Defaults",
          desc: "Rename extracted variables with colons ({ role: userRole }) and protect against missing values with defaults ({ theme = 'dark' })."
        }
      ]
    },
    part2: {
      title: "Object Destructuring: Extracting Properties by Name",
      intro: "How curly brace destructuring pulls data directly into named variables:",
      cards: [
        {
          number: "01",
          tag: "Objects",
          title: "Object Unpacking ({ key })",
          description: "Matches properties by exact key name. const { name, email } = user creates two independent variables directly from the user object.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Arrays",
          title: "Array Unpacking ([a, b])",
          description: "Matches items by order/position. const [first, second] = colors extracts the first two elements. Use commas [, , third] to skip items.",
          color: "cyan"
        },
        {
          number: "03",
          tag: "Safety",
          title: "Fallback Defaults (= value)",
          description: "const { role = 'Guest' } = user sets role to 'Guest' if the role property is missing or strictly undefined in the object.",
          color: "emerald"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Destructuring",
        content: "Object destructuring uses curly braces {} and matches by key name (order does not matter). Array destructuring uses square brackets [] and matches by position (order matters completely)!"
      }
    },
    part3: {
      title: "Renaming Properties & Parameter Destructuring",
      intro: "Assigning custom variable names and unpacking objects directly in function signatures:",
      points: [
        {
          title: "1. Renaming with Colons ({ originalKey: newName })",
          content: "If a property name collides with an existing variable, rename it using a colon: const { id: userId } = user. The original object key is on the left, and your new variable name is on the right."
        },
        {
          title: "2. Destructuring in Function Parameters",
          content: "Instead of accepting a generic options object and writing options.name everywhere, unpack it right in the function header: function greet({ name, role = 'Member' }). This is standard in modern frameworks like React!"
        },
        {
          title: "3. Defaults Only Activate on undefined",
          content: "A default value only kicks in if the extracted value is strictly undefined. If the property contains null, false, or 0, the default value will NOT trigger."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Confusing Renaming Syntax with Defaults",
      bad: {
        title: "❌ Bad: Using equal signs to rename or writing repetitive manual assignments",
        code: `const user = { username: "coder99", role: "Editor" };

// Bug: Writing = when you meant to rename!
// const { username = handle } = user; // Doesn't rename username to handle!

// Repetitive manual extraction:
const username = user.username;
const role = user.role !== undefined ? user.role : "Guest";
console.log(username, role);`,
        explanation: "Equal signs (=) are for default fallback values. To rename a property during destructuring, you must use a colon (:)."
      },
      good: {
        title: "✅ Clean: Clear renaming with colons and clean parameter unpacking",
        code: `const user = { username: "coder99", role: "Editor" };

// Correct renaming: { originalKey: newVariableName }
const { username: handle, role = "Guest" } = user;
console.log("Handle:", handle); // "coder99"
console.log("Role:", role);     // "Editor"

// Unpack directly in function arguments:
function displayBadge({ username, role = "Guest" }) {
  console.log(\`[\${role.toUpperCase()}] \${username}\`);
}
displayBadge(user); // "[EDITOR] coder99"`,
        explanation: "Using colon syntax ({ username: handle }) cleanly creates a new variable named handle. Destructuring in function headers makes requirements instantly clear."
      }
    },
    part5: {
      title: "Destructuring Playground",
      intro: "Unpack nested user records, rename colliding variables, unpack array coordinates, and swap variables cleanly:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-14: DESTRUCTURING PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const account = {
  id: 402,
  profile: {
    displayName: "Alex Rivera",
    email: "alex@example.com"
  },
  preferences: {
    theme: "dark"
    // notifications is undefined
  }
};

// 1. Nested object destructuring with renaming and defaults:
const {
  id: accountId, // Renamed from id to accountId
  profile: { displayName, email },
  preferences: { theme, notifications = "email-only" } // Default fallback
} = account;

console.log("Account ID:", accountId);
console.log("User:", displayName, "(" + email + ")");
console.log("Theme:", theme, "| Notifications:", notifications);

// 2. Array destructuring with item skipping:
const coordinates = [37.7749, -122.4194, 15]; // [latitude, longitude, zoom]
const [lat, lng, zoom = 10] = coordinates;
console.log("Location -> Lat:", lat, "Lng:", lng, "Zoom:", zoom);

// 3. Variable swapping without a temporary variable:
let primary = "Gold";
let secondary = "Silver";
[primary, secondary] = [secondary, primary];
console.log("Swapped colors -> Primary:", primary, "| Secondary:", secondary);

// 4. Function parameter destructuring:
function printSummary({ profile: { displayName }, preferences: { theme } }) {
  return \`Summary: \${displayName} prefers \${theme} mode.\`;
}
console.log(printSummary(account));
`
    },
    part6: {
      title: "Key Takeaways: Destructuring",
      takeaways: [
        {
          title: "1. Objects by Key Name",
          desc: "Use { prop } to unpack object properties directly. Order does not matter."
        },
        {
          title: "2. Arrays by Position",
          desc: "Use [item1, item2] to unpack array items by index position."
        },
        {
          title: "3. Rename with Colons",
          desc: "Use { originalKey: newName } to assign properties to custom variable names."
        },
        {
          title: "4. Defaults for undefined",
          desc: "Use { prop = defaultVal } to provide a safe fallback if the property is missing."
        },
        {
          title: "5. Next Step: Spread & Rest",
          desc: "In JS-15, we master the three dots (...) to expand collections and gather arguments!"
        }
      ],
      nextLessonPreview: {
        title: "JS-15: Spread & Rest Operators: Expanding and Gathering (...)",
        desc: "Use the three dots (...) to unpack collections with spread and collect variable arguments with rest parameters."
      }
    },
    part7: {
      title: "Knowledge Check: Destructuring",
      quiz: {
        question: "How do you rename a property from 'id' to 'userId' while destructuring an object?",
        options: [
          "const { id as userId } = user;",
          "const { id: userId } = user;",
          "const { id -> userId } = user;",
          "const { userId = id } = user;"
        ],
        correctIndex: 1,
        explanation: "In JavaScript object destructuring, renaming uses a colon: { originalKey: newVariableName } = object. The colon specifies the new variable name to create."
      }
    }
  },

  "js15-spread-and-rest-operators": {
    slug: "js15-spread-and-rest-operators",
    code: "JS-15",
    title: "Spread & Rest Operators: Expanding and Gathering (...)",
    subtitle: "Use the three dots (...) to unpack collections with spread and collect variable arguments with rest parameters.",
    sections: [
      { id: "part1", label: "The Three Dots (...)", icon: "✨", tag: "FOUNDATION" },
      { id: "part2", label: "Spread: Unpacking", icon: "📤", tag: "SPREAD" },
      { id: "part3", label: "Rest: Gathering", icon: "📥", tag: "REST" },
      { id: "part4", label: "Placement Rules & Traps", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Spread & Rest Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "The Three Dots (...): Spreading vs Gathering",
      bigPicture: "In modern JavaScript, the three dots (...) are one of the most versatile tools you will use. But beginners are often confused because the exact same three dots do two opposite jobs depending on where you put them! Think of packing and unpacking a suitcase: Spread is unpacking your suitcase and spreading your clothes across your room. Rest is gathering loose clothes from the floor and packing them into a suitcase.",
      breakdownTitle: "The Twin Roles of the Three Dots (...):",
      breakdownItems: [
        {
          title: "Spread Operator (Unpack)",
          desc: "Unpacks an array or object into individual elements or properties. Use it to copy arrays, concatenate lists, or merge objects."
        },
        {
          title: "Rest Parameters (Gather)",
          desc: "Gathers multiple incoming function arguments or remaining object properties into a single, real JavaScript array."
        },
        {
          title: "Safe Non-Destructive Merging",
          desc: "Combining data with spread creates fresh collections, leaving your original arrays and objects completely untouched."
        }
      ]
    },
    part2: {
      title: "Spread Syntax: Unpacking Arrays & Merging Objects",
      intro: "How spread expands items into new arrays and objects without modifying originals:",
      cards: [
        {
          number: "01",
          tag: "Arrays",
          title: "Array Spread [...a, ...b]",
          description: "Unpacks elements from multiple arrays into a fresh, combined array. Perfect for safe cloning and concatenation.",
          color: "purple"
        },
        {
          number: "02",
          tag: "Objects",
          title: "Object Spread { ...a, ...b }",
          description: "Merges objects cleanly. If both objects contain the same key, the property on the right overwrites the one on the left.",
          color: "emerald"
        },
        {
          number: "03",
          tag: "Function Calls",
          title: "Math.max(...numbers)",
          description: "Unpacks an array of numbers as individual arguments into functions that expect separate parameters.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Object Merging",
        content: "When merging objects with spread { ...defaults, ...custom }, keys from the object on the right always overwrite keys on the left! Put your default values first, followed by custom user overrides."
      }
    },
    part3: {
      title: "Rest Parameters: Gathering Flexible Arguments",
      intro: "Writing functions that accept any number of arguments cleanly:",
      points: [
        {
          title: "1. Gathering Indefinite Arguments",
          content: "Use ...args in a function parameter list: function sumAll(...numbers). All incoming arguments are gathered into a real array named numbers."
        },
        {
          title: "2. Real Array Superpowers",
          content: "Unlike the confusing legacy 'arguments' object from older JavaScript, rest parameters produce a real JavaScript array with full access to .map(), .filter(), and .reduce()."
        },
        {
          title: "3. Rest in Destructuring",
          content: "You can also use rest to collect remaining properties: const [first, ...others] = [1, 2, 3, 4] gives first = 1 and others = [2, 3, 4]."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Rest Placement and Mutation Traps",
      bad: {
        title: "❌ Bad: Putting rest parameters in the middle of a parameter list",
        code: `// SyntaxError: Rest parameter must be last formal parameter!
// function logEvent(level, ...details, timestamp) {
//   console.log(level, details, timestamp);
// }

function sumAll() {
  // Bad legacy code: arguments is not an array!
  // arguments.map(n => n * 2); // TypeError: arguments.map is not a function!
}`,
        explanation: "JavaScript requires the rest parameter to be the very last parameter because it collects all remaining arguments. Placing anything after it causes a SyntaxError."
      },
      good: {
        title: "✅ Clean: Rest at the end and modern declarative array reduction",
        code: `// Clean: Rest parameter is always the final parameter:
function logEvent(level, timestamp, ...details) {
  console.log(\`[\${level}] at \${timestamp}:\`, details.join(" | "));
}
logEvent("INFO", "12:00PM", "User logged in", "IP 10.0.0.1");

// Clean modern rest function with reduce:
const sumAll = (...numbers) => numbers.reduce((total, n) => total + n, 0);
console.log("Sum:", sumAll(10, 20, 30)); // 60`,
        explanation: "Placing the rest parameter at the end allows JavaScript to gather all trailing arguments into a real array that supports all array methods."
      }
    },
    part5: {
      title: "Spread & Rest Playground",
      intro: "Merge arrays and objects with spread, pass array items into Math functions, and write flexible rest functions:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-15: SPREAD & REST PLAYGROUND
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Array Spread: Combine lists non-destructively
const starterSkills = ["HTML", "CSS"];
const backendSkills = ["Node.js", "PostgreSQL"];
const fullStackSkills = [...starterSkills, "JavaScript", ...backendSkills, "Git"];
console.log("Full Stack Skills:", fullStackSkills);

// 2. Object Spread: Merging defaults with user settings
const defaultSettings = { theme: "light", fontSize: 14, autoSave: true };
const userCustomizations = { theme: "dark", fontSize: 16 }; // Custom overrides
const activeConfig = { ...defaultSettings, ...userCustomizations };
console.log("Active Config (dark theme wins):", activeConfig);

// 3. Function Call Spread: Math.max on an array
const scores = [85, 92, 78, 99, 88];
const highestScore = Math.max(...scores); // Unpacks to: Math.max(85, 92, 78, 99, 88)
console.log("Highest Score:", highestScore);

// 4. Rest Parameters in Functions:
function formatInvoice(customerName, discountPercent, ...itemPrices) {
  const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const finalTotal = subtotal - discountAmount;
  return \`Invoice for \${customerName}: $\${finalTotal.toFixed(2)} (\${itemPrices.length} items)\`;
}

console.log(formatInvoice("Acme Corp", 10, 100, 50, 25));

// 5. Rest in Destructuring:
const [primaryColor, ...accentColors] = ["#ff0000", "#00ff00", "#0000ff", "#ffff00"];
console.log("Primary:", primaryColor);
console.log("Accents array:", accentColors);
`
    },
    part6: {
      title: "Key Takeaways: Spread & Rest Operators",
      takeaways: [
        {
          title: "1. Spread Unpacks (...)",
          desc: "Expands arrays into individual items and merges objects cleanly without mutations."
        },
        {
          title: "2. Rest Gathers (...)",
          desc: "Collects multiple incoming arguments into a single real JavaScript array."
        },
        {
          title: "3. Right-Side Precedence",
          desc: "In object spread { ...a, ...b }, properties from 'b' overwrite identical properties from 'a'."
        },
        {
          title: "4. Rest Must Be Last",
          desc: "Rest parameters must always sit at the end of a function parameter list."
        },
        {
          title: "5. Next Step: Safe Property Access",
          desc: "In JS-16, we learn Optional Chaining (?.) and Nullish Coalescing (??) to prevent crashes!"
        }
      ],
      nextLessonPreview: {
        title: "JS-16: Optional Chaining (?.) & Nullish Coalescing (??)",
        desc: "Prevent runtime errors by safely navigating nested data with ?. and setting safe fallbacks with ?? without false-alarm bugs."
      }
    },
    part7: {
      title: "Knowledge Check: Spread & Rest",
      quiz: {
        question: "Where must a Rest parameter (...args) be placed in a function definition?",
        options: [
          "Anywhere in the parameter list; position does not matter",
          "It must always be the very last parameter in the list",
          "It must always be the very first parameter in the list",
          "A function can have multiple rest parameters anywhere"
        ],
        correctIndex: 1,
        explanation: "A rest parameter gathers all remaining arguments into an array, so it must always be the last parameter in the function declaration."
      }
    }
  },

  "js16-optional-chaining-and-nullish-coalescing": {
    slug: "js16-optional-chaining-and-nullish-coalescing",
    code: "JS-16",
    title: "Optional Chaining (?.) & Nullish Coalescing (??)",
    subtitle: "Prevent runtime errors by safely navigating nested data with ?. and setting safe fallbacks with ?? without false-alarm bugs.",
    sections: [
      { id: "part1", label: "Defensive Coding", icon: "🛡️", tag: "SAFETY" },
      { id: "part2", label: "Optional Chaining (?.)", icon: "🔗", tag: "CHAINING" },
      { id: "part3", label: "Nullish (??) vs OR (||)", icon: "⚖️", tag: "DEFAULTS" },
      { id: "part4", label: "The Falsy Zero Bug", icon: "⚠️", tag: "TRAPS" },
      { id: "part5", label: "Safe Navigation Playground", icon: "💻", tag: "SANDBOX" },
      { id: "part6", label: "Key Takeaways", icon: "🎓", tag: "SUMMARY" },
      { id: "part7", label: "Quick Quiz", icon: "🎯", tag: "QUIZ" }
    ],
    part1: {
      title: "Defensive Coding: Surviving Missing Properties and API Data",
      bigPicture: "Every JavaScript developer eventually encounters the most common runtime crash: TypeError: Cannot read properties of undefined (reading 'city'). This happens when your code tries to drill into an object that doesn't exist—often because an API response is still loading, a profile field is optional, or data is missing. In the past, developers had to write long, clunky checks like user && user.address && user.address.city. Modern JavaScript solves this elegantly with two tools: Optional Chaining (?.) and Nullish Coalescing (??).",
      breakdownTitle: "The Defensive Coding Toolkit:",
      breakdownItems: [
        {
          title: "Optional Chaining (?.)",
          desc: "Safely reads nested properties. If any part of the chain is null or undefined, it stops immediately and safely returns undefined instead of crashing."
        },
        {
          title: "Nullish Coalescing (??)",
          desc: "Provides a fallback value ONLY when the left side is null or undefined, safely preserving valid 0, false, and empty string '' values."
        },
        {
          title: "The || False-Alarm Trap",
          desc: "Logical OR (||) treats 0, false, and '' as falsy, accidentally overwriting legitimate zero values with fallback defaults."
        }
      ]
    },
    part2: {
      title: "Optional Chaining (?.): Safe Property Access",
      intro: "Navigating deeply nested structures without fearing runtime crashes:",
      cards: [
        {
          number: "01",
          tag: "Safe Drill",
          title: "Nested Keys (user?.address?.city)",
          description: "If user or address is null or undefined, evaluation stops immediately and evaluates to undefined. No crash!",
          color: "emerald"
        },
        {
          number: "02",
          tag: "Smart Defaults",
          title: "Nullish Coalescing (value ?? default)",
          description: "Returns the fallback only if value is null or undefined. A score of 0 or boolean of false is kept intact.",
          color: "purple"
        },
        {
          number: "03",
          tag: "Safe Calls",
          title: "Optional Calls (callback?.())",
          description: "Executes a function only if it exists. If the callback was omitted, JavaScript cleanly skips the call without errors.",
          color: "cyan"
        }
      ],
      rule: {
        title: "💡 Golden Rule of Default Values",
        content: "Always choose the nullish coalescing operator ?? over logical OR || when providing default values for numbers, booleans, and strings! ?? protects against replacing valid zeros or false booleans."
      }
    },
    part3: {
      title: "Nullish Coalescing (??) vs Logical OR (||)",
      intro: "Understanding why ?? is much safer than || for default values:",
      points: [
        {
          title: "1. The Falsy Overwrite Trap with ||",
          content: "The logical OR operator (||) checks for any falsy value (0, false, '', null, undefined, NaN). If a user has 0 unread messages, count || 10 replaces 0 with 10! That's a real bug."
        },
        {
          title: "2. The Nullish Definition (??)",
          content: "The nullish operator (??) only looks for 'nullish' values: null and undefined. It treats 0, false, and empty strings as completely valid, preserving your real data."
        },
        {
          title: "3. Safe Array Indexing (?.[0])",
          content: "You can safely access array elements that might not exist using bracket notation: users?.[0]?.name cleanly checks if users exists and has a first element."
        }
      ]
    },
    part4: {
      title: "Common Mistakes: Using || for Numeric Defaults",
      bad: {
        title: "❌ Bad: Using || for numeric defaults and deep access without ?.",
        code: `const userSettings = {
  volume: 0,         // Legitimate volume level (muted)!
  notifications: false // Legitimate boolean choice!
};

// Bug: 0 is falsy, so || overrides it with 50!
const activeVolume = userSettings.volume || 50;
console.log("Volume:", activeVolume); // 50 (Mute was ignored!)

const account = {};
// Crashes the app: TypeError: Cannot read properties of undefined!
// const zipCode = account.profile.address.zipCode;`,
        explanation: "Using || replaces valid zero (0) values with the default. Accessing properties on undefined without ?. crashes your application immediately."
      },
      good: {
        title: "✅ Clean: Safe navigation with ?. and accurate defaults with ??",
        code: `const userSettings = {
  volume: 0,
  notifications: false
};

// Clean: ?? preserves 0 and false, replacing only null or undefined:
const activeVolume = userSettings.volume ?? 50;
const notificationsOn = userSettings.notifications ?? true;
console.log("Volume:", activeVolume);            // 0 (Muted volume preserved!)
console.log("Notifications:", notificationsOn); // false (User choice preserved!)

const account = {};
// Safe drill: Evaluates cleanly to undefined without crashing
const zipCode = account.profile?.address?.zipCode ?? "No ZIP provided";
console.log("Zip Code:", zipCode); // "No ZIP provided"`,
        explanation: "Optional chaining (?.) prevents crashes when intermediate objects are missing, and nullish coalescing (??) reliably distinguishes valid zeros from missing data."
      }
    },
    part5: {
      title: "Safe Navigation Playground",
      intro: "Explore deep object drilling, test safe method execution, and compare ?? vs || with zeros and booleans:",
      starterCode: `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// JS-16: OPTIONAL CHAINING & NULLISH COALESCING
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const apiResponse = {
  status: 200,
  data: {
    user: {
      name: "Elena Rostova",
      metrics: {
        totalLogins: 0,      // Valid zero!
        isProMember: false   // Valid false!
      }
      // address is missing
      // sendAlert() method is missing
    }
  }
};

// 1. Safe nested property access with ?.
const street = apiResponse.data?.user?.address?.street;
console.log("Street address (safe access):", street); // undefined (No crash!)

// 2. Safe method invocation with ?.()
apiResponse.data?.user?.sendAlert?.("Hello!");
console.log("Safely called optional method without errors!");

// 3. Nullish Coalescing (??) preserves 0 and false:
const logins = apiResponse.data.user.metrics.totalLogins ?? 1;
const isPro = apiResponse.data.user.metrics.isProMember ?? true;

console.log("Total logins (??):", logins); // 0 (Preserved!)
console.log("Is Pro (??):", isPro);        // false (Preserved!)

// Compare with logical OR (||) false-alarm trap:
const corruptedLogins = apiResponse.data.user.metrics.totalLogins || 1;
const corruptedPro = apiResponse.data.user.metrics.isProMember || true;

console.log("With || trap -> logins:", corruptedLogins); // 1 (Bug: 0 was replaced!)
console.log("With || trap -> isPro:", corruptedPro);     // true (Bug: false was replaced!)

// 4. Combined ?. and ?? pattern:
const city = apiResponse.data?.user?.address?.city ?? "City not specified";
console.log("User city:", city); // "City not specified"
`
    },
    part6: {
      title: "Key Takeaways: Optional Chaining & Nullish Coalescing",
      takeaways: [
        {
          title: "1. No More TypeError Crashes",
          desc: "Use ?. to safely access deeply nested properties across potentially missing objects."
        },
        {
          title: "2. Preserves 0, false, and ''",
          desc: "Use ?? to provide defaults only when a value is strictly null or undefined."
        },
        {
          title: "3. Optional Function Calling",
          desc: "Use callback?.() to safely run callbacks that may not have been passed."
        },
        {
          title: "4. Avoid || for Data Defaults",
          desc: "The || operator treats 0 and false as missing, introducing subtle false-alarm bugs."
        },
        {
          title: "5. Next Step: Object-Oriented JS",
          desc: "In Stage 5, we explore the 'this' keyword, prototype inheritance, and modern classes!"
        }
      ],
      nextLessonPreview: {
        title: "JS-17: The this Keyword: Who Called Me?",
        desc: "Learn how 'this' dynamically resolves based on who called a function, and how arrow functions borrow 'this' from their surrounding scope."
      }
    },
    part7: {
      title: "Knowledge Check: Safe Navigation",
      quiz: {
        question: "What does user?.address?.city evaluate to if user.address is null or undefined?",
        options: [
          "It throws a TypeError: Cannot read property 'city' of undefined",
          "undefined (without throwing any error)",
          "null",
          "false"
        ],
        correctIndex: 1,
        explanation: "Optional chaining (?.) short-circuits and safely returns undefined the moment any property in the chain is null or undefined, completely avoiding runtime crashes."
      }
    }
  }
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// BATCH 5 QUIZZES: JS-14, JS-15, JS-16
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const batch5Quizzes = [
  {
    id: "quiz-javascript-js14",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js14-destructuring",
    lessonCode: "JS-14",
    lessonTitle: "Destructuring: Unpacking Objects & Arrays with Ease",
    description: "Assess your skill with object extraction, variable renaming with colons, fallback defaults, and array destructuring.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js14-q1",
        type: "code_output",
        title: "Object Destructuring with Defaults",
        prompt: "What will this code print to the console?",
        codeSnippet: `const user = { name: "Alex" };
const { name, role = "guest" } = user;
console.log(name + " is a " + role);`,
        language: "javascript",
        options: [
          "'Alex is a guest'",
          "'Alex is a undefined'",
          "'guest is a Alex'",
          "ReferenceError: role is not defined"
        ],
        correctAnswer: 0,
        explanation: "name is extracted from user ('Alex'). Because user has no role property, it takes the fallback default value 'guest'.",
        hint: "Default values activate when the property is undefined.",
        hintCostXP: 5
      },
      {
        id: "js14-q2",
        type: "multiple_choice",
        title: "Renaming in Object Destructuring",
        prompt: "How do you rename a property from 'id' to 'userId' while destructuring an object?",
        options: [
          "const { id as userId } = obj;",
          "const { id: userId } = obj;",
          "const { id -> userId } = obj;",
          "const { userId = id } = obj;"
        ],
        correctAnswer: 1,
        explanation: "In JavaScript object destructuring, the colon syntax { sourceKey: newVariableName } extracts sourceKey and assigns it to newVariableName.",
        hint: "Use colon (:), like { id: userId }.",
        hintCostXP: 5
      },
      {
        id: "js14-q3",
        type: "code_output",
        title: "Array Destructuring with Skipped Positions",
        prompt: "What will this array destructuring code output?",
        codeSnippet: `const coords = [10, 20, 30];
const [x, , z] = coords;
console.log(x + "," + z);`,
        language: "javascript",
        options: [
          "'10,20'",
          "'10,30'",
          "'20,30'",
          "'10,undefined'"
        ],
        correctAnswer: 1,
        explanation: "Leaving an empty space between commas [x, , z] skips the second element (20), assigning x=10 and z=30.",
        hint: "An empty comma slot skips that position in array destructuring.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js15",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js15-spread-and-rest-operators",
    lessonCode: "JS-15",
    lessonTitle: "Spread & Rest Operators: Expanding and Gathering (...)",
    description: "Understand the twin roles of the three dots (...): Rest parameters gathering arguments and Spread expanding collections.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js15-q1",
        type: "multiple_choice",
        title: "Rest vs Spread Purpose",
        prompt: "What is the key difference between Rest parameters and the Spread operator?",
        options: [
          "Rest gathers multiple values into a single array; Spread unpacks an array into individual values",
          "Rest is only for strings; Spread is only for numbers",
          "Rest only works in React; Spread only works in Node.js",
          "They are identical synonyms with no behavioral differences"
        ],
        correctAnswer: 0,
        explanation: "Rest (...args in a function parameter) gathers multiple arguments into one array. Spread (...arr in a function call or array literal) expands an array into individual elements.",
        hint: "Rest gathers items into an array; Spread unpacks an array into individual items.",
        hintCostXP: 5
      },
      {
        id: "js15-q2",
        type: "code_output",
        title: "Object Spread Merging Precedence",
        prompt: "What is logged when merging objects with spread?",
        codeSnippet: `const defaults = { theme: "light", zoom: 100 };
const userPrefs = { theme: "dark" };
const config = { ...defaults, ...userPrefs };
console.log(config.theme + " | " + config.zoom);`,
        language: "javascript",
        options: [
          "'dark | 100'",
          "'light | 100'",
          "'dark | undefined'",
          "SyntaxError: Duplicate property"
        ],
        correctAnswer: 0,
        explanation: "Properties spread further to the right overwrite earlier properties with the same name. userPrefs.theme ('dark') overrides defaults.theme ('light').",
        hint: "Properties on the right win when merging objects with spread.",
        hintCostXP: 5
      },
      {
        id: "js15-q3",
        type: "multiple_choice",
        title: "Rest Parameter Placement Rule",
        prompt: "Where must a Rest parameter (...rest) be placed in a function's parameter list?",
        options: [
          "As the very first parameter",
          "As the very last parameter",
          "Anywhere in the parameter list",
          "A function can have multiple rest parameters"
        ],
        correctAnswer: 1,
        explanation: "A rest parameter gathers all remaining arguments, so it must always be the last parameter in the function declaration.",
        hint: "It gathers the 'rest' of the arguments, so nothing can come after it.",
        hintCostXP: 5
      }
    ]
  },

  {
    id: "quiz-javascript-js16",
    trackKey: "javascript",
    trackTitle: "JavaScript",
    lessonSlug: "js16-optional-chaining-and-nullish-coalescing",
    lessonCode: "JS-16",
    lessonTitle: "Optional Chaining (?.) & Nullish Coalescing (??)",
    description: "Verify your mastery of safe property navigation (?.) and precise null/undefined fallbacks (??) without false-alarm bugs.",
    passingScore: 75,
    baseXpReward: 30,
    perfectScoreBonusXp: 15,
    questions: [
      {
        id: "js16-q1",
        type: "multiple_choice",
        title: "Optional Chaining Behavior",
        prompt: "What does user?.address?.city return if user.address is null or undefined?",
        options: [
          "It throws a TypeError: Cannot read property 'city' of undefined",
          "undefined (without throwing an error)",
          "null",
          "false"
        ],
        correctAnswer: 1,
        explanation: "Optional chaining (?.) short-circuits and safely returns undefined as soon as any part of the chain is null or undefined, preventing runtime crashes.",
        hint: "It safely returns undefined instead of throwing a crash.",
        hintCostXP: 5
      },
      {
        id: "js16-q2",
        type: "code_output",
        title: "Nullish Coalescing (??) vs Logical OR (||)",
        prompt: "What will this code log to the console?",
        codeSnippet: `const score = 0;
const res1 = score || 10;
const res2 = score ?? 10;
console.log(res1 + " | " + res2);`,
        language: "javascript",
        options: [
          "'10 | 0'",
          "'0 | 0'",
          "'10 | 10'",
          "'0 | 10'"
        ],
        correctAnswer: 0,
        explanation: "Logical OR (||) treats 0 as falsy, so it falls back to 10. Nullish coalescing (??) only falls back on null or undefined, preserving the valid value 0.",
        hint: "0 is a valid number, but it is falsy in boolean expressions.",
        hintCostXP: 5
      },
      {
        id: "js16-q3",
        type: "multiple_choice",
        title: "Optional Function Invocation",
        prompt: "How do you safely call a callback function that might not have been provided?",
        options: [
          "callback?()",
          "callback?.()",
          "callback!().",
          "call(callback)"
        ],
        correctAnswer: 1,
        explanation: "The syntax callback?.() checks if callback exists before executing it, cleanly skipping the call if callback is null or undefined.",
        hint: "It uses question-mark dot parentheses: ?.",
        hintCostXP: 5
      }
    ]
  }
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO LESSON CONTENT
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let lessonContent = fs.readFileSync(lessonFilePath, 'utf8');

for (const [slug, lessonObj] of Object.entries(batch5Lessons)) {
  const marker = `  "${slug}": {`;
  const startIdx = lessonContent.indexOf(marker);
  if (startIdx === -1) {
    throw new Error(`Could not find ${slug} in ${lessonFilePath}`);
  }

  // Find end of this lesson entry: look for next lesson entry or end of object
  const nextSlugs = [
    'js15-spread-and-rest-operators',
    'js16-optional-chaining-and-nullish-coalescing',
    'js17-the-this-keyword'
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
console.log('Successfully updated javascript-lesson-content.ts for JS-14, JS-15, and JS-16!');

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// APPLY TO QUIZZES
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

let quizContent = fs.readFileSync(quizFilePath, 'utf8');

for (const quizObj of batch5Quizzes) {
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
console.log('Successfully updated lib/quiz/javascript-quizzes.ts for JS-14, JS-15, and JS-16!');
