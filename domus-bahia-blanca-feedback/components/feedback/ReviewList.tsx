export default function ReviewList() {
  const reviews = [ //PROVISORIAS, ESTO LUEGO SE RESCATA DE LA BASE DE DATOS.
    {
      id: 1,
      name: "María P.",
      rating: 5,
      date: "Hace 3 días",
      verified: true,
      comment:
        "La propiedad estaba en excelente estado y la atención fue impecable. El agente respondió todas mis dudas y nos permitió recorrer cada ambiente con tranquilidad.",
    },
    {
      id: 2,
      name: "Lucas F.",
      rating: 4,
      date: "Hace 1 semana",
      verified: true,
      comment:
        "Muy buena ubicación y buena predisposición durante la visita. Me hubiera gustado recibir más información sobre las expensas y servicios del edificio.",
    },
    {
      id: 3,
      name: "Agustina V.",
      rating: 3,
      date: "Hace 2 semanas",
      verified: true,
      comment:
        "La visita estuvo bien organizada, aunque algunos detalles del inmueble no coincidían del todo con las fotos publicadas.",
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {reviews.map((review) => (
        < article
          key={review.id}
          className="bg-white border border-domus-secondary rounded-2xl p-5 transition-all hover:shadow-md"
          >
          <div className="flex flex-col md:flex-row md:items-start gap-5">
            
            {/* AVATAR */}
            <div
              className="w-14 h-14 rounded-full bg-domus-primary text-white flex items-center justify-center text-lg font-bold shrink-0"
            >
              {review.name.charAt(0)}
            </div>

            {/* CONTENIDO */}
            <div className="flex-1">
              
              {/* HEADER */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-domus-text text-lg">
                      {review.name}
                    </h3>

                    {review.verified && (
                      <span
                        className="text-xs bg-domus-primary-soft/30 text-domus-primary px-2 py-1 rounded-full font-medium"
                      >
                        Verificada
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-domus-text-soft">
                    {review.date}
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

              {/* COMMENT */}
              <p className="mt-4 text-domus-text leading-relaxed">
                {review.comment}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}