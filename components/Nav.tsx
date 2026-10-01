"use client";

import { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { scrollToY } from "./SmoothScroll";

const LINKS = [
  { label: "Story", href: "#chapters" },
  { label: "Reserve", href: "#reserve" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setHidden(y > prev && y > 240);
    setScrolled(y > 40);
  });

  const go = (href: string) => {
    const el = document.querySelector(href);
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY);
  };

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-[80] flex justify-center px-4 pt-4"
      animate={hidden && !reduce ? { y: "-120%" } : { y: "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav
        aria-label="Primary"
        className={`flex w-full max-w-3xl items-center justify-between px-5 py-3 transition-all duration-500 ${
          scrolled
            ? "rounded-full border border-line bg-night/70 backdrop-blur-md"
            : "border border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            scrollToY(0);
          }}
          className="font-display text-xl font-semibold tracking-wide"
          aria-label="JOLT — back to top"
        >
          JOLT<span className="text-volt">.</span>
        </a>
        <div className="flex items-center gap-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault();
                go(l.href);
              }}
              className="font-mono text-[11px] tracking-[0.22em] text-bone-dim uppercase transition-colors hover:text-volt"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reserve"
            onClick={(e) => {
              e.preventDefault();
              go("#reserve");
            }}
            className="rounded-full bg-volt px-4 py-2 font-mono text-[11px] font-medium tracking-[0.14em] text-night uppercase transition-transform hover:scale-[1.04] active:scale-[0.98]"
          >
            ₹1.49L
          </a>
        </div>
      </nav>
    </motion.header>
  );
}
