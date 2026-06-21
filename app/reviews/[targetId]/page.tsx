import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";
import BuyerFeedbackClient from "@/components/clients/BuyerFeedbackClient";
import SellerFeedbackClient from "@/components/clients/SellerFeedbackClient";
import { getUserRole, getProperty } from "@/app/actions/reviews";
import { checkIfUserCanReview } from "@/app/actions/reviews";

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
  const canReview = await checkIfUserCanReview(userId,targetId);

  if (!canReview) {
    notFound();
  }

  const role = await getUserRole(userId);
  const propertyResult = await getProperty(targetId);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  if (role === "seller") {
    return (
      <SellerFeedbackClient
        targetId={targetId}
        property={propertyResult.data}
      />
    );
  }

  if (role === "buyer") {
    return (
      <BuyerFeedbackClient
        targetId={targetId}
        property={propertyResult.data}
      />
    );
  }
}