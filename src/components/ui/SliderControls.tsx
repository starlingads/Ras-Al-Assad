"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * Bespoke previous/next controls for the Swiper carousels.
 *
 * Swiper's built-in `navigation` renders a generic white circle with its own
 * icon-font chevron — the default-slider look. These replace it: a soft
 * elevated glass surface (legible over the photographic slides), a real lucide
 * chevron, a directional nudge on hover, a press compression, and a disabled
 * state at the ends. They read the live Swiper instance off the custom-element
 * ref, so the carousels keep their existing wiring; the built-in nav is turned
 * off at the call site.
 *
 * `tone` picks the surface for the section the slider sits on.
 */
type Props = {
  swiperRef: React.RefObject<{ swiper?: SwiperLike } | null>;
  tone?: "light" | "dark";
  className?: string;
  labels?: { prev: string; next: string };
};

type SwiperLike = {
  isBeginning: boolean;
  isEnd: boolean;
  slidePrev: () => void;
  slideNext: () => void;
  on: (event: string, handler: () => void) => void;
  off: (event: string, handler: () => void) => void;
};

export default function SliderControls({
  swiperRef,
  tone = "light",
  className = "",
  labels = { prev: "Previous", next: "Next" },
}: Props) {
  const [edge, setEdge] = useState({ atStart: true, atEnd: false });

  useEffect(() => {
    let swiper: SwiperLike | undefined;
    let raf = 0;
    const events = ["slideChange", "reachBeginning", "reachEnd", "fromEdge", "resize"];

    const sync = () => {
      if (swiper) setEdge({ atStart: swiper.isBeginning, atEnd: swiper.isEnd });
    };

    // The parent initializes Swiper a tick after mount, so poll for the
    // instance and bind to its own event bus (more reliable than the
    // custom element's prefixed DOM events).
    const attach = () => {
      const s = swiperRef.current?.swiper;
      if (s) {
        swiper = s;
        events.forEach((e) => s.on(e, sync));
        sync();
      } else {
        raf = window.setTimeout(attach, 100);
      }
    };
    attach();

    return () => {
      clearTimeout(raf);
      if (swiper) events.forEach((e) => swiper!.off(e, sync));
    };
  }, [swiperRef]);

  const go = (dir: "prev" | "next") => {
    const s = swiperRef.current?.swiper;
    if (!s) return;
    dir === "prev" ? s.slidePrev() : s.slideNext();
    // Reflect the new edges immediately; Swiper updates these synchronously.
    setEdge({ atStart: s.isBeginning, atEnd: s.isEnd });
  };

  const surface =
    tone === "dark"
      ? "bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/35"
      : "bg-white/85 border-ras-charcoal/10 text-ras-charcoal hover:border-ras-goldInk/40 hover:text-ras-goldInk";

  const btn = (dir: "prev" | "next", disabled: boolean) => (
    <button
      type="button"
      onClick={() => go(dir)}
      disabled={disabled}
      aria-label={dir === "prev" ? labels.prev : labels.next}
      className={`group grid h-12 w-12 place-items-center rounded-full border backdrop-blur-md shadow-[0_6px_20px_-8px_rgba(18,18,18,0.35)] transition-[transform,box-shadow,background-color,border-color,color,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(18,18,18,0.4)] active:translate-y-0 active:scale-95 disabled:pointer-events-none disabled:opacity-35 disabled:shadow-none ${surface}`}
    >
      {dir === "prev" ? (
        <ChevronLeft className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-x-0.5" />
      ) : (
        <ChevronRight className="h-5 w-5 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5" />
      )}
    </button>
  );

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {btn("prev", edge.atStart)}
      {btn("next", edge.atEnd)}
    </div>
  );
}
