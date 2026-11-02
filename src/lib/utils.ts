export function formatPrice(value: string | number) {
  const n = typeof value === "string" ? parseFloat(value) : value;
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export const FREE_SHIPPING_THRESHOLD = 75;

export const SHIPPING_METHODS = [
  { id: "standard", label: "Standard", eta: "4–6 business days", price: 6.95 },
  { id: "express", label: "Express", eta: "1–2 business days", price: 14.95 },
] as const;

export function shippingCost(subtotal: number, method: string) {
  const m = SHIPPING_METHODS.find((s) => s.id === method) ?? SHIPPING_METHODS[0];
  if (m.id === "standard" && subtotal >= FREE_SHIPPING_THRESHOLD) return 0;
  return m.price;
}
