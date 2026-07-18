"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { LucideIcon } from "@/components/LucideIcon";
import SliderControls from "@/components/ui/SliderControls";

if (typeof window !== "undefined") {
  register(); // Register Swiper custom elements
}

/**
 * Cards come from Homepage → Expertise: the ⭐ featured services in drag
 * order, or the manual override list when the client fills one in.
 */
export type ExpertiseSliderProps = {
  chip?: string | null;
  heading?: string | null;
  cta: { label: string; href: string } | null;
  cards: {
    title: string;
    description?: string | null;
    icon?: string | null;
    imageUrl?: string | null;
    imageAlt?: string | null;
    href: string;
  }[];
};

export default function ExpertiseSlider({ chip, heading, cta, cards }: ExpertiseSliderProps) {
  const swiperRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const swiperParams = {
      slidesPerView: 1.1,
      spaceBetween: 16,
      navigation: false, // replaced by the bespoke <SliderControls/>
      breakpoints: {
        640: {
          slidesPerView: 2.1,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 3.1,
          spaceBetween: 24,
        },
        1280: {
          slidesPerView: 3.5,
          spaceBetween: 32,
        }
      },
    };

    // Wait a brief tick for Swiper Custom Elements to be registered and DOM to be ready
    const timer = setTimeout(() => {
      const swiperEl = swiperRef.current;
      if (swiperEl) {
        if (typeof swiperEl.initialize === "function") {
          try {
            Object.assign(swiperEl, swiperParams);
            swiperEl.initialize();
          } catch (err) {
            console.error("Swiper initialization error:", err);
          }
        } else {
          const retryTimer = setTimeout(() => {
            if (swiperRef.current && typeof swiperRef.current.initialize === "function") {
              try {
                Object.assign(swiperRef.current, swiperParams);
                swiperRef.current.initialize();
              } catch (e) {
                console.error("Swiper retry initialization error:", e);
              }
            }
          }, 100);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [isMounted]);

  return (
    <section className="py-20 lg:py-28 bg-ras-sand relative overflow-hidden">
      <div className="wrapper max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-ras-goldInk text-xs font-bold uppercase tracking-widest mb-3 block">
            {chip}
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-ras-charcoal tracking-tightest leading-tight">
            {heading}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-6"
        >
          {cta && (
            <Link
              href={cta.href}
              className="group inline-flex items-center space-x-2 text-ras-goldInk font-bold text-sm tracking-wide"
            >
              <span>{cta.label}</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1" />
            </Link>
          )}
          <SliderControls swiperRef={swiperRef} tone="light" className="hidden md:flex" />
        </motion.div>
      </div>

      {/* Custom Swiper Component */}
      <div className="pl-6 lg:pl-16 xl:pl-28">
        {isMounted && (
          <swiper-container
            ref={swiperRef}
            init="false"
            class="mySwiper"
          >
            {cards.map((card, idx) => (
              <swiper-slide key={idx} class="h-full">
                <Link href={card.href} className="group block relative rounded-[28px] overflow-hidden aspect-[0.7] w-full border border-ras-grey/10 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white">
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/90 via-ras-charcoal/40 to-transparent z-10" />
                  <div className="absolute inset-0 overflow-hidden">
                    {card.imageUrl && (
                      <Image
                        src={card.imageUrl}
                        alt={card.imageAlt || card.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="absolute inset-0 z-20 p-8 flex flex-col justify-between text-white">
                    {/* Top Bar with Icon */}
                    <div className="flex justify-between items-start">
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20">
                        <LucideIcon name={card.icon} className="w-6 h-6 text-ras-gold" />
                      </div>
                      <span className="w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowRight className="h-5 w-5 text-white" />
                      </span>
                    </div>

                    {/* Bottom Text */}
                    <div className="flex flex-col space-y-3">
                      <h3 className="text-2xl sm:text-3xl font-light tracking-tight leading-tight">
                        {card.title}
                      </h3>
                      <p className="text-sm text-white/80 line-clamp-4 leading-relaxed tracking-normal font-normal opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </div>
    </section>
  );
}
