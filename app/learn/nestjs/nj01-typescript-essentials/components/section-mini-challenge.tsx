import { Collapsible } from "@/components/collapsible";

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
        <pre className="bg-gray-900 text-slate-300 p-4 rounded-xl overflow-x-auto text-sm border border-slate-800">
          {`// 1. The full Post interface
interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  tags: string[];
  createdAt: Date;
}

// 2. CreatePostDto — Omit id and createdAt (server generates these)
type CreatePostDto = Omit<Post, 'id' | 'createdAt'>;
// Result: { title: string; content: string; author: string; tags: string[]; }

// 3. UpdatePostDto — Make everything optional (only send what changed)
type UpdatePostDto = Partial<CreatePostDto>;
// Result: { title?: string; content?: string; author?: string; tags?: string[]; }

// 4. Generic PaginatedResponse — works for any entity
interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

// Usage examples:
const postPage: PaginatedResponse<Post> = {
  data: [{ id: 1, title: "Hello", content: "...", author: "Alice", tags: ["ts"], createdAt: new Date() }],
  total: 50,
  page: 1,
  limit: 10
};`}
        </pre>
      </Collapsible>
    </section>
  );
}
