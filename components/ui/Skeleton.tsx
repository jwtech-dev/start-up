import { cn } from "@/lib/utils";

interface SkeletonProps {
  variant?: "text" | "card" | "avatar" | "paragraph";
  className?: string;
  lines?: number;
}

const variantClasses = {
  text: "h-4 w-full",
  card: "h-48 w-full rounded-2xl",
  avatar: "h-20 w-20 rounded-2xl",
  paragraph: "",
};

export default function Skeleton({
  variant = "text",
  className,
  lines = 3,
}: SkeletonProps) {
  if (variant === "paragraph") {
    return (
      <div className={cn("space-y-3", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(
              "skeleton h-4 rounded",
              i === lines - 1 ? "w-3/4" : "w-full"
            )}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("skeleton", variantClasses[variant], className)}
    />
  );
}
