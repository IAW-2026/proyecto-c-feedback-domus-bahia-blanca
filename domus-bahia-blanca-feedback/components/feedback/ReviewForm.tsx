"use client"; // Importante: es un componente de cliente para manejar el estado

import { useState } from "react";
import { createReview } from "@/app/actions/reviews"; // Importamos la acción que creamos
import StarRating from "./StarRating"; // Tu componente de estrellas

export default function ReviewForm() {
  const [isPending, setIsPending] = useState(false);
  const [rating, setRating] = useState(0); // Para capturar el valor de StarRating

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsPending(true);

    const formData = new FormData(event.currentTarget);
    const content = formData.get("content") as string;

    // Ejecutamos la acción del servidor
    const result = await createReview({
      authorId: "user_test_1", // ID temporal hasta que pongamos Clerk
      targetId: "propiedad_1", // ID temporal
      visitId: crypto.randomUUID(), // Generamos uno único para que no falle por el @unique
      rating: rating,
      content: content,
    });

    setIsPending(false);

    if (result.success) {
      alert("¡Reseña guardada!");
      setRating(0);
      (event.target as HTMLFormElement).reset();
    } else {
      alert("Error: " + result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Tu componente de estrellas debe actualizar el estado 'rating' */}
      <StarRating rating={rating} setRating={setRating} />
      
      <textarea 
        name="content" 
        className="border p-2 rounded" 
        placeholder="Cuéntanos tu experiencia..."
        required
      />

      <button 
        type="submit" 
        disabled={isPending || rating === 0}
        className="bg-blue-600 text-white p-2 rounded disabled:bg-gray-400"
      >
        {isPending ? "Enviando..." : "Enviar Comentario"}
      </button>
    </form>
  );
}