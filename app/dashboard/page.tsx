import { getServerSession } from "next-auth";
import Link from "next/link";
import Image from "next/image";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import DashboardAuthStatus from "./dashboard-auth-status";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      firstName: true,
      lastName: true,
      image: true,
      createdAt: true,
      updatedAt: true,
      properties: {
        select: {
          id: true,
          name: true,
          address: true,
          city: true,
          state: true,
          tenants: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              rentAmount: true,
              amountOwed: true,
              payments: {
                select: {
                  id: true,
                  amount: true,
                  paidAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!user) redirect("/login");

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.name ||
    user.email ||
    "User";

  console.log(user);

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
          Welcome back, {displayName}. This is your protected dashboard.
        </p>
      </main>
    </div>
  );
}
