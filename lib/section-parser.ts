/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * SECTION PARSER — Sub-Section & Component Extractor
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 * Parses full section files (.tsx) into structured, readable sub-sections
 * so users can edit content topic-by-topic instead of dealing with a flat,
 * confusing cloud of raw tags.
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */

export interface SubSectionBlock {
  id: string;
  type: string;
  label: string;
  icon: string;
  rawSource: string;
  fields: {
    key: string;
    label: string;
    value: string;
    multiline?: boolean;
    isCode?: boolean;
  }[];
}

export interface SubSection {
  id: string;
  index: number;
  number?: number | string;
  title: string;
  description?: string;
  rawSource: string;
  blocks: SubSectionBlock[];
}

// ─── Extract Prop Value Helper ───
function extractProp(source: string, propName: string): string {
  // Match propName="value" or propName='value' or propName={`value`} or propName={"value"}
  const regex = new RegExp(
    `\\b${propName}=(?:(?:"([^"]*)")|(?:'([^']*)')|(?:\\{\\s*(?:"([^"]*)"|'([^']*)'|\`([\\s\\S]*?)\`)\\s*\\}))`,
  );
  const match = source.match(regex);
  if (!match) return "";
  return match[1] ?? match[2] ?? match[3] ?? match[4] ?? match[5] ?? "";
}

// ─── Extract JSX Inner Content Helper ───
function extractTagContent(source: string, tagName: string): string {
  const regex = new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)</${tagName}>`, "i");
  const match = source.match(regex);
  if (!match) return "";
  // Strip simple inner tags like <p>, </p>, but preserve text
  return match[1]
    .replace(/<\/?(p|span|strong|em|b|i|div|ol|ul|li)[^>]*>/gi, "\n")
    .replace(/\n\s*\n/g, "\n")
    .trim();
}

// ─── Parse Blocks Inside a Sub-Section ───
export function extractBlocksFromSubSection(
  subSectionSource: string,
  subSectionIndex: number,
): SubSectionBlock[] {
  const blocks: SubSectionBlock[] = [];
  let blockCounter = 0;

  // 1. TopicHeader
  const topicHeaderRegex = /<TopicHeader\s+[\s\S]*?\/>/g;
  let thMatch;
  while ((thMatch = topicHeaderRegex.exec(subSectionSource)) !== null) {
    const raw = thMatch[0];
    const title = extractProp(raw, "title");
    const description = extractProp(raw, "description");
    const num = extractProp(raw, "number");
    blocks.push({
      id: `sub-${subSectionIndex}-th-${blockCounter++}`,
      type: "TopicHeader",
      label: title ? `Topic Header: ${title}` : "Topic Header",
      icon: "📌",
      rawSource: raw,
      fields: [
        { key: "title", label: "Title", value: title },
        { key: "description", label: "Description", value: description, multiline: true },
        ...(num ? [{ key: "number", label: "Step Number", value: num }] : []),
      ],
    });
  }

  // 2. SectionHeading
  const headingRegex = /<SectionHeading[^>]*>([\s\S]*?)<\/SectionHeading>/g;
  let hMatch;
  while ((hMatch = headingRegex.exec(subSectionSource)) !== null) {
    const raw = hMatch[0];
    const headingText = hMatch[1].trim();
    blocks.push({
      id: `sub-${subSectionIndex}-heading-${blockCounter++}`,
      type: "SectionHeading",
      label: `Heading: ${headingText.replace(/^[^\w\s]+/, "").trim().substring(0, 35)}`,
      icon: "🏷️",
      rawSource: raw,
      fields: [{ key: "children", label: "Heading Text", value: headingText }],
    });
  }

  // 3. AnalogyBox
  const analogyRegex = /<AnalogyBox\s+[\s\S]*?<\/AnalogyBox>/g;
  let anMatch;
  while ((anMatch = analogyRegex.exec(subSectionSource)) !== null) {
    const raw = anMatch[0];
    const title = extractProp(raw, "title") || "Think about it like this";
    const emoji = extractProp(raw, "emoji") || "💡";
    const body = extractTagContent(raw, "AnalogyBox");
    blocks.push({
      id: `sub-${subSectionIndex}-analogy-${blockCounter++}`,
      type: "AnalogyBox",
      label: `Analogy: ${title}`,
      icon: emoji || "💡",
      rawSource: raw,
      fields: [
        { key: "title", label: "Title", value: title },
        { key: "emoji", label: "Emoji", value: emoji },
        { key: "children", label: "Explanation / Content", value: body, multiline: true },
      ],
    });
  }

  // 4. Playground
  const playgroundRegex = /<Playground\s+[\s\S]*?\/>/g;
  let pgMatch;
  while ((pgMatch = playgroundRegex.exec(subSectionSource)) !== null) {
    const raw = pgMatch[0];
    const starterCode = extractProp(raw, "starterCode");
    const height = extractProp(raw, "height") || "320px";
    blocks.push({
      id: `sub-${subSectionIndex}-playground-${blockCounter++}`,
      type: "Playground",
      label: "Code Playground",
      icon: "🚀",
      rawSource: raw,
      fields: [
        { key: "starterCode", label: "Starter Code", value: starterCode, multiline: true, isCode: true },
        { key: "height", label: "Height", value: height },
      ],
    });
  }

  // 5. WhyBox
  const whyRegex = /<WhyBox[^>]*>([\s\S]*?)<\/WhyBox>/g;
  let wbMatch;
  while ((wbMatch = whyRegex.exec(subSectionSource)) !== null) {
    const raw = wbMatch[0];
    const body = extractTagContent(raw, "WhyBox");
    blocks.push({
      id: `sub-${subSectionIndex}-why-${blockCounter++}`,
      type: "WhyBox",
      label: "Why Box",
      icon: "🤔",
      rawSource: raw,
      fields: [{ key: "children", label: "Explanation Text", value: body, multiline: true }],
    });
  }

  // 6. SummaryBox
  const summaryRegex = /<SummaryBox[^>]*>([\s\S]*?)<\/SummaryBox>/g;
  let smMatch;
  while ((smMatch = summaryRegex.exec(subSectionSource)) !== null) {
    const raw = smMatch[0];
    const body = extractTagContent(raw, "SummaryBox");
    blocks.push({
      id: `sub-${subSectionIndex}-summary-${blockCounter++}`,
      type: "SummaryBox",
      label: "Summary Box",
      icon: "📝",
      rawSource: raw,
      fields: [{ key: "children", label: "Summary Content", value: body, multiline: true }],
    });
  }

  // 7. InfoCallout
  const infoRegex = /<InfoCallout\s+[\s\S]*?<\/InfoCallout>/g;
  let infoMatch;
  while ((infoMatch = infoRegex.exec(subSectionSource)) !== null) {
    const raw = infoMatch[0];
    const title = extractProp(raw, "title");
    const emoji = extractProp(raw, "emoji") || "ℹ️";
    const body = extractTagContent(raw, "InfoCallout");
    blocks.push({
      id: `sub-${subSectionIndex}-info-${blockCounter++}`,
      type: "InfoCallout",
      label: `Callout: ${title || "Important Info"}`,
      icon: emoji || "ℹ️",
      rawSource: raw,
      fields: [
        { key: "title", label: "Title", value: title },
        { key: "emoji", label: "Emoji", value: emoji },
        { key: "children", label: "Callout Text", value: body, multiline: true },
      ],
    });
  }

  // 8. MistakeBox
  const mistakeRegex = /<MistakeBox\s+[\s\S]*?\/>/g;
  let msMatch;
  while ((msMatch = mistakeRegex.exec(subSectionSource)) !== null) {
    const raw = msMatch[0];
    const title = extractProp(raw, "title");
    const description = extractProp(raw, "description");
    const wrong = extractProp(raw, "wrong");
    const right = extractProp(raw, "right");
    blocks.push({
      id: `sub-${subSectionIndex}-mistake-${blockCounter++}`,
      type: "MistakeBox",
      label: `Common Mistake: ${title || "Watch Out"}`,
      icon: "⚠️",
      rawSource: raw,
      fields: [
        { key: "title", label: "Mistake Title", value: title },
        { key: "description", label: "Description", value: description, multiline: true },
        { key: "wrong", label: "Wrong Code / Example", value: wrong, multiline: true, isCode: true },
        { key: "right", label: "Right Code / Fix", value: right, multiline: true, isCode: true },
      ],
    });
  }

  // 9. QuickCheck
  const qcRegex = /<QuickCheck\s+[\s\S]*?\/>/g;
  let qcMatch;
  while ((qcMatch = qcRegex.exec(subSectionSource)) !== null) {
    const raw = qcMatch[0];
    const question = extractProp(raw, "question");
    const answer = extractProp(raw, "answer");
    blocks.push({
      id: `sub-${subSectionIndex}-qc-${blockCounter++}`,
      type: "QuickCheck",
      label: `Quick Check: ${question.substring(0, 30)}...`,
      icon: "❓",
      rawSource: raw,
      fields: [
        { key: "question", label: "Question", value: question, multiline: true },
        { key: "answer", label: "Answer", value: answer, multiline: true },
      ],
    });
  }

  // 10. PredictOutputBox
  const predictRegex = /<PredictOutputBox\s+[\s\S]*?\/>/g;
  let predMatch;
  while ((predMatch = predictRegex.exec(subSectionSource)) !== null) {
    const raw = predMatch[0];
    const code = extractProp(raw, "code");
    const answer = extractProp(raw, "answer");
    blocks.push({
      id: `sub-${subSectionIndex}-pred-${blockCounter++}`,
      type: "PredictOutputBox",
      label: "Predict Output Challenge",
      icon: "🔮",
      rawSource: raw,
      fields: [
        { key: "code", label: "Code Challenge", value: code, multiline: true, isCode: true },
        { key: "answer", label: "Expected Answer", value: answer, multiline: true },
      ],
    });
  }

  return blocks;
}

// ─── Parse Full File Into Sub-Sections ───
export function parseSectionFileIntoSubSections(fileContent: string): SubSection[] {
  // Find the SectionContainer contents
  const containerMatch = fileContent.match(/<SectionContainer[^>]*>([\s\S]*?)<\/SectionContainer>/);
  const bodyContent = containerMatch ? containerMatch[1] : fileContent;

  // Split by sub-section comment or Divider
  // Pattern: {/* ── X.Y Title ── */} or <Divider />
  const commentSplitRegex = /\{\/\*\s*──\s*([0-9\.]*)\s*(.*?)\s*──\s*\*\/\}/g;
  const subSections: SubSection[] = [];
  
  let matches: { index: number; number: string; title: string }[] = [];
  let m;
  while ((m = commentSplitRegex.exec(bodyContent)) !== null) {
    matches.push({
      index: m.index,
      number: m[1],
      title: m[2],
    });
  }

  if (matches.length > 0) {
    for (let i = 0; i < matches.length; i++) {
      const current = matches[i];
      const nextIndex = i < matches.length - 1 ? matches[i + 1].index : bodyContent.length;
      const rawChunk = bodyContent.substring(current.index, nextIndex);

      // Check if there is a TopicHeader inside
      const thTitle = extractProp(rawChunk, "title");
      const thDesc = extractProp(rawChunk, "description");
      const thNum = extractProp(rawChunk, "number");

      const sectionTitle = current.title || thTitle || `Topic ${i + 1}`;
      const sectionNum = current.number || thNum || (i + 1).toString();

      subSections.push({
        id: `section-${i + 1}`,
        index: i,
        number: sectionNum,
        title: sectionTitle,
        description: thDesc,
        rawSource: rawChunk,
        blocks: extractBlocksFromSubSection(rawChunk, i),
      });
    }
  } else {
    // Fallback: Split by <TopicHeader
    const topicHeaderRegex = /<TopicHeader\s+/g;
    let thMatches: number[] = [];
    let tm;
    while ((tm = topicHeaderRegex.exec(bodyContent)) !== null) {
      thMatches.push(tm.index);
    }

    if (thMatches.length > 0) {
      for (let i = 0; i < thMatches.length; i++) {
        const startIdx = thMatches[i];
        const endIdx = i < thMatches.length - 1 ? thMatches[i + 1] : bodyContent.length;
        const chunk = bodyContent.substring(startIdx, endIdx);
        const title = extractProp(chunk, "title") || `Topic ${i + 1}`;
        const desc = extractProp(chunk, "description");
        const num = extractProp(chunk, "number") || (i + 1).toString();

        subSections.push({
          id: `section-${i + 1}`,
          index: i,
          number: num,
          title,
          description: desc,
          rawSource: chunk,
          blocks: extractBlocksFromSubSection(chunk, i),
        });
      }
    } else {
      // Single sub-section with all blocks
      subSections.push({
        id: "section-1",
        index: 0,
        number: "1",
        title: "Main Content",
        rawSource: bodyContent,
        blocks: extractBlocksFromSubSection(bodyContent, 0),
      });
    }
  }

  return subSections;
}

// ─── Patch a specific field inside a component raw source ───
export function patchBlockField(
  rawBlockSource: string,
  key: string,
  newValue: string,
): string {
  if (key === "children") {
    // Replace tag contents
    const openTagEnd = rawBlockSource.indexOf(">");
    const closeTagStart = rawBlockSource.lastIndexOf("<");
    if (openTagEnd !== -1 && closeTagStart > openTagEnd) {
      const openTag = rawBlockSource.substring(0, openTagEnd + 1);
      const closeTag = rawBlockSource.substring(closeTagStart);
      return `${openTag}\n        ${newValue}\n      ${closeTag}`;
    }
    return rawBlockSource;
  }

  // Prop replacement
  const propRegex = new RegExp(
    `\\b(${key})=(?:(?:"[^"]*")|(?:'[^']*')|(?:\\{\\s*(?:"[^"]*"|'[^']*'|\`[\\s\\S]*?\`)\\s*\\}))`,
  );
  if (propRegex.test(rawBlockSource)) {
    if (newValue.includes("\n") || newValue.includes('"') || newValue.includes("'")) {
      return rawBlockSource.replace(propRegex, `$1={\`${newValue.replace(/`/g, "\\`")}\`}`);
    }
    return rawBlockSource.replace(propRegex, `$1="${newValue}"`);
  }

  // If prop doesn't exist yet, insert before closing tag
  if (rawBlockSource.endsWith("/>")) {
    return rawBlockSource.replace(/\/>$/, ` ${key}="${newValue}" />`);
  }
  return rawBlockSource;
}
