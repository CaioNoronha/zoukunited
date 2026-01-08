"use client";

import { Dialog, DialogContent, DialogOverlay, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import {
  ReactNode,
  Children,
  isValidElement,
  cloneElement,
} from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function LanguageModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: ModalProps) {
  if (typeof document === "undefined") return null;

  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    const existing = (child.props as { className?: string }).className ?? "";
    return cloneElement(child as React.ReactElement<{ className?: string }>, {
      className: `${existing} w-full h-16 text-base rounded-xl`,
    });
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/65 backdrop-blur-2xl" />
      <DialogContent
        showCloseButton
        className="
          w-full max-w-5xl
          rounded-3xl
          border border-[var(--ds-primary-1)]
          bg-[var(--ds-neutral-6)]
          shadow-[0_0_80px_rgba(0,0,0,0.8)]
          px-6 sm:px-10 py-8 sm:py-8
          flex flex-col gap-6
          min-h-[460px]
          text-white
        "
      >
        <DialogTitle className="sr-only">{title ?? "Language selection"}</DialogTitle>
        {description && <DialogDescription className="sr-only">{description}</DialogDescription>}

        {(title || description) && (
          <div className="text-center flex flex-col gap-3">
            {title && (
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                {title}
              </h1>
            )}
            {description && (
              <p className="text-white/70 text-sm sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="w-full flex-1 flex items-start justify-center">
          <div className="w-full max-w-4xl mx-auto grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4 sm:gap-5 justify-items-center place-items-stretch place-content-start px-2 sm:px-4 pb-4">
            {items}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
