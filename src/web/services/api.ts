import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Appointments
export const getAppointments = () => api.get('/appointments');
export const createAppointment = (data) => api.post('/appointments', data);
export const confirmAppointment = (id) => api.put(`/appointments/${id}/confirm`);
export const cancelAppointment = (id) => api.put(`/appointments/${id}/cancel`);

// Services
export const getServices = () => api.get('/services');
export const createService = (data) => api.post('/services', data);