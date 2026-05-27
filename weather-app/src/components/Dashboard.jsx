import React from 'react';
import WeatherCard from './WeatherCard';
import WeatherDetails from './WeatherDetails';
import ForecastCard from './ForecastCard';
import WeatherChart from './WeatherChart';
import { AlertCircle } from 'lucide-react';

const Dashboard = ({ weather, loading, error, favorites, onToggleFavorite }) => {

    if (loading) {
        return (
            <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <div className="glass-card p-12 max-w-lg mx-auto flex items-center justify-center flex-col space-y-6">
                    <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin shadow-neon"></div>
                    <p className="text-white text-xl font-medium tracking-wide text-glow animate-pulse">Analyzing Atmosphere...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[50vh]">
                <div className="glass-card border-red-500/30 p-12 max-w-lg mx-auto flex items-center justify-center flex-col space-y-4 bg-red-500/5">
                    <AlertCircle className="w-16 h-16 text-red-500 mb-2 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                    <h2 className="text-2xl font-bold text-white tracking-wider">Error</h2>
                    <p className="text-red-200 text-lg">{error}</p>
                </div>
            </div>
        );
    }

    if (!weather.data) return null;

    return (
        <div className="w-full max-w-6xl mx-auto flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
            <WeatherCard
                current={weather.data.current}
                location={weather.location}
                favorites={favorites}
                onToggleFavorite={onToggleFavorite}
            />

            <div className="flex flex-col lg:flex-row gap-6 w-full">
                <div className="w-full lg:w-2/3 flex flex-col gap-6">
                    <WeatherDetails current={weather.data.current} daily={weather.data.daily} />
                    <WeatherChart hourly={weather.data.hourly} />
                </div>
                <div className="w-full lg:w-1/3">
                    <ForecastCard daily={weather.data.daily} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
