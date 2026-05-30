"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

export default function SectionTitle() {
  return (
    <motion.div
      className="flex items-center justify-between"
      initial={{ opacity: 0, y: 60, filter: "blur(12px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full border-2 border-domus-terracota flex items-center justify-center">
          <Star
            className="text-domus-terracota fill-domus-terracota"
            size={22}
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
        className="group hidden md:flex items-center text-domus-terracota font-semibold gap-1 transition-colors duration-300"
      >
        Ver todas
        <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">
          →
        </span>
      </Link>
    </motion.div>
  );
}