"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { LogOut, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/services/auth";

export default function NavBar() {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const router = useRouter();

  const displayName =
    user?.displayName?.trim() ||
    user?.providerData?.[0]?.displayName?.trim() ||
    (user?.email ? user.email.split("@")[0] : "") ||
    "Usuário";
  const initials = displayName.slice(0, 2).toUpperCase();
  const photoUrl = user?.photoURL || user?.providerData?.[0]?.photoURL || undefined;

  const handleLogout = async () => {
    await signOut();
    setMenuOpen(false);
    router.push("/login");
  };

  const links = [
    { label: t.navbar.aboutus, href: "/about" },
    { label: t.navbar.festivals, href: "/event-page" },
    { label: t.navbar.classes, href: "/classes" },
    ...(user ? [] : [{ label: t.navbar.login, href: "/login" }]),
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
        <div className="hidden items-center gap-6 sm:flex sm:ml-auto sm:-mr-28">
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
          {!loading && user ? (
            <div className="ml-2 flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button type="button" className="rounded-full">
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarImage
                        src={photoUrl}
                        alt={displayName}
                      />
                      <AvatarFallback className="text-xs font-semibold text-white">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" sideOffset={8}>
                  <DropdownMenuItem onSelect={handleLogout}>
                    <LogOut className="text-[#f29b0f]" />
                    {t.navbar.logout}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : null}
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
              {!loading && user ? (
                <motion.div
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
                  className="flex items-center gap-3"
                >
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button type="button" className="flex items-center gap-3">
                        <Avatar className="h-9 w-9 border border-white/20">
                          <AvatarImage
                            src={photoUrl}
                            alt={displayName}
                          />
                          <AvatarFallback className="text-xs font-semibold text-white">
                            {initials}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-lg font-medium text-white">
                          {displayName}
                        </span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" sideOffset={8}>
                      <DropdownMenuItem onSelect={handleLogout}>
                        <LogOut className="text-[#f29b0f]" />
                        {t.navbar.logout}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </motion.div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
