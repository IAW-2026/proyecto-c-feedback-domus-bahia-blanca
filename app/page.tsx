import { getTopRatedProperties } from "@/app/actions/reviews";
import Link from "next/link";
import { Star, ShieldCheck, Users, Heart } from "lucide-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import PropertiesGrid from "@/components/properties/PropertiesGrid";

export default async function HomePage() {
  const result = await getTopRatedProperties();
  const { userId } = await auth(); 

  const topProperties = result?.success && result.data ? result.data : [];

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

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
              {!userId ? (
                <>
                  <SignInButton mode="modal" forceRedirectUrl="/reviews/new">
                    <button className="border border-domus-secondary px-5 py-3 rounded-2xl hover:bg-domus-secondary transition cursor-pointer">
                      Ingresar
                    </button>
                  </SignInButton>
                  <SignUpButton mode="modal" forceRedirectUrl="/reviews/new">
                    <button className="bg-domus-primary text-white px-5 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer">
                      Dejar una reseña
                    </button>
                  </SignUpButton>
                </>
              ) : (
                <>
                  {/* Envolvemos el botón en un Link hacia la nueva página */}
                  <Link href="/reviews/availableReviews">
                    <button className="bg-domus-primary text-white px-5 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer">
                      Dejar una reseña
                    </button>
                  </Link>
                  <UserButton appearance={{ elements: { avatarBox: "w-11 h-11 border border-domus-secondary shadow-sm" } }} />
                </>
              )}
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

          <Link 
             href="/globalReviews" 
             className="group hidden md:flex items-center text-domus-terracota font-semibold gap-1 transition-colors duration-300"
          >
             Ver todas
             <span className="inline-block transform group-hover:translate-x-1.5 transition-transform duration-300 ease-out">
              →
             </span>
        </Link>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <PropertiesGrid properties={topProperties} />
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