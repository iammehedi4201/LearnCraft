import { QuickCheck } from "@/components/quick-check";

export function SectionUtilityTypes() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2.5 Utility Types — Built-in Shortcuts</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <h3 className="font-semibold text-lg mb-4 text-gray-800 dark:text-slate-200">TypeScript&apos;s Built-in Power Tools</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
          TypeScript comes with built-in shortcuts called <strong>Utility Types</strong>. Instead of rewriting interfaces from scratch, you can transform existing ones. Think of them as <strong>photo filters</strong> — you start with one interface and apply a &quot;filter&quot; to create a new version.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="p-4 rounded-xl border border-orange-100 dark:border-orange-900/30 bg-orange-500/5">
            <h5 className="text-xs font-bold text-orange-600 uppercase mb-1">Omit&lt;T, Keys&gt;</h5>
            <p className="text-[11px] text-slate-500">&quot;Copy this interface, but <strong>remove</strong> these fields.&quot; Like making a photocopy and then crossing out two lines.</p>
          </div>
          <div className="p-4 rounded-xl border border-violet-100 dark:border-violet-900/30 bg-violet-500/5">
            <h5 className="text-xs font-bold text-violet-600 uppercase mb-1">Partial&lt;T&gt;</h5>
            <p className="text-[11px] text-slate-500">&quot;Copy this interface, but make <strong>everything optional</strong>.&quot; Perfect for update forms where users only fill in what they want to change.</p>
          </div>
          <div className="p-4 rounded-xl border border-teal-100 dark:border-teal-900/30 bg-teal-500/5">
            <h5 className="text-xs font-bold text-teal-600 uppercase mb-1">Pick&lt;T, Keys&gt;</h5>
            <p className="text-[11px] text-slate-500">&quot;Copy this interface, but <strong>only keep</strong> these fields.&quot; The opposite of Omit.</p>
          </div>
          <div className="p-4 rounded-xl border border-cyan-100 dark:border-cyan-900/30 bg-cyan-500/5">
            <h5 className="text-xs font-bold text-cyan-600 uppercase mb-1">Required&lt;T&gt;</h5>
            <p className="text-[11px] text-slate-500">&quot;Copy this interface, but make <strong>everything required</strong>.&quot; The opposite of Partial.</p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-amber-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">1</span>
              Step-by-Step Example
            </h4>
            <p className="text-sm text-slate-500 mb-3">Start from one interface, derive everything else.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// Step 1: Define the full object shape
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}

// Step 2: Omit — "Copy Post, but REMOVE id and createdAt"
// Why? When creating a post, the server generates id and createdAt.
type CreatePostDto = Omit<Post, 'id' | 'createdAt'>;
// Result: { title: string; content: string; author: string; }

// Step 3: Partial — "Copy CreatePostDto, but make everything OPTIONAL"
// Why? When updating, users only send the fields they want to change.
type UpdatePostDto = Partial<CreatePostDto>;
// Result: { title?: string; content?: string; author?: string; }

// Step 4: Pick — "Copy Post, but ONLY keep title and author"
type PostPreview = Pick<Post, 'title' | 'author'>;
// Result: { title: string; author: string; }`}
            </pre>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <p className="text-sm text-slate-500 mb-3">NestJS DTOs heavily use Utility Types to avoid code duplication.</p>
            <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
              {`// In NestJS, you define ONE base interface...
interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

// ...and derive ALL your DTOs from it:
type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDto = Partial<CreateUserDto>;
type PublicUserDto = Omit<User, 'password'>; // Hide password from API responses

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() dto: CreateUserDto) { /* ... */ }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) { /* ... */ }
}`}
            </pre>
          </div>
        </div>

        <QuickCheck
          question='You have an interface Product with fields: id, name, price, description. You want a type for creating a product that does NOT include "id". What do you write?'
          answer='type CreateProductDto = Omit<Product, "id">; — This copies the Product interface but removes the id field, since the server generates IDs automatically.'
        />
      </div>
    </section>
  );
}
