import { getTopRatedProperties, getTotalReviewsCount } from "@/app/actions/reviews";
import Link from "next/link";
import { Star, ShieldCheck, Users, Heart } from "lucide-react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import PropertiesGrid from "@/components/properties/PropertiesGrid";
import HeroSection from "@/components/home/HeroSection";

export default async function HomePage() {
  const [result, reviewsCountResult] = await Promise.all([
  getTopRatedProperties(),
  getTotalReviewsCount(),
]);
  const { userId } = await auth();

  const topProperties =
    result?.success && result.data ? result.data : [];

  const totalReviews =
    reviewsCountResult?.success ? reviewsCountResult.total : 0;
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
                <SignInButton
                  mode="modal"
                  forceRedirectUrl="/reviews/new"
                >
                  <button className="border border-domus-secondary px-5 py-3 rounded-2xl hover:bg-domus-secondary transition cursor-pointer">
                    Ingresar
                  </button>
                </SignInButton>

                <SignUpButton
                  mode="modal"
                  forceRedirectUrl="/reviews/new"
                >
                  <button className="bg-domus-primary text-white px-5 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer">
                    Dejar una reseña
                  </button>
                </SignUpButton>
              </>
            ) : (
              <>
                <Link href="/reviews/availableReviews">
                  <button className="bg-domus-primary text-white px-5 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md cursor-pointer">
                    Dejar una reseña
                  </button>
                </Link>

                <UserButton
                  appearance={{
                    elements: {
                      avatarBox:
                        "w-11 h-11 border border-domus-secondary shadow-sm",
                    },
                  }}
                />
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <HeroSection totalReviews={totalReviews} />

      {/* SEPARADOR */}
      <div className="max-w-7xl mx-auto px-6 pb-10">
        <div className="h-px bg-gradient-to-r from-transparent via-domus-secondary to-transparent" />
      </div>

      {/* SECTION TITLE */}
      <section className="max-w-7xl mx-auto px-6 pb-6">
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-domus-terracota flex items-center justify-center">
              <Star
                className="text-domus-terracota fill-domus-terracota"
                size={22}
              />
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

      {/* GRID */}
      <section className="max-w-7xl mx-auto px-6 pb-20">
        <PropertiesGrid properties={topProperties} />
      </section>

      {/* FOOTER VALUES */}
      <footer className="max-w-7xl mx-auto px-6 pb-16">
        <div className="bg-domus-card rounded-3xl border border-domus-secondary shadow-lg grid grid-cols-1 md:grid-cols-4 gap-5 p-8">

          <div className="rounded-2xl p-4 flex items-start gap-4 hover:bg-domus-secondary/25 transition">
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

          <div className="rounded-2xl p-4 flex items-start gap-4 hover:bg-domus-secondary/25 transition">
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

          <div className="rounded-2xl p-4 flex items-start gap-4 hover:bg-domus-secondary/25 transition">
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

          <div className="rounded-2xl p-4 flex items-start gap-4 hover:bg-domus-secondary/25 transition">
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