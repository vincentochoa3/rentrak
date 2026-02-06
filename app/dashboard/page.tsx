import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/prisma/user/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import AddPropertyModal from "./AddPropertyModal";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await getUser(session.user.id);

  if (!user) redirect("/login");

  return (
    <div className="flex flex-1 flex-col p-6 sm:p-8">
      <main className="flex-1 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-medium">Properties</h1>
          <AddPropertyModal />
        </div>
        {user.properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.properties.map((property) => (
              <div key={property.id}>{property.name}</div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-2 items-center justify-center">
            <FontAwesomeIcon
              icon={faBuilding}
              className="text-foreground/70 w-12 h-12 mb-2"
            />
            <p className="text-center text-foreground/70">
              No properties found
            </p>
            <p className="text-center text-foreground/70 flex items-center gap-3">
              Get started by clicking the
              <span>
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-foreground/70 w-4 h-4"
                />
              </span>
              icon above.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
