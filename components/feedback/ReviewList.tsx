interface ReviewProps {
  id: string;
  authorId: string;
  authorName?: string | null;      
  authorImageUrl?: string | null;   
  rating: number;
  content: string;
  createdAt: Date;
}

export default function ReviewList({ reviews }: { reviews: ReviewProps[] }) {
  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        <article
          key={review.id}
          className="bg-white border border-domus-secondary rounded-2xl p-5 transition-all hover:shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            
            {/* AVATAR REAL O PLACEHOLDER EN CASO DE ERROR */}
            {review.authorImageUrl ? (
              <img 
                src={review.authorImageUrl} 
                alt={review.authorName || "Avatar"} 
                className="w-14 h-14 rounded-full object-cover shrink-0 border border-domus-secondary"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-domus-primary text-white flex items-center justify-center text-lg font-bold shrink-0">
                {(review.authorName || review.authorId).charAt(0).toUpperCase()}
              </div>
            )}

            {/* CONTENIDO */}
            <div className="flex-1">
              
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                
                <div>
                  <div className="flex items-center gap-2">
                    {/* NOMBRE REAL DEL USUARIO CLERK */}
                    <h3 className="font-semibold text-domus-text text-lg">
                      {review.authorName || `Usuario ${review.authorId.substring(0, 5)}`}
                    </h3>
                    <span className="text-xs bg-domus-primary-soft/30 text-domus-primary px-2 py-1 rounded-full font-medium">
                      Verificada
                    </span>
                  </div>

                  {/* FECHA FORMATEADA */}
                  <p className="text-sm text-domus-text-soft">
                    {new Date(review.createdAt).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                {/* ESTRELLAS */}
                <div className="flex items-center gap-1 text-2xl">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={
                        star <= review.rating
                          ? "text-domus-terracota"
                          : "text-domus-secondary"
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className="ml-2 text-sm font-semibold text-domus-text">
                    {review.rating}/5
                  </span>
                </div>
              </div>

              {/* COMENTARIO REAL DE LA DB */}
              <p className="mt-4 text-domus-text leading-relaxed">
                {review.content}
              </p>
            </div>
          </div>
        </article>
      ))}

      {reviews.length === 0 && (
        <p className="text-center text-domus-text-soft py-6">
          No hay reseñas para esta propiedad aún. ¡Sé el primero!
        </p>
      )}
    </div>
  );
}