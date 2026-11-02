import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/queries";
import { formatPrice } from "@/lib/utils";
import { Gallery } from "@/components/product/gallery";
import { Stars } from "@/components/product/stars";
import { AddToCart } from "@/components/product/add-to-cart";
import { ProductCard } from "@/components/product/product-card";
import { ReviewForm } from "@/components/product/review-form";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) return { title: "Product not found" };
  return { title: data.product.name, description: data.product.shortDescription };
}

const AUDIENCE_LABEL: Record<string, string> = { women: "For Her", men: "For Him", everyone: "For Everyone" };

export default async function ProductPage({ params }: Params) {
  const { slug } = await params;
  const data = await getProductBySlug(slug);
  if (!data) notFound();
  const { product, reviews, related } = data;

  const onSale = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price);
  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: reviews.filter((r) => r.rating === star).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-16">
      <nav className="text-[11px] tracking-[0.2em] uppercase text-muted flex flex-wrap gap-2">
        <Link href="/" className="hover:text-ink">Home</Link>
        <span>/</span>
        <Link href="/shop" className="hover:text-ink">Shop</Link>
        <span>/</span>
        <Link href={`/shop?category=${product.categorySlug}`} className="hover:text-ink">{product.categoryName}</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="animate-fade-in">
          <Gallery images={product.images} name={product.name} />
        </div>

        <div className="lg:sticky lg:top-28 lg:self-start animate-fade-up">
          <div className="flex items-center gap-3 text-[11px] tracking-[0.25em] uppercase text-muted">
            <span>{product.brand}</span>
            <span className="w-1 h-1 rounded-full bg-sand" />
            <span>{AUDIENCE_LABEL[product.audience]}</span>
            {product.isNew && (
              <>
                <span className="w-1 h-1 rounded-full bg-sand" />
                <span className="text-gold">New</span>
              </>
            )}
          </div>
          <h1 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-[1.05]">{product.name}</h1>
          <p className="mt-2 text-ink-soft">{product.shortDescription}</p>

          <a href="#reviews" className="mt-4 inline-flex items-center gap-2 group">
            <Stars rating={product.avgRating} size={15} />
            <span className="text-xs text-muted group-hover:text-ink transition">
              {product.avgRating.toFixed(1)} · {product.reviewCount} {product.reviewCount === 1 ? "review" : "reviews"}
            </span>
          </a>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="font-display text-4xl font-semibold">{formatPrice(product.price)}</span>
            {onSale && (
              <>
                <span className="text-lg text-muted line-through">{formatPrice(product.compareAtPrice!)}</span>
                <span className="text-[11px] tracking-[0.2em] uppercase bg-plum text-ivory px-2 py-1">
                  Save {formatPrice(parseFloat(product.compareAtPrice!) - parseFloat(product.price))}
                </span>
              </>
            )}
          </div>

          <p className="mt-3 text-xs">
            {product.stock > 10 ? (
              <span className="text-sage">● In stock, ships within 24 hours</span>
            ) : product.stock > 0 ? (
              <span className="text-gold">● Only {product.stock} left</span>
            ) : (
              <span className="text-muted">● Sold out</span>
            )}
          </p>

          <div className="mt-7">
            <AddToCart product={product} showQuantity />
          </div>

          <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-2.5">
            {product.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-sm text-ink-soft">
                <span className="text-gold mt-0.5">✦</span>
                {h}
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-sand">
            <Accordion title="Description" defaultOpen>
              <p className="text-sm leading-relaxed text-ink-soft">{product.description}</p>
            </Accordion>
            <Accordion title="Shipping & returns">
              <p className="text-sm leading-relaxed text-ink-soft">
                Complimentary standard shipping on orders over $75. Express delivery available at checkout. Returns are
                free within 30 days of delivery — unopened beauty products and unused homeware in original packaging.
              </p>
            </Accordion>
            <Accordion title="Our promise">
              <p className="text-sm leading-relaxed text-ink-soft">
                Every product in the kingdom is chosen for quality, honesty and longevity. Beauty is cruelty-free; homeware
                is built to last and backed by our satisfaction guarantee.
              </p>
            </Accordion>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <section id="reviews" className="mt-24 scroll-mt-28">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Reviews</p>
            <h2 className="mt-2 font-display text-4xl font-medium">What people say</h2>
            <div className="mt-6 flex items-end gap-4">
              <span className="font-display text-6xl font-semibold leading-none">{product.avgRating.toFixed(1)}</span>
              <div className="pb-1">
                <Stars rating={product.avgRating} size={16} />
                <p className="text-xs text-muted mt-1">Based on {product.reviewCount} reviews</p>
              </div>
            </div>
            <ul className="mt-6 space-y-2">
              {distribution.map(({ star, count }) => (
                <li key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-8 text-muted">{star} ★</span>
                  <div className="flex-1 h-1.5 bg-sand overflow-hidden">
                    <div className="h-full bg-gold" style={{ width: reviews.length ? `${(count / reviews.length) * 100}%` : 0 }} />
                  </div>
                  <span className="w-6 text-right text-muted">{count}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <ReviewForm productId={product.id} />
            </div>
          </div>
          <div className="lg:col-span-8">
            {reviews.length === 0 ? (
              <p className="text-ink-soft">No reviews yet — be the first to share your thoughts.</p>
            ) : (
              <ul className="divide-y divide-sand">
                {reviews.map((r, i) => (
                  <li key={r.id} className={`py-7 animate-fade-up delay-${Math.min(i + 1, 5)}`}>
                    <div className="flex items-center justify-between gap-4">
                      <Stars rating={r.rating} size={13} />
                      <span className="text-[11px] text-muted">
                        {new Date(r.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </span>
                    </div>
                    <p className="mt-3 font-display text-2xl">{r.title}</p>
                    <p className="mt-2 text-sm text-ink-soft leading-relaxed">{r.body}</p>
                    <p className="mt-3 text-xs text-muted">
                      <span className="text-ink font-medium">{r.author}</span>
                      {r.verified && <span className="ml-2 text-sage">✓ Verified purchase</span>}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Complete the ritual</p>
              <h2 className="mt-2 font-display text-4xl font-medium">You may also love</h2>
            </div>
            <Link href={`/shop?category=${product.categorySlug}`} className="hidden sm:inline-block text-xs tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:text-gold hover:border-gold transition">
              More {product.categoryName}
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Accordion({ title, children, defaultOpen }: { title: string; children: React.ReactNode; defaultOpen?: boolean }) {
  return (
    <details open={defaultOpen} className="group border-b border-sand">
      <summary className="flex items-center justify-between py-4 cursor-pointer list-none text-xs tracking-[0.2em] uppercase font-semibold">
        {title}
        <span className="text-lg font-light transition-transform duration-300 group-open:rotate-45">+</span>
      </summary>
      <div className="pb-5">{children}</div>
    </details>
  );
}
