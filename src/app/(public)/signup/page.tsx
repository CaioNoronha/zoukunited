"use client"

import { Suspense } from "react";
import { Montserrat } from "next/font/google";

import { SignInForm } from "@/components/forms/signin-form";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export default function SignUpPage() {
  return (
    <div
      className={`${montserrat.className} relative isolate flex min-h-full w-full items-center bg-[#0a0a0a] px-6 py-8 text-white`}
    >
      <Suspense fallback={null}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
