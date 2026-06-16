import { cn } from "@/lib/utils";

interface LEDBadgeProps {
  label: string;
  color?: "blue" | "red";
  className?: string;
}

export function LEDBadge({ label, color = "blue", className }: LEDBadgeProps) {
  void color; // color prop kept for API compatibility; badge is now neutral
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-normal tracking-wide",
        "bg-white/[0.05] text-arq-dim border border-white/[0.07]",
        className
      )}
    >
      {label}
    </span>
  );
}
