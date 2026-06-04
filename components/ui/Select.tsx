import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export default function Select({
  label,
  error,
  options,
  placeholder,
  id,
  required,
  className,
  ...props
}: SelectProps) {
  const selectId = id || label.toLowerCase().replace(/\s+/g, "-");
  const errorId = `${selectId}-error`;

  return (
    <div className={className}>
      <label
        htmlFor={selectId}
        className="block text-sm text-text-secondary mb-2 font-medium"
      >
        {label}
        {required && <span className="text-accent ml-0.5">*</span>}
      </label>
      <select
        id={selectId}
        required={required}
        className={cn(
          "form-input form-select",
          error && "!border-error !shadow-[0_0_0_3px_var(--color-error-muted)]"
        )}
        aria-invalid={error ? "true" : undefined}
        aria-errormessage={error ? errorId : undefined}
        {...props}
      >
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && (
        <div id={errorId} className="form-error" role="alert">
          <AlertCircle size={12} aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
