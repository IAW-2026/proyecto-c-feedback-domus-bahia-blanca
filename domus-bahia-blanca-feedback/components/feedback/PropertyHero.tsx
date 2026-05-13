"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface PropertyHeroProps {
  targetId: string;
  imageUrl: string;
}

export default function PropertyHero({
  targetId,
  imageUrl,
}: PropertyHeroProps) {
  return (
    <motion.section
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="bg-domus-card rounded-3xl overflow-hidden shadow-lg border border-domus-secondary h-fit"
    >
      {/* IMAGEN */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <Image
          src={imageUrl}
          alt="Propiedad"
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
          priority
        />

        {/* Overlay elegante */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* INFO */}
      <div className="p-6 md:p-8">
        
        {/* TITULO */}
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-domus-text">
            Torre Plaza
          </h2>

          <p className="text-domus-text-soft mt-2 flex items-center gap-2">
            📍 Bahía Blanca, Buenos Aires
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          
          <div
            className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center"
          >
            <Image
              src="/habitaciones.jpg"
              alt="Dormitorios"
              width={32}
              height={32}
              style={{ width: "50%", height: "auto" }}
              className="mb-1"
            />
            <span className="font-bold text-domus-text">3</span>

            <span className="text-sm text-domus-text-soft">
              Dormitorios
            </span>
          </div>

          <div
            className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center"
          >
            <Image
              src="/baños.jpg"
              alt="Dormitorios"
              width={32}
              height={32}
              style={{ width: "50%", height: "auto" }}
              className="mb-1"
            />

            <span className="font-bold text-domus-text">2</span>

            <span className="text-sm text-domus-text-soft">
              Baños
            </span>
          </div>

          <div
            className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center"
          >
            <Image
              src="/superficie.jpg"
              alt="Dormitorios"
              width={24}
              height={24}
              style={{ width: "40%", height: "auto" }}
              className="mb-1"
            />

            <span className="font-bold text-domus-text">120m²</span>

            <span className="text-sm text-domus-text-soft">
              Superficie
            </span>
          </div>

          <div
            className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center"
          >
            <Image
              src="/cochera.jpg"
              alt="Dormitorios"
              width={32}
              height={32}
              style={{ width: "50%", height: "auto" }}
              className="mb-1"
            />

            <span className="font-bold text-domus-text">1</span>

            <span className="text-sm text-domus-text-soft">
              Cochera
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          className="w-full bg-domus-secondary hover:bg-domus-primary hover:text-white text-domus-text py-4 rounded-2xl font-semibold transition-all duration-300"
        >
          Ver detalle del inmueble
        </button>
      </div>
    </motion.section>
  );
}