"use client";

import { Facebook, Instagram } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { useLanguage } from "@/hooks/useLanguage";
import { useState } from "react";
import { CustomButton } from "@/components/common/custom-button";
import LanguageModal from "@/components/common/language-modal";
import { ScrollToTopInstantly } from "@/components/utils/scroll-to-top";

type LanguageCode = "en" | "pt" | "es";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português (Brasil)" },
  { code: "es", label: "Español" },
];

export default function Footer() {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const displayLanguage =
    languages.find((lang) => lang.code === language)?.label || "Language";

  return (
    <footer className="w-full bg-neutral-950">
      <div className="mx-auto w-full max-w-[2000px] px-6">
        <div className="h-px w-full bg-white/10" />
      </div>
      <div className="mx-auto w-full max-w-[1600px] px-6 py-6">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-1 items-center gap-4 text-center md:grid-cols-[1fr_auto_1fr]">
            <span className="hidden md:block" />
            <p className="text-xs font-medium tracking-wide text-[#FAFAFA]">
              {t.footer.copyright}
            </p>
            <div className="flex justify-center md:justify-end">
              <CustomButton
                variant="neutral"
                onClick={() => setIsOpen(true)}
                className="border border-[#FAFAFA] bg-white/10 text-white hover:bg-white/20"
              >
                {displayLanguage}
              </CustomButton>
            </div>
          </div>

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
        </div>
      </div>
      <LanguageModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={t.footer?.language}
        description={t.footer?.languageDescription}
      >
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => {
              setLanguage(lang.code);
              ScrollToTopInstantly();
              window.location.reload();
              setIsOpen(false);
            }}
            className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 ${
              lang.code === language ? "border-[#f29b0f] bg-[#f29b0f]/15" : ""
            }`}
          >
            <span>{lang.label}</span>
          </button>
        ))}
      </LanguageModal>
    </footer>
  );
}
