import React from 'react';

export function HotelCard({ hotel, favorite = false, onFavorite }) {
  return (
    <article className="phase2-card hotel-card">
      {hotel.imageUrl && <img src={hotel.imageUrl} alt={hotel.name} />}
      <div className="phase2-card-body"><button type="button" className={`phase2-favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite?.(hotel)} aria-label={`${favorite ? 'Remove' : 'Save'} ${hotel.name}`}>{favorite ? '♥' : '♡'}</button>
        <span className="phase2-label">{hotel.developmentData ? 'Development listing' : 'Accommodation'}</span>
        <h3>{hotel.name}</h3>
        <p className="phase2-meta">{hotel.destination}</p>
        <p>{hotel.description}</p>
        {hotel.address && <small>Address: {hotel.address}</small>}
        <div className="phase2-actions">
          {hotel.websiteUrl && <a href={hotel.websiteUrl} target="_blank" rel="noreferrer">Website <span aria-hidden="true">↗</span></a>}
          {hotel.mapUrl && <a href={hotel.mapUrl} target="_blank" rel="noreferrer">Map <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
