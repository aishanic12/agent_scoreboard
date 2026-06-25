import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Database, ShieldAlert } from "lucide-react";
import { ChartCard } from "@/components/chart-card";
import { GovernanceRadar, TrendChart } from "@/components/charts";
import { ScoreOrb } from "@/components/score-orb";
import { dimensions } from "@/lib/mock-data";

export function generateStaticParams() {
  return dimensions.map((dimension) => ({ slug: dimension.slug }));
}

export default async function DimensionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dimension = dimensions.find((item) => item.slug === slug);

  if (!dimension) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Back to Dashboard
      </Link>

      <div className="flex flex-col gap-3">
        <div className="muted-label">Dimension Detail</div>
        <h1 className="text-4xl font-semibold text-white">
          {dimension.name} <span style={{ color: dimension.accent }}>({dimension.key})</span>
        </h1>
        <p className="max-w-4xl text-sm leading-6 text-zinc-400">{dimension.description}</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ScoreOrb label={`Overall ${dimension.name} Score`} score={dimension.score} band={dimension.band} trend={dimension.trend} />
        <ChartCard title="Historical Trend" eyebrow="12 month movement">
          <TrendChart data={dimension.history} color={dimension.accent} />
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Metric Radar" eyebrow="Normalized score profile">
          <GovernanceRadar metrics={dimension.metrics} />
        </ChartCard>
        <section className="glass-panel rounded-lg p-5">
          <div className="muted-label">Signals and Evidence</div>
          <h2 className="mt-1 text-lg font-semibold text-white">What contributed to this score</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InfoList icon={<Database className="h-4 w-4" aria-hidden />} title="Data Sources" items={dimension.sources} />
            <InfoList icon={<Database className="h-4 w-4" aria-hidden />} title="Signals" items={dimension.signals} />
            <InfoList icon={<ShieldAlert className="h-4 w-4" aria-hidden />} title="Evidence" items={dimension.evidence} />
            <InfoList icon={<ShieldAlert className="h-4 w-4" aria-hidden />} title="Current Alerts" items={dimension.alerts} />
          </div>
        </section>
      </div>

      <section className="glass-panel rounded-lg p-5">
        <div className="muted-label">Metric Breakdown</div>
        <h2 className="mt-1 text-lg font-semibold text-white">Calculation detail</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[920px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-3 py-2">Metric</th>
                <th className="px-3 py-2">Raw Value</th>
                <th className="px-3 py-2">Normalized</th>
                <th className="px-3 py-2">Weight</th>
                <th className="px-3 py-2">Contribution</th>
                <th className="px-3 py-2">Connector</th>
                <th className="px-3 py-2">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {dimension.metrics.map((metric) => (
                <tr key={metric.name} title={`${metric.explanation} Source: ${metric.source}. Last update: ${metric.lastUpdate}. Confidence: ${metric.confidence}.`} className="bg-white/[0.045]">
                  <td className="rounded-l-md px-3 py-3 font-semibold text-white">{metric.name}</td>
                  <td className="px-3 py-3 text-zinc-300">{metric.rawValue}</td>
                  <td className="px-3 py-3 text-zinc-300">{metric.normalizedScore}</td>
                  <td className="px-3 py-3 text-zinc-300">{metric.weight}</td>
                  <td className="px-3 py-3 text-orange-200">{metric.contribution}</td>
                  <td className="px-3 py-3 text-zinc-300">{metric.connector}</td>
                  <td className="rounded-r-md px-3 py-3 text-zinc-300">{metric.confidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass-panel rounded-lg p-5">
        <div className="muted-label">Recommendations</div>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {dimension.recommendations.map((recommendation) => (
            <div key={recommendation} className="rounded-md border border-ember/20 bg-ember/10 p-4 text-sm leading-6 text-orange-50">
              {recommendation}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function InfoList({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-white/10 bg-black/25 p-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-white">
        <span className="text-ember">{icon}</span>
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm leading-5 text-zinc-400">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
