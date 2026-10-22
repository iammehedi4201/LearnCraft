import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js11EssentialArrayMethodsContent: StandardLessonContent = {
  "slug": "js11-essential-array-methods",
  "code": "JS-11",
  "title": "Essential Array Methods: map, filter & reduce",
  "subtitle": "Transform, filter, and aggregate array data without mutating the original arrays.",
  "sections": [
    {
      "id": "part1",
      "label": "Declarative Transforms",
      "icon": "🔄",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "map, filter, reduce",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Pipelines & AI Code",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Array Mutation Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Methods Sandbox",
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
    "title": "The Modern Array Toolbox",
    "bigPicture": "`map`, `filter`, and `reduce` are the cornerstones of modern JavaScript data processing. They allow you to write clean, declarative data transformations without manual loops.",
    "analogy": "Think of an assembly line. `filter` removes defective parts, `map` paints the surviving parts, and `reduce` packs them into a single shipping crate.",
    "diagram": "Original: [ 10, 25, 40 ]\n     |\n     +--> .filter(n => n >= 20)  --> [ 25, 40 ]\n     |\n     +--> .map(n => n * 2)       --> [ 50, 80 ]\n     |\n     +--> .reduce((s, n) => s + n, 0) --> 130",
    "breakdownTitle": "The Big Three Methods",
    "breakdownItems": [
      {
        "title": "map()",
        "desc": "Transforms each item into a new value, producing an array of equal length."
      },
      {
        "title": "filter()",
        "desc": "Selects only items that meet a test condition, producing an equal or shorter array."
      },
      {
        "title": "reduce()",
        "desc": "Combines all items into a single accumulated value (sum, object, count)."
      }
    ]
  },
  "part2": {
    "title": "Core Array Methods in Action",
    "intro": "See how `map`, `filter`, and `reduce` operate on datasets.",
    "cards": [
      {
        "number": "01",
        "tag": "Transform",
        "title": "map() Method",
        "description": "Applies a transformation function to each element and returns a new array.",
        "codeSnippet": "const prices = [10, 20, 30];\nconst withTax = prices.map(p => p * 1.1);\nconsole.log(withTax); // Output: [ 11, 22, 33 ]",
        "color": "emerald"
      },
      {
        "number": "02",
        "tag": "Filter",
        "title": "filter() Method",
        "description": "Keeps only items that return true from the predicate function.",
        "codeSnippet": "const scores = [65, 88, 92, 70];\nconst honors = scores.filter(s => s >= 85);\nconsole.log(honors); // Output: [ 88, 92 ]",
        "color": "cyan"
      },
      {
        "number": "03",
        "tag": "Aggregate",
        "title": "reduce() Method",
        "description": "Rolls all items into a single result using an accumulator.",
        "codeSnippet": "const numbers = [5, 10, 15];\nconst sum = numbers.reduce((acc, curr) => acc + curr, 0);\nconsole.log(\"Sum:\", sum); // Output: Sum: 30",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Immutability Rule",
      "content": "`map` and `filter` never modify the source array. They return a fresh, independent array."
    }
  },
  "part3": {
    "title": "Method Chaining & Reading AI Code",
    "intro": "Chain array methods together to create clean, readable data pipelines.",
    "points": [
      {
        "title": "1. Data Transformation Pipelines",
        "content": "Chain `filter` and `map` together to filter out invalid records and transform the remaining data in one clean pipeline.",
        "codeSnippet": "const users = [\n  { name: \"Alex\", active: true, points: 50 },\n  { name: \"Maria\", active: false, points: 100 },\n  { name: \"Sam\", active: true, points: 80 },\n];\n\nconst activeUserScores = users\n  .filter(u => u.active)\n  .map(u => u.name + \": \" + u.points);\n\nconsole.log(activeUserScores);\n// Output: [ 'Alex: 50', 'Sam: 80' ]"
      },
      {
        "title": "2. Supplying Initial Values to reduce",
        "content": "Always provide an initial value (such as `0` or `{}`) to `reduce`. Calling `reduce` on an empty array without an initial value throws an error.",
        "codeSnippet": "const cart = [\n  { item: \"Book\", price: 15 },\n  { item: \"Pen\", price: 5 },\n];\n\n// Always supply initial accumulator (0):\nconst total = cart.reduce((sum, item) => sum + item.price, 0);\nconsole.log(\"Total price: $\" + total); // Output: Total price: $20"
      },
      {
        "title": "3. find() vs filter()",
        "content": "Use `find()` when you only need the first matching item. Use `filter()` when you need all matching items.",
        "codeSnippet": "const products = [\n  { id: 101, title: \"Phone\" },\n  { id: 102, title: \"Laptop\" },\n];\n\nconst phone = products.find(p => p.id === 101);\nconsole.log(\"Found product:\", phone.title); // Output: Found product: Phone"
      }
    ]
  },
  "part4": {
    "title": "Mutating Arrays in Place with sort / reverse",
    "bad": {
      "title": "❌ In-Place Array Mutation",
      "code": "const scores = [30, 10, 20];\n// Bug: .sort() mutates the original array!\nconst sorted = scores.sort();\n\nconsole.log(\"Original scores:\", scores); // Output: [ 10, 20, 30 ] (mutated!)",
      "explanation": "Methods like `.sort()` and `.reverse()` modify the original array in place, causing bugs in React and state management."
    },
    "good": {
      "title": "✅ Safe Non-Mutating toSorted()",
      "code": "const scores = [30, 10, 20];\n// Modern non-mutating sort:\nconst sorted = scores.toSorted((a, b) => a - b);\n\nconsole.log(\"Original:\", scores); // Output: [ 30, 10, 20 ] (protected!)\nconsole.log(\"Sorted:\", sorted);   // Output: [ 10, 20, 30 ]",
      "explanation": "Use modern `toSorted()` or copy first with `[...scores].sort()` to leave original state untouched."
    }
  },
  "part5": {
    "title": "Interactive Array Methods Sandbox",
    "intro": "Experiment with `map`, `filter`, and `reduce` in the live editor.",
    "starterCode": "const orders = [\n  { id: 1, item: \"Keyboard\", price: 75, delivered: true },\n  { id: 2, item: \"Mouse\", price: 25, delivered: false },\n  { id: 3, item: \"Monitor\", price: 200, delivered: true },\n];\n\n// 1. Filter delivered orders:\nconst delivered = orders.filter(o => o.delivered);\nconsole.log(\"Delivered count:\", delivered.length);\n\n// 2. Sum revenue of delivered orders:\nconst totalRevenue = delivered.reduce((sum, o) => sum + o.price, 0);\nconsole.log(\"Total Delivered Revenue: $\" + totalRevenue);\n"
  },
  "part6": {
    "title": "Key Takeaways: Array Methods",
    "takeaways": [
      {
        "title": "map Transforms",
        "desc": "map creates a new array by running a function on each element."
      },
      {
        "title": "filter Selects",
        "desc": "filter creates a new array containing only items that match a condition."
      },
      {
        "title": "reduce Accumulates",
        "desc": "reduce folds an entire array into a single value."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "What does `[1, 2, 3].map(n => n * 2)` return?",
      "options": [
        "[2, 4, 6]",
        "[1, 2, 3]",
        "6",
        "undefined"
      ],
      "correctIndex": 0,
      "explanation": "`map` applies the arrow function `n * 2` to each item, producing a brand-new array `[2, 4, 6]`."
    }
  }
};
