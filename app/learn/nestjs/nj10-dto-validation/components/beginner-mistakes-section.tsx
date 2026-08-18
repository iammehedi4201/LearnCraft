"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER DTO & VALIDATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top Beginner Validation Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Mistakes with DTOs and Validation"
          description="Avoid these common pitfalls when securing your API endpoints."
          color="primary"
        />

        <MistakeBox
          title="Forgetting app.useGlobalPipes(new ValidationPipe())"
          description="If you add @IsEmail() decorators to your DTO but forget to register ValidationPipe in main.ts, NestJS will ignore all your validation rules!"
          wrong={`// main.ts:
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ❌ Forgot ValidationPipe! All incoming requests pass unvalidated!
  await app.listen(3000);
}`}
          right={`// main.ts:
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ✅ Activated globally:
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}`}
        />

        <MistakeBox
          title="Defining DTOs as Interfaces"
          description="TypeScript interfaces are erased at runtime in JavaScript, making validation impossible."
          wrong={`// ❌ Interface is erased at runtime:
export interface CreateUserDto {
  @IsEmail() // Syntax Error / Ignored at runtime!
  email: string;
}`}
          right={`// ✅ Class exists at runtime in JavaScript:
export class CreateUserDto {
  @IsEmail()
  email: string;
}`}
        />

        <MistakeBox
          title="Forgetting @Type with @ValidateNested"
          description="@ValidateNested() does nothing unless paired with @Type(() => ChildDto) from class-transformer."
          wrong={`export class OrderDto {
  // ❌ Missing @Type! Validation will skip the address!
  @ValidateNested()
  address: AddressDto;
}`}
          right={`export class OrderDto {
  // ✅ Both decorators present:
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}`}
        />

        <QuickCheck
          question="What is the most common reason why validation decorators (@IsEmail, @IsNotEmpty) seem to be ignored by NestJS during API calls?"
          answer="'app.useGlobalPipes(new ValidationPipe())' was not enabled in 'src/main.ts'."
        />
      </div>
    </SectionContainer>
  );
}
