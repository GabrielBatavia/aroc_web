"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { RobotHotspot } from "@/data/robotExperience";

type RobotHotspotViewerProps = {
  alt: string;
  hotspots: RobotHotspot[];
  modelSrc: string;
  posterSrc: string;
};

type ModelViewerWindow = Window & {
  ModelViewerElement?: {
    dracoDecoderLocation?: string;
  };
};

type ModelViewerElement = HTMLElement & {
  dismissPoster?: () => void;
  jumpCameraToGoal?: () => void;
  loaded?: boolean;
};

const transparentPosterStyle = {
  "--poster-color": "transparent",
} as CSSProperties;

export function RobotHotspotViewer({
  alt,
  hotspots,
  modelSrc,
  posterSrc,
}: RobotHotspotViewerProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [viewerReady, setViewerReady] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [shouldLoadViewer, setShouldLoadViewer] = useState(false);
  const [activeHotspotId, setActiveHotspotId] = useState(hotspots[0]?.id ?? "");
  const [autoRotate, setAutoRotate] = useState(false);
  const [rotatePaused, setRotatePaused] = useState(false);
  const [tourActive, setTourActive] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  const activeHotspot =
    hotspots.find((hotspot) => hotspot.id === activeHotspotId) ?? hotspots[0];

  useEffect(() => {
    const requestedPart = new URLSearchParams(window.location.search).get("part");
    if (requestedPart && hotspots.some((hotspot) => hotspot.id === requestedPart)) {
      setActiveHotspotId(requestedPart);
    }
  }, [hotspots]);

  useEffect(() => {
    if (shouldLoadViewer) return;
    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setShouldLoadViewer(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoadViewer(true);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px", threshold: 0.01 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [shouldLoadViewer]);

  useEffect(() => {
    if (!shouldLoadViewer) return;

    let cancelled = false;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = () => setAutoRotate(!motionQuery.matches);

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
  }, [shouldLoadViewer]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewerReady || !viewer) return;

    const markLoaded = () => setModelLoaded(true);
    const markError = () => setHasError(true);
    const updateProgress = (event: Event) => {
      const { totalProgress } =
        (event as CustomEvent<{ totalProgress: number }>).detail ?? {};
      if (totalProgress === 1 || viewer.loaded) markLoaded();
    };

    viewer.addEventListener("load", markLoaded);
    viewer.addEventListener("error", markError);
    viewer.addEventListener("progress", updateProgress);

    const frame = requestAnimationFrame(() => viewer.dismissPoster?.());

    return () => {
      cancelAnimationFrame(frame);
      viewer.removeEventListener("load", markLoaded);
      viewer.removeEventListener("error", markError);
      viewer.removeEventListener("progress", updateProgress);
    };
  }, [viewerReady, modelSrc]);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewerReady || !viewer || !activeHotspot) return;

    viewer.setAttribute("camera-orbit", activeHotspot.cameraOrbit);
    viewer.setAttribute("camera-target", activeHotspot.cameraTarget);
  }, [activeHotspot, viewerReady]);

  useEffect(() => {
    if (!tourActive || hotspots.length < 2) return;

    const tourTimer = window.setInterval(() => {
      setActiveHotspotId((currentId) => {
        const currentIndex = hotspots.findIndex((hotspot) => hotspot.id === currentId);
        const nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % hotspots.length;
        return hotspots[nextIndex].id;
      });
    }, 3400);

    return () => window.clearInterval(tourTimer);
  }, [hotspots, tourActive]);

  useEffect(() => {
    if (!linkCopied) return;
    const timer = window.setTimeout(() => setLinkCopied(false), 1800);
    return () => window.clearTimeout(timer);
  }, [linkCopied]);

  if (!activeHotspot) return null;

  const showPoster = !viewerReady || hasError || !shouldLoadViewer;
  const activeIndex = Math.max(
    0,
    hotspots.findIndex((hotspot) => hotspot.id === activeHotspot.id)
  );
  const rotateEnabled = autoRotate && !rotatePaused && !tourActive;

  const selectHotspot = (hotspotId: string) => {
    setTourActive(false);
    setActiveHotspotId(hotspotId);
  };

  const toggleTour = () => {
    if (tourActive) {
      setTourActive(false);
      return;
    }

    setRotatePaused(true);
    setActiveHotspotId(hotspots[0]?.id ?? activeHotspot.id);
    setTourActive(true);
  };

  const resetView = () => {
    setTourActive(false);
    setRotatePaused(false);
    setActiveHotspotId(hotspots[0]?.id ?? activeHotspot.id);
  };

  const copyHotspotLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("part", activeHotspot.id);
    url.hash = "interactive-robot";

    try {
      await navigator.clipboard.writeText(url.toString());
      setLinkCopied(true);
    } catch {
      setLinkCopied(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-[1.9rem] border border-[rgba(255,228,92,0.2)] bg-[linear-gradient(140deg,rgba(10,18,42,0.96),rgba(3,6,16,0.98)_52%,rgba(24,35,76,0.9))] shadow-[0_48px_120px_-76px_rgba(0,0,0,1)]"
    >
      <div className="absolute inset-0 opacity-60" aria-hidden="true">
        <div className="absolute left-1/2 top-10 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,228,92,0.18),transparent_64%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,228,92,0.05)_1px,transparent_1px),linear-gradient(180deg,rgba(255,228,92,0.04)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(circle_at_48%_42%,black,transparent_72%)]" />
      </div>

      <div className="relative z-10 grid min-h-[720px] gap-0 lg:grid-cols-[1fr_23rem]">
        <div className="relative min-h-[680px] overflow-hidden px-3 pt-8 sm:px-8 lg:min-h-[760px]">
          <div className="absolute left-5 top-5 z-30 flex flex-wrap gap-2 pr-5 sm:left-8 sm:top-8">
            <div className="rounded-full border border-[rgba(255,228,92,0.35)] bg-[rgba(5,8,22,0.72)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)] backdrop-blur">
              Drag untuk putar
            </div>
            <div className="rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.06)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.7)] backdrop-blur">
              Klik hotspot
            </div>
            <div className="rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.06)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.7)] backdrop-blur">
              {String(activeIndex + 1).padStart(2, "0")} / {String(hotspots.length).padStart(2, "0")}
            </div>
          </div>

          <div className="absolute inset-x-5 top-20 z-30 flex flex-wrap gap-2 sm:inset-x-8 sm:top-[5.8rem]">
            <button
              className={`rounded-full border px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] backdrop-blur transition ${
                tourActive
                  ? "border-[var(--yellow)] bg-[var(--yellow)] text-[var(--navy-deep)]"
                  : "border-[rgba(255,228,92,0.28)] bg-[rgba(255,228,92,0.08)] text-[var(--yellow)] hover:bg-[rgba(255,228,92,0.16)]"
              }`}
              onClick={toggleTour}
              type="button"
            >
              {tourActive ? "Stop Tour" : "Guided Tour"}
            </button>
            <button
              className="rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.06)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.76)] backdrop-blur transition hover:border-[rgba(255,228,92,0.35)] hover:text-[var(--yellow)]"
              onClick={resetView}
              type="button"
            >
              Reset View
            </button>
            <button
              className="rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.06)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.76)] backdrop-blur transition hover:border-[rgba(255,228,92,0.35)] hover:text-[var(--yellow)]"
              onClick={() => {
                if (tourActive) {
                  setTourActive(false);
                  setRotatePaused(false);
                  return;
                }
                setRotatePaused((paused) => !paused);
              }}
              type="button"
            >
              {rotatePaused || tourActive ? "Resume Rotate" : "Pause Rotate"}
            </button>
            <button
              className="rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(248,247,240,0.06)] px-4 py-2 font-mono text-[0.58rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.76)] backdrop-blur transition hover:border-[rgba(255,228,92,0.35)] hover:text-[var(--yellow)]"
              onClick={copyHotspotLink}
              type="button"
            >
              {linkCopied ? "Link Copied" : "Copy Hotspot"}
            </button>
          </div>

          <div className="pointer-events-none absolute inset-x-[18%] bottom-12 top-[16%] rounded-full border border-[rgba(255,228,92,0.14)]" />
          <div className="pointer-events-none absolute inset-x-[26%] bottom-24 top-[24%] rounded-full border border-[rgba(248,247,240,0.08)]" />
          <div
            key={activeHotspot.id}
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-full overflow-hidden opacity-70"
          >
            <div className="h-full w-[46%] animate-[scan_950ms_var(--ease-luxury)_1] bg-[linear-gradient(90deg,transparent,rgba(255,228,92,0.06),rgba(255,228,92,0.18),rgba(255,228,92,0.05),transparent)]" />
          </div>

          <Image
            alt={viewerReady && !hasError ? "" : alt}
            aria-hidden={viewerReady && !hasError}
            className={`absolute inset-0 z-0 h-full w-full object-contain object-center px-8 pt-12 transition duration-700 ${
              showPoster ? "scale-100 opacity-100" : "scale-[0.98] opacity-0"
            }`}
            fill
            sizes="(max-width: 1024px) 100vw, 65vw"
            src={posterSrc}
          />

          {shouldLoadViewer && viewerReady && !hasError ? (
            <model-viewer
              ref={viewerRef}
              alt={alt}
              data-cursor="drag"
              camera-controls
              camera-orbit={activeHotspot.cameraOrbit}
              camera-target={activeHotspot.cameraTarget}
              className="absolute inset-0 z-10 h-full w-full cursor-grab active:cursor-grabbing"
              disable-zoom
              environment-image="neutral"
              exposure="1.16"
              field-of-view="27deg"
              interaction-prompt="none"
              interpolation-decay="120"
              loading="eager"
              max-camera-orbit="180deg 88deg 180%"
              max-field-of-view="36deg"
              min-camera-orbit="-180deg 50deg 82%"
              min-field-of-view="20deg"
              poster={posterSrc}
              reveal="manual"
              rotation-per-second="10deg"
              shadow-intensity="0.72"
              shadow-softness="0.9"
              src={modelSrc}
              style={transparentPosterStyle}
              touch-action="pan-y"
              {...(rotateEnabled ? { "auto-rotate": true, "auto-rotate-delay": "2400" } : {})}
            >
              {hotspots.map((hotspot, index) => {
                const isActive = hotspot.id === activeHotspot.id;

                return (
                  <button
                    aria-label={`Tampilkan spesifikasi ${hotspot.title}`}
                    aria-pressed={isActive}
                    className={`group/hotspot relative flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-full border px-2.5 py-2 text-left font-mono text-[0.58rem] font-black uppercase tracking-[0.14em] shadow-[0_20px_60px_-32px_rgba(0,0,0,0.95)] backdrop-blur transition duration-300 hover:scale-105 focus-visible:scale-105 ${
                      isActive
                        ? "border-[var(--yellow)] bg-[var(--yellow)] text-[var(--navy-deep)]"
                        : "border-[rgba(255,228,92,0.35)] bg-[rgba(5,8,22,0.78)] text-[var(--yellow)]"
                    }`}
                    data-normal={hotspot.normal}
                    data-position={hotspot.position}
                    data-visibility-attribute="visible"
                    key={hotspot.id}
                    onClick={() => selectHotspot(hotspot.id)}
                    slot={`hotspot-${hotspot.id}`}
                    type="button"
                  >
                    <span className="relative flex size-6 items-center justify-center rounded-full bg-current/10">
                      <span
                        aria-hidden="true"
                        className={`absolute inset-0 rounded-full border ${
                          isActive
                            ? "border-[rgba(7,16,31,0.35)]"
                            : "animate-ping border-[rgba(255,228,92,0.55)]"
                        }`}
                      />
                      <span className="relative text-[0.62rem]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="hidden sm:block">{hotspot.label}</span>
                  </button>
                );
              })}
            </model-viewer>
          ) : null}

          {!shouldLoadViewer ? (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[rgba(248,247,240,0.16)] bg-[rgba(5,8,22,0.76)] px-5 py-2.5 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.72)] backdrop-blur">
              Model siap dimuat saat section terlihat
            </div>
          ) : null}

          {shouldLoadViewer && !modelLoaded && !hasError ? (
            <div className="absolute bottom-8 left-1/2 z-30 -translate-x-1/2 rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.76)] px-5 py-2.5 font-mono text-[0.62rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)] backdrop-blur">
              Memuat model 3D
            </div>
          ) : null}

          {hasError ? (
            <div className="absolute inset-x-5 bottom-8 z-30 mx-auto max-w-xl rounded-[1.6rem] border border-[rgba(255,228,92,0.26)] bg-[rgba(5,8,22,0.86)] p-5 text-center shadow-[0_30px_80px_-52px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:bottom-10">
              <div className="font-mono text-[0.6rem] font-black uppercase tracking-[0.2em] text-[var(--yellow)]">
                Fallback 2D aktif
              </div>
              <p className="mt-3 text-[0.9rem] leading-[1.7] text-[rgba(248,247,240,0.72)]">
                Renderer 3D atau WebGL gagal dimuat, tetapi spesifikasi OP3 tetap bisa dibaca lewat panel dan progress rail.
              </p>
            </div>
          ) : null}
        </div>

        <aside className="relative z-20 border-t border-[rgba(255,228,92,0.16)] bg-[rgba(3,6,16,0.52)] p-5 backdrop-blur-2xl sm:p-7 lg:border-l lg:border-t-0">
          <div aria-atomic="true" aria-live="polite" className="sr-only">
            Menampilkan {activeHotspot.title}: {activeHotspot.description}
          </div>
          <div className="sticky top-28">
            <div className="font-mono text-[0.62rem] font-black uppercase tracking-[0.22em] text-[var(--yellow)]">
              {activeHotspot.eyebrow}
            </div>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,4.8rem)] font-black uppercase leading-[0.82] tracking-[-0.05em] text-[var(--cream)] lg:text-[4.2rem]">
              {activeHotspot.title}
            </h2>
            <p className="mt-6 text-[0.98rem] leading-[1.8] text-[rgba(248,247,240,0.74)]">
              {activeHotspot.description}
            </p>

            <div className="mt-6 grid gap-3">
              {[
                ["What it is", activeHotspot.whatItIs],
                ["Why it matters", activeHotspot.whyItMatters],
                ["Arena impact", activeHotspot.arenaImpact],
              ].map(([label, value]) => (
                <div
                  className="rounded-[1.25rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(255,228,92,0.065)] p-4"
                  key={label}
                >
                  <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                    {label}
                  </div>
                  <p className="mt-2 text-[0.88rem] leading-[1.68] text-[rgba(248,247,240,0.68)]">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 font-mono text-[0.58rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.48)]">
              Spec Snapshot
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2">
              {activeHotspot.metrics.map((metric) => (
                <div
                  className="rounded-[1rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.055)] p-3"
                  key={metric.label}
                >
                  <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.45)]">
                    {metric.label}
                  </div>
                  <div className="mt-2 font-display text-[1.35rem] font-black uppercase leading-none text-[var(--yellow)]">
                    {metric.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 rounded-[1.4rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.045)] p-3">
              <div className="mb-3 flex items-center justify-between gap-3 px-1">
                <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.46)]">
                  Progress Rail
                </div>
                <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
                  {String(activeIndex + 1).padStart(2, "0")}
                </div>
              </div>
              <div className="grid gap-2">
              {hotspots.map((hotspot) => {
                const isActive = hotspot.id === activeHotspot.id;

                return (
                  <button
                    aria-current={isActive ? "true" : undefined}
                    className={`group/rail relative flex items-center justify-between gap-4 rounded-2xl border px-4 py-3 text-left transition duration-200 ${
                      isActive
                        ? "border-[var(--yellow)] bg-[var(--yellow)] text-[var(--navy-deep)]"
                        : "border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.045)] text-[rgba(248,247,240,0.7)] hover:border-[rgba(255,228,92,0.35)] hover:text-[var(--yellow)]"
                    }`}
                    key={hotspot.id}
                    onClick={() => selectHotspot(hotspot.id)}
                    type="button"
                  >
                    <span className="flex items-center gap-3">
                      <span className={`size-2 rounded-full ${isActive ? "bg-[var(--navy-deep)]" : "bg-[var(--yellow)] opacity-50 group-hover/rail:opacity-100"}`} />
                      <span className="font-mono text-[0.62rem] font-black uppercase tracking-[0.14em]">
                        {hotspot.eyebrow.replace("Hotspot ", "")}. {hotspot.label}
                      </span>
                    </span>
                    <span className="font-display text-[1.12rem] font-black leading-none">
                      {hotspot.title}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
