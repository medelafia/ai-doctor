import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Brand from "./Brand";
import "./componants.css";
import ServiceBox from "./ServiceBox";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
        
        body { font-family: 'Inter', sans-serif; }
        .serif-display { font-family: 'Playfair Display', serif; }
        
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #0066CC;
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }

        .fade-in { animation: fadeIn 0.8s ease-out forwards; }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .slide-in-left { animation: slideInLeft 0.8s ease-out forwards; }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .slide-in-right { animation: slideInRight 0.8s ease-out forwards; }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(40px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .glow-pulse {
          animation: glowPulse 6s ease-in-out infinite;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }

        .medical-pattern {
          background-image: 
            linear-gradient(45deg, rgba(0, 102, 204, 0.03) 25%, transparent 25%),
            linear-gradient(-45deg, rgba(0, 102, 204, 0.03) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgba(0, 102, 204, 0.03) 75%),
            linear-gradient(-45deg, transparent 75%, rgba(0, 102, 204, 0.03) 75%);
          background-size: 60px 60px;
          background-position: 0 0, 0 30px, 30px -30px, -30px 0px;
        }

        .button-primary {
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }
        .button-primary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: rgba(255, 255, 255, 0.2);
          transition: left 0.3s ease;
        }
        .button-primary:hover::before { left: 100%; }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 102, 204, 0.15);
        }

        .underline-accent {
          position: relative;
          display: inline-block;
          background: linear-gradient(to right, #0066CC 0%, #0066CC 100%);
          background-size: 0 3px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 0.3s ease;
        }
        .underline-accent:hover {
          background-size: 100% 3px;
        }

        .stat-number {
          font-family: 'Playfair Display', serif;
          font-size: 2.5rem;
          font-weight: 700;
          color: #0066CC;
        }

        .divider-accent {
          width: 3px;
          height: 32px;
          background: #0066CC;
          border-radius: 2px;
        }

        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200/50 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className={`transition-all duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
            <Brand />
          </div>
          <div className="hidden md:flex space-x-1">
            {["Home", "About", "Contact"].map((item, i) => (
              <a
                key={item}
                href="#"
                className="nav-link relative px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colors"
                style={{ animationDelay: isLoaded ? `${i * 0.1}s` : "0s" }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 medical-pattern opacity-40"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">
          {/* Left: Text Content */}
          <div className={`${isLoaded ? "slide-in-left" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="space-y-6">
              <div className="space-y-2">
                <p className="text-blue-700 font-semibold text-sm tracking-wide">INTELLIGENT HEALTH INSIGHTS</p>
                <h1 className="serif-display text-5xl md:text-6xl lg:text-7xl leading-tight font-bold">
                  Diagnose with confidence
                </h1>
              </div>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                AI Doctor combines physician expertise with machine learning to provide accurate, 
                evidence-based diagnostic insights. Understand your symptoms and lab results with medical precision.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="/disease"
                  className="button-primary px-8 py-4 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
                >
                  Start Free Assessment
                </a>
                <a
                  href="#features"
                  className="underline-accent px-8 py-4 border-2 border-gray-300 text-gray-900 hover:border-blue-700 font-semibold rounded-lg transition-all"
                >
                  Explore Features
                </a>
              </div>

              <div className="flex gap-6 pt-8 border-t border-gray-200">
                <div>
                  <p className="stat-number">2M+</p>
                  <p className="text-sm text-gray-600">Medical Cases Analyzed</p>
                </div>
                <div className="divider-accent"></div>
                <div>
                  <p className="stat-number">95%</p>
                  <p className="text-sm text-gray-600">Diagnostic Accuracy</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual Element */}
          <div className={`${isLoaded ? "slide-in-right" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
            <div className="relative h-96 md:h-full min-h-96 flex items-center justify-center">
              {/* Animated background shapes */}
              <div className="absolute top-20 right-20 w-32 h-32 bg-blue-100 rounded-full opacity-20 glow-pulse"></div>
              <div className="absolute bottom-32 left-10 w-40 h-40 bg-emerald-100 rounded-full opacity-20 glow-pulse" style={{ animationDelay: "1s" }}></div>
              
              {/* Central visual */}
              <div className="relative z-10 text-center space-y-8">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-blue-50 to-emerald-50 rounded-full border-2 border-blue-200">
                  <i className="fa-solid fa-stethoscope text-5xl text-blue-700"></i>
                </div>
                
                <div className="space-y-3">
                  <div className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-full">
                    <span className="text-sm font-semibold text-blue-700">Symptoms → Diagnosis</span>
                  </div>
                  <div className="inline-block px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full ml-2">
                    <span className="text-sm font-semibold text-emerald-700">Labs → Results</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-gray-50 border-y border-gray-200 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: "fa-shield-halved", label: "HIPAA Compliant" },
              { icon: "fa-lock", label: "Encrypted Data" },
              { icon: "fa-book-medical", label: "AI-Powered" },
              { icon: "fa-star", label: "Expert Verified" }
            ].map((item, i) => (
              <div key={i} className={`fade-in`} style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
                <i className={`fa-solid ${item.icon} text-3xl text-blue-700 mb-3 inline-block`}></i>
                <p className="text-xs font-semibold text-gray-700 tracking-wide">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 py-20 md:py-32">
        <div className="mb-16">
          <p className="text-blue-700 font-semibold text-sm tracking-wide mb-2">HOW IT WORKS</p>
          <h2 className="serif-display text-4xl md:text-5xl font-bold mb-6">
            Advanced diagnostic tools
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl">
            Choose the diagnostic tool that matches your needs. Each uses state-of-the-art AI trained on millions of medical records.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service 1 */}
          <div className="card-hover group">
            <div className="relative bg-white border-l-4 border-blue-700 rounded-xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                  <i className="fa-solid fa-user-doctor text-2xl text-blue-700"></i>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-blue-700 transition-colors">
                    Symptom Diagnosis
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Describe your symptoms in detail. Our AI analyzes patterns against millions of medical cases to suggest potential diagnoses with confidence scores.
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">✓</span>
                    <span>Real-time symptom analysis</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">✓</span>
                    <span>Multiple condition suggestions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-700 font-bold">✓</span>
                    <span>Confidence scoring</span>
                  </li>
                </ul>

                <a
                  href="/disease"
                  className="inline-flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-800 transition-colors pt-4 group"
                >
                  Start Assessment
                  <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Service 2 */}
          <div className="card-hover group">
            <div className="relative bg-white border-l-4 border-emerald-600 rounded-xl p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-50 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-300"></div>
              
              <div className="relative z-10 space-y-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full group-hover:bg-emerald-200 transition-colors">
                  <i className="fa-solid fa-flask-vial text-2xl text-emerald-600"></i>
                </div>

                <div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-emerald-700 transition-colors">
                    Lab Results Analysis
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    Upload your blood work, hormone panels, or other lab results. We explain what the numbers mean in plain language.
                  </p>
                </div>

                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Instant result interpretation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Normal vs abnormal ranges</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>Clinical insights</span>
                  </li>
                </ul>

                <a
                  href="/blood-disease"
                  className="inline-flex items-center gap-2 text-emerald-600 font-semibold hover:text-emerald-700 transition-colors pt-4 group"
                >
                  Analyze Results
                  <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="bg-gray-50 border-y border-gray-200 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-blue-700 font-semibold text-sm tracking-wide mb-2">WHY AI DOCTOR</p>
            <h2 className="serif-display text-4xl md:text-5xl font-bold">
              Built for reliability
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "fa-brain",
                title: "Trained on Medical Science",
                desc: "Powered by millions of verified medical cases, research papers, and peer-reviewed studies"
              },
              {
                icon: "fa-user-tie",
                title: "Physician Verified",
                desc: "Every diagnosis suggestion is reviewed and validated by licensed medical professionals"
              },
              {
                icon: "fa-shield-heart",
                title: "Your Privacy Protected",
                desc: "Military-grade encryption ensures your health data stays completely confidential"
              }
            ].map((item, i) => (
              <div key={i} className="fade-in" style={{ animationDelay: `${0.2 + i * 0.15}s` }}>
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full border-2 border-blue-200">
                    <i className={`fa-solid ${item.icon} text-3xl text-blue-700`}></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 px-4 overflow-hidden">
        <div className="absolute inset-0 medical-pattern opacity-30"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 text-center space-y-8">
          <h2 className="serif-display text-4xl md:text-5xl font-bold">
            Get your diagnosis today
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            No appointments needed. No waiting. Get AI-powered health insights instantly.
          </p>
          <a
            href="/disease"
            className="button-primary inline-flex items-center gap-2 px-10 py-5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg transition-all shadow-xl hover:shadow-2xl text-lg"
          >
            <span>Start Assessment Now</span>
            <i className="fa-solid fa-arrow-right"></i>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
            <div>
              <div className="text-white font-bold text-lg mb-2">AI Doctor</div>
              <p className="text-sm">Intelligent health diagnostics powered by AI.</p>
            </div>
            {[
              {
                title: "Product",
                links: ["Features", "Pricing", "API", "Blog"]
              },
              {
                title: "Legal",
                links: ["Privacy", "Terms", "Disclaimer", "Compliance"]
              },
              {
                title: "Support",
                links: ["Contact", "FAQ", "Documentation", "Status"]
              }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="font-semibold text-white mb-4">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="hover:text-white transition-colors text-sm">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
            <p>© {new Date().getFullYear()} AI Doctor. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-white transition-colors">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <i className="fa-brands fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}