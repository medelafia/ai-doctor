import { useState } from "react";

export default function AboutDiseases() {
  const [result, setResult] = useState(null);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h3 className="text-2xl font-semibold text-gray-800">
          Find appointment for disease provided by famous doctors and professors
        </h3>

        <div className="flex items-center mt-4 gap-3">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Enter the disease name"
          />
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-2 rounded-full w-1/4 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Search
          </button>
        </div>

        {result === null ? (
          <div className="py-12 my-8 text-center text-lg text-gray-700">
            Search to find appointment provided by most famous{" "}
            <span className="text-green-500 font-medium">doctors</span> in the
            world and the result will be computed by AI.
          </div>
        ) : (
          <div>{/* result content */}</div>
        )}
      </div>
    </div>
  );
}