import axios from 'axios';
import authService from './authService';
import { handleApiError, logError } from '../utils/errorHandler';
import { normalizeResponse } from '../utils/apiHelpers';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const USE_MOCK_API =import.meta.env.VITE_USE_MOCK_API !== 'false';

const activityService = {
  /**
   * Create a new activity
   * @param {Object} activityData - Activity data from form
   * @returns {Promise<Object>} Response with created activity
   */
  createActivity: async (activityData) => {
    try {
      // Prepare FormData for file upload
      const formData = new FormData();
      if (activityData.coverImage) {
        formData.append('coverImage', activityData.coverImage);
      }
      // Add text fields
      formData.append('title', activityData.title);
      formData.append('type', activityData.type);
      formData.append('estimatedDuration', activityData.estimatedDuration);
      formData.append('startDate', activityData.startDate);
      formData.append('startTime', activityData.startTime);
      formData.append('endDate', activityData.endDate);
      formData.append('endTime', activityData.endTime);
      formData.append('primaryOrganizer', activityData.primaryOrganizer);
      formData.append('coOrganizer', activityData.coOrganizer);
      formData.append('sponsor', activityData.sponsor);
      formData.append('description', activityData.description);

      // Add files
      activityData.contentFiles.forEach((fileObj, index) => {
        formData.append(`files[]`, fileObj.file);
      });

      if (USE_MOCK_API) {
        // Use mock service
        return activityService.mockCreateActivity(activityData);
      } else {
        // Use real API
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/activities`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
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
   * Get all activities for current organizer
   */
  getActivities: async (page = 1, limit = 10, filters = {}) => {
    try {
      const params = new URLSearchParams({
        page,
        limit,
        ...filters
      });
      
      if (USE_MOCK_API) {
        return activityService.mockGetActivities();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities?${params}`,
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
   * Get activity details (with status and dates)
   */
  getActivityDetails: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivityDetails(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/${activityId}/details`,
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
   * Get activity by ID
   */
  getActivity: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivity(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/${activityId}`,
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
   * Update activity
   */
  updateActivity: async (activityId, activityData) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockUpdateActivity(activityId, activityData);
      } else {
        const token = authService.getToken();
        const response = await axios.put(
          `${API_BASE_URL}/activities/${activityId}`,
          activityData,
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
   * Delete activity
   */
  deleteActivity: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockDeleteActivity(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.delete(
          `${API_BASE_URL}/activities/${activityId}`,
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

  // ========== MOCK IMPLEMENTATIONS ==========

  /**
   * Mock: Create activity
   */
  mockCreateActivity: async (activityData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockActivity = {
          id: `activity_${Date.now()}`,
          ...activityData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          status: 'activa',
          participantCount: 0
        };

        resolve({
          success: true,
          message: 'Actividad creada exitosamente',
          data: mockActivity
        });
      }, 1000);
    });
  },

  /**
   * Mock: Get activities
   */
  mockGetActivities: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'act_001',
              title: 'Gestión Ágil de Proyectos TI',
              type: 'Curso',
              status: 'en_curso',
              startDate: '02 Feb 2025',
              endDate: '28 Feb 2025',
              duration: '40 horas',
              participantCount: 25,
              coverImage: null
            },
            {
              id: 'act_002',
              title: 'Diplomado en Inteligencia de Negocios',
              type: 'Diplomado',
              status: 'pendiente',
              startDate: '15 Mar 2025',
              endDate: '15 Jun 2025',
              duration: '120 horas',
              participantCount: 18,
              coverImage: null
            },
            {
              id: 'act_003',
              title: 'Taller de Excel Avanzado',
              type: 'Taller',
              status: 'finalizada',
              startDate: '01 Jan 2025',
              endDate: '31 Jan 2025',
              duration: '16 horas',
              participantCount: 32,
              coverImage: null
            }
          ]
        });
      }, 800);
    });
  },

  /**
   * Mock: Get activity by ID
   */
  mockGetActivity: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: activityId,
            title: 'Gestión Ágil de Proyectos TI',
            type: 'curso',
            status: 'activa',
            startDate: '2025-02-01',
            endDate: '2025-03-01',
            participantCount: 25
          }
        });
      }, 600);
    });
  },

  /**
   * Mock: Update activity
   */
  mockUpdateActivity: async (activityId, activityData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Actividad actualizada exitosamente',
          data: {
            id: activityId,
            ...activityData,
            updatedAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  },

  /**
   * Mock: Delete activity
   */
  mockDeleteActivity: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Actividad eliminada exitosamente'
        });
      }, 600);
    });
  },

  // ========== DASHBOARD METHODS ==========

  /**
   * Get dashboard statistics
   */
  getDashboardStats: async () => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetDashboardStats();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/dashboard/stats`,
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
   * Get participants for an activity
   */
  getParticipants: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetParticipants(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/${activityId}/participants`,
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
   * Save attendance for participants
   */
  saveAttendance: async (activityId, attendance) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockSaveAttendance(activityId, attendance);
      } else {
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/activities/${activityId}/attendance`,
          { attendance },
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
   * Get certificates issued for an activity
   */
  getCertificates: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetCertificates(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/${activityId}/certificates`,
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
   * Get participants eligible for certificate issuance
   */
  getIssuableParticipants: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetIssuableParticipants(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/${activityId}/issuable-participants`,
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
   * Issue certificate for a single participant
   */
  issueCertificate: async (activityId, participantId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockIssueCertificate(activityId, participantId);
      } else {
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/activities/${activityId}/issue-certificate/${participantId}`,
          {},
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
   * Bulk issue certificates for all eligible participants
   */
  bulkIssueCertificates: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockBulkIssueCertificates(activityId);
      } else {
        const token = authService.getToken();
        const response = await axios.post(
          `${API_BASE_URL}/activities/${activityId}/bulk-issue-certificates`,
          {},
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

  // ========== MOCK DASHBOARD METHODS ==========

  /**
   * Mock: Get activity details
   */
  mockGetActivityDetails: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            id: activityId,
            title: 'Gestión Ágil de Proyectos TI',
            status: 'en_curso',
            startDate: '02 Feb 2025',
            endDate: '28 Feb 2025',
            description: 'Actividad en progreso'
          }
        });
      }, 400);
    });
  },

  /**
   * Mock: Get dashboard statistics
   */
  mockGetDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            activitiesCount: 2,
            participantsCount: 43,
            certificatesCount: 38,
            attendanceRate: 88,
            recentActivities: [
              {
                id: 'act_001',
                title: 'Gestión Ágil de Proyectos TI',
                type: 'Curso',
                date: '02 Feb 2025',
                status: 'Activa'
              },
              {
                id: 'act_002',
                title: 'Diplomado en Inteligencia de Negocios',
                type: 'Diplomado',
                date: '15 Feb 2025',
                status: 'Próxima'
              }
            ]
          }
        });
      }, 800);
    });
  },

  /**
   * Mock: Get participants for activity
   */
  mockGetParticipants: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'part_001',
              name: 'Juan Pérez García',
              email: 'juan.perez@example.com',
              registrationDate: '25 Jan 2025',
              attended: true,
              paymentStatus: 'PAGADO'
            },
            {
              id: 'part_002',
              name: 'María López Martínez',
              email: 'maria.lopez@example.com',
              registrationDate: '26 Jan 2025',
              attended: true,
              paymentStatus: 'PAGADO'
            },
            {
              id: 'part_003',
              name: 'Carlos González López',
              email: 'carlos.gonzalez@example.com',
              registrationDate: '27 Jan 2025',
              attended: false,
              paymentStatus: 'PENDIENTE'
            },
            {
              id: 'part_004',
              name: 'Ana Fernández Rodríguez',
              email: 'ana.fernandez@example.com',
              registrationDate: '28 Jan 2025',
              attended: true,
              paymentStatus: 'EXONERADO'
            }
          ]
        });
      }, 600);
    });
  },

  /**
   * Mock: Save attendance
   */
  mockSaveAttendance: async (activityId, attendance) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Asistencia guardada exitosamente',
          data: {
            activityId,
            recordedAt: new Date().toISOString()
          }
        });
      }, 600);
    });
  },

  /**
   * Mock: Get issued certificates
   */
  mockGetCertificates: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'cert_001',
              participantName: 'Juan Pérez García',
              email: 'juan.perez@example.com',
              issuedDate: '02 Feb 2025'
            },
            {
              id: 'cert_002',
              participantName: 'María López Martínez',
              email: 'maria.lopez@example.com',
              issuedDate: '02 Feb 2025'
            },
            {
              id: 'cert_003',
              participantName: 'Ana Fernández Rodríguez',
              email: 'ana.fernandez@example.com',
              issuedDate: '03 Feb 2025'
            }
          ]
        });
      }, 600);
    });
  },

  /**
   * Mock: Get issuable participants (only PAGADO or EXONERADO)
   */
  mockGetIssuableParticipants: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: 'part_001',
              name: 'Juan Pérez García',
              email: 'juan.perez@example.com',
              attendanceRate: 100,
              paymentStatus: 'PAGADO'
            },
            {
              id: 'part_002',
              name: 'María López Martínez',
              email: 'maria.lopez@example.com',
              attendanceRate: 95,
              paymentStatus: 'PAGADO'
            },
            {
              id: 'part_004',
              name: 'Ana Fernández Rodríguez',
              email: 'ana.fernandez@example.com',
              attendanceRate: 88,
              paymentStatus: 'EXONERADO'
            }
          ]
        });
      }, 600);
    });
  },

  /**
   * Mock: Issue certificate for participant
   */
  mockIssueCertificate: async (activityId, participantId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Certificado emitido exitosamente',
          data: {
            certificateId: `cert_${Date.now()}`,
            participantId,
            activityId,
            issuedAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  },

  /**
   * Mock: Bulk issue certificates
   */
  mockBulkIssueCertificates: async (activityId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          issued: 2,
          message: '2 certificados emitidos exitosamente',
          data: {
            activityId,
            issuedAt: new Date().toISOString()
          }
        });
      }, 1200);
    });
  },

  /**
   * Verify payment manually (R19)
   * @param {String} activityId - Activity ID
   * @param {String} participantId - Participant ID
   * @param {File} proofFile - Payment proof file
   * @returns {Promise<Object>} Response with updated payment status
   */
  verifyPaymentManually: async (activityId, participantId, proofFile) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockVerifyPaymentManually(activityId, participantId);
      } else {
        const token = authService.getToken();
        const formData = new FormData();
        formData.append('proofFile', proofFile);

        const response = await axios.put(
          `${API_BASE_URL}/activities/${activityId}/participants/${participantId}/payment`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
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
   * Upload report document (R22, R23)
   * @param {String} activityId - Activity ID
   * @param {String} reportType - Type of report (proposal, final, evidence)
   * @param {File|File[]} file - File(s) to upload
   * @returns {Promise<Object>} Response with upload confirmation
   */
  uploadReport: async (activityId, reportType, file) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockUploadReport(activityId, reportType);
      } else {
        const token = authService.getToken();
        const formData = new FormData();

        // Handle both single and multiple files
        if (Array.isArray(file)) {
          file.forEach((f) => {
            formData.append('files', f);
          });
        } else {
          formData.append('file', file);
        }

        const response = await axios.post(
          `${API_BASE_URL}/activities/${activityId}/reports/${reportType}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
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
   * Mock: Verify payment manually
   */
  mockVerifyPaymentManually: async (activityId, participantId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Pago verificado y estado actualizado a PAGADO',
          data: {
            activityId,
            participantId,
            paymentStatus: 'PAGADO',
            verifiedAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  },

  /**
   * Mock: Upload report document
   */
  mockUploadReport: async (activityId, reportType) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const reportLabels = {
          proposal: 'Informe de Propuesta',
          final: 'Informe Final y Temas Desarrollados',
          evidence: 'Evidencia Fotográfica'
        };

        resolve({
          success: true,
          message: `${reportLabels[reportType] || 'Documento'} cargado exitosamente`,
          data: {
            activityId,
            reportType,
            uploadedAt: new Date().toISOString()
          }
        });
      }, 800);
    });
  },


  /**
   * Normaliza una actividad cualquiera (mock o API real)
   * al formato que usan las EventCards.
   */
  normalizeActivityForEvent: (raw) => {
    if (!raw) return null;

    // Título / descripción
    const title =
      raw.title ||
      raw.titulo ||
      raw.nombreActividad ||
      (raw.tipoActividad && raw.tipoActividad.nombreActividad) ||
      'Actividad sin título';

    const description = raw.description || raw.descripcion || '';
    const shortDescription = raw.shortDescription || '';

    // Fechas
    const startDate = raw.startDate || raw.fechaInicio || '';
    const endDate = raw.endDate || raw.fechaFin || '';

    const date =
      raw.date ||
      (startDate && endDate
        ? `${startDate} - ${endDate}`
        : startDate || endDate || '');

    // Duración
    const duration =
      raw.duration ||
      raw.estimatedDuration ||
      (typeof raw.duracionEnDias === 'number'
        ? `${raw.duracionEnDias} días`
        : raw.duracionEnDias || '');

    // Modalidad / ubicación / tipo
    const modality = raw.modality || raw.modalidad || '';
    const location = raw.location || raw.ubicacion || '';

    const eventType =
      raw.eventType ||
      raw.event ||
      (raw.tipoActividad && raw.tipoActividad.nombreActividad) ||
      (raw.estado && raw.estado.etiqueta) ||
      '';

    // Estado
    const status = raw.status || (raw.estado && raw.estado.codigo) || '';

    const activa =
      typeof raw.activa === 'boolean'
        ? raw.activa
        : status === 'activa' || status === 'en_curso';

    const pendiente =
      typeof raw.pendiente === 'boolean'
        ? raw.pendiente
        : status === 'pendiente' || status === 'proxima';

    const finalizada =
      typeof raw.finalizada === 'boolean'
        ? raw.finalizada
        : status === 'finalizada';

    // Otros datos útiles
    const price = raw.price ?? raw.precio ?? null;
    const enrollment = raw.enrollment ?? raw.cantidadInscritos ?? null;

    const imageUrl =
      raw.imageUrl || raw.coverImage || '/images/flyer-prueba.png';

    return {
      ...raw,
      title,
      shortDescription,
      description,
      startDate,
      endDate,
      date,
      duration,
      modality,
      location,
      event: eventType,
      imageUrl,
      price,
      enrollment,
      status,
      activa,
      pendiente,
      finalizada,
    };
  },







  /**
   * Get available activities for enrollment (not yet started - R12)
   * @returns {Promise<Array>} List of enrollable activities
   */
  getAvailableActivitiesForEnrollment: async () => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetAvailableActivitiesForEnrollment();
      } else {
        const token = authService.getToken();
        const response = await axios.get(
          `${API_BASE_URL}/activities/available-for-enrollment`,
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
   * Mock: Get available activities for enrollment (R12 - not started)
   */
  mockGetAvailableActivitiesForEnrollment: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const rawActivities = [
          {
            id: 'activity_001',
            title: 'Gestión Ágil de Proyectos TI',
            description: 'Curso práctico para gestionar proyectos de TI con Scrum y Kanban.',
            type: 'curso',
            startDate: '2025-03-15',
            endDate: '2025-05-15',
            duration: '10 semanas',
            instructor: 'Dr. Carlos García',
            price: 299.99,
            status: 'pendiente',
            enrollment: 45,
            imageUrl: '/images/flyer-prueba.png',
            activa: false,
            pendiente: true,
            finalizada: false,
          },
          {
            id: 'activity_002',
            title: 'Machine Learning Avanzado',
            description: 'Algoritmos avanzados de aprendizaje automático.',
            type: 'taller',
            startDate: '2025-03-22',
            endDate: '2025-04-22',
            duration: '4 semanas',
            instructor: 'Ing. María López',
            price: 399.99,
            status: 'activa',
            enrollment: 28,
            imageUrl: '/images/flyer-prueba.png',
            activa: true,
            pendiente: false,
            finalizada: false,
          },
          {
            id: 'activity_003',
            title: 'Cloud Computing con AWS',
            description: 'Arquitectura y deployment en AWS.',
            type: 'curso',
            startDate: '2025-04-01',
            endDate: '2025-05-30',
            duration: '8 semanas',
            instructor: 'Ing. Roberto Chen',
            price: 449.99,
            status: 'finalizada',
            enrollment: 32,
            imageUrl: '/images/flyer-prueba.png',
            activa: false,
            pendiente: false,
            finalizada: true,
          },
        ];

        resolve({
          data: rawActivities.map(activityService.normalizeActivityForEvent),
        });
      }, 1000);
    });
  }
};

export default activityService;
