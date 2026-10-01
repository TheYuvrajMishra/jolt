"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

interface BikeSvgProps {
  /** 0..5 across the five chapters — drives continuous scrub motion */
  activeFloat: MotionValue<number>;
  /** integer 0..4 — drives stepped feature reveals */
  active: number;
}

const BONE = "#ecede3";
const VOLT = "#c8ff2e";
const GLOW = "url(#softGlow)";

/* ------------------------------------------------------------------ */
/* small building blocks                                               */
/* ------------------------------------------------------------------ */

function Wheel({ cx, cy, motor }: { cx: number; cy: number; motor?: boolean }) {
  const spokes = [0, 60, 120, 180, 240, 300];
  return (
    <g>
      <circle cx={cx} cy={cy} r={114} fill="none" stroke="#22261f" strokeWidth={34} />
      <circle cx={cx} cy={cy} r={76} fill="none" stroke={BONE} strokeWidth={4} opacity={0.85} />
      {spokes.map((a) => {
        const r = (a * Math.PI) / 180;
        return (
          <line
            key={a}
            x1={cx}
            y1={cy}
            x2={cx + 74 * Math.cos(r)}
            y2={cy + 74 * Math.sin(r)}
            stroke={BONE}
            strokeWidth={3}
            opacity={0.28}
          />
        );
      })}
      <circle cx={cx} cy={cy} r={9} fill={BONE} />
      {motor && <MotorGlow cx={cx} cy={cy} />}
    </g>
  );
}

function MotorGlow({ cx, cy }: { cx: number; cy: number }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={30} fill={VOLT} opacity={0.85} filter={GLOW} />
      <circle cx={cx} cy={cy} r={13} fill={VOLT} />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* main component                                                      */
/* ------------------------------------------------------------------ */

export default function BikeSvg({ activeFloat, active }: BikeSvgProps) {
  // continuous scrub mappings (all inputs stay inside [0,5] — no clamp issues)
  const beamRotate = useTransform(activeFloat, [0, 1, 2, 3, 4, 5], [-6, -2.5, 1, 4.5, -1, -5]);
  const arcRotate = useTransform(activeFloat, [0, 5], [0, 200]);
  const backX = useTransform(activeFloat, [0, 5], [0, -46]);
  const frontX = useTransform(activeFloat, [0, 5], [0, -96]);
  const dashX = useTransform(activeFloat, [0, 5], [0, -640]);

  const on = (i: number) => active === i;

  // battery cell ticks along the downtube
  const ticks = [0.2, 0.35, 0.5, 0.65, 0.8].map((t) => {
    const x = 762 + (566 - 762) * t;
    const y = 392 + (588 - 392) * t;
    return { x, y };
  });

  return (
    <svg
      viewBox="0 0 1200 760"
      className="h-auto w-full"
      role="img"
      aria-label="JOLT ONE electric motorcycle at night, headlamp beam sweeping the road"
    >
      <defs>
        <linearGradient id="beamGrad" gradientUnits="userSpaceOnUse" x1={788} y1={0} x2={1200} y2={0}>
          <stop offset="0%" stopColor={VOLT} stopOpacity={0.5} />
          <stop offset="55%" stopColor={VOLT} stopOpacity={0.16} />
          <stop offset="100%" stopColor={VOLT} stopOpacity={0} />
        </linearGradient>
        <linearGradient id="beamCore" gradientUnits="userSpaceOnUse" x1={788} y1={0} x2={1200} y2={0}>
          <stop offset="0%" stopColor="#f4ffd6" stopOpacity={0.55} />
          <stop offset="100%" stopColor="#f4ffd6" stopOpacity={0} />
        </linearGradient>
        <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={18} />
        </filter>
        <filter id="softGlowSm" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation={7} />
        </filter>
      </defs>

      {/* stars */}
      <g fill={BONE} opacity={0.5}>
        {[
          [90, 80], [210, 150], [340, 60], [470, 120], [600, 70], [720, 140],
          [840, 60], [950, 180], [1120, 90], [150, 240], [520, 210], [990, 260],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.4} />
        ))}
      </g>

      {/* moon */}
      <g>
        <circle cx={1060} cy={130} r={30} fill={BONE} opacity={0.9} />
        <circle cx={1060} cy={130} r={52} fill={BONE} opacity={0.08} />
      </g>

      {/* skyline, back layer */}
      <motion.g style={{ x: backX }} fill="#0d100d">
        {[0, 130, 260, 420, 560, 720, 880, 1040, 1180].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={560 - ((i * 53) % 70)}
            width={110}
            height={200}
          />
        ))}
      </motion.g>
      {/* skyline, front layer */}
      <motion.g style={{ x: frontX }} fill="#121512">
        {[40, 200, 360, 520, 700, 860, 1020, 1180].map((x, i) => (
          <rect
            key={i}
            x={x}
            y={600 - ((i * 89) % 90)}
            width={140}
            height={220}
          />
        ))}
      </motion.g>

      {/* ground */}
      <line x1={0} y1={678} x2={1200} y2={678} stroke={BONE} strokeWidth={2} opacity={0.14} />
      {/* speed dashes */}
      <motion.g style={{ x: dashX }} stroke={VOLT} strokeWidth={3} opacity={0.22} strokeLinecap="round">
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={-560 + i * 160} y1={706} x2={-490 + i * 160} y2={706} />
        ))}
      </motion.g>

      {/* bike shadow */}
      <ellipse cx={610} cy={694} rx={305} ry={14} fill="#000" opacity={0.55} filter="url(#softGlowSm)" />

      {/* ---------------- headlamp beam (behind bike) ---------------- */}
      <motion.g
        style={{
          rotate: beamRotate,
          transformBox: "view-box",
          transformOrigin: "788px 429px",
        }}
      >
        <polygon points="788,414 1200,296 1200,566 788,444" fill="url(#beamGrad)" opacity={0.6} />
        <polygon points="788,422 1200,362 1200,498 788,436" fill="url(#beamCore)" opacity={0.55} />
      </motion.g>

      {/* ---------------- the bike ---------------- */}
      <g strokeLinecap="round" strokeLinejoin="round">
        <Wheel cx={360} cy={545} motor={on(0)} />
        <Wheel cx={860} cy={545} />

        {/* torque arcs around the rear wheel — chapter 1 */}
        <motion.g
          style={{ rotate: arcRotate, transformBox: "view-box", transformOrigin: "360px 545px" }}
          opacity={on(0) ? 1 : 0}
          className="transition-opacity duration-500"
          fill="none"
          stroke={VOLT}
          strokeWidth={5}
          strokeLinecap="round"
        >
          <circle cx={360} cy={545} r={98} strokeDasharray="46 567" />
          <circle cx={360} cy={545} r={98} strokeDasharray="46 567" strokeDashoffset={-306} opacity={0.6} />
        </motion.g>

        {/* swingarm + seat tube + stays */}
        <path d="M360,545 L560,596" stroke={BONE} strokeWidth={8} fill="none" />
        <path d="M560,596 L524,436" stroke={BONE} strokeWidth={6} fill="none" />
        <path d="M524,436 L366,540" stroke={BONE} strokeWidth={4} fill="none" opacity={0.9} />

        {/* downtube = the battery */}
        <path d="M762,392 L566,588" stroke={BONE} strokeWidth={16} fill="none" />
        <motion.path
          d="M762,392 L566,588"
          stroke={VOLT}
          strokeWidth={16}
          fill="none"
          filter={GLOW}
          initial={false}
          animate={{ opacity: on(1) ? 0.9 : 0 }}
          transition={{ duration: 0.5 }}
        />
        {/* battery cell ticks light up in sequence */}
        {ticks.map((p, k) => (
          <motion.line
            key={k}
            x1={p.x - 6.4}
            y1={p.y - 6.4}
            x2={p.x + 6.4}
            y2={p.y + 6.4}
            stroke={VOLT}
            strokeWidth={3.5}
            initial={false}
            animate={{ opacity: on(1) ? 1 : 0.12 }}
            transition={{ duration: 0.3, delay: on(1) ? k * 0.09 : 0 }}
          />
        ))}

        {/* tank */}
        <path
          d="M524,436 C600,406 690,400 762,404 L752,448 C680,442 600,448 536,474 Z"
          fill="#141814"
          stroke={BONE}
          strokeWidth={4}
        />
        {/* seat + tail */}
        <path d="M430,428 L536,424" stroke={BONE} strokeWidth={12} fill="none" />
        <path d="M430,428 L394,454 L432,460 Z" fill="#1a1e1a" stroke={BONE} strokeWidth={3} />

        {/* fork */}
        <path d="M754,408 L852,548" stroke={BONE} strokeWidth={5} fill="none" />
        <path d="M770,400 L868,542" stroke={BONE} strokeWidth={5} fill="none" />
        {/* front fender */}
        <path d="M786,480 A104,104 0 0 1 934,480" stroke={BONE} strokeWidth={5} fill="none" opacity={0.75} />

        {/* handlebar + dash (the brain) */}
        <path d="M762,404 L742,348" stroke={BONE} strokeWidth={6} fill="none" />
        <path d="M706,344 L778,340" stroke={BONE} strokeWidth={8} fill="none" />
        <rect x={724} y={312} width={48} height={28} rx={7} fill="#101310" stroke={BONE} strokeWidth={3} />
        <motion.g
          initial={false}
          animate={{ opacity: on(2) ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect x={724} y={312} width={48} height={28} rx={7} fill={VOLT} opacity={0.85} filter={GLOW} />
          <rect x={730} y={318} width={36} height={16} rx={4} fill="#0b0d0b" />
          <path d="M736,332 L744,332 M748,326 L748,338 M756,326 L756,338" stroke={VOLT} strokeWidth={2.5} />
          {/* signal arcs */}
          <path d="M736,300 A22,22 0 0 1 760,300" fill="none" stroke={VOLT} strokeWidth={3} />
          <path d="M730,292 A32,32 0 0 1 766,292" fill="none" stroke={VOLT} strokeWidth={3} opacity={0.55} />
        </motion.g>

        {/* headlamp — always lit, it's the story's light source */}
        <circle cx={773} cy={429} r={30} fill={VOLT} opacity={0.35} filter={GLOW} />
        <rect x={758} y={410} width={30} height={38} rx={9} fill={VOLT} />

        {/* frame trace — chapter 4 draws the whole silhouette in volt */}
        <motion.g
          fill="none"
          stroke={VOLT}
          strokeWidth={3}
          initial={false}
          animate={{ opacity: on(3) ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        >
          {[
            "M360,545 L560,596",
            "M560,596 L524,436",
            "M524,436 L366,540",
            "M762,392 L566,588",
            "M754,408 L852,548",
            "M770,400 L868,542",
            "M524,436 C600,406 690,400 762,404",
            "M430,428 L536,424",
          ].map((d, k) => (
            <motion.path
              key={k}
              d={d}
              initial={false}
              animate={{ pathLength: on(3) ? 1 : 0 }}
              transition={{ duration: 1.1, delay: on(3) ? k * 0.08 : 0, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </motion.g>

        {/* charge port + rising bars — chapter 5 */}
        <motion.g initial={false} animate={{ opacity: on(4) ? 1 : 0.25 }} transition={{ duration: 0.5 }}>
          <circle cx={664} cy={490} r={12} fill="#0b0d0b" stroke={on(4) ? VOLT : BONE} strokeWidth={3} className="transition-colors duration-500" />
          <rect x={676} y={484} width={16} height={12} rx={2} fill="none" stroke={on(4) ? VOLT : BONE} strokeWidth={2.5} className="transition-colors duration-500" />
          <path d="M692,487 L698,487 M692,493 L698,493" stroke={on(4) ? VOLT : BONE} strokeWidth={2.5} className="transition-colors duration-500" />
        </motion.g>
        <g>
          {[18, 32, 46, 60].map((h, k) => (
            <motion.rect
              key={k}
              x={716 + k * 20}
              y={560 - h}
              width={12}
              height={h}
              rx={3}
              fill={VOLT}
              style={{ transformBox: "fill-box", transformOrigin: "bottom" }}
              initial={false}
              animate={{ scaleY: on(4) ? 1 : 0.12, opacity: on(4) ? 1 : 0.15 }}
              transition={{ duration: 0.45, delay: on(4) ? k * 0.1 : 0, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
