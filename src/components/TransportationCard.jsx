import React from 'react';

export function TransportationCard({ transport }) {
  return (
    <article className="phase2-card transport-card">
      <div className="phase2-card-body">
        <span className="phase2-label">{transport.type} {transport.developmentData ? '· Development information' : ''}</span>
        <h3>{transport.name}</h3>
        {transport.route && <p className="phase2-meta">{transport.route}</p>}
        <p>{transport.description}</p>
        {transport.importantInformation && <small>{transport.importantInformation}</small>}
        {transport.location && <small>Location: {transport.location}</small>}
        {transport.contactWebsite && <div className="phase2-actions"><a href={transport.contactWebsite} target="_blank" rel="noreferrer">Contact / website <span aria-hidden="true">↗</span></a></div>}
      </div>
    </article>
  );
}
