import axios from 'axios';

// We use Open-Meteo as it's a completely free open source weather API without requiring API keys
const API_BASE_URL = 'https://api.open-meteo.com/v1';
const GEO_API_URL = 'https://geocoding-api.open-meteo.com/v1';

/**
 * Searches for a city and gets its coordinates
 * @param {string} cityName 
 * @returns {Promise<Object>} city metadata (lat, lon, name, country)
 */
export const searchCity = async (cityName) => {
    try {
        const response = await axios.get(`${GEO_API_URL}/search`, {
            params: {
                name: cityName,
                count: 5,
                language: 'en',
                format: 'json'
            }
        });

        if (response.data.results && response.data.results.length > 0) {
            return response.data.results[0]; // Return the best match
        }
        throw new Error('City not found');
    } catch (error) {
        if (error.response) {
            throw new Error('Failed to search city. Please try again.');
        }
        throw error;
    }
};

/**
 * Gets weather forecast using latitude and longitude
 * @param {number} lat 
 * @param {number} lon 
 * @returns {Promise<Object>} weather forecast data
 */
export const getWeatherList = async (lat, lon) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/forecast`, {
            params: {
                latitude: lat,
                longitude: lon,
                current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m',
                hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,weather_code',
                daily: 'weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
                timezone: 'auto',
                forecast_days: 7
            }
        });

        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch weather data.');
    }
};

// Map WMO weather codes to English descriptions and our custom Icons
export const getWeatherCondition = (code) => {
    // Freezing/Snow options
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { name: 'Snow', type: 'snow' };
    // Rain/Drizzle options
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { name: 'Rain', type: 'rain' };
    // Thunderstorm
    if ([95, 96, 99].includes(code)) return { name: 'Thunderstorm', type: 'thunderstorm' };
    // Cloudy options
    if ([2, 3].includes(code)) return { name: 'Cloudy', type: 'cloudy' };
    // Fog
    if ([45, 48].includes(code)) return { name: 'Foggy', type: 'fog' };
    // Clear
    if ([0, 1].includes(code)) return { name: 'Clear', type: 'clear' };

    return { name: 'Unknown', type: 'clear' };
};
