import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodMesure from "./BloodMesure";
import Brand from "./Brand";
import LoadingComponants from "./LoadingComponants";

export default function BloodDisease() {
  const [bloodMesures, setBloodMesures] = useState([]);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [allBloodFeatures, setAllBloodFeatures] = useState([]);
  const [showBloodMesuresAlert, setShowBloodMesuresAlert] = useState(false);
  const navigate = useNavigate();

  const renderMeasures = () => {
    return bloodMesures.map((item, index) => (
      <tr key={index} className="hover:bg-gray-50 transition-colors">
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
          {item.name}
        </td>
        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
          {item.value}
        </td>
        <td className="px-4 py-3 whitespace-nowrap">
          <button
            className="text-red-400 hover:text-red-600 transition-colors"
            onClick={(e) =>
              setBloodMesures(
                bloodMesures.filter((val) => val.name !== item.name)
              )
            }
          >
            <i className="fa-solid fa-trash"></i>
          </button>
        </td>
      </tr>
    ));
  };

  useEffect(() => {
    fetch("https://ai-doctor-backend-jfoe.onrender.com/getBloodFeatures")
      .then((res) => res.json())
      .then((data) => {
        setAllBloodFeatures(data.features);
      });
  }, []);

  const predict = () => {
    setResultLoading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`https://ai-doctor-backend-jfoe.onrender.com/predictBloodDisease`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(bloodMesures),
    })
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
        setResultLoading(false);
      });
  };

  const handleAddMeasure = (measure) => {
    // Prevent duplicate measures
    const exists = bloodMesures.find((m) => m.name === measure.name);
    if (!exists) {
      setBloodMesures([...bloodMesures, measure]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Brand />
          <button
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <i className="fa-solid fa-arrow-left"></i> Back
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
            Blood Analysis Diagnosis
          </h1>
          <p className="mt-2 text-gray-500 max-w-2xl">
            Enter your blood test measurements and let our AI predict possible conditions.
          </p>
        </div>

        {/* Input card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-vial text-blue-500"></i>
            Enter your blood measures
          </h2>

          {bloodMesures.length === 0 ? (
            <div className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              <i className="fa-solid fa-flask text-4xl mb-3 block"></i>
              <p>No blood measures added yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Value
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {renderMeasures()}
                </tbody>
              </table>
            </div>
          )}

          <div className="flex flex-wrap gap-3 mt-6">
            <button
              className="flex-1 min-w-[140px] bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center gap-2 font-medium"
              onClick={() => setShowBloodMesuresAlert(true)}
            >
              <i className="fa-solid fa-plus"></i>
              Add measure
            </button>
            <button
              className="flex-1 min-w-[140px] bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg px-4 py-2.5 transition-colors flex items-center justify-center gap-2 font-medium"
              onClick={() => {
                setBloodMesures([]);
                setResult(null);
              }}
            >
              <i className="fa-solid fa-trash-can"></i>
              Clear all
            </button>
          </div>

          <button
            className={`w-full mt-6 py-3 px-4 rounded-xl text-white font-semibold transition-all transform ${
              bloodMesures.length === 0
                ? "bg-blue-300 cursor-not-allowed opacity-60"
                : "bg-gradient-to-r from-blue-600 to-teal-500 hover:shadow-lg hover:-translate-y-0.5"
            }`}
            disabled={bloodMesures.length === 0}
            onClick={predict}
          >
            <i className="fa-solid fa-microchip mr-2"></i>
            Predict now
          </button>
        </div>

        {/* Result section */}
        {(result != null || resultLoading) && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <i className="fa-solid fa-stethoscope text-blue-500"></i>
                Diagnosis Result
              </h3>
              <div className="mt-2 sm:mt-0">
                <select className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
                  <option value="en">English</option>
                  <option value="ar">Arabic</option>
                  <option value="fr">French</option>
                </select>
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 p-6">
              {resultLoading ? (
                <LoadingComponants />
              ) : (
                <div className="space-y-4">
                  <h4 className="text-2xl font-bold text-gray-800 capitalize">
                    {result?.name.replaceAll("_", " ")}
                  </h4>
                  <div>
                    <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                      <i className="fa-solid fa-circle-info text-blue-500 text-sm"></i>
                      Definition
                    </h5>
                    <p className="text-gray-600 mt-1">
                      {result?.definition || "No definition provided."}
                    </p>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-700 flex items-center gap-2">
                      <i className="fa-solid fa-triangle-exclamation text-amber-500 text-sm"></i>
                      Causes
                    </h5>
                    <p className="text-gray-600 mt-1">
                      {result?.causes || "No causes provided."}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Blood Measure Modal */}
      {showBloodMesuresAlert && (
        <BloodMesure
          onClose={() => setShowBloodMesuresAlert(false)}
          onSuccess={handleAddMeasure}
          uncheckedNames={allBloodFeatures}
          checkedNames={bloodMesures.map((m) => m.name)}
        />
      )}
    </div>
  );
}