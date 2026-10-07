import React from 'react';

function valueOrUnavailable(value) {
  return value || 'Unavailable in the current dataset';
}

export function TrekkingRouteDetails({ route, onClose }) {
  if (!route) return null;
  return (
    <div className="route-details" role="dialog" aria-label={`${route.name} details`}>
      <button type="button" className="route-details-close" onClick={onClose} aria-label="Close route details">×</button>
      <p className="eyebrow">Route details</p>
      <h3>{route.name}</h3>
      <p>{route.description}</p>
      <dl className="route-facts">
        <div><dt>Region</dt><dd>{valueOrUnavailable(route.region)}</dd></div>
        <div><dt>Difficulty</dt><dd>{valueOrUnavailable(route.difficulty)}</dd></div>
        <div><dt>Duration</dt><dd>{valueOrUnavailable(route.duration)}</dd></div>
        <div><dt>Start</dt><dd>{valueOrUnavailable(route.startingPoint)}</dd></div>
        <div><dt>End</dt><dd>{valueOrUnavailable(route.endingPoint)}</dd></div>
        <div><dt>Maximum elevation</dt><dd>{valueOrUnavailable(route.maximumElevation)}</dd></div>
      </dl>
      {route.mapUrl && <a className="button button-dark" href={route.mapUrl} target="_blank" rel="noreferrer">Open route area in map <span aria-hidden="true">↗</span></a>}
    </div>
  );
}
