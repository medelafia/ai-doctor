import { Outlet } from "react-router-dom";
import Brand from "./Brand";
import "./componants.css";
import ServiceBox from "./ServiceBox";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200/80 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
          <Brand />
          <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600">
            <a href="#" className="hover:text-blue-600 transition-colors">Home</a>
            <a href="#" className="hover:text-blue-600 transition-colors">About</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative overflow-hidden px-4 py-16 md:py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
          {/* Text content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                Ai Doctor
              </span>
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto md:mx-0">
              Your AI‑powered health companion. Diagnose diseases using the
              collective knowledge of the world's leading physicians.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
              <a
                href="/disease"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full shadow-md transition-all hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="#services"
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-full shadow-sm border border-gray-200 transition-all hover:shadow-md"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Illustration / decorative icon */}
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-full blur-2xl"></div>
              <div className="relative flex items-center justify-center w-full h-full">
                <i className="fa-solid fa-user-doctor text-7xl md:text-8xl text-blue-600/80"></i>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-3 shadow-lg">
                  <i className="fa-solid fa-heart-pulse text-3xl text-rose-500"></i>
                </div>
                <div className="absolute -top-2 -left-2 bg-white rounded-full p-3 shadow-lg">
                  <i className="fa-solid fa-stethoscope text-3xl text-teal-500"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services section */}
      <section id="services" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            How can we help you?
          </h2>
          <p className="mt-2 text-gray-500 max-w-2xl mx-auto">
            Choose a diagnostic tool below and get instant, AI‑driven insights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
          <ServiceBox
            title="Diagnosis"
            btnLink="/disease"
            text="Our advanced diagnostic model predicts potential diseases based on the symptoms you provide."
            variant="primary"
          >
            <i className="fa-solid fa-user-doctor text-5xl text-white my-4"></i>
          </ServiceBox>
          <ServiceBox
            btnLink="/blood-disease"
            title="Diagnosis Of Blood Analysis"
            text="Our advanced diagnostic model predicts potential diseases based on the analysis result you provide."
            variant="secondary"
          >
            <i className="fa-solid fa-droplet text-5xl text-white my-4"></i>
          </ServiceBox>
          {/* Third card – optionally uncomment and add */}
          {/* 
          <ServiceBox
            btnLink="/about-disease"
            title="learn about disease"
            text="Our advanced diagnostic model predicts potential diseases based on the analysis result you provide."
            variant="info"
          >
            <i className="fa-solid fa-book-open text-5xl text-white my-4"></i>
          </ServiceBox>
          */}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Ai Doctor. All rights reserved.</p>
          <div className="flex space-x-6 mt-2 sm:mt-0">
            <a href="#" className="hover:text-blue-600 transition-colors">Privacy</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Terms</a>
            <a href="#" className="hover:text-blue-600 transition-colors">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}