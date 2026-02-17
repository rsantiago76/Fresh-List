interface BadgeProps {
  variant?: 'primary' | 'accent' | 'secondary' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Badge({ 
  variant = 'neutral', 
  size = 'md',
  dot = false,
  children,
  className = ''
}: BadgeProps) {
  const baseStyles = 'inline-flex items-center gap-1.5 font-medium whitespace-nowrap transition-all duration-250';
  
  const variantStyles = {
    primary: `
      bg-gradient-to-br from-[var(--primary-100)] to-[var(--primary-200)]
      text-[var(--primary-700)]
      border border-[var(--primary-300)]
    `,
    accent: `
      bg-gradient-to-br from-[var(--accent-100)] to-[var(--accent-200)]
      text-[var(--accent-800)]
      border border-[var(--accent-300)]
    `,
    secondary: `
      bg-gradient-to-br from-[var(--secondary-100)] to-[var(--secondary-200)]
      text-[var(--secondary-700)]
      border border-[var(--secondary-300)]
    `,
    neutral: `
      bg-[var(--neutral-100)]
      text-[var(--neutral-700)]
      border border-[var(--neutral-200)]
    `,
  };
  
  const sizeStyles = {
    sm: 'h-5 px-2 text-[var(--text-xs)] rounded-[var(--radius-md)]',
    md: 'h-6 px-2.5 text-[var(--text-sm)] rounded-[var(--radius-lg)]',
    lg: 'h-8 px-3 text-[var(--text-base)] rounded-[var(--radius-xl)]',
  };

  const dotColor = {
    primary: 'bg-[var(--primary-500)]',
    accent: 'bg-[var(--accent-500)]',
    secondary: 'bg-[var(--secondary-500)]',
    neutral: 'bg-[var(--neutral-500)]',
  };
  
  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor[variant]}`} />}
      {children}
    </span>
  );
}
