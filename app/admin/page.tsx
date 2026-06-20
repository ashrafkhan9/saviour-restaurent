import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import { ClipboardList, DollarSign, Table2, Utensils } from "lucide-react";
import { categories, formatCurrency, menuItems } from "@/lib/sample-data";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};

export default function AdminPage() {
  const revenue = 4286.75;
  const cards: Array<[string, string | number, LucideIcon]> = [
    ["Menu items", menuItems.length, Utensils],
    ["Categories", categories.length, ClipboardList],
    ["Open reservations", 18, Table2],
    ["Weekly revenue", formatCurrency(revenue), DollarSign],
  ];

  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-amber-700">Operations</p>
      <h1 className="mt-2 text-4xl font-semibold text-stone-950">Admin dashboard</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-4">
        {cards.map(([label, value, Icon]) => (
          <div key={String(label)} className="rounded-md border border-stone-200 bg-white p-5">
            <Icon className="text-amber-600" size={22} />
            <p className="mt-4 text-sm text-stone-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold text-stone-950">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-md border border-stone-200 bg-white">
          <div className="border-b border-stone-200 p-5">
            <h2 className="text-lg font-semibold text-stone-950">Menu CMS preview</h2>
          </div>
          <div className="divide-y divide-stone-200">
            {menuItems.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-semibold text-stone-950">{item.name}</p>
                  <p className="text-sm text-stone-500">{categories.find((category) => category.id === item.categoryId)?.name}</p>
                </div>
                <span className="text-sm font-semibold">{formatCurrency(item.price)}</span>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-md border border-stone-200 bg-white p-5">
          <h2 className="text-lg font-semibold text-stone-950">Operational queues</h2>
          <div className="mt-5 grid gap-3">
            {["Pending orders", "Kitchen preparing", "Ready for pickup", "Reservation confirmations"].map((label, index) => (
              <div key={label} className="flex items-center justify-between rounded-md border border-stone-200 p-3">
                <span className="text-sm font-medium text-stone-700">{label}</span>
                <span className="rounded-sm bg-stone-950 px-2 py-1 text-xs font-bold text-white">{[7, 4, 3, 8][index]}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
