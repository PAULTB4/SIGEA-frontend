import { jwtDecode } from 'jwt-decode';
import { devLog } from '../config/api.config';

/**
 * Helper para manejar tokens JWT
 * Proporciona funciones para decodificar y validar tokens
 */

/**
 * Decodifica un token JWT
 * @param {string} token - Token JWT a decodificar
 * @returns {object|null} Payload del token o null si hay error
 */
export const decodeToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    devLog('Token decoded:', decoded);
    return decoded;
  } catch (error) {
    console.error('Error al decodificar token:', error);
    return null;
  }
};

/**
 * Verifica si un token está expirado
 * @param {string} token - Token JWT a verificar
 * @returns {boolean} true si está expirado
 */
export const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    
    if (!decoded.exp) {
      return false; // Si no tiene exp, asumimos que no expira
    }
    
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    console.error('Error al verificar expiración del token:', error);
    return true; // Si hay error, asumimos que está expirado
  }
};

/**
 * Obtiene el tiempo restante antes de que expire el token (en segundos)
 * @param {string} token - Token JWT
 * @returns {number} Segundos restantes o 0 si está expirado
 */
export const getTimeUntilExpiration = (token) => {
  try {
    const decoded = jwtDecode(token);
    
    if (!decoded.exp) {
      return Infinity; // Si no tiene exp, retornamos infinito
    }
    
    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;
    
    return Math.max(0, timeRemaining);
  } catch (error) {
    console.error('Error al calcular tiempo de expiración:', error);
    return 0;
  }
};

/**
 * Verifica si el token expirará pronto (en los próximos 5 minutos)
 * @param {string} token - Token JWT
 * @returns {boolean} true si expirará pronto
 */
export const isTokenExpiringSoon = (token) => {
  const timeRemaining = getTimeUntilExpiration(token);
  const fiveMinutes = 5 * 60; // 5 minutos en segundos
  
  return timeRemaining > 0 && timeRemaining < fiveMinutes;
};

/**
 * Obtiene el ID del usuario desde el token
 * @param {string} token - Token JWT
 * @returns {string|null} ID del usuario o null
 */
export const getUserIdFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    // El backend usa 'sub' para el ID del usuario
    return decoded.sub || decoded.userId || decoded.id || null;
  } catch (error) {
    console.error('Error al obtener ID de usuario del token:', error);
    return null;
  }
};

/**
 * Obtiene el rol del usuario desde el token (si existe)
 * @param {string} token - Token JWT
 * @returns {string|null} Rol del usuario o null
 */
export const getRoleFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    return decoded.role || decoded.rol || null;
  } catch (error) {
    console.error('Error al obtener rol del token:', error);
    return null;
  }
};

/**
 * Formatea la fecha de expiración del token
 * @param {string} token - Token JWT
 * @returns {Date|null} Fecha de expiración o null
 */
export const getExpirationDate = (token) => {
  try {
    const decoded = jwtDecode(token);
    
    if (!decoded.exp) {
      return null;
    }
    
    return new Date(decoded.exp * 1000);
  } catch (error) {
    console.error('Error al obtener fecha de expiración:', error);
    return null;
  }
};

// ============================================
// AGREGAR ESTAS FUNCIONES A tu tokenHelper.js EXISTENTE
// ============================================

/**
 * Obtiene información completa del usuario desde el token
 * Útil para obtener userId, email, roles, etc.
 * @param {string} token - Token JWT
 * @returns {object|null} Objeto con información del usuario o null
 */
export const getUserInfoFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    
    return {
      id: decoded.sub || decoded.userId || decoded.id || null,
      email: decoded.email || decoded.correo || null,
      roles: decoded.roles || decoded.authorities || [],
      name: decoded.name || decoded.nombre || null,
      // Agregar cualquier otro campo que tu backend incluya en el JWT
    };
  } catch (error) {
    console.error('Error al obtener información del usuario del token:', error);
    return null;
  }
};

/**
 * Extrae roles del token JWT
 * El backend puede enviar roles como array o string
 * @param {string} token - Token JWT
 * @returns {array} Array de roles
 */
export const getRolesFromToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const roles = decoded.roles || decoded.authorities || [];
    
    // Si es un string, convertir a array
    if (typeof roles === 'string') {
      return [roles];
    }
    
    // Si es un array, retornar tal cual
    if (Array.isArray(roles)) {
      return roles;
    }
    
    return [];
  } catch (error) {
    console.error('Error al obtener roles del token:', error);
    return [];
  }
};

/**
 * Verifica si el usuario tiene un rol específico
 * @param {string} token - Token JWT
 * @param {string} role - Rol a verificar
 * @returns {boolean} true si tiene el rol
 */
export const hasRole = (token, role) => {
  const roles = getRolesFromToken(token);
  return roles.includes(role);
};

/**
 * Verifica si el usuario es organizador
 * @param {string} token - Token JWT
 * @returns {boolean} true si es organizador
 */
export const isOrganizer = (token) => {
  return hasRole(token, 'ORGANIZADOR');
};

/**
 * Verifica si el usuario es administrador
 * @param {string} token - Token JWT
 * @returns {boolean} true si es administrador
 */
export const isAdmin = (token) => {
  return hasRole(token, 'ADMINISTRADOR');
};

/**
 * Verifica si el usuario es participante
 * @param {string} token - Token JWT
 * @returns {boolean} true si es participante
 */
export const isParticipant = (token) => {
  return hasRole(token, 'PARTICIPANTE');
};

// ============================================
// ACTUALIZAR EL EXPORT DEFAULT AL FINAL DEL ARCHIVO
// ============================================

export default {
  decodeToken,
  isTokenExpired,
  getTimeUntilExpiration,
  isTokenExpiringSoon,
  getUserIdFromToken,
  getRoleFromToken,
  getExpirationDate,
  // AGREGAR ESTAS NUEVAS FUNCIONES:
  getUserInfoFromToken,
  getRolesFromToken,
  hasRole,
  isOrganizer,
  isAdmin,
  isParticipant,
};

