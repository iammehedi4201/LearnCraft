"use client";

import { Playground } from "@/components/playground/Playground";
import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  SectionHeading,
  AnalogyBox,
  WhyBox,
  SummaryBox,
  Divider,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE: WHAT IS A NESTJS MODULE?
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: What is a NestJS Module?">
      {/* ── 1.1 What is a Module? ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="What is a Module in NestJS?"
          description="A module is a box that groups related controllers and services together into one neat package."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>📦</span> Why do we organize code into Modules?
          </h4>
          <p className="text-sm text-ds-text-sub leading-relaxed mb-3">
            In a small app with 2 routes, you could put everything in one file. But in a real-world app with 50+ routes (Users, Products, Orders, Payments, Reviews), putting everything in one place becomes a total mess.
          </p>
          <p className="text-sm text-ds-text-strong leading-relaxed font-bold">
            Modules help you divide your application into self-contained domains:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-ds-text-sub">
            <li><strong>UsersModule</strong>: Manages user accounts, profiles, and avatars.</li>
            <li><strong>ProductsModule</strong>: Manages catalog, inventory, and pricing.</li>
            <li><strong>OrdersModule</strong>: Manages checkout, cart, and shipping.</li>
            <li><strong>AuthModule</strong>: Manages login, passwords, and security tokens.</li>
          </ul>
        </WhyBox>

        <AnalogyBox emoji="🧱" title="Simple Real-Life Story: The LEGO Kit">
          <p>
            Imagine opening a huge 2,000-piece LEGO castle kit. If all 2,000 pieces were mixed together in one giant bag, building the castle would be frustrating and slow.
          </p>
          <p className="mt-2">
            Instead, LEGO gives you <strong>numbered bags (Bag 1: Foundation, Bag 2: Walls, Bag 3: Towers)</strong>. Each bag has only the pieces needed for that specific part.
          </p>
          <p className="mt-2 font-bold text-ds-info-dark">
            In NestJS, each Module is like one numbered LEGO bag. It keeps everything organized and easy to build!
          </p>
        </AnalogyBox>
      </div>

      <Divider />

      {/* ── 1.2 Module Structure Preview ── */}
      <div className="mb-16">
        <TopicHeader
          number={2}
          title="A First Look at a NestJS Module"
          description="A module is simply a TypeScript class decorated with @Module()."
          color="sky"
        />

        <div className="mb-8">
          <SectionHeading>🚀 Try It Yourself: How a Module Groups Components</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// A simulated NestJS Module in pure TypeScript:

class UsersService {
  findUser(id: number) {
    return { id, name: "Mehedi", role: "Developer" };
  }
}

class UsersController {
  constructor(private usersService: UsersService) {}

  getUser(id: number) {
    return this.usersService.findUser(id);
  }
}

// In NestJS, @Module() binds the controller and service together:
class UsersModule {
  controllers = [UsersController];
  providers = [UsersService];
}

// Running the module:
const service = new UsersService();
const controller = new UsersController(service);
console.log("Found User:", controller.getUser(1));`}
            height="380px"
          />
        </div>

        <SummaryBox>
          Every NestJS application has at least one root module (<code>AppModule</code>). As your app grows, you create separate feature modules.
        </SummaryBox>

        <QuickCheck
          question="What is the main purpose of a NestJS Module?"
          answer="To group related controllers and services into cohesive, organized, self-contained packages (like UsersModule, ProductsModule, AuthModule)."
        />
      </div>
    </SectionContainer>
  );
}
