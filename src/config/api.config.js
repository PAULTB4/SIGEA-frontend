/**
 * Configuración centralizada de la API
 * Maneja las URLs base y configuraciones globales
 */

const API_CONFIG = {
  // URL base del backend - se obtiene de variables de entorno
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1',
  
  // Timeout para peticiones (en milisegundos)
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT) || 30000,
  
  // Endpoints de autenticación
  AUTH_ENDPOINTS: {
    LOGIN: '/usuarios/auth/login',
    REGISTER: '/usuarios/administrador/auth/register',
    REFRESH: '/usuarios/auth/refresh',
    LOGOUT: '/usuarios/auth/logout',
  },
  
  // Endpoints de usuarios
  USER_ENDPOINTS: {
    PROFILE: '/usuarios/perfil',
    UPDATE_PROFILE: '/usuarios/perfil',
    PARTICIPANTE_HOME: '/usuarios/participante/home',
    ORGANIZADOR_HOME: '/usuarios/organizador/home',
    ORGANIZADOR_DASHBOARD: '/usuarios/organizador/dashboard',
    ADMINISTRADOR_HOME: '/usuarios/administrador/home',
  },
  
  // Endpoints de roles
  ROLE_ENDPOINTS: {
    CREATE: '/usuarios/administrador/crear-rol',
    LIST: '/usuarios/roles',
  },
  
  // Endpoints de actividades
  ACTIVITY_ENDPOINTS: {
    LIST: '/actividades/listar',
    CREATE: '/actividades/crear',
    UPDATE: '/actividades/actualizar',
    DELETE: '/actividades/eliminar',
  },
  
  // Endpoints de inscripciones
  INSCRIPTION_ENDPOINTS: {
    REGISTER: '/usuarios/participante/inscripcion',
  },
  
  // Endpoints de asistencia
  ATTENDANCE_ENDPOINTS: {
    REGISTER: '/usuarios/organizador/registrar-asistencia',
  },
  
  // Configuración de desarrollo
  USE_MOCK_API: import.meta.env.VITE_USE_MOCK_API === 'true',
  ENABLE_LOGS: import.meta.env.VITE_ENABLE_LOGS === 'true',
};

/**
 * Construye la URL completa para un endpoint
 * @param {string} endpoint - El path del endpoint (ej: '/usuarios/auth/login')
 * @returns {string} URL completa
 */
export const buildUrl = (endpoint) => {
  // Remover slash inicial si existe para evitar duplicados
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  // Remover slash final de BASE_URL si existe
  const cleanBaseUrl = API_CONFIG.BASE_URL.endsWith('/') 
    ? API_CONFIG.BASE_URL.slice(0, -1) 
    : API_CONFIG.BASE_URL;
  
  return `${cleanBaseUrl}/${cleanEndpoint}`;
};

/**
 * Logs de desarrollo
 * @param {string} message - Mensaje a loggear
 * @param {any} data - Datos adicionales
 */
export const devLog = (message, data = null) => {
  if (API_CONFIG.ENABLE_LOGS) {
    console.log(`[SIGEA API] ${message}`, data || '');
  }
};

export default API_CONFIG;