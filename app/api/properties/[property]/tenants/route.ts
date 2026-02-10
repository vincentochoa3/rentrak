import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";

type TenantInput = {
  firstName?: string;
  lastName?: string;
  rentAmount?: number;
  unit?: string;
};

export async function POST(
  request: Request,
  context: { params: Promise<{ property: string }> },
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { property: propertyId } = await context.params;

    const property = await prisma.property.findFirst({
      where: {
        id: propertyId,
        landlordId: session.user.id,
      },
    });
    if (!property) {
      return NextResponse.json(
        { error: "Property not found or access denied" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const { tenants: tenantsInput } = body as { tenants?: TenantInput[] };

    if (!Array.isArray(tenantsInput) || tenantsInput.length === 0) {
      return NextResponse.json(
        { error: "Request body must include a non-empty 'tenants' array" },
        { status: 400 },
      );
    }

    const validated = tenantsInput.map((t, i) => {
      const firstName = t?.firstName?.trim();
      const lastName = t?.lastName?.trim();
      const rentAmount = t?.rentAmount;
      if (!firstName || !lastName) {
        throw new Error(`Tenant ${i + 1} is missing first name or last name.`);
      }
      const num = Number(rentAmount);
      if (rentAmount == null || Number.isNaN(num) || num < 0) {
        throw new Error(`Tenant ${i + 1} has an invalid rent amount.`);
      }
      return {
        firstName,
        lastName,
        rentAmount: num,
        unit: t.unit,
      };
    });

    const created = await prisma.$transaction(
      validated.map((t) =>
        prisma.tenant.create({
          data: {
            firstName: t.firstName,
            lastName: t.lastName,
            rentAmount: t.rentAmount,
            unit: t.unit || null,
            propertyId,
          },
        }),
      ),
    );

    return NextResponse.json(created, { status: 201 });
  } catch (e) {
    if (e instanceof Error && e.message.startsWith("Tenant")) {
      return NextResponse.json({ error: e.message }, { status: 400 });
    }
    console.error("Add tenants error:", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
