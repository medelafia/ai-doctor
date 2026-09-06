import { useEffect, useState } from "react";

export default function Symptoms({
  onClose,
  onChange,
  defaultSelected,
  allSymptoms,
}) {
  const [selected, setSelected] = useState(defaultSelected || []);
  const [symptoms, setSymptoms] = useState(allSymptoms || []);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSymptoms, setFilteredSymptoms] = useState(symptoms);

  // Filter symptoms based on search
  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = symptoms.filter((sym) =>
      sym.replaceAll("_", " ").toLowerCase().includes(query)
    );
    setFilteredSymptoms(filtered);
  }, [searchQuery, symptoms]);

  const select = (e) => {
    const checkbox = e.currentTarget.querySelector("input[type='checkbox']");
    if (checkbox) checkbox.click();
  };

  const onSelectCallback = (e) => {
    const checkbox = e.currentTarget;
    const value = checkbox.getAttribute("data-target");
    if (checkbox.checked) {
      setSelected((prev) => [...prev, value]);
    } else {
      setSelected((prev) => prev.filter((item) => item !== value));
    }
  };

  const toggleAll = () => {
    if (selected.length === filteredSymptoms.length) {
      setSelected([]);
    } else {
      setSelected(filteredSymptoms);
    }
  };

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const renderSymptoms = () => {
    return filteredSymptoms.map((sym) => (
      <div
        key={sym}
        className="cursor-pointer group relative"
        onClick={select}
      >
        <div className="bg-white border border-gray-200 rounded-lg p-4 flex items-start gap-3 hover:border-blue-300 hover:shadow-md transition-all duration-200">
          <input
            type="checkbox"
            checked={selected.includes(sym)}
            data-target={sym}
            onChange={onSelectCallback}
            className="cursor-pointer w-5 h-5 mt-0.5 accent-blue-600 rounded"
          />
          <div className="flex-1">
            <span className="text-gray-800 font-medium block">
              {sym.replaceAll("_", " ").trim()}
            </span>
            {selected.includes(sym) && (
              <span className="text-xs text-blue-600 font-semibold mt-1 flex items-center gap-1">
                <i className="fa-solid fa-check"></i> Selected
              </span>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <>
      {/* Backdrop with animation */}
      <div
        className="fixed inset-0 bg-black/50 z-40 animate-fade-in"
        onClick={onClose}
      ></div>

      {/* Modal with animation */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 w-[95%] sm:w-[90%] max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes scaleIn {
            from {
              opacity: 0;
              transform: translate(-50%, -50%) scale(0.95);
            }
            to {
              opacity: 1;
              transform: translate(-50%, -50%) scale(1);
            }
          }
          .animate-fade-in {
            animation: fadeIn 0.3s ease-out;
          }
          .animate-scale-in {
            animation: scaleIn 0.3s ease-out;
          }
        `}</style>

        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-blue-50 to-white">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">
                Select Your Symptoms
              </h3>
              <p className="text-sm text-gray-600">
                Choose all symptoms you're experiencing
              </p>
            </div>
            <button
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={onClose}
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-xl text-gray-400 hover:text-gray-600"></i>
            </button>
          </div>

          {/* Selection Counter */}
          {selected.length > 0 && (
            <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
              {selected.length} selected
            </div>
          )}
        </div>

        {/* Search and Controls */}
        <div className="border-b border-gray-200 p-6 bg-white space-y-4">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
            <input
              type="text"
              placeholder="Search symptoms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={toggleAll}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              {selected.length === filteredSymptoms.length
                ? "Deselect All"
                : "Select All"}
            </button>
            <button
              onClick={() => setSelected([])}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Symptoms Grid */}
        <div className="flex-1 overflow-y-auto p-6">
          {filteredSymptoms.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {renderSymptoms()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <i className="fa-solid fa-search text-5xl text-gray-300 mb-4"></i>
              <p className="text-gray-600 font-medium">No symptoms found</p>
              <p className="text-sm text-gray-500">
                Try a different search term
              </p>
            </div>
          )}
        </div>

        {/* Footer with Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-700 font-semibold bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-white font-semibold bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={selected.length === 0}
          >
            <span>Continue</span>
            <span className="ml-2 text-sm">({selected.length})</span>
          </button>
        </div>
      </div>
    </>
  );
}