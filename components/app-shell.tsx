"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Cable, Gauge, LayoutDashboard, SlidersHorizontal, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portfolio", label: "CEO Portfolio", icon: Trophy },
  { href: "/connectors", label: "Connectors", icon: Cable },
  { href: "/formula", label: "Formula", icon: SlidersHorizontal }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-black/55 px-5 py-6 backdrop-blur-xl lg:block">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-md bg-gradient-to-br from-chandra to-ember shadow-glow">
            <Gauge className="h-6 w-6 text-white" aria-hidden />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">DPI-LS</div>
            <div className="text-xs text-zinc-500">Executive Command</div>
          </div>
        </Link>

        <nav className="mt-9 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white",
                  active && "bg-white/10 text-white ring-1 ring-white/10"
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5 rounded-md border border-ember/25 bg-ember/10 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-orange-100">
            <Activity className="h-4 w-4" aria-hidden />
            Live Mock Mode
          </div>
          <p className="mt-2 text-xs leading-5 text-zinc-400">
            JSON-modeled enterprise telemetry, ready for API replacement.
          </p>
        </div>
      </aside>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl lg:hidden">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold text-white">
            <Gauge className="h-5 w-5 text-ember" aria-hidden />
            DPI-LS
          </Link>
          <nav className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  title={item.label}
                  className={cn(
                    "rounded-md p-2 text-zinc-400 hover:bg-white/10 hover:text-white",
                    active && "bg-white/10 text-white"
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-6 lg:ml-72 lg:px-8 lg:py-8">{children}</main>
    </div>
  );
}
