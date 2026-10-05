"use client";

import { useEffect, useState } from "react";
import { useSite } from "@/components/layout/site-context";
import { cn } from "@/lib/utils";

/** Pastilla fija: aparece al pasar el 70% del alto del viewport. */
export function WhatsAppButton() {
  const { menuOpen, waUrl } = useSite();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const visible = scrolled && !menuOpen;

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hablar por WhatsApp"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-[clamp(16px,2.4vw,32px)] right-[clamp(16px,2.4vw,32px)] z-40 inline-flex h-11 items-center gap-[10px] bg-arq-ink px-[18px] text-[14px] text-arq-bone shadow-[0_6px_24px_rgba(26,25,23,0.18)] transition-[opacity,visibility,background-color] duration-200 hover:bg-arq-wood",
        visible ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <span className="size-[6px] rounded-full bg-[#7FAE8A]" />
      WhatsApp
    </a>
  );
}
