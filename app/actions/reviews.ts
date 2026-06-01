"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { propertyMocks } from "@/lib/mockProperty";

export async function createReview(data: {
  authorId: string;
  authorName: string;
  authorImageUrl: string;
  targetId: string;
  visitId: string;
  rating: number;
  content: string;
}) {
  try {
    const review = await db.review.create({
      data: {
        authorId: data.authorId,
        authorName: data.authorName,
        authorImageUrl: data.authorImageUrl,
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

export async function createReviewResponse(reviewId: string, content: string) {
  const { userId } = await auth();

  if (!userId) return { success: false, error: "No autenticado" };

  const existing = await db.reviewResponse.findUnique({
    where: { reviewId },
  });

  if (existing) return { success: false, error: "Ya existe una respuesta" };

  const response = await db.reviewResponse.create({
    data: {
      reviewId,
      content,
      authorId: userId,
    },
  });

  return { success: true, data: response };
}

export async function getTopRatedProperties(limit?: number) {
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

    const dataWithMockInfo = Object.entries(grouped)
      .map(([targetId, data]: any) => {
        const mock = propertyMocks[targetId];
        return {
          id: targetId,
          avgRating: data.total / data.count,
          reviewCount: data.count,
          address: mock?.title ?? `Propiedad ${targetId}`,
          imageUrl: mock?.imageUrl ?? "/prueba-1.webp",
        };
      })
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, limit);

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
      include: {
        response: true,
      },
    });
    return { success: true, data: reviews };
  } catch (error) {
    console.error(error);
    return { success: false, data: [] };
  }
}

export async function getAllRatedProperties() {
  try {
    const topRated = await db.review.groupBy({
      by: ["targetId"],
      _avg: { rating: true },
      _count: { _all: true },
      orderBy: {
        _avg: {
          rating: "desc",
        },
      },
    });

    const dataWithMockInfo = topRated.map((item) => {
      const mock = propertyMocks[item.targetId];
      return {
        id: item.targetId,
        avgRating: item._avg.rating || 0,
        reviewCount: item._count._all,
        address: mock?.title ?? `Propiedad ${item.targetId}`,
        imageUrl: mock?.imageUrl ?? "/prueba-1.webp",
      };
    });

    return {
      success: true,
      data: dataWithMockInfo,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Error al obtener ranking",
    };
  }
}


//------------------------------------------------------------------------------------------------------------------------------------------------------------------
//comentado hasta que me conecte con shipping app y me avise si puede (o no) el usuario dar una reseña en el id de la publicacion al que intenta ingresar.
{/*export async function checkIfUserCanReview(userId: string, targetId: string): Promise<boolean> {
  try {
    //acá iría el URL de shipping app
    const response = await fetch(`https://api-partner.domus.com/appointments/${targetId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    });

    if (!response.ok) {
      console.error("Error al conectar con el módulo del compañero");
      return false;
    }

    const operation = await response.json();

    //acá compruebo si el estado es completado para tal user.
    if (operation.status === "completado" && operation.buyerId === userId) {
      return true;
    }

    return false;
    
  } catch (error) {
    console.error("Error crítico en checkIfUserCanReview:", error);
    return false; // Ante la duda o fallo, bloqueamos el acceso por seguridad
  }
}*/}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------


// true  = Simula que el usuario SÍ tiene propiedades listas para reseñar.
// false = Simula que el usuario NO tiene ninguna propiedad (0).
const MOCK_HAS_PROPERTIES = true; 

export async function getPropertiesAvailableToReview(userId: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!MOCK_HAS_PROPERTIES) {
      return [];
    }

    const targetIds = Object.keys(propertyMocks);

    const properties = await Promise.all(
      targetIds.map(async (targetId) => {
        const mock = propertyMocks[targetId];
        const stats = await db.review.aggregate({
          where: { targetId },
          _avg: { rating: true },
          _count: { _all: true },
        });

        return {
          id: targetId,
          address: mock.title,
          imageUrl: mock.imageUrl,
          avgRating: stats._avg.rating || 0,
          reviewCount: stats._count._all || 0,
        };
      })
    );

    return properties;
  } catch (error) {
    console.error("Error en propiedades disponibles:", error);
    return [];
  }
}

export async function getTotalReviewsCount() { //sirve para la homepage, en el cartel de "mas de X cantidad de reseñas"
  try {
    const total = await db.review.count();

    return {
      success: true,
      total,
    };
  } catch (error) {
    return {
      success: false,
      total: 0,
    };
  }
}

export async function getUserRole(
  userId: string
): Promise<"buyer" | "seller" | "admin"> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const role =
      user.publicMetadata?.role;

    if (
      role === "seller" ||
      role === "admin" ||
      role === "buyer"
    ) {
      return role;
    }

    return "buyer";

  } catch {
    return "buyer";
  }
}

export async function getAdminStats() {
  try {
    const [totalReviews, avgResult, withResponse] = await Promise.all([
      db.review.count(),
      db.review.aggregate({ _avg: { rating: true } }),
      db.review.count({ where: { response: { isNot: null } } }),
    ]);

    return {
      success: true,
      data: {
        totalReviews,
        avgRating: avgResult._avg.rating || 0,
        withResponse,
        withoutResponse: totalReviews - withResponse,
      },
    };
  } catch (error) {
    console.error(error);
    return { success: false, data: null };
  }
}

export async function deleteReview(reviewId: string) {
  try {
    await db.review.delete({ where: { id: reviewId } });
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al eliminar la reseña" };
  }
}

