import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
//import { checkIfUserCanReview } from "@/app/actions/reviews"; // Tu Server Action de validación
import BuyerFeedbackClient from "@/components/clients/BuyerFeedbackClient";

interface FeedbackPageProps {
  params: Promise<{ targetId: string }>;
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  // 1. Validar autenticación con Clerk en el servidor
  const { userId } = await auth();
  if (!userId) {
    redirect("/");
  }

  const { targetId } = await params;

  // 2. Validar autorización en la Base de Datos antes de renderizar: ESTO RECIEN FUNCIONARÁ CUANDO CONECTE CON LAS OTRAS APPS DEL PROYE
  {/*const canReview = await checkIfUserCanReview(userId, targetId);
  if (!canReview) {
    notFound(); // Dispara directamente tu componente 404 personalizado
  }*/}

  // 3. Si tiene permiso, cargamos el cliente pasándole el targetId como prop
  return <BuyerFeedbackClient targetId={targetId} />;
}

