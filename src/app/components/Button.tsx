import { forwardRef } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md',
    fullWidth = false,
    children, 
    className = '',
    disabled = false,
    ...props 
  }, ref) => {
    const baseStyles = `
      inline-flex items-center justify-center font-medium 
      transition-all duration-300 
      disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
      active:translate-y-[1px]
      relative overflow-hidden
    `;
    
    const variantStyles = {
      primary: `
        bg-gradient-to-r from-[var(--primary-500)] via-[var(--accent-500)] to-[var(--primary-500)]
        bg-[length:200%_100%]
        text-white font-semibold
        shadow-lg shadow-[var(--primary-500)]/30
        hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[var(--primary-500)]/40
        focus-visible:ring-[var(--primary-500)]
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
        animate-gradient
      `,
      secondary: `
        bg-gradient-to-br from-slate-700 to-slate-900
        text-white font-semibold
        shadow-lg shadow-slate-900/30
        hover:-translate-y-0.5 hover:shadow-xl hover:shadow-slate-900/40
        focus-visible:ring-slate-700
        before:absolute before:inset-0 
        before:bg-gradient-to-t before:from-white/10 before:via-transparent before:to-white/5
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
      `,
      outline: `
        bg-white/80 backdrop-blur-md
        text-[var(--primary-700)] font-semibold
        border-2 border-[var(--primary-200)]
        shadow-md shadow-[var(--primary-100)]/50
        hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[var(--primary-200)]/50
        hover:border-[var(--primary-300)] hover:bg-white/95
        focus-visible:ring-[var(--primary-500)]
        before:absolute before:inset-0 
        before:bg-gradient-to-br before:from-[var(--primary-50)]/50 before:to-transparent
        before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
      `,
      ghost: `
        bg-transparent
        text-[var(--text-primary)] font-medium
        hover:bg-[var(--neutral-100)]
        active:bg-[var(--neutral-200)]
        focus-visible:ring-[var(--neutral-300)]
      `,
    };
    
    const sizeStyles = {
      sm: 'h-9 px-4 text-[var(--text-sm)] rounded-[var(--radius-lg)] gap-1.5',
      md: 'h-11 px-6 text-[var(--text-base)] rounded-[var(--radius-xl)] gap-2',
      lg: 'h-14 px-8 text-[var(--text-lg)] rounded-[var(--radius-xl)] gap-2.5',
    };
    
    const widthStyles = fullWidth ? 'w-full' : '';
    
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center justify-center gap-[inherit]">
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';
