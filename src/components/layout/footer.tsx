import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-ivory mt-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-3xl font-semibold">Esther&apos;s Kingdom</p>
          <p className="mt-3 text-ivory/60 max-w-sm leading-relaxed text-sm">
            A store with everything you need, under one kingdom. Thoughtfully curated household and beauty
            essentials for young adults, adults — for everyone.
          </p>
          <form className="mt-6 flex max-w-sm border-b border-ivory/30 focus-within:border-gold transition">
            <input
              type="email"
              placeholder="Join the kingdom — your email"
              className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ivory/40"
            />
            <button type="button" className="text-[11px] tracking-[0.2em] uppercase font-semibold text-gold-light">
              Subscribe
            </button>
          </form>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-light mb-4">Shop</p>
          <ul className="space-y-2.5 text-sm text-ivory/75">
            <li><Link href="/shop?category=skincare" className="hover:text-ivory">Skincare</Link></li>
            <li><Link href="/shop?category=bath-body" className="hover:text-ivory">Bath & Body</Link></li>
            <li><Link href="/shop?category=grooming" className="hover:text-ivory">Grooming</Link></li>
            <li><Link href="/shop?category=home-fragrance" className="hover:text-ivory">Home Fragrance</Link></li>
            <li><Link href="/shop?category=kitchen" className="hover:text-ivory">Kitchen</Link></li>
            <li><Link href="/shop?category=living" className="hover:text-ivory">Living & Decor</Link></li>
          </ul>
        </div>
        <div className="md:col-span-2">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-light mb-4">For</p>
          <ul className="space-y-2.5 text-sm text-ivory/75">
            <li><Link href="/shop?audience=women" className="hover:text-ivory">Her</Link></li>
            <li><Link href="/shop?audience=men" className="hover:text-ivory">Him</Link></li>
            <li><Link href="/shop?audience=everyone" className="hover:text-ivory">Everyone</Link></li>
            <li><Link href="/shop?tag=gift" className="hover:text-ivory">Gifts</Link></li>
            <li><Link href="/shop?sort=newest" className="hover:text-ivory">New Arrivals</Link></li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <p className="text-[11px] tracking-[0.25em] uppercase text-gold-light mb-4">Help</p>
          <ul className="space-y-2.5 text-sm text-ivory/75">
            <li>Shipping & Returns</li>
            <li>Track an Order</li>
            <li>Contact: hello@estherskingdom.shop</li>
            <li>Mon–Sat, 9am–6pm</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] tracking-wider text-ivory/45 uppercase">
          <span>© {new Date().getFullYear()} Esther&apos;s Kingdom. All rights reserved.</span>
          <span>Secure checkout · Visa · Mastercard · Amex · PayPal</span>
        </div>
      </div>
    </footer>
  );
}
