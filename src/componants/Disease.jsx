import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Brand from "./Brand";
import LoadingComponants from "./LoadingComponants";
import Symptoms from "./Symptoms";

export default function Disease() {
  const [symptoms, setSymptoms] = useState([]);
  const [showSymsList, setShowSymsList] = useState(false);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const navigate = useNavigate();

  const deleteFromSymsList = (e) => {
    setSymptoms(
      symptoms.filter(
        (sym) => sym !== e.currentTarget.getAttribute("data-target")
      )
    );
  };

  const renderSymptoms = () => {
    return symptoms.map((sym, index) => (
      <div
        key={index}
        className="inline-flex items-center gap-2 bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-full px-4 py-2 transition-all group"
      >
        <span className="text-sm font-medium text-blue-900">
          {sym.replaceAll("_", " ").trim()}
        </span>
        <button
          className="text-blue-400 hover:text-blue-600 hover:bg-blue-200 rounded-full p-1 transition-all"
          data-target={sym}
          onClick={deleteFromSymsList}
          aria-label={`Remove ${sym}`}
        >
          <i className="fa-solid fa-xmark text-xs"></i>
        </button>
      </div>
    ));
  };

  useEffect(() => {
    fetch(
      "https://ai-doctor-backend-jfoe.onrender.com/getSymptoms"
    )
      .then((res) => res.json())
      .then((data) => setAllSymptoms(data.symptoms));
  }, []);

  const predict = () => {
    setResultLoading(true);
    const searchParams = new URLSearchParams({
      symptoms: symptoms.join(","),
    }).toString();
    fetch(
      `https://ai-doctor-backend-jfoe.onrender.com/predictDisease?${searchParams}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setResult(data);
        setResultLoading(false);
      });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Brand />
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-700 transition-colors font-medium rounded-lg hover:bg-gray-50"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Symptom Analysis
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Select your symptoms and get AI-powered diagnostic suggestions based on clinical data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left: Symptom Selection */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                  <i className="fa-solid fa-list-check text-blue-700"></i>
                </div>
                Your Symptoms
              </h2>

              {/* Symptoms List */}
              <div className="min-h-32 mb-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                {symptoms.length === 0 ? (
                  <div className="text-center py-8 text-gray-400">
                    <i className="fa-solid fa-inbox text-3xl mb-2 block"></i>
                    <p className="text-sm">No symptoms selected</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {renderSymptoms()}
                  </div>
                )}
              </div>

              {/* Counter */}
              {symptoms.length > 0 && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-900 font-semibold">
                    {symptoms.length} symptom{symptoms.length !== 1 ? "s" : ""} selected
                  </p>
                </div>
              )}

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  onClick={() => setShowSymsList(true)}
                >
                  <i className="fa-solid fa-plus"></i>
                  Add symptoms
                </button>
                <button
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    symptoms.length === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-green-700 hover:bg-green-800 text-white"
                  }`}
                  disabled={symptoms.length === 0}
                  onClick={predict}
                >
                  <i className="fa-solid fa-microchip"></i>
                  Analyze Symptoms
                </button>
                {symptoms.length > 0 && (
                  <button
                    className="w-full border-2 border-red-200 text-red-600 hover:bg-red-50 font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    onClick={() => {
                      setSymptoms([]);
                      setResult(null);
                    }}
                  >
                    <i className="fa-solid fa-trash-can"></i>
                    Clear all
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2">
            {resultLoading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">
                  Analyzing Your Symptoms...
                </h3>
                <LoadingComponants />
              </div>
            ) : result ? (
              <div className="space-y-6">
                {/* Result Card */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Header with disease name */}
                  <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border-b border-gray-200 p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full border-2 border-blue-200">
                        <i className="fa-solid fa-stethoscope text-2xl text-blue-700"></i>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 capitalize">
                          {result?.name.replaceAll("_", " ")}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          Based on {symptoms.length} symptom{symptoms.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 space-y-8">
                    {/* Definition */}
                    {result?.definition && (
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <i className="fa-solid fa-circle-info text-blue-700 text-sm"></i>
                          </div>
                          What is it?
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result?.definition}
                        </p>
                      </div>
                    )}

                    {/* Causes */}
                    {result?.causes && (
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
                            <i className="fa-solid fa-triangle-exclamation text-amber-700 text-sm"></i>
                          </div>
                          Causes & Details
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result?.causes}
                        </p>
                      </div>
                    )}

                    {/* Precautions */}
                    {result?.precaution && (
                      <div>
                        <h4 className="font-bold text-gray-900 flex items-center gap-3 mb-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full">
                            <i className="fa-solid fa-shield-halved text-green-700 text-sm"></i>
                          </div>
                          Recommended Precautions
                        </h4>
                        <p className="text-gray-700 leading-relaxed">
                          {result?.precaution}
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                  <p className="text-sm text-amber-900">
                    <strong>Important:</strong> This analysis is for educational purposes only and should not replace professional medical advice. Always consult with a healthcare provider for diagnosis and treatment.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 text-center">
                <i className="fa-solid fa-flask-vial text-5xl text-gray-300 mb-4 block"></i>
                <p className="text-gray-600 text-lg">
                  Select symptoms and click "Analyze Symptoms" to get diagnostic suggestions
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Symptoms Modal */}
      {showSymsList && (
        <Symptoms
          onClose={() => setShowSymsList(false)}
          onChange={setSymptoms}
          defaultSelected={symptoms}
          allSymptoms={allSymptoms}
        />
      )}
    </div>
  );
}