"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  StepList,
  MistakeBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 9 — UTILITY TYPES: BUILT-IN POWER TOOLS
// ═══════════════════════════════════════════════════════════

export function SectionUtilityTypes() {
  return (
    <SectionContainer number={9} title="Utility Types: Built-In Power Tools">
      {/* ── 9.1 What are Utility Types? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="TypeScript's Built-in Transformers"
          description="Utility Types are built-in functions that take an existing interface and transform it into a new specialized shape without code duplication."
          color="primary"
        />

        <AnalogyBox emoji="🎨" title="Think about it like this">
          Think of Utility Types as <strong className="text-ds-info-dark">Instagram filters for interfaces</strong>.
          <p className="mt-2">
            Instead of repainting the entire portrait from scratch every time you need a black-and-white, cropped, or zoomed thumbnail, you start with the original full-resolution photo (<code className="text-ds-info-dark">BaseEntity</code>) and apply a filter (<code className="text-ds-info-dark">Omit</code>, <code className="text-ds-info-dark">Partial</code>, <code className="text-ds-info-dark">Pick</code>).
          </p>
        </AnalogyBox>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-warning-dark uppercase block mb-1">
              Omit&lt;T, Keys&gt;
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              &quot;Copy this interface, but <strong>exclude</strong> these specific fields.&quot; (Used for Create DTOs).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-feature-dark uppercase block mb-1">
              Partial&lt;T&gt;
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              &quot;Copy this interface, but make <strong>every single field optional</strong>.&quot; (Used for Update DTOs).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-success-dark uppercase block mb-1">
              Pick&lt;T, Keys&gt;
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              &quot;Copy this interface, but <strong>only keep</strong> these select fields.&quot; (Used for Previews).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft">
            <span className="text-xs font-black text-ds-info-dark uppercase block mb-1">
              Record&lt;K, V&gt;
            </span>
            <p className="text-xs text-ds-text-sub leading-relaxed">
              &quot;Construct a dictionary where keys are of type <strong>K</strong> and values are of type <strong>V</strong>.&quot;
            </p>
          </div>
        </div>
      </div>

      <Divider />

      {/* ── 9.2 The NestJS DTO Transformation Pipeline ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The DTO Transformation Pipeline"
          description="In real-world backend engineering, you NEVER write separate interfaces for Create, Update, and Response models manually. You derive them all from one Single Source of Truth."
          color="sky"
        />

        <StepList
          steps={[
            {
              label: "Step 1: Define Master Entity Interface",
              note: "Contains all fields from the database schema.",
              code: "interface Article { id: number; title: string; body: string; authorId: number; published: boolean; createdAt: Date; }",
            },
            {
              label: "Step 2: Derive Create DTO with Omit",
              note: "Remove database-generated fields (id and createdAt).",
              code: "type CreateArticleDto = Omit<Article, 'id' | 'createdAt'>;",
            },
            {
              label: "Step 3: Derive Update DTO with Partial",
              note: "In a PATCH endpoint, the client can update any combination of fields.",
              code: "type UpdateArticleDto = Partial<CreateArticleDto>;",
            },
            {
              label: "Step 4: Derive Card Preview with Pick",
              note: "Public card listing only needs title and authorId.",
              code: "type ArticleCardPreview = Pick<Article, 'id' | 'title' | 'authorId'>;",
            },
          ]}
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Deriving DTOs with Utility Types</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// Master Database Entity
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  stock: number;
  secretVendorCost: number; // Sensitive! Never expose to client
  createdAt: Date;
}

// 1. Create DTO (Client sends everything EXCEPT id, secret, createdAt)
type CreateProductDto = Omit<Product, "id" | "secretVendorCost" | "createdAt">;

// 2. Update DTO (All fields optional for PATCH)
type UpdateProductDto = Partial<CreateProductDto>;

// 3. Public Response DTO (Hide secret vendor cost)
type PublicProductDto = Omit<Product, "secretVendorCost">;

const newProduct: CreateProductDto = {
  name: "Mechanical Keyboard",
  price: 129.99,
  description: "Hot-swappable RGB keyboard",
  stock: 50,
};

const patchUpdate: UpdateProductDto = {
  price: 109.99, // Only updating the price!
};

console.log("✅ Created Product DTO:", newProduct);
console.log("✅ Partial Update DTO:", patchUpdate);`}
            height="320px"
          />
        </div>

        <MistakeBox
          title="Manual duplicate DTOs leading to out-of-sync bugs"
          description="If you manually rewrite CreateUserDto, UpdateUserDto, and UserEntity as separate independent interfaces, changing a field type in the entity will silently break your DTO validation without compiler warnings."
          wrong={`// ❌ ANTI-PATTERN: Duplicated code everywhere
interface UserEntity { id: number; name: string; email: string; }
interface CreateUserDto { name: string; email: string; } // Manual copy!
interface UpdateUserDto { name?: string; email?: string; } // Manual copy!`}
          right={`// ✅ CLEAN ARCHITECTURE: Derived Single Source of Truth
interface UserEntity { id: number; name: string; email: string; }
type CreateUserDto = Omit<UserEntity, 'id'>;
type UpdateUserDto = Partial<CreateUserDto>;`}
        />

        <div className="mb-8">
          <SectionHeading>🦁 How Utility Types are Used in NestJS Controllers</SectionHeading>
          <EnhancedCodeBlock
            code={`import { Controller, Post, Patch, Body, Param } from '@nestjs/common';

// In production NestJS, you can also use @nestjs/mapped-types or @nestjs/swagger
// which use these exact same TypeScript utility concepts!
@Controller('products')
export class ProductsController {

  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return { status: 'created', data: dto };
  }

  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return { status: 'updated', id, changes: dto };
  }
}`}
            language="typescript"
          />
        </div>

        <QuickCheck
          question="You have an interface `User` with fields `id, name, email, password, role`. You want a type for the public profile that hides the `password` field. What utility type do you write?"
          answer="type PublicProfile = Omit<User, 'password'>; — This clones the User interface while safely removing the sensitive 'password' field."
        />
      </div>
    </SectionContainer>
  );
}
