import { getDestinationLocation } from '../data/destinationLocations';

const weatherCodeMap = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Foggy',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  56: 'Freezing drizzle',
  57: 'Heavy freezing drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  66: 'Freezing rain',
  67: 'Heavy freezing rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  77: 'Snow grains',
  80: 'Rain showers',
  81: 'Heavy showers',
  82: 'Thunderstorms',
  85: 'Snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with hail',
  99: 'Thunderstorm with hail',
};

function normalizeOpenMeteoData(data) {
  const current = data?.current || {};
  const weatherCode = current.weather_code ?? 0;

  return {
    ok: true,
    temperature: Number.isFinite(current.temperature_2m) ? Math.round(current.temperature_2m) : null,
    humidity: Number.isFinite(current.relative_humidity_2m) ? Math.round(current.relative_humidity_2m) : null,
    wind: Number.isFinite(current.wind_speed_10m) ? Math.round(current.wind_speed_10m) : null,
    condition: weatherCodeMap[weatherCode] || 'Current conditions',
    source: 'Open-Meteo public forecast',
    keyConfigured: Boolean(import.meta.env.VITE_WEATHER_API_KEY),
  };
}

function normalizeOpenWeatherData(data) {
  const weather = data?.weather?.[0] || {};
  const main = data?.main || {};
  const wind = data?.wind || {};

  return {
    ok: true,
    temperature: Number.isFinite(main.temp) ? Math.round(main.temp) : null,
    humidity: Number.isFinite(main.humidity) ? Math.round(main.humidity) : null,
    wind: Number.isFinite(wind.speed) ? Math.round(wind.speed) : null,
    condition: weather.description ? weather.description.charAt(0).toUpperCase() + weather.description.slice(1) : 'Current conditions',
    source: 'OpenWeatherMap',
    keyConfigured: true,
  };
}

export async function fetchWeatherForDestination(destination) {
  const location = getDestinationLocation(destination);
  if (!location) {
    return {
      ok: false,
      message: 'Weather is unavailable for this destination because no coordinates are configured yet.',
    };
  }

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
  const url = apiKey
    ? `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${encodeURIComponent(apiKey)}`
    : `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Weather request failed with status ${response.status}`);
    }

    const payload = await response.json();
    if (apiKey) {
      return normalizeOpenWeatherData(payload);
    }

    return {
      ...normalizeOpenMeteoData(payload),
      notice: 'Using the public Open-Meteo forecast service. Add VITE_WEATHER_API_KEY for a provider-specific key.',
    };
  } catch (error) {
    return {
      ok: false,
      message: apiKey
        ? 'Live weather is currently unavailable. Please try again shortly.'
        : 'Weather is currently unavailable. Add VITE_WEATHER_API_KEY to enable live destination forecasts.',
    };
  }
}
