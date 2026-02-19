import Link from "next/link";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Tag from "@/components/ui/Tag";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";
import { templates } from "@/lib/templates";

const featured = templates.slice(0, 3);

export default function HomePage() {
  return (
    <div className="space-y-12">
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="Legal Prompt Studio"
          title="Ship high-confidence prompts for real legal workflows."
          description="A curated library of litigation, contracts, and compliance prompts with built-in guardrails, warnings, and quality scoring. Designed to help legal teams move faster without sacrificing rigor."
          actions={
            <>
              <Link href="/library" className={buttonStyles({ variant: "primary", size: "lg" })}>
                Explore Library
              </Link>
              <Link href="/wizard" className={buttonStyles({ variant: "secondary", size: "lg" })}>
                Launch Wizard
              </Link>
            </>
          }
          meta={
            <>
              <Badge tone="success">Local-first</Badge>
              <Badge tone="accent">Quality-scored</Badge>
              <Badge tone="neutral">Template-ready</Badge>
            </>
          }
        />
      </Card>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          {
            title: "Library confidence",
            stat: "120+",
            detail: "Templates across litigation, contracts, compliance, and client comms."
          },
          {
            title: "Built-in safeguards",
            stat: "8",
            detail: "Guardrail categories covering jurisdiction, citations, and escalation."
          },
          {
            title: "Prompt quality",
            stat: "100",
            detail: "Scoring rubric to maintain consistency and readiness."
          }
        ].map((item) => (
          <Card key={item.title} className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-base-300">{item.title}</p>
            <p className="mt-4 text-3xl font-semibold text-base-50">{item.stat}</p>
            <p className="mt-2 text-sm text-base-200/90">{item.detail}</p>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card variant="raised" className="p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-base-300">How it works</p>
          <h2 className="mt-4 text-3xl text-base-50">Built for law firm operations.</h2>
          <p className="mt-4 text-sm text-base-200/90">
            Build, adapt, and reuse prompts with consistent structure. Every template includes variables,
            example outputs, and a warning layer to keep legal teams aligned.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[
              "Search by practice area, task, or model",
              "Use the wizard to create custom prompts",
              "Save to My Templates with version history",
              "Export to JSON or Markdown for reuse"
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-base-200/10 bg-base-900/60 p-4">
                <div className="mt-1 h-2 w-2 rounded-full bg-accent-400" />
                <p className="text-sm text-base-200/90">{item}</p>
              </div>
            ))}
          </div>
        </Card>
        <Card className="p-8">
          <p className="text-xs uppercase tracking-[0.3em] text-base-300">Featured templates</p>
          <div className="mt-5 space-y-4">
            {featured.map((template) => (
              <Link key={template.id} href={`/templates/${template.id}`} className="block rounded-2xl border border-base-200/10 bg-base-900/60 p-4 transition hover:border-accent-400/50">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg text-base-50">{template.name}</h3>
                    <p className="mt-2 text-xs text-base-200/80">{template.description}</p>
                  </div>
                  <Tag tone="accent">{template.practiceArea}</Tag>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Tag tone="muted">{template.taskType}</Tag>
                  <Tag tone="muted">{template.difficulty}</Tag>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      <Card variant="raised" className="p-8">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-base-300">Ready for production</p>
            <h2 className="mt-3 text-3xl text-base-50">Launch with clarity and guardrails.</h2>
            <p className="mt-3 text-sm text-base-200/90">
              Build prompts that keep teams aligned, reduce rework, and scale knowledge across matters.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/library" className={buttonStyles({ variant: "primary", size: "lg" })}>
              Browse Templates
            </Link>
            <Link href="/my-templates" className={buttonStyles({ variant: "outline", size: "lg" })}>
              View My Templates
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
