import { getTopRatedProperties } from "@/app/actions/reviews";
import Link from "next/link";
import {Star, ShieldCheck, Users, Heart, BedDouble, Bath, Ruler, CarFront, MapPin,} from "lucide-react";

export default async function HomePage() {
  const result = await getTopRatedProperties();

  console.log("RESULTADO:", result);

  const topProperties =
    result?.success && result.data ? result.data : [];

    
  return (
    <main className="min-h-screen bg-domus-bg overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="border-b border-domus-secondary bg-domus-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          
          {/* LOGO */}
          <div>
            <h1 className="text-4xl font-bold text-domus-primary tracking-wide">
              DOMUS
            </h1>

            <p className="text-xs tracking-[0.3em] text-domus-text-soft">
              BAHÍA BLANCA
            </p>
          </div>

          {/* NAV */}
          {/*<div className="hidden md:flex items-center gap-10 text-domus-text">
            <button className="text-domus-primary font-semibold border-b-2 border-domus-primary pb-1">
              Inicio
            </button>

            <button className="hover:text-domus-primary transition">
              Buscar propiedades
            </button>

            <button className="hover:text-domus-primary transition">
              Cómo funciona
            </button>

            <button className="hover:text-domus-primary transition">
              Sobre nosotros
            </button>
          </div>*/}

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <button className="border border-domus-secondary px-5 py-3 rounded-2xl hover:bg-domus-secondary transition">
              Ingresar
            </button>

            <button className="bg-domus-primary text-white px-5 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md">
              Dejar una reseña
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_1fr] gap-16 items-center">
          
          {/* LEFT */}
          <div>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight text-domus-primary">
              Propiedades mejor valoradas por{" "}
              <span className="text-domus-terracota">
                la comunidad
              </span>
            </h1>

            <p className="text-xl text-domus-text-soft mt-8 leading-relaxed max-w-2xl">
              Descubrí las propiedades mejor calificadas por quienes
              ya las visitaron. Opiniones reales, decisiones más
              informadas.
            </p>

            {/* FEATURES */}
            <div className="mt-10 bg-domus-card border border-domus-secondary rounded-3xl p-6 grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
              
              <div className="flex items-start gap-4">
                <ShieldCheck className="text-domus-primary" />

                <div>
                  <h3 className="font-bold text-domus-text">
                    Opiniones verificadas
                  </h3>

                  <p className="text-sm text-domus-text-soft mt-1">
                    Solo de visitas reales
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Star className="text-domus-terracota fill-domus-terracota" />

                <div>
                  <h3 className="font-bold text-domus-text">
                    Mejor valoradas
                  </h3>

                  <p className="text-sm text-domus-text-soft mt-1">
                    Por nuestra comunidad
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Users className="text-domus-primary" />

                <div>
                  <h3 className="font-bold text-domus-text">
                    +500 reseñas
                  </h3>

                  <p className="text-sm text-domus-text-soft mt-1">
                    En Bahía Blanca
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT VISUAL */}
            <div className="hidden xl:flex justify-center items-center">
                <div className="w-full h-[420px] rounded-[30px] bg-gradient-to-br from-domus-secondary/0 via-domus-secondary/0 to-domus-secondary/20 relative overflow-hidden">
                    <img
                        src="/bahia_caricatura.png"
                        alt="Domus"
                        className="w-full h-full object-cover opacity-95"
                    />
                {/* Efecto de fade en los bordes */}
                <div className="absolute inset-0 rounded-[30px] bg-gradient-to-r from-domus-bg/30 via-transparent to-domus-bg/30 pointer-events-none" />
            </div>
</div>
        </div>
      </section>

      {/* SECTION TITLE */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex items-center justify-between">
          
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-domus-terracota flex items-center justify-center">
              <Star className="text-domus-terracota fill-domus-terracota" size={22} />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-domus-primary">
                Mejor calificadas
              </h2>

              <p className="text-domus-text-soft mt-1">
                Basado en experiencias reales de compradores.
              </p>
            </div>
          </div>

          <button className="hidden md:flex text-domus-terracota font-semibold hover:gap-4 transition-all gap-2">
            Ver todas →
          </button>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        
        {topProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            
            {topProperties.map((item: any) => (
              <Link
                href={`/reviews/${item.id}`}
                key={item.id}
                className="group bg-domus-card rounded-3xl overflow-hidden border border-domus-secondary shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  
                  <img
                    src={item.imageUrl}
                    alt="Propiedad"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  {/* RATING */}
                  <div className="absolute top-4 left-4 bg-domus-primary/90 backdrop-blur-md text-white px-4 py-2 rounded-2xl flex items-center gap-2 font-bold shadow-lg">
                    <Star size={16} className="fill-white" />
                    {item.avgRating.toFixed(1)}
                  </div>

                  {/* FAVORITE */}
                  <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-md">
                    <Heart size={20} className="text-domus-text" />
                  </button>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  
                  <h3 className="text-2xl font-bold text-domus-text group-hover:text-domus-primary transition-colors">
                    {item.address}
                  </h3>

                  <p className="text-domus-text-soft mt-2 flex items-center gap-2">
                    <MapPin size={16} />
                    Bahía Blanca, Buenos Aires
                  </p>

                  {/* SPECS */}
                  <div className="grid grid-cols-4 gap-3 mt-6">
                    
                    <div className="text-center">
                      <BedDouble size={18} className="mx-auto text-domus-text-soft" />

                      <p className="font-bold text-domus-text mt-2">
                        3
                      </p>

                      <p className="text-xs text-domus-text-soft">
                        Dorm.
                      </p>
                    </div>

                    <div className="text-center">
                      <Bath size={18} className="mx-auto text-domus-text-soft" />

                      <p className="font-bold text-domus-text mt-2">
                        2
                      </p>

                      <p className="text-xs text-domus-text-soft">
                        Baños
                      </p>
                    </div>

                    <div className="text-center">
                      <Ruler size={18} className="mx-auto text-domus-text-soft" />

                      <p className="font-bold text-domus-text mt-2">
                        120
                      </p>

                      <p className="text-xs text-domus-text-soft">
                        m²
                      </p>
                    </div>

                    <div className="text-center">
                      <CarFront size={18} className="mx-auto text-domus-text-soft" />

                      <p className="font-bold text-domus-text mt-2">
                        1
                      </p>

                      <p className="text-xs text-domus-text-soft">
                        Coch.
                      </p>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 pt-5 border-t border-domus-secondary flex items-center justify-between">
                    
                    <div>
                      <p className="text-sm text-domus-text-soft">
                        {item.reviewCount} opiniones
                      </p>
                    </div>

                    <div className="text-domus-primary font-semibold flex items-center gap-2">
                      Ver detalle
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-domus-card rounded-3xl border-2 border-dashed border-domus-secondary">
            <h3 className="text-3xl font-bold text-domus-text">
              Todavía no hay reseñas suficientes
            </h3>

            <p className="text-domus-text-soft mt-4 text-lg">
              Sé una de las primeras personas en dejar una opinión.
            </p>
          </div>
        )}
      </section>

      {/* FOOTER VALUES */}
      <footer className="max-w-7xl mx-auto px-6 pb-16">
        
        <div className="bg-domus-secondary/40 rounded-3xl border border-domus-secondary grid grid-cols-1 md:grid-cols-4 gap-8 p-10">
          
          <div className="flex items-start gap-4">
            <ShieldCheck className="text-domus-primary" />

            <div>
              <h4 className="font-bold text-domus-text">
                Transparencia
              </h4>

              <p className="text-sm text-domus-text-soft mt-1">
                Opiniones reales y verificadas
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Star className="text-domus-terracota" />

            <div>
              <h4 className="font-bold text-domus-text">
                Confianza
              </h4>

              <p className="text-sm text-domus-text-soft mt-1">
                Construimos comunidad
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Users className="text-domus-primary" />

            <div>
              <h4 className="font-bold text-domus-text">
                Experiencia
              </h4>

              <p className="text-sm text-domus-text-soft mt-1">
                Tu opinión ayuda a otros
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Heart className="text-domus-primary" />

            <div>
              <h4 className="font-bold text-domus-text">
                Compromiso
              </h4>

              <p className="text-sm text-domus-text-soft mt-1">
                Mejoramos cada día
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}