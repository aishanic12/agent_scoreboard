"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import type { Dimension, TrendPoint } from "@/lib/types";

const tooltipStyle = {
  background: "#111",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#fff"
};

export function Sparkline({ data, color }: { data: TrendPoint[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <Area type="monotone" dataKey="score" stroke={color} fill={color} fillOpacity={0.18} strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function TrendChart({ data, color = "#ff5a1f" }: { data: TrendPoint[]; color?: string }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: -20, right: 16, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="month" tick={{ fill: "#a1a1aa", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis domain={[60, 100]} tick={{ fill: "#a1a1aa", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Line type="monotone" dataKey="score" stroke={color} strokeWidth={3} dot={false} />
        <Line type="monotone" dataKey="forecast" stroke="#ff9f1c" strokeWidth={2} strokeDasharray="5 5" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function DimensionBarChart({ dimensions }: { dimensions: Dimension[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={dimensions} margin={{ left: -20, right: 16, top: 10, bottom: 0 }}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey="key" tick={{ fill: "#a1a1aa", fontSize: 12 }} tickLine={false} axisLine={false} />
        <YAxis domain={[60, 100]} tick={{ fill: "#a1a1aa", fontSize: 12 }} tickLine={false} axisLine={false} />
        <Tooltip contentStyle={tooltipStyle} />
        <Bar dataKey="score" fill="#ff5a1f" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function GovernanceRadar({ metrics }: { metrics: Dimension["metrics"] }) {
  const data = metrics.map((metric) => ({
    metric: metric.name.split(" ")[0],
    score: metric.normalizedScore
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RadarChart data={data}>
        <PolarGrid stroke="rgba(255,255,255,0.14)" />
        <PolarAngleAxis dataKey="metric" tick={{ fill: "#d4d4d8", fontSize: 11 }} />
        <Radar dataKey="score" stroke="#ff5a1f" fill="#ff5a1f" fillOpacity={0.28} />
        <Tooltip contentStyle={tooltipStyle} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
