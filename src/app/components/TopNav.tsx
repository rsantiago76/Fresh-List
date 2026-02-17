import { Bell, Search, User } from 'lucide-react';
import { Badge } from './Badge';

export function TopNav() {
  return (
    <header className="h-16 bg-white border-b border-[var(--neutral-200)] sticky top-0 z-20">
      <div className="h-full flex items-center justify-between px-6">
        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--neutral-400)]" />
            <input
              type="text"
              placeholder="Search grocery lists..."
              className="w-full h-10 pl-10 pr-4 bg-[var(--neutral-50)] border-2 border-transparent rounded-[var(--radius-xl)] text-[var(--text-sm)] transition-all duration-250 focus:outline-none focus:bg-white focus:border-[var(--primary-500)] focus:ring-4 focus:ring-[var(--primary-100)] hover:bg-[var(--neutral-100)]"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 rounded-[var(--radius-lg)] hover:bg-[var(--neutral-50)] transition-colors">
            <Bell className="w-5 h-5 text-[var(--text-secondary)]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[var(--secondary-500)] rounded-full" />
          </button>

          {/* User Menu */}
          <button className="flex items-center gap-3 px-3 py-2 rounded-[var(--radius-xl)] hover:bg-[var(--neutral-50)] transition-colors">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[var(--primary-400)] to-[var(--accent-500)] flex items-center justify-center text-white text-sm font-semibold">
              JD
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-[var(--text-sm)] font-medium">Jane Doe</p>
              <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">Pro Plan</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
