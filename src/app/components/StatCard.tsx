import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  gradient: string;
  delay?: number;
}

export function StatCard({ 
  title, 
  value, 
  change, 
  changeType = 'neutral',
  icon: Icon,
  gradient,
  delay = 0
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative overflow-hidden p-6 bg-white rounded-[var(--radius-2xl)] border-2 border-[var(--neutral-200)] hover:border-[var(--primary-300)] hover:shadow-[var(--shadow-lg)] transition-all duration-250">
        {/* Background Gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 opacity-10 blur-2xl bg-gradient-to-br ${gradient}`} />
        
        <div className="relative">
          {/* Icon */}
          <div className={`inline-flex p-3 rounded-[var(--radius-xl)] bg-gradient-to-br ${gradient} mb-4 shadow-md`}>
            <Icon className="w-5 h-5 text-white" />
          </div>

          {/* Title */}
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mb-2">
            {title}
          </p>

          {/* Value */}
          <div className="flex items-end gap-2 mb-2">
            <motion.h3 
              className="text-[var(--text-4xl)] font-bold"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
            >
              {value}
            </motion.h3>
          </div>

          {/* Change Indicator */}
          {change && (
            <div className={`
              inline-flex items-center gap-1 px-2 py-1 rounded-[var(--radius-md)] text-[var(--text-xs)] font-medium
              ${changeType === 'positive' ? 'bg-[var(--primary-50)] text-[var(--primary-700)]' : ''}
              ${changeType === 'negative' ? 'bg-[var(--secondary-50)] text-[var(--secondary-700)]' : ''}
              ${changeType === 'neutral' ? 'bg-[var(--neutral-100)] text-[var(--neutral-700)]' : ''}
            `}>
              {changeType === 'positive' && '↗'}
              {changeType === 'negative' && '↘'}
              {change}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
