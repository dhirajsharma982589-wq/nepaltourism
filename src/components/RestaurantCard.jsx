import React from 'react';

export function RestaurantCard({ restaurant, favorite = false, onFavorite }) {
  return (
    <article className="phase2-card restaurant-card">
      {restaurant.imageUrl && <img src={restaurant.imageUrl} alt={restaurant.name} />}
      <div className="phase2-card-body"><button type="button" className={`phase2-favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite?.(restaurant)} aria-label={`${favorite ? 'Remove' : 'Save'} ${restaurant.name}`}>{favorite ? '♥' : '♡'}</button>
        <span className="phase2-label">{restaurant.developmentData ? 'Development listing' : 'Restaurant'}</span>
        <h3>{restaurant.name}</h3>
        <p className="phase2-meta">{restaurant.location} · {restaurant.cuisine || 'Cuisine not specified'}</p>
        <p>{restaurant.description}</p>
        {restaurant.contactInformation && <small>{restaurant.contactInformation}</small>}
        <div className="phase2-actions">
          {restaurant.websiteUrl && <a href={restaurant.websiteUrl} target="_blank" rel="noreferrer">Website <span aria-hidden="true">↗</span></a>}
          {restaurant.mapUrl && <a href={restaurant.mapUrl} target="_blank" rel="noreferrer">Map <span aria-hidden="true">↗</span></a>}
        </div>
      </div>
    </article>
  );
}
