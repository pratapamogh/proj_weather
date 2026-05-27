import { useState, useEffect, useCallback } from 'react';
import { searchCity, getWeatherList } from '../services/weatherApi';

export const useWeather = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState(null); // {name, country}

    const fetchWeatherByCoords = useCallback(async (lat, lon, locName, country) => {
        setLoading(true);
        setError(null);
        try {
            const weatherData = await getWeatherList(lat, lon);
            setData(weatherData);
            setLocation({ name: locName, country });
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWeatherByCity = async (cityName) => {
        setLoading(true);
        setError(null);
        try {
            const cityData = await searchCity(cityName);
            await fetchWeatherByCoords(cityData.latitude, cityData.longitude, cityData.name, cityData.country);
        } catch (err) {
            setError(err.message || 'Failed to find city');
            setLoading(false);
        }
    };

    const fetchCurrentLocationWeather = () => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }

        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    // Fallback location name for current location if reverse geocoding is not used
                    await fetchWeatherByCoords(latitude, longitude, 'Current Location', '');
                } catch (err) {
                    setError('Failed to fetch weather for your location');
                    setLoading(false);
                }
            },
            (err) => {
                setError('Unable to retrieve your location');
                setLoading(false);
            }
        );
    };

    // Check if location permission is already granted, otherwise default to New Delhi
    useEffect(() => {
        if (navigator.permissions && navigator.permissions.query) {
            navigator.permissions.query({ name: 'geolocation' }).then(result => {
                if (result.state === 'granted') {
                    fetchCurrentLocationWeather();
                } else {
                    fetchWeatherByCity('New Delhi');
                }
            }).catch(() => {
                fetchWeatherByCity('New Delhi');
            });
        } else {
            fetchWeatherByCity('New Delhi');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { data, location, loading, error, fetchWeatherByCity, fetchCurrentLocationWeather };
};
