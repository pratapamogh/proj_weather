import React from 'react';
import { format, parseISO } from 'date-fns';
import { getWeatherCondition } from '../services/weatherApi';
import { Cloud, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Moon, Droplets } from 'lucide-react';

const MiniIcon = ({ type, isDay, className }) => {
    const props = { className };
    switch (type) {
        case 'snow': return <CloudSnow {...props} />;
        case 'rain': return <CloudRain {...props} />;
        case 'thunderstorm': return <CloudLightning {...props} />;
        case 'cloudy': return <Cloud {...props} />;
        case 'fog': return <CloudFog {...props} />;
        case 'clear': return isDay ? <Sun {...props} className={props.className.replace('currentColor', 'yellow-400')} /> : <Moon {...props} className={props.className.replace('currentColor', 'blue-300')} />;
        default: return <Sun {...props} />;
    }
};

const WeatherChart = ({ hourly }) => {
    if (!hourly || !hourly.time) return null;

    const currentHourString = new Date().toISOString().substring(0, 13) + ':00';
    let startIndex = hourly.time.findIndex(time => time.startsWith(currentHourString.substring(0, 13)));
    if (startIndex === -1) startIndex = 0; // fallback

    const data = hourly.time.slice(startIndex, startIndex + 24).map((time, index) => {
        const actualIndex = startIndex + index;
        const condition = getWeatherCondition(hourly.weather_code[actualIndex]);
        const hour = parseISO(time).getHours();
        const isDay = hour >= 6 && hour <= 18;

        return {
            time: format(parseISO(time), 'ha'),
            temp: hourly.temperature_2m?.[actualIndex] != null ? Math.round(hourly.temperature_2m[actualIndex]) : 0,
            precip: hourly.precipitation_probability?.[actualIndex] || 0,
            condition,
            isDay
        };
    });

    return (
        <div className="glass-card w-full p-6 mt-6">
            <h3 className="text-xl font-bold text-white mb-6 tracking-wide text-glow">24-Hour Trend</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar snap-x">
                {data.map((item, i) => (
                    <div key={i} className="min-w-[100px] flex-shrink-0 flex flex-col items-center justify-between space-y-3 p-4 rounded-xl bg-white/5 border border-white/10 snap-center hover:bg-white/10 transition-colors cursor-pointer group">
                        <p className="text-gray-300 font-medium text-sm group-hover:text-white">{item.time}</p>
                        <MiniIcon type={item.condition.type} isDay={item.isDay} className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
                        <div className="text-center w-full">
                            <p className="text-white font-bold text-lg">{item.temp}&deg;</p>
                            <div className="flex items-center justify-center text-[11px] text-blue-300 mt-1 font-semibold">
                                <Droplets className="w-3 h-3 mr-0.5" />
                                {item.precip}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherChart;
