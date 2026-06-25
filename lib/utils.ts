import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Dimension, DimensionKey } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreBand(score: number) {
  if (score >= 90) return "Exceptional";
  if (score >= 82) return "Strong";
  if (score >= 74) return "Stable";
  if (score >= 65) return "Watch";
  return "Attention";
}

export function weightedScore(
  dimensions: Dimension[],
  multipliers: Record<DimensionKey, number>
) {
  const totalWeight = dimensions.reduce(
    (sum, dimension) => sum + multipliers[dimension.key],
    0
  );

  if (totalWeight === 0) return 0;

  const weightedTotal = dimensions.reduce(
    (sum, dimension) => sum + dimension.score * multipliers[dimension.key],
    0
  );

  return Number((weightedTotal / totalWeight).toFixed(1));
}
