import { QuickCheck } from "@/components/quick-check";

export function SectionInterfaces() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Interfaces vs Type Aliases</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Choosing the Right Tool</h3>
        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-700 mb-8">
          <ul className="space-y-4">
            <li className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                <span className="text-blue-600 text-xs font-bold">1</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Interfaces = Blueprints</h5>
                <p className="text-slate-500 text-xs mt-1">An Interface is just a blueprint for an object. It says: &quot;A User object must have a name, an email, and an age.&quot; You can easily add more rules to a blueprint later if you need to.</p>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-6 w-6 rounded-full bg-indigo-500/10 flex items-center justify-center shrink-0">
                <span className="text-indigo-600 text-xs font-bold">2</span>
              </div>
              <div>
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Types = Nicknames</h5>
                <p className="text-slate-500 text-xs mt-1">A Type is like giving a nickname to something. If an ID can be a number OR a string, you can just call it <code className="text-indigo-600">IDType</code>. Once you make a nickname, you can&apos;t change it.</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="overflow-x-auto mb-8">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                <th className="py-3 px-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">Feature</th>
                <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-blue-600"><code>interface</code></th>
                <th className="py-3 px-4 text-center text-xs font-bold uppercase tracking-wider text-indigo-600"><code>type</code></th>
              </tr>
            </thead>
            <tbody className="text-xs text-slate-600 dark:text-slate-400">
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 px-4">Object shapes</td>
                <td className="py-2 px-4 text-center text-emerald-600 font-bold">✅ Best choice</td>
                <td className="py-2 px-4 text-center">✅ Works</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 px-4">Unions (<code>A | B</code>)</td>
                <td className="py-2 px-4 text-center text-red-500">❌ Cannot do</td>
                <td className="py-2 px-4 text-center text-emerald-600 font-bold">✅ Best choice</td>
              </tr>
              <tr className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-2 px-4">Extending later</td>
                <td className="py-2 px-4 text-center text-emerald-600 font-bold">✅ Can extend</td>
                <td className="py-2 px-4 text-center text-red-500">❌ Cannot reopen</td>
              </tr>
              <tr>
                <td className="py-2 px-4">NestJS convention</td>
                <td className="py-2 px-4 text-center text-emerald-600 font-bold">✅ Preferred</td>
                <td className="py-2 px-4 text-center">Use for unions</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-blue-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Simple Concept: A List of Rules</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              An <strong>Interface</strong> is just a simple &quot;List of Rules&quot; for an object. For example, if you say a <strong>User</strong> object <em>must</em> have a name and an email, TypeScript will make sure you don&apos;t forget them. It&apos;s like a contract—as long as you follow the rules, your code is safe.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <p className="text-sm text-slate-500 mb-3">An interface is a blueprint for an object.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. Interfaces = Blueprints for objects
interface User {
  name: string;
  email: string;
  age: number;
}

const newUser: User = {
  name: "Alice",
  email: "alice@example.com",
  age: 28
};

// 2. Types = Nicknames
// An IDType can be EITHER a number OR a string
type IDType = number | string;

let myId: IDType = 101; 
let yourId: IDType = "USER-101";`}
            </pre>
          </div>

          <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10">
            <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
              <span className="text-base">💥</span>
              What happens when you break the rules?
            </h4>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`interface User {
  name: string;
  email: string;
}

// ❌ TypeScript ERROR — missing 'email' property!
const badUser: User = { name: "Alice" };
//    ^^^^^^^ Property 'email' is missing in type '{ name: string; }'

// ❌ TypeScript ERROR — extra property not in the blueprint!
const anotherBad: User = { name: "Bob", email: "bob@test.com", phone: "123" };
//                                                              ^^^^^ 'phone' does not exist

// ✅ Correct — follows the blueprint exactly
const goodUser: User = { name: "Alice", email: "alice@test.com" };`}
            </pre>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <p className="text-sm text-slate-500 mb-3">In NestJS, Interfaces (and Classes) act as DTOs (Data Transfer Objects). They serve as the exact blueprint for incoming request bodies!</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// NestJS DTO blueprint
interface CreateUserDto {
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  
  @Post()
  // NestJS uses the CreateUserDto blueprint to validate
  // the incoming request body before the code even runs!
  create(@Body() body: CreateUserDto) {
    return \`Creating user \${body.name} with email \${body.email}\`;
  }
}`}
            </pre>
          </div>
        </div>

        <QuickCheck
          question="If you need a type that is either a string OR a number, which should you use — interface or type?"
          answer='Use "type"! Interfaces cannot represent unions (A | B). The correct answer is: type StringOrNumber = string | number;'
        />
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 border-l-4 border-blue-500 p-6 rounded">
        <h3 className="font-semibold text-lg mb-3 text-blue-900 dark:text-blue-400">
          🏗️ NestJS Convention
        </h3>
        <p className="text-blue-800 dark:text-blue-300 text-sm">
          <strong>Use interfaces</strong> for DTOs, entity shapes, and service contracts. NestJS uses interfaces extensively for defining the shape of data flowing through controllers, services, and repositories.
        </p>
      </div>
    </section>
  );
}
