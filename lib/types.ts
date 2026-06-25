export type DimensionKey = "P" | "Q" | "E" | "G" | "R" | "V" | "C";

export type TrendPoint = {
  month: string;
  score: number;
  forecast?: number;
};

export type Metric = {
  name: string;
  rawValue: string;
  normalizedScore: number;
  weight: number;
  contribution: number;
  explanation: string;
  source: string;
  connector: string;
  lastUpdate: string;
  confidence: string;
};

export type Dimension = {
  key: DimensionKey;
  slug: string;
  name: string;
  score: number;
  band: string;
  trend: number;
  accent: string;
  description: string;
  metrics: Metric[];
  sources: string[];
  signals: string[];
  evidence: string[];
  alerts: string[];
  recommendations: string[];
  history: TrendPoint[];
};

export type Agent = {
  id: string;
  name: string;
  owner: string;
  domain: string;
  score: number;
  status: "Strong" | "Watch" | "Attention";
  monthlyValue: string;
  risk: string;
};

export type Connector = {
  name: string;
  category: string;
  status: "Connected" | "Disconnected";
  lastSync: string;
  description: string;
};
