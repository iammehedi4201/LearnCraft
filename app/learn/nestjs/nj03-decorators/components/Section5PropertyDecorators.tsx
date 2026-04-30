"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { SectionWrapper } from "./SectionWrapper";
import { QuickCheck } from "./QuickCheck";
import { InfoBox } from "./InfoBox";

export function Section5PropertyDecorators() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">5. Property Decorators</h2>
      <SectionWrapper>
        <InfoBox variant="info" title="What is a Property Decorator?">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A property decorator is applied to a <strong>class property</strong> (a variable inside a class). It adds metadata about that property — like &quot;this should be a database column&quot; or &quot;this must be a valid email.&quot; NestJS uses these extensively with <strong>TypeORM</strong> (database) and <strong>class-validator</strong> (input validation).
          </p>
        </InfoBox>

        <div className="space-y-6 mt-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Build Your Own — @Column Decorator
            </h4>
            <EnhancedCodeBlock
              code={`// Simplified version of how @Column works in TypeORM
function Column(options?: { type?: string; nullable?: boolean }) {
  return function (target: any, propertyKey: string) {
    // Store column metadata on the class
    Reflect.defineMetadata("column", options || {}, target, propertyKey);
    // TypeORM later reads this to create the database table!
  };
}

function IsEmail() {
  return function (target: any, propertyKey: string) {
    // Store validation rule: "this property must be an email"
    Reflect.defineMetadata("validation", "email", target, propertyKey);
  };
}

// Usage — each property gets its own "sticker"
class User {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "varchar" })
  @IsEmail()                     // ← Two decorators on one property!
  email: string;

  @Column({ type: "boolean", nullable: true })
  isActive: boolean;
}`}
              language="typescript"
            />
          </div>

          {/* Real-world NestJS usage */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              Real NestJS Usage — TypeORM Entity + Validation DTO
            </h4>
            <EnhancedCodeBlock
              code={`// TypeORM Entity — defines a database table
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()                              // ← Class decorator: "this is a DB table"
class User {
  @PrimaryGeneratedColumn()            // ← Auto-generated ID column
  id: number;

  @Column()                            // ← Regular column
  name: string;

  @Column({ unique: true })            // ← Unique column
  email: string;
}

// Validation DTO — defines input rules
import { IsString, IsEmail, IsNotEmpty } from 'class-validator';

class CreateUserDto {
  @IsString()                          // ← Must be a string
  @IsNotEmpty()                        // ← Cannot be empty
  name: string;

  @IsEmail()                           // ← Must be valid email format
  email: string;
}`}
              language="typescript"
            />
          </div>
        </div>

        <QuickCheck
          question={`Can you apply multiple decorators to the same property?`}
          answer={`Yes! You can stack as many decorators as you need. They execute from bottom to top. For example, @Column() + @IsEmail() on the "email" property sets up both the database column AND the validation rule. This is very common in NestJS.`}
        />
      </SectionWrapper>
    </section>
  );
}
