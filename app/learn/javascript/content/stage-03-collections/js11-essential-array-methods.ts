import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js11EssentialArrayMethodsContent: StandardLessonContent = {
  slug: "js11-essential-array-methods",
  code: "JS-11",
  title: "Transforming Arrays with map and filter",
  subtitle: "Transform lists with map, keep matching items with filter, locate single items with find, and calculate totals with reduce.",
  sections: [
    {
      id: "part1",
      label: "map & filter Methods",
      icon: "🧠",
      tag: "CORE CONCEPT"
    },
    {
      id: "part2",
      label: "map, filter & find",
      icon: "⚙️",
      tag: "SYNTAX & RULES"
    },
    {
      id: "part3",
      label: "Method Chaining",
      icon: "📖",
      tag: "STEP-BY-STEP"
    },
    {
      id: "part4",
      label: "Missing return in map",
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
    title: "Transforming Arrays with map and filter",
    bigPicture: "`map` transforms every element into a new array, while `filter` extracts only items that pass a test. Both methods are immutable and leave the original array untouched.",
    breakdownTitle: "The Big 3 Array Methods",
    breakdownItems: [
      {
        title: "map() for Transformations",
        desc: "Transforms each item and returns a new array of the same length."
      },
      {
        title: "filter() for Subsets",
        desc: "Tests each item and returns a new array with only the elements that return true."
      },
      {
        title: "find() for First Match",
        desc: "Returns the very first element matching the condition, or undefined if not found."
      }
    ]
  },
  part2: {
    title: "How map, filter, and find Work",
    intro: "Observe how each method accepts an arrow callback to process items.",
    cards: [
      {
        number: "01",
        tag: "Transform",
        title: "array.map()",
        description: "Transforms each item into a new format or calculation.",
        codeSnippet: "const prices = [10, 20, 30];\nconst withTax = prices.map(price => price * 1.1);\nconsole.log(withTax);\n// Output: [11, 22, 33]",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Filter",
        title: "array.filter()",
        description: "Keeps only items that return true for the test condition.",
        codeSnippet: "const scores = [45, 80, 92, 60];\nconst passed = scores.filter(score => score >= 70);\nconsole.log(passed);\n// Output: [80, 92]",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Locate",
        title: "array.find()",
        description: "Returns the first matching item directly (not an array).",
        codeSnippet: "const users = [{ id: 1, name: \"Maya\" }, { id: 2, name: \"Alex\" }];\nconst found = users.find(u => u.id === 2);\nconsole.log(found.name);\n// Output: Alex",
        color: "purple"
      }
    ],
    rule: {
      title: "The Callback Return Rule",
      content: "Inside map, return the new transformed value. Inside filter, return true to keep the item or false to drop it."
    }
  },
  part3: {
    title: "Chaining Array Methods Together",
    intro: "Because map and filter return new arrays, you can connect them in a pipeline.",
    points: [
      {
        title: "1. Filter First, Transform Second",
        content: "A common pattern: remove unwanted items first, then transform the remaining items.",
        codeSnippet: "const numbers = [1, 2, 3, 4, 5, 6];\nconst doubledEvens = numbers\n  .filter(n => n % 2 === 0) // Keeps [2, 4, 6]\n  .map(n => n * 2);          // Becomes [4, 8, 12]\nconsole.log(doubledEvens); // Output: [4, 8, 12]"
      },
      {
        title: "2. Working with Lists of Objects",
        content: "In web apps, you frequently filter collections of products or users and pluck out specific properties.",
        codeSnippet: "const products = [\n  { name: \"Laptop\", inStock: true, price: 999 },\n  { name: \"Phone\", inStock: false, price: 699 },\n  { name: \"Tablet\", inStock: true, price: 499 }\n];\nconst inStockNames = products\n  .filter(p => p.inStock)\n  .map(p => p.name);\nconsole.log(inStockNames); // Output: ['Laptop', 'Tablet']"
      },
      {
        title: "3. Totaling with reduce()",
        content: "reduce() accumulates all items in an array down to a single value, such as a grand total.",
        codeSnippet: "const cart = [25, 40, 15];\nconst total = cart.reduce((sum, item) => sum + item, 0);\nconsole.log(\"Grand total:\", total); // Output: Grand total: 80"
      }
    ]
  },
  part4: {
    title: "Common Trap: Forgetting return Inside map",
    bad: {
      title: "❌ Forgetting return in Multi-Line map",
      code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => {\n  n * 2; // BUG: No explicit return!\n});\nconsole.log(doubled);\n// Output: [undefined, undefined, undefined]",
      explanation: "When using curly braces in an arrow function inside map, you must include an explicit return keyword, or each element becomes undefined."
    },
    good: {
      title: "✅ Use Single-Line Implicit Return",
      code: "const nums = [1, 2, 3];\nconst doubled = nums.map(n => n * 2); // Clean implicit return\nconsole.log(doubled);\n// Output: [2, 4, 6]",
      explanation: "Single-line arrow functions return automatically, preventing undefined bugs."
    }
  },
  part5: {
    title: "Interactive Code Playground",
    intro: "Filter active users and transform their names into an formatted uppercase list.",
    starterCode: "const members = [\n  { name: \"Alex\", active: true, points: 120 },\n  { name: \"Sam\", active: false, points: 40 },\n  { name: \"Maya\", active: true, points: 250 }\n];\n\n// 1. Filter for active members:\nconst activeMembers = members.filter(m => m.active);\nconsole.log(\"Active count:\", activeMembers.length);\n\n// 2. Map to extract formatted badges:\nconst badges = activeMembers.map(m => `${m.name.toUpperCase()} (${m.points} pts)`);\nconsole.log(\"Badges:\", badges);\n\n// 3. Find the top member:\nconst topMember = members.find(m => m.points > 200);\nconsole.log(\"Top member found:\", topMember?.name);\n"
  },
  part6: {
    title: "Summary & Key Takeaways",
    takeaways: [
      {
        title: "map() Always Preserves Length",
        desc: "Transforms each element into a new item, returning an array of identical length."
      },
      {
        title: "filter() Selects Subsets",
        desc: "Returns only elements where the callback returns true."
      },
      {
        title: "Original Arrays are Untouched",
        desc: "These methods return new arrays without mutating the source data."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What is the primary difference between array.map() and array.filter()?",
      options: [
        "map transforms every item into a new array of the same length; filter returns only items that pass a true/false condition",
        "map alters the original array, while filter creates a copy",
        "filter can only be used on numbers, while map works on strings",
        "There is no difference; they are aliases for the same function"
      ],
      correctIndex: 0,
      explanation: "array.map() applies a transformation to every element, producing a new array with the exact same number of items. array.filter() tests each item against a condition, returning only the items that pass."
    }
  }
};
