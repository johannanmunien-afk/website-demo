import { db } from "@/db";
import { reviews } from "@/db/schema";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const productId = Number(body.productId);
    const rating = Math.round(Number(body.rating));
    const author = String(body.author ?? "").trim().slice(0, 80);
    const title = String(body.title ?? "").trim().slice(0, 120);
    const text = String(body.body ?? "").trim().slice(0, 2000);

    if (!productId || rating < 1 || rating > 5 || !author || !title || !text) {
      return NextResponse.json({ error: "Invalid review" }, { status: 400 });
    }

    const [created] = await db
      .insert(reviews)
      .values({ productId, rating, author, title, body: text, verified: false })
      .returning();
    return NextResponse.json(created, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save review" }, { status: 500 });
  }
}
