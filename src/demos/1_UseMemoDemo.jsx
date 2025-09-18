import { useState } from "react";
import HeavyComponent from "../components/HeavyComponent";

export default function UseMemoDemo() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [clicks, setClicks] = useState(0);
  const [useMemoMode, setUseMemoMode] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">Demo: `useMemo`</h1>
      <p className="mb-6 text-center text-gray-600">
        Prevents re-calculating expensive values on every render.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => setClicks((c) => c + 1)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md shadow"
        >
          Click fast! Counter: {clicks}
        </button>
        <button
          onClick={() => setNumbers((prev) => [...prev, prev.length + 1])}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow"
        >
          Add number (triggers re-calculation)
        </button>
        <label className="flex items-center gap-2 mt-2 sm:mt-0">
          <input
            type="checkbox"
            checked={useMemoMode}
            onChange={() => setUseMemoMode((prev) => !prev)}
            className="w-5 h-5 accent-indigo-500"
          />
          Enable useMemo
        </label>
      </div>

      <HeavyComponent numbers={numbers} useMemoMode={useMemoMode} />
    </div>
  );
}
