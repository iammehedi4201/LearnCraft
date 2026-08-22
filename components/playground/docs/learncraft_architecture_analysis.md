# LearnCraft Learning Architecture Analysis

*A critical review from the perspective of a first-time beginner*

---

## Before We Start: What Does LearnCraft Currently Do?

The current NestJS path shows **32 lessons across 6 phases** immediately on the landing page. The hero section announces "32 lessons" and "6 phases" as the very first thing a learner reads. Every lesson card is visible at once. Inside each lesson, there are up to **17 navigable sections** locked in a strict sequential order — you cannot click section 3 until you have completed sections 1 and 2.

This is the core problem: the platform is organized around *showing how much content exists*, rather than *making the next step feel easy and achievable*.

The analysis below examines every part of this system and recommends how to fix it.

---

## Understanding the Current Architecture

Here is what each layer means in simple language:

- **Learning Path** — the full journey for one subject. Example: *Learn NestJS from scratch.*
- **Phase** — a large stage of that journey. Example: *Phase 1 is about TypeScript basics. Phase 6 is about putting your application into production.*
- **Module** — a group of related ideas inside a phase. Example: *The Foundations phase contains modules on Modules, Controllers, Services, and Dependency Injection.*
- **Lesson** — one specific topic taught in depth. Example: *The Controllers lesson teaches how to handle incoming web requests.*
- **Learning Block** — a piece inside a lesson. Example: *An explanation, then a code example, then a short quiz.*

Visually: `Learning Path → Phase → Module → Lesson → Learning Block`

This five-level structure is logically sound for *organizing content internally*. The problem is that all five levels are currently exposed to the learner at the same time, from the very first moment they arrive.

---

## Section 1: Beginner Psychology

### What a beginner feels at each step — and why it matters

A "beginner" in this context means someone who is intelligent and motivated but does not yet know how the subject works, how much time it will take, or where to start. Their emotional state at each step determines whether they continue or leave.

---

### Step 1 — Discovering a learning path

**What the learner thinks:**
> "I want to learn NestJS. Let me click on it and see what's there."

**What the learner feels:** Curious and open. This is the best emotional state they will be in during the entire journey. Nothing has intimidated them yet.

**What LearnCraft should do:** Capture that curiosity immediately. The first screen should show one clear promise ("You will be able to build a working backend API") and one clear action ("Start here"). Do not fill this moment with metrics.

---

### Step 2 — Opening the learning-path page

**What the learner currently sees in LearnCraft:**
> "NestJS Production Roadmap. 32 progressive lessons. 6 phases. 10/32 Ready."

**What the learner thinks:**
> "32 lessons? That's... a lot. And only 10 of them are even ready. Will I have to wait for the rest? How long will this take? Do I need to do all 32 to start building anything?"

**Why this happens:** The hero section leads with *quantity* ("32 lessons", "6 phases", "10/32 Ready") rather than *the learner's destination*. Quantity is interesting to the curriculum designer. It is alarming to the beginner.

**What the problem is called:** This is **cognitive overload** — showing the learner more information than they can process or use right now. Imagine arriving at a restaurant and instead of showing you a menu, the chef brings out photos of everything in the kitchen. You don't feel informed. You feel overwhelmed.

**What LearnCraft should do:** Replace the quantity-first hero with a destination-first hero. The learner should see: *what they will be able to do* and *where to begin*, not how many lessons exist.

---

### Step 3 — Seeing all phases

**What the learner currently sees:**
Six phases are shown simultaneously, each with a code-range label like "NJ-01 to NJ-04" and a lesson count.

**What the learner thinks:**
> "Phase 01, Phase 02... Phase 06. Do I have to complete all phases in order? What even is a phase? Is Phase 06 something I need before I can do anything useful?"

**Why this happens:** The word "phase" is internal curriculum vocabulary. A learner encountering it for the first time does not know whether a phase is mandatory or optional, short or long, beginner or advanced. The phase labels and code-ranges ("NJ-01 to NJ-04") mean nothing to someone who has never seen the content.

**What LearnCraft should do:** Phases should be named around what the learner will be able to do after completing them, not around internal organizational categories. A beginner should never see all six phases at the same time. Show the current phase and reveal the next phase only when the previous one is complete or nearly complete. This is called **progressive disclosure** — a principle explained fully in Section 3.

---

### Step 4 — Seeing many modules or lessons

**What the learner currently sees:**
All 32 lesson cards in a grid. Each card has a lesson code ("NJ-01"), a title, a description, and a "Module Ready" badge. Some lessons are presumably not yet ready (the progress bar shows 10/32).

**What the learner thinks:**
> "There are 32 of these. I see NJ-01, NJ-02... NJ-32. Do I start at NJ-01? Do I need NJ-01 before NJ-02? What if I already know TypeScript? What are the ones that aren't ready? Do I have to wait?"

**Problems this creates:**
1. **Decision paralysis** — the learner doesn't know which lesson to click.
2. **Intimidation** — seeing 32 cards at once makes the task feel enormous.
3. **Confusion about prerequisites** — a *prerequisite* is something you need to know before learning something else. The learner cannot tell which lessons are prerequisites and which are the main subjects.
4. **Fear that the course will take too long** — no estimated time is shown per lesson.

**What LearnCraft should do:**
Show only the next recommended lesson prominently. The rest of the lessons should be accessible but not competing for attention. This is like a GPS: it shows you the *next turn*, not the entire route.

---

### Step 5 — Opening their first module

**What the learner currently sees in the OOP Foundations lesson:**
A sidebar with **17 numbered steps** locked sequentially. Step 1 is active. Steps 2–17 are greyed out and unclickable.

**What the learner thinks:**
> "I just want to learn what a class is. But I see there are 17 parts to this. 'OOP Principles', 'Composition', 'OOP vs Procedural', 'Beginner Mistakes', 'Concept Tables', 'Coding Exercises', 'Final Project'... Am I going to be here all day? I just wanted a quick introduction."

**Why this happens:** The sidebar exposes every section label simultaneously, including teaching tools ("Beginner Mistakes", "Concept Tables") that are really just methods the lesson uses to explain the concept. They look like separate subjects.

**What the problem is called:** The learner cannot distinguish between *topics to learn* and *tools used to teach those topics*. "Common Mistakes" is not a subject. It is a teaching technique. Showing it as a numbered step makes the lesson feel longer and more complex than it actually is.

**What LearnCraft should do:** A lesson should show the learner *what they will understand* (2–4 clear ideas) and *what they will be able to do* (1–2 small exercises). The internal sections — diagrams, comparison tables, mistake lists — should support the lesson invisibly. Section 9 covers lesson design in detail.

---

### Step 6 — Seeing many sections inside a lesson

**What the learner currently experiences:**
The lesson is locked in a strict forward sequence. To reach "Coding Exercises" (part15), the learner must click through 14 previous sections. If they already understand part of the material, there is no way to skip.

**What the learner thinks:**
> "I already know what a class is. Why do I have to sit through 'OOP vs Procedural' before I can practice? This feels like it was made for someone else."

**Problems:**
- **Frustration from already-known material** — experienced learners feel their time is being wasted.
- **Loss of motivation** — the payoff (exercises, building something) is too far away.
- **Weak sense of progress** — the learner is clicking through locked steps, not making real choices.

**What LearnCraft should do:**
Allow learners to signal what they already know. Offer a short check at the beginning ("Already know OOP? Take this quick check to skip ahead"). Inside lessons, make the core concept and the practice reachable in fewer steps.

---

### Step 7 — Completing their first lesson

**What the learner currently experiences:**
After completing all 17 steps, the lesson ends. The learner is returned to the learning-path page, which still shows all 32 lesson cards. There is no visible milestone reached. No skill is acknowledged. The progress bar moves slightly.

**What the learner thinks:**
> "I finished! But... I still see 31 more things. And the progress bar barely moved. This is going to take forever."

**Why this happens:** The progress system is based on *counting lessons completed*, not on *acknowledging what the learner can now do*. "1/32 completed" is a math statement. It does not say "You can now write your own TypeScript class" — which is the thing worth celebrating.

**What LearnCraft should do:** After completing a lesson, show a milestone moment. Something specific the learner can now do. This is the difference between *content progress* and *skill progress*. Section 6 covers this fully.

---

### Step 8 — Deciding whether to continue

**What the learner currently experiences:**
No guidance on what to do next. The page shows all remaining lessons. The learner has to decide for themselves which one to click.

**What the learner thinks:**
> "I guess I click NJ-02 next? I'm not sure if that's right. Also... 31 more. Maybe I'll come back later."

**Why this happens:** There is no "next step" recommendation. The learner is expected to navigate the full curriculum independently, which requires knowledge they don't yet have.

**What LearnCraft should do:** After every lesson, show exactly one recommended next step. Remove the decision. Make it so obvious that the learner clicks without thinking.

---

## Section 2: Information Architecture

### The five-level hierarchy — what it's for and what it costs

The current structure is:

```
Learning Path
  └── Phase
        └── Module
              └── Lesson
                    └── Learning Block
```

This five-level structure makes sense for *organizing content internally*. A curriculum team benefits from knowing that a lesson belongs to a module, which belongs to a phase, which belongs to a learning path. It helps with planning, sequencing, and version control.

**But a learner does not need to see all five levels.** They need to know:
1. Where am I right now?
2. What do I do next?

Showing all five levels at once is like showing a new employee the entire company org chart on their first day instead of just telling them who their manager is.

---

### What each level is actually for

| Level | Useful For | Learner Needs To See? |
|---|---|---|
| Learning Path | Platform navigation, choosing a subject | Yes — on the homepage |
| Phase | Curriculum sequencing, internal structure | Partially — show current phase only |
| Module | Content grouping, recommendations | No — hide this term |
| Lesson | The actual unit of learning | Yes — the next one |
| Learning Block | Teaching tool within a lesson | No — invisible to learner |

The word "Module" is especially problematic. In the current NestJS path, the sidebar inside a lesson says "Modules" at the top — but it is referring to *lesson sections*, not to NestJS modules (which are a core NestJS programming concept). The same word is used for two completely different things. This will confuse every learner who gets to Phase 2.

**Recommendation:** Remove the word "module" from the learner-facing interface entirely. Use "lesson" consistently for what the learner completes. Use "phase" or "stage" to describe larger groupings, but only show the current one.

---

### The learner-facing hierarchy (simplified)

What the learner should see and understand:

```
Learning Path (= "I am learning NestJS")
  └── Stage (= "Right now I am in: Build Your First API")
        └── Lesson (= "Next: Controllers & Routing — 20 min")
```

That is three visible levels. The Phase, Module, and Learning Block remain internal. The learner is not required to understand any of them to make progress.

---

### Terminology recommendations

| Currently Used | Replace With | Reason |
|---|---|---|
| "Phase" | "Stage" or just the stage name | "Phase" is internal vocabulary |
| "Module" (in sidebar) | "Section" | Avoids confusion with NestJS modules |
| "NJ-01 to NJ-04" | Nothing visible | Code ranges are for internal use |
| "Module Ready" | "Available" or a green dot | "Module Ready" is meaningless |
| "Curriculum Progress: 10/32" | "Your journey: 3 lessons complete" | Friendlier and less intimidating |
| "Explore Lesson" | "Start" or "Continue" | More direct |

---

## Section 3: Progressive Disclosure

**Progressive disclosure** means showing only the information a learner needs right now and revealing more information only when they need it or ask for it. 

Think of it like a good conversation. When someone asks "What is NestJS?", you do not immediately explain all 32 topics. You give a short useful answer. Then, if they want more, they ask another question.

The opposite of progressive disclosure is what LearnCraft currently does: showing all 32 lessons, all 6 phases, and all 17 sections at once. The learner is expected to self-organize this flood of information.

---

### What should be visible at each point

**When first opening a learning path (the landing page):**

Show only:
- The subject name and one sentence about what the learner will be able to build.
- The estimated time for the first stage.
- One prominent "Start Learning" button.
- Optionally: a short list of "What you will be able to do" (3–4 outcomes, not lesson names).

Do not show:
- The total number of lessons.
- All phases.
- All modules.
- Any incomplete or unavailable lessons.

**While studying a stage (phase):**

Show only:
- The name and goal of the current stage.
- Which lesson is active.
- The next 2–3 lessons (greyed out but visible — like seeing the next steps on a staircase).
- The milestone that completing this stage will unlock.

Do not show:
- Future stages.
- Lessons from other stages.
- The total lesson count for the entire path.

**While completing a lesson:**

Show only:
- The lesson title and its main goal.
- The current section (not all sections).
- A simple "Continue" button.
- A progress indicator inside the lesson (e.g., "Step 2 of 4").

Do not show:
- The full list of all sections in the sidebar.
- Locked sections with visible labels.
- Progress compared to the entire curriculum.

**After completing a lesson:**

Show:
- A skill milestone message: "You can now write a NestJS controller."
- The next recommended lesson with its title and estimated time.
- A simple "Continue" button.

Do not show:
- A reminder of how many lessons remain.
- A list of all future topics.

---

### Simple example of progressive disclosure in practice

Instead of:

> "32 lessons across 6 phases. Phase 01 covers NJ-01 to NJ-04. Phase 02 covers NJ-05 to NJ-10..."

Show this:

> **Learn NestJS**
> Build your first backend API step by step.
>
> **Your next lesson:** TypeScript Essentials · 20 minutes
>
> [Start Learning →]

The learner who wants to see the full roadmap can click "View full roadmap." Most beginners will not need to.

---

## Section 4: Essential vs Optional Learning

A learner should be able to look at any learning path and immediately know:

> "What is the minimum I need to learn to start building something?"

The current NestJS path has no such signal. Every lesson card looks equally important. "Serialization & Response Shaping" (NJ-25) appears with the same visual weight as "Controllers & Routing" (NJ-07), even though one is foundational and one is advanced.

---

### Recommended content classification system

Use four levels, clearly explained to the learner:

**Core**
The learner cannot build anything useful without this. It is not optional.
*Example in NestJS: Controllers, Services, Modules, DTOs.*
*Example in React: Components, Props, State, useEffect.*
*Example in Docker: Running a container, writing a Dockerfile.*

**Build**
The learner needs this to build a real, working application. It is the next step after Core.
*Example in NestJS: JWT Authentication, Database with Prisma, Request Validation.*
*Example in React: Routing, API calls, Forms.*
*Example in Docker: Docker Compose, volumes, networking.*

**Professional**
The learner needs this when building something for real users or a real job. Not needed for a first project.
*Example in NestJS: Redis caching, Logging, Testing, Swagger.*
*Example in React: Performance optimization, Code splitting, Testing.*
*Example in Docker: Multi-stage builds, Orchestration, CI/CD.*

**Reference**
The learner does not need to memorize this. They should know it exists and return to it when needed.
*Example in NestJS: All configuration options, Advanced Prisma queries.*
*Example in React: Full list of hooks.*
*Example in Docker: All Docker flags and options.*

---

### Why four levels instead of five

The original five categories (Core, Recommended, Deep Dive, Production, Reference) have two problems. First, "Recommended" is vague — recommended by whom, and for what? Second, "Deep Dive" sounds impressive but could mean many different things. The four categories above use action-oriented language. The learner can answer: "What stage am I in right now — Core, Build, or Professional?"

---

### How this appears in the product

Each lesson card gets a small, coloured label:

```
[CORE]         Controllers & Routing
[CORE]         Services & Providers
[BUILD]        JWT Authentication
[PROFESSIONAL] Redis Caching
[REFERENCE]    Advanced Query Patterns
```

When a learner arrives at the learning path, they see a simple message:

> "To start building your first NestJS API, you need the 8 Core lessons. Everything else is extra."

This immediately answers the question every beginner has: "How much do I actually need?"

---

## Section 5: Outcome-Based Learning

**Outcome-based learning** means naming and organizing content around what the learner will be able to *do*, rather than around what the subject *contains*.

Most curriculum designers name things by subject because they are experts who think in topics. Beginners, however, think in goals. They do not think "I need to learn RBAC." They think "I want to make sure only logged-in users can see certain pages."

---

### Current names vs recommended names

| Current Name | Problem | Recommended Name |
|---|---|---|
| "Authentication & Security Hardening" | Sounds like a textbook chapter | "Secure Your Application" |
| "Database Layer (Prisma & PostgreSQL)" | Sounds technical and abstract | "Add a Real Database" |
| "Request Pipeline & Execution Lifecycle" | Jargon-heavy | "Control How Requests Work" |
| "Production Engineering & DevOps" | Broad and intimidating | "Ship Your Application" |
| "TypeScript & OOP Prerequisites" | "Prerequisites" sounds like a wall | "Build Your Foundation" |

---

### The two-name pattern

The best approach gives each stage two names: one simple outcome name and one technical subtitle.

**Secure Your Application**
*Authentication, authorization, JWT tokens, and rate limiting*

This works for both audiences. The beginner reads the first line and understands the goal. The experienced developer reads the second line and understands the exact technical content. Neither is excluded.

---

### Why this matters for the product

If the NestJS Phase 4 is called "Authentication & Security Hardening," a beginner will wonder: "Do I need this? What does hardening mean?" If it is called "Secure Your Application," the same beginner immediately understands: "Yes, I need this. I want my application to be secure."

The lesson name is a promise. It should promise something the learner wants, not describe something the teacher knows.

---

## Section 6: Milestones and Progress

### Content progress vs skill progress

**Content progress** counts completed items. Example: "5 of 32 lessons completed."
**Skill progress** describes what the learner can now do. Example: "You can now build a basic REST API."

Content progress is easy to implement. Skill progress is more motivating and more honest about what learning actually produces.

Both have a place. The problem is when content progress is the *only* signal shown. Telling a learner they are 3% done after their first lesson is more discouraging than helpful.

---

### Recommended milestone structure for NestJS

Define these milestones explicitly in the curriculum data:

| Milestone | Reached After | What the Learner Can Do |
|---|---|---|
| Foundation | Lessons NJ-01 to NJ-04 | Write TypeScript classes, understand OOP, read NestJS code |
| First API | Lessons NJ-05 to NJ-10 | Build a working REST API with modules, controllers, and services |
| Controlled Pipeline | Lessons NJ-11 to NJ-16 | Add validation, guards, error handling to any endpoint |
| Secure API | Lessons NJ-17 to NJ-20 | Implement login, protect routes, limit requests |
| Data-Driven API | Lessons NJ-21 to NJ-25 | Connect to a database, store and retrieve real data |
| Production Ready | Lessons NJ-26 to NJ-32 | Test, document, and deploy a working application |

---

### How to show milestones in the product

When a learner completes NJ-10, show:

```
🎉 Milestone Reached

You can now build a working REST API with NestJS.
You understand modules, controllers, and services.

Next: Add security to your API
→ Start: Guards & Authorization (NJ-13) · 25 min
```

On the learning path page, show milestones instead of lesson counts:

```
Your Progress

✅ Foundation complete
✅ First API complete
⬤ Securing your API — in progress (2 of 4 done)
○ Data-Driven API — not started
○ Production Ready — not started
```

This view of 5 items feels very different from "12/32 lessons completed." The learner can see they are making real, meaningful progress.

---

### Progress bar guidance

The progress bar inside the current lesson sidebar shows a percentage based on section number. This is not inherently bad. However:

- Do not show `{currentIndex + 1} of {SECTIONS.length} modules` — the word "modules" is wrong and confusing.
- Show `{currentIndex + 1} of {SECTIONS.length} steps` instead, or better: a simple progress bar with no label.
- The percentage number is fine but secondary. Make the "Continue" button more prominent than the percentage.

---

## Section 7: Different Learner Goals

Not all learners want the same thing from a NestJS course. Someone preparing for a job interview needs different content than someone who wants to deploy their first personal project.

---

### The four most common learner goals

**Goal 1: "I want to understand the basics"**
The learner wants foundational knowledge. They may not be building anything yet. They want to feel confident reading NestJS code and discussing it.
*Recommended path: Core lessons only.*

**Goal 2: "I want to build an API"**
The learner has an idea and wants to build it. They want to be productive as quickly as possible.
*Recommended path: Core + Build lessons. Skip Professional and Reference.*

**Goal 3: "I want to be job-ready"**
The learner is preparing for a developer role. They need breadth: they should know how testing works, how authentication works, and how to explain their choices.
*Recommended path: Core + Build + Professional lessons. Skip Reference.*

**Goal 4: "I need one specific thing"**
The learner already knows NestJS but wants to add a feature, such as Redis caching or file uploads.
*Recommended path: Go directly to the relevant lesson. No forced path.*

---

### One curriculum, multiple paths — not separate curricula

LearnCraft should not create separate "beginner" and "advanced" versions of the same content. That creates double the maintenance work and fragments the learner base.

Instead, use one curriculum with different **recommended starting points and filters**.

When a new learner arrives on the NestJS page, ask them one question:

> "What is your goal?"
> - Understand the basics
> - Build my first API
> - Become job-ready
> - I already know some of this

Based on the answer, highlight the relevant lessons and grey out the rest. The full curriculum is still there and accessible. But the default view shows only what the learner actually needs.

This approach scales to any subject on LearnCraft. React, Docker, TypeScript — the same four goals apply everywhere.

---

## Section 8: Existing Knowledge

**A prerequisite** is something a learner needs to know before learning something new. For example, before learning NestJS, a learner ideally already knows some TypeScript.

The problem with prerequisites is that they are binary in a curriculum but graduated in real life. A learner might "know TypeScript" but only know the basics, not the advanced types that NestJS relies on. Asking "Do you know TypeScript?" is not a useful question. Asking "Can you write a TypeScript generic?" is a much better question.

---

### Mechanisms for handling existing knowledge

**Mechanism 1: "I already know this" button**

Each lesson or stage should have an "I already know this" option. Clicking it does not skip the lesson immediately. Instead, it triggers a short check of 3–5 questions. If the learner passes, they skip the lesson and receive credit for it.

*Why not just let the learner skip freely?* Because a beginner might think they know something but have gaps they are not aware of. The short check protects them from accidentally skipping something they actually need.

**Mechanism 2: A knowledge check at the start of a learning path**

When a learner starts a new learning path, offer a 5-question check for the prerequisite subjects. Based on the answers, LearnCraft recommends a starting point.

Example:

> "It looks like you already understand TypeScript basics. We recommend starting with NestJS Modules (NJ-06) instead of NJ-01."

This is not forced. The learner can still choose to start from the beginning. But the recommendation gives experienced learners permission to skip ahead.

**Mechanism 3: Prerequisite labels on individual lessons**

Each lesson card should list its prerequisites in plain language. Not "Prerequisite: NJ-01, NJ-02, NJ-03" (which means nothing), but:

> "Before this lesson, you should understand: TypeScript classes, interfaces, and decorators."

This lets experienced learners judge for themselves whether they are ready.

---

### The right balance: skip without falling behind

The rule should be:

- Any learner can mark a lesson as "already known" and take the check.
- Passing the check skips the lesson and awards the milestone.
- If they fail the check, LearnCraft says: "It looks like there may be a gap. We recommend completing this lesson" — and explains why.

Never hard-block a learner from skipping. But do warn them clearly if the check suggests they are not ready.

---

## Section 9: Lesson Design

### The problem with 17 visible sections

The OOP Foundations lesson currently has 17 visible, numbered steps in the sidebar:

1. Understanding OOP
2. Creating Objects
3. Constructor
4. Methods
5. Four OOP Principles
6. Important Concepts
7. Composition
8. OOP vs Procedural
9. Real-World Examples
10. OOP in Real Projects
11. Beginner Mistakes
12. Think in OOP
13. Concept Tables
14. Learning Checks
15. Coding Exercises
16. Final Project
17. Express vs NestJS

**What is the actual topic of this lesson?** Object-oriented programming in TypeScript.

**How many things does the learner need to understand?** About four:
1. What a class is
2. What an object is
3. How properties and methods work
4. The four main OOP principles (encapsulation, inheritance, polymorphism, abstraction)

The remaining 13 sections — "OOP vs Procedural," "Beginner Mistakes," "Think in OOP," "Concept Tables" — are **teaching tools**, not separate subjects. They help the learner understand the four concepts above. But by labelling them as numbered steps, the lesson makes itself feel like 17 separate things to complete instead of one topic explained thoroughly.

---

### Distinguish between concepts and teaching tools

**Concepts the learner must understand:**
These become the main sections of the lesson. Typically 3–5 per lesson.

**Teaching tools used to explain those concepts:**
- Diagrams
- Common Mistakes
- Quick Checks
- Concept Comparisons
- Real-world Examples
- OOP vs Procedural comparisons

These should be embedded *inside* the relevant concept section, not listed as separate numbered steps.

---

### Recommended lesson structure

A lesson should feel like this from the learner's perspective:

```
Lesson: OOP Foundations

What you will understand after this lesson:
- What a class is and how to create one
- How properties store data and methods perform actions
- The four principles that make OOP powerful

What you will be able to do:
- Write a TypeScript class from scratch
- Add properties and methods
- Explain the difference between a class and an object

── Concept 1: Classes and Objects ──────────────────────
Read a short explanation.
See a simple code example.
[Optional: See a diagram] [Optional: See common mistakes]

── Concept 2: Properties and Methods ───────────────────
Read a short explanation.
See a code example.
[Optional: Try it yourself — 2 minutes]

── Concept 3: The Four OOP Principles ──────────────────
Read a short explanation.
See how each principle appears in real NestJS code.
[Optional: Deep dive into each principle]

── Practice ─────────────────────────────────────────────
Write a User class with two properties and one method.
Answer two questions.

── Summary ──────────────────────────────────────────────
You can now write and use TypeScript classes.
Next: Decorators (20 min)
[Continue →]
```

This is the same depth as the current 17-section lesson. The educational content is not reduced. But it feels like one lesson, not seventeen.

The key change: diagrams, mistake lists, comparison tables, and deep dives are **inside** the relevant concept section and **collapsed by default**. The learner sees: "Optional: See a diagram." If they want it, they expand it. If they don't, they continue.

---

### How many visible sections per lesson?

**Recommendation: 3–6 visible sections per lesson.**

These sections should be:
1. The lesson goal (what you will understand and do)
2. Concept 1
3. Concept 2 (if needed)
4. Concept 3 (if needed)
5. Practice
6. Summary and next step

Everything else — diagrams, comparisons, mistakes, deep dives — is embedded as optional expandable content inside the relevant concept section. The learner who wants depth gets depth. The learner who wants speed gets speed.

---

### Lesson locking

The current system hard-locks all sections after the active one. The learner cannot jump to Practice before finishing Concept 3. This is a significant problem.

**The locked sections make the lesson feel like a long, mandatory march rather than a learning experience.**

Recommendation: unlock all sections within a lesson. Track which sections the learner has seen (for the progress bar), but allow free navigation. If the learner wants to jump to Practice first to see what they are working toward, that is a valid learning strategy.

---

## Section 10: Time-to-First-Success

**Time-to-first-success** is the time between when a learner begins the course and when they first achieve something that feels real and meaningful.

In education, early wins are powerful. A learner who builds something real — even something small — after their first two lessons is far more likely to continue than a learner who spends ten lessons on theory before touching anything.

---

### The current problem

The NestJS path starts with four TypeScript and OOP prerequisites (NJ-01 to NJ-04) before the learner touches NestJS at all. This means a learner interested in NestJS must spend considerable time learning about TypeScript classes, decorators, and SOLID principles before they see a single NestJS controller.

This is understandable from a curriculum design perspective. TypeScript knowledge genuinely is needed to understand NestJS. But from a motivation perspective, it creates a long "theory valley" before the first success moment.

The learner's first success moment — "I made a working endpoint and saw a response in the browser" — currently requires completing at minimum NJ-01 through NJ-07. That is seven lessons of work before the first tangible result.

---

### Recommended approach

**Option 1: The Fast Lane**

Create a short, focused "Quick Start" path that gets the learner to a working endpoint in 2–3 lessons. The learner installs NestJS, creates a controller, runs the server, and sees a response. Then they go back and learn the TypeScript foundations they just used.

This is the "show before explain" approach. The learner sees what NestJS can do, gets excited, and is now motivated to understand how it works.

**Option 2: Integrated early success**

Keep the current order but redesign lesson NJ-01 to end with a small, achievable output. For example: "By the end of this lesson, you will have written a TypeScript class that you will use in your NestJS application." Each prerequisite lesson builds a piece of something real. By NJ-05, the pieces come together.

**Option 3: Goal-based starting point**

When the learner says their goal is "Build an API," skip the prerequisite phase entirely and start at NJ-05. Prerequisite lessons are surfaced only when the learner encounters a concept they don't understand. This is the most aggressive approach and requires good prerequisite-checking mechanisms from Section 8.

---

### First success moments for other subjects

| Subject | First Success Moment | Reachable After |
|---|---|---|
| NestJS | A working endpoint that returns data | 2–3 lessons |
| React | A component that renders in the browser | 1 lesson |
| Docker | A container running your application | 1–2 lessons |
| TypeScript | A typed function that catches an error at compile time | 1 lesson |
| Databases | A query that retrieves real data | 2–3 lessons |

LearnCraft should explicitly design for these moments. They are not accidents. They are the curriculum goals for the first stage of every learning path.

---

## Section 11: Learning Path UI

### The ideal first screen

The current NestJS landing page leads with:
- "NestJS Production Roadmap" (title)
- "Zero to Production Mastery" (badge)
- "32 progressive lessons" (subtitle)
- "10/32 Ready" (progress indicator)

This communicates breadth, completeness, and quantity. These are not the things a beginner needs to feel confident.

**The learner's first question is not "How many lessons are there?" It is "Can I do this?"**

---

### Recommended first screen layout

```
────────────────────────────────────────────────────────
Learn NestJS
Build your first backend API — step by step.

After completing this path, you will be able to:
  ✓ Build a working REST API
  ✓ Connect your application to a database
  ✓ Add user login and protected routes
  ✓ Deploy your application

[Start Learning →]          [I already know some of this]
────────────────────────────────────────────────────────

Your Starting Point
─────────────────────────────────────────────
TypeScript Essentials
The building blocks you need before writing NestJS code.
⏱ 20–30 minutes
[Begin →]
─────────────────────────────────────────────

[View full roadmap ↓]
```

The "View full roadmap" option is available but not the default. It satisfies the learner who wants to explore without overwhelming the learner who just wants to start.

---

### Information hierarchy — what gets the most visual emphasis

| Element | Emphasis | Reason |
|---|---|---|
| What the learner will achieve | Highest | Answers "Why am I here?" |
| "Start Learning" button | Highest | The only action that matters |
| Current or recommended next lesson | High | The immediate next step |
| Estimated time for first lesson | Medium | Answers "How long will this take?" |
| Overall lesson count | None (hidden) | Only intimidates beginners |
| Phase structure | Collapsed | Available in full roadmap |
| "10/32 Ready" progress | None | Irrelevant to a new learner |

---

### For returning learners

When a learner returns after previous progress, the landing page should change:

```
Welcome back.

You can now build a basic NestJS REST API. ✅

Next: Add a Database to Your Application
  → Lesson: Database Setup with Prisma · 30 min

[Continue →]
```

The returning learner does not see all 32 lessons. They see exactly where they left off and what comes next.

---

## Section 12: Journey View vs Full Roadmap

### Journey View — the default experience for beginners

The Journey View is the simplified, focused experience. Think of it as the GPS navigation mode: it shows you the current street and the next turn, not the entire map.

In Journey View, the learner sees:

```
Your NestJS Journey

Stage: Build Your Foundation
─────────────────────────────
✅ TypeScript Essentials
✅ OOP Foundations
⬤ Decorators  ← you are here
○ SOLID Principles

Next milestone:
Start your first NestJS project
```

This is three lines and a small list. It is calming and clear. The learner knows exactly where they are, what is next, and what they are working toward.

---

### Full Roadmap — for exploration

The Full Roadmap shows everything. It is available to any learner who wants to see the complete picture, explore topics out of order, or jump to a specific lesson.

In Full Roadmap, the learner sees:

```
Full NestJS Roadmap

Stage 1: Build Your Foundation     [4 lessons] ✅ Complete
Stage 2: Create Your First API     [6 lessons] ⬤ In progress
Stage 3: Control How Requests Work [6 lessons] ○ Not started
Stage 4: Secure Your Application   [4 lessons] ○ Not started
Stage 5: Add a Real Database       [5 lessons] ○ Not started
Stage 6: Ship Your Application     [7 lessons] ○ Not started

[Search lessons] [Filter by: Core / Build / Professional]
```

Expanding a stage reveals its lessons.

---

### Which is the default?

**Journey View is the default for beginners.**

When a learner first arrives or has not yet completed a lesson, the Journey View should be the only visible view. The "Full Roadmap" button should be visible but not prominent.

When a learner has completed at least one stage, offer them the choice: "View your journey" or "View full roadmap."

For learners who select "I already know some of this" during onboarding, default to Full Roadmap so they can navigate freely.

---

### How the two views interact

The two views share the same progress data. A lesson completed in the Full Roadmap shows as completed in the Journey View and vice versa. The learner can switch between views freely using a toggle or tab. Switching views does not reset progress or change recommendations.

---

## Section 13: Scalability

The principles in this document must work for LearnCraft as it grows beyond NestJS.

---

### The reusable model applied to three subjects

**NestJS (large, complex, enterprise subject)**

- 32 lessons → 6 stages → multiple milestones
- Goal options: Understand Basics | Build an API | Job-Ready | Production-Ready
- First success: a working endpoint in 2–3 lessons
- Core lessons: Controllers, Services, Modules, DTOs (8 lessons)
- Everything else: Build, Professional, or Reference

**React (medium complexity, widely familiar concepts)**

- Possible 20 lessons → 4 stages
- Stages: Understand Components | Build UI | Manage Data | Ship Your App
- Goal options: Build a UI | Job-Ready | Add to existing project
- First success: a component that renders in the browser after lesson 1
- Core lessons: Components, Props, State, useEffect (6–7 lessons)

**Docker (initially simple, becomes complex)**

- Possible 12 lessons → 3 stages
- Stages: Run Your First Container | Package Your Application | Deploy and Scale
- Goal options: Run someone else's app | Package my own app | Deploy to production
- First success: a running container after lesson 1
- Core lessons: Basic Docker commands, Dockerfile, Docker Compose (4 lessons)

---

### The shared architecture that works for all subjects

Every learning path on LearnCraft should follow this pattern:

1. **A one-sentence promise** — what the learner will be able to build or do.
2. **A goal selection** — one question that personalizes the starting point.
3. **A first success moment** — defined explicitly in the first stage.
4. **Content classification** — every lesson tagged as Core, Build, Professional, or Reference.
5. **Milestones** — 3–6 capability milestones per path, named around what the learner can now do.
6. **Journey View by default** — showing only the current stage and next lesson.
7. **Full Roadmap on demand** — for learners who want to explore or jump.

This architecture works for a subject with 5 lessons or 100 lessons. The Journey View adapts automatically. The milestone system scales with the content. The goal filter surfaces the right subset of any curriculum.

---

### Handling overlapping concepts across paths

When the same concept appears in multiple paths — for example, TypeScript appears in both the TypeScript path and the NestJS path — LearnCraft should track what the learner has already completed.

If a learner completed the TypeScript Essentials path before starting NestJS, the NestJS path should automatically detect this and show:

> "You already completed TypeScript Essentials. Starting you at NestJS Modules."

If the learner completed the TypeScript lessons *inside* the NestJS path, those completions should count toward the standalone TypeScript path if they later visit it.

Cross-path progress sharing prevents the learner from feeling punished for exploring multiple subjects.

---

## Section 14: What NOT to Build

These are features that sound sophisticated and educational but often make learning harder in practice.

---

### Hard-locking lessons

**What it is:** Preventing the learner from accessing a lesson until all previous lessons are completed. The current NestJS lesson sidebar does this for every section within a lesson.

**When it helps:** When the learner genuinely cannot understand concept B without concept A. This is sometimes true.

**When it becomes harmful:** When it locks content that is actually accessible independently. Locking "OOP vs Procedural" behind "Understanding OOP" is counterproductive — a learner who wants context on why OOP exists should be able to read that section first.

**Simpler alternative:** Recommend a sequence strongly ("We suggest completing these in order") but do not hard-lock individual sections. Hard-lock whole *stages* only when the dependency is genuine and critical.

---

### Excessive gamification

**What it is:** Points, streaks, badges, leaderboards, achievement systems.

**When it helps:** Very short exercises and practice apps where engagement is the challenge. Duolingo is a good example.

**When it becomes harmful:** When the learner is studying to learn a professional skill. Badges and streaks shift the learner's focus from "Did I understand this?" to "Did I maintain my streak?" A developer who earned 14 badges but cannot write a working controller has learned the wrong thing.

**Simpler alternative:** Milestone celebrations tied to capability ("You can now build a REST API") rather than activity ("7-day streak!"). Progress acknowledgement without gamification mechanics.

---

### Too many progress metrics

**What it is:** Showing the learner their lesson count, section count, percentage, phase count, time spent, and streak simultaneously.

**When it helps:** When a learner is managing a large workload and wants to track their efficiency.

**When it becomes harmful:** When the metrics replace the feeling of learning. Seeing "3% complete" after a meaningful lesson is demoralizing regardless of how much was actually learned.

**Simpler alternative:** Show one primary metric at a time. For beginners, that metric should be the next milestone ("2 of 4 lessons to your first API"). For advanced learners, a simple lesson count or percentage is fine.

---

### Overwhelming dashboards

**What it is:** A homepage showing all learning paths, all progress across all paths, recommended paths, recent activity, learning statistics, and skill summaries at the same time.

**When it helps:** Power users who are actively managing multiple paths simultaneously.

**When it becomes harmful:** For beginners on their first visit, a complex dashboard communicates "this platform is complicated." It also creates decision paralysis: which path should I click first?

**Simpler alternative:** For new learners, the homepage should show one recommended starting point and a short list of available paths. The complex dashboard can be available behind a "Learning Dashboard" tab for learners who want it.

---

### Excessive onboarding questions

**What it is:** Asking the learner 8–12 questions before they can start ("What is your experience level? What are your goals? How many hours per week? What is your learning style? What role are you in?").

**When it helps:** When the platform has thousands of paths and the learner genuinely needs filtering help.

**When it becomes harmful:** When the questions are so many that they become the first obstacle. The learner has not even started yet and is already exhausted.

**Simpler alternative:** Ask one question. "What is your goal with NestJS?" with four options. Use that answer to recommend a starting point. Learn more about the learner from their behaviour over time rather than from a questionnaire.

---

### Displaying every available lesson

**What it is:** Showing all lessons for a path immediately on the landing page, as the current NestJS page does.

**When it helps:** For experienced learners who want to jump to a specific topic.

**When it becomes harmful:** For beginners. Every extra lesson card is an extra reason to feel overwhelmed.

**Simpler alternative:** Show 3–5 lessons by default (the first ones). Provide a "View all lessons" option for those who want it.

---

### Unnecessary prerequisites

**What it is:** Requiring the learner to complete an entire prerequisite path before starting the main path, even when only part of the prerequisite is actually needed.

**When it helps:** When the dependency is deep and genuine.

**When it becomes harmful:** When a learner who knows Python and wants to learn TypeScript is forced to start from "What is a variable?" because TypeScript is categorized as a prerequisite path with a full beginner curriculum.

**Simpler alternative:** Identify the specific prerequisite concepts needed for each lesson. Offer targeted checks for those specific concepts. Never require a learner to complete an entire path just to access another path.

---

## Section 15: Final Recommendation

### The recommended LearnCraft learning model

---

#### 1. Recommended curriculum hierarchy (internal)

This is how content creators and the system organize content. It is not visible to the learner.

```
Learning Path
  └── Stage (was: Phase)
        └── Lesson
              └── Concept Section
                    └── Teaching Block (explanation, example, diagram, etc.)
```

The "Module" level is removed from the learner-facing structure. Internally, lessons can belong to thematic groups, but these groups do not need their own navigation level.

---

#### 2. Learner-facing hierarchy

This is what the learner sees and navigates.

```
Learning Path
  └── Stage (current stage only, by default)
        └── Lesson (next recommended lesson)
              └── Concept (3–5 per lesson, visible)
                    └── [Optional: deeper content, collapsed]
```

The learner sees three levels at most: path, stage, and lesson. Concept sections are visible inside the lesson itself. Everything else is optional and collapsed.

---

#### 3. The ideal learning-path landing page

**For a new learner:**

```
Learn NestJS
Build a real backend API — step by step.

By the end, you will:
  ✓ Build REST APIs with NestJS
  ✓ Connect to a database
  ✓ Add login and protected routes
  ✓ Deploy your application

Your goal:
  ○ Understand the basics
  ○ Build my first API         ← default selected
  ○ Become job-ready
  ○ I know some of this already

[Start Learning →]
```

---

**For a returning learner:**

```
Welcome back.
✅ You can now build a basic NestJS REST API.

Continue: Add a Real Database
  → Database Setup with Prisma · 30 min

[Continue →]         [View full roadmap]
```

---

#### 4. The ideal stage experience

When a learner enters a stage:

- Show the stage name (outcome-based: "Build Your First API").
- Show the lessons in this stage (3–6 typically), in order.
- Show the milestone that completing this stage unlocks.
- Do not show future stages or their lessons.

```
Stage 2: Build Your First API
──────────────────────────────────────────────
After this stage, you can build a working REST API.

✅ Project Setup & Architecture       Complete
⬤ Modules                           ← you are here · 20 min
○ Controllers & Routing             
○ Services & Providers              
○ Dependency Injection              
○ DTOs & Validation                 

Milestone: Your first working API ←──────────
```

---

#### 5. The ideal module/lesson experience

(Note: rename "module" to "lesson" in the interface.)

The lesson page has two areas:

**Left sidebar:**
- Lesson title
- 3–5 numbered concept sections (all clickable — not locked)
- Practice section
- Summary section
- A simple progress bar
- "Previous lesson" and "Next lesson" buttons

**Main content area:**
- Current concept: a short explanation followed by a code example.
- Embedded optional content (diagram, common mistakes, comparison) as expandable sections.
- At the bottom of each concept: a small "Got it, continue" button.
- Practice is a real exercise: write code, answer a question, or build a small thing.

---

#### 6. The ideal lesson structure (visible to learner)

```
Lesson: Controllers & Routing

What you will understand:
  — What a controller is and why it exists
  — How to handle GET, POST, PUT, DELETE requests
  — How to read data from the URL and request body

What you will be able to do:
  — Create a controller for a "users" resource
  — Handle basic CRUD requests

─── Concept 1: What is a controller? ───────
  Explanation + code example
  [+ See diagram] [+ Common mistakes]

─── Concept 2: Handling requests ────────────
  Explanation + code example
  [+ Try a variation] [+ NestJS vs Express comparison]

─── Concept 3: Reading request data ─────────
  Explanation + code example

─── Practice ────────────────────────────────
  Create a UsersController with three routes.
  
─── Summary ─────────────────────────────────
  You can now handle HTTP requests in NestJS.
  Next: Services & Providers · 20 min
  [Continue →]
```

---

#### 7. Progress and milestone mechanics

- Progress is shown as milestones, not lesson counts.
- Each milestone has a name ("You can now build a REST API"), not a number ("5/32 complete").
- Inside a stage, show a simple step count ("3 of 6 lessons in this stage").
- At the end of each lesson, show a skill statement: "You can now handle HTTP requests."
- At the end of each stage, show the full milestone: "You can now build a working NestJS REST API."
- The lesson count (e.g., "32 lessons total") is available in the Full Roadmap view but not shown by default.

---

#### 8. Essential/optional content classification

Every lesson is tagged:

| Tag | Meaning | Shown To |
|---|---|---|
| CORE | Required for the next milestone | Everyone |
| BUILD | Required to build a real project | "Build my API" goal learners |
| PROFESSIONAL | Required for a job or production app | "Job-ready" goal learners |
| REFERENCE | Look up when needed | Available but not highlighted |

The goal the learner selected at the start determines which tags are highlighted. The learner can change their goal at any time.

---

#### 9. Personalization and skipping rules

- One goal question on entry. Four options. No more.
- "I already know this" on every lesson and stage. Triggers a 3–5 question check.
- Pass the check → lesson marked complete, milestone awarded if applicable.
- Fail the check → "We found a few gaps. This lesson will help fill them." No hard block. Recommendation only.
- Cross-path completion tracking: completing TypeScript lessons in the NestJS path counts toward a standalone TypeScript path if the learner later visits it.
- No hard prerequisite gates. Learners can start any lesson. If prerequisites are missing, show a warning: "This lesson builds on Controllers. You may find it easier if you complete that first." Then let them continue anyway.

---

#### 10. The full learner journey

```
1. Arrive at NestJS path
   ↓
2. Read the one-sentence promise ("Build a real backend API")
   ↓
3. Answer one goal question ("Build my first API")
   ↓
4. See the Journey View: Stage 1, Lesson 1 ready
   ↓
5. (Optional) "I already know TypeScript" → short check → skip to NJ-05
   ↓
6. Start Lesson 1: short, focused, 3 concept sections + practice
   ↓
7. First early win: a working TypeScript class used in a real context
   ↓
8. Continue through Stage 1 (4 lessons)
   ↓
9. Milestone: "You can now read and write NestJS code."
   ↓
10. Enter Stage 2: Build Your First API
    ↓
11. First real success: a working endpoint returning data
    ↓
12. Milestone: "You can now build a NestJS REST API."
    ↓
13. Continue through remaining stages
    ↓
14. Final milestone: "You are production-ready."
```

---

### Concrete NestJS example using the recommended model

**Landing page:**
> Learn NestJS — Build your first backend API

**Goal selected:** Build my first API

**Stage 1: Build Your Foundation** *(was: "TypeScript & OOP Prerequisites")*
> After this stage, you will understand the code NestJS is built on.
- TypeScript Essentials [CORE] · 20 min
- OOP Foundations [CORE] · 25 min
- Decorators [CORE] · 20 min
- SOLID Principles [BUILD] · 25 min

**Milestone after Stage 1:**
> You can now read and write the TypeScript patterns that NestJS uses.

**Stage 2: Build Your First API** *(was: "NestJS Core Architecture")*
> After this stage, you will have a working REST API.
- Project Setup [CORE] · 15 min
- Modules [CORE] · 20 min
- Controllers & Routing [CORE] · 25 min
- Services & Providers [CORE] · 25 min
- Dependency Injection [CORE] · 20 min
- DTOs & Validation [CORE] · 25 min

**Milestone after Stage 2:**
> You can now build a working NestJS REST API. 🎉

**Stage 3: Control How Requests Work** *(was: "Request Pipeline & Execution Lifecycle")*
- Request Lifecycle [CORE] · 20 min
- Pipes & Transformation [CORE] · 25 min
- Guards & Authorization [BUILD] · 25 min
- Interceptors [BUILD] · 25 min
- Exception Filters [BUILD] · 20 min
- Middleware [PROFESSIONAL] · 20 min

**Stage 4: Secure Your Application** *(was: "Authentication & Security Hardening")*
- Custom Decorators [BUILD] · 20 min
- Authentication with JWT [BUILD] · 30 min
- Role-Based Access [BUILD] · 25 min
- Security Hardening [PROFESSIONAL] · 20 min

**Milestone after Stage 4:**
> You can now implement secure login and protect your routes.

**Stage 5: Add a Real Database** *(was: "Database Layer (Prisma & PostgreSQL)")*
- Database Setup with Prisma [BUILD] · 30 min
- Entities & Relationships [BUILD] · 30 min
- Migrations [BUILD] · 20 min
- Pagination & Filtering [PROFESSIONAL] · 25 min
- Serialization [PROFESSIONAL] · 20 min

**Stage 6: Ship Your Application** *(was: "Production Engineering & DevOps")*
- Configuration & Environment [PROFESSIONAL] · 20 min
- Structured Logging [PROFESSIONAL] · 20 min
- Testing Strategies [PROFESSIONAL] · 35 min
- API Documentation [BUILD] · 20 min
- File Uploads [REFERENCE] · 20 min
- Caching & Redis [PROFESSIONAL] · 25 min
- Production Deployment [PROFESSIONAL] · 30 min

**Final milestone:**
> You can now build, secure, and deploy a production-grade NestJS application.

---

### React example (shorter, to prove reusability)

**Landing page:** Learn React — Build your first user interface

**Stage 1: Understand the Building Blocks**
- Components & JSX [CORE] · 15 min
- Props & Data Flow [CORE] · 20 min

*Milestone: You can build a React component.*

**Stage 2: Make It Interactive**
- State & Events [CORE] · 25 min
- useEffect & Side Effects [CORE] · 25 min

*Milestone: You can build an interactive UI.*

**Stage 3: Build a Real App**
- Routing [BUILD] · 20 min
- API Calls [BUILD] · 25 min
- Forms [BUILD] · 20 min

*Milestone: You can build a multi-page React application.*

**Stage 4: Go Further**
- Performance Optimization [PROFESSIONAL]
- Testing [PROFESSIONAL]
- Advanced Patterns [PROFESSIONAL]

---

### Docker example (even shorter)

**Landing page:** Learn Docker — Run and package your applications

**Stage 1: Run Your First Container**
- What is Docker and why it exists [CORE] · 10 min
- Running your first container [CORE] · 15 min

*Milestone: You can run any application using Docker.*

**Stage 2: Package Your Application**
- Writing a Dockerfile [BUILD] · 20 min
- Docker Compose [BUILD] · 25 min

*Milestone: You can package and run your own application in Docker.*

**Stage 3: Deploy and Scale**
- Volumes & Networking [PROFESSIONAL] · 25 min
- CI/CD Pipelines [PROFESSIONAL] · 30 min
- Production Deployment [PROFESSIONAL] · 30 min

*Milestone: You can deploy a Dockerised application to a server.*

---

### The complete system as a simple flow

```
Choose a Goal
    ↓
See Your Journey (Stage 1, first lesson)
    ↓
(Optional) Skip what you already know
    ↓
Start the First Lesson
    ↓
Learn (3–5 concepts, simple and focused)
    ↓
Practice (one real exercise)
    ↓
Reach a Milestone ("You can now...")
    ↓
Continue to the Next Stage
    ↓
Build Something Bigger
    ↓
Reach the Final Milestone
    ↓
You are ready.
```

---

## Summary of the Core Problem and the Fix

**The core problem** with the current LearnCraft NestJS architecture is that it is designed around the curriculum rather than around the learner. It shows 32 lessons because 32 lessons exist. It shows 17 sections because 17 sections were written. It hard-locks steps because a curriculum tool was used to build a learner experience.

**The fix is not to reduce the content.** The 32 lessons and 17 sections may be educationally excellent. The fix is to *reveal* that content in a way that matches how human beings actually learn: one step at a time, with clear reasons, with early wins, with acknowledgement of what they already know, and with a constantly visible answer to the question:

> **"What do I do next, and why does it matter?"**

Every design decision in this document is aimed at one outcome:

> The learner opens LearnCraft, sees exactly what to do next, believes they can do it, and begins.
