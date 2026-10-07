import { fetchApi } from '../apiConfig';

export function getNotifications(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      query.set(key, value);
    }
  });
  const suffix = query.toString() ? `?${query.toString()}` : '';
  return fetchApi(`/api/notifications${suffix}`);
}
