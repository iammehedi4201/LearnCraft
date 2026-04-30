"use client";

import { EnhancedCodeBlock } from "@/components/enhanced-code-display";
import { InfoBox } from "./InfoBox";
import { SectionWrapper } from "./SectionWrapper";
import { QuickCheck } from "./QuickCheck";

export function Section2ClassDecorators() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2. Class Decorators</h2>
      <SectionWrapper>
        <InfoBox variant="info" title="What is a Class Decorator?">
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            A class decorator is applied to the <strong>entire class</strong>. It receives the class constructor as its argument. It can add metadata, modify the class, or even replace it entirely. In NestJS, class decorators tell the framework <em>what kind of class this is</em>.
          </p>
        </InfoBox>

        <div className="space-y-6 mt-6">
          {/* Simple example */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Build Your Own — Simple Class Decorator
            </h4>
            <p className="text-sm text-slate-500 mb-3">A decorator is just a function. The simplest decorator logs when a class is created:</p>
            <EnhancedCodeBlock
              code={`// Step 1: Create a function that takes a constructor
function Logger(constructor: Function) {
  console.log(\`✅ Class created: \${constructor.name}\`);
}

// Step 2: Apply it with @
@Logger
class UserService {
  getUsers() { return ["Alice", "Bob"]; }
}

// When this file loads, the console AUTOMATICALLY prints:
// "✅ Class created: UserService"
// You didn't call Logger() yourself — the @ did it for you!`}
              language="typescript"
            />
          </div>

          {/* Decorator Factory */}
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              Decorator Factory — With Arguments (NestJS Pattern)
            </h4>
            <p className="text-sm text-slate-500 mb-3">What if you want to pass options to the decorator? You create a <strong>factory</strong> — a function that returns a function:</p>
            <EnhancedCodeBlock
              code={`// A Decorator Factory — function that RETURNS a decorator
function Controller(prefix: string) {
  // The outer function takes the argument
  return function (constructor: Function) {
    // The inner function IS the decorator
    Reflect.defineMetadata("prefix", prefix, constructor);
    console.log(\`Route prefix set: /\${prefix}\`);
  };
}

// Usage — notice the parentheses!
@Controller("users")
class UsersController {
  // NestJS reads the "users" metadata to map routes
  // All methods inside this class → /users/*
}

// Output: "Route prefix set: /users"`}
              language="typescript"
            />
          </div>

          {/* NestJS real decorators */}
          <InfoBox variant="info" title="The 3 Most Important NestJS Class Decorators">
            <div className="space-y-3 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-start gap-3">
                <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Controller(&apos;path&apos;)</code>
                <span>→ Marks a class as a route handler. All methods inside handle HTTP requests for <code>/path/*</code></span>
              </div>
              <div className="flex items-start gap-3">
                <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Injectable()</code>
                <span>→ Marks a class as a service that can be injected into other classes via the constructor</span>
              </div>
              <div className="flex items-start gap-3">
                <code className="text-blue-600 font-bold shrink-0 bg-blue-100/50 dark:bg-blue-900/30 px-2 py-0.5 rounded">@Module({`{...}`})</code>
                <span>→ Defines a module with its imports, controllers, and providers (services)</span>
              </div>
            </div>
          </InfoBox>
        </div>

        <QuickCheck
          question={`Why does @Controller('users') need parentheses but @Logger doesn't?`}
          answer={`@Logger is a plain decorator — it IS the decorator function. @Controller('users') is a Decorator Factory — it's a function that takes 'users' as an argument and RETURNS the actual decorator function. The parentheses call the outer function, which then returns the inner decorator. Whenever a decorator needs configuration, you use a factory.`}
        />
      </SectionWrapper>
    </section>
  );
}
