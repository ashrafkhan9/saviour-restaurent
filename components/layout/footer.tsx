import Link from "next/link";
import { Clock3, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-stone-900 bg-stone-950 text-stone-200">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="md:col-span-2">
          <p className="text-xl font-semibold text-white">Saviour Table</p>
          <p className="mt-3 max-w-md text-sm leading-6 text-stone-400">
            Seasonal cooking, polished service, online ordering, and smooth reservations in one modern restaurant platform.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Pickup", "Delivery", "Private tables"].map((item) => (
              <span key={item} className="rounded-sm border border-white/10 px-2 py-1 text-xs font-semibold text-stone-300">{item}</span>
            ))}
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Visit</p>
          <div className="mt-3 space-y-3 text-sm leading-6 text-stone-400">
            <p className="flex gap-2"><MapPin className="mt-1 shrink-0" size={16} />42 Market Street</p>
            <p className="flex gap-2"><Clock3 className="mt-1 shrink-0" size={16} />Open daily from 11:00</p>
            <p className="flex gap-2"><Phone className="mt-1 shrink-0" size={16} />(555) 018-2244</p>
          </div>
        </div>
        <div>
          <p className="font-semibold text-white">Quick Links</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-stone-400">
            <Link href="/menu" className="hover:text-white">Order online</Link>
            <Link href="/reservations" className="hover:text-white">Book a table</Link>
            <Link href="/admin" className="hover:text-white">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
