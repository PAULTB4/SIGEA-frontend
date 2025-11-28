/**
 * Centralized Error Handler
 */

/**
 * Handle API errors with consistent structure
 */
export const handleApiError = (error) => {
  // Server responded with error status
  if (error.response) {
    const status = error.response.status;
    const message = error.response.data?.message || 
                   error.response.data?.error ||
                   getDefaultErrorMessage(status);
    
    return {
      success: false,
      message,
      status,
      data: error.response.data || null,
      type: 'server_error'
    };
  }
  
  // Request was made but no response received
  if (error.request) {
    return {
      success: false,
      message: 'No se pudo conectar con el servidor. Verifica tu conexión a internet.',
      status: 0,
      data: null,
      type: 'network_error'
    };
  }
  
  // Something else happened
  return {
    success: false,
    message: error.message || 'Error desconocido. Intenta nuevamente.',
    status: -1,
    data: null,
    type: 'unknown_error'
  };
};

/**
 * Get user-friendly error message based on HTTP status code
 */
const getDefaultErrorMessage = (status) => {
  const errorMessages = {
    400: 'Solicitud inválida. Verifica los datos enviados.',
    401: 'No autorizado. Inicia sesión nuevamente.',
    403: 'No tienes permisos para realizar esta acción.',
    404: 'Recurso no encontrado.',
    409: 'Conflicto con los datos existentes.',
    422: 'Datos no válidos. Verifica el formulario.',
    429: 'Demasiadas solicitudes. Intenta más tarde.',
    500: 'Error interno del servidor.',
    502: 'Servidor no disponible temporalmente.',
    503: 'Servicio no disponible. Intenta más tarde.'
  };
  
  return errorMessages[status] || 'Error en el servidor.';
};

/**
 * Check if error is due to authentication
 */
export const isAuthError = (error) => {
  return error?.status === 401 || error?.status === 403;
};

/**
 * Check if error is due to network issues
 */
export const isNetworkError = (error) => {
  return error?.type === 'network_error' || error?.status === 0;
};

/**
 * Check if error is validation error
 */
export const isValidationError = (error) => {
  return error?.status === 422 || error?.status === 400;
};

/**
 * Log error with context information
 */
export const logError = (error, context = '') => {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🔴 Error${context ? ` in ${context}` : ''}`);
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    console.groupEnd();
  }
};

/**
 * Create user-friendly error message
 */
export const getUserFriendlyError = (error) => {
  const errorInfo = handleApiError(error);
  
  if (errorInfo.type === 'network_error') {
    return 'No se pudo conectar. Verifica tu conexión a internet e intenta nuevamente.';
  }
  
  if (errorInfo.status === 401) {
    return 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
  }
  
  return errorInfo.message;
};