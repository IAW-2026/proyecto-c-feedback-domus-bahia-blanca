"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Trash2, Star, Search as SearchIcon } from "lucide-react";
import { deleteReview } from "@/app/actions/reviews";
import { useRouter } from "next/navigation";

interface ReviewRow {
  id: string;
  authorName: string | null;
  targetId: string;
  propertyTitle: string;
  rating: number;
  content: string;
  createdAt: Date;
}

interface AdminDashboardClientProps {
  reviews: ReviewRow[];
}

export default function AdminDashboardClient({ reviews }: AdminDashboardClientProps) {
  const [list, setList] = useState(reviews);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const filtered = list.filter(
  (r) =>
    r.propertyTitle.toLowerCase().includes(search.toLowerCase()) ||
    r.content.toLowerCase().includes(search.toLowerCase()) ||
    (r.authorName ?? "").toLowerCase().includes(search.toLowerCase())
);

  async function handleDelete(reviewId: string) {
    setLoading(true);
    const result = await deleteReview(reviewId);

    if (result.success) {
      toast.success("Reseña eliminada.");
      setList((prev) => prev.filter((r) => r.id !== reviewId));
    } else {
      toast.error("Error al eliminar la reseña.");
    }

    setConfirmId(null);
    setLoading(false);
  }

  return (
    <section>
        <h2 className="text-3xl font-bold text-domus-primary mb-6">
          Todas las reseñas
        </h2>


      {/* BUSCADOR */}
      <div className="relative mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por propiedad, comentario o autor..."
          className="w-full px-5 py-3 rounded-2xl border border-domus-secondary bg-white text-domus-text placeholder:text-domus-text-soft focus:outline-none focus:ring-2 focus:ring-domus-primary/30"
        />
      </div>

      {/* TABLA */}
      <div className="bg-domus-card border border-domus-secondary rounded-3xl shadow-sm overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-domus-secondary">
              <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Autor</th>
              <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Propiedad</th>
              <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Rating</th>
              <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Comentario</th>
              <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((review) => (
              <tr key={review.id} className="border-b border-domus-secondary/50 hover:bg-domus-secondary/20 transition">
                <td className="px-6 py-4 font-semibold text-domus-text whitespace-nowrap">
                  {review.authorName || "Anónimo"}
                </td>
                <td className="px-6 py-4 text-domus-text-soft whitespace-nowrap">
                  {review.propertyTitle}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-domus-text">{review.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-domus-text max-w-xs truncate">
                  {review.content}
                </td>
                <td className="px-6 py-4">
                  {confirmId === review.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(review.id)}
                        disabled={loading}
                        className="px-3 py-1.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition disabled:opacity-50"
                      >
                        {loading ? "..." : "Confirmar"}
                      </button>
                      <button
                        onClick={() => setConfirmId(null)}
                        className="px-3 py-1.5 rounded-xl border border-domus-secondary text-sm text-domus-text-soft hover:bg-domus-secondary/30 transition"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setConfirmId(review.id)}
                      className="p-2 rounded-xl border border-domus-secondary hover:bg-red-50 hover:border-red-300 hover:text-red-500 text-domus-text-soft transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {list.length === 0 && (
          <p className="text-center text-domus-text-soft py-12">
            No hay reseñas para mostrar.
          </p>
        )}
      </div>
    </section>
  );
}