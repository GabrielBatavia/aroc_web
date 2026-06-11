"use client";

import { useEffect, useRef, useCallback, useState } from "react";

/* ─── types ─── */
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  life: number;
  maxLife: number;
  shape: "circle" | "rect" | "star";
}

type AnimPhase = "idle" | "wobble" | "kick" | "goal" | "celebrate" | "fadeout";

/* ─── constants ─── */
const IDLE_MS = 2500; // 2.5 seconds before ball appears
const BALL_RADIUS = 14;
const GOAL_W = 90;
const GOAL_H = 70;
const KICK_DURATION = 700; // ms for the parabolic arc
const CELEBRATE_DURATION = 2200;
const FADEOUT_DURATION = 600;

const TEAM_COLORS = [
  "#ffe45c", // yellow
  "#ffda3a", // warm yellow
  "#f2c94c", // gold
  "#ffffff", // white
  "#d9dde8", // silver
  "#2a3d82", // navy-bright
];

/* ─── helpers ─── */
function easeOutCubic(t: number) {
  return 1 - Math.pow(1 - t, 3);
}
function easeInQuad(t: number) {
  return t * t;
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

export function SoccerBallIdle() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const lastMoveTime = useRef(Date.now());
  const phaseRef = useRef<AnimPhase>("idle");
  const phaseStartRef = useRef(0);
  const ballPos = useRef({ x: 0, y: 0 });
  const kickStart = useRef({ x: 0, y: 0 });
  const kickEnd = useRef({ x: 0, y: 0 });
  const particles = useRef<Particle[]>([]);
  const rafRef = useRef(0);
  const [isTouch, setIsTouch] = useState(false);

  /* — pick a random goal position on screen — */
  const pickGoalTarget = useCallback((fromX: number, fromY: number) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // kick toward a random direction, at least 200px away, biased toward right side
    const angle = rand(-Math.PI * 0.35, Math.PI * 0.35) + (fromX < vw / 2 ? 0 : Math.PI);
    const dist = rand(220, Math.min(420, vw * 0.4));
    let tx = fromX + Math.cos(angle) * dist;
    let ty = fromY + Math.sin(angle) * dist * 0.5; // less vertical travel
    // clamp so the goal is visible
    tx = Math.max(GOAL_W + 20, Math.min(vw - GOAL_W - 20, tx));
    ty = Math.max(GOAL_H + 40, Math.min(vh - GOAL_H - 20, ty));
    return { x: tx, y: ty };
  }, []);

  /* — spawn confetti — */
  const spawnConfetti = useCallback((cx: number, cy: number) => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 55; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(2, 8);
      const maxLife = rand(50, 90);
      newParticles.push({
        x: cx + rand(-10, 10),
        y: cy + rand(-10, 10),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - rand(2, 5),
        size: rand(3, 7),
        color: TEAM_COLORS[Math.floor(Math.random() * TEAM_COLORS.length)],
        rotation: rand(0, Math.PI * 2),
        rotationSpeed: rand(-0.2, 0.2),
        opacity: 1,
        life: 0,
        maxLife,
        shape: (["circle", "rect", "star"] as const)[Math.floor(Math.random() * 3)],
      });
    }
    particles.current = newParticles;
  }, []);

  /* — draw soccer ball — */
  const drawBall = useCallback(
    (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number, spin: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x, y);
      ctx.rotate(spin);

      // shadow
      ctx.shadowColor = "rgba(0,0,0,0.35)";
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;

      // main ball
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fillStyle = "#fff";
      ctx.fill();

      ctx.shadowColor = "transparent";

      // pentagon pattern
      const pentR = r * 0.42;
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const px = Math.cos(a) * pentR;
        const py = Math.sin(a) * pentR;
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const ja = a + (j * Math.PI * 2) / 5;
          const jx = px + Math.cos(ja) * (r * 0.2);
          const jy = py + Math.sin(ja) * (r * 0.2);
          if (j === 0) ctx.moveTo(jx, jy);
          else ctx.lineTo(jx, jy);
        }
        ctx.closePath();
        ctx.fillStyle = "rgba(30,40,80,0.75)";
        ctx.fill();
      }
      // center pentagon
      ctx.beginPath();
      for (let j = 0; j < 5; j++) {
        const ja = (j * Math.PI * 2) / 5 - Math.PI / 2;
        const jx = Math.cos(ja) * (r * 0.22);
        const jy = Math.sin(ja) * (r * 0.22);
        if (j === 0) ctx.moveTo(jx, jy);
        else ctx.lineTo(jx, jy);
      }
      ctx.closePath();
      ctx.fillStyle = "rgba(30,40,80,0.7)";
      ctx.fill();

      // sheen highlight
      ctx.beginPath();
      ctx.arc(-r * 0.25, -r * 0.25, r * 0.4, 0, Math.PI * 2);
      const grad = ctx.createRadialGradient(-r * 0.25, -r * 0.25, 0, -r * 0.25, -r * 0.25, r * 0.4);
      grad.addColorStop(0, "rgba(255,255,255,0.6)");
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.restore();
    },
    []
  );

  /* — draw goal — */
  const drawGoal = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, alpha: number, scale: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.scale(scale, scale);

      const w = GOAL_W;
      const h = GOAL_H;
      const postW = 5;

      // net background
      ctx.fillStyle = "rgba(255,228,92,0.06)";
      ctx.fillRect(-w / 2, -h, w, h);

      // net lines
      ctx.strokeStyle = "rgba(255,255,255,0.18)";
      ctx.lineWidth = 0.8;
      const step = 10;
      for (let gx = -w / 2; gx <= w / 2; gx += step) {
        ctx.beginPath();
        ctx.moveTo(gx, -h);
        ctx.lineTo(gx, 0);
        ctx.stroke();
      }
      for (let gy = -h; gy <= 0; gy += step) {
        ctx.beginPath();
        ctx.moveTo(-w / 2, gy);
        ctx.lineTo(w / 2, gy);
        ctx.stroke();
      }

      // posts
      ctx.fillStyle = "#fff";
      ctx.shadowColor = "rgba(255,228,92,0.5)";
      ctx.shadowBlur = 8;
      // left post
      ctx.fillRect(-w / 2 - postW / 2, -h, postW, h);
      // right post
      ctx.fillRect(w / 2 - postW / 2, -h, postW, h);
      // crossbar
      ctx.fillRect(-w / 2 - postW / 2, -h - postW / 2, w + postW, postW);

      ctx.restore();
    },
    []
  );

  /* — draw "GOAL!" text — */
  const drawGoalText = useCallback(
    (ctx: CanvasRenderingContext2D, cx: number, cy: number, alpha: number, scale: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy - GOAL_H - 30);
      ctx.scale(scale, scale);

      ctx.font = "900 36px 'Barlow Condensed', Impact, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.letterSpacing = "4px";

      // text shadow / glow
      ctx.shadowColor = "rgba(255,228,92,0.8)";
      ctx.shadowBlur = 20;

      // stroke
      ctx.strokeStyle = "rgba(7,16,31,0.8)";
      ctx.lineWidth = 5;
      ctx.strokeText("GOAL!", 0, 0);

      // fill
      ctx.fillStyle = "#ffe45c";
      ctx.fillText("GOAL!", 0, 0);

      ctx.restore();
    },
    []
  );

  /* — draw a single particle — */
  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save();
    ctx.globalAlpha = p.opacity;
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.fillStyle = p.color;

    if (p.shape === "circle") {
      ctx.beginPath();
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (p.shape === "rect") {
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
    } else {
      // star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const r1 = p.size / 2;
        const r2 = p.size / 4;
        ctx.lineTo(Math.cos(a) * r1, Math.sin(a) * r1);
        const a2 = a + Math.PI / 5;
        ctx.lineTo(Math.cos(a2) * r2, Math.sin(a2) * r2);
      }
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }, []);

  useEffect(() => {
    // Disable on touch devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (isTouchDevice || !hasHover) {
      setIsTouch(true);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = Date.now();

      // if an animation was playing, reset to idle
      if (phaseRef.current !== "idle") {
        phaseRef.current = "idle";
        particles.current = [];
      }
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let spin = 0;

    const loop = () => {
      const now = Date.now();
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      ctx.clearRect(0, 0, vw, vh);

      const phase = phaseRef.current;
      const elapsed = now - phaseStartRef.current;

      /* ── IDLE: detect inactivity ── */
      if (phase === "idle") {
        if (
          now - lastMoveTime.current >= IDLE_MS &&
          mousePos.current.x > 0 &&
          mousePos.current.y > 0
        ) {
          phaseRef.current = "wobble";
          phaseStartRef.current = now;
          ballPos.current = { x: mousePos.current.x, y: mousePos.current.y };
        }
      }

      /* ── WOBBLE: ball appears with a subtle wobble ── */
      if (phase === "wobble") {
        const t = Math.min(elapsed / 500, 1); // 500ms wobble phase
        const scale = easeOutCubic(t);
        const wobble = Math.sin(elapsed * 0.012) * (1 - t) * 4;
        const bx = ballPos.current.x + wobble;
        const by = ballPos.current.y - scale * 8; // float up slightly
        spin += 0.01;
        drawBall(ctx, bx, by, BALL_RADIUS * scale, Math.min(t * 1.5, 1), spin);

        if (t >= 1) {
          // transition to kick
          phaseRef.current = "kick";
          phaseStartRef.current = now;
          kickStart.current = { x: ballPos.current.x, y: ballPos.current.y - 8 };
          const target = pickGoalTarget(kickStart.current.x, kickStart.current.y);
          kickEnd.current = target;
        }
      }

      /* ── KICK: parabolic arc ── */
      if (phase === "kick") {
        const t = Math.min(elapsed / KICK_DURATION, 1);
        const et = easeOutCubic(t);

        // parabolic arc
        const bx = lerp(kickStart.current.x, kickEnd.current.x, et);
        const arcHeight = Math.abs(kickEnd.current.x - kickStart.current.x) * 0.5 + 80;
        const parabola = -4 * t * (t - 1); // 0 -> 1 -> 0
        const by = lerp(kickStart.current.y, kickEnd.current.y, et) - parabola * arcHeight;

        spin += 0.15 * (1 - t * 0.5); // spin slows as it arrives
        ballPos.current = { x: bx, y: by };
        drawBall(ctx, bx, by, BALL_RADIUS, 1, spin);

        // motion trail
        for (let i = 1; i <= 3; i++) {
          const tt = Math.max(0, t - i * 0.04);
          const ett = easeOutCubic(tt);
          const tx = lerp(kickStart.current.x, kickEnd.current.x, ett);
          const tp = -4 * tt * (tt - 1);
          const ty = lerp(kickStart.current.y, kickEnd.current.y, ett) - tp * arcHeight;
          drawBall(ctx, tx, ty, BALL_RADIUS * (1 - i * 0.15), 0.15 / i, spin - i * 0.3);
        }

        // draw goal appearing
        const goalAlpha = easeInQuad(Math.min(t * 2, 1));
        const goalScale = lerp(0.6, 1, easeOutCubic(Math.min(t * 2, 1)));
        drawGoal(ctx, kickEnd.current.x, kickEnd.current.y, goalAlpha, goalScale);

        if (t >= 1) {
          phaseRef.current = "goal";
          phaseStartRef.current = now;
          spawnConfetti(kickEnd.current.x, kickEnd.current.y - GOAL_H * 0.4);
        }
      }

      /* ── GOAL: ball in net + text ── */
      if (phase === "goal") {
        phaseRef.current = "celebrate";
        phaseStartRef.current = now;
      }

      /* ── CELEBRATE ── */
      if (phase === "celebrate") {
        const t = Math.min(elapsed / CELEBRATE_DURATION, 1);

        // goal + ball
        drawGoal(ctx, kickEnd.current.x, kickEnd.current.y, 1, 1);
        // ball sits inside goal, slight bounce
        const bounce = Math.sin(elapsed * 0.008) * 3 * (1 - t);
        drawBall(
          ctx,
          kickEnd.current.x,
          kickEnd.current.y - GOAL_H * 0.35 + bounce,
          BALL_RADIUS * 0.9,
          1,
          spin
        );

        // "GOAL!" text
        const textT = Math.min(elapsed / 400, 1);
        const textScale = easeOutCubic(textT) * 1.0 + Math.sin(elapsed * 0.005) * 0.05;
        drawGoalText(ctx, kickEnd.current.x, kickEnd.current.y, Math.min(textT * 2, 1), textScale);

        // particles
        particles.current = particles.current.filter((p) => {
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12; // gravity
          p.vx *= 0.98;
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, 1 - p.life / p.maxLife);
          if (p.opacity <= 0) return false;
          drawParticle(ctx, p);
          return true;
        });

        if (t >= 1) {
          phaseRef.current = "fadeout";
          phaseStartRef.current = now;
        }
      }

      /* ── FADEOUT ── */
      if (phase === "fadeout") {
        const t = Math.min(elapsed / FADEOUT_DURATION, 1);
        const alpha = 1 - easeInQuad(t);

        drawGoal(ctx, kickEnd.current.x, kickEnd.current.y, alpha, 1);
        drawBall(
          ctx,
          kickEnd.current.x,
          kickEnd.current.y - GOAL_H * 0.35,
          BALL_RADIUS * 0.9,
          alpha,
          spin
        );
        drawGoalText(ctx, kickEnd.current.x, kickEnd.current.y, alpha, 1);

        // remaining particles
        particles.current = particles.current.filter((p) => {
          p.life++;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.12;
          p.vx *= 0.98;
          p.rotation += p.rotationSpeed;
          p.opacity = Math.max(0, (1 - p.life / p.maxLife) * alpha);
          if (p.opacity <= 0) return false;
          drawParticle(ctx, p);
          return true;
        });

        if (t >= 1) {
          phaseRef.current = "idle";
          particles.current = [];
          // reset the idle timer so we don't immediately trigger again
          lastMoveTime.current = Date.now();
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
    };
  }, [drawBall, drawGoal, drawGoalText, drawParticle, pickGoalTarget, spawnConfetti]);

  if (isTouch) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9998]"
      aria-hidden="true"
    />
  );
}
