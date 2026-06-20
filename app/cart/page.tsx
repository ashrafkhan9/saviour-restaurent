import type { Metadata } from "next";
import { CartSummary } from "@/components/cart/cart-summary";

export const metadata: Metadata = {
  title: "Cart",
};

export default function CartPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-amber-700">Your order</p>
        <h1 className="mt-2 text-4xl font-semibold text-stone-950">Shopping cart</h1>
      </div>
      <CartSummary />
    </main>
  );
}
