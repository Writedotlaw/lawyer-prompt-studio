"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { Difficulty, ModelCompatibility, PracticeArea, TaskType } from "@/lib/types";
import { scorePrompt } from "@/lib/quality";

const unique = <T,>(items: T[]) => Array.from(new Set(items));

export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [practice, setPractice] = useState<PracticeArea | "All">("All");
  const [task, setTask] = useState<TaskType | "All">("All");
  const [model, setModel] = useState<ModelCompatibility | "All">("All");
  const [difficulty, setDifficulty] = useState<Difficulty | "All">("All");

  const practiceOptions = useMemo(
    () => ["All", ...unique(templates.map((t) => t.practiceArea))] as const,
    []
  );
  const taskOptions = useMemo(
    () => ["All", ...unique(templates.map((t) => t.taskType))] as const,
    []
  );
  const modelOptions = useMemo(
    () => ["All", ...unique(templates.flatMap((t) => t.modelCompatibility))] as const,
    []
  );
  const difficultyOptions = useMemo(
    () => ["All", ...unique(templates.map((t) => t.difficulty))] as const,
    []
  );
  const practiceCount = practiceOptions.length - 1;
  const taskCount = taskOptions.length - 1;

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      const matchesSearch =
        t.name.toLowerCase().includes(search.toLowerCase()) ||
        t.description.toLowerCase().includes(search.toLowerCase()) ||
        t.tags.join(" ").toLowerCase().includes(search.toLowerCase());
      const matchesPractice = practice === "All" || t.practiceArea === practice;
      const matchesTask = task === "All" || t.taskType === task;
      const matchesModel = model === "All" || t.modelCompatibility.includes(model);
      const matchesDifficulty = difficulty === "All" || t.difficulty === difficulty;

      return matchesSearch && matchesPractice && matchesTask && matchesModel && matchesDifficulty;
    });
  }, [search, practice, task, model, difficulty]);

  return (
    <div className="space-y-10">
      <section className="card p-8">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-brass-200">Template Library</p>
            <h1 className="mt-3 font-display text-4xl text-ink-50">
              Ready-to-ship legal prompts built for real workflows.
            </h1>
            <p className="mt-4 text-ink-200">
              Browse, filter, and copy proven prompts across litigation, contracts, research, client
              comms, and compliance. Every template includes warnings, variables, and example outputs.
            </p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-ink-200">Library Snapshot</p>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-ink-100">
              <div>
                <p className="text-2xl font-display text-brass-200">{templates.length}</p>
                <p>Total templates</p>
              </div>
              <div>
                <p className="text-2xl font-display text-brass-200">{practiceCount}</p>
                <p>Practice areas</p>
              </div>
              <div>
                <p className="text-2xl font-display text-brass-200">{taskCount}</p>
                <p>Task types</p>
              </div>
              <div>
                <p className="text-2xl font-display text-brass-200">100</p>
                <p>Quality rubric</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 lg:grid-cols-5">
        <input
          className="col-span-2 rounded-xl border border-white/10 bg-ink-800/60 px-4 py-3 text-sm text-ink-50 placeholder:text-ink-400"
          placeholder="Search templates, tags, keywords"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <select
          className="rounded-xl border border-white/10 bg-ink-800/60 px-3 py-3 text-sm text-ink-50"
          value={practice}
          onChange={(event) => setPractice(event.target.value as PracticeArea | "All")}
        >
          {practiceOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-white/10 bg-ink-800/60 px-3 py-3 text-sm text-ink-50"
          value={task}
          onChange={(event) => setTask(event.target.value as TaskType | "All")}
        >
          {taskOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-white/10 bg-ink-800/60 px-3 py-3 text-sm text-ink-50"
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value as Difficulty | "All")}
        >
          {difficultyOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border border-white/10 bg-ink-800/60 px-3 py-3 text-sm text-ink-50"
          value={model}
          onChange={(event) => setModel(event.target.value as ModelCompatibility | "All")}
        >
          {modelOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        {filtered.map((template) => {
          const score = scorePrompt(template.prompt, template.variables);
          return (
            <Link
              key={template.id}
              href={`/templates/${template.id}`}
              className="card flex h-full flex-col gap-4 p-6 transition hover:border-brass-200/60"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-display text-ink-50">{template.name}</h3>
                  <p className="mt-2 text-sm text-ink-200">{template.description}</p>
                </div>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs text-ink-50">
                  {template.practiceArea}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="tag">{template.taskType}</span>
                <span className="tag">{template.difficulty}</span>
                <span className="tag">{template.estimatedTime}</span>
                <span className="tag">{template.modelCompatibility.join(", ")}</span>
              </div>
              <div className="mt-auto rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-ink-200">
                  <span>Quality</span>
                  <span className="text-ink-50">{score.total}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-brass-400/80"
                    style={{ width: `${score.total}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </section>
    </div>
  );
}
