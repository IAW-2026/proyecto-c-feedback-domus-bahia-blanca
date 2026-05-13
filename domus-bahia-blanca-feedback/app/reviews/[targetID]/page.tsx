"use client";

import { motion } from "framer-motion";
import PropertyHero from "@/components/feedback/PropertyHero";
import ReviewList from "@/components/feedback/ReviewList";
import { useState } from "react";
import { createReview } from "@/app/actions/reviews"; 
import { use } from "react";

export default function FeedbackPage({
  params,
}: {
  params: Promise<{ targetId: string }>;
}) {
  const { targetId } = use(params);
  // --- ESTADOS ---
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);

  // --- LÓGICA DE ENVÍO ---
  const handlePublish = async () => {
    if (rating === 0) {
      alert("Por favor, selecciona una puntuación con las estrellas.");
      return;
    }
    if (!content.trim()) {
      alert("El comentario no puede estar vacío.");
      return;
    }

    setIsPending(true);

    try {
        const result = await createReview({
          authorId: "user_anonimo_1",
          targetId: targetId, 
          visitId: crypto.randomUUID(),
          rating: rating,
          content: content,
        });

      if (result.success) {
        alert("¡Reseña publicada con éxito");
        setRating(0);
        setContent("");
      } else {
        alert("Error al guardar: " + result.error);
      }
    } catch (error) {
      alert("Error crítico de conexión.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="min-h-screen bg-domus-bg px-4 md:px-8 py-8">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        
        {/* HERO + FORM */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-8 items-start">
          
          <PropertyHero
            targetId={targetId}
            imageUrl="/prueba-1.jpg"
          />

          <motion.section
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="bg-domus-card rounded-3xl shadow-lg border border-domus-secondary p-8 md:p-10 flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-domus-text mb-2">
                ¿Qué te pareció la visita?
              </h2>
              <p className="text-domus-text-soft">
                Tu opinión ayuda a otros compradores y mejora la experiencia para todos.
              </p>
            </div>

            {/* ESTRELLAS INTERACTIVAS */}
            <div className="mb-10">
              <div className="flex items-center gap-6 justify-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-5xl transition-all duration-200 hover:scale-110 ${
                      star <= rating ? "text-domus-terracota" : "text-domus-secondary"
                    }`}
                  >
                    ★
                  </button>
                ))}
              </div>
              <div className="flex justify-between mt-3 px-1 text-sm text-domus-text-soft">
                <span>Muy mala</span>
                <span>Excelente</span>
              </div>
            </div>

            {/* ÁREA DE TEXTO */}
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-domus-text text-lg">
                Dejá tu reseña
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[200px] rounded-2xl border border-domus-secondary bg-white p-5 text-domus-text text-lg placeholder:text-domus-text-soft resize-none focus:outline-none focus:ring-2 focus:ring-domus-primary-soft transition"
                placeholder="Contanos tu experiencia durante la visita..."
              />

              <div className="flex items-center gap-3 border border-domus-secondary bg-domus-secondary/40 rounded-2xl px-4 py-3 text-sm text-domus-text-soft">
                <span className="text-lg font-bold">!</span>
                <p>Dejá tu reseña con respeto. Las reseñas genuinas generan confianza.</p>
              </div>
            </div>

            {/* BOTÓN DE PUBLICAR */}
            <button
              onClick={handlePublish}
              disabled={isPending}
              className={`mt-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 shadow-md active:scale-95 ${
                isPending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-domus-primary hover:bg-domus-primary-mid text-white hover:shadow-xl"
              }`}
            >
              {isPending ? "Publicando..." : "Publicar reseña"}
            </button>
          </motion.section>
        </div>

        {/* LISTADO (HISTORIAL) */}
        <motion.section
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            className="bg-domus-card rounded-3xl border border-domus-secondary shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-domus-text">Reseñas históricas</h2>
              <p className="text-domus-text-soft mt-1">Opiniones verificadas.</p>
            </div>
          </div>
          <ReviewList />
        </motion.section>

        <footer className="text-center text-domus-text-soft text-sm pb-4">
          © 2026 Domus Bahía Blanca — Sistema de Feedback
        </footer>
      </div>
    </main>
  );
}