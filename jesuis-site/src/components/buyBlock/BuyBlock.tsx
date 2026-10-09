import { useTranslations } from "next-intl";

import "./styles.scss";

const baseClassName = "buy-block";

type Props = {
  price: string | null;
  /** Ссылка на оплату из админки (Tribute / Telegram). Нет ссылки — показываем «Скоро» */
  buyUrl?: string;
};

export default function BuyBlock({ price, buyUrl }: Props) {
  const t = useTranslations("products");

  return (
    <div className={baseClassName}>
      {price && buyUrl && <span className={`${baseClassName}__price`}>{price}</span>}

      {buyUrl ? (
        <a href={buyUrl} target="_blank" rel="noopener noreferrer" className="btn btn--primary">
          {t("buy")}
        </a>
      ) : (
        <span className="btn btn--outline" aria-disabled="true">
          {t("soon")}
        </span>
      )}
    </div>
  );
}
