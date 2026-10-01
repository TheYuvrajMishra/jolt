# JOLT — The city, after dark.

**JOLT ONE** — an electric motorcycle brand site built as *a night ride in five beams*.

One pinned sticky-scroll story: the bike's headlamp sweeps like a searchlight while five
chapters dissolve in — 90 Nm torque, 180 km range, theft-watch intelligence, 24 kg
hydroformed frame, 40-minute fast charge. A telemetry HUD ticks along at the bottom
the whole way down.

## Stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lenis smooth scroll

## Run

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve production build
```

## Structure

- `app/` — layout, page, global styles
- `components/` — Preloader, Nav, Hero, Marquee, BikeSvg, Hud, StorySection, Footer
- `lib/chapters.ts` — the five story chapters (copy + specs)

Palette: asphalt night `#0b0d0b`, bone `#f2f0e6`, volt green `#c8ff2e`.
Type: Oswald (display) · Inter (body) · IBM Plex Mono (telemetry).
