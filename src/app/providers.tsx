"use client";

import { LanguageProvider } from "@/hooks/useLanguage";


export function Providers({ children }: { children: React.ReactNode }) {


  return <LanguageProvider>{children}</LanguageProvider>;


}