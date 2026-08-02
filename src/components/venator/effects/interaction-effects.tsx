"use client";

import { useEffect, useRef } from "react";

import { parsePreferences, PREFERENCES_KEY } from "@/lib/preferences";

const INTERACTIVE_SELECTOR = "a[href], button:not([disabled]), [role='button']:not([aria-disabled='true'])";
const MAX_BURSTS = 8;

export function InteractionEffects() {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let audioContext: AudioContext | null = null;

    const playSound = (kind: string) => {
      try {
        if (!parsePreferences(window.localStorage.getItem(PREFERENCES_KEY)).soundEffects) {
          return false;
        }

        audioContext ??= new AudioContext();
        if (audioContext.state === "suspended") {
          void audioContext.resume().catch(() => undefined);
        }

        const now = audioContext.currentTime;
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        oscillator.type = "square";
        oscillator.frequency.setValueAtTime(kind === "launch" ? 520 : 360, now);
        if (kind === "launch") {
          oscillator.frequency.exponentialRampToValueAtTime(760, now + 0.08);
        }
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.025, now + 0.006);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);
        oscillator.connect(gain);
        gain.connect(audioContext.destination);
        oscillator.start(now);
        oscillator.stop(now + 0.095);
        return true;
      } catch {
        return false;
      }
    };

    const createBurst = (event: MouseEvent, target: Element) => {
      const layer = layerRef.current;
      if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      while (layer.childElementCount >= MAX_BURSTS) {
        layer.firstElementChild?.remove();
      }

      const bounds = target.getBoundingClientRect();
      const useTargetCenter = event.detail === 0 || (event.clientX === 0 && event.clientY === 0);
      const x = useTargetCenter ? bounds.left + bounds.width / 2 : event.clientX;
      const y = useTargetCenter ? bounds.top + bounds.height / 2 : event.clientY;
      const burst = document.createElement("span");
      burst.className = "tactical-click-burst";
      burst.style.left = `${x}px`;
      burst.style.top = `${y}px`;
      burst.setAttribute("aria-hidden", "true");
      layer.appendChild(burst);
      burst.addEventListener("animationend", () => burst.remove(), { once: true });
      window.setTimeout(() => burst.remove(), 520);
    };

    const handleClick = (event: MouseEvent) => {
      if (!event.isTrusted || !(event.target instanceof Element)) {
        return;
      }

      const target = event.target.closest(INTERACTIVE_SELECTOR);
      if (!target || target.hasAttribute("disabled") || target.getAttribute("aria-disabled") === "true") {
        return;
      }

      const kind = target.getAttribute("data-tactical-sound") ?? "click";
      const soundPlayed = playSound(kind);
      createBurst(event, target);
      window.dispatchEvent(
        new CustomEvent("opentrade:arena-feedback", { detail: { kind, soundPlayed } }),
      );
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      if (audioContext) {
        void audioContext.close().catch(() => undefined);
      }
    };
  }, []);

  return <div aria-hidden="true" className="tactical-effects-layer" ref={layerRef} />;
}
