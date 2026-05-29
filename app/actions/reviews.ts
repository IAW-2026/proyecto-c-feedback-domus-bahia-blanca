"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

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

    const dataWithMockInfo = topRated.map((item) => ({
      id: item.targetId,
      avgRating: item._avg.rating || 0,
      reviewCount: item._count._all,
      address: `Propiedad en Zona ${item.targetId.split("-")[1] || item.targetId}`,
      imageUrl: "/prueba-1.jpg",
    }));

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

// true  = Simula que el usuario SÍ tiene propiedades listas para reseñar.
// false = Simula que el usuario NO tiene ninguna propiedad (0).
const MOCK_HAS_PROPERTIES = true; 

// app/actions/reviews.ts

export async function getPropertiesAvailableToReview(userId: string) {
  try {
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (!MOCK_HAS_PROPERTIES) {
      return [];
    }

    // ID de la propiedad real que querés usar para las pruebas
    const targetId = "123"; 

    // 1. Vamos a buscar a la base de datos las reseñas REALES que ya existen para este ID
    const stats = await db.review.aggregate({
      where: { targetId },
      _avg: { rating: true },
      _count: { _all: true },
    });

    // 2. Retornamos el array combinando los datos fijos del inmueble con las estadísticas de la DB
    return [
      {
        id: targetId,
        imageUrl: "/prueba-1.jpg", // Tu foto local que no rompe Next.js
        address: "Av. Alem 1234, Bahía Blanca", // Nombre definitivo e idéntico al de tus pruebas
        avgRating: stats._avg.rating || 0,     // ← REAL: Calculado de la DB
        reviewCount: stats._count._all || 0,   // ← REAL: Calculado de la DB
      }
    ];

  } catch (error) {
    console.error("Error en propiedades disponibles:", error);
    return [];
  }
}

export async function getUserRole(userId: string) {   

  // MOCK TEMPORAL
  // después vendrá desde las otras apps
  return "seller";
}