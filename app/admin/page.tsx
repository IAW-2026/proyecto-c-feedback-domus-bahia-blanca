import { auth } from "@clerk/nextjs/server";
import { getAdminStats, getAllRatedProperties } from "@/app/actions/reviews";
import { db } from "@/lib/db";
import { propertyMocks } from "@/lib/mockProperty";
import AdminNavbar from "@/components/admin/AdminNavbar";
import AdminDashboardClient from "@/components/admin/AdminDashboardClient";
import { ShieldCheck, Star, MessageSquare, MessageSquareOff } from "lucide-react";
import AdminToaster from "@/components/admin/AdminToaster";

export default async function AdminPage() {
  const { userId } = await auth();

  const [statsResult, propertiesResult, allReviews] = await Promise.all([
    getAdminStats(),
    getAllRatedProperties(),
    db.review.findMany({
      orderBy: { createdAt: "desc" },
      include: { response: true },
    }),
  ]);

  const stats = statsResult.data;
  const properties = propertiesResult.success ? propertiesResult.data ?? [] : [];
  const reviews = allReviews.map((r) => ({
    ...r,
    propertyTitle: propertyMocks[r.targetId]?.title ?? `Propiedad ${r.targetId}`,
  }));

  return (
    <main className="min-h-screen bg-domus-bg">
      <AdminToaster />
      <AdminNavbar userId={userId} />

      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col gap-10">

        {/* STATS */}
        <section>
          <h2 className="text-3xl font-bold text-domus-primary mb-6">
            Resumen general
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="bg-domus-card border border-domus-secondary rounded-3xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-domus-primary/10 flex items-center justify-center">
                <MessageSquare size={22} className="text-domus-primary" />
              </div>
              <div>
                <p className="text-domus-text-soft text-sm">Total reseñas</p>
                <p className="text-3xl font-bold text-domus-text">{stats?.totalReviews ?? 0}</p>
              </div>
            </div>

            <div className="bg-domus-card border border-domus-secondary rounded-3xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-domus-terracota/10 flex items-center justify-center">
                <Star size={22} className="text-domus-terracota" />
              </div>
              <div>
                <p className="text-domus-text-soft text-sm">Rating promedio</p>
                <p className="text-3xl font-bold text-domus-text">{stats?.avgRating.toFixed(1) ?? "0.0"}</p>
              </div>
            </div>

            <div className="bg-domus-card border border-domus-secondary rounded-3xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-domus-primary/10 flex items-center justify-center">
                <ShieldCheck size={22} className="text-domus-primary" />
              </div>
              <div>
                <p className="text-domus-text-soft text-sm">Con respuesta</p>
                <p className="text-3xl font-bold text-domus-text">{stats?.withResponse ?? 0}</p>
              </div>
            </div>

            <div className="bg-domus-card border border-domus-secondary rounded-3xl p-6 flex items-center gap-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-domus-terracota/10 flex items-center justify-center">
                <MessageSquareOff size={22} className="text-domus-terracota" />
              </div>
              <div>
                <p className="text-domus-text-soft text-sm">Sin respuesta</p>
                <p className="text-3xl font-bold text-domus-text">{stats?.withoutResponse ?? 0}</p>
              </div>
            </div>
          </div>
        </section>

        {/* RANKING */}
        <section>
          <h2 className="text-3xl font-bold text-domus-primary mb-6">
            Ranking de propiedades
          </h2>

          <div className="bg-domus-card border border-domus-secondary rounded-3xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-domus-secondary">
                  <th className="text-left px-6 py-4 text-domus-text-soft font-medium">#</th>
                  <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Propiedad</th>
                  <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Rating</th>
                  <th className="text-left px-6 py-4 text-domus-text-soft font-medium">Reseñas</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((p, i) => (
                  <tr key={p.id} className="border-b border-domus-secondary/50 hover:bg-domus-secondary/20 transition">
                    <td className="px-6 py-4 text-domus-text-soft">{i + 1}</td>
                    <td className="px-6 py-4 font-semibold text-domus-text">{p.address}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-domus-text">{p.avgRating.toFixed(1)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-domus-text-soft">{p.reviewCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* REVIEWS */}
        <AdminDashboardClient reviews={reviews} />

      </div>
    </main>
  );
}