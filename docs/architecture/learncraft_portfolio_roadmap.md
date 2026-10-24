# LearnCraft — Portfolio Enhancement Roadmap

## What You Already Have (Current Audit)

Before recommending new features, here's what interviewers would already see:

| Area | What Exists | Interviewer Impression |
|---|---|---|
| **Curriculum Engine** | 14 tech tracks, phased progression, capstones, prerequisite system, `topic-registry.ts` (37KB) | ✅ Solid data modeling |
| **Lesson Rendering** | `DataDrivenLessonView.tsx` (41KB), section parser, content field extractor | ✅ Complex component architecture |
| **Notes System** | Continuous document editor, Q&A + code insertions, autosave, All Notes hub | ✅ Rich text editing |
| **Code Playground** | In-browser editor, syntax highlighting, autocomplete, error detection, formatting, multiple runtimes | ✅ Impressive standalone |
| **Gamification** | XP engine, streaks, levels, streak freeze, local+cloud sync | ✅ Engagement system |
| **Spaced Repetition** | SM-2 algorithm, review scheduling, retention curves, annotations | ✅ Shows algorithmic thinking |
| **Roadmaps** | Skill-based + role-based learning paths, category filtering | ✅ Content architecture |
| **Auth** | Google OAuth via NextAuth v5 + Prisma adapter | ✅ Standard |
| **Persistence** | Local-first architecture with cloud sync to PostgreSQL | ✅ Offline-first thinking |
| **Testing** | 95 tests (Vitest), curriculum state tests, notes tests, gamification tests | ✅ Testing discipline |
| **CI/CD** | GitHub Actions workflow | ✅ Basic |

### Honest Assessment of Gaps

An experienced interviewer would notice these missing pieces:

1. **No user-facing dashboard** — All that progress/XP/streak data exists but there's no analytics page to visualize it
2. **No interactive assessments** — The Practice directory is empty scaffold; lessons have no quizzes or coding challenges
3. **No global search** — 14 tracks with hundreds of lessons but no way to search across them
4. **Thin database schema** — Only `User`, `Account`, `Session`, `Progress` models; notes/gamification/annotations live entirely in LocalStorage
5. **No E2E tests** — Unit tests exist but no Playwright/Cypress for critical user flows
6. **No error boundaries** — Missing production-grade error handling and loading states
7. **No accessibility audit** — Missing ARIA, keyboard nav, focus management

---

## Recommended Features — Prioritized by Interview Impact

### 🔴 Tier 1: "Must-Have" — These Are What Interviewers Will Look For

---

#### 1. User Dashboard & Learning Analytics (`/dashboard`)

**Why interviewers care:** Shows data visualization, aggregation logic, and product thinking.

**What to build:**
- Progress overview: lessons completed per track, overall completion percentage
- XP & level progression chart (line chart over time from existing XP log)
- Streak calendar heatmap (like GitHub contribution graph, using existing `DailyActivityRecord`)
- "Continue Learning" section — smart suggestion of next lesson based on current progress
- Weekly/monthly learning stats from the existing gamification data
- Spaced repetition stats: cards due today, retention rate, mastery distribution

**Technical signals it demonstrates:**
- Chart rendering (build with Canvas/SVG, not a library — more impressive)
- Data aggregation from multiple sources (LocalStorage + API)
- Responsive dashboard layout
- Real-time stat updates

**Estimated complexity:** Medium-High

---

#### 2. Interactive Lesson Quizzes & Code Challenges

**Why interviewers care:** This is the difference between a "content website" and a "learning platform." Every serious EdTech product has assessments.

**What to build:**
- Multiple choice questions embedded at the end of each lesson
- "Fill in the blank" code challenges (user completes missing code)
- Code output prediction ("What does this code print?")
- Instant feedback with explanations
- Quiz results feed into XP and progress systems
- Store quiz data in the topic registry alongside lesson content

**Technical signals it demonstrates:**
- State machine design (quiz flow: question → answer → feedback → next)
- Code evaluation/sandboxing (extend existing Playground runtimes)
- Assessment scoring algorithms
- Integration with existing gamification engine

**Estimated complexity:** High (but very high impact)

---

#### 3. Global Search & Command Palette (`Cmd+K`)

**Why interviewers care:** Power-user UX is a strong differentiator. Every serious dev tool has this.

**What to build:**
- `Cmd+K` / `Ctrl+K` command palette modal
- Search across: lesson titles, lesson content, note titles, note content, roadmap skills
- Fuzzy matching with ranked results
- Recent searches and quick navigation shortcuts
- Keyboard-navigable result list (arrow keys + Enter)
- Categories: "Lessons", "Notes", "Tracks", "Actions" (e.g., "Toggle dark mode", "Open notes")

**Technical signals it demonstrates:**
- Search indexing strategy (client-side trie/inverted index vs. debounced API)
- Fuzzy matching algorithm (Levenshtein distance or similar)
- Keyboard event handling and focus management
- Modal accessibility (focus trap, ARIA roles)

**Estimated complexity:** Medium

---

#### 4. Persist Notes & Annotations to Database

**Why interviewers care:** A real backend engineer wouldn't leave critical user data in LocalStorage alone. This shows you understand data persistence properly.

**What to build:**
- Extend Prisma schema with `Note`, `Annotation`, `GamificationState` models
- Server-side API routes for CRUD operations
- Conflict resolution strategy when local and server diverge
- Migration path: existing LocalStorage data auto-migrates on first authenticated session
- Optimistic updates with rollback on failure

**Technical signals it demonstrates:**
- Database schema design with proper relations
- Data migration strategy
- Conflict resolution (last-write-wins vs. merge)
- API design patterns
- Optimistic UI patterns

**Estimated complexity:** Medium-High

---

### 🟡 Tier 2: "Strong Differentiators" — These Separate Good From Great

---

#### 5. End-to-End Testing with Playwright

**Why interviewers care:** Many candidates have unit tests. Very few have proper E2E test suites.

**What to build:**
- Critical path tests: sign in → navigate to lesson → complete lesson → XP awarded
- Notes flow: open drawer → write note → autosave → verify in All Notes
- Playground flow: write code → run → see output
- Visual regression snapshots for key pages
- CI integration: run E2E tests in GitHub Actions on PR

**Technical signals it demonstrates:**
- Test strategy thinking (unit vs. integration vs. E2E pyramid)
- Page Object Model or fixture patterns
- CI/CD pipeline maturity
- Flake-resistant test design

**Estimated complexity:** Medium

---

#### 6. Error Boundaries, Loading States & Skeleton UI

**Why interviewers care:** This is the hallmark of production-grade React code. Junior devs don't do this.

**What to build:**
- React Error Boundaries around every major feature area
- Graceful fallback UIs ("Something went wrong" with retry button)
- Skeleton loading screens for lesson content, notes grid, dashboard
- Suspense boundaries with streaming for heavy components
- Toast notification system for success/error/info messages

**Technical signals it demonstrates:**
- Production React patterns
- UX for failure states (not just happy path)
- Component composition with boundaries
- Understanding of React Suspense architecture

**Estimated complexity:** Medium

---

#### 7. Accessibility (a11y) Pass

**Why interviewers care:** Increasingly a hard requirement in job interviews, especially at larger companies.

**What to build:**
- ARIA labels on all interactive elements
- Keyboard navigation throughout (Tab order, Enter/Escape on modals)
- Focus trap in modals and drawers (notes drawer, command palette)
- Screen reader announcements for dynamic content (quiz results, save status)
- Color contrast compliance (WCAG AA)
- `prefers-reduced-motion` respect for animations
- Skip-to-content link

**Technical signals it demonstrates:**
- Knowledge of WCAG guidelines
- Inclusive design thinking
- Attention to detail

**Estimated complexity:** Medium

---

#### 8. Performance Optimization & Lighthouse Score

**Why interviewers care:** Shows you think about real users, not just features.

**What to build:**
- Route-level code splitting (dynamic import for Playground, heavy components)
- Image optimization with Next.js `<Image>`
- Bundle analysis and tree-shaking audit
- Lazy loading below-fold content
- Measure and document Web Vitals (LCP, FID, CLS)
- Target: Lighthouse Performance > 90, Accessibility > 90

**Technical signals it demonstrates:**
- Web performance expertise
- Bundle optimization
- Understanding of Core Web Vitals
- Measurable improvement mindset

**Estimated complexity:** Medium

---

### 🟢 Tier 3: "Impressive Extras" — Cherry-On-Top Features

---

#### 9. PWA / Offline Support

Convert LearnCraft into a Progressive Web App so lessons are available offline. The local-first architecture already lays the groundwork. Add a service worker, manifest, and offline-available lesson cache.

#### 10. AI-Powered Study Assistant

Integrate an LLM API (OpenAI/Anthropic) for:
- "Explain this concept" button on any lesson paragraph
- AI code review in the Playground
- Personalized learning path suggestions based on quiz results

#### 11. Social / Community Features

- Public user profiles with learning stats
- Leaderboard (top XP earners, longest streaks)
- Share a note or highlight publicly

#### 12. API Rate Limiting & Security Hardening

- Rate limiting on API routes (token bucket or sliding window)
- CSRF protection
- Input sanitization with Zod on all API endpoints
- Security headers (CSP, HSTS)

#### 13. Monitoring & Observability

- Sentry integration for error tracking
- Custom analytics events (lesson views, quiz completions)
- API response time logging

---

## Recommended Build Order

If you want maximum portfolio impact for minimum time, build in this order:

```
Phase 1 (Week 1-2): Dashboard + Search
├── /dashboard page with charts and stats
├── Cmd+K command palette
└── Skeleton loading states for both

Phase 2 (Week 3-4): Assessments
├── Quiz engine (multiple choice + code output prediction)
├── Per-lesson quiz data in topic registry
├── Quiz results → XP integration
└── Quiz history on dashboard

Phase 3 (Week 5): Data & Testing
├── Extend Prisma schema (Notes, Annotations, Gamification)
├── Server-side API routes + migration from LocalStorage
├── Playwright E2E tests for critical flows
└── Enhanced CI pipeline

Phase 4 (Week 6): Polish
├── Error boundaries + toast notifications
├── Accessibility pass
├── Performance audit + Lighthouse optimization
├── Updated README with architecture diagram
```

---

## What Makes The Biggest Impression

> [!IMPORTANT]
> Interviewers don't count features — they evaluate **depth of thinking**. One deeply-built dashboard with custom SVG charts, proper error handling, skeleton loaders, keyboard shortcuts, and accessibility is worth more than five half-finished features.

### The Three Things That Will Stand Out Most:

1. **Dashboard with custom-built charts** — Not using Chart.js or Recharts, but building SVG/Canvas visualizations from scratch. This is rare and immediately impressive.

2. **The quiz/assessment engine** — Transforms LearnCraft from "a website with content" to "an actual learning platform." This is the single biggest gap.

3. **The full persistence story** — Right now, notes/gamification/annotations disappear if the user clears LocalStorage. Moving these to the database with proper migration, conflict resolution, and optimistic updates shows real backend engineering maturity.
