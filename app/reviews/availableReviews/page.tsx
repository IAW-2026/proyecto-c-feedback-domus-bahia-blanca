import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ClipboardX, ArrowLeft } from "lucide-react";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import { getPropertiesAvailableToReview } from "@/app/actions/reviews";
import { propertyMocks } from "@/lib/mockProperty";

export default async function NewReviewSelectionPage() {
  // 1. Validar autenticación en el servidor
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  // 2. Obtener las propiedades habilitadas para este usuario específico
  const properties = await getPropertiesAvailableToReview(userId);

  // ESTADO 1: El usuario no tiene ninguna propiedad disponible para reseñar (0)
  if (!properties || properties.length === 0) {
    return (
      <main className="min-h-screen bg-domus-bg flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-md w-full bg-domus-card border border-domus-secondary rounded-3xl p-10 shadow-xl flex flex-col items-center">
          
          {/* ICONO */}
          <div className="w-20 h-20 rounded-full bg-domus-terracota/10 flex items-center justify-center text-domus-terracota mb-6">
            <ClipboardX size={40} />
          </div>

          {/* TEXTOS */}
          <h1 className="text-3xl font-bold text-domus-primary">
            No tenés reseñas disponibles
          </h1>
          
          <p className="text-domus-text-soft mt-4 leading-relaxed">
            Actualmente no registrás visitas o compras marcadas como "completadas" en el sistema. Las propiedades aparecerán acá automáticamente cuando se valide tu operación.
          </p>

          {/* ACCIÓN */}
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

  // ESTADO 2: El usuario tiene 1 o más propiedades disponibles para reseñar
  return (
    <main className="min-h-screen bg-domus-bg px-6 py-14">
      <section className="max-w-7xl mx-auto">
        
        {/* ENCABEZADO DE LA SECCIÓN */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-domus-primary">
              Dejar una reseña
            </h1>
            <p className="text-domus-text-soft mt-3 text-lg">
              Seleccioná la propiedad que visitaste o compraste para calificar tu experiencia.
            </p>
          </div>

          <Link
            href="/"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-domus-terracota text-white border border-domus-terracota shadow-md hover:shadow-lg hover:opacity-90 transition-all duration-300 font-semibold"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-300">
              ←
            </span>
            Volver al inicio
          </Link>
        </div>

        {/* Pasamos basePath="/reviews" para redirigir a tu formulario app/reviews/[targetId] */}
        <PropertiesGrid
          properties={properties.map((property) => ({
            ...property,
            ...propertyMocks[property.id],
          }))}
          basePath="/reviews"
        />

      </section>
    </main>
  );
}