// src/services/weatherAPI.js
const API_BASE = "https://api.openweathermap.org/data/2.5";

export async function getWeatherByCity(city) {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = `${API_BASE}/weather?q=${city}&units=metric&appid=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch weather data");
  return res.json();
}
