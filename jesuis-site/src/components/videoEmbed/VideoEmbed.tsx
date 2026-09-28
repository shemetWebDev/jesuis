import PhotoPlaceholder from "../photoPlaceholder/PhotoPlaceholder";
import "./styles.scss";

// Превращает обычную ссылку YouTube / Vimeo в адрес для встраивания
export function toEmbedUrl(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");

    if (host === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (host.endsWith("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return url;
      const id = u.searchParams.get("v") ?? u.pathname.split("/").pop();
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (host === "vimeo.com") return `https://player.vimeo.com/video${u.pathname}`;
    if (host === "player.vimeo.com") return url;
  } catch {
    return null;
  }
  return null;
}

export default function VideoEmbed({
  url,
  title,
  placeholder,
}: {
  url?: string;
  title: string;
  placeholder: string;
}) {
  const src = toEmbedUrl(url);

  return (
    <div className="video-embed">
      {src ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <PhotoPlaceholder label={placeholder} />
      )}
    </div>
  );
}
