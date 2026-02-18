export type PracticeArea =
  | "Litigation"
  | "Contracts"
  | "Research"
  | "Client Comms"
  | "Compliance"
  | "Employment"
  | "IP"
  | "Privacy";

export type TaskType =
  | "Drafting"
  | "Review"
  | "Analysis"
  | "Negotiation"
  | "Summarization"
  | "Strategy"
  | "Advisory"
  | "Checklist";

export type ModelCompatibility = "GPT-4" | "Claude" | "Gemini" | "Llama" | "Any";

export type Difficulty = "Starter" | "Intermediate" | "Advanced";

export type TemplateWarning = {
  title: string;
  detail: string;
};

export type PromptTemplate = {
  id: string;
  name: string;
  description: string;
  practiceArea: PracticeArea;
  taskType: TaskType;
  modelCompatibility: ModelCompatibility[];
  difficulty: Difficulty;
  estimatedTime: string;
  variables: string[];
  prompt: string;
  exampleOutput: string;
  warnings: TemplateWarning[];
  tags: string[];
};

export type CustomTemplate = {
  id: string;
  name: string;
  prompt: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  metadata: {
    jurisdiction?: string;
    tone?: string;
    audience?: string;
  };
};

export type QualityScore = {
  total: number;
  breakdown: {
    clarity: number;
    context: number;
    constraints: number;
    output: number;
    safeguards: number;
    citations: number;
    variables: number;
  };
  notes: string[];
};
