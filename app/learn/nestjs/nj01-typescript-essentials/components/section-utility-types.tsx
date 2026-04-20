import { QuickCheck } from "@/components/quick-check";
import { EnhancedCodeBlock, ExplainerSection } from "@/components/enhanced-code-display";

export function SectionUtilityTypes() {
  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">2.5 Utility Types — Built-in Shortcuts</h2>

      <div className="bg-white dark:bg-slate-900/50 p-6 rounded-lg border border-gray-200 dark:border-slate-800 mb-6">
        <ExplainerSection 
          title="TypeScript's Built-in Power Tools"
          icon={<svg className="w-5 h-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" /></svg>}
        >
          TypeScript comes with built-in shortcuts called <strong>Utility Types</strong>. Instead of rewriting interfaces from scratch, you can transform existing ones. Think of them as <strong>photo filters</strong> — you start with one interface and apply a &quot;filter&quot; to create a new version.
        </ExplainerSection>

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
            <ExplainerSection title="Deriving types" variant="warning">
              Start from one interface, derive everything else.
            </ExplainerSection>

            <ExplainerSection title="Step 1: Define the base" variant="info">
              <code className="text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 px-1 rounded">interface Post</code> contains all the fields: id, title, content, author, and createdAt.
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: Date;
}`}
            />

            <ExplainerSection title="Step 2: Omit for creation" variant="info">
              When creating a post, the server generates <code>id</code> and <code>createdAt</code> automatically. So remove them from the creation DTO.
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`type CreatePostDto = Omit<Post, 'id' | 'createdAt'>;
// Result: { title: string; content: string; author: string; }`}
            />

            <ExplainerSection title="Step 3: Partial for updates" variant="info">
              When updating a post, users only send the fields they want to change. Make everything optional.
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`type UpdatePostDto = Partial<CreatePostDto>;
// Result: { title?: string; content?: string; author?: string; }`}
            />

            <ExplainerSection title="Step 4: Pick for preview" variant="info">
              For a blog preview, only show the title and author—everything else is hidden.
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`type PostPreview = Pick<Post, 'title' | 'author'>;
// Result: { title: string; author: string; }`}
            />
          </div>

          <div>
            <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <span className="bg-blue-500 text-white w-6 h-6 rounded flex items-center justify-center text-xs">2</span>
              How it is used in NestJS
            </h4>
            <ExplainerSection title="NestJS DTOs" variant="info">
              NestJS DTOs heavily use Utility Types to avoid code duplication. Define ONE base interface, then derive all your DTOs from it.
            </ExplainerSection>
            
            <ExplainerSection title="The Base User Interface" variant="success">
              This contains all possible user fields that come from the database. You'll never use this directly for endpoints—always derive a specialized DTO instead.
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}`}
            />

            <ExplainerSection title="Derived DTOs for different purposes" variant="success">
              <ul className="text-xs space-y-1 list-disc pl-4">
                <li><code>CreateUserDto</code> - Remove id & createdAt (server generates these)</li>
                <li><code>UpdateUserDto</code> - Make everything optional</li>
                <li><code>PublicUserDto</code> - Remove password (never send to frontend)</li>
              </ul>
            </ExplainerSection>

            <EnhancedCodeBlock 
              code={`type CreateUserDto = Omit<User, 'id' | 'createdAt'>;
type UpdateUserDto = Partial<CreateUserDto>;
type PublicUserDto = Omit<User, 'password'>;

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() dto: CreateUserDto) { /* ... */ }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) { /* ... */ }
}`}
            />
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
