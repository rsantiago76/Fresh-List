import { motion } from 'motion/react';

interface DonutChartProps {
  fresh: number;
  moderate: number;
  processed: number;
}

export function DonutChart({ fresh, moderate, processed }: DonutChartProps) {
  const total = fresh + moderate + processed;
  
  if (total === 0) {
    return (
      <div className="w-48 h-48 mx-auto flex items-center justify-center">
        <div className="w-full h-full rounded-full border-8 border-[var(--neutral-200)]" />
      </div>
    );
  }

  const freshPercent = (fresh / total) * 100;
  const moderatePercent = (moderate / total) * 100;
  const processedPercent = (processed / total) * 100;

  // Calculate stroke dash array for each segment
  const circumference = 2 * Math.PI * 45; // radius = 45
  
  const freshDash = (freshPercent / 100) * circumference;
  const moderateDash = (moderatePercent / 100) * circumference;
  const processedDash = (processedPercent / 100) * circumference;

  return (
    <div className="relative w-48 h-48 mx-auto">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--neutral-100)"
          strokeWidth="10"
        />

        {/* Fresh segment */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--primary-500)"
          strokeWidth="10"
          strokeDasharray={`${freshDash} ${circumference}`}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${freshDash} ${circumference}` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        {/* Moderate segment */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--accent-500)"
          strokeWidth="10"
          strokeDasharray={`${moderateDash} ${circumference}`}
          strokeDashoffset={-freshDash}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${moderateDash} ${circumference}` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />

        {/* Processed segment */}
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke="var(--secondary-500)"
          strokeWidth="10"
          strokeDasharray={`${processedDash} ${circumference}`}
          strokeDashoffset={-(freshDash + moderateDash)}
          strokeLinecap="round"
          initial={{ strokeDasharray: `0 ${circumference}` }}
          animate={{ strokeDasharray: `${processedDash} ${circumference}` }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        />
      </svg>

      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center"
        >
          <p className="text-3xl font-bold text-[var(--primary-600)]">{Math.round(freshPercent)}%</p>
          <p className="text-xs text-[var(--text-secondary)]">Fresh</p>
        </motion.div>
      </div>
    </div>
  );
}
