"use client";

import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import PropertyHero from "@/components/feedback/PropertyHero";
import ReviewList from "@/components/feedback/ReviewList";
import StarRating from "@/components/feedback/StarRating";
import { useState, useEffect } from "react";
import { createReview, getReviewsByTarget } from "@/app/actions/reviews"; 
import { Send } from "lucide-react"; 
import { useUser } from "@clerk/nextjs";
import { propertyMocks } from "@/lib/mockProperty";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FeedbackClientProps {
  targetId: string;
}

export default function FeedbackClient({ targetId }: FeedbackClientProps) {
  const { user } = useUser();
  const router = useRouter();
  const isMobile = useIsMobile();
  const forbiddenWords = [
    "mierda",
    "pelotudo",
    "gil",
    "hijo de puta",
    "pajero",
    "pelotudes",
    "pelotudez",
    "verga",
    "basura"
   ];
   const [alternateWarning, setAlternateWarning] = useState(false);

  // --- ESTADOS ---
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [reviews, setReviews] = useState<any[]>([]); 

  // --- EFECTO: Cargar reseñas de la DB al montar el componente ---
  useEffect(() => {
    async function loadReviews() {
      const result = await getReviewsByTarget(targetId);
      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        toast.error("No se pudieron cargar las reseñas históricas.");
      }
    }
    if (targetId) loadReviews();
  }, [targetId]);

  // --- LÓGICA DE ENVÍO ---
  const handlePublish = async () => {
    if (rating === 0) {
      toast.error("Por favor, selecciona una puntuación con las estrellas.");
      return;
    }
    if (!content.trim()) {
      toast.error("El comentario no puede estar vacío.");
      return;
    }
    if (!user) {
      toast.error("Debes iniciar sesión para publicar.");
      return;
    }
    
    function normalize(text: string) {
      return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/1/g, "i")
        .replace(/3/g, "e")
        .replace(/4/g, "a")
        .replace(/5/g, "s")
        .replace(/8/g, "b")
        .replace(/0/g, "o")
        .replace(/\s+/g, "")
        .trim();
    }

    const normalizedContent = normalize(content);

    const containsForbiddenWord = forbiddenWords.some((word) =>
      normalizedContent.includes(normalize(word))
    );
    
    if (containsForbiddenWord) {
      toast.error(
        alternateWarning
          ? 'Intenta con "No me gustó" y listo...'
          : "Tu reseña contiene palabras inapropiadas. Por favor revísala antes de publicar."
      );

      setAlternateWarning(prev => !prev);
      return;
    }
    
    setIsPending(true);

    try {
      const result = await createReview({
        authorId: user.id, 
        authorName: user.fullName || (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : 'Usuario Anónimo'),
        authorImageUrl: user.imageUrl,
        targetId: targetId, 
        visitId: crypto.randomUUID(),
        rating: rating,
        content: content,
      });

      if (result.success) {
        toast.success("¡Reseña publicada con éxito!");
        setTimeout(() => {
          router.push("/");
          router.refresh();
        }, 1500); // espera 1.5s para que el usuario vea el toast antes de redirigir
      } else {
        toast.error("Error al guardar: " + result.error);
      }
    } catch (error) {
      toast.error("Error crítico de conexión.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  const property = propertyMocks[targetId];

  return (
    <main className="min-h-screen bg-domus-bg px-4 md:px-8 py-8">
      <Toaster position="top-right" richColors />

      <div className="max-w-7xl mx-auto flex flex-col gap-8">

        <div className="mb-2">
          <Link
            href="/globalReviews"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-domus-terracota text-white border border-domus-terracota shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Volver
          </Link>
        </div>

        {/* HERO + FORM */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.2fr] gap-8 items-start">
          
          <PropertyHero
            targetId={targetId}
            imageUrl={property.imageUrl}
            title={property.title}
            location={property.location}
            specs={property.specs}
            isMobile={isMobile} 
          />

          <section className="bg-domus-card rounded-3xl shadow-lg border border-domus-secondary p-8 md:p-10 flex flex-col"
          >
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-domus-text mb-2">
                ¿Qué te pareció la visita?
              </h2>
              <p className="text-domus-text-soft">
                Tu opinión ayuda a otros compradores y mejora la experiencia para todos.
              </p>
            </div>

            <div className="mb-10 flex flex-col">
              <label className="block text-center font-semibold text-domus-text text-lg mb-4">
                ¡Puntuá tu experiencia!
              </label>
              <div className="bg-white border border-domus-secondary rounded-2xl p-4 shadow-sm w-full max-w-2xl mx-auto">
                <StarRating rating={rating} setRating={setRating} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <label className="font-semibold text-domus-text text-lg">
                Dejá tu reseña:
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

            <button
              onClick={handlePublish}
              disabled={isPending}
              className={`mt-8 py-4 rounded-2xl text-lg font-bold transition-all duration-200 shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                isPending 
                  ? "bg-gray-400 cursor-not-allowed" 
                  : "bg-domus-primary hover:bg-domus-primary-mid text-white hover:shadow-xl"
              }`}
            >
              {!isPending && <Send size={20} />}
              {isPending ? "Publicando..." : "Publicar reseña"}
            </button>
          </section>
        </div>

        {/* LISTADO (HISTORIAL) */}
        <motion.section
          initial={{ y: isMobile ? 0 : 40, opacity: isMobile ? 1 : 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: isMobile ? 0 : 0.7, ease: "easeOut", delay: isMobile ? 0 : 0.2 }}
          className="bg-domus-card rounded-3xl border border-domus-secondary shadow-lg p-6 md:p-8"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-domus-text">Reseñas históricas</h2>
              <p className="text-domus-text-soft mt-1">Opiniones verificadas.</p>
            </div>
          </div>
          
          <div className="max-h-[600px] overflow-y-auto pr-2">
            <ReviewList reviews={reviews} />
          </div>
          
        </motion.section>

        <footer className="text-center text-domus-text-soft text-sm pb-4">
          © 2026 Domus Bahía Blanca — Sistema de Feedback
        </footer>
      </div>
    </main>
  );
}