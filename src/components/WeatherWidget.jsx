import React, { useEffect, useState } from 'react';
import { fetchWeatherForDestination } from '../services/weatherService';

export function WeatherWidget({ destination }) {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const loadWeather = async () => {
      if (!destination) return;
      setLoading(true);
      const result = await fetchWeatherForDestination(destination);
      if (isMounted) {
        setWeather(result);
        setLoading(false);
      }
    };

    loadWeather();
    return () => {
      isMounted = false;
    };
  }, [destination?.id, destination?.name]);

  if (!destination) {
    return <div className="weather-message">Weather is only available for destinations with configured coordinates.</div>;
  }

  if (loading) {
    return <div className="weather-card weather-loading"><span className="eyebrow light">Live conditions</span><strong>Loading weather…</strong></div>;
  }

  if (!weather?.ok) {
    return (
      <div className="weather-card weather-empty">
        <span className="eyebrow light">Live conditions</span>
        <strong>{destination.name}</strong>
        <p>{weather?.message || 'Weather data is unavailable right now.'}</p>
      </div>
    );
  }

  return (
    <div className="weather-card weather-ready">
      <div className="weather-header">
        <span className="eyebrow light">Live conditions</span>
        <small>{weather.source}</small>
      </div>
      <div className="weather-summary">
        <span className="weather-icon">☼</span>
        <div>
          <strong>{weather.temperature ?? '—'}°C</strong>
          <p>{weather.condition}</p>
        </div>
      </div>
      <ul className="weather-meta">
        {weather.humidity !== null && <li>Humidity: {weather.humidity}%</li>}
        {weather.wind !== null && <li>Wind: {weather.wind} km/h</li>}
      </ul>
      {weather.notice && <p className="weather-note">{weather.notice}</p>}
    </div>
  );
}
