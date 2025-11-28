import { useState, useEffect, useCallback } from 'react';
import activityService from '../../../services/activityService';
import { handleApiError, logError } from '../../../utils/errorHandler';

export const useCertificates = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivityId, setSelectedActivityId] = useState(null);
  
  // Data de la actividad seleccionada
  const [issuedCertificates, setIssuedCertificates] = useState([]);
  const [issuableParticipants, setIssuableParticipants] = useState([]); // Usuarios PAGADOS/EXONERADOS
  
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false); // Para la emisión
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');

  // 1. Cargar Actividades
  const loadActivities = useCallback(async () => {
    setLoading(true);
    try {
      const response = await activityService.getActivities();
      const data = response.data || [];
      setActivities(data);
      if (data.length > 0) handleSelectActivity(data[0].id);
      else setLoading(false);
    } catch (err) {
      logError(err, 'useCertificates.loadActivities');
      setError('Error al cargar actividades.');
      setLoading(false);
    }
  }, []);

  // 2. Cargar Datos de Certificación (Certificados + Elegibles)
  const handleSelectActivity = async (activityId) => {
    setSelectedActivityId(activityId);
    setLoading(true);
    setError(null);
    try {
      const [certsRes, issuableRes] = await Promise.all([
        activityService.getCertificates(activityId),
        activityService.getIssuableParticipants(activityId)
      ]);
      
      setIssuedCertificates(certsRes.data || []);
      setIssuableParticipants(issuableRes.data || []);
    } catch (err) {
      logError(err, 'useCertificates.selectActivity');
      setError(handleApiError(err).message);
    } finally {
      setLoading(false);
    }
  };

  // 3. Emisión Masiva
  const handleBulkIssue = async () => {
    if (!selectedActivityId) return;
    
    if (!window.confirm(`¿Estás seguro de emitir certificados para ${issuableParticipants.length} participantes elegibles?`)) {
      return;
    }

    setProcessing(true);
    setError('');
    setSuccess('');
    
    try {
      const response = await activityService.bulkIssueCertificates(selectedActivityId);
      setSuccess(response.message || 'Emisión masiva completada exitosamente.');
      // Recargar datos
      await handleSelectActivity(selectedActivityId);
    } catch (err) {
      logError(err, 'useCertificates.bulkIssue');
      setError(handleApiError(err).message);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  return {
    activities,
    selectedActivityId,
    issuedCertificates,
    issuableParticipants,
    loading,
    processing,
    error,
    success,
    handleSelectActivity,
    handleBulkIssue,
    clearMessages: () => { setError(''); setSuccess(''); }
  };
};