import { QuickCheck } from "@/components/quick-check";
import { EnhancedCodeBlock, ExplainerSection } from "@/components/enhanced-code-display";

export function SectionTypeNarrowing() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Type Narrowing &amp; Type Guards</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <ExplainerSection 
          title="Checking the ID Card"
          icon={<svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>}
        >
          Sometimes a variable can be an &quot;A&quot; <strong>OR</strong> a &quot;B&quot;. Before you can do something that only &quot;A&quot; is allowed to do, you must prove to TypeScript that the variable is an &quot;A&quot;. This is called <strong>Type Narrowing</strong>.
        </ExplainerSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs text-left">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
            <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
              <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">typeof</code>
              — For primitive values
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when dealing with:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
              <li><code className="text-blue-600 dark:text-blue-400">string</code></li>
              <li><code className="text-emerald-600 dark:text-emerald-400">number</code></li>
              <li><code className="text-rose-600 dark:text-rose-400">boolean</code></li>
              <li><code className="text-amber-600 dark:text-amber-500">undefined</code></li>
            </ul>
          </div>

          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
            <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
              <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">instanceof</code>
              — For classes
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Was this object created from this class?</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
              <li>Works with <code className="text-pink-600 dark:text-pink-400">new</code> keyword</li>
              <li>Checks class lineage</li>
            </ul>
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
            <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
              <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">in</code>
              — For property checks
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
              <li>you have a union of object types</li>
              <li>checking if a property exists</li>
            </ul>
          </div>
        </div>

        <ExplainerSection 
          title="Simple Logic: Checking your ID" 
          variant="info"
          icon={<svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></svg>}
        >
          <strong>Type Narrowing</strong> is simply a way to check exactly what a value is. If a variable could be a <strong>number</strong> or a <strong>string</strong>, you use an &quot;if&quot; statement to find out. It&apos;s like a security guard asking for an ID—once you show you&apos;re a &quot;number,&quot; TypeScript lets you into the &quot;number room&quot; where you&apos;re allowed to do math.
        </ExplainerSection>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <ExplainerSection title="Proving types with typeof and instanceof" variant="warning">
              <code className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-800 px-1 rounded">typeof</code> is for basics, <code className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-800 px-1 rounded">instanceof</code> is for classes.
            </ExplainerSection>
            <EnhancedCodeBlock 
              code={`// 1. typeof — for primitive values
function parseInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();  // TS knows it's a string!
  }
  return input.toFixed(2);       // TS knows it's a number!
}

// 2. instanceof — "Was this created from this class?"
class User {}
class Admin {}

const u = new User();

u instanceof User   // true
u instanceof Admin  // false

function checkPermissions(person: User | Admin) {
  if (person instanceof Admin) {
    // TypeScript now allows admin-only actions!
  }
}

// 3. in — for checking object properties
type AdminUser = { role: "admin"; privileges: string[] };
type RegularUser = { role: "user"; name: string };

function getPrivileges(user: AdminUser | RegularUser) {
  if ("privileges" in user) {
    return user.privileges;  // TypeScript knows it's AdminUser!
  }
  return [];  // It's a RegularUser — no privileges
}`}
            />
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <ExplainerSection title="Exception Filters" variant="success">
              In NestJS, you use Type Narrowing inside Exception Filters to see exactly what kind of error just crashed your app!
            </ExplainerSection>
            <EnhancedCodeBlock 
              code={`import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    
    // Type Narrowing! Is the unknown error an instance of an HttpException?
    if (exception instanceof HttpException) {
      // Yes! We are safe to check its status code
      const status = exception.getStatus();
      response.status(status).json({ message: exception.message });
      
    } else {
      // No! It's some other random crash.
      response.status(500).json({ message: "Internal Server Error" });
    }
  }
}`}
            />
          </div>
        </div>

        <QuickCheck
          question={`You have a variable "value" of type "string | number". You want to call .toUpperCase() on it. What do you need to do first?`}
          code={`function process(value: string | number) {\n  // Can you call value.toUpperCase() here?\n}`}
          answer={`You must narrow the type first using "if (typeof value === 'string')". Only inside that if-block does TypeScript know it's safe to call .toUpperCase(). Without the check, TypeScript will show an error because numbers don't have a .toUpperCase() method.`}
        />
      </div>
    </section>
  );
}
