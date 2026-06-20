import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account",
};

export default function AccountPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm font-semibold uppercase text-amber-700">Demo access</p>
      <h1 className="mt-2 text-4xl font-semibold text-stone-950">User accounts</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {[
          ["Admin", "admin@demo.com", "admin123"],
          ["User", "user@demo.com", "user123"],
          ["Staff", "staff@demo.com", "staff123"],
        ].map(([role, email, password]) => (
          <div key={role} className="rounded-md border border-stone-200 bg-white p-5">
            <p className="font-semibold text-stone-950">{role}</p>
            <p className="mt-3 text-sm text-stone-600">{email}</p>
            <p className="mt-1 text-sm text-stone-600">{password}</p>
          </div>
        ))}
      </div>
      <p className="mt-6 text-sm leading-6 text-stone-600">
        NextAuth credentials configuration is included in `lib/auth.ts`; once the database is seeded, these accounts are available for protected routes.
      </p>
    </main>
  );
}
