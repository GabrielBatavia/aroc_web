"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.35);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const manuallyPausedRef = useRef(false);

  // Initialize audio and attempt autoplay / listen for first interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;

    const playAudio = async () => {
      if (manuallyPausedRef.current) return;
      try {
        await audio.play();
        setIsPlaying(true);
        setHasStarted(true);
        cleanupListeners();
      } catch {
        // Autoplay policy prevented playback, keep waiting for user interaction
      }
    };

    const handleInteraction = () => {
      if (!manuallyPausedRef.current) {
        playAudio();
      }
    };

    const cleanupListeners = () => {
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("keydown", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
      window.removeEventListener("pointerdown", handleInteraction);
    };

    // Attempt direct autoplay first
    playAudio();

    // Register interaction listeners (Option C: Autoplay on first user interaction)
    window.addEventListener("click", handleInteraction, { passive: true });
    window.addEventListener("keydown", handleInteraction, { passive: true });
    window.addEventListener("touchstart", handleInteraction, { passive: true });
    window.addEventListener("pointerdown", handleInteraction, { passive: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      manuallyPausedRef.current = true;
    } else {
      manuallyPausedRef.current = false;
      audio.play().then(() => {
        setIsPlaying(true);
        setHasStarted(true);
      }).catch((err) => {
        console.warn("Audio playback failed:", err);
      });
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.muted = false;
      setIsMuted(false);
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      if (val === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  }, [isMuted]);

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/sign-of-the-times.mp3"
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      {/* Floating Audio Controller */}
      <aside
        aria-label="Pemutar Audio Latar Belakang"
        className="fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6 transition-all duration-300"
      >
        {isMinimized ? (
          /* Minimized pill button */
          <button
            type="button"
            onClick={() => setIsMinimized(false)}
            className="group flex size-12 items-center justify-center rounded-full border border-[rgba(255,228,92,0.3)] bg-[rgba(5,8,22,0.85)] text-[var(--yellow)] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.8)] backdrop-blur-md transition-all hover:scale-110 hover:border-[var(--yellow)] focus:outline-none focus:ring-2 focus:ring-[var(--yellow)]"
            title="Buka Kontrol Musik (Sign of the Times)"
            aria-label="Buka Kontrol Musik"
          >
            {isPlaying ? (
              <span className="flex items-end gap-[2px] h-4">
                <span className="w-1 bg-[var(--yellow)] rounded-full animate-[musicBar1_1s_ease-in-out_infinite]" />
                <span className="w-1 bg-[var(--yellow)] rounded-full animate-[musicBar2_1s_ease-in-out_infinite_0.2s]" />
                <span className="w-1 bg-[var(--yellow)] rounded-full animate-[musicBar3_1s_ease-in-out_infinite_0.4s]" />
              </span>
            ) : (
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            )}
          </button>
        ) : (
          /* Full expanded widget */
          <div className="group relative flex flex-col items-start gap-2 rounded-2xl border border-[rgba(255,228,92,0.25)] bg-[rgba(5,8,22,0.92)] p-3 text-[var(--cream)] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:p-3.5 transition-all duration-300 hover:border-[rgba(255,228,92,0.45)] max-w-[280px] sm:max-w-[320px]">
            {/* Top row: Track Title & Minimize button */}
            <div className="flex w-full items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-hidden">
                {/* Animated Equalizer or Music Note */}
                <div className="flex size-7 shrink-0 items-center justify-center rounded-lg border border-[rgba(255,228,92,0.25)] bg-[rgba(255,228,92,0.1)] text-[var(--yellow)]">
                  {isPlaying && !isMuted ? (
                    <div className="flex items-end gap-[2px] h-3.5">
                      <span className="w-[2.5px] bg-[var(--yellow)] rounded-full animate-[musicBar1_0.9s_ease-in-out_infinite]" />
                      <span className="w-[2.5px] bg-[var(--yellow)] rounded-full animate-[musicBar2_0.9s_ease-in-out_infinite_0.25s]" />
                      <span className="w-[2.5px] bg-[var(--yellow)] rounded-full animate-[musicBar3_0.9s_ease-in-out_infinite_0.5s]" />
                    </div>
                  ) : (
                    <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
                      <circle cx="6" cy="18" r="3" />
                      <circle cx="18" cy="16" r="3" />
                    </svg>
                  )}
                </div>

                <div className="flex flex-col truncate leading-tight">
                  <span className="font-mono text-[0.68rem] font-bold tracking-wider text-[var(--yellow)] uppercase truncate">
                    Sign of the Times
                  </span>
                  <span className="text-[0.62rem] text-[rgba(248,247,240,0.6)] truncate">
                    Harry Styles • AROC Soundtrack
                  </span>
                </div>
              </div>

              {/* Minimize button */}
              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="size-6 flex items-center justify-center rounded-md text-[rgba(248,247,240,0.5)] hover:text-[var(--cream)] hover:bg-white/10 transition-colors"
                title="Kecilkan pemutar"
                aria-label="Kecilkan pemutar musik"
              >
                <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 12H6" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Bottom row: Control buttons & Volume */}
            <div className="flex w-full items-center justify-between gap-3 pt-1 border-t border-white/5">
              <div className="flex items-center gap-1.5">
                {/* Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex size-8 items-center justify-center rounded-full bg-[var(--yellow)] text-[var(--navy-black)] shadow-sm hover:scale-105 active:scale-95 transition-transform"
                  aria-label={isPlaying ? "Jeda musik" : "Putar musik"}
                  title={isPlaying ? "Jeda" : "Putar"}
                >
                  {isPlaying ? (
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <rect x="6" y="5" width="4" height="14" rx="1" />
                      <rect x="14" y="5" width="4" height="14" rx="1" />
                    </svg>
                  ) : (
                    <svg className="size-4 fill-current ml-0.5" viewBox="0 0 24 24">
                      <path d="M7 6v12l10-6z" />
                    </svg>
                  )}
                </button>

                {/* Mute / Unmute Button */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex size-7 items-center justify-center rounded-lg text-[rgba(248,247,240,0.7)] hover:text-[var(--yellow)] hover:bg-white/5 transition-colors"
                  aria-label={isMuted ? "Bunyikan audio" : "Bisukan audio"}
                  title={isMuted ? "Bunyikan" : "Bisukan"}
                >
                  {isMuted || volume === 0 ? (
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <line x1="23" y1="9" x2="17" y2="15" />
                      <line x1="17" y1="9" x2="23" y2="15" />
                    </svg>
                  ) : (
                    <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Volume Slider */}
              <div className="flex items-center gap-1.5 flex-1 max-w-[110px]">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-white/20 accent-[var(--yellow)] hover:bg-white/30 transition-colors"
                  aria-label="Atur volume latar"
                  title={`Volume: ${Math.round((isMuted ? 0 : volume) * 100)}%`}
                />
              </div>
            </div>

            {/* First time hint badge (disappears once music starts) */}
            {!hasStarted && (
              <div className="w-full text-center py-0.5 px-2 rounded bg-[rgba(255,228,92,0.12)] border border-[rgba(255,228,92,0.2)]">
                <span className="font-mono text-[0.58rem] text-[var(--yellow)] uppercase tracking-wider animate-pulse">
                  Klik di mana saja untuk memutar
                </span>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* Keyframe animation definitions for equalizer bars */}
      <style jsx global>{`
        @keyframes musicBar1 {
          0%, 100% { height: 4px; }
          50% { height: 14px; }
        }
        @keyframes musicBar2 {
          0%, 100% { height: 12px; }
          50% { height: 5px; }
        }
        @keyframes musicBar3 {
          0%, 100% { height: 6px; }
          50% { height: 16px; }
        }
      `}</style>
    </>
  );
}
