"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { CHAPTERS, type Chapter } from "@/lib/chapters";
import BikeSvg from "./BikeSvg";
import Hud from "./Hud";
import { scrollToY } from "./SmoothScroll";

const EASE = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/* one chapter's text — crossfades driven directly by scroll progress   */
/* ------------------------------------------------------------------ */

function ChapterText({
  chapter,
  progress,
  isActive,
}: {
  chapter: Chapter;
  progress: MotionValue<number>;
  isActive: boolean;
}) {
  const i = chapter.index;
  const t0 = i / 5;
  const t1 = (i + 1) / 5;

  // overlapping dissolve windows: each chapter fades in over the
  // previous chapter's fade-out, so the cut never dips to black
  const opacity = useTransform(
    progress,
    i === 0
      ? [0, t0 + 0.045, t1 - 0.045, t1 + 0.045]
      : i === 4
        ? [t0 - 0.045, t0 + 0.045, t1 - 0.045, 1]
        : [t0 - 0.045, t0 + 0.045, t1 - 0.045, t1 + 0.045],
    i === 0 ? [1, 1, 1, 0] : i === 4 ? [0, 1, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(progress, [t0, t1], [56, -56]);
  const blur = useTransform(opacity, [0, 1], [10, 0]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.article
      aria-hidden={!isActive}
      className="absolute inset-0 flex flex-col justify-center"
      style={{
        opacity,
        y,
        filter,
        pointerEvents: isActive ? "auto" : "none",
      }}
    >
      <p className="mb-4 flex items-baseline gap-4">
        <span className="font-display text-6xl font-semibold text-volt md:text-7xl">
          {chapter.numeral}
        </span>
        <span className="font-mono text-[10px] tracking-[0.28em] text-bone-dim uppercase">
          {chapter.kicker}
        </span>
      </p>
      <h2 className="font-display max-w-md text-4xl leading-[1.02] font-semibold tracking-tight text-bone uppercase md:text-6xl">
        {chapter.title}
      </h2>
      <p className="mt-4 max-w-md text-base leading-relaxed text-bone md:text-lg">
        <span className="text-volt">{chapter.lede}</span>
      </p>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-bone-dim md:text-base">
        {chapter.body}
      </p>
      <p className="mt-6 font-display text-3xl font-medium text-bone md:text-4xl">
        {chapter.stat.value}
        <span className="ml-2 text-lg text-volt md:text-xl">{chapter.stat.unit}</span>
        <span className="ml-3 align-middle font-mono text-[10px] tracking-[0.24em] text-bone-dim uppercase">
          {chapter.stat.label}
        </span>
      </p>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* chapter spine — click to jump                                        */
/* ------------------------------------------------------------------ */

function Spine({
  active,
  jump,
}: {
  active: number;
  jump: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Story chapters"
      className="absolute top-1/2 left-4 z-20 hidden -translate-y-1/2 flex-col gap-3 md:flex lg:left-8"
    >
      {CHAPTERS.map((c) => (
        <button
          key={c.id}
          onClick={() => jump(c.index)}
          aria-label={`Go to chapter ${c.numeral}: ${c.title}`}
          aria-current={active === c.index}
          className="group flex items-center gap-3"
        >
          <span
            className={`font-mono text-[10px] tracking-[0.2em] transition-colors ${
              active === c.index ? "text-volt" : "text-bone-dim group-hover:text-bone"
            }`}
          >
            {c.numeral}
          </span>
          <span
            className={`h-px transition-all duration-500 ${
              active === c.index ? "w-10 bg-volt" : "w-4 bg-line group-hover:bg-bone-dim"
            }`}
          />
        </button>
      ))}
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/* the pinned story                                                     */
/* ------------------------------------------------------------------ */

export default function StorySection() {
  const wrapRef = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const activeFloat = useTransform(scrollYProgress, (v) => v * 5);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(4, Math.max(0, Math.floor(v * 5))));
  });

  const jump = (i: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const start = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    scrollToY(start + ((i + 0.5) / 5) * travel);
  };

  if (reduce) return <StaticStory />;

  const ch = CHAPTERS[active];

  return (
    <section
      id="chapters"
      ref={wrapRef}
      aria-label="The JOLT ONE story in five chapters"
      className="relative h-[560vh]"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <Spine active={active} jump={jump} />

        <div className="flex items-center justify-between px-6 pt-20 md:px-12 md:pt-24">
          <p className="font-mono text-[10px] tracking-[0.32em] text-bone-dim uppercase">
            A story in five beams
          </p>
          <p className="font-mono text-[10px] tracking-[0.32em] text-bone-dim uppercase">
            Keep scrolling
          </p>
        </div>

        <div className="grid flex-1 grid-cols-1 items-center gap-2 px-6 md:grid-cols-[1fr_1.15fr] md:gap-8 md:px-12">
          {/* bike stage */}
          <div className="order-1 flex items-center justify-center md:order-2">
            <div className="w-full max-w-[640px]">
              <BikeSvg activeFloat={activeFloat} active={active} />
            </div>
          </div>
          {/* chapter text */}
          <div className="relative order-2 h-[36vh] md:order-1 md:h-[60vh] md:pl-10">
            {CHAPTERS.map((c) => (
              <ChapterText
                key={c.id}
                chapter={c}
                progress={scrollYProgress}
                isActive={active === c.index}
              />
            ))}
          </div>
        </div>

        <div className="px-6 pb-6 md:px-12 md:pb-8">
          <Hud
            torque={ch.hud.torque}
            range={ch.hud.range}
            charge={ch.hud.charge}
            chapter={active}
            progress={scrollYProgress}
          />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* reduced-motion fallback: the same story, unpinned and static         */
/* ------------------------------------------------------------------ */

function StaticStory() {
  const flat = useMotionValue(2.5);
  return (
    <section id="chapters" aria-label="The JOLT ONE story" className="px-6 py-24 md:px-12">
      <p className="mb-3 font-mono text-[10px] tracking-[0.32em] text-volt uppercase">
        A story in five beams
      </p>
      <h2 className="font-display mb-10 max-w-3xl text-5xl font-semibold tracking-tight uppercase md:text-7xl">
        Five chapters.
        <br />
        One silent machine.
      </h2>
      <div className="mx-auto mb-16 w-full max-w-3xl" aria-hidden>
        <BikeSvg activeFloat={flat} active={-1} />
      </div>
      <div className="grid gap-px bg-line md:grid-cols-2 lg:grid-cols-3">
        {CHAPTERS.map((c) => (
          <article key={c.id} className="bg-night p-8">
            <p className="font-mono text-[10px] tracking-[0.28em] text-volt uppercase">
              {c.numeral} — {c.kicker}
            </p>
            <h3 className="font-display mt-3 text-3xl font-semibold uppercase">{c.title}</h3>
            <p className="mt-3 text-bone">{c.lede}</p>
            <p className="mt-2 text-sm text-bone-dim">{c.body}</p>
            <p className="font-display mt-5 text-2xl text-bone">
              {c.stat.value}
              <span className="ml-2 text-base text-volt">{c.stat.unit}</span>
              <span className="ml-3 font-mono text-[10px] tracking-[0.24em] text-bone-dim uppercase">
                {c.stat.label}
              </span>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

export { EASE };
