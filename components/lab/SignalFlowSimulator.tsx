"use client";

import { useEffect, useRef, useState } from "react";

type CommStatus = "WALK_FORWARD" | "TURN_ACTION" | "KICK_GATE" | "KICK_RELEASED" | "LOST_WAIT" | "STOPPED";

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
    label: "Approach Ball",
    description: "Bola masih jauh dan bearing kecil. Bridge memilih walking start.",
    values: { rangeCm: 62, bearingCentirad: 12, lostAgeMs: 120, goalXPercent: 8, localizerOk: true, gateEnabled: true },
  },
  {
    id: "turn",
    label: "Turn To Ball",
    description: "Bearing melewati turn_bearing_rad. Walking di-stop, lalu action page 2/3 dikirim.",
    values: { rangeCm: 55, bearingCentirad: 48, lostAgeMs: 120, goalXPercent: 8, localizerOk: true, gateEnabled: true },
  },
  {
    id: "kick-gate",
    label: "Kick Gate",
    description: "Bola sudah dekat, tetapi goal belum center. Page 83 ditahan dulu.",
    values: { rangeCm: 18, bearingCentirad: 8, lostAgeMs: 120, goalXPercent: 42, localizerOk: true, gateEnabled: true },
  },
  {
    id: "lost-ball",
    label: "Lost Ball",
    description: "Status localizer buruk melewati lost_timeout_sec, bridge mengirim stop.",
    values: { rangeCm: 42, bearingCentirad: 12, lostAgeMs: 980, goalXPercent: 8, localizerOk: false, gateEnabled: true },
  },
];

const PIPE_NODES = [
  { label: "Detector",  x: 36,  y: 60 },
  { label: "Localizer", x: 124, y: 60 },
  { label: "Bridge",    x: 212, y: 60 },
  { label: "KickGate",  x: 300, y: 60 },
  { label: "OP3",       x: 384, y: 60 },
];

const MESSAGES_BY_STATUS: Record<CommStatus, Array<{ channel: string; msg: string; level: LogEntry["level"] }>> = {
  WALK_FORWARD: [
    { channel: "/ball_localizer/status", msg: "OK", level: "ok" },
    { channel: "/ball_polar", msg: "range > forward_min_range_m", level: "ok" },
    { channel: "bridge", msg: "publish /robotis/walking/command start", level: "ok" },
    { channel: "op3_walking_module", msg: "walkingCommandCallback(start)", level: "ok" },
  ],
  TURN_ACTION: [
    { channel: "/ball_polar", msg: "abs(bearing) > turn_bearing_rad", level: "warn" },
    { channel: "bridge", msg: "stop walking before turn", level: "warn" },
    { channel: "bridge", msg: "publish /robotis/action/page_num 2/3", level: "ok" },
    { channel: "op3_action_module", msg: "execute turn action page", level: "ok" },
  ],
  KICK_GATE: [
    { channel: "bridge", msg: "publish kick page 83", level: "ok" },
    { channel: "kick_gate", msg: "intercept pending kick", level: "warn" },
    { channel: "kick_gate", msg: "goal not centered -> micro turn", level: "warn" },
    { channel: "kick_gate", msg: "publish action page 2/3", level: "ok" },
  ],
  KICK_RELEASED: [
    { channel: "bridge", msg: "range < 0.23m and bearing centered", level: "ok" },
    { channel: "kick_gate", msg: "goal_x within 0.18", level: "ok" },
    { channel: "kick_gate", msg: "release action page 83", level: "ok" },
    { channel: "op3_action_module", msg: "execute kick", level: "ok" },
  ],
  LOST_WAIT: [
    { channel: "/ball_localizer/status", msg: "NO_BALL but timeout not reached", level: "warn" },
    { channel: "bridge", msg: "do not instantly stop on one bad status", level: "warn" },
    { channel: "bridge", msg: "waiting for lost_timeout_sec=0.8", level: "warn" },
    { channel: "motion", msg: "hold previous command", level: "warn" },
  ],
  STOPPED: [
    { channel: "/ball_localizer/status", msg: "NO_BALL / TF_FAIL / INVALID_RADIUS", level: "warn" },
    { channel: "bridge", msg: "lost_timeout_sec -> stop", level: "stop" },
    { channel: "bridge", msg: "publish /robotis/walking/command stop", level: "stop" },
    { channel: "op3_walking_module", msg: "walkingCommandCallback(stop)", level: "stop" },
  ],
};

function computeCommStatus(
  rangeM: number,
  bearingRad: number,
  localizerOk: boolean,
  lostAgeMs: number,
  goalX: number,
  gateEnabled: boolean,
): CommStatus {
  if (!localizerOk) return lostAgeMs > 800 ? "STOPPED" : "LOST_WAIT";
  if (rangeM < 0.23 && Math.abs(bearingRad) < 0.2) {
    if (!gateEnabled || Math.abs(goalX) <= 0.18) return "KICK_RELEASED";
    return "KICK_GATE";
  }
  if (Math.abs(bearingRad) > 0.3) return "TURN_ACTION";
  if (rangeM > 0.3) return "WALK_FORWARD";
  return "STOPPED";
}

const STATUS_STYLE: Record<CommStatus, { bg: string; text: string; dot: string }> = {
  WALK_FORWARD:  { bg: "rgba(200,204,216,0.15)", text: "#c8ccd8", dot: "#c8ccd8" },
  TURN_ACTION:   { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  KICK_GATE:     { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  KICK_RELEASED: { bg: "rgba(255,228,92,0.18)",  text: "#ffe45c", dot: "#ffe45c" },
  LOST_WAIT:     { bg: "rgba(255,170,40,0.18)",  text: "#ffaa28", dot: "#ffaa28" },
  STOPPED:       { bg: "rgba(255,80,60,0.18)",   text: "#ff5040", dot: "#ff5040" },
};

const LOG_LEVEL_COLOR: Record<LogEntry["level"], string> = {
  ok:   "rgba(200,204,216,0.9)",
  warn: "#ffaa28",
  stop: "#ff5040",
};

export function SignalFlowSimulator() {
  const [rangeCm, setRangeCm] = useState(42);
  const [bearingCentirad, setBearingCentirad] = useState(12);
  const [lostAgeMs, setLostAgeMs] = useState(120);
  const [goalXPercent, setGoalXPercent] = useState(8);
  const [localizerOk, setLocalizerOk] = useState(true);
  const [gateEnabled, setGateEnabled] = useState(true);

  const [packets, setPackets] = useState<PacketDot[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const packetIdRef = useRef(0);
  const logIdRef = useRef(0);
  const logRef = useRef<HTMLDivElement>(null);

  const rangeM = rangeCm / 100;
  const bearingRad = bearingCentirad / 100;
  const goalX = goalXPercent / 100;
  const status = computeCommStatus(rangeM, bearingRad, localizerOk, lostAgeMs, goalX, gateEnabled);
  const ss = STATUS_STYLE[status];
  const visiblePackets = status === "STOPPED" ? [] : packets;
  const actionPage = bearingRad > 0 ? 2 : 3;
  const bridgeOutput =
    status === "WALK_FORWARD"
      ? "/robotis/walking/command start"
      : status === "TURN_ACTION"
        ? `/robotis/action/page_num ${actionPage}`
        : status === "KICK_GATE"
          ? `KickGate holds 83 -> turn page ${goalX > 0 ? 3 : 2}`
          : status === "KICK_RELEASED"
            ? "/robotis/action/page_num 83"
            : status === "LOST_WAIT"
              ? "hold until lost_timeout_sec"
              : "/robotis/walking/command stop";
  const activeNodes =
    status === "KICK_RELEASED"
      ? ["Detector", "Localizer", "Bridge", "KickGate", "OP3"]
      : status === "KICK_GATE"
        ? ["Detector", "Localizer", "Bridge", "KickGate"]
        : status === "STOPPED"
          ? ["Localizer", "Bridge", "OP3"]
          : ["Detector", "Localizer", "Bridge", "OP3"];

  // Animate packet dots
  useEffect(() => {
    if (status === "STOPPED") return;
    const interval = setInterval(() => {
      const dropped = false;
      const delayed = status === "KICK_GATE" || status === "TURN_ACTION";
      setPackets((prev) => {
        const moved = prev
          .map((p) => ({ ...p, x: p.x + 3.4 }))
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
    }, 120);

    return () => clearInterval(interval);
  }, [status]);

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
    }, 520);

    return () => clearInterval(interval);
  }, [status]);

  // Auto-scroll log
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [log]);

  const controls = [
    { id: "sig-range", label: "/ball_polar range", value: rangeCm, setter: setRangeCm, min: 10, max: 120, unit: "cm", display: `${rangeM.toFixed(2)}m`, color: "#c8ccd8" },
    { id: "sig-bearing", label: "/ball_polar bearing", value: bearingCentirad, setter: setBearingCentirad, min: -80, max: 80, unit: "", display: `${bearingRad.toFixed(2)}rad`, color: "#c8ccd8" },
    { id: "sig-lost-age", label: "lost ball age", value: lostAgeMs, setter: setLostAgeMs, min: 0, max: 1500, unit: "ms", display: `${lostAgeMs}ms`, color: "#c8ccd8" },
    { id: "sig-goal-x", label: "/goal_detector center_x", value: goalXPercent, setter: setGoalXPercent, min: -100, max: 100, unit: "", display: `${goalX.toFixed(2)}`, color: "#c8ccd8" },
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
            {status === "WALK_FORWARD" && "Bridge membaca bola masih jauh dan cukup lurus, lalu mengirim walking start."}
            {status === "TURN_ACTION" && "Bearing terlalu besar. Bridge stop walking lalu kirim turn action page 2/3."}
            {status === "KICK_GATE" && "Bola siap ditendang, tapi KickGate menahan page 83 sampai goal lebih center."}
            {status === "KICK_RELEASED" && "Range, bearing, dan goal alignment aman. KickGate melepas action page 83."}
            {status === "LOST_WAIT" && "Localizer memberi status buruk, tapi bridge belum stop sampai lost_timeout_sec lewat."}
            {status === "STOPPED" && "Localizer error, bola hilang, atau posisi belum aman. Bridge mengirim stop."}
          </p>
          <div className="mt-4 rounded-[0.9rem] border border-[rgba(200,204,216,0.14)] bg-[rgba(3,6,16,0.45)] p-3">
            <div className="font-mono text-[0.5rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.38)]">
              Bridge Output
            </div>
            <div className="mt-2 font-mono text-[0.72rem] font-black text-[#c8ccd8]">
              {bridgeOutput}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-2 font-mono text-[0.54rem] font-black uppercase tracking-[0.16em] text-[rgba(248,247,240,0.38)]">
            Scenario Preset
          </div>
          <div className="grid gap-2">
            {COMM_PRESETS.map((preset) => (
              <button
                className="rounded-[0.95rem] border border-[rgba(200,204,216,0.15)] bg-[rgba(200,204,216,0.05)] px-3 py-2 text-left transition duration-200 hover:border-[rgba(200,204,216,0.48)] hover:bg-[rgba(200,204,216,0.09)]"
                key={preset.id}
                onClick={() => {
                  setRangeCm(preset.values.rangeCm);
                  setBearingCentirad(preset.values.bearingCentirad);
                  setLostAgeMs(preset.values.lostAgeMs);
                  setGoalXPercent(preset.values.goalXPercent);
                  setLocalizerOk(preset.values.localizerOk);
                  setGateEnabled(preset.values.gateEnabled);
                  setPackets([]);
                  setLog([]);
                }}
                type="button"
              >
                <span className="block text-[0.78rem] font-black text-[rgba(248,247,240,0.9)]">{preset.label}</span>
                <span className="mt-1 block text-[0.68rem] leading-[1.45] text-[rgba(248,247,240,0.48)]">
                  {preset.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-5">
          {controls.map((ctrl) => (
            <label key={ctrl.id} className="block">
              <span className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">{ctrl.label}</span>
                <span className="font-mono text-[0.7rem] font-black" style={{ color: ctrl.color }}>
                  {ctrl.display ?? `${ctrl.value}${ctrl.unit}`}
                </span>
              </span>
              <input
                id={ctrl.id}
                aria-label={`${ctrl.label}: ${ctrl.display ?? `${ctrl.value}${ctrl.unit}`}`}
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

        <div className="flex items-center justify-between gap-4 rounded-[1rem] border border-[rgba(200,204,216,0.2)] bg-[rgba(200,204,216,0.06)] p-4">
          <div>
            <div className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">Localizer Status</div>
            <div className="text-[0.72rem] text-[rgba(248,247,240,0.45)] mt-0.5">OK lets /ball_polar drive bridge decisions</div>
          </div>
          <button
            id="sig-localizer-toggle"
            role="switch"
            aria-checked={localizerOk}
            aria-label="Localizer status OK toggle"
            onClick={() => setLocalizerOk((v) => !v)}
            type="button"
            className="relative h-7 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]"
            style={{ background: localizerOk ? "#c8ccd8" : "#ff5040" }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: localizerOk ? "calc(100% - 1.4rem)" : "0.2rem" }}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-[1rem] border border-[rgba(255,228,92,0.22)] bg-[rgba(255,228,92,0.06)] p-4">
          <div>
            <div className="text-[0.82rem] font-bold text-[rgba(248,247,240,0.9)]">KickGate</div>
            <div className="text-[0.72rem] text-[rgba(248,247,240,0.45)] mt-0.5">Intercepts kick page 83 for goal alignment</div>
          </div>
          <button
            id="sig-kick-gate-toggle"
            role="switch"
            aria-checked={gateEnabled}
            aria-label="Kick gate enabled toggle"
            onClick={() => setGateEnabled((v) => !v)}
            type="button"
            className="relative h-7 w-12 rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--yellow)]"
            style={{ background: gateEnabled ? "#ffe45c" : "rgba(248,247,240,0.15)" }}
          >
            <span
              className="absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all duration-200"
              style={{ left: gateEnabled ? "calc(100% - 1.4rem)" : "0.2rem" }}
              aria-hidden="true"
            />
          </button>
        </div>

        <div className="rounded-[1rem] border border-[rgba(200,204,216,0.15)] bg-[rgba(3,6,16,0.5)] p-4 text-[0.82rem] leading-[1.7] text-[rgba(248,247,240,0.55)]">
          Source robot paling penting untuk dipahami: /ball_polar tidak langsung menggerakkan servo. Bridge menerjemahkan range dan bearing menjadi walking command atau action page, lalu KickGate bisa menahan kick sampai goal selaras.
        </div>

        <div className="grid grid-cols-3 gap-2 rounded-[1rem] border border-[rgba(200,204,216,0.12)] bg-[rgba(3,6,16,0.42)] p-3">
          {[
            { label: "kick", value: "r<0.23" },
            { label: "turn", value: "|brg|>0.30" },
            { label: "lost", value: "0.8s" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="font-mono text-[0.48rem] font-black uppercase tracking-[0.14em] text-[rgba(248,247,240,0.34)]">
                {item.label}
              </div>
              <div className="mt-1 font-mono text-[0.72rem] font-black text-[#c8ccd8]">{item.value}</div>
            </div>
          ))}
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
          aria-label="Animated signal pipeline from detector to localizer, bridge, kick gate, and OP3 motion"
          role="img"
        >
          {/* Connection lines */}
          {PIPE_NODES.slice(0, -1).map((node, i) => (
            <line
              key={i}
              x1={node.x + 32}
              y1={node.y}
              x2={PIPE_NODES[i + 1].x - 32}
              y2={PIPE_NODES[i + 1].y}
              stroke={status === "STOPPED" ? "rgba(255,80,60,0.3)" : "rgba(200,204,216,0.25)"}
              strokeWidth="2"
              strokeDasharray="5 4"
            />
          ))}

          {/* Packet dots */}
          {visiblePackets.map((p) => (
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
          {PIPE_NODES.map((node) => {
            const isActiveNode = activeNodes.includes(node.label);

            return (
            <g key={node.label}>
              <rect
                x={node.x - 34}
                y={node.y - 22}
                width={68}
                height={44}
                rx={8}
                fill={status === "STOPPED" && isActiveNode ? "rgba(255,80,60,0.15)" : isActiveNode ? "rgba(200,204,216,0.16)" : "rgba(200,204,216,0.06)"}
                stroke={status === "STOPPED" && isActiveNode ? "rgba(255,80,60,0.4)" : isActiveNode ? "rgba(200,204,216,0.48)" : "rgba(200,204,216,0.14)"}
                strokeWidth="1.5"
              />
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                fill={status === "STOPPED" && isActiveNode ? "#ff5040" : isActiveNode ? "#c8ccd8" : "rgba(248,247,240,0.34)"}
                fontFamily="monospace"
                fontSize="8"
                fontWeight="bold"
              >
                {node.label}
              </text>
            </g>
          );
          })}

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
