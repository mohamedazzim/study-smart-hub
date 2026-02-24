import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const mockResults = [
  { id: '1', studentName: 'Rahul Sharma', testTitle: 'JEE Main Mathematics', score: 86, total: 120, date: '2026-02-20' },
  { id: '2', studentName: 'Priya Patel', testTitle: 'Sample Aptitude Test', score: 32, total: 40, date: '2026-02-19' },
  { id: '3', studentName: 'Amit Kumar', testTitle: 'JEE Advanced Chemistry', score: 68, total: 120, date: '2026-02-18' },
  { id: '4', studentName: 'Sneha Gupta', testTitle: 'JEE Main Mathematics', score: 102, total: 120, date: '2026-02-17' },
  { id: '5', studentName: 'Vikash Singh', testTitle: 'NEET Biology Full Test', score: 150, total: 200, date: '2026-02-16' },
];

const AdminResults = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur-lg px-4 py-4">
        <div className="mx-auto flex max-w-lg items-center gap-2">
          <Link to="/admin" className="text-muted-foreground">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-lg font-bold text-foreground">Student Results</h1>
        </div>
      </header>

      <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
        {mockResults.map((r) => {
          const pct = Math.round((r.score / r.total) * 100);
          return (
            <div key={r.id} className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-foreground">{r.studentName}</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{r.testTitle}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
                <div className="text-right">
                  <span className="text-lg font-bold text-primary">{r.score}</span>
                  <span className="text-xs text-muted-foreground">/{r.total}</span>
                  <p className="text-xs text-muted-foreground">{pct}%</p>
                </div>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                <div
                  className="h-full rounded-full gradient-primary transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminResults;
