import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  showCount?: boolean;
}

export default function Textarea({
  label,
  error,
  showCount = false,
  maxLength,
  value,
  id,
  required,
  className,
  ...props
}: TextareaProps) {
  const textareaId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${textareaId}-error`;
  const charCount = typeof value === "string" ? value.length : 0;

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-2">
        <label
          htmlFor={textareaId}
          className="block text-sm text-text-secondary font-medium"
        >
          {label}
          {required && <span className="text-accent ml-0.5">*</span>}
        </label>
        {showCount && maxLength && (
          <span className="text-xs text-text-muted">
            {charCount}/{maxLength}
          </span>
        )}
      </div>
      <textarea
        id={textareaId}
        required={required}
        maxLength={maxLength}
        value={value}
        className={cn(
          "form-input resize-none",
          error && "!border-error !shadow-[0_0_0_3px_var(--color-error-muted)]"
        )}
        aria-invalid={error ? "true" : undefined}
        aria-errormessage={error ? errorId : undefined}
        {...props}
      />
      {error && (
        <div id={errorId} className="form-error" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
