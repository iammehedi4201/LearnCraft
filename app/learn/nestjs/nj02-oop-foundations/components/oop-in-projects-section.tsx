import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { QuickCheck } from "./quick-check";
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
          <SectionHeading>📌 The common pattern</SectionHeading>
          <div className="space-y-3 mb-6">
            {[
              { name: "Controller", desc: "Receives requests from the internet (like a receptionist)", icon: "🚪", color: "bg-[#606f9a]/10 border-[#606f9a]/20 text-[#606f9a] dark:text-[#b4b8d7]" },
              { name: "Service", desc: "Contains the business logic and rules (like a manager)", icon: "⚙️", color: "bg-[#7f6fbe]/10 border-emerald-500/20 text-[#344b8f] dark:text-[#7f6fbe]" },
              { name: "Repository", desc: "Talks to the database (like a filing clerk)", icon: "🗄️", color: "bg-[#7b52ac]/10 border-amber-500/20 text-[#7b52ac] dark:text-[#b4b8d7]" },
              { name: "Model/Entity", desc: "Describes the shape of your data (like a form template)", icon: "📋", color: "bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-400" },
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

        <EnhancedCodeBlock code={`// ─── Model: Describes the data shape ───
class User {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// ─── Repository: Handles database operations ───
class UserRepository {
  #users = [];

  save(user) {
    this.#users.push(user);
    return user;
  }

  findById(id) {
    return this.#users.find(u => u.id === id) || null;
  }

  findAll() {
    return [...this.#users];
  }
}

// ─── Service: Contains business logic ───
class UserService {
  constructor() {
    this.userRepo = new UserRepository();
  }

  createUser(name, email) {
    if (!email.includes("@")) {
      throw new Error("Invalid email!");
    }
    const user = new User(Date.now(), name, email);
    return this.userRepo.save(user);
  }

  getUser(id) {
    const user = this.userRepo.findById(id);
    if (!user) throw new Error("User not found!");
    return user;
  }

  getAllUsers() {
    return this.userRepo.findAll();
  }
}

// ─── Controller: Handles HTTP requests ───
class UserController {
  constructor() {
    this.userService = new UserService();
  }

  handleCreateUser(name, email) {
    try {
      const user = this.userService.createUser(name, email);
      console.log("✅ Created:", user);
    } catch (err) {
      console.log("❌ Error:", err.message);
    }
  }

  handleGetAllUsers() {
    const users = this.userService.getAllUsers();
    console.log("Users:", users);
  }
}

// Using it
const controller = new UserController();
controller.handleCreateUser("Mehedi", "mehedi@test.com");
controller.handleCreateUser("Alice", "alice@test.com");
controller.handleGetAllUsers();`} language="javascript" />
      </div>

      <Divider />

      <div className="mb-16">
        <TopicHeader number={2} title="Why This Pattern?" description="Separating code into layers makes it easier to maintain, test, and change." color="emerald" />

        <InfoCallout emoji="💡" title="Benefits of layered architecture">
          <p><strong>1. Easy to change:</strong> If you switch from MongoDB to PostgreSQL, you only change the Repository. The Controller and Service don&apos;t care.</p>
          <p className="mt-1"><strong>2. Easy to test:</strong> You can test each layer independently.</p>
          <p className="mt-1"><strong>3. Easy for teams:</strong> One developer works on the Controller, another on the Service. They don&apos;t step on each other&apos;s toes.</p>
          <p className="mt-1"><strong>4. Easy to find code:</strong> Need to change a business rule? Go to the Service. Need to fix a database query? Go to the Repository.</p>
        </InfoCallout>
      </div>

      <SummaryBox>
        Real-world projects organize code into layers: <strong>Controller</strong> (handles requests), <strong>Service</strong> (business logic), <strong>Repository</strong> (database), <strong>Model</strong> (data shape). Each layer is a class with a clear responsibility. This makes code maintainable and testable.
      </SummaryBox>

      <div className="mt-6" />

      <QuickCheck question="If you need to change how data is saved to the database, which layer do you modify?" answer="The Repository layer. That's the only layer that talks directly to the database. The Controller and Service don't need to change." />

    </SectionContainer>
  );
}
