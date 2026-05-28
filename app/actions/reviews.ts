"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function createReview(data: {
  authorId: string;
  targetId: string;
  visitId: string;
  rating: number;
  content: string;
}) {
  try {
    const review = await db.review.create({
      data: {
        authorId: data.authorId,
        targetId: data.targetId,
        visitId: data.visitId,
        rating: data.rating,
        content: data.content,
      },
    });

    revalidatePath("/"); 
    return { success: true, review };
  } catch (error) {
    console.error("Error al crear reseña:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
}

export async function getTopRatedProperties() {
  try {
    const reviews = await db.review.findMany();

    const grouped = reviews.reduce((acc: any, review) => {
      if (!acc[review.targetId]) {
        acc[review.targetId] = {
          total: 0,
          count: 0,
        };
      }

      acc[review.targetId].total += review.rating;
      acc[review.targetId].count += 1;

      return acc;
    }, {});

    const dataWithMockInfo = Object.entries(grouped).map(([targetId, data]: any) => ({
      id: targetId,
      avgRating: data.total / data.count,
      reviewCount: data.count,
      address: `Propiedad en Zona ${targetId.split("-")[1] || targetId}`,
      imageUrl: "/prueba-1.jpg",
    }));

    return { success: true, data: dataWithMockInfo };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function getReviewsByTarget(targetId: string) {
  try {
    const reviews = await db.review.findMany({
      where: { targetId },
      orderBy: {
        createdAt: "desc", 
      },
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export async function getSellerDashboardMetrics(targetIds: string[]) {
  try {
    // 1. Usamos directamente el array de IDs de propiedades que te pase el equipo 
    // o que tengas en tu contexto, sin consultar a una tabla 'Property' inexistente.
    
    // 2. Conteo agrupado directamente sobre Review
    const stats = await db.review.groupBy({
      by: ['rating'],
      where: { targetId: { in: targetIds } },
      _count: { rating: true },
    });

    // 3. Reseña destacada
    const featuredReview = await db.review.findFirst({
      where: { targetId: { in: targetIds } },
      orderBy: { createdAt: 'desc' },
      select: { content: true, authorId: true, rating: true }
    });

    // 4. Normalización
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    stats.forEach((s) => {
      ratingDistribution[s.rating as keyof typeof ratingDistribution] = s._count.rating;
    });

    return { 
      success: true, 
      data: { ratingDistribution, featuredReview } 
    };
  } catch (error) {
    console.error("Error en dashboard:", error);
    return { success: false, error: "Error al obtener métricas" };
  }
}