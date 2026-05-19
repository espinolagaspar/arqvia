"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  accentColor?: "blue" | "red";
}

export function SectionHeader({
  eyebrow,
  title,
  titleAccent,
  description,
  align = "center",
  className,
  accentColor = "blue",
}: SectionHeaderProps) {
  const accentClass = accentColor === "blue" ? "text-ef-blue" : "text-ef-red";
  const ledLineClass =
    accentColor === "blue" ? "led-line" : "led-line-red";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <div className={cn("w-6 h-px", ledLineClass === "led-line" ? "bg-ef-blue" : "bg-ef-red")} />
          <span
            className={cn(
              "text-xs font-medium tracking-widest uppercase",
              accentClass
            )}
          >
            {eyebrow}
          </span>
          <div className={cn("w-6 h-px", ledLineClass === "led-line" ? "bg-ef-blue" : "bg-ef-red")} />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-ef-white">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className={accentClass}>{titleAccent}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-4 text-base sm:text-lg text-ef-dim leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </motion.div>
  );
}
