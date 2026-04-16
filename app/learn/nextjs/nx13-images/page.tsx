"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX13Images(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-13"
          featureName="Image Optimization"
          tanstackConcept="N/A"
          howItWorks="The Next.js Image component replaces HTML img. It automatically optimizes images: resizes, converts to modern formats (WebP), lazy loads, and prevents layout shift. Use width and height to specify size."
          nextjsConcept="next/image provides the Image component with built-in optimization. Automatically serves optimal formats per browser, lazy loads, and provides responsive image sizes. Much better than HTML img for performance."
          whenToUse="Always use next/image instead of HTML img tags for better performance."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Image Optimization</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Basic Image Usage</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Image from 'next/image';

export default function Profile() {
  return (
    <Image
      src="/profile.jpg"
      alt="Profile picture"
      width={200}
      height={200}
    />
  );
}

// Benefits:
// • Automatically converts to WebP/AVIF
// • Lazy loads by default
// • Prevents layout shift with fixed width/height
// • Responsive with srcSet`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Fill Mode (Responsive)</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Image from 'next/image';

export default function Banner() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '400px' }}>
      <Image
        src="/banner.jpg"
        alt="Banner"
        fill
        style={{ objectFit: 'cover' }}
      />
    </div>
  );
}

// fill = image stretches to fill container
// Useful for images where you don't know exact dimensions`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Responsive Sizes</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Image from 'next/image';

export default function ResponsiveImage() {
  return (
    <Image
      src="/article-image.jpg"
      alt="Article"
      width={800}
      height={400}
      sizes="(max-width: 768px) 100vw, 
             (max-width: 1200px) 50vw, 
             800px"
      style={{ width: '100%', height: 'auto' }}
    />
  );
}

// sizes tells Next.js which image size to serve at different breakpoints
// 100% width on mobile, 50% on tablet, full 800px on desktop`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Placeholder & Blur</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Image from 'next/image';

export default function BlurImage() {
  return (
    <Image
      src="/large-image.jpg"
      alt="Large image"
      width={800}
      height={600}
      placeholder="blur"
      blurDataURL="data:image/png;base64,..."
      loading="lazy"
    />
  );
}

// placeholder="blur" shows blurred image while loading
// Looks great and prevents layout jank`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Use next/image instead of HTML img</li>
              <li>• Automatic format conversion (WebP, AVIF)</li>
              <li>• Lazy loading by default</li>
              <li>• Prevents layout shift with width/height</li>
              <li>• Responsive with sizes prop</li>
              <li>• Blur placeholder for great UX while loading</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
