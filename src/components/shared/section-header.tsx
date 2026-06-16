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
  void accentColor; // reserved — accent color kept neutral across the refactor

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn(
        "mb-16",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-5",
            align === "center" ? "justify-center" : "justify-start"
          )}
        >
          <div className="w-5 h-px bg-arq-dim/30" />
          <span className="text-xs font-normal tracking-[0.16em] uppercase text-arq-dim/70">
            {eyebrow}
          </span>
          <div className="w-5 h-px bg-arq-dim/30" />
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.025em] text-arq-white leading-[1.1]">
        {title}
        {titleAccent && (
          <>
            {" "}
            <span className="font-semibold">{titleAccent}</span>
          </>
        )}
      </h2>

      {description && (
        <p className="mt-5 text-base sm:text-lg text-arq-dim leading-relaxed max-w-2xl mx-auto font-light">
          {description}
        </p>
      )}
    </motion.div>
  );
}
