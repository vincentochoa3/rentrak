import { prisma } from "@/lib/db";

export const getProperty = async (id: string) => {
  return await prisma.property.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      address: true,
      city: true,
      state: true,
      zip: true,
      country: true,
      tenants: {
        select: {
          id: true,
          firstName: true,
          lastName: true,
          rentAmount: true,
          amountOwed: true,
        },
      },
    },
  });
};
