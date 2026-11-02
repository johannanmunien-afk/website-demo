"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/shop", label: "Shop All" },
  { href: "/shop?category=skincare", label: "Skincare" },
  { href: "/shop?category=bath-body", label: "Bath & Body" },
  { href: "/shop?category=grooming", label: "Grooming" },
  { href: "/shop?category=home-fragrance", label: "Fragrance" },
  { href: "/shop?category=kitchen", label: "Kitchen" },
  { href: "/shop?category=living", label: "Living" },
];

export function Header() {
  const { count, openCart, hydrated } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/shop?q=${encodeURIComponent(term)}` : "/shop");
    setSearchOpen(false);
  };

  const transparent = pathname === "/" && !scrolled && !menuOpen && !searchOpen;

  return (
    <>
      <div className="bg-ink text-ivory text-[11px] tracking-[0.2em] uppercase text-center py-2 px-4">
        Complimentary shipping on orders over $75 · Free returns within 30 days
      </div>
      <header
        className={cn(
          "sticky top-0 z-40 transition-all duration-500",
          transparent
            ? "bg-transparent text-ivory"
            : "bg-ivory/90 backdrop-blur-md border-b border-sand text-ink shadow-[0_1px_0_rgba(0,0,0,0.02)]",
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <button
              aria-label="Open menu"
              className="lg:hidden p-2 -ml-2"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                {menuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 7h18M3 12h18M3 17h18" />}
              </svg>
            </button>

            <Link href="/" className="flex flex-col items-center lg:items-start leading-none group">
              <span className="font-display text-2xl lg:text-[28px] font-semibold tracking-wide">
                Esther&apos;s Kingdom
              </span>
              <span className={cn("text-[9px] tracking-[0.35em] uppercase mt-1 transition-colors", transparent ? "text-ivory/70" : "text-gold")}>
                Est. for everyone
              </span>
            </Link>

            <nav className="hidden lg:flex items-center gap-7 text-[13px] tracking-wide font-medium">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="relative py-1 after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-current after:transition-all after:duration-300 hover:after:w-full"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-1 sm:gap-2">
              <button
                aria-label="Search"
                className="p-2 hover:opacity-70 transition"
                onClick={() => setSearchOpen((v) => !v)}
              >
                <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M20 20l-3.5-3.5" />
                </svg>
              </button>
              <button
                aria-label="Open cart"
                className="relative p-2 hover:opacity-70 transition"
                onClick={openCart}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 8h14l-1 12H6L5 8z" />
                  <path d="M9 8V6a3 3 0 016 0v2" />
                </svg>
                {hydrated && count > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-gold text-ivory text-[10px] font-semibold flex items-center justify-center animate-fade-in">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {searchOpen && (
          <div className="border-t border-sand bg-ivory text-ink animate-fade-in">
            <form onSubmit={onSearch} className="mx-auto max-w-3xl px-4 py-4 flex gap-3">
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search serums, candles, cookware…"
                className="flex-1 bg-transparent border-b border-ink/30 focus:border-gold outline-none py-2 text-lg font-display placeholder:text-muted"
              />
              <button type="submit" className="text-xs tracking-[0.2em] uppercase font-semibold hover:text-gold transition">
                Search
              </button>
            </form>
          </div>
        )}

        {menuOpen && (
          <div className="lg:hidden border-t border-sand bg-ivory text-ink animate-fade-in">
            <nav className="flex flex-col px-6 py-4">
              {NAV.map((n, i) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className={cn("py-3 border-b border-sand/70 font-display text-2xl animate-fade-up", `delay-${Math.min(i + 1, 5)}`)}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
