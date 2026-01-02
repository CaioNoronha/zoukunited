"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useLanguage } from "@/hooks/useLanguage";
import { ScrollToTopInstantly } from "@/components/utils/scroll-to-top";
import LanguageModal from "@/components/common/language-modal";
import { useTranslation } from "@/hooks/useTranslation";

type LanguageCode = "en" | "pt" | "es";

const languages: { code: LanguageCode; label: string }[] = [
  { code: "en", label: "English" },
  { code: "pt", label: "Português (Brasil)" },
  { code: "es", label: "Español" },
];

export default function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [languageOpen, setLanguageOpen] = React.useState(false);
  const pathname = usePathname();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();

  const links = [
    { label: "About us", href: "/about" },
    { label: "Festivals", href: "/event-page" },
    { label: "Classes", href: "/classes" },
    { label: "Log in", href: "/login" },
  ];

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-neutral-950/90 backdrop-blur-md">
      {/* Navbar */}
      <div className="relative mx-auto flex w-full max-w-[1600px] items-center justify-between px-4 py-4 sm:px-8">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo-zouk-united.png"
              alt="Zouk United"
              width={180}
              height={48}
              priority
              className="h-7 w-auto select-none sm:h-8"
            />
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden items-center gap-6 sm:flex">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-6 lg:gap-8">
              {links.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-2 py-2 text-sm font-medium tracking-wide transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="relative inline-flex w-fit">
            <button
              type="button"
              onClick={() => setLanguageOpen(true)}
              className="flex h-8 w-16 items-center justify-between rounded-full px-2 text-xs font-semibold uppercase text-white/70 hover:text-white"
            >
              <span>{language.toUpperCase()}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mobile Button */}
        <div className="z-[70] sm:hidden">
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-white/70 transition"
          >
            <AnimatePresence mode="wait" initial={false}>
              {menuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <X className="h-7 w-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="h-7 w-7" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
              exit: { opacity: 0, y: -30, transition: { duration: 0.4 } },
            }}
            className="fixed left-0 top-0 z-[60] flex h-screen w-screen flex-col bg-neutral-950/95 px-8 py-20 backdrop-blur-md sm:hidden"
          >
            <div className="flex flex-col gap-8">
              {links.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        ease: [0.4, 0, 0.2, 1],
                      },
                    },
                    exit: {
                      opacity: 0,
                      y: 10,
                      transition: { duration: 0.3 },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={`text-3xl font-medium tracking-wide transition-colors ${
                      pathname === item.href
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="w-fit">
                <button
                  type="button"
                  onClick={() => setLanguageOpen(true)}
                  className="flex h-8 w-16 items-center justify-between rounded-full px-2 text-xs font-semibold uppercase text-white/70"
                >
                  <span>{language.toUpperCase()}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <LanguageModal
        isOpen={languageOpen}
        onClose={() => setLanguageOpen(false)}
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
              setLanguageOpen(false);
              setMenuOpen(false);
            }}
            className={`flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 ${
              lang.code === language ? "border-[#F39200] bg-[#F39200]/15" : ""
            }`}
          >
            <span>{lang.label}</span>
          </button>
        ))}
      </LanguageModal>
    </div>
  );
}
