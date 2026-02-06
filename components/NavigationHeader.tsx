import Link from "next/link";
import React from "react";
import Image from "next/image";
import SignoutButton from "@/app/dashboard/SignOutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export default async function NavigationHeader() {
  const session = await getServerSession(authOptions);

  if (session) {
    return (
      <header className="flex items-center justify-between bg-slate-800 p-4 fixed top-0 z-10">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
        >
          <Image src="/rentrak-logo.svg" alt="Rentrak" width={28} height={28} />
          <span className="text-lg font-medium">rentrak</span>
        </Link>
        <SignoutButton />
      </header>
    );
  }
}
