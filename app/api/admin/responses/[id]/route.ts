import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = request.headers.get("X-API-Key");

  if (apiKey !== process.env.CONTROL_PANEL_API_KEY) {
    return NextResponse.json(
      { success: false, error: { message: "API key inválida o ausente", code: "UNAUTHORIZED" } },
      { status: 401 }
    );
  }

  const { id } = await params;

  try {
    await db.reviewResponse.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, error: { message: "Respuesta no encontrada", code: "NOT_FOUND" } },
        { status: 404 }
      );
    }
    console.error(error);
    return NextResponse.json(
      { success: false, error: { message: "Error interno del servidor", code: "INTERNAL_ERROR" } },
      { status: 500 }
    );
  }
}