"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  SectionHeading,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 13 — CODING EXERCISES
// ═══════════════════════════════════════════════════════════

export function CodingExercisesSection() {
  return (
    <SectionContainer number={13} title="Coding Exercises">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          Now it&apos;s time to <strong>write and test your own SOLID code live</strong>! Each interactive exercise includes automated tests. Click <strong>Run</strong> to see your console output and <strong>Check</strong> to verify your solution.
        </p>
      </div>

      {/* ── 13.1 Beginner Exercise: Single Responsibility ── */}
      <div className="mb-16">
        <SectionHeading>🟢 Beginner Exercise: Single Responsibility (S)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-01",
              title: "1. Refactor a Mixed UserAccount Class",
              instructions: `The current 'UserAccount' class has two reasons to change: profile formatting and data storage. Refactor it into two focused classes:
1. Move 'formatName(first: string, last: string): string' into 'UserFormatter'. It must return 'Last, First'.
2. Move 'save(username: string): SavedUser' into 'UserStorage'. It must return '{ username, savedAt: Date.now() }'.
3. Keep formatting out of UserStorage and storage out of UserFormatter. Remove the old mixed UserAccount class when you finish.`,
              starterCode: `interface SavedUser {
  username: string;
  savedAt: number;
}

// ❌ This class mixes profile formatting with data storage.
class UserAccount {
  formatName(first: string, last: string): string {
    return last + ", " + first;
  }

  save(username: string): SavedUser {
    return { username, savedAt: Date.now() };
  }
}

// TODO: Replace UserAccount with these two focused classes.
class UserFormatter {
  // Move only the formatting behavior here.
}

class UserStorage {
  // Move only the storage behavior here.
}`,
              solutionCode: `interface SavedUser {
  username: string;
  savedAt: number;
}

class UserFormatter {
  formatName(first: string, last: string): string {
    return last + ", " + first;
  }
}

class UserStorage {
  save(username: string): SavedUser {
    return { username, savedAt: Date.now() };
  }
}

const formatter = new UserFormatter();
console.log("Formatted:", formatter.formatName("Mehedi", "Hasan"));

const storage = new UserStorage();
console.log("Saved:", storage.save("mehedi_dev"));`,
              hints: [
                "Move formatName into UserFormatter and give it the explicit return type string.",
                "Move save into UserStorage and return a value that matches the SavedUser interface.",
                "After the refactor, neither focused class should contain the other class's method.",
              ],
              tests: [
                {
                  name: "UserFormatter formats name correctly",
                  code: `const f = new UserFormatter(); if (f.formatName("John", "Doe") !== "Doe, John") throw new Error("formatName should return 'Doe, John'");`,
                },
                {
                  name: "UserStorage returns saved record",
                  code: `const s = new UserStorage(); const res = s.save("alice"); if (!res || res.username !== "alice" || typeof res.savedAt !== "number") throw new Error("save() must return { username, savedAt }");`,
                },
                {
                  name: "Responsibilities stay separated",
                  code: `if ("save" in UserFormatter.prototype) throw new Error("UserFormatter should not save users"); if ("formatName" in UserStorage.prototype) throw new Error("UserStorage should not format names");`,
                },
              ],
              difficulty: "beginner",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.2 Intermediate Exercise: Open/Closed Principle ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Open/Closed (O)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-02",
              title: "2. Extensible Discount Strategy",
              instructions: `Implement an Open/Closed Discount system:
1. Define interface 'DiscountStrategy' with method 'applyDiscount(price: number): number'.
2. Create 'VipDiscount' (gives 20% off -> price * 0.80).
3. Create 'StudentDiscount' (gives 10% off -> price * 0.90).
4. Create 'DiscountCalculator' with method 'calculate(strategy: DiscountStrategy, price: number): number'.`,
              starterCode: `interface DiscountStrategy {
  // Your code here
}

class VipDiscount implements DiscountStrategy {
  // Your code here
}

class StudentDiscount implements DiscountStrategy {
  // Your code here
}

class DiscountCalculator {
  // Your code here
}`,
              solutionCode: `interface DiscountStrategy {
  applyDiscount(price: number): number;
}

class VipDiscount implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.8;
  }
}

class StudentDiscount implements DiscountStrategy {
  applyDiscount(price: number): number {
    return price * 0.9;
  }
}

class DiscountCalculator {
  calculate(strategy: DiscountStrategy, price: number): number {
    return strategy.applyDiscount(price);
  }
}

const calc = new DiscountCalculator();
console.log("VIP Price:", calc.calculate(new VipDiscount(), 100)); // 80
console.log("Student Price:", calc.calculate(new StudentDiscount(), 100)); // 90`,
              hints: [
                "DiscountStrategy has a method applyDiscount(price: number): number.",
                "VipDiscount multiplies price by 0.8.",
                "DiscountCalculator has a method calculate(strategy, price) that calls strategy.applyDiscount(price).",
              ],
              tests: [
                {
                  name: "VipDiscount gives 20% discount",
                  code: `const v = new VipDiscount(); if (v.applyDiscount(100) !== 80) throw new Error("VipDiscount for $100 should be $80");`,
                },
                {
                  name: "StudentDiscount gives 10% discount",
                  code: `const s = new StudentDiscount(); if (s.applyDiscount(100) !== 90) throw new Error("StudentDiscount for $100 should be $90");`,
                },
                {
                  name: "DiscountCalculator uses strategy",
                  code: `const c = new DiscountCalculator(); if (c.calculate(new VipDiscount(), 200) !== 160) throw new Error("Calculator failed with VipDiscount");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.3 Intermediate Exercise: Liskov Substitution ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Liskov Substitution (L)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-04-lsp",
              title: "3. Make Delivery Options Substitutable",
              instructions: `Every DeliveryOption promises to return a non-negative delivery cost for a non-negative weight. StorePickup currently breaks that promise by throwing an error.
1. Keep the DeliveryOption interface and calculateDeliveryCost() function unchanged.
2. Keep StandardDelivery charging 5 per kilogram.
3. Refactor StorePickup.getCost() so it returns 0 instead of throwing.
4. Both classes must work wherever DeliveryOption is expected.`,
              starterCode: `interface DeliveryOption {
  getCost(weightKg: number): number;
}

class StandardDelivery implements DeliveryOption {
  getCost(weightKg: number): number {
    return weightKg * 5;
  }
}

class StorePickup implements DeliveryOption {
  getCost(_weightKg: number): number {
    // ❌ Breaks the DeliveryOption promise.
    throw new Error("Store pickup has no delivery cost");
  }
}

// This consumer should work with every DeliveryOption.
function calculateDeliveryCost(
  option: DeliveryOption,
  weightKg: number
): number {
  return option.getCost(weightKg);
}`,
              solutionCode: `interface DeliveryOption {
  getCost(weightKg: number): number;
}

class StandardDelivery implements DeliveryOption {
  getCost(weightKg: number): number {
    return weightKg * 5;
  }
}

class StorePickup implements DeliveryOption {
  getCost(_weightKg: number): number {
    return 0;
  }
}

function calculateDeliveryCost(
  option: DeliveryOption,
  weightKg: number
): number {
  return option.getCost(weightKg);
}

const options: DeliveryOption[] = [
  new StandardDelivery(),
  new StorePickup(),
];

for (const option of options) {
  console.log("Delivery cost:", calculateDeliveryCost(option, 2));
}`,
              hints: [
                "LSP is about keeping a shared contract: callers should not need a special case for StorePickup.",
                "StorePickup still has a valid cost. Its cost is simply 0.",
                "Do not change calculateDeliveryCost(); fix the subtype that breaks the promise.",
              ],
              tests: [
                {
                  name: "Standard delivery keeps its normal cost",
                  code: `const standard = new StandardDelivery(); if (calculateDeliveryCost(standard, 2) !== 10) throw new Error("StandardDelivery should cost 5 per kilogram");`,
                },
                {
                  name: "Store pickup safely returns zero",
                  code: `const pickup = new StorePickup(); let pickupCost: number; try { pickupCost = calculateDeliveryCost(pickup, 2); } catch { throw new Error("StorePickup must not throw when a DeliveryOption is expected"); } if (pickupCost !== 0) throw new Error("StorePickup should return a cost of 0");`,
                },
                {
                  name: "Every delivery option is substitutable",
                  code: `const options: DeliveryOption[] = [new StandardDelivery(), new StorePickup()]; const costs = options.map((option) => calculateDeliveryCost(option, 3)); if (costs[0] !== 15 || costs[1] !== 0) throw new Error("All DeliveryOption implementations must work through the same consumer");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.4 Intermediate Exercise: Interface Segregation ── */}
      <div className="mb-16">
        <SectionHeading>🟡 Intermediate Exercise: Interface Segregation (I)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-05-isp",
              title: "4. Split a Fat WorkerCapabilities Interface",
              instructions: `The WorkerCapabilities interface forces BackendDeveloper to implement design work it does not need. Refactor it into focused TypeScript interfaces:
1. Replace WorkerCapabilities with Coder, which has 'writeCode(): string', and Designer, which has 'createDesign(): string'.
2. BackendDeveloper implements only Coder and returns 'API ready'.
3. ProductDesigner implements only Designer and returns 'UI ready'.
4. FullStackDeveloper implements both interfaces. Its methods return 'Full-stack code ready' and 'Full-stack design ready'.
5. Add 'deliverCode(coder: Coder): string', which returns coder.writeCode().`,
              starterCode: `// ❌ This interface asks every worker to do every kind of work.
interface WorkerCapabilities {
  writeCode(): string;
  createDesign(): string;
}

class BackendDeveloper implements WorkerCapabilities {
  writeCode(): string {
    return "API ready";
  }

  createDesign(): string {
    throw new Error("Backend developers do not create designs");
  }
}

// TODO: Replace WorkerCapabilities with focused Coder and Designer interfaces.
// Then add ProductDesigner, FullStackDeveloper, and deliverCode().`,
              solutionCode: `interface Coder {
  writeCode(): string;
}

interface Designer {
  createDesign(): string;
}

class BackendDeveloper implements Coder {
  writeCode(): string {
    return "API ready";
  }
}

class ProductDesigner implements Designer {
  createDesign(): string {
    return "UI ready";
  }
}

class FullStackDeveloper implements Coder, Designer {
  writeCode(): string {
    return "Full-stack code ready";
  }

  createDesign(): string {
    return "Full-stack design ready";
  }
}

function deliverCode(coder: Coder): string {
  return coder.writeCode();
}

console.log(deliverCode(new BackendDeveloper()));
console.log(new ProductDesigner().createDesign());
console.log(deliverCode(new FullStackDeveloper()));`,
              hints: [
                "A focused interface describes one capability, such as coding or designing.",
                "BackendDeveloper should have no createDesign method after the refactor.",
                "A class that genuinely needs both capabilities can implement both small interfaces.",
              ],
              tests: [
                {
                  name: "BackendDeveloper depends only on Coder",
                  code: `const backend = new BackendDeveloper(); if (deliverCode(backend) !== "API ready") throw new Error("BackendDeveloper should provide coding work"); if ("createDesign" in backend) throw new Error("BackendDeveloper should not be forced to implement Designer");`,
                },
                {
                  name: "ProductDesigner depends only on Designer",
                  code: `const designer = new ProductDesigner(); if (designer.createDesign() !== "UI ready") throw new Error("ProductDesigner should provide design work"); if ("writeCode" in designer) throw new Error("ProductDesigner should not be forced to implement Coder");`,
                },
                {
                  name: "FullStackDeveloper composes both interfaces",
                  code: `const fullStack = new FullStackDeveloper(); if (deliverCode(fullStack) !== "Full-stack code ready") throw new Error("FullStackDeveloper should satisfy Coder"); if (fullStack.createDesign() !== "Full-stack design ready") throw new Error("FullStackDeveloper should satisfy Designer");`,
                },
              ],
              difficulty: "intermediate",
            }}
          />
        </div>
      </div>

      <Divider />

      {/* ── 13.5 Advanced Exercise: Dependency Inversion ── */}
      <div className="mb-16">
        <SectionHeading>🟣 Advanced Exercise: Dependency Inversion (D)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-03",
              title: "5. Dependency Inversion Alert Service",
              instructions: `Implement Dependency Inversion for an alert manager:
1. Define interface 'AlertSender' with method 'sendAlert(message: string): void'.
2. Create 'SlackAlertSender' implementing AlertSender.
3. Create 'AlertManager' that accepts AlertSender in its constructor and has a method 'alert(msg: string): void' that forwards to the sender.

TypeScript uses structural typing. An object-literal mock can satisfy AlertSender without writing 'implements AlertSender' as long as it has the required sendAlert method.`,
              starterCode: `interface AlertSender {
  // Your code here
}

class SlackAlertSender implements AlertSender {
  // Your code here
}

class AlertManager {
  // Your code here: Receive AlertSender via constructor
}`,
              solutionCode: `interface AlertSender {
  sendAlert(message: string): void;
}

class SlackAlertSender implements AlertSender {
  sendAlert(message: string): void {
    console.log("🚨 [SLACK ALERT] " + message);
  }
}

class AlertManager {
  constructor(private readonly sender: AlertSender) {}

  alert(msg: string): void {
    this.sender.sendAlert(msg);
  }
}

const slack = new SlackAlertSender();
const manager = new AlertManager(slack);
manager.alert("Database CPU load > 90%!");`,
              hints: [
                "AlertSender defines sendAlert(message: string): void.",
                "AlertManager constructor takes (private readonly sender: AlertSender).",
                "AlertManager.alert(msg) calls this.sender.sendAlert(msg).",
                "A mock object with the same sendAlert shape is accepted because TypeScript uses structural typing.",
              ],
              tests: [
                {
                  name: "AlertManager delegates to sender",
                  code: `let called = false;
const mockSender: AlertSender = { sendAlert: (message: string) => { if (message === "test") called = true; } };
const mgr = new AlertManager(mockSender);
mgr.alert("test");
if (!called) throw new Error("AlertManager did not delegate to AlertSender");`,
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
