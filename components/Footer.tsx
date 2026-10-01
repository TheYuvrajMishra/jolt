"use client";

import { motion, useReducedMotion } from "motion/react";
import { CHAPTERS } from "@/lib/chapters";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Footer() {
  const reduce = useReducedMotion();
  return (
    <footer id="reserve" className="relative overflow-hidden px-6 pt-28 pb-10 md:px-12">
      {/* volt glow rising from the bottom */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[50vh]"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 110%, rgba(200,255,46,0.12), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <p className="mb-6 font-mono text-[11px] tracking-[0.32em] text-volt uppercase">
          Chapter six — yours
        </p>
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 60, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: EASE }}
          className="font-display text-[15vw] leading-[0.9] font-semibold tracking-tight uppercase md:text-[9rem]"
        >
          Own the
          <br />
          night<span className="text-volt">.</span>
        </motion.h2>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.15 }}
          className="mt-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-bone-dim md:text-lg">
            The JOLT ONE launches with 500 founder-edition bikes. Refundable
            ₹4,999 to hold your build slot. Deliveries begin March 2027.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#reserve"
              onClick={(e) => e.preventDefault()}
              className="rounded-full bg-volt px-8 py-4 font-mono text-xs font-medium tracking-[0.14em] text-night uppercase transition-transform hover:scale-[1.04] active:scale-[0.98]"
            >
              Reserve — ₹1.49L
            </a>
            <a
              href="#reserve"
              onClick={(e) => e.preventDefault()}
              className="rounded-full border border-line px-8 py-4 font-mono text-xs tracking-[0.14em] text-bone uppercase transition-colors hover:border-volt hover:text-volt"
            >
              Book a test ride
            </a>
          </div>
        </motion.div>

        {/* spec recap */}
        <div className="mt-20 grid grid-cols-2 gap-px bg-line md:grid-cols-5">
          {CHAPTERS.map((c) => (
            <div key={c.id} className="bg-night p-5">
              <p className="font-mono text-[9px] tracking-[0.24em] text-bone-dim uppercase">
                {c.numeral} {c.stat.label}
              </p>
              <p className="font-display mt-2 text-2xl font-medium text-bone">
                {c.stat.value}
                <span className="ml-1 text-sm text-volt">{c.stat.unit}</span>
              </p>
            </div>
          ))}
        </div>

        <div className="hairline-t mt-16 flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between">
          <p className="font-display text-lg font-semibold tracking-wide">
            JOLT<span className="text-volt">.</span>
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-bone-dim uppercase">
            © 2026 JOLT Motors — a concept. No bikes were harmed.
          </p>
        </div>
      </div>
    </footer>
  );
}
