import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";

import { routing, type Locale } from "@/src/i18n/routing";
import { legalDocs, type LegalDoc } from "@/src/components/header/navItems";

type Props = { params: Promise<{ locale: Locale; doc: string }> };

function isLegalDoc(value: string): value is LegalDoc {
  return (legalDocs as readonly string[]).includes(value);
}

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => legalDocs.map((doc) => ({ locale, doc })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, doc } = await params;
  if (!isLegalDoc(doc)) return {};
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t(doc), robots: { index: false } };
}

// TODO: тексты документов — от заказчицы (можно вынести в Sanity)
export default async function LegalPage({ params }: Props) {
  const { locale, doc } = await params;
  if (!isLegalDoc(doc)) notFound();
  setRequestLocale(locale);

  const t = await getTranslations("legal");

  return (
    <section className="page-head">
      <div className="container-text">
        <h1 className="page-head__title">{t(doc)}</h1>
        <p className="lead page-head__lead">{t("placeholder")}</p>
      </div>
    </section>
  );
}
