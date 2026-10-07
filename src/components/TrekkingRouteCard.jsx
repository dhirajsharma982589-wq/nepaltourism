import React from 'react';

export function TrekkingRouteCard({ route, onSelect, favorite = false, onFavorite }) {
  return (
    <article className="phase2-card route-card">
      {route.imageUrl && <img src={route.imageUrl} alt="" />}
      <span className="phase2-label">{route.developmentData ? 'Development route record' : 'Trekking route'}</span>
      <h3>{route.name}</h3>
      <p className="phase2-meta">{route.region || 'Region unavailable'} · {route.difficulty || 'Difficulty unavailable'}</p>
      <p>{route.description}</p>
      <div className="phase2-card-actions"><button type="button" className="route-card-link" onClick={() => onSelect?.(route)}>View route details <span aria-hidden="true">↗</span></button><button type="button" className={`phase2-favorite ${favorite ? 'is-favorite' : ''}`} onClick={() => onFavorite?.(route)} aria-label={`${favorite ? 'Remove' : 'Save'} ${route.name}`}>{favorite ? '♥' : '♡'}</button></div>
    </article>
  );
}
