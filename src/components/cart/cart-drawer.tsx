"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-context";
import { formatPrice, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

export function CartDrawer() {
  const { isOpen, closeCart, items, subtotal, setQuantity, removeItem } = useCart();
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px] animate-fade-in" onClick={closeCart} />
      <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-ivory shadow-2xl flex flex-col animate-slide-in-right">
        <div className="flex items-center justify-between px-6 py-5 border-b border-sand">
          <h2 className="font-display text-2xl font-semibold">Your Cart</h2>
          <button onClick={closeCart} aria-label="Close cart" className="p-2 -mr-2 hover:opacity-60 transition">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 border-b border-sand bg-cream/60">
          {remaining > 0 ? (
            <p className="text-xs text-ink-soft">
              You&apos;re <span className="font-semibold text-ink">{formatPrice(remaining)}</span> away from complimentary shipping.
            </p>
          ) : (
            <p className="text-xs text-ink-soft">✦ You&apos;ve unlocked complimentary shipping.</p>
          )}
          <div className="mt-2 h-1 bg-sand rounded-full overflow-hidden">
            <div className="h-full bg-gold transition-all duration-700" style={{ width: `${progress}%` }} />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-16">
              <p className="font-display text-3xl">Your cart is empty</p>
              <p className="text-sm text-muted mt-2">Discover something you&apos;ll love.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="mt-6 inline-block bg-ink text-ivory px-7 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold transition"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-sand">
              {items.map((item) => (
                <li key={item.productId} className="py-5 flex gap-4 animate-fade-in">
                  <Link href={`/products/${item.slug}`} onClick={closeCart} className="shrink-0 w-24 aspect-[4/5] bg-cream overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0 flex flex-col">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted">{item.brand}</p>
                    <Link href={`/products/${item.slug}`} onClick={closeCart} className="font-display text-lg leading-tight mt-0.5 hover:text-gold transition">
                      {item.name}
                    </Link>
                    <p className="text-sm mt-1">{formatPrice(item.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="inline-flex items-center border border-sand">
                        <button
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5 hover:bg-cream transition"
                          onClick={() => setQuantity(item.productId, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          aria-label="Increase quantity"
                          className="px-3 py-1.5 hover:bg-cream transition disabled:opacity-30"
                          disabled={item.quantity >= item.stock}
                          onClick={() => setQuantity(item.productId, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.productId)}
                        className="text-[11px] tracking-wider uppercase text-muted hover:text-ink underline-offset-4 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-sand px-6 py-5 bg-ivory">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-soft">Subtotal</span>
              <span className="font-display text-2xl font-semibold">{formatPrice(subtotal)}</span>
            </div>
            <p className="text-[11px] text-muted mt-1">Shipping and taxes calculated at checkout.</p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-4 block w-full text-center bg-ink text-ivory py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition"
            >
              Checkout
            </Link>
            <button onClick={closeCart} className="mt-3 w-full text-center text-xs tracking-wider uppercase text-muted hover:text-ink">
              Continue shopping
            </button>
          </div>
        )}
      </aside>
    </div>
  );
}
