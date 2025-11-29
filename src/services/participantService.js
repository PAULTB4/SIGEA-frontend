import axios from 'axios';
import authService from './authService';
import { handleApiError, logError } from '../utils/errorHandler';
import { normalizeResponse } from '../utils/apiHelpers';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API !== 'false';

const participantService = {
  /**
   * Get participant profile data
   * @returns {Promise<Object>} User profile
   */
  getProfile: async () => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockGetProfile();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/participants/profile`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
      logError(error, 'serviceName.methodName');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * Get participant's enrolled activities/courses
   * @returns {Promise<Array>} List of enrollments
   */
  getMyEnrollments: async () => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockGetMyEnrollments();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/participants/enrollments`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
      logError(error, 'serviceName.methodName');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * Get participant's certificates
   * @returns {Promise<Array>} List of certificates
   */
  getMyCertificates: async () => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockGetMyCertificates();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/participants/certificates`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
      logError(error, 'serviceName.methodName');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * Get dashboard statistics
   * @returns {Promise<Object>} Dashboard stats
   */
  getDashboardStats: async () => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockGetDashboardStats();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/participants/stats`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
        logError(error, 'serviceName.methodName');
        const errorInfo = handleApiError(error);
        throw { message: errorInfo.message }; 
    }
  },

  /**
   * Enroll in an activity
   * @param {String} activityId - Activity ID
   * @param {Object} enrollmentData - Enrollment form data
   * @returns {Promise<Object>} Enrollment confirmation
   */
  enrollInActivity: async (activityId, enrollmentData) => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockEnrollInActivity(activityId, enrollmentData);
      } else {
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/participants/enrollments`,
          {
            activityId,
            ...enrollmentData
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
        logError(error, 'serviceName.methodName');
        const errorInfo = handleApiError(error);
        throw { message: errorInfo.message }; 
    }
  },

  /**
   * Submit payment for enrollment
   * @param {String} enrollmentId - Enrollment ID
   * @param {Object} paymentData - Payment details
   * @returns {Promise<Object>} Payment confirmation
   */
  submitPayment: async (enrollmentId, paymentData) => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockSubmitPayment(enrollmentId, paymentData);
      } else {
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/participants/payments`,
          {
            enrollmentId,
            ...paymentData
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
        logError(error, 'serviceName.methodName');
        const errorInfo = handleApiError(error);
        throw { message: errorInfo.message }; 
    }
  },

  /**
   * Download certificate
   * @param {String} certificateId - Certificate ID
   * @returns {Promise<Blob>} Certificate PDF
   */
  downloadCertificate: async (certificateId) => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockDownloadCertificate(certificateId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/participants/certificates/${certificateId}/download`,
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
            responseType: 'blob'
          }
        );
        return normalizeResponse(response);
      }
    } catch (error) {
        logError(error, 'serviceName.methodName');
        const errorInfo = handleApiError(error);
        throw { message: errorInfo.message }; 
    }
  },

  /**
   * Verify certificate online
   * @param {String} certificateId - Certificate ID
   * @returns {Promise<Object>} Verification details
   */
  verifyCertificate: async (certificateId) => {
    try {
      if (USE_MOCK_API) {
        return participantService.mockVerifyCertificate(certificateId);
      } else {
        const response = await axios.get(
          `${API_BASE_URL}/certificates/${certificateId}/verify`
        );
        return normalizeResponse(response);
      }
    } catch (error) {
        logError(error, 'serviceName.methodName');
        const errorInfo = handleApiError(error);
        throw { message: errorInfo.message }; 
    }
  },

  // ============ MOCK IMPLEMENTATIONS ============

  mockGetProfile: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            id: 'participant_001',
            name: 'Juan Pérez',
            email: localStorage.getItem('userEmail') || 'juan@example.com',
            phone: '+51 987 654 321',
            dni: '12345678',
            institution: 'Universidad Nacional Autónoma',
            educationLevel: 'Pregrado'
          }
        });
      }, 800);
    });
  },

  mockGetMyEnrollments: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 'enrollment_001',
              activityId: 'activity_001',
              title: 'Gestión Ágil de Proyectos TI',
              description:
                'Curso práctico para gestionar proyectos de TI con Scrum y Kanban.',
              status: 'en_curso',
              paymentStatus: 'PAGADO',
              enrolledDate: '2025-01-15',
              startDate: '2025-01-20',
              endDate: '2025-03-20',
              modality: 'Virtual síncrono',
              location: 'Plataforma SIGEA – Aula Virtual FIIS',
              imageUrl: '/images/flyer-prueba.png',
            },
            {
              id: 'enrollment_002',
              activityId: 'activity_002',
              title: 'Data Science Avanzado',
              description:
                'Profundiza en técnicas avanzadas de ciencia de datos.',
              status: 'pendiente',
              paymentStatus: 'PENDIENTE',
              enrolledDate: '2025-02-01',
              startDate: '2025-03-01',
              endDate: '2025-05-01',
              modality: 'Semipresencial',
              location: 'FIIS – UNAS / Plataforma virtual',
              imageUrl: '/images/flyer-prueba.png',
            },
          ],
        });
      }, 900);
    });
  },


  mockGetMyCertificates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: [
            {
              id: 'cert_001',
              title: 'Certificación en Metodología Ágil',
              issueDate: '2024-12-15',
              status: 'Emitido',
              activityTitle: 'Gestión Ágil de Proyectos',
              downloadUrl: '#',
              verificationCode: 'CERT-2024-001',
              distributionMethod: 'email'
            },
            {
              id: 'cert_002',
              title: 'Certificación en Programación Python',
              issueDate: '2024-11-20',
              status: 'Emitido',
              activityTitle: 'Python para Desarrollo Backend',
              downloadUrl: '#',
              verificationCode: 'CERT-2024-002',
              distributionMethod: 'whatsapp'
            }
          ]
        });
      }, 900);
    });
  },

  mockGetDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            activeCourses: 2,
            certificatesObtained: 5,
            pendingPayments: 1,
            completedActivities: 3
          }
        });
      }, 800);
    });
  },

  mockEnrollInActivity: async (activityId, enrollmentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Inscripción completada. Proceda al pago.',
          data: {
            enrollmentId: 'enrollment_' + Math.random().toString(36).substr(2, 9),
            activityId,
            status: 'pendiente_pago'
          }
        });
      }, 1200);
    });
  },

  mockSubmitPayment: async (enrollmentId, paymentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Pago procesado exitosamente',
          data: {
            enrollmentId,
            paymentStatus: 'PAGADO',
            transactionId: 'TXN_' + Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toISOString()
          }
        });
      }, 1500);
    });
  },

  mockDownloadCertificate: async (certificateId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Certificado descargado',
          data: {
            certificateId,
            filename: 'certificado_' + certificateId + '.pdf'
          }
        });
      }, 800);
    });
  },

  mockVerifyCertificate: async (certificateId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            certificateId,
            title: 'Certificación Profesional SIGEA',
            holder: 'Juan Pérez',
            issueDate: '2024-12-15',
            status: 'Válido',
            validationCode: 'CERT-2024-001'
          }
        });
      }, 800);
    });
  }
};

export default participantService;
