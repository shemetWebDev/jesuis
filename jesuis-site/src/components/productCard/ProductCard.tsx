import { useTranslations } from "next-intl";

import { Link } from "@/src/i18n/navigation";
import type { ProductCard as ProductCardData } from "@/src/sanity/types";
import ProductCover from "../productCover/ProductCover";
import { formatPrice } from "@/src/utils/formatPrice";

import "./styles.scss";

const baseClassName = "product-card";

export default function ProductCard({ product }: { product: ProductCardData }) {
  const t = useTranslations("products");
  const href = `/products/${product.slug}`;
  const isSoon = product.status === "soon";
  const price = formatPrice(product.price, product.currency);

  return (
    <article className={baseClassName}>
      <Link href={href} className={`${baseClassName}__media`} tabIndex={-1}>
        <ProductCover
          product={product}
          placeholder={t(`category.${product.category}`)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`${baseClassName}__img`}
        />
        {isSoon && <span className={`${baseClassName}__badge`}>{t("soon")}</span>}
      </Link>

      <div className={`${baseClassName}__body`}>
        <span className={`${baseClassName}__category`}>
          {t(`category.${product.category}`)}
        </span>
        <h3 className={`${baseClassName}__title`}>
          <Link href={href}>{product.title}</Link>
        </h3>
        {product.subtitle && (
          <p className={`${baseClassName}__subtitle`}>{product.subtitle}</p>
        )}
        {product.shortDescription && (
          <p className={`${baseClassName}__text`}>{product.shortDescription}</p>
        )}

        <div className={`${baseClassName}__footer`}>
          {price && !isSoon && <span className={`${baseClassName}__price`}>{price}</span>}
          <Link href={href} className="link-arrow">
            {isSoon ? t("more") : t("buy")}
          </Link>
        </div>
      </div>
    </article>
  );
}
