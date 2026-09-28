import { NextResponse } from "next/server";
import { isEmail, readField, sendToOwner } from "@/src/lib/mail";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // honeypot (если бот заполнил скрытое поле — молча ок)
    if (body.website) return NextResponse.json({ ok: true });

    const name = readField(body, "name", 200);
    const email = readField(body, "email", 200);
    const message = readField(body, "message");

    if (!name || !isEmail(email) || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await sendToOwner({
      subject: `[JE SUIS] Сообщение от ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\n\n${message}`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[contact]", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
