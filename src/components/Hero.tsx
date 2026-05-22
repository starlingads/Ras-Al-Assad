"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  MotionValue,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowDown } from "lucide-react";

const rotatingWords = [
  { text: "Solar EPC" },
  { text: "MEP Works" },
  { text: "HVAC Engineering" },
  { text: "Substations" },
  { text: "O&M Services" },
];

interface Dimensions {
  cardWidth: number;
  cardHeight: number;
  borderRadius: number;
  imgWidths: number[];
  offsets: { x: number; y: number }[];
}

interface HeroAnimationProps {
  scrollYProgress: MotionValue<number>;
  windowSize: { width: number; height: number };
  dimensions: Dimensions;
  wordIndex: number;
}

function HeroAnimation({ scrollYProgress, windowSize, dimensions, wordIndex }: HeroAnimationProps) {
  // Text fades out as user starts scrolling
  const textOpacity = useTransform(scrollYProgress, [0.10, 0.25], [1, 0]);
  const textY = useTransform(scrollYProgress, [0.10, 0.25], [0, -60]);

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

  // Parallax kicks in after card shrinks
  const parallaxEnabled = useTransform(scrollYProgress, [0.55, 0.68], [0, 1]);

  const { cardWidth: cardW, cardHeight: cardH, borderRadius: cardBR } = dimensions;

  // Central card shrinks from fullscreen to small card
  const cardWidth  = useTransform(scrollYProgress, [0.25, 0.58], [windowSize.width,  cardW]);
  const cardHeight = useTransform(scrollYProgress, [0.25, 0.58], [windowSize.height, cardH]);
  const cardBorderRadius = useTransform(scrollYProgress, [0.25, 0.58], [0, cardBR]);
  const imgScale = useTransform(scrollYProgress, [0.25, 0.58], [1.08, 1.0]);

  // Card subtle parallax drift (mild on central card)
  const cardDriftX = useTransform([mouseXSpring, parallaxEnabled], ([mx, cap]) => (mx as number) * 10 * (cap as number));
  const cardDriftY = useTransform([mouseYSpring, parallaxEnabled], ([my, cap]) => (my as number) * 10 * (cap as number));

  // Cluster shifts up to reveal corporate text
  const clusterY = useTransform(scrollYProgress, [0.62, 0.82], [0, -140]);

  // Corporate statement fade in
  const corporateOpacity = useTransform(scrollYProgress, [0.65, 0.80], [0, 1]);
  const corporateY       = useTransform(scrollYProgress, [0.65, 0.80], [50, 0]);

  // --- Floating images: each has its own scroll range for position and opacity ---
  // They START at 0,0 (center, same as card) and MOVE OUT to their offsets
  // Opacity fades in quickly so they're clearly visible once they start moving

  // Image 0 — Top Right
  const img0x = useTransform(scrollYProgress, [0.28, 0.55], [0, dimensions.offsets[0].x]);
  const img0y = useTransform(scrollYProgress, [0.28, 0.55], [0, dimensions.offsets[0].y]);
  const img0o = useTransform(scrollYProgress, [0.28, 0.40], [0, 1]);
  const img0DriftX = useTransform([img0x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 7 * (cap as number));
  const img0DriftY = useTransform([img0y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 7 * (cap as number));

  // Image 1 — Bottom Right
  const img1x = useTransform(scrollYProgress, [0.30, 0.55], [0, dimensions.offsets[1].x]);
  const img1y = useTransform(scrollYProgress, [0.30, 0.55], [0, dimensions.offsets[1].y]);
  const img1o = useTransform(scrollYProgress, [0.30, 0.42], [0, 1]);
  const img1DriftX = useTransform([img1x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 11 * (cap as number));
  const img1DriftY = useTransform([img1y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 11 * (cap as number));

  // Image 2 — Bottom Left
  const img2x = useTransform(scrollYProgress, [0.26, 0.53], [0, dimensions.offsets[2].x]);
  const img2y = useTransform(scrollYProgress, [0.26, 0.53], [0, dimensions.offsets[2].y]);
  const img2o = useTransform(scrollYProgress, [0.26, 0.38], [0, 1]);
  const img2DriftX = useTransform([img2x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 9 * (cap as number));
  const img2DriftY = useTransform([img2y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 9 * (cap as number));

  // Image 3 — Top Left
  const img3x = useTransform(scrollYProgress, [0.32, 0.57], [0, dimensions.offsets[3].x]);
  const img3y = useTransform(scrollYProgress, [0.32, 0.57], [0, dimensions.offsets[3].y]);
  const img3o = useTransform(scrollYProgress, [0.32, 0.44], [0, 1]);
  const img3DriftX = useTransform([img3x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 14 * (cap as number));
  const img3DriftY = useTransform([img3y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 14 * (cap as number));

  // Image 4 — Top Center
  const img4x = useTransform(scrollYProgress, [0.29, 0.54], [0, dimensions.offsets[4].x]);
  const img4y = useTransform(scrollYProgress, [0.29, 0.54], [0, dimensions.offsets[4].y]);
  const img4o = useTransform(scrollYProgress, [0.29, 0.41], [0, 1]);
  const img4DriftX = useTransform([img4x, mouseXSpring, parallaxEnabled], ([x, mx, cap]) => (x as number) + (mx as number) * 10 * (cap as number));
  const img4DriftY = useTransform([img4y, mouseYSpring, parallaxEnabled], ([y, my, cap]) => (y as number) + (my as number) * 10 * (cap as number));

  const floatingImgs = [
    { w: dimensions.imgWidths[0], ar: 0.854, driftX: img0DriftX, driftY: img0DriftY, opacity: img0o, src: "/assets/Ras Images/REMASTERED/SINGAPORE  PAVILION_x4.jpg",   alt: "Singapore Pavilion Solar Project",      zIdx: 30 },
    { w: dimensions.imgWidths[1], ar: 0.987, driftX: img1DriftX, driftY: img1DriftY, opacity: img1o, src: "/assets/Ras Images/REMASTERED/SOBHA HEARTLAND.jpg",             alt: "Sobha Heartland MEP Engineering",       zIdx: 28 },
    { w: dimensions.imgWidths[2], ar: 0.973, driftX: img2DriftX, driftY: img2DriftY, opacity: img2o, src: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x16.07.33 PM (1).jpg", alt: "Substation Installation", zIdx: 26 },
    { w: dimensions.imgWidths[3], ar: 0.785, driftX: img3DriftX, driftY: img3DriftY, opacity: img3o, src: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.20.31 PM.jpg",      alt: "MEP Panel Commissioning",  zIdx: 24 },
    { w: dimensions.imgWidths[4], ar: 0.856, driftX: img4DriftX, driftY: img4DriftY, opacity: img4o, src: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.57.35 PM.jpg",      alt: "Field Engineering Site",   zIdx: 22 },
  ];

  return (
    <div
      className="sticky top-0 h-screen w-full overflow-hidden"
      style={{ background: "radial-gradient(ellipse 80% 80% at 50% -20%, rgba(197,168,128,0.10), #F7F4EF 70%)" }}
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
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 180px, 250px"
              className="object-cover"
            />
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
            <Image
              src="/assets/Ras Images/REMASTERED/SINGAPORE  PAVILION_x4.jpg"
              alt="Ras Al Assad Singapore Pavilion"
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/65 pointer-events-none" />
        </motion.div>
      </motion.div>

      {/* ── Main text overlay — always above card (z-index 40) ── */}
      <motion.div
        style={{ opacity: textOpacity, y: textY, zIndex: 40 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none select-none"
      >
        {/* Badge pill */}
        <div className="h-8 mb-6 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.span
              key={rotatingWords[wordIndex].text}
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
              <span>{rotatingWords[wordIndex].text} Specialist</span>
            </motion.span>
          </AnimatePresence>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extralight tracking-tightest leading-[1.1] mb-6 text-white max-w-4xl drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          Ready to engineer <br />
          <span className="font-bold text-ras-gold drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">your energy future</span>
        </h1>

        <p className="text-base sm:text-lg text-white font-light max-w-2xl mb-10 leading-relaxed drop-shadow-[0_1px_6px_rgba(0,0,0,0.6)]">
          Licensed EPC contractor specializing in solar PV and electromechanical solutions in the UAE.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 pointer-events-auto">
          <Link
            href="/en/projects"
            className="px-8 py-3.5 bg-ras-gold text-ras-charcoal text-sm font-semibold rounded-full hover:bg-white transition-all duration-300 w-full sm:w-auto text-center"
          >
            View Projects
          </Link>
          <Link
            href="/en/contact"
            className="px-8 py-3.5 bg-white/10 backdrop-blur-sm text-white border border-white/25 text-sm font-semibold rounded-full hover:bg-white hover:text-ras-charcoal transition-all duration-300 w-full sm:w-auto text-center"
          >
            Start a Project
          </Link>
        </div>

        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center cursor-pointer pointer-events-auto"
          onClick={() => window.scrollTo({ top: window.innerHeight * 1.5, behavior: "smooth" })}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase font-bold text-white/60 mb-2">Explore Solutions</span>
          <div className="p-2.5 bg-white/10 border border-white/20 rounded-full">
            <ArrowDown className="h-4 w-4 text-ras-gold" />
          </div>
        </motion.div>
      </motion.div>

      {/* ── Corporate statement fades in at the bottom ── */}
      <motion.div
        style={{ opacity: corporateOpacity, y: corporateY, zIndex: 50 }}
        className="absolute bottom-10 sm:bottom-14 left-0 right-0 mx-auto max-w-4xl px-8 text-center flex flex-col items-center pointer-events-auto select-none"
      >
        <span className="text-ras-gold text-xs font-bold uppercase tracking-widest mb-3 block">Who We Are</span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight mb-5 leading-tight text-ras-charcoal">
          Building <span className="font-bold text-ras-goldDark">infrastructure that performs</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base font-light max-w-3xl leading-relaxed text-ras-charcoal/75">
          Ras Al Assad Electromechanical Works LLC is a UAE-based renewable and electromechanical infrastructure specialist with over a decade of experience in engineering, procurement, and construction. We support developers, industries, and institutions with technically sound, compliant, and performance-driven solutions across renewable energy and electrical infrastructure.
        </p>
      </motion.div>
    </div>
  );
}

export default function Hero() {
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
    const timer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section ref={containerRef} className="relative h-[280vh] bg-ras-sand">
      {isMounted && (
        <HeroAnimation
          key={`hero-${windowSize.width < 640 ? "sm" : windowSize.width < 1024 ? "md" : "lg"}`}
          scrollYProgress={scrollYProgress}
          windowSize={windowSize}
          dimensions={dimensions}
          wordIndex={wordIndex}
        />
      )}
    </section>
  );
}
