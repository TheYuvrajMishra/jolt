"use client";

import { useEffect, useState } from "react";

export const READY_EVENT = "jolt:ready";

export function markReady() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(READY_EVENT));
  }
}

/** Resolves true once the preloader has lifted. */
export function useReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const onReady = () => setReady(true);
    window.addEventListener(READY_EVENT, onReady);
    return () => window.removeEventListener(READY_EVENT, onReady);
  }, []);
  return ready;
}
