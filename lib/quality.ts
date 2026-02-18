import { QualityScore } from "@/lib/types";

const normalize = (text: string) => text.toLowerCase();

export function scorePrompt(prompt: string, variables: string[] = []): QualityScore {
  const text = normalize(prompt);
  const notes: string[] = [];

  const clarity = text.length > 220 ? 14 : text.length > 140 ? 11 : 7;
  if (clarity < 10) notes.push("Add more context and role framing for clarity.");

  const contextHits = ["facts", "background", "context", "summary", "issue"].filter((t) =>
    text.includes(t)
  ).length;
  const context = Math.min(14, 6 + contextHits * 2);
  if (context < 10) notes.push("Include factual background and case context.");

  const constraintHits = ["must", "avoid", "only", "limit", "deadline", "requirements"].filter((t) =>
    text.includes(t)
  ).length;
  const constraints = Math.min(14, 6 + constraintHits * 2);
  if (constraints < 10) notes.push("Add explicit constraints or requirements.");

  const outputHits = ["format", "provide", "include", "table", "bullets"].filter((t) =>
    text.includes(t)
  ).length;
  const output = Math.min(14, 6 + outputHits * 2);
  if (output < 10) notes.push("Specify the desired output format.");

  const safeguardHits = ["verify", "confirm", "not legal advice", "disclaimer", "counsel"].filter((t) =>
    text.includes(t)
  ).length;
  const safeguards = Math.min(14, 6 + safeguardHits * 2);
  if (safeguards < 10) notes.push("Add safeguards or review reminders.");

  const citationsHits = ["citation", "authority", "case", "statute", "source"].filter((t) =>
    text.includes(t)
  ).length;
  const citations = Math.min(12, citationsHits > 0 ? 10 : 6);
  if (citations < 10) notes.push("Add citation placeholders for authority.");

  const variableScore = Math.min(8, variables.length >= 3 ? 8 : variables.length >= 1 ? 6 : 3);
  if (variableScore < 6) notes.push("Add more reusable variables.");

  const total = Math.min(100, clarity + context + constraints + output + safeguards + citations + variableScore);

  return {
    total,
    breakdown: {
      clarity,
      context,
      constraints,
      output,
      safeguards,
      citations,
      variables: variableScore
    },
    notes
  };
}
