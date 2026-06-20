import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, ShieldCheck, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { categories, formatCurrency, menuItems } from "@/lib/sample-data";

export default function Home() {
  const featured = menuItems.filter((item) => item.featured).slice(0, 3);

  return (
    <main>
      <section className="relative min-h-[calc(100vh-4.5rem)] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2000&q=85"
          alt="Busy restaurant dining room"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(28_25_23/.96),rgb(28_25_23/.78),rgb(28_25_23/.25))]" />
        <div className="relative mx-auto flex min-h-[calc(100vh-4.5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge className="border-white/20 bg-white/10 text-white">Online orders - Reservations - Admin</Badge>
            <h1 className="mt-5 hero-title">Saviour Table</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-stone-200">
              Seasonal dining with a polished digital flow: browse the menu, customize your order, reserve a table, and run operations from a dedicated dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/menu" className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-amber-500 px-5 text-sm font-bold text-stone-950 shadow-lg shadow-black/20 hover:bg-amber-400">
                <ShoppingBag size={18} /> Order now
              </Link>
              <Link href="/reservations" className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-white/40 px-5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
                <CalendarDays size={18} /> Reserve a table
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell grid gap-6 md:grid-cols-3">
        {[
          ["Live menu", "Categories, search, variants, add-ons, dietary tags, and availability."],
          ["Smooth checkout", "Pickup or delivery, cash or card, Stripe-ready payment intents."],
          ["Table booking", "Date, time, party size, and availability-aware reservation requests."],
        ].map(([title, body]) => (
          <div key={title} className="surface rounded-md p-6">
            <ShieldCheck className="text-amber-700" size={22} />
            <h2 className="mt-4 text-lg font-semibold text-stone-950">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{body}</p>
          </div>
        ))}
      </section>

      <section className="border-y border-amber-950/10 bg-[#fffdf8]">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow">House favorites</p>
              <h2 className="mt-2 section-title">Featured dishes</h2>
            </div>
            <Link href="/menu" className="inline-flex items-center gap-2 text-sm font-semibold text-stone-950 hover:text-amber-800">
              View full menu <ArrowRight size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {featured.map((item) => (
              <Link key={item.id} href="/menu" className="group overflow-hidden rounded-md surface">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.name} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <div className="flex justify-between gap-3">
                    <h3 className="font-semibold text-stone-950">{item.name}</h3>
                    <span className="font-semibold">{formatCurrency(item.price)}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="page-shell">
        <div className="grid gap-6 rounded-md soft-panel p-6 sm:p-8 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div>
            <Clock className="text-amber-700" />
            <h2 className="mt-4 section-title">Built for real restaurant workflows</h2>
            <p className="mt-3 text-sm leading-6 text-stone-600">
              The rebuilt base includes API endpoints, Prisma data models, seed data, checkout and reservation flows, demo roles, and an admin dashboard ready for deeper CMS controls.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {categories.map((category) => (
              <Link key={category.id} href={`/menu?category=${category.slug}`} className="rounded-md border border-amber-950/10 bg-white/75 p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-amber-800/40">
                <p className="font-semibold text-stone-950">{category.name}</p>
                <p className="mt-1 text-sm text-stone-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
