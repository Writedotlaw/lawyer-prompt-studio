import { CustomTemplate } from "@/lib/types";

const STORAGE_KEY = "lps:myTemplates";

export const loadTemplates = (): CustomTemplate[] => {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as CustomTemplate[];
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
};

export const saveTemplates = (templates: CustomTemplate[]) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(templates));
};

export const exportTemplateToMarkdown = (template: CustomTemplate) => {
  return `# ${template.name}\n\n**Created:** ${template.createdAt}\n**Updated:** ${template.updatedAt}\n**Tags:** ${template.tags.join(", ")}\n\n## Prompt\n\n${template.prompt}\n`;
};

export const exportTemplateToJson = (template: CustomTemplate) => {
  return JSON.stringify(template, null, 2);
};

export const parseTemplateImport = (content: string): CustomTemplate | null => {
  try {
    const parsed = JSON.parse(content) as CustomTemplate;
    if (!parsed.id || !parsed.name || !parsed.prompt) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const createBlankTemplate = (): CustomTemplate => {
  const now = new Date().toISOString();
  return {
    id: `tmpl_${Math.random().toString(36).slice(2, 10)}`,
    name: "Untitled Template",
    prompt: "",
    createdAt: now,
    updatedAt: now,
    tags: [],
    metadata: {}
  };
};
