"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AddOn, MenuItem, MenuVariant } from "@/lib/sample-data";

export type CartLine = {
  key: string;
  itemId: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  variant?: MenuVariant;
  addOns: AddOn[];
};

type CartState = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  addItem: (item: MenuItem, variant?: MenuVariant, addOns?: AddOn[]) => void;
  removeLine: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

function linePrice(item: MenuItem, variant?: MenuVariant, addOns: AddOn[] = []) {
  return (variant?.price ?? item.price) + addOns.reduce((total, addOn) => total + addOn.price, 0);
}

function recalc(lines: CartLine[]) {
  return {
    count: lines.reduce((total, line) => total + line.quantity, 0),
    subtotal: lines.reduce((total, line) => total + line.unitPrice * line.quantity, 0),
  };
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      count: 0,
      subtotal: 0,
      addItem(item, variant, addOns = []) {
        set((state) => {
          const key = [item.id, variant?.id ?? "base", ...addOns.map((addOn) => addOn.id).sort()].join(":");
          const existing = state.lines.find((line) => line.key === key);
          const lines = existing
            ? state.lines.map((line) => (line.key === key ? { ...line, quantity: line.quantity + 1 } : line))
            : [
                ...state.lines,
                {
                  key,
                  itemId: item.id,
                  name: item.name,
                  image: item.image,
                  quantity: 1,
                  unitPrice: linePrice(item, variant, addOns),
                  variant,
                  addOns,
                },
              ];
          return { lines, ...recalc(lines) };
        });
      },
      removeLine(key) {
        set((state) => {
          const lines = state.lines.filter((line) => line.key !== key);
          return { lines, ...recalc(lines) };
        });
      },
      updateQuantity(key, quantity) {
        set((state) => {
          const lines = state.lines
            .map((line) => (line.key === key ? { ...line, quantity: Math.max(0, quantity) } : line))
            .filter((line) => line.quantity > 0);
          return { lines, ...recalc(lines) };
        });
      },
      clear() {
        set({ lines: [], count: 0, subtotal: 0 });
      },
    }),
    { name: "restaurant-cart" },
  ),
);
