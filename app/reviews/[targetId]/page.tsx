import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BuyerFeedbackClient from "@/components/clients/BuyerFeedbackClient";
import SellerFeedbackClient from "@/components/clients/SellerFeedbackClient";
import { getUserRole, getProperty } from "@/app/actions/reviews";
import { checkIfUserCanReview,hasUserAlreadyReviewed } from "@/app/actions/reviews";

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

  const canReview = await checkIfUserCanReview(userId, targetId);
  const alreadyReviewed = await hasUserAlreadyReviewed(userId, targetId);

  const roles = await getUserRole(userId);

  console.log("roles:", roles);
  console.log("userId:", userId);

  const propertyResult = await getProperty(targetId);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  if (canReview && alreadyReviewed) {
    // ya reseñó esta propiedad, no puede entrar a dejar otra
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

  if (roles.includes("seller")) {
    return (
      <SellerFeedbackClient
        targetId={targetId}
        property={propertyResult.data}
      />
    );
  }

  notFound();
}