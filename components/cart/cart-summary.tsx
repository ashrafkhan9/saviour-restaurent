"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/sample-data";
import { useCart } from "@/hooks/use-cart";

export function CartSummary({ checkout = false }: { checkout?: boolean }) {
  const { lines, subtotal, updateQuantity, removeLine } = useCart();
  const tax = subtotal * 0.0825;
  const deliveryFee = checkout ? 4.99 : 0;
  const total = subtotal + tax + deliveryFee;

  if (lines.length === 0) {
    return (
      <div className="surface rounded-md p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-amber-100 text-amber-800">
          <ShoppingBag size={22} />
        </span>
        <p className="mt-4 text-lg font-semibold text-stone-950">Your cart is empty.</p>
        <p className="mt-2 text-sm text-stone-600">Start with a house favorite from the menu.</p>
        <Link href="/menu" className="mt-5 inline-flex h-11 items-center rounded-md bg-stone-950 px-4 text-sm font-semibold text-white hover:bg-stone-800">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lines.map((line) => (
        <div key={line.key} className="grid grid-cols-[84px_1fr] gap-4 rounded-md border border-amber-950/10 bg-white/90 p-3 shadow-sm">
          <div className="relative h-[84px] overflow-hidden rounded-md bg-stone-100">
            <Image src={line.image} alt={line.name} fill sizes="84px" className="object-cover" />
          </div>
          <div className="min-w-0">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-stone-950">{line.name}</p>
                <p className="mt-1 line-clamp-2 text-xs leading-5 text-stone-500">
                  {[line.variant?.name, ...line.addOns.map((addOn) => addOn.name)].filter(Boolean).join(" - ") || "House preparation"}
                </p>
              </div>
              <p className="shrink-0 font-semibold text-stone-950">{formatCurrency(line.unitPrice * line.quantity)}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center rounded-md border border-stone-300 bg-white">
                <button className="flex h-9 w-9 items-center justify-center hover:bg-amber-50" onClick={() => updateQuantity(line.key, line.quantity - 1)} aria-label="Decrease">
                  <Minus size={15} />
                </button>
                <span className="w-8 text-center text-sm font-semibold">{line.quantity}</span>
                <button className="flex h-9 w-9 items-center justify-center hover:bg-amber-50" onClick={() => updateQuantity(line.key, line.quantity + 1)} aria-label="Increase">
                  <Plus size={15} />
                </button>
              </div>
              <button className="flex h-9 w-9 items-center justify-center rounded-md text-red-600 hover:bg-red-50" onClick={() => removeLine(line.key)} aria-label="Remove">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <div className="surface rounded-md p-5">
        <div className="space-y-3 text-sm text-stone-600">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
          <div className="flex justify-between"><span>Tax</span><span>{formatCurrency(tax)}</span></div>
          {checkout && <div className="flex justify-between"><span>Delivery estimate</span><span>{formatCurrency(deliveryFee)}</span></div>}
        </div>
        <div className="mt-5 flex justify-between border-t border-stone-200 pt-5 text-lg font-semibold text-stone-950">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
        {!checkout && (
          <Link href="/checkout" className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-md bg-amber-700 px-4 text-sm font-semibold text-white hover:bg-amber-800">
            Checkout
          </Link>
        )}
      </div>
    </div>
  );
}
