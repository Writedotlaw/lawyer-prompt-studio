import { QualityScore } from "@/lib/types";

const colorForScore = (score: number) => {
  if (score >= 85) return "bg-emerald-400/80";
  if (score >= 70) return "bg-brass-400/80";
  return "bg-rose-400/80";
};

export default function ScoreMeter({ score }: { score: QualityScore }) {
  return (
    <div className="card p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm uppercase tracking-[0.2em] text-ink-200">Quality Score</p>
        <span className="text-2xl font-display text-ink-50">{score.total}</span>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-white/10">
        <div
          className={`h-2 rounded-full ${colorForScore(score.total)}`}
          style={{ width: `${score.total}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-ink-200">
        {Object.entries(score.breakdown).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="capitalize">{key}</span>
            <span className="text-ink-50">{value}</span>
          </div>
        ))}
      </div>
      {score.notes.length > 0 ? (
        <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-ink-200">
          <p className="mb-2 text-ink-50">Suggestions</p>
          <ul className="space-y-1">
            {score.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
