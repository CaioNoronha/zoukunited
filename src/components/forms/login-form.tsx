"use client"

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signInWithEmail, signInWithGoogle } from "@/services/auth";
import {
  getFirebaseLoginMessage,
  getValidationMessage,
} from "@/lib/login-errors";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasValidationError, setHasValidationError] = useState(false);
  const showError = Boolean(error || hasValidationError);

  const resolveAuthError = (message: string) =>
    message.startsWith("auth/")
      ? getFirebaseLoginMessage(message)
      : message;

  useEffect(() => {
    if (user) {
      router.replace(redirect ?? "/home");
    }
  }, [redirect, router, user]);

  const handleEmailLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    const trimmedEmail = email.trim();

    if (!trimmedEmail || !password) {
      setHasValidationError(true);
      setError(getValidationMessage("missingCredentials"));
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(trimmedEmail)) {
      setHasValidationError(true);
      setError(getValidationMessage("invalidEmail"));
      return;
    }

    setHasValidationError(false);
    setLoading(true);
    const { error: signInError } = await signInWithEmail(
      trimmedEmail,
      password
    );
    setLoading(false);

    if (signInError) {
      setError(resolveAuthError(signInError));
      setHasValidationError(true);
      return;
    }

    router.replace(redirect ?? "/home");
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setHasValidationError(false);
    setLoading(true);
    const { error: signInError } = await signInWithGoogle();
    setLoading(false);

    if (signInError) {
      setError(resolveAuthError(signInError));
      return;
    }

    router.replace(redirect ?? "/home");
  };

  return (
    <>
      <div className="mx-auto flex w-full max-w-5xl items-center justify-center">
        <div className="fade-up mt-16 w-full max-w-xl rounded-[18px] border border-white/10 bg-transparent px-8 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="rounded-md border border-white/10 bg-[#24262b] p-1">
            <div className="grid grid-cols-2 gap-1 rounded-[6px] bg-[#2b2d33] p-1 text-xs font-semibold tracking-[0.12em]">
              <Link
                href="/login"
                className="rounded-[6px] bg-[#0a0a0a] px-4 py-2 text-center text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-[6px] px-4 py-2 text-center text-white/60 hover:text-white"
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

          <form className="mt-6 space-y-4" onSubmit={handleEmailLogin} noValidate>
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                aria-invalid={showError}
                disabled={loading}
                className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                aria-invalid={showError}
                disabled={loading}
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

            {showError ? (
              <p className="text-sm text-[#ffb357]" role="alert">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="h-11 w-full rounded-md bg-[#f29b0f] text-sm font-semibold text-black shadow-[0_10px_30px_rgba(242,155,15,0.35)] transition hover:bg-[#ffb357] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Signing in..." : "Log in"}
            </button>

            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-white/35">
              <span className="h-px flex-1 bg-white/15" />
              OR
              <span className="h-px flex-1 bg-white/15" />
            </div>

            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleLogin}
              className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/15 bg-[#0a0a0a] text-sm font-semibold text-white/85 transition hover:bg-[#0f0f0f] hover:text-white disabled:cursor-not-allowed disabled:opacity-70"
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
    </>
  );
}
