import { Link } from 'react-router-dom';
import { BookOpen, ClipboardList, Users, IndianRupee, ArrowLeft } from 'lucide-react';

const stats = [
  { label: 'Total Tests', value: '5', icon: ClipboardList, color: 'bg-primary/10 text-primary' },
  { label: 'Total Books', value: '4', icon: BookOpen, color: 'bg-accent/10 text-accent' },
  { label: 'Students', value: '128', icon: Users, color: 'bg-success/10 text-success' },
  { label: 'Revenue', value: '₹24,500', icon: IndianRupee, color: 'bg-destructive/10 text-destructive' },
];

const adminLinks = [
  { label: 'Manage Tests', path: '/admin/tests', icon: ClipboardList },
  { label: 'Manage Books', path: '/admin/books', icon: BookOpen },
  { label: 'Student Results', path: '/admin/results', icon: Users },
];

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="gradient-primary px-4 pb-6 pt-12">
        <Link to="/profile" className="flex items-center gap-1 text-primary-foreground/70 text-sm mb-3">
          <ArrowLeft className="h-4 w-4" /> Back
        </Link>
        <h1 className="text-xl font-bold text-primary-foreground">Admin Panel</h1>
        <p className="mt-1 text-sm text-primary-foreground/70">Manage your platform</p>
      </header>

      <div className="mx-auto max-w-lg px-4 -mt-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {stats.map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card p-4 shadow-sm">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${s.color} mb-2`}>
                <s.icon className="h-5 w-5" />
              </div>
              <p className="text-xl font-bold text-foreground">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="space-y-2">
          {adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="flex items-center gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:bg-secondary"
            >
              <link.icon className="h-5 w-5 text-primary" />
              <span className="flex-1 text-sm font-semibold text-foreground">{link.label}</span>
              <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
