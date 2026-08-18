"use client";

import { QuickCheck } from "./quick-check";
import {
  SectionContainer,
  TopicHeader,
  AnalogyBox,
  WhyBox,
  Divider,
  EasyRuleCard,
} from "./shared-components";

// ═══════════════════════════════════════════════════════════
// MODULE 1 — THE BIG PICTURE (PAGINATION, FILTERING & SORTING)
// ═══════════════════════════════════════════════════════════

export function HeaderSection() {
  return (
    <SectionContainer number={1} title="The Big Picture: Pagination, Filtering & Sorting">
      {/* ── 1.1 Why Pagination Matters ── */}
      <div className="mb-16">
        <TopicHeader
          number={1}
          title="Handling Massive Datasets Safely"
          description="Why fetching 100,000 rows crashes servers, and how pagination delivers data in bite-sized chunks."
          color="primary"
        />

        <WhyBox>
          <h4 className="font-bold text-sm text-ds-text-strong mb-2 flex items-center gap-2">
            <span>💥</span> The Uncapped SELECT * Disaster
          </h4>
          <p className="text-xs sm:text-sm text-ds-text-sub leading-relaxed mb-3">
            If your database has 500,000 users and an endpoint runs <code>prisma.user.findMany()</code> with no limits:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs text-ds-text-sub mb-3">
            <li>Node.js tries to serialize 500MB of JSON into RAM at once.</li>
            <li>CPU usage spikes to 100%, causing Out-Of-Memory (OOM) crashes.</li>
            <li>HTTP response times jump from 15ms to 12,000ms, timing out frontend clients!</li>
          </ul>
          <p className="text-xs sm:text-sm text-ds-text-strong leading-relaxed">
            <strong>Pagination</strong> guarantees that clients only fetch 10, 20, or 50 items per request, keeping API response times consistently under 25ms.
          </p>
        </WhyBox>

        <AnalogyBox title="The Book Index &amp; Infinite Twitter Scroll">
          <p className="mb-2">
            Think of database pagination like reading a 1,000-page encyclopedia:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-ds-text-sub">
            <li>
              <strong>Offset Pagination (Page Numbers):</strong> Like flipping directly to &quot;Page 4&quot;. Great for search results and admin dashboards with page numbers [ 1 ][ 2 ][ 3 ].
            </li>
            <li>
              <strong>Cursor Pagination (Bookmarks):</strong> Like keeping your bookmark at &quot;Item #542&quot; and asking for the NEXT 10 items. Perfect for infinite scrolling feeds (Twitter, Instagram, TikTok) where new posts are inserted every second!
            </li>
          </ul>
        </AnalogyBox>

        <EasyRuleCard rule="Formula for Offset Pagination: skip = (page - 1) * limit, take = limit." />

        <QuickCheck
          question="If a client requests page=4 with limit=20, what are the values of 'skip' and 'take' in Prisma?"
          answer="skip = (4 - 1) * 20 = 60, take = 20."
        />
      </div>

      <Divider />
    </SectionContainer>
  );
}
