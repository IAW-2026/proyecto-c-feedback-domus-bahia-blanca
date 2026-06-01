# Domus Bahía Blanca — Sistema de Feedback

## Deploy

[https://proyecto-c-feedback-domus-bahia-bla.vercel.app](https://proyecto-c-feedback-domus-bahia-bla.vercel.app/)

---

## Usuarios de prueba

| Rol    | Email                     | Contraseña |
|--------|---------------------------|------------|
| Admin  | admin+clerk_test@iaw.com  | iawuser#   |
| Seller | seller+clerk_test@iaw.com | iawuser#   |
| Buyer  | buyer+clerk_test@iaw.com  | iawuser#   |
| Agente | agente+clerk_test@iaw.com | iawuser#   |

---

## Instrucciones de uso

1. Ingresar al [link de producción](https://proyecto-c-feedback-domus-bahia-bla.vercel.app/).

2. Iniciar sesión con alguno de los usuarios de prueba según el rol que se quiera evaluar.

3. **Como buyer:** ir a "Dejar una reseña", seleccionar una propiedad, completar el formulario con puntuación y comentario, y publicar.
También tiene la opción de ver todas las reseñas que ya existen con un resumen de puntuaciones sin la necesidad de tener que dejar una el usuario en sí.

4. **Como seller:** ir a "Dejar una reseña", al ingresar a una propiedad, se habilita la opción de responder reseñas de visitantes directamente desde el panel de reseñas históricas. En un escenario real un seller NO ACCEDE AL RESUMEN DE RESEÑAS desde esta aplicación, lo hace desde su dashboard en seller-app. Hago este camino para que se pueda
apreciar desde mi aplicación el panel que vería un seller; una vez conectadas las apps, el seller solo accederá a este panel si la publicación es de sí mismo, y lo hará
viajando desde la seller-app, no desde esta misma app.

5. **Como admin:** acceder al Panel Admin desde el botón en el navbar (solo visible para administradores). Desde ahí se puede ver el resumen general, el ranking de propiedades y gestionar todas las reseñas del sistema así como buscarlas por nombre o texto de la reseña en sí, como eliminarla también.

6. **Como agente inmobiliario:** se comporta exactamente igual que un seller. Ante los ojos de mi app, le da lo mismo quien accede entre los agentes y los sellers, siempre
y cuando pertenezcan a la misma inmobiliaria que hizo la publicación (tarea a realizar).
---

## 📝 Descripción del proyecto

Domus Bahía Blanca desde la app de feedback es una plataforma de reseñas inmobiliarias orientada al mercado local. Permite a compradores y visitantes dejar reseñas verificadas sobre propiedades, ayudando a otros usuarios a tomar decisiones más informadas basadas en experiencias reales.

El sistema contempla tres roles diferenciados: compradores (buyers), que pueden dejar y consultar reseñas; vendedores (sellers), que pueden responder a las opiniones sobre sus propiedades; y administradores, que tienen acceso a un panel de gestión con estadísticas generales y herramientas de moderación.

La aplicación fue construida con Next.js 16.2.4, Prisma 7.8.0, Supabase (PostgreSQL) y Clerk para la autenticación. El diseño está orientado a brindar una experiencia fluida tanto en desktop como en mobile, con animaciones adaptativas según el dispositivo.

---

## 📌 Notas para la corrección

Arquitectura y componentización: la landing page está dividida en componentes independientes (HeroSection, TopRatedSection, FooterSection, Navbar, SectionTitle) con el objetivo de tener control granular sobre el diseño, los efectos de scroll y la reusabilidad. Los clientes de cada rol (BuyerFeedbackClient, SellerFeedbackClient, PublicPropertyReviewsClient) son componentes separados que reciben el mismo targetId pero renderizan experiencias distintas según el rol detectado en el servidor antes de hacer el render.

Animaciones y rendimiento: se implementó un hook useIsMobile que detecta el ancho de pantalla en el cliente y desactiva todos los efectos de blur, escala y desplazamiento en dispositivos móviles, reemplazándolos por transiciones instantáneas. En desktop, las animaciones usan framer-motion con useScroll y useTransform para efectos de parallax y fade adaptados a la altura de cada pantalla.

Actualmente, la función que se encarga de revisar si un buyer puede o no dar reseña de cierta publicación "checkIfUserCanReview" está comentada debido a que dicha confirmación me llega desde una de las aplicaciones agenas a la mía; en la etapa de integración esta función cobrará sentido.