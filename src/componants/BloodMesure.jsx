import { useState } from "react";
import { useRef } from "react";

export default function BloodMesure({
  onClose,
  onSuccess,
  uncheckedNames,
  checkedNames,
}) {
  const nameRef = useRef();
  const valueRef = useRef();
  const [error , setError ] = useState(null) 
  const add = () => {
    if (nameRef.current.value != "" && valueRef.current.value != "") {
        const value = valueRef.current.value
        if(!Number.isNaN(value)){
            onSuccess({ name: nameRef.current.value, value: Number.parseFloat(value) });
            onClose();
        }else {
            setError("invalid field format please enter a valid number")
        }
    } else {
        setError("all field required")
    }
  };
  const renderNames = () => {
    return uncheckedNames.map(
      (item, index) =>
        !checkedNames.find((val, idx) => val == item) && (
          <option value={item}>{item}</option>
        )
    );
  };
  console.log(checkedNames);
  return (
    <div
      className="rounded bg-light position-absolute border p-5 blood-modal"
      style={{
        boxShadow: "0px 0px 900px 900px #C5C6DE",
        zIndex: "100",
      }}
    >
      <div className="position-absolute" style={{ top: "30px", right: "30px" }}>
        <button className="btn">
          <i class="fa-solid fa-circle-info text-info"></i>
        </button>
        <button className="btn" onClick={onClose}>
          <i class="fa-solid fa-x"></i>
        </button>
      </div>
      <h3 className="text-capitalize">add blood mesure</h3>
      { error !=null  && <div className="alert alert-danger alert-dismissible d-flex justify-content-between w-100">
        <div>
            <strong>Danger!</strong> {error}
        </div>
        <button className="btn" data-dismiss="alert" aria-label="close" onClick={()=>setError(null)}>&times;</button>
      </div> } 
      <div className="form-group my-2">
        <label htmlFor="">name</label>
        <select name="" id="" className="form-select" ref={nameRef}>
          {renderNames()}
        </select>
      </div>
      <div className="form-group my-2">
        <label htmlFor="">value</label>
        <input
          type="text"
          name=""
          id=""
          className="form-control"
          ref={valueRef}
        />
      </div>
      <button className="btn btn-dark w-100 mt-4" onClick={add}>
        add
      </button>
    </div>
  );
}
