"use client";

import { ShieldCheck, Star, Users, Heart } from "lucide-react";
import { motion } from "framer-motion";

export default function HomeFooter() {
  const values = [
    {
      icon: ShieldCheck,
      title: "Transparencia",
      text: "Opiniones reales y verificadas",
      color: "text-domus-primary",
    },
    {
      icon: Star,
      title: "Confianza",
      text: "Construimos comunidad",
      color: "text-domus-terracota",
    },
    {
      icon: Users,
      title: "Experiencia",
      text: "Tu opinión ayuda a otros",
      color: "text-domus-primary",
    },
    {
      icon: Heart,
      title: "Compromiso",
      text: "Mejoramos cada día",
      color: "text-domus-primary",
    },
  ];

  return (
    <footer className="max-w-7xl mx-auto px-6 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7 }}
        className="bg-domus-card rounded-3xl border border-domus-secondary shadow-lg grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 p-6"
      >
        {values.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl p-4 flex items-start gap-4 hover:bg-domus-secondary/25 transition"
            >
              <Icon className={`${item.color} shrink-0`} />

              <div>
                <h4 className="font-bold text-domus-text">
                  {item.title}
                </h4>

                <p className="text-sm text-domus-text-soft mt-1">
                  {item.text}
                </p>
              </div>
            </div>
          );
        })}
      </motion.div>
    </footer>
  );
}