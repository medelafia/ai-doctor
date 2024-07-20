import { useEffect } from "react";
import { useState } from "react";
import Brand from "./Brand";
import LoadingComponants from "./LoadingComponants";
import Symptoms from "./Symptoms";

export default function Disease() {
  const [symptoms, setSymptoms] = useState([]);
  const [showSymsList, setShowSymsList] = useState(false);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [allSymptoms, setAllSymptoms] = useState([]);
  const deleteFromSymsList = (e) => {
    setSymptoms(
      symptoms.filter(
        (sym) => sym != e.currentTarget.getAttribute("data-target")
      )
    );
  };
  const renderSymptoms = () => {
    return symptoms.map((sym, index) => (
      <div className="ps-3 pe-1 d-flex align-items-center justify-content-center border rounded mx-1 my-1">
        <span>{sym.replaceAll("_", " ").trim()}</span>
        <button className="btn" data-target={sym} onClick={deleteFromSymsList}>
          <i class="fa-solid fa-x" style={{ fontSize: "0.6rem" }}></i>
        </button>
      </div>
    ));
  };
  useEffect(() => {
    fetch("http://localhost:8000/getSymptoms")
      .then((res) => res.json())
      .then((data) => setAllSymptoms(data.symptoms));
  }, []);
  const predict = () => {
    setResultLoading(true);
    const searchParams = new URLSearchParams({
      symptoms: symptoms.join(","),
    }).toString();
    fetch(`http://localhost:8000/predictDisease?${searchParams}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setResult(data);
        setResultLoading(false);
      });
  };
  return (
    <div className="bg-light position-relative" style={{ minHeight: "100vh" }}>
      {showSymsList && (
        <Symptoms
          onClose={() => setShowSymsList(false)}
          onChange={(e) => setSymptoms(e)}
          defaultSelected={symptoms}
          allSymptoms={allSymptoms}
        />
      )}
      <div className="container py-3">
        <Brand />
        <h4 className="mt-5">
          Let's diagnosis your disease, its cause, and some precaution
        </h4>

        <div className="my-5">
          <h6>please choose you symptoms</h6>
          <div className="my-3 rounded border p-3">
            {symptoms.length == 0 ? (
              <span className="text-center d-block my-3">no symptoms</span>
            ) : (
              <div className="d-flex flex-wrap overflow-auto my-3">
                {renderSymptoms()}
              </div>
            )}
            <div className="w-100 d-flex mt-2">
              <button
                className="w-100 btn btn-outline-dark me-1"
                onClick={() => setShowSymsList(true)}
              >
                <i class="fa-solid fa-plus me-2"></i>
                add symptoms
              </button>
              <button
                className="w-100 btn btn-outline-danger ms-1"
                onClick={() => {
                  setSymptoms([]);
                  setResult(null);
                }}
              >
                <i class="fa-solid fa-trash me-2"></i>
                clear
              </button>
            </div>
          </div>
          <button
            className="btn btn-primary w-100"
            disabled={symptoms.length == 0}
            onClick={predict}
          >
            predict now !
          </button>
        </div>
        {(result != null || resultLoading) && (
          <div className="my-5">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <h3 className="bold text-capitalize">result</h3>
              <select name="" id="" className="form-select w-25">
                <option value="en">english</option>
                <option value="ar">arabic</option>
                <option value="fr">french</option>
              </select>
            </div>
            <div className="rounded border p-3">
              {resultLoading ? (
                <LoadingComponants />
              ) : (
                <>
                  <h3 className="text-capitalize mb-4">
                    {result?.name.replaceAll("_", " ")}
                  </h3>
                  {result?.definition != null && <div>
                    <h6>
                      the definition of {result?.name.replaceAll("_", " ")} :{" "}
                    </h6>
                    <p>{result?.definition != null && result?.definition}</p>
                  </div> }
                  {result?.causes != null && <div>
                    <h6>
                      detailled article for  {result?.name.replaceAll("_", " ")} :{" "}
                    </h6>
                    <p>
                      {result?.causes}
                    </p>
                  </div> }
                  {result?.precaution != null &&  <div>
                    <h6>
                      Precautions to avoid {result?.name.replaceAll("_", " ")} :{" "}
                    </h6>
                    <p>
                      {result?.precaution}
                    </p>
                  </div>}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
