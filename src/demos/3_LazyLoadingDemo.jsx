import React, { useState, Suspense } from "react";

// Point the lazy import to the new, super heavy component.
// This tells Vite to create a separate "chunk" for it.
const LazySuperHeavyComponent = React.lazy(() =>
  import("../components/SuperHeavyComponent")
);

export default function LazyLoadingDemo() {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-2">
        Demo: `React.lazy` + `Suspense`
      </h1>
      <p className="mb-6 text-center text-gray-600">
        Loads "heavy" components (with a large file size) only when they are
        needed.
      </p>

      {/* Instructions Box */}
      <div
        className="bg-blue-100 border border-blue-400 text-blue-800 px-4 py-3 rounded-lg relative mb-6 w-full max-w-2xl"
        role="alert"
      >
        <strong className="font-bold">How to Test:</strong>
        <ol className="list-decimal list-inside mt-2 space-y-1">
          <li>
            Open DevTools (F12) and go to the <strong>"Network"</strong> tab.
          </li>
          <li>
            Check the <strong>"Disable cache"</strong> box to ensure the file is
            re-downloaded.
          </li>
          <li>
            Click the filter icon and select <strong>"JS"</strong> to see only
            JavaScript requests.
          </li>
          <li>
            Simulate a poor connection: change "No throttling" to{" "}
            <strong>"Slow 3G"</strong>.
          </li>
          <li>
            Click the button below and watch the new JS file appear in the
            Network tab!
          </li>
          <li>Press F5 to do a new test.</li>
        </ol>
      </div>

      <button
        onClick={() => setShow(true)}
        className="bg-purple-500 hover:bg-purple-600 text-white px-5 py-2 rounded-md shadow text-lg"
        disabled={show}
      >
        {show ? "Component Loaded!" : "Load Super Heavy Component"}
      </button>

      <div className="mt-6 w-full min-h-[15rem] flex items-center justify-center border-2 border-dashed rounded-lg p-4">
        {show && (
          <Suspense
            fallback={
              <div className="text-center">
                <p className="text-2xl font-bold animate-pulse text-purple-600">
                  🌀 Loading...
                </p>
                <p className="text-gray-500 mt-2">
                  (Simulating slow network. Check the Network tab!)
                </p>
              </div>
            }
          >
            <LazySuperHeavyComponent />
          </Suspense>
        )}
        {!show && (
          <p className="text-gray-500">The component will be loaded here.</p>
        )}
      </div>
    </div>
  );
}
