import { prisma } from "@/lib/db";

export const getUser = async (id: string) => {
  return await prisma.user.findUnique({
    where: { id },
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
};
