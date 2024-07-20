import { useState } from "react"

export default function AboutDiseases() {
    const [ result , setResult] = useState(null)
    return(
        <div className="bg-light" style={{minHeight : "100vh"}}>
            <div className="container py-5">
                <h3>find appointement for disease povided by famous doctors and proffessors</h3>
                <div className="d-flex align-items-center mt-3">
                    <input type="text" className="form-control rounded-pill" placeholder="enter the disease name"/>
                    <button className="btn btn-success rounded-pill w-25">search</button>
                </div>
                {   result == null &&
                    <div className="py-5 my-5 text-center h5">
                        search to find appointement provided by most famous <span className="text-success">doctors</span> in the world and the result will be computed by ai
                    </div>
                }
                {
                    result != null && 
                    <div>
                            
                    </div>
                }
            </div>
        </div>
    )
}