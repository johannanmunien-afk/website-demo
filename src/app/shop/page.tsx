import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { getCategories, getPriceBounds, getProducts } from "@/lib/queries";
import { ProductCard } from "@/components/product/product-card";
import { Filters } from "@/components/shop/filters";
import { SortSelect } from "@/components/shop/sort-select";

export const dynamic = "force-dynamic";

export const metadata: Metadata = { title: "Shop" };

type SearchParams = Record<string, string | string[] | undefined>;

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const sp = await searchParams;
  const filters = {
    category: first(sp.category) || undefined,
    audience: first(sp.audience) || undefined,
    q: first(sp.q) || undefined,
    tag: first(sp.tag) || undefined,
    sort: first(sp.sort) || undefined,
    max: first(sp.max) ? Number(first(sp.max)) : undefined,
  };

  const [products, categories, bounds] = await Promise.all([getProducts(filters), getCategories(), getPriceBounds()]);
  const activeCategory = categories.find((c) => c.slug === filters.category);

  const heading = filters.q
    ? `Results for “${filters.q}”`
    : activeCategory?.name ??
      (filters.audience === "women" ? "For Her" : filters.audience === "men" ? "For Him" : filters.tag === "gift" ? "Gifts" : filters.tag === "bestseller" ? "Bestsellers" : "Shop All");

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <nav className="text-[11px] tracking-[0.2em] uppercase text-muted flex gap-2">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <span className="text-ink">{heading}</span>
      </nav>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-5xl sm:text-6xl font-medium animate-fade-up">{heading}</h1>
          <p className="mt-2 text-sm text-ink-soft animate-fade-up delay-1">
            {activeCategory?.tagline ?? "Household and beauty essentials, curated for everyone."}
          </p>
        </div>
        <p className="text-xs tracking-wider uppercase text-muted">{products.length} {products.length === 1 ? "product" : "products"}</p>
      </div>

      <div className="mt-10 flex gap-12">
        <Suspense fallback={null}>
          <Filters categories={categories} bounds={bounds} />
        </Suspense>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-4 pb-6 border-b border-sand">
            <div className="lg:hidden">
              <Suspense fallback={null}>
                <Filters categories={categories} bounds={bounds} mode="button" />
              </Suspense>
            </div>
            <div className="ml-auto">
              <Suspense fallback={null}>
                <SortSelect />
              </Suspense>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="py-24 text-center">
              <p className="font-display text-3xl">Nothing matched your search.</p>
              <p className="text-sm text-muted mt-2">Try broadening your filters or browse the full collection.</p>
              <Link href="/shop" className="mt-6 inline-block bg-ink text-ivory px-7 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold transition">
                View all products
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-10 sm:gap-x-6">
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
