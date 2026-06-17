"use client";

import { useEffect, useRef, useState } from "react";

type CommStatus = "COMMAND_OK" | "DELAY_WARNING" | "SAFETY_STOP";

type LogEntry = {
  id: number;
  channel: string;
  message: string;
  level: "ok" | "warn" | "stop";
};

type PacketDot = {
  id: number;
  x: number;
  segment: number; // 0=Vision->Strategy, 1=Strategy->Comm, 2=Comm->Motion
  dropped: boolean;
  delayed: boolean;
};

const PIPE_NODES = [
  { label: "Vision",    x: 40,  y: 60 },
  { label: "Strategy",  x: 150, y: 60 },
  { label: "Comm",      x: 260, y: 60 },
  { label: "Motion",    x: 370, y: 60 },
];

const MESSAGES_BY_STATUS: Record<CommStatus, Array<{ channel: string; msg: string; level: LogEntry["level"] }>> = {
  COMMAND_OK: [
    { channel: "vision",  msg: "BALL_LOCKED",    level: "ok" },
    { channel: "bridge",  msg: "WALK_FORWARD",   level: "ok" },
    { channel: "motion",  msg: "EXECUTE",         level: "ok" },
    { channel: "vision",  msg: "BALL_TRACKED",   level: "ok" },
    { channel: "bridge",  msg: "KICK_PENDING",    level: "ok" },
    { channel: "motion",  msg: "ACTION_PAGE_12",  level: "ok" },
  ],
  DELAY_WARNING: [
    { channel: "vision",  msg: "BALL_LOCKED",    level: "ok" },
    { channel: "bridge",  msg: "WALK_FORWARD",   level: "ok" },
    { channel: "comm",    msg: "DELAY_DETECTED",  level: "warn" },
    { channel: "motion",  msg: "QUEUED...",        level: "warn" },
    { channel: "bridge",  msg: "TIMEOUT_WARN",   level: "warn" },
    { channel: "motion",  msg: "STALE_CMD",       level: "warn" },
  ],
  SAFETY_STOP: [
    { channel: "vision",  msg: "BALL_LOST",       level: "warn" },
    { channel: "bridge",  msg: "NO_BALL",         level: "warn" },
    { channel: "safety",  msg: "STOP_TIMEOUT",    level: "stop" },
    { channel: "motion",  msg: "STOP",            level: "stop" },
    { channel: "safety",  msg: "LINK_FAIL",       level: "stop" },
    { channel: "motion",  msg: "EMERGENCY_HALT",  level: "stop" },
  ],
};

function computeCommStatus(packetRate: number, linkQuality: number, timeout: number, safetyStop: boolean): CommStatus {
  if (safetyStop) return "SAFETY_STOP";
  const delayRisk = packetRate > 80 ? (packetRate - 80) * 0.8 : 0;
  const linkRisk = (100 - linkQuality) * 0.6;
  const timeoutRisk = timeout < 100 ? (100 - timeout) * 0.5 : 0;
  const risk = delayRisk + linkRisk + timeoutRisk;
  if (risk > 60) return "SAFETY_STOP";
  if (risk > 28) return "DELAY_WARNING";
  return "COMMAND_OK";
}

const STATUS_STYLE: Record<CommStatus, { bg: string; text: string; dot: string }> = {
  COMMAND_OK:    { bg: "rgba(200,204,216,0.15)", text: "#c8ccd8", dot: "#c8ccd8" },
  DELAY_WARNING: { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  SAFETY_STOP:   { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
};

const LOG_LEVEL_COLOR: Record<LogEntry["level"], string> = {
  ok:   "rgba(200,204,216,0.9)",
  warn: "#ffaa28",
  stop: "#ff5040",
};

export function SignalFlowSimulator() {
  const [packetRate, setPacketRate] = useState(40);
  const [linkQuality, setLinkQuality] = useState(75);
  const [timeout, setTimeout_] = useState(300);
  const [safetyStop, setSafetyStop] = useState(false);

  const [packets, setPackets] = useState<PacketDot[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const packetIdRef = useRef(0);
  const logIdRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  const status = computeCommStatus(packetRate, linkQuality, timeout, safetyStop);
  const ss = STATUS_STYLE[status];

  // Animate packet dots
  useEffect(() => {
    if (safetyStop) {
      setPackets([]);
      return;
    }
    const interval = setInterval(() => {
      const dropChance = (100 - linkQuality) / 120;
      const delayChance = (100 - linkQuality) / 60;
      const dropped = Math.random() < dropChance;
      const delayed = !dropped && Math.random() < delayChance;
      setPackets((prev) => {
        const moved = prev
          .map((p) => ({ ...p, x: p.x + (packetRate / 100) * 4.5 + 1.5 }))
          .filter((p) => p.x < 420);
        const newPacket: PacketDot = {
          id: ++packetIdRef.current,
          x: 40,
          segment: 0,
          dropped,
          delayed,
        };
        return [...moved, newPacket];
      });
    }, Math.max(30, 120 - packetRate));

    return () => clearInterval(interval);
  }, [packetRate, linkQuality, safetyStop]);

  // Log messages
  useEffect(() => {
    const pool = MESSAGES_BY_STATUS[status];
    const interval = setInterval(() => {
      const entry = pool[Math.floor(Math.random() * pool.length)];
      setLog((prev) => {
        const next = [
          ...prev,
          { id: ++logIdRef.current, channel: entry.channel, message: entry.msg, level: entry.level },
        ].slice(-24);
        return next;
      });
    }, Math.max(280, 800 - packetRate * 6));

    return () => clearInterval(interval);
  }, [status, packetRate]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const controls = [
    { id: "sig-rate",    label: "Packet Rate",     value: packetRate,   setter: setPacketRate,   min: 5,  max: 100, unit: " pkt/s", color: "#c8ccd8" },
    { id: "sig-quality", label: "Link Quality",    value: linkQuality,  setter: setLinkQuality,  min: 10, max: 100, unit: "%",       color: "#c8ccd8" },
    { id: "sig-timeout", label: "Timeout (ms)",    value: timeout,      setter: setTimeout_,     min: 50, max: 800, unit: "ms",      color: "#c8ccd8" },
  ];

  return (
    <div className="grid gap-0 lg:grid-cols-[340px_1fr]">
      {/* Controls */}
      <div className="flex flex-col gap-6 p-6 sm:p-8">
        <div>
          <div
            className="inline-flex items-center gap-2 rounded-full px-3 py-1 font-mono text-[0.6rem] font-black uppercase tracking-[0.16em]"
            style={{ background: ss.bg, color: ss.text }}
            aria-live="polite"
          >
            <span className="size-1.5 rounded-full animate-pulse" style={{ background: ss.dot }} aria-hidden="true" />
            {status}
          </div>
          <p className="mt-3 text-[0.8rem] leading-[1.65] text-[rgba(248,247,240,0.5)]">
            {status === "COMMAND_OK" && "Pipeline lancar. Semua packet sampai tanpa delay."}
            {status === "DELAY_WARNING" && "Ada delay di link. Packet mulai drop — robot bisa lag."}
            {status === "SAFETY_STOP" && "Safety stop aktif atau link gagal. Robot berhenti."}
          </p>
        </div>

        <div className="grid gap-5">
          {controls.map((ctrl) => (
            <label key={ctrl.id} className="block">
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">{ctrl.label}</span>
                <span className="font-mono text-[0.7rem] font-black" style={{ color: ctrl.color }}>
                  {ctrl.value}{ctrl.unit}
                </span>
              </span>
              <input
                id={ctrl.id}
                aria-label={`${ctrl.label}: ${ctrl.value}${ctrl.unit}`}
                className="w-full cursor-pointer accent-[#c8ccd8]"
                max={ctrl.max}
                min={ctrl.min}
                onChange={(e) => ctrl.setter(Number(e.target.value))}
                type="range"
                value={ctrl.value}
              />
            </label>
          ))}
        </div>

        {/* Safety Stop Toggle */}
        <div className="flex items-center justify-between gap-4 rounded-[1rem] border border-[rgba(255,80,60,0.25)] bg-[rgba(255,80,60,0.06)] p-4">
          <div>
            <div className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">Safety Stop</div>
            <div className="text-[0.72rem] text-[rgba(248,247,240,0.45)] mt-0.5">Forces SAFETY_STOP on all channels</div>
          </div>
          <button
            id="sig-safety-toggle"
            role="switch"
            aria-checked={safetyStop}
            aria-label="Safety stop toggle"
            onClick={() => setSafetyStop((v) => !v)}
            type="button"
            className="relative h-7 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]"
            style={{ background: safetyStop ? "#ff5040" : "rgba(248,247,240,0.15)" }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: safetyStop ? "calc(100% - 1.4rem)" : "0.2rem" }}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="rounded-[1rem] border border-[rgba(200,204,216,0.15)] bg-[rgba(3,6,16,0.5)] p-4 text-[0.82rem] leading-[1.7] text-[rgba(248,247,240,0.55)]">
          Communication menghubungkan data dan command — bukan sekadar koding serial. Satu timeout bisa membuat robot berhenti di tengah lapangan.
        </div>
      </div>

      {/* Pipeline Visualization + Log */}
      <div className="flex flex-col border-t border-[rgba(200,204,216,0.1)] p-4 sm:p-6 lg:border-l lg:border-t-0 gap-4">
        <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)]">
          Signal Pipeline
        </div>

        {/* Pipeline SVG */}
        <svg
          viewBox="0 0 420 120"
          className="w-full rounded-[1.2rem] border border-[rgba(200,204,216,0.1)] bg-[rgba(3,6,16,0.5)]"
          aria-label="Animated signal pipeline: Vision to Strategy to Communication to Motion"
          role="img"
        >
          {/* Connection lines */}
          {PIPE_NODES.slice(0, -1).map((node, i) => (
            <line
              key={i}
              x1={node.x + 30}
              y1={node.y}
              x2={PIPE_NODES[i + 1].x - 30}
              y2={PIPE_NODES[i + 1].y}
              stroke={safetyStop ? "rgba(255,80,60,0.3)" : "rgba(200,204,216,0.25)"}
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          ))}

          {/* Packet dots */}
          {packets.map((p) => (
            <circle
              key={p.id}
              cx={p.x}
              cy={60}
              r={p.dropped ? 2 : p.delayed ? 4 : 5}
              fill={
                p.dropped
                  ? "rgba(255,80,60,0.6)"
                  : p.delayed
                  ? "#ffaa28"
                  : "#c8ccd8"
              }
              opacity={p.dropped ? 0.5 : 0.85}
            />
          ))}

          {/* Nodes */}
          {PIPE_NODES.map((node) => (
            <g key={node.label}>
              <rect
                x={node.x - 30}
                y={node.y - 22}
                width={60}
                height={44}
                rx={8}
                fill={safetyStop ? "rgba(255,80,60,0.15)" : "rgba(200,204,216,0.1)"}
                stroke={safetyStop ? "rgba(255,80,60,0.4)" : "rgba(200,204,216,0.28)"}
                strokeWidth="1.5"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={safetyStop ? "#ff5040" : "#c8ccd8"}
                fontFamily="monospace"
                fontSize="10"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          ))}

          {/* Status overlay */}
          <rect x="150" y="90" width="120" height="22" rx="5" fill="rgba(3,6,16,0.8)" />
          <text x="210" y="105" textAnchor="middle" fill={ss.dot} fontFamily="monospace" fontSize="9" fontWeight="bold">
            {status}
          </text>
        </svg>

        {/* Log Console */}
        <div>
          <div className="font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.4)] mb-2">
            System Log
          </div>
          <div
            ref={logRef}
            className="h-[180px] overflow-y-auto rounded-[1rem] border border-[rgba(200,204,216,0.12)] bg-[rgba(3,6,16,0.7)] p-3 font-mono text-[0.7rem] leading-[1.9]"
            aria-live="polite"
            aria-label="System log console"
          >
            {log.map((entry) => (
              <div key={entry.id} className="flex gap-2">
                <span className="text-[rgba(248,247,240,0.3)] shrink-0">&gt;</span>
                <span className="text-[rgba(248,247,240,0.45)] shrink-0">[{entry.channel}]</span>
                <span style={{ color: LOG_LEVEL_COLOR[entry.level] }}>{entry.message}</span>
              </div>
            ))}
            {log.length === 0 && (
              <div className="text-[rgba(248,247,240,0.25)]">Waiting for signal...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
