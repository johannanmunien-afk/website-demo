import Link from "next/link";
import { getCategories, getFeaturedProducts, getNewArrivals } from "@/lib/queries";
import { ProductCard } from "@/components/product/product-card";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

const HERO_IMAGE =
  "https://images.pexels.com/photos/28752006/pexels-photo-28752006.jpeg?auto=compress&cs=tinysrgb&w=2000&h=1400&fit=crop";
const STORY_IMAGE =
  "https://images.pexels.com/photos/27975928/pexels-photo-27975928.jpeg?auto=compress&cs=tinysrgb&w=1400&h=1600&fit=crop";
const HIM_IMAGE =
  "https://images.pexels.com/photos/40521620/pexels-photo-40521620.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop";
const HER_IMAGE =
  "https://images.pexels.com/photos/15930068/pexels-photo-15930068.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop";
const HOME_IMAGE =
  "https://images.pexels.com/photos/19599184/pexels-photo-19599184.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop";

const TESTIMONIALS = [
  { quote: "Everything arrived beautifully packaged. It genuinely feels like shopping at a boutique — from my sofa.", name: "Amara O.", city: "London" },
  { quote: "The one store I trust for both my skincare and my kitchen. The curation is impeccable.", name: "Samuel O.", city: "Lagos" },
  { quote: "Bought gifts for my partner and my mum in one order. Both were thrilled.", name: "Chris N.", city: "Toronto" },
];

export default async function HomePage() {
  const [categories, featured, arrivals] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
    getNewArrivals(),
  ]);

  return (
    <>
      {/* HERO */}
      <section className="relative -mt-[calc(4rem+2.25rem)] lg:-mt-[calc(5rem+2.25rem)] min-h-[92vh] flex items-end overflow-hidden bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMAGE} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80 scale-105 animate-[fade-in_1.4s_ease_both]" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div className="relative mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-20 pt-48 text-ivory">
          <p className="text-[11px] tracking-[0.4em] uppercase text-gold-light animate-fade-up">Household · Beauty · Living</p>
          <h1 className="mt-5 font-display text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-medium max-w-4xl animate-fade-up delay-1">
            Everything you need,<br />
            <em className="italic font-normal text-gold-light">under one kingdom.</em>
          </h1>
          <p className="mt-6 max-w-lg text-ivory/75 text-base leading-relaxed animate-fade-up delay-2">
            Thoughtfully curated skincare, grooming, home fragrance, kitchen and living essentials — for her, for him, for
            everyone.
          </p>
          <div className="mt-9 flex flex-wrap gap-4 animate-fade-up delay-3">
            <Link href="/shop" className="bg-ivory text-ink px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold hover:text-ivory transition-colors">
              Shop the collection
            </Link>
            <Link href="/shop?tag=bestseller" className="border border-ivory/60 text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-ivory/10 transition-colors">
              Bestsellers
            </Link>
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="border-y border-sand bg-cream overflow-hidden py-3">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {Array.from({ length: 2 }).map((_, k) => (
            <div key={k} className="flex items-center gap-10 pr-10 text-[11px] tracking-[0.3em] uppercase text-ink-soft">
              {["Free shipping over $75", "✦", "Clean beauty", "✦", "Small-batch makers", "✦", "30-day returns", "✦", "Gift wrapping available", "✦", "Secure checkout", "✦"].map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Shop by collection</p>
            <h2 className="mt-2 font-display text-4xl sm:text-5xl font-medium">Every corner of the kingdom</h2>
          </div>
          <Link href="/shop" className="hidden sm:inline-block text-xs tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:text-gold hover:border-gold transition">
            View all
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((c, i) => (
            <Link
              key={c.id}
              href={`/shop?category=${c.slug}`}
              className={cn(
                "group relative overflow-hidden img-zoom bg-cream animate-fade-up",
                i === 0 || i === 5 ? "lg:row-span-2 aspect-[4/5] lg:aspect-auto" : "aspect-[4/5] lg:aspect-[4/3]",
                `delay-${Math.min(i + 1, 5)}`,
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image} alt={c.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7 text-ivory">
                <p className="font-display text-2xl sm:text-3xl font-medium">{c.name}</p>
                <p className="text-xs text-ivory/75 mt-1 hidden sm:block">{c.tagline}</p>
                <span className="mt-3 inline-block text-[10px] tracking-[0.25em] uppercase border-b border-ivory/60 pb-0.5 group-hover:border-gold-light group-hover:text-gold-light transition">
                  Explore
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center max-w-xl mx-auto">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Crowned favourites</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-medium">Featured this season</h2>
          <div className="gold-line h-px w-32 mx-auto mt-6" />
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
          {featured.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      </section>

      {/* FOR HER / HIM / HOME */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {[
            { href: "/shop?audience=women", img: HER_IMAGE, label: "For Her", sub: "Rituals of radiance" },
            { href: "/shop?audience=men", img: HIM_IMAGE, label: "For Him", sub: "Sharp, considered essentials" },
            { href: "/shop?category=home-fragrance", img: HOME_IMAGE, label: "For the Home", sub: "Atmosphere in every room" },
          ].map((b, i) => (
            <Link key={b.href} href={b.href} className={cn("group relative aspect-[4/5] overflow-hidden img-zoom bg-cream animate-fade-up", `delay-${i + 1}`)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={b.img} alt={b.label} loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-ink/20 group-hover:bg-ink/35 transition-colors duration-500" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-ivory text-center p-6">
                <p className="text-[11px] tracking-[0.35em] uppercase text-ivory/80">{b.sub}</p>
                <p className="font-display text-5xl font-medium mt-2">{b.label}</p>
                <span className="mt-5 border border-ivory/70 px-5 py-2 text-[10px] tracking-[0.25em] uppercase group-hover:bg-ivory group-hover:text-ink transition-colors">
                  Shop now
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="mt-24 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="relative aspect-[4/5] lg:aspect-[5/6] overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={STORY_IMAGE} alt="Esther's Kingdom ceramics" loading="lazy" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute -bottom-px -right-px bg-cream px-6 py-4">
              <p className="font-display italic text-2xl text-gold">Curated with care</p>
            </div>
          </div>
          <div>
            <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Our story</p>
            <h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium leading-tight">
              One kingdom. <em className="italic font-normal">Every essential.</em>
            </h2>
            <p className="mt-6 text-ink-soft leading-relaxed">
              Esther&apos;s Kingdom began with a simple frustration: why should the things that make a home feel like home
              — and the things that make you feel like you — live in a dozen different shops? We bring the best of
              household and beauty under one roof, chosen for quality, honesty and quiet beauty.
            </p>
            <ul className="mt-8 grid sm:grid-cols-3 gap-6">
              {[
                ["20+", "Curated products"],
                ["6", "Collections"],
                ["4.8★", "Average rating"],
              ].map(([n, l]) => (
                <li key={l}>
                  <p className="font-display text-4xl font-semibold">{n}</p>
                  <p className="text-xs tracking-wider uppercase text-muted mt-1">{l}</p>
                </li>
              ))}
            </ul>
            <Link href="/shop" className="mt-10 inline-block bg-ink text-ivory px-8 py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gold transition-colors">
              Explore the kingdom
            </Link>
          </div>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      {arrivals.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Just landed</p>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl font-medium">New arrivals</h2>
            </div>
            <Link href="/shop?sort=newest" className="hidden sm:inline-block text-xs tracking-[0.2em] uppercase font-semibold border-b border-ink pb-1 hover:text-gold hover:border-gold transition">
              See all new
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10 sm:gap-x-6">
            {arrivals.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        <div className="text-center">
          <p className="text-[11px] tracking-[0.3em] uppercase text-gold">Words from the kingdom</p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-medium">Loved by thousands</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <figure key={t.name} className={cn("bg-cream p-8 animate-fade-up", `delay-${i + 1}`)}>
              <p className="text-gold text-xl tracking-widest">★★★★★</p>
              <blockquote className="mt-4 font-display text-2xl leading-snug">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 text-xs tracking-[0.2em] uppercase text-muted">
                {t.name} · {t.city}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* PROMISES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 border-y border-sand py-10">
          {[
            ["Complimentary shipping", "On every order over $75, worldwide."],
            ["30-day returns", "Changed your mind? We'll take it back."],
            ["Honest ingredients", "Clean, cruelty-free beauty — always."],
            ["Secure checkout", "Encrypted payments, every time."],
          ].map(([h, s]) => (
            <div key={h}>
              <p className="font-display text-xl font-semibold">{h}</p>
              <p className="text-sm text-ink-soft mt-1">{s}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
