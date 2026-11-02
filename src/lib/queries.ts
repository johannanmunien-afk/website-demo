import { db } from "@/db";
import { categories, products, reviews, type Product, type Category } from "@/db/schema";
import { ensureSeeded } from "@/db/seed";
import { and, asc, desc, eq, gte, ilike, inArray, lte, or, sql, type SQL } from "drizzle-orm";

export type ProductWithMeta = Product & {
  categoryName: string;
  categorySlug: string;
  avgRating: number;
  reviewCount: number;
};

const ratingSubquery = db
  .select({
    productId: reviews.productId,
    avgRating: sql<number>`coalesce(avg(${reviews.rating}), 0)::float`.as("avg_rating"),
    reviewCount: sql<number>`count(*)::int`.as("review_count"),
  })
  .from(reviews)
  .groupBy(reviews.productId)
  .as("r");

function baseSelect() {
  return db
    .select({
      product: products,
      categoryName: categories.name,
      categorySlug: categories.slug,
      avgRating: sql<number>`coalesce(${ratingSubquery.avgRating}, 0)`,
      reviewCount: sql<number>`coalesce(${ratingSubquery.reviewCount}, 0)`,
    })
    .from(products)
    .innerJoin(categories, eq(products.categoryId, categories.id))
    .leftJoin(ratingSubquery, eq(ratingSubquery.productId, products.id));
}

function flatten(rows: Awaited<ReturnType<ReturnType<typeof baseSelect>["execute"]>>): ProductWithMeta[] {
  return rows.map((r) => ({
    ...r.product,
    categoryName: r.categoryName,
    categorySlug: r.categorySlug,
    avgRating: Number(r.avgRating ?? 0),
    reviewCount: Number(r.reviewCount ?? 0),
  }));
}

export async function getCategories(): Promise<Category[]> {
  await ensureSeeded();
  return db.select().from(categories).orderBy(asc(categories.id));
}

export async function getFeaturedProducts(): Promise<ProductWithMeta[]> {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.featured, true)).orderBy(asc(products.id)).limit(8);
  return flatten(rows);
}

export async function getNewArrivals(): Promise<ProductWithMeta[]> {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.isNew, true)).orderBy(desc(products.id)).limit(4);
  return flatten(rows);
}

export type ShopFilters = {
  category?: string;
  audience?: string;
  q?: string;
  min?: number;
  max?: number;
  sort?: string;
  tag?: string;
};

export async function getProducts(filters: ShopFilters): Promise<ProductWithMeta[]> {
  await ensureSeeded();
  const conditions: SQL[] = [];
  if (filters.category) conditions.push(eq(categories.slug, filters.category));
  if (filters.audience && filters.audience !== "everyone") {
    conditions.push(inArray(products.audience, [filters.audience, "everyone"]));
  }
  if (filters.q) {
    const term = `%${filters.q}%`;
    conditions.push(
      or(ilike(products.name, term), ilike(products.brand, term), ilike(products.shortDescription, term))!,
    );
  }
  if (filters.min !== undefined) conditions.push(gte(products.price, String(filters.min)));
  if (filters.max !== undefined) conditions.push(lte(products.price, String(filters.max)));
  if (filters.tag) conditions.push(sql`${products.tags} ? ${filters.tag}`);

  let order: SQL[];
  switch (filters.sort) {
    case "price-asc":
      order = [asc(products.price)];
      break;
    case "price-desc":
      order = [desc(products.price)];
      break;
    case "rating":
      order = [desc(sql`coalesce(${ratingSubquery.avgRating}, 0)`), desc(sql`coalesce(${ratingSubquery.reviewCount}, 0)`)];
      break;
    case "newest":
      order = [desc(products.isNew), desc(products.id)];
      break;
    default:
      order = [desc(products.featured), desc(sql`coalesce(${ratingSubquery.reviewCount}, 0)`), asc(products.id)];
  }

  const rows = await baseSelect()
    .where(conditions.length ? and(...conditions) : undefined)
    .orderBy(...order);
  return flatten(rows);
}

export async function getProductBySlug(slug: string) {
  await ensureSeeded();
  const rows = await baseSelect().where(eq(products.slug, slug)).limit(1);
  const list = flatten(rows);
  if (!list.length) return null;
  const product = list[0];
  const productReviews = await db
    .select()
    .from(reviews)
    .where(eq(reviews.productId, product.id))
    .orderBy(desc(reviews.createdAt));
  const related = flatten(
    await baseSelect()
      .where(and(eq(products.categoryId, product.categoryId), sql`${products.id} <> ${product.id}`))
      .limit(4),
  );
  return { product, reviews: productReviews, related };
}

export async function getProductsByIds(ids: number[]) {
  if (!ids.length) return [];
  await ensureSeeded();
  return db.select().from(products).where(inArray(products.id, ids));
}

export async function getPriceBounds() {
  await ensureSeeded();
  const [row] = await db
    .select({
      min: sql<number>`coalesce(min(${products.price}), 0)::float`,
      max: sql<number>`coalesce(max(${products.price}), 0)::float`,
    })
    .from(products);
  return { min: Math.floor(row.min), max: Math.ceil(row.max) };
}
