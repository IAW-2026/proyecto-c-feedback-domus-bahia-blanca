const SELLER_API_URL = "https://proyecto-c-seller-domus-bahia-blanc.vercel.app";
const SELLER_API_KEY = process.env.SELLER_API_KEY!;

export async function getPropertiesByIds(ids: string[]) {
  const res = await fetch(
    `${SELLER_API_URL}/api/properties/batch?ids=${ids.join(",")}`,
    {
      headers: { "X-API-Key": SELLER_API_KEY },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? [];
}

export async function getPropertyById(id: string) {
  const res = await fetch(
    `${SELLER_API_URL}/api/properties/${id}`,
    {
      headers: { "X-API-Key": SELLER_API_KEY },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return null;
  const json = await res.json();
  return json.data ?? null;
}

export async function getAllPublishedProperties() {
  const res = await fetch(
    `${SELLER_API_URL}/api/properties`,
    {
      headers: { "X-API-Key": SELLER_API_KEY },
      next: { revalidate: 60 },
    }
  );

  if (!res.ok) return [];
  const json = await res.json();
  return json.data ?? [];
}