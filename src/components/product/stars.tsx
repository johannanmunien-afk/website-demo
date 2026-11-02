import { cn } from "@/lib/utils";

export function Stars({ rating, size = 14, className }: { rating: number; size?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5", className)} aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => {
        const fill = Math.max(0, Math.min(1, rating - (i - 1)));
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" className="shrink-0">
            <defs>
              <linearGradient id={`g-${i}-${Math.round(fill * 100)}`}>
                <stop offset={`${fill * 100}%`} stopColor="#b8894a" />
                <stop offset={`${fill * 100}%`} stopColor="#e7dccd" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#g-${i}-${Math.round(fill * 100)})`}
              d="M12 2.5l2.9 6.2 6.8.8-5 4.7 1.3 6.8L12 17.7 6 21l1.3-6.8-5-4.7 6.8-.8L12 2.5z"
            />
          </svg>
        );
      })}
    </span>
  );
}
