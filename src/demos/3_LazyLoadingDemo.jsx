// src/demos/3_LazyLoadingDemo.jsx

import React, { useState, Suspense } from "react";

// CORREÇÃO:
// 1. REMOVEMOS a importação estática do topo do arquivo.
// 2. Usamos React.lazy com a função de import() dinâmica.
// Isso diz ao Vite para criar um "chunk" separado para o HeavyComponent.
const LazyHeavyComponent = React.lazy(() =>
  import("../components/HeavyComponent")
);

export default function LazyLoadingDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">
        Demo: `React.lazy` + `Suspense`
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Carrega componentes apenas quando são necessários, reduzindo o tamanho
        do bundle inicial.
      </p>
      <p className="mb-4 text-center text-red-500 font-semibold">
        Abra a aba "Network" no DevTools e clique no botão!
      </p>

      <button
        onClick={() => setShow(true)}
        className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md shadow"
        disabled={show}
      >
        {show ? "Componente Carregado" : "Carregar Componente Pesado"}
      </button>

      <div className="mt-6 w-full min-h-[8rem] flex items-center justify-center border-2 border-dashed rounded-lg p-4">
        {show && (
          <Suspense
            fallback={
              <div className="text-xl font-bold">
                🌀 Carregando componente...
              </div>
            }
          >
            {/* Agora, quando 'show' se torna true, o React tentará renderizar este componente.
                Como ele ainda não foi carregado, o Suspense mostrará o fallback,
                e o React disparará a requisição de rede para buscar o arquivo do componente. */}
            <LazyHeavyComponent numbers={[1, 2, 3, 4, 5]} useMemoMode={true} />
          </Suspense>
        )}
        {!show && (
          <p className="text-gray-500">O componente será carregado aqui.</p>
        )}
      </div>
      <p className="mt-4 text-center text-sm">
        Ao clicar no botão, observe a aba "Network": um novo arquivo `.js`
        (chunk) será baixado.
      </p>
    </div>
  );
}
