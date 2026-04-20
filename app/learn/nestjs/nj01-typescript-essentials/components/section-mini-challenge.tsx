import { Collapsible } from "@/components/collapsible";
import { EnhancedCodeBlock } from "@/components/enhanced-code-display";

export function SectionMiniChallenge() {
  return (
    <section className="mt-12 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/50 rounded-lg">
      <h3 className="font-semibold text-lg mb-3 text-amber-900 dark:text-amber-400">
        🏋️ Mini Challenge
      </h3>
      <p className="text-amber-900 dark:text-amber-300 mb-4">
        Create the following TypeScript types for a blog API:
      </p>
      <ul className="text-amber-800 dark:text-amber-300 text-sm space-y-2 list-disc pl-5">
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Post</code> interface with id, title, content, author, tags (array), and createdAt</li>
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">CreatePostDto</code> that omits id and createdAt (hint: use <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Omit</code>)</li>
        <li>A <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">UpdatePostDto</code> that makes all CreatePostDto fields optional (hint: use <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">Partial</code>)</li>
        <li>A generic <code className="bg-amber-200/50 dark:bg-amber-800/30 px-1 rounded">{"PaginatedResponse<T>"}</code> with data array, total, page, and limit</li>
      </ul>

      <Collapsible title="💡 Show Solution (try it yourself first!)">
        <div className="mt-4">
          <EnhancedCodeBlock 
            code={`interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: Date;
}

type CreatePostDto = Omit<Post, 'id' | 'createdAt'>;
// Result: { title: string; content: string; author: string; tags: string[]; }

type UpdatePostDto = Partial<CreatePostDto>;
// Result: { title?: string; content?: string; author?: string; tags?: string[]; }

interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

const postPage: PaginatedResponse<Post> = {
  data: [{ id: 1, title: "Hello", content: "...", author: "Alice", tags: ["ts"], createdAt: new Date() }],
  total: 50,
  page: 1,
  limit: 10
};`}
          />
          <div className="mt-4 space-y-3 text-xs text-amber-800 dark:text-amber-300">
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-400">Step 1:</strong> The full Post interface contains all fields.
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-400">Step 2:</strong> CreatePostDto omits id and createdAt because the server generates these.
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-400">Step 3:</strong> UpdatePostDto makes everything optional so users only send what changed.
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-900/20 rounded border border-amber-100 dark:border-amber-800">
              <strong className="text-amber-900 dark:text-amber-400">Step 4:</strong> PaginatedResponse is a generic that works for any entity (Post, User, etc.)
            </div>
          </div>
        </div>
      </Collapsible>
    </section>
  );
}
