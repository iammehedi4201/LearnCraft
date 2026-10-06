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
  Leaf,
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
      return { success: false, reason: "OUT_OF_STOCK" };
    }
  }

  // Deduct stock and commit new order document
  let orderTotal = 0;
  cartItems.forEach(item => {
    const product = products.find(p => p._id === item.productId);
    product.stock -= item.quantity;
    orderTotal += product.price * item.quantity;
  });

  const newOrder = {
    _id: "ord_" + Math.floor(Math.random() * 9000 + 1000),
    customerId,
    status: "completed",
    createdAt: new Date(),
    items: cartItems.map(i => {
      const p = products.find(prod => prod._id === i.productId);
      return { productId: p._id, title: p.title, price: p.price, quantity: i.quantity };
    }),
    totalAmount: Math.round(orderTotal * 100) / 100
  };
  orders.push(newOrder);

  console.log("TRANSACTION COMMITTED ✓");
  console.log("Created Order:", newOrder._id, "Total: $" + newOrder.totalAmount);
  return { success: true, orderId: newOrder._id };
}

// Test Checkout Transaction
executeCheckoutTransaction("usr_01", [{ productId: "prd_103", quantity: 3 }]);
console.log("Remaining stock for prd_103:", products.find(p => p._id === "prd_103").stock);
`;

export default function MongodbCapstonePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "schema" | "aggregation" | "indexing" | "transactions"
  >("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-ds-bg-weak text-ds-text-strong selection:bg-ds-feature-light/20 overflow-x-hidden transition-colors duration-300">
      <Nav />

      <main className="max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
        {/* Back Link & Header */}
        <div className="space-y-4">
          <Link
            href="/learn/mongodb"
            className="inline-flex items-center gap-2 text-xs font-bold text-ds-text-soft hover:text-ds-feature-dark transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to MongoDB Curriculum</span>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-ds-stroke-soft">
            <div className="space-y-2 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 text-xs font-bold border border-emerald-500/30">
                <Leaf className="w-3.5 h-3.5" />
                <span>Final Database Capstone</span>
                <span className="text-emerald-400">·</span>
                <span>400 XP</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-ds-text-strong tracking-tight font-display">
                {MONGODB_CAPSTONE.title}
              </h1>
              <p className="text-sm sm:text-base text-ds-text-sub leading-relaxed font-normal">
                {MONGODB_CAPSTONE.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-ds-stroke-soft">
          {[
            { id: "overview", label: "Overview & Requirements" },
            { id: "schema", label: "Document Schemas & $jsonSchema" },
            { id: "aggregation", label: "Sales Analytics Aggregation" },
            { id: "indexing", label: "Compound Indexing (ESR Rule)" },
            { id: "transactions", label: "ACID Checkout Transactions" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-ds-feature-base text-ds-static-white shadow-sm shadow-ds-feature-base/20"
                  : "bg-ds-bg-white text-ds-text-sub hover:text-ds-text-strong border border-ds-stroke-soft"
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
              <div className="p-6 sm:p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
                <h2 className="text-xl font-bold text-ds-text-strong">Architecture Specifications</h2>
                <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
                  ShopSphere is an enterprise multi-vendor e-commerce platform. It requires balanced data modeling: customer identities are stored centrally, but order documents embed product price and title snapshots at the moment of checkout to guarantee that historical reports are never skewed if a vendor changes prices later.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-2">
                    <span className="text-xs font-bold text-ds-feature-dark">Embedded Subdocuments</span>
                    <p className="text-xs text-ds-text-sub leading-relaxed">
                      Line items, line discounts, and shipping addresses are embedded directly inside orders to ensure single-read atomicity.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft space-y-2">
                    <span className="text-xs font-bold text-emerald-400">Referenced Relationships</span>
                    <p className="text-xs text-ds-text-sub leading-relaxed">
                      Users, payment authorizations, and catalog categories are referenced via ObjectIds to allow independent account management.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interactive Simulation Playground */}
              <div className="p-6 sm:p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-ds-text-strong">Interactive Database Engine Simulator</h3>
                  <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    Live Engine Simulation
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-ds-stroke-soft">
                  <Playground runtime="javascript" starterCode={CAPSTONE_SIMULATION_CODE} height="480px" />
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-6">
              <div className="p-6 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-4">
                <h3 className="text-base font-bold text-ds-text-strong">Verification Checklist</h3>
                <div className="space-y-3">
                  {MONGODB_CAPSTONE.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-ds-text-sub leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-ds-feature-lighter border border-ds-feature-base/20 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-wider text-ds-feature-dark font-bold block">
                  Capstone Evaluation
                </span>
                <h4 className="text-sm font-bold text-ds-text-strong">
                  Database Reasoning & Engineering
                </h4>
                <p className="text-xs text-ds-text-sub leading-relaxed">
                  Completing this capstone demonstrates mastery of document design, aggregation processing, query optimization, and transaction safety.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Schema */}
        {activeTab === "schema" && (
          <div className="p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-ds-text-strong">Production Collection Schemas with $jsonSchema</h2>
            <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
              Enforce structural integrity at the MongoDB engine layer to prevent malformed documents:
            </p>

            <pre className="p-5 rounded-2xl bg-ds-bg-soft border border-ds-stroke-soft text-xs font-mono text-ds-text-strong overflow-x-auto leading-relaxed">
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
          <div className="p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-ds-text-strong">Sales Analytics Aggregation Pipeline</h2>
            <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
              Multi-stage pipeline calculating quarterly revenue per product category with $lookup customer joining:
            </p>

            <pre className="p-5 rounded-2xl bg-ds-bg-soft border border-ds-stroke-soft text-xs font-mono text-ds-text-strong overflow-x-auto leading-relaxed">
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
          <div className="p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-ds-text-strong">Compound Index Strategy (The ESR Rule)</h2>
            <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
              High-frequency query: Customer order history filtered by customer ID, ordered by date, within status ranges.
            </p>

            <pre className="p-5 rounded-2xl bg-ds-bg-soft border border-ds-stroke-soft text-xs font-mono text-ds-text-strong overflow-x-auto leading-relaxed">
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
          <div className="p-8 rounded-3xl bg-ds-bg-white border border-ds-stroke-soft shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-ds-text-strong">Atomic Multi-Document Checkout Transaction</h2>
            <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed">
              Execute order creation and inventory deductions atomically inside a single ClientSession:
            </p>

            <pre className="p-5 rounded-2xl bg-ds-bg-soft border border-ds-stroke-soft text-xs font-mono text-ds-text-strong overflow-x-auto leading-relaxed">
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
