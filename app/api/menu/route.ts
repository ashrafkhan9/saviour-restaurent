import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { categories, menuItems } from "@/lib/sample-data";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const search = request.nextUrl.searchParams.get("search")?.toLowerCase() ?? "";

  try {
    const items = await prisma.menuItem.findMany({
      where: {
        isAvailable: true,
        category: category ? { slug: category } : undefined,
        OR: search
          ? [
              { name: { contains: search, mode: "insensitive" } },
              { description: { contains: search, mode: "insensitive" } },
            ]
          : undefined,
      },
      include: {
        category: true,
        variants: { orderBy: { sortOrder: "asc" } },
        addOnGroups: { include: { options: true } },
      },
      orderBy: [{ category: { displayOrder: "asc" } }, { name: "asc" }],
    });
    return NextResponse.json({ items });
  } catch {
    const categoryId = category ? categories.find((item) => item.slug === category)?.id : undefined;
    const filtered = menuItems.filter((item) => {
      const matchesCategory = categoryId ? item.categoryId === categoryId : true;
      const matchesSearch = search ? `${item.name} ${item.description}`.toLowerCase().includes(search) : true;
      return matchesCategory && matchesSearch;
    });
    return NextResponse.json({ items: filtered, source: "sample" });
  }
}
