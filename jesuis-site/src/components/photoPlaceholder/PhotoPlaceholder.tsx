import clsx from "clsx";
import "./styles.scss";

// Временная заглушка, пока нет фотографий автора
export default function PhotoPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div className={clsx("photo-placeholder", className)} role="img" aria-label={label}>
      <span className="photo-placeholder__mark">JE SUIS</span>
      <span className="photo-placeholder__label">{label}</span>
    </div>
  );
}
