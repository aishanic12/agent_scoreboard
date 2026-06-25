import type { Agent, Connector, Dimension, DimensionKey, TrendPoint } from "@/lib/types";

const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr", "May", "Jun"];

function history(base: number, variance: number): TrendPoint[] {
  return months.map((month, index) => ({
    month,
    score: Math.min(98, Math.round((base + Math.sin(index / 1.7) * variance + index * 0.42) * 10) / 10),
    forecast: index > 8 ? Math.min(99, Math.round((base + variance + index * 0.56) * 10) / 10) : undefined
  }));
}

export const dimensions: Dimension[] = [
  {
    key: "P",
    slug: "productivity",
    name: "Productivity",
    score: 88.6,
    band: "Strong",
    trend: 4.8,
    accent: "#ff9f1c",
    description: "Throughput, cycle time reduction, automation depth, and work accepted by business teams.",
    history: history(82.8, 3.2),
    sources: ["Jira", "ServiceNow", "GitHub", "CloudWatch"],
    signals: ["Cycle-time deltas", "Automated task completion", "Queue burn-down", "Release velocity"],
    evidence: ["18,420 tasks resolved", "32% mean cycle-time compression", "99.2% schedule adherence"],
    alerts: ["Invoice agent backlog increased in EMEA validation queue"],
    recommendations: ["Add CloudWatch throughput guardrails for high-volume pharmacovigilance agents"],
    metrics: [
      { name: "Automation Throughput", rawValue: "18.4k tasks/mo", normalizedScore: 91, weight: 0.24, contribution: 21.8, explanation: "Completed work compared with historical human-assisted baseline.", source: "Workflow tickets", connector: "Jira", lastUpdate: "Today 08:20", confidence: "High" },
      { name: "Cycle Time Reduction", rawValue: "32%", normalizedScore: 88, weight: 0.2, contribution: 17.6, explanation: "Median elapsed time reduction across validated operational workflows.", source: "Incident and sprint telemetry", connector: "ServiceNow", lastUpdate: "Today 07:50", confidence: "High" },
      { name: "Exception Rate", rawValue: "4.1%", normalizedScore: 86, weight: 0.18, contribution: 15.5, explanation: "Inverse score derived from manual intervention frequency.", source: "Agent run logs", connector: "CloudWatch", lastUpdate: "Today 08:10", confidence: "Medium" },
      { name: "Release Velocity", rawValue: "42 deploys/mo", normalizedScore: 90, weight: 0.2, contribution: 18, explanation: "Validated production releases for agent workflows.", source: "Deployment events", connector: "GitHub", lastUpdate: "Yesterday 21:12", confidence: "High" },
      { name: "Queue Health", rawValue: "93% within SLA", normalizedScore: 88, weight: 0.18, contribution: 15.8, explanation: "Share of active work queues meeting business SLA.", source: "Ticket queues", connector: "ServiceNow", lastUpdate: "Today 06:45", confidence: "High" }
    ]
  },
  {
    key: "Q",
    slug: "quality",
    name: "Quality",
    score: 91.2,
    band: "Exceptional",
    trend: 3.1,
    accent: "#ff5a1f",
    description: "Accuracy, validation pass rate, rework reduction, and evidence-backed output quality.",
    history: history(86.4, 2.3),
    sources: ["GitHub", "PostgreSQL", "Salesforce", "SAP"],
    signals: ["Regression pass rate", "Rework tickets", "Golden-set accuracy", "Business acceptance"],
    evidence: ["97.8% validation pass rate", "11.6% fewer rework events", "99.1% golden-set citation integrity"],
    alerts: ["Two CRM summarization prompts nearing retraining threshold"],
    recommendations: ["Refresh golden-set coverage for oncology field medical workflows"],
    metrics: [
      { name: "Validation Pass Rate", rawValue: "97.8%", normalizedScore: 94, weight: 0.28, contribution: 26.3, explanation: "Pass rate across unit, integration, and business validation suites.", source: "CI validation", connector: "GitHub", lastUpdate: "Today 09:05", confidence: "High" },
      { name: "Golden-Set Accuracy", rawValue: "95.6%", normalizedScore: 92, weight: 0.24, contribution: 22.1, explanation: "Agreement against curated life-sciences evaluation sets.", source: "Quality warehouse", connector: "PostgreSQL", lastUpdate: "Today 05:30", confidence: "High" },
      { name: "Rework Avoidance", rawValue: "88.3%", normalizedScore: 87, weight: 0.16, contribution: 13.9, explanation: "Accepted outputs that do not require downstream correction.", source: "CRM workflows", connector: "Salesforce", lastUpdate: "Yesterday 22:40", confidence: "Medium" },
      { name: "Data Consistency", rawValue: "96.9%", normalizedScore: 93, weight: 0.18, contribution: 16.7, explanation: "Cross-system entity and transaction consistency checks.", source: "ERP transactions", connector: "SAP", lastUpdate: "Today 02:10", confidence: "High" },
      { name: "Citation Integrity", rawValue: "99.1%", normalizedScore: 95, weight: 0.14, contribution: 13.3, explanation: "Referenced evidence resolves to approved records.", source: "Document store", connector: "PostgreSQL", lastUpdate: "Today 04:44", confidence: "High" }
    ]
  },
  {
    key: "E",
    slug: "experience",
    name: "Experience",
    score: 84.9,
    band: "Strong",
    trend: 2.4,
    accent: "#f97316",
    description: "Adoption, satisfaction, latency, and employee trust in agent-assisted workflows.",
    history: history(79.9, 2.8),
    sources: ["Salesforce", "ServiceNow", "CloudWatch", "Jira"],
    signals: ["CSAT", "Adoption rate", "Latency", "Escalation sentiment"],
    evidence: ["88% monthly active user retention", "4.6/5 internal CSAT", "P95 response time 1.9s"],
    alerts: ["Latency drift in policy summarization during US afternoon peak"],
    recommendations: ["Pre-warm Bedrock model routes for peak medical inquiry windows"],
    metrics: [
      { name: "Adoption Depth", rawValue: "88% MAU", normalizedScore: 86, weight: 0.24, contribution: 20.6, explanation: "Active user share across target business population.", source: "Usage telemetry", connector: "Salesforce", lastUpdate: "Today 09:00", confidence: "High" },
      { name: "User Satisfaction", rawValue: "4.6/5", normalizedScore: 90, weight: 0.24, contribution: 21.6, explanation: "Weighted CSAT and qualitative sentiment.", source: "Service portal", connector: "ServiceNow", lastUpdate: "Yesterday 19:30", confidence: "Medium" },
      { name: "Latency Experience", rawValue: "1.9s P95", normalizedScore: 82, weight: 0.2, contribution: 16.4, explanation: "P95 response time scored against workflow expectations.", source: "Runtime metrics", connector: "CloudWatch", lastUpdate: "Today 08:55", confidence: "High" },
      { name: "Escalation Friction", rawValue: "7.2%", normalizedScore: 81, weight: 0.16, contribution: 13, explanation: "Inverse rate of user-initiated handoffs.", source: "Support requests", connector: "Jira", lastUpdate: "Today 06:35", confidence: "Medium" },
      { name: "Trust Recovery", rawValue: "92% closed", normalizedScore: 86, weight: 0.16, contribution: 13.8, explanation: "Share of reported issues closed with accepted remediation.", source: "Incident records", connector: "ServiceNow", lastUpdate: "Today 03:15", confidence: "High" }
    ]
  },
  {
    key: "G",
    slug: "governance",
    name: "Governance",
    score: 92.4,
    band: "Exceptional",
    trend: 3,
    accent: "#b11226",
    description: "Controls, auditability, residency, access discipline, and model documentation freshness.",
    history: history(87.3, 2.5),
    sources: ["AWS Config", "IAM", "Vault", "Open Policy Agent", "CloudTrail"],
    signals: ["Compliance rate", "RBAC adherence", "Model-card freshness", "Policy evaluation outcomes"],
    evidence: ["99.4% compliant resources", "97.1% RBAC adherence", "100% tier-1 agents with current model cards"],
    alerts: ["One non-production Bedrock policy exemption expires in 5 days"],
    recommendations: ["Create automatic Sentinel parity tests for residency policy changes"],
    metrics: [
      { name: "Compliance Rate", rawValue: "99.4%", normalizedScore: 96, weight: 0.18, contribution: 17.3, explanation: "Resources passing active governance rules.", source: "Config snapshots", connector: "AWS Config", lastUpdate: "Today 08:25", confidence: "High" },
      { name: "Audit Coverage", rawValue: "98.7%", normalizedScore: 94, weight: 0.16, contribution: 15, explanation: "Agent decisions with traceable event and evidence records.", source: "Audit events", connector: "CloudTrail", lastUpdate: "Today 08:28", confidence: "High" },
      { name: "RBAC Adherence", rawValue: "97.1%", normalizedScore: 92, weight: 0.16, contribution: 14.7, explanation: "Role assignments matching least-privilege policy.", source: "Access graph", connector: "IAM", lastUpdate: "Today 07:42", confidence: "High" },
      { name: "Data Residency", rawValue: "100%", normalizedScore: 96, weight: 0.14, contribution: 13.4, explanation: "Workflow data processed inside approved residency zones.", source: "Policy decisions", connector: "Open Policy Agent", lastUpdate: "Today 08:00", confidence: "High" },
      { name: "PII Handling", rawValue: "99.1%", normalizedScore: 93, weight: 0.14, contribution: 13, explanation: "PII detection, masking, and retention conformance.", source: "Secrets and policy scans", connector: "Vault", lastUpdate: "Today 04:05", confidence: "High" },
      { name: "Model Card Freshness", rawValue: "100%", normalizedScore: 95, weight: 0.12, contribution: 11.4, explanation: "Models with current approved documentation.", source: "Governance registry", connector: "PostgreSQL", lastUpdate: "Yesterday 18:20", confidence: "High" },
      { name: "Escalation Response", rawValue: "91% SLA", normalizedScore: 86, weight: 0.1, contribution: 8.6, explanation: "Control escalations handled within SLA.", source: "Control tickets", connector: "ServiceNow", lastUpdate: "Today 03:55", confidence: "Medium" }
    ]
  },
  {
    key: "R",
    slug: "risk",
    name: "Risk",
    score: 79.8,
    band: "Stable",
    trend: -1.3,
    accent: "#ef4444",
    description: "Residual operational, compliance, model, access, and vendor risk after controls.",
    history: history(77.6, 3.4),
    sources: ["CloudTrail", "IAM", "Bedrock", "Open Policy Agent", "Vault"],
    signals: ["Policy denials", "Privilege drift", "Toxicity checks", "Unusual invocation patterns"],
    evidence: ["14 open medium findings", "0 critical findings", "2 privilege drift events under remediation"],
    alerts: ["Procurement classification agent has elevated hallucination watch score"],
    recommendations: ["Tighten retrieval thresholds and add human approval for high-value procurement clauses"],
    metrics: [
      { name: "Critical Finding Load", rawValue: "0 critical", normalizedScore: 92, weight: 0.2, contribution: 18.4, explanation: "Open critical risks across agent estate.", source: "Risk register", connector: "ServiceNow", lastUpdate: "Today 07:10", confidence: "High" },
      { name: "Privilege Drift", rawValue: "2 events", normalizedScore: 76, weight: 0.18, contribution: 13.7, explanation: "Recently detected access grants outside approved templates.", source: "Access audit", connector: "IAM", lastUpdate: "Today 08:35", confidence: "High" },
      { name: "Policy Denials", rawValue: "1.8%", normalizedScore: 80, weight: 0.16, contribution: 12.8, explanation: "Denied actions normalized for workload volume.", source: "Policy engine", connector: "Open Policy Agent", lastUpdate: "Today 08:36", confidence: "High" },
      { name: "Model Safety", rawValue: "96.3%", normalizedScore: 86, weight: 0.18, contribution: 15.5, explanation: "Safety checks passing for live and sampled traffic.", source: "Invocation telemetry", connector: "Bedrock", lastUpdate: "Today 08:38", confidence: "Medium" },
      { name: "Secrets Exposure", rawValue: "0 active", normalizedScore: 94, weight: 0.14, contribution: 13.2, explanation: "Active secrets or tokens detected in agent outputs or repos.", source: "Secrets scans", connector: "Vault", lastUpdate: "Today 05:05", confidence: "High" },
      { name: "Anomaly Load", rawValue: "14 medium", normalizedScore: 71, weight: 0.14, contribution: 9.9, explanation: "Open non-critical anomalies after suppression rules.", source: "Audit events", connector: "CloudTrail", lastUpdate: "Today 08:40", confidence: "Medium" }
    ]
  },
  {
    key: "V",
    slug: "value",
    name: "Value",
    score: 89.7,
    band: "Strong",
    trend: 5.6,
    accent: "#fb923c",
    description: "Validated business value, savings, revenue enablement, and avoided operational loss.",
    history: history(81.7, 4.1),
    sources: ["SAP", "Salesforce", "PostgreSQL", "ServiceNow"],
    signals: ["Cost avoidance", "Revenue assist", "Working capital impact", "Case deflection"],
    evidence: ["$8.7M annualized value", "$2.1M quarterly cost avoidance", "14,800 support cases deflected"],
    alerts: ["Two value streams still using provisional finance approval"],
    recommendations: ["Attach SAP cost-center reconciliation to every tier-1 value claim"],
    metrics: [
      { name: "Annualized Value", rawValue: "$8.7M", normalizedScore: 92, weight: 0.26, contribution: 23.9, explanation: "Finance-adjusted total annualized value run rate.", source: "Finance ledger", connector: "SAP", lastUpdate: "Today 01:20", confidence: "High" },
      { name: "Revenue Assist", rawValue: "$3.2M", normalizedScore: 88, weight: 0.18, contribution: 15.8, explanation: "Pipeline influenced by compliant agent recommendations.", source: "Commercial CRM", connector: "Salesforce", lastUpdate: "Today 03:10", confidence: "Medium" },
      { name: "Cost Avoidance", rawValue: "$2.1M/qtr", normalizedScore: 90, weight: 0.2, contribution: 18, explanation: "Avoided labor and incident cost adjusted by finance controls.", source: "ERP cost centers", connector: "SAP", lastUpdate: "Yesterday 23:45", confidence: "High" },
      { name: "Case Deflection", rawValue: "14.8k cases", normalizedScore: 86, weight: 0.18, contribution: 15.5, explanation: "Resolved inquiries without assisted service handling.", source: "Support records", connector: "ServiceNow", lastUpdate: "Today 05:30", confidence: "High" },
      { name: "Value Validation", rawValue: "91% approved", normalizedScore: 89, weight: 0.18, contribution: 16, explanation: "Value claims with approved evidence and owner signoff.", source: "Value registry", connector: "PostgreSQL", lastUpdate: "Today 04:00", confidence: "High" }
    ]
  },
  {
    key: "C",
    slug: "cost",
    name: "Cost",
    score: 82.1,
    band: "Strong",
    trend: 1.7,
    accent: "#f59e0b",
    description: "Unit economics, infrastructure efficiency, vendor utilization, and budget adherence.",
    history: history(78.6, 2.4),
    sources: ["AWS Config", "CloudWatch", "Bedrock", "Azure", "SAP"],
    signals: ["Cost per successful task", "Token burn", "Idle capacity", "Budget variance"],
    evidence: ["$0.41 per successful task", "8.2% below monthly AI platform budget", "17% idle endpoint reduction"],
    alerts: ["Bedrock token cost rising for procurement analysis agent"],
    recommendations: ["Route low-risk summarization work to smaller model tier after quality holdout testing"],
    metrics: [
      { name: "Cost per Task", rawValue: "$0.41", normalizedScore: 84, weight: 0.24, contribution: 20.2, explanation: "Fully loaded cost for successful agent completion.", source: "Runtime and finance", connector: "CloudWatch", lastUpdate: "Today 08:44", confidence: "High" },
      { name: "Budget Variance", rawValue: "-8.2%", normalizedScore: 88, weight: 0.2, contribution: 17.6, explanation: "Spend compared with approved monthly budget.", source: "Finance ledger", connector: "SAP", lastUpdate: "Today 02:20", confidence: "High" },
      { name: "Token Efficiency", rawValue: "73rd pct", normalizedScore: 78, weight: 0.18, contribution: 14, explanation: "Token use per accepted output versus peer workflows.", source: "Model telemetry", connector: "Bedrock", lastUpdate: "Today 08:46", confidence: "Medium" },
      { name: "Idle Capacity", rawValue: "11.4%", normalizedScore: 82, weight: 0.16, contribution: 13.1, explanation: "Reserved or provisioned capacity not serving workload.", source: "Cloud inventory", connector: "AWS Config", lastUpdate: "Today 06:15", confidence: "High" },
      { name: "Cloud Mix Efficiency", rawValue: "86%", normalizedScore: 81, weight: 0.12, contribution: 9.7, explanation: "Workloads placed on best approved cost-performance route.", source: "Multi-cloud usage", connector: "Azure", lastUpdate: "Today 04:30", confidence: "Medium" },
      { name: "Forecast Accuracy", rawValue: "92%", normalizedScore: 84, weight: 0.1, contribution: 8.4, explanation: "Forecasted versus actual monthly AI operations spend.", source: "Cost model", connector: "PostgreSQL", lastUpdate: "Yesterday 20:00", confidence: "High" }
    ]
  }
];

export const defaultMultipliers: Record<DimensionKey, number> = {
  P: 1,
  Q: 1,
  E: 1.5,
  G: 1.5,
  R: 2,
  V: 1,
  C: 0.5
};

export const agents: Agent[] = [
  { id: "ag-001", name: "Clinical Trial Protocol Copilot", owner: "Clinical Ops", domain: "R&D", score: 94.6, status: "Strong", monthlyValue: "$1.4M", risk: "Low" },
  { id: "ag-002", name: "Pharmacovigilance Intake Agent", owner: "Safety", domain: "Regulatory", score: 91.8, status: "Strong", monthlyValue: "$980K", risk: "Low" },
  { id: "ag-003", name: "Medical Inquiry Response Agent", owner: "Medical Affairs", domain: "Commercial", score: 90.9, status: "Strong", monthlyValue: "$860K", risk: "Low" },
  { id: "ag-004", name: "Manufacturing Deviation Analyzer", owner: "Quality", domain: "Manufacturing", score: 88.2, status: "Strong", monthlyValue: "$720K", risk: "Medium" },
  { id: "ag-005", name: "Regulatory Submission Reviewer", owner: "Reg Affairs", domain: "Regulatory", score: 86.7, status: "Watch", monthlyValue: "$690K", risk: "Medium" },
  { id: "ag-006", name: "HCP Engagement Summarizer", owner: "Commercial Ops", domain: "Commercial", score: 84.5, status: "Watch", monthlyValue: "$540K", risk: "Medium" },
  { id: "ag-007", name: "Supply Chain Exception Agent", owner: "Supply Chain", domain: "Operations", score: 82.4, status: "Watch", monthlyValue: "$460K", risk: "Medium" },
  { id: "ag-008", name: "Procurement Clause Analyzer", owner: "Procurement", domain: "Finance", score: 76.8, status: "Attention", monthlyValue: "$310K", risk: "High" },
  { id: "ag-009", name: "Invoice Resolution Agent", owner: "Finance Ops", domain: "Finance", score: 74.9, status: "Attention", monthlyValue: "$280K", risk: "Medium" },
  { id: "ag-010", name: "Market Access Evidence Agent", owner: "Access", domain: "Commercial", score: 72.6, status: "Attention", monthlyValue: "$240K", risk: "High" },
  { id: "ag-011", name: "Policy Training Assistant", owner: "Compliance", domain: "Enterprise", score: 85.1, status: "Watch", monthlyValue: "$390K", risk: "Low" }
];

export const connectors: Connector[] = [
  { name: "AWS CloudTrail", category: "Audit", status: "Connected", lastSync: "Today 08:40", description: "Agent decision audit events and anomaly traces." },
  { name: "AWS Config", category: "Cloud Governance", status: "Connected", lastSync: "Today 08:22", description: "Resource posture, compliance drift, and inventory evidence." },
  { name: "IAM", category: "Identity", status: "Connected", lastSync: "Today 07:42", description: "Access graph, role conformance, and privilege drift." },
  { name: "ServiceNow", category: "ITSM", status: "Connected", lastSync: "Today 07:55", description: "Incidents, escalations, approvals, and remediation records." },
  { name: "Jira", category: "Delivery", status: "Connected", lastSync: "Today 08:05", description: "Work item flow, backlog health, and sprint signals." },
  { name: "Salesforce", category: "Commercial", status: "Connected", lastSync: "Today 06:58", description: "HCP engagement, service cases, and revenue-assist signals." },
  { name: "SAP", category: "ERP", status: "Connected", lastSync: "Today 02:20", description: "Finance validation, cost centers, and value realization." },
  { name: "Azure", category: "Cloud", status: "Disconnected", lastSync: "3 days ago", description: "Multi-cloud usage, identity, and workload placement." },
  { name: "GitHub", category: "Engineering", status: "Connected", lastSync: "Today 09:05", description: "CI validation, deployment events, and code evidence." },
  { name: "GitLab", category: "Engineering", status: "Disconnected", lastSync: "Never", description: "Alternate repository and pipeline telemetry." },
  { name: "PostgreSQL", category: "Data Platform", status: "Connected", lastSync: "Today 05:30", description: "Quality warehouse, value registry, and model metadata." },
  { name: "Vault", category: "Secrets", status: "Connected", lastSync: "Today 05:05", description: "Secrets hygiene, token policy, and PII handling evidence." },
  { name: "CloudWatch", category: "Observability", status: "Connected", lastSync: "Today 08:46", description: "Runtime metrics, latency, logs, and throughput telemetry." },
  { name: "Bedrock", category: "AI Platform", status: "Connected", lastSync: "Today 08:38", description: "Model invocation, token, safety, and routing telemetry." },
  { name: "Open Policy Agent", category: "Policy", status: "Connected", lastSync: "Today 08:36", description: "Policy decisions, denials, and data residency rules." },
  { name: "HashiCorp Sentinel", category: "Policy", status: "Disconnected", lastSync: "Never", description: "Infrastructure policy-as-code validation planned for parity checks." }
];

export const portfolioHistory = months.map((month, index) => ({
  month,
  score: Math.round((80.4 + index * 0.82 + Math.sin(index / 1.6) * 1.8) * 10) / 10,
  forecast: index > 7 ? Math.round((85.8 + (index - 7) * 1.05) * 10) / 10 : undefined
}));

export const recommendations = [
  "Prioritize remediation on Procurement Clause Analyzer before expanding to high-value contract classes.",
  "Move mature low-risk summarization workloads to a lower-cost model route after a two-week quality holdout.",
  "Attach SAP value evidence to every tier-1 agent to reduce provisional finance approvals.",
  "Increase governance automation by pairing Open Policy Agent controls with Sentinel parity tests."
];
