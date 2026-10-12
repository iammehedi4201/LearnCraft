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
import { MONGODB_CAPSTONE } from "../../data/mongodb-curriculum";

const CAPSTONE_SIMULATION_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MONGODB CAPSTONE: SHOPSPHERE DATABASE & ANALYTICS ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// A comprehensive MongoDB data architecture simulation demonstrating:
// 1. Balanced schema design (Embedded order items + Referenced customer IDs)
// 2. Document schema validation enforcing required fields and positive pricing
// 3. Compound index strategy following the Equality, Sort, Range (ESR) rule
// 4. Multi-stage analytical aggregation pipelines ($match, $unwind, $group, $sort)
// 5. Atomic multi-document checkout transaction simulation
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// 1. Initial Collections Dataset
const users = [
  { _id: "usr_01", name: "Sarah Ahmed", email: "sarah@example.com", tier: "gold" },
  { _id: "usr_02", name: "David Kim", email: "david@example.com", tier: "standard" },
];

const products = [
  { _id: "prd_101", title: "Ergonomic Mechanical Keyboard", category: "electronics", price: 149.99, stock: 12 },
  { _id: "prd_102", title: "Noise-Cancelling Studio Headphones", category: "audio", price: 299.99, stock: 5 },
  { _id: "prd_103", title: "USB-C Multiport Docking Hub", category: "electronics", price: 89.99, stock: 20 },
];

const orders = [
  {
    _id: "ord_9001",
    customerId: "usr_01", // Referenced customer
    status: "completed",
    createdAt: new Date("2026-03-01T10:00:00Z"),
    // Embedded Order Item Snapshots (prevents historical price drift)
    items: [
      { productId: "prd_101", title: "Ergonomic Mechanical Keyboard", price: 149.99, quantity: 1 },
      { productId: "prd_103", title: "USB-C Multiport Docking Hub", price: 89.99, quantity: 2 }
    ],
    totalAmount: 329.97,
    shippingAddress: { city: "Dhaka", country: "Bangladesh" }
  },
  {
    _id: "ord_9002",
    customerId: "usr_02",
    status: "completed",
    createdAt: new Date("2026-03-02T14:30:00Z"),
    items: [
      { productId: "prd_102", title: "Noise-Cancelling Studio Headphones", price: 299.99, quantity: 1 }
    ],
    totalAmount: 299.99,
    shippingAddress: { city: "Seoul", country: "South Korea" }
  }
];

console.log("=== 1. DOCUMENT REPOSITORIES INITIALIZED ===");
console.log(\`Users: \${users.length} | Products: \${products.length} | Orders: \${orders.length}\`);

// 2. Analytical Sales Pipeline Simulation ($unwind -> $group -> $sort)
console.log("\\n=== 2. RUNNING MULTI-STAGE REVENUE AGGREGATION ===");

// Stage 1: $match completed orders
const completedOrders = orders.filter(o => o.status === "completed");

// Stage 2: $unwind embedded items array
const unrolledItems = completedOrders.flatMap(o => o.items);

// Stage 3: $group by product and accumulate revenue
const revenueByProduct = unrolledItems.reduce((acc, item) => {
  if (!acc[item.productId]) {
    acc[item.productId] = { title: item.title, totalUnitsSold: 0, totalRevenue: 0 };
  }
  acc[item.productId].totalUnitsSold += item.quantity;
  acc[item.productId].totalRevenue += item.price * item.quantity;
  return acc;
}, {});

console.log("Analytics Report (Revenue by Product):", revenueByProduct);

// 3. Atomic Multi-Document Checkout Transaction Simulation
console.log("\\n=== 3. EXECUTING ATOMIC CHECKOUT TRANSACTION ===");

function executeCheckoutTransaction(customerId, cartItems) {
  console.log(\`Initiating ClientSession for customer: \${customerId}\`);
  
  // Verify inventory stock for all cart items atomically
  for (const item of cartItems) {
    const product = products.find(p => p._id === item.productId);
    if (!product || product.stock < item.quantity) {
      console.error(\`TRANSACTION ABORTED: Insufficient stock for \${item.productId}\`);
      return false;
    }
  }

  // Deduct inventory
  for (const item of cartItems) {
    const product = products.find(p => p._id === item.productId);
    product.stock -= item.quantity;
    console.log(\`✓ Deducted \${item.quantity} units from \${product.title}. Remaining: \${product.stock}\`);
  }

  // Record order
  const newOrderId = "ord_" + (orders.length + 9001);
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  orders.push({
    _id: newOrderId,
    customerId,
    status: "completed",
    createdAt: new Date(),
    items: cartItems,
    totalAmount: total,
    shippingAddress: { city: "Dhaka", country: "Bangladesh" }
  });

  console.log(\`✓ Order \${newOrderId} successfully recorded with total $\${total.toFixed(2)}\`);
  console.log("TRANSACTION COMMITTED TO CLUSTER.");
  return true;
}

executeCheckoutTransaction("usr_01", [
  { productId: "prd_101", title: "Ergonomic Mechanical Keyboard", price: 149.99, quantity: 2 }
]);

// 4. Index Evaluation Report
console.log("\\n=== 4. COMPOUND INDEX EVALUATION (ESR RULE) ===");
console.log("Index candidate: { customerId: 1, createdAt: -1, status: 1 }");
console.log("Equality filter: customerId matches accurately (E)");
console.log("Sort operator: createdAt descending uses index directly without in-memory sort (S)");
console.log("Range check: status: { $in: [...] } evaluated last (R)");
console.log("Execution winning plan: IXSCAN on index with 0 documents examined outside target set.");
`;

export default function MongoDBCapstonePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "schema" | "aggregation" | "indexing" | "transactions"
  >("overview");

  const tabs: { id: typeof activeTab; label: string }[] = [
    { id: "overview", label: "Architecture Overview" },
    { id: "schema", label: "Schema Validation ($jsonSchema)" },
    { id: "aggregation", label: "Sales Analytics Pipeline" },
    { id: "indexing", label: "Compound Index Strategy (ESR)" },
    { id: "transactions", label: "Atomic Checkout Transaction" },
  ];

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 selection:bg-purple-500/20 selection:text-purple-200 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs text-slate-400">
          <Link href="/roadmaps" className="hover:text-purple-300 transition-colors font-medium">
            Roadmaps
          </Link>
          <span>/</span>
          <Link href="/learn/mongodb" className="hover:text-purple-300 transition-colors font-medium">
            MongoDB
          </Link>
          <span>/</span>
          <span className="text-white font-bold">Capstone Project</span>
        </nav>

        {/* Hero Banner */}
        <section className="p-8 sm:p-10 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-2xl relative overflow-hidden space-y-4">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-purple-300 bg-purple-500/10 border border-purple-500/20 px-3 py-1 rounded-full">
              Phase 11 · Capstone Project
            </span>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 font-bold">
              +{MONGODB_CAPSTONE.xpReward} XP
            </span>
            <span className="text-xs font-mono text-slate-400">
              ⏱️ ~{MONGODB_CAPSTONE.estimatedMinutes} mins
            </span>
          </div>

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight font-display">
              {MONGODB_CAPSTONE.title}
            </h1>
            <p className="text-base text-slate-300 mt-2 max-w-3xl leading-relaxed">
              {MONGODB_CAPSTONE.desc}
            </p>
          </div>

          <div className="relative z-10 pt-4 flex items-center gap-3">
            <Link
              href="/learn/mongodb"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white px-4 py-2.5 rounded-xl border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.06] transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to MongoDB Curriculum</span>
            </Link>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-4 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
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

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-white">Architecture Specifications</h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  ShopSphere is an enterprise multi-vendor e-commerce platform. It requires balanced data modeling: customer identities are stored centrally, but order documents embed product price and title snapshots at the moment of checkout to guarantee that historical reports are never skewed if a vendor changes prices later.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-purple-300">Embedded Subdocuments</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Line items, line discounts, and shipping addresses are embedded directly inside orders to ensure single-read atomicity.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-emerald-400">Referenced Relationships</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Users, payment authorizations, and catalog categories are referenced via ObjectIds to allow independent account management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Simulation Playground */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-white">Interactive Database Engine Simulator</h3>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Live Engine Simulation
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/[0.08]">
                  <Playground runtime="javascript" starterCode={CAPSTONE_SIMULATION_CODE} height="480px" />
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-base font-bold text-white">Verification Checklist</h3>
                <div className="space-y-3">
                  {MONGODB_CAPSTONE.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-300 font-bold block">
                  Capstone Evaluation
                </span>
                <h4 className="text-sm font-bold text-white">
                  Database Reasoning & Engineering
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Completing this capstone demonstrates mastery of document design, aggregation processing, query optimization, and transaction safety.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Schema */}
        {activeTab === "schema" && (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-white">Production Collection Schemas with $jsonSchema</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enforce structural integrity at the MongoDB engine layer to prevent malformed documents:
            </p>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`// MongoDB JSON Schema Validator Rule for Orders Collection
db.createCollection("orders", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["customerId", "items", "totalAmount", "status", "createdAt"],
      properties: {
        customerId: {
          bsonType: "string",
          description: "Must be a valid user identifier string"
        },
        status: {
          enum: ["pending", "processing", "completed", "cancelled"],
          description: "Must be one of the enumerated order states"
        },
        totalAmount: {
          bsonType: ["double", "decimal"],
          minimum: 0,
          description: "Total invoice price must be positive"
        },
        items: {
          bsonType: "array",
          minItems: 1,
          items: {
            bsonType: "object",
            required: ["productId", "title", "price", "quantity"],
            properties: {
              productId: { bsonType: "string" },
              title: { bsonType: "string" },
              price: { bsonType: ["double", "decimal"], minimum: 0 },
              quantity: { bsonType: "int", minimum: 1 }
            }
          }
        }
      }
    }
  },
  validationAction: "error"
});`}
            </pre>
          </div>
        )}

        {/* Tab 3: Aggregation */}
        {activeTab === "aggregation" && (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-white">Sales Analytics Aggregation Pipeline</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Multi-stage pipeline calculating quarterly revenue per product category with $lookup customer joining:
            </p>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`// Analytics Pipeline: Revenue by Category
db.orders.aggregate([
  // Stage 1: Only consider finalized sales
  { $match: { status: "completed" } },

  // Stage 2: Deconstruct order items array
  { $unwind: "$items" },

  // Stage 3: Join with products to retrieve up-to-date category labels
  {
    $lookup: {
      from: "products",
      localField: "items.productId",
      foreignField: "_id",
      as: "productDetails"
    }
  },

  // Stage 4: Unwind joined product array
  { $unwind: "$productDetails" },

  // Stage 5: Group by category and compute totals
  {
    $group: {
      _id: "$productDetails.category",
      totalRevenue: {
        $sum: { $multiply: ["$items.price", "$items.quantity"] }
      },
      totalItemsSold: { $sum: "$items.quantity" },
      ordersCount: { $addToSet: "$_id" }
    }
  },

  // Stage 6: Sort by highest grossing category
  { $sort: { totalRevenue: -1 } }
]);`}
            </pre>
          </div>
        )}

        {/* Tab 4: Indexing */}
        {activeTab === "indexing" && (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-white">Compound Index Strategy (The ESR Rule)</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              High-frequency query: Customer order history filtered by customer ID, ordered by date, within status ranges.
            </p>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`// Target Query Pattern:
db.orders.find({
  customerId: "usr_01",              // 1. Equality filter
  status: { $in: ["pending", "completed"] } // 3. Range / Multi-value filter
}).sort({ createdAt: -1 });          // 2. Sort order

// The Optimal Compound Index adhering strictly to Equality -> Sort -> Range (ESR):
db.orders.createIndex({
  customerId: 1,  // E (Equality)
  createdAt: -1,  // S (Sort)
  status: 1       // R (Range)
});

// Verification via explain():
// Winning plan: IXSCAN with totalDocsExamined equal to nReturned (Zero in-memory sort)`}
            </pre>
          </div>
        )}

        {/* Tab 5: Transactions */}
        {activeTab === "transactions" && (
          <div className="p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-white">Atomic Multi-Document Checkout Transaction</h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Execute order creation and inventory deductions atomically inside a single ClientSession:
            </p>

            <pre className="p-5 rounded-2xl bg-slate-950 border border-white/[0.08] text-xs font-mono text-slate-200 overflow-x-auto leading-relaxed">
{`// Multi-Document Transaction using ClientSession
async function processOrderCheckout(client, customerId, cartItems) {
  const session = client.startSession();

  try {
    await session.withTransaction(async () => {
      // 1. Deduct stock for all items
      for (const item of cartItems) {
        const updateRes = await db.products.updateOne(
          { _id: item.productId, stock: { $gte: item.quantity } },
          { $inc: { stock: -item.quantity } },
          { session }
        );

        if (updateRes.matchedCount === 0) {
          throw new Error(\`Insufficient stock for item: \${item.productId}\`);
        }
      }

      // 2. Insert new order record
      await db.orders.insertOne(
        {
          customerId,
          items: cartItems,
          status: "completed",
          createdAt: new Date()
        },
        { session }
      );
    });

    console.log("Transaction successfully committed!");
  } finally {
    await session.endSession();
  }
}`}
            </pre>
          </div>
        )}
      </main>

      <Footer />
    </InteractiveGrid>
  );
}
