import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { SectionContainer, TopicHeader, Divider, SummaryBox } from "./shared-components";

export function RealWorldExamplesSection() {
  return (
    <SectionContainer number={9} title="Real-World OOP Examples">

      <div className="mb-10 p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Here are 5 complete, beginner-friendly examples. Each one uses multiple OOP concepts working together. Study them carefully — these are the kinds of systems you will build in real projects.
        </p>
      </div>

      {/* ── Example 1: Bank Account ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Bank Account System" description="Features: create account, deposit, withdraw, check balance, transfer. Uses: Encapsulation." color="primary" />
        <EnhancedCodeBlock code={`class BankAccount {
  #balance;
  #transactions = [];

  constructor(owner, initialBalance = 0) {
    this.owner = owner;
    this.#balance = initialBalance;
    this.#transactions.push("Account opened with $" + initialBalance);
  }

  deposit(amount) {
    if (amount <= 0) { console.log("❌ Invalid amount"); return; }
    this.#balance += amount;
    this.#transactions.push("+ $" + amount);
    console.log("✅ Deposited $" + amount + " → Balance: $" + this.#balance);
  }

  withdraw(amount) {
    if (amount <= 0) { console.log("❌ Invalid amount"); return; }
    if (amount > this.#balance) { console.log("❌ Insufficient funds"); return; }
    this.#balance -= amount;
    this.#transactions.push("- $" + amount);
    console.log("✅ Withdrew $" + amount + " → Balance: $" + this.#balance);
  }

  get balance() { return this.#balance; }

  showStatement() {
    console.log("\\n--- Statement for " + this.owner + " ---");
    this.#transactions.forEach(t => console.log("  " + t));
    console.log("  Current Balance: $" + this.#balance);
  }
}

const acc = new BankAccount("Mehedi", 1000);
acc.deposit(500);
acc.withdraw(200);
acc.deposit(100);
acc.showStatement();`} language="javascript" />
      </div>

      <Divider />

      {/* ── Example 2: E-commerce Product ── */}
      <div className="mb-16">
        <TopicHeader number={2} title="E-commerce Product System" description="Features: product name, price, stock, increase/decrease stock, calculate discount. Uses: Encapsulation + Methods." color="sky" />
        <EnhancedCodeBlock code={`class Product {
  #stock;

  constructor(name, price, stock = 0) {
    this.name = name;
    this.price = price;
    this.#stock = stock;
  }

  get stock() { return this.#stock; }

  increaseStock(amount) {
    this.#stock += amount;
    console.log("📦 " + this.name + " restocked. Stock: " + this.#stock);
  }

  decreaseStock(amount) {
    if (amount > this.#stock) {
      console.log("❌ Only " + this.#stock + " " + this.name + " left!");
      return false;
    }
    this.#stock -= amount;
    console.log("📤 Sold " + amount + "x " + this.name + ". Stock: " + this.#stock);
    return true;
  }

  calculateDiscount(percent) {
    const discounted = this.price - (this.price * percent / 100);
    console.log("🏷️ " + this.name + ": $" + this.price + " → $" + discounted.toFixed(2) + " (" + percent + "% off)");
    return discounted;
  }

  showInfo() {
    console.log(this.name + " | $" + this.price + " | Stock: " + this.#stock);
  }
}

const phone = new Product("iPhone 15", 999, 50);
phone.showInfo();              // iPhone 15 | $999 | Stock: 50
phone.decreaseStock(3);        // 📤 Sold 3x iPhone 15. Stock: 47
phone.calculateDiscount(15);   // 🏷️ iPhone 15: $999 → $849.15 (15% off)
phone.increaseStock(20);       // 📦 iPhone 15 restocked. Stock: 67`} language="javascript" />
      </div>

      <Divider />

      {/* ── Example 3: User System ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="User System (User → Admin / Customer)" description="Features: login, logout, role-based actions. Uses: Inheritance + Polymorphism." color="emerald" />
        <EnhancedCodeBlock code={`class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
    console.log("✅ " + this.name + " logged in");
  }

  logout() {
    this.isLoggedIn = false;
    console.log("👋 " + this.name + " logged out");
  }

  // Polymorphic method — each subclass handles it differently
  getPermissions() {
    return ["read"];
  }

  showRole() {
    console.log(this.name + " — Permissions: " + this.getPermissions().join(", "));
  }
}

class Admin extends User {
  constructor(name, email) {
    super(name, email);
    this.role = "admin";
  }

  getPermissions() {
    return ["read", "write", "delete", "manage-users"];
  }

  deleteUser(userName) {
    console.log("🗑️ Admin " + this.name + " deleted " + userName);
  }
}

class Customer extends User {
  constructor(name, email) {
    super(name, email);
    this.role = "customer";
    this.orders = [];
  }

  getPermissions() {
    return ["read", "place-order"];
  }

  placeOrder(product) {
    this.orders.push(product);
    console.log("🛒 " + this.name + " ordered: " + product);
  }
}

// Polymorphism in action
const users = [
  new Admin("Mehedi", "admin@test.com"),
  new Customer("Alice", "alice@test.com"),
  new Customer("Bob", "bob@test.com"),
];

users.forEach(user => {
  user.login();
  user.showRole(); // Each shows different permissions!
});`} language="javascript" />
      </div>

      <Divider />

      {/* ── Example 4: Vehicle System ── */}
      <div className="mb-16">
        <TopicHeader number={4} title="Vehicle System (Vehicle → Car / Bike / Truck)" description="Features: vehicle details, fuel consumption, method overriding. Uses: Inheritance + Method Overriding." color="amber" />
        <EnhancedCodeBlock code={`class Vehicle {
  constructor(brand, model, fuelCapacity) {
    this.brand = brand;
    this.model = model;
    this.fuelCapacity = fuelCapacity;
    this.currentFuel = fuelCapacity;
    this.odometer = 0;
  }

  drive(km) {
    const fuelNeeded = this.getFuelConsumption(km);
    if (fuelNeeded > this.currentFuel) {
      console.log("⛽ Not enough fuel! Need to refuel.");
      return;
    }
    this.currentFuel -= fuelNeeded;
    this.odometer += km;
    console.log(this.brand + " drove " + km + "km. Fuel: " + this.currentFuel.toFixed(1) + "L");
  }

  // Each vehicle type will override this
  getFuelConsumption(km) {
    return km * 0.08; // Default: 8L per 100km
  }

  refuel() {
    this.currentFuel = this.fuelCapacity;
    console.log("⛽ " + this.brand + " refueled to " + this.fuelCapacity + "L");
  }
}

class Car extends Vehicle {
  getFuelConsumption(km) {
    return km * 0.07; // Cars: 7L per 100km
  }
}

class Bike extends Vehicle {
  getFuelConsumption(km) {
    return km * 0.03; // Bikes: 3L per 100km (efficient!)
  }
}

class Truck extends Vehicle {
  getFuelConsumption(km) {
    return km * 0.15; // Trucks: 15L per 100km (thirsty!)
  }
}

const car = new Car("Toyota", "Camry", 50);
const bike = new Bike("Honda", "CBR", 15);
const truck = new Truck("Volvo", "FH", 300);

car.drive(100);   // Toyota drove 100km. Fuel: 43.0L
bike.drive(100);  // Honda drove 100km. Fuel: 12.0L
truck.drive(100); // Volvo drove 100km. Fuel: 285.0L`} language="javascript" />
      </div>

      <Divider />

      {/* ── Example 5: Payment System ── */}
      <div className="mb-16">
        <TopicHeader number={5} title="Payment System (Polymorphism)" description="Features: multiple payment methods, each processes differently. Uses: Polymorphism." color="secondary" />
        <EnhancedCodeBlock code={`class Payment {
  constructor(amount) {
    this.amount = amount;
    this.status = "pending";
  }

  process() {
    console.log("Processing $" + this.amount);
    this.status = "completed";
  }

  getReceipt() {
    return "Payment of $" + this.amount + " — " + this.status;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  process() {
    const last4 = this.cardNumber.slice(-4);
    console.log("💳 Charging $" + this.amount + " to card ending " + last4);
    this.status = "completed";
  }
}

class BkashPayment extends Payment {
  constructor(amount, phoneNumber) {
    super(amount);
    this.phoneNumber = phoneNumber;
  }

  process() {
    console.log("📱 bKash: Sending $" + this.amount + " from " + this.phoneNumber);
    this.status = "completed";
  }
}

class CashPayment extends Payment {
  process() {
    console.log("💵 Received $" + this.amount + " in cash");
    this.status = "completed";
  }
}

// Polymorphism! Same function handles ALL payment types
function processCheckout(payment) {
  payment.process();
  console.log("📃 " + payment.getReceipt());
  console.log("---");
}

processCheckout(new CreditCardPayment(999, "4111222233334444"));
processCheckout(new BkashPayment(500, "+880171234567"));
processCheckout(new CashPayment(75));`} language="javascript" />
      </div>

      <SummaryBox>
        These 5 examples show how OOP concepts work together in real applications. <strong>Encapsulation</strong> protects sensitive data (balance, stock). <strong>Inheritance</strong> shares common code (User → Admin/Customer). <strong>Polymorphism</strong> lets different objects handle the same action differently (payment.process()). Practice building systems like these!
      </SummaryBox>

    </SectionContainer>
  );
}
