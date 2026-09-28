"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import "./styles.scss";

const baseClassName = "buy-block";

type Props = {
  slug: string;
  price: string | null;
  isSoon: boolean;
  telegramUrl?: string;
};

export default function BuyBlock({ slug, price, isSoon, telegramUrl }: Props) {
  const t = useTranslations("products");
  const locale = useLocale();
  const [loading, setLoading] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const onBuy = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, locale }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.url) {
        window.location.href = data.url;
        return;
      }
      setUnavailable(true);
    } catch {
      setUnavailable(true);
    }
    setLoading(false);
  };

  return (
    <div className={baseClassName}>
      {price && !isSoon && <span className={`${baseClassName}__price`}>{price}</span>}

      {isSoon ? (
        <span className="btn btn--outline" aria-disabled="true">
          {t("soon")}
        </span>
      ) : (
        <button type="button" className="btn btn--primary" onClick={onBuy} disabled={loading}>
          {t("buy")}
        </button>
      )}

      {unavailable && (
        <div className={`${baseClassName}__notice`} role="status">
          <p>{t("buyUnavailable")}</p>
          {telegramUrl && (
            <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
              {t("writeMe")}
            </a>
          )}
        </div>
      )}
    </div>
  );
}
