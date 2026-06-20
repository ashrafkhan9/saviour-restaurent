import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const lineSchema = z.object({
  itemId: z.string(),
  name: z.string(),
  quantity: z.number().int().positive(),
  unitPrice: z.number().nonnegative(),
  variant: z.object({ name: z.string() }).optional(),
  addOns: z.array(z.object({ name: z.string(), price: z.number() })).default([]),
});

const orderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().optional().nullable(),
  type: z.enum(["PICKUP", "DELIVERY"]),
  paymentMethod: z.enum(["CARD", "CASH"]),
  deliveryAddress: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
  items: z.array(lineSchema).min(1),
});

export async function POST(request: NextRequest) {
  const parsed = orderSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid order details", issues: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const subtotal = data.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const tax = Number((subtotal * 0.0825).toFixed(2));
  const deliveryFee = data.type === "DELIVERY" ? 4.99 : 0;
  const total = Number((subtotal + tax + deliveryFee).toFixed(2));
  const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;

  try {
    const order = await prisma.order.create({
      data: {
        orderNumber,
        customerName: data.customerName,
        customerEmail: data.customerEmail,
        customerPhone: data.customerPhone,
        type: data.type,
        paymentMethod: data.paymentMethod,
        subtotal,
        tax,
        deliveryFee,
        total,
        deliveryAddress: data.deliveryAddress,
        notes: data.notes,
        items: {
          create: data.items.map((item) => ({
            menuItemId: item.itemId,
            name: item.name,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            variantName: item.variant?.name,
            addOns: item.addOns,
            lineTotal: item.unitPrice * item.quantity,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch {
    return NextResponse.json(
      {
        order: {
          id: orderNumber,
          orderNumber,
          ...data,
          subtotal,
          tax,
          deliveryFee,
          total,
          status: "PENDING",
        },
        source: "sample",
      },
      { status: 201 },
    );
  }
}
