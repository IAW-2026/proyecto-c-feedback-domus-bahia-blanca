"use client";

import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";
import {motion, useScroll, useTransform, useMotionTemplate} from "framer-motion";
import { ShieldCheck, Star, Users } from "lucide-react";

interface HeroSectionProps {
  totalReviews: number;
}

const scrollToTopProperties = () => {
  const section = document.getElementById("top-properties");

  if (!section) return;

  const offset = 10; // ajusta este numero

  const top =
    section.getBoundingClientRect().top +
    window.scrollY -
    offset;

  window.scrollTo({
    top,
    behavior: "smooth",
  });
};

export default function HeroSection({
  totalReviews,
}: HeroSectionProps) {
  const { scrollY } = useScroll();
  const isMobile = useIsMobile();
  // Fade adaptativo
  const fadeDistance = typeof window !== "undefined" ? window.innerHeight * 2.7 : 900;
  const opacity = useTransform(scrollY, [0, fadeDistance], isMobile ? [1, 1] : [1, 0]);
  const scale = useTransform(scrollY, [0, fadeDistance], isMobile ? [1, 1] : [1, 0.9]);
  const y = useTransform(scrollY, [0, fadeDistance], isMobile ? [0, 0] : [0, -35]);
  const blur = useTransform(scrollY, [0, fadeDistance], isMobile ? [0, 0] : [0, 8]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-6 xl:pt-10 pb-2 min-h-[calc(100vh-92px)] flex items-center overflow-hidden">
      <motion.div
        style={{
          opacity,
          scale,
          y,
          filter,
        }}
        className="grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-8 xl:gap-12 items-center origin-top w-full"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : -50, filter: isMobile ? "blur(0px)" : "blur(6px)" }}
          animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          transition={{ duration: isMobile ? 0 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-domus-card border border-domus-secondary shadow-sm mb-5">
              <ShieldCheck
                size={15}
                className="text-domus-primary"
              />

              <span className="text-[13px] font-medium text-domus-text">
                Opiniones verificadas en Bahía Blanca
              </span>
            </div>

            {/* TITULO REDUCIDO */}
            <h1 className="text-4xl md:text-6xl font-bold leading-[1.0] text-domus-primary">
              Propiedades mejor valoradas por{" "}
              <span className="text-domus-terracota">
                la comunidad
              </span>
            </h1>

            {/* TEXTO */}
            <p className="text-lg text-domus-text-soft mt-5 leading-relaxed max-w-xl">
              Descubrí las propiedades mejor calificadas por quienes
              ya las visitaron. Opiniones reales, decisiones más
              informadas.
            </p>

            {/* CTA */}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/reviews/availableReviews">
                <button className="bg-domus-primary text-white px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-sm sm:text-base font-medium hover:bg-domus-primary-mid transition shadow-md cursor-pointer whitespace-nowrap">
                  Dejar una reseña
                </button>
              </Link>

              <Link href="/globalReviews">
                <button className="border border-domus-primary bg-domus-card px-6 py-3 rounded-2xl font-semibold text-domus-text hover:bg-domus-secondary/40 transition">
                  Explorar reseñas
                </button>
              </Link>

              <button
                onClick={scrollToTopProperties}
                className="px-6 py-3 rounded-2xl font-semibold border-2 border-domus-terracota bg-domus-terracota text-white shadow-md shadow-domus-terracota/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-domus-terracota/40 active:scale-[0.98] transition-all duration-300"
               >
                ⭐ Top valoradas
              </button>
            </div>

            {/* FEATURES */}
            <div className="mt-6 bg-domus-card border border-domus-secondary rounded-3xl p-5 grid grid-cols-1 md:grid-cols-3 gap-5 shadow-md">
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-domus-primary" />

                <div>
                  <p className="font-bold text-domus-text text-sm">
                    Opiniones verificadas
                  </p>

                  <p className="text-xs text-domus-text-soft mt-1">
                    Solo de visitas reales
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Star
                  size={20}
                  className="text-domus-terracota fill-domus-terracota"
                />

                <div>
                  <p className="font-bold text-domus-text text-sm">
                    Mejor valoradas
                  </p>

                  <p className="text-xs text-domus-text-soft mt-1">
                    Por nuestra comunidad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users size={20} className="text-domus-primary" />

                <div>
                  <p className="font-bold text-domus-text text-sm">
                    +{totalReviews} reseñas
                  </p>

                  <p className="text-xs text-domus-text-soft mt-1">
                    En Bahía Blanca
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: isMobile ? 1 : 0, filter: isMobile ? "blur(0px)" : "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: isMobile ? 0 : 0.8, delay: isMobile ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="hidden xl:flex justify-center items-center"
         >
          <div className="flex justify-center items-center w-full">
            <div className="w-full h-[300px] xl:h-[340px] 2xl:h-[430px] rounded-[30px] relative overflow-hidden">
              {/* glow */}
              <div className="absolute inset-0 bg-domus-terracota/10 blur-3xl scale-110" />

              <img
                src="/bahia_caricatura_2.0.png"
                alt="Domus"
                className="relative w-full h-full object-cover opacity-95"
              />

              <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-domus-bg/40 via-transparent to-domus-bg/40 pointer-events-none" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}