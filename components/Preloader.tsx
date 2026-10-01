"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { markReady } from "@/lib/ready";

const DURATION = 1150;

export default function Preloader() {
  const [count, setCount] = useState(0);
  const [lifting, setLifting] = useState(false);
  const [gone, setGone] = useState(false);
  const reduce = useReducedMotion();
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    const dur = reduce ? 250 : DURATION;
    const t0 = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      // ease-out so it feels like it's loading, then lands
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setLifting(true);
        window.setTimeout(markReady, reduce ? 50 : 350);
      }
    };
    raf = requestAnimationFrame(tick);
    // hard fallback: never trap the user
    const fallback = window.setTimeout(() => {
      setLifting(true);
      markReady();
    }, 4000);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(fallback);
    };
  }, [reduce]);

  if (gone) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-night"
      initial={{ y: 0 }}
      animate={lifting ? { y: "-100%" } : { y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={() => {
        if (lifting) setGone(true);
      }}
      aria-hidden={!lifting}
    >
      <div className="text-center">
        <p className="font-display text-[18vw] leading-none font-semibold tracking-tight text-bone md:text-[9rem]">
          JOLT<span className="text-volt">.</span>
        </p>
        <p className="mt-2 font-mono text-[11px] tracking-[0.3em] text-bone-dim uppercase">
          Charging the story
        </p>
      </div>
      <p className="absolute right-6 bottom-6 font-mono text-sm text-volt tabular-nums">
        {String(count).padStart(3, "0")}%
      </p>
    </motion.div>
  );
}
