interface CardProps {
  children: React.ReactNode;
  variant?: 'default' | 'gradient' | 'bordered';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
}

export function Card({ 
  children, 
  variant = 'default',
  padding = 'md',
  className = '',
  onClick
}: CardProps) {
  const baseStyles = 'rounded-[var(--radius-2xl)] transition-all duration-250';
  
  const variantStyles = {
    default: `
      bg-white
      shadow-[var(--shadow-md)]
      hover:shadow-[var(--shadow-lg)]
    `,
    gradient: `
      bg-gradient-to-br from-white to-[var(--neutral-50)]
      shadow-[var(--shadow-md)]
      hover:shadow-[var(--shadow-lg)]
    `,
    bordered: `
      bg-white
      border-2 border-[var(--neutral-200)]
      hover:border-[var(--primary-300)]
      hover:shadow-[var(--shadow-sm)]
    `,
  };
  
  const paddingStyles = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
    xl: 'p-12',
  };
  
  const interactiveStyles = onClick ? 'cursor-pointer active:scale-[0.99]' : '';
  
  return (
    <div 
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${interactiveStyles} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
