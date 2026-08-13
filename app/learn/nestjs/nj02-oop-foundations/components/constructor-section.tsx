"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  StepList,
  MistakeBox,
  SummaryBox,
  Divider,
  PredictOutputBox,
  InfoCallout,
} from "./shared-components";

export function ConstructorSection() {
  return (
    <SectionContainer number={3} title="Constructor Deep Dive">

      {/* ── 3.1 What is a Constructor? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Constructor?"
          description='A constructor is a special function inside a class that runs AUTOMATICALLY the moment you create a new object using "new". You cannot call it manually — it only runs at creation time.'
          color="primary"
        />

        <AnalogyBox emoji="🍕" title="Think about it like this">
          <p>When you order a pizza, you tell the shop your toppings BEFORE they make it. The constructor is like the order form — you fill in the details (name, email, age) and the pizza (object) is built with those exact details.</p>
          <p className="mt-2">Without a constructor, every pizza would come with the same default toppings. Not useful!</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>💡 Why do we need it?</SectionHeading>
          <div className="mb-6 p-5 rounded-2xl border" style={{ backgroundColor: "rgba(24,32,96,0.04)", borderColor: "rgba(24,32,96,0.12)" }}>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-3">
              Without a constructor, every object you create starts with the same hardcoded data. That is not useful. A constructor lets you pass in <strong>unique information</strong> at the moment you build each object, so every object can start with different data.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 italic leading-relaxed">
              <strong>Without constructor:</strong> Every user is named &quot;John Doe&quot;. <strong>With constructor:</strong> Each user gets their own real name.
            </p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🔧 How does it work? (Step by step)</SectionHeading>
          <StepList
            steps={[
              { label: "Write the constructor keyword", note: "Add constructor() inside your class. This is the special function name.", code: "constructor() { }" },
              { label: "Add parameters", note: "Parameters are the information you want to receive from outside.", code: "constructor(name, email) { }" },
              { label: 'Save the data using "this"', note: '"this" refers to the new object. Save the passed-in values onto it.', code: "this.name = name;" },
              { label: 'Pass the data when you use "new"', note: "Put the actual values inside the parentheses.", code: 'const user = new User("Mehedi", "m@test.com");' },
            ]}
          />
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Constructor in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class User {
  name: string;
  email: string;
  age: number;

  constructor(name: string, email: string, age: number) {
    this.name = name;     // Save the name
    this.email = email;   // Save the email
    this.age = age;       // Save the age
  }

  introduce() {
    console.log("I am " + this.name + " (" + this.age + "), email: " + this.email);
  }
}

// Each object gets unique data through the constructor
const user1 = new User("Mehedi", "mehedi@test.com", 25);
const user2 = new User("Alice", "alice@test.com", 30);

user1.introduce(); // I am Mehedi (25), email: mehedi@test.com
user2.introduce(); // I am Alice (30), email: alice@test.com`}
            height="340px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 3.2 What Exactly Happens When "new" Runs ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title='What Exactly Happens When "new User(...)" Runs?'
          description='Let us walk through every step that JavaScript performs when you write "new User(&quot;Mehedi&quot;, 25)".'
          color="sky"
        />

        <EnhancedCodeBlock
          code={`class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

const user1 = new User("Mehedi", 25);`}
          language="javascript"
        />

        <div className="mt-6 mb-8">
          <SectionHeading>🔍 Step-by-step execution</SectionHeading>
          <StepList
            steps={[
              { label: "Step 1: JavaScript creates an empty object", note: "A brand new, empty object is created in memory.", code: "// Internally: {} (empty)" },
              { label: 'Step 2: "this" is set to the new object', note: 'Now "this" points to that empty object.', code: '// Internally: this = {}' },
              { label: 'Step 3: The constructor runs', note: '"Mehedi" is passed as name, 25 is passed as age.', code: 'this.name = "Mehedi"; this.age = 25;' },
              { label: 'Step 4: The object is filled', note: "The empty object now has the data.", code: '// Internally: { name: "Mehedi", age: 25 }' },
              { label: "Step 5: The object is returned", note: "The completed object is saved in user1.", code: '// user1 = { name: "Mehedi", age: 25 }' },
            ]}
          />
        </div>

        <PredictOutputBox
          code={`class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
    console.log("Product created: " + this.name);
  }
}

const p1 = new Product("Laptop", 999);
const p2 = new Product("Phone", 699);
console.log(p1.price);`}
          answer={`Product created: Laptop\nProduct created: Phone\n999`}
        />
      </div>

      <Divider />

      {/* ── 3.3 Default Values ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="Default Values in Constructor"
          description="Sometimes you want a property to have a starting value even if the user does not provide one. You can set default values in the constructor."
          color="emerald"
        />

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class BankAccount {
  owner: string;
  balance: number;
  isActive: boolean;
  transactions: string[];

  constructor(owner: string, balance: number = 0) {
    // "balance = 0" means: if no balance is given, start with 0
    this.owner = owner;
    this.balance = balance;
    this.isActive = true;      // Always starts as true
    this.transactions = [];     // Always starts as empty array
  }

  deposit(amount: number) {
    this.balance += amount;
    this.transactions.push("+ $" + amount);
    console.log(this.owner + " balance: $" + this.balance);
  }
}

// With default balance (0)
const acc1 = new BankAccount("Mehedi");
console.log(acc1.owner + " initial balance: $" + acc1.balance);  // 0

// With custom balance
const acc2 = new BankAccount("Alice", 5000);
console.log(acc2.owner + " initial balance: $" + acc2.balance);  // 5000

acc1.deposit(100);`}
            height="360px"
          />
        </div>

        <InfoCallout emoji="💡" title="Two types of default values">
          <p><strong>Parameter defaults:</strong> <code>constructor(name, age = 18)</code> — used when the caller does not provide a value.</p>
          <p className="mt-1"><strong>Hardcoded defaults:</strong> <code>this.isActive = true</code> — always the same, never passed in.</p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 3.4 More Examples ── */}
      <div className="mb-16">
        <TopicHeader
          number={4}
          title="Real-World Constructor Examples"
          description="Let us see constructors in action with cars, products, and students."
          color="amber"
        />

        <div className="mb-8">
          <SectionHeading>📌 Student with Grade Tracking</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Student {
  name: string;
  studentId: string;
  grades: { subject: string; score: number }[] = [];

  constructor(name: string, studentId: string) {
    this.name = name;
    this.studentId = studentId;
  }

  addGrade(subject: string, score: number) {
    this.grades.push({ subject, score });
    console.log(this.name + " got " + score + " in " + subject);
  }

  getAverage(): number {
    if (this.grades.length === 0) return 0;
    const total = this.grades.reduce((sum, g) => sum + g.score, 0);
    return Number((total / this.grades.length).toFixed(1));
  }

  showReport() {
    console.log("--- Report for " + this.name + " (" + this.studentId + ") ---");
    console.log("Average: " + this.getAverage());
    console.log("Status: " + (this.getAverage() >= 60 ? "Passing ✅" : "Failing ❌"));
  }
}

const s1 = new Student("Mehedi", "STU001");
s1.addGrade("Math", 85);
s1.addGrade("Science", 92);
s1.addGrade("English", 78);
s1.showReport();`}
            height="360px"
          />
        </div>
      </div>

      <Divider />

      {/* ── Common Mistakes ── */}
      <div className="mb-16">
        <SectionHeading>⚠️ Common Constructor Mistakes</SectionHeading>

        <MistakeBox
          title='Forgetting the "new" keyword'
          description='You cannot run a class like a normal function. Without "new", JavaScript does not know you are trying to build an object. You will get an error.'
          wrong='const user = User("Mehedi");     // ❌ Missing "new" — ERROR!'
          right='const user = new User("Mehedi"); // ✅ Correct'
        />

        <MistakeBox
          title="Not saving data with 'this'"
          description="If you receive data in the constructor but forget to save it with 'this', the data disappears after the constructor finishes. The object will not have it."
          wrong={`constructor(name) {
  let localName = name; // ❌ Saved to a local variable — gone after constructor
}`}
          right={`constructor(name) {
  this.name = name;     // ✅ Saved on the object — stays forever
}`}
        />
      </div>

      {/* ── Summary ── */}
      <SummaryBox>
        A <strong>constructor</strong> is a special setup function inside a class. It runs automatically when you use <code>new</code>. You use it to give each object its own unique starting data. You can set default values with <code>=</code> in the parameters. Always use <code>this</code> to save data onto the object.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck
        question={'What are the 5 steps that happen when you write \'new User("Mehedi", 25)\'?'}
        answer="1. An empty object is created. 2. 'this' is set to the new object. 3. The constructor runs with the passed values. 4. The object is filled with data. 5. The completed object is returned and saved in the variable."
      />

      {/* ── Interactive Practice Exercise ── */}
      <div className="mt-8">
        <SectionHeading>💻 Practice Exercise</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          exercise={{
            id: "oop-constructor-movie-ex",
            title: "Create a Movie class",
            instructions: `Create a Movie class with:
• Constructor: title, director, year, rating (default: "Not Rated")
• Method: addReview(score) — adds to a reviews number array
• Method: getAverageRating() — returns the average of all reviews
• Method: showInfo() — prints movie details and average rating

Create a movie, add 3 reviews, and call showInfo().`,
            starterCode: `class Movie {
  // Your constructor and methods here

}

// Create a movie and test it
const movie = new Movie("Inception", "Christopher Nolan", 2010, "PG-13");
`,
            solutionCode: `class Movie {
  title: string;
  director: string;
  year: number;
  rating: string;
  reviews: number[] = [];

  constructor(title: string, director: string, year: number, rating: string = "Not Rated") {
    this.title = title;
    this.director = director;
    this.year = year;
    this.rating = rating;
  }

  addReview(score: number) {
    this.reviews.push(score);
    console.log("Review added: " + score + "/10");
  }

  getAverageRating(): string {
    if (this.reviews.length === 0) return "No reviews yet";
    const avg = this.reviews.reduce((sum, r) => sum + r, 0) / this.reviews.length;
    return avg.toFixed(1) + "/10";
  }

  showInfo() {
    console.log(this.title + " (" + this.year + ") - " + this.rating);
    console.log("Director: " + this.director);
    console.log("Average Rating: " + this.getAverageRating());
  }
}

const movie = new Movie("Inception", "Christopher Nolan", 2010, "PG-13");
movie.addReview(9);
movie.addReview(8);
movie.addReview(10);
movie.showInfo();`,
            hints: [
              "Set default rating with constructor(title, director, year, rating: string = 'Not Rated').",
              "Initialize this.reviews = [] in the constructor or property declaration.",
              "addReview(score) pushes the score to this.reviews. getAverageRating() sums and divides by length.",
            ],
            tests: [
              {
                name: "Movie class exists",
                code: `if (typeof Movie !== 'function') throw new Error("Movie class not found");`,
              },
              {
                name: "Movie constructor sets properties with default rating",
                code: `const _m = new Movie("Test", "Director", 2024); if (_m.rating !== "Not Rated") throw new Error("Default rating should be 'Not Rated'");`,
              },
              {
                name: "addReview and getAverageRating work",
                code: `const _m2 = new Movie("M", "D", 2020); _m2.addReview(8); _m2.addReview(10); if (typeof _m2.getAverageRating !== 'function') throw new Error("getAverageRating method missing");`,
              },
            ],
            difficulty: "intermediate",
          }}
          height="400px"
        />
      </div>

    </SectionContainer>
  );
}
