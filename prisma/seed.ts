import { hash } from "argon2";
import { PrismaClient } from "@prisma/client";
import { categories, menuItems } from "../lib/sample-data";

const prisma = new PrismaClient();

async function main() {
  await prisma.review.deleteMany();
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.restaurantTable.deleteMany();
  await prisma.addOn.deleteMany();
  await prisma.addOnGroup.deleteMany();
  await prisma.variant.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.openingHour.deleteMany();
  await prisma.holiday.deleteMany();
  await prisma.user.deleteMany();

  const passwordHash = await hash("admin123");
  await prisma.user.createMany({
    data: [
      { name: "Demo Admin", email: "admin@demo.com", passwordHash, role: "ADMIN" },
      { name: "Demo User", email: "user@demo.com", passwordHash: await hash("user123"), role: "USER" },
      { name: "Demo Staff", email: "staff@demo.com", passwordHash: await hash("staff123"), role: "STAFF_FRONT_DESK" },
    ],
  });

  for (const category of categories) {
    await prisma.category.create({
      data: {
        id: category.id,
        name: category.name,
        slug: category.slug,
        description: category.description,
        displayOrder: category.displayOrder,
      },
    });
  }

  for (const item of menuItems) {
    await prisma.menuItem.create({
      data: {
        id: item.id,
        categoryId: item.categoryId,
        name: item.name,
        slug: item.slug,
        description: item.description,
        image: item.image,
        price: item.price,
        tags: item.dietaryTags,
        isAvailable: item.available,
        isFeatured: Boolean(item.featured),
        variants: {
          create: item.variants.map((variant, index) => ({
            id: variant.id,
            name: variant.name,
            price: variant.price,
            sortOrder: index,
          })),
        },
        addOnGroups: {
          create: item.addOnGroups.map((group) => ({
            id: `${item.id}-${group.id}`,
            name: group.name,
            required: group.required,
            maxSelections: group.maxSelections,
            options: {
              create: group.options.map((option) => ({
                id: `${item.id}-${option.id}`,
                name: option.name,
                price: option.price,
              })),
            },
          })),
        },
      },
    });
  }

  await prisma.restaurantTable.createMany({
    data: Array.from({ length: 10 }, (_, index) => ({
      name: `Table ${index + 1}`,
      capacity: index < 3 ? 2 : index < 7 ? 4 : 6,
    })),
  });

  await prisma.openingHour.createMany({
    data: [0, 1, 2, 3, 4, 5, 6].map((dayOfWeek) => ({
      dayOfWeek,
      openTime: dayOfWeek === 0 ? "12:00" : "11:00",
      closeTime: dayOfWeek >= 5 ? "23:00" : "22:00",
      isClosed: false,
    })),
  });

  await prisma.coupon.createMany({
    data: [
      { code: "WELCOME10", description: "10% off first order", percentOff: 10, minOrderAmount: 25 },
      { code: "FAMILY5", description: "$5 off family orders", amountOff: 5, minOrderAmount: 50 },
    ],
  });

  console.log("Seed complete: demo users, menu, tables, hours, and coupons created.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
