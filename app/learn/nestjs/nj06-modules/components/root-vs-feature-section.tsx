"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  Divider,
  AnalogyBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — ROOT MODULE VS FEATURE MODULES
// ═══════════════════════════════════════════════════════════

export function RootVsFeatureSection() {
  return (
    <SectionContainer number={3} title="Root Module vs Feature Modules">
      {/* ── 3.1 The Tree Structure ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="The Application Module Tree"
          description="Every NestJS application is organized like a tree with a central trunk and branches."
          color="primary"
        />

        <AnalogyBox emoji="🌳" title="Simple Real-Life Story: The Tree">
          <p>
            Think of <strong>AppModule</strong> as the trunk of a big tree.
          </p>
          <p className="mt-2">
            Each feature (like <strong>UsersModule</strong>, <strong>OrdersModule</strong>, and <strong>AuthModule</strong>) is a strong branch growing out of that trunk.
          </p>
        </AnalogyBox>

        <div className="mb-8 p-5 bg-[#0B0E17] dark:bg-[#07090E] rounded-2xl border border-ds-stroke-soft font-mono text-xs text-[#F1F5F9] leading-relaxed shadow-inner">
          <p className="text-ds-feature-base font-bold mb-2">🌳 AppModule (Root)</p>
          <p>├── 📦 <span className="text-ds-info-base font-bold">UsersModule</span> <span className="text-ds-text-soft">(Handles users & profiles)</span></p>
          <p>├── 📦 <span className="text-ds-success-base font-bold">ProductsModule</span> <span className="text-ds-text-soft">(Handles catalog & inventory)</span></p>
          <p>├── 📦 <span className="text-ds-warning-base font-bold">OrdersModule</span> <span className="text-ds-text-soft">(Handles checkout & payments)</span></p>
          <p>└── 📦 <span className="text-ds-error-base font-bold">AuthModule</span> <span className="text-ds-text-soft">(Handles login & JWT tokens)</span></p>
        </div>
      </div>

      <Divider />

      {/* ── 3.2 Keeping AppModule Clean ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="How AppModule Imports Feature Modules"
          description="AppModule should stay very simple and clean. Its main job is to import the feature modules."
          color="sky"
        />

        <EnhancedCodeBlock
          code={`import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ProductsModule,
    OrdersModule,
    AuthModule,
  ],
})
export class AppModule {}`}
          language="typescript"
        />

        <div className="my-8">
          <SectionHeading>🚀 Try It Yourself: Multi-Module App Simulation</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Feature 1: Users
class UsersModule {
  name = "UsersModule";
  getUsers() { return ["Alice", "Bob", "Mehedi"]; }
}

// Feature 2: Products
class ProductsModule {
  name = "ProductsModule";
  getProducts() { return ["Laptop", "Keyboard", "Mouse"]; }
}

// Root AppModule coordinates all features:
class AppModule {
  constructor(
    public users: UsersModule,
    public products: ProductsModule
  ) {}

  printAppSummary() {
    console.log("🌳 AppModule Loaded Successfully!");
    console.log("👥 Users:", this.users.getUsers());
    console.log("🛒 Products:", this.products.getProducts());
  }
}

const users = new UsersModule();
const products = new ProductsModule();
const app = new AppModule(users, products);

app.printAppSummary();`}
            height="420px"
          />
        </div>

        <QuickCheck
          question="What is the main role of AppModule in a multi-module NestJS application?"
          answer="AppModule serves as the root module that imports and connects all feature modules (UsersModule, ProductsModule, etc.) into a unified application tree."
        />
      </div>
    </SectionContainer>
  );
}
