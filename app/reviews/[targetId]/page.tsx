import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BuyerFeedbackClient from "@/components/clients/BuyerFeedbackClient";
import SellerFeedbackClient from "@/components/clients/SellerFeedbackClient";
import { getUserRole, getProperty, checkIfUserCanReview, hasUserAlreadyReviewed } from "@/app/actions/reviews";

interface FeedbackPageProps {
  params: Promise<{ targetId: string }>;
}

export default async function FeedbackPage({
  params,
}: FeedbackPageProps) {

  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const { targetId } = await params;

  const [roles, propertyResult] = await Promise.all([
    getUserRole(userId),
    getProperty(targetId),
  ]);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  // seller tiene prioridad absoluta
  if (roles.includes("seller")) {
    return (
      <SellerFeedbackClient
        targetId={targetId}
        property={propertyResult.data}
      />
    );
  }

  // si no es seller, chequeamos si puede reseñar como buyer
  const [canReview, alreadyReviewed] = await Promise.all([
    checkIfUserCanReview(userId, targetId),
    hasUserAlreadyReviewed(userId, targetId),
  ]);

  if (canReview && alreadyReviewed) {
    redirect("/reviews/already-reviewed");
  }

  if (canReview) {
    return (
      <BuyerFeedbackClient
        targetId={targetId}
        property={propertyResult.data}
      />
    );
  }

  notFound();
}