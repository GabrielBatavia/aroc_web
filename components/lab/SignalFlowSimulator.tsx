"use client";

import { useMemo, useState, type SetStateAction } from "react";

type CommStatus = "WALK_FORWARD" | "TURN_ACTION" | "KICK_GATE" | "KICK_RELEASED" | "LOST_WAIT" | "STOPPED";

type TraceItem = {
  channel: string;
  message: string;
  level: "ok" | "warn" | "stop";
};

type CommPreset = {
  id: string;
  label: string;
  description: string;
  values: {
    bearingCentirad: number;
    gateEnabled: boolean;
    goalXPercent: number;
    localizerOk: boolean;
    lostAgeMs: number;
    rangeCm: number;
  };
};

const COMM_PRESETS: CommPreset[] = [
  {
    id: "approach",
    label: "Mendekati bola",
    description: "Bola masih jauh dan arahnya cukup lurus. Bridge memilih berjalan maju.",
    values: { rangeCm: 62, bearingCentirad: 12, lostAgeMs: 120, goalXPercent: 8, localizerOk: true, gateEnabled: true },
  },
  {
    id: "turn",
    label: "Menghadap bola",
    description: "Arah bola terlalu jauh dari depan robot. Bridge berhenti lalu mengirim aksi putar.",
    values: { rangeCm: 55, bearingCentirad: 48, lostAgeMs: 120, goalXPercent: 8, localizerOk: true, gateEnabled: true },
  },
  {
    id: "kick-gate",
    label: "Kick menunggu gawang",
    description: "Bola sudah dekat, tetapi gawang belum cukup tengah. KickGate menahan perintah kick.",
    values: { rangeCm: 18, bearingCentirad: 8, lostAgeMs: 120, goalXPercent: 42, localizerOk: true, gateEnabled: true },
  },
  {
    id: "lost-ball",
    label: "Bola hilang",
    description: "Data localizer buruk melewati batas waktu. Bridge menghentikan gerak demi keamanan.",
    values: { rangeCm: 42, bearingCentirad: 12, lostAgeMs: 980, goalXPercent: 8, localizerOk: false, gateEnabled: true },
  },
];

const PIPE_NODES = [
  { label: "Detector", x: 38, y: 64 },
  { label: "Localizer", x: 128, y: 64 },
  { label: "Bridge", x: 218, y: 64 },
  { label: "KickGate", x: 308, y: 64 },
  { label: "OP3", x: 394, y: 64 },
];

const TRACE_BY_STATUS: Record<CommStatus, TraceItem[]> = {
  WALK_FORWARD: [
    { channel: "/ball_localizer/status", message: "Status OK: posisi bola dapat dipakai.", level: "ok" },
    { channel: "/ball_polar", message: "Bola masih lebih jauh dari batas pendekatan dekat.", level: "ok" },
    { channel: "bridge", message: "Bridge memilih perintah berjalan maju.", level: "ok" },
    { channel: "op3_walking_module", message: "Robot menerima perintah start walking.", level: "ok" },
  ],
  TURN_ACTION: [
    { channel: "/ball_polar", message: "Nilai bearing melebihi batas arah lurus.", level: "warn" },
    { channel: "bridge", message: "Walking dihentikan sebelum robot berputar.", level: "warn" },
    { channel: "bridge", message: "Bridge meminta action page putar kiri atau kanan.", level: "ok" },
    { channel: "OP3", message: "Robot menjalankan aksi putar untuk menghadap bola.", level: "ok" },
  ],
  KICK_GATE: [
    { channel: "bridge", message: "Bola dekat dan arah bola cukup lurus: bridge meminta kick.", level: "ok" },
    { channel: "KickGate", message: "Perintah kick disimpan sementara sebagai pending kick.", level: "warn" },
    { channel: "/goal_detector", message: "Posisi gawang belum cukup tengah, gate meminta micro-turn.", level: "warn" },
    { channel: "KickGate", message: "Kick belum diteruskan ke OP3 sampai alignment berubah atau timeout berlaku.", level: "warn" },
  ],
  KICK_RELEASED: [
    { channel: "/ball_polar", message: "Bola dekat dan bearing berada pada rentang kick.", level: "ok" },
    { channel: "bridge", message: "Bridge mengirim permintaan kick ke jalur raw action.", level: "ok" },
    { channel: "KickGate", message: "Observasi gawang cukup tengah; gate melepas perintah kick.", level: "ok" },
    { channel: "OP3", message: "OP3 menerima action page kick yang sudah diperiksa.", level: "ok" },
  ],
  LOST_WAIT: [
    { channel: "/ball_localizer/status", message: "Localizer sedang tidak valid, tetapi waktu hilang belum melampaui batas.", level: "warn" },
    { channel: "bridge", message: "Bridge menunggu data baru agar satu frame buruk tidak langsung menghentikan robot.", level: "warn" },
    { channel: "motion", message: "Perintah sebelumnya ditahan sementara.", level: "warn" },
    { channel: "bridge", message: "Jika waktu terus bertambah, state akan berubah menjadi stop.", level: "warn" },
  ],
  STOPPED: [
    { channel: "/ball_localizer/status", message: "Data bola tidak valid atau sudah hilang terlalu lama.", level: "warn" },
    { channel: "bridge", message: "Batas lost timeout tercapai; bridge memilih stop.", level: "stop" },
    { channel: "/robotis/walking/command", message: "Perintah stop diteruskan ke walking module.", level: "stop" },
    { channel: "op3_walking_module", message: "Robot berhenti dan menunggu data yang valid kembali.", level: "stop" },
  ],
};

const STATUS_STYLE: Record<CommStatus, { bg: string; text: string; dot: string; title: string }> = {
  WALK_FORWARD: { bg: "rgba(200,204,216,0.15)", text: "#c8ccd8", dot: "#c8ccd8", title: "Berjalan maju" },
  TURN_ACTION: { bg: "rgba(255,170,40,0.18)", text: "#ffaa28", dot: "#ffaa28", title: "Putar ke arah bola" },
  KICK_GATE: { bg: "rgba(255,170,40,0.18)", text: "#ffaa28", dot: "#ffaa28", title: "Kick sedang ditahan" },
  KICK_RELEASED: { bg: "rgba(255,228,92,0.18)", text: "#ffe45c", dot: "#ffe45c", title: "Kick diteruskan" },
  LOST_WAIT: { bg: "rgba(255,170,40,0.18)", text: "#ffaa28", dot: "#ffaa28", title: "Menunggu data bola" },
  STOPPED: { bg: "rgba(255,80,60,0.18)", text: "#ff5040", dot: "#ff5040", title: "Robot berhenti" },
};

const TRACE_COLOR: Record<TraceItem["level"], string> = {
  ok: "rgba(200,204,216,0.94)",
  warn: "#ffaa28",
  stop: "#ff8070",
};

function computeCommStatus(rangeM: number, bearingRad: number, localizerOk: boolean, lostAgeMs: number, goalX: number, gateEnabled: boolean): CommStatus {
  if (!localizerOk) return lostAgeMs > 800 ? "STOPPED" : "LOST_WAIT";
  if (rangeM < 0.23 && Math.abs(bearingRad) < 0.2) {
    if (!gateEnabled || Math.abs(goalX) <= 0.18) return "KICK_RELEASED";
    return "KICK_GATE";
  }
  if (Math.abs(bearingRad) > 0.3) return "TURN_ACTION";
  if (rangeM > 0.3) return "WALK_FORWARD";
  return "STOPPED";
}

function statusExplanation(status: CommStatus) {
  switch (status) {
    case "WALK_FORWARD": return "Bola masih jauh dan arahnya cukup lurus. Bridge memilih mendekat dengan berjalan maju.";
    case "TURN_ACTION": return "Bola berada terlalu jauh di sisi kiri atau kanan. Robot perlu berputar sebelum melanjutkan pendekatan.";
    case "KICK_GATE": return "Bola sudah dekat, tetapi KickGate belum menganggap arah gawang cukup aman. Perintah kick disimpan sementara.";
    case "KICK_RELEASED": return "Jarak bola, arah bola, dan alignment gawang memenuhi syarat yang dipakai simulator. Perintah kick dapat diteruskan.";
    case "LOST_WAIT": return "Satu hasil localizer yang buruk belum tentu berarti bola benar-benar hilang. Bridge menunggu sampai batas waktu terlampaui.";
    default: return "Data bola tidak aman digunakan atau sudah hilang terlalu lama. Bridge memilih menghentikan gerak.";
  }
}

export function SignalFlowSimulator() {
  const [rangeCm, setRangeCm] = useState(42);
  const [bearingCentirad, setBearingCentirad] = useState(12);
  const [lostAgeMs, setLostAgeMs] = useState(120);
  const [goalXPercent, setGoalXPercent] = useState(8);
  const [localizerOk, setLocalizerOk] = useState(true);
  const [gateEnabled, setGateEnabled] = useState(true);
  const [traceState, setTraceState] = useState<{ status: CommStatus; index: number }>({ status: "WALK_FORWARD", index: 0 });

  const rangeM = rangeCm / 100;
  const bearingRad = bearingCentirad / 100;
  const goalX = goalXPercent / 100;
  const status = useMemo(() => computeCommStatus(rangeM, bearingRad, localizerOk, lostAgeMs, goalX, gateEnabled), [bearingRad, gateEnabled, goalX, localizerOk, lostAgeMs, rangeM]);
  const trace = TRACE_BY_STATUS[status];
  const statusStyle = STATUS_STYLE[status];

  const traceIndex = traceState.status === status ? traceState.index : 0;
  const setTraceIndex = (update: SetStateAction<number>) => {
    setTraceState((current) => {
      const currentIndex = current.status === status ? current.index : 0;
      const nextIndex = typeof update === "function" ? update(currentIndex) : update;
      return { status, index: nextIndex };
    });
  };

  const packetProgress = trace.length <= 1 ? 0 : Math.round((traceIndex / (trace.length - 1)) * (PIPE_NODES.length - 1));
  const packetNode = PIPE_NODES[packetProgress];
  const visibleTrace = trace.slice(0, traceIndex + 1);
  const actionPage = bearingRad > 0 ? "2" : "3";
  const bridgeOutput =
    status === "WALK_FORWARD" ? "/robotis/walking/command start" :
    status === "TURN_ACTION" ? `/robotis/action/page_num ${actionPage}` :
    status === "KICK_GATE" ? "pending kick: KickGate meminta micro-turn" :
    status === "KICK_RELEASED" ? "/robotis/action/page_num 83" :
    status === "LOST_WAIT" ? "menahan perintah sebelumnya" :
    "/robotis/walking/command stop";

  const controls = [
    { id: "sig-range", label: "Jarak bola", value: rangeCm, setter: setRangeCm, min: 10, max: 120, display: `${rangeM.toFixed(2)} m` },
    { id: "sig-bearing", label: "Arah bola", value: bearingCentirad, setter: setBearingCentirad, min: -80, max: 80, display: `${bearingRad.toFixed(2)} rad` },
    { id: "sig-lost-age", label: "Lama data bola hilang", value: lostAgeMs, setter: setLostAgeMs, min: 0, max: 1500, display: `${lostAgeMs} ms` },
    { id: "sig-goal-x", label: "Posisi tengah gawang", value: goalXPercent, setter: setGoalXPercent, min: -100, max: 100, display: `${goalX.toFixed(2)}` },
  ];

  const applyPreset = (preset: CommPreset) => {
    setRangeCm(preset.values.rangeCm);
    setBearingCentirad(preset.values.bearingCentirad);
    setLostAgeMs(preset.values.lostAgeMs);
    setGoalXPercent(preset.values.goalXPercent);
    setLocalizerOk(preset.values.localizerOk);
    setGateEnabled(preset.values.gateEnabled);
    setTraceIndex(0);
  };

  return (
    <div className="grid gap-0 lg:grid-cols-[340px_1fr]">
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <div aria-live="polite" className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em]" style={{ background: statusStyle.bg, color: statusStyle.text }}>
            <span aria-hidden="true" className="size-1.5 rounded-full" style={{ background: statusStyle.dot }} />
            {statusStyle.title}
          </div>
          <p className="mt-4 text-[0.84rem] leading-[1.72] text-[rgba(248,247,240,0.68)]">{statusExplanation(status)}</p>
          <div className="mt-4 rounded-[1rem] border border-[rgba(200,204,216,0.14)] bg-[rgba(3,6,16,0.45)] p-4">
            <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.38)]">Keluaran bridge pada contoh ini</div>
            <div className="mt-2 break-words font-mono text-[0.72rem] font-black text-[#c8ccd8]">{bridgeOutput}</div>
          </div>
        </div>

        <div>
          <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.38)]">Skenario pembelajaran</div>
          <div className="grid gap-2">
            {COMM_PRESETS.map((preset) => (
              <button className="rounded-[0.95rem] border border-[rgba(200,204,216,0.14)] bg-[rgba(200,204,216,0.045)] px-3 py-2 text-left transition hover:border-[rgba(200,204,216,0.46)] hover:bg-[rgba(200,204,216,0.09)]" key={preset.id} onClick={() => applyPreset(preset)} type="button">
                <span className="block text-[0.78rem] font-black text-[rgba(248,247,240,0.9)]">{preset.label}</span>
                <span className="mt-1 block text-[0.68rem] leading-[1.45] text-[rgba(248,247,240,0.5)]">{preset.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {controls.map((control) => (
            <label className="block" key={control.id}>
              <span className="mb-2 flex items-center justify-between gap-2"><span className="text-[0.8rem] font-bold text-[rgba(248,247,240,0.9)]">{control.label}</span><span className="font-mono text-[0.68rem] font-black text-[#c8ccd8]">{control.display}</span></span>
              <input aria-label={`${control.label}: ${control.display}`} className="w-full cursor-pointer accent-[#c8ccd8]" max={control.max} min={control.min} onChange={(event) => control.setter(Number(event.target.value))} type="range" value={control.value} />
            </label>
          ))}
        </div>

        <div className="grid gap-2 rounded-[1rem] border border-[rgba(200,204,216,0.14)] bg-[rgba(3,6,16,0.42)] p-3">
          <button aria-pressed={localizerOk} className="flex items-center justify-between gap-3 rounded-[0.7rem] px-2 py-2 text-left transition hover:bg-[rgba(248,247,240,0.05)]" onClick={() => setLocalizerOk((value) => !value)} type="button"><span className="text-[0.76rem] font-bold text-[rgba(248,247,240,0.8)]">Data localizer valid</span><span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.12em]" style={{ color: localizerOk ? "#c8ccd8" : "#ff8070" }}>{localizerOk ? "Ya" : "Tidak"}</span></button>
          <button aria-pressed={gateEnabled} className="flex items-center justify-between gap-3 rounded-[0.7rem] px-2 py-2 text-left transition hover:bg-[rgba(248,247,240,0.05)]" onClick={() => setGateEnabled((value) => !value)} type="button"><span className="text-[0.76rem] font-bold text-[rgba(248,247,240,0.8)]">Gunakan KickGate</span><span className="font-mono text-[0.58rem] font-black uppercase tracking-[0.12em]" style={{ color: gateEnabled ? "#ffe45c" : "rgba(248,247,240,0.45)" }}>{gateEnabled ? "Aktif" : "Nonaktif"}</span></button>
        </div>
      </div>

      <div className="border-t border-[rgba(200,204,216,0.1)] p-4 sm:p-6 lg:border-l lg:border-t-0">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.43)]"><span>Jejak keputusan, satu langkah per waktu</span><span style={{ color: statusStyle.text }}>Langkah {traceIndex + 1} / {trace.length}</span></div>
        <svg aria-label="Alur pesan dari detector, localizer, bridge, KickGate, sampai OP3" className="w-full rounded-[1.2rem] border border-[rgba(200,204,216,0.12)] bg-[rgba(3,6,16,0.56)]" role="img" viewBox="0 0 430 130">
          {PIPE_NODES.slice(0, -1).map((node, index) => <line key={node.label} stroke="rgba(200,204,216,0.23)" strokeDasharray="5 4" strokeWidth="2" x1={node.x + 34} x2={PIPE_NODES[index + 1].x - 34} y1={node.y} y2={node.y} />)}
          {PIPE_NODES.map((node, index) => {
            const isReached = index <= packetProgress;
            const isHold = status === "KICK_GATE" && node.label === "KickGate";
            return <g key={node.label}><rect fill={isHold ? "rgba(255,170,40,0.14)" : isReached ? "rgba(200,204,216,0.13)" : "rgba(200,204,216,0.04)"} height="44" rx="8" stroke={isHold ? "#ffaa28" : isReached ? statusStyle.dot : "rgba(200,204,216,0.18)"} strokeWidth="1.5" width="68" x={node.x - 34} y={node.y - 22} /><text fill={isHold ? "#ffaa28" : isReached ? "#f8f7f0" : "rgba(248,247,240,0.38)"} fontFamily="monospace" fontSize="8" fontWeight="800" textAnchor="middle" x={node.x} y={node.y + 5}>{node.label}</text></g>;
          })}
          <circle cx={packetNode.x} cy={packetNode.y} fill={statusStyle.dot} r="6" style={{ transition: "cx 450ms ease, fill 300ms ease" }} />
          {status === "KICK_GATE" && <text fill="#ffaa28" fontFamily="monospace" fontSize="9" fontWeight="800" textAnchor="middle" x="308" y="114">kick masih menunggu alignment</text>}
        </svg>

        <div className="mt-4 flex flex-wrap gap-2">
          <button className="rounded-full border border-[rgba(200,204,216,0.24)] px-4 py-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.12em] text-[rgba(248,247,240,0.76)] transition hover:border-[rgba(200,204,216,0.56)] disabled:opacity-35" disabled={traceIndex === 0} onClick={() => setTraceIndex((current) => current - 1)} type="button">Kembali</button>
          <button className="rounded-full bg-[#c8ccd8] px-4 py-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.12em] text-[#07101f] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40" disabled={traceIndex === trace.length - 1} onClick={() => setTraceIndex((current) => current + 1)} type="button">Lanjutkan jejak</button>
          <button className="rounded-full border border-[rgba(200,204,216,0.24)] px-4 py-2 font-mono text-[0.56rem] font-black uppercase tracking-[0.12em] text-[rgba(248,247,240,0.76)] transition hover:border-[rgba(200,204,216,0.56)]" onClick={() => setTraceIndex(0)} type="button">Ulangi</button>
        </div>

        <div className="mt-4 rounded-[1rem] border border-[rgba(200,204,216,0.12)] bg-[rgba(3,6,16,0.62)] p-4" aria-label="Jejak pesan">
          <div className="mb-3 font-mono text-[0.5rem] font-black uppercase tracking-[0.15em] text-[rgba(248,247,240,0.4)]">Penjelasan langkah yang sudah dilalui</div>
          <div className="grid gap-2">
            {visibleTrace.map((entry, index) => <div className="grid grid-cols-[auto_1fr] gap-3 rounded-[0.75rem] border border-[rgba(248,247,240,0.06)] bg-[rgba(248,247,240,0.025)] p-3" key={`${entry.channel}-${index}`}><span className="font-mono text-[0.58rem] font-black" style={{ color: TRACE_COLOR[entry.level] }}>{String(index + 1).padStart(2, "0")}</span><div><div className="font-mono text-[0.6rem] font-black text-[rgba(248,247,240,0.78)]">{entry.channel}</div><p className="mt-1 text-[0.76rem] leading-[1.55]" style={{ color: TRACE_COLOR[entry.level] }}>{entry.message}</p></div></div>)}
          </div>
        </div>

        <div className="mt-4 rounded-[1rem] border border-[rgba(200,204,216,0.12)] bg-[rgba(200,204,216,0.055)] p-4 text-[0.8rem] leading-[1.68] text-[rgba(248,247,240,0.65)]"><span className="font-mono text-[0.54rem] font-black uppercase tracking-[0.15em] text-[#c8ccd8]">Catatan materi</span><p className="mt-2">Jejak ini dibuat deterministik: satu perubahan parameter menghasilkan urutan penjelasan yang sama. Ini membantu siswa melihat alasan sebuah tindakan tanpa log yang bergerak acak.</p></div>
      </div>
    </div>
  );
}
