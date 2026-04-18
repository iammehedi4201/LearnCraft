import { QuickCheck } from "@/components/quick-check";

export function SectionTypeNarrowing() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">4. Type Narrowing &amp; Type Guards</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">Checking the ID Card</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          Sometimes a variable can be an &quot;A&quot; <strong>OR</strong> a &quot;B&quot;. Before you can do something that only &quot;A&quot; is allowed to do, you must prove to TypeScript that the variable is an &quot;A&quot;. This is called <strong>Type Narrowing</strong>.
        </p>
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
              — For classes (real objects)
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when working with:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
              <li>classes</li>
              <li>objects created using <code className="text-pink-600 dark:text-pink-400">new</code></li>
            </ul>
          </div>
          
          <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 h-full">
            <span className="font-bold text-slate-900 dark:text-white block mb-2 border-b border-slate-200 dark:border-slate-600 pb-2">
              <code className="text-blue-600 dark:text-blue-400 bg-blue-100/50 dark:bg-blue-900/30 px-1 rounded mr-1">in</code>
              — For checking object properties
            </span>
            <p className="text-slate-600 dark:text-slate-400 mb-2 font-medium">Use this when:</p>
            <ul className="space-y-1 text-slate-500 dark:text-slate-400 pl-4 list-disc marker:text-slate-400">
              <li>you have a union of object types</li>
              <li>and want to check if a property exists</li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-purple-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-purple-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h12l4 6-10 13L2 9z" /><path d="M11 3 8 9l4 13 4-13-3-6" /><path d="M2 9h20" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Simple Logic: Checking your ID</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>Type Narrowing</strong> is simply a way to check exactly what a value is. If a variable could be a <strong>number</strong> or a <strong>string</strong>, you use an &quot;if&quot; statement to find out. It&apos;s like a security guard asking for an ID—once you show you&apos;re a &quot;number,&quot; TypeScript lets you into the &quot;number room&quot; where you&apos;re allowed to do math.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <p className="text-sm text-slate-500 mb-3"><code className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-slate-800 px-1 rounded">typeof</code> proves whether it&apos;s a string or number before you use it.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. typeof — for primitive values
function parseInput(input: string | number) {
  if (typeof input === "string") {
    return input.toUpperCase();  // TypeScript knows it's a string here!
  }
  return input.toFixed(2);       // TypeScript knows it's a number here!
}

// 2. instanceof — for classes
class CustomError { message = "Something broke!"; }

function handleError(error: unknown) {
  if (error instanceof CustomError) {
    console.log(error.message);  // TypeScript knows it's a CustomError class!
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
            </pre>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <p className="text-sm text-slate-500 mb-3">In NestJS, you use Type Narrowing inside Exception Filters to see exactly what kind of error just crashed your app!</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`import { Catch, ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';

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
            </pre>
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
