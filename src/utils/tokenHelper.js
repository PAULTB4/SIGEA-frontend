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

export default {
  decodeToken,
  isTokenExpired,
  getTimeUntilExpiration,
  isTokenExpiringSoon,
  getUserIdFromToken,
  getRoleFromToken,
  getExpirationDate,
};