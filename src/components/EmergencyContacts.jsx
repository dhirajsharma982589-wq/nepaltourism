import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { fetchApi } from '../apiConfig';

/* ─── Verified fallback data (shown if backend is unreachable) ─────────────────
   Phone numbers sourced from Nepal Police, Nepal Tourism Board, and Red Cross.
   Do NOT modify without re-verifying the numbers. */
const FALLBACK_CONTACTS = [
  {
    id: 1,
    name: 'Nepal Police',
    phone: '100',
    serviceType: 'POLICE',
    description: 'National police emergency line. Dial 100 from any telephone in Nepal.',
    actionInfo: 'State your location clearly and describe the emergency. Available 24 hours.',
    available: true,
  },
  {
    id: 2,
    name: 'Ambulance',
    phone: '102',
    serviceType: 'AMBULANCE',
    description: 'National ambulance emergency service. Coverage and response time vary by area.',
    actionInfo: 'Give your exact location, describe the situation and wait for confirmation. Response times may be longer in remote areas.',
    available: true,
  },
  {
    id: 3,
    name: 'Fire Service',
    phone: '101',
    serviceType: 'FIRE',
    description: 'National fire emergency service.',
    actionInfo: 'State your location and the nature of the fire. Move to a safe distance immediately.',
    available: true,
  },
  {
    id: 4,
    name: 'Tourist Police',
    phone: '1144',
    serviceType: 'TOURIST_POLICE',
    description: 'Nepal Tourism Board Tourist Police Hotline. Assists tourists with safety, lost documents and emergencies.',
    actionInfo: 'Dial 1144 for tourist-specific police assistance. English-speaking officers are generally available.',
    available: true,
  },
  {
    id: 5,
    name: 'Armed Police Force',
    phone: '103',
    serviceType: 'ARMED_POLICE',
    description: 'Armed Police Force emergency contact for security incidents.',
    actionInfo: 'For security emergencies. Provide your exact location and the nature of the incident.',
    available: true,
  },
  {
    id: 6,
    name: 'Nepal Red Cross',
    phone: '+977-1-4270650',
    serviceType: 'RED_CROSS',
    description: 'Nepal Red Cross Society — Kathmandu headquarters. For disaster response and humanitarian assistance.',
    actionInfo: 'Contact for disaster response, first aid and humanitarian support. Availability may vary outside office hours.',
    available: true,
  },
];

const SERVICE_ICONS = {
  POLICE: '🚔',
  AMBULANCE: '🚑',
  FIRE: '🚒',
  TOURIST_POLICE: '👮',
  ARMED_POLICE: '🛡️',
  RED_CROSS: '🏥',
  OTHER: '📞',
};

const SERVICE_COLORS = {
  POLICE: '#1a5fd4',
  AMBULANCE: '#c0392b',
  FIRE: '#e67e22',
  TOURIST_POLICE: '#2980b9',
  ARMED_POLICE: '#2c3e50',
  RED_CROSS: '#e74c3c',
  OTHER: '#555',
};

function ContactCard({ contact, t }) {
  const icon = SERVICE_ICONS[contact.serviceType] || SERVICE_ICONS.OTHER;
  const color = SERVICE_COLORS[contact.serviceType] || SERVICE_COLORS.OTHER;

  return (
    <article className="emergency-card" aria-label={contact.name}>
      <div className="emergency-card-header" style={{ '--service-color': color }}>
        <span className="emergency-icon" aria-hidden="true">{icon}</span>
        <div className="emergency-name-block">
          <h3>{contact.name}</h3>
          {contact.phone && contact.available ? (
            <a
              href={`tel:${contact.phone.replace(/\s/g, '')}`}
              className="emergency-number"
              aria-label={`${t('emergency.call')} ${contact.name}: ${contact.phone}`}
            >
              {contact.phone}
            </a>
          ) : (
            <span className="emergency-number unavailable">{t('emergency.unavailable')}</span>
          )}
        </div>
        {contact.phone && contact.available && (
          <a
            href={`tel:${contact.phone.replace(/\s/g, '')}`}
            className="emergency-call-button"
            aria-label={`${t('emergency.callNow')} ${contact.name}`}
          >
            📲 {t('emergency.callNow')}
          </a>
        )}
      </div>
      {contact.description && (
        <p className="emergency-description">{contact.description}</p>
      )}
      {contact.actionInfo && (
        <div className="emergency-action">
          <strong>{t('emergency.actionLabel')}:</strong>
          <span>{contact.actionInfo}</span>
        </div>
      )}
    </article>
  );
}

export function EmergencyContacts({ onBack }) {
  const { t } = useTranslation();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetchApi('/api/emergency-contacts')
      .then((data) => {
        if (!cancelled) {
          setContacts(Array.isArray(data) && data.length > 0 ? data : FALLBACK_CONTACTS);
          if (!Array.isArray(data) || data.length === 0) setUsingFallback(true);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setContacts(FALLBACK_CONTACTS);
          setUsingFallback(true);
        }
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, []);

  return (
    <main className="emergency-page">
      <section className="emergency-hero">
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>{t('common.back')}</button>
          <p className="eyebrow light">{t('emergency.eyebrow')}</p>
          <h1>{t('emergency.title')}</h1>
          <p>{t('emergency.subtitle')}</p>
        </div>
      </section>

      <section className="page-container emergency-content">
        {loading && <div className="empty-state">{t('emergency.loading')}</div>}
        {!loading && usingFallback && (
          <div className="emergency-fallback-notice" role="status">
            ⚠️ {t('emergency.backendError')}
          </div>
        )}
        {!loading && (
          <>
            <div className="emergency-grid">
              {contacts.map((contact) => (
                <ContactCard key={contact.id} contact={contact} t={t} />
              ))}
            </div>
            <div className="emergency-important-note" role="note">
              <span aria-hidden="true">ℹ️</span>
              {t('emergency.important')}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
