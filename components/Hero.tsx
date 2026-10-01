"use client";

import { motion, useReducedMotion } from "motion/react";
import { useReady } from "@/lib/ready";
import { scrollToY } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

function RiseLine({
  children,
  delay,
  ready,
}: {
  children: React.ReactNode;
  delay: number;
  ready: boolean;
}) {
  return (
    <span className="mask-line">
      <motion.span
        initial={{ y: "110%" }}
        animate={ready ? { y: "0%" } : {}}
        transition={{ duration: 0.9, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  const ready = useReady();
  const reduce = useReducedMotion();
  const anim = ready || reduce === true;

  const goStory = () => {
    const el = document.querySelector("#chapters");
    if (el) scrollToY(el.getBoundingClientRect().top + window.scrollY);
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-6 pb-10 md:px-12"
    >
      {/* ambient volt glow low on the horizon */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(60% 55% at 50% 100%, rgba(200,255,46,0.10), transparent 70%)",
        }}
      />
      {/* faint technical grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(236,237,227,0.14) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(70% 60% at 50% 40%, black, transparent 75%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={anim ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
          className="mb-6 font-mono text-[11px] tracking-[0.32em] text-volt uppercase"
        >
          JOLT ONE — Electric motorcycle
        </motion.p>

        <h1 className="font-display text-[17vw] leading-[0.92] font-semibold tracking-tight text-bone uppercase md:text-[10.5rem]">
          <RiseLine delay={0.25} ready={anim}>
            The city,
          </RiseLine>
          <RiseLine delay={0.36} ready={anim}>
            after <span className="text-volt">dark.</span>
          </RiseLine>
        </h1>

        <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={anim ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
            className="max-w-md text-base leading-relaxed text-bone-dim md:text-lg"
          >
            Five chapters. One silent machine. Scroll —{" "}
            <span className="text-bone">the headlamp does the rest.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={anim ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: EASE, delay: 0.72 }}
            className="flex items-center gap-4"
          >
            <button
              onClick={goStory}
              className="group rounded-full bg-volt px-7 py-3.5 font-mono text-xs font-medium tracking-[0.14em] text-night uppercase transition-transform hover:scale-[1.04] active:scale-[0.98]"
            >
              Start the story
              <span className="ml-2 inline-block transition-transform group-hover:translate-y-0.5">
                ↓
              </span>
            </button>
            <p className="font-mono text-[10px] tracking-[0.24em] text-bone-dim uppercase">
              05 chapters
              <br />
              ~90 seconds
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
