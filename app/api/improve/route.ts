/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * /api/improve — Server-Side File System Operations v2
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *
 * All endpoints are accessed via the `action` query parameter:
 *
 *  GET  /api/improve?action=structure&topic=nestjs&lesson=nj03-decorators
 *       → LessonStructure — full module/section tree parsed from page.tsx
 *
 *  GET  /api/improve?action=section-preview&path=app/learn/.../header-section.tsx
 *       → { preview: string } — first 60 lines of a section file (read-only)
 *
 *  GET  /api/improve?action=scan&topic=nestjs
 *       → SectionFileMeta[] (kept for backwards compat)
 *
 *  GET  /api/improve?action=file&path=...
 *       → { content: string } — raw file content
 *
 *  GET  /api/improve?action=history&lesson=nj02-oop-foundations
 *       → ImprovementHistoryFile
 *
 *  POST /api/improve?action=detect
 *       body: { content: string }
 *       → DetectionResult + currentContent
 *
 *  POST /api/improve?action=apply
 *       body: { filePath, newContent, topic, lesson, section, description }
 *       → ImprovementRecord
 *
 *  POST /api/improve?action=undo
 *       body: { id: string }
 *       → { ok: true }
 *
 *  POST /api/improve?action=redo
 *       body: { id: string }
 *       → { ok: true }
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import type { SectionFileMeta } from "@/lib/improvement-detector";
import {
  detectImprovement,
  detectExportName,
  extractSectionContainerTitle,
  extractSectionContainerNumber,
} from "@/lib/improvement-detector";
import {
  computeDiffStats,
  generateId,
  type ImprovementHistoryFile,
  type ImprovementRecord,
} from "@/lib/improvement-history";
import type { SectionFileInfo, LessonModule, LessonStructure } from "@/lib/improve-types";

// Re-export types so clients that imported from this file still work
export type { SectionFileInfo, LessonModule, LessonStructure };

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_ROOT = path.resolve(process.cwd());
const LEARN_ROOT = path.join(PROJECT_ROOT, "app", "learn");
const HISTORY_FILE = path.join(PROJECT_ROOT, "improvement-history.json");

// Security: Only allow operations within app/learn/
function isPathSafe(filePath: string): boolean {
  const resolved = path.resolve(PROJECT_ROOT, filePath);
  return resolved.startsWith(LEARN_ROOT);
}



// ─── History file I/O ─────────────────────────────────────────────────────────

function readHistory(): ImprovementHistoryFile {
  try {
    const raw = fs.readFileSync(HISTORY_FILE, "utf-8");
    return JSON.parse(raw);
  } catch {
    return { version: 1, records: [] };
  }
}

function writeHistory(data: ImprovementHistoryFile): void {
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(data, null, 2), "utf-8");
}

// ─── Section file info reader ─────────────────────────────────────────────────

function readSectionFileInfo(filePath: string): Pick<SectionFileInfo, "exportName" | "title" | "sectionNumber"> {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const exportName = detectExportName(content) ?? toPascalCase(path.basename(filePath, ".tsx"));
    const title = extractSectionContainerTitle(content) ?? formatTitle(path.basename(filePath, ".tsx"));
    const sectionNumber = extractSectionContainerNumber(content);
    return { exportName, title, sectionNumber };
  } catch {
    const base = path.basename(filePath, ".tsx");
    return { exportName: toPascalCase(base), title: formatTitle(base), sectionNumber: 0 };
  }
}

function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("");
}

function formatTitle(str: string): string {
  return str
    .replace(/-section$/, "")
    .replace(/[-_]/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Page.tsx Parser ──────────────────────────────────────────────────────────
//
// Parses a lesson's page.tsx to extract the complete module structure.
// Handles two patterns:
//   Pattern A (module-grouped): SECTIONS has LearningModule objects with
//     { id: "fundamentals", stage: "Fundamentals", label: "...", description: "..." }
//   Pattern B (flat-parts): SECTIONS has { id: "part1", label: "...", icon: "..." }
//
// Then extracts renderContent() switch to map module IDs → component names.
// Then maps component names → import file paths.

function parseLessonPageTsx(pageContent: string, componentsDir: string, topicId: string, lessonSlug: string): LessonStructure {
  // ── 1. Detect structure type ──
  const isModuleGrouped = /stage:\s*["']/.test(pageContent);
  const structureType: "module-grouped" | "flat-parts" = isModuleGrouped ? "module-grouped" : "flat-parts";

  // ── 2. Parse SECTIONS array ──
  const sectionsMatch = pageContent.match(/const SECTIONS[^=]*=\s*\[[\s\S]*?\];/);
  const sectionsText = sectionsMatch?.[0] ?? "";

  const modules: LessonModule[] = [];

  if (isModuleGrouped) {
    // Pattern A: Extract { id, stage, label, description, optional? } objects
    const objectPattern = /\{\s*id:\s*["']([^"']+)["'][^}]*?stage:\s*["']([^"']+)["'][^}]*?label:\s*["']([^"']+)["'][^}]*?description:\s*["']([^"']+)["'][^}]*?(optional:\s*true[^}]*)?\}/gs;
    let m: RegExpExecArray | null;
    while ((m = objectPattern.exec(sectionsText)) !== null) {
      modules.push({
        id: m[1],
        stage: m[2],
        label: m[3],
        description: m[4] ?? "",
        optional: !!m[5],
        sectionFiles: [],
      });
    }
  } else {
    // Pattern B: Extract { id: "part1", label: "...", icon: "..." }
    const partPattern = /\{\s*id:\s*["'](part\d+)["'][^}]*?label:\s*["']([^"']+)["'][^}]*?\}/gs;
    let m: RegExpExecArray | null;
    while ((m = partPattern.exec(sectionsText)) !== null) {
      modules.push({
        id: m[1],
        stage: m[1].replace("part", "Part "),
        label: m[2],
        description: "",
        optional: false,
        sectionFiles: [],
      });
    }
  }

  // ── 3. Parse import statements → component name to filename map ──
  const importMap = new Map<string, string>();
  // Match: import { FooSection, BarSection } from "./components/foo-section"
  const importPattern = /import\s+\{([^}]+)\}\s+from\s+["']\.\/components\/([^"']+)["']/g;
  let im: RegExpExecArray | null;
  while ((im = importPattern.exec(pageContent)) !== null) {
    const exports = im[1].split(",").map((e) => e.trim().split(/\s+as\s+/)[0].trim());
    const file = im[2].endsWith(".tsx") ? im[2] : im[2] + ".tsx";
    for (const exp of exports) {
      if (exp) importMap.set(exp, file);
    }
  }

  // ── 4. Parse renderContent() switch to map module ID → component exports ──
  const renderContentMatch = pageContent.match(/const\s+renderContent\s*=\s*\(\)\s*=>\s*\{[\s\S]*?\n\s*\}/m);
  const renderContentText = renderContentMatch?.[0] ?? "";

  // Map: moduleId → [ComponentName, ...]
  const moduleToComponents = new Map<string, string[]>();

  if (isModuleGrouped) {
    // Pattern A: case "fundamentals": return (<> <HeaderSection /> <SyntaxSection /> </>)
    const casePattern = /case\s+["']([^"']+)["']\s*:\s*(?:return\s*)?\(?\s*<>?([\s\S]*?)<\/?>?\s*\)?\s*;/g;
    let cm: RegExpExecArray | null;
    while ((cm = casePattern.exec(renderContentText)) !== null) {
      const moduleId = cm[1];
      const jsxBlock = cm[2];
      // Extract component names: <FooSection />, <BarSection />
      const componentNames: string[] = [];
      const compPattern = /<([A-Z][a-zA-Z]+Section)[^/]*/g;
      let cp: RegExpExecArray | null;
      while ((cp = compPattern.exec(jsxBlock)) !== null) {
        componentNames.push(cp[1]);
      }
      if (componentNames.length > 0) {
        moduleToComponents.set(moduleId, componentNames);
      }
    }
  } else {
    // Pattern B: case "part1": return <HeaderSection />;
    const partCasePattern = /case\s+["'](part\d+)["']\s*:\s*(?:return\s*)?<([A-Z][a-zA-Z]+Section)\s*\/>/g;
    let pc: RegExpExecArray | null;
    while ((pc = partCasePattern.exec(renderContentText)) !== null) {
      moduleToComponents.set(pc[1], [pc[2]]);
    }
  }

  // ── 5. Resolve section files for each module ──
  for (const module of modules) {
    const componentNames = moduleToComponents.get(module.id) ?? [];

    for (const componentName of componentNames) {
      let fileName = importMap.get(componentName);

      if (!fileName) {
        // Fallback: derive filename from component name
        fileName = componentName
          .replace(/([A-Z])/g, (_, ch, offset) => (offset > 0 ? "-" : "") + ch.toLowerCase())
          .toLowerCase() + ".tsx";
      }

      const absFilePath = path.join(componentsDir, fileName);
      const relFilePath = path
        .join("app", "learn", topicId, lessonSlug, "components", fileName)
        .replace(/\\/g, "/");

      if (fs.existsSync(absFilePath)) {
        const info = readSectionFileInfo(absFilePath);
        module.sectionFiles.push({
          fileName,
          exportName: info.exportName || componentName,
          title: info.title || formatTitle(fileName.replace(".tsx", "")),
          sectionNumber: info.sectionNumber,
          filePath: relFilePath,
        });
      }
    }

    // If a module has no section files (e.g., default fallback), also try the file scan
    if (module.sectionFiles.length === 0 && !isModuleGrouped) {
      // For flat-parts, component might use default case fallback (HeaderSection)
      const fallbackComponents = moduleToComponents.get("default") ?? [];
      for (const c of fallbackComponents) {
        const fn = importMap.get(c);
        if (fn) {
          const absP = path.join(componentsDir, fn);
          if (fs.existsSync(absP)) {
            const info = readSectionFileInfo(absP);
            module.sectionFiles.push({
              fileName: fn,
              exportName: info.exportName || c,
              title: info.title || formatTitle(fn.replace(".tsx", "")),
              sectionNumber: info.sectionNumber,
              filePath: path
                .join("app", "learn", topicId, lessonSlug, "components", fn)
                .replace(/\\/g, "/"),
            });
          }
        }
      }
    }
  }

  // ── 6. Lesson name from slug ──
  const lessonName = lessonSlug
    .replace(/^[a-z]{2}\d+-/, "")
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  return { topicId, lessonSlug, lessonName, structureType, modules };
}

// ─── Section file scanner (legacy, kept for backwards compat) ────────────────

function scanSectionFiles(topicId: string): SectionFileMeta[] {
  const topicDir = path.join(LEARN_ROOT, topicId);
  if (!fs.existsSync(topicDir)) return [];

  const results: SectionFileMeta[] = [];
  const lessonDirs = fs
    .readdirSync(topicDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  for (const lessonSlug of lessonDirs) {
    const componentsDir = path.join(topicDir, lessonSlug, "components");
    if (!fs.existsSync(componentsDir)) continue;

    const files = fs
      .readdirSync(componentsDir)
      .filter((f) => f.endsWith("-section.tsx"));

    for (const fileName of files) {
      const filePath = path.join(componentsDir, fileName);
      const content = fs.readFileSync(filePath, "utf-8");
      const exportName = detectExportName(content) ?? toPascalCase(fileName.replace(".tsx", ""));
      const title = extractSectionContainerTitle(content) ?? fileName.replace("-section.tsx", "");
      const sectionNumber = extractSectionContainerNumber(content);

      results.push({
        fileName,
        exportName,
        title,
        sectionNumber,
        filePath: path.relative(PROJECT_ROOT, filePath).replace(/\\/g, "/"),
        lessonSlug,
        topicId,
      });
    }
  }
  return results;
}

function scanAllSectionFiles(): SectionFileMeta[] {
  if (!fs.existsSync(LEARN_ROOT)) return [];
  const topics = fs
    .readdirSync(LEARN_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  return topics.flatMap((t) => scanSectionFiles(t));
}

// ─── Server-side content similarity ──────────────────────────────────────────

function detectWithFileSimilarity(
  pastedContent: string,
  sections: SectionFileMeta[]
): SectionFileMeta | null {
  let bestSection: SectionFileMeta | null = null;
  let bestScore = 0;

  for (const section of sections) {
    const filePath = path.resolve(PROJECT_ROOT, section.filePath);
    if (!fs.existsSync(filePath)) continue;
    const fileContent = fs.readFileSync(filePath, "utf-8");

    const pastedWords = new Set(
      (pastedContent.toLowerCase().match(/\b\w{3,}\b/g) ?? []).slice(0, 500)
    );
    const fileWords = new Set(
      (fileContent.toLowerCase().match(/\b\w{3,}\b/g) ?? []).slice(0, 500)
    );
    let intersection = 0;
    for (const w of pastedWords) if (fileWords.has(w)) intersection++;
    const union = pastedWords.size + fileWords.size - intersection;
    const score = union === 0 ? 0 : intersection / union;

    if (score > bestScore) {
      bestScore = score;
      bestSection = section;
    }
  }

  return bestScore > 0.3 ? bestSection : null;
}

// ─── GET handler ──────────────────────────────────────────────────────────────

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const action = searchParams.get("action");

  // ── NEW: Structure — parse page.tsx to get full lesson structure ──
  if (action === "structure") {
    const topic = searchParams.get("topic");
    const lesson = searchParams.get("lesson");

    if (!topic || !lesson) {
      return NextResponse.json({ error: "topic and lesson are required" }, { status: 400 });
    }

    const lessonDir = path.join(LEARN_ROOT, topic, lesson);
    const pageFile = path.join(lessonDir, "page.tsx");
    const componentsDir = path.join(lessonDir, "components");

    if (!fs.existsSync(pageFile)) {
      return NextResponse.json({ error: `page.tsx not found for ${topic}/${lesson}` }, { status: 404 });
    }

    const pageContent = fs.readFileSync(pageFile, "utf-8");
    const structure = parseLessonPageTsx(pageContent, componentsDir, topic, lesson);

    return NextResponse.json(structure);
  }

  // ── NEW: List lessons for a topic ──
  if (action === "list-lessons") {
    const topic = searchParams.get("topic");
    if (!topic) {
      return NextResponse.json({ error: "topic is required" }, { status: 400 });
    }

    const topicDir = path.join(LEARN_ROOT, topic);
    if (!fs.existsSync(topicDir)) {
      return NextResponse.json({ lessons: [] });
    }

    const entries = fs.readdirSync(topicDir, { withFileTypes: true });
    const lessons = entries
      .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(topicDir, entry.name, "page.tsx")))
      .map((entry) => ({
        id: entry.name,
        title: formatTitle(entry.name),
      }));

    return NextResponse.json({ lessons });
  }

  // ── NEW: Section preview — return first N lines of a section file ──
  if (action === "section-preview") {
    const filePath = searchParams.get("path");
    const linesParam = searchParams.get("lines") ?? "60";
    const maxLines = Math.min(parseInt(linesParam, 10) || 60, 200);

    if (!filePath) return NextResponse.json({ error: "path is required" }, { status: 400 });
    if (!isPathSafe(filePath)) {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }
    const abs = path.resolve(PROJECT_ROOT, filePath);
    if (!fs.existsSync(abs)) return NextResponse.json({ error: "File not found" }, { status: 404 });

    const content = fs.readFileSync(abs, "utf-8");
    const lines = content.split("\n");
    const preview = lines.slice(0, maxLines).join("\n");

    return NextResponse.json({
      preview,
      totalLines: lines.length,
      truncated: lines.length > maxLines,
    });
  }

  // ── Scan: list all section files for a topic (legacy) ──
  if (action === "scan") {
    const topic = searchParams.get("topic");
    const sections = topic ? scanSectionFiles(topic) : scanAllSectionFiles();
    return NextResponse.json(sections);
  }

  // ── File: read a specific section file ──
  if (action === "file") {
    const filePath = searchParams.get("path");
    if (!filePath) return NextResponse.json({ error: "path is required" }, { status: 400 });
    if (!isPathSafe(filePath)) {
      return NextResponse.json({ error: "Access denied: path is outside app/learn/" }, { status: 403 });
    }
    const abs = path.resolve(PROJECT_ROOT, filePath);
    if (!fs.existsSync(abs)) return NextResponse.json({ error: "File not found" }, { status: 404 });
    const content = fs.readFileSync(abs, "utf-8");
    return NextResponse.json({ content, size: content.length, lines: content.split("\n").length });
  }

  // ── History: list improvement records ──
  if (action === "history") {
    const lesson = searchParams.get("lesson");
    const section = searchParams.get("section");
    const history = readHistory();
    let records = history.records;

    if (lesson) records = records.filter((r) => r.lesson.slug === lesson);
    if (section) records = records.filter((r) => r.section.fileName === section);

    records = [...records].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    return NextResponse.json({ version: history.version, records });
  }

  return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
}

// ─── POST handler ─────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const action = searchParams.get("action");

  // ── Detect: run detection on pasted content ──
  if (action === "detect") {
    const body = await req.json();
    const { content, topicHint } = body as { content: string; topicHint?: string };

    const allSections = topicHint ? scanSectionFiles(topicHint) : scanAllSectionFiles();
    const result = detectImprovement(content, allSections);

    // Server-side similarity if lesson matched but no section
    if (result.lesson && !result.section) {
      const lessonSections = allSections.filter((s) => s.lessonSlug === result.lesson!.slug);
      const similar = detectWithFileSimilarity(content, lessonSections);
      if (similar) {
        result.section = similar;
        result.confidence = Math.min(result.confidence + 20, 99);
        result.signals.push(`Server similarity match: "${similar.fileName}"`);
      }
    }

    // Try topic-wide similarity
    if (result.topic && !result.section) {
      const topicSections = allSections.filter((s) => s.topicId === result.topic!.id);
      const similar = detectWithFileSimilarity(content, topicSections);
      if (similar) {
        result.section = similar;
        result.confidence = Math.min(result.confidence + 15, 99);
        result.signals.push(`Cross-lesson similarity: "${similar.fileName}" in ${similar.lessonSlug}`);
        if (!result.lesson) {
          result.lesson = {
            slug: similar.lessonSlug,
            name: similar.lessonSlug,
            dirPath: `app/learn/${similar.topicId}/${similar.lessonSlug}`,
          };
        }
      }
    }

    // Load current file content for diffing
    let currentContent: string | null = null;
    if (result.section?.filePath) {
      const abs = path.resolve(PROJECT_ROOT, result.section.filePath);
      if (fs.existsSync(abs)) {
        currentContent = fs.readFileSync(abs, "utf-8");
      }
    }

    // If we have topic + lesson, also return lesson structure
    let lessonStructure: LessonStructure | null = null;
    if (result.topic && result.lesson) {
      try {
        const pageFile = path.join(LEARN_ROOT, result.topic.id, result.lesson.slug, "page.tsx");
        const componentsDir = path.join(LEARN_ROOT, result.topic.id, result.lesson.slug, "components");
        if (fs.existsSync(pageFile)) {
          const pageContent = fs.readFileSync(pageFile, "utf-8");
          lessonStructure = parseLessonPageTsx(pageContent, componentsDir, result.topic.id, result.lesson.slug);
        }
      } catch {
        // Structure is optional, don't fail if it can't be parsed
      }
    }

    return NextResponse.json({ ...result, currentContent, lessonStructure });
  }

  // ── Apply: write improved content to disk + save history ──
  if (action === "apply") {
    const body = await req.json() as {
      filePath: string;
      newContent: string;
      topic: ImprovementRecord["topic"];
      lesson: ImprovementRecord["lesson"];
      section: ImprovementRecord["section"];
      description: string;
    };

    const { filePath, newContent, topic, lesson, section, description } = body;

    if (!filePath || !newContent) {
      return NextResponse.json({ error: "filePath and newContent are required" }, { status: 400 });
    }
    if (!isPathSafe(filePath)) {
      return NextResponse.json({ error: "Access denied: path is outside app/learn/" }, { status: 403 });
    }

    const abs = path.resolve(PROJECT_ROOT, filePath);
    if (!fs.existsSync(abs)) {
      return NextResponse.json({ error: `File not found: ${filePath}` }, { status: 404 });
    }

    const previousContent = fs.readFileSync(abs, "utf-8");
    fs.writeFileSync(abs, newContent, "utf-8");

    const stats = computeDiffStats(previousContent, newContent);
    const record: ImprovementRecord = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      topic,
      lesson,
      section,
      filePath,
      previousContent,
      newContent,
      description: description || "No description provided",
      undone: false,
      stats,
    };

    const history = readHistory();
    history.records.push(record);
    writeHistory(history);

    return NextResponse.json(record);
  }

  // ── Undo: restore previous content ──
  if (action === "undo") {
    const { id } = (await req.json()) as { id: string };
    const history = readHistory();
    const record = history.records.find((r) => r.id === id);

    if (!record) return NextResponse.json({ error: `Record ${id} not found` }, { status: 404 });
    if (record.undone) return NextResponse.json({ error: "Already undone" }, { status: 400 });
    if (!isPathSafe(record.filePath)) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    fs.writeFileSync(path.resolve(PROJECT_ROOT, record.filePath), record.previousContent, "utf-8");
    record.undone = true;
    writeHistory(history);

    return NextResponse.json({ ok: true });
  }

  // ── Redo: re-apply undone improvement ──
  if (action === "redo") {
    const { id } = (await req.json()) as { id: string };
    const history = readHistory();
    const record = history.records.find((r) => r.id === id);

    if (!record) return NextResponse.json({ error: `Record ${id} not found` }, { status: 404 });
    if (!record.undone) return NextResponse.json({ error: "Not undone" }, { status: 400 });
    if (!isPathSafe(record.filePath)) return NextResponse.json({ error: "Access denied" }, { status: 403 });

    fs.writeFileSync(path.resolve(PROJECT_ROOT, record.filePath), record.newContent, "utf-8");
    record.undone = false;
    writeHistory(history);

    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: `Unknown action: ${action}` }, { status: 400 });
}
