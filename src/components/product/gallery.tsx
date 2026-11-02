"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-3 lg:gap-4">
      {images.length > 1 && (
        <div className="flex lg:flex-col gap-3 overflow-x-auto no-scrollbar">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={cn(
                "relative shrink-0 w-20 aspect-[4/5] overflow-hidden bg-cream border transition-all",
                active === i ? "border-ink" : "border-transparent opacity-70 hover:opacity-100",
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="absolute inset-0 w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <div className="relative flex-1 aspect-[4/5] overflow-hidden bg-cream">
        {images.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src + i}
            src={src}
            alt={`${name} — image ${i + 1}`}
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700",
              active === i ? "opacity-100 scale-100" : "opacity-0 scale-[1.03] pointer-events-none",
            )}
          />
        ))}
      </div>
    </div>
  );
}
