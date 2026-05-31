"use client";

import { useState } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";
import { createReviewResponse } from "@/app/actions/reviews";

interface ReviewResponse {
  id: string;
  content: string;
  createdAt: Date;
}

interface ReviewProps {
  id: string;
  authorId: string;
  authorName?: string | null;
  authorImageUrl?: string | null;
  rating: number;
  content: string;
  createdAt: Date;
  response?: ReviewResponse | null;
}

interface ReviewListProps {
  reviews: ReviewProps[];
  isSeller?: boolean;
}

//el isSeller = false es por si no le llega parametro, toma ese valor por defecto... desde el cliente de seller se pisa ese valor con isSeller = true.
export default function ReviewList({ reviews, isSeller = false }: ReviewListProps) { 
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [localResponses, setLocalResponses] = useState<Record<string, string>>({});

  async function handleSubmitReply(reviewId: string) {
    if (!replyContent.trim()) return;
    setLoading(true);

    const result = await createReviewResponse(reviewId, replyContent);

    if (result.success) {
      toast.success("Respuesta publicada.");
      setLocalResponses((prev) => ({ ...prev, [reviewId]: replyContent }));
      setReplyingTo(null);
      setReplyContent("");
    } else {
      toast.error(result.error || "Error al publicar la respuesta.");
    }

    setLoading(false);
  }

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => {
        const existingResponse = localResponses[review.id] || review.response?.content;

        return (
          <article
            key={review.id}
            className="bg-white border border-domus-secondary rounded-2xl p-5 transition-all hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-5">

              {/* AVATAR */}
              {review.authorImageUrl ? (
                <img
                  src={review.authorImageUrl}
                  alt={review.authorName || "Avatar"}
                  className="w-14 h-14 rounded-full object-cover shrink-0 border border-domus-secondary"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-domus-primary text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {(review.authorName || review.authorId).charAt(0).toUpperCase()}
                </div>
              )}

              <div className="flex-1">

                {/* HEADER */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-domus-text text-lg">
                        {review.authorName || `Usuario ${review.authorId.substring(0, 5)}`}
                      </h3>
                      <span className="text-xs bg-domus-primary-soft/30 text-domus-primary px-2 py-1 rounded-full font-medium">
                        Verificada
                      </span>
                    </div>
                    <p className="text-sm text-domus-text-soft">
                      {new Date(review.createdAt).toLocaleDateString("es-AR", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {/* ESTRELLAS */}
                  <div className="flex items-center gap-1 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={star <= review.rating ? "text-domus-terracota" : "text-domus-secondary"}
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm font-semibold text-domus-text">
                      {review.rating}/5
                    </span>
                  </div>
                </div>

                {/* CONTENIDO */}
                <p className="mt-4 text-domus-text leading-relaxed">
                  {review.content}
                </p>

                {/* RESPUESTA EXISTENTE */}
                {existingResponse && (
                  <div className="mt-4 ml-2 pl-4 border-l-2 border-domus-primary bg-domus-secondary/20 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={15} className="text-domus-primary" />
                      <span className="text-sm font-semibold text-domus-primary">
                        Respuesta de la inmobiliaria
                      </span>
                    </div>
                    <p className="text-sm text-domus-text leading-relaxed">
                      {existingResponse}
                    </p>
                  </div>
                )}

                {/* BOTÓN RESPONDER — solo seller, solo si no hay respuesta */}

                {isSeller && !existingResponse && (
                  <div className="mt-4">
                    {replyingTo === review.id ? (
                      <div className="flex flex-col gap-3">
                        <textarea
                          value={replyContent}
                          onChange={(e) => setReplyContent(e.target.value)}
                          placeholder="Escribí tu respuesta..."
                          rows={3}
                          className="w-full border border-domus-secondary rounded-xl p-3 text-sm text-domus-text resize-none focus:outline-none focus:ring-2 focus:ring-domus-primary/30"
                        />
                        <div className="flex gap-3">
                          <button
                            onClick={() => { setReplyingTo(null); setReplyContent(""); }}
                            className="px-4 py-2 rounded-xl border border-domus-secondary text-sm text-domus-text-soft hover:bg-domus-secondary/20 transition"
                          >
                            Cancelar
                          </button>
                          <button
                            onClick={() => handleSubmitReply(review.id)}
                            disabled={loading || !replyContent.trim()}
                            className="px-4 py-2 rounded-xl bg-domus-primary text-white text-sm font-semibold hover:bg-domus-primary-mid transition disabled:opacity-50"
                          >
                            {loading ? "Publicando..." : "Publicar respuesta"}
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => { setReplyingTo(review.id); setReplyContent(""); }}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl bg-domus-card border border-domus-secondary text-sm font-semibold text-domus-primary hover:bg-domus-secondary/100 transition"
                      >
                        <ShieldCheck size={14} />
                        Responder
                      </button>
                    )}
                  </div>
                )}

              </div>
            </div>
          </article>
        );
      })}

      {reviews.length === 0 && (
        <p className="text-center text-domus-text-soft py-6">
          No hay reseñas para esta propiedad aún. ¡Sé el primero!
        </p>
      )}
    </div>
  );
}