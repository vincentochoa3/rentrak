import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import DashboardAuthStatus from "./dashboard-auth-status";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/login");

  return (
    <div className="min-h-screen flex flex-col p-6 sm:p-8">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-foreground/80 hover:text-foreground"
        >
          <Image src="/rentrak-logo.svg" alt="Rentrak" width={28} height={28} />
          <span className="text-lg font-medium">rentrak</span>
        </Link>
        <DashboardAuthStatus />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center gap-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-foreground/70 text-center max-w-md">
          Welcome back, {session.user.email ?? session.user.name ?? "User"}.
          This is your protected dashboard.
        </p>
      </main>
    </div>
  );
}
