import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-32 text-center">
      <p className="text-[11px] tracking-[0.3em] uppercase text-gold">404</p>
      <h1 className="mt-3 font-display text-5xl font-medium">This corner of the kingdom doesn&apos;t exist.</h1>
      <p className="mt-4 text-ink-soft">The page you&apos;re looking for may have moved or never existed.</p>
      <Link href="/shop" className="mt-8 inline-block bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition">
        Back to the shop
      </Link>
    </div>
  );
}
