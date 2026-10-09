import type { ProductCard } from "@/src/sanity/types";

// Купить можно, только если в админке статус «В продаже» и указана ссылка на оплату.
// Иначе на сайте показывается «Скоро»
export function productBuyUrl(product: Pick<ProductCard, "status" | "buyUrl">) {
  return product.status === "available" && product.buyUrl ? product.buyUrl : undefined;
}
