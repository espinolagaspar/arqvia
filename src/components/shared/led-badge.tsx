import { cn } from "@/lib/utils";

interface LEDBadgeProps {
  label: string;
  color?: "blue" | "red";
  className?: string;
}

export function LEDBadge({ label, color = "blue", className }: LEDBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        color === "blue"
          ? "bg-ef-blue/10 text-ef-blue border border-ef-blue/20"
          : "bg-ef-red/10 text-ef-red border border-ef-red/20",
        className
      )}
    >
      <span
        className={cn(
          "w-1.5 h-1.5 rounded-full animate-led-pulse",
          color === "blue" ? "bg-ef-blue" : "bg-ef-red"
        )}
      />
      {label}
    </span>
  );
}
