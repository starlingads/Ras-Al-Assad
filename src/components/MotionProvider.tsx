"use client";

import { MotionConfig } from "framer-motion";

/**
 * Makes every framer-motion animation on the site honour the OS
 * "reduce motion" setting.
 *
 * The CSS `@media (prefers-reduced-motion: reduce)` block in globals.css does
 * not reach these: framer-motion animates from JS, so it never becomes a CSS
 * transition for that rule to shorten. Without this provider the reduced-motion
 * support would only cover the declarative CSS and would silently miss the 161
 * animated properties that make up most of the motion here.
 *
 * `reducedMotion="user"` keeps opacity and colour crossfades (which do not
 * trigger vestibular symptoms) and drops transform/layout movement, which is
 * the behaviour the spec actually asks for — not "no animation at all".
 */
export default function MotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
