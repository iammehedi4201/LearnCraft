import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Collapsible } from "./collapsible";
import { SectionContainer, TopicHeader, SectionHeading, Divider, SummaryBox, InfoCallout } from "./shared-components";

export function FinalProjectSection() {
  return (
    <SectionContainer number={16} title="Final OOP Project">

      <div className="mb-10 p-6 rounded-2xl bg-[#e7e9f5] dark:bg-[#472f82]/20 border border-[#7b52ac]/30 dark:border-[#7b52ac]/40">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-3xl">🏆</span>
          <h3 className="text-xl font-black text-[#472f82] dark:text-white">Build a Simple E-Commerce System</h3>
        </div>
        <p className="text-sm text-[#212a5d] dark:text-[#e7e9f5] leading-relaxed">
          This final project uses <strong>ALL the OOP concepts</strong> you have learned: Classes, Objects, Constructor, Methods, Encapsulation (#private), Inheritance, Polymorphism, Composition, and Static methods. Build it step by step.
        </p>
      </div>

      {/* ── Step 1: Product ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Step 1 — Create the Product Class" description="Every e-commerce system needs products. This class represents items for sale." color="primary" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Class, Constructor, Methods, Encapsulation (#stock), Getter</p>
        </InfoCallout>

        <Collapsible title="📝 Requirements">
          <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-2 mt-3 list-disc pl-5">
            <li>Properties: name, price, #stock (private), category</li>
            <li>Methods: sell(quantity), restock(quantity), isInStock()</li>
            <li>Getter: stock (to read the private #stock value)</li>
          </ul>
        </Collapsible>

        <div className="mt-4" />

        <Collapsible title="💡 Show Code (try it yourself first!)">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class Product {
  #stock;

  constructor(name, price, stock, category) {
    this.name = name;
    this.price = price;
    this.#stock = stock;
    this.category = category;
  }

  get stock() {
    return this.#stock;
  }

  isInStock() {
    return this.#stock > 0;
  }

  sell(quantity) {
    if (quantity > this.#stock) {
      console.log("❌ Only " + this.#stock + " " + this.name + " left!");
      return false;
    }
    this.#stock -= quantity;
    console.log("📤 Sold " + quantity + "x " + this.name);
    return true;
  }

  restock(quantity) {
    this.#stock += quantity;
    console.log("📦 Restocked " + this.name + ". New stock: " + this.#stock);
  }

  toString() {
    return this.name + " | $" + this.price + " | Stock: " + this.#stock;
  }
}`} language="javascript" />
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
  constructor(product, quantity = 1) {
    this.product = product;   // HAS-A Product (composition!)
    this.quantity = quantity;
  }

  getSubtotal() {
    return this.product.price * this.quantity;
  }

  toString() {
    return this.product.name + " x" + this.quantity + " = $" + this.getSubtotal().toFixed(2);
  }
}`} language="javascript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 3: ShoppingCart ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Step 3 — Create the ShoppingCart Class" description="The cart holds CartItems. It can add, remove, and calculate totals." color="emerald" />

        <InfoCallout emoji="🎯" title="Concepts used">
          <p>Encapsulation (#items), Composition (HAS CartItems), Methods</p>
        </InfoCallout>

        <Collapsible title="💡 Show Code">
          <div className="mt-3">
            <EnhancedCodeBlock code={`class ShoppingCart {
  #items = [];

  addItem(product, quantity = 1) {
    // Check if product already in cart
    const existing = this.#items.find(item => item.product.name === product.name);
    if (existing) {
      existing.quantity += quantity;
      console.log("🔄 Updated " + product.name + " quantity to " + existing.quantity);
    } else {
      this.#items.push(new CartItem(product, quantity));
      console.log("🛒 Added " + product.name + " x" + quantity);
    }
  }

  removeItem(productName) {
    const idx = this.#items.findIndex(item => item.product.name === productName);
    if (idx === -1) {
      console.log("❌ " + productName + " not in cart!");
      return;
    }
    this.#items.splice(idx, 1);
    console.log("🗑️ Removed " + productName + " from cart");
  }

  getTotal() {
    return this.#items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  get itemCount() {
    return this.#items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clear() {
    this.#items = [];
    console.log("🧹 Cart cleared");
  }

  display() {
    console.log("\\n🛒 ─── Shopping Cart ───");
    if (this.#items.length === 0) {
      console.log("  (empty)");
      return;
    }
    this.#items.forEach(item => {
      console.log("  " + item.toString());
    });
    console.log("  ─────────────────────");
    console.log("  Total: $" + this.getTotal().toFixed(2));
    console.log("  Items: " + this.itemCount);
  }

  // Returns a copy of items for checkout
  getItems() {
    return [...this.#items];
  }
}`} language="javascript" />
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
  constructor(amount) {
    this.amount = amount;
    this.status = "pending";
  }

  process() {
    this.status = "completed";
    return true;
  }

  getReceipt() {
    return "Payment of $" + this.amount.toFixed(2) + " — " + this.status;
  }
}

class CreditCardPayment extends Payment {
  constructor(amount, cardNumber) {
    super(amount);
    this.cardNumber = cardNumber;
  }

  process() {
    const last4 = this.cardNumber.slice(-4);
    console.log("💳 Charging $" + this.amount.toFixed(2) + " to card ending " + last4);
    this.status = "completed";
    return true;
  }
}

class BkashPayment extends Payment {
  constructor(amount, phone) {
    super(amount);
    this.phone = phone;
  }

  process() {
    console.log("📱 bKash: $" + this.amount.toFixed(2) + " from " + this.phone);
    this.status = "completed";
    return true;
  }
}

class CashPayment extends Payment {
  process() {
    console.log("💵 Cash: $" + this.amount.toFixed(2) + " received");
    this.status = "completed";
    return true;
  }
}`} language="javascript" />
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
  static #nextId = 1;

  constructor(customerName, items, payment) {
    this.id = Order.#nextId++;
    this.customerName = customerName;
    this.items = items;
    this.payment = payment;
    this.status = "placed";
    this.createdAt = new Date().toLocaleString();
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + item.getSubtotal(), 0);
  }

  display() {
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
}`} language="javascript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Step 6: Putting It All Together ── */}
      <div className="mb-16">
        <TopicHeader number={6} title="Step 6 — Put It All Together!" description="Now let us run the entire system and see all OOP concepts working in harmony." color="primary" />

        <Collapsible title="🚀 Show Complete Working Example">
          <div className="mt-3">
            <EnhancedCodeBlock code={`// ─── Create Products ───
const laptop = new Product("MacBook Pro", 1999, 10, "Electronics");
const mouse = new Product("Logitech MX", 79, 25, "Accessories");
const keyboard = new Product("MX Keys", 119, 15, "Accessories");

console.log(laptop.toString());
console.log(mouse.toString());

// ─── Create Shopping Cart ───
const cart = new ShoppingCart();
cart.addItem(laptop, 1);
cart.addItem(mouse, 2);
cart.addItem(keyboard, 1);
cart.display();

// ─── Checkout with Polymorphism ───
const total = cart.getTotal();
const payment = new CreditCardPayment(total, "4111222233334444");
payment.process();

// ─── Create Order ───
const order = new Order("Mehedi", cart.getItems(), payment);

// ─── Reduce stock ───
laptop.sell(1);
mouse.sell(2);
keyboard.sell(1);

// ─── Show final order ───
order.display();

// ─── Show updated stock ───
console.log("\\n📦 Updated Stock:");
console.log("  " + laptop.toString());
console.log("  " + mouse.toString());
console.log("  " + keyboard.toString());

// ─── Try a different payment method ───
const cart2 = new ShoppingCart();
cart2.addItem(mouse, 1);
const bkashPay = new BkashPayment(cart2.getTotal(), "+880171234567");
bkashPay.process();
const order2 = new Order("Alice", cart2.getItems(), bkashPay);
order2.display();`} language="javascript" />
          </div>
        </Collapsible>
      </div>

      <Divider />

      {/* ── Concepts Used ── */}
      <div className="mb-8">
        <SectionHeading>🎓 OOP Concepts Used in This Project</SectionHeading>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            { concept: "Classes & Objects", where: "Product, CartItem, Cart, Payment, Order" },
            { concept: "Constructor", where: "Every class uses constructor to set up data" },
            { concept: "Methods", where: "sell(), addItem(), process(), display()" },
            { concept: "Encapsulation (#)", where: "#stock, #items, #nextId" },
            { concept: "Getters", where: "get stock(), get itemCount()" },
            { concept: "Inheritance", where: "CreditCard/Bkash/Cash extends Payment" },
            { concept: "Polymorphism", where: "payment.process() behaves differently" },
            { concept: "Composition", where: "Cart HAS CartItems, CartItem HAS Product" },
            { concept: "Static", where: "Order.#nextId for auto-incrementing IDs" },
          ].map(item => (
            <div key={item.concept} className="p-3 rounded-xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
              <span className="text-xs font-bold text-[#344b8f] dark:text-[#7f6fbe]">{item.concept}</span>
              <p className="text-xs text-[#606f9a] dark:text-[#b4b8d7] mt-1">{item.where}</p>
            </div>
          ))}
        </div>
      </div>

      <SummaryBox>
        🎉 <strong>Congratulations!</strong> If you built this project, you have used every major OOP concept. You now have a solid foundation to understand frameworks like NestJS, which use these same patterns everywhere.
      </SummaryBox>

    </SectionContainer>
  );
}
