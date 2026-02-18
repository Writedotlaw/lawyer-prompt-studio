"use client";

import { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { templates } from "@/lib/templates";
import { scorePrompt } from "@/lib/quality";
import ScoreMeter from "@/components/ScoreMeter";
import { createBlankTemplate, loadTemplates, saveTemplates } from "@/lib/storage";

export default function TemplateDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const template = useMemo(() => {
    const id = params?.id as string | undefined;
    return templates.find((item) => item.id === id);
  }, [params]);

  if (!template) {
    return (
      <div className="card p-8">
        <h1 className="text-2xl font-display text-ink-50">Template not found</h1>
        <p className="mt-2 text-ink-200">Return to the library and pick a template.</p>
      </div>
    );
  }

  const score = scorePrompt(template.prompt, template.variables);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSave = () => {
    const existing = loadTemplates();
    const now = new Date().toISOString();
    const newTemplate = {
      ...createBlankTemplate(),
      name: template.name,
      prompt: template.prompt,
      tags: template.tags,
      createdAt: now,
      updatedAt: now,
      metadata: {
        jurisdiction: template.variables.find((v) => v.includes("jurisdiction")),
        tone: "Professional",
        audience: "Internal"
      }
    };
    saveTemplates([newTemplate, ...existing]);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-8">
      <section className="card p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brass-200">Template Detail</p>
            <h1 className="mt-3 font-display text-4xl text-ink-50">{template.name}</h1>
            <p className="mt-3 max-w-2xl text-ink-200">{template.description}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="rounded-xl border border-brass-300/70 bg-brass-400/80 px-5 py-2 text-sm text-ink-900 transition hover:bg-brass-300"
              onClick={handleCopy}
            >
              {copied ? "Copied" : "Copy Prompt"}
            </button>
            <button
              className="rounded-xl border border-white/20 px-5 py-2 text-sm text-ink-50 transition hover:border-brass-200/70"
              onClick={handleSave}
            >
              {saved ? "Saved" : "Save to My Templates"}
            </button>
            <button
              className="rounded-xl border border-white/20 px-5 py-2 text-sm text-ink-50 transition hover:border-brass-200/70"
              onClick={() => router.push("/library")}
            >
              Back to Library
            </button>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <span className="tag">{template.practiceArea}</span>
          <span className="tag">{template.taskType}</span>
          <span className="tag">{template.difficulty}</span>
          <span className="tag">{template.estimatedTime}</span>
          <span className="tag">Models: {template.modelCompatibility.join(", ")}</span>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <h2 className="section-title">Prompt</h2>
          <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-ink-800/70 p-4 text-sm text-ink-50">
            {template.prompt}
          </pre>
          <div className="mt-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-ink-200">Variables</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {template.variables.map((variable) => (
                <span key={variable} className="tag">
                  {variable}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-sm uppercase tracking-[0.2em] text-ink-200">Example Output</h3>
            <pre className="mt-3 whitespace-pre-wrap rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-ink-100">
              {template.exampleOutput}
            </pre>
          </div>
        </div>
        <div className="space-y-6">
          <ScoreMeter score={score} />
          <div className="card p-5">
            <h3 className="text-sm uppercase tracking-[0.2em] text-brass-200">Warnings & Disclaimers</h3>
            <div className="mt-4 space-y-3 text-sm text-ink-200">
              {template.warnings.map((warning) => (
                <div key={warning.title}>
                  <p className="text-ink-50">{warning.title}</p>
                  <p className="text-ink-200">{warning.detail}</p>
                </div>
              ))}
              <p className="text-ink-200">
                Outputs are for internal drafting support only and require lawyer review before use.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
