import React, { useState, useEffect } from "react"; // Importe useState e useEffect
import reactLogo from "../assets/react.svg";

const MemoizedLogo = ({ onClick }) => {
  // Log para nós, desenvolvedores
  console.log("Rendered MemoizedLogo!");

  // Estado para controlar a classe da animação
  const [isRendering, setIsRendering] = useState(false);

  useEffect(() => {
    // Quando o componente renderiza (ou re-renderiza), ativamos a animação
    setIsRendering(true);

    // Após a animação terminar (750ms), removemos a classe para que
    // ela possa ser adicionada novamente na próxima renderização.
    const timer = setTimeout(() => {
      setIsRendering(false);
    }, 750);

    // Função de limpeza para evitar memory leaks se o componente for desmontado
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setIsRendering(true);
    const timer = setTimeout(() => setIsRendering(false), 750);
    return () => clearTimeout(timer);
  }, [onClick]);

  return (
    <div
      // Aplica a classe de animação condicionalmente
      className={`border-black text-center p-4 border-2 rounded-lg ${
        isRendering ? "render-flash-animation" : ""
      }`}
    >
      <p className="text-sm text-gray-500 mb-2">
        This component is wrapped in `React.memo`.
      </p>
      <img
        src={reactLogo}
        className="w-24 h-24 mx-auto cursor-pointer"
        alt="React logo"
        onClick={onClick}
      />
      <p className="text-xs text-red-500 font-semibold mt-2 h-4">
        {isRendering ? "...RE-RENDERING!" : ""}
      </p>
    </div>
  );
};

export default React.memo(MemoizedLogo);
