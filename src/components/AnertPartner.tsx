"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import SectionEyebrow from "@/components/SectionEyebrow";

/** Content comes from Homepage → partner spotlight (partner ref + copy). */
export type AnertPartnerProps = {
  variant?: "light" | "dark";
  chip?: string | null;
  heading?: string | null;
  text?: string | null;
  logoSrc?: string | null;
  logoAlt?: string | null;
};

export default function AnertPartner({
  variant = "light",
  chip,
  heading,
  text,
  logoSrc,
  logoAlt,
}: AnertPartnerProps) {
  const isDark = variant === "dark";

  return (
    <section className={`py-20 px-6 ${isDark ? "bg-ras-charcoal" : "bg-white"}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-5xl mx-auto"
      >
        <div className={`flex flex-col md:flex-row items-center gap-10 p-10 md:p-14 rounded-3xl border ${
          isDark
            ? "bg-white/5 border-white/10"
            : "bg-ras-sand/50 border-ras-sand"
        }`}>
          {/* Partner Logo */}
          {logoSrc && (
            <div className="flex-shrink-0">
              <div className={`relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden p-4 ${
                isDark ? "bg-white/10" : "bg-white"
              } shadow-sm`}>
                <Image
                  src={logoSrc}
                  alt={logoAlt || heading || "Partner logo"}
                  fill
                  className="object-contain p-3"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 text-center md:text-left">
            {chip && (
              <SectionEyebrow
                tone={isDark ? "dark" : "light"}
                className="text-xs tracking-[0.2em] mb-2"
              >
                {chip}
              </SectionEyebrow>
            )}
            <h3 className={`font-display text-2xl md:text-3xl font-semibold tracking-tight mb-4 ${
              isDark ? "text-white" : "text-ras-charcoal"
            }`}>
              {heading}
            </h3>
            <p className={`text-sm md:text-base leading-relaxed max-w-xl ${
              isDark ? "text-white/70" : "text-ras-charcoal/70"
            }`}>
              {text}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
