import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import TestCard from '@/components/TestCard';
import { mockTests } from '@/data/mockData';
import { Search } from 'lucide-react';

const Index = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<string>('All');

  const subjects = ['All', ...new Set(mockTests.map((t) => t.subject))];

  const filtered = mockTests.filter((t) => {
    const matchSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || t.subject === filter;
    return matchSearch && matchFilter;
  });

  return (
    <AppLayout>
      {/* Header */}
      <div className="gradient-primary px-4 pb-6 pt-12">
        <h1 className="text-xl font-bold text-primary-foreground">Explore Tests</h1>
        <p className="mt-1 text-sm text-primary-foreground/70">
          Prepare smarter with mock tests
        </p>
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-primary-foreground/10 px-3 py-2.5 backdrop-blur">
          <Search className="h-4 w-4 text-primary-foreground/60" />
          <input
            type="text"
            placeholder="Search tests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 bg-transparent text-sm text-primary-foreground placeholder:text-primary-foreground/40 outline-none"
          />
        </div>
      </div>

      {/* Subject filters */}
      <div className="flex gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {subjects.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === s
                ? 'gradient-primary text-primary-foreground'
                : 'bg-secondary text-secondary-foreground'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Test list */}
      <div className="flex flex-col gap-3 px-4 pb-4">
        {filtered.length === 0 ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            No tests found
          </div>
        ) : (
          filtered.map((test) => (
            <TestCard key={test.id} test={test} />
          ))
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
