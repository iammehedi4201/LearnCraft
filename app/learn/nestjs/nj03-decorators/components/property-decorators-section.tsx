"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  WhyBox,
  Divider,
  InfoCallout,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 5 — PROPERTY DECORATORS
// ═══════════════════════════════════════════════════════════

export function PropertyDecoratorsSection() {
  return (
    <SectionContainer number={5} title="Property Decorators">
      {/* ── 5.1 Signature & 2 Parameters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Property Decorator Signature & The 2 Parameters"
          description="Property decorators are attached directly above a class property. Unlike method decorators, they receive only 2 parameters."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 2 Parameters of a Property Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function PropertyDecorator(
  target: any,        // 1. Prototype of class (or constructor for static property)
  propertyKey: string // 2. Name of the property (e.g. "email")
) {
  // Notice: NO descriptor argument!
}`}
          </pre>
        </WhyBox>

        <InfoCallout emoji="❓" title="Why is there no PropertyDescriptor for Property Decorators?">
          <p>
            When a class is defined, instance properties (like <code>name: string;</code>) do <strong>not exist on the prototype yet</strong>. They only get created when an instance is instantiated with <code>new User()</code>. Because there is no property on the prototype at definition time, there is no descriptor to pass!
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 5.2 Intercepting Properties with Object.defineProperty ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Intercepting Values with Getters & Setters"
          description="To intercept or transform property values, a property decorator can define a getter and setter on the class prototype using Object.defineProperty."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Uppercase Property Formatter</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function Uppercase(target: any, propertyKey: string) {
  // Use a private symbol/key to store the actual value on the instance
  const privateKey = "_" + propertyKey;

  Object.defineProperty(target, propertyKey, {
    get() {
      return this[privateKey];
    },
    set(val: string) {
      console.log("Transforming " + propertyKey + " -> UPPERCASE");
      this[privateKey] = typeof val === "string" ? val.toUpperCase() : val;
    },
    enumerable: true,
    configurable: true,
  });
}

class UserProfile {
  @Uppercase
  username: string = "";

  @Uppercase
  country: string = "";
}

const user = new UserProfile();
user.username = "mehedi_dev";
user.country = "bangladesh";

console.log("Username:", user.username); // "MEHEDI_DEV"
console.log("Country:", user.country);   // "BANGLADESH"`}
            height="380px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 5.3 Storing Metadata on Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The Most Common Use Case: Metadata Storage"
          description="In real frameworks like NestJS, TypeORM, and class-validator, property decorators are mostly used to store validation or database column rules."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple Validation Metadata</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// A global registry for demo purposes (real apps use reflect-metadata)
const validationRegistry = new Map<string, string[]>();

function Required(target: any, propertyKey: string) {
  const className = target.constructor.name;
  const existing = validationRegistry.get(className) || [];
  existing.push(propertyKey);
  validationRegistry.set(className, existing);
  console.log("Registered required field: " + className + "." + propertyKey);
}

class CreateUserDto {
  @Required
  email: string = "";

  @Required
  password: string = "";

  age?: number;
}

console.log("Registry contents:", Object.fromEntries(validationRegistry));`}
            height="340px"
          />
        </div>

        <QuickCheck
          question="Why do property decorators receive 2 arguments instead of 3?"
          answer="Property decorators receive target and propertyKey, but NO descriptor. This is because instance properties are only assigned when an instance is constructed at runtime (new Class()), so there is no prototype descriptor at class definition time."
        />
      </div>
    </SectionContainer>
  );
}
