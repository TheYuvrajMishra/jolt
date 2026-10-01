"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useVelocity,
} from "motion/react";
import { MARQUEE_ITEMS } from "@/lib/chapters";

/** Velocity-reactive spec ticker — the page's pulse between hero and story. */
export default function Marquee() {
  const reduce = useReducedMotion();
  // percent of the full (200%-wide) track; wraps every -50% (one full half)
  const xPct = useMotionValue(0);
  const x = useMotionTemplate`${xPct}%`;
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const dir = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const v = velocity.get();
    if (Math.abs(v) > 40) dir.current = v > 0 ? 1 : -1;
    const speed = 0.0035 + Math.min(Math.abs(v) * 0.000035, 0.04); // %/ms
    let next = xPct.get() + dir.current * speed * delta;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    xPct.set(next);
  });

  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {MARQUEE_ITEMS.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8 font-display text-2xl font-medium tracking-wide whitespace-nowrap text-bone/80 uppercase md:text-4xl">
            {item}
          </span>
          <span className="inline-block h-2.5 w-2.5 rotate-45 bg-volt" />
        </span>
      ))}
    </div>
  );

  return (
    <section
      aria-label="Key specifications"
      className="hairline-t hairline-b overflow-hidden py-5"
    >
      <motion.div className="flex w-max" style={reduce ? undefined : { x }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </section>
  );
}
