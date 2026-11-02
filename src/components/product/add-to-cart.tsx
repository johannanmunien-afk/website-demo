"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

type Props = {
  product: {
    id: number;
    slug: string;
    name: string;
    brand: string;
    price: string;
    images: string[];
    stock: number;
  };
  variant?: "full" | "compact";
  showQuantity?: boolean;
};

export function AddToCart({ product, variant = "full", showQuantity = false }: Props) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const soldOut = product.stock <= 0;

  const handle = () => {
    if (soldOut) return;
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        brand: product.brand,
        price: parseFloat(product.price),
        image: product.images[0],
        stock: product.stock,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  if (variant === "compact") {
    return (
      <button
        onClick={(e) => {
          e.preventDefault();
          handle();
        }}
        disabled={soldOut}
        className={cn(
          "w-full py-3 text-[11px] tracking-[0.2em] uppercase font-semibold transition-colors",
          soldOut ? "bg-sand text-muted cursor-not-allowed" : added ? "bg-gold text-ivory" : "bg-ink text-ivory hover:bg-gold",
        )}
      >
        {soldOut ? "Sold out" : added ? "Added ✓" : "Add to cart"}
      </button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      {showQuantity && (
        <div className="inline-flex items-center border border-ink/20 self-start">
          <button className="px-4 py-3.5 hover:bg-cream transition" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease">
            −
          </button>
          <span className="w-10 text-center text-sm">{qty}</span>
          <button
            className="px-4 py-3.5 hover:bg-cream transition disabled:opacity-30"
            disabled={qty >= product.stock}
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            aria-label="Increase"
          >
            +
          </button>
        </div>
      )}
      <button
        onClick={handle}
        disabled={soldOut}
        className={cn(
          "flex-1 py-4 px-8 text-xs tracking-[0.25em] uppercase font-semibold transition-all duration-300",
          soldOut ? "bg-sand text-muted cursor-not-allowed" : added ? "bg-gold text-ivory scale-[0.99]" : "bg-ink text-ivory hover:bg-gold",
        )}
      >
        {soldOut ? "Sold out" : added ? "Added to cart ✓" : "Add to cart"}
      </button>
    </div>
  );
}
