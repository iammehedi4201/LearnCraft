import { QuickCheck } from "@/components/quick-check";

export function SectionGenerics() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Generics — Reusable Type Patterns</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">The Power of Generics</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          Sometimes you want to build a tool that works with <em>any</em> type of data, but without turning off the rules using <code className="text-red-500">any</code>. Generics are like a <span className="font-bold text-blue-600">fill-in-the-blank</span> label. You don&apos;t say what type it is right away; you let the person using the tool fill in the blank!
        </p>

        <div className="p-5 bg-red-500/5 rounded-2xl border border-red-500/10 mb-6">
          <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <span className="text-base">😫</span>
            Life WITHOUT Generics (the pain)
          </h4>
          <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
            {`// ❌ Without Generics — you'd copy-paste for EVERY type:
interface StringResponse {
  success: boolean;
  data: string;        // <-- only this line changes!
}
interface NumberResponse {
  success: boolean;
  data: number;        // <-- same structure, different type
}
interface UserResponse {
  success: boolean;
  data: User;          // <-- again, same structure...
}
// This is repetitive and unmaintainable! 😩`}
          </pre>
        </div>
        <div className="p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8">
          <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
            <span className="text-base">✨</span>
            Life WITH Generics (the solution)
          </h4>
          <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
            {`// ✅ With Generics — ONE definition works for ALL types:
interface ApiResponse<T> {
  success: boolean;
  data: T;  // <-- T is a "fill-in-the-blank" placeholder
}

// Now just fill in the blank!
const userRes: ApiResponse<User> = { success: true, data: someUser };
const numRes: ApiResponse<number> = { success: true, data: 42 };
const strRes: ApiResponse<string> = { success: true, data: "hello" };
// One interface. Infinite possibilities. 🎉`}
          </pre>
        </div>

        <div className="p-5 bg-amber-500/5 rounded-2xl border border-amber-500/10 mb-8">
          <h4 className="font-bold text-sm text-amber-700 dark:text-amber-400 mb-3">How &lt;T&gt; Works — Step by Step</h4>
          <ol className="text-xs text-slate-600 dark:text-slate-400 space-y-2 list-decimal pl-5">
            <li><code className="text-amber-600 font-bold">&lt;T&gt;</code> is just a placeholder name. You could call it <code className="text-amber-600">&lt;Type&gt;</code>, <code className="text-amber-600">&lt;Item&gt;</code>, <code className="text-amber-600">&lt;Data&gt;</code> — anything. <code>T</code> is just the convention.</li>
            <li>When you <strong>use</strong> the generic (e.g., <code className="text-amber-600">ApiResponse&lt;User&gt;</code>), TypeScript replaces every <code>T</code> inside with <code>User</code>.</li>
            <li>From that point on, TypeScript <strong>strictly enforces</strong> the substituted type — you can&apos;t put a <code>string</code> where a <code>User</code> belongs.</li>
          </ol>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-blue-100 dark:border-blue-900/30 bg-blue-500/5">
            <h5 className="text-xs font-bold text-blue-600 uppercase mb-1">Write Once, Use Anywhere</h5>
            <p className="text-[11px] text-slate-500">Instead of building a &quot;Cat List&quot; and a &quot;Dog List,&quot; just build an &quot;Animal List&quot; and fill in the blank later.</p>
          </div>
          <div className="p-4 rounded-xl border border-emerald-100 dark:border-emerald-900/30 bg-emerald-500/5">
            <h5 className="text-xs font-bold text-emerald-600 uppercase mb-1">Perfect Memory</h5>
            <p className="text-[11px] text-slate-500">If you fill the blank with &quot;Dog&quot;, TypeScript will strictly remember it is a Dog, unlike <code className="text-slate-700 font-bold">any</code>.</p>
          </div>
        </div>

        <div className="p-6 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-8 flex gap-5 items-start">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
          </div>
          <div>
            <h5 className="font-bold text-slate-900 dark:text-white text-sm mb-1">Easy View: The Flexible Box</h5>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              A <strong>Generic</strong> is like a box that can hold anything, but it still remembers what&apos;s inside. Imagine a box labeled &quot;Item Box.&quot; You can put a toy in it, or a book. But once you put a toy in, the box <em>becomes</em> a <strong>Toy Box</strong>. Generics lets you build things that work for many different items without losing track of what they are.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <p className="text-sm text-slate-500 mb-3">A generic &quot;fill-in-the-blank&quot; function.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// 1. A generic Class (Matches the "Item Box" analogy)
class ItemBox<T> {
  item: T;
  
  constructor(item: T) {
    this.item = item;
  }
  
  getItem(): T {
    return this.item;
  }
}

const stringBox = new ItemBox<string>("A shiny new toy");
const myToy = stringBox.getItem();  // TS remembers this is a string

// 2. A generic Interface (Matches the "Animal List" analogy)
interface AnimalList<T> {
  animals: T[];
  add(animal: T): void;
}

type Dog = { name: string, barks: boolean };
type Cat = { name: string, purrs: boolean };

// Create a list completely strictly tailored to Dogs!
const dogList: AnimalList<Dog> = {
  animals: [],
  add: (dog) => console.log("Added dog: " + dog.name)
};`}
            </pre>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <p className="text-sm text-slate-500 mb-3">In NestJS, Generics are used heavily to create reusable API wrappers and reusable Database services.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// Universal API Response Wrapper
interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: Date;
}

@Injectable()
export class UserService {
  
  // This service returns an ApiResponse, filled in with a 'User' object
  getUser(id: number): ApiResponse<User> {
    const user: User = { id, name: 'Alice', email: 'alice@test.com' };
    
    return {
      success: true,
      data: user, // Must match the <User> type!
      timestamp: new Date()
    };
  }
}`}
            </pre>
          </div>
        </div>

        <QuickCheck
          question={`What is the difference between using "any" and using a Generic <T>?`}
          answer={`With "any", TypeScript forgets the type completely — you lose all safety. With a Generic <T>, TypeScript remembers the specific type you filled in. For example, ApiResponse<User> will guarantee that "data" is always a User object. "any" would let you put anything there and TypeScript wouldn't warn you.`}
        />
      </div>
    </section>
  );
}
