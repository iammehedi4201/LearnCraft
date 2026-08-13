"use client";

import { Playground } from "@/components/playground/Playground";
import { SectionContainer, TopicHeader, SectionHeading, Divider, SummaryBox } from "./shared-components";

export function ThinkInOopSection() {
  return (
    <SectionContainer number={12} title="How to Think in OOP">

      <div className="mb-16">
        <TopicHeader number={1} title="The OOP Thinking Process" description="When you face a real-world problem, follow these 4 steps to convert it into classes and objects." color="primary" />

        <div className="space-y-4 mb-8">
          {[
            { step: "Step 1", title: "Find the important things (nouns)", desc: "Look for the main things/entities in the problem. These become your classes.", icon: "🔍" },
            { step: "Step 2", title: "Find their properties (adjectives)", desc: "What information does each thing need? These become properties.", icon: "📊" },
            { step: "Step 3", title: "Find their actions (verbs)", desc: "What can each thing do? These become methods.", icon: "⚡" },
            { step: "Step 4", title: "Find relationships", desc: "How do the things connect? IS-A (inheritance) or HAS-A (composition)?", icon: "🔗" },
          ].map(item => (
            <div key={item.step} className="flex gap-4 p-5 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs font-bold text-ds-feature-base uppercase tracking-wide">{item.step}</span>
                <h5 className="font-bold text-sm text-ds-text-strong mt-1">{item.title}</h5>
                <p className="text-sm text-ds-text-sub mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* ── Walkthrough: Food Delivery ── */}
      <div className="mb-16">
        <TopicHeader number={2} title='Walkthrough: "Build a Food Delivery System"' description="Let us walk through the OOP thinking process with a real problem." color="sky" />

        <div className="mb-8">
          <SectionHeading>🔍 Step 1 — Find the important things</SectionHeading>
          <div className="flex flex-wrap gap-2 mb-4">
            {["User", "Restaurant", "Food", "Order", "Delivery", "Payment"].map(n => (
              <span key={n} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-ds-bg-weak text-ds-text-strong border border-ds-stroke-soft shadow-sm">{n}</span>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>📊 Step 2 — Find their properties</SectionHeading>
          <div className="grid md:grid-cols-3 gap-3">
            {[
              { name: "User", props: "name, email, address, phone" },
              { name: "Restaurant", props: "name, address, rating, menu" },
              { name: "Food", props: "name, price, category, isAvailable" },
              { name: "Order", props: "items, total, status, timestamp" },
              { name: "Delivery", props: "driver, pickupTime, deliveryTime, status" },
              { name: "Payment", props: "amount, method, status" },
            ].map(item => (
              <div key={item.name} className="p-3 rounded-lg bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
                <span className="font-bold text-xs text-ds-feature-base">{item.name}</span>
                <p className="text-xs text-ds-text-sub mt-1">{item.props}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>⚡ Step 3 — Find their actions</SectionHeading>
          <div className="grid md:grid-cols-2 gap-3">
            {[
              { name: "User", actions: "placeOrder(), cancelOrder(), addAddress()" },
              { name: "Restaurant", actions: "addFood(), removeFood(), acceptOrder()" },
              { name: "Order", actions: "addItem(), removeItem(), calculateTotal()" },
              { name: "Payment", actions: "process(), refund(), getReceipt()" },
            ].map(item => (
              <div key={item.name} className="p-3 rounded-lg bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
                <span className="font-bold text-xs text-ds-feature-base">{item.name}</span>
                <p className="text-xs text-ds-text-sub mt-1 font-mono">{item.actions}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🔗 Step 4 — Find relationships</SectionHeading>
          <div className="p-4 bg-ds-bg-weak rounded-xl border border-ds-stroke-soft font-mono text-sm text-ds-text-strong mb-6 shadow-sm">
            <p>User creates Order (HAS-A)</p>
            <p>Order contains Food items (HAS-A)</p>
            <p>Restaurant HAS a menu of Food (HAS-A)</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It: Food Delivery System</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`class Food {
  constructor(public name: string, public price: number, public category: string) {}
}

class Order {
  items: { food: Food; quantity: number }[] = [];
  status: "pending" | "placed" | "delivered" = "pending";

  constructor(public customerName: string) {}

  addItem(food: Food, quantity: number = 1) {
    this.items.push({ food, quantity });
    console.log("🛒 Added " + quantity + "x " + food.name + " ($" + food.price + " each)");
  }

  getTotal(): number {
    const total = this.items.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);
    return Number(total.toFixed(2));
  }

  placeOrder() {
    this.status = "placed";
    console.log("\\n🛵 Order placed for " + this.customerName + "! Total: $" + this.getTotal());
  }
}

const pizza = new Food("Margherita Pizza", 12.99, "Pizza");
const pasta = new Food("Carbonara Pasta", 10.99, "Pasta");

const myOrder = new Order("Mehedi");
myOrder.addItem(pizza, 2);
myOrder.addItem(pasta, 1);
myOrder.placeOrder();`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ── Practice Problems ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Practice Problems — Think in OOP" description="Try to implement the classes, properties, methods, and relationships live in the playgrounds." color="amber" />

        <div className="mb-10">
          <SectionHeading>📚 Practice 1: Library Management System</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "oop-think-library-ex",
              title: "Library Management System",
              instructions: `Implement:
1. Book class: constructor(title: string, author: string, isbn: string) with isAvailable = true
2. Member class: constructor(name: string, memberId: string) with borrowedBooks = []
3. Member.borrowBook(book): checks availability, sets isAvailable = false, pushes to borrowedBooks
4. Member.returnBook(book): sets isAvailable = true, removes from borrowedBooks`,
              starterCode: `class Book {
  // Your code here
}

class Member {
  // Your code here
}

const book1 = new Book("TypeScript Essentials", "Dan", "ISBN-001");
const member = new Member("Mehedi", "M101");
member.borrowBook(book1);
member.returnBook(book1);
`,
              solutionCode: `class Book {
  public isAvailable: boolean = true;

  constructor(public title: string, public author: string, public isbn: string) {}
}

class Member {
  public borrowedBooks: Book[] = [];

  constructor(public name: string, public memberId: string) {}

  borrowBook(book: Book) {
    if (!book.isAvailable) {
      console.log("❌ " + book.title + " is already borrowed!");
      return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book);
    console.log("📖 " + this.name + " borrowed: " + book.title);
  }

  returnBook(book: Book) {
    book.isAvailable = true;
    this.borrowedBooks = this.borrowedBooks.filter(b => b.isbn !== book.isbn);
    console.log("✅ " + this.name + " returned: " + book.title);
  }
}

const book1 = new Book("TypeScript Essentials", "Dan", "ISBN-001");
const member = new Member("Mehedi", "M101");
member.borrowBook(book1);
member.returnBook(book1);`,
              hints: [
                "Book has title, author, isbn, and isAvailable (boolean).",
                "borrowBook(book) sets book.isAvailable = false and pushes to this.borrowedBooks.",
                "returnBook(book) sets book.isAvailable = true and filters out of this.borrowedBooks.",
              ],
              tests: [
                {
                  name: "Book and Member classes exist",
                  code: `if (typeof Book !== 'function' || typeof Member !== 'function') throw new Error("Missing Book or Member class");`,
                },
                {
                  name: "borrowBook toggles isAvailable",
                  code: `const _b = new Book("T", "A", "1"); const _m = new Member("M", "1"); _m.borrowBook(_b); if (_b.isAvailable) throw new Error("isAvailable should be false after borrow");`,
                },
                {
                  name: "returnBook toggles isAvailable back",
                  code: `const _b2 = new Book("T2", "A2", "2"); const _m2 = new Member("M2", "2"); _m2.borrowBook(_b2); _m2.returnBook(_b2); if (!_b2.isAvailable) throw new Error("isAvailable should be true after return");`,
                },
              ],
              difficulty: "intermediate",
            }}
            height="400px"
          />
        </div>
      </div>

      <SummaryBox>
        To think in OOP: (1) Find the nouns → classes, (2) Find the adjectives → properties, (3) Find the verbs → methods, (4) Find relationships → inheritance or composition. Practice this with every real-world problem you encounter!
      </SummaryBox>

    </SectionContainer>
  );
}
