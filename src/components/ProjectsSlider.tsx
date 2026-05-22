"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { register } from "swiper/element/bundle";
import { ArrowRight, Wind, Sun, Cpu, Zap } from "lucide-react";
import { motion } from "framer-motion";

if (typeof window !== "undefined") {
  register();
}

const projects = [
  {
    name: "PNCA-SOBHA HARTLAND-2",
    scope: "Renewable Energy & Solar EPC",
    type: "solar",
    image: "/assets/Ras Images/REMASTERED/SOBHA HEARTLAND.jpg",
    location: "Sobha Heartland, Dubai"
  },
  {
    name: "Al HABTOOR Towers",
    scope: "Infrastructure MEP & HVAC Works",
    type: "mep",
    image: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x4.07.35 PM (1).jpg",
    location: "Business Bay, Dubai"
  },
  {
    name: "HSBC Jebel Ali Complex",
    scope: "On-Grid Solar PV & Net Metering",
    type: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.33 PM.jpeg",
    location: "Jafza Gate 3, Dubai"
  },
  {
    name: "Singapore Pavilion EXPO 2020",
    scope: "Solar EPC & Electromechanical Works",
    type: "solar",
    image: "/assets/Ras Images/REMASTERED/SINGAPORE  PAVILION_x4.jpg",
    location: "Expo City, Dubai"
  },
  {
    name: "Dubai Government 5000 Villas",
    scope: "Residential PV & Community EPC",
    type: "solar",
    image: "/assets/Ras Images/WhatsApp Image 2026-03-03 at 3.07.35 PM (1).jpeg",
    location: "Mizhar & Muhaisnah, Dubai"
  },
  {
    name: "Al Garhoud Grid Substation",
    scope: "Electrical Substations & Infrastructure",
    type: "substation",
    image: "/assets/Ras Images/REMASTERED/WhatsApp Image 2026-03-03 at 3_x16.07.33 PM (1).jpg",
    location: "Al Garhoud, Dubai"
  }
];

export default function ProjectsSlider() {
  const swiperRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const params = {
      slidesPerView: 1.1,
      spaceBetween: 16,
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
      injectStyles: [
        `
        .swiper-button-next, .swiper-button-prev {
          background-color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          color: #C5A880;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px;
        }
        `
      ]
    };

    // Wait a brief tick for Swiper Custom Elements to be registered and DOM to be ready
    const timer = setTimeout(() => {
      const swiperEl = swiperRef.current;
      if (swiperEl) {
        if (typeof swiperEl.initialize === "function") {
          try {
            Object.assign(swiperEl, params);
            swiperEl.initialize();
          } catch (err) {
            console.error("Swiper initialization error:", err);
          }
        } else {
          const retryTimer = setTimeout(() => {
            if (swiperRef.current && typeof swiperRef.current.initialize === "function") {
              try {
                Object.assign(swiperRef.current, params);
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
    <section className="py-20 lg:py-28 bg-ras-sand/40 relative overflow-hidden">
      <div className="wrapper max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <span className="text-ras-gold text-xs font-bold uppercase tracking-widest mb-3 block">
            Discover Our Projects
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-light text-ras-charcoal tracking-tightest leading-tight">
            Our Projects
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Link
            href="/en/projects"
            className="group inline-flex items-center space-x-2 text-ras-gold font-bold text-sm tracking-wide"
          >
            <span>Explore all projects</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Projects Swiper Wrapper */}
      <div className="pl-6 lg:pl-16 xl:pl-28">
        {isMounted && (
          <swiper-container
            ref={swiperRef}
            init="false"
            class="mySwiper"
            navigation="true"
          >
            {projects.map((project, idx) => (
              <swiper-slide key={idx}>
                <div className="group block relative rounded-[28px] overflow-hidden aspect-[0.75] w-full border border-ras-grey/10 bg-white shadow-md hover:shadow-xl transition-all duration-300">
                  
                  {/* Background Image Zoom Wrapper */}
                  <div className="absolute inset-0 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 400px"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ras-charcoal/90 via-ras-charcoal/30 to-transparent z-10" />
                  </div>

                  {/* Badges and Interactive Details */}
                  <div className="absolute inset-0 z-20 p-6 flex flex-col justify-between text-white">
                    
                    {/* Top Badge Row */}
                    <div className="flex justify-between items-center">
                      <div className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 flex items-center space-x-2 text-xs font-semibold tracking-wide">
                        {project.type === "solar" && (
                          <>
                            <Sun className="h-3.5 w-3.5 text-ras-gold animate-spin-slow" />
                            <span className="uppercase">Solar</span>
                          </>
                        )}
                        {project.type === "mep" && (
                          <>
                            <Cpu className="h-3.5 w-3.5 text-ras-gold" />
                            <span className="uppercase">MEP Works</span>
                          </>
                        )}
                        {project.type === "hvac" && (
                          <>
                            <Wind className="h-3.5 w-3.5 text-ras-gold" />
                            <span className="uppercase">HVAC</span>
                          </>
                        )}
                        {project.type === "substation" && (
                          <>
                            <Zap className="h-3.5 w-3.5 text-ras-gold" />
                            <span className="uppercase">Substation</span>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Bottom Text Panel */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] uppercase font-bold tracking-widest text-white/60">
                        {project.location}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-light tracking-tight leading-snug">
                        {project.name}
                      </h3>
                      <p className="text-[11px] font-semibold text-ras-gold uppercase tracking-wider">
                        {project.scope}
                      </p>
                    </div>

                  </div>

                </div>
              </swiper-slide>
            ))}
          </swiper-container>
        )}
      </div>
    </section>
  );
}
