"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  MistakeBox,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 10 — TOP 5 BEGINNER AUTHENTICATION MISTAKES
// ═══════════════════════════════════════════════════════════

export function BeginnerMistakesSection() {
  return (
    <SectionContainer number={10} title="Top 5 Beginner Authentication Mistakes">
      {/* ── Top Mistakes ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Common Pitfalls with NestJS Authentication"
          description="Avoid these common security holes and configuration errors."
          color="primary"
        />

        <MistakeBox
          title="Hardcoding JWT_SECRET in Code"
          description="Hardcoding secrets in Git repositories allows anyone with repository read access to forge valid administrative tokens."
          wrong={`// ❌ Dangerous: Hardcoded secret in source code
JwtModule.register({
  secret: 'my-hardcoded-secret',
})`}
          right={`// ✅ Secure: Read from environment variables / ConfigService:
JwtModule.registerAsync({
  inject: [ConfigService],
  useFactory: (config: ConfigService) => ({
    secret: config.getOrThrow<string>('JWT_SECRET'),
  }),
})`}
        />

        <MistakeBox
          title="Storing Passwords with Fast Hashing Algorithms (MD5 / SHA256)"
          description="MD5 and SHA256 are too fast for passwords and can be cracked in seconds using GPUs. Always use bcrypt or argon2."
          wrong={`// ❌ Insecure: MD5 is easily cracked:
const hash = crypto.createHash('md5').update(password).digest('hex');`}
          right={`// ✅ Secure: bcrypt uses adaptive salt and work factor:
const hash = await bcrypt.hash(password, 10);`}
        />

        <MistakeBox
          title="Putting Sensitive Credentials in the JWT Payload"
          description="JWT payloads are not encrypted; they are base64-encoded strings that can be decoded on jwt.io by anyone."
          wrong={`// ❌ Terrible: Password hash is exposed in plain sight:
const payload = { id: user.id, passwordHash: user.passwordHash };`}
          right={`// ✅ Safe: Only store non-sensitive IDs and roles:
const payload = { sub: user.id, email: user.email, role: user.role };`}
        />

        <QuickCheck
          question="Why are MD5 and SHA256 algorithms considered unsafe for password storage compared to bcrypt?"
          answer="Because MD5 and SHA256 are designed to be extremely fast. Attackers can test billions of guesses per second with GPUs. Bcrypt is deliberately slow and salted to resist brute-force attacks."
        />
      </div>
    </SectionContainer>
  );
}
