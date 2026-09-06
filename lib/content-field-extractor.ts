export interface ContentField {
  key: string;
  label: string;
  category: "content" | "config" | "styling";
  currentValue: string;
  propName?: string;
  tagName?: string;
  childIndex?: number;
}

const CONTENT_PROPS = new Set([
  "title", "description", "heading", "text", "label", "content", 
  "caption", "body", "question", "explanation", "summary", "hint", 
  "message", "titleText", "subtitle", "name"
]);

const CONFIG_PROPS = new Set([
  "number", "step", "index", "variant", "icon", "type", "id", 
  "language", "theme", "size", "layout"
]);

const STYLING_PROPS = new Set([
  "color", "className", "style", "weight", "href", "align", "justify"
]);

const CONTENT_TAGS = new Set([
  "p", "li", "h1", "h2", "h3", "h4", "h5", "h6", "span", 
  "td", "th", "strong", "em", "b", "i"
]);

export function extractContentFields(blockSource: string): ContentField[] {
  const fields: ContentField[] = [];
  
  // 1. Extract props
  // Match propName="value" or propName='value' or propName={`value`} or propName={"value"} or propName={'value'}
  const propRegex = /\b([a-zA-Z0-9_]+)=(?:(?:"([^"]*)")|(?:'([^']*)')|(?:\{\s*(?:"([^"]*)"|'([^']*)'|`([\s\S]*?)`)\s*\}))/g;
  
  let match;
  while ((match = propRegex.exec(blockSource)) !== null) {
    const propName = match[1];
    let category: ContentField["category"] | null = null;
    
    if (CONTENT_PROPS.has(propName)) category = "content";
    else if (CONFIG_PROPS.has(propName)) category = "config";
    else if (STYLING_PROPS.has(propName)) category = "styling";
    
    if (category) {
      const currentValue = match[2] ?? match[3] ?? match[4] ?? match[5] ?? match[6] ?? "";
      fields.push({
        key: `prop-${propName}`,
        label: capitalize(propName),
        category,
        currentValue,
        propName
      });
    }
  }

  // 2. Extract JSX text children (basic tag content extraction)
  for (const tag of Array.from(CONTENT_TAGS)) {
    // Basic regex: <tag>content</tag> with optional attributes
    const tagRegex = new RegExp(`<${tag}(\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'g');
    let tagMatch;
    let globalIndex = 0;
    
    while ((tagMatch = tagRegex.exec(blockSource)) !== null) {
      const content = tagMatch[2];
      
      // Skip if it contains React components (PascalCase tags)
      if (content.trim().length > 0 && !content.match(/<[A-Z]/)) { 
        fields.push({
          key: `${tag}[${globalIndex}]`,
          label: `${tag.toUpperCase()} Text ${globalIndex > 0 ? globalIndex + 1 : ''}`.trim(),
          category: "content",
          currentValue: content,
          tagName: tag,
          childIndex: globalIndex
        });
      }
      globalIndex++;
    }
  }

  // Order fields so content comes before config, and styling is at the end
  fields.sort((a, b) => {
    const weight = { content: 1, config: 2, styling: 3 };
    return weight[a.category] - weight[b.category];
  });

  return fields;
}

export function applyFieldPatch(blockSource: string, field: ContentField, newValue: string): string {
  if (field.propName) {
    // Find the exact prop assignment and replace the value part
    const propRegex = new RegExp(`\\b(${field.propName})=(?:(?:"([^"]*)")|(?:'([^']*)')|(?:\\{\\s*(?:"([^"]*)"|'([^']*)'|\`([\\s\\S]*?)\`)\\s*\\}))`, 'g');
    
    return blockSource.replace(propRegex, (match, propName, v1, v2, v3, v4, v5) => {
      if (v1 !== undefined) return `${propName}="${newValue}"`;
      if (v2 !== undefined) return `${propName}='${newValue}'`;
      if (v3 !== undefined) return `${propName}={"${newValue}"}`;
      if (v4 !== undefined) return `${propName}={'${newValue}'}`;
      if (v5 !== undefined) return `${propName}={\`${newValue}\`}`;
      return match; // Should not happen if matched
    });
  } 
  
  if (field.tagName && field.childIndex !== undefined) {
    const tag = field.tagName;
    const tagRegex = new RegExp(`<${tag}(\\s[^>]*)?>([\\s\\S]*?)</${tag}>`, 'g');
    let globalIndex = 0;
    
    return blockSource.replace(tagRegex, (match, attrs, _content) => {
      if (globalIndex === field.childIndex) {
         globalIndex++;
         return `<${tag}${attrs || ''}>${newValue}</${tag}>`;
      }
      globalIndex++;
      return match;
    });
  }
  
  return blockSource;
}

function capitalize(str: string): string {
  // camelCase to Words
  const spaced = str.replace(/([A-Z])/g, ' $1').trim();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
