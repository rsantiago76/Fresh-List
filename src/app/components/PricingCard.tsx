import { motion } from 'motion/react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Check, LucideIcon } from 'lucide-react';

interface PricingCardProps {
  name: string;
  price: number | 'Free';
  period?: string;
  description: string;
  features: string[];
  icon: string;
  featured?: boolean;
  badge?: string;
  gradient?: string;
  ctaText?: string;
  delay?: number;
}

export function PricingCard({
  name,
  price,
  period = 'month',
  description,
  features,
  icon,
  featured = false,
  badge,
  gradient = 'from-[var(--primary-400)] to-[var(--primary-600)]',
  ctaText = 'Get Started',
  delay = 0,
}: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: featured ? -12 : -8, transition: { duration: 0.3 } }}
      className={`relative group ${featured ? 'z-10' : ''}`}
    >
      {/* Featured Plan Gradient Border & Glow */}
      {featured && (
        <>
          <motion.div
            className={`absolute -inset-1 bg-gradient-to-br ${gradient} rounded-[var(--radius-2xl)] opacity-75 blur-xl group-hover:opacity-100 transition-opacity duration-500`}
            animate={{
              scale: [1, 1.02, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <div className={`absolute -inset-[2px] bg-gradient-to-br ${gradient} rounded-[var(--radius-2xl)]`} />
        </>
      )}

      {/* Card Container */}
      <div
        className={`
          relative overflow-hidden p-8 bg-white rounded-[var(--radius-2xl)]
          ${featured 
            ? 'shadow-[var(--shadow-xl)]' 
            : 'border-2 border-[var(--neutral-200)] group-hover:border-[var(--neutral-300)] shadow-[var(--shadow-md)]'
          }
          group-hover:shadow-[var(--shadow-xl)] transition-all duration-500
        `}
      >
        {/* Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            initial={{ x: '-100%', skewX: -20 }}
            whileHover={{ x: '200%' }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />
        </div>

        {/* Background Decoration */}
        <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${gradient} opacity-5 rounded-full blur-3xl`} />

        {/* Content */}
        <div className="relative z-10">
          {/* Badge */}
          {badge && (
            <div className="mb-4">
              <Badge variant={featured ? 'accent' : 'neutral'} size="md">
                {badge}
              </Badge>
            </div>
          )}

          {/* Icon */}
          <div className="text-5xl mb-6">{icon}</div>

          {/* Plan Name */}
          <h3 className="text-[var(--text-2xl)] font-bold mb-2">{name}</h3>

          {/* Description */}
          <p className="text-[var(--text-sm)] text-[var(--text-secondary)] mb-6">
            {description}
          </p>

          {/* Price */}
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <motion.span
                className={`text-5xl font-bold ${featured ? `bg-gradient-to-br ${gradient} bg-clip-text text-transparent` : ''}`}
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: delay + 0.2 }}
              >
                {price === 'Free' ? 'Free' : `$${price}`}
              </motion.span>
              {price !== 'Free' && (
                <span className="text-[var(--text-base)] text-[var(--text-secondary)]">
                  /{period}
                </span>
              )}
            </div>
            {price === 'Free' && (
              <p className="text-[var(--text-xs)] text-[var(--text-tertiary)]">
                Forever free, no credit card required
              </p>
            )}
          </div>

          {/* CTA Button */}
          <Button
            variant={featured ? 'primary' : 'outline'}
            size="lg"
            fullWidth
          >
            {ctaText}
          </Button>

          {/* Features List */}
          <div className="mt-8 pt-8 border-t border-[var(--neutral-200)]">
            <p className="text-[var(--text-sm)] font-semibold mb-4">What's included:</p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: delay + 0.3 + index * 0.05 }}
                  className="flex items-start gap-3"
                >
                  <div className={`
                    mt-0.5 p-1 rounded-full flex-shrink-0
                    ${featured 
                      ? `bg-gradient-to-br ${gradient}` 
                      : 'bg-[var(--neutral-200)]'
                    }
                  `}>
                    <Check className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[var(--text-sm)] text-[var(--text-secondary)] leading-relaxed">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Decoration */}
        {featured && (
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${gradient}`} />
        )}
      </div>
    </motion.div>
  );
}