import type { Metadata } from "next";
import Link from "next/link";
import { Search, SlidersHorizontal } from "lucide-react";
import { MenuCard } from "@/components/menu/menu-card";
import { categories, menuItems } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Menu",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const activeCategory = categories.find((category) => category.slug === params.category);
  const query = params.q?.toLowerCase().trim() ?? "";
  const filtered = menuItems.filter((item) => {
    const matchesCategory = activeCategory ? item.categoryId === activeCategory.id : true;
    const matchesQuery = query ? `${item.name} ${item.description}`.toLowerCase().includes(query) : true;
    return matchesCategory && matchesQuery;
  });

  return (
    <main className="page-shell">
      <div className="soft-panel overflow-hidden rounded-md p-6 sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Order online</p>
            <h1 className="mt-2 section-title">Menu</h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
              Browse seasonal dishes, choose sizes, add sides, and send everything straight to checkout.
            </p>
          </div>
          <form className="relative w-full md:max-w-sm">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <input
              name="q"
              defaultValue={params.q}
              placeholder="Search menu"
              className="h-12 w-full rounded-md border border-stone-300 bg-white/90 pl-10 pr-3 text-sm outline-none focus:border-amber-800 focus:ring-4 focus:ring-amber-900/10"
            />
          </form>
        </div>
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto rounded-md border border-amber-950/10 bg-white/70 p-2 shadow-sm">
        <span className="hidden h-10 items-center gap-2 px-3 text-sm font-semibold text-stone-500 sm:flex">
          <SlidersHorizontal size={16} /> Categories
        </span>
        <Link href="/menu" className={`shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition ${!activeCategory ? "border-stone-950 bg-stone-950 text-white" : "border-transparent bg-white text-stone-700 hover:bg-amber-50"}`}>
          All
        </Link>
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/menu?category=${category.slug}`}
            className={`shrink-0 rounded-md border px-4 py-2 text-sm font-semibold transition ${activeCategory?.id === category.id ? "border-stone-950 bg-stone-950 text-white" : "border-transparent bg-white text-stone-700 hover:bg-amber-50"}`}
          >
            {category.name}
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {filtered.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </main>
  );
}
