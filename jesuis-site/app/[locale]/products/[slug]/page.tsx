import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import type { Locale } from "@/src/i18n/routing";
import { Link } from "@/src/i18n/navigation";
import { fetchProduct, fetchSettings } from "@/src/sanity/fetch";
import { formatPrice } from "@/src/utils/formatPrice";
import SanityImage from "@/src/components/sanityImage/SanityImage";
import ProductCover from "@/src/components/productCover/ProductCover";
import RichText from "@/src/components/richText/RichText";
import BuyBlock from "@/src/components/buyBlock/BuyBlock";
import { ArrowIcon } from "@/src/components/icons/Icons";

import "./styles.scss";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = await fetchProduct(locale, slug);
  if (!product) return {};
  return {
    title: product.title,
    description: product.shortDescription ?? product.subtitle,
    openGraph: product.cover ? { images: [product.cover.url] } : undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [t, product, settings] = await Promise.all([
    getTranslations("products"),
    fetchProduct(locale, slug),
    fetchSettings(),
  ]);
  if (!product) notFound();

  return (
    <article className="product-page">
      <div className="container">
        <Link href="/products" className="back-link">
          <ArrowIcon back /> {t("back")}
        </Link>

        <div className="product-page__grid">
          <div className="product-page__media">
            <div className="product-page__cover">
              <ProductCover
                product={product}
                placeholder={t(`category.${product.category}`)}
                sizes="(max-width: 900px) 100vw, 50vw"
                priority
              />
            </div>
            {product.gallery.length > 0 && (
              <div className="product-page__gallery">
                {product.gallery.map((image, i) => (
                  <SanityImage
                    key={image.url}
                    image={image}
                    alt={`${product.title} — ${i + 1}`}
                    sizes="(max-width: 900px) 50vw, 25vw"
                  />
                ))}
              </div>
            )}
          </div>

          <div className="product-page__info">
            <Link
              href={{ pathname: "/products", query: { category: product.category } }}
              className="eyebrow"
            >
              {t(`category.${product.category}`)}
            </Link>
            <h1 className="product-page__title">{product.title}</h1>
            {product.subtitle && <p className="product-page__subtitle">{product.subtitle}</p>}
            {product.shortDescription && (
              <p className="lead product-page__short">{product.shortDescription}</p>
            )}

            <BuyBlock
              slug={product.slug}
              price={formatPrice(product.price, product.currency)}
              isSoon={product.status === "soon"}
              telegramUrl={settings.telegramUrl}
            />

            <RichText value={product.body} />
          </div>
        </div>
      </div>
    </article>
  );
}
