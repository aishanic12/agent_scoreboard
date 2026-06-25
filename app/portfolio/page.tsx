import { AlertTriangle, Sparkles, Trophy } from "lucide-react";
import { ChartCard } from "@/components/chart-card";
import { TrendChart } from "@/components/charts";
import { ScoreOrb } from "@/components/score-orb";
import { agents, portfolioHistory, recommendations } from "@/lib/mock-data";
import { scoreBand } from "@/lib/utils";

export default function PortfolioPage() {
  const sorted = [...agents].sort((a, b) => b.score - a.score);
  const topAgents = sorted.slice(0, 5);
  const attentionAgents = sorted.filter((agent) => agent.status === "Attention");
  const portfolioScore = Number((agents.reduce((sum, agent) => sum + agent.score, 0) / agents.length).toFixed(1));

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <div className="muted-label">CEO Portfolio</div>
        <h1 className="mt-2 text-4xl font-semibold text-white">AI Agent Estate Performance</h1>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
          Board-ready view of top performers, attention areas, trend forecast, and AI-generated recommendations.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
        <ScoreOrb label="Overall Portfolio Score" score={portfolioScore} band={scoreBand(portfolioScore)} trend={3.8} />
        <ChartCard title="Historical Trends and Forecast" eyebrow="Portfolio score">
          <TrendChart data={portfolioHistory} />
        </ChartCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <AgentPanel title="Top Performing Agents" icon={<Trophy className="h-5 w-5" aria-hidden />} agents={topAgents} />
        <AgentPanel title="Agents Requiring Attention" icon={<AlertTriangle className="h-5 w-5" aria-hidden />} agents={attentionAgents} attention />
      </div>

      <section className="glass-panel rounded-lg p-5">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-ember" aria-hidden />
          <div>
            <div className="muted-label">AI-generated Recommendations</div>
            <h2 className="mt-1 text-lg font-semibold text-white">Next executive actions</h2>
          </div>
        </div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">
          {recommendations.map((recommendation) => (
            <div key={recommendation} className="rounded-md border border-white/10 bg-white/[0.045] p-4 text-sm leading-6 text-zinc-300">
              {recommendation}
            </div>
          ))}
        </div>
      </section>

      <section className="glass-panel rounded-lg p-5">
        <div className="muted-label">Agent Inventory</div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[900px] border-separate border-spacing-y-2 text-left text-sm">
            <thead className="text-xs uppercase text-zinc-500">
              <tr>
                <th className="px-3 py-2">Agent</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Domain</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Monthly Value</th>
                <th className="px-3 py-2">Risk</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((agent) => (
                <tr key={agent.id} className="bg-white/[0.045]">
                  <td className="rounded-l-md px-3 py-3 font-semibold text-white">{agent.name}</td>
                  <td className="px-3 py-3 text-zinc-300">{agent.owner}</td>
                  <td className="px-3 py-3 text-zinc-300">{agent.domain}</td>
                  <td className="px-3 py-3 text-orange-200">{agent.score}</td>
                  <td className="px-3 py-3 text-zinc-300">{agent.status}</td>
                  <td className="px-3 py-3 text-zinc-300">{agent.monthlyValue}</td>
                  <td className="rounded-r-md px-3 py-3 text-zinc-300">{agent.risk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function AgentPanel({
  title,
  icon,
  agents: panelAgents,
  attention
}: {
  title: string;
  icon: React.ReactNode;
  agents: typeof agents;
  attention?: boolean;
}) {
  return (
    <section className="glass-panel rounded-lg p-5">
      <div className="flex items-center gap-2">
        <span className={attention ? "text-red-300" : "text-orange-200"}>{icon}</span>
        <h2 className="text-lg font-semibold text-white">{title}</h2>
      </div>
      <div className="mt-5 space-y-3">
        {panelAgents.map((agent) => (
          <div key={agent.id} className="flex items-center justify-between gap-4 rounded-md bg-white/[0.045] p-3">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">{agent.name}</div>
              <div className="text-xs text-zinc-500">{agent.owner} · {agent.monthlyValue}</div>
            </div>
            <div className={attention ? "text-lg font-semibold text-red-200" : "text-lg font-semibold text-orange-200"}>{agent.score}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
