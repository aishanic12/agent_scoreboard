import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ActionButton({
  children,
  variant = "default"
}: {
  children: ReactNode;
  variant?: "default" | "ghost";
}) {
  return (
    <button
      type="button"
      className={cn(
        "rounded-md px-3 py-2 text-xs font-semibold transition",
        variant === "default"
          ? "bg-ember text-white hover:bg-orange-600"
          : "border border-white/10 bg-white/5 text-zinc-200 hover:bg-white/10"
      )}
    >
      {children}
    </button>
  );
}
