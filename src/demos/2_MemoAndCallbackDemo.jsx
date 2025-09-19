import { useState, useCallback } from "react";
import MemoizedLogo from "../components/MemoizedLogo";

export default function MemoAndCallbackDemo() {
  const [count, setCount] = useState(0);
  const [useCallbackMode, setUseCallbackMode] = useState(false);

  // Função SEM useCallback: uma nova instância é criada a cada renderização.
  const handleLogoClick_NoCallback = () => {
    alert("Logo clicked! (Function without useCallback)");
  };

  // Função COM useCallback: a mesma instância é reutilizada.
  const handleLogoClick_WithCallback = useCallback(() => {
    alert("Logo clicked! (Function WITH useCallback)");
  }, []); // Array de dependências vazio

  const activeClickHandler = useCallbackMode
    ? handleLogoClick_WithCallback
    : handleLogoClick_NoCallback;

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">
        Demo: `React.memo` + `useCallback`
      </h1>
      <p className="mb-6 text-center text-gray-600">
        `useCallback` prevents re-creating functions, allowing `React.memo` to
        work correctly.
      </p>
      <p className="mb-4 text-center text-red-500 font-semibold">
        Open the console to view the rendering logs!
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
        <button
          onClick={() => setCount((c) => c + 1)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md shadow"
        >
          Re-render Parent. Count: {count}
        </button>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={useCallbackMode}
            onChange={() => setUseCallbackMode((prev) => !prev)}
            className="w-5 h-5 accent-blue-500"
          />
          Enable useCallback
        </label>
      </div>

      <div className="mt-4 p-4 border-2 border-dashed rounded-lg">
        <MemoizedLogo onClick={activeClickHandler} />
      </div>
      <p className="mt-4 text-sm">
        When `useCallback` is <strong>disabled</strong>, the logo component
        re-renders on every counter click. This is because a new `onClick`
        function is created every time the parent re-renders. `React.memo` sees
        a "new" function in the props and is forced to re-render its child.
      </p>
      <p className="mt-4 text-sm">
        When `useCallback` is <strong>enabled</strong>, the logo component only
        renders once. `useCallback` provides the *exact same function instance*
        across re-renders. `React.memo` sees that the `onClick` prop is
        identical and correctly skips the re-render.
      </p>
    </div>
  );
}
