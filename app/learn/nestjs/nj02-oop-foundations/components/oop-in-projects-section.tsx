"use client";

import { QuickCheck } from "./quick-check";
import { Playground } from "@/components/playground/Playground";
import { SectionContainer, TopicHeader, SectionHeading, AnalogyBox, Divider, SummaryBox, InfoCallout } from "./shared-components";

export function OopInProjectsSection() {
  return (
    <SectionContainer number={10} title="OOP in Real Projects">

      <div className="mb-16">
        <TopicHeader number={1} title="How OOP Appears in Backend APIs" description="In real Node.js/NestJS projects, developers organize code into layers. Each layer is a class with a specific job." color="primary" />

        <AnalogyBox emoji="🏢" title="Think about it like this">
          <p>Think of a company. The <strong>Receptionist</strong> (Controller) takes requests from visitors. The <strong>Manager</strong> (Service) decides what to do. The <strong>Filing Clerk</strong> (Repository) stores and retrieves documents. Each person has a clear job. They don&apos;t do each other&apos;s work.</p>
        </AnalogyBox>

        <div className="mb-8">
          <SectionHeading>📌 The 4 Key Layers</SectionHeading>
          <div className="space-y-3 mb-6">
            {[
              { name: "Controller", desc: "Receives requests from the client (like a receptionist)", icon: "🚪", color: "bg-[#606f9a]/10 border-[#606f9a]/20 text-[#606f9a] dark:text-[#b4b8d7]" },
              { name: "Service", desc: "Contains business rules and logic (like a manager)", icon: "⚙️", color: "bg-[#7f6fbe]/10 border-emerald-500/20 text-[#344b8f] dark:text-[#7f6fbe]" },
              { name: "Repository", desc: "Talks to the database / memory store (like a filing clerk)", icon: "🗄️", color: "bg-[#7b52ac]/10 border-amber-500/20 text-[#7b52ac] dark:text-[#b4b8d7]" },
              { name: "Model/Entity", desc: "Describes the shape of the data (like a form template)", icon: "📋", color: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400" },
            ].map((item) => (
              <div key={item.name} className={`flex items-start gap-4 p-4 rounded-xl border ${item.color}`}>
                <span className="text-xl">{item.icon}</span>
                <div>
                  <span className="font-bold text-sm">{item.name}</span>
                  <span className="text-sm text-slate-600 dark:text-slate-400"> — {item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <SectionHeading>🚀 Try It: Controller → Service → Repository in Action</SectionHeading>
          <Playground
            runtime="typescript"
            language="TypeScript"
            starterCode={`// ─── 1. Entity / Model ───
class User {
  constructor(public id: number, public name: string, public email: string) {}
}

// ─── 2. Repository (Data Access) ───
class UserRepository {
  private users: User[] = [];

  save(user: User): User {
    this.users.push(user);
    return user;
  }

  findById(id: number): User | null {
    return this.users.find(u => u.id === id) || null;
  }

  findAll(): User[] {
    return [...this.users];
  }
}

// ─── 3. Service (Business Logic) ───
class UserService {
  private userRepo: UserRepository;

  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser(name: string, email: string): User {
    if (!email.includes("@")) {
      throw new Error("Invalid email format!");
    }
    const user = new User(Date.now(), name, email);
    return this.userRepo.save(user);
  }

  getUser(id: number): User {
    const user = this.userRepo.findById(id);
    if (!user) throw new Error("User with ID " + id + " not found!");
    return user;
  }

  getAllUsers(): User[] {
    return this.userRepo.findAll();
  }
}

// ─── 4. Controller (HTTP Handler) ───
class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  handleCreateUser(name: string, email: string) {
    try {
      const user = this.userService.createUser(name, email);
      console.log("✅ 201 Created: " + user.name + " (" + user.email + ")");
    } catch (err: any) {
      console.log("❌ 400 Bad Request: " + err.message);
    }
  }

  handleListUsers() {
    const users = this.userService.getAllUsers();
    console.log("📋 200 OK: Total " + users.length + " users");
    users.forEach(u => console.log("   • " + u.name + " <" + u.email + ">"));
  }
}

// Simulate API Requests
const controller = new UserController();
controller.handleCreateUser("Mehedi", "mehedi@test.com");
controller.handleCreateUser("Alice", "alice@test.com");
controller.handleCreateUser("InvalidUser", "bad-email");
controller.handleListUsers();`}
            height="420px"
          />
        </div>

        <InfoCallout emoji="💡" title="This is exactly how NestJS works!">
          <p>When you learn NestJS, you will see this exact Controller → Service pattern in every single module. By understanding OOP today, you are already learning the architecture of NestJS!</p>
        </InfoCallout>
      </div>

      <Divider />

      <SummaryBox>
        In real projects (like NestJS), code is organized into layers: <strong>Controllers</strong> handle requests, <strong>Services</strong> handle business logic, <strong>Repositories</strong> handle data access, and <strong>Entities</strong> describe data shapes. Each layer is an OOP class with a single responsibility.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck question="Why do we separate Controllers and Services into different classes?" answer="Separation of concerns! The Controller only handles incoming HTTP requests/responses. The Service contains the actual business logic and rules. This makes code easier to test, maintain, and reuse." />

    </SectionContainer>
  );
}
