import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import type { Dimension } from "@/lib/types";
import { Sparkline } from "@/components/charts";
import { cn } from "@/lib/utils";

export function KpiCard({ dimension }: { dimension: Dimension }) {
  const positive = dimension.trend >= 0;

  return (
    <Link
      href={`/dimensions/${dimension.slug}`}
      className="glass-panel group block rounded-lg p-5 transition hover:-translate-y-0.5 hover:border-ember/45"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="muted-label">{dimension.name}</div>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-4xl font-semibold text-white">{dimension.key}</span>
            <span className="pb-1 text-2xl font-semibold" style={{ color: dimension.accent }}>
              {dimension.score}
            </span>
          </div>
        </div>
        <div className="rounded-md border border-white/10 bg-black/30 px-2.5 py-1 text-xs font-semibold text-zinc-300">
          {dimension.band}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className={cn("flex items-center gap-1 text-sm font-semibold", positive ? "text-emerald-300" : "text-red-300")}>
          {positive ? <ArrowUpRight className="h-4 w-4" aria-hidden /> : <ArrowDownRight className="h-4 w-4" aria-hidden />}
          {positive ? "+" : ""}
          {dimension.trend}%
        </div>
        <div className="h-10 w-28">
          <Sparkline data={dimension.history} color={dimension.accent} />
        </div>
      </div>
    </Link>
  );
}
