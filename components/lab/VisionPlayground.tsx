"use client";

import { useState } from "react";

import type { LabInteractive } from "@/data/lab";

type VisionPlaygroundProps = {
  exercise: LabInteractive;
};

function inHueRange(value: number, min: number, max: number) {
  if (min <= max) return value >= min && value <= max;
  return value >= min || value <= max;
}

export function VisionPlayground({ exercise }: VisionPlaygroundProps) {
  const [hueMin, setHueMin] = useState(5);
  const [hueMax, setHueMax] = useState(32);
  const [satMin, setSatMin] = useState(55);
  const [valMin, setValMin] = useState(55);
  const [minRadius, setMinRadius] = useState(18);

  const ballHue = 18;
  const fieldHue = 118;
  const ballRadius = 38;
  const ballSelected = inHueRange(ballHue, hueMin, hueMax) && satMin <= 84 && valMin <= 92;
  const fieldSelected = inHueRange(fieldHue, hueMin, hueMax) && satMin <= 62 && valMin <= 58;
  const radiusOk = minRadius <= ballRadius;
  const detected = ballSelected && radiusOk;
  const noiseLevel = fieldSelected ? 78 : hueMax - hueMin > 80 ? 42 : ballSelected ? 12 : 4;
  const status = detected
    ? noiseLevel > 50
      ? "Bola terdeteksi, tetapi noise lapangan terlalu tinggi. Persempit hue atau naikkan saturation."
      : "Bola terdeteksi dengan noise rendah. Threshold cukup layak untuk latihan awal."
    : ballSelected
      ? "Warna bola masuk threshold, tetapi min radius terlalu besar. Turunkan min radius."
      : "Bola belum masuk threshold. Arahkan hue ke warna oranye dan turunkan batas saturation/value jika perlu.";

  return (
    <section className="overflow-hidden rounded-[1.6rem] border border-[rgba(7,12,34,0.1)] bg-white/88 shadow-[0_30px_90px_-66px_rgba(7,12,34,0.78)]">
      <div className="grid gap-0 xl:grid-cols-[0.85fr_1.15fr]">
        <div className="p-5 sm:p-6">
          <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[var(--gold-deep)]">
            Computer vision playground
          </div>
          <h3 className="mt-2 text-[1.35rem] font-black leading-tight text-[var(--navy-deep)]">
            {exercise.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-[1.72] text-[var(--muted-dark)]">
            {exercise.prompt}
          </p>

          <div className="mt-6 grid gap-4">
            {[
              { label: "Hue minimum", value: hueMin, setter: setHueMin, min: 0, max: 180 },
              { label: "Hue maximum", value: hueMax, setter: setHueMax, min: 0, max: 180 },
              { label: "Saturation minimum", value: satMin, setter: setSatMin, min: 0, max: 100 },
              { label: "Value minimum", value: valMin, setter: setValMin, min: 0, max: 100 },
              { label: "Minimum radius", value: minRadius, setter: setMinRadius, min: 4, max: 60 },
            ].map((control) => (
              <label className="block" key={control.label}>
                <span className="mb-2 flex items-center justify-between gap-3 text-[0.82rem] font-bold text-[var(--navy-deep)]">
                  <span>{control.label}</span>
                  <span className="font-mono text-[0.7rem] text-[var(--muted-dark)]">{control.value}</span>
                </span>
                <input
                  className="w-full accent-[var(--gold-deep)]"
                  max={control.max}
                  min={control.min}
                  onChange={(event) => control.setter(Number(event.target.value))}
                  type="range"
                  value={control.value}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="border-t border-[rgba(7,12,34,0.08)] bg-[var(--cream-soft)] p-5 sm:p-6 xl:border-l xl:border-t-0">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[var(--muted-dark)]">
                Synthetic camera frame
              </div>
              <svg className="h-auto w-full rounded-[1.2rem] border border-[rgba(7,12,34,0.1)] bg-[#264f37]" viewBox="0 0 360 240" role="img" aria-label="Synthetic soccer field with orange ball">
                <rect fill="#27613f" height="240" width="360" />
                <path d="M0 120H360M180 0V240" stroke="rgba(255,255,255,0.28)" strokeWidth="5" />
                <circle cx="180" cy="120" fill="none" r="52" stroke="rgba(255,255,255,0.24)" strokeWidth="4" />
                <circle cx="222" cy="132" fill="#f07c1d" r={ballRadius} />
                <circle cx="211" cy="118" fill="rgba(255,255,255,0.28)" r="9" />
                <circle cx="74" cy="46" fill="rgba(255,255,255,0.35)" r="4" />
                <circle cx="96" cy="184" fill="rgba(255,255,255,0.28)" r="3" />
                <circle cx="306" cy="71" fill="rgba(255,255,255,0.32)" r="5" />
              </svg>
            </div>

            <div>
              <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[var(--muted-dark)]">
                Threshold mask result
              </div>
              <svg className="h-auto w-full rounded-[1.2rem] border border-[rgba(7,12,34,0.1)] bg-[#07101f]" viewBox="0 0 360 240" role="img" aria-label="Threshold mask result">
                <rect fill="#07101f" height="240" width="360" />
                {fieldSelected ? <rect fill="rgba(255,228,92,0.24)" height="240" width="360" /> : null}
                {noiseLevel > 20 ? (
                  <>
                    <circle cx="68" cy="49" fill="rgba(255,228,92,0.72)" r="5" />
                    <circle cx="99" cy="184" fill="rgba(255,228,92,0.62)" r="4" />
                    <circle cx="306" cy="70" fill="rgba(255,228,92,0.68)" r="6" />
                    <circle cx="146" cy="91" fill="rgba(255,228,92,0.42)" r="3" />
                  </>
                ) : null}
                {ballSelected ? (
                  <circle
                    cx="222"
                    cy="132"
                    fill={radiusOk ? "#ffe45c" : "rgba(255,228,92,0.35)"}
                    r={radiusOk ? ballRadius : 16}
                  />
                ) : null}
              </svg>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white/72 p-4">
              <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                Detection
              </div>
              <div className="mt-2 text-[1rem] font-black text-[var(--navy-deep)]">
                {detected ? "BALL_OK" : "NO_BALL"}
              </div>
            </div>
            <div className="rounded-xl bg-white/72 p-4">
              <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                Noise
              </div>
              <div className="mt-2 text-[1rem] font-black text-[var(--navy-deep)]">
                {noiseLevel}%
              </div>
            </div>
            <div className="rounded-xl bg-white/72 p-4">
              <div className="font-mono text-[0.52rem] font-black uppercase tracking-[0.14em] text-[var(--muted-dark)]">
                Radius
              </div>
              <div className="mt-2 text-[1rem] font-black text-[var(--navy-deep)]">
                {radiusOk ? "PASS" : "TOO_SMALL"}
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-[1.1rem] border border-[rgba(7,12,34,0.08)] bg-white/78 p-4 text-[0.92rem] leading-[1.7] text-[var(--muted-dark)]">
            {status}
          </div>
        </div>
      </div>
    </section>
  );
}
