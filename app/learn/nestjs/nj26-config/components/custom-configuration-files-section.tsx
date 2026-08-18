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
// MODULE 6 — NAMESPACED CONFIG WITH REGISTERAS
// ═══════════════════════════════════════════════════════════

export function CustomConfigurationFilesSection() {
  return (
    <SectionContainer number={6} title="Namespaced Config with registerAs()">
      {/* ── 6.1 registerAs ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Modular Configuration Factories"
          description="Group related configuration variables into namespaced modules (e.g. database, jwt, stripe)."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>🗂️</span> Defining a Namespaced Factory
          </h4>
          <EnhancedCodeBlock
            code={`// src/config/database.config.ts
import { registerAs } from '@nestjs/config';

export const databaseConfig = registerAs('database', () => ({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  url: process.env.DATABASE_URL,
}));

// In AppModule:
ConfigModule.forRoot({
  load: [databaseConfig],
});

// In DatabaseService (Direct injection with ConfigType):
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class DatabaseService {
  constructor(
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>, // ⭐ Full auto-complete on dbConfig.host, port, url!
  ) {}
}`}
            language="typescript"
          />
        </WhyBox>

        <QuickCheck
          question="What is the key advantage of 'registerAs' over monolithic config files?"
          answer="It creates strongly-typed namespaced config objects (like dbConfig.host) that can be injected directly into specific services without polluting the global namespace."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
