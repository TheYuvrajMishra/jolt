"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";

function Ticker({ value, decimals = 0 }: { value: number; decimals?: number }) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 110, damping: 22 });
  const text = useTransform(spring, (v) => v.toFixed(decimals));
  useEffect(() => {
    mv.set(value);
  }, [value, mv]);
  return (
    <motion.span className="tabular-nums">{text}</motion.span>
  );
}

function Tile({
  label,
  value,
  unit,
  decimals = 0,
}: {
  label: string;
  value: number;
  unit: string;
  decimals?: number;
}) {
  return (
    <div className="min-w-[86px]">
      <p className="font-mono text-[9px] tracking-[0.24em] text-bone-dim uppercase md:text-[10px]">
        {label}
      </p>
      <p className="font-display text-2xl font-medium text-bone md:text-3xl">
        <Ticker value={value} decimals={decimals} />
        <span className="ml-1 text-sm text-volt md:text-base">{unit}</span>
      </p>
    </div>
  );
}

export default function Hud({
  torque,
  range,
  charge,
  chapter,
  progress,
}: {
  torque: number;
  range: number;
  charge: number;
  chapter: number;
  progress: ReturnType<typeof useMotionValue<number>>;
}) {
  const scaleX = progress;
  return (
    <div className="relative z-10">
      <div className="mb-4 flex items-end justify-between gap-6">
        <p className="font-mono text-[10px] tracking-[0.28em] text-bone-dim uppercase">
          Live telemetry —{" "}
          <span className="text-volt">
            CH {String(chapter + 1).padStart(2, "0")} / 05
          </span>
        </p>
        <div className="flex gap-5 md:gap-8">
          <Tile label="Torque" value={torque} unit="Nm" />
          <Tile label="Range" value={range} unit="km" />
          <Tile label="Charge" value={charge} unit="%" />
        </div>
      </div>
      <div className="h-px w-full bg-line" aria-hidden>
        <motion.div
          className="h-full origin-left bg-volt"
          style={{ scaleX }}
        />
      </div>
    </div>
  );
}
