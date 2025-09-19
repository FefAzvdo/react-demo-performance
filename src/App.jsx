import { useState, Suspense } from "react"; // Adicione Suspense aqui!
import UseMemoDemo from "./demos/1_UseMemoDemo";
import MemoAndCallbackDemo from "./demos/2_MemoAndCallbackDemo.jsx";
import LazyLoadingDemo from "./demos/3_LazyLoadingDemo";
import "./index.css";

// CORREÇÃO: Armazenamos a referência ao componente, não o elemento JSX.
// Note que não estamos mais usando < /> aqui.
const demos = {
  useMemo: { name: "1. useMemo", Component: UseMemoDemo }, // 'Component' com 'C' maiúsculo
  memoCallback: {
    name: "2. React.memo + useCallback",
    Component: MemoAndCallbackDemo,
  },
  lazyLoading: { name: "3. Lazy Loading", Component: LazyLoadingDemo },
};

export default function App() {
  const [activeDemo, setActiveDemo] = useState("useMemo");
  const ActiveComponent = demos[activeDemo].Component;

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-start py-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <header className="w-full max-w-5xl mb-8">
        <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-4">
          React Performance Playground
        </h1>
        <nav className="flex flex-wrap justify-center gap-3 bg-white p-3 rounded-xl shadow-md">
          {Object.keys(demos).map((key) => (
            <button
              key={key}
              onClick={() => setActiveDemo(key)}
              className={`cursor-pointer px-4 py-2 rounded-lg font-semibold transition-colors duration-200 ${
                activeDemo === key
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-indigo-200"
              }`}
            >
              {demos[key].name}
            </button>
          ))}
        </nav>
      </header>

      <main className="w-full max-w-5xl p-6 bg-white rounded-xl shadow-lg">
        <Suspense
          fallback={
            <div className="text-xl font-bold text-center">
              🌀 Loading Demo...
            </div>
          }
        >
          <ActiveComponent />
          {activeDemo === "useMemo" && (
            <div className="flex flex-col w-full justify-center items-center bg-red">
              <p className="mt-4 text-sm">
                When `useMemo` is <strong>disabled</strong>, the counter lags.
                This happens because every click forces the HeavyComponent (Sum
                Component) to re-run its expensive calculation, blocking the
                browser from updating the screen until the calculation is
                finished.
              </p>
              <p className="mt-4 text-sm">
                When `useMemo` is <strong>enabled</strong>, the counter is fast.
                The HeavyComponent (Sum Component) still re-renders, but useMemo
                skips the expensive calculation and returns the cached result.
                This keeps the browser free to update the screen instantly.
              </p>
            </div>
          )}
        </Suspense>
      </main>
    </div>
  );
}
