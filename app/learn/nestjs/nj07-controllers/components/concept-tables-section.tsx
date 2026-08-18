"use client";

import {
  SectionContainer,
  TopicHeader,
  Divider,
  ComparisonTable,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 11 — CONCEPT TABLES & MASTER CHEAT SHEET
// ═══════════════════════════════════════════════════════════

export function ConceptTablesSection() {
  return (
    <SectionContainer number={11} title="Concept Tables & Master Cheat Sheet">
      {/* ── All Decorators Cheat Sheet ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Master HTTP Request Decorator Cheat Sheet"
          description="Every request parameter decorator available in NestJS controllers."
          color="primary"
        />

        <ComparisonTable
          headers={["NestJS Decorator", "Express Equivalent", "What It Extracts"]}
          rows={[
            ["@Param('id')", "req.params.id", "Route parameters from the URL path (/users/:id)"],
            ["@Body()", "req.body", "JSON payload sent in the request body"],
            ["@Query('page')", "req.query.page", "Query string parameter after ? in the URL"],
            ["@Headers('auth')", "req.headers['auth']", "HTTP request header value"],
            ["@Ip()", "req.ip", "Client's IP address"],
            ["@Req()", "req", "Raw underlying Express Request object"],
            ["@Res()", "res", "Raw underlying Express Response object"],
            ["@HttpCode(204)", "res.status(204)", "Custom HTTP status code for successful response"],
            ["@Header('k', 'v')", "res.setHeader('k', 'v')", "Custom HTTP response header"],
            ["@Redirect('url')", "res.redirect('url')", "Automatic browser/client redirect"],
          ]}
        />
      </div>

      <Divider />

      {/* ── Express vs NestJS Controllers ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="Express vs NestJS Controller Comparison"
          description="See how familiar Express patterns translate to declarative NestJS decorators."
          color="sky"
        />

        <ComparisonTable
          headers={["Action", "Express.js", "NestJS"]}
          rows={[
            ["Define Route", "app.get('/users', ...)", "@Get() inside @Controller('users')"],
            ["Read URL Param", "req.params.id", "@Param('id') id: string"],
            ["Read JSON Body", "req.body", "@Body() createUserDto: CreateUserDto"],
            ["Read Query String", "req.query.search", "@Query('search') search: string"],
            ["Send JSON", "res.json(data)", "return data (NestJS converts automatically!)"],
            ["Set Status Code", "res.status(201).json(data)", "@HttpCode(201) return data"],
          ]}
        />
      </div>
    </SectionContainer>
  );
}
