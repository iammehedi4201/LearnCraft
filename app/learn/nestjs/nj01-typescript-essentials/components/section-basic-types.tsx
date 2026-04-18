import { QuickCheck } from "@/components/quick-check";

export function SectionBasicTypes() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">1. Basic Types</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <div className="p-5 bg-sky-500/5 rounded-2xl border border-sky-200/50 dark:border-sky-500/15 mb-8">
          <h3 className="font-bold text-base text-sky-700 dark:text-sky-400 mb-2">What is a &quot;Type&quot;?</h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            In regular JavaScript, a variable can change from a number to text to anything — JavaScript doesn&apos;t care. TypeScript adds rules that say: <strong>&quot;This variable is a number, and it will ALWAYS be a number.&quot;</strong> If you accidentally try to put text into a number variable, TypeScript will show a red error <em>before</em> your code even runs. This one feature alone prevents thousands of bugs.
          </p>
        </div>

        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">The 4 Basic Labels</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">1. The Basic Blocks</h4>
            <p className="text-xs text-slate-500 leading-relaxed flex-grow">The simplest data: text (<code className="text-blue-600">string</code>), math numbers (<code className="text-blue-600">number</code>), and simple Yes/No switches (<code className="text-blue-600">boolean</code>).</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">2. Lists (Arrays &amp; Tuples)</h4>
            <p className="text-xs text-slate-500 leading-relaxed flex-grow"><code className="text-blue-600">Array</code> is just a list of items (like a shopping list). <code className="text-blue-600">Tuple</code> is a strict list where every spot has a rule (e.g., Spot 1 must be Name, Spot 2 must be Age).</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">3. The &quot;I Don&apos;t Know&quot; Box</h4>
            <p className="text-xs text-slate-500 leading-relaxed flex-grow"><code className="text-red-500 font-bold">any</code> means &quot;Turn off all rules&quot; (Dangerous!). <code className="text-blue-600 font-bold">unknown</code> means &quot;I&apos;m not sure what this is yet, let me check before I use it&quot; (Safe!).</p>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full flex flex-col">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">4. Enums (Dropdown Menus)</h4>
            <p className="text-xs text-slate-500 leading-relaxed flex-grow">Like a dropdown menu of choices. If the only choices are Admin, User, or Guest, an Enum stops someone from accidentally typing &quot;SuperAdmin&quot;.</p>
          </div>
        </div>

        <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">In Plain English: Labeled Boxes</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Imagine you have several boxes. If you label a box <strong>&quot;Clothes&quot;</strong>, you shouldn&apos;t put <strong>&quot;Food&quot;</strong> in it. TypeScript works exactly like this. By giving variables a &quot;Type&quot; (like <code className="text-amber-600">string</code> or <code className="text-amber-600">number</code>), you are labeling them. If you try to put a number into a box labeled for words, TypeScript will stop you before you make a mistake.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. The Basic Blocks
let userName: string = "Mehedi";
let age: number = 25;
let isActive: boolean = true;

// 2. Lists (Arrays & Tuples)
let roles: string[] = ["admin", "user"];
let userTuple: [string, number] = ["Mehedi", 25]; // Strict list: [Name, Age]

// 3. The "I Don't Know" Box
let unknownValue: any = "anything";      // ⚠️ Turns off all rules (Dangerous!)
let safeValue: unknown = "check first";  // ✅ Must check before using (Safe!)

// 4. Enums (Dropdown Menus)
enum Role {
  USER = "USER",
  ADMIN = "ADMIN",
}`}
            </pre>
          </div>

          <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="text-base">⚡</span>
              Why <code className="bg-red-200/50 dark:bg-red-800/30 px-1 rounded">any</code> is Dangerous — Live Demo
            </h4>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// ❌ any — TypeScript becomes blind. No error here...
let value: any = "hello";
value.toFixed(2);  // No compile error! But CRASHES at runtime!
//                    "hello".toFixed is not a function 💥

// ✅ unknown — TypeScript forces you to check first
let safe: unknown = "hello";
// safe.toFixed(2);  // ❌ Error! TypeScript says: "Check what it is first!"

if (typeof safe === "string") {
  safe.toUpperCase();  // ✅ Now TypeScript knows it's a string — allowed!
}
if (typeof safe === "number") {
  safe.toFixed(2);     // ✅ Now TypeScript knows it's a number — allowed!
}`}
            </pre>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <p className="text-sm text-slate-500 mb-3">In NestJS, we use these basic types and enums to define exactly what data a Controller or Service expects.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('users')
export class UsersController {
  
  @Get(':id')
  // The 'id' parameter is strictly forced to be a string
  // The function promises to return a string
  getUser(@Param('id') id: string): string {
    return \`User ID: \${id}\`;
  }
  
  @Get()
  // The 'role' must be one of our exact Enum choices
  getUsersByRole(@Query('role') role: Role): string[] {
    if (role === Role.ADMIN) {
      return ["Alice", "Bob"];
    }
    return [];
  }
}`}
            </pre>
          </div>
        </div>

        <QuickCheck
          question="What's wrong with this code?"
          code={`let price: number = "29.99";`}
          answer='You labeled "price" as a number, but assigned a string value "29.99" (with quotes). TypeScript will show a red error immediately! Fix: either remove the quotes (let price: number = 29.99) or change the type to string.'
        />
      </div>
    </section>
  );
}
