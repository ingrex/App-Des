import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiArrowLeft } from "react-icons/fi";
import weatherBg from "../assets/ClearNight.gif";


const Forecast = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const [forecast, setForecast] = useState(null);
  const unit = localStorage.getItem("unit") || "metric";

  useEffect(() => {
    const fetchForecast = async () => {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${apiKey}`
      );
      setForecast(res.data);
    };
    fetchForecast();
  }, [city, unit]);

  if (!forecast) return <p className="text-center mt-20">Loading...</p>;

  const current = forecast.list[0];
  const hours = forecast.list.slice(0, 10);
  const days = forecast.list.filter((_, index) => index % 10 === 0).slice(0, 10);

  return (
    <div className=" bg-cover min-h-screen bg-gradient-to-b from-green-400 to-yellow-400 text-white p-6"
    style={{ backgroundImage: `url(${weatherBg})` }}>
      {/* Back Button */}
      <button
        onClick={() => navigate("/home")}
        className="text-white mb-4 flex items-center gap-1"
      >
        <FiArrowLeft size={20} /> Back
      </button>

      {/* Current Weather */}
      <div className="text-center">
        <img
          src={`https://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`}
          alt="Weather icon"
          className="mx-auto mb-2 w-24 h-24"
        />
        <h1 className="text-6xl font-bold mb-2">{Math.round(current.main.temp)}°</h1>
        <p className="text-xl capitalize">{current.weather[0].description}</p>
      </div>

      {/* Hourly Forecast */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">Hourly Forecast</h2>
        <div className="flex overflow-x-scroll space-x-4 pb-2 scrollbar-hide">
          {hours.map((hour, index) => (
            <div
              key={index}
              className="flex-shrink-0 bg-white/20 backdrop-blur-md p-4 rounded-2xl w-20 text-center"
            >
              <p className="text-sm">
                {index === 0
                  ? "Now"
                  : new Date(hour.dt * 1000).getHours() + ":00"}
              </p>
              <img
                src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`}
                alt="icon"
                className="mx-auto w-10 h-10"
              />
              <p className="font-semibold">{Math.round(hour.main.temp)}°</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="mt-10">
        <h2 className="text-lg font-semibold mb-3">5-Days Forecast</h2>
        <div className="space-y-3">
          {days.map((day, index) => {
            const date = new Date(day.dt * 1000);
            const options = { weekday: "short" };
            return (
              <div
                key={index}
                className="bg-white/20 backdrop-blur-md p-3 rounded-2xl flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                    alt="icon"
                    className="w-10 h-10"
                  />
                  <p>{date.toLocaleDateString("en-US", options)}</p>
                </div>
                <p className="font-semibold">{Math.round(day.main.temp)}°</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Forecast;
