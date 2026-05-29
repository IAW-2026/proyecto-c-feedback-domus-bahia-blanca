import Link from "next/link";
import { Home, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-domus-bg flex flex-col items-center justify-center px-6 text-center">
      <div className="max-w-md w-full bg-domus-card border border-domus-secondary rounded-3xl p-10 shadow-xl flex flex-col items-center">
        
        {/* ICONO */}
        <div className="w-20 h-20 rounded-full bg-domus-terracota/10 flex items-center justify-center text-domus-terracota mb-6">
          <FileQuestion size={40} />
        </div>

        {/* TEXTO */}
        <h1 className="text-7xl font-extrabold text-domus-primary tracking-tight">
          404
        </h1>
        
        <h2 className="text-2xl font-bold text-domus-text mt-4">
          Página en construcción
        </h2>
        
        <p className="text-domus-text-soft mt-3 leading-relaxed">
          La ruta que intentás visitar no existe o corresponde a un módulo que aún está en desarrollo por el equipo.
        </p>

        {/* BOTÓN DE RETORNO */}
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 bg-domus-primary text-white px-6 py-3 rounded-2xl hover:bg-domus-primary-mid transition shadow-md font-semibold cursor-pointer"
        >
          <Home size={18} />
          Volver al inicio
        </Link>
        
      </div>
    </main>
  );
}