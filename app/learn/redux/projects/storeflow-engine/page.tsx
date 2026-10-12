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
import { REDUX_CAPSTONE } from "../../data/redux-curriculum";

const CAPSTONE_SIMULATION_CODE = `// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// REDUX CAPSTONE: STOREFLOW ENTERPRISE STATE MANAGEMENT ENGINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Complete simulation of an industrial Redux Toolkit state architecture:
// 1. Centralized Store with multi-slice composition (Auth, Catalog, Cart, UI)
// 2. Pure reducers & immutable state updates via Immer proxy semantics
// 3. createAsyncThunk asynchronous orchestration (pending, fulfilled, rejected)
// 4. Normalized entity dictionary (byId / allIds) avoiding data duplication
// 5. Memoized selector composition (createSelector caching)
// 6. Action telemetry & state tracing middleware (DevTools event pipe)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// ── 1. CUSTOM TELEMETRY MIDDLEWARE ──────────────────────────────────────
const createTelemetryMiddleware = (actionHistory) => (store) => (next) => (action) => {
  const prevState = store.getState();
  const result = next(action);
  const nextState = store.getState();

  actionHistory.push({
    actionType: action.type,
    payload: action.payload,
    timestamp: new Date().toISOString(),
    stateChanged: prevState !== nextState
  });

  console.log(\`[DISPATCH] \${action.type}\`, action.payload ? action.payload : "");
  return result;
};

// ── 2. STORE IMPLEMENTATION ENGINE ──────────────────────────────────────
class StoreFlowEngine {
  constructor() {
    this.actionHistory = [];
    this.telemetry = createTelemetryMiddleware(this.actionHistory);

    // Initial normalized state tree
    this.state = {
      auth: { isAuthenticated: false, user: null, token: null },
      catalog: { byId: {}, allIds: [], status: "idle", error: null },
      cart: { items: {}, totalCount: 0 },
      ui: { notifications: [], pendingOperations: 0 }
    };

    // Memoization cache for selectors
    this.selectorCache = new Map();
  }

  getState() {
    return this.state;
  }

  // Pure Reducer Dispatch Pipeline
  dispatch(action) {
    const rawDispatch = (act) => {
      // In Redux Toolkit, reducers receive the current state and return or mutate via Immer
      const nextAuth = this.authReducer(this.state.auth, act);
      const nextCatalog = this.catalogReducer(this.state.catalog, act);
      const nextCart = this.cartReducer(this.state.cart, act);
      const nextUi = this.uiReducer(this.state.ui, act);

      this.state = {
        auth: nextAuth,
        catalog: nextCatalog,
        cart: nextCart,
        ui: nextUi
      };
      return act;
    };

    // Run through telemetry middleware pipeline
    return this.telemetry(this)(rawDispatch)(action);
  }

  // ── SLICE REDUCERS ────────────────────────────────────────────────────
  authReducer(state, action) {
    switch (action.type) {
      case "auth/loginSuccess":
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token
        };
      case "auth/logout":
        return { isAuthenticated: false, user: null, token: null };
      default:
        return state;
    }
  }

  catalogReducer(state, action) {
    switch (action.type) {
      case "catalog/fetchPending":
        return { ...state, status: "loading", error: null };
      case "catalog/fetchFulfilled": {
        const byId = {};
        const allIds = [];
        action.payload.forEach((prod) => {
          byId[prod.id] = prod;
          allIds.push(prod.id);
        });
        return { ...state, byId, allIds, status: "succeeded", error: null };
      }
      case "catalog/fetchRejected":
        return { ...state, status: "failed", error: action.payload };
      default:
        return state;
    }
  }

  cartReducer(state, action) {
    switch (action.type) {
      case "cart/addItem": {
        const { id, quantity = 1 } = action.payload;
        const currentQty = state.items[id] || 0;
        return {
          ...state,
          items: { ...state.items, [id]: currentQty + quantity },
          totalCount: state.totalCount + quantity
        };
      }
      case "cart/removeItem": {
        const { id } = action.payload;
        if (!state.items[id]) return state;
        const removedQty = state.items[id];
        const updatedItems = { ...state.items };
        delete updatedItems[id];
        return {
          ...state,
          items: updatedItems,
          totalCount: Math.max(0, state.totalCount - removedQty)
        };
      }
      case "cart/clear":
        return { items: {}, totalCount: 0 };
      default:
        return state;
    }
  }

  uiReducer(state, action) {
    switch (action.type) {
      case "ui/addNotification":
        return {
          ...state,
          notifications: [...state.notifications, action.payload]
        };
      case "ui/clearNotifications":
        return { ...state, notifications: [] };
      default:
        return state;
    }
  }

  // ── 3. ASYNC THUNK DISPATCHER ─────────────────────────────────────────
  async dispatchAsyncThunk(thunkFn) {
    return await thunkFn(this.dispatch.bind(this), this.getState.bind(this));
  }

  // ── 4. MEMOIZED SELECTORS (createSelector mental model) ───────────────
  selectCartDetailedItems() {
    const state = this.getState();
    const cacheKey = JSON.stringify({ cart: state.cart.items, catalog: state.catalog.allIds });

    if (this.selectorCache.has(cacheKey)) {
      console.log("   ⚡ [Cache HIT] createSelector returned cached cart details");
      return this.selectorCache.get(cacheKey);
    }

    console.log("   🔄 [Cache MISS] Recomputing memoized cart details");
    const detailed = Object.entries(state.cart.items).map(([id, qty]) => {
      const product = state.catalog.byId[id] || { title: "Unknown", price: 0 };
      return {
        id,
        title: product.title,
        price: product.price,
        quantity: qty,
        subtotal: Number((product.price * qty).toFixed(2))
      };
    });

    const totalCost = detailed.reduce((sum, item) => sum + item.subtotal, 0);
    const result = { items: detailed, grandTotal: Number(totalCost.toFixed(2)) };

    this.selectorCache.set(cacheKey, result);
    return result;
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SIMULATION EXECUTION & VERIFICATION TEST SUITE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
console.log("🚀 Initializing StoreFlow Enterprise State Engine...\\n");
const store = new StoreFlowEngine();

// STEP 1: AUTHENTICATE USER
store.dispatch({
  type: "auth/loginSuccess",
  payload: {
    user: { id: "USR-902", name: "Sarah Connor", role: "ADMIN" },
    token: "jwt_token_auth_902"
  }
});

// STEP 2: ASYNCHRONOUS CATALOG FETCH (createAsyncThunk simulation)
await store.dispatchAsyncThunk(async (dispatch) => {
  dispatch({ type: "catalog/fetchPending" });
  
  // Simulated network delay
  const mockProducts = [
    { id: "P-101", title: "Mechanical Keyboard", price: 129.99 },
    { id: "P-102", title: "Ergonomic Wireless Mouse", price: 64.50 },
    { id: "P-103", title: "4K IPS Monitor 27\\"", price: 349.00 }
  ];

  dispatch({ type: "catalog/fetchFulfilled", payload: mockProducts });
  dispatch({
    type: "ui/addNotification",
    payload: { id: "N-1", type: "success", text: "Catalog loaded successfully." }
  });
});

// STEP 3: DISPATCH CART MUTATIONS
store.dispatch({ type: "cart/addItem", payload: { id: "P-101", quantity: 1 } });
store.dispatch({ type: "cart/addItem", payload: { id: "P-102", quantity: 2 } });

// STEP 4: MEMOIZED SELECTOR EXECUTION
console.log("\\n--- EVALUATING MEMOIZED SELECTORS ---");
const cartView1 = store.selectCartDetailedItems();
console.log("Cart View 1:", cartView1);

// Calling selector again without state changes -> Must hit cache!
console.log("\\n--- RE-EVALUATING SELECTOR (SAME STATE) ---");
const cartView2 = store.selectCartDetailedItems();
console.log("Cache verified:", cartView1 === cartView2);

// STEP 5: DEVTOOLS EVENT LOG INSPECTION
console.log("\\n--- REDUX DEVTOOLS ACTION LOG ---");
console.log(\`Total Recorded Actions: \${store.actionHistory.length}\`);
store.actionHistory.forEach((record, idx) => {
  console.log(\`#\${idx + 1} [\${record.actionType}] - State Changed: \${record.stateChanged}\`);
});

console.log("\\n✅ STOREFLOW CAPSTONE EXECUTION COMPLETED SUCCESSFULLY");
`;

export default function ReduxCapstonePage() {
  const [activeTab, setActiveTab] = useState<
    "overview" | "slices" | "async" | "selectors"
  >("overview");

  return (
    <InteractiveGrid className="min-h-screen bg-[#07090E] text-slate-100 flex flex-col font-sans selection:bg-purple-500/20 selection:text-purple-200">
      <Nav />

      <main className="flex-1 max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10 w-full space-y-8">
        {/* Navigation Breadcrumb */}
        <div>
          <Link
            href="/learn/redux"
            className="inline-flex items-center gap-2 text-xs font-mono text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Redux Curriculum</span>
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
                +{REDUX_CAPSTONE.xpReward} XP Reward
              </span>
              <span className="text-xs text-slate-400">·</span>
              <span className="text-xs font-mono text-slate-400">
                ⏱️ {REDUX_CAPSTONE.estimatedMinutes} Mins
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
              {REDUX_CAPSTONE.title} — {REDUX_CAPSTONE.subtitle}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              {REDUX_CAPSTONE.desc}
            </p>
          </div>
        </section>

        {/* Capstone Content Tabs */}
        <div className="flex items-center gap-2 border-b border-white/[0.08] pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Architecture Overview" },
            { id: "slices", label: "Store & Multi-Slice Composition" },
            { id: "async", label: "Async Thunk Lifecycle" },
            { id: "selectors", label: "Normalized State & Selectors" },
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
                  The StoreFlow state engine coordinates all shared application state across an enterprise client.
                  It centralizes business mutations into deterministic reducers, isolates side effects into asynchronous thunks,
                  guards against unnecessary UI re-renders using memoized selectors, and traces all actions through middleware.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-purple-300">Centralized Store & Reducers</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Single source of truth. Every mutation flows via explicit action dispatch through pure reducers.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-[#090C14] border border-white/[0.06] space-y-2">
                    <span className="text-xs font-bold text-emerald-300">Selectors & React Hooks</span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Components subscribe strictly to the granular state they render, preventing cascade re-renders.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "slices" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Multi-Slice configureStore Setup</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Cart Slice with Immer Mutative Updates
interface CartState {
  items: Record<string, number>;
  totalCount: number;
}

const initialCartState: CartState = { items: {}, totalCount: 0 };

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addItem(state, action: PayloadAction<{ id: string; quantity?: number }>) {
      const { id, quantity = 1 } = action.payload;
      state.items[id] = (state.items[id] || 0) + quantity;
      state.totalCount += quantity;
    },
    removeItem(state, action: PayloadAction<{ id: string }>) {
      const qty = state.items[action.payload.id];
      if (qty) {
        state.totalCount -= qty;
        delete state.items[action.payload.id];
      }
    },
    clearCart(state) {
      state.items = {};
      state.totalCount = 0;
    }
  }
});

// Root Store Assembly
export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    auth: authSlice.reducer,
    catalog: catalogSlice.reducer,
    ui: uiSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(telemetryMiddleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`}
                </pre>
              </div>
            )}

            {activeTab === "async" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">createAsyncThunk Lifecycle Architecture</h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Redux Toolkit thunks generate pending, fulfilled, and rejected action types automatically.
                  Handle loading indicators, data ingestion, and graceful rollbacks inside extraReducers.
                </p>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const checkoutOrder = createAsyncThunk(
  'cart/checkout',
  async (orderData: { userId: string; items: CartItem[] }, { rejectWithValue }) => {
    try {
      const response = await api.submitOrder(orderData);
      return response.data; // becomes action.payload on fulfilled
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Checkout failed');
    }
  }
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: { /* sync reducers */ },
  extraReducers: (builder) => {
    builder
      .addCase(checkoutOrder.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(checkoutOrder.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = {};
        state.totalCount = 0;
        state.lastOrderId = action.payload.orderId;
      })
      .addCase(checkoutOrder.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  }
});`}
                </pre>
              </div>
            )}

            {activeTab === "selectors" && (
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
                <h3 className="text-lg font-bold text-white">Memoized Selectors (createSelector) & Normalized State</h3>
                <pre className="p-4 rounded-xl bg-slate-950 text-slate-100 font-mono text-xs overflow-x-auto leading-relaxed border border-white/[0.08]">
{`import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './store';

// Primitive input selectors (cheap pointer lookups)
const selectCartItemsMap = (state: RootState) => state.cart.items;
const selectCatalogEntities = (state: RootState) => state.catalog.byId;

// Memoized derived selector: Only recalculates when cart items or catalog change
export const selectCartDetailedItems = createSelector(
  [selectCartItemsMap, selectCatalogEntities],
  (cartItems, catalogById) => {
    return Object.entries(cartItems).map(([id, quantity]) => {
      const product = catalogById[id] || { title: 'Unknown', price: 0 };
      return {
        id,
        title: product.title,
        price: product.price,
        quantity,
        subtotal: Number((product.price * quantity).toFixed(2))
      };
    });
  }
);

// Composed Selector: Computes grand total from detailed items
export const selectCartGrandTotal = createSelector(
  [selectCartDetailedItems],
  (detailedItems) => detailedItems.reduce((acc, item) => acc + item.subtotal, 0)
);`}
                </pre>
              </div>
            )}

            {/* Interactive Simulation Playground */}
            <div className="p-6 sm:p-8 rounded-3xl bg-[#0E121B] border border-white/[0.08] shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">Interactive Redux Engine Simulator</h3>
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
                {REDUX_CAPSTONE.keyFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-400">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-purple-500/[0.05] border border-purple-500/20 shadow-sm space-y-4">
              <h3 className="text-base font-bold text-white">Redux Mastery Achieved!</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                By completing the lessons and this capstone, you have demonstrated comprehensive competency
                in the Redux mental model, unidirectional data flow, Redux Toolkit configureStore and createSlice,
                React-Redux hook bindings, normalized data modeling, memoized selectors, and async orchestration.
              </p>
              <Link
                href="/learn/redux/rdx01-what-is-state"
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
