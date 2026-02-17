import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium 
   transition-all duration-300 
   disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed
   outline-none focus-visible:ring-2 focus-visible:ring-offset-2
   active:translate-y-[1px]
   relative overflow-hidden
   [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        default: `
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
        destructive: `
          bg-gradient-to-br from-red-500 to-red-700
          text-white font-semibold
          shadow-lg shadow-red-500/30
          hover:-translate-y-0.5 hover:shadow-xl hover:shadow-red-500/40
          focus-visible:ring-red-500
          before:absolute before:inset-0 
          before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
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
        ghost: `
          bg-transparent
          text-[var(--text-primary)] font-medium
          hover:bg-[var(--neutral-100)]
          active:bg-[var(--neutral-200)]
          focus-visible:ring-[var(--neutral-300)]
        `,
        link: `
          text-[var(--primary-600)] underline-offset-4 
          hover:underline hover:text-[var(--primary-700)]
          focus-visible:ring-[var(--primary-500)]
        `,
      },
      size: {
        default: "h-9 px-4 py-2 text-sm rounded-lg",
        sm: "h-8 px-3 text-xs rounded-md",
        lg: "h-11 px-6 text-base rounded-xl",
        xl: "h-14 px-8 text-lg rounded-xl",
        icon: "size-9 rounded-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button(
  {
    className,
    variant,
    size,
    asChild = false,
    children,
    ...props
  }: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
      asChild?: boolean;
    }
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-[inherit]">
        {children}
      </span>
    </Comp>
  );
}

export { Button, buttonVariants };
