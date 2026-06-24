import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(request: NextRequest) {
  const apiKey = request.headers.get("X-API-Key");

  if (apiKey !== process.env.CONTROL_PANEL_API_KEY) {
    return NextResponse.json(
      { success: false, error: { message: "API key inválida o ausente", code: "UNAUTHORIZED" } },
      { status: 401 }
    );
  }

  try {
    const [totalReviews, avgResult, reviewsWithResponse, reviews] = await Promise.all([
      db.review.count(),
      db.review.aggregate({ _avg: { rating: true } }),
      db.review.count({ where: { response: { isNot: null } } }),
      db.review.findMany({
        orderBy: { createdAt: "desc" },
        include: { response: true },
      }),
    ]);

    const data = {
      stats: {
        totalReviews,
        averageRating: avgResult._avg.rating ?? 0,
        reviewsWithResponse,
        reviewsWithoutResponse: totalReviews - reviewsWithResponse,
      },
      reviews: reviews.map((r) => ({
        id: r.id,
        authorId: r.authorId,
        authorName: r.authorName,
        targetId: r.targetId,
        rating: r.rating,
        content: r.content,
        createdAt: r.createdAt,
        response: r.response
          ? {
              id: r.response.id,
              authorId: r.response.authorId,
              content: r.response.content,
              createdAt: r.response.createdAt,
            }
          : null,
      })),
    };

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error interno del servidor", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}