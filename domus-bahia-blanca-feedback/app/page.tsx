import { getTopRatedProperties } from "@/app/actions/reviews";
import Link from "next/link";
import { Star } from "lucide-react";

export default async function HomePage() {

  const result = await getTopRatedProperties();

  const topProperties = result?.success && result.data ? result.data : [];

  return (
    <main className="min-h-screen bg-domus-bg p-8 md:p-16">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-domus-text mb-4">
            Propiedades Destacadas
          </h1>
          <p className="text-domus-text-soft text-lg">
            Las unidades mejor valoradas por nuestra comunidad.
          </p>
        </header>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* 3. Ahora topProperties es seguro de recorrer */}
          {topProperties.map((item: any) => (
            <Link 
              href={`/reviews/${item.targetId}`} 
              key={item.targetId}
              className="group bg-domus-card border border-domus-secondary rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="bg-domus-primary-soft/20 px-3 py-1 rounded-xl text-domus-primary text-sm font-mono">
                    ID: {item.targetId}
                  </div>
                  <div className="flex items-center gap-1 bg-yellow-50 px-3 py-1 rounded-full text-yellow-700 font-bold border border-yellow-100">
                    <Star size={14} className="fill-yellow-500 text-yellow-500" />
                    {item._avg.rating?.toFixed(1) || "0.0"}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-domus-text mb-2 group-hover:text-domus-primary transition-colors">
                  Ver historial de reseñas
                </h3>
                
                <p className="text-domus-text-soft text-sm">
                  Basado en {item._count._all} {item._count._all === 1 ? 'opinión' : 'opiniones'}.
                </p>
              </div>

              <div className="mt-6 flex items-center text-domus-primary font-semibold">
                Saber más 
                <span className="ml-2 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </section>

        {/* 4. Estado vacío si no hay datos */}
        {topProperties.length === 0 && (
          <div className="text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-domus-secondary">
            <p className="text-domus-text-soft font-medium">
              Todavía no hay reseñas suficientes para generar el ranking.
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Prueba enviando una reseña en /reviews/test-1
            </p>
          </div>
        )}
      </div>
    </main>
  );
}