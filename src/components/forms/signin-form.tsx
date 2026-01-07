"use client"

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { useAuth } from "@/hooks/useAuth";
import { signUpWithEmail } from "@/services/auth";
import { saveUserProfile } from "@/services/user-profile";
import { getFirebaseLoginMessage } from "@/lib/login-errors";
import { useTranslation } from "@/hooks/useTranslation";

export function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const { user } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasValidationError, setHasValidationError] = useState(false);
  const showError = Boolean(error || hasValidationError);
  const { t } = useTranslation();
  const passwordRules = {
    minLength: password.length >= 6,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
  };
  const allPasswordRulesMet = Object.values(passwordRules).every(Boolean);
  const isConfirmMatch = confirmPassword.length > 0 && password === confirmPassword;

  const renderPasswordRule = (isMet: boolean, label: string) => (
    <p className={`flex items-center gap-2 ${isMet ? "text-[#f29b0f]" : "text-white/70"}`}>
      <span
        className={`relative inline-flex h-3.5 w-3.5 items-center justify-center rounded-full border ${
          isMet ? "border-[#f29b0f]" : "border-white/30"
        }`}
      >
        {isMet ? (
          <span className="text-[10px] font-bold text-[#f29b0f]">✓</span>
        ) : (
          <span className="h-1 w-1 rounded-full bg-white/60" />
        )}
      </span>
      {label}
    </p>
  );

  const resolveAuthError = (message: string) =>
    message.startsWith("auth/")
      ? getFirebaseLoginMessage(message)
      : message;

  useEffect(() => {
    if (user) {
      router.replace(redirect ?? "/home");
    }
  }, [redirect, router, user]);

  const handleSignUp = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!firstName || !lastName || !city || !phone || !email || !password) {
      setHasValidationError(true);
      setError("Please fill in all required fields.");
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setHasValidationError(true);
      setError("Please enter a valid email address.");
      return;
    }

    if (!allPasswordRulesMet) {
      setHasValidationError(true);
      setError("Password must meet all requirements.");
      return;
    }

    if (password !== confirmPassword) {
      setHasValidationError(true);
      setError("Passwords do not match.");
      return;
    }

    setHasValidationError(false);
    setLoading(true);
    const { error: signUpError } = await signUpWithEmail(email.trim(), password);

    if (signUpError) {
      setLoading(false);
      setError(resolveAuthError(signUpError));
      setHasValidationError(true);
      return;
    }

    try {
      await saveUserProfile({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone.trim(),
        city: city.trim(),
        country: "",
        categories: [],
      });
    } catch (profileError) {
      setLoading(false);
      setHasValidationError(true);
      setError(
        profileError instanceof Error
          ? profileError.message
          : "Could not save your profile."
      );
      return;
    }

    setLoading(false);
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
              {t.sigin.info.message}
            </p>
          </div>

          <form className="mt-6 space-y-4" onSubmit={handleSignUp} noValidate>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.firstName}
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(event) => setFirstName(event.target.value)}
                  aria-invalid={showError}
                  disabled={loading}
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.lastName}
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(event) => setLastName(event.target.value)}
                  aria-invalid={showError}
                  disabled={loading}
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
            </div>

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

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.city}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Select your city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    aria-invalid={showError}
                    disabled={loading}
                    className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 pr-9 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                    ▾
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.phone}
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  aria-invalid={showError}
                  disabled={loading}
                  className="h-11 w-full rounded-md border border-white/15 bg-[#0a0a0a] px-3 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.password}
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
              <div className="space-y-2">
                <label className="text-xs font-semibold tracking-[0.12em] text-[#FAFAFA]">
                  {t.sigin.field.confirmPassword}
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    aria-invalid={showError}
                    disabled={loading}
                    className={`h-11 w-full rounded-md border bg-[#0a0a0a] px-3 pr-10 text-sm text-white outline-none transition focus:border-[#f29b0f]/70 focus:ring-2 focus:ring-[#f29b0f]/25 ${
                      isConfirmMatch ? "border-[#f29b0f]" : "border-white/15"
                    }`}
                  />
                  {isConfirmMatch ? (
                    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#f29b0f]">
                      ✓
                    </span>
                  ) : null}
                </div>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              {renderPasswordRule(
                passwordRules.minLength,
                t.sigin.passwordRules.firstRule
              )}
              {renderPasswordRule(
                passwordRules.hasUppercase,
                t.sigin.passwordRules.secondRule
              )}
              {renderPasswordRule(
                passwordRules.hasLowercase,
                t.sigin.passwordRules.thirdRule
              )}
              {renderPasswordRule(
                passwordRules.hasNumber,
                t.sigin.passwordRules.fourthRule
              )}
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
              {loading ? t.sigin.info.loading : t.sigin.button.createAccount}
            </button>

            <p className="text-xs text-white/60">
              {t.sigin.info.agreement}{" "}
              <Link href="/terms" className="text-[#f29b0f] hover:text-[#ffb357]">
                {t.sigin.info.termsAndServices}
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
    </>
  );
}
