/**
 * API Helper Functions
 * Utilities for handling API responses and common operations
 */

/**
 * Normalize API responses to handle different response structures
 */
export const normalizeResponse = (response) => {
  // Handle nested data structure (common in REST APIs)
  if (response?.data?.data) {
    return response.data.data;
  }
  
  // Handle simple data structure
  if (response?.data) {
    return response.data;
  }
  
  // Handle raw response (no wrapper)
  return response;
};

/**
 * Extract error message from different error structures
 */
export const extractErrorMessage = (error) => {
  return (
    error.response?.data?.message ||
    error.response?.data?.error ||
    error.message ||
    'Error desconocido'
  );
};

/**
 * Check if response is successful
 */
export const isSuccessResponse = (response) => {
  if (response?.success !== undefined) {
    return response.success === true;
  }
  return !response?.error;
};

/**
 * Create standardized API response format
 */
export const createResponse = (data, message = '') => {
  return {
    success: true,
    data,
    message
  };
};

/**
 * Create standardized error response format
 */
export const createErrorResponse = (message, status = 500) => {
  return {
    success: false,
    message,
    status,
    data: null
  };
};