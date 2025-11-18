"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();

  const links = [
    { label: t.navbar.classes, href: "/classes" },
    { label: t.navbar.events, href: "/events" },
    { label: t.navbar.about, href: "/about" },
    { label: t.navbar.login, href: "/login" }
  ];

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-gradient-to-b from-black via-black/50 to-transparent backdrop-blur-sm">
      {/* Navbar */}
      <div className="relative max-w-[1600px] mx-auto w-full px-4 sm:px-8 py-3 sm:py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/icons/zoukunited_logo.png"
              alt="Zouk United"
              width={120}
              height={40}
              priority
              className="h-7 sm:h-8 w-auto select-none"
            />
          </Link>
        </div>

        {/* Menu Desktop */}
        <div className="hidden sm:flex flex-1 justify-end pr-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-8 xl:gap-24 lg:gap-16 md:gap-12">
              {links.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <Link
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium tracking-wide transition-colors ${
                      pathname === item.href
                        ? "text-[var(--ds-secondary-pure)]"
                        : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Mobile Button */}
        <div className="sm:hidden z-[70]">
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white hover:text-[var(--ds-secondary-pure)] transition"
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
                  <X className="w-7 h-7" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Menu className="w-7 h-7" />
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
            className="fixed top-0 left-0 h-screen w-screen sm:hidden bg-gradient-to-b from-black/90 via-black/70 to-black/50 backdrop-blur-md z-[60] flex flex-col px-8 py-20"
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
                        ? "text-[var(--ds-secondary-pure)]"
                        : "text-white hover:text-[var(--ds-secondary-pure)]"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
