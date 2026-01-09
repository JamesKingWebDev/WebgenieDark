import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, ChevronDown, Bell } from 'lucide-react';
import { useState } from 'react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const navLinks = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    items: [
      { label: 'Overview', path: '/dashboard' },
      { label: 'Metrics Summary', path: '/dashboard/metrics' },
      { label: 'System Stats', path: '/dashboard/stats' },
      { label: 'Activity Log', path: '/dashboard/activity' },
    ],
  },
  {
    label: 'Datasets',
    path: '/datasets',
    items: [
      { label: 'All Datasets', path: '/datasets' },
      { label: 'Organism View', path: '/datasets/organism' },
      { label: 'Dataset Metadata', path: '/datasets/metadata' },
      { label: 'Upload Dataset', path: '/upload' },
    ],
  },
  {
    label: 'Compare',
    path: '/compare',
    items: [
      { label: 'Algorithm Comparison', path: '/compare' },
      { label: 'Metric Explorer', path: '/compare/metrics' },
      { label: 'PR/ROC Overlay', path: '/compare/roc' },
      { label: 'Benchmark History', path: '/compare/history' },
    ],
  },
  {
    label: 'Explorer',
    path: '/explorer',
    items: [
      { label: 'Network Explorer', path: '/explorer' },
      { label: 'Gene Search', path: '/explorer/search' },
      { label: 'Module Discovery', path: '/explorer/modules' },
      { label: 'Graph Layouts', path: '/explorer/layouts' },
    ],
  },
  {
    label: 'Upload',
    path: '/upload',
    items: [
      { label: 'Upload Predictions', path: '/upload' },
      { label: 'Job Queue', path: '/upload/queue' },
      { label: 'File Templates', path: '/upload/templates' },
      { label: 'Validation Reports', path: '/upload/validation' },
    ],
  },
];

export function Navigation() {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container flex h-16 items-center px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-8">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm leading-none">WebGenie</span>
            <span className="text-xs text-muted-foreground leading-none">Benchmarking</span>
          </div>
        </Link>

        {/* Navigation Links with Dropdowns */}
        <div className="flex items-center gap-1 flex-1">
          {navLinks.map((link) => (
            <DropdownMenu
              key={link.path}
              open={openDropdown === link.label}
              onOpenChange={(open) => setOpenDropdown(open ? link.label : null)}
            >
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center gap-1 px-3 py-2 text-sm rounded-md transition-colors hover:bg-accent hover:text-accent-foreground ${
                    isActive(link.path)
                      ? 'text-foreground font-medium'
                      : 'text-muted-foreground'
                  }`}
                >
                  {link.label}
                  <ChevronDown className="w-3 h-3" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {link.items.map((item) => (
                  <DropdownMenuItem key={item.path} asChild>
                    <Link
                      to={item.path}
                      className={`w-full ${
                        location.pathname === item.path ? 'bg-accent' : ''
                      }`}
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search datasets, algorithms..."
              className="w-64 px-3 py-1.5 text-sm bg-input-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full hover:bg-accent transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full"></span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-accent transition-colors group"
            aria-label="Toggle theme"
          >
            <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-medium">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}
