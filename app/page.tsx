import { getTopRatedProperties, getTotalReviewsCount } from "@/app/actions/reviews";

import { auth } from "@clerk/nextjs/server";

import PropertiesGrid from "@/components/properties/PropertiesGrid";
import HeroSection from "@/components/home/HeroSection";
import TopRatedSection from "@/components/home/TopRatedSection";
import HomeFooter from "@/components/home/FooterSection";
import Navbar from "@/components/home/Navbar";

import { propertyMocks } from "@/lib/mockProperty"; //mocks temporales


export default async function HomePage() {
  const [result, reviewsCountResult] = await Promise.all([
  getTopRatedProperties(4),
  getTotalReviewsCount(),
]);
  const { userId } = await auth();

  const topProperties =
    result?.success && result.data ? result.data : [];

  const sortedProperties = [...topProperties].sort((a, b) => b.avgRating - a.avgRating);

  const totalReviews =
    reviewsCountResult?.success ? reviewsCountResult.total : 0;

  return (
    <main className="min-h-screen bg-domus-bg overflow-x-hidden">
      {/* CADA PARTE DE LA PAGINA TIENE SU COMPONENTE */}

      <Navbar userId={userId} />
      
      <HeroSection totalReviews={totalReviews} />

      <TopRatedSection
          properties={sortedProperties.map((property) => ({
            ...property,
            ...propertyMocks[property.id],
          }))}
          basePath={"/publicReviews"}
        />

       <HomeFooter />

    </main>
  );
}