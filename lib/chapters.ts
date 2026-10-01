export type FeatureKey = "motor" | "battery" | "brain" | "frame" | "charge";

export interface Chapter {
  index: number;
  id: FeatureKey;
  numeral: string;
  kicker: string;
  title: string;
  lede: string;
  body: string;
  stat: { value: string; unit: string; label: string };
  hud: { torque: number; range: number; charge: number };
}

export const CHAPTERS: Chapter[] = [
  {
    index: 0,
    id: "motor",
    numeral: "01",
    kicker: "CHAPTER ONE — POWERTRAIN",
    title: "Silence, with teeth.",
    lede: "A 90 Nm hub motor that never clears its throat.",
    body: "No gears. No roar. No drama at the signal. Just a firm hand on your back the instant the light turns green — 0 to 40 in 3.9 seconds, and the only sound is the city getting quieter behind you.",
    stat: { value: "90", unit: "Nm", label: "PEAK TORQUE" },
    hud: { torque: 90, range: 180, charge: 100 },
  },
  {
    index: 1,
    id: "battery",
    numeral: "02",
    kicker: "CHAPTER TWO — ENDURANCE",
    title: "180 kilometres. One charge.",
    lede: "A 4.2 kWh pack that outlasts your plans.",
    body: "Ride past the last petrol pump in the city and keep going. Past the toll, past the highway dhaba, into the next district. The battery slides out in eleven seconds — swap it, don't wait for it.",
    stat: { value: "180", unit: "km", label: "TRUE RANGE" },
    hud: { torque: 90, range: 180, charge: 100 },
  },
  {
    index: 2,
    id: "brain",
    numeral: "03",
    kicker: "CHAPTER THREE — INTELLIGENCE",
    title: "It knows it's yours.",
    lede: "A connected dash that never sleeps.",
    body: "GPS lock, geofence alerts, over-the-air updates while you sleep. Touch it without the key and it texts you before you finish reading this sentence. Your bike has opinions about who rides it.",
    stat: { value: "24/7", unit: "", label: "THEFT WATCH" },
    hud: { torque: 90, range: 180, charge: 96 },
  },
  {
    index: 3,
    id: "frame",
    numeral: "04",
    kicker: "CHAPTER FOUR — FORM",
    title: "Drawn by the wind.",
    lede: "Hydroformed alloy, 24 kilos, zero excuses.",
    body: "Every tube was bent in a wind tunnel, not a spreadsheet. The battery hides inside the downtube, the cables vanish into the frame. From ten metres away it doesn't look electric. That's the point.",
    stat: { value: "24", unit: "kg", label: "DRY WEIGHT" },
    hud: { torque: 90, range: 180, charge: 88 },
  },
  {
    index: 4,
    id: "charge",
    numeral: "05",
    kicker: "CHAPTER FIVE — RITUAL",
    title: "Coffee-break fast.",
    lede: "0 to 80% in forty minutes.",
    body: "Plug it in with your morning coffee, unplug a full tank. Any 15-amp socket works — no special wiring, no electrician, no excuses. The slowest part of owning a JOLT is waiting for the kettle.",
    stat: { value: "40", unit: "min", label: "0–80% CHARGE" },
    hud: { torque: 90, range: 180, charge: 80 },
  },
];

export const MARQUEE_ITEMS = [
  "90 NM TORQUE",
  "180 KM RANGE",
  "40-MIN FAST CHARGE",
  "0 EMISSIONS",
  "₹1.49 LAKH",
];
