import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reservationSlots } from "@/lib/sample-data";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  const partySize = Number(request.nextUrl.searchParams.get("partySize") ?? 2);

  if (!date) {
    return NextResponse.json({ slots: reservationSlots });
  }

  try {
    const tables = await prisma.restaurantTable.findMany({
      where: { isActive: true, capacity: { gte: partySize } },
    });
    const reservations = await prisma.reservation.findMany({
      where: { date: new Date(date), status: { notIn: ["CANCELLED", "NO_SHOW"] } },
    });
    const unavailable = new Set(
      reservations
        .filter((reservation: { tableId: string | null }) => reservation.tableId)
        .map((reservation: { time: string }) => reservation.time),
    );
    const slots = tables.length > 0 ? reservationSlots.filter((slot) => !unavailable.has(slot)) : [];
    return NextResponse.json({ slots });
  } catch {
    return NextResponse.json({ slots: reservationSlots, source: "sample" });
  }
}
