"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface Tab {
  label: string;
  value: string;
}

interface AnimatedTabsProps {
  tabs: Tab[];
  value: string;
  onChange: (value: string) => void;
  layoutId?: string;
  variant?: "light" | "dark";
}

export function AnimatedTabs({
  tabs,
  value,
  onChange,
  layoutId,
  variant = "light",
}: AnimatedTabsProps) {
  const generatedId = useId();
  const underlineId = layoutId ?? generatedId;

  const activeClass =
    variant === "dark" ? "text-white font-bold" : "text-neutral-900 font-bold";
  const inactiveClass =
    variant === "dark"
      ? "text-white/70 hover:text-white"
      : "text-neutral-500 hover:text-neutral-800";

  return (
    <div className="relative flex gap-4 sm:gap-8 md:gap-16">
      {tabs.map((tab) => {
        const isActive = value === tab.value;
        return (
          <button
            key={tab.value}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative py-2 text-base transition-colors cursor-pointer",
              isActive ? activeClass : inactiveClass
            )}
          >
            {tab.label}
            {isActive && (
              <motion.div
                layoutId={underlineId}
                className="absolute bottom-0 left-0 h-[2px] w-full bg-[var(--ds-secondary-pure)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
