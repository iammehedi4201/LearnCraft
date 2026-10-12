"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Collapsible } from "./collapsible";
import { SectionContainer, TopicHeader, SectionHeading, Divider, SummaryBox, InfoCallout } from "./shared-components";
import { Playground } from "@/components/playground/Playground";

export function FinalProjectSection() {
  return (
    <SectionContainer number={17} title="Final OOP Project">

      <div className="mb-10 p-6 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏆</span>
          <h3 className="text-xl font-black text-ds-text-strong">Build a Simple E-Commerce System</h3>
        </div>
        <p className="text-sm text-ds-text-sub leading-relaxed">
          This final project uses <strong>ALL the OOP concepts</strong> you have learned: Classes, Objects, Constructor, Methods, Encapsulation (private access modifiers), Inheritance, Polymorphism, Composition, and Static methods. Build it step by step in TypeScript.
        </p>
      </div>

      {/* ── Step 1: Product ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Step 1 — Create the Product Class" description="Every e-commerce system needs products. This class represents items for sale." color="primary" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Class, Constructor, Methods, Encapsulation (private _stock), Getter</p>
        </InfoCallout>

        <Collapsible title="📝 Requirements">
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mt-3 list-disc pl-5">
            <li>Properties: name, price, _stock (private), category</li>
            <li>Methods: sell(quantity: number): boolean, restock(quantity: number): void, isInStock(): boolean</li>
            <li>Getter: stock (to read the private _stock value)</li>
          </ul>
        </Collapsible>

        <div className="mt-4" />

        <Collapsible title="💡 Show Code (try it yourself first!)">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class Product {
  private _stock: number;

  constructor(
    public name: string,
    public price: number,
    stock: number,
    public category: string
  ) {
    this._stock = stock;
  }

  get stock(): number {
    return this._stock;
  }

  isInStock(): boolean {
    return this._stock > 0;
  }

  sell(quantity: number): boolean {
    if (quantity > this._stock) {
      console.log("❌ Only " + this._stock + " " + this.name + " left!");
      return false;
    }
    this._stock -= quantity;
    console.log("📤 Sold " + quantity + "x " + this.name);
    return true;
  }

  restock(quantity: number): void {
    this._stock += quantity;
    console.log("📦 Restocked " + this.name + ". New stock: " + this._stock);
  }

  toString(): string {
    return this.name + " | $" + this.price + " | Stock: " + this._stock;
  }
}`} language="typescript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 2: CartItem ── */}
      <div className="mb-16">
        <TopicHeader number={2} title="Step 2 — Create the CartItem Class" description="A CartItem wraps a Product with a quantity. This uses Composition (HAS-A a Product)." color="sky" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Composition (HAS-A Product), Methods</p>
        </InfoCallout>

        <Collapsible title="💡 Show Code">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class CartItem {
  constructor(
    public product: Product,
    public quantity: number = 1
  ) {}

  getSubtotal(): number {
    return this.product.price * this.quantity;
  }

  toString(): string {
    return this.product.name + " x" + this.quantity + " = $" + this.getSubtotal().toFixed(2);
  }
}`} language="typescript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 3: ShoppingCart ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Step 3 — Create the ShoppingCart Class" description="The cart holds CartItems. It can add, remove, and calculate totals." color="emerald" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Encapsulation (private items), Composition (HAS CartItems), Methods</p>
        </InfoCallout>

        <Collapsible title="💡 Show Code">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class ShoppingCart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number = 1): void {
    // Check if product already in cart
    const existing = this.items.find(item => item.product.name === product.name);
    if (existing) {
      existing.quantity += quantity;
      console.log("🔄 Updated " + product.name + " quantity to " + existing.quantity);
    } else {
      this.items.push(new CartItem(product, quantity));
      console.log("🛒 Added " + product.name + " x" + quantity);
    }
  }

  removeItem(productName: string): void {
    const idx = this.items.findIndex(item => item.product.name === productName);
    if (idx === -1) {
      console.log("❌ " + productName + " not in cart!");
      return;
    }
    this.items.splice(idx, 1);
    console.log("🗑️ Removed " + productName + " from cart");
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear(): void {
    this.items = [];
    console.log("🧹 Cart cleared");
  }

  display(): void {
    console.log("\\n🛒 ─── Shopping Cart ───");
    if (this.items.length === 0) {
      console.log("  (empty)");
      return;
    }
    this.items.forEach(item => {
      console.log("  " + item.toString());
    });
    console.log("  ─────────────────────");
    console.log("  Total: $" + this.getTotal().toFixed(2));
    console.log("  Items: " + this.itemCount);
  }

  // Returns a copy of items for checkout
  getItems(): CartItem[] {
    return [...this.items];
  }
}`} language="typescript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 4: Payment (Polymorphism) ── */}
      <div className="mb-16">
        <TopicHeader number={4} title="Step 4 — Create Payment Classes (Polymorphism!)" description="Different payment methods, each processing differently. Same method name, different behavior." color="amber" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Inheritance, Polymorphism, Method Overriding</p>
        </InfoCallout>

        <Collapsible title="💡 Show Code">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class Payment {
  public status: string = "pending";

  constructor(public amount: number) {}

  process(): boolean {
    this.status = "completed";
    return true;
  }

  getReceipt(): string {
    return "Payment of $" + this.amount.toFixed(2) + " — " + this.status;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount: number, private cardNumber: string) {
    super(amount);
  }

  override process(): boolean {
    const last4 = this.cardNumber.slice(-4);
    console.log("💳 Charging $" + this.amount.toFixed(2) + " to card ending " + last4);
    this.status = "completed";
    return true;
  }
}

class BkashPayment extends Payment {
  constructor(amount: number, private phone: string) {
    super(amount);
  }

  override process(): boolean {
    console.log("📱 bKash: $" + this.amount.toFixed(2) + " from " + this.phone);
    this.status = "completed";
    return true;
  }
}

class CashPayment extends Payment {
  override process(): boolean {
    console.log("💵 Cash: $" + this.amount.toFixed(2) + " received");
    this.status = "completed";
    return true;
  }
}`} language="typescript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 5: Order ── */}
      <div className="mb-16">
        <TopicHeader number={5} title="Step 5 — Create the Order Class" description="An Order combines everything: customer, items, payment. Uses static for ID tracking." color="secondary" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Static (auto-increment ID), Composition (HAS items, HAS payment), Encapsulation</p>
        </InfoCallout>

        <Collapsible title="💡 Show Code">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class Order {
  private static nextId: number = 1;
  public readonly id: number;
  public status: string = "placed";
  public readonly createdAt: string;

  constructor(
    public customerName: string,
    public items: CartItem[],
    public payment: Payment
  ) {
    this.id = Order.nextId++;
    this.createdAt = new Date().toLocaleString();
  }

  getTotal(): number {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  display(): void {
    console.log("\\n📋 ─── Order #" + this.id + " ───");
    console.log("  Customer: " + this.customerName);
    console.log("  Date: " + this.createdAt);
    console.log("  Status: " + this.status);
    console.log("  Items:");
    this.items.forEach(item => {
      console.log("    • " + item.toString());
    });
    console.log("  Total: $" + this.getTotal().toFixed(2));
    console.log("  Payment: " + this.payment.getReceipt());
  }
}`} language="typescript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 6: Putting It All Together — LIVE PLAYGROUND ── */}
      <div className="mb-16">
        <TopicHeader number={6} title="Step 6 — Put It All Together!" description="Run the entire system live and see all OOP concepts working in harmony." color="primary" />

        <div className="mb-6 p-4 rounded-xl bg-ds-feature-lighter border border-ds-feature-light">
          <p className="text-sm text-ds-text-strong leading-relaxed">
            🚀 This playground contains the <strong>complete TypeScript e-commerce system</strong>. Click <strong>Run</strong> to see every OOP concept in action — classes, inheritance, polymorphism, composition, encapsulation with private access modifiers, and static methods all working together.
          </p>
        </div>

        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`// ═══════════════════════════════════════════
// Complete TypeScript E-Commerce OOP System
// ═══════════════════════════════════════════

class Product {
  private _stock: number;

  constructor(
    public name: string,
    public price: number,
    stock: number,
    public category: string
  ) {
    this._stock = stock;
  }

  get stock(): number { return this._stock; }
  isInStock(): boolean { return this._stock > 0; }

  sell(quantity: number): boolean {
    if (quantity > this._stock) {
      console.log("❌ Only " + this._stock + " " + this.name + " left!");
      return false;
    }
    this._stock -= quantity;
    console.log("📤 Sold " + quantity + "x " + this.name);
    return true;
  }

  restock(quantity: number): void {
    this._stock += quantity;
    console.log("📦 Restocked " + this.name + ". New stock: " + this._stock);
  }

  toString(): string {
    return this.name + " | $" + this.price + " | Stock: " + this._stock;
  }
}

class CartItem {
  constructor(public product: Product, public quantity: number = 1) {}
  getSubtotal(): number { return this.product.price * this.quantity; }
  toString(): string {
    return this.product.name + " x" + this.quantity + " = $" + this.getSubtotal().toFixed(2);
  }
}

class ShoppingCart {
  private items: CartItem[] = [];

  addItem(product: Product, quantity: number = 1): void {
    const existing = this.items.find(i => i.product.name === product.name);
    if (existing) {
      existing.quantity += quantity;
      console.log("🔄 Updated " + product.name + " qty to " + existing.quantity);
    } else {
      this.items.push(new CartItem(product, quantity));
      console.log("🛒 Added " + product.name + " x" + quantity);
    }
  }

  getTotal(): number { return this.items.reduce((s, i) => s + i.getSubtotal(), 0); }
  get itemCount(): number { return this.items.reduce((s, i) => s + i.quantity, 0); }

  display(): void {
    console.log("\\n🛒 ─── Shopping Cart ───");
    this.items.forEach(i => console.log("  " + i.toString()));
    console.log("  Total: $" + this.getTotal().toFixed(2));
    console.log("  Items: " + this.itemCount);
  }

  getItems(): CartItem[] { return [...this.items]; }
}

class Payment {
  public status: string = "pending";
  constructor(public amount: number) {}
  process(): boolean { this.status = "completed"; return true; }
  getReceipt(): string { return "Payment of $" + this.amount.toFixed(2) + " — " + this.status; }
}

class CreditCardPayment extends Payment {
  constructor(amount: number, private cardNumber: string) { super(amount); }
  override process(): boolean {
    console.log("💳 Charging $" + this.amount.toFixed(2) + " to card ending " + this.cardNumber.slice(-4));
    this.status = "completed";
    return true;
  }
}

class BkashPayment extends Payment {
  constructor(amount: number, private phone: string) { super(amount); }
  override process(): boolean {
    console.log("📱 bKash: $" + this.amount.toFixed(2) + " from " + this.phone);
    this.status = "completed";
    return true;
  }
}

class Order {
  private static nextId: number = 1;
  public readonly id: number;
  public status: string = "placed";

  constructor(
    public customerName: string,
    public items: CartItem[],
    public payment: Payment
  ) {
    this.id = Order.nextId++;
  }

  getTotal(): number { return this.items.reduce((s, i) => s + i.getSubtotal(), 0); }

  display(): void {
    console.log("\\n📋 ─── Order #" + this.id + " ───");
    console.log("  Customer: " + this.customerName);
    console.log("  Status: " + this.status);
    this.items.forEach(i => console.log("    • " + i.toString()));
    console.log("  Total: $" + this.getTotal().toFixed(2));
    console.log("  Payment: " + this.payment.getReceipt());
  }
}

// ═══ Run the System ═══
const laptop = new Product("MacBook Pro", 1999, 10, "Electronics");
const mouse = new Product("Logitech MX", 79, 25, "Accessories");
const keyboard = new Product("MX Keys", 119, 15, "Accessories");

console.log("📦 Products:");
console.log("  " + laptop.toString());
console.log("  " + mouse.toString());
console.log("  " + keyboard.toString());

const cart = new ShoppingCart();
cart.addItem(laptop, 1);
cart.addItem(mouse, 2);
cart.addItem(keyboard, 1);
cart.display();

// Checkout with Credit Card (Polymorphism!)
const payment = new CreditCardPayment(cart.getTotal(), "4111222233334444");
payment.process();

const order = new Order("Mehedi", cart.getItems(), payment);
laptop.sell(1);
mouse.sell(2);
keyboard.sell(1);
order.display();

// Second order with bKash
const cart2 = new ShoppingCart();
cart2.addItem(mouse, 1);
const bkash = new BkashPayment(cart2.getTotal(), "+880171234567");
bkash.process();
const order2 = new Order("Alice", cart2.getItems(), bkash);
order2.display();

console.log("\\n📦 Updated Stock:");
console.log("  " + laptop.toString());
console.log("  " + mouse.toString());
console.log("  " + keyboard.toString());`}
          height="480px"
        />
      </div>

      <Divider />

      {/* ── Concepts Used ── */}
      <div className="mb-8">
        <SectionHeading>🎓 OOP Concepts Used in This Project</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { concept: "Classes & Objects", where: "Product, CartItem, ShoppingCart, Payment, Order" },
            { concept: "Constructor", where: "Every class uses typed constructors to set up data" },
            { concept: "Methods", where: "sell(), addItem(), process(), display()" },
            { concept: "Encapsulation (private)", where: "private _stock, private items, private static nextId" },
            { concept: "Getters", where: "get stock(), get itemCount()" },
            { concept: "Inheritance", where: "CreditCard/Bkash extends Payment" },
            { concept: "Polymorphism", where: "payment.process() behaves differently" },
            { concept: "Composition", where: "Cart HAS CartItems, CartItem HAS Product" },
            { concept: "Static", where: "Order.nextId for auto-incrementing IDs" },
          ].map(item => (
            <div key={item.concept} className="p-3 rounded-xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
              <span className="text-xs font-bold text-ds-feature-base">{item.concept}</span>
              <p className="text-xs text-ds-text-sub mt-1">{item.where}</p>
            </div>
          ))}
        </div>
      </div>

      <SummaryBox>
        🎉 <strong>Congratulations!</strong> If you built this project, you have used every major TypeScript OOP concept. You now have a solid foundation to understand frameworks like NestJS, which use these exact same patterns everywhere.
      </SummaryBox>

    </SectionContainer>
  );
}
