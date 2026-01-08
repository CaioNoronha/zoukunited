"use client"

import { Suspense } from "react";
import { Montserrat } from "next/font/google";

import { LoginForm } from "@/components/forms/login-form";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function LoginPage() {
  return (
    <div
      className={`${montserrat.className} relative isolate min-h-full w-full bg-[#0a0a0a] px-6 pb-6 pt-24 text-white`}
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
