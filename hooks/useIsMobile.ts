import { useEffect, useState } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
    };

    check();

    window.addEventListener("resize", check);

    return () =>
      window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

//para detectar uso de mobile y hacer la pagina responsive quitando en cada componente que tenga efectos visuales (relentiza la version mobile de la pagina).