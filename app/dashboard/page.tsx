import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { redirect } from "next/navigation";
import { getUser } from "@/prisma/user/query";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCirclePlus,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";
import AddPropertyModal from "./AddPropertyModal";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  const user = await getUser(session.user.id);

  if (!user) redirect("/login");

  return (
    <div className="flex flex-1 flex-col sm:p-8 max-w-6xl mx-auto w-full">
      <main className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-medium">Properties</h1>
          <AddPropertyModal />
        </div>
        {user.properties.length > 0 ? (
          <div className="flex flex-col">
            {user.properties.map((property, index) => (
              <div
                key={property.id}
                className={`w-full flex items-center justify-between px-6 py-5 hover:bg-foreground/5 transition-colors border-black/10 dark:border-white/15 ${index === user.properties.length - 1 ? "" : "border-b"}`}
              >
                <div>
                  <p className="font-medium">{property.name}</p>
                  <p className="text-foreground/70 text-sm">
                    {property.tenants.length} tenant
                    {property.tenants.length === 1 ? "" : "s"}
                  </p>
                </div>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="text-foreground/70"
                  size="lg"
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-2 items-center justify-center">
            <FontAwesomeIcon
              icon={faFolderOpen}
              className="text-foreground/70 mb-2"
              size="4x"
            />
            <p className="text-center text-foreground/70">
              No properties found
            </p>
            <p className="text-center text-foreground/70">
              Get started using the{" "}
              <span className="inline-flex align-middle">
                <FontAwesomeIcon
                  icon={faCirclePlus}
                  className="text-foreground/70"
                />
              </span>{" "}
              icon above.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
