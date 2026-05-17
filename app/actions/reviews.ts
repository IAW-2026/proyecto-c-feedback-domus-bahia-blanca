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