"use client";

import { useState } from "react";

import type { LabInteractive } from "@/data/lab";

type Ros2CodeCheckerProps = {
  exercise: LabInteractive;
};

function runCheck(pattern: string, code: string) {
  try {
    return new RegExp(pattern, "is").test(code);
  } catch {
    return false;
  }
}

export function Ros2CodeChecker({ exercise }: Ros2CodeCheckerProps) {
  const [code, setCode] = useState(exercise.starterCode ?? "");
  const [checked, setChecked] = useState(false);
  const checks = exercise.checks ?? [];
  const results = checks.map((check) => ({
    ...check,
    passed: runCheck(check.pattern, code),
  }));
  const passedCount = results.filter((result) => result.passed).length;
  const score = checks.length ? Math.round((passedCount / checks.length) * 100) : 0;
  const allPassed = checks.length > 0 && passedCount === checks.length;

  return (
    <section className="overflow-hidden rounded-[1.6rem] border border-[rgba(7,12,34,0.1)] bg-[var(--navy-deep)] text-[var(--cream)] shadow-[0_30px_90px_-66px_rgba(7,12,34,0.9)]">
      <div className="grid gap-0 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="p-5 sm:p-6">
          <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[var(--yellow)]">
            Python / ROS2 checker
          </div>
          <h3 className="mt-2 text-[1.35rem] font-black leading-tight">
            {exercise.title}
          </h3>
          <p className="mt-3 text-[0.92rem] leading-[1.72] text-[rgba(248,247,240,0.68)]">
            {exercise.prompt}
          </p>

          <label className="mt-5 block">
            <span className="mb-2 block font-mono text-[0.55rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.5)]">
              Tulis ide kode di sini
            </span>
            <textarea
              className="min-h-[24rem] w-full resize-y rounded-[1rem] border border-[rgba(255,228,92,0.16)] bg-[rgba(3,6,16,0.78)] p-4 font-mono text-[0.82rem] leading-[1.65] text-[var(--cream)] shadow-inner outline-none transition focus:border-[rgba(255,228,92,0.58)]"
              onChange={(event) => {
                setCode(event.target.value);
                setChecked(false);
              }}
              spellCheck={false}
              value={code}
            />
          </label>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[0.78rem] leading-[1.6] text-[rgba(248,247,240,0.5)]">
              Kode tidak dijalankan. Checker hanya membaca pola struktur Python/ROS2 untuk latihan aman di browser.
            </p>
            <button
              className="inline-flex min-h-[2.7rem] items-center justify-center rounded-full bg-[var(--yellow)] px-5 font-mono text-[0.64rem] font-black uppercase tracking-[0.14em] text-[var(--navy-deep)] transition hover:-translate-y-0.5"
              onClick={() => setChecked(true)}
              type="button"
            >
              Cek jawaban
            </button>
          </div>
        </div>

        <aside className="border-t border-[rgba(248,247,240,0.1)] bg-[rgba(248,247,240,0.055)] p-5 sm:p-6 xl:border-l xl:border-t-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[0.56rem] font-black uppercase tracking-[0.18em] text-[rgba(248,247,240,0.5)]">
                Result
              </div>
              <div className="mt-2 font-display text-[3rem] font-black leading-none text-[var(--yellow)]">
                {score}%
              </div>
            </div>
            <div className="rounded-full border border-[rgba(255,228,92,0.26)] px-3 py-1 font-mono text-[0.56rem] font-black uppercase tracking-[0.12em] text-[var(--yellow)]">
              {passedCount}/{checks.length} pass
            </div>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[rgba(248,247,240,0.12)]">
            <div
              className="h-full rounded-full bg-[var(--yellow)] transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>

          {checked ? (
            <div
              className={[
                "mt-5 rounded-[1rem] border p-4 text-[0.88rem] leading-[1.7]",
                allPassed
                  ? "border-[rgba(255,228,92,0.35)] bg-[rgba(255,228,92,0.16)] text-[var(--cream)]"
                  : "border-[rgba(248,247,240,0.12)] bg-[rgba(3,6,16,0.35)] text-[rgba(248,247,240,0.68)]",
              ].join(" ")}
            >
              {allPassed ? exercise.successMessage : exercise.failureMessage}
            </div>
          ) : null}

          <div className="mt-5 grid gap-2">
            {results.map((result) => (
              <div
                className="rounded-[0.95rem] border border-[rgba(248,247,240,0.1)] bg-[rgba(3,6,16,0.35)] p-3"
                key={result.label}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={[
                      "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full font-mono text-[0.58rem] font-black",
                      result.passed
                        ? "bg-[var(--yellow)] text-[var(--navy-deep)]"
                        : "bg-[rgba(248,247,240,0.12)] text-[rgba(248,247,240,0.55)]",
                    ].join(" ")}
                  >
                    {result.passed ? "OK" : "!"}
                  </span>
                  <div>
                    <div className="text-[0.86rem] font-black leading-snug">
                      {result.label}
                    </div>
                    {!result.passed && checked ? (
                      <p className="mt-1 text-[0.78rem] leading-[1.55] text-[rgba(248,247,240,0.54)]">
                        {result.hint}
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}
