"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  SummaryBox,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 14 — CAPSTONE PROJECT: ORDER FULFILLMENT SYSTEM
// ═══════════════════════════════════════════════════════════

export function FinalProjectSection() {
  return (
    <SectionContainer number={14} title="Final Project: Order Fulfillment System">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          In this capstone project, you will examine and run a complete <strong>E-Commerce Order Fulfillment System</strong> that implements all 5 SOLID principles working together in a production-style architecture.
        </p>
      </div>

      {/* ── Architecture Overview ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Architecture of Our SOLID Order Pipeline"
          description="How our 5 principles organize a complex real-world workflow."
          color="primary"
        />

        <StepList
          steps={[
            {
              label: "[S] Single Responsibility",
              note: "Inventory checking, payment charging, database saving, and customer messaging are all handled by separate classes.",
            },
            {
              label: "[O] Open / Closed",
              note: "Payment gateways and notification channels can be added endlessly without touching the order processing engine.",
            },
            {
              label: "[L] Liskov Substitution",
              note: "All payment gateways and notifiers fulfill their contract consistently without unexpected exceptions.",
            },
            {
              label: "[I] Interface Segregation",
              note: "Small, targeted interfaces (IInventoryChecker, IPaymentGateway, INotificationService).",
            },
            {
              label: "[D] Dependency Inversion",
              note: "OrderFulfillmentService receives all services via constructor dependency injection.",
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── Complete Live Code ── */}
      <div className="mb-16">
        <SectionHeading>🚀 The Complete Running System</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`// ═══════════════════════════════════════════════════════
// 1. [I] FOCUSED INTERFACES (Interface Segregation)
// ═══════════════════════════════════════════════════════
interface IInventory {
  checkStock(sku: string, qty: number): boolean;
  reserveStock(sku: string, qty: number): void;
}

interface IPayment {
  charge(amount: number): boolean;
}

interface INotifier {
  send(recipient: string, message: string): void;
}

// ═══════════════════════════════════════════════════════
// 2. [S] & [O] CONCRETE IMPLEMENTATIONS (Open for extension)
// ═══════════════════════════════════════════════════════
class WarehouseInventory implements IInventory {
  private stock: Record<string, number> = { "LAPTOP-M3": 10, "PHONE-16": 5 };

  checkStock(sku: string, qty: number): boolean {
    return (this.stock[sku] || 0) >= qty;
  }

  reserveStock(sku: string, qty: number): void {
    this.stock[sku] -= qty;
    console.log("📦 [INVENTORY] Reserved " + qty + "x " + sku + " (Remaining: " + this.stock[sku] + ")");
  }
}

class StripeCreditCardPayment implements IPayment {
  charge(amount: number): boolean {
    console.log("💳 [STRIPE] Charged $" + amount.toFixed(2) + " to customer card.");
    return true;
  }
}

class BkashMobilePayment implements IPayment {
  charge(amount: number): boolean {
    console.log("📱 [BKASH] Charged $" + amount.toFixed(2) + " via bKash mobile gateway.");
    return true;
  }
}

class EmailCustomerNotifier implements INotifier {
  send(recipient: string, message: string): void {
    console.log("📨 [EMAIL to " + recipient + "] " + message);
  }
}

// ═══════════════════════════════════════════════════════
// 3. [D] & [S] ORDER FULFILLMENT SERVICE (Dependency Injection)
// ═══════════════════════════════════════════════════════
class OrderFulfillmentService {
  constructor(
    private inventory: IInventory,
    private notifier: INotifier
  ) {}

  processOrder(
    orderId: number,
    sku: string,
    qty: number,
    amount: number,
    customerEmail: string,
    paymentMethod: IPayment // Polymorphic payment [L] & [O]
  ) {
    console.log("=========================================");
    console.log("🛒 Processing Order #" + orderId + " (" + qty + "x " + sku + ")");

    // 1. Check stock
    if (!this.inventory.checkStock(sku, qty)) {
      console.log("❌ Out of stock for SKU: " + sku);
      return { success: false, reason: "OUT_OF_STOCK" };
    }

    // 2. Charge payment
    const paymentSuccess = paymentMethod.charge(amount);
    if (!paymentSuccess) {
      console.log("❌ Payment failed!");
      return { success: false, reason: "PAYMENT_FAILED" };
    }

    // 3. Reserve inventory
    this.inventory.reserveStock(sku, qty);

    // 4. Notify customer
    this.notifier.send(
      customerEmail,
      "Your order #" + orderId + " for " + sku + " has been confirmed and shipped!"
    );

    console.log("✅ Order #" + orderId + " fulfilled successfully!\\n");
    return { success: true, orderId };
  }
}

// ═══════════════════════════════════════════════════════
// 4. RUNNING THE SYSTEM (Simulated NestJS IoC Wireup)
// ═══════════════════════════════════════════════════════
const inventory = new WarehouseInventory();
const emailNotifier = new EmailCustomerNotifier();
const fulfillmentService = new OrderFulfillmentService(inventory, emailNotifier);

// Order 1: Paying with Credit Card
fulfillmentService.processOrder(
  1001,
  "LAPTOP-M3",
  1,
  1999.00,
  "alice@learncraft.dev",
  new StripeCreditCardPayment()
);

// Order 2: Paying with bKash
fulfillmentService.processOrder(
  1002,
  "PHONE-16",
  2,
  1600.00,
  "mehedi@learncraft.dev",
  new BkashMobilePayment()
);`}
          height="620px"
        />

        <SummaryBox>
          You have mastered SOLID Principles! Every component in this application is loosely coupled, easily testable with mock providers, and simple to extend with new payment gateways or notification channels.
        </SummaryBox>
      </div>
    </SectionContainer>
  );
}
