import Link from "next/link";
import { Cable, SlidersHorizontal, Trophy } from "lucide-react";
import { ChartCard } from "@/components/chart-card";
import { DimensionBarChart, TrendChart } from "@/components/charts";
import { KpiCard } from "@/components/kpi-card";
import { ScoreOrb } from "@/components/score-orb";
import { defaultMultipliers, dimensions, portfolioHistory } from "@/lib/mock-data";
import { scoreBand, weightedScore } from "@/lib/utils";

export default function DashboardPage() {
  const overall = weightedScore(dimensions, defaultMultipliers);

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div>
          <div className="muted-label">Digital Performance Index</div>
          <h1 className="mt-2 text-3xl font-semibold text-white sm:text-5xl">DPI-LS Executive Dashboard</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Enterprise AI agent performance for life sciences operations, governance, value, and risk.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:w-[32rem]">
          <ManagementLink href="/connectors" icon={<Cable className="h-5 w-5" aria-hidden />} title="Manage Connectors" text="15 enterprise systems" />
          <ManagementLink href="/formula" icon={<SlidersHorizontal className="h-5 w-5" aria-hidden />} title="Formula Builder" text="Weights and multipliers" />
          <ManagementLink href="/portfolio" icon={<Trophy className="h-5 w-5" aria-hidden />} title="CEO Portfolio" text="Agent estate view" />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <ScoreOrb label="Overall DPI-LS Score" score={overall} band={scoreBand(overall)} trend={4.2} />
        <ChartCard title="Portfolio Trend" eyebrow="12 month score">
          <TrendChart data={portfolioHistory} />
        </ChartCard>
      </div>

      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <div className="muted-label">Seven score dimensions</div>
            <h2 className="mt-1 text-xl font-semibold text-white">P / Q / E / G / R / V / C</h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {dimensions.map((dimension) => (
            <KpiCard key={dimension.key} dimension={dimension} />
          ))}
        </div>
      </section>

      <ChartCard title="Dimension Comparison" eyebrow="Current score">
        <DimensionBarChart dimensions={dimensions} />
      </ChartCard>
    </div>
  );
}

function ManagementLink({
  href,
  icon,
  title,
  text
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link href={href} className="glass-panel rounded-lg p-4 transition hover:border-ember/45">
      <div className="flex items-center gap-3">
        <div className="rounded-md bg-ember/15 p-2 text-orange-200 ring-1 ring-ember/25">{icon}</div>
        <div className="min-w-0">
          <div className="truncate text-sm font-semibold text-white">{title}</div>
          <div className="truncate text-xs text-zinc-500">{text}</div>
        </div>
      </div>
    </Link>
  );
}
