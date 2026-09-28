import { NextResponse } from "next/server";

// Заглушка оплаты. После подключения Stripe здесь создаётся Checkout Session
// по полю stripePriceId материала и возвращается { url } для редиректа
export async function POST() {
  return NextResponse.json({ error: "Payments are not configured yet" }, { status: 503 });
}
