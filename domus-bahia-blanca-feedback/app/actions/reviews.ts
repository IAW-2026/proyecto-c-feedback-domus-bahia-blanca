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