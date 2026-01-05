"use client"

import Link from "next/link";
import { Montserrat } from "next/font/google";

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

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center">
        <div className="fade-up mt-16 w-full max-w-lg rounded-[18px] border border-white/10 bg-transparent px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="rounded-md border border-white/10 bg-[#24262b] p-1">
            <div className="grid grid-cols-2 gap-1 rounded-[6px] bg-[#2b2d33] p-1 text-xs font-semibold uppercase tracking-[0.2em]">
              <button
                type="button"
                className="rounded-[6px] bg-[#0a0a0a] px-4 py-2 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                Log in
              </button>
              <button
                type="button"
                className="rounded-[6px] px-4 py-2 text-white/60 hover:text-white"
              >
                Sign up
              </button>
            </div>
          </div>

          <div className="mt-5 space-y-2 text-left">
            <p className="text-sm text-white/55">
              Join the rhythm, feel the connection - Brazilian Zouk energy
              awaits you!
            </p>
          </div>

          <form className="mt-6 space-y-4">
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

            <div className="flex items-center justify-between text-xs text-[#FAFAFA]">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 appearance-none rounded-[3px] border border-[#f29b0f] bg-transparent checked:bg-[#f29b0f] checked:border-[#f29b0f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f29b0f]/40"
                />
                Remember me
              </label>
              <Link
                href="/forgot-password"
                className="text-[#f29b0f] hover:text-[#ffb357]"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="h-11 w-full rounded-md bg-[#f29b0f] text-sm font-semibold text-black shadow-[0_10px_30px_rgba(242,155,15,0.35)] transition hover:bg-[#ffb357]"
            >
              Log in
            </button>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/35">
              <span className="h-px flex-1 bg-white/15" />
              OR
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <button
              type="button"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-[#0a0a0a] text-sm font-semibold text-white/85 transition hover:bg-[#0f0f0f] hover:text-white"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 48 48"
                className="h-4 w-4"
              >
                <path
                  fill="#FFC107"
                  d="M43.6 20.5h-1.8V20H24v8h11.3C33.6 32.1 29.2 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 6.5 28.9 4.5 24 4.5 12.7 4.5 3.5 13.7 3.5 25S12.7 45.5 24 45.5 44.5 36.3 44.5 25c0-1.5-.2-3-.6-4.5z"
                />
                <path
                  fill="#FF3D00"
                  d="M6.3 14.7l6.6 4.8C14.5 16.1 19 13 24 13c2.8 0 5.3 1 7.2 2.7l5.7-5.7C33.5 6.5 28.9 4.5 24 4.5c-7.1 0-13.1 3.9-17.7 10.2z"
                />
                <path
                  fill="#4CAF50"
                  d="M24 45.5c5.1 0 9.7-1.9 13.2-5l-6.1-5c-1.7 1.1-3.8 1.8-7.1 1.8-5.1 0-9.4-3.4-10.9-8.1l-6.6 5.1C10.8 41.7 16.9 45.5 24 45.5z"
                />
                <path
                  fill="#1976D2"
                  d="M43.6 20.5h-1.8V20H24v8h11.3c-1.1 3.1-3.4 5.3-6.2 6.8l6.1 5C38.8 36.9 44.5 31.8 44.5 25c0-1.5-.2-3-.6-4.5z"
                />
              </svg>
              Continue with Google
            </button>
          </form>
        </div>
      </div>
      <style jsx>{`
        .float-slow {
          animation: float 14s ease-in-out infinite;
        }
        .float-fast {
          animation: float 10s ease-in-out infinite;
        }
        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-18px);
          }
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
