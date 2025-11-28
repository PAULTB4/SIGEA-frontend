import apiClient from './axiosConfig';
import { jwtDecode } from 'jwt-decode';
import { handleApiError, logError } from '../utils/errorHandler';
import { normalizeResponse } from '../utils/apiHelpers';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK_API = import.meta.env.MODE === 'development' && import.meta.env.VITE_USE_MOCK_API === 'true';

// Solo importar mockAuthService en desarrollo
let mockAuthService = null;
if (USE_MOCK_API) {
  mockAuthService = require('./mockAuthService').default;
}

const authService = {
  login: async (email, password) => {
    try {
      let response;

      if (USE_MOCK_API && mockAuthService) {
        response = await mockAuthService.mockLogin(email, password);
      } else {
        // ✅ CORREGIDO: URL completa y campos correctos
        const apiResponse = await apiClient.post(`${API_BASE_URL}/usuarios/auth/login`, {
          correo: email,  // ✅ Mapear email a correo
          password: password
        });
        
        // ✅ CORREGIDO: Adaptar respuesta del backend SIGEA
        // Respuesta del backend: { status: true, message: "...", extraData: { tokenUsuario: "..." } }
        const backendData = apiResponse.data;
        
        if (!backendData.status) {
          throw new Error(backendData.message || 'Error al iniciar sesión');
        }
        
        const token = backendData.extraData?.tokenUsuario;
        
        if (!token) {
          throw new Error('No se recibió token de autenticación');
        }
        
        // Intentar obtener el rol desde el token JWT
        let userRole = 'participante'; // valor por defecto
        try {
          const decoded = jwtDecode(token);
          userRole = decoded.role || decoded.rol || 'participante';
        } catch (error) {
          console.warn('No se pudo decodificar el rol del token, usando valor por defecto');
        }
        
        // Crear respuesta normalizada para el frontend
        response = {
          token: token,
          user: {
            email: email,
            role: userRole
          },
          message: backendData.message
        };
      }

      const apiReturnedRole = response.user?.role || response.role;

      if (!apiReturnedRole) {
        throw new Error('API response does not contain user role information');
      }

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', apiReturnedRole);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
      }

      return {
        ...response,
        user: {
          ...response.user,
          role: apiReturnedRole
        }
      };
    } catch (error) {
      logError(error, 'authService.login');
      
      const errorInfo = handleApiError(error);
      throw new Error(errorInfo.message || 'Error al iniciar sesión');
    }
  },

  register: async (fullName, email, dni, password) => {
    try {
      let response;

      if (USE_MOCK_API && mockAuthService) {
        response = await mockAuthService.mockRegister(fullName, email, dni, password);
      } else {
        const apiResponse = await apiClient.post(`${API_BASE_URL}/auth/register`, {
          fullName,
          email,
          dni,
          password
        });
        response = normalizeResponse(apiResponse);
      }

      const apiReturnedRole = response.user?.role || response.role || 'participante';

      if (response.token) {
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('userRole', apiReturnedRole);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
      }

      return {
        ...response,
        user: {
          ...response.user,
          role: apiReturnedRole
        }
      };
    } catch (error) {
      logError(error, 'authService.register');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  verifyDNI: async (dni) => {
    try {
      let response;

      if (USE_MOCK_API && mockAuthService) {
        response = await mockAuthService.mockVerifyDNI(dni);
      } else {
        const apiResponse = await apiClient.post(`${API_BASE_URL}/auth/password-recovery/initiate`, { dni });
        response = normalizeResponse(apiResponse);
      }

      return response;
    } catch (error) {
      logError(error, 'authService.verifyDNI');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  verifyRecoveryCode: async (dni, code) => {
    try {
      let response;

      if (USE_MOCK_API && mockAuthService) {
        response = await mockAuthService.mockVerifyCode(dni, code);
      } else {
        const apiResponse = await apiClient.post(`${API_BASE_URL}/auth/password-recovery/verify-code`, {
          dni,
          code
        });
        response = normalizeResponse(apiResponse);
      }

      return response;
    } catch (error) {
      logError(error, 'authService.verifyRecoveryCode');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  resetPassword: async (dni, newPassword) => {
    try {
      let response;

      if (USE_MOCK_API && mockAuthService) {
        response = await mockAuthService.mockResetPassword(dni, newPassword);
      } else {
        const apiResponse = await apiClient.post(`${API_BASE_URL}/auth/password-recovery/reset`, {
          dni,
          newPassword
        });
        response = normalizeResponse(apiResponse);
      }

      return response;
    } catch (error) {
      logError(error, 'authService.resetPassword');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('tokenTimestamp');
    localStorage.removeItem('user');
  },

  getToken: () => {
    return localStorage.getItem('authToken');
  },

  getUserRole: () => {
    return localStorage.getItem('userRole');
  },

  isAuthenticated: () => {
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return false;
    }
    
    if (USE_MOCK_API) {
      const timestamp = localStorage.getItem('tokenTimestamp');
      if (!timestamp) {
        return false;
      }
      
      const oneHour = 60 * 60 * 1000;
      const isValid = Date.now() - parseInt(timestamp) < oneHour;
      
      if (!isValid) {
        authService.logout();
        return false;
      }
      
      return true;
    }
    
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp && decoded.exp * 1000 < Date.now()) {
        authService.logout();
        return false;
      }
      return true;
    } catch (error) {
      console.error('JWT inválido:', error);
      authService.logout();
      return false;
    }
  },

  getTokenExpiration: () => {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    
    if (USE_MOCK_API) {
      const timestamp = localStorage.getItem('tokenTimestamp');
      if (!timestamp) return null;
      return new Date(parseInt(timestamp) + 60 * 60 * 1000);
    }
    
    try {
      const decoded = jwtDecode(token);
      return decoded.exp ? new Date(decoded.exp * 1000) : null;
    } catch {
      return null;
    }
  },

  isTokenExpiringSoon: () => {
    const expiration = authService.getTokenExpiration();
    if (!expiration) return false;
    
    const fiveMinutesFromNow = Date.now() + (5 * 60 * 1000);
    return expiration.getTime() < fiveMinutesFromNow;
  },

  refreshToken: async () => {
    try {
      if (USE_MOCK_API) {
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        return true;
      }
      
      const currentToken = authService.getToken();
      if (!currentToken) return false;
      
      const response = await apiClient.post(`${API_BASE_URL}/auth/refresh`, {
        token: currentToken
      });
      
      const normalizedResponse = normalizeResponse(response);
      
      if (normalizedResponse.token) {
        localStorage.setItem('authToken', normalizedResponse.token);
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        return true;
      }
      
      return false;
    } catch (error) {
      logError(error, 'authService.refreshToken');
      return false;
    }
  },

  validateSession: async () => {
    if (!authService.isAuthenticated()) {
      return false;
    }
    
    if (authService.isTokenExpiringSoon()) {
      return await authService.refreshToken();
    }
    
    return true;
  }
};

export default authService;