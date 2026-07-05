"use client";

import { CheckCircle2 , ArrowLeft } from "lucide-react";

export default function AlreadyReviewedPage() {
  return (
    <main className="min-h-screen bg-domus-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full bg-domus-card border border-domus-secondary rounded-3xl p-10 shadow-xl flex flex-col items-center">

        <div className="w-20 h-20 rounded-full bg-domus-primary/10 flex items-center justify-center text-domus-primary mb-6">
          <CheckCircle2 size={40} />
        </div>

        <h1 className="text-3xl font-bold text-domus-primary">
          ¡Ya dejaste una reseña aquí!
        </h1>

        <p className="text-domus-text-soft mt-4 leading-relaxed">
          Cada visita o compra solo permite una reseña por propiedad. Gracias por compartir tu experiencia con la comunidad.
        </p>

        <button
          onClick={() => window.history.go(-2)} //Esto es lo único que no verifica si se mantiene en la app el retroceder 2 páginas :) firma tomás.
          className="mt-8 group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-domus-terracota text-white border border-domus-terracota shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300 font-semibold"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
          Volver
        </button>

      </div>
    </main>
  );
}