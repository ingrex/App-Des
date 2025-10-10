import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { FiMapPin } from "react-icons/fi";
import weatherBg from "../assets/cloudy.gif";



const Home = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // ✅ 1. Load saved city or default to Lagos
  useEffect(() => {
    const lastCity = localStorage.getItem("lastCity");
    const initialCity = lastCity || "Lagos";
    setCity(initialCity);
    fetchWeather(initialCity);
  }, []);

  // ✅ Fetch weather data
  const fetchWeather = async (cityName) => {
    try {
      setLoading(true);
      setError("");
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`
      );
      setWeather(res.data);
      setLoading(false);
      localStorage.setItem("lastCity", cityName);
    } catch (err) {
      setLoading(false);
      setError("City not found. Please try again.");
    }
  };

  // ✅ 2. Handle city search
  const handleSearch = (e) => {
    e.preventDefault();
    if (city.trim() !== "") {
      fetchWeather(city);
    }
  };

  // ✅ 3. Use My Location (Geolocation)
  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
          );
          setWeather(res.data);
          setCity(res.data.name);
          localStorage.setItem("lastCity", res.data.name);
        } catch (error) {
          setError("Unable to fetch weather for your location.");
        }
      },
      () => {
        alert("Unable to retrieve your location.");
      }
    );
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white p-4 relative bg-cover bg-center"
  style={{ backgroundImage: `url(${weatherBg})` }}>
      {/* Settings icon */}
      <Link
        to="/settings"
        className="absolute top-5 right-5 text-white text-2xl hover:opacity-80"
      >
        <FiSettings />
      </Link>

      <h1 className="text-3xl font-black mb-6">SkyCast</h1>

      {/* Search bar */}
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 mb-4 w-full max-w-md"
      >
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="  Search for a city..."
        className="flex-1 bg-transparent border-1 text-white placeholder-white/80 outline-none py-2"
      />
        <button
          type="submit"
          className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
        >
          Search
        </button>
      </form>

      {/* Use My Location button */}
      <button
        onClick={handleUseMyLocation}
        className="flex items-center gap-2 bg-blue-800 px-4 py-2 rounded-lg hover:bg-blue-700 transition mb-6"
      >
        <FiMapPin /> Use My Location
      </button>

      {/* Weather card */}
      {loading ? (
        <p>Loading weather...</p>
      ) : error ? (
        <p className="text-red-300">{error}</p>
      ) : weather ? (
        <div className="bg-white/20 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-lg mt-2 capitalize">
            {weather.weather[0].description}
          </p>
          <p className="text-5xl font-bold mt-4">
            {Math.round(weather.main.temp)}°C
          </p>
          <div className="flex justify-center gap-8 mt-4">
            <p>Humidity: {weather.main.humidity}%</p>
            <p>Wind: {weather.wind.speed} m/s</p>
          </div>
          <button
            onClick={() => navigate(`/details/${weather.name}`)}
            className="mt-6 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
          >
            View Details
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Home;
