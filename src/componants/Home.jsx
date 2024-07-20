import { Outlet } from "react-router-dom";
import Brand from "./Brand";
import "./componants.css";
import ServiceBox from "./ServiceBox";
export default function Home() {
  return (
    <div className="app">
      <div className="custom-navbar">
        <div className="container py-2">
          <Brand /> 
        </div>
      </div>
      <div className="container h-100 d-flex align-items-start w-100 justify-content-center flex-column">
        <div className="mb-3 pb-5">
          <span className="title-font-size bold">Ai doctor</span>
          <br />
          the ai doctor will help you to Diagnosis your 
          <br />
          disease and the definition of disease and his causes 
        </div>
        <div className="row py-5">
          <ServiceBox
            title="Diagnosis"
            btnLink="/disease"
            text="Our advanced diagnostic model predicts potential diseases based on the symptoms you provide."
            variant="primary"
          >
            <i class="fa-solid fa-user-doctor icon-font-size text-white my-3"></i>
          </ServiceBox>
          <ServiceBox
            btnLink="/blood-disease"
            title="Diagnosis Of Blood Analysis"
            text="Our advanced diagnostic model predicts potential diseases based on the analysis result you provide."
            variant="secondary"
          >
            <i class="fa-solid fa-droplet icon-font-size text-white my-3"></i>
          </ServiceBox>
          {/*<ServiceBox
          btnLink="/about-disease"
            title="learn about disease"
            text="Our advanced diagnostic model predicts potential diseases based on the analysis result you provide."
            variant="primary"
          >
            <i class="fa-solid fa-droplet icon-font-size text-white my-3"></i>
  </ServiceBox> */}
        </div>
      </div>
    </div>
  );
}
