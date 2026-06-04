import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  error?: string;
  helperText?: string;
}

export default function Input({
  label,
  error,
  helperText,
  id,
  required,
  className,
  ...props
}: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${inputId}-error`;
  const helperId = `${inputId}-helper`;

  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className="block text-sm text-text-secondary mb-2 font-medium"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <input
        id={inputId}
        required={required}
        className={cn(
          "form-input",
          error && "!border-error !shadow-[0_0_0_3px_var(--color-error-muted)]"
        )}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={
          [error && errorId, helperText && helperId].filter(Boolean).join(" ") || undefined
        }
        aria-errormessage={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <div id={errorId} className="form-error" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <p id={helperId} className="mt-1.5 text-xs text-text-muted">
          {helperText}
        </p>
      )}
    </div>
  );
}
