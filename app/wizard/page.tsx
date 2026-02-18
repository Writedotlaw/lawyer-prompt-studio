"use client";

import { useMemo, useState } from "react";
import ScoreMeter from "@/components/ScoreMeter";
import { scorePrompt } from "@/lib/quality";
import { createBlankTemplate, loadTemplates, saveTemplates } from "@/lib/storage";

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
  const [saved, setSaved] = useState(false);

  const prompt = useMemo(() => {
    return `You are a senior legal analyst.\n\nGoal: ${goal}\nAudience: ${audience}\nJurisdiction: ${jurisdiction}\nConstraints: ${constraints}\nTone: ${tone}\nCitations: ${citations}\nOutput format: ${outputFormat}\nSafeguards: ${safeguards}\n\nBefore final output, list any missing facts or assumptions.`;
  }, [goal, audience, jurisdiction, constraints, tone, citations, outputFormat, safeguards]);

  const variables = useMemo(() => {
    const vars = [] as string[];
    if (goal) vars.push("goal");
    if (audience) vars.push("audience");
    if (jurisdiction) vars.push("jurisdiction");
    if (constraints) vars.push("constraints");
    return vars;
  }, [goal, audience, jurisdiction, constraints]);

  const score = scorePrompt(prompt, variables);

  const handleSave = () => {
    const existing = loadTemplates();
    const now = new Date().toISOString();
    const newTemplate = {
      ...createBlankTemplate(),
      name: goal ? `Wizard: ${goal}` : "Wizard Template",
      prompt,
      tags: ["wizard", "custom"],
      createdAt: now,
      updatedAt: now,
      metadata: {
        jurisdiction,
        tone,
        audience
      }
    };
    saveTemplates([newTemplate, ...existing]);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <div className="space-y-8">
      <section className="card p-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brass-200">Template Wizard</p>
        <h1 className="mt-3 font-display text-4xl text-ink-50">Build a prompt step-by-step.</h1>
        <p className="mt-3 max-w-2xl text-ink-200">
          Follow best-practice guardrails to generate production-ready prompts. Every step improves
          clarity, context, and safeguards.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Step {currentStep + 1}</p>
            <p className="text-sm text-ink-100">{steps[currentStep]}</p>
          </div>
          <div className="mt-6 space-y-4">
            {currentStep === 0 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Define the legal task and desired outcome."
                value={goal}
                onChange={(event) => setGoal(event.target.value)}
              />
            )}
            {currentStep === 1 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Who will use or read this output?"
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
              />
            )}
            {currentStep === 2 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Jurisdiction, forum, or governing law."
                value={jurisdiction}
                onChange={(event) => setJurisdiction(event.target.value)}
              />
            )}
            {currentStep === 3 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Constraints, deadlines, assumptions, or exclusions."
                value={constraints}
                onChange={(event) => setConstraints(event.target.value)}
              />
            )}
            {currentStep === 4 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Tone guidance."
                value={tone}
                onChange={(event) => setTone(event.target.value)}
              />
            )}
            {currentStep === 5 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="How should citations be handled?"
                value={citations}
                onChange={(event) => setCitations(event.target.value)}
              />
            )}
            {currentStep === 6 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Desired output structure."
                value={outputFormat}
                onChange={(event) => setOutputFormat(event.target.value)}
              />
            )}
            {currentStep === 7 && (
              <textarea
                className="h-32 w-full rounded-xl border border-white/10 bg-ink-800/60 p-4 text-sm text-ink-50"
                placeholder="Safety checks and escalation guidance."
                value={safeguards}
                onChange={(event) => setSafeguards(event.target.value)}
              />
            )}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <button
              className="rounded-xl border border-white/20 px-4 py-2 text-sm text-ink-50 transition hover:border-brass-200/70"
              onClick={() => setCurrentStep((step) => Math.max(0, step - 1))}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            <button
              className="rounded-xl border border-brass-300/70 bg-brass-400/80 px-5 py-2 text-sm text-ink-900 transition hover:bg-brass-300"
              onClick={() => setCurrentStep((step) => Math.min(steps.length - 1, step + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <ScoreMeter score={score} />
          <div className="card p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm uppercase tracking-[0.2em] text-ink-200">Prompt Preview</h3>
              <button
                className="rounded-xl border border-white/20 px-4 py-2 text-xs text-ink-50 transition hover:border-brass-200/70"
                onClick={handleSave}
              >
                {saved ? "Saved" : "Save to My Templates"}
              </button>
            </div>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-white/10 bg-ink-800/70 p-4 text-xs text-ink-50">
              {prompt}
            </pre>
          </div>
          <div className="card p-5">
            <h3 className="text-sm uppercase tracking-[0.2em] text-brass-200">Best Practices</h3>
            <ul className="mt-4 space-y-2 text-sm text-ink-200">
              <li>• Include jurisdiction, role, and audience.</li>
              <li>• Provide output format and citation placeholders.</li>
              <li>• Add safeguards and highlight missing facts.</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
