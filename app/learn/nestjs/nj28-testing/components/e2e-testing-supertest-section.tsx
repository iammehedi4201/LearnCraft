"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  WhyBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 6 — END-TO-END (E2E) TESTING WITH SUPERTEST
// ═══════════════════════════════════════════════════════════

export function E2eTestingSupertestSection() {
  return (
    <SectionContainer number={6} title="End-to-End (E2E) Testing with Supertest">
      {/* ── 6.1 Supertest E2E ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Testing the Full Real HTTP Execution Lifecycle"
          description="Simulate real HTTP requests and verify HTTP status codes, headers, and response bodies."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🌐</span> Complete E2E Test Suite
          </h4>
          <EnhancedCodeBlock
            code={`// test/auth.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // ⭐ Attach production validation pipes to test full request validation pipeline:
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/login - fails with 400 on invalid email', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'not-an-email', password: '123' })
      .expect(400)
      .expect((res) => {
        expect(res.body.message).toContain('email must be an email');
      });
  });

  it('POST /auth/login - returns JWT access token on valid credentials', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@learncraft.dev', password: 'ValidPassword123!' })
      .expect(200)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });
});`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="Why is 'app.useGlobalPipes(new ValidationPipe())' explicitly added in beforeAll during E2E tests?"
          answer="Because E2E tests instantiate a fresh Nest application without running main.ts; adding global pipes ensures DTO validations are enforced during test execution."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
