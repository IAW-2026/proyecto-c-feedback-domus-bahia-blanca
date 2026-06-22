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
    const reviews = await db.review.findMany({
      where: { targetId },
      orderBy: [
        { rating: "desc" },
        { createdAt: "desc" },
      ],
      take: 3,
      select: {
        id: true,
        rating: true,
        content: true,
        authorName: true,
        authorImageUrl: true,
        createdAt: true,
      },
    });

    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error interno del servidor", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}