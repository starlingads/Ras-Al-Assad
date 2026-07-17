"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

/** All copy and imagery come from Homepage → Hero. */
export type HeroImage = { url: string; alt: string };

export type HeroProps = {
  rotatingWords: string[];
  rotatingSuffix?: string | null;
  headlineLine1?: string | null;
  headlineLine2?: string | null;
  subheadline?: string | null;
  scrollHint?: string | null;
  primaryCta: { label: string; href: string } | null;
  secondaryCta: { label: string; href: string } | null;
  mainImage: HeroImage | null;
  /** The design needs exactly 5; the schema validates that. */
  floatingImages: HeroImage[];
  introChip?: string | null;
  introHeading?: string | null;
  introHeadingAccent?: string | null;
  introText?: string | null;
};

interface Dimensions {
  cardWidth: number;
  cardHeight: number;
  borderRadius: number;
  imgWidths: number[];
  offsets: { x: number; y: number }[];
}

interface HeroAnimationProps extends HeroProps {
  scrollYProgress: MotionValue<number>;
  windowSize: { width: number; height: number };
  dimensions: Dimensions;
  wordIndex: number;
}

function HeroAnimation({
  scrollYProgress,
  windowSize,
  dimensions,
  wordIndex,
  rotatingWords,
  rotatingSuffix,
  headlineLine1,
  headlineLine2,
  subheadline,
  scrollHint,
  primaryCta,
  secondaryCta,
  mainImage,
  floatingImages,
  introChip,
  introHeading,
  introHeadingAccent,
  introText,
}: HeroAnimationProps) {
  // ── Hero scroll choreography ────────────────────────────────────────────
  // The sequence is deliberately phased so no two beats compete for attention,
  // and it finishes well before the sticky section releases so the closing
  // "Who We Are" statement gets a long, still, readable hold:
  //
  //   0.00–0.16  intro headline fades out and drifts up
  //   0.16–0.50  the fullscreen card shrinks to a small card
  //   0.18–0.44  the five project photos fade in and fan out
  //   0.44–0.60  the whole cluster lifts to make room below
  //   0.52–0.66  "Who We Are" fades up and reaches FULL opacity
  //   0.66–1.00  HOLD — everything is static and fully legible
  //
  // Keeping every range's end at or before 0.66 means the entire top third of
  // the scroll (0.66→1.0) renders clamped final values, so the statement sits
  // perfectly still while the reader takes it in.

  // Intro text drifts up as the user starts scrolling. Its VERTICAL motion is
  // scroll-linked; its opacity is not — see the note below.
  const textY = useTransform(scrollYProgress, [0.04, 0.16], [0, -50]);

  // The two text layers cross-fade on scroll THRESHOLDS rather than by a
  // scroll-scrubbed opacity value. A scroll-linked `opacity` in this sticky
  // section does not hold its end value near the section's release point — it
  // drifts back toward its start, so the intro headline would creep back in and
  // the "Who We Are" statement would fade out again just as it should sit still
  // and readable. Transforms (translateY, width) hold correctly, so `y` stays
  // scroll-linked and only opacity moves to a latched `animate` target. Because
  // the thresholds are read from live progress, the cross-fade still reverses
  // cleanly when the user scrolls back up.
  const [introShown, setIntroShown] = useState(true);
  const [statementShown, setStatementShown] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setIntroShown(v < 0.18);
    setStatementShown(v >= 0.55);
  });

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { stiffness: 50, damping: 18 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const x = (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2);
      const y = (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2);
      mouseX.set(Math.max(-1, Math.min(1, x)));
      mouseY.set(Math.max(-1, Math.min(1, y)));
    };
    const handleLeave = () => { mouseX.set(0); mouseY.set(0); };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, [mouseX, mouseY]);

  // Parallax kicks in once the card has finished shrinking.
  const parallaxEnabled = useTransform(scrollYProgress, [0.44, 0.56], [0, 1]);

  const { cardWidth: cardW, cardHeight: cardH, borderRadius: cardBR } = dimensions;

  // Central card shrinks from fullscreen to small card.
  const cardWidth  = useTransform(scrollYProgress, [0.16, 0.50], [windowSize.width,  cardW]);
  const cardHeight = useTransform(scrollYProgress, [0.16, 0.50], [windowSize.height, cardH]);
  const cardBorderRadius = useTransform(scrollYProgress, [0.16, 0.50], [0, cardBR]);
  const imgScale = useTransform(scrollYProgress, [0.16, 0.50], [1.08, 1.0]);

  // Card subtle parallax drift (mild on central card)
  const cardDriftX = useTransform([mouseXSpring, parallaxEnabled], ([mx, cap]) => (mx as number) * 10 * (cap as number));
  const cardDriftY = useTransform([mouseYSpring, parallaxEnabled], ([my, cap]) => (my as number) * 10 * (cap as number));

  // Cluster shifts up to make room for the statement below it.
  const clusterY = useTransform(scrollYProgress, [0.44, 0.62], [0, -140]);

  // "Who We Are" statement drifts up into place (scroll-linked); its opacity is
  // the latched `statementShown` target set above, so once it reaches full it
  // stays there for the whole hold zone instead of slipping back to zero.
  const corporateY = useTransform(scrollYProgress, [0.52, 0.66], [40, 0]);

  // --- Floating images: each has its own scroll range for position and opacity ---
  // They START at 0,0 (center, same as card) and MOVE OUT to their offsets
  // Opacity fades in quickly so they're clearly visible once they start moving

  // Image 0 — Top Right
  const img0x = useTransform(scrollYProgress, [0.20, 0.48], [0, dimensions.offsets[0].x]);
  const img0y = useTransform(scrollYProgress, [0.20, 0.48], [0, dimensions.offsets[0].y]);
  const img0o = useTransform(scrollYProgress, [0.20, 0.34], [0, 1]);
  const img0DriftX = useTransform([img0x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 7 * (cap as number));
  const img0DriftY = useTransform([img0y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 7 * (cap as number));

  // Image 1 — Bottom Right
  const img1x = useTransform(scrollYProgress, [0.22, 0.48], [0, dimensions.offsets[1].x]);
  const img1y = useTransform(scrollYProgress, [0.22, 0.48], [0, dimensions.offsets[1].y]);
  const img1o = useTransform(scrollYProgress, [0.22, 0.36], [0, 1]);
  const img1DriftX = useTransform([img1x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 11 * (cap as number));
  const img1DriftY = useTransform([img1y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 11 * (cap as number));

  // Image 2 — Bottom Left
  const img2x = useTransform(scrollYProgress, [0.19, 0.46], [0, dimensions.offsets[2].x]);
  const img2y = useTransform(scrollYProgress, [0.19, 0.46], [0, dimensions.offsets[2].y]);
  const img2o = useTransform(scrollYProgress, [0.19, 0.32], [0, 1]);
  const img2DriftX = useTransform([img2x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 9 * (cap as number));
  const img2DriftY = useTransform([img2y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 9 * (cap as number));

  // Image 3 — Top Left
  const img3x = useTransform(scrollYProgress, [0.24, 0.50], [0, dimensions.offsets[3].x]);
  const img3y = useTransform(scrollYProgress, [0.24, 0.50], [0, dimensions.offsets[3].y]);
  const img3o = useTransform(scrollYProgress, [0.24, 0.38], [0, 1]);
  const img3DriftX = useTransform([img3x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 14 * (cap as number));
  const img3DriftY = useTransform([img3y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 14 * (cap as number));

  // Image 4 — Top Center
  const img4x = useTransform(scrollYProgress, [0.21, 0.47], [0, dimensions.offsets[4].x]);
  const img4y = useTransform(scrollYProgress, [0.21, 0.47], [0, dimensions.offsets[4].y]);
  const img4o = useTransform(scrollYProgress, [0.21, 0.35], [0, 1]);
  const img4DriftX = useTransform([img4x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 10 * (cap as number));
  const img4DriftY = useTransform([img4y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 10 * (cap as number));

  // Aspect ratios and z-order are design constants; the photos come from the CMS.
  const floatingImgs = [
    { w: dimensions.imgWidths[0], ar: 0.854, driftX: img0DriftX, driftY: img0DriftY, opacity: img0o, zIdx: 30 },
    { w: dimensions.imgWidths[1], ar: 0.987, driftX: img1DriftX, driftY: img1DriftY, opacity: img1o, zIdx: 28 },
    { w: dimensions.imgWidths[2], ar: 0.973, driftX: img2DriftX, driftY: img2DriftY, opacity: img2o, zIdx: 26 },
    { w: dimensions.imgWidths[3], ar: 0.785, driftX: img3DriftX, driftY: img3DriftY, opacity: img3o, zIdx: 24 },
    { w: dimensions.imgWidths[4], ar: 0.856, driftX: img4DriftX, driftY: img4DriftY, opacity: img4o, zIdx: 22 },
  ].map((slot, i) => ({ ...slot, photo: floatingImages[i] }));

  return (
    <div
      className="sticky top-0 w-full overflow-hidden"
      style={{
        height: windowSize.height,
        background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(197,168,128,0.10), #F7F4EF 70%)",
      }}
    >
      {/* ── Cluster wrapper shifts up to reveal corporate text ── */}
      <motion.div
        style={{ y: clusterY }}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* ── Floating images sit BEHIND the text overlay but ABOVE the card via z-index ── */}
        {floatingImgs.map((img, i) => (
          <motion.div
            key={i}
            style={{
              x: img.driftX,
              y: img.driftY,
              opacity: img.opacity,
              width: img.w,
              height: img.w / img.ar,
              position: "absolute",
              zIndex: img.zIdx,
              borderRadius: 24,
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.22)",
              border: "1px solid rgba(197,168,128,0.25)",
              willChange: "transform, opacity",
            }}
          >
            {img.photo && (
              <Image
                src={img.photo.url}
                alt={img.photo.alt}
                fill
                sizes="(max-width: 768px) 180px, 250px"
                className="object-cover"
              />
            )}
          </motion.div>
        ))}

        {/* ── Central shrinking card — z-index 20 (below floating images) ── */}
        <motion.div
          style={{
            width: cardWidth,
            height: cardHeight,
            borderRadius: cardBorderRadius,
            x: cardDriftX,
            y: cardDriftY,
            position: "absolute",
            zIndex: 20,
            overflow: "hidden",
            boxShadow: "0 32px 80px rgba(0,0,0,0.28)",
          }}
        >
          <motion.div style={{ scale: imgScale }} className="absolute inset-0">
            {mainImage && (
              <Image
                src={mainImage.url}
                alt={mainImage.alt}
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            )}
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* ── Main text overlay — always above card (z-index 40) ── */}
      <motion.div
        style={{ y: textY, zIndex: 40 }}
        animate={{ opacity: introShown ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none"
      >
        {/* Badge pill */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={rotatingWords[wordIndex]}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="inline-flex items-center space-x-2 px-4 py-1.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold tracking-widest text-ras-gold uppercase"
            >
              <span className="relative w-2.5 h-2.5 flex items-center justify-center">
                <span className="absolute w-2.5 h-2.5 rounded-full bg-ras-gold/30 animate-ping" />
                <span className="relative w-1.5 h-1.5 rounded-full bg-ras-gold" />
              </span>
              <span>{[rotatingWords[wordIndex], rotatingSuffix].filter(Boolean).join(" ")}</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tightest leading-[1.1] mb-6 text-white max-w-4xl drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
          {headlineLine1} <br />
          <span className="font-bold text-ras-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">{headlineLine2}</span>
        </h1>

        <p className="text-base sm:text-lg text-white font-light max-w-2xl mb-10 leading-relaxed drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
          {subheadline}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 pointer-events-auto">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="px-8 py-3.5 bg-ras-gold text-ras-charcoal text-sm font-semibold rounded-full hover:bg-white transition-all duration-300 w-full sm:w-auto text-center shadow-lg"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="px-8 py-3.5 bg-white/90 backdrop-blur-sm text-ras-charcoal border border-white/25 text-sm font-semibold rounded-full hover:bg-white hover:text-ras-charcoal transition-all duration-300 w-full sm:w-auto text-center shadow-lg"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer pointer-events-auto"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" })}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60 mb-2">{scrollHint}</span>
          <div className="p-2.5 bg-white/10 border border-white/20 rounded-full">
            <ArrowDown className="h-4 w-4 text-ras-gold" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Corporate statement fades in at the bottom ── */}
      <motion.div
        style={{ y: corporateY, zIndex: 50 }}
        animate={{ opacity: statementShown ? 1 : 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 mx-auto max-w-4xl px-8 text-center flex flex-col items-center pointer-events-auto select-none"
      >
        <span className="text-ras-gold text-xs font-bold uppercase tracking-widest mb-3 block">{introChip}</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 leading-tight text-ras-charcoal">
          {introHeading} <span className="font-bold text-ras-goldDark">{introHeadingAccent}</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base font-light max-w-3xl leading-relaxed text-ras-charcoal/75">
          {introText}
        </p>
      </motion.div>
    </div>
  );
}

export default function Hero(props: HeroProps) {
  const { rotatingWords } = props;
  const [wordIndex, setWordIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 1440, height: 900 });

  const [dimensions, setDimensions] = useState<Dimensions>({
    cardWidth: 309,
    cardHeight: 362,
    borderRadius: 28,
    imgWidths: [206, 219, 249, 183, 238],
    offsets: [
      { x: 420, y: -200 },
      { x: 450, y: 130 },
      { x: -430, y: 160 },
      { x: -460, y: -170 },
      { x: -150, y: -310 },
    ],
  });

  useEffect(() => {
    setIsMounted(true);
    const updateAll = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setWindowSize({ width: w, height: h });
      if (w < 640) {
        setDimensions({
          cardWidth: 110, cardHeight: 119, borderRadius: 12,
          imgWidths: [74, 78, 89, 65, 82],
          offsets: [
            { x: 115, y: -85 },
            { x: 125, y: 55 },
            { x: -115, y: 65 },
            { x: -125, y: -75 },
            { x: -45,  y: -115 },
          ],
        });
      } else if (w < 1024) {
        setDimensions({
          cardWidth: 200, cardHeight: 240, borderRadius: 20,
          imgWidths: [130, 148, 174, 125, 160],
          offsets: [
            { x: 260, y: -150 },
            { x: 290, y: 90 },
            { x: -270, y: 105 },
            { x: -300, y: -130 },
            { x: -105,  y: -220 },
          ],
        });
      } else {
        setDimensions({
          cardWidth: 309, cardHeight: 362, borderRadius: 28,
          imgWidths: [206, 219, 249, 183, 238],
          offsets: [
            { x: 420, y: -200 },
            { x: 450, y: 130 },
            { x: -430, y: 160 },
            { x: -460, y: -170 },
            { x: -150, y: -310 },
          ],
        });
      }
    };
    updateAll();
    window.addEventListener("resize", updateAll);
    return () => window.removeEventListener("resize", updateAll);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    if (rotatingWords.length === 0) return;
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [rotatingWords.length]);

  return (
    <section ref={containerRef} className="relative h-[320vh] bg-ras-sand">
      {isMounted && (
        <HeroAnimation
          key={`hero-${windowSize.width < 640 ? "sm" : windowSize.width < 1024 ? "md" : "lg"}`}
          {...props}
          scrollYProgress={scrollYProgress}
          windowSize={windowSize}
          dimensions={dimensions}
          wordIndex={Math.min(wordIndex, Math.max(rotatingWords.length - 1, 0))}
        />
      )}
    </section>
  );
}
