"use client";

import Image from "next/image";
import { Flame, Leaf, Plus, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AddOn, formatCurrency, MenuItem, MenuVariant } from "@/lib/sample-data";
import { useCart } from "@/hooks/use-cart";

export function MenuCard({ item }: { item: MenuItem }) {
  const addItem = useCart((state) => state.addItem);
  const [variantId, setVariantId] = useState(item.variants[0]?.id);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  const variant = item.variants.find((option) => option.id === variantId);
  const addOns = useMemo<AddOn[]>(
    () => item.addOnGroups.flatMap((group) => group.options).filter((option) => selectedAddOns.includes(option.id)),
    [item.addOnGroups, selectedAddOns],
  );
  const price = (variant?.price ?? item.price) + addOns.reduce((total, addOn) => total + addOn.price, 0);
  const isVegetarian = item.dietaryTags.includes("VEGETARIAN") || item.dietaryTags.includes("VEGAN");
  const isSpicy = item.dietaryTags.includes("SPICY");

  function toggleAddOn(addOn: AddOn, groupMax: number) {
    setSelectedAddOns((current) => {
      if (current.includes(addOn.id)) {
        return current.filter((id) => id !== addOn.id);
      }
      if (groupMax === 1) {
        const group = item.addOnGroups.find((candidate) => candidate.options.some((option) => option.id === addOn.id));
        const groupIds = group?.options.map((option) => option.id) ?? [];
        return [...current.filter((id) => !groupIds.includes(id)), addOn.id];
      }
      return [...current, addOn.id];
    });
  }

  return (
    <article className="group overflow-hidden rounded-md surface transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_rgb(75_51_32_/_14%)]">
      <div className="relative aspect-[4/3] bg-stone-100">
        <Image src={item.image} alt={item.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/55 to-transparent" />
        <div className="absolute left-3 top-3 flex gap-2">
          {isVegetarian && (
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-emerald-700 shadow-sm" title="Vegetarian friendly">
              <Leaf size={16} />
            </span>
          )}
          {isSpicy && (
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-red-700 shadow-sm" title="Spicy">
              <Flame size={16} />
            </span>
          )}
        </div>
        {item.featured && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-sm bg-amber-500 px-2 py-1 text-xs font-bold text-stone-950">
            <Sparkles size={13} /> Favorite
          </span>
        )}
      </div>
      <div className="space-y-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-stone-950">{item.name}</h3>
            <span className="rounded-sm bg-stone-950 px-2 py-1 text-sm font-bold text-white">{formatCurrency(price)}</span>
          </div>
          <p className="mt-2 text-sm leading-6 text-stone-600">{item.description}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {item.dietaryTags.map((tag) => (
            <Badge key={tag}>{tag.replace("_", " ").toLowerCase()}</Badge>
          ))}
        </div>
        {item.variants.length > 0 && (
          <div className="grid gap-2">
            <p className="text-xs font-bold uppercase text-stone-500">Size</p>
            <div className="grid grid-cols-2 gap-2">
              {item.variants.map((option: MenuVariant) => (
                <button
                  key={option.id}
                  onClick={() => setVariantId(option.id)}
                  className={`rounded-md border px-3 py-2 text-sm font-semibold transition ${
                    variantId === option.id
                      ? "border-stone-950 bg-stone-950 text-white shadow-sm"
                      : "border-stone-300 bg-white text-stone-700 hover:border-amber-700 hover:bg-amber-50"
                  }`}
                >
                  {option.name} - {formatCurrency(option.price)}
                </button>
              ))}
            </div>
          </div>
        )}
        {item.addOnGroups.map((group) => (
          <div key={group.id} className="grid gap-2">
            <p className="text-xs font-bold uppercase text-stone-500">{group.name}</p>
            <div className="grid gap-2">
              {group.options.map((option) => (
                <label key={option.id} className="flex items-center justify-between gap-3 rounded-md border border-stone-200 bg-white/70 px-3 py-2 text-sm transition hover:border-amber-700 hover:bg-amber-50">
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-amber-800"
                      checked={selectedAddOns.includes(option.id)}
                      onChange={() => toggleAddOn(option, group.maxSelections)}
                    />
                    {option.name}
                  </span>
                  <span>{formatCurrency(option.price)}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
        <Button variant="warm" className="w-full" disabled={!item.available} onClick={() => addItem(item, variant, addOns)}>
          <Plus size={17} /> Add to cart
        </Button>
      </div>
    </article>
  );
}
