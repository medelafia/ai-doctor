import { useEffect } from "react"
import { useState } from "react"

export default function Symptoms({onClose , onChange , defaultSelected , allSymptoms }) {
    const [selected , setSelected ] = useState(defaultSelected) 
    const [symptoms , setSymptoms ] = useState(allSymptoms)
    const select = (e) => {
        e.currentTarget.children[0].click() ; 
    }
    const onSelectCallback = (e) => {
        const checkbox = e.currentTarget 
        const value = checkbox.getAttribute("data-target")
        if(checkbox.checked) {
            setSelected([...selected , value ])
        }else {
            setSelected(selected.filter(item => item != value ))
        }
    }
    useEffect(()=>{
        onChange(selected)
    } , [selected] )
    const renderSymptoms = () => {
        return symptoms.map((sym, index ) => 
        <div className="cursor-pointer rounded border mx-1 p-2 d-flex align-items-center my-1" onClick={select}>
            <input type="checkbox" checked={selected.find((e)=>e == sym)} name="" data-target={sym} id="" onChange={onSelectCallback}/>
            <span className="d-block ms-2">{sym.replaceAll("_" , " ").trim()}</span>
        </div>)
    }
    return (
        <div className="rounded bg-light position-absolute border p-5" style={{boxShadow : "0px 0px 100px 40px #C5C6DE"  , zIndex : "100", width : "90%" , height : "90vh" , margin : "5vh 5%"}}>
            <button className="btn position-absolute" style={{top : "30px" , right : "30px"}}  onClick={onClose}><i class="fa-solid fa-x"></i></button>
            <h3 className="text-capitalize">symptoms list </h3>
            <div className="d-flex h-75 flex-wrap my-5" style={{overflow : "auto"}}>
                {renderSymptoms()}
            </div>
        </div>
    )
}