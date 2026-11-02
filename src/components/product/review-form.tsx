"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

export function ReviewForm({ productId }: { productId: number }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(0);
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("saving");
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId,
        rating,
        author: form.get("author"),
        title: form.get("title"),
        body: form.get("body"),
      }),
    });
    if (res.ok) {
      setStatus("done");
      router.refresh();
      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
      }, 1500);
    } else {
      setStatus("error");
    }
  };

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="border border-ink px-6 py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-ink hover:text-ivory transition-colors"
      >
        Write a review
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="bg-cream p-6 sm:p-8 space-y-5 animate-fade-up">
      <div>
        <p className="text-[11px] tracking-[0.25em] uppercase text-gold mb-2">Your rating</p>
        <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              onMouseEnter={() => setHover(i)}
              onClick={() => setRating(i)}
              aria-label={`${i} stars`}
              className={cn("text-2xl transition-colors", (hover || rating) >= i ? "text-gold" : "text-sand")}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field name="author" label="Your name" required />
        <Field name="title" label="Review title" required />
      </div>
      <div>
        <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5">Your review</label>
        <textarea
          name="body"
          required
          rows={4}
          className="w-full bg-ivory border border-sand focus:border-gold outline-none px-4 py-3 text-sm"
        />
      </div>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={status === "saving" || status === "done"}
          className="bg-ink text-ivory px-7 py-3.5 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gold transition disabled:opacity-60"
        >
          {status === "saving" ? "Submitting…" : status === "done" ? "Thank you ✓" : "Submit review"}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="text-xs tracking-wider uppercase text-muted hover:text-ink">
          Cancel
        </button>
        {status === "error" && <p className="text-xs text-red-700">Something went wrong. Please try again.</p>}
      </div>
    </form>
  );
}

function Field({ name, label, required }: { name: string; label: string; required?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] tracking-[0.2em] uppercase text-muted mb-1.5">{label}</label>
      <input
        name={name}
        required={required}
        className="w-full bg-ivory border border-sand focus:border-gold outline-none px-4 py-3 text-sm"
      />
    </div>
  );
}
