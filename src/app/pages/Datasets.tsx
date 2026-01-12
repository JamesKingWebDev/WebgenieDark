import { Filter, Search, Database, Download, Activity } from 'lucide-react';

const datasets = [
  {
    id: 1,
    name: 'HSC_Synthetic_100',
    organism: 'Mouse',
    cells: 500,
    genes: 100,
    networks: 12,
    description: 'Synthetic hematopoietic stem cell data',
  },
  {
    id: 2,
    name: 'mESC_hematopoietic',
    organism: 'Mouse',
    cells: 1654,
    genes: 3934,
    networks: 10,
    description: 'Mouse embryonic stem cells differentiating to blood cells',
  },
  {
    id: 3,
    name: 'hESC_definitive_endoderm',
    organism: 'Human',
    cells: 3396,
    genes: 16834,
    networks: 8,
    description: 'Human embryonic stem cell differentiation',
  },
  {
    id: 4,
    name: 'mDC_GSE48968',
    organism: 'Mouse',
    cells: 383,
    genes: 18215,
    networks: 6,
    description: 'Mouse dendritic cell maturation',
  },
  {
    id: 5,
    name: 'mESC_GSE65525',
    organism: 'Mouse',
    cells: 933,
    genes: 24175,
    networks: 5,
    description: 'Mouse embryonic stem cell cultures',
  },
  {
    id: 6,
    name: 'hESC_GSE75748',
    organism: 'Human',
    cells: 1018,
    genes: 16708,
    networks: 7,
    description: 'Human embryonic stem cell time series',
  },
];

const stats = [
  { label: 'Total Datasets', value: '24', change: '+2 this month' },
  { label: 'Total Cells', value: '47K', change: 'Across all datasets' },
  { label: 'Organisms', value: '5', change: 'Mouse, Human, Yeast' },
  { label: 'Networks Available', value: '156', change: 'Ground truth & predicted' },
];

export function Datasets() {
  return (
    <div className="min-h-screen py-20 pb-0">
      <div className="container px-4 mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">All Datasets</h1>
          <p className="text-muted-foreground">
            Browse and explore single-cell RNA-seq datasets for benchmarking
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-lg border bg-card">
              <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.change}</div>
            </div>
          ))}
        </div>

        {/* Filters & Search */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search datasets..."
              className="w-full pl-10 pr-4 py-2 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-accent transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        {/* Dataset Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {datasets.map((dataset) => (
            <div
              key={dataset.id}
              className="p-6 rounded-lg border bg-card hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Database className="w-6 h-6 text-primary" />
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded hover:bg-accent transition-colors opacity-0 group-hover:opacity-100">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h3 className="font-semibold mb-1">{dataset.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>

              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 text-xs rounded bg-secondary/10 text-secondary font-medium">
                  {dataset.organism}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-xs">
                <div>
                  <div className="text-muted-foreground">Cells</div>
                  <div className="font-semibold">{dataset.cells.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Genes</div>
                  <div className="font-semibold">{dataset.genes.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Networks</div>
                  <div className="font-semibold">{dataset.networks}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* -------------------- LANDINGPAGE FOOTER -------------------- */}
      <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-white">WebGenie</div>
                  <div className="text-xs text-gray-400">Benchmarking Platform</div>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Research-grade GRN inference benchmarking and visualization for evaluating
              gene regulatory network inference algorithms on single-cell data.
              </p>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Platform</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="/dashboard" className="hover:text-white transition-colors">Dashboard</a></li>
                <li><a href="/datasets" className="hover:text-white transition-colors">Datasets</a></li>
                <li><a href="/compare" className="hover:text-white transition-colors">Algorithms</a></li>
                <li><a href="/upload" className="hover:text-white transition-colors">Upload</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Resources</h5>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="https://github.com/Murali-group/Beeline" className="hover:text-white transition-colors">GitHub</a></li>
                <li><a href="https://github.com/ukanduchimeremezejames/WebgenieDark" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h5 className="text-white mb-4">Subscribe</h5>
              <p className="text-sm text-gray-400 mb-2">Get updates about new datasets and algorithms</p>
              <form className="flex gap-2">
                <input type="email" placeholder="Email" className="flex-1 p-2 rounded-lg border border-gray-700 bg-gray-800 text-white text-sm" />
                <button type="submit" className="px-4 py-2 bg-purple-600 rounded-lg text-white text-sm hover:bg-purple-700 transition-colors">Subscribe</button>
              </form>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-6 text-center text-sm">
            © 2026 WebGenie | Built on the BEELINE Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
