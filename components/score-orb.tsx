import { ArrowUpRight } from "lucide-react";

export function ScoreOrb({
  label,
  score,
  band,
  trend
}: {
  label: string;
  score: number;
  band: string;
  trend?: number;
}) {
  return (
    <section className="glass-panel rounded-lg p-6">
      <div className="muted-label">{label}</div>
      <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <div className="text-6xl font-semibold leading-none text-white sm:text-7xl">{score}</div>
          <div className="mt-2 text-lg font-medium text-zinc-300">/ 100</div>
        </div>
        <div className="space-y-3">
          <div className="rounded-md bg-ember/15 px-4 py-2 text-sm font-semibold text-orange-100 ring-1 ring-ember/25">
            {band}
          </div>
          {typeof trend === "number" ? (
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
              <ArrowUpRight className="h-4 w-4" aria-hidden />
              Trend +{trend}%
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
