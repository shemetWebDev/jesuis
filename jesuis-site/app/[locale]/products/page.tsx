import type { Metadata } from "next";
import clsx from "clsx";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { Link } from "@/src/i18n/navigation";
import { fetchProducts } from "@/src/sanity/fetch";
import type { ProductCategory } from "@/src/sanity/types";
import ProductCard from "@/src/components/productCard/ProductCard";

import "./styles.scss";

const CATEGORIES: ProductCategory[] = ["book", "guide", "game", "course"];

type Props = {
  params: Promise<{ locale: Locale }>;
  searchParams: Promise<{ category?: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "products" });
  return { title: t("title") };
}

function isCategory(value?: string): value is ProductCategory {
  return CATEGORIES.includes(value as ProductCategory);
}

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { category } = await searchParams;
  setRequestLocale(locale);

  const [t, products] = await Promise.all([getTranslations("products"), fetchProducts(locale)]);
  const active = isCategory(category) ? category : null;
  const visibleCategories = active ? [active] : CATEGORIES;

  return (
    <>
      <section className="page-head">
        <div className="container">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h1 className="page-head__title">{t("title")}</h1>
        </div>
      </section>

      <div className="container">
        <nav className="products-tabs" aria-label={t("eyebrow")}>
          <Link
            href="/products"
            className={clsx("products-tabs__tab", !active && "products-tabs__tab--active")}
          >
            {t("all")}
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href={{ pathname: "/products", query: { category: c } }}
              className={clsx("products-tabs__tab", active === c && "products-tabs__tab--active")}
            >
              {t(`categories.${c}`)}
            </Link>
          ))}
        </nav>

        {visibleCategories.map((c) => {
          const items = products.filter((p) => p.category === c);
          // Во вкладке «Все» пустые разделы не показываем, кроме программ — у них есть пояснение
          if (!items.length && !active && c !== "course") return null;

          return (
            <section key={c} className="products-group">
              <h2 className="products-group__title">{t(`categories.${c}`)}</h2>
              {c === "course" && <p className="products-group__note">{t("coursesNote")}</p>}
              {items.length ? (
                <div className="product-grid">
                  {items.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                c !== "course" && <p className="empty-note">{t("empty")}</p>
              )}
            </section>
          );
        })}
      </div>
    </>
  );
}
