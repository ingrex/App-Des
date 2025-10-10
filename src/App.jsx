import { Routes, Route } from "react-router-dom";
import Onboarding1 from "./components/onboarding/Onboarding1";
import Onboarding2 from "./components/onboarding/Onboarding2";
import Onboarding3 from "./components/onboarding/Onboarding3";
import Home from "./pages/Home";
import Details from "./pages/Details";
import Settings from "./pages/Settings";
import Forecast from "./pages/Forecast"; 

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      <div className="flex-grow">
        <Routes>
          {/* Onboarding screens */}
          <Route path="/" element={<Onboarding1 />} />
          <Route path="/onboarding2" element={<Onboarding2 />} />
          <Route path="/onboarding3" element={<Onboarding3 />} />

          {/* Main app routes */}
          <Route path="/home" element={<Home />} />
          <Route path="/details/:city" element={<Details />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/forecast/:city" element={<Forecast />} />
        </Routes>
      </div>

      {/* Footer */}
      <footer className="text-center py-3 border-t border-gray-300 dark:border-gray-700 text-sm">
        Powered by{" "}
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noreferrer"
          className="text-blue-500 hover:underline"
        >
          OpenWeather
        </a>
      </footer>
    </div>
  );
}

export default App;
