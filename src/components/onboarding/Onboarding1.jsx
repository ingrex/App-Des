import React from "react";
import { useNavigate } from "react-router-dom"; 
import onboarding1 from "../../assets/onboarding1.png";

const Onboarding1 = () => {
  const navigate = useNavigate(); 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-900 text-white p-6 text-center">
      <img
        src={onboarding1}
        alt="Weather illustration"
        className="w-64 h-64 mb-8 object-contain"
      />
      <h1 className="text-3xl font-bold mb-4">Welcome to SkyCast</h1>
      <p className="text-white/90 mb-6">
        Your ultimate weather companion — stay informed anytime, anywhere.
      </p>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-6 mb-10">
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full shadow-md"></span>
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
      </div>
      
      <button
        onClick={() => navigate("/onboarding2")}
        className="bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-all"
      >
        Next
      </button>
    </div>
  );
};

export default Onboarding1;
