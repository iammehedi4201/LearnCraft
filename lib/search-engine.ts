/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * HIGH-PERFORMANCE GLOBAL SEARCH & FUZZY MATCH ENGINE — LearnCraft
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Fast client-side inverted search engine with ranked fuzzy matching,
 * acronym recognition, category grouping, dynamic LocalStorage notes indexing,
 * and search history management.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { TOPICS_META, KNOWN_LESSONS } from "./topic-registry";
import { SKILL_ROADMAPS, ROLE_ROADMAPS } from "./roadmap-data";
import { getLocalNotes, getLocalBookmarks } from "./notes-bookmarks";

export type SearchCategory =
  | "all"
  | "lessons"
  | "tracks"
  | "notes"
  | "actions"
  | "roadmaps";

export interface SearchResultItem {
  id: string;
  category: "lessons" | "tracks" | "notes" | "actions" | "roadmaps";
  title: string;
  subtitle?: string;
  description?: string;
  href?: string;
  actionId?: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  score: number;
  highlightIndices?: [number, number][]; // [start, end] ranges in title for highlighting
  shortcut?: string;
}

export interface RecentSearchItem {
  id: string;
  title: string;
  category: SearchResultItem["category"];
  subtitle?: string;
  href?: string;
  actionId?: string;
  icon: string;
  timestamp: number;
}

const RECENT_SEARCHES_KEY = "learncraft_recent_searches_v2";
const MAX_RECENT_SEARCHES = 8;

// ─── Default Static Actions ──────────────────────────────────────────────────

export const QUICK_ACTIONS: Omit<SearchResultItem, "score">[] = [
  {
    id: "action-dashboard",
    category: "actions",
    title: "Go to Analytics Dashboard",
    subtitle: "View XP progression, streak calendar & track completion",
    href: "/dashboard",
    actionId: "nav-dashboard",
    icon: "📊",
    badge: "Analytics",
    badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
    shortcut: "G D",
  },
  {
    id: "action-roadmaps",
    category: "actions",
    title: "Explore Curriculum Roadmaps",
    subtitle: "Role-based and skill-based learning paths",
    href: "/roadmaps",
    actionId: "nav-roadmaps",
    icon: "🗺️",
    badge: "Paths",
    badgeColor: "bg-blue-500/10 text-blue-300 border-blue-500/30",
    shortcut: "G R",
  },
  {
    id: "action-notes",
    category: "actions",
    title: "Open All Notes & Bookmarks",
    subtitle: "Continuous study notebook, code bookmarks & Q&As",
    href: "/notes",
    actionId: "nav-notes",
    icon: "📝",
    badge: "Notebook",
    badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
    shortcut: "G N",
  },
  {
    id: "action-mock-interview",
    category: "actions",
    title: "Start Mock Interview Practice",
    subtitle: "Interactive voice & text technical interview simulator",
    href: "/interview/mock",
    actionId: "nav-interview",
    icon: "🎙️",
    badge: "Practice",
    badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    shortcut: "G I",
  },
  {
    id: "action-playground",
    category: "actions",
    title: "Open Code Playground",
    subtitle: "In-browser live editor with TypeScript & multiple runtimes",
    href: "/learn/nextjs/playground",
    actionId: "nav-playground",
    icon: "⚡",
    badge: "Runner",
    badgeColor: "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    shortcut: "G P",
  },
  {
    id: "action-toggle-theme",
    category: "actions",
    title: "Toggle Color Theme",
    subtitle: "Switch between dark and light appearance",
    actionId: "toggle-theme",
    icon: "🌓",
    badge: "Preferences",
    badgeColor: "bg-slate-500/10 text-slate-300 border-slate-500/30",
    shortcut: "T",
  },
  {
    id: "action-reading-settings",
    category: "actions",
    title: "Customize Reading & Typography Settings",
    subtitle: "Adjust font family, line spacing, margins & font size",
    actionId: "open-reading-panel",
    icon: "⚙️",
    badge: "Reader",
    badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
  },
  {
    id: "action-clear-history",
    category: "actions",
    title: "Clear Search History",
    subtitle: "Remove all saved recent searches and navigation shortcuts",
    actionId: "clear-search-history",
    icon: "🗑️",
    badge: "History",
    badgeColor: "bg-rose-500/10 text-rose-300 border-rose-500/30",
  },
];

// ─── Index Builder ────────────────────────────────────────────────────────────

let cachedStaticIndex: Omit<SearchResultItem, "score">[] | null = null;

export function buildStaticSearchIndex(): Omit<SearchResultItem, "score">[] {
  if (cachedStaticIndex) return cachedStaticIndex;

  const items: Omit<SearchResultItem, "score">[] = [...QUICK_ACTIONS];

  // 1. Index All 14 Tracks
  for (const [key, meta] of Object.entries(TOPICS_META)) {
    items.push({
      id: `track-${key}`,
      category: "tracks",
      title: `${meta.title} Track`,
      subtitle: meta.description,
      description: `Complete ${meta.title} Curriculum & Interactive Lessons`,
      href: `/learn/${key}`,
      icon: meta.icon,
      badge: "Track",
      badgeColor: meta.badgeColor || "bg-purple-500/10 text-purple-300 border-purple-500/30",
    });
  }

  // 2. Index Lessons from KNOWN_LESSONS
  const indexedPaths = new Set<string>();

  for (const [path, lesson] of Object.entries(KNOWN_LESSONS)) {
    if (indexedPaths.has(path)) continue;
    indexedPaths.add(path);

    const topicMeta = TOPICS_META[lesson.topicId];
    const topicTitle = topicMeta?.title || lesson.topicId.toUpperCase();
    const icon = topicMeta?.icon || "📖";

    items.push({
      id: `lesson-${lesson.code}-${path}`,
      category: "lessons",
      title: lesson.name,
      subtitle: `${topicTitle} • ${lesson.code}`,
      description: `Lesson ${lesson.code} in ${topicTitle}`,
      href: path,
      icon,
      badge: lesson.code,
      badgeColor: topicMeta?.badgeColor || "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
    });
  }

  // 3. Index Lessons from Skill Roadmaps (catches any lessons with rich desc)
  for (const roadmap of SKILL_ROADMAPS) {
    if (!roadmap.stages) continue;
    for (const stage of roadmap.stages) {
      for (const lesson of stage.lessons) {
        if (lesson.path && !indexedPaths.has(lesson.path)) {
          indexedPaths.add(lesson.path);
          items.push({
            id: `lesson-${lesson.code}-${lesson.path}`,
            category: "lessons",
            title: lesson.name,
            subtitle: `${roadmap.title} • ${lesson.code}`,
            description: lesson.desc || `Stage ${stage.stageNumber}: ${stage.name}`,
            href: lesson.path,
            icon: roadmap.icon || "📖",
            badge: lesson.code,
            badgeColor: roadmap.badgeColor || "bg-cyan-500/10 text-cyan-300 border-cyan-500/30",
          });
        }
      }
    }
  }

  // 4. Index Roadmaps
  for (const roadmap of SKILL_ROADMAPS) {
    items.push({
      id: `roadmap-skill-${roadmap.id}`,
      category: "roadmaps",
      title: `${roadmap.title} Roadmap`,
      subtitle: `${roadmap.category.toUpperCase()} • ${roadmap.totalLessons} Lessons`,
      description: roadmap.description,
      href: `/roadmaps?category=${roadmap.category}#${roadmap.slug}`,
      icon: roadmap.icon,
      badge: "Roadmap",
      badgeColor: roadmap.badgeColor || "bg-blue-500/10 text-blue-300 border-blue-500/30",
    });
  }

  for (const role of ROLE_ROADMAPS) {
    items.push({
      id: `roadmap-role-${role.id}`,
      category: "roadmaps",
      title: `${role.title} Career Path`,
      subtitle: `${role.steps.length} Key Milestones`,
      description: role.description,
      href: `/roadmaps#${role.slug}`,
      icon: role.icon || "🎯",
      badge: "Career Path",
      badgeColor: "bg-emerald-500/10 text-emerald-300 border-emerald-500/30",
    });
  }

  cachedStaticIndex = items;
  return items;
}

// ─── Dynamic Local Notes & Bookmarks Index ────────────────────────────────────

export function getLocalNotesSearchItems(): Omit<SearchResultItem, "score">[] {
  if (typeof window === "undefined") return [];

  const items: Omit<SearchResultItem, "score">[] = [];

  try {
    const notes = getLocalNotes();
    for (const note of notes) {
      if (!note) continue;
      const title = note.title || note.content.slice(0, 60) || "Study Note";
      const snippet = note.content ? note.content.replace(/[#*`>-]/g, " ").trim().slice(0, 100) : "";
      const path = note.lessonPath || (note.lessonSlug ? `/learn/${note.trackKey}/${note.lessonSlug}` : "/notes");

      items.push({
        id: `note-${note.id}`,
        category: "notes",
        title,
        subtitle: `Note in ${note.trackKey.toUpperCase()}`,
        description: snippet,
        href: path,
        icon: "📝",
        badge: "Note",
        badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
      });

      // Also index any specific Q&A blocks in the note
      if (Array.isArray(note.blocks)) {
        for (const block of note.blocks) {
          if (block.type === "qa" && block.question) {
            items.push({
              id: `note-qa-${block.id}`,
              category: "notes",
              title: block.question,
              subtitle: `Q&A in ${title}`,
              description: block.answer?.slice(0, 80),
              href: path,
              icon: "❓",
              badge: "Q&A",
              badgeColor: "bg-amber-500/10 text-amber-300 border-amber-500/30",
            });
          }
        }
      }
    }

    const bookmarks = getLocalBookmarks();
    for (const bm of bookmarks) {
      if (!bm) continue;
      const bmPath = bm.lessonSlug ? `/learn/${bm.trackKey}/${bm.lessonSlug}` : "/notes";
      items.push({
        id: `bm-${bm.id}`,
        category: "notes",
        title: bm.title || `Code Bookmark (${bm.language || "code"})`,
        subtitle: `Bookmark in ${bm.trackKey.toUpperCase()} • ${bm.language || "code"}`,
        description: bm.code.slice(0, 80),
        href: bmPath,
        icon: "🔖",
        badge: "Bookmark",
        badgeColor: "bg-purple-500/10 text-purple-300 border-purple-500/30",
      });
    }
  } catch (e) {
    console.warn("[SearchEngine] Failed to load local notes index:", e);
  }

  return items;
}

// ─── Ranked Fuzzy Matching Algorithm ─────────────────────────────────────────

export interface FuzzyMatchResult {
  matched: boolean;
  score: number;
  highlightIndices: [number, number][];
}

/**
 * High-precision fuzzy matcher:
 * - Exact match: 1000
 * - Exact prefix: 800 - length delta
 * - Word boundary match: 650
 * - Acronym match (e.g. "sd" for "System Design"): 600
 * - Substring match: 450
 * - Consecutive fuzzy character match: 200 - 400
 */
export function fuzzyMatch(query: string, target: string): FuzzyMatchResult {
  const q = query.trim().toLowerCase();
  const t = target.toLowerCase();

  if (!q || !t) {
    return { matched: false, score: 0, highlightIndices: [] };
  }

  // 1. Exact match
  if (t === q) {
    return {
      matched: true,
      score: 1000,
      highlightIndices: [[0, target.length]],
    };
  }

  // 2. Exact prefix match
  if (t.startsWith(q)) {
    return {
      matched: true,
      score: 800 + Math.max(0, 50 - (t.length - q.length)),
      highlightIndices: [[0, q.length]],
    };
  }

  // 3. Word-boundary substring match (e.g. searching "Router" in "App Router Architecture")
  const words = target.split(/\s+/);
  let wordOffset = 0;
  for (const word of words) {
    const cleanWord = word.toLowerCase();
    if (cleanWord.startsWith(q)) {
      const matchIndex = target.toLowerCase().indexOf(q, wordOffset);
      return {
        matched: true,
        score: 650,
        highlightIndices: [[matchIndex, matchIndex + q.length]],
      };
    }
    wordOffset += word.length + 1;
  }

  // 4. Acronym match (e.g. "SD" -> "System Design", "RRD" -> "React Router Dom")
  const initials = words.map((w) => w[0] || "").join("").toLowerCase();
  if (q.length >= 2 && initials.includes(q)) {
    const acronymIdx = initials.indexOf(q);
    // Find approximate indices of matching initials
    const highlights: [number, number][] = [];
    let curPos = 0;
    let wordIdx = 0;
    for (const w of words) {
      if (wordIdx >= acronymIdx && wordIdx < acronymIdx + q.length) {
        highlights.push([curPos, curPos + 1]);
      }
      curPos += w.length + 1;
      wordIdx++;
    }
    return {
      matched: true,
      score: 600,
      highlightIndices: highlights,
    };
  }

  // 5. Standard substring match anywhere in string
  const subIdx = t.indexOf(q);
  if (subIdx !== -1) {
    // Earlier position is scored higher
    const posPenalty = Math.min(200, subIdx * 5);
    return {
      matched: true,
      score: 450 - posPenalty,
      highlightIndices: [[subIdx, subIdx + q.length]],
    };
  }

  // 6. Character sequence fuzzy match
  let qIdx = 0;
  let tIdx = 0;
  let score = 200;
  let consecutiveCount = 0;
  const matchPositions: number[] = [];

  while (qIdx < q.length && tIdx < t.length) {
    if (q[qIdx] === t[tIdx]) {
      matchPositions.push(tIdx);
      // Consecutive characters bonus
      consecutiveCount++;
      score += 15 * consecutiveCount;

      // Word boundary match bonus
      if (tIdx === 0 || /\s|[-_./]/.test(target[tIdx - 1])) {
        score += 25;
      }

      qIdx++;
    } else {
      consecutiveCount = 0;
    }
    tIdx++;
  }

  if (qIdx === q.length) {
    // Merge consecutive character indices into ranges
    const highlightRanges: [number, number][] = [];
    if (matchPositions.length > 0) {
      let start = matchPositions[0];
      let end = start + 1;

      for (let i = 1; i < matchPositions.length; i++) {
        const pos = matchPositions[i];
        if (pos === end) {
          end = pos + 1;
        } else {
          highlightRanges.push([start, end]);
          start = pos;
          end = pos + 1;
        }
      }
      highlightRanges.push([start, end]);
    }

    return {
      matched: true,
      score: Math.max(50, score - (target.length - q.length)),
      highlightIndices: highlightRanges,
    };
  }

  return { matched: false, score: 0, highlightIndices: [] };
}

// ─── Search Query Executor ───────────────────────────────────────────────────

export function searchLearnCraft(
  query: string,
  category: SearchCategory = "all",
  options?: { limit?: number; includeNotes?: boolean }
): SearchResultItem[] {
  const cleanQuery = query.trim();
  const limit = options?.limit ?? 30;

  // Retrieve static and dynamic items
  const staticItems = buildStaticSearchIndex();
  const notesItems = options?.includeNotes !== false ? getLocalNotesSearchItems() : [];
  const allItems = [...staticItems, ...notesItems];

  // If query is empty, return top recommendations/actions based on category
  if (!cleanQuery) {
    const filtered = category === "all"
      ? allItems.slice(0, limit)
      : allItems.filter((item) => item.category === category).slice(0, limit);

    return filtered.map((item, idx) => ({
      ...item,
      score: 100 - idx,
      highlightIndices: [],
    }));
  }

  const results: SearchResultItem[] = [];

  for (const item of allItems) {
    if (category !== "all" && item.category !== category) {
      continue;
    }

    // 1. Match against title
    const titleMatch = fuzzyMatch(cleanQuery, item.title);

    // 2. Match against subtitle or description
    let subtitleMatchScore = 0;
    if (item.subtitle) {
      const sub = fuzzyMatch(cleanQuery, item.subtitle);
      if (sub.matched) subtitleMatchScore = Math.max(subtitleMatchScore, sub.score * 0.7);
    }
    if (item.description) {
      const desc = fuzzyMatch(cleanQuery, item.description);
      if (desc.matched) subtitleMatchScore = Math.max(subtitleMatchScore, desc.score * 0.5);
    }

    // 3. Match against badge/code (e.g. "SYS-01" or "Action")
    let badgeMatchScore = 0;
    if (item.badge) {
      const b = fuzzyMatch(cleanQuery, item.badge);
      if (b.matched) badgeMatchScore = b.score * 0.85;
    }

    const maxScore = Math.max(
      titleMatch.score,
      subtitleMatchScore,
      badgeMatchScore
    );

    if (maxScore > 0) {
      // Category weight multiplier
      let categoryWeight = 1.0;
      if (item.category === "actions") categoryWeight = 1.15;
      else if (item.category === "tracks") categoryWeight = 1.1;
      else if (item.category === "lessons") categoryWeight = 1.05;

      results.push({
        ...item,
        score: Math.round(maxScore * categoryWeight),
        highlightIndices: titleMatch.highlightIndices || [],
      });
    }
  }

  // Sort by score descending
  results.sort((a, b) => b.score - a.score);

  return results.slice(0, limit);
}

// ─── Recent Searches Management ──────────────────────────────────────────────

// ─── Storage Accessor ─────────────────────────────────────────────────────────

function getStorage(): Storage | null {
  if (typeof window !== "undefined" && window.localStorage) {
    return window.localStorage;
  }
  if (typeof globalThis !== "undefined" && (globalThis as any).localStorage) {
    return (globalThis as any).localStorage;
  }
  return null;
}

export function getRecentSearches(): RecentSearchItem[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    const raw = storage.getItem(RECENT_SEARCHES_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT_SEARCHES) : [];
  } catch {
    return [];
  }
}

export function saveRecentSearch(item: {
  id: string;
  title: string;
  category: SearchResultItem["category"];
  subtitle?: string;
  href?: string;
  actionId?: string;
  icon: string;
}): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    const existing = getRecentSearches();
    const filtered = existing.filter((i) => i.id !== item.id && i.title !== item.title);
    const updated: RecentSearchItem[] = [
      {
        id: item.id,
        title: item.title,
        category: item.category,
        subtitle: item.subtitle,
        href: item.href,
        actionId: item.actionId,
        icon: item.icon,
        timestamp: Date.now(),
      },
      ...filtered,
    ].slice(0, MAX_RECENT_SEARCHES);

    storage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn("[SearchEngine] Failed to save recent search:", err);
  }
}

export function removeRecentSearch(id: string): RecentSearchItem[] {
  const storage = getStorage();
  if (!storage) return [];
  try {
    const existing = getRecentSearches();
    const updated = existing.filter((i) => i.id !== id);
    storage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

export function clearRecentSearches(): void {
  const storage = getStorage();
  if (!storage) return;
  try {
    storage.removeItem(RECENT_SEARCHES_KEY);
  } catch {}
}
