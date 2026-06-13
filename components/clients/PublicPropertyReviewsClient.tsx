"use client";
import { useIsMobile } from "@/hooks/useIsMobile";
import { motion } from "framer-motion";
import { Toaster, toast } from "sonner";
import PropertyHero from "@/components/feedback/PropertyHero";
import ReviewList from "@/components/feedback/ReviewList";
import { useEffect, useMemo, useState } from "react";
import { getReviewsByTarget } from "@/app/actions/reviews";
import { ShieldCheck, Star } from "lucide-react";
import { propertyMocks } from "@/lib/mockProperty";

interface PublicPropertyReviewsClientProps {
  targetId: string;
}

export default function PublicPropertyReviewsClient({
  targetId,
}: PublicPropertyReviewsClientProps) {

  const [reviews, setReviews] = useState<any[]>([]);
  const [expanded, setExpanded] = useState(false);
  const isMobile = useIsMobile();
  useEffect(() => {
    async function loadReviews() {
      const result = await getReviewsByTarget(targetId);

      if (result.success && result.data) {
        setReviews(result.data);
      } else {
        toast.error("No se pudieron cargar las reseñas.");
      }
    }

    if (targetId) loadReviews();
  }, [targetId]);

  const property = propertyMocks[targetId];

  const avgRating = useMemo(() => {
    if (!reviews.length) return 0;

    const total = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );

    return total / reviews.length;
  }, [reviews]);

  const ratingStats = useMemo(() => {
    const total = reviews.length;

    const counts = {
      5: reviews.filter((r) => r.rating === 5).length,
      4: reviews.filter((r) => r.rating === 4).length,
      3: reviews.filter((r) => r.rating === 3).length,
      2: reviews.filter((r) => r.rating === 2).length,
      1: reviews.filter((r) => r.rating === 1).length,
    };

    return { total, counts };
  }, [reviews]);

  if (!property) {
    return (
      <main className="min-h-screen bg-domus-bg flex items-center justify-center">
        <p className="text-domus-text-soft">
          Propiedad no encontrada.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-domus-bg px-4 md:px-8 py-8">
      <Toaster position="top-right" richColors />

      <div className="max-w-7xl mx-auto">

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.35fr] gap-8 items-start">

          {/* LEFT */}
          <PropertyHero
            targetId={targetId}
            imageUrl={property.imageUrl}
            title={property.title}
            location={property.location}
            specs={property.specs}
            isMobile={isMobile} 
          />

          {/* RIGHT */}
          <motion.section
            initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: isMobile ? 0 : 0.6 }}
            className="bg-domus-card rounded-3xl border border-domus-secondary shadow-lg p-8 flex flex-col"
          >

            {/* HEADER */}
            <div className="mb-8">
              <h2 className="text-4xl font-bold text-domus-text">
                Opiniones de la propiedad
              </h2>

              <p className="text-domus-text-soft mt-2 text-lg">
                Experiencias verificadas de compradores y visitantes.
              </p>
            </div>

            {/* SUMMARY */}
            <div className="rounded-3xl border border-domus-secondary bg-white p-6 mb-8">

              <div className="grid md:grid-cols-[260px_1fr] gap-8">

                {/* SCORE */}
                <div className="flex flex-col justify-center">
                  <p className="font-semibold text-domus-text mb-3">
                    Calificación promedio
                  </p>

                  <h3 className="text-6xl font-bold text-domus-text">
                    {avgRating.toFixed(1)}
                  </h3>

                  <div className="flex gap-2 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={28}
                        className={
                          i < Math.round(avgRating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-domus-secondary"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-domus-text-soft mt-3">
                    Basado en {reviews.length} reseñas
                  </p>
                </div>

                {/* DISTRIBUCIÓN */}
                <div className="flex flex-col justify-center gap-4">

                  {[5,4,3,2,1].map((n) => {

                    const count =
                      ratingStats.counts[
                        n as keyof typeof ratingStats.counts
                      ];

                    const percentage =
                      ratingStats.total > 0
                        ? (count / ratingStats.total) * 100
                        : 0;

                    return (
                      <div
                        key={n}
                        className="flex items-center gap-3"
                      >
                        <span className="w-5 text-sm font-semibold text-domus-text">
                          {n}
                        </span>

                        <Star
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />

                        <div className="flex-1 h-3 rounded-full bg-domus-secondary overflow-hidden">
                          <div
                            className="h-full bg-domus-primary rounded-full transition-all duration-700"
                            style={{
                              width: `${percentage}%`,
                            }}
                          />
                        </div>

                        <span className="w-10 text-sm text-domus-text-soft text-right">
                          ({count})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* REVIEWS */}
            <div
              className={`flex flex-col gap-4 overflow-y-auto pr-2 transition-all duration-500 ${
                expanded
                  ? "max-h-[600px]"
                  : "max-h-[250px]"
              }`}
            >
              <ReviewList
                reviews={reviews}
                isSeller={false}
              />
            </div>

            {/* EXPAND */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={() =>
                  setExpanded((prev) => !prev)
                }
                className="px-60 py-2 rounded-2xl border border-domus-secondary bg-white hover:bg-domus-secondary transition font-semibold text-domus-primary"
              >
                {expanded
                  ? "Contraer lista"
                  : "Expandir lista"}
              </button>
            </div>

            {/* FOOTER */}
            <div className="mt-8 rounded-2xl bg-domus-secondary/30 border border-domus-secondary px-5 py-4 flex items-center gap-3 text-sm text-domus-text-soft">
              <ShieldCheck
                size={18}
                className="text-domus-primary"
              />

              <p>
                Todas las reseñas pertenecen a visitas
                verificadas y se muestran con fines
                informativos.
              </p>
            </div>

          </motion.section>
        </div>
      </div>
    </main>
  );
}