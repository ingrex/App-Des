import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiSun, FiMoon } from "react-icons/fi";

const Settings = () => {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );
  const [unit, setUnit] = useState(localStorage.getItem("unit") || "metric");

  // Toggle dark mode
  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  // Toggle temperature unit
  const toggleUnit = () => {
    const newUnit = unit === "metric" ? "imperial" : "metric";
    setUnit(newUnit);
    localStorage.setItem("unit", newUnit);
  };

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 to-blue-400 dark:from-gray-800 dark:to-gray-900 text-gray-900 dark:text-white px-4 transition-all duration-500">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-6 max-w-md">
        <button
          onClick={() => navigate("/Home")}
          className="text-xl text-gray-800 dark:text-white flex items-center gap-2 hover:opacity-70"
        >
          <FiArrowLeft /> Back
        </button>
        <h1 className="text-2xl font-semibold">Settings</h1>
        <div className="w-8" /> {/* Spacer for alignment */}
      </div>

      {/* Content Card */}
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-6 transition-all duration-300">
        {/* Theme Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Dark Mode</span>
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-12 h-6 rounded-full bg-gray-300 dark:bg-gray-600 relative"
          >
            <div
              className={`absolute w-6 h-6 rounded-full bg-white dark:bg-gray-900 shadow-md transform transition-transform duration-300 ${
                isDarkMode ? "translate-x-6" : "translate-x-0"
              }`}
            >
              {isDarkMode ? (
                <FiMoon className="text-yellow-400 m-auto mt-1" />
              ) : (
                <FiSun className="text-yellow-500 m-auto mt-1" />
              )}
            </div>
          </button>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Temperature Unit</span>
          <button
            onClick={toggleUnit}
            className="px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-all"
          >
            {unit === "metric" ? "°C" : "°F"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-10 text-center text-sm opacity-70">
        Powered by <span className="font-semibold">OpenWeather</span>
      </footer>
    </div>
  );
};

export default Settings;
