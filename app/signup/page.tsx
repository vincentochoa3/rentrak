"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

function handleGoogleSignup() {
  // TODO: implement Google sign-up (e.g. NextAuth with Google provider)
  console.log("Sign up with Google");
}

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO: implement signup (e.g. NextAuth, custom API + hash password)
    console.log("Signup", { firstName, lastName, email, password });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 sm:p-8">
      <Link
        href="/"
        className="absolute top-6 left-6 flex items-center gap-2 text-foreground/80 hover:text-foreground"
      >
        <Image src="/rentrak-logo.svg" alt="Rentrak" width={28} height={28} />
        <span className="text-lg font-medium">rentrak</span>
      </Link>

      <div className="w-full max-w-[380px]">
        <h1 className="text-2xl font-medium text-center mb-1">
          Create an account
        </h1>
        <p className="text-foreground/70 text-center text-sm mb-8">
          Get started with rentrak
        </p>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">
                First name
              </span>
              <input
                name="firstName"
                type="text"
                autoComplete="given-name"
                placeholder="Jane"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-foreground/90">
                Last name
              </span>
              <input
                name="lastName"
                type="text"
                autoComplete="family-name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors"
              />
            </label>
          </div>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">
              Email
            </span>
            <input
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors"
            />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-sm font-medium text-foreground/90">
              Password
            </span>
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 dark:border-white/15 bg-white/5 placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/30 transition-colors"
            />
          </label>
          <button
            type="submit"
            className="w-full py-2.5 rounded-full bg-primary font-medium hover:opacity-90 transition-opacity"
          >
            Create account
          </button>
        </form>

        <div className="flex items-center my-6 gap-3">
          <span className="flex-1 border-t border-black/10 dark:border-white/15" />
          <span className="text-xs text-foreground/50 whitespace-nowrap">
            or continue with
          </span>
          <span className="flex-1 border-t border-black/10 dark:border-white/15" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          className="w-full flex items-center justify-center gap-2.5 py-2.5 rounded-xl border border-black/10 dark:border-white/15 bg-transparent font-medium hover:bg-foreground/5 transition-colors"
        >
          <GoogleIcon className="w-5 h-5" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-foreground/60 mt-8">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-foreground hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}
