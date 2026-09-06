import { useState, useRef } from "react";

export default function BloodMesure({
  onClose,
  onSuccess,
  uncheckedNames,
  checkedNames,
}) {
  const nameRef = useRef();
  const valueRef = useRef();
  const [error, setError] = useState(null);

  const add = () => {
    if (nameRef.current.value !== "" && valueRef.current.value !== "") {
      const value = valueRef.current.value;
      if (!Number.isNaN(value)) {
        onSuccess({
          name: nameRef.current.value,
          value: Number.parseFloat(value),
        });
        onClose();
      } else {
        setError("Invalid field format. Please enter a valid number.");
      }
    } else {
      setError("All fields are required.");
    }
  };

  const renderNames = () => {
    return uncheckedNames.map(
      (item) =>
        !checkedNames.find((val) => val === item) && (
          <option key={item} value={item}>
            {item}
          </option>
        )
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl p-6 z-50 w-[90%] max-w-md transition-all duration-300 animate-fadeIn"
        style={{ animation: "fadeIn 0.2s ease-out" }}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <i className="fa-solid fa-x"></i>
        </button>

        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-teal-400 flex items-center justify-center text-white shadow-md">
            <i className="fa-solid fa-vial"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-800">Add Blood Measure</h3>
        </div>

        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-xl relative mb-4 flex justify-between items-center">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{error}</span>
            </span>
            <button
              className="text-rose-500 hover:text-rose-700"
              onClick={() => setError(null)}
            >
              &times;
            </button>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Name
          </label>
          <select
            className="block w-full border border-gray-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            ref={nameRef}
          >
            {renderNames()}
          </select>
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">
            Value
          </label>
          <input
            type="text"
            className="block w-full border border-gray-300 rounded-xl shadow-sm py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="e.g., 120"
            ref={valueRef}
          />
        </div>

        <button
          className="w-full bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white font-semibold py-3 px-4 rounded-xl transition-all transform hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
          onClick={add}
        >
          <i className="fa-solid fa-plus"></i>
          Add Measure
        </button>
      </div>

      {/* Add fade-in keyframes in your global CSS or use a Tailwind plugin */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </>
  );
}