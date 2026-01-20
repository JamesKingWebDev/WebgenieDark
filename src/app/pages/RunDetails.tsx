import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Search, Filter } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge2 } from './Badge';
import { Input } from '../components/ui/input';
import { DataTable } from './DataTable';

const columns = [
    { 
      key: 'source', 
      label: 'Source Gene',
      sortable: true,
      render: (val: string) => <span className="font-mono text-purple-600">{val}</span>
    },
    { 
      key: 'target', 
      label: 'Target Gene',
      sortable: true,
      render: (val: string) => <span className="font-mono text-gray-700">{val}</span>
    },
    { 
      key: 'score', 
      label: 'Confidence Score',
      sortable: true,
      render: (val: number) => (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden max-w-[100px]">
            <div 
              className="h-full bg-gradient-to-r from-purple-400 to-purple-600"
              style={{ width: `${val * 100}%` }}
            />
          </div>
          <span className="text-sm">{val.toFixed(3)}</span>
        </div>
      )
    },
    { 
      key: 'type', 
      label: 'Edge Type',
      render: (val: string) => (
        <Badge2 variant={val === 'activation' ? 'success' : 'warning'}>
          {val}
        </Badge2>
      )
    },
    { 
      key: 'validated', 
      label: 'Validated',
      render: (val: boolean) => (
        val ? 
          <Badge2 variant="success">✓ Yes</Badge2> : 
          <Badge2 variant="default">Predicted</Badge2>
      )
    }
  ];

const prData = Array.from({ length: 30 }, (_, i) => ({
  recall: i / 29,
  precision: 0.95 - (i / 29) * 0.4 - Math.random() * 0.08,
}));

const rocData = Array.from({ length: 30 }, (_, i) => ({
  fpr: i / 29,
  tpr: i / 29 + 0.3 * Math.sin((i / 29) * Math.PI),
}));

const topEdges = [
  { source: 'SOX2', target: 'NANOG', score: 0.947, type: 'activation', validated: true },
  { source: 'OCT4', target: 'SOX2', score: 0.923, type: 'activation', validated: true },
  { source: 'NANOG', target: 'KLF4', score: 0.891, type: 'activation', validated: true },
];

export function RunDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [topK, setTopK] = useState('500');
  const [threshold, setThreshold] = useState(0.7);
  const [edgeFilter, setEdgeFilter] = useState('both');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">

        {/* Back */}
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/dashboard')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        {/* Header */}
        <Card className="p-6">
  <h3 className="text-foreground mb-1">Precision–Recall Curve</h3>
  <p className="text-sm text-muted-foreground mb-4">
    AUPRC: 0.847
  </p>

  <ResponsiveContainer width="100%" height={300}>
    <LineChart
      data={prData}
      margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
    >
      <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

      <XAxis
        dataKey="recall"
        type="number"
        domain={[0, 1]}
        tick={{ fontSize: 12 }}
        stroke="currentColor"
        label={{
          value: 'Recall',
          position: 'insideBottom',
          offset: -10,
        }}
      />

      <YAxis
        type="number"
        domain={[0, 1]}
        tick={{ fontSize: 12 }}
        stroke="currentColor"
        label={{
          value: 'Precision',
          angle: -90,
          position: 'insideLeft',
        }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: 'hsl(var(--background))',
          border: '1px solid hsl(var(--border))',
          borderRadius: '0.5rem',
        }}
        labelFormatter={(v) => `Recall: ${v.toFixed(2)}`}
        formatter={(v: number) => [v.toFixed(3), 'Precision']}
      />

      <Line
        type="monotone"
        dataKey="precision"
        stroke="hsl(var(--primary))"
        strokeWidth={3}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  </ResponsiveContainer>
</Card>


        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* Controls */}
          {/* <Card className="p-6 lg:col-span-1 sticky top-24 h-fit"> */}
          <Card className="p-6 bg-card/95 backdrop-blur">
            <h3 className="text-foreground mb-4 flex items-center gap-2">
              <Filter className="w-4 h-4" /> Controls
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-foreground mb-2 block">Top-K</label>
                <select
                  value={topK}
                  onChange={(e) => setTopK(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                >
                  <option value="100">Top 100</option>
                  <option value="500">Top 500</option>
                  <option value="1000">Top 1000</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-foreground mb-2 block">
                  Threshold: {threshold.toFixed(2)}
                </label>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  value={threshold}
                  onChange={(e) => setThreshold(+e.target.value)}
                  className="w-full"
                />
              </div>

              <div>
                <label className="text-sm text-foreground mb-2 block">
                  Search Gene
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                    placeholder="SOX2, NANOG..."
                  />
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </Card>

          {/* Charts */}
          <div className="lg:col-span-3 space-y-6">
            <Card className="p-6">
              <h3 className="text-foreground mb-2">Precision-Recall Curve</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={prData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="recall" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line
                    dataKey="precision"
                    stroke="hsl(var(--primary))"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            <Card className="p-6">
              <h3 className="text-foreground mb-4">Top Predicted Edges</h3>
              <DataTable columns={columns}  data={topEdges} />
            </Card>
          </div>
        </div>
        <Card className="p-6 mb-6">
  <h3 className="text-foreground mb-4">Run Metrics</h3>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    {[
      { label: 'AUPRC', value: '0.847' },
      { label: 'AUROC', value: '0.923' },
      { label: 'F1 Score', value: '0.782' },
      { label: 'Early Prec', value: '0.891' },
      { label: 'Runtime', value: '252s' },
    ].map(({ label, value }) => (
      <div
        key={label}
        className="rounded-lg border border-border bg-muted/40 px-4 py-3 text-center"
      >
        <p className="text-xs uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="mt-1 text-xl font-semibold text-foreground">
          {value}
        </p>
      </div>
    ))}
  </div>
</Card>

      </div>
    </div>
  );
}
