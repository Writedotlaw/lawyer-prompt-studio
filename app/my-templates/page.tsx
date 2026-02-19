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
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Tag from "@/components/ui/Tag";
import Badge from "@/components/ui/Badge";

const sortTemplates = (templates: CustomTemplate[], sortBy: string) => {
  const next = [...templates];
  if (sortBy === "updated") {
    return next.sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  }
  if (sortBy === "created") {
    return next.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
  if (sortBy === "name") {
    return next.sort((a, b) => a.name.localeCompare(b.name));
  }
  return next;
};

export default function MyTemplatesPage() {
  const [templates, setTemplates] = useState<CustomTemplate[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [importText, setImportText] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("updated");
  const [filter, setFilter] = useState("");

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

  const filteredTemplates = useMemo(() => {
    const list = sortTemplates(templates, sortBy);
    if (!filter.trim()) return list;
    return list.filter((template) =>
      [template.name, template.tags.join(" ")].join(" ").toLowerCase().includes(filter.toLowerCase())
    );
  }, [templates, sortBy, filter]);

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
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="My Templates"
          title="Manage custom prompts."
          description="Save drafts, duplicate them, and export to JSON or Markdown. Everything is stored locally in your browser."
          meta={
            <>
              <Badge tone="accent">Local storage</Badge>
              <Badge tone="neutral">Versioned</Badge>
              <Badge tone="neutral">Export-ready</Badge>
            </>
          }
        />
      </Card>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="md" onClick={handleCreate}>
                New Template
              </Button>
              <Button variant="secondary" size="md" onClick={handleDuplicate} disabled={!selected}>
                Duplicate
              </Button>
              <Button variant="danger" size="md" onClick={handleDelete} disabled={!selected}>
                Delete
              </Button>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.3em] text-base-300">Saved</p>
              <Tag tone="muted">{templates.length} total</Tag>
            </div>
            <div className="mt-4 grid gap-3">
              <Input
                placeholder="Filter by name or tag"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
              />
              <Select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
                <option value="updated">Sort by updated</option>
                <option value="created">Sort by created</option>
                <option value="name">Sort by name</option>
              </Select>
            </div>
            <div className="mt-4 max-h-[420px] space-y-3 overflow-auto">
              {filteredTemplates.length === 0 && (
                <div className="rounded-2xl border border-base-200/10 bg-base-900/60 p-4 text-sm text-base-200">
                  No templates yet. Create your first prompt or import JSON to get started.
                </div>
              )}
              {filteredTemplates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => setSelectedId(template.id)}
                  className={`w-full rounded-2xl border px-4 py-3 text-left text-sm transition ${
                    selectedId === template.id
                      ? "border-accent-400/60 bg-accent-500/10"
                      : "border-base-200/10 bg-base-900/60 hover:border-accent-400/40"
                  }`}
                >
                  <p className="text-base-50">{template.name}</p>
                  <p className="text-xs text-base-300">Updated {template.updatedAt.slice(0, 10)}</p>
                </button>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-base-300">Import JSON</p>
            <Textarea
              className="mt-3 h-28"
              placeholder="Paste exported JSON here"
              value={importText}
              onChange={(event) => setImportText(event.target.value)}
            />
            <Button variant="secondary" size="sm" onClick={handleImport} className="mt-3">
              Import
            </Button>
          </Card>
        </div>

        <div className="space-y-6">
          {selected ? (
            <Card variant="raised" className="p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <Input
                  className="text-base"
                  value={selected.name}
                  onChange={(event) => updateSelected({ name: event.target.value })}
                />
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleExport("json")}>
                    {copied === "json" ? "Copied" : "Export JSON"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleExport("md")}>
                    {copied === "md" ? "Copied" : "Export Markdown"}
                  </Button>
                </div>
              </div>
              <Textarea
                className="mt-4 h-64"
                placeholder="Write your prompt here"
                value={selected.prompt}
                onChange={(event) => updateSelected({ prompt: event.target.value })}
              />
              <div className="mt-4">
                <label className="text-xs uppercase tracking-[0.3em] text-base-300">Tags</label>
                <Input
                  className="mt-2"
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
            </Card>
          ) : (
            <Card className="p-6">
              <p className="text-base-200">Select a template to edit or create a new one.</p>
              <Button variant="primary" size="md" className="mt-4" onClick={handleCreate}>
                Create a template
              </Button>
            </Card>
          )}

          {score && <ScoreMeter score={score} />}
        </div>
      </section>
    </div>
  );
}
