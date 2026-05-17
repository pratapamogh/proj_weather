import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Dashboard from './components/Dashboard';
import { useWeather } from './hooks/useWeather';
import { getWeatherCondition } from './services/weatherApi';

function App() {
  const [theme, setTheme] = useState('dark');
  const weather = useWeather();
  const [bgClass, setBgClass] = useState('bg-gradient-to-br from-gray-900 via-slate-900 to-black');

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('bg-background', 'text-white');
      document.body.classList.remove('bg-gray-100', 'text-gray-900');
    } else {
      document.body.classList.add('bg-gray-100', 'text-gray-900');
      document.body.classList.remove('bg-background', 'text-white');
    }
  }, [theme]);

  useEffect(() => {
    if (weather.data?.current) {
      const condition = getWeatherCondition(weather.data.current.weather_code);
      const isDay = weather.data.current.is_day === 1;

      let newBg = 'from-gray-900 via-slate-900 to-black'; // default dark

      switch (condition.type) {
        case 'clear':
          newBg = isDay
            ? 'from-sky-400 via-blue-500 to-cyan-600'
            : 'from-gray-900 via-blue-900 to-black';
          break;
        case 'cloudy':
        case 'fog':
          newBg = isDay
            ? 'from-slate-400 via-gray-500 to-slate-600'
            : 'from-slate-800 via-gray-900 to-black';
          break;
        case 'rain':
        case 'thunderstorm':
          newBg = 'from-slate-900 via-blue-900 to-indigo-900';
          break;
        case 'snow':
          newBg = 'from-blue-200 via-cyan-100 to-white text-gray-900';
          break;
        default:
          break;
      }
      setBgClass(`bg-gradient-to-br ${newBg}`);
    }
  }, [weather.data]);

  return (
    <div className={`min-h-screen flex flex-col ${bgClass} transition-all duration-1000 relative w-full overflow-hidden text-white`}>
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onSearch={weather.fetchWeatherByCity}
        onLocation={weather.fetchCurrentLocationWeather}
      />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center z-10 w-full mt-24 pb-12">
        <Dashboard weather={weather} loading={weather.loading} error={weather.error} />
      </main>

      <Footer />
    </div>
  );
}

export default App;
