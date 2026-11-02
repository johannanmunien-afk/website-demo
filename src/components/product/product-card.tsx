import Link from "next/link";
import type { ProductWithMeta } from "@/lib/queries";
import { formatPrice, cn } from "@/lib/utils";
import { Stars } from "@/components/product/stars";
import { AddToCart } from "@/components/product/add-to-cart";

export function ProductCard({ product, index = 0 }: { product: ProductWithMeta; index?: number }) {
  const onSale = product.compareAtPrice && parseFloat(product.compareAtPrice) > parseFloat(product.price);
  const discount = onSale
    ? Math.round((1 - parseFloat(product.price) / parseFloat(product.compareAtPrice!)) * 100)
    : 0;

  return (
    <article
      className={cn("group flex flex-col animate-fade-up", `delay-${Math.min((index % 4) + 1, 5)}`)}
    >
      <Link href={`/products/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden bg-cream img-zoom">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {product.images[1] && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.images[1]}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          />
        )}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="bg-ivory/95 text-ink text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">New</span>
          )}
          {onSale && (
            <span className="bg-plum text-ivory text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">−{discount}%</span>
          )}
          {product.tags.includes("bestseller") && !product.isNew && (
            <span className="bg-gold text-ivory text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">Bestseller</span>
          )}
        </div>
        <div className="absolute inset-x-3 bottom-3 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 hidden sm:block">
          <AddToCart product={product} variant="compact" />
        </div>
      </Link>
      <div className="pt-4 flex flex-col gap-1">
        <p className="text-[10px] tracking-[0.22em] uppercase text-muted">{product.brand}</p>
        <Link href={`/products/${product.slug}`} className="font-display text-xl leading-snug hover:text-gold transition-colors">
          {product.name}
        </Link>
        <p className="text-xs text-ink-soft line-clamp-1">{product.shortDescription}</p>
        <div className="flex items-center gap-2 mt-1">
          <Stars rating={product.avgRating} size={12} />
          <span className="text-[11px] text-muted">({product.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-[15px] font-medium">{formatPrice(product.price)}</span>
          {onSale && <span className="text-xs text-muted line-through">{formatPrice(product.compareAtPrice!)}</span>}
        </div>
        <div className="sm:hidden mt-2">
          <AddToCart product={product} variant="compact" />
        </div>
      </div>
    </article>
  );
}
