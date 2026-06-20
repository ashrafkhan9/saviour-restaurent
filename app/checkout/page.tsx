"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, LockKeyhole, MapPin, ReceiptText, UserRound } from "lucide-react";
import { CartSummary } from "@/components/cart/cart-summary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/hooks/use-cart";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-800">
      {label}
      {children}
    </label>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const payload = {
      customerName: formData.get("customerName"),
      customerEmail: formData.get("customerEmail"),
      customerPhone: formData.get("customerPhone"),
      type: formData.get("type"),
      paymentMethod: formData.get("paymentMethod"),
      deliveryAddress: formData.get("deliveryAddress"),
      notes: formData.get("notes"),
      items: cart.lines,
    };

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(data.error ?? "Unable to place order.");
      return;
    }

    cart.clear();
    router.push(`/checkout?success=${data.order.id}`);
  }

  return (
    <main className="page-shell grid gap-8 lg:grid-cols-[1fr_420px]">
      <section>
        <div className="soft-panel rounded-md p-6 sm:p-8">
          <p className="eyebrow">Secure checkout</p>
          <h1 className="mt-2 section-title">Complete your order</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
            Confirm your contact details, choose pickup or delivery, and send the order to the kitchen queue.
          </p>
        </div>

        <form onSubmit={submit} className="mt-6 grid gap-6">
          <div className="surface rounded-md p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-800">
                <UserRound size={19} />
              </span>
              <div>
                <h2 className="font-semibold text-stone-950">Guest details</h2>
                <p className="text-sm text-stone-500">Used for confirmations and pickup updates.</p>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Full name"><Input name="customerName" placeholder="Avery Stone" required /></Field>
              <Field label="Email"><Input name="customerEmail" type="email" placeholder="avery@example.com" required /></Field>
              <Field label="Phone"><Input name="customerPhone" placeholder="(555) 018-2244" /></Field>
              <Field label="Order type">
                <Select name="type" defaultValue="PICKUP">
                  <option value="PICKUP">Pickup</option>
                  <option value="DELIVERY">Delivery</option>
                </Select>
              </Field>
            </div>
          </div>

          <div className="surface rounded-md p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-800">
                <MapPin size={19} />
              </span>
              <div>
                <h2 className="font-semibold text-stone-950">Fulfillment</h2>
                <p className="text-sm text-stone-500">Delivery address is only needed for delivery orders.</p>
              </div>
            </div>
            <div className="grid gap-4">
              <Field label="Delivery address"><Input name="deliveryAddress" placeholder="Street, apartment, city" /></Field>
              <Field label="Order notes"><Textarea name="notes" placeholder="Allergies, timing, handoff notes" /></Field>
            </div>
          </div>

          <div className="surface rounded-md p-5 sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-800">
                <ReceiptText size={19} />
              </span>
              <div>
                <h2 className="font-semibold text-stone-950">Payment</h2>
                <p className="text-sm text-stone-500">Stripe intent API is ready when keys are added.</p>
              </div>
            </div>
            <Field label="Payment method">
              <Select name="paymentMethod" defaultValue="CARD">
                <option value="CARD">Card</option>
                <option value="CASH">Cash</option>
              </Select>
            </Field>
          </div>

          {message && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{message}</p>}
          <Button variant="warm" disabled={loading || cart.lines.length === 0} className="h-12 w-full md:w-auto">
            <CreditCard size={17} /> {loading ? "Placing order..." : "Place order"}
          </Button>
        </form>
      </section>
      <aside className="lg:sticky lg:top-24 lg:self-start">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-stone-600">
          <LockKeyhole size={16} /> Protected checkout
        </div>
        <CartSummary checkout />
      </aside>
    </main>
  );
}
