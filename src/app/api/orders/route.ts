import { db } from "@/db";
import { orderItems, orders, products } from "@/db/schema";
import { shippingCost } from "@/lib/utils";
import { eq, inArray } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type IncomingItem = { productId: number; quantity: number };

function orderNumber() {
  const t = Date.now().toString(36).toUpperCase();
  const r = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `EK-${t}${r}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const items: IncomingItem[] = Array.isArray(body.items)
      ? body.items
          .map((i: IncomingItem) => ({ productId: Number(i.productId), quantity: Math.max(1, Math.floor(Number(i.quantity))) }))
          .filter((i: IncomingItem) => i.productId && i.quantity)
      : [];
    const customer = {
      email: String(body.email ?? "").trim(),
      fullName: String(body.fullName ?? "").trim(),
      address: String(body.address ?? "").trim(),
      city: String(body.city ?? "").trim(),
      postalCode: String(body.postalCode ?? "").trim(),
      country: String(body.country ?? "").trim(),
      shippingMethod: body.shippingMethod === "express" ? "express" : "standard",
    };

    if (!items.length) return NextResponse.json({ error: "Your cart is empty" }, { status: 400 });
    for (const [k, v] of Object.entries(customer)) {
      if (!v) return NextResponse.json({ error: `Missing ${k}` }, { status: 400 });
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const dbProducts = await db
      .select()
      .from(products)
      .where(inArray(products.id, items.map((i) => i.productId)));
    const map = new Map(dbProducts.map((p) => [p.id, p]));

    let subtotal = 0;
    const lines = items.map((i) => {
      const p = map.get(i.productId);
      if (!p) throw new Error("Product not found");
      const qty = Math.min(i.quantity, p.stock);
      if (qty <= 0) throw new Error(`${p.name} is sold out`);
      const unit = parseFloat(p.price);
      subtotal += unit * qty;
      return { product: p, quantity: qty, unit };
    });

    const shipping = shippingCost(subtotal, customer.shippingMethod);
    const total = subtotal + shipping;

    const result = await db.transaction(async (tx) => {
      const [order] = await tx
        .insert(orders)
        .values({
          orderNumber: orderNumber(),
          ...customer,
          subtotal: subtotal.toFixed(2),
          shipping: shipping.toFixed(2),
          total: total.toFixed(2),
        })
        .returning();
      await tx.insert(orderItems).values(
        lines.map((l) => ({
          orderId: order.id,
          productId: l.product.id,
          productName: l.product.name,
          productImage: l.product.images[0],
          unitPrice: l.unit.toFixed(2),
          quantity: l.quantity,
        })),
      );
      for (const l of lines) {
        await tx
          .update(products)
          .set({ stock: l.product.stock - l.quantity })
          .where(eq(products.id, l.product.id));
      }
      return order;
    });

    return NextResponse.json({ orderNumber: result.orderNumber }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not place order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
