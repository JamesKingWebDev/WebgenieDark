import { FileDown, X } from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

const algorithms = [
  { name: 'GENIE3', color: '#A970FF', selected: true },
  { name: 'PPCOR', color: '#60a5fa', selected: true },
  { name: 'SINCERITIES', color: '#f59e0b', selected: true },
  { name: 'PIDC', color: '#ef4444', selected: false },
  { name: 'GRNBoost2', color: '#10b981', selected: false },
  { name: 'SCENIC', color: '#8b5cf6', selected: false },
];

const prData = Array.from({ length: 20 }, (_, i) => ({
  recall: i / 20,
  GENIE3: 0.95 - i * 0.04,
  PPCOR: 0.85 - i * 0.038,
  SINCERITIES: 0.82 - i * 0.036,
}));

const rocData = Array.from({ length: 20 }, (_, i) => ({
  fpr: i / 20,
  GENIE3: 0.5 + i * 0.025,
  PPCOR: 0.4 + i * 0.028,
  SINCERITIES: 0.35 + i * 0.03,
}));

const enrichmentData = [
  { category: 'GO:0000', GENIE3: 850, GRNBoost2: 720 },
  { category: 'OCT4', GENIE3: 725, GRNBoost2: 680 },
  { category: 'NANOG', GENIE3: 650, GRNBoost2: 590 },
  { category: 'E2F7', GENIE3: 580, GRNBoost2: 520 },
  { category: 'MYC', GENIE3: 450, GRNBoost2: 480 },
];

const similarityData = [
  { pair: 'GENIE3 — GRNBoost2', similarity: 0.82, color: '#A970FF' },
  { pair: 'GENIE3 — SCENIC', similarity: 0.76, color: '#60a5fa' },
  { pair: 'PPCOR — PIDC', similarity: 0.71, color: '#f59e0b' },
  { pair: 'SINCERITIES — SCENIC', similarity: 0.68, color: '#ef4444' },
];

const metricsData = [
  {
    algorithm: 'GENIE3',
    auroc: 0.847,
    auprc: 0.753,
    f1: 0.782,
    precision: 0.821,
    recall: 0.746,
    earlyPrecision: 0.851,
  },
  {
    algorithm: 'GRNBoost2',
    auroc: 0.803,
    auprc: 0.681,
    f1: 0.756,
    precision: 0.798,
    recall: 0.718,
    earlyPrecision: 0.867,
  },
  {
    algorithm: 'SCENIC',
    auroc: 0.769,
    auprc: 0.678,
    f1: 0.741,
    precision: 0.776,
    recall: 0.709,
    earlyPrecision: 0.824,
  },
  {
    algorithm: 'SINCERITIES',
    auroc: 0.734,
    auprc: 0.698,
    f1: 0.721,
    precision: 0.741,
    recall: 0.689,
    earlyPrecision: 0.801,
  },
  {
    algorithm: 'PIDC',
    auroc: 0.691,
    auprc: 0.612,
    f1: 0.668,
    precision: 0.701,
    recall: 0.612,
    earlyPrecision: 0.778,
  },
  {
    algorithm: 'PPCOR',
    auroc: 0.612,
    auprc: 0.789,
    f1: 0.553,
    precision: 0.648,
    recall: 0.559,
    earlyPrecision: 0.723,
  },
];

export function Compare() {
  return (
    <div className="min-h-screen py-8">
      <div className="container px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Algorithm Comparison</h1>
          <p className="text-muted-foreground">
            Compare gene inference algorithm performance on HSC dataset
          </p>
        </div>

        {/* Algorithm Selection */}
        <div className="mb-6 p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Select Algorithms to Compare</h2>
            <div className="flex gap-2">
              <button className="text-sm text-primary hover:underline">Select All</button>
              <button className="text-sm text-muted-foreground hover:underline">Clear</button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {algorithms.map((algo) => (
              <button
                key={algo.name}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                  algo.selected
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-border hover:bg-accent'
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: algo.color }}
                />
                {algo.name}
                {algo.selected && <X className="w-3 h-3" />}
              </button>
            ))}
          </div>
        </div>

        {/* Performance Metrics Table */}
        <div className="mb-6 p-6 rounded-lg border bg-card">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-semibold mb-1">Performance Metrics</h2>
              <p className="text-sm text-muted-foreground">
                Comparing performance across all metrics
              </p>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-accent">
                <FileDown className="w-4 h-4" />
                CSV
              </button>
              <button className="flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg hover:bg-accent">
                <FileDown className="w-4 h-4" />
                PDF
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">
                    Algorithm
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    AUROC
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    AUPRC
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    F1 Score
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Precision
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Recall
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">
                    Early Precision
                  </th>
                </tr>
              </thead>
              <tbody>
                {metricsData.map((metric) => (
                  <tr key={metric.algorithm} className="border-b last:border-0 hover:bg-accent/50">
                    <td className="py-3 px-4 font-medium">{metric.algorithm}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.auroc}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.auprc}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.f1}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.precision}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">{metric.recall}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">
                      {metric.earlyPrecision}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* PR Curves */}
          <div className="p-6 rounded-lg border bg-card">
            <div className="mb-6">
              <h2 className="font-semibold mb-1">Precision-Recall Curves</h2>
              <p className="text-sm text-muted-foreground">Multi-algorithm overlay</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={prData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="recall"
                    label={{ value: 'Recall', position: 'insideBottom', offset: -5 }}
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <YAxis
                    label={{ value: 'Precision', angle: -90, position: 'insideLeft' }}
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="GENIE3" stroke="#A970FF" strokeWidth={2} />
                  <Line type="monotone" dataKey="PPCOR" stroke="#60a5fa" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="SINCERITIES"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* ROC Curves */}
          <div className="p-6 rounded-lg border bg-card">
            <div className="mb-6">
              <h2 className="font-semibold mb-1">ROC Curves</h2>
              <p className="text-sm text-muted-foreground">Receiver operating characteristic</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={rocData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis
                    dataKey="fpr"
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <YAxis
                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="GENIE3" stroke="#A970FF" strokeWidth={2} />
                  <Line type="monotone" dataKey="PPCOR" stroke="#60a5fa" strokeWidth={2} />
                  <Line
                    type="monotone"
                    dataKey="SINCERITIES"
                    stroke="#f59e0b"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Additional Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Enrichment */}
          <div className="p-6 rounded-lg border bg-card">
            <div className="mb-6">
              <h2 className="font-semibold mb-1">Top Motif Enrichment</h2>
              <p className="text-sm text-muted-foreground">
                Transcription factor binding site enrichment
              </p>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={enrichmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis type="number" tick={{ fill: 'var(--color-muted-foreground)' }} />
                  <YAxis
                    dataKey="category"
                    type="category"
                    tick={{ fill: 'var(--color-muted-foreground)' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'var(--color-card)',
                      border: '1px solid var(--color-border)',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="GENIE3" fill="#28D37C" />
                  <Bar dataKey="GRNBoost2" fill="#A970FF" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Similarity */}
          <div className="p-6 rounded-lg border bg-card">
            <div className="mb-6">
              <h2 className="font-semibold mb-1">Algorithm Similarity</h2>
              <p className="text-sm text-muted-foreground">
                Network prediction overlap (Jaccard index)
              </p>
            </div>
            <div className="space-y-4">
              {similarityData.map((item) => (
                <div key={item.pair}>
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-medium">{item.pair}</span>
                    <span className="font-mono">{item.similarity.toFixed(2)}</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${item.similarity * 100}%`,
                        backgroundColor: item.color,
                      }}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-6 p-3 rounded-lg bg-accent/50 border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> High similarity indicates algorithms predict overlapping
                  edge sets. Low similarity suggests complementary approaches.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
