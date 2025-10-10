import React from "react";
import { useNavigate } from "react-router-dom";
import locationIcon from "../../assets/onboarding3.png";

const Onboarding3 = () => {
  const navigate = useNavigate();

  const handleEnableLocation = () => {
    // In a real app, you'd request geolocation permission here
    // For now, just navigate to home
    navigate("/home");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-purple-500 to-blue-600 text-center p-6">
      {/* Location Icon */}
      <img
        src={locationIcon}
        alt="Location icon"
        className="w-40 h-40 mb-8 rounded-xl shadow-lg"
      />

      {/* Text */}
      <h1 className="text-2xl font-semibold text-white mb-4 leading-snug">
        Allow Location Access <br /> for Local Weather Updates
      </h1>

      {/* Pagination Dots */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
        <span className="w-2.5 h-2.5 bg-gray-300 rounded-full"></span>
        <span className="w-3 h-3 bg-white rounded-full shadow-md"></span>
      </div>

      {/* Enable Location Button */}
      <button
        onClick={handleEnableLocation}
        className="mt-10 bg-white/70 text-purple-700 font-semibold px-8 py-3 rounded-full shadow hover:bg-white transition"
      >
        Enable Location
      </button>
    </div>
  );
};

export default Onboarding3;
