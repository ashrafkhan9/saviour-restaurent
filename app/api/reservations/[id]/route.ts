import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const reservation = await prisma.reservation.findUnique({
      where: { id },
      include: { table: true },
    });
    if (!reservation) {
      return NextResponse.json({ error: "Reservation not found" }, { status: 404 });
    }
    return NextResponse.json({ reservation });
  } catch {
    return NextResponse.json({ error: "Reservation lookup requires a configured database" }, { status: 503 });
  }
}
