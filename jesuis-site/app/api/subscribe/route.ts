import { NextResponse } from "next/server";
import { isEmail, readField, sendToOwner } from "@/src/lib/mail";

// Заявка на бесплатный гайд «7 шагов к новой жизни».
// Пока уведомляет владелицу; автоматическую отправку гайда подписчице добавим, когда будет файл
export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (body.website) return NextResponse.json({ ok: true });

    const name = readField(body, "name", 200);
    const email = readField(body, "email", 200);
    const locale = readField(body, "locale", 5);

    if (!name || !isEmail(email)) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await sendToOwner({
      subject: `[JE SUIS] Новая подписка на гайд: ${name}`,
      text: `Имя: ${name}\nEmail: ${email}\nЯзык: ${locale || "-"}`,
      replyTo: email,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[subscribe]", e);
    return NextResponse.json({ error: "Send failed" }, { status: 500 });
  }
}
