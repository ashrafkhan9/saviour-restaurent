"use client";

import { useState } from "react";
import type { LucideIcon } from "lucide-react";
import { CalendarCheck, Clock3, UsersRound, Wine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reservationSlots } from "@/lib/sample-data";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-stone-800">
      {label}
      {children}
    </label>
  );
}

export default function ReservationsPage() {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const details: Array<[LucideIcon, string, string]> = [
    [Clock3, "Dinner hours", "5:00 PM - 9:00 PM"],
    [UsersRound, "Party sizes", "1 to 12 guests"],
    [Wine, "Occasions", "Notes welcomed"],
  ];

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData)),
    });
    const data = await response.json();
    setLoading(false);
    setMessage(response.ok ? `Reservation requested for ${data.reservation.time}.` : data.error ?? "Unable to reserve.");
  }

  return (
    <main className="page-shell grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <section className="soft-panel rounded-md p-6 sm:p-8">
        <p className="eyebrow">Book a table</p>
        <h1 className="mt-2 section-title">Reservations</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-stone-600">
          Pick your date, preferred time, and party size. Availability checks assign the best matching table once the database is connected.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {details.map(([Icon, title, body]) => (
            <div key={String(title)} className="rounded-md border border-amber-950/10 bg-white/70 p-4">
              <Icon className="text-amber-800" size={19} />
              <p className="mt-3 text-sm font-semibold text-stone-950">{title}</p>
              <p className="mt-1 text-xs text-stone-500">{body}</p>
            </div>
          ))}
        </div>
      </section>
      <form onSubmit={submit} className="surface grid gap-5 rounded-md p-5 sm:p-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Full name"><Input name="customerName" placeholder="Avery Stone" required /></Field>
          <Field label="Email"><Input name="customerEmail" type="email" placeholder="avery@example.com" required /></Field>
          <Field label="Phone"><Input name="customerPhone" placeholder="(555) 018-2244" /></Field>
          <Field label="Date"><Input name="date" type="date" required /></Field>
          <Field label="Time">
            <Select name="time" defaultValue={reservationSlots[3]}>
              {reservationSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </Select>
          </Field>
          <Field label="Party size"><Input name="partySize" type="number" min="1" max="12" defaultValue="2" required /></Field>
        </div>
        <Field label="Reservation notes"><Textarea name="notes" placeholder="Occasion, accessibility, seating notes" /></Field>
        {message && <p className="rounded-md bg-amber-50 p-3 text-sm text-amber-800">{message}</p>}
        <Button variant="warm" disabled={loading} className="h-12">
          <CalendarCheck size={17} /> {loading ? "Checking availability..." : "Request reservation"}
        </Button>
      </form>
    </main>
  );
}
