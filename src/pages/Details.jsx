import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import weatherBg from "../assets/cloudy.gif";

const Details = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const unit = localStorage.getItem("unit") || "metric";
  const [weather, setWeather] = useState(null);
  const [airQuality, setAirQuality] = useState(null);


  const getActivityMessage = (condition) => {
  condition = condition.toLowerCase();

  if (condition.includes("rain")) return "Looks rainy — perfect day to stay cozy indoors";
  if (condition.includes("cloud")) return "Cloudy skies — maybe a calm walk outside";
  if (condition.includes("clear")) return "Perfect weather for outdoor activities";
  if (condition.includes("snow")) return "Snowy day — time for some hot chocolate!";
  if (condition.includes("storm")) return "Stormy weather — best to stay safe indoors";
  if (condition.includes("mist") || condition.includes("fog")) return "Misty vibes — drive carefully";
  return "Enjoy your day — the weather’s unpredictable!";
};

  // ✅ Fetch weather data
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
        );
        setWeather(res.data);

        // Fetch air quality
        const { coord } = res.data;
        const airRes = await axios.get(
          `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`
        );
        setAirQuality(airRes.data.list[0]);
      } catch (error) {
        console.error("Error fetching weather details:", error);
      }
    };
    fetchDetails();
  }, [city, unit]);

  if (!weather) return <p className="text-center mt-20 text-white">Loading...</p>;

  // ✅ Air quality logic
  const aqi = airQuality?.main?.aqi || 1;
  const aqiLabel =
    aqi === 1 ? "Good" : aqi === 2 ? "Fair" : aqi === 3 ? "Moderate" : aqi === 4 ? "Poor" : "Very Poor";
  const aqiColor =
    aqi === 1 ? "bg-green-500" : aqi === 2 ? "bg-yellow-400" : aqi === 3 ? "bg-orange-400" : aqi === 4 ? "bg-red-500" : "bg-purple-700";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center text-white p-4"
      style={{
        backgroundImage: `url(${weatherBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Search header / back */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-5 left-5 bg-white/30 px-3 py-1 rounded-full text-sm backdrop-blur-md hover:bg-white/50"
      >
        ← Back
      </button>

      {/* Weather card */}
      <div className="w-full max-w-xs bg-white/30 backdrop-blur-lg rounded-3xl p-6 shadow-lg text-center">
        <h2 className="text-2xl font-semibold">{weather.name}</h2>
        <p className="text-6xl font-bold mt-2">
          {Math.round(weather.main.temp)}°
          {unit === "metric" ? "C" : "F"}
        </p>
        <p className="text-lg capitalize">{weather.weather[0].description}</p>

        <div className="flex justify-around mt-6 text-sm">
          <div>
            <p className="font-semibold">{weather.main.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div>
            <p className="font-semibold">{weather.wind.speed} m/s</p>
            <p>Wind</p>
          </div>
          <div>
            <p className="font-semibold">{weather.main.pressure}</p>
            <p>Pressure</p>
          </div>
        </div>

        <div className="mt-5">
          <p className="font-semibold">Air Quality</p>
          <div
            className={`inline-block mt-1 px-3 py-1 text-sm font-medium rounded-full ${aqiColor}`}
          >
            {aqiLabel} ({aqi})
          </div>
        </div>

          <p className="mt-5 text-sm italic text-white/90">
            {getActivityMessage(weather.weather[0].description)}
          </p>

        <button
          onClick={() => navigate(`/Home`)}
          className="mt-6 bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-gray-200"
        >
          Home
        </button>
      </div>

      {/* Add to Favorites button */}
      <button className="mt-6 bg-yellow-400 text-blue-900 font-semibold px-5 py-2 rounded-xl shadow hover:bg-yellow-300 transition">
        ⭐ Add to Favorites
      </button>

      <button
  onClick={() => navigate(`/forecast/${weather.name}`)}
  className="mt-4 bg-white/20 text-white px-6 py-2 rounded-full"
>
  View Forecast
</button>

    </div>
  );
};

export default Details;
