import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { SectionContainer, TopicHeader, SectionHeading, Divider, SummaryBox, ExerciseBox } from "./shared-components";

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
            <div key={item.step} className="flex gap-4 p-5 rounded-xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <span className="text-xs font-bold text-[#344b8f] dark:text-[#7f6fbe] uppercase tracking-wide">{item.step}</span>
                <h5 className="font-bold text-sm text-[#212a5d] dark:text-white mt-1">{item.title}</h5>
                <p className="text-sm text-[#606f9a] dark:text-[#b4b8d7] mt-1">{item.desc}</p>
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
              <span key={n} className="px-3 py-1.5 rounded-lg text-sm font-bold bg-[#e7e9f5] text-[#344b8f] dark:bg-[#472f82]/30 dark:text-white border border-[#b4b8d7]/50 dark:border-[#7b52ac]/30">{n}</span>
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
              <div key={item.name} className="p-3 rounded-lg bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
                <span className="font-bold text-xs text-[#344b8f] dark:text-[#7f6fbe]">{item.name}</span>
                <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7] mt-1">{item.props}</p>
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
              <div key={item.name} className="p-3 rounded-lg bg-[#e7e9f5]/60 dark:bg-[#472f82]/20 border border-[#7b52ac]/30 dark:border-[#7b52ac]/40">
                <span className="font-bold text-xs text-[#472f82] dark:text-[#b4b8d7]">{item.name}</span>
                <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7] mt-1 font-mono">{item.actions}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🔗 Step 4 — Find relationships</SectionHeading>
          <div className="p-4 bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 rounded-xl border border-[#b4b8d7] dark:border-[#212a5d] font-mono text-sm text-[#212a5d] dark:text-[#e7e9f5]">
            <p>User creates Order (HAS-A)</p>
            <p>Order contains Food items (HAS-A)</p>
            <p>Restaurant HAS a menu of Food (HAS-A)</p>
            <p>Order HAS a Payment (HAS-A)</p>
            <p>Order HAS a Delivery (HAS-A)</p>
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>💻 Converting to code</SectionHeading>
          <EnhancedCodeBlock code={`class Food {
  constructor(name, price, category) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
}

class Order {
  constructor(customer) {
    this.customer = customer;
    this.items = [];
    this.status = "pending";
  }

  addItem(food, quantity = 1) {
    this.items.push({ food, quantity });
    console.log("Added " + quantity + "x " + food.name);
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.food.price * item.quantity), 0);
  }

  placeOrder() {
    this.status = "placed";
    console.log("🛵 Order placed! Total: $" + this.getTotal());
  }
}

// Using it
const pizza = new Food("Margherita Pizza", 12.99, "Pizza");
const pasta = new Food("Carbonara", 10.99, "Pasta");

const myOrder = new Order("Mehedi");
myOrder.addItem(pizza, 2);
myOrder.addItem(pasta, 1);
myOrder.placeOrder(); // 🛵 Order placed! Total: $36.97`} language="javascript" />
        </div>
      </div>

      <Divider />

      {/* ── Practice Problems ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Practice Problems — Think in OOP" description="Try to identify the classes, properties, methods, and relationships for each problem." color="amber" />

        <ExerciseBox level="intermediate" title="1. Library Management System"
          description={`Think about a library system.\n\nStep 1: What are the main things? (Book, Member, Librarian, Loan...)\nStep 2: What properties does each need?\nStep 3: What actions can each perform?\nStep 4: What are the relationships?\n\nWrite the classes in JavaScript.`}
          solution={`class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.isAvailable = true;
  }
}

class Member {
  constructor(name, memberId) {
    this.name = name;
    this.memberId = memberId;
    this.borrowedBooks = [];
  }

  borrowBook(book) {
    if (!book.isAvailable) {
      console.log("Book not available!");
      return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book);
    console.log(this.name + " borrowed: " + book.title);
  }

  returnBook(book) {
    book.isAvailable = true;
    this.borrowedBooks = this.borrowedBooks.filter(b => b.isbn !== book.isbn);
    console.log(this.name + " returned: " + book.title);
  }
}

const book1 = new Book("JavaScript Guide", "Author A", "123");
const member = new Member("Mehedi", "M001");
member.borrowBook(book1);
member.returnBook(book1);`} />

        <ExerciseBox level="real-world" title="2. Hospital Management System"
          description={`Identify classes for a hospital system.\n\nThink about: Patient, Doctor, Appointment, Prescription, Bill\nWhat properties? What methods? What relationships?\n\nWrite the core classes.`}
          solution={`class Patient {
  constructor(name, age, condition) {
    this.name = name;
    this.age = age;
    this.condition = condition;
    this.appointments = [];
  }
  bookAppointment(doctor, date) {
    const apt = new Appointment(this, doctor, date);
    this.appointments.push(apt);
    return apt;
  }
}

class Doctor {
  constructor(name, specialty) {
    this.name = name;
    this.specialty = specialty;
  }
  diagnose(patient) {
    console.log("Dr. " + this.name + " is diagnosing " + patient.name);
  }
}

class Appointment {
  constructor(patient, doctor, date) {
    this.patient = patient;
    this.doctor = doctor;
    this.date = date;
    this.status = "scheduled";
  }
}

const patient = new Patient("Mehedi", 25, "Headache");
const doctor = new Doctor("Smith", "General");
patient.bookAppointment(doctor, "2024-01-15");
doctor.diagnose(patient);`} />

        <ExerciseBox level="real-world" title="3. E-commerce System"
          description={`Design classes for an online store.\n\nThink about: Product, Cart, Customer, Order, Coupon\nWhat properties? What methods? What relationships?\n\nFocus on the Cart and Order flow.`}
          solution={`class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}

class Cart {
  constructor() {
    this.items = [];
  }
  addItem(product, qty = 1) {
    this.items.push({ product, qty });
    console.log("Added " + product.name + " x" + qty);
  }
  getTotal() {
    return this.items.reduce((sum, i) => sum + i.product.price * i.qty, 0);
  }
  checkout(customerName) {
    const order = new Order(customerName, this.items, this.getTotal());
    this.items = [];
    return order;
  }
}

class Order {
  constructor(customer, items, total) {
    this.customer = customer;
    this.items = items;
    this.total = total;
    this.status = "placed";
    console.log("Order placed for " + customer + " — Total: $" + total);
  }
}

const cart = new Cart();
cart.addItem(new Product("Laptop", 999));
cart.addItem(new Product("Mouse", 25), 2);
const order = cart.checkout("Mehedi");`} />
      </div>

      <SummaryBox>
        To think in OOP: (1) Find the nouns → classes, (2) Find the adjectives → properties, (3) Find the verbs → methods, (4) Find relationships → inheritance or composition. Practice this with every real-world problem you encounter!
      </SummaryBox>

    </SectionContainer>
  );
}
