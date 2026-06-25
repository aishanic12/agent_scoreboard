import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ChartCard({
  title,
  eyebrow,
  children,
  className
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("glass-panel rounded-lg p-5", className)}>
      {eyebrow ? <div className="muted-label">{eyebrow}</div> : null}
      <h2 className="mt-1 text-lg font-semibold text-white">{title}</h2>
      <div className="mt-5 h-72">{children}</div>
    </section>
  );
}
