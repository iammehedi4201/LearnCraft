"use client";

import { Playground } from "@/components/playground/Playground";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  SummaryBox,
  Divider,
  StepList,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// PART 20 — FINAL PROJECT: MINI NESTJS-STYLE FRAMEWORK
// ═══════════════════════════════════════════════════════════

export function FinalProjectSection() {
  return (
    <SectionContainer number={20} title="Final Project: Mini NestJS Framework">
      <div className="mb-10 p-5 rounded-2xl bg-ds-bg-weak border border-ds-stroke-soft shadow-sm">
        <p className="text-sm text-ds-text-sub leading-relaxed">
          In this capstone project, you will assemble everything you learned into a <strong>working mini NestJS-style backend framework</strong>. You will build custom decorators (<code>@Controller</code>, <code>@Get</code>, <code>@Post</code>, <code>@Body</code>, <code>@Param</code>, <code>@Roles</code>) and a <code>bootstrapController()</code> router engine that dispatches HTTP requests!
        </p>
      </div>

      {/* ── Architecture Overview ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Architecture of Our Mini Framework"
          description="Our framework consists of a Metadata Storage layer, Decorator Factories, and a Routing Engine."
          color="primary"
        />

        <StepList
          steps={[
            {
              label: "Metadata Registry",
              note: "Stores route prefixes, HTTP methods, parameter indices, and security roles on controller prototypes.",
            },
            {
              label: "Class & Method Decorators",
              note: "@Controller, @Get, @Post record route paths; @Roles records access requirements.",
            },
            {
              label: "Parameter Decorators",
              note: "@Body and @Param map request properties to function argument positions.",
            },
            {
              label: "The Bootstrap Router Engine",
              note: "Scans controller classes, builds the route table, and dispatches simulated HTTP requests with full argument injection and role checking!",
            },
          ]}
        />
      </div>

      <Divider />

      {/* ── The Complete Live Framework Playground ── */}
      <div className="mb-16">
        <SectionHeading>🚀 The Complete Working Framework in Action</SectionHeading>
        <Playground
          runtime="typescript"
          language="TypeScript"
          starterCode={`// ═══════════════════════════════════════════════════════
// 1. METADATA REGISTRY SYSTEM
// ═══════════════════════════════════════════════════════
const metadataMap = new Map<string, any>();

function setMeta(target: any, key: string, value: any, prop?: string) {
  const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
  metadataMap.set(storeKey, value);
}

function getMeta(target: any, key: string, prop?: string) {
  const storeKey = (prop ? target.constructor.name + "." + prop : target.name) + "::" + key;
  return metadataMap.get(storeKey);
}

// ═══════════════════════════════════════════════════════
// 2. CUSTOM DECORATORS
// ═══════════════════════════════════════════════════════
function Controller(prefix: string = "") {
  return function (target: Function) {
    setMeta(target, "prefix", prefix.startsWith("/") ? prefix : "/" + prefix);
  };
}

function createRouteDecorator(httpMethod: string) {
  return function (path: string = "") {
    return function (target: any, key: string, descriptor: PropertyDescriptor) {
      setMeta(target, "httpMethod", httpMethod, key);
      setMeta(target, "path", path.startsWith("/") ? path : (path ? "/" + path : ""), key);
    };
  };
}

const Get = createRouteDecorator("GET");
const Post = createRouteDecorator("POST");
const Delete = createRouteDecorator("DELETE");

function Roles(...roles: string[]) {
  return function (target: any, key: string, descriptor: PropertyDescriptor) {
    setMeta(target, "roles", roles, key);
  };
}

function Body(target: any, key: string, index: number) {
  const existing = getMeta(target, "paramMap", key) || [];
  existing.push({ index, type: "body" });
  setMeta(target, "paramMap", existing, key);
}

function Param(paramName: string) {
  return function (target: any, key: string, index: number) {
    const existing = getMeta(target, "paramMap", key) || [];
    existing.push({ index, type: "param", name: paramName });
    setMeta(target, "paramMap", existing, key);
  };
}

// ═══════════════════════════════════════════════════════
// 3. APPLICATION CONTROLLER
// ═══════════════════════════════════════════════════════
@Controller("users")
class UsersController {
  private users = [
    { id: "1", name: "Alice", role: "user" },
    { id: "2", name: "Mehedi", role: "admin" }
  ];

  @Get()
  getAllUsers() {
    return { status: 200, data: this.users };
  }

  @Get(":id")
  getUserById(@Param("id") id: string) {
    const user = this.users.find(u => u.id === id);
    if (!user) return { status: 404, error: "User not found" };
    return { status: 200, data: user };
  }

  @Post()
  @Roles("admin")
  createUser(@Body body: any) {
    const newUser = { id: String(this.users.length + 1), ...body };
    this.users.push(newUser);
    return { status: 201, message: "User created", user: newUser };
  }
}

// ═══════════════════════════════════════════════════════
// 4. FRAMEWORK ROUTING ENGINE (The NestJS Core!)
// ═══════════════════════════════════════════════════════
interface RegisteredRoute {
  method: string;
  fullPath: string;
  handlerName: string;
  requiredRoles?: string[];
  paramMap?: Array<{ index: number; type: string; name?: string }>;
}

function bootstrap(controllerClass: any) {
  const prefix = getMeta(controllerClass, "prefix") || "";
  const prototype = controllerClass.prototype;
  const instance = new controllerClass();
  const routes: RegisteredRoute[] = [];

  const methods = Object.getOwnPropertyNames(prototype).filter(m => m !== "constructor");

  for (const m of methods) {
    const httpMethod = getMeta(prototype, "httpMethod", m);
    if (!httpMethod) continue;

    const subPath = getMeta(prototype, "path", m) || "";
    const roles = getMeta(prototype, "roles", m);
    const paramMap = getMeta(prototype, "paramMap", m);

    routes.push({
      method: httpMethod,
      fullPath: prefix + subPath,
      handlerName: m,
      requiredRoles: roles,
      paramMap: paramMap,
    });
  }

  console.log("🚀 Server initialized! Registered routes:");
  for (const r of routes) {
    const rolesTag = r.requiredRoles ? " 🔒 [Roles: " + r.requiredRoles.join(",") + "]" : "";
    console.log("  " + r.method.padEnd(7) + r.fullPath.padEnd(16) + " -> " + r.handlerName + rolesTag);
  }

  // Simulated Request Dispatcher:
  return {
    async handleRequest(req: { method: string; path: string; body?: any; userRole?: string }) {
      console.log("\\n📥 Incoming Request: " + req.method + " " + req.path);

      // Match route
      const route = routes.find(r => {
        if (r.method !== req.method) return false;
        // Simple path matcher for :id
        const pattern = new RegExp("^" + r.fullPath.replace(/:([a-zA-Z0-9_]+)/g, "([^/]+)") + "$");
        return pattern.test(req.path);
      });

      if (!route) {
        return { status: 404, error: "Route not found" };
      }

      // Check Roles Guard
      if (route.requiredRoles && (!req.userRole || !route.requiredRoles.includes(req.userRole))) {
        return { status: 403, error: "Forbidden: Insufficient permissions" };
      }

      // Extract parameter arguments
      const args: any[] = [];
      if (route.paramMap) {
        for (const p of route.paramMap) {
          if (p.type === "body") {
            args[p.index] = req.body;
          } else if (p.type === "param") {
            // Extract from path
            const parts = req.path.split("/");
            args[p.index] = parts[parts.length - 1];
          }
        }
      }

      // Invoke controller handler!
      return (instance as any)[route.handlerName](...args);
    }
  };
}

// ═══════════════════════════════════════════════════════
// 5. TEST OUR RUNNING FRAMEWORK!
// ═══════════════════════════════════════════════════════
async function runServer() {
  const app = bootstrap(UsersController);

  // Test 1: GET /users
  console.log("Response 1:", await app.handleRequest({ method: "GET", path: "/users" }));

  // Test 2: GET /users/1
  console.log("Response 2:", await app.handleRequest({ method: "GET", path: "/users/1" }));

  // Test 3: POST /users without admin role (Blocked 403)
  console.log("Response 3 (Forbidden):", await app.handleRequest({
    method: "POST",
    path: "/users",
    body: { name: "Bob", role: "user" },
    userRole: "guest"
  }));

  // Test 4: POST /users with admin role (Created 201)
  console.log("Response 4 (Success):", await app.handleRequest({
    method: "POST",
    path: "/users",
    body: { name: "Charlie", role: "editor" },
    userRole: "admin"
  }));
}

runServer();`}
          height="600px"
        />
      </div>

      <SummaryBox>
        Congratulations! You have built an entire decorator-driven backend framework from scratch. You now know exactly how NestJS controllers, routes, guards, and parameter injectors operate under the hood!
      </SummaryBox>
    </SectionContainer>
  );
}
