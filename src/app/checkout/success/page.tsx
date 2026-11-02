import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { formatPrice, SHIPPING_METHODS } from "@/lib/utils";
import { eq } from "drizzle-orm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Order confirmed" };

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ order?: string }> }) {
  const { order: orderNumber } = await searchParams;
  if (!orderNumber) notFound();

  const [order] = await db.select().from(orders).where(eq(orders.orderNumber, orderNumber)).limit(1);
  if (!order) notFound();
  const items = await db.select().from(orderItems).where(eq(orderItems.orderId, order.id));
  const method = SHIPPING_METHODS.find((m) => m.id === order.shippingMethod);

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-16 pb-16">
      <div className="text-center animate-fade-up">
        <div className="mx-auto w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12l5 5L20 7" /></svg>
        </div>
        <p className="mt-6 text-[11px] tracking-[0.3em] uppercase text-gold">Order {order.orderNumber}</p>
        <h1 className="mt-3 font-display text-5xl sm:text-6xl font-medium">Thank you, {order.fullName.split(" ")[0]}.</h1>
        <p className="mt-4 text-ink-soft max-w-md mx-auto">
          Your order is confirmed. A receipt has been sent to <span className="text-ink font-medium">{order.email}</span>.
          We&apos;ll let you know the moment it ships.
        </p>
      </div>

      <div className="mt-12 bg-cream p-6 sm:p-8 animate-fade-up delay-2">
        <ul className="divide-y divide-sand">
          {items.map((i) => (
            <li key={i.id} className="py-4 flex items-center gap-4">
              <div className="w-16 aspect-[4/5] bg-ivory overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={i.productImage} alt={i.productName} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-display text-lg leading-tight">{i.productName}</p>
                <p className="text-xs text-muted mt-0.5">Qty {i.quantity} · {formatPrice(i.unitPrice)}</p>
              </div>
              <p className="text-sm font-medium">{formatPrice(parseFloat(i.unitPrice) * i.quantity)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-4 pt-4 border-t border-sand space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-ink-soft">Shipping ({method?.label ?? order.shippingMethod})</dt><dd>{parseFloat(order.shipping) === 0 ? "Free" : formatPrice(order.shipping)}</dd></div>
          <div className="flex justify-between items-baseline pt-3 border-t border-sand">
            <dt className="font-semibold">Total</dt>
            <dd className="font-display text-3xl font-semibold">{formatPrice(order.total)}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 gap-6 text-sm animate-fade-up delay-3">
        <div className="border border-sand p-5">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-2">Shipping to</p>
          <p>{order.fullName}</p>
          <p className="text-ink-soft">{order.address}</p>
          <p className="text-ink-soft">{order.city}, {order.postalCode}</p>
          <p className="text-ink-soft">{order.country}</p>
        </div>
        <div className="border border-sand p-5">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-2">Estimated delivery</p>
          <p>{method?.eta ?? "4–6 business days"}</p>
          <p className="text-ink-soft mt-2">Placed {new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link href="/shop" className="inline-block bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition">
          Continue shopping
        </Link>
      </div>
    </div>
  );
}
