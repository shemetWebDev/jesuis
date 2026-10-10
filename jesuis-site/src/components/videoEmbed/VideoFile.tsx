"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

import "./styles.scss";

type Props = {
  src: string;
  title: string;
  poster?: string;
  // Соотношение сторон (ширина / высота), если оно уже известно
  ratio?: number;
  onRatio: (ratio: number) => void;
};

// Свой плеер для видео-файла из админки. Пропорции файла известны только
// после загрузки метаданных, поэтому плеер сообщает их наверх
export default function VideoFile({ src, title, poster, ratio, onRatio }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const report = () => {
      if (video.videoWidth && video.videoHeight) onRatio(video.videoWidth / video.videoHeight);
    };

    report(); // метаданные могли загрузиться до гидрации
    video.addEventListener("loadedmetadata", report);
    return () => video.removeEventListener("loadedmetadata", report);
  }, [onRatio]);

  return (
    <div
      className="video-embed video-embed--file"
      style={ratio ? ({ "--video-ratio": ratio } as CSSProperties) : undefined}
    >
      <video
        ref={ref}
        src={src}
        poster={poster}
        aria-label={title}
        controls
        playsInline
        preload="metadata"
      />
    </div>
  );
}
