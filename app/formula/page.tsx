"use client";

import { useMemo, useState } from "react";
import { ChartCard } from "@/components/chart-card";
import { DimensionBarChart } from "@/components/charts";
import { defaultMultipliers, dimensions } from "@/lib/mock-data";
import type { DimensionKey } from "@/lib/types";
import { scoreBand, weightedScore } from "@/lib/utils";

const multiplierOptions = [0, 0.5, 1, 1.5, 2];

export default function FormulaPage() {
  const [multipliers, setMultipliers] = useState<Record<DimensionKey, number>>(defaultMultipliers);
  const previousScore = weightedScore(dimensions, defaultMultipliers);
  const newScore = weightedScore(dimensions, multipliers);
  const difference = Number((newScore - previousScore).toFixed(1));
  const totalWeight = Object.values(multipliers).reduce((sum, value) => sum + value, 0);

  const formulaPreview = useMemo(
    () =>
      dimensions
        .map((dimension) => `(${dimension.key} x ${multipliers[dimension.key]})`)
        .join(" + "),
    [multipliers]
  );

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="muted-label">Administrative Control</div>
        <h1 className="mt-2 text-4xl font-semibold text-white">Formula Builder</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
          Adjust scoring multipliers and instantly preview how the DPI-LS weighted score changes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <ScoreTile label="Previous Overall Score" value={previousScore} detail={scoreBand(previousScore)} />
        <ScoreTile label="New Overall Score" value={newScore} detail={scoreBand(newScore)} highlight />
        <ScoreTile label="Score Difference" value={`${difference >= 0 ? "+" : ""}${difference}`} detail={`Total weight ${totalWeight}`} />
      </div>

      <section className="glass-panel rounded-lg p-5">
        <div className="muted-label">Multiplier Table</div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-3 py-2">Dimension</th>
                <th className="px-3 py-2">Current Weight</th>
                <th className="px-3 py-2">Multiplier</th>
                <th className="px-3 py-2">Contribution</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map((dimension) => {
                const multiplier = multipliers[dimension.key];
                const contribution = totalWeight === 0 ? 0 : (dimension.score * multiplier) / totalWeight;
                return (
                  <tr key={dimension.key} className="bg-white/[0.045]">
                    <td className="rounded-l-md px-3 py-3">
                      <div className="font-semibold text-white">{dimension.name}</div>
                      <div className="text-xs text-zinc-500">{dimension.key}</div>
                    </td>
                    <td className="px-3 py-3 text-zinc-300">{defaultMultipliers[dimension.key]}</td>
                    <td className="px-3 py-3">
                      <select
                        value={multiplier}
                        onChange={(event) =>
                          setMultipliers((current) => ({
                            ...current,
                            [dimension.key]: Number(event.target.value)
                          }))
                        }
                        className="rounded-md border border-white/10 bg-black px-3 py-2 text-white outline-none focus:border-ember"
                      >
                        {multiplierOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="rounded-r-md px-3 py-3 text-orange-200">{contribution.toFixed(1)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel rounded-lg p-5">
        <div className="muted-label">Formula Preview</div>
        <div className="mt-4 rounded-md border border-ember/20 bg-black/30 p-4 font-mono text-sm leading-7 text-orange-100">
          Final Score = ({formulaPreview}) / {totalWeight || 1}
        </div>
      </section>

      <ChartCard title="Current Dimension Inputs" eyebrow="Score basis">
        <DimensionBarChart dimensions={dimensions} />
      </ChartCard>
    </div>
  );
}

function ScoreTile({
  label,
  value,
  detail,
  highlight
}: {
  label: string;
  value: string | number;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="muted-label">{label}</div>
      <div className={highlight ? "mt-3 text-4xl font-semibold text-orange-200" : "mt-3 text-4xl font-semibold text-white"}>{value}</div>
      <div className="mt-2 text-sm text-zinc-500">{detail}</div>
    </section>
  );
}
