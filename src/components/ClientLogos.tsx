"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

// 23 client logos: Asset 3.png through Asset 25.png
const clientLogos = Array.from({ length: 23 }, (_, i) => ({
  id: i + 3,
  src: `/assets/Trusted Clients/Asset ${i + 3}.png`,
  alt: `Trusted Client ${i + 3}`,
}));

export default function ClientLogos() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="text-ras-gold text-xs font-bold uppercase tracking-[0.25em] mb-3 block">
            Our Clients
          </span>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ras-charcoal tracking-tight">
            Trusted <span className="text-ras-gold">By</span>
          </h2>
        </motion.div>
      </div>

      {/* Logo Carousel — Full Width */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="px-0"
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          spaceBetween={40}
          slidesPerView={2}
          loop={true}
          freeMode={true}
          speed={4000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: { slidesPerView: 3, spaceBetween: 48 },
            768: { slidesPerView: 4, spaceBetween: 56 },
            1024: { slidesPerView: 6, spaceBetween: 64 },
            1280: { slidesPerView: 7, spaceBetween: 72 },
          }}
          className="client-logos-swiper"
        >
          {clientLogos.map((logo) => (
            <SwiperSlide key={logo.id}>
              <div className="flex items-center justify-center h-20 px-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    className="object-contain"
                    sizes="150px"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </section>
  );
}
