import { db } from "@/db";
import { categories, products, reviews } from "@/db/schema";
import { seedCategories, seedProducts } from "@/db/seed-data";
import { sql } from "drizzle-orm";

let seeded = false;
let seeding: Promise<void> | null = null;

export async function ensureSeeded() {
  if (seeded) return;
  if (seeding) return seeding;
  seeding = (async () => {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(products);
    if (count > 0) {
      seeded = true;
      return;
    }
    const insertedCategories = await db
      .insert(categories)
      .values(seedCategories)
      .onConflictDoNothing()
      .returning();
    const allCategories =
      insertedCategories.length > 0
        ? insertedCategories
        : await db.select().from(categories);
    const catMap = new Map(allCategories.map((c) => [c.slug, c.id]));

    for (const p of seedProducts) {
      const categoryId = catMap.get(p.category);
      if (!categoryId) continue;
      const [inserted] = await db
        .insert(products)
        .values({
          slug: p.slug,
          name: p.name,
          brand: p.brand,
          categoryId,
          audience: p.audience,
          shortDescription: p.shortDescription,
          description: p.description,
          price: p.price,
          compareAtPrice: p.compareAtPrice ?? null,
          images: p.images,
          highlights: p.highlights,
          tags: p.tags,
          stock: p.stock,
          featured: p.featured ?? false,
          isNew: p.isNew ?? false,
        })
        .onConflictDoNothing()
        .returning();
      if (!inserted) continue;
      if (p.reviews.length) {
        await db.insert(reviews).values(
          p.reviews.map((r, i) => ({
            productId: inserted.id,
            author: r.author,
            rating: r.rating,
            title: r.title,
            body: r.body,
            verified: true,
            createdAt: new Date(Date.now() - (i + 1) * 9 * 24 * 60 * 60 * 1000),
          })),
        );
      }
    }
    seeded = true;
  })().finally(() => {
    seeding = null;
  });
  return seeding;
}
