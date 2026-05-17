import { format } from 'date-fns';
import { getWeatherCondition } from '../services/weatherApi';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun } from 'lucide-react';

const MiniIcon = ({ type, className }) => {
    const props = { className };
    switch (type) {
        case 'snow': return <CloudSnow {...props} />;
        case 'rain': return <CloudRain {...props} />;
        case 'thunderstorm': return <CloudLightning {...props} />;
        case 'cloudy': return <Cloud {...props} />;
        case 'fog': return <CloudFog {...props} />;
        case 'clear': return <Sun {...props} className={props.className.replace('currentColor', 'yellow-400')} />;
        default: return <Sun {...props} />;
    }
};

const ForecastCard = ({ daily }) => {
    if (!daily || !daily.time) return null;

    // Build forecast array
    const forecasts = daily.time.map((time, index) => {
        return {
            date: new Date(time),
            maxTemp: daily.temperature_2m_max[index],
            minTemp: daily.temperature_2m_min[index],
            weatherCode: daily.weather_code[index]
        };
    }).slice(1, 6); // Tomorrow to next 5 days

    return (
        <div className="glass-card p-6 w-full mt-6">
            <h3 className="text-xl font-semibold mb-6 text-white text-glow">5-Day Forecast</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x">
                {forecasts.map((forecast, i) => {
                    const condition = getWeatherCondition(forecast.weatherCode);
                    return (
                        <div key={i} className="min-w-[120px] sm:min-w-[140px] flex-shrink-0 flex flex-col items-center justify-between space-y-4 p-4 rounded-xl bg-white/5 border border-white/10 snap-center hover:bg-white/10 transition-colors cursor-pointer group">
                            <p className="text-gray-300 font-medium group-hover:text-white">{format(forecast.date, 'EEE')}</p>
                            <MiniIcon type={condition.type} className="w-10 h-10 text-accent group-hover:scale-110 transition-transform" />
                            <div className="text-center">
                                <p className="text-white font-bold">{Math.round(forecast.maxTemp)}&deg;</p>
                                <p className="text-gray-400 text-sm">{Math.round(forecast.minTemp)}&deg;</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ForecastCard;
