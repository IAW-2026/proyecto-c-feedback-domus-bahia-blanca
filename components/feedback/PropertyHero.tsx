"use client";

import { BedDouble, Bath, Ruler, CarFront, Building2, } from "lucide-react";
import Link from "next/link";

interface PropertyHeroProps {
  targetId: string;
  imageUrl: string;
  title: string;
  location: string;
  specs: {
    bedrooms: number;
    bathrooms: number;
    meters: number;
    garage: number;
  };
  isMobile?: boolean;
}

export default function PropertyHero({
  targetId,
  imageUrl,
  title,
  location,
  specs,
}: PropertyHeroProps) {
  return (
    <section className="bg-domus-card rounded-3xl overflow-hidden shadow-lg border border-domus-secondary h-fit"
     >
      {/* IMAGEN */}
      <div className="relative w-full h-[420px] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* INFO */}
      <div className="p-6 md:p-8">

        {/* TITULO */}
        <div className="mb-5">
          <h2 className="text-3xl font-bold text-domus-text">
            {title}
          </h2>

          <p className="text-domus-text-soft mt-2 flex items-center gap-2">
            📍 {location}
          </p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center">
            <BedDouble className="w-8 h-8 text-domus-text mb-1" />
            <span className="font-bold text-domus-text">
              {specs.bedrooms}
            </span>
            <span className="text-sm text-domus-text-soft">
              Dormitorios
            </span>
          </div>

          <div className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center">
            <Bath className="w-8 h-8 text-domus-text mb-1" />
            <span className="font-bold text-domus-text">
              {specs.bathrooms}
            </span>
            <span className="text-sm text-domus-text-soft">
              Baños
            </span>
          </div>

          <div className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center">
            <Ruler className="w-8 h-8 text-domus-text mb-1" />
            <span className="font-bold text-domus-text">
              {specs.meters}m²
            </span>
            <span className="text-sm text-domus-text-soft">
              Superficie
            </span>
          </div>

          <div className="bg-domus-bg rounded-2xl p-4 flex flex-col items-center text-center">
            <CarFront className="w-8 h-8 text-domus-text mb-1" />
            <span className="font-bold text-domus-text">
              {specs.garage}
            </span>
            <span className="text-sm text-domus-text-soft">
              Cochera
            </span>
          </div>

        </div>

        {/* BUTTON */}
        <Link href={`/properties/${targetId}`}>
          <button className="w-full bg-domus-secondary hover:bg-domus-primary hover:text-white text-domus-text py-4 rounded-2xl font-semibold transition-all duration-300 flex items-center justify-center gap-x-2">
            <Building2 size={25} className="shrink-0" />
            Ver detalle del inmueble
          </button>
        </Link>
      </div>
    </section>
  );
}