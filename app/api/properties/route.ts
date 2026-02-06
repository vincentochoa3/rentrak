import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, address, city, state, zip, country } = body as {
      name?: string;
      address?: string;
      city?: string;
      state?: string;
      zip?: string;
      country?: string;
    };

    const trimmedName = name?.trim();
    if (!trimmedName || !address?.trim() || !city?.trim() || !state?.trim() || !zip?.trim() || !country?.trim()) {
      return NextResponse.json(
        { error: "Name, address, city, state, zip, and country are required" },
        { status: 400 }
      );
    }

    const existing = await prisma.property.findUnique({
      where: {
        landlordId_name: { landlordId: session.user.id, name: trimmedName },
      },
    });
    if (existing) {
      return NextResponse.json(
        { error: "You already have a property with this name" },
        { status: 409 }
      );
    }

    const property = await prisma.property.create({
      data: {
        name: trimmedName,
        address: address.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zip.trim(),
        country: country.trim(),
        landlordId: session.user.id,
      },
    });

    return NextResponse.json(property, { status: 201 });
  } catch (e) {
    console.error("Create property error:", e);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
