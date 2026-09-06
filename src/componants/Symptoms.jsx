import { useEffect, useState } from "react";

export default function Symptoms({
  onClose,
  onChange,
  defaultSelected,
  allSymptoms,
}) {
  const [selected, setSelected] = useState(defaultSelected || []);
  const [symptoms, setSymptoms] = useState(allSymptoms || []);

  const select = (e) => {
    e.currentTarget.querySelector("input[type='checkbox']").click();
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

  useEffect(() => {
    onChange(selected);
  }, [selected, onChange]);

  const renderSymptoms = () => {
    return symptoms.map((sym) => (
      <div
        key={sym}
        className="cursor-pointer rounded border border-gray-300 mx-1 p-2 flex items-center my-1 bg-white hover:bg-gray-50 transition-colors"
        onClick={select}
      >
        <input
          type="checkbox"
          checked={selected.includes(sym)}
          data-target={sym}
          onChange={onSelectCallback}
          className="cursor-pointer"
        />
        <span className="ml-2 text-gray-700">
          {sym.replaceAll("_", " ").trim()}
        </span>
      </div>
    ));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl border border-gray-200 p-6 z-50 w-[90%] max-w-4xl h-[90vh] max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
        >
          <i className="fa-solid fa-x"></i>
        </button>

        <h3 className="text-xl font-semibold text-gray-800 capitalize mb-4">
          Symptoms List
        </h3>

        <div className="flex-1 overflow-y-auto flex flex-wrap content-start gap-2 p-1">
          {renderSymptoms()}
        </div>
      </div>
    </>
  );
}