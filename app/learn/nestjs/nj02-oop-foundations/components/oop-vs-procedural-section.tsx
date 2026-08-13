import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { SectionContainer, TopicHeader, SummaryBox, Divider, ComparisonTable, InfoCallout } from "./shared-components";

export function OopVsProceduralSection() {
  return (
    <SectionContainer number={8} title="OOP vs Procedural">

      <div className="mb-10 p-5 rounded-2xl bg-[#e7e9f5]/60 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          Let us build the <strong>same application</strong> — a Bank Account System — using both approaches. Then we will compare them honestly.
        </p>
      </div>

      {/* ── Procedural ── */}
      <div className="mb-16">
        <TopicHeader number={1} title="Procedural Approach" description="Everything is functions and variables. No classes, no objects — just steps." color="rose" />

        <EnhancedCodeBlock code={`// ─── PROCEDURAL: Bank Account System ───

// Data (just variables)
let accounts = [];

// Functions (scattered everywhere)
function createAccount(owner, balance) {
  const account = {
    id: accounts.length + 1,
    owner: owner,
    balance: balance,
  };
  accounts.push(account);
  console.log("Account created for " + owner);
  return account;
}

function deposit(accountId, amount) {
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    console.log("Account not found!");
    return;
  }
  if (amount <= 0) {
    console.log("Amount must be positive!");
    return;
  }
  account.balance += amount;
  console.log("Deposited $" + amount + " to " + account.owner + "'s account");
}

function withdraw(accountId, amount) {
  const account = accounts.find(a => a.id === accountId);
  if (!account) {
    console.log("Account not found!");
    return;
  }
  if (amount > account.balance) {
    console.log("Not enough money!");
    return;
  }
  account.balance -= amount;
  console.log("Withdrew $" + amount + " from " + account.owner + "'s account");
}

function getBalance(accountId) {
  const account = accounts.find(a => a.id === accountId);
  if (!account) return "Account not found";
  return account.owner + ": $" + account.balance;
}

// Using it
const acc1 = createAccount("Mehedi", 1000);
const acc2 = createAccount("Alice", 500);
deposit(acc1.id, 200);
withdraw(acc2.id, 100);
console.log(getBalance(acc1.id)); // Mehedi: $1200
console.log(getBalance(acc2.id)); // Alice: $400`} language="javascript" />
      </div>

      <Divider />

      {/* ── OOP ── */}
      <div className="mb-16">
        <TopicHeader number={2} title="OOP Approach" description="Data and actions are grouped together in a class. Each account is an independent object." color="emerald" />

        <EnhancedCodeBlock code={`// ─── OOP: Bank Account System ───

class BankAccount {
  #balance;
  static nextId = 1;

  constructor(owner, balance = 0) {
    this.id = BankAccount.nextId++;
    this.owner = owner;
    this.#balance = balance;
    console.log("Account created for " + owner);
  }

  deposit(amount) {
    if (amount <= 0) {
      console.log("❌ Amount must be positive!");
      return;
    }
    this.#balance += amount;
    console.log("✅ Deposited $" + amount + ". Balance: $" + this.#balance);
  }

  withdraw(amount) {
    if (amount <= 0) {
      console.log("❌ Amount must be positive!");
      return;
    }
    if (amount > this.#balance) {
      console.log("❌ Not enough money!");
      return;
    }
    this.#balance -= amount;
    console.log("✅ Withdrew $" + amount + ". Balance: $" + this.#balance);
  }

  getBalance() {
    return this.owner + ": $" + this.#balance;
  }

  transfer(toAccount, amount) {
    if (amount > this.#balance) {
      console.log("❌ Not enough money for transfer!");
      return;
    }
    this.withdraw(amount);
    toAccount.deposit(amount);
    console.log("💸 Transferred $" + amount + " from " + this.owner + " to " + toAccount.owner);
  }
}

// Using it
const acc1 = new BankAccount("Mehedi", 1000);
const acc2 = new BankAccount("Alice", 500);

acc1.deposit(200);            // ✅ Deposited $200. Balance: $1200
acc2.withdraw(100);           // ✅ Withdrew $100. Balance: $400
console.log(acc1.getBalance()); // Mehedi: $1200
acc1.transfer(acc2, 300);     // Transfer between objects!`} language="javascript" />
      </div>

      <Divider />

      {/* ── Comparison ── */}
      <div className="mb-16">
        <TopicHeader number={3} title="Honest Comparison" description='Neither approach is always "better". Each has strengths for different situations.' color="primary" />

        <ComparisonTable headers={["Aspect", "Procedural", "OOP"]} rows={[
          ["Code Organization", "Functions and data scattered", "Data + actions grouped in classes"],
          ["Data Protection", "Anyone can change any variable", "Private (#) fields protect data"],
          ["Reusability", "Copy-paste functions", "Create objects from classes"],
          ["Scalability", "Gets messy with 1000+ lines", "Stays organized even with large code"],
          ["Learning Curve", "Easier to start", "Harder to learn, but pays off"],
          ["Best For", "Small scripts, quick tasks", "Large apps, teams, complex systems"],
          ["Performance", "Slightly faster (no class overhead)", "Slightly slower (but negligible)"],
        ]} />

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="p-5 rounded-2xl bg-[#7f6fbe]/5 border border-[#7f6fbe]/10">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3">✅ Use Procedural When:</h5>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Small scripts (under 100 lines)</li>
              <li>• Quick automation tasks</li>
              <li>• Simple CLI tools</li>
              <li>• One-off data processing</li>
            </ul>
          </div>
          <div className="p-5 rounded-2xl bg-[#e7e9f5]/50 dark:bg-[#212a5d]/40 border border-[#b4b8d7] dark:border-[#212a5d]">
            <h5 className="font-bold text-[#344b8f] dark:text-[#7f6fbe] mb-3">✅ Use OOP When:</h5>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li>• Building web applications</li>
              <li>• Working in a team</li>
              <li>• Code needs to grow over time</li>
              <li>• Data needs protection</li>
              <li>• Using frameworks (NestJS, React, etc.)</li>
            </ul>
          </div>
        </div>

        <InfoCallout emoji="⚖️" title="Be honest — not everything needs OOP">
          <p>If you are writing a 20-line script to rename some files, creating a <code>FileRenamer</code> class is overkill. Use the right tool for the job. OOP shines in <strong>large, complex applications</strong> — not in simple scripts.</p>
        </InfoCallout>
      </div>

      <SummaryBox>
        Both procedural and OOP have their place. Procedural is simpler for small tasks. OOP is better for large, organized, maintainable applications. Use procedural for quick scripts. Use OOP when your code needs structure, data protection, and reusability.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck question="Is OOP always better than procedural programming?" answer="No! Procedural is better for small, simple scripts. OOP is better for large, complex applications that need organization, data protection, and reusability. Use the right tool for the job." />

    </SectionContainer>
  );
}
