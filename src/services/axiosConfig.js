import axios from 'axios';
import API_CONFIG, { devLog } from '../config/api.config';

/**
 * Cliente Axios configurado para la API de SIGEA
 * Maneja automáticamente:
 * - Headers de autorización
 * - Interceptores de request/response
 * - Refresh de tokens
 * - Manejo de errores
 */

const apiClient = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: API_CONFIG.TIMEOUT,
  withCredentials: true  // ✅ AGREGAR ESTA LÍNEA
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  
  failedQueue = [];
};

/**
 * Interceptor de Request
 * Agrega el token de autenticación a cada petición
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    devLog(`Request: ${config.method?.toUpperCase()} ${config.url}`, {
      headers: config.headers,
      data: config.data
    });
    
    return config;
  },
  (error) => {
    devLog('Request Error:', error);
    return Promise.reject(error);
  }
);

/**
 * Interceptor de Response
 * Maneja errores y refresh de tokens automáticamente
 */
apiClient.interceptors.response.use(
  (response) => {
    devLog(`Response: ${response.status}`, response.data);
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    devLog('Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message,
      url: error.config?.url
    });
    
    // Si es 401 y no es el endpoint de login, intentar refresh
    if (
      error.response?.status === 401 && 
      !originalRequest._retry &&
      !originalRequest.url?.includes('/auth/login')
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch(err => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        const currentToken = localStorage.getItem('authToken');
        
        if (!currentToken) {
          isRefreshing = false;
          processQueue(error, null);
          
          // Limpiar localStorage
          localStorage.removeItem('authToken');
          localStorage.removeItem('userRole');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('tokenTimestamp');
          localStorage.removeItem('user');
          
          // Redirigir al login si no estamos ya ahí
          if (window.location.pathname !== '/auth') {
            window.location.href = '/auth';
          }
          
          return reject(error);
        }

        // Intentar refresh del token
        apiClient
          .post(API_CONFIG.AUTH_ENDPOINTS.REFRESH, { token: currentToken })
          .then(response => {
            const newToken = response.data?.extraData?.tokenUsuario || 
                           response.data?.token || 
                           response.data?.data?.token;
            
            if (newToken) {
              localStorage.setItem('authToken', newToken);
              localStorage.setItem('tokenTimestamp', Date.now().toString());
              
              apiClient.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
              
              processQueue(null, newToken);
              resolve(apiClient(originalRequest));
            } else {
              throw new Error('No token in refresh response');
            }
          })
          .catch(err => {
            processQueue(err, null);
            
            // Limpiar localStorage
            localStorage.removeItem('authToken');
            localStorage.removeItem('userRole');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('tokenTimestamp');
            localStorage.removeItem('user');
            
            // Redirigir al login
            if (window.location.pathname !== '/auth') {
              window.location.href = '/auth';
            }
            
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    
    // Si es 403, mostrar mensaje pero no redirigir
    if (error.response?.status === 403) {
      console.error('Acceso prohibido:', error.response?.data?.message);
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;