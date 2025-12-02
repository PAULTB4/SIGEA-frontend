import axios from 'axios';
import authService from './authService';
import { handleApiError, logError } from '../utils/errorHandler';
import { normalizeResponse } from '../utils/apiHelpers';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://sigeabackend.zentrycorp.dev/api/v1';
const USE_MOCK_API = import.meta.env.VITE_USE_MOCK_API === 'true';

// 🔍 AGREGAR ESTAS LÍNEAS PARA DEBUG:
console.log('🔍 VITE_USE_MOCK_API:', import.meta.env.VITE_USE_MOCK_API);
console.log('🔍 USE_MOCK_API:', USE_MOCK_API);

const activityService = {
  // ==================== NUEVOS ENDPOINTS REALES ====================
  
  /**
   * GET /api/v1/tipos-actividad/listar - Obtener tipos de actividad
   */
  getActivityTypes: async () => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivityTypes();
      }
      
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/tipos-actividad/listar`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.getActivityTypes');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * GET /api/v1/estados-actividad/listar - Obtener estados de actividad
   */
  getActivityStates: async () => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivityStates();
      }
      
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/estados-actividad/listar`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.getActivityStates');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * GET /api/v1/actividades/listar - Listar todas las actividades
   */
  getActivities: async (filters = {}) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivities();
      }
      
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/actividades/listar`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.getActivities');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * GET /api/v1/actividades/obtener/{id} - Obtener actividad por ID
   */
  getActivity: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockGetActivity(activityId);
      }
      
      const token = authService.getToken();
      const response = await axios.get(
        `${API_BASE_URL}/actividades/obtener/${activityId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.getActivity');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * POST /api/v1/actividades/create - Crear nueva actividad
   */
  createActivity: async (activityData) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockCreateActivity(activityData);
      }

      const token = authService.getToken();
      
      // Preparar el payload según la estructura del backend
      const payload = {
        titulo: activityData.title,
        descripcion: activityData.description,
        fechaInicio: activityData.startDate,
        fechaFin: activityData.endDate,
        horaInicio: activityData.startTime,
        horaFin: activityData.endTime,
        estadoId: activityData.estadoId,
        organizadorId: activityData.organizadorId,
        tipoActividadId: activityData.tipoActividadId,
        ubicacion: activityData.ubicacion || '',
        coOrganizador: activityData.coOrganizer || '',
        sponsor: activityData.sponsor || '',
        bannerUrl: activityData.bannerUrl || '',
        numeroYape: activityData.numeroYape || ''
      };

      const response = await axios.post(
        `${API_BASE_URL}/actividades/create`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.createActivity');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * PUT /api/v1/actividades/actualizar/{id} - Actualizar actividad
   */
  updateActivity: async (activityId, activityData) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockUpdateActivity(activityId, activityData);
      }

      const token = authService.getToken();
      
      // Preparar el payload según la estructura del backend
      const payload = {
        titulo: activityData.title,
        descripcion: activityData.description,
        fechaInicio: activityData.startDate,
        fechaFin: activityData.endDate,
        horaInicio: activityData.startTime,
        horaFin: activityData.endTime,
        estadoId: activityData.estadoId,
        organizadorId: activityData.organizadorId,
        tipoActividadId: activityData.tipoActividadId,
        ubicacion: activityData.ubicacion || '',
        coOrganizador: activityData.coOrganizer || '',
        sponsor: activityData.sponsor || '',
        bannerUrl: activityData.bannerUrl || '',
        numeroYape: activityData.numeroYape || ''
      };

      const response = await axios.put(
        `${API_BASE_URL}/actividades/actualizar/${activityId}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.updateActivity');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  /**
   * DELETE /api/v1/actividades/eliminar/{id} - Eliminar actividad
   */
  deleteActivity: async (activityId) => {
    try {
      if (USE_MOCK_API) {
        return activityService.mockDeleteActivity(activityId);
      }

      const token = authService.getToken();
      const response = await axios.delete(
        `${API_BASE_URL}/actividades/eliminar/${activityId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      
      return normalizeResponse(response);
    } catch (error) {
      logError(error, 'activityService.deleteActivity');
      const errorInfo = handleApiError(error);
      throw { message: errorInfo.message };
    }
  },

  // ========== MOCK IMPLEMENTATIONS ==========

  /**
   * Mock: Get activity types
   */
  mockGetActivityTypes: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: '1',
              nombreActividad: 'Curso',
              descripcion: 'Curso académico'
            },
            {
              id: '2',
              nombreActividad: 'Taller',
              descripcion: 'Taller práctico'
            },
            {
              id: '3',
              nombreActividad: 'Diplomado',
              descripcion: 'Programa de diplomado'
            },
            {
              id: '4',
              nombreActividad: 'Ciclo de Conferencias',
              descripcion: 'Serie de conferencias'
            }
          ]
        });
      }, 500);
    });
  },

  /**
   * Mock: Get activity states
   */
  mockGetActivityStates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: [
            {
              id: '1',
              codigo: 'activa',
              etiqueta: 'Activa'
            },
            {
              id: '2',
              codigo: 'pendiente',
              etiqueta: 'Pendiente'
            },
            {
              id: '3',
              codigo: 'finalizada',
              etiqueta: 'Finalizada'
            }
          ]
        });
      }, 500);
    });
  },

  /**
   * Mock: Create activity
   */
  mockCreateActivity: async (activityData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockActivity = {
          id: `activity_${Date.now()}`,
          titulo: activityData.titulo,
          descripcion: activityData.descripcion,
          fechaInicio: activityData.fechaInicio,
          fechaFin: activityData.fechaFin,
          horaInicio: activityData.horaInicio,
          horaFin: activityData.horaFin,
          estado: {
            id: activityData.estadoId,
            codigo: 'activa',
            etiqueta: 'Activa'
          },
          organizadorId: activityData.organizadorId,
          tipoActividad: {
            id: activityData.tipoActividadId,
            nombreActividad: 'Curso',
            descripcion: 'Curso académico'
          },
          ubicacion: activityData.ubicacion,
          coOrganizador: activityData.coOrganizador,
          sponsor: activityData.sponsor,
          bannerUrl: activityData.bannerUrl,
          numeroYape: activityData.numeroYape,
          fechaCreacion: new Date().toISOString(),
          fechaActualizacion: new Date().toISOString(),
          activa: true
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
              titulo: 'Gestión Ágil de Proyectos TI',
              descripcion: 'Curso práctico sobre metodologías ágiles',
              fechaInicio: '2025-02-01',
              fechaFin: '2025-03-01',
              horaInicio: '09:00',
              horaFin: '17:00',
              estado: {
                id: '1',
                codigo: 'activa',
                etiqueta: 'Activa'
              },
              organizadorId: 'org_001',
              tipoActividad: {
                id: '1',
                nombreActividad: 'Curso',
                descripcion: 'Curso académico'
              },
              ubicacion: 'Aula 101',
              coOrganizador: '',
              sponsor: '',
              bannerUrl: '',
              numeroYape: '',
              fechaCreacion: '2025-01-15T10:00:00Z',
              fechaActualizacion: '2025-01-15T10:00:00Z',
              activa: true,
              // Campos adicionales para compatibilidad con la UI existente
              title: 'Gestión Ágil de Proyectos TI',
              type: 'Curso',
              status: 'activa',
              startDate: '02 Feb 2025',
              endDate: '28 Feb 2025',
              duration: '40 horas',
              participantCount: 25
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
            titulo: 'Gestión Ágil de Proyectos TI',
            descripcion: 'Curso práctico sobre metodologías ágiles',
            fechaInicio: '2025-02-01',
            fechaFin: '2025-03-01',
            horaInicio: '09:00',
            horaFin: '17:00',
            estado: {
              id: '1',
              codigo: 'activa',
              etiqueta: 'Activa'
            },
            organizadorId: 'org_001',
            tipoActividad: {
              id: '1',
              nombreActividad: 'Curso',
              descripcion: 'Curso académico'
            },
            ubicacion: 'Aula 101',
            coOrganizador: '',
            sponsor: '',
            bannerUrl: '',
            numeroYape: '',
            fechaCreacion: '2025-01-15T10:00:00Z',
            fechaActualizacion: '2025-01-15T10:00:00Z',
            activa: true
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
            fechaActualizacion: new Date().toISOString()
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

  // ========== MÉTODOS LEGACY (mantener para compatibilidad) ==========

  getActivityDetails: async (activityId) => {
    // Redirigir a getActivity
    return activityService.getActivity(activityId);
  },

  getDashboardStats: async () => {
    // Mantener mock por ahora
    return activityService.mockGetDashboardStats();
  },

  getParticipants: async (activityId) => {
    return activityService.mockGetParticipants(activityId);
  },

  saveAttendance: async (activityId, attendance) => {
    return activityService.mockSaveAttendance(activityId, attendance);
  },

  getCertificates: async (activityId) => {
    return activityService.mockGetCertificates(activityId);
  },

  getIssuableParticipants: async (activityId) => {
    return activityService.mockGetIssuableParticipants(activityId);
  },

  issueCertificate: async (activityId, participantId) => {
    return activityService.mockIssueCertificate(activityId, participantId);
  },

  bulkIssueCertificates: async (activityId) => {
    return activityService.mockBulkIssueCertificates(activityId);
  },

  verifyPaymentManually: async (activityId, participantId, proofFile) => {
    return activityService.mockVerifyPaymentManually(activityId, participantId);
  },

  uploadReport: async (activityId, reportType, file) => {
    return activityService.mockUploadReport(activityId, reportType);
  },

  getAvailableActivitiesForEnrollment: async () => {
    return activityService.mockGetAvailableActivitiesForEnrollment();
  },

  // Mocks legacy
  mockGetDashboardStats: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: {
            activitiesCount: 2,
            participantsCount: 43,
            certificatesCount: 38,
            attendanceRate: 88
          }
        });
      }, 800);
    });
  },

  mockGetParticipants: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: []
        });
      }, 600);
    });
  },

  mockSaveAttendance: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Asistencia guardada'
        });
      }, 600);
    });
  },

  mockGetCertificates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: []
        });
      }, 600);
    });
  },

  mockGetIssuableParticipants: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: []
        });
      }, 600);
    });
  },

  mockIssueCertificate: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Certificado emitido'
        });
      }, 800);
    });
  },

  mockBulkIssueCertificates: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Certificados emitidos'
        });
      }, 1200);
    });
  },

  mockVerifyPaymentManually: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Pago verificado'
        });
      }, 800);
    });
  },

  mockUploadReport: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: 'Documento cargado'
        });
      }, 800);
    });
  },

  mockGetAvailableActivitiesForEnrollment: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          data: []
        });
      }, 1000);
    });
  },

  /**
   * Normaliza una actividad del backend al formato de la UI
   */
  normalizeActivityForUI: (activity) => {
    if (!activity) return null;

    return {
      id: activity.id,
      title: activity.titulo || activity.title,
      type: activity.tipoActividad?.nombreActividad || activity.type,
      status: activity.estado?.codigo || activity.status,
      startDate: activity.fechaInicio || activity.startDate,
      endDate: activity.fechaFin || activity.endDate,
      startTime: activity.horaInicio || activity.startTime || '09:00',
      endTime: activity.horaFin || activity.endTime || '17:00',
      description: activity.descripcion || activity.description,
      primaryOrganizer: activity.organizadorId || activity.primaryOrganizer,
      coOrganizer: activity.coOrganizador || activity.coOrganizer || '',
      sponsor: activity.sponsor || '',
      duration: activity.duration || '40 horas',
      participantCount: activity.participantCount || 0,
      coverImage: activity.bannerUrl || activity.coverImage || null,
      // Datos completos del backend
      estadoId: activity.estado?.id || activity.estadoId,
      tipoActividadId: activity.tipoActividad?.id || activity.tipoActividadId,
      organizadorId: activity.organizadorId,
      ubicacion: activity.ubicacion || '',
      bannerUrl: activity.bannerUrl || '',
      numeroYape: activity.numeroYape || '',
      activa: activity.activa
    };
  }
};

export default activityService;