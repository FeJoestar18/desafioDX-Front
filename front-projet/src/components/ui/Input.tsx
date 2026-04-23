import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  description?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, description, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        <label className="text-sm font-semibold text-text-primary tracking-tight">
          {label}
        </label>
        <input
          ref={ref}
          className={`bg-[#F1F5F9] rounded-lg px-4 py-[10px] text-sm text-text-primary placeholder:text-text-secondary outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/30 transition-all ${
            error ? 'border-danger/50 focus:border-danger focus:ring-danger/20' : ''
          } ${className}`}
          {...props}
        />
        {description && !error && <span className="text-xs font-medium text-text-secondary mt-1">{description}</span>}
        {error && <span className="text-xs font-medium text-danger mt-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = 'Input';
