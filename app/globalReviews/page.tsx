import { getAllRatedProperties } from "@/app/actions/reviews";
import Link from "next/link";
import { Star } from "lucide-react";
import PropertiesGrid from "@/components/properties/PropertiesGrid";

export default async function ReviewsPage() {
  const result = await getAllRatedProperties();

  const properties = result?.success && result.data ? result.data : [];

  return (
    <main className="min-h-screen bg-domus-bg">
      <section className="max-w-7xl mx-auto px-6 py-14">

        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full border-2 border-domus-terracota flex items-center justify-center">
                <Star className="text-domus-terracota fill-domus-terracota" size={22} />
              </div>

              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-domus-primary">
                  Todas las reseñas
                </h1>

                <p className="text-domus-text-soft mt-2">
                  Ranking completo de propiedades con opiniones verificadas.
                </p>
              </div>
            </div>
          </div>

          <Link 
             href="/" 
             className="group hidden md:flex items-center text-domus-terracota font-semibold gap-1 transition-colors duration-300"
          >
            <span className="inline-block transform group-hover:-translate-x-1.5 transition-transform duration-300 ease-out">
             ← 
            </span>
             Volver al inicio 
        </Link>
        </div>
        {/* GRID REUTILIZADO */}
        <PropertiesGrid properties={properties} />
      </section>
    </main>
  );
}