"use client"

import Link from "next/link";
import { Montserrat } from "next/font/google";

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
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="fade-up mt-16 w-full max-w-xl rounded-[18px] border border-white/10 bg-transparent px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="rounded-md border border-white/10 bg-[#24262b] p-1">
            <div className="grid grid-cols-2 gap-1 rounded-[6px] bg-[#2b2d33] p-1 text-xs font-semibold uppercase tracking-[0.2em]">
              <Link
                href="/login"
                className="rounded-[6px] px-4 py-2 text-center text-white/60 hover:text-white"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-[6px] bg-[#0a0a0a] px-4 py-2 text-center text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                Sign up
              </Link>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-left">
            <p className="text-sm text-white/55">
              Join the rhythm, feel the connection - Brazilian Zouk energy
              awaits you!
            </p>
          </div>

          <form className="mt-6 space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  City
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select your city"
                    className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 pr-9 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                    ▾
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  Phone number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-[0.2em] text-[#FAFAFA]">
                  Confirm password
                </label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
            </div>

            <div className="space-y-2 text-xs text-white/70">
              <p className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/70">
                  ✓
                </span>
                Must be at least 6 characters long
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/70">
                  ✓
                </span>
                Must include at least one uppercase letter
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/70">
                  ✓
                </span>
                Must include at least one lowercase letter
              </p>
              <p className="flex items-center gap-2">
                <span className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-white/20 text-[10px] text-white/70">
                  ✓
                </span>
                Must include at least one number
              </p>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-md bg-[#f29b0f] text-sm font-semibold text-black shadow-[0_10px_30px_rgba(242,155,15,0.35)] transition hover:bg-[#ffb357]"
            >
              Create account
            </button>

            <p className="text-xs text-white/60">
              By creating an account, you agree to our{" "}
              <Link href="/terms" className="text-[#f29b0f] hover:text-[#ffb357]">
                Terms & Services.
              </Link>
            </p>
          </form>
        </div>
      </div>
      <style jsx>{`
        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
        @keyframes fadeUp {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
