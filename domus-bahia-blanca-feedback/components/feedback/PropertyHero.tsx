"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';

interface PropertyHeroProps {
  imageUrl?: string;
  targetId: string;
}

export default function PropertyHero({ imageUrl, targetId }: PropertyHeroProps) {
  return (
    <section className="relative hidden md:flex h-screen w-full items-center justify-center bg-slate-50 p-6">
      {/* Envolvemos el contenedor en un motion.div */}
      <motion.div 
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.8, 
          ease: [0.22, 1, 0.36, 1], // Un efecto "Cubic Bezier" para un deslizamiento más elegante
          delay: 0.1 // Un retraso mínimo para que no choque con la derecha
        }}
        className="relative h-full w-full overflow-hidden rounded-3xl shadow-2xl border border-slate-200"
      >
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={`Propiedad ${targetId}`}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-slate-200">
            <span className="text-slate-400">Sin imagen</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        
      </motion.div>
    </section>
  );
}