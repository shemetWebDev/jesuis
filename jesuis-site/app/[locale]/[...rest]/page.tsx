import { notFound } from "next/navigation";

// Любой неизвестный адрес внутри языка → локализованная 404
export default function CatchAll() {
  notFound();
}
