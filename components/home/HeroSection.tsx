"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";
import { ShieldCheck, Star, Users } from "lucide-react";

interface HeroSectionProps {
  totalReviews: number;
}

export default function HeroSection({
  totalReviews,
}: HeroSectionProps) {
  const { scrollY } = useScroll();

  // --- EFECTO SCROLL ---
  const opacity = useTransform(scrollY, [0, 350], [1, 0]);
  const scale = useTransform(scrollY, [0, 350], [1, 0.82]);
  const y = useTransform(scrollY, [0, 350], [0, -120]);
  const blur = useTransform(scrollY, [0, 350], [0, 8]);
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section className="max-w-7xl mx-auto px-6 pt-20 pb-20 overflow-hidden">

      <motion.div
        style={{
            opacity,
            scale,
            y,
            filter,
        }}
        className="grid grid-cols-1 xl:grid-cols-[1.05fr_1fr] gap-20 items-center origin-top"
        >

        {/* LEFT */}
        <motion.div
            initial={{ opacity: 0, x: -60, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
        <div>
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-domus-card border border-domus-secondary shadow-sm mb-7">
            <ShieldCheck
              size={16}
              className="text-domus-primary"
            />

            <span className="text-sm font-medium text-domus-text">
              Opiniones verificadas en Bahía Blanca
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] text-domus-primary">
            Propiedades mejor valoradas por{" "}
            <span className="text-domus-terracota">
              la comunidad
            </span>
          </h1>

          <p className="text-xl text-domus-text-soft mt-8 leading-relaxed max-w-2xl">
            Descubrí las propiedades mejor calificadas por quienes
            ya las visitaron. Opiniones reales, decisiones más
            informadas.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-wrap gap-4">

            <Link href="/reviews/availableReviews">
              <button className="bg-domus-primary text-white px-7 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition">
                Dejar una reseña
              </button>
            </Link>

            <Link href="/globalReviews">
              <button className="border border-domus-secondary bg-domus-card px-7 py-4 rounded-2xl font-semibold text-domus-text hover:bg-domus-secondary/40 transition">
                Explorar reseñas
              </button>
            </Link>
          </div>

          {/* FEATURES */}
          <div className="mt-10 bg-domus-card border border-domus-secondary rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-md">

            <div className="flex items-start gap-4">
              <ShieldCheck className="text-domus-primary" />

              <div>
                <h3 className="font-bold text-domus-text">
                  Opiniones verificadas
                </h3>

                <p className="text-sm text-domus-text-soft mt-1">
                  Solo de visitas reales
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Star className="text-domus-terracota fill-domus-terracota" />

              <div>
                <h3 className="font-bold text-domus-text">
                  Mejor valoradas
                </h3>

                <p className="text-sm text-domus-text-soft mt-1">
                  Por nuestra comunidad
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Users className="text-domus-primary" />

              <div>
                <h3 className="font-bold text-domus-text">
                  +{totalReviews} reseñas
                </h3>

                <p className="text-sm text-domus-text-soft mt-1">
                  En Bahía Blanca
                </p>
              </div>
            </div>

          </div>
        </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden xl:flex justify-center items-center"
        >
        <div className="hidden xl:flex justify-center items-center">
          <div className="w-full h-[490px] rounded-[30px] relative overflow-hidden">

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