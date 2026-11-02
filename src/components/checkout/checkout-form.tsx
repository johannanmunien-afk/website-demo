"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/cart-context";
import { cn, formatPrice, SHIPPING_METHODS, shippingCost, FREE_SHIPPING_THRESHOLD } from "@/lib/utils";

type Step = 1 | 2 | 3;

export function CheckoutForm() {
  const { items, subtotal, hydrated, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [shippingMethod, setShippingMethod] = useState<"standard" | "express">("standard");
  const [info, setInfo] = useState({ email: "", fullName: "", address: "", city: "", postalCode: "", country: "United States" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvc: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const shipping = shippingCost(subtotal, shippingMethod);
  const total = subtotal + shipping;

  const setField = (k: keyof typeof info) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setInfo((s) => ({ ...s, [k]: e.target.value }));

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...info,
          shippingMethod,
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Could not place order");
      clear();
      router.push(`/checkout/success?order=${encodeURIComponent(data.orderNumber)}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (!hydrated) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center text-muted text-sm tracking-widest uppercase">Loading your cart…</div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-4 py-32 text-center">
        <p className="font-display text-4xl">Your cart is empty</p>
        <p className="text-ink-soft mt-3">Add a few treasures before heading to checkout.</p>
        <Link href="/shop" className="mt-8 inline-block bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition">
          Shop the collection
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-16">
      <h1 className="font-display text-5xl font-medium">Checkout</h1>

      <ol className="mt-6 flex items-center gap-3 text-[11px] tracking-[0.2em] uppercase">
        {["Information", "Shipping", "Payment"].map((label, i) => {
          const n = (i + 1) as Step;
          return (
            <li key={label} className="flex items-center gap-3">
              <button
                type="button"
                disabled={n > step}
                onClick={() => setStep(n)}
                className={cn("flex items-center gap-2 transition", n === step ? "text-ink font-semibold" : n < step ? "text-gold" : "text-muted")}
              >
                <span className={cn("w-6 h-6 rounded-full border flex items-center justify-center text-[10px]", n <= step ? "border-gold bg-gold text-ivory" : "border-sand")}>
                  {n < step ? "✓" : n}
                </span>
                {label}
              </button>
              {i < 2 && <span className="w-8 h-px bg-sand" />}
            </li>
          );
        })}
      </ol>

      <div className="mt-10 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7">
          {step === 1 && (
            <form
              className="space-y-5 animate-fade-up"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(2);
              }}
            >
              <Section title="Contact">
                <Input label="Email" type="email" required value={info.email} onChange={setField("email")} autoComplete="email" />
              </Section>
              <Section title="Shipping address">
                <Input label="Full name" required value={info.fullName} onChange={setField("fullName")} autoComplete="name" />
                <Input label="Address" required value={info.address} onChange={setField("address")} autoComplete="street-address" />
                <div className="grid sm:grid-cols-3 gap-4">
                  <Input label="City" required value={info.city} onChange={setField("city")} autoComplete="address-level2" />
                  <Input label="Postal code" required value={info.postalCode} onChange={setField("postalCode")} autoComplete="postal-code" />
                  <Input label="Country" required value={info.country} onChange={setField("country")} autoComplete="country-name" />
                </div>
              </Section>
              <div className="flex items-center justify-between pt-2">
                <Link href="/shop" className="text-xs tracking-wider uppercase text-muted hover:text-ink">← Continue shopping</Link>
                <PrimaryButton type="submit">Continue to shipping</PrimaryButton>
              </div>
            </form>
          )}

          {step === 2 && (
            <form
              className="space-y-6 animate-fade-up"
              onSubmit={(e) => {
                e.preventDefault();
                setStep(3);
              }}
            >
              <Summary rows={[["Contact", info.email], ["Ship to", `${info.address}, ${info.city} ${info.postalCode}, ${info.country}`]]} onEdit={() => setStep(1)} />
              <Section title="Delivery method">
                <div className="space-y-3">
                  {SHIPPING_METHODS.map((m) => {
                    const price = shippingCost(subtotal, m.id);
                    return (
                      <label
                        key={m.id}
                        className={cn(
                          "flex items-center justify-between gap-4 border px-5 py-4 cursor-pointer transition",
                          shippingMethod === m.id ? "border-gold bg-cream" : "border-sand hover:border-ink/40",
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <input type="radio" name="shipping" className="accent-gold" checked={shippingMethod === m.id} onChange={() => setShippingMethod(m.id)} />
                          <span>
                            <span className="block text-sm font-medium">{m.label}</span>
                            <span className="block text-xs text-muted">{m.eta}</span>
                          </span>
                        </span>
                        <span className="text-sm font-medium">{price === 0 ? "Free" : formatPrice(price)}</span>
                      </label>
                    );
                  })}
                </div>
                {subtotal < FREE_SHIPPING_THRESHOLD && (
                  <p className="text-xs text-muted mt-3">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} more for complimentary standard shipping.
                  </p>
                )}
              </Section>
              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={() => setStep(1)} className="text-xs tracking-wider uppercase text-muted hover:text-ink">← Back</button>
                <PrimaryButton type="submit">Continue to payment</PrimaryButton>
              </div>
            </form>
          )}

          {step === 3 && (
            <form className="space-y-6 animate-fade-up" onSubmit={placeOrder}>
              <Summary
                rows={[
                  ["Contact", info.email],
                  ["Ship to", `${info.address}, ${info.city} ${info.postalCode}, ${info.country}`],
                  ["Method", `${SHIPPING_METHODS.find((m) => m.id === shippingMethod)?.label} · ${shipping === 0 ? "Free" : formatPrice(shipping)}`],
                ]}
                onEdit={() => setStep(2)}
              />
              <Section title="Payment">
                <p className="text-xs text-muted -mt-2 mb-3">Demo checkout — no real payment is processed. Use any card details.</p>
                <div className="bg-cream p-5 space-y-4 border border-sand">
                  <Input
                    label="Card number"
                    required
                    inputMode="numeric"
                    placeholder="4242 4242 4242 4242"
                    value={card.number}
                    onChange={(e) => setCard((c) => ({ ...c, number: e.target.value.replace(/[^\d ]/g, "").slice(0, 19) }))}
                  />
                  <Input label="Name on card" required value={card.name} onChange={(e) => setCard((c) => ({ ...c, name: e.target.value }))} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Expiry (MM/YY)" required placeholder="12/28" value={card.expiry} onChange={(e) => setCard((c) => ({ ...c, expiry: e.target.value.slice(0, 5) }))} />
                    <Input label="CVC" required inputMode="numeric" placeholder="123" value={card.cvc} onChange={(e) => setCard((c) => ({ ...c, cvc: e.target.value.replace(/\D/g, "").slice(0, 4) }))} />
                  </div>
                </div>
              </Section>
              {error && <p className="text-sm text-red-700 bg-red-50 border border-red-200 px-4 py-3">{error}</p>}
              <div className="flex items-center justify-between pt-2">
                <button type="button" onClick={() => setStep(2)} className="text-xs tracking-wider uppercase text-muted hover:text-ink">← Back</button>
                <PrimaryButton type="submit" disabled={submitting}>
                  {submitting ? "Placing order…" : `Pay ${formatPrice(total)}`}
                </PrimaryButton>
              </div>
              <p className="text-[11px] text-muted flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="10" width="16" height="11" rx="1" /><path d="M8 10V7a4 4 0 018 0v3" /></svg>
                Encrypted & secure checkout
              </p>
            </form>
          )}
        </div>

        <aside className="lg:col-span-5">
          <div className="bg-cream p-6 sm:p-8 lg:sticky lg:top-28">
            <p className="text-[11px] tracking-[0.25em] uppercase text-gold">Order summary</p>
            <ul className="mt-5 divide-y divide-sand">
              {items.map((i) => (
                <li key={i.productId} className="py-4 flex gap-4">
                  <div className="relative w-16 aspect-[4/5] bg-ivory overflow-hidden shrink-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={i.image} alt={i.name} className="absolute inset-0 w-full h-full object-cover" />
                    <span className="absolute -top-1 -right-1 bg-ink text-ivory text-[10px] w-5 h-5 rounded-full flex items-center justify-center">{i.quantity}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] tracking-[0.2em] uppercase text-muted">{i.brand}</p>
                    <p className="font-display text-lg leading-tight">{i.name}</p>
                  </div>
                  <p className="text-sm font-medium">{formatPrice(i.price * i.quantity)}</p>
                </li>
              ))}
            </ul>
            <dl className="mt-4 space-y-2 text-sm border-t border-sand pt-4">
              <div className="flex justify-between"><dt className="text-ink-soft">Subtotal</dt><dd>{formatPrice(subtotal)}</dd></div>
              <div className="flex justify-between"><dt className="text-ink-soft">Shipping</dt><dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between items-baseline pt-3 border-t border-sand">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display text-3xl font-semibold">{formatPrice(total)}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-2xl font-medium mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5">{label}</span>
      <input
        {...props}
        className="w-full bg-ivory border border-sand focus:border-gold outline-none px-4 py-3 text-sm transition"
      />
    </label>
  );
}

function PrimaryButton({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition disabled:opacity-60 disabled:hover:bg-ink"
    >
      {children}
    </button>
  );
}

function Summary({ rows, onEdit }: { rows: [string, string][]; onEdit: () => void }) {
  return (
    <div className="border border-sand divide-y divide-sand text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-center gap-4 px-5 py-3">
          <span className="w-20 text-muted text-xs tracking-wider uppercase">{k}</span>
          <span className="flex-1 truncate">{v}</span>
          <button type="button" onClick={onEdit} className="text-xs text-gold hover:text-ink underline-offset-4 hover:underline">Edit</button>
        </div>
      ))}
    </div>
  );
}
