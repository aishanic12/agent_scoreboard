import { CheckCircle2, CircleOff } from "lucide-react";
import { ActionButton } from "@/components/action-button";
import { connectors } from "@/lib/mock-data";

export default function ConnectorsPage() {
  const connected = connectors.filter((connector) => connector.status === "Connected").length;

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="muted-label">Enterprise Data Fabric</div>
          <h1 className="mt-2 text-4xl font-semibold text-white">Connector Management</h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">
            Manage enterprise telemetry sources that feed DPI-LS scoring, evidence, and operational recommendations.
          </p>
        </div>
        <div className="glass-panel rounded-lg px-5 py-4">
          <div className="text-3xl font-semibold text-white">{connected}/{connectors.length}</div>
          <div className="text-xs text-zinc-500">Connected systems</div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-3">
        {connectors.map((connector) => {
          const isConnected = connector.status === "Connected";
          return (
            <section key={connector.name} className="glass-panel rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-white">{connector.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.14em] text-zinc-500">{connector.category}</div>
                </div>
                <div className={isConnected ? "text-emerald-300" : "text-zinc-500"}>
                  {isConnected ? <CheckCircle2 className="h-5 w-5" aria-hidden /> : <CircleOff className="h-5 w-5" aria-hidden />}
                </div>
              </div>
              <p className="mt-4 min-h-12 text-sm leading-6 text-zinc-400">{connector.description}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-md bg-white/[0.045] p-3">
                  <div className="text-xs text-zinc-500">Status</div>
                  <div className={isConnected ? "font-semibold text-emerald-300" : "font-semibold text-zinc-300"}>{connector.status}</div>
                </div>
                <div className="rounded-md bg-white/[0.045] p-3">
                  <div className="text-xs text-zinc-500">Last Sync</div>
                  <div className="font-semibold text-zinc-200">{connector.lastSync}</div>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                <ActionButton>Configure</ActionButton>
                <ActionButton variant="ghost">Refresh</ActionButton>
                <ActionButton variant="ghost">Test Connection</ActionButton>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
