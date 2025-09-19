/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */

import { useMemo } from "react";

export default function HeavyComponent({ numbers, useMemoMode }) {
  const computeSum = () => {
    console.log("Calculating heavy sum...");
    let result = 0;
    for (let i = 0; i < 900_000_000; i++) {
      result += i % 2 === 0 ? 1 : 0;
    }

    console.log("result of heavy calc:", result);
    return numbers.reduce((a, b) => a + b, 0);
  };

  const sum = useMemoMode
    ? useMemo(() => computeSum(), [numbers])
    : computeSum();

  return (
    <>
      <div className="flex flex-wrap gap-4">
        {numbers.map((num, index) => (
          <>
            <span className="font-bold text-xl border-2 border-black bg-blue-500 text-white p-2 rounded">
              {num}
            </span>
            {index !== numbers.length - 1 && (
              <strong className="text-4xl">+</strong>
            )}
          </>
        ))}
      </div>
      <h2 className="text-xl font-bold text-indigo-600 mt-6">
        Sum {useMemoMode ? "WITH" : "WITHOUT"} useMemo: {sum}
      </h2>
    </>
  );
}
