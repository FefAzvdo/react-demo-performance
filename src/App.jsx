/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import { useState, useMemo } from "react";

const HeavyComponent = ({ numbers, useMemoMode }) => {
  const computeSum = () => {
    console.log("Calculating heavy sum...");
    let result = 0;
    for (let i = 0; i < 200_000_000; i++) {
      result += i % 2 === 0 ? 1 : 0;
    }
    return numbers.reduce((a, b) => a + b, 0);
  };

  const sum = useMemoMode
    ? useMemo(() => computeSum(), [numbers])
    : computeSum();

  return (
    <h2 className="text-xl font-bold text-indigo-600 mt-6">
      Sum {useMemoMode ? "WITH" : "WITHOUT"} useMemo: {sum}
    </h2>
  );
};

export default function App() {
  const [numbers, setNumbers] = useState([1, 2, 3]);
  const [clicks, setClicks] = useState(0);
  const [useMemoMode, setUseMemoMode] = useState(false);

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-extrabold  mb-2">React Performance Demo</h1>
      <p className=" mb-8 text-center">
        How the use of <span className="font-mono">useMemo</span> improves
        performance
      </p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <button
          onClick={() => {
            console.log("Click");
            setClicks((c) => c + 1);
          }}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-md shadow"
        >
          Click fast! Counter: {clicks}
        </button>

        <button
          onClick={() => setNumbers((prev) => [...prev, prev.length + 1])}
          className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md shadow"
        >
          Add number
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

      <ul className="flex gap-3 flex-wrap justify-center mb-6">
        {numbers.map((n, idx) => (
          <li
            key={idx}
            className="bg-white shadow px-3 py-1 rounded-md font-mono text-gray-800"
          >
            {n}
          </li>
        ))}
      </ul>

      <HeavyComponent numbers={numbers} useMemoMode={useMemoMode} />
    </div>
  );
}
