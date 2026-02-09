import React from "react";
import { getProperty } from "@/prisma/property/query";
import { redirect } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCirclePlus,
} from "@fortawesome/free-solid-svg-icons";
import { faFolderOpen } from "@fortawesome/free-regular-svg-icons";

export default async function PropertyTenantsPage({
  params,
}: {
  params: { propertyId: string };
}) {
  const { propertyId } = await params;
  const property = await getProperty(propertyId);
  if (!property) redirect("/error");
  return (
    <div className="flex flex-1 flex-col sm:p-8 max-w-6xl mx-auto w-full">
      <main className="flex-1 flex flex-col gap-2">
        <div className="flex items-center justify-between p-4">
          <h1 className="text-2xl font-medium">{property.name} Tenants</h1>
        </div>
        {property.tenants.length > 0 ? (
          <div className="flex flex-col">
            {property.tenants.map((tenant, index) => (
              <div
                key={property.id}
                className={`w-full flex items-center justify-between px-6 py-5 hover:bg-foreground/5 transition-colors border-black/10 dark:border-white/15 ${index === property.tenants.length - 1 ? "" : "border-b"}`}
              >
                <div>
                  <p className="font-medium">
                    {tenant.firstName} {tenant.lastName}
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
          <div className="flex flex-1 flex-col gap-2 items-center justify-center p-6">
            <FontAwesomeIcon
              icon={faFolderOpen}
              className="text-foreground/70 mb-2"
              size="4x"
            />
            <p className="text-center text-foreground/70">No tenants found</p>
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
