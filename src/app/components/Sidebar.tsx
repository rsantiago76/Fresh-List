import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  BarChart3, 
  Settings,
  ChevronRight,
  LucideIcon
} from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'lists', label: 'Grocery Lists', icon: ShoppingCart },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <aside className="w-64 h-screen bg-white border-r border-[var(--neutral-200)] sticky top-0 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--neutral-200)]">
        <h2 className="text-[var(--text-2xl)] font-bold bg-gradient-to-r from-[var(--primary-600)] to-[var(--accent-600)] bg-clip-text text-transparent">
          FreshList
        </h2>
        <p className="text-[var(--text-xs)] text-[var(--text-secondary)] mt-1">
          Smart Grocery Habits
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`
                relative w-full flex items-center gap-3 px-4 py-3 rounded-[var(--radius-xl)]
                transition-all duration-250 text-left group
                ${isActive 
                  ? 'bg-gradient-to-br from-[var(--primary-50)] to-[var(--accent-50)] text-[var(--primary-700)]' 
                  : 'text-[var(--text-secondary)] hover:bg-[var(--neutral-50)] hover:text-[var(--text-primary)]'
                }
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-[var(--primary-500)] to-[var(--accent-500)] rounded-r-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              
              <Icon className={`w-5 h-5 ${isActive ? 'text-[var(--primary-600)]' : ''}`} />
              <span className="font-medium flex-1">{item.label}</span>
              
              {isActive && (
                <ChevronRight className="w-4 h-4 text-[var(--primary-600)]" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-[var(--neutral-200)]">
        <div className="p-4 bg-gradient-to-br from-[var(--primary-50)] to-[var(--accent-50)] rounded-[var(--radius-xl)] border border-[var(--primary-200)]">
          <div className="text-2xl mb-2">🎉</div>
          <p className="text-[var(--text-sm)] font-semibold text-[var(--primary-700)] mb-1">
            Going Strong!
          </p>
          <p className="text-[var(--text-xs)] text-[var(--text-secondary)]">
            14 day streak of healthy choices
          </p>
        </div>
      </div>
    </aside>
  );
}
