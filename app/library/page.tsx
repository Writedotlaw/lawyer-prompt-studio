"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { templates } from "@/lib/templates";
import { Difficulty, ModelCompatibility, PracticeArea, TaskType } from "@/lib/types";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Tag from "@/components/ui/Tag";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/components/ui/Button";

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

  const filtersActive =
    search.trim() ||
    practice !== "All" ||
    task !== "All" ||
    model !== "All" ||
    difficulty !== "All";

  const handleReset = () => {
    setSearch("");
    setPractice("All");
    setTask("All");
    setModel("All");
    setDifficulty("All");
  };

  return (
    <div className="space-y-10">
      <Card variant="raised" className="p-10">
        <SectionHeader
          eyebrow="Prompt Library"
          title="Ready-to-ship legal prompts for every matter type."
          description="Browse, filter, and copy proven prompts across litigation, contracts, research, client communications, and compliance. Every template includes variables, warnings, and example outputs."
          meta={
            <>
              <Badge tone="accent">{templates.length} prompts</Badge>
              <Badge tone="neutral">{practiceCount} practice areas</Badge>
              <Badge tone="neutral">{taskCount} task types</Badge>
            </>
          }
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Prompt depth", value: "Advanced legal workflows" },
            { label: "Coverage", value: "Litigation · Contracts · Compliance" },
            { label: "Avg. completion", value: "3-8 min to customize" }
          ].map((item) => (
            <div key={item.label} className="rounded-2xl border border-base-200/10 bg-base-900/60 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-base-300">{item.label}</p>
              <p className="mt-3 text-sm text-base-100">{item.value}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="sticky top-24 z-20">
        <Card className="p-4 shadow-soft">
          <div className="grid gap-4 lg:grid-cols-[1.4fr_repeat(4,minmax(0,1fr))]">
            <Input
              placeholder="Search prompts, tags, keywords"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <Select
              value={practice}
              onChange={(event) => setPractice(event.target.value as PracticeArea | "All")}
            >
              {practiceOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select value={task} onChange={(event) => setTask(event.target.value as TaskType | "All")}>
              {taskOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={difficulty}
              onChange={(event) => setDifficulty(event.target.value as Difficulty | "All")}
            >
              {difficultyOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <Select
              value={model}
              onChange={(event) => setModel(event.target.value as ModelCompatibility | "All")}
            >
              {modelOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-base-300">
            <div>
              {filtered.length} results · Updated for legal workflows
              {filtersActive ? " · Filters active" : ""}
            </div>
            {filtersActive ? (
              <button className={buttonStyles({ variant: "ghost", size: "sm" })} onClick={handleReset}>
                Reset filters
              </button>
            ) : null}
          </div>
        </Card>
      </div>

      {filtered.length === 0 ? (
        <Card className="p-10 text-center">
          <h3 className="text-xl text-base-50">No prompts match your filters.</h3>
          <p className="mt-3 text-sm text-base-200/90">
            Try broadening the search terms or clearing filters to view the full catalog.
          </p>
          <button className={buttonStyles({ variant: "secondary", size: "md" })} onClick={handleReset}>
            Clear filters
          </button>
        </Card>
      ) : (
        <section className="grid gap-6 md:grid-cols-2 animate-stagger">
          {filtered.map((template) => (
              <Link
                key={template.id}
                href={`/templates/${template.id}`}
                className="group flex h-full flex-col gap-4 rounded-3xl border border-base-200/10 bg-base-900/60 p-6 transition hover:border-accent-400/50 hover:bg-base-900/80"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-xl text-base-50 group-hover:text-accent-100">
                      {template.name}
                    </h3>
                    <p className="mt-2 text-sm text-base-200/90">{template.description}</p>
                  </div>
                  <Tag tone="accent">{template.practiceArea}</Tag>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Tag tone="muted">{template.taskType}</Tag>
                  <Tag tone="muted">{template.difficulty}</Tag>
                  <Tag tone="muted">{template.estimatedTime}</Tag>
                  <Tag tone="teal">{template.modelCompatibility.join(", ")}</Tag>
                </div>
              </Link>
          ))}
        </section>
      )}
    </div>
  );
}
