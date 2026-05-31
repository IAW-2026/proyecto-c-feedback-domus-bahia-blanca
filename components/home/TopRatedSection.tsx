"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import PropertiesGrid, {
  PropertyItem,
} from "@/components/properties/PropertiesGrid";

interface TopRatedSectionProps {
  properties: PropertyItem[];
  basePath: string;
}

export default function TopRatedSection({
  properties,
  basePath
}: TopRatedSectionProps) {
  return (
    <section
      id="top-properties"
      className="max-w-7xl mx-auto px-6 pb-5 scroll-mt-28"
    >
      {/* TITLE */}
      <motion.div
        className="flex items-center justify-between mb-6"
        initial={{ opacity: 0, y: 70, filter: "blur(12px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{
          duration: 1.5,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full border-2 border-domus-terracota flex items-center justify-center">
            <Star
              className="text-domus-terracota fill-domus-terracota"
              size={16}
            />
          </div>

          <div>
            <h2 className="text-4xl font-bold text-domus-primary">
              Mejor calificadas
            </h2>

            <p className="text-domus-text-soft mt-1">
              Basado en experiencias reales de compradores.
            </p>
          </div>
        </div>

        <Link
          href="/globalReviews"
          className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-domus-terracota text-white border border-domus-terracota shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
        >
          Ver todas

          <span className="group-hover:translate-x-1 transition-transform duration-300">
            →
          </span>
        </Link>
      </motion.div>

      {/* GRID */}
      <PropertiesGrid properties={properties} basePath={basePath}/>
    </section>
  );
}