import { StandardLessonContent } from "@/components/curriculum/lesson-content-types";

export const js24ErrorHandlingContent: StandardLessonContent = {
  "slug": "js24-error-handling",
  "code": "JS-24",
  "title": "Error Handling: try / catch, throw & Custom Errors",
  "subtitle": "Catch runtime exceptions gracefully, throw descriptive errors, and create custom error classes.",
  "sections": [
    {
      "id": "part1",
      "label": "Defensive Architecture",
      "icon": "🛡️",
      "tag": "FOUNDATION"
    },
    {
      "id": "part2",
      "label": "try / catch / finally",
      "icon": "⚡",
      "tag": "SYNTAX"
    },
    {
      "id": "part3",
      "label": "Custom Errors & AI",
      "icon": "🧠",
      "tag": "PRACTICAL"
    },
    {
      "id": "part4",
      "label": "Swallowed Errors Bug",
      "icon": "⚠️",
      "tag": "DEBUGGING"
    },
    {
      "id": "part5",
      "label": "Errors Sandbox",
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
    "title": "Anticipating the Unexpected",
    "bigPicture": "Errors are a normal part of software development. Proper error handling intercepts unexpected failures (network drops, invalid input) and allows your application to recover smoothly without crashing.",
    "analogy": "Think of error handling like the circuit breaker in your house. When a power surge occurs, the breaker trips safely rather than burning down the wiring.",
    "diagram": "try {\n  // Risky operation: JSON parsing, network call...\n} catch (error) {\n  // Graceful recovery: log error, show user notification\n} finally {\n  // Cleanup: close modal, stop loading spinner\n}",
    "breakdownTitle": "Error Handling Constructs",
    "breakdownItems": [
      {
        "title": "try Block",
        "desc": "Wraps code that might throw an exception."
      },
      {
        "title": "catch Block",
        "desc": "Executes only if an error is thrown inside the try block."
      },
      {
        "title": "finally Block",
        "desc": "Always executes regardless of whether an error was thrown."
      }
    ]
  },
  "part2": {
    "title": "Error Constructs in Action",
    "intro": "Compare throwing errors, catching exceptions, and finally cleanup.",
    "cards": [
      {
        "number": "01",
        "tag": "Throw",
        "title": "throw new Error()",
        "description": "Interrupts execution with a descriptive error object containing a stack trace.",
        "codeSnippet": "function checkAge(age) {\n  if (age < 18) throw new Error(\"Must be 18+\");\n  return \"Access granted\";\n}\ntry { checkAge(15); } catch (e) { console.error(e.message); }",
        "color": "rose"
      },
      {
        "number": "02",
        "tag": "Catch",
        "title": "try / catch Blocks",
        "description": "Captures exceptions and prevents the entire application from crashing.",
        "codeSnippet": "try {\n  JSON.parse(\"invalid json{\");\n} catch (err) {\n  console.log(\"Safely caught:\", err.name); // Output: Safely caught: SyntaxError\n}",
        "color": "emerald"
      },
      {
        "number": "03",
        "tag": "Finally",
        "title": "finally Cleanup",
        "description": "Guaranteed to run whether the code succeeded or threw an error.",
        "codeSnippet": "let loading = true;\ntry { console.log(\"Loading...\"); }\nfinally { loading = false; console.log(\"Loading flag reset:\", loading); }",
        "color": "purple"
      }
    ],
    "rule": {
      "title": "Never Throw Strings",
      "content": "Always throw instances of `new Error('msg')`, never plain strings like `throw 'err'`."
    }
  },
  "part3": {
    "title": "Custom Errors & Reading AI Code",
    "intro": "Subclass Error to create domain-specific errors and handle them selectively.",
    "points": [
      {
        "title": "1. Domain-Specific Custom Error Classes",
        "content": "Extend `Error` to create custom error classes like `ValidationError` or `AuthError`.",
        "codeSnippet": "class ValidationError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"ValidationError\";\n  }\n}\n\ntry {\n  throw new ValidationError(\"Email address format invalid\");\n} catch (err) {\n  console.log(err.name + \": \" + err.message);\n  // Output: ValidationError: Email address format invalid\n}"
      },
      {
        "title": "2. Differentiating Errors with instanceof",
        "content": "Inspect the error instance in your catch block to provide specialized handling for different failure types.",
        "codeSnippet": "try {\n  throw new TypeError(\"Missing required argument\");\n} catch (err) {\n  if (err instanceof TypeError) {\n    console.log(\"Handled TypeError specifically\");\n  } else {\n    console.log(\"Generic error:\", err.message);\n  }\n}\n// Output: Handled TypeError specifically"
      },
      {
        "title": "3. Re-throwing Unexpected Errors",
        "content": "If a catch block catches an error it does not know how to handle, re-throw it so outer handlers can process it.",
        "codeSnippet": "try {\n  // Unknown fatal error:\n  throw new ReferenceError(\"Critical system failure\");\n} catch (err) {\n  if (err instanceof SyntaxError) {\n    console.log(\"Recovered from syntax error\");\n  } else {\n    // Re-throw unknown errors:\n    console.log(\"Re-throwing unexpected error:\", err.name);\n  }\n}"
      }
    ]
  },
  "part4": {
    "title": "Swallowing Errors Silently",
    "bad": {
      "title": "❌ Empty Catch Block Swallows Errors",
      "code": "try {\n  performCriticalDatabaseWrite();\n} catch (err) {\n  // Bug: Empty catch block hides critical bugs!\n  // The app continues in a corrupt state with zero logs!\n}",
      "explanation": "Empty catch blocks hide bugs completely, making production failures almost impossible to diagnose."
    },
    "good": {
      "title": "✅ Log and Handle Errors Explicitly",
      "code": "try {\n  performCriticalDatabaseWrite();\n} catch (err) {\n  console.error(\"Database write failed:\", err.message);\n  notifyAdmin(err);\n  showUserFeedback(\"Unable to save changes. Please try again.\");\n}",
      "explanation": "Always log the error, inform the user, and take appropriate recovery action."
    }
  },
  "part5": {
    "title": "Interactive Errors Sandbox",
    "intro": "Experiment with throwing custom errors and handling them in try/catch/finally blocks.",
    "starterCode": "class PaymentError extends Error {\n  constructor(message) {\n    super(message);\n    this.name = \"PaymentError\";\n  }\n}\n\nfunction processPayment(amount) {\n  if (amount <= 0) {\n    throw new PaymentError(\"Amount must be greater than zero\");\n  }\n  return \"Processed payment of $\" + amount;\n}\n\ntry {\n  console.log(processPayment(-10));\n} catch (err) {\n  if (err instanceof PaymentError) {\n    console.log(\"Payment Error Caught:\", err.message);\n  }\n} finally {\n  console.log(\"Transaction audit log completed.\");\n}\n"
  },
  "part6": {
    "title": "Key Takeaways: Error Handling",
    "takeaways": [
      {
        "title": "Throw Error Objects",
        "desc": "Always throw new Error() so stack traces are preserved."
      },
      {
        "title": "Never Catch Silently",
        "desc": "Never leave catch blocks empty; log and notify appropriately."
      },
      {
        "title": "finally Guarantees Cleanup",
        "desc": "Use finally blocks to close connections and reset loading states."
      }
    ]
  },
  "part7": {
    "title": "Knowledge Check Quiz",
    "quiz": {
      "question": "Why should you throw `new Error(\"msg\")` instead of `throw \"msg\"`?",
      "options": [
        "Error objects automatically capture a full stack trace for debugging",
        "String errors are illegal in modern browsers and throw syntax errors",
        "Error objects run faster in V8",
        "String errors take up 10x more memory"
      ],
      "correctIndex": 0,
      "explanation": "`new Error()` instantiates an Error object that captures a complete call stack trace, showing the exact file and line number where the problem originated."
    }
  }
};
