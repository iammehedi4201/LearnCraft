"use client";

import { Playground } from "@/components/playground/Playground";
import { SectionContainer, TopicHeader, Divider, SummaryBox } from "./shared-components";

export function RealWorldExamplesSection() {
  return (
    <SectionContainer number={11} title="Real-World OOP Examples">

      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Here are 5 complete, interactive examples. Each one uses multiple OOP concepts working together. Click <strong>Run</strong> on each to experiment and see the output!
        </p>
      </div>

      {/* ── Example 1: Bank Account ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Bank Account System" description="Features: create account, deposit, withdraw, check balance, statement. Uses: Encapsulation." color="primary" />
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`class BankAccount {
  private _balance: number;
  private _transactions: string[] = [];

  constructor(public owner: string, initialBalance: number = 0) {
    this._balance = initialBalance;
    this._transactions.push("Account opened with $" + initialBalance);
  }

  deposit(amount: number) {
    if (amount <= 0) { console.log("❌ Invalid amount"); return; }
    this._balance += amount;
    this._transactions.push("+ $" + amount);
    console.log("✅ Deposited $" + amount + " → Balance: $" + this._balance);
  }

  withdraw(amount: number) {
    if (amount <= 0) { console.log("❌ Invalid amount"); return; }
    if (amount > this._balance) { console.log("❌ Insufficient funds"); return; }
    this._balance -= amount;
    this._transactions.push("- $" + amount);
    console.log("✅ Withdrew $" + amount + " → Balance: $" + this._balance);
  }

  get balance(): number { return this._balance; }

  showStatement() {
    console.log("\\n--- Statement for " + this.owner + " ---");
    this._transactions.forEach(t => console.log("  " + t));
    console.log("  Current Balance: $" + this._balance);
  }
}

const acc = new BankAccount("Mehedi", 1000);
acc.deposit(500);
acc.withdraw(200);
acc.deposit(100);
acc.showStatement();`}
          height="380px"
        />
      </div>

      <Divider />

      {/* ── Example 2: E-commerce Product ── */}
      <div className="mb-16">
        <TopicHeader number={2} title="E-commerce Product System" description="Features: product name, price, stock, increase/decrease stock, calculate discount. Uses: Encapsulation + Methods." color="sky" />
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`class Product {
  private _stock: number;

  constructor(public name: string, public price: number, stock: number = 0) {
    this._stock = stock;
  }

  get stock(): number { return this._stock; }

  increaseStock(amount: number) {
    this._stock += amount;
    console.log("📦 " + this.name + " restocked. Stock: " + this._stock);
  }

  decreaseStock(amount: number): boolean {
    if (amount > this._stock) {
      console.log("❌ Only " + this._stock + " " + this.name + " left!");
      return false;
    }
    this._stock -= amount;
    console.log("📤 Sold " + amount + "x " + this.name + ". Stock: " + this._stock);
    return true;
  }

  calculateDiscount(percent: number): number {
    const discounted = this.price - (this.price * percent / 100);
    console.log("🏷️ " + this.name + ": $" + this.price + " → $" + discounted.toFixed(2) + " (" + percent + "% off)");
    return Number(discounted.toFixed(2));
  }

  showInfo() {
    console.log(this.name + " | $" + this.price + " | Stock: " + this._stock);
  }
}

const phone = new Product("iPhone 15", 999, 50);
phone.showInfo();
phone.decreaseStock(3);
phone.calculateDiscount(15);
phone.increaseStock(20);`}
          height="380px"
        />
      </div>

      <Divider />

      {/* ── Example 3: User System ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="User System (User → Admin / Customer)" description="Features: login, logout, role-based actions. Uses: Inheritance + Polymorphism." color="emerald" />
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`class User {
  public isLoggedIn: boolean = false;

  constructor(public name: string, public email: string) {}

  login() {
    this.isLoggedIn = true;
    console.log("✅ " + this.name + " logged in");
  }

  logout() {
    this.isLoggedIn = false;
    console.log("👋 " + this.name + " logged out");
  }

  getPermissions(): string[] {
    return ["read"];
  }

  showRole() {
    console.log(this.name + " — Permissions: " + this.getPermissions().join(", "));
  }
}

class Admin extends User {
  constructor(name: string, email: string) {
    super(name, email);
  }

  override getPermissions(): string[] {
    return ["read", "write", "delete", "manage-users"];
  }

  deleteUser(userName: string) {
    console.log("🗑️ Admin " + this.name + " deleted " + userName);
  }
}

class Customer extends User {
  public orders: string[] = [];

  constructor(name: string, email: string) {
    super(name, email);
  }

  override getPermissions(): string[] {
    return ["read", "place-order"];
  }

  placeOrder(product: string) {
    this.orders.push(product);
    console.log("🛒 " + this.name + " ordered: " + product);
  }
}

const users: User[] = [
  new Admin("Mehedi (Admin)", "admin@test.com"),
  new Customer("Alice (Customer)", "alice@test.com"),
  new Customer("Bob (Customer)", "bob@test.com"),
];

users.forEach(user => {
  user.login();
  user.showRole(); // Polymorphism!
});`}
          height="400px"
        />
      </div>

      <Divider />

      {/* ── Example 4: Vehicle System ── */}
      <div className="mb-16">
        <TopicHeader number={4} title="Vehicle System (Vehicle → Car / Bike / Truck)" description="Features: vehicle details, fuel consumption, method overriding. Uses: Inheritance + Method Overriding." color="amber" />
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`class Vehicle {
  public currentFuel: number;
  public odometer: number = 0;

  constructor(public brand: string, public model: string, public fuelCapacity: number) {
    this.currentFuel = fuelCapacity;
  }

  drive(km: number) {
    const fuelNeeded = this.getFuelConsumption(km);
    if (fuelNeeded > this.currentFuel) {
      console.log("⛽ Not enough fuel! Need to refuel.");
      return;
    }
    this.currentFuel -= fuelNeeded;
    this.odometer += km;
    console.log(this.brand + " drove " + km + "km. Remaining fuel: " + this.currentFuel.toFixed(1) + "L");
  }

  // Each vehicle type overrides this
  getFuelConsumption(km: number): number {
    return km * 0.08; // Default: 8L per 100km
  }

  refuel() {
    this.currentFuel = this.fuelCapacity;
    console.log("⛽ " + this.brand + " refueled to " + this.fuelCapacity + "L");
  }
}

class Car extends Vehicle {
  override getFuelConsumption(km: number): number {
    return km * 0.07; // Cars: 7L per 100km
  }
}

class Bike extends Vehicle {
  override getFuelConsumption(km: number): number {
    return km * 0.03; // Bikes: 3L per 100km (efficient!)
  }
}

class Truck extends Vehicle {
  override getFuelConsumption(km: number): number {
    return km * 0.15; // Trucks: 15L per 100km (heavy!)
  }
}

const car = new Car("Toyota", "Camry", 50);
const bike = new Bike("Honda", "CBR", 15);
const truck = new Truck("Volvo", "FH", 300);

car.drive(100);
bike.drive(100);
truck.drive(100);`}
          height="400px"
        />
      </div>

      <Divider />

      {/* ── Example 5: Payment System ── */}
      <div className="mb-16">
        <TopicHeader number={5} title="Payment System (Polymorphism)" description="Features: multiple payment methods, each processes differently. Uses: Polymorphism." color="secondary" />
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`class Payment {
  public status: string = "pending";

  constructor(public amount: number) {}

  process() {
    console.log("Processing $" + this.amount);
    this.status = "completed";
  }

  getReceipt(): string {
    return "Payment of $" + this.amount.toFixed(2) + " — " + this.status;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount: number, private cardNumber: string) {
    super(amount);
  }

  override process() {
    const last4 = this.cardNumber.slice(-4);
    console.log("💳 Charging $" + this.amount + " to card ending in " + last4);
    this.status = "completed";
  }
}

class BkashPayment extends Payment {
  constructor(amount: number, private phoneNumber: string) {
    super(amount);
  }

  override process() {
    console.log("📱 bKash: Sending $" + this.amount + " from " + this.phoneNumber);
    this.status = "completed";
  }
}

class CashPayment extends Payment {
  override process() {
    console.log("💵 Received $" + this.amount + " in cash");
    this.status = "completed";
  }
}

// Polymorphism in action!
function processCheckout(payment: Payment) {
  payment.process();
  console.log("📃 " + payment.getReceipt());
  console.log("---");
}

processCheckout(new CreditCardPayment(999, "4111222233334444"));
processCheckout(new BkashPayment(500, "+880171234567"));
processCheckout(new CashPayment(75));`}
          height="400px"
        />
      </div>

      <SummaryBox>
        These 5 examples show how OOP concepts work together in real applications. <strong>Encapsulation</strong> protects sensitive data (balance, stock). <strong>Inheritance</strong> shares common code (User → Admin/Customer). <strong>Polymorphism</strong> lets different objects handle the same action differently (payment.process()). Practice building systems like these!
      </SummaryBox>

    </SectionContainer>
  );
}
