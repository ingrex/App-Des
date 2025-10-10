import React from "react";
import { useNavigate } from "react-router-dom";
import weatherIcon from "../../assets/onboarding2.png"; // ✅ make sure this file exists

const Onboarding2 = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/onboarding3");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-400 to-gray-200 text-center p-6">
      {/* Weather Icon */}
      <img
        src={weatherIcon}
        alt="Weather icon"
        className="w-40 h-40 mb-8 rounded-xl shadow-lg"
      />

      {/* Text */}
      <h1 className="text-2xl font-semibold text-gray-800 mb-4 leading-snug">
        Get Real-time Updates <br /> On Weather Conditions
      </h1>

       {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full shadow-md"></span>
        <span className="w-2.5 h-2.5 bg-gray-400 rounded-full"></span>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="mt-10 bg-white/70 text-purple-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-white transition"
      >
        Next
      </button>
    </div>
  );
};

export default Onboarding2;
