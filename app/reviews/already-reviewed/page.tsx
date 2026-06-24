import Link from "next/link";
import { CheckCircle2, ArrowLeft } from "lucide-react";

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

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-domus-primary text-white px-6 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md font-semibold cursor-pointer"
        >
          <ArrowLeft size={18} />
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}