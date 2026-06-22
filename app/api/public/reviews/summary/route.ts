import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("X-API-Key");

  if (apiKey !== process.env.FEEDBACK_API_KEY) {
    return NextResponse.json(
      { success: false, error: { message: "API key inválida o ausente", code: "UNAUTHORIZED" } },
      { status: 401 }
    );
  }

  const idsParam = request.nextUrl.searchParams.get("ids");

  if (!idsParam) {
    return NextResponse.json(
      { success: false, error: { message: "Parámetro ids requerido", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  const targetIds = idsParam.split(",").map((id) => id.trim()).filter(Boolean);

  if (targetIds.length === 0) {
    return NextResponse.json(
      { success: false, error: { message: "Parámetro ids vacío", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  try {
    const grouped = await db.review.groupBy({
      by: ["targetId"],
      where: { targetId: { in: targetIds } },
      _avg: { rating: true },
      _count: { _all: true },
    });

    // solo propiedades con al menos una reseña (avg no null/0)
    const summaries = grouped
      .filter((item) => item._count._all > 0 && item._avg.rating)
      .map((item) => ({
        propertyId: item.targetId,
        averageRating: item._avg.rating,
        totalReviews: item._count._all,
      }));

    return NextResponse.json({
      success: true,
      data: summaries.length > 0 ? summaries : null,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error interno del servidor", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}