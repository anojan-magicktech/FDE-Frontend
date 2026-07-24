import axios from 'axios';

export const apiBaseUrl =
  process.env.REACT_APP_BASEAPI || process.env.VITE_BASE_API || 'http://localhost:8000';

const api = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getImageUrl = (url?: string | null): string | undefined => {
  if (!url) return undefined;
  return url.startsWith('http') ? url : `${apiBaseUrl}${url}`;
};

export default api;
