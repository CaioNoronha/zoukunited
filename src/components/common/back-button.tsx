"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

type BackButtonProps = {
  className?: string;
  label?: string;
  href?: string;
  onClick?: () => void;
  variant?: "fixed" | "inline";
};

export function BackButton({
  className,
  label,
  href,
  onClick,
  variant = "fixed",
}: BackButtonProps) {
  const router = useRouter();
  const { t } = useTranslation();

  const handleClick = () => {
    onClick?.();
    if (href) {
      router.push(href);
      return;
    }
    router.back();
  };

  return (
    <button
      onClick={handleClick}
      className={cn(
        variant === "fixed"
          ? "fixed top-24 left-4 sm:left-6 md:left-12 xl:left-15 z-40"
          : "",
        "border border-[var(--ds-primary-1)] text-white bg-[var(--ds-primary-1)]/20",
        "hover:bg-[var(--ds-primary-1)]/35 backdrop-blur px-3 py-2 rounded-full shadow-lg",
        "transition-all duration-200 flex items-center gap-2",
        className
      )}
      aria-label="Back"
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-sm font-semibold">
        Back
      </span>
    </button>
  );
}
