import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getMapMarkers, nepalMapCenter } from '../data/destinationLocations';

const mapMarkerIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapFocus({ selectedDestination, defaultCenter }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedDestination?.coordinates) {
      map.setView(defaultCenter, 7, { animate: true });
      return;
    }

    map.flyTo(selectedDestination.coordinates, 9, { animate: true, duration: 1.2 });
  }, [defaultCenter, map, selectedDestination]);

  return null;
}

export function InteractiveMap({ destinations = [], selectedDestination, onSelectDestination }) {
  const mapDestinations = getMapMarkers(destinations);
  const activeDestination = selectedDestination || mapDestinations[0];
  const defaultCenter = activeDestination?.coordinates || nepalMapCenter;

  return (
    <div className="map-shell">
      <div className="interactive-map-wrapper">
        <MapContainer center={defaultCenter} zoom={7} scrollWheelZoom={true} className="interactive-map" attributionControl={true}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapFocus defaultCenter={nepalMapCenter} selectedDestination={activeDestination} />
          {mapDestinations.map((destination) => (
            <Marker
              key={destination.id || destination.name}
              position={destination.coordinates}
              icon={mapMarkerIcon}
              eventHandlers={{
                click: () => onSelectDestination?.(destination),
              }}
            >
              <Popup>
                <div className="map-popup">
                  <strong>{destination.name}</strong>
                  <span>{destination.location || destination.province || 'Nepal'}</span>
                  <a href={destination.directionsLink || 'https://www.openstreetmap.org/'} target="_blank" rel="noreferrer">
                    Open location ↗
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="map-info-panel">
        {activeDestination ? (
          <>
            <p className="eyebrow">Selected destination</p>
            <h3>{activeDestination.name}</h3>
            <p>{activeDestination.description || 'Explore this destination and plan your route through Nepal.'}</p>
            <div className="map-action-row">
              <a href={activeDestination.directionsLink || 'https://www.openstreetmap.org/'} target="_blank" rel="noreferrer" className="button button-dark">
                Open in map
              </a>
              {activeDestination.id && (
                <button type="button" className="button button-outline" onClick={() => onSelectDestination?.(activeDestination)}>
                  View destination
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="eyebrow">Map overview</p>
            <h3>Choose a destination</h3>
            <p>Markers highlight major destinations across Nepal. Click any point to inspect it.</p>
          </>
        )}
      </div>
    </div>
  );
}
