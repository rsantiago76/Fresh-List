import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
  glowColor: string;
  delay?: number;
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  gradient, 
  glowColor,
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="group relative"
    >
      {/* Gradient Glow Background */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-br ${gradient} rounded-[var(--radius-2xl)] opacity-0 blur-xl group-hover:opacity-70 transition-all duration-500`}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Card Container */}
      <div className="relative overflow-hidden p-8 bg-white rounded-[var(--radius-2xl)] border-2 border-[var(--neutral-200)] group-hover:border-transparent group-hover:shadow-[var(--shadow-xl)] transition-all duration-500">
        
        {/* Shine Animation Overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            initial={{ x: '-100%', skewX: -20 }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />
        </div>

        {/* Gradient Background Decoration */}
        <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl group-hover:opacity-10 transition-opacity duration-500`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon Container */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.5 }}
            className="relative mb-6"
          >
            <div className={`inline-flex p-4 rounded-[var(--radius-2xl)] bg-gradient-to-br ${gradient} shadow-lg group-hover:shadow-2xl transition-all duration-500`}>
              <Icon className="w-8 h-8 text-white" />
            </div>
            
            {/* Icon Glow */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${gradient} rounded-[var(--radius-2xl)] opacity-0 blur-xl group-hover:opacity-60`}
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>

          {/* Title */}
          <h3 className="mb-3 text-[var(--text-2xl)] font-bold group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500" 
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${glowColor} 0%, ${glowColor} 100%)` 
              }}>
            {title}
          </h3>

          {/* Description */}
          <p className="text-[var(--text-base)] text-[var(--text-secondary)] leading-relaxed">
            {description}
          </p>

          {/* Decorative Arrow */}
          <motion.div
            initial={{ x: 0, opacity: 0 }}
            whileHover={{ x: 5, opacity: 1 }}
            className="mt-6 flex items-center gap-2 text-[var(--text-sm)] font-medium"
            style={{ color: glowColor }}
          >
            <span>Learn more</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.div>
        </div>

        {/* Corner Accent */}
        <div className={`absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl ${gradient} opacity-5 rounded-tl-[var(--radius-2xl)]`} />
      </div>
    </motion.div>
  );
}
