"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX14Fonts(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-14"
          featureName="Font Optimization"
          tanstackConcept="N/A"
          howItWorks="next/font loads fonts from Google Fonts or local files with automatic subsetting and optimization. Fonts are included in the CSS bundle so no extra network requests."
          nextjsConcept="Use next/font to load Google Fonts or local fonts. Fonts are automatically optimized and included directly in your CSS. No FOUT (Flash of Unstyled Text). Self-hosted by default."
          whenToUse="Always use next/font for custom fonts instead of @import from CDN."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white dark:text-white">Font Optimization</h2>

          <div className="space-y-6">
            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Google Fonts</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// lib/fonts.ts
import { Roboto, Playfair_Display } from 'next/font/google';

export const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const playfair = Playfair_Display({
  weight: ['700'],
  subsets: ['latin'],
});

// app/layout.tsx
import { roboto, playfair } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html className={roboto.className}>
      <body>
        <h1 className={playfair.className}>Title</h1>
        {children}
      </body>
    </html>
  );
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Local Fonts</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`// lib/fonts.ts
import localFont from 'next/font/local';

export const myFont = localFont({
  src: [
    {
      path: '../fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});

// app/layout.tsx
import { myFont } from '@/lib/fonts';

export default function RootLayout({ children }) {
  return (
    <html className={myFont.className}>
      <body>{children}</body>
    </html>
  );
}`}
              </pre>
            </div>

            <div className="bg-white dark:bg-slate-900/50 dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 dark:border-slate-800 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white dark:text-white">Fallback Fonts</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import { Inter, Serif } from 'next/font/google';

const inter = Inter();
const serif = Serif({
  fallback: ['Georgia', 'serif'], // Fallback if font fails
});

// Use fallback for better performance
export default function Page() {
  return <p className={inter.className}>Uses Inter with system font fallback</p>;
}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 dark:bg-green-950/20 dark:bg-green-950/20 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 dark:text-green-400 dark:text-green-400 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700 dark:text-slate-300 dark:text-slate-300">
              <li>• Use next/font for Google Fonts</li>
              <li>• Self-hosted by default (no external requests)</li>
              <li>• Fonts included in CSS bundle</li>
              <li>• No FOUT (Flash of Unstyled Text)</li>
              <li>• Automatic subsetting for better performance</li>
              <li>• Support for local font files</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
