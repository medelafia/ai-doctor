import { useNavigate } from "react-router-dom";

export default function Brand() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center font-bold text-2xl cursor-pointer hover:text-blue-600 transition-colors"
      onClick={() => navigate("/")}
    >
      <i className="fa-solid fa-notes-medical mr-2"></i>
      Ai-Doctor
    </div>
  );
}