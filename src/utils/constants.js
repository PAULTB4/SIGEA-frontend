export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  PROGRAMS: '/programs',
  CERTIFICATIONS: '/certifications',
  REVIEWS: '/reviews',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
};

export const APP_NAME = 'SIGEA';
export const APP_FULL_NAME = 'Sistema Integral de Gestión de Eventos Académicos';
export const UNIVERSITY_NAME = 'U.N.A.S';

export const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  ACCENT: '#59EBBF',
  ACCENT_LIGHT: '#A7D3EB',
  DARK: '#0F172A',
  DARK_LIGHT: '#1E293B',
};

export const MESSAGES = {
  LOADING: 'Cargando...',
  ERROR: 'Ocurrió un error. Por favor intenta nuevamente.',
  NO_DATA: 'No hay datos disponibles en este momento.',
  SUCCESS: 'Operación exitosa',
  API_FALLBACK: 'Usando datos de respaldo (API no disponible)',
};