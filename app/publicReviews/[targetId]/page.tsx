import PublicPropertyReviewsClient
  from "@/components/clients/PublicPropertyReviewsClient";

interface PropertyPageProps {
  params: Promise<{
    targetId: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {

  const { targetId } = await params;

  return (
    <PublicPropertyReviewsClient
      targetId={targetId}
    />
  );
}