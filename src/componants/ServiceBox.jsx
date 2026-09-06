import { useNavigate } from "react-router-dom";

export default function ServiceBox({ text, title, btnLink, variant, children }) {
  const navigate = useNavigate();

  const navigateToLink = () => {
    navigate(btnLink);
  };

  // Determine background color based on variant
  const bgColor =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-700"
      : variant === "secondary"
      ? "bg-teal-600 hover:bg-teal-700"
      : "bg-gray-700 hover:bg-gray-800";

  return (
    <div className="w-full h-full">
      <div
        className={`${bgColor} p-6 rounded-lg shadow-md flex flex-col items-center justify-center text-center transition-colors duration-200 h-full`}
      >
        {children}
        <h3 className="text-2xl font-bold text-white capitalize mt-2">
          {title}
        </h3>
        <p className="text-gray-100 my-4 max-w-sm">{text}</p>
        <button
          className="bg-white text-gray-800 hover:bg-gray-100 rounded-full px-4 py-2 transition-colors"
          onClick={navigateToLink}
        >
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}