"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
  WhyBox,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — MAPPED TYPES (PartialType, PickType, OmitType)
// ═══════════════════════════════════════════════════════════

export function MappedTypesSection() {
  return (
    <SectionContainer number={9} title="Mapped Types: DRY DTOs with PartialType()">
      {/* ── 9.1 What is PartialType? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Never Duplicate DTO Fields: Use PartialType"
          description="Generate UpdateDTOs in a single line without repeating validation rules."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💡</span> The Problem: Duplicate Update DTOs
          </h4>
          <p className="text-xs text-ds-text-sub leading-relaxed mb-3">
            When creating an update endpoint (<code>PATCH /users/1</code>), the user might update only their <code>name</code>, or only their <code>bio</code>.
          </p>
          <p className="text-xs text-ds-text-strong leading-relaxed mb-3">
            Instead of copying 20 lines of code and manually adding <code>@IsOptional()</code> to every field, use <strong>PartialType</strong> from <code>@nestjs/mapped-types</code>!
          </p>
          <EnhancedCodeBlock
            code={`import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// ⭐ Automatically makes ALL fields from CreateUserDto optional,
// while keeping all validation rules intact!
export class UpdateUserDto extends PartialType(CreateUserDto) {}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always create Update DTOs with 'extends PartialType(CreateDto)' to keep your code DRY." />
      </div>

      <Divider />

      {/* ── 9.2 Other Mapped Types ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="The 4 Mapped Type Helpers"
          description="Utilities from @nestjs/mapped-types to transform DTOs."
          color="sky"
        />

        <ComparisonTable
          headers={["Mapped Type Helper", "What It Does", "Example Use Case"]}
          rows={[
            ["PartialType(A)", "Makes all fields in A optional", "Creating UpdateUserDto from CreateUserDto"],
            ["PickType(A, ['email', 'password'])", "Extracts only the specified subset of fields", "Creating LoginDto from CreateUserDto"],
            ["OmitType(A, ['password'])", "Extracts all fields EXCEPT the specified keys", "Creating UserProfileResponseDto"],
            ["IntersectionType(A, B)", "Combines two DTO classes into a single combined type", "Combining BaseEntityDto with UserDto"],
          ]}
        />

        <QuickCheck
          question="What function from '@nestjs/mapped-types' allows you to create an UpdateUserDto from CreateUserDto with all fields made optional?"
          answer="PartialType(CreateUserDto) (e.g. export class UpdateUserDto extends PartialType(CreateUserDto) {})"
        />
      </div>
    </SectionContainer>
  );
}
