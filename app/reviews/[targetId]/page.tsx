import { auth } from "@clerk/nextjs/server";
import { notFound, redirect } from "next/navigation";

import BuyerFeedbackClient from "@/components/clients/BuyerFeedbackClient";
import SellerFeedbackClient from "@/components/clients/SellerFeedbackClient";
import { getUserRole } from "@/app/actions/reviews";
// import { checkIfUserCanReview } from "@/app/actions/reviews"; con la union de aplicaciones esto funcionará

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

  // PERMISOS: con la union de aplicaciones esto funcionará
  /*
  const canReview = await checkIfUserCanReview(
    userId,
    targetId
  );

  if (!canReview) {
    notFound();
  }
  */

  // ROL
  const role = await getUserRole(userId);

  // RENDER
  if (role === "seller") {
    return (
      <SellerFeedbackClient
        targetId={targetId}
      />
    );
  }

  return (
    <BuyerFeedbackClient
      targetId={targetId}
    />
  );
}