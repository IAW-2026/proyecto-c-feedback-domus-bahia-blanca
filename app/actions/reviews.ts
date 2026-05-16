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

    revalidatePath("/"); // Esto limpia la caché para mostrar la nueva reseña
    return { success: true, review };
  } catch (error) {
    console.error("Error al crear reseña:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: errorMessage };
  }
}

export async function getTopRatedProperties() {
  try {
    const topRated = await db.review.groupBy({
      by: ['targetId'],
      _avg: { rating: true },
      _count: { _all: true },
      orderBy: { _avg: { rating: 'desc' } },
      take: 6,
    });

    // Simulamos la unión con la base de datos de tu compañero
    const dataWithMockInfo = topRated.map((item) => ({
      id: item.targetId,
      avgRating: item._avg.rating || 0,
      reviewCount: item._count._all,
      // Estos campos vendrán de la otra DB en el futuro:
      address: `Propiedad en Zona ${item.targetId.split('-')[1] || item.targetId}`,
      imageUrl: `/prueba-1.jpg`, // Usamos tu imagen de prueba por ahora
    }));

    return { success: true, data: dataWithMockInfo };
  } catch (error) {
    return { success: false, error: "Error al obtener ranking" };
  }
}