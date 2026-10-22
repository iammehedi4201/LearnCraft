import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js11EssentialArrayMethodsContent: StandardLessonContent = {
  slug: "js11-essential-array-methods",
  code: "JS-11",
  title: "Transforming Arrays with map and filter",
  subtitle: "Master declarative array transformations, understand the accumulator mechanics of reduce, and chain methods immutably.",
  sections: [
    {
      id: "part1",
      label: "Declarative Transformations",
      icon: "🔄",
      tag: "FOUNDATION"
    },
    {
      id: "part2",
      label: "map & filter",
      icon: "⚡",
      tag: "SYNTAX"
    },
    {
      id: "part3",
      label: "The reduce Mental Model",
      icon: "🧠",
      tag: "ACCUMULATOR"
    },
    {
      id: "part4",
      label: "Missing Initial Value Trap",
      icon: "⚠️",
      tag: "DEBUGGING"
    },
    {
      id: "part5",
      label: "Transformations Sandbox",
      icon: "🚀",
      tag: "PRACTICE"
    },
    {
      id: "part6",
      label: "Core Takeaways",
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
    title: "Declarative Transformations vs Mutable Loops",
    bigPicture: "Modern JavaScript avoids manual for loops with push() when transforming data. Higher-order methods (map, filter, reduce) produce fresh new data structures without mutating the original source array.",
    analogy: "Like a factory assembly line: raw parts enter on a conveyor belt. A filter station removes defective parts, a painting station transforms each part, and an assembly station combines them into a finished product.",
    diagram: "+--------------------------------------------------------+\n| Original: [10, 25, 40]                                 |\n+--------------------------------------------------------+\n  |                                                    |\n  v .filter(n => n >= 20)                              v .map(n => n * 2)\n[25, 40] (Kept matching items)                       [20, 50, 80] (Transformed)\n  \\\n   ---> .reduce((acc, n) => acc + n, 0) --> 65 (Single Value)",
    breakdownTitle: "The Big Three Methods",
    breakdownItems: [
      {
        title: "map() (1-to-1 Transform)",
        desc: "Transforms every element in the array into a new value, always returning a new array of identical length."
      },
      {
        title: "filter() (Subset Selection)",
        desc: "Evaluates each item with a boolean test. If true, the item is kept in the new array; if false, it is dropped."
      },
      {
        title: "reduce() (Many-to-One Accumulation)",
        desc: "Iterates through the list carrying an accumulator, condensing the entire array into a single result (number, object, or string)."
      }
    ]
  },
  part2: {
    title: "map and filter in Action",
    intro: "Use map to transform elements and filter to select subsets.",
    cards: [
      {
        number: "01",
        tag: "Transform",
        title: "map()",
        description: "Returns a brand new array where each element is the return value of your callback.",
        codeSnippet: "const prices = [10, 20, 30];\nconst withTax = prices.map(p => p * 1.1);\nconsole.log(withTax); // Output: [11, 22, 33]\nconsole.log(prices);  // Output: [10, 20, 30] (Untouched!)",
        color: "emerald"
      },
      {
        number: "02",
        tag: "Filter",
        title: "filter()",
        description: "Returns a new array containing only elements where your callback returned true.",
        codeSnippet: "const users = [\n  { name: \"Alex\", active: true },\n  { name: \"Sam\", active: false }\n];\nconst activeUsers = users.filter(u => u.active);\nconsole.log(activeUsers); // Output: [{ name: 'Alex', active: true }]",
        color: "cyan"
      },
      {
        number: "03",
        tag: "Pipeline",
        title: "Chaining Transformations",
        description: "Chain methods together cleanly to produce complex data transformations.",
        codeSnippet: "const numbers = [1, 2, 3, 4, 5, 6];\nconst result = numbers\n  .filter(n => n % 2 === 0)\n  .map(n => n * 10);\nconsole.log(result); // Output: [20, 40, 60]",
        color: "purple"
      }
    ],
    rule: {
      title: "Immutability Rule",
      content: "map, filter, and reduce NEVER mutate the source array. They calculate and return new values, preserving original state."
    }
  },
  part3: {
    title: "The reduce() Accumulator Mental Model",
    intro: "Understand how reduce passes the accumulator between iterations step by step.",
    points: [
      {
        title: "The Accumulator Snowball",
        content: "Think of the accumulator (acc) like rolling a snowball down a hill: on each step, the next item is added to the snowball, and whatever you return becomes the starting accumulator for the next step.",
        codeSnippet: "const scores = [10, 20, 30];\nconst total = scores.reduce((acc, curr) => acc + curr, 0);\nconsole.log(total); // Output: 60"
      },
      {
        title: "Step-by-Step Iteration Tracing",
        content: "Step 0 (Start): acc = 0\nStep 1: acc = 0, curr = 10 -> returns 10\nStep 2: acc = 10, curr = 20 -> returns 30\nStep 3: acc = 30, curr = 30 -> returns 60\nFinal Return: 60",
        codeSnippet: "const nums = [1, 2, 3, 4];\nconst product = nums.reduce((acc, curr) => acc * curr, 1);\nconsole.log(product); // Output: 24"
      },
      {
        title: "Grouping Data with reduce()",
        content: "reduce is not just for numbers; it can accumulate into objects or maps to group items by category.",
        codeSnippet: "const pets = [\"dog\", \"cat\", \"dog\", \"bird\", \"dog\"];\nconst counts = pets.reduce((acc, pet) => {\n  acc[pet] = (acc[pet] || 0) + 1;\n  return acc;\n}, {});\nconsole.log(counts); // Output: { dog: 3, cat: 1, bird: 1 }"
      }
    ]
  },
  part4: {
    title: "The Classic reduce Trap: Missing Initial Value",
    bad: {
      title: "❌ Omitting Initial Value with Object Arrays",
      code: "const cart = [{ price: 10 }, { price: 25 }];\n// Bug: No initial value! acc starts as the FIRST OBJECT ({ price: 10 })\n// Then adds { price: 10 } + 25 -> \"[object Object]25\"\nconst total = cart.reduce((acc, item) => acc + item.price);\nconsole.log(total); // Output: \"[object Object]25\" (Critical Bug!)",
      explanation: "When you omit the second argument to reduce, JavaScript sets the accumulator to the first array item. For object arrays, this causes string concatenation errors."
    },
    good: {
      title: "✅ Always Supply the Initial Value Explicitly",
      code: "const cart = [{ price: 10 }, { price: 25 }];\n// Safe: 0 is explicitly passed as the initial accumulator\nconst total = cart.reduce((acc, item) => acc + item.price, 0);\nconsole.log(total); // Output: 35 (Correct!)",
      explanation: "Explicitly passing 0 as the initial value guarantees that the accumulator is always a number from the very first item."
    }
  },
  part5: {
    title: "Array Transformations Sandbox",
    intro: "Use filter, map, and reduce to process a shopping cart list.",
    starterCode: "const orders = [\n  { id: 1, item: \"Mechanical Keyboard\", price: 120, delivered: true },\n  { id: 2, item: \"USB-C Cable\", price: 15, delivered: false },\n  { id: 3, item: \"Gaming Mouse\", price: 80, delivered: true },\n  { id: 4, item: \"Desk Mat\", price: 25, delivered: true }\n];\n\n// 1. Filter only delivered orders:\nconst delivered = orders.filter(o => o.delivered);\n\n// 2. Map to extract item names:\nconst itemNames = delivered.map(o => o.item);\n\n// 3. Reduce to calculate total delivered revenue:\nconst totalDelivered = delivered.reduce((acc, o) => acc + o.price, 0);\n\nconsole.log(\"Delivered items:\", itemNames);\nconsole.log(\"Total delivered revenue: $\" + totalDelivered);\n"
  },
  part6: {
    title: "Key Takeaways: Array Transformations",
    takeaways: [
      {
        title: "Immutable Operations",
        desc: "map, filter, and reduce create new arrays and values without modifying original data."
      },
      {
        title: "The reduce Accumulator",
        desc: "The return value of each step becomes the accumulator for the next step."
      },
      {
        title: "Always Pass Initial Value",
        desc: "Always pass the initial value (0, {}, []) to reduce to prevent crashes and coercion bugs."
      }
    ]
  },
  part7: {
    title: "Knowledge Check Quiz",
    quiz: {
      question: "What happens if you run `[].reduce((acc, n) => acc + n)` without an initial value?",
      options: [
        "It returns 0 by default",
        "It throws a TypeError: Reduce of empty array with no initial value",
        "It returns undefined",
        "It returns an empty array []"
      ],
      correctIndex: 1,
      explanation: "If you call reduce on an empty array without supplying an initial value, JavaScript throws a runtime TypeError because there is no element to use as the starting accumulator."
    }
  }
};
