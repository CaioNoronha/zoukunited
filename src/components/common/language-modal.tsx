"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";
import { Children, cloneElement, isValidElement, type ReactNode } from "react";

type LanguageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function LanguageModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: LanguageModalProps) {
  const items = Children.map(children, (child) => {
    if (!isValidElement<{ className?: string }>(child)) return child;
    const existing = child.props.className ?? "";
    return cloneElement(child, {
      className: `${existing} w-full min-h-[52px] rounded-xl`,
    });
  });

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogOverlay className="bg-black/65 backdrop-blur-xl" />
      <DialogContent
        showCloseButton
        className="w-full max-w-3xl rounded-3xl border border-white/10 bg-neutral-950 px-6 py-8 text-white shadow-[0_0_80px_rgba(0,0,0,0.75)] sm:px-10"
      >
        <DialogTitle className="sr-only">
          {title ?? "Language selection"}
        </DialogTitle>
        {description && (
          <DialogDescription className="sr-only">
            {description}
          </DialogDescription>
        )}

        {(title || description) && (
          <div className="text-center">
            {title && (
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-2 text-sm text-white/70 sm:text-base">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="mt-6">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3 sm:gap-4">
            {items}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
