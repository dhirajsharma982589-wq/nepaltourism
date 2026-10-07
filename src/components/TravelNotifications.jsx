import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getNotifications } from '../services/notificationService';

const TYPE_COLORS = {
  TRAVEL: '#2980b9',
  FESTIVAL: '#8e44ad',
  DESTINATION: '#27ae60',
  TREKKING: '#e67e22',
  WEATHER: '#16a085',
  GENERAL: '#555',
};

const TYPE_ICONS = {
  TRAVEL: '✈️',
  FESTIVAL: '🎉',
  DESTINATION: '📍',
  TREKKING: '🏔️',
  WEATHER: '🌦️',
  GENERAL: 'ℹ️',
};

export function NotificationCard({ notification, t }) {
  const typeLabel = t(`notifications.types.${notification.type}`, { defaultValue: notification.type });
  const priorityLabel = t(`notifications.priorities.${notification.priority}`, { defaultValue: notification.priority });
  const color = TYPE_COLORS[notification.type] || TYPE_COLORS.GENERAL;
  const icon = TYPE_ICONS[notification.type] || TYPE_ICONS.GENERAL;
  const createdDate = notification.createdAt
    ? new Date(notification.createdAt).toLocaleDateString()
    : null;

  return (
    <article className="notification-card" aria-label={notification.title}>
      <div className="notification-card-header">
        <span
          className="notification-type-badge"
          style={{ '--badge-color': color }}
          aria-label={typeLabel}
        >
          <span aria-hidden="true">{icon}</span> {typeLabel}
        </span>
        {notification.destination && (
          <span className="notification-region">📍 {notification.destination}</span>
        )}
      </div>
      <h3 className="notification-title">{notification.title}</h3>
      <p className="notification-message">{notification.message}</p>
      <div className="notification-meta">
        <span>{priorityLabel}</span>
        {createdDate && <time dateTime={notification.createdAt}>{createdDate}</time>}
      </div>
    </article>
  );
}

export function TravelNotifications({ onBack }) {
  const { t } = useTranslation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let cancelled = false;
    getNotifications()
      .then((data) => {
        if (!cancelled) setNotifications(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        if (!cancelled) setError(t('notifications.error'));
      })
      .finally(() => { if (!cancelled) setLoading(false); });
    return () => { cancelled = true; };
  }, [t]);

  return (
    <main className="notifications-page">
      <section className="notifications-hero">
        <div className="page-container">
          <button className="explore-back" onClick={onBack}>{t('common.back')}</button>
          <p className="eyebrow light">{t('notifications.eyebrow')}</p>
          <h1>{t('notifications.title')}</h1>
          <p>{t('notifications.subtitle')}</p>
        </div>
      </section>

      <section className="page-container notifications-content">
        {loading && <div className="empty-state">{t('notifications.loading')}</div>}
        {!loading && error && <div className="empty-state" role="alert">{error}</div>}
        {!loading && !error && notifications.length === 0 && (
          <div className="empty-state">{t('notifications.empty')}</div>
        )}
        {!loading && !error && notifications.length > 0 && (
          <div className="notifications-grid">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} notification={notification} t={t} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
