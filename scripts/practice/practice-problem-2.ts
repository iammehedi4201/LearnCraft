// ═══════════════════════════════════════════════════════════
// Step 1: Types & Interfaces
// ═══════════════════════════════════════════════════════════

// A union type for strict role permissions
type Permission = "read" | "place-order" | "delete-user" | "manage-users";

// Structure of an item added to the cart
interface CartItem {
  productName: string;
  price: number;
  quantity: number;
}

// Structure of a completed order
interface Order {
  id: number;
  items: CartItem[];
  totalPrice: number;
  status: "PLACED" | "DELIVERED" | "CANCELLED";
}

// ═══════════════════════════════════════════════════════════
// Step 2: ShoppingCart Class (Encapsulation & Helper Methods)
// ═══════════════════════════════════════════════════════════

class ShoppingCart {
  private items: CartItem[] = [];

  addItem(productName: string, price: number, quantity: number = 1): void {
    if (price <= 0 || quantity <= 0) {
      console.log("❌ Price and quantity must be positive numbers.");
      return;
    }

    const existing = this.items.find((i) => i.productName === productName);
    if (existing) {
      existing.quantity += quantity;
      console.log(`🔄 Updated ${productName} quantity to ${existing.quantity}`);
    } else {
      this.items.push({ productName, price, quantity });
      console.log(`🛒 Added ${quantity} × ${productName} ($${price} each) to cart`);
    }
  }

  getItems(): CartItem[] {
    return [...this.items];
  }

  calculateTotal(): number {
    return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }

  clear(): void {
    this.items = [];
  }

  showItems(): void {
    console.log("\n--- 🛒 Shopping Cart Items ---");
    if (this.isEmpty()) {
      console.log("  (The cart is empty)");
      return;
    }

    this.items.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      console.log(`  • ${item.productName}: ${item.quantity} × $${item.price} = $${itemTotal}`);
    });

    console.log(`  Total: $${this.calculateTotal()}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Step 3: Base Class: User (Parent)
// ═══════════════════════════════════════════════════════════

class User {
  private loggedIn: boolean = false;

  constructor(
    public readonly name: string,
    protected email: string,
  ) {}

  // Getter for private property
  get isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
    console.log(`✅ ${this.name} logged in`);
  }

  logout(): void {
    this.loggedIn = false;
    console.log(`👋 ${this.name} logged out`);
  }

  // Base permission method (Polymorphism target)
  getPermissions(): Permission[] {
    return ["read"];
  }

  showInfo(): void {
    console.log(`\n👤 User Info:`);
    console.log(`  Name: ${this.name}`);
    console.log(`  Permissions: ${this.getPermissions().join(", ")}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Step 4: Child Class: Admin (Inheritance & Polymorphism)
// ═══════════════════════════════════════════════════════════

class Admin extends User {
  constructor(
    name: string,
    email: string,
    public department: string,
  ) {
    super(name, email); // Calls the User parent constructor
  }

  // Polymorphism: Admin has more permissions
  override getPermissions(): Permission[] {
    return ["read", "delete-user", "manage-users"];
  }

  deleteUser(userName: string): void {
    console.log(`🗑️ Admin ${this.name} from ${this.department} deleted user '${userName}'`);
  }

  showAdminEmail(): void {
    // Accessible because 'email' is protected in parent User class
    console.log(`📧 Admin email: ${this.email}`);
  }
}

// ═══════════════════════════════════════════════════════════
// Step 5: Child Class: Customer (Inheritance + Composition)
// ═══════════════════════════════════════════════════════════

class Customer extends User {
  private orders: Order[] = [];
  private shoppingCart: ShoppingCart;
  private static nextOrderId: number = 1;

  constructor(
    name: string,
    email: string,
    public readonly customerId: number,
  ) {
    super(name, email);
    this.shoppingCart = new ShoppingCart(); // Composition: Customer HAS-A ShoppingCart
  }

  // Polymorphism: Customer gets ordering permissions
  override getPermissions(): Permission[] {
    return ["read", "place-order"];
  }

  addToCart(productName: string, price: number, quantity: number = 1): void {
    this.shoppingCart.addItem(productName, price, quantity);
  }

  showCart(): void {
    console.log(`\nCart Owner: ${this.name} (Customer #${this.customerId})`);
    this.shoppingCart.showItems();
  }

  checkout(): boolean {
    if (this.shoppingCart.isEmpty()) {
      console.log(`❌ ${this.name}, cannot checkout because your cart is empty.`);
      return false;
    }

    const order: Order = {
      id: Customer.nextOrderId++,
      items: this.shoppingCart.getItems(),
      totalPrice: this.shoppingCart.calculateTotal(),
      status: "PLACED",
    };

    this.orders.push(order);
    this.shoppingCart.clear();

    console.log(`\n🎉 Order #${order.id} placed successfully by ${this.name}! Total: $${order.totalPrice}`);
    return true;
  }

  showOrders(): void {
    console.log(`\n📋 --- Order History for ${this.name} ---`);
    if (this.orders.length === 0) {
      console.log("  No previous orders found.");
      return;
    }

    this.orders.forEach((order) => {
      console.log(`  Order #${order.id} | Total: $${order.totalPrice} | Status: ${order.status}`);
      order.items.forEach((item) => {
        console.log(`    • ${item.productName} × ${item.quantity} ($${item.price * item.quantity})`);
      });
    });
  }
}

// ═══════════════════════════════════════════════════════════
// Step 6: Create Objects & Demonstrate OOP Features
// ═══════════════════════════════════════════════════════════

console.log("══════════ 1. OBJECT CREATION & POLYMORPHISM ══════════");
const admin = new Admin("Mehedi", "admin@test.com", "Management");
const customer = new Customer("Alice", "alice@test.com", 101);

// Polymorphism in action: Both Admin and Customer are treated as Users
const users: User[] = [admin, customer];

users.forEach((user) => {
  user.login();
  user.showInfo();
});

console.log("\n══════════ 2. ADMIN-SPECIFIC METHODS ══════════");
admin.deleteUser("hacker_99");
admin.showAdminEmail();

console.log("\n══════════ 3. CUSTOMER CART & CHECKOUT (COMPOSITION) ══════════");
customer.addToCart("iPhone 15", 999, 1);
customer.addToCart("AirPods Pro", 249, 1);
customer.showCart();

// Place the order
customer.checkout();

// View order history
customer.showOrders();

console.log("\n══════════ 4. LOGOUT & STATUS ══════════");
console.log(`Is customer logged in? ${customer.isLoggedIn}`);
customer.logout();
console.log(`Is customer logged in? ${customer.isLoggedIn}`);
