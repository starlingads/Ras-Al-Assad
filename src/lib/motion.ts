/**
 * The site's motion vocabulary — one source of truth for scroll reveals and
 * interaction feedback, so the whole interface moves as a single system.
 *
 * Derived from a motion audit of a premium reference (virya-energy.com): the
 * feel there comes from restraint and consistency, not exotic curves — a small
 * duration set, one entrance easing, and gentle staggering, rather than a
 * different timing on every element. This file replaces the grab-bag of
 * durations (0.25s–2s) and mixed easings the components had accumulated.
 *
 * Two curves, two jobs:
 *  - ENTRANCE: content arriving on scroll. A pronounced ease-out so elements
 *    decelerate into place and settle — reads as "arriving", not "sliding".
 *  - INTERACTION: hover/press feedback. A softer ease-out; snappy but calm.
 *
 * Everything here is transform/opacity only (GPU-composited, 60fps) and pairs
 * with the global prefers-reduced-motion handling, which framer's MotionConfig
 * collapses to instant.
 */

/** Entrance easing (ease-out-expo-ish). Use for scroll reveals. */
export const EASE_ENTRANCE = [0.16, 1, 0.3, 1] as const;

/** Interaction easing, as a CSS string for Tailwind's `ease-[...]` utility. */
export const EASE_INTERACTION = "cubic-bezier(0.22, 1, 0.36, 1)";

/** Duration scale (seconds). Keep reveals to these three steps. */
export const DUR = {
  micro: 0.3, // hovers, small state changes
  base: 0.6, // the standard reveal
  slow: 0.9, // large hero/section moments only
} as const;

/** A single element rising into view. */
export const revealUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: DUR.base, ease: EASE_ENTRANCE },
};

/**
 * Parent/child pair for a group that should cascade rather than pop in at
 * once — the reference's signature. Put `staggerParent` on the wrapper and
 * `staggerChild` on each item; the children inherit the reveal.
 */
export const staggerParent = {
  initial: "hidden",
  whileInView: "show",
  viewport: { once: true, margin: "-80px" },
  variants: {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  },
};

export const staggerChild = {
  variants: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DUR.base, ease: EASE_ENTRANCE },
    },
  },
};
