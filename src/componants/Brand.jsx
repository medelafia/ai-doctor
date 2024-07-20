import { useNavigate } from "react-router-dom"

export default function Brand() {
    const navigate = useNavigate()
    return(
        <div className="d-flex align-items-center justify-content-center bold title-font-size cursor-pointer" onClick={()=>navigate("/")}>
            <i class="fa-solid fa-notes-medical me-2"></i>
            Ai-Doctor
        </div>
    )
}