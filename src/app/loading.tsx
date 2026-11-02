export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12">
      <div className="h-12 w-72 bg-[linear-gradient(90deg,#f3ede4_25%,#e7dccd_50%,#f3ede4_75%)] bg-[length:200%_100%] animate-shimmer" />
      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] bg-[linear-gradient(90deg,#f3ede4_25%,#e7dccd_50%,#f3ede4_75%)] bg-[length:200%_100%] animate-shimmer" />
        ))}
      </div>
    </div>
  );
}
