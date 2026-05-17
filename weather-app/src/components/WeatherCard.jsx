import { getWeatherCondition } from '../services/weatherApi';
import { format } from 'date-fns';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon } from 'lucide-react';

const WeatherIcon = ({ type, isDay, className }) => {
    const props = { className: `${className} animate-pulse drop-shadow-[0_0_15px_currentColor]` };
    switch (type) {
        case 'snow': return <CloudSnow {...props} />;
        case 'rain': return <CloudRain {...props} />;
        case 'thunderstorm': return <CloudLightning {...props} />;
        case 'cloudy': return <Cloud {...props} />;
        case 'fog': return <CloudFog {...props} />;
        case 'clear': return isDay ? <Sun {...props} className={props.className.replace('currentColor', 'yellow-400')} /> : <Moon {...props} className={props.className.replace('currentColor', 'blue-300')} />;
        default: return isDay ? <Sun {...props} /> : <Moon {...props} />;
    }
};

const WeatherCard = ({ current, location }) => {
    if (!current || !location) return null;

    const condition = getWeatherCondition(current.weather_code);
    const isDay = current.is_day ? current.is_day === 1 : true; // fallback if is_day isn't passed directly, OpenMeteo gives it in current sometimes, but we can assume day if not given or calculate. Let's just assume Day, or rely on sunrise/sunset.

    return (
        <div className="glass-card w-full p-8 md:p-12 flex flex-col md:flex-row items-center justify-between text-white md:min-h-[300px]">
            <div className="flex flex-col items-center md:items-start space-y-4 z-10 w-full md:w-1/2">
                <h2 className="text-4xl md:text-5xl font-bold tracking-wider">{location.name}</h2>
                {location.country && <p className="text-lg text-gray-300 tracking-widest">{location.country}</p>}

                <div className="text-7xl md:text-9xl font-extrabold tracking-tighter accent-glow mt-4 mb-2">
                    {Math.round(current.temperature_2m)}&deg;
                </div>

                <p className="text-xl md:text-2xl font-light tracking-wide text-glow capitalize">
                    Feels like {Math.round(current.apparent_temperature)}&deg; | {condition.name}
                </p>
            </div>

            <div className="mt-8 md:mt-0 w-full md:w-1/2 flex items-center justify-center z-10">
                <WeatherIcon type={condition.type} isDay={isDay} className="w-48 h-48 md:w-64 md:h-64 text-accent" />
            </div>

            {/* Decorative blurred blobs behind the card content */}
            <div className="absolute top-[-50%] left-[-10%] w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
            <div className="absolute bottom-[-50%] right-[-10%] w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>
        </div>
    );
};

export default WeatherCard;
