import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/prisma/user/query";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await getUser(session.user.id);

  if (!user) redirect("/login");

  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.name ||
    user.email ||
    "User";

  console.log(user);

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <main className="flex-1 flex flex-col gap-6">
        <h1 className="text-2xl font-medium">Properties</h1>
        {user.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.properties.map((property) => (
              <div key={property.id}>{property.name}</div>
            ))}
          </div>
        ) : (
          <p className="text-center text-foreground/70">No properties found</p>
        )}
      </main>
    </div>
  );
}
