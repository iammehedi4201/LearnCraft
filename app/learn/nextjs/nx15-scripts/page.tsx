"use client";

import Link from "next/link";
import { Nav } from "@/components/nav";
import { CodeNote } from "@/components/code-note";

export default function NX15Scripts(): JSX.Element {
  return (
    <>
      <Nav />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <Link href="/learn/nextjs" className="text-purple-600 hover:text-purple-700 mb-6 inline-block">
          ← Back to Next.js
        </Link>

        <CodeNote
          featureCode="NX-15"
          featureName="Script Optimization"
          tanstackConcept="N/A"
          howItWorks="next/script component loads third-party scripts (analytics, ads, tracking) with optimal loading strategy. Control when scripts load: beforeInteractive, afterInteractive, lazyOnload, or worker."
          nextjsConcept="Use next/script for third-party scripts. Gives you fine-grained control over timing. Prevents blocking your page rendering. Great for analytics, ads, chat widgets."
          whenToUse="Third-party scripts like GA, Mixpanel, Intercom, ads, tracking pixels, etc."
        />

        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">Script Loading Strategies</h2>

          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Analytics Scripts</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Script from 'next/script';\\n\\nexport default function RootLayout() {\\n  return (\\n    <>\\n      <Script\\n        src="https://www.googletagmanager.com/gtag/js?id=GA_ID"\\n        strategy="afterInteractive"\\n      />\\n      <Script id="google-analytics" strategy="afterInteractive">\\n        Analytics code here\\n      </Script>\\n    </>\\n  );\\n}\\n\\n// strategy="afterInteractive" = load after page becomes interactive`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Loading Strategies</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`<Script
  src="..."
  strategy="beforeInteractive"  // Critical - load before interactive
/>

<Script
  src="..."
  strategy="afterInteractive"   // Default - load after interactive
/>

<Script
  src="..."
  strategy="lazyOnload"         // Load only on user interaction
/>

<Script
  src="..."
  strategy="worker"             // Load in web worker (background)
/>`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Event Handlers</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Script from 'next/script';

export default function Page() {
  return (
    <>
      <Script
        src="https://example.com/script.js"
        onLoad={() => {
          console.log('Script loaded');
        }}
        onError={(e) => {
          console.error('Script failed', e);
        }}
      />
    </>
  );
}`}
              </pre>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Inline Scripts</h3>
              <pre className="bg-gray-900 text-white p-4 rounded text-sm overflow-x-auto">
{`import Script from 'next/script';\\n\\nexport default function Page() {\\n  return (\\n    <>\\n      <Script id="my-script" strategy="afterInteractive">\\n        JavaScript code here:\\n        console.log('Inline JavaScript');\\n        document.addEventListener('DOMContentLoaded', () => {\\n          // Do something when DOM is ready\\n        });\\n      </Script>\\n    </>\\n  );\\n}`}
              </pre>
            </div>
          </div>

          <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-6">
            <h4 className="font-semibold text-green-900 mb-2">✅ Key Takeaways</h4>
            <ul className="space-y-2 text-gray-700">
              <li>• Use next/script for third-party scripts</li>
              <li>• Control loading timing with strategy prop</li>
              <li>• afterInteractive = default (load after page interactive)</li>
              <li>• Use lazyOnload for non-critical scripts</li>
              <li>• Handle onLoad and onError events</li>
              <li>• Prevents blocking your page's rendering</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
