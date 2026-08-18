"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 3 — PASSWORD HASHING WITH BCRYPT
// ═══════════════════════════════════════════════════════════

export function PasswordHashingSection() {
  return (
    <SectionContainer number={3} title="Password Hashing with bcrypt & Salt">
      {/* ── 3.1 bcrypt Hashing ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Never Store Plain Text Passwords"
          description="Hash passwords with bcrypt using one-way cryptographic hashing before writing to PostgreSQL/Prisma."
          color="rose"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🔒</span> Hashing vs Comparing
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            Install <code>bcrypt</code> and its types: <code>npm i bcrypt @types/bcrypt</code>.
            Bcrypt uses a one-way mathematical function with a random &quot;salt&quot; so rainbow table dictionary attacks fail:
          </p>
          <EnhancedCodeBlock
            code={`import * as bcrypt from 'bcrypt';

export class PasswordHelper {
  private static readonly SALT_ROUNDS = 10;

  // 1. Hash password before saving to database on registration:
  static async hashPassword(plainText: string): Promise<string> {
    return await bcrypt.hash(plainText, this.SALT_ROUNDS);
  }

  // 2. Compare incoming login password against stored database hash:
  static async comparePasswords(plainText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hash);
  }
}

// In AuthService.validateUser():
const isMatch = await PasswordHelper.comparePasswords(loginDto.password, user.passwordHash);
if (!isMatch) {
  throw new UnauthorizedException('Invalid email or password');
}`}
            language="typescript"
          />
        </WhyBox>

        <EasyRuleCard rule="Always use bcrypt.compare(inputPassword, storedHash). Never compare passwords using plain string equality (===)." />

        <QuickCheck
          question="What is the purpose of the 'salt' in bcrypt password hashing?"
          answer="A random string appended to the password before hashing that guarantees two users with identical passwords will produce completely different hash strings in the database."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
