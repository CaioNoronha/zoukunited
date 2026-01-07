"use client"

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

type AuthTabsProps = {
  className?: string;
  loginLabel?: string;
  signupLabel?: string;
};

const AUTH_TABS = [
  { value: "login", href: "/login" },
  { value: "signup", href: "/signup" },
] as const;

export function AuthTabs({
  className,
  loginLabel = "Log in",
  signupLabel = "Sign up",
}: AuthTabsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = useMemo(() => {
    if (pathname?.startsWith("/signup")) return "signup";
    return "login";
  }, [pathname]);

  return (
    <div className={cn("rounded-md bg-[#2b2d33] p-1", className)}>
      <Tabs
        value={activeTab}
        onValueChange={(value) => {
          const target = AUTH_TABS.find((tab) => tab.value === value);
          if (target) router.push(target.href);
        }}
      >
        <TabsList className="grid h-auto w-full grid-cols-2 gap-1 rounded-[6px] bg-transparent p-1 text-xs font-semibold tracking-[0.12em] text-white/60">
          <TabsTrigger
            value="login"
            className="rounded-[6px] px-4 py-2 text-center transition-all duration-300 ease-out data-[state=active]:bg-[#0a0a0a] data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            {loginLabel}
          </TabsTrigger>
          <TabsTrigger
            value="signup"
            className="rounded-[6px] px-4 py-2 text-center transition-all duration-300 ease-out data-[state=active]:bg-[#0a0a0a] data-[state=active]:text-white data-[state=active]:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
          >
            {signupLabel}
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
}
