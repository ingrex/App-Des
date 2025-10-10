import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Onboarding1 from "../components/onboarding/Onboarding1";
import Onboarding2 from "../components/onboarding/Onboarding2";
import Onboarding3 from "../components/onboarding/Onboarding3";

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  // --- handles next button ---
  function handleNext() {
    if (step < 3) setStep(step + 1);
  }

  // --- request location ---
  function handleEnableLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          // Save coordinates for later API calls
          localStorage.setItem(
            "userLocation",
            JSON.stringify({ latitude, longitude })
          );
          localStorage.setItem("hasOnboarded", "true");
          navigate("/home");
        },
        (err) => {
          console.warn("Location access denied:", err.message);
          localStorage.setItem("hasOnboarded", "true");
          navigate("/home");
        }
      );
    } else {
      alert("Geolocation not supported on this browser.");
      navigate("/home");
    }
  }

  // --- choose which component to show ---
  const screens = [<Onboarding1 />, <Onboarding2 />, <Onboarding3 onEnableLocation={handleEnableLocation} />];
  const isLast = step === 3;

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/sky-bg.jpg')" }}
    >
      <div className="bg-white/20 backdrop-blur-md rounded-3xl p-8 w-80 text-center">
        {screens[step - 1]}

        {!isLast && (
          <button
            onClick={handleNext}
            className="mt-6 px-6 py-2 rounded bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Next
          </button>
        )}

        {/* Dots indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full ${
                i === step ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
}
