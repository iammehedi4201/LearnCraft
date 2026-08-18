"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 9 — CONCEPT TABLES & FILE MAPS
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={9} title="Concept Tables & File Maps">
      {/* ── 9.1 Project Structure Map ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Master NestJS Project File Map"
          description="A quick reference table of all standard files in a fresh NestJS application."
          color="primary"
        />

        <ComparisonTable
          headers={["File Path", "Category", "Core Responsibility", "Main Export / Decorator"]}
          rows={[
            ["src/main.ts", "Entry Point", "Initializes the app and starts HTTP listener", "bootstrap() function"],
            ["src/app.module.ts", "Module", "Central container linking controllers and services", "@Module()"],
            ["src/app.controller.ts", "Controller", "Receives HTTP requests and routes to services", "@Controller(), @Get()"],
            ["src/app.service.ts", "Provider / Service", "Executes business logic and returns data", "@Injectable()"],
            ["src/app.controller.spec.ts", "Test", "Automated Jest unit test suite", "describe(), it(), expect()"],
            ["nest-cli.json", "Config", "Build options and source root mapping", "JSON settings"],
            ["tsconfig.json", "Config", "TypeScript compiler and decorator options", "JSON settings"],
          ]}
        />
      </div>

      <Divider />

      {/* ── 9.2 CLI Master Cheat Sheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="NestJS CLI Master Command Cheat Sheet"
          description="Bookmark these commands for quick reference."
          color="sky"
        />

        <ComparisonTable
          headers={["Task", "Full Command", "Short Alias"]}
          rows={[
            ["Create new project", "nest new <name>", "nest new <name>"],
            ["Generate Module", "nest generate module <name>", "nest g mo <name>"],
            ["Generate Controller", "nest generate controller <name>", "nest g co <name>"],
            ["Generate Service", "nest generate service <name>", "nest g s <name>"],
            ["Generate Guard", "nest generate guard <name>", "nest g gu <name>"],
            ["Generate Pipe", "nest generate pipe <name>", "nest g pi <name>"],
            ["Generate Full CRUD", "nest generate resource <name>", "nest g res <name>"],
            ["Start in Dev Mode", "npm run start:dev", "npm run start:dev"],
            ["Build for Production", "npm run build", "npm run build"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
