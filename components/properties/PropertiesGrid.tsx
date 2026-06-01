"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import Link from "next/link";
import { motion } from "framer-motion";
import {Star, Heart, MapPin, BedDouble, Bath, Ruler, CarFront} from "lucide-react";

export interface PropertyItem {
  id: string;
  imageUrl: string;
  avgRating: number;
  address: string;
  reviewCount: number;
  specs: {
    bedrooms: number;
    bathrooms: number;
    meters: number;
    garage: number;
  };
}

interface PropertiesGridProps {
  properties: PropertyItem[];
  basePath?: string;
}

export default function PropertiesGrid({
  properties,
  basePath = "/properties",
}: PropertiesGridProps) {

  const isMobile = useIsMobile();

  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-24 bg-domus-card rounded-3xl border-2 border-dashed border-domus-secondary">
        <h3 className="text-3xl font-bold text-domus-text">
          Todavía no hay reseñas suficientes
        </h3>

        <p className="text-domus-text-soft mt-4 text-lg">
          Sé una de las primeras personas en dejar una opinión.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.15 }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: isMobile ? 0 : 0.18,
          },
        },
      }}
    >
      {properties.map((item) => (
        <motion.div
          key={item.id}
          variants={{
            hidden: {
              opacity: isMobile ? 1 : 0,
              y: isMobile ? 0 : 30,
              scale: isMobile ? 1 : 0.97,
              filter: isMobile ? "blur(0px)" : "blur(4px)",
            },
            show: {
              opacity: 1,
              y: 0,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                duration: isMobile ? 0 : 0.7,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
         >
          <Link
            href={`${basePath}/${item.id}`}
            className="group block bg-domus-card rounded-3xl overflow-hidden border border-domus-secondary shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
           >

            {/* IMAGE */}
            <div className="relative h-56 overflow-hidden">
              <img
                src={item.imageUrl}
                alt={`Foto de ${item.address}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              {/* RATING */}
              <div className="absolute top-4 left-4 bg-domus-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
                <Star size={16} className="fill-white" />
                {item.avgRating.toFixed(1)}
              </div>

              {/* FAVORITE */}
              <button
                  aria-label="Añadir a favoritos"
                  className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md"
                >
                <Heart size={20} className="text-domus-text" />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-5">
              <h3 className="text-xl font-bold text-domus-text group-hover:text-domus-primary transition-colors">
                {item.address}
              </h3>

              <p className="text-domus-text-soft mt-2 flex items-center gap-2">
                <MapPin size={16} />
                Bahía Blanca, Buenos Aires
              </p>

              {/* SPECS */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                <div className="text-center">
                  <BedDouble size={18} className="mx-auto text-domus-text-soft" />
                  <p className="font-bold text-domus-text mt-2">
                    {item.specs.bedrooms}
                  </p>
                  <p className="text-xs text-domus-text-soft">Dorm.</p>
                </div>

                <div className="text-center">
                  <Bath size={18} className="mx-auto text-domus-text-soft" />
                  <p className="font-bold text-domus-text mt-2">
                    {item.specs.bathrooms}
                  </p>
                  <p className="text-xs text-domus-text-soft">Baños</p>
                </div>

                <div className="text-center">
                  <Ruler size={18} className="mx-auto text-domus-text-soft" />
                  <p className="font-bold text-domus-text mt-2">
                    {item.specs.meters}
                  </p>
                  <p className="text-xs text-domus-text-soft">m²</p>
                </div>

                <div className="text-center">
                  <CarFront size={18} className="mx-auto text-domus-text-soft" />
                  <p className="font-bold text-domus-text mt-2">
                    {item.specs.garage}
                  </p>
                  <p className="text-xs text-domus-text-soft">Coch.</p>
                </div>
              </div>

              {/* FOOTER */}
              <div className="mt-4 pt-4 border-t border-domus-secondary flex items-center justify-between">
                <p className="text-sm text-domus-text-soft">
                  {item.reviewCount} opiniones
                </p>

                <div className="text-domus-primary font-semibold flex items-center gap-2">
                  Ver detalle
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </div>
            </div>

          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}