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
              title: "1. Refactor God Class to SRP",
              instructions: `Split the messy 'UserProfile' class into two focused classes:
1. 'UserFormatter': Has a method 'formatName(first: string, last: string)' returning 'Last, First'.
2. 'UserStorage': Has a method 'save(username: string)' storing and returning '{ username, savedAt: Date.now() }'.`,
              starterCode: `// Refactor this class into UserFormatter and UserStorage:
class UserFormatter {
  // Your code here
}

class UserStorage {
  // Your code here
}

const formatter = new UserFormatter();
console.log("Formatted:", formatter.formatName("Mehedi", "Hasan"));

const storage = new UserStorage();
console.log("Saved:", storage.save("mehedi_dev"));`,
              solutionCode: `class UserFormatter {
  formatName(first: string, last: string) {
    return last + ", " + first;
  }
}

class UserStorage {
  save(username: string) {
    return { username, savedAt: Date.now() };
  }
}

const formatter = new UserFormatter();
console.log("Formatted:", formatter.formatName("Mehedi", "Hasan"));

const storage = new UserStorage();
console.log("Saved:", storage.save("mehedi_dev"));`,
              hints: [
                "UserFormatter should have formatName(first: string, last: string) that returns last + ', ' + first.",
                "UserStorage should have save(username: string) that returns an object { username, savedAt: Date.now() }.",
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

      {/* ── 13.3 Advanced Exercise: Dependency Inversion ── */}
      <div className="mb-16">
        <SectionHeading>🟣 Advanced Exercise: Dependency Inversion (D)</SectionHeading>

        <div className="mb-8">
          <Playground
            runtime="typescript"
            language="TypeScript"
            exercise={{
              id: "solid-ex-03",
              title: "3. Dependency Injection Alert Service",
              instructions: `Implement Dependency Inversion for an alert manager:
1. Define interface 'IAlertSender' with method 'sendAlert(message: string): void'.
2. Create 'SlackAlertSender' implementing IAlertSender.
3. Create 'AlertManager' that accepts 'IAlertSender' in its constructor and has a method 'alert(msg: string)' that forwards to the sender.`,
              starterCode: `interface IAlertSender {
  // Your code here
}

class SlackAlertSender implements IAlertSender {
  // Your code here
}

class AlertManager {
  // Your code here: Receive IAlertSender via constructor
}`,
              solutionCode: `interface IAlertSender {
  sendAlert(message: string): void;
}

class SlackAlertSender implements IAlertSender {
  sendAlert(message: string): void {
    console.log("🚨 [SLACK ALERT] " + message);
  }
}

class AlertManager {
  constructor(private sender: IAlertSender) {}

  alert(msg: string) {
    this.sender.sendAlert(msg);
  }
}

const slack = new SlackAlertSender();
const manager = new AlertManager(slack);
manager.alert("Database CPU load > 90%!");`,
              hints: [
                "IAlertSender defines sendAlert(message: string): void.",
                "AlertManager constructor takes (private sender: IAlertSender).",
                "AlertManager.alert(msg) calls this.sender.sendAlert(msg).",
              ],
              tests: [
                {
                  name: "AlertManager delegates to sender",
                  code: `let called = false;
const mockSender = { sendAlert: (m: string) => { if (m === "test") called = true; } };
const mgr = new AlertManager(mockSender);
mgr.alert("test");
if (!called) throw new Error("AlertManager did not delegate to IAlertSender");`,
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
