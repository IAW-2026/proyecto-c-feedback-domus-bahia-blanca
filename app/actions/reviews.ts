"use server";
import { getPropertyById } from "@/lib/sellerApi";
import { getPropertiesByIds, getAllPublishedProperties } from "@/lib/sellerApi";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";

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
  } catch (error: any) {
    if (error.code === "P2002") {
      return { success: false, error: "Ya dejaste una reseña para esta propiedad." };
    }
    return { success: false, error: error.message };
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

export async function getProperty(targetId: string) {
  try {
    const property = await getPropertyById(targetId);

    if (!property) {
      return {
        success: false,
        error: "Propiedad no encontrada",
      };
    }

    return {
      success: true,
      data: {
        id: property.id,
        title: property.title,
        location: property.location ?? property.address ?? "Ubicación no disponible",
        imageUrl:
          property.multimedia?.find(
            (m: any) => m.fileType === "IMAGE"
          )?.fileUrl ?? "/prueba-1.webp",
        specs: {
          bedrooms: property.bedrooms ?? 0,
          bathrooms: property.bathrooms ?? 0,
          meters: property.totalSqMeters ?? 0,
          garage: 0,
        },
      },
    };
  } catch (error) {
    console.error("Error obteniendo propiedad:", error);

    return {
      success: false,
      error: "No se pudo obtener la propiedad",
    };
  }
}

export async function getTopRatedProperties(limit?: number) {
  try {
    const reviews = await db.review.findMany();

    const grouped = reviews.reduce((acc: any, review) => {
      if (!acc[review.targetId]) {
        acc[review.targetId] = { total: 0, count: 0 };
      }
      acc[review.targetId].total += review.rating;
      acc[review.targetId].count += 1;
      return acc;
    }, {});

    const targetIds = Object.keys(grouped);
    const properties = await getPropertiesByIds(targetIds);

    const data = Object.entries(grouped)
      .map(([targetId, stats]: any) => {
        const prop = properties.find((p: any) => p.id === targetId);
        const imageUrl = prop?.multimedia?.find((m: any) => m.fileType === "IMAGE")?.fileUrl ?? "/prueba-1.webp";
        return {
          id: targetId,
          avgRating: stats.total / stats.count,
          reviewCount: stats.count,
          location: prop?.title ?? prop?.location ?? `Propiedad ${targetId}`,
          imageUrl,
          specs: {
            bedrooms: prop?.bedrooms ?? 0,
            bathrooms: prop?.bathrooms ?? 0,
            meters: prop?.totalSqMeters ?? 0,
            garage: 0,
          },
        };
      })
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, limit);

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
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
      orderBy: { _avg: { rating: "desc" } },
    });

    const targetIds = topRated.map((item) => item.targetId);
    const properties = await getPropertiesByIds(targetIds);

    const data = topRated.map((item) => {
      const prop = properties.find((p: any) => p.id === item.targetId);
      const imageUrl = prop?.multimedia?.find((m: any) => m.fileType === "IMAGE")?.fileUrl ?? "/prueba-1.webp";
      return {
        id: item.targetId,
        avgRating: item._avg.rating || 0,
        reviewCount: item._count._all,
        location: prop?.title ?? prop?.location ?? `Propiedad ${item.targetId}`,
        imageUrl,
        specs: {
          bedrooms: prop?.bedrooms ?? 0,
          bathrooms: prop?.bathrooms ?? 0,
          meters: prop?.totalSqMeters ?? 0,
          garage: 0,
        },
      };
    });

    return { success: true, data };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Error al obtener ranking" };
  }
}


export async function checkIfUserCanReview(userId: string, targetId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `https://proyecto-c-shipping-domus-bahia.vercel.app/api/turnos/comprador/${userId}?estado=COMPLETADO`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error("Error al conectar con el módulo del compañero");
      return false;
    }

    const turnos = await response.json();

    if (!Array.isArray(turnos)) {
      console.error("Respuesta inesperada del módulo de turnos");
      return false;
    }

    const hasCompletedVisit = turnos.some(
      (turno: any) =>
        turno.propiedadId === targetId &&
        turno.compradorId === userId &&
        turno.estado === "COMPLETADO"
    );

    return hasCompletedVisit;
  } catch (error) {
    console.error("Error crítico en checkIfUserCanReview:", error);
    return false; 
  }
}

export async function getPropertiesAvailableToReview(userId: string) {
  try {
    const [allProperties, existingReviews] = await Promise.all([
      getAllPublishedProperties(),
      db.review.findMany({
        where: { authorId: userId },
        select: { targetId: true },
      }),
    ]);

    const reviewedIds = new Set(existingReviews.map((r) => r.targetId));

    const available = allProperties.filter((p: any) => !reviewedIds.has(p.id));

    const properties = await Promise.all(
      available.map(async (prop: any) => {
        const stats = await db.review.aggregate({
          where: { targetId: prop.id },
          _avg: { rating: true },
          _count: { _all: true },
        });

        const imageUrl = prop.multimedia?.find((m: any) => m.fileType === "IMAGE")?.fileUrl ?? "/prueba-1.webp";

        return {
          id: prop.id,
          location: prop.title ?? prop.location ?? `Propiedad ${prop.id}`,
          imageUrl,
          avgRating: stats._avg.rating || 0,
          reviewCount: stats._count._all || 0,
          specs: {
            bedrooms: prop.bedrooms ?? 0,
            bathrooms: prop.bathrooms ?? 0,
            meters: prop.totalSqMeters ?? 0,
            garage: 0,
          },
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
): Promise<("buyer" | "seller" | "admin")[]> {
  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);

    const rawRole = user.publicMetadata?.role;

    // soporta tanto un string único como un array ya guardado en Clerk
    const roles = Array.isArray(rawRole) ? rawRole : [rawRole];

    const validRoles = roles.filter(
      (r): r is "buyer" | "seller" | "admin" =>
        r === "seller" || r === "admin" || r === "buyer"
    );

    return validRoles.length > 0 ? validRoles : ["buyer"];
  } catch {
    return ["buyer"];
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

