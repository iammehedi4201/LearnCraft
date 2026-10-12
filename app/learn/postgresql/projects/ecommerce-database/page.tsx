"use client";

import { useState } from "react";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/app/learn/components/Footer";
import { InteractiveGrid } from "@/components/interactive-grid";
import { Playground } from "@/components/playground/Playground";
import {
  ArrowLeft,
  CheckCircle2,
} from "../../components/icons";
import { POSTGRESQL_CAPSTONE } from "../../data/postgresql-curriculum";

const CAPSTONE_SIMULATION_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// POSTGRESQL CAPSTONE: SHOPSPHERE RELATIONAL DATABASE & ANALYTICS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A comprehensive PostgreSQL production database simulation demonstrating:
// 1. 3NF Normalized relational schema (users, products, orders, order_items, inventory)
// 2. Database constraints (CHECK price > 0, stock >= 0, UNIQUE email, NOT NULL)
// 3. Referential integrity actions (ON DELETE RESTRICT vs ON DELETE CASCADE)
// 4. Idempotent inventory replenishment with ON CONFLICT (product_id) DO UPDATE
// 5. Multi-step ACID checkout transaction with row locking (SELECT ... FOR UPDATE)
// 6. Advanced reporting using Common Table Expressions (CTEs) & Window Functions
// 7. Compound B-Tree index optimization and EXPLAIN ANALYZE execution inspection
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class RelationalDatabaseEngine {
  constructor() {
    this.tables = {
      users: [
        { id: 1, email: "alex@example.com", name: "Alex Mercer", role: "customer" },
        { id: 2, email: "sarah@example.com", name: "Sarah Connor", role: "customer" }
      ],
      products: [
        { id: 101, sku: "TECH-KB1", title: "Mechanical Keyboard", price: 129.99, category: "hardware" },
        { id: 102, sku: "TECH-MS2", title: "Ergonomic Mouse", price: 59.99, category: "hardware" },
        { id: 103, sku: "ACC-MAT3", title: "Desk Mat", price: 24.50, category: "accessories" }
      ],
      inventory: [
        { product_id: 101, stock: 15 },
        { product_id: 102, stock: 8 },
        { product_id: 103, stock: 25 }
      ],
      orders: [],
      order_items: []
    };
    this.orderSeq = 5000;
  }

  // 1. Idempotent Upsert (INSERT ... ON CONFLICT DO UPDATE)
  upsertInventory(productId, addedStock) {
    console.log(\`\\n[1. UPSERT] Replenishing product \${productId} by +\${addedStock} units...\`);
    const existing = this.tables.inventory.find(i => i.product_id === productId);
    if (existing) {
      existing.stock += addedStock;
      console.log(\`-> Updated existing stock to \${existing.stock}\`);
      return existing;
    } else {
      const newRecord = { product_id: productId, stock: addedStock };
      this.tables.inventory.push(newRecord);
      console.log(\`-> Inserted new inventory record with stock \${newRecord.stock}\`);
      return newRecord;
    }
  }

  // 2. ACID Multi-Step Checkout Transaction with Row Locking
  executeCheckoutTransaction(userId, itemsToBuy) {
    console.log(\`\\n[2. ACID TRANSACTION] Starting Checkout for User #\${userId}...\`);
    console.log("BEGIN TRANSACTION ISOLATION LEVEL READ COMMITTED;");

    try {
      // Step A: Acquire exclusive row locks on inventory (SELECT ... FOR UPDATE)
      console.log("Step A: Locking inventory rows (SELECT * FROM inventory WHERE product_id IN (...) FOR UPDATE)");
      for (const item of itemsToBuy) {
        const inv = this.tables.inventory.find(i => i.product_id === item.productId);
        if (!inv || inv.stock < item.quantity) {
          throw new Error(\`Insufficient stock for product #\${item.productId}! Available: \${inv ? inv.stock : 0}\`);
        }
      }

      // Step B: Deduct stock atomically
      console.log("Step B: Deducting inventory stock...");
      let calculatedTotal = 0;
      for (const item of itemsToBuy) {
        const prod = this.tables.products.find(p => p.id === item.productId);
        const inv = this.tables.inventory.find(i => i.product_id === item.productId);
        inv.stock -= item.quantity;
        calculatedTotal += prod.price * item.quantity;
      }

      // Step C: Insert Order with RETURNING id
      const newOrderId = ++this.orderSeq;
      const order = {
        id: newOrderId,
        user_id: userId,
        status: "completed",
        total: Number(calculatedTotal.toFixed(2)),
        created_at: new Date().toISOString()
      };
      this.tables.orders.push(order);
      console.log(\`Step C: Created Order #\${newOrderId} with total $\${order.total}\`);

      // Step D: Insert line items referencing foreign key
      for (const item of itemsToBuy) {
        const prod = this.tables.products.find(p => p.id === item.productId);
        this.tables.order_items.push({
          order_id: newOrderId,
          product_id: item.productId,
          unit_price: prod.price,
          quantity: item.quantity
        });
      }

      console.log("COMMIT; -- Transaction successfully finalized without anomalies");
      return order;
    } catch (err) {
      console.error(\`ROLLBACK; -- Transaction aborted: \${err.message}\`);
      return null;
    }
  }

  // 3. Analytics Report using CTE & Window Functions
  runExecutiveReport() {
    console.log("\\n[3. ANALYTICAL SQL] Running Multi-Table Joins & CTE Report...");
    const report = this.tables.orders.map(o => {
      const u = this.tables.users.find(user => user.id === o.user_id);
      const items = this.tables.order_items.filter(oi => oi.order_id === o.id);
      return {
        orderId: o.id,
        customerName: u.name,
        customerEmail: u.email,
        itemCount: items.reduce((sum, i) => sum + i.quantity, 0),
        totalRevenue: o.total
      };
    });
    console.log("Results (CTEs + Window DENSE_RANK simulation):", report);
    return report;
  }

  // 4. Index Simulation with EXPLAIN ANALYZE
  simulateExplainAnalyze() {
    console.log("\\n[4. EXPLAIN ANALYZE] Query Plan Execution Inspection:");
    console.log("QUERY: EXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'completed' ORDER BY created_at DESC;");
    console.log("-> Index Scan using idx_orders_status_date on orders (cost=0.15..8.25 rows=12 width=64)");
    console.log("   Index Cond: (status = 'completed'::text)");
    console.log("   Planning Time: 0.082 ms");
    console.log("   Execution Time: 0.041 ms (B-Tree index avoids full table sequential scan)");
  }
}

// Execution Demonstration
const shopDb = new RelationalDatabaseEngine();

// 1. Replenish inventory
shopDb.upsertInventory(101, 10);

// 2. Execute atomic checkout
shopDb.executeCheckoutTransaction(1, [
  { productId: 101, quantity: 2 },
  { productId: 102, quantity: 1 }
]);

// 3. Run analytics
shopDb.runExecutiveReport();

// 4. Explain plan
shopDb.simulateExplainAnalyze();
`;

export default function PostgreSQLCapstonePage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<"overview" | "schema" | "acid" | "analytics">("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/learn/postgresql" className="inline-flex items-center gap-1 hover:text-purple-300 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to PostgreSQL Hub</span>
          </Link>
          <span>/</span>
          <span className="text-white font-bold">Capstone Project</span>
        </nav>

        {/* Hero Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              PostgreSQL Capstone Project
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              +{POSTGRESQL_CAPSTONE.xpReward} XP Reward
            </span>
            <span className="text-xs font-mono text-slate-400">
              ⏱️ ~{POSTGRESQL_CAPSTONE.estimatedMinutes} mins
            </span>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              {POSTGRESQL_CAPSTONE.title}
            </h1>
            <p className="text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {POSTGRESQL_CAPSTONE.desc}
            </p>
          </div>

          {/* Interactive Specification Tabs */}
          <div className="relative z-10 flex items-center gap-2 pt-4 border-t border-white/[0.08] overflow-x-auto">
            {[
              { id: "overview", label: "Overview & Requirements" },
              { id: "schema", label: "Normalized 3NF Schema" },
              { id: "acid", label: "ACID Checkout Transaction" },
              { id: "analytics", label: "Analytics & EXPLAIN Plan" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                    : "text-slate-400 hover:text-white hover:bg-white/[0.04] border border-transparent"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tab Content & Playground Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column (2 Cols): Dynamic Tab Info + Code Playground */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Capstone Objective</h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Design a rock-solid, production-ready PostgreSQL database for an e-commerce platform.
                  Ensure zero negative inventory counts via CHECK constraints, guarantee referential integrity
                  with foreign keys, handle concurrent checkouts atomically with transactions, and optimize queries with B-Tree indexes.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {POSTGRESQL_CAPSTONE.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400">
                      <span className="text-purple-400 font-bold">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">3NF Relational Blueprint</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`-- Core Tables with Constraints
CREATE TABLE users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  sku VARCHAR(64) NOT NULL UNIQUE,
  title TEXT NOT NULL,
  price NUMERIC(10, 2) NOT NULL CHECK (price > 0)
);

CREATE TABLE inventory (
  product_id BIGINT PRIMARY KEY REFERENCES products(id) ON DELETE CASCADE,
  stock INT NOT NULL CHECK (stock >= 0)
);

CREATE TABLE orders (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES users(id) ON DELETE RESTRICT,
  total NUMERIC(10, 2) NOT NULL CHECK (total >= 0),
  status VARCHAR(32) NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  order_id BIGINT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id BIGINT NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  unit_price NUMERIC(10, 2) NOT NULL,
  quantity INT NOT NULL CHECK (quantity > 0),
  PRIMARY KEY (order_id, product_id)
);`}
                </pre>
              </div>
            )}

            {activeTab === "acid" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">ACID Inventory Checkout</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Row locking with <code>SELECT ... FOR UPDATE</code> serializes concurrent purchases on identical product items,
                  preventing overselling during flash sales.
                </p>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`BEGIN;

-- 1. Lock inventory rows exclusively
SELECT stock FROM inventory 
WHERE product_id = 101 FOR UPDATE;

-- 2. Deduct inventory
UPDATE inventory 
SET stock = stock - 2 
WHERE product_id = 101;

-- 3. Create order and fetch generated ID immediately
INSERT INTO orders (user_id, total, status)
VALUES (1, 259.98, 'completed')
RETURNING id;

-- 4. Insert line items
INSERT INTO order_items (order_id, product_id, unit_price, quantity)
VALUES (curr_order_id, 101, 129.99, 2);

COMMIT;`}
                </pre>
              </div>
            )}

            {activeTab === "analytics" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">CTEs, Window Functions & Index Plans</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`-- Compound index on high-frequency query pattern
CREATE INDEX idx_orders_status_date ON orders (status, created_at DESC);

-- Executive Analytical Pipeline
WITH customer_aggregates AS (
  SELECT o.user_id, u.name, 
         COUNT(o.id) AS total_orders,
         SUM(o.total) AS total_revenue
  FROM orders o
  JOIN users u ON u.id = o.user_id
  WHERE o.status = 'completed'
  GROUP BY o.user_id, u.name
)
SELECT name, total_orders, total_revenue,
       DENSE_RANK() OVER (ORDER BY total_revenue DESC) AS spending_rank
FROM customer_aggregates;

-- Verify query optimization
EXPLAIN (ANALYZE, BUFFERS)
SELECT * FROM orders WHERE status = 'completed' ORDER BY created_at DESC LIMIT 10;`}
                </pre>
              </div>
            )}

            {/* Interactive Simulation Playground */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Interactive Database Engine Simulator</h3>
                <span className="text-xs font-mono text-purple-300 font-bold bg-purple-500/10 px-2.5 py-0.5 rounded-full border border-purple-500/20">
                  Live Engine Simulation
                </span>
              </div>
              <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                <Playground runtime="javascript" starterCode={CAPSTONE_SIMULATION_CODE} height="480px" />
              </div>
            </div>
          </div>

          {/* Right Column (1 Col): Verification Checklist & Next Steps */}
          <div className="space-y-6">
            <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Verification Checklist</h3>
              <div className="space-y-3">
                {POSTGRESQL_CAPSTONE.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">PostgreSQL Mastery Achieved!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By completing the lessons and this capstone, you have demonstrated comprehensive competency
                in relational data modeling, query optimization, ACID transactions, and production PostgreSQL best practices.
              </p>
              <Link
                href="/learn/postgresql/pg01-what-is-postgresql"
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs text-center block transition-all shadow-md shadow-purple-600/20 cursor-pointer"
              >
                Review Course from Lesson 1
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
