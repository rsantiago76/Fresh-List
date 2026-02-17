interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
}

export function Input({ 
  label,
  error,
  helperText,
  icon,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-400)]">
            {icon}
          </div>
        )}
        
        <input
          className={`
            w-full h-12 px-4 ${icon ? 'pl-11' : ''}
            bg-white
            border-2 border-[var(--neutral-200)]
            rounded-[var(--radius-xl)]
            text-[var(--text-base)] text-[var(--text-primary)]
            placeholder:text-[var(--neutral-400)]
            transition-all duration-250
            focus:outline-none
            focus:border-[var(--primary-500)]
            focus:ring-4 focus:ring-[var(--primary-100)]
            hover:border-[var(--neutral-300)]
            disabled:bg-[var(--neutral-50)]
            disabled:cursor-not-allowed
            ${error ? 'border-[var(--secondary-500)] focus:border-[var(--secondary-500)] focus:ring-[var(--secondary-100)]' : ''}
            ${className}
          `}
          {...props}
        />
      </div>
      
      {error && (
        <p className="mt-1.5 text-[var(--text-sm)] text-[var(--secondary-600)]">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-[var(--text-sm)] text-[var(--text-tertiary)]">
          {helperText}
        </p>
      )}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export function Textarea({ 
  label,
  error,
  helperText,
  className = '',
  ...props 
}: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-[var(--text-sm)] font-medium text-[var(--text-secondary)]">
          {label}
        </label>
      )}
      
      <textarea
        className={`
          w-full min-h-[120px] px-4 py-3
          bg-white
          border-2 border-[var(--neutral-200)]
          rounded-[var(--radius-xl)]
          text-[var(--text-base)] text-[var(--text-primary)]
          placeholder:text-[var(--neutral-400)]
          transition-all duration-250
          focus:outline-none
          focus:border-[var(--primary-500)]
          focus:ring-4 focus:ring-[var(--primary-100)]
          hover:border-[var(--neutral-300)]
          disabled:bg-[var(--neutral-50)]
          disabled:cursor-not-allowed
          resize-vertical
          ${error ? 'border-[var(--secondary-500)] focus:border-[var(--secondary-500)] focus:ring-[var(--secondary-100)]' : ''}
          ${className}
        `}
        {...props}
      />
      
      {error && (
        <p className="mt-1.5 text-[var(--text-sm)] text-[var(--secondary-600)]">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="mt-1.5 text-[var(--text-sm)] text-[var(--text-tertiary)]">
          {helperText}
        </p>
      )}
    </div>
  );
}
