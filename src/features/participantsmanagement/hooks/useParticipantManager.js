import { useState, useEffect, useCallback } from 'react';
import activityService from '../../../services/activityService';
import { handleApiError, logError } from '../../../utils/errorHandler';

export const useParticipantManager = () => {
  // Datos
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  const [activityDetails, setActivityDetails] = useState(null);
  const [participants, setParticipants] = useState([]);

  // Estado de UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  // Estado local de asistencia (Map: id -> boolean)
  const [attendanceMap, setAttendanceMap] = useState({});

  // 1. Cargar lista de actividades al inicio
  const handleSelectActivity = useCallback(
    async (activityId) => {
      if (!activityId) return;

      setSelectedActivityId(activityId);
      setLoading(true);
      setError(null);

      try {
        // Carga paralela de detalles y participantes
        const [detailsRes, participantsRes] = await Promise.all([
          activityService.getActivityDetails(activityId),
          activityService.getParticipants(activityId),
        ]);

        setActivityDetails(detailsRes?.data || {});
        const parts = participantsRes?.data || [];
        setParticipants(parts);

        // Inicializar mapa de asistencia
        const initialAttendance = {};
        parts.forEach((p) => {
          initialAttendance[p.id] = p.attended || false;
        });
        setAttendanceMap(initialAttendance);
      } catch (err) {
        logError(err, 'useParticipantManager.handleSelectActivity');
        setError(handleApiError(err).message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await activityService.getActivities();
      const data = response?.data || [];
      setActivities(data);

      // Seleccionar la primera por defecto si existe
      if (data.length > 0) {
        handleSelectActivity(data[0].id);
      } else {
        setLoading(false);
      }
    } catch (err) {
      logError(err, 'useParticipantManager.loadActivities');
      setError(handleApiError(err).message);
      setLoading(false);
    }
  }, [handleSelectActivity]);

  // 2. Toggle de asistencia local
  const toggleAttendance = (participantId) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [participantId]: !prev[participantId],
    }));
  };

  // 3. Guardar asistencia en servidor
  const saveAttendance = async () => {
    if (!selectedActivityId) return false;

    try {
      await activityService.saveAttendance(selectedActivityId, attendanceMap);
      // Podrías disparar un toast aquí desde el caller
      return true;
    } catch (err) {
      logError(err, 'useParticipantManager.saveAttendance');
      setError(handleApiError(err).message);
      return false;
    }
  };

  // 4. Verificación manual de pago (para el modal)
  const verifyPaymentManually = async (participantId, proofFile) => {
    if (!selectedActivityId) {
      return {
        success: false,
        message: 'No hay actividad seleccionada.',
      };
    }

    try {
      const result = await activityService.verifyPaymentManually(
        selectedActivityId,
        participantId,
        proofFile
      );

      // Si el backend responde con éxito, opcionalmente podrías refrescar:
      // await handleSelectActivity(selectedActivityId);

      return result;
    } catch (err) {
      logError(err, 'useParticipantManager.verifyPaymentManually');
      const apiError = handleApiError(err);
      setError(apiError.message);
      return {
        success: false,
        message: apiError.message || 'Error al verificar el pago.',
      };
    }
  };

  // 5. Filtrado de participantes
  const filteredParticipants = participants.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 6. Estadísticas
  const presentCount = Object.values(attendanceMap).filter(Boolean).length;
  const stats = {
    total: participants.length,
    present: presentCount,
    rate: participants.length > 0 ? Math.round((presentCount / participants.length) * 100) : 0,
  };

  // Inicializar
  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  const refreshData = () => {
    if (selectedActivityId) {
      handleSelectActivity(selectedActivityId);
    }
  };

  return {
    activities,
    selectedActivityId,
    activityDetails,
    participants: filteredParticipants, // ya filtrados
    loading,
    error,
    searchTerm,
    setSearchTerm,
    attendanceMap,
    stats,
    showPaymentModal,
    setShowPaymentModal,
    handleSelectActivity,
    toggleAttendance,
    saveAttendance,
    verifyPaymentManually,
    refreshData,
  };
};
