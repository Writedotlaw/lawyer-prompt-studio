"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createBlankTemplate,
  exportTemplateToJson,
  exportTemplateToMarkdown,
  loadTemplates,
  parseTemplateImport,
  saveTemplates
} from "@/lib/storage";
import { CustomTemplate } from "@/lib/types";
import { scorePrompt } from "@/lib/quality";
import ScoreMeter from "@/components/ScoreMeter";

export default function MyTemplatesPage() {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    const stored = loadTemplates();
    setTemplates(stored);
    setSelectedId(stored[0]?.id ?? null);
  }, []);

  useEffect(() => {
    saveTemplates(templates);
  }, [templates]);

  const selected = useMemo(
    () => templates.find((item) => item.id === selectedId) ?? null,
    [templates, selectedId]
  );

  const updateSelected = (updates: Partial<CustomTemplate>) => {
    if (!selected) return;
    setTemplates((prev) =>
      prev.map((item) =>
        item.id === selected.id
          ? { ...item, ...updates, updatedAt: new Date().toISOString() }
          : item
      )
    );
  };

  const handleCreate = () => {
    const next = createBlankTemplate();
    setTemplates((prev) => [next, ...prev]);
    setSelectedId(next.id);
  };

  const handleDuplicate = () => {
    if (!selected) return;
    const now = new Date().toISOString();
    const duplicate: CustomTemplate = {
      ...selected,
      id: `tmpl_${Math.random().toString(36).slice(2, 10)}`,
      name: `${selected.name} (Copy)`,
      createdAt: now,
      updatedAt: now
    };
    setTemplates((prev) => [duplicate, ...prev]);
    setSelectedId(duplicate.id);
  };

  const handleDelete = () => {
    if (!selected) return;
    setTemplates((prev) => prev.filter((item) => item.id !== selected.id));
    setSelectedId(null);
  };

  const handleExport = async (format: "json" | "md") => {
    if (!selected) return;
    const content =
      format === "json" ? exportTemplateToJson(selected) : exportTemplateToMarkdown(selected);
    await navigator.clipboard.writeText(content);
    setCopied(format);
    setTimeout(() => setCopied(null), 1200);
  };

  const handleImport = () => {
    const parsed = parseTemplateImport(importText);
    if (!parsed) return;
    setTemplates((prev) => [parsed, ...prev]);
    setSelectedId(parsed.id);
    setImportText("");
  };

  const score = selected ? scorePrompt(selected.prompt, selected.tags) : null;

  return (
    <div className="space-y-8">
      <section className="card p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brass-200">My Templates</p>
        <h1 className="mt-3 font-display text-4xl text-ink-50">Manage custom prompts.</h1>
        <p className="mt-3 max-w-2xl text-ink-200">
          Save drafts, duplicate them, and export to JSON or Markdown. Everything is stored locally in
          your browser.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <div className="card p-4">
            <div className="flex flex-wrap gap-3">
              <button
                className="rounded-xl border border-brass-300/70 bg-brass-400/80 px-4 py-2 text-sm text-ink-900 transition hover:bg-brass-300"
                onClick={handleCreate}
              >
                New Template
              </button>
              <button
                className="rounded-xl border border-white/20 px-4 py-2 text-sm text-ink-50 transition hover:border-brass-200/70"
                onClick={handleDuplicate}
                disabled={!selected}
              >
                Duplicate
              </button>
              <button
                className="rounded-xl border border-white/20 px-4 py-2 text-sm text-ink-50 transition hover:border-brass-200/70"
                onClick={handleDelete}
                disabled={!selected}
              >
                Delete
              </button>
            </div>
          </div>
          <div className="card max-h-[420px] overflow-auto p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Saved</p>
            <div className="mt-4 space-y-3">
              {templates.length === 0 && (
                <p className="text-sm text-ink-300">No templates saved yet.</p>
              )}
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`w-full rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selectedId === template.id
                      ? "border-brass-200/70 bg-white/10"
                      : "border-white/10 bg-white/5 hover:border-brass-200/40"
                  }`}
                >
                  <p className="text-ink-50">{template.name}</p>
                  <p className="text-xs text-ink-300">Updated {template.updatedAt.slice(0, 10)}</p>
                </button>
              ))}
            </div>
          </div>
          <div className="card p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Import JSON</p>
            <textarea
              className="mt-3 h-28 w-full rounded-xl border border-white/10 bg-ink-800/60 p-3 text-xs text-ink-50"
              placeholder="Paste exported JSON here"
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
            />
            <button
              className="mt-3 rounded-xl border border-white/20 px-4 py-2 text-xs text-ink-50 transition hover:border-brass-200/70"
              onClick={handleImport}
            >
              Import
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {selected ? (
            <div className="card p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <input
                  className="w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-2 text-base text-ink-50"
                  value={selected.name}
                  onChange={(event) => updateSelected({ name: event.target.value })}
                />
                <div className="flex flex-wrap gap-2">
                  <button
                    className="rounded-xl border border-white/20 px-4 py-2 text-xs text-ink-50 transition hover:border-brass-200/70"
                    onClick={() => handleExport("json")}
                  >
                    {copied === "json" ? "Copied" : "Export JSON"}
                  </button>
                  <button
                    className="rounded-xl border border-white/20 px-4 py-2 text-xs text-ink-50 transition hover:border-brass-200/70"
                    onClick={() => handleExport("md")}
                  >
                    {copied === "md" ? "Copied" : "Export Markdown"}
                  </button>
                </div>
              </div>
              <textarea
                className="mt-4 h-64 w-full rounded-2xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Write your prompt here"
                value={selected.prompt}
                onChange={(event) => updateSelected({ prompt: event.target.value })}
              />
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.3em] text-ink-200">Tags</label>
                <input
                  className="mt-2 w-full rounded-xl border border-white/10 bg-ink-800/60 px-4 py-2 text-sm text-ink-50"
                  placeholder="Comma-separated tags"
                  value={selected.tags.join(", ")}
                  onChange={(event) =>
                    updateSelected({
                      tags: event.target.value
                        .split(",")
                        .map((t) => t.trim())
                        .filter(Boolean)
                    })
                  }
                />
              </div>
            </div>
          ) : (
            <div className="card p-6">
              <p className="text-ink-200">Select a template to edit or create a new one.</p>
            </div>
          )}

          {score && <ScoreMeter score={score} />}
        </div>
      </section>
    </div>
  );
}
