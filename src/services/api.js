import axios from 'axios';

const apiBaseUrl = process.env.REACT_APP_BASEAPI || process.env.VITE_BASE_API || "http://localhost:8000";

const api = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export { apiBaseUrl };
export default api;
