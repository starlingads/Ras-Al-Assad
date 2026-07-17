/**
 * The small gold label above a section heading.
 *
 * This markup was repeated ~30 times as a raw class string, which is how the
 * contrast drifted: the brand gold reads 8.28:1 on the dark sections and
 * 2.2:1 on the light ones, so the correct colour depends on where the label
 * sits — and a copy-pasted string cannot know that. `tone` makes the surface
 * an explicit decision at every call site, and the mapping lives here.
 *
 * Only the role, weight and case are fixed. Size, tracking and margin stay in
 * `className` so the existing per-section rhythm is preserved exactly and no
 * Tailwind classes collide.
 */
export default function SectionEyebrow({
  children,
  tone,
  className = "",
}: {
  children: React.ReactNode;
  /** The surface this label sits on. "dark" = charcoal/green/photo. */
  tone: "light" | "dark";
  className?: string;
}) {
  const color = tone === "dark" ? "text-ras-gold" : "text-ras-goldInk";
  return (
    <span className={`block font-bold uppercase ${color} ${className}`}>
      {children}
    </span>
  );
}
