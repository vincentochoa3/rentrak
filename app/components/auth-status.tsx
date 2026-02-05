"use client";

import { useSession, signOut } from "next-auth/react";

export function AuthStatus() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <p className="text-sm text-foreground/60">Checking session…</p>
    );
  }

  if (session?.user) {
    return (
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm text-foreground/80">
          Signed in as <span className="font-medium text-foreground">{session.user.email ?? session.user.name ?? "User"}</span>
        </p>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex gap-4 items-center flex-col">
      <a
        className="w-full rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-primary gap-2 hover:opacity-90 font-medium py-2.5"
        href="/login"
      >
        Login
      </a>
      <a
        className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium py-2.5 w-full"
        href="/signup"
      >
        Sign up
      </a>
    </div>
  );
}
