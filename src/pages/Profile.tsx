import AppLayout from '@/components/AppLayout';
import { User, Mail, LogOut, ChevronRight, Shield, CreditCard, HelpCircle } from 'lucide-react';

const Profile = () => {
  const menuItems = [
    { label: 'My Purchases', icon: CreditCard, href: '#' },
    { label: 'Help & Support', icon: HelpCircle, href: '#' },
    { label: 'Admin Panel', icon: Shield, href: '/admin' },
  ];

  return (
    <AppLayout>
      <div className="px-4 pt-12 pb-4">
        <h1 className="text-xl font-bold text-foreground">Profile</h1>
      </div>

      {/* User Info */}
      <div className="mx-4 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary">
          <User className="h-6 w-6 text-primary-foreground" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-foreground">Student User</h2>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Mail className="h-3.5 w-3.5" />
            student@example.com
          </p>
        </div>
      </div>

      {/* Menu */}
      <div className="mx-4 mt-4 overflow-hidden rounded-lg border border-border bg-card">
        {menuItems.map((item, i) => (
          <a
            key={item.label}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-secondary ${
              i !== menuItems.length - 1 ? 'border-b border-border' : ''
            }`}
          >
            <item.icon className="h-5 w-5 text-muted-foreground" />
            <span className="flex-1 text-sm font-medium text-foreground">{item.label}</span>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </a>
        ))}
      </div>

      {/* Logout */}
      <div className="mx-4 mt-4">
        <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive transition-colors hover:bg-destructive/10">
          <LogOut className="h-4 w-4" />
          Log Out
        </button>
      </div>
    </AppLayout>
  );
};

export default Profile;
