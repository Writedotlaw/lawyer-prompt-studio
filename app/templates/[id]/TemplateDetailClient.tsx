"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/templates";
import { scorePrompt } from "@/lib/quality";
import ScoreMeter from "@/components/ScoreMeter";
import { createBlankTemplate, loadTemplates, saveTemplates } from "@/lib/storage";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function TemplateDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const template = useMemo(() => templates.find((item) => item.id === id), [id]);

  if (!template) {
    return (
      <Card className="p-8">
        <h1 className="text-2xl text-base-50">Template not found</h1>
        <p className="mt-2 text-base-200">Return to the library and pick a template.</p>
      </Card>
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
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="Template Detail"
          title={template.name}
          description={template.description}
          actions={
            <>
              <Button variant="primary" size="md" onClick={handleCopy}>
                {copied ? "Copied" : "Copy Prompt"}
              </Button>
              <Button variant="secondary" size="md" onClick={handleSave}>
                {saved ? "Saved" : "Save to My Templates"}
              </Button>
              <Button variant="ghost" size="md" onClick={() => router.push("/library")}>
                Back to Library
              </Button>
            </>
          }
          meta={
            <>
              <Badge tone="accent">{template.practiceArea}</Badge>
              <Badge tone="neutral">{template.taskType}</Badge>
              <Badge tone="neutral">{template.difficulty}</Badge>
              <Badge tone="neutral">{template.estimatedTime}</Badge>
            </>
          }
        />
        <div className="mt-6 flex flex-wrap gap-2">
          <Tag tone="teal">Models: {template.modelCompatibility.join(", ")}</Tag>
          {template.tags.map((tag) => (
            <Tag key={tag} tone="muted">
              {tag}
            </Tag>
          ))}
        </div>
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <Card variant="raised" className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl text-base-50">Prompt</h2>
              <Tag tone="accent">Copy-ready</Tag>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-base-200/10 bg-base-950/60 p-4 text-sm text-base-100">
              {template.prompt}
            </pre>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-base-300">Variables</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {template.variables.map((variable) => (
                <Tag key={variable} tone="muted">
                  {variable}
                </Tag>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-base-300">Example Output</h3>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-base-200/10 bg-base-900/60 p-4 text-sm text-base-100">
              {template.exampleOutput}
            </pre>
          </Card>
        </div>

        <div className="space-y-6">
          <ScoreMeter score={score} />
          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-base-300">Warnings & Disclaimers</h3>
            <div className="mt-4 space-y-4 text-sm text-base-200">
              {template.warnings.map((warning) => (
                <div key={warning.title} className="rounded-2xl border border-base-200/10 bg-base-900/60 p-4">
                  <p className="text-base-50">{warning.title}</p>
                  <p className="mt-2 text-base-200/90">{warning.detail}</p>
                </div>
              ))}
              <div className="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-warning">
                Outputs are for internal drafting support only and require lawyer review before use.
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm uppercase tracking-[0.3em] text-base-300">Usage Tips</h3>
            <ul className="mt-4 space-y-2 text-sm text-base-200">
              <li>• Replace variables with client-approved facts.</li>
              <li>• Verify citations and authority before use.</li>
              <li>• Add matter-specific constraints and audience cues.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
