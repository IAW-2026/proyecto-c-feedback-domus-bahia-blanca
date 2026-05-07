"use client"; // Necesario porque usaremos animaciones y estados

import { motion } from "framer-motion";
import PropertyHero from "@/components/feedback/PropertyHero";
import { useState } from "react";

export default function FeedbackPage({ params }: { params: { targetId: string } }) {
  const [rating, setRating] = useState(0);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 min-h-screen bg-white">
      {/* 1. LADO IZQUIERDO: Visual */}
      <PropertyHero 
      targetId={params.targetId} 
      imageUrl="/prueba-1.jpg"
      />
      {/* 2. LADO DERECHO: Animado */}
      <motion.section 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 md:p-16 flex flex-col gap-8"
      >
        <header>
          <h1 className="text-4xl font-bold text-slate-900">Cuéntanos tu experiencia</h1>
          <p className="text-slate-500 mt-2">Tu reseña sobre el inmueble {params.targetId} ayuda a la comunidad.</p>
        </header>

        {/* Aquí irá tu componente de Estrellas y el Formulario */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 shadow-sm">
          <h3 className="font-semibold mb-4 text-slate-800">Calificación</h3>
          {/* TODO: Componente StarRating aquí */}
          
          <textarea 
            className="w-full mt-4 p-4 rounded-xl border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none min-h-[150px] text-black font-bold"
            placeholder="Escribe tu comentario aquí..."
          />
          
          <button className="w-full mt-6 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transition-all">
            Publicar Reseña
          </button>
        </div>

        {/* 3. LISTADO DE RESEÑAS VIEJAS (Hardcodeadas por ahora) */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4 text-black">Comentarios recientes</h2>
          <div className="space-y-4 opacity-50 bg-black font-bold">
             {/* Mock de comentarios */}
             <div className="border-b pb-4">"Excelente atención..." - 5 ⭐</div>
          </div>
        </div>
      </motion.section>
    </main>
  );
}