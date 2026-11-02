"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "rating", label: "Top rated" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
];

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const value = params.get("sort") ?? "featured";

  return (
    <label className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-muted">
      <span className="hidden sm:inline">Sort</span>
      <select
        value={value}
        onChange={(e) => {
          const next = new URLSearchParams(params.toString());
          if (e.target.value === "featured") next.delete("sort");
          else next.set("sort", e.target.value);
          router.push(`${pathname}?${next.toString()}`, { scroll: false });
        }}
        className="bg-transparent border border-ink/20 px-3 py-2.5 text-ink text-xs tracking-wider uppercase outline-none focus:border-gold cursor-pointer"
      >
        {OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
