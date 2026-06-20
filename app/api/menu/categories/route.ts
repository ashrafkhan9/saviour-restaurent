import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories } from "@/lib/sample-data";

export async function GET() {
  try {
    const result = await prisma.category.findMany({
      where: { isActive: true },
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ categories: result });
  } catch {
    return NextResponse.json({ categories, source: "sample" });
  }
}
