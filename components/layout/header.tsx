"use client";

import Link from "next/link";
import { Menu, ShoppingBag, UserRound, Utensils } from "lucide-react";
import { useCart } from "@/hooks/use-cart";

const nav = [
  { href: "/menu", label: "Menu" },
  { href: "/reservations", label: "Reservations" },
  { href: "/admin", label: "Admin" },
];

export function Header() {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-40 border-b border-amber-950/10 bg-[#fffdf8]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 font-semibold text-stone-950">
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-stone-950 text-white shadow-lg shadow-stone-950/10">
            <Utensils size={18} />
          </span>
          <span className="leading-tight">
            <span className="block">Saviour Table</span>
            <span className="hidden text-xs font-medium text-stone-500 sm:block">Dining and orders</span>
          </span>
        </Link>
        <nav className="hidden items-center rounded-md border border-amber-950/10 bg-white/70 p-1 text-sm font-semibold text-stone-600 shadow-sm md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-sm px-4 py-2 hover:bg-amber-50 hover:text-stone-950">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link
            href="/menu"
            className="flex h-10 w-10 items-center justify-center rounded-md text-stone-700 hover:bg-amber-50 md:hidden"
            aria-label="Menu"
          >
            <Menu size={19} />
          </Link>
          <Link
            href="/account"
            className="flex h-10 w-10 items-center justify-center rounded-md text-stone-700 hover:bg-amber-50"
            aria-label="Account"
          >
            <UserRound size={19} />
          </Link>
          <Link
            href="/cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-md bg-stone-950 text-white shadow-lg shadow-stone-950/10 hover:bg-stone-800"
            aria-label="Cart"
          >
            <ShoppingBag size={19} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-stone-950 ring-2 ring-[#fffdf8]">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
