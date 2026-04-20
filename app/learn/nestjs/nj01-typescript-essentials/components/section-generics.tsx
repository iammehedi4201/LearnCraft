import { QuickCheck } from "@/components/quick-check";
import { EnhancedCodeBlock, ExplainerSection } from "@/components/enhanced-code-display";

export function SectionGenerics() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">3. Generics — Reusable Type Patterns</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <ExplainerSection 
          title="The Power of Generics"
          icon={<svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>}
        >
          Sometimes you want to build a tool that works with <em>any</em> type of data, but without turning off the rules using <code className="text-red-500">any</code>. Generics are like a <span className="font-bold text-blue-600">fill-in-the-blank</span> label. You don&apos;t say what type it is right away; you let the person using the tool fill in the blank!
        </ExplainerSection>

        <div>
          <h4 className="font-bold text-sm text-red-700 dark:text-red-400 mb-2 flex items-center gap-2">
            <span className="text-base">😫</span>
            Life WITHOUT Generics (the pain)
          </h4>

          <ExplainerSection title="The Problem: Repetition" variant="danger">
            Without generics, you'd copy-paste the same structure for EVERY type. Only the <code>data</code> field changes! This creates hundreds of lines of duplicated code that&apos;s unmaintainable and error-prone.
          </ExplainerSection>

          <EnhancedCodeBlock 
            code={`interface StringResponse {
  success: boolean;
  data: string;
}
interface NumberResponse {
  success: boolean;
  data: number;
}
interface UserResponse {
  success: boolean;
  data: User;
}`}
          />
        </div>

        <div className="mt-8">
          <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-400 mb-2 flex items-center gap-2">
            <span className="text-base">✨</span>
            Life WITH Generics (the solution)
          </h4>

          <ExplainerSection title="Reusable Generic Interface" variant="success">
            With generics, ONE definition works for ALL types. The placeholder <code className="text-emerald-600 font-bold">&lt;T&gt;</code> means "any type you want". Now you just fill in the blank!
          </ExplainerSection>

          <EnhancedCodeBlock 
            code={`interface ApiResponse<T> {
  success: boolean;
  data: T;
}

const userRes: ApiResponse<User> = { success: true, data: someUser };
const numRes: ApiResponse<number> = { success: true, data: 42 };
const strRes: ApiResponse<string> = { success: true, data: "hello" };`}
          />
        </div>

        <ExplainerSection 
          title="How <T> Works — Step by Step" 
          variant="warning"
        >
          <ol className="text-xs space-y-2 list-decimal pl-5">
            <li><code className="text-amber-600 font-bold">&lt;T&gt;</code> is just a placeholder name. You could call it <code className="text-amber-600">&lt;Type&gt;</code>, <code className="text-amber-600">&lt;Item&gt;</code>, <code className="text-amber-600">&lt;Data&gt;</code> — anything. <code>T</code> is just the convention.</li>
            <li>When you <strong>use</strong> the generic (e.g., <code className="text-amber-600">ApiResponse&lt;User&gt;</code>), TypeScript replaces every <code>T</code> inside with <code>User</code>.</li>
            <li>From that point on, TypeScript <strong>strictly enforces</strong> the substituted type — you can&apos;t put a <code>string</code> where a <code>User</code> belongs.</li>
          </ol>
        </ExplainerSection>

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

        <ExplainerSection 
          title="Easy View: The Flexible Box" 
          variant="success"
          icon={<svg className="w-5 h-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>}
        >
          A <strong>Generic</strong> is like a box that can hold anything, but it still remembers what&apos;s inside. Imagine a box labeled &quot;Item Box.&quot; You can put a toy in it, or a book. But once you put a toy in, the box <em>becomes</em> a <strong>Toy Box</strong>. Generics lets you build things that work for many different items without losing track of what they are.
        </ExplainerSection>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Plain TypeScript Example
            </h4>
            <ExplainerSection title="Write once, use anywhere" variant="info">
              A generic &quot;fill-in-the-blank&quot; function.
            </ExplainerSection>
            <EnhancedCodeBlock 
              code={`// 1. A generic Class (Matches the "Item Box" analogy)
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
            />
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <ExplainerSection title="NestJS Context" variant="success">
              In NestJS, Generics are used heavily to create reusable API wrappers and reusable Database services.
            </ExplainerSection>
            <EnhancedCodeBlock 
              code={`// Universal API Response Wrapper
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
            />
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
