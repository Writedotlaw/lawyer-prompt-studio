"use client";

import { useMemo, useState } from "react";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Tag from "@/components/ui/Tag";

const steps = [
  "Goal",
  "Audience",
  "Jurisdiction",
  "Constraints",
  "Tone",
  "Citations",
  "Output Format",
  "Safeguards"
];

export default function WizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [goal, setGoal] = useState("");
  const [audience, setAudience] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [constraints, setConstraints] = useState("");
  const [tone, setTone] = useState("Professional, precise, and pragmatic");
  const [citations, setCitations] = useState("Provide citation placeholders for statutes and cases.");
  const [outputFormat, setOutputFormat] = useState("Use headings, bullet points, and a short summary.");
  const [safeguards, setSafeguards] = useState(
    "Flag missing facts, avoid legal conclusions, and remind to verify with counsel."
  );

  const prompt = useMemo(() => {
    return `You are a senior legal analyst.\n\nGoal: ${goal}\nAudience: ${audience}\nJurisdiction: ${jurisdiction}\nConstraints: ${constraints}\nTone: ${tone}\nCitations: ${citations}\nOutput format: ${outputFormat}\nSafeguards: ${safeguards}\n\nBefore final output, list any missing facts or assumptions.`;
  }, [goal, audience, jurisdiction, constraints, tone, citations, outputFormat, safeguards]);

  const progress = Math.round(((currentStep + 1) / steps.length) * 100);



  const stepContent = [
    {
      label: "Define the legal task and desired outcome.",
      value: goal,
      onChange: (value: string) => setGoal(value)
    },
    {
      label: "Who will use or read this output?",
      value: audience,
      onChange: (value: string) => setAudience(value)
    },
    {
      label: "Jurisdiction, forum, or governing law.",
      value: jurisdiction,
      onChange: (value: string) => setJurisdiction(value)
    },
    {
      label: "Constraints, deadlines, assumptions, or exclusions.",
      value: constraints,
      onChange: (value: string) => setConstraints(value)
    },
    {
      label: "Tone guidance.",
      value: tone,
      onChange: (value: string) => setTone(value)
    },
    {
      label: "How should citations be handled?",
      value: citations,
      onChange: (value: string) => setCitations(value)
    },
    {
      label: "Desired output structure.",
      value: outputFormat,
      onChange: (value: string) => setOutputFormat(value)
    },
    {
      label: "Safety checks and escalation guidance.",
      value: safeguards,
      onChange: (value: string) => setSafeguards(value)
    }
  ][currentStep];

  return (
    <div className="space-y-8">
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="Prompt Workbench"
          title="Build a prompt step by step."
          description="Follow best-practice guardrails to generate production-ready prompts. Each step improves clarity, context, and safeguards."
          meta={
            <>
              <Badge tone="accent">Guided flow</Badge>
              <Badge tone="neutral">8 steps</Badge>
              <Badge tone="neutral">Structured prompts</Badge>
            </>
          }
        />
      </Card>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Card variant="raised" className="p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-base-300">Step {currentStep + 1}</p>
              <h2 className="mt-2 text-2xl text-base-50">{steps[currentStep]}</h2>
            </div>
            <div className="flex items-center gap-3">
              <Tag tone="accent">{progress}% complete</Tag>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-base-300">
              <span>Progress</span>
              <span>{currentStep + 1} of {steps.length}</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-base-200/10">
              <div className="h-2 rounded-full bg-accent-400/90" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-6 animate-fade-in">
            <label className="text-xs uppercase tracking-[0.3em] text-base-300">Guidance</label>
            <p className="mt-2 text-sm text-base-200/90">{stepContent.label}</p>
            <Textarea
              className="mt-4 h-36"
              placeholder={stepContent.label}
              value={stepContent.value}
              onChange={(event) => stepContent.onChange(event.target.value)}
            />
          </div>

          <div className="mt-6 flex items-center justify-between">
            <Button
              variant="outline"
              size="md"
              onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-base-300">Step Summary</p>
            <div className="mt-4 space-y-3 text-sm text-base-200">
              {[
                { label: "Goal", value: goal },
                { label: "Audience", value: audience },
                { label: "Jurisdiction", value: jurisdiction },
                { label: "Constraints", value: constraints }
              ].map((item) => (
                <div key={item.label} className="flex items-start justify-between gap-3">
                  <span className="text-base-300">{item.label}</span>
                  <span className="text-right text-base-100">
                    {item.value ? item.value.slice(0, 60) : "Not set"}
                  </span>
                </div>
              ))}
            </div>
          </Card>


          <Card className="p-6">
            <div className="flex items-center justify-between">
              <p className="text-xs uppercase tracking-[0.3em] text-base-300">Prompt Preview</p>

            </div>
            <pre className="mt-4 max-h-[320px] overflow-auto whitespace-pre-wrap rounded-2xl border border-base-200/10 bg-base-950/60 p-4 text-xs text-base-100">
              {prompt}
            </pre>
          </Card>

          <Card className="p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-base-300">Best Practices</p>
            <ul className="mt-4 space-y-2 text-sm text-base-200">
              <li>• Include jurisdiction, role, and audience.</li>
              <li>• Provide output format and citation placeholders.</li>
              <li>• Add safeguards and highlight missing facts.</li>
            </ul>
          </Card>
        </div>
      </section>
    </div>
  );
}
