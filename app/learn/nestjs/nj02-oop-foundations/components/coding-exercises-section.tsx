"use client";

import { SectionContainer, SectionHeading, Divider } from "./shared-components";
import { Playground } from "@/components/playground/Playground";

export function CodingExercisesSection() {
  return (
    <SectionContainer number={15} title="Coding Exercises">

      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Now it&apos;s time to <strong>actually write and run code</strong>! Each exercise has a live playground — write your solution, click Run to see the output, then click Check to verify your answer. Use hints if you get stuck. 🟢 Beginner → 🟡 Intermediate → 🟣 Real-World.
        </p>
      </div>

      {/* ── Beginner ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercises</SectionHeading>

        {/* Exercise 1: Pet Class */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-01",
              title: "1. Pet Class",
              instructions: `Create a Pet class with:
• Properties: name, type (dog/cat), age
• Method: describe() — prints "[name] is a [age]-year-old [type]"
• Method: isOld() — returns true if age > 10

Create 3 pets and describe each one.`,
              starterCode: `class Pet {
  // Your code here

}

// Create 3 pets and describe them
`,
              solutionCode: `class Pet {
  name: string;
  type: string;
  age: number;

  constructor(name: string, type: string, age: number) {
    this.name = name;
    this.type = type;
    this.age = age;
  }

  describe() {
    console.log(this.name + " is a " + this.age + "-year-old " + this.type);
  }

  isOld() {
    return this.age > 10;
  }
}

const p1 = new Pet("Buddy", "dog", 5);
const p2 = new Pet("Whiskers", "cat", 12);
const p3 = new Pet("Max", "dog", 3);

p1.describe();
p2.describe();
p3.describe();
console.log(p2.name + " is old: " + p2.isOld());`,
              hints: [
                "A class needs a constructor to set up its properties. Use constructor(name, type, age) and assign each to this.name, this.type, this.age.",
                "Methods are functions inside the class. describe() should use console.log() and reference this.name, this.type, this.age.",
                "isOld() should return this.age > 10. Don't forget to create 3 Pet instances with 'new Pet(...)'.",
              ],
              tests: [
                {
                  name: "Pet class exists",
                  code: `if (typeof Pet !== 'function') throw new Error("Pet class not found");`,
                },
                {
                  name: "Pet has describe() method",
                  code: `const _t = new Pet("Test", "dog", 5); if (typeof _t.describe !== 'function') throw new Error("describe() method not found");`,
                },
                {
                  name: "Pet has isOld() method",
                  code: `const _t2 = new Pet("Old", "cat", 15); if (typeof _t2.isOld !== 'function') throw new Error("isOld() method not found"); if (!_t2.isOld()) throw new Error("isOld() should return true for age > 10");`,
                },
              ],
              hiddenTests: [
                {
                  name: "isOld returns false for young pets",
                  code: `const _t3 = new Pet("Young", "dog", 3); if (_t3.isOld()) throw new Error("isOld() should return false for age <= 10");`,
                  hidden: true,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>

        {/* Exercise 2: Simple Calculator */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-02",
              title: "2. Simple Calculator",
              instructions: `Create a Calculator class with:
• A constructor that starts with result = 0
• Methods: add(n), subtract(n), multiply(n), divide(n)
• Method: getResult() — returns the current result
• Method: reset() — sets result back to 0

Each math method should update the result and return "this" for chaining.`,
              starterCode: `class Calculator {
  // Your code here

}

// Test chaining:
const calc = new Calculator();
console.log(calc.add(10).multiply(3).subtract(5).getResult());
console.log(calc.reset().add(100).divide(4).getResult());
`,
              solutionCode: `class Calculator {
  result: number;

  constructor() {
    this.result = 0;
  }

  add(n: number) {
    this.result += n;
    return this;
  }

  subtract(n: number) {
    this.result -= n;
    return this;
  }

  multiply(n: number) {
    this.result *= n;
    return this;
  }

  divide(n: number) {
    if (n === 0) {
      console.log("Cannot divide by 0!");
      return this;
    }
    this.result /= n;
    return this;
  }

  getResult() {
    return this.result;
  }

  reset() {
    this.result = 0;
    return this;
  }
}

const calc = new Calculator();
console.log(calc.add(10).multiply(3).subtract(5).getResult()); // 25
console.log(calc.reset().add(100).divide(4).getResult()); // 25`,
              hints: [
                "Start with 'result = 0' in the constructor. Each math method should modify this.result.",
                "To enable chaining, each method should 'return this' at the end.",
                "getResult() simply returns this.result. reset() sets this.result = 0 and returns this.",
              ],
              tests: [
                {
                  name: "Calculator class exists",
                  code: `if (typeof Calculator !== 'function') throw new Error("Calculator class not found");`,
                },
                {
                  name: "add() works correctly",
                  code: `const _c = new Calculator(); _c.add(5); if (_c.getResult() !== 5) throw new Error("add(5) should make result = 5");`,
                },
                {
                  name: "Method chaining works",
                  code: `const _c2 = new Calculator(); const r = _c2.add(10).multiply(3).subtract(5).getResult(); if (r !== 25) throw new Error("Chained result should be 25, got " + r);`,
                },
              ],
              hiddenTests: [
                {
                  name: "divide by zero protection",
                  code: `const _c3 = new Calculator(); _c3.add(10).divide(0); if (_c3.getResult() !== 10) throw new Error("Dividing by 0 should not change result");`,
                  hidden: true,
                },
                {
                  name: "reset works",
                  code: `const _c4 = new Calculator(); _c4.add(100); _c4.reset(); if (_c4.getResult() !== 0) throw new Error("reset() should set result to 0");`,
                  hidden: true,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>

        {/* Exercise 3: Temperature Converter */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-03",
              title: "3. Temperature Converter",
              instructions: `Create a Temperature class with:
• Constructor: value, unit ("C" or "F")
• Method: toFahrenheit() — converts C to F
• Method: toCelsius() — converts F to C
• Method: display() — prints the temperature with unit`,
              starterCode: `class Temperature {
  // Your code here

}

const temp = new Temperature(100, "C");
temp.display();
console.log(temp.toFahrenheit() + "°F");
`,
              solutionCode: `class Temperature {
  value: number;
  unit: string;

  constructor(value: number, unit: string) {
    this.value = value;
    this.unit = unit;
  }

  toFahrenheit() {
    if (this.unit === "F") return this.value;
    return (this.value * 9 / 5) + 32;
  }

  toCelsius() {
    if (this.unit === "C") return this.value;
    return (this.value - 32) * 5 / 9;
  }

  display() {
    console.log(this.value + "°" + this.unit);
  }
}

const temp = new Temperature(100, "C");
temp.display(); // 100°C
console.log(temp.toFahrenheit() + "°F"); // 212°F`,
              hints: [
                "Store value and unit in the constructor. The formula for C→F is (value * 9/5) + 32.",
                "For F→C, the formula is (value - 32) * 5/9. If already in the target unit, just return the value.",
              ],
              tests: [
                {
                  name: "Temperature class exists",
                  code: `if (typeof Temperature !== 'function') throw new Error("Temperature class not found");`,
                },
                {
                  name: "toFahrenheit converts correctly",
                  code: `const _t = new Temperature(100, "C"); if (_t.toFahrenheit() !== 212) throw new Error("100°C should be 212°F");`,
                },
                {
                  name: "toCelsius converts correctly",
                  code: `const _t2 = new Temperature(212, "F"); if (_t2.toCelsius() !== 100) throw new Error("212°F should be 100°C");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Intermediate ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercises</SectionHeading>

        {/* Exercise 4: Playlist Manager */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-04",
              title: "4. Playlist Manager",
              instructions: `Create a Playlist class with:
• Private songs array (use private keyword)
• addSong(title, artist, duration) — adds a song
• removeSong(title) — removes by title
• getTotalDuration() — returns total minutes
• shuffle() — randomly reorders songs
• display() — shows all songs with numbers`,
              starterCode: `class Playlist {
  private songs: { title: string; artist: string; duration: number }[] = [];

  // Your code here

}

const pl = new Playlist();
pl.addSong("Shape of You", "Ed Sheeran", 4);
pl.addSong("Blinding Lights", "The Weeknd", 3);
pl.addSong("Bohemian Rhapsody", "Queen", 6);
pl.display();
console.log("Total duration: " + pl.getTotalDuration() + " min");
`,
              solutionCode: `class Playlist {
  private songs: { title: string; artist: string; duration: number }[] = [];

  addSong(title: string, artist: string, duration: number) {
    this.songs.push({ title, artist, duration });
    console.log("♫ Added: " + title + " by " + artist);
  }

  removeSong(title: string) {
    const idx = this.songs.findIndex(s => s.title === title);
    if (idx === -1) {
      console.log("Song not found!");
      return;
    }
    this.songs.splice(idx, 1);
    console.log("Removed: " + title);
  }

  getTotalDuration() {
    return this.songs.reduce((sum, s) => sum + s.duration, 0);
  }

  shuffle() {
    for (let i = this.songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.songs[i], this.songs[j]] = [this.songs[j], this.songs[i]];
    }
    console.log("🔀 Playlist shuffled!");
  }

  display() {
    console.log("--- Playlist (" + this.getTotalDuration() + " min) ---");
    this.songs.forEach((s, i) => {
      console.log((i + 1) + ". " + s.title + " - " + s.artist + " (" + s.duration + "m)");
    });
  }
}

const pl = new Playlist();
pl.addSong("Shape of You", "Ed Sheeran", 4);
pl.addSong("Blinding Lights", "The Weeknd", 3);
pl.addSong("Bohemian Rhapsody", "Queen", 6);
pl.display();
console.log("Total duration: " + pl.getTotalDuration() + " min");`,
              hints: [
                "The songs array stores objects with { title, artist, duration }. addSong() should push a new object.",
                "removeSong() uses findIndex() to find the song, then splice() to remove it.",
                "getTotalDuration() uses reduce() to sum all durations. shuffle() uses the Fisher-Yates algorithm.",
              ],
              tests: [
                {
                  name: "Playlist class exists",
                  code: `if (typeof Playlist !== 'function') throw new Error("Playlist class not found");`,
                },
                {
                  name: "addSong and getTotalDuration work",
                  code: `const _p = new Playlist(); _p.addSong("A", "B", 5); _p.addSong("C", "D", 3); if (_p.getTotalDuration() !== 8) throw new Error("Total should be 8");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>

        {/* Exercise 5: Inventory System with Inheritance */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-05",
              title: "5. Inventory System with Inheritance",
              instructions: `Create:
• Item class: name, price, quantity + describe() method
• PerishableItem extends Item: add expiryDate property + isExpired()
• DigitalItem extends Item: add fileSize property

Each should have a describe() method that shows relevant info.`,
              starterCode: `class Item {
  // Your code here
}

class PerishableItem extends Item {
  // Your code here
}

class DigitalItem extends Item {
  // Your code here
}

const milk = new PerishableItem("Milk", 3.99, 10, "2025-12-31");
const ebook = new DigitalItem("JS Guide", 19.99, 999, 15);
milk.describe();
ebook.describe();
`,
              solutionCode: `class Item {
  name: string;
  price: number;
  quantity: number;

  constructor(name: string, price: number, quantity: number) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  getValue() {
    return this.price * this.quantity;
  }

  describe() {
    console.log(this.name + " | $" + this.price + " x" + this.quantity + " = $" + this.getValue());
  }
}

class PerishableItem extends Item {
  expiryDate: string;

  constructor(name: string, price: number, quantity: number, expiryDate: string) {
    super(name, price, quantity);
    this.expiryDate = expiryDate;
  }

  isExpired() {
    return new Date() > new Date(this.expiryDate);
  }

  describe() {
    super.describe();
    console.log("  Expires: " + this.expiryDate + (this.isExpired() ? " ⚠️ EXPIRED" : " ✅ Fresh"));
  }
}

class DigitalItem extends Item {
  fileSize: number;

  constructor(name: string, price: number, quantity: number, fileSize: number) {
    super(name, price, quantity);
    this.fileSize = fileSize;
  }

  describe() {
    super.describe();
    console.log("  File size: " + this.fileSize + "MB (Digital download)");
  }
}

const milk = new PerishableItem("Milk", 3.99, 10, "2025-12-31");
const ebook = new DigitalItem("JS Guide", 19.99, 999, 15);
milk.describe();
ebook.describe();`,
              hints: [
                "The base Item class needs constructor(name, price, quantity) and a describe() method.",
                "Use 'extends' for inheritance. Call super(name, price, quantity) in child constructors.",
                "Override describe() in children. Call super.describe() first, then add extra info.",
              ],
              tests: [
                {
                  name: "Item class exists",
                  code: `if (typeof Item !== 'function') throw new Error("Item class not found");`,
                },
                {
                  name: "PerishableItem extends Item",
                  code: `const _pi = new PerishableItem("Test", 1, 1, "2030-01-01"); if (!(_pi instanceof Item)) throw new Error("PerishableItem should extend Item");`,
                },
                {
                  name: "DigitalItem extends Item",
                  code: `const _di = new DigitalItem("Test", 1, 1, 10); if (!(_di instanceof Item)) throw new Error("DigitalItem should extend Item");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── Real-World ── */}
      <div className="mb-16">
        <SectionHeading>🟣 Real-World Exercises</SectionHeading>

        {/* Exercise 6: Social Media Post System */}
        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-ex-06",
              title: "6. Social Media Post System",
              instructions: `Build a social media system with:
• Post class: author, content, likes (private), comments array (private)
  - like(), unlike(), addComment(user, text), display()
• User class: name, posts array (private)
  - createPost(content), getFeed()
• Admin extends User:
  - deletePost(post), pinPost(post)

Use encapsulation, inheritance, and methods.`,
              starterCode: `class Post {
  private likes: number = 0;
  private comments: { user: string; text: string }[] = [];
  isPinned: boolean = false;

  constructor(public author: string, public content: string) {}

  // Your methods here
}

class User {
  private posts: Post[] = [];

  constructor(public name: string) {}

  // Your methods here
}

class Admin extends User {
  // Your methods here
}

// Test it
const user = new User("Mehedi");
const admin = new Admin("SuperAdmin");

const post = user.createPost("Learning OOP is fun!");
post.like();
post.like();
post.like();
post.addComment("Alice", "Great post!");
admin.pinPost(post);
post.display();
`,
              solutionCode: `class Post {
  private likes: number = 0;
  private comments: { user: string; text: string }[] = [];
  isPinned: boolean = false;

  constructor(public author: string, public content: string) {}

  like() { this.likes++; }
  unlike() { if (this.likes > 0) this.likes--; }

  addComment(user: string, text: string) {
    this.comments.push({ user, text });
  }

  display() {
    console.log((this.isPinned ? "📌 " : "") + this.author + ": " + this.content);
    console.log("  ❤️ " + this.likes + " likes | 💬 " + this.comments.length + " comments");
  }
}

class User {
  private posts: Post[] = [];

  constructor(public name: string) {}

  createPost(content: string) {
    const post = new Post(this.name, content);
    this.posts.push(post);
    console.log("📝 " + this.name + " posted: " + content);
    return post;
  }

  getFeed() { return [...this.posts]; }
}

class Admin extends User {
  deletePost(post: Post) {
    console.log("🗑️ Admin deleted post: " + post.content);
  }
  pinPost(post: Post) {
    post.isPinned = true;
    console.log("📌 Pinned: " + post.content);
  }
}

const user = new User("Mehedi");
const admin = new Admin("SuperAdmin");

const post = user.createPost("Learning OOP is fun!");
post.like();
post.like();
post.like();
post.addComment("Alice", "Great post!");
admin.pinPost(post);
post.display();`,
              hints: [
                "like() increments the private likes counter. unlike() decrements it (but not below 0).",
                "User.createPost() creates a new Post with the user's name, pushes it to the private array, and returns it.",
                "Admin extends User. pinPost() sets post.isPinned = true.",
              ],
              tests: [
                {
                  name: "Post class exists",
                  code: `if (typeof Post !== 'function') throw new Error("Post class not found");`,
                },
                {
                  name: "User can create posts",
                  code: `const _u = new User("Test"); const _p = _u.createPost("Hello"); if (!(_p instanceof Post)) throw new Error("createPost should return a Post");`,
                },
                {
                  name: "Admin extends User",
                  code: `const _a = new Admin("Admin"); if (!(_a instanceof User)) throw new Error("Admin should extend User");`,
                },
              ],
              difficulty: "advanced",
            }}
          />
        </div>
      </div>

    </SectionContainer>
  );
}
