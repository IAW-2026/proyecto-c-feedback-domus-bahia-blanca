import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ targetId: string }> }
) {
  const apiKey = request.headers.get("X-API-Key");

  if (apiKey !== process.env.FEEDBACK_API_KEY) {
    return NextResponse.json(
      { success: false, error: { message: "API key inválida o ausente", code: "UNAUTHORIZED" } },
      { status: 401 }
    );
  }

  const { targetId } = await params;

  if (!targetId) {
    return NextResponse.json(
      { success: false, error: { message: "targetId requerido", code: "BAD_REQUEST" } },
      { status: 400 }
    );
  }

  try {
    const result = await db.review.aggregate({
      where: { targetId },
      _avg: { rating: true },
      _count: { _all: true },
    });

    const data = {
      propertyId: targetId,
      averageRating: result._count._all > 0 ? result._avg.rating : null,
      totalReviews: result._count._all,
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