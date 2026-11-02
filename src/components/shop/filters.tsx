"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Category } from "@/db/schema";
import { cn } from "@/lib/utils";

const AUDIENCES = [
  { value: "", label: "Everyone" },
  { value: "women", label: "For Her" },
  { value: "men", label: "For Him" },
];

const TAGS = [
  { value: "bestseller", label: "Bestsellers" },
  { value: "gift", label: "Giftable" },
  { value: "vegan", label: "Vegan" },
  { value: "clean beauty", label: "Clean beauty" },
];

export function Filters({
  categories,
  bounds,
  mode = "sidebar",
}: {
  categories: Category[];
  bounds: { min: number; max: number };
  mode?: "sidebar" | "button";
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [open, setOpen] = useState(false);

  const current = {
    category: params.get("category") ?? "",
    audience: params.get("audience") ?? "",
    tag: params.get("tag") ?? "",
    max: params.get("max") ? Number(params.get("max")) : bounds.max,
  };
  const [maxLocal, setMaxLocal] = useState(current.max);
  useEffect(() => setMaxLocal(current.max), [current.max]);

  const update = useCallback(
    (key: string, value: string) => {
      const next = new URLSearchParams(params.toString());
      if (value) next.set(key, value);
      else next.delete(key);
      router.push(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [params, pathname, router],
  );

  const clearAll = () => router.push(pathname, { scroll: false });
  const active = [current.category, current.audience, current.tag, params.get("max"), params.get("q")].filter(Boolean).length;

  const body = (
    <div className="space-y-8">
      <FilterGroup title="Collection">
        <FilterOption active={!current.category} onClick={() => update("category", "")} label="All collections" />
        {categories.map((c) => (
          <FilterOption key={c.id} active={current.category === c.slug} onClick={() => update("category", c.slug)} label={c.name} />
        ))}
      </FilterGroup>

      <FilterGroup title="Shop for">
        {AUDIENCES.map((a) => (
          <FilterOption key={a.value} active={current.audience === a.value} onClick={() => update("audience", a.value)} label={a.label} />
        ))}
      </FilterGroup>

      <FilterGroup title="Highlights">
        {TAGS.map((t) => (
          <FilterOption
            key={t.value}
            active={current.tag === t.value}
            onClick={() => update("tag", current.tag === t.value ? "" : t.value)}
            label={t.label}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Max price">
        <input
          type="range"
          min={bounds.min}
          max={bounds.max}
          step={1}
          value={maxLocal}
          onChange={(e) => setMaxLocal(Number(e.target.value))}
          onMouseUp={() => update("max", maxLocal >= bounds.max ? "" : String(maxLocal))}
          onTouchEnd={() => update("max", maxLocal >= bounds.max ? "" : String(maxLocal))}
          onKeyUp={() => update("max", maxLocal >= bounds.max ? "" : String(maxLocal))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted mt-1">
          <span>${bounds.min}</span>
          <span className="text-ink font-medium">Up to ${maxLocal}</span>
        </div>
      </FilterGroup>

      {active > 0 && (
        <button onClick={clearAll} className="text-xs tracking-[0.2em] uppercase font-semibold text-gold hover:text-ink transition">
          Clear all filters ({active})
        </button>
      )}
    </div>
  );

  if (mode === "sidebar") {
    return <aside className="hidden lg:block w-60 shrink-0 sticky top-28 self-start">{body}</aside>;
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 border border-ink/20 px-4 py-2.5 text-xs tracking-[0.2em] uppercase font-semibold"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 6h18M6 12h12M10 18h4" /></svg>
        Filters {active > 0 && `(${active})`}
      </button>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-ink/40 animate-fade-in" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-80 max-w-[85vw] bg-ivory p-6 overflow-y-auto animate-[slide-in-right_0.4s_cubic-bezier(0.22,1,0.36,1)_both] [animation-direction:reverse]">
            <div className="flex items-center justify-between mb-6">
              <p className="font-display text-2xl">Filters</p>
              <button onClick={() => setOpen(false)} aria-label="Close filters" className="p-1">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>
            {body}
            <button onClick={() => setOpen(false)} className="mt-8 w-full bg-ink text-ivory py-3.5 text-xs tracking-[0.25em] uppercase font-semibold">
              Show results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-3">{title}</p>
      <div className="flex flex-col gap-1">{children}</div>
    </div>
  );
}

function FilterOption({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-left text-sm py-1 flex items-center gap-2.5 transition-colors",
        active ? "text-ink font-medium" : "text-ink-soft hover:text-ink",
      )}
    >
      <span className={cn("w-3.5 h-3.5 border rounded-full flex items-center justify-center transition", active ? "border-gold" : "border-ink/30")}>
        {active && <span className="w-1.5 h-1.5 bg-gold rounded-full" />}
      </span>
      {label}
    </button>
  );
}
