import { Droplets, Wind, Eye, Gauge, Sunrise, Sunset, Sun } from 'lucide-react';
import { format } from 'date-fns';

const WeatherDetails = ({ current, daily }) => {
    if (!current || !daily) return null;

    const humidity = current.relative_humidity_2m;
    const windSpeed = current.wind_speed_10m;
    const pressure = current.surface_pressure;
    const visibility = current.cloud_cover; // approximation since OpenMeteo doesn't give direct visibility easily without another flag, we'll use cloud cover

    // daily[0] is today
    const uvIndex = daily.uv_index_max?.[0] || 0;
    const sunrise = daily.sunrise?.[0] ? format(new Date(daily.sunrise[0]), 'h:mm a') : '--:--';
    const sunset = daily.sunset?.[0] ? format(new Date(daily.sunset[0]), 'h:mm a') : '--:--';

    const details = [
        { label: 'Humidity', value: `${humidity}%`, icon: Droplets, color: 'text-blue-400' },
        { label: 'Wind Speed', value: `${windSpeed} km/h`, icon: Wind, color: 'text-teal-400' },
        { label: 'Pressure', value: `${pressure} hPa`, icon: Gauge, color: 'text-purple-400' },
        { label: 'Cloud Cover', value: `${visibility}%`, icon: Eye, color: 'text-gray-300' },
        { label: 'UV Index', value: uvIndex, icon: Sun, color: 'text-yellow-400' },
        { label: 'Sunrise', value: sunrise, icon: Sunrise, color: 'text-orange-400' },
        { label: 'Sunset', value: sunset, icon: Sunset, color: 'text-red-400' },
    ];

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
            {details.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className="glass-card p-4 flex flex-col items-center justify-center space-y-2 hover:scale-105 transition-transform duration-300">
                        <Icon className={`w-8 h-8 ${item.color} drop-shadow-[0_0_8px_currentColor]`} />
                        <p className="text-gray-400 text-sm font-medium">{item.label}</p>
                        <p className="text-white font-semibold text-lg">{item.value}</p>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherDetails;
