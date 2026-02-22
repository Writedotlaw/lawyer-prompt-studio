"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { templates } from "@/lib/templates";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function TemplateDetailClient({ id }: { id: string }) {
  const router = useRouter();
  const [copied, setCopied] = useState(false);

  const template = useMemo(() => templates.find((item) => item.id === id), [id]);

  if (!template) {
    return (
      <Card className="p-8">
        <h1 className="text-2xl text-base-50">Template not found</h1>
        <p className="mt-2 text-base-200">Return to the library and pick a template.</p>
      </Card>
    );
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };


  const downloadContent = (content: string, filename: string, type = "text/plain;charset=utf-8") => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const fileBase =
    template.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "") || "prompt";

  const markdownExport = `# ${template.name}\n\n${template.description}\n\n## Prompt\n\n${template.prompt}\n`;

  return (
    <div className="space-y-8 pb-24">
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="Prompt Detail"
          title={template.name}
          description={template.description}
          actions={
            <>
              <Button variant="ghost" size="md" onClick={() => router.push("/library")}>
                Back to Prompt Library
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
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-base-200/10 bg-base-900/60 px-4 py-3 text-xs uppercase tracking-[0.3em] text-base-300">
          <span className="text-base-200">Flow</span>
          <span className="text-base-50">Customize → Review Final Prompt → Copy/Download</span>
        </div>
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

      <div className="sticky bottom-6 z-30">
        <Card className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-3 px-4 py-3 shadow-soft">
          <div className="text-sm text-base-200">Actions</div>
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="primary" size="sm" onClick={handleCopy}>
              {copied ? "Copied" : "Copy"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadContent(template.prompt, `${fileBase}.txt`)}
            >
              Download TXT
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => downloadContent(markdownExport, `${fileBase}.md`, "text/markdown;charset=utf-8")}
            >
              Download MD
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
