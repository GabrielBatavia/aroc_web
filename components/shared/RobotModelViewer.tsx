"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type RobotModelViewerProps = {
  alt: string;
  className?: string;
  modelSrc: string;
  posterSrc: string;
  priority?: boolean;
  style?: CSSProperties;
};

const transparentPosterStyle = {
  "--poster-color": "transparent",
} as CSSProperties;

type ModelViewerWindow = Window & {
  ModelViewerElement?: {
    dracoDecoderLocation?: string;
  };
};

type ModelViewerElement = HTMLElement & {
  dismissPoster?: () => void;
  loaded?: boolean;
};

export function RobotModelViewer({
  alt,
  className = "",
  modelSrc,
  posterSrc,
  priority = false,
  style,
}: RobotModelViewerProps) {
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => {
      setAutoRotate(!motionQuery.matches);
    };

    updateMotionPreference();
    motionQuery.addEventListener("change", updateMotionPreference);

    const modelViewerWindow = window as ModelViewerWindow;
    modelViewerWindow.ModelViewerElement =
      modelViewerWindow.ModelViewerElement ?? {};
    modelViewerWindow.ModelViewerElement.dracoDecoderLocation = "/draco/";

    import("@google/model-viewer")
      .then(() => {
        if (!cancelled) setViewerReady(true);
      })
      .catch(() => {
        if (!cancelled) setHasError(true);
      });

    return () => {
      cancelled = true;
      motionQuery.removeEventListener("change", updateMotionPreference);
    };
  }, []);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewerReady || !viewer) return;

    const markLoaded = () => setModelLoaded(true);
    const markError = () => setHasError(true);
    const updateProgress = (event: Event) => {
      const { totalProgress } = (event as CustomEvent<{ totalProgress: number }>).detail ?? {};
      if (totalProgress === 1 || viewer.loaded) markLoaded();
    };

    viewer.addEventListener("load", markLoaded);
    viewer.addEventListener("error", markError);
    viewer.addEventListener("progress", updateProgress);

    const frame = requestAnimationFrame(() => {
      viewer.dismissPoster?.();
    });

    return () => {
      cancelAnimationFrame(frame);
      viewer.removeEventListener("load", markLoaded);
      viewer.removeEventListener("error", markError);
      viewer.removeEventListener("progress", updateProgress);
    };
  }, [viewerReady, modelSrc]);

  const showPoster = !viewerReady || hasError;

  return (
    <div
      className={`group/model relative aspect-[3/4] min-h-[360px] w-full overflow-visible sm:min-h-[520px] ${className}`}
      style={style}
    >
      <div
        aria-hidden
        className="absolute inset-x-[12%] bottom-[8%] top-[18%] rounded-full bg-[radial-gradient(circle,rgba(230,193,113,0.18),rgba(201,162,75,0.06)_42%,transparent_70%)] blur-2xl"
      />

      <Image
        alt={viewerReady && !hasError ? "" : alt}
        aria-hidden={viewerReady && !hasError}
        className={`absolute inset-0 z-0 h-full w-full object-contain object-center transition duration-700 ${
          showPoster ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
        }`}
        fill
        priority={priority}
        sizes="(max-width: 1024px) 90vw, 540px"
        src={posterSrc}
      />

      {viewerReady && !hasError ? (
        <model-viewer
          ref={viewerRef}
          alt={alt}
          camera-controls
          camera-orbit="18deg 76deg 112%"
          className="absolute inset-0 z-10 h-full w-full cursor-grab opacity-100 transition-opacity duration-700 active:cursor-grabbing"
          disable-zoom
          environment-image="neutral"
          exposure="1.15"
          field-of-view="28deg"
          interaction-prompt="none"
          loading="eager"
          max-camera-orbit="180deg 88deg 175%"
          max-field-of-view="36deg"
          min-camera-orbit="-180deg 52deg 82%"
          min-field-of-view="22deg"
          poster={posterSrc}
          reveal="manual"
          rotation-per-second="16deg"
          shadow-intensity="0.6"
          shadow-softness="0.85"
          src={modelSrc}
          style={transparentPosterStyle}
          touch-action="pan-y"
          {...(autoRotate ? { "auto-rotate": true } : {})}
        />
      ) : null}

      {!modelLoaded && !hasError ? (
        <div className="pointer-events-none absolute inset-x-[18%] bottom-8 z-20 overflow-hidden rounded-full border border-[rgba(230,193,113,0.28)] bg-[rgba(8,19,33,0.72)] px-4 py-2 text-center text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[var(--gold-bright)] shadow-[0_16px_34px_-24px_rgba(0,0,0,0.75)] backdrop-blur">
          <span className="relative inline-flex items-center gap-2">
            <span className="size-1.5 animate-pulse rounded-full bg-[var(--gold-bright)]" />
            Memuat model 3D
          </span>
        </div>
      ) : null}

      {modelLoaded && !hasError ? (
        <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgba(230,193,113,0.32)] bg-[rgba(8,19,33,0.62)] px-4 py-2 text-[0.64rem] font-extrabold uppercase tracking-[0.22em] text-[var(--gold-bright)] opacity-90 shadow-[0_18px_38px_-26px_rgba(0,0,0,0.9)] backdrop-blur transition duration-300 group-hover/model:opacity-100">
          Drag untuk putar
        </div>
      ) : null}

      {hasError ? (
        <div className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap rounded-full border border-[rgba(245,241,232,0.22)] bg-[rgba(8,19,33,0.7)] px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] text-[rgba(245,241,232,0.72)] backdrop-blur">
          Fallback 2D aktif
        </div>
      ) : null}
    </div>
  );
}
