import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodMesure from "./BloodMesure";
import Brand from "./Brand";
import LoadingComponants from "./LoadingComponants";
import Symptoms from "./Symptoms";

export default function BloodDisease() {
  const [bloodMesures, setBloodMesures] = useState([]);
  const [result, setResult] = useState(null);
  const [resultLoading, setResultLoading] = useState(false);
  const [allBloodFeatures , setAllBloodFeatures] = useState([]);
  const [ showBloodMesuresAlert , setShowBloodMesuresAlert] = useState(false)
  const navigate = useNavigate() 
  const renderSymptoms = () => {
    return bloodMesures.map((item, index) => (
      <tr>
        <td>{item.name} </td>
        <td>{item.value} </td>
        <td>
            <button data-target={item.name} className="btn me-1" onClick={(e)=>setBloodMesures(bloodMesures.filter((val , idx) => val.name != e.currentTarget.getAttribute("data-target")))}><i class="fa-solid fa-trash text-danger"></i></button>
        </td>
      </tr>
    ));
  };
  useEffect(() => {
    fetch("http://localhost:8000/getBloodFeatures")
      .then((res) => res.json())
      .then((data) =>  {
        setAllBloodFeatures(data.features)
      });
  }, []);
  const predict = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    fetch(`http://localhost:8000/predictBloodDisease` , {
        method : "POST" , 
        headers: myHeaders , 
        body : JSON.stringify(bloodMesures)
    })
    .then((res) => res.json())
    .then((data) => {
        setResult(data);
        setResultLoading(false);
      });
  };
  useEffect(()=>{
    console.log(allBloodFeatures.concat(bloodMesures.map((val , idx) => val.name)))
    }, [bloodMesures] )
  return (
    <div className="bg-light position-relative" style={{ minHeight: "100vh" }}>
        {
            showBloodMesuresAlert && 
            <BloodMesure uncheckedNames={allBloodFeatures} checkedNames={bloodMesures.map((val , idx) => val.name)} onClose={()=>setShowBloodMesuresAlert(false)} onSuccess={(e)=>setBloodMesures([...bloodMesures , e ])}/> 
        }

      <div className="container py-3">
        <Brand />
        <h4 className="mt-5">Let's diagnosis your blood analysis</h4>

        <div className="my-5">
          <h6>please choose you symptoms</h6>
          <div className="my-3 rounded border p-3">
            {bloodMesures.length == 0 ? (
              <span className="text-center d-block my-3">no blood mesures</span>
            ) : (
              <table className="table my-3">
                <tr className="text-capitalize">
                    <th>name</th>
                    <th>value</th>
                    <th>action</th>
                </tr>
                <tbody>
                {renderSymptoms()}
                </tbody>
              </table>
            )}
            <div className="w-100 d-flex mt-2">
              <button
                className="w-100 btn btn-outline-dark me-1"
                onClick={()=>setShowBloodMesuresAlert(true)}
              >
                <i class="fa-solid fa-plus me-2"></i>
                add analyse mesure
              </button>
              <button
                className="w-100 btn btn-outline-danger ms-1"
                onClick={() => {
                  setBloodMesures([]);
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
            disabled={bloodMesures.length == 0}
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
                  <div>
                    <h6>
                      the definition of {result?.name.replaceAll("_", " ")} :{" "}
                    </h6>
                    <p>{result?.definition != null && result?.definition}</p>
                  </div>
                  <div>
                    <h6>
                      the causes of {result?.name.replaceAll("_", " ")} :{" "}
                    </h6>
                    <p>{result?.causes != null && result?.causes}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
