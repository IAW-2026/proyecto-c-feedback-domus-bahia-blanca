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
      _avg: {
        rating: true,
      },
      _count: {
        _all: true,
      },
      orderBy: {
        _avg: {
          rating: 'desc',
        },
      },
      take: 6, // Traemos las 6 mejores
    });

    return { success: true, data: topRated };
  } catch (error) {
    console.error("Error al obtener el ranking:", error);
    return { success: false, error: "No se pudo cargar el ranking." };
  }
}