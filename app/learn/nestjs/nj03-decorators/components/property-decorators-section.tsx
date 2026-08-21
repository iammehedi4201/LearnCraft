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
          title="Property Decorators & The 2 Parameters"
          description="Property decorators are placed directly above a class property (like email, price, or username). Unlike method decorators, they receive only 2 arguments."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2">
            The 2 Parameters of a Property Decorator:
          </h4>
          <pre className="bg-[#0B0E17] dark:bg-[#07090E] text-[#F1F5F9] p-3.5 rounded-xl text-xs font-mono border border-ds-stroke-soft">
{`function MyPropertyDecorator(
  target: any,        // 1. Prototype of the class
  propertyKey: string // 2. Name of the property as text (e.g. "email")
) {
  // Notice: NO descriptor argument here!
}`}
          </pre>
        </WhyBox>

        <InfoCallout emoji="❓" title="Why is there no PropertyDescriptor for Property Decorators?">
          <p>
            When a JavaScript class is first loaded, instance properties (like <code>username = &quot;&quot;;</code>) do <strong>not exist on the prototype yet</strong>. They only get created when an actual object is built using <code>new User()</code>. Because the property doesn&apos;t exist on the prototype at definition time, there is no descriptor to pass!
          </p>
        </InfoCallout>
      </div>

      <Divider />

      {/* ── 5.2 Intercepting Properties with Object.defineProperty ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Transforming Property Values (Getters & Setters)"
          description="To automatically transform or clean up values (like making text UPPERCASE or trimming spaces), a property decorator can define a getter and setter using Object.defineProperty."
          color="sky"
        />

        <InfoCallout emoji="📦" title="Why do we use '_privateKey' (The Hidden Storage Box)?">
          <p>
            Inside a setter function, if you write <code>this.username = val</code>, it calls the setter again, creating an <strong>infinite loop</strong> that crashes! To avoid this, we store the actual value under a private secret name like <code>this._username</code>.
          </p>
        </InfoCallout>

        <div className="mb-8 mt-4">
          <SectionHeading>🚀 Try It Yourself: Automatic Uppercase Formatter</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Whenever anyone assigns a value to <code>username</code> or <code>country</code>, <code>@Uppercase</code> automatically converts it to all-caps:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`function Uppercase(target: any, propertyKey: string) {
  // Secret storage key on the object (e.g. "_username")
  const privateKey = "_" + propertyKey;

  Object.defineProperty(target, propertyKey, {
    get() {
      // Return the value from our private storage
      return this[privateKey];
    },
    set(newVal: string) {
      console.log("✨ Converting " + propertyKey + " -> UPPERCASE");
      this[privateKey] = typeof newVal === "string" ? newVal.toUpperCase() : newVal;
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

console.log("Result Username:", user.username); // "MEHEDI_DEV"
console.log("Result Country:", user.country);   // "BANGLADESH"`}
            height="420px"
          />
        </div>
      </div>

      <Divider />

      {/* ── 5.3 Storing Metadata on Properties ── */}
      <div className="mb-16">
        <TopicHeader
          number={3}
          title="The Most Common Use: Validation Tags"
          description="In frameworks like NestJS (with class-validator), property decorators are mostly used to attach validation rules to fields."
          color="emerald"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: Simple Validation Rules</SectionHeading>
          <p className="text-xs text-ds-text-sub mb-3">
            Here, <code>@Required</code> tags the properties that must be filled out before submitting a form:
          </p>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// A simple registry that maps class names to their required fields
const requiredFieldsMap = new Map<string, string[]>();

function Required(target: any, propertyKey: string) {
  const className = target.constructor.name;
  const list = requiredFieldsMap.get(className) || [];
  list.push(propertyKey);
  requiredFieldsMap.set(className, list);
  console.log("📝 Tagged required field: " + className + "." + propertyKey);
}

class CreateUserDto {
  @Required
  email: string = "";

  @Required
  password: string = "";

  bio?: string; // Optional field
}

console.log("Registered required fields:", Object.fromEntries(requiredFieldsMap));`}
            height="360px"
          />
        </div>

        <QuickCheck
          question="Why do property decorators receive 2 arguments instead of 3?"
          answer="Property decorators receive target and propertyKey, but NO descriptor. This is because instance properties are only assigned when an object is created with new Class(), so there is no prototype property descriptor when the class is initially defined."
        />
      </div>
    </SectionContainer>
  );
}
