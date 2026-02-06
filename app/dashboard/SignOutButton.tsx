"use client";

import { signOut } from "next-auth/react";

export default function SignoutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="rounded-full border border-black/[.08] dark:border-white/[.145] px-4 py-2 text-sm font-medium hover:bg-foreground/5 transition-colors"
    >
      Sign out
    </button>
  );
}
