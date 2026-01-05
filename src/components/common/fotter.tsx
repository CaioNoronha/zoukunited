"use client";

import { Facebook, Instagram } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="w-full bg-neutral-950">
      <div className="mx-auto w-full max-w-[2000px] px-6">
        <div className="h-px w-full bg-white/10" />
      </div>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-6 text-center">
        <div className="flex items-center justify-center gap-3 text-xs font-medium tracking-wide text-[#FAFAFA]">
          {t.footer.follow}
          <span className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/miamizoukfestival "
              className="text-[#FAFAFA] transition hover:text-white"
              aria-label="Instagram"
            >
              <Instagram className="h-4 w-4" />
            </a>
            <a
              href="https://www.facebook.com/pauloandluizazouk"
              className="text-[#FAFAFA] transition hover:text-white"
              aria-label="Facebook"
            >
              <Facebook className="h-4 w-4" />
            </a>
          </span>
        </div>
        <p className="mt-2 text-xs font-medium tracking-wide text-[#FAFAFA]">
          {t.footer.copyright}
        </p>
      </div>
    </footer>
  );
}
