import { QualityScore } from "@/lib/types";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";

const colorForScore = (score: number) => {
  if (score >= 85) return "bg-success";
  if (score >= 70) return "bg-warning";
  return "bg-danger";
};

export default function ScoreMeter({ score }: { score: QualityScore }) {
  return (
    <Card variant="raised" className="p-6">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.3em] text-base-300">Quality Score</p>
        <Badge tone={score.total >= 85 ? "success" : score.total >= 70 ? "warning" : "danger"}>
          {score.total}/100
        </Badge>
      </div>
      <div className="mt-4 h-2 w-full rounded-full bg-base-200/10">
        <div
          className={`h-2 rounded-full ${colorForScore(score.total)}`}
          style={{ width: `${score.total}%` }}
        />
      </div>
      <div className="mt-5 grid grid-cols-2 gap-3 text-xs text-base-200">
        {Object.entries(score.breakdown).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <span className="capitalize">{key}</span>
            <span className="text-base-50">{value}</span>
          </div>
        ))}
      </div>
      {score.notes.length > 0 ? (
        <div className="mt-5 rounded-2xl border border-base-200/10 bg-base-200/10 p-4 text-xs text-base-200">
          <p className="mb-2 text-base-50">Suggestions</p>
          <ul className="space-y-1">
            {score.notes.map((note) => (
              <li key={note}>• {note}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </Card>
  );
}
