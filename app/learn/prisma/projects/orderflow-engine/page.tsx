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
import { PRISMA_CAPSTONE } from "../../data/prisma-curriculum";

const CAPSTONE_SIMULATION_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// PRISMA CAPSTONE: ORDERFLOW ENTERPRISE DATA ACCESS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A comprehensive Prisma data access layer simulation demonstrating:
// 1. Multi-model relational architecture (User, Order, OrderItem, Product, Inventory)
// 2. Strict type-safe queries with selective field projections
// 3. Nested writes: Creating Order + OrderItems in a single declarative call
// 4. Interactive Transaction ($transaction) with inventory check & rollback
// 5. Handling Prisma known error codes (P2002 Unique Violation, P2025 Not Found)
// 6. Relation filtering with some/every/none avoiding N+1 roundtrips
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class PrismaClientSimulation {
  constructor() {
    this.users = [
      { id: 1, email: "alex@example.com", name: "Alex Mercer", role: "CUSTOMER" },
      { id: 2, email: "sarah@example.com", name: "Sarah Connor", role: "CUSTOMER" }
    ];
    this.products = [
      { id: 101, sku: "PROD-KB1", title: "Mechanical Keyboard", price: 129.99 },
      { id: 102, sku: "PROD-MS2", title: "Ergonomic Mouse", price: 59.99 },
      { id: 103, sku: "PROD-MAT3", title: "Desk Mat", price: 24.50 }
    ];
    this.inventory = [
      { productId: 101, stock: 15 },
      { productId: 102, stock: 4 },
      { productId: 103, stock: 30 }
    ];
    this.orders = [];
    this.orderItems = [];
    this.orderSeq = 8000;
  }

  // 1. Nested Write: Create Order with OrderItems atomically
  async createOrderWithItems(userId, lineItems) {
    console.log(\`\\n[1. NESTED WRITE] prisma.order.create({ data: { user: ..., items: { create: [...] } } })\`);
    
    // Simulate Prisma Client nested write validation
    const orderId = ++this.orderSeq;
    let total = 0;

    const createdItems = lineItems.map(item => {
      const prod = this.products.find(p => p.id === item.productId);
      if (!prod) throw new Error(\`Product \${item.productId} not found\`);
      total += prod.price * item.quantity;
      return {
        id: Math.floor(Math.random() * 10000),
        orderId,
        productId: item.productId,
        unitPrice: prod.price,
        quantity: item.quantity
      };
    });

    const newOrder = {
      id: orderId,
      userId,
      total: Number(total.toFixed(2)),
      status: "PENDING",
      createdAt: new Date().toISOString(),
      items: createdItems
    };

    this.orders.push(newOrder);
    this.orderItems.push(...createdItems);

    console.log(\`-> Order created successfully! ID: #\${orderId}, Total: $\${newOrder.total}\`);
    return newOrder;
  }

  // 2. Interactive Transaction: Check stock, debit inventory, finalize order with rollback
  async executeCheckoutTransaction(userId, itemsToBuy) {
    console.log(\`\\n[2. $transaction] Executing interactive checkout transaction...\`);
    console.log("-> BEGIN TRANSACTION;");

    // In a real app: await prisma.$transaction(async (tx) => { ... })
    const snapshotInventory = JSON.parse(JSON.stringify(this.inventory));

    try {
      // Step A: Validate stock for every item
      for (const item of itemsToBuy) {
        const inv = this.inventory.find(i => i.productId === item.productId);
        if (!inv || inv.stock < item.quantity) {
          throw new Error(\`[P2025 Error Simulation] Insufficient stock for product \${item.productId}! Available: \${inv ? inv.stock : 0}\`);
        }
      }

      // Step B: Debit inventory
      for (const item of itemsToBuy) {
        const inv = this.inventory.find(i => i.productId === item.productId);
        inv.stock -= item.quantity;
        console.log(\`   [tx.inventory.update] Product #\${item.productId} stock reduced to \${inv.stock}\`);
      }

      // Step C: Create order
      const order = await this.createOrderWithItems(userId, itemsToBuy);
      order.status = "COMPLETED";

      console.log("-> COMMIT TRANSACTION; -- Order and inventory changes committed atomically!");
      return { success: true, order };
    } catch (error) {
      // Rollback
      this.inventory = snapshotInventory;
      console.error(\`-> ROLLBACK TRANSACTION; Reason: \${error.message}\`);
      return { success: false, error: error.message };
    }
  }

  // 3. Relation Filter (where: { orders: { some: { status: 'COMPLETED' } } })
  findCustomersWithCompletedOrders() {
    console.log(\`\\n[3. RELATION FILTER] prisma.user.findMany({ where: { orders: { some: { status: 'COMPLETED' } } } })\`);
    const results = this.users.filter(u => 
      this.orders.some(o => o.userId === u.id && o.status === "COMPLETED")
    );
    console.log("Matched Customers:", results.map(u => ({ id: u.id, email: u.email })));
    return results;
  }
}

// ━━━ SIMULATION EXECUTION ━━━
const prisma = new PrismaClientSimulation();

// Scenario A: Successful purchase with adequate stock
console.log("--- TEST RUN 1: Adequate Stock ---");
await prisma.executeCheckoutTransaction(1, [
  { productId: 101, quantity: 2 },
  { productId: 103, quantity: 1 }
]);

// Scenario B: Excessive purchase triggering transaction rollback
console.log("\\n--- TEST RUN 2: Stock Depleted (Triggering Rollback) ---");
await prisma.executeCheckoutTransaction(2, [
  { productId: 102, quantity: 10 } // Only 4 available!
]);

// Scenario C: Filter users who placed completed orders
prisma.findCustomersWithCompletedOrders();`;

export default function PrismaCapstonePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "schema" | "transactions" | "migrations"
  >("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/learn/prisma"
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Prisma Curriculum</span>
          </Link>
        </div>

        {/* Hero Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 space-y-4 max-w-4xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold text-purple-400 uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
                Final Capstone
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                +{PRISMA_CAPSTONE.xpReward} XP Reward
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-slate-400">
                ⏱️ {PRISMA_CAPSTONE.estimatedMinutes} Mins
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {PRISMA_CAPSTONE.title} — {PRISMA_CAPSTONE.subtitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {PRISMA_CAPSTONE.desc}
            </p>
          </div>
        </section>

        {/* Capstone Content Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Architecture Overview" },
            { id: "schema", label: "Multi-Entity Prisma Schema" },
            { id: "transactions", label: "Interactive Transactions" },
            { id: "migrations", label: "Migrations & Deployment" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                activeTab === tab.id
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30"
                  : "bg-[#0E121B] text-slate-400 hover:text-white border border-white/[0.08] hover:border-purple-500/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column (2 Cols): Active Tab Code / Specs */}
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "overview" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">System Architecture & Responsibilities</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  The OrderFlow data access engine acts as the typed gateway between your backend application and database.
                  It enforces schema integrity, handles concurrent purchases through ACID transactions, prunes network payloads using lean selections,
                  and provides reproducible SQL migrations for continuous delivery.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-purple-300">Application Layer</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Issues business requests using type-safe Prisma Client methods. Never writes manual SQL strings.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-emerald-300">Prisma Query Engine</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Translates typed arguments into parameterized queries, pools database sockets, and serializes results.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "schema" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Declarative schema.prisma Contract</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum OrderStatus {
  PENDING
  COMPLETED
  CANCELLED
}

model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String
  orders    Order[]
  createdAt DateTime @default(now())
}

model Product {
  id         Int         @id @default(autoincrement())
  sku        String      @unique
  title      String
  price      Float
  inventory  Inventory?
  orderItems OrderItem[]
}

model Inventory {
  id        Int     @id @default(autoincrement())
  productId Int     @unique
  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  stock     Int     @default(0)
}

model Order {
  id        Int         @id @default(autoincrement())
  userId    Int
  user      User        @relation(fields: [userId], references: [id], onDelete: Restrict)
  status    OrderStatus @default(PENDING)
  total     Float
  items     OrderItem[]
  createdAt DateTime    @default(now())
}

model OrderItem {
  id        Int     @id @default(autoincrement())
  orderId   Int
  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  productId Int
  product   Product @relation(fields: [productId], references: [id])
  unitPrice Float
  quantity  Int
}`}
                </pre>
              </div>
            )}

            {activeTab === "transactions" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Interactive Checkout Transaction ($transaction)</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Interactive transactions ensure inventory checks, stock subtractions, and order creation execute inside
                  a single atomic database transaction. If any condition fails, all writes roll back instantly.
                </p>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`export async function checkout(userId: number, items: { productId: number; quantity: number }[]) {
  return await prisma.$transaction(async (tx) => {
    // 1. Validate and reserve stock
    for (const item of items) {
      const inv = await tx.inventory.findUnique({
        where: { productId: item.productId }
      });
      if (!inv || inv.stock < item.quantity) {
        throw new Error(\`Insufficient stock for product #\${item.productId}\`);
      }

      await tx.inventory.update({
        where: { productId: item.productId },
        data: { stock: { decrement: item.quantity } }
      });
    }

    // 2. Fetch product prices to calculate server-verified total
    const products = await tx.product.findMany({
      where: { id: { in: items.map(i => i.productId) } }
    });
    const total = items.reduce((sum, item) => {
      const p = products.find(prod => prod.id === item.productId)!;
      return sum + p.price * item.quantity;
    }, 0);

    // 3. Atomically create Order with nested line items
    const order = await tx.order.create({
      data: {
        userId,
        status: "COMPLETED",
        total,
        items: {
          create: items.map(item => {
            const p = products.find(prod => prod.id === item.productId)!;
            return {
              productId: item.productId,
              unitPrice: p.price,
              quantity: item.quantity
            };
          })
        }
      },
      include: { items: true }
    });

    return order;
  });
}`}
                </pre>
              </div>
            )}

            {activeTab === "migrations" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Safe Migration Pipeline: Development to Production</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`# 1. Local Development (Interactive, generates migration file & client)
$ npx prisma migrate dev --name init_orderflow_schema

# 2. Schema formatting & validation check
$ npx prisma format
$ npx prisma validate

# 3. Production CI/CD Pipeline (Non-interactive, zero prompt, safe execution)
$ npx prisma migrate deploy

# 4. Optional: Seed initial product catalog
$ npx prisma db seed`}
                </pre>
              </div>
            )}

            {/* Interactive Simulation Playground */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Interactive Prisma Engine Simulator</h3>
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
                {PRISMA_CAPSTONE.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Prisma Mastery Achieved!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By completing the lessons and this capstone, you have demonstrated comprehensive competency
                in declarative schema modeling, Prisma Client CRUD, relational filtering, atomic nested writes,
                ACID transactions, and safe schema migrations.
              </p>
              <Link
                href="/learn/prisma/pri01-what-is-prisma"
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
