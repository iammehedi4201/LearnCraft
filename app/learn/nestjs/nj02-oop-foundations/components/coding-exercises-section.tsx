import { SectionContainer, SectionHeading, Divider, ExerciseBox } from "./shared-components";

export function CodingExercisesSection() {
  return (
    <SectionContainer number={15} title="Coding Exercises">

      <div className="mb-10 p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Practice makes perfect! Try each exercise <strong>yourself first</strong> before looking at the solution. The exercises are organized by difficulty: 🟢 Beginner → 🟡 Intermediate → 🟣 Real-World.
        </p>
      </div>

      {/* ── Beginner ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercises</SectionHeading>

        <ExerciseBox level="beginner" title="1. Pet Class" description={`Create a Pet class with:\n- Properties: name, type (dog/cat), age\n- Method: describe() — prints "[name] is a [age]-year-old [type]"\n- Method: isOld() — returns true if age > 10\n\nCreate 3 pets and describe each one.`}
          solution={`class Pet {
  constructor(name, type, age) {
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

p1.describe(); // Buddy is a 5-year-old dog
p2.describe(); // Whiskers is a 12-year-old cat
console.log(p2.name + " is old: " + p2.isOld()); // true`} />

        <ExerciseBox level="beginner" title="2. Simple Calculator" description={`Create a Calculator class with:\n- A constructor that starts with result = 0\n- Methods: add(n), subtract(n), multiply(n), divide(n)\n- Method: getResult() — returns the current result\n- Method: reset() — sets result back to 0\n\nEach math method should update the result and return "this" for chaining.`}
          solution={`class Calculator {
  constructor() { this.result = 0; }

  add(n) { this.result += n; return this; }
  subtract(n) { this.result -= n; return this; }
  multiply(n) { this.result *= n; return this; }
  divide(n) {
    if (n === 0) { console.log("Cannot divide by 0!"); return this; }
    this.result /= n;
    return this;
  }
  getResult() { return this.result; }
  reset() { this.result = 0; return this; }
}

const calc = new Calculator();
console.log(calc.add(10).multiply(3).subtract(5).getResult()); // 25
console.log(calc.reset().add(100).divide(4).getResult()); // 25`} />

        <ExerciseBox level="beginner" title="3. Temperature Converter" description={`Create a Temperature class with:\n- Constructor: value, unit ("C" or "F")\n- Method: toFahrenheit() — converts C to F\n- Method: toCelsius() — converts F to C\n- Method: display() — prints the temperature with unit`}
          solution={`class Temperature {
  constructor(value, unit) {
    this.value = value;
    this.unit = unit;
  }
  toFahrenheit() {
    if (this.unit === "F") return this.value;
    return (this.value * 9/5) + 32;
  }
  toCelsius() {
    if (this.unit === "C") return this.value;
    return (this.value - 32) * 5/9;
  }
  display() {
    console.log(this.value + "°" + this.unit);
  }
}

const temp = new Temperature(100, "C");
temp.display(); // 100°C
console.log(temp.toFahrenheit() + "°F"); // 212°F`} />
      </div>

      <Divider />

      {/* ── Intermediate ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercises</SectionHeading>

        <ExerciseBox level="intermediate" title="4. Playlist Manager" description={`Create a Playlist class with:\n- Private #songs array\n- addSong(title, artist, duration) — adds a song\n- removeSong(title) — removes by title\n- getTotalDuration() — returns total minutes\n- shuffle() — randomly reorders songs\n- display() — shows all songs with numbers`}
          solution={`class Playlist {
  #songs = [];

  addSong(title, artist, duration) {
    this.#songs.push({ title, artist, duration });
    console.log("♫ Added: " + title + " by " + artist);
  }

  removeSong(title) {
    const idx = this.#songs.findIndex(s => s.title === title);
    if (idx === -1) { console.log("Song not found!"); return; }
    this.#songs.splice(idx, 1);
    console.log("Removed: " + title);
  }

  getTotalDuration() {
    return this.#songs.reduce((sum, s) => sum + s.duration, 0);
  }

  shuffle() {
    for (let i = this.#songs.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.#songs[i], this.#songs[j]] = [this.#songs[j], this.#songs[i]];
    }
    console.log("🔀 Playlist shuffled!");
  }

  display() {
    console.log("--- Playlist (" + this.getTotalDuration() + " min) ---");
    this.#songs.forEach((s, i) => {
      console.log((i+1) + ". " + s.title + " - " + s.artist + " (" + s.duration + "m)");
    });
  }
}

const pl = new Playlist();
pl.addSong("Shape of You", "Ed Sheeran", 4);
pl.addSong("Blinding Lights", "The Weeknd", 3);
pl.addSong("Bohemian Rhapsody", "Queen", 6);
pl.display();`} />

        <ExerciseBox level="intermediate" title="5. Inventory System with Inheritance" description={`Create:\n- Item class: name, price, quantity\n- PerishableItem extends Item: add expiryDate property\n- DigitalItem extends Item: add fileSize and downloadLink\n\nEach should have a describe() method that shows relevant info.`}
          solution={`class Item {
  constructor(name, price, quantity) {
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }
  getValue() { return this.price * this.quantity; }
  describe() {
    console.log(this.name + " | $" + this.price + " x" + this.quantity + " = $" + this.getValue());
  }
}

class PerishableItem extends Item {
  constructor(name, price, quantity, expiryDate) {
    super(name, price, quantity);
    this.expiryDate = expiryDate;
  }
  isExpired() { return new Date() > new Date(this.expiryDate); }
  describe() {
    super.describe();
    console.log("  Expires: " + this.expiryDate + (this.isExpired() ? " ⚠️ EXPIRED" : " ✅ Fresh"));
  }
}

class DigitalItem extends Item {
  constructor(name, price, quantity, fileSize) {
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
ebook.describe();`} />
      </div>

      <Divider />

      {/* ── Real-World ── */}
      <div className="mb-16">
        <SectionHeading>🟣 Real-World Exercises</SectionHeading>

        <ExerciseBox level="real-world" title="6. Social Media Post System" description={`Build a social media system with:\n- Post class: author, content, #likes, #comments array\n  - like(), unlike(), addComment(user, text), getLikeCount()\n- User class: name, #posts array\n  - createPost(content), getFeed()\n- Admin extends User:\n  - deletePost(post), pinPost(post)\n\nUse encapsulation, inheritance, and methods.`}
          solution={`class Post {
  #likes = 0;
  #comments = [];

  constructor(author, content) {
    this.author = author;
    this.content = content;
    this.timestamp = new Date().toLocaleString();
    this.isPinned = false;
  }

  like() { this.#likes++; }
  unlike() { if (this.#likes > 0) this.#likes--; }
  get likeCount() { return this.#likes; }

  addComment(user, text) {
    this.#comments.push({ user, text, time: new Date().toLocaleString() });
  }

  display() {
    console.log((this.isPinned ? "📌 " : "") + this.author + ": " + this.content);
    console.log("  ❤️ " + this.#likes + " likes | 💬 " + this.#comments.length + " comments");
  }
}

class User {
  #posts = [];
  constructor(name) { this.name = name; }

  createPost(content) {
    const post = new Post(this.name, content);
    this.#posts.push(post);
    console.log("📝 " + this.name + " posted: " + content);
    return post;
  }

  getFeed() { return [...this.#posts]; }
}

class Admin extends User {
  deletePost(post) { console.log("🗑️ Admin deleted post: " + post.content); }
  pinPost(post) { post.isPinned = true; console.log("📌 Pinned: " + post.content); }
}

const user = new User("Mehedi");
const admin = new Admin("SuperAdmin");

const post = user.createPost("Learning OOP is fun!");
post.like(); post.like(); post.like();
post.addComment("Alice", "Great post!");
admin.pinPost(post);
post.display();`} />
      </div>

    </SectionContainer>
  );
}
