import { notFound } from "next/navigation";
import PublicPropertyReviewsClient from "@/components/clients/PublicPropertyReviewsClient";
import { getProperty } from "@/app/actions/reviews";

interface PropertyPageProps {
  params: Promise<{
    targetId: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {
  const { targetId } = await params;

  const propertyResult = await getProperty(targetId);

  if (!propertyResult.success || !propertyResult.data) {
    notFound();
  }

  return (
    <PublicPropertyReviewsClient
      targetId={targetId}
      property={propertyResult.data}
    />
  );
}