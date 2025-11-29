import { useState, useEffect, useCallback } from 'react';
import activityService from '../../../services/activityService';

export const useActivities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carga inicial
  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await activityService.getActivities();
      setActivities(response.data || []);
    } catch (err) {
      setError(err.message || 'Error al cargar actividades');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Acción de Eliminar
  const handleDeleteActivity = async (activityId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        await activityService.deleteActivity(activityId);
        // Recargar la lista tras eliminar
        await loadActivities();
        return true;
      } catch (err) {
        setError(err.message || 'Error al eliminar');
        return false;
      }
    }
    return false;
  };

  return {
    activities,
    loading,
    error,
    loadActivities,
    handleDeleteActivity
  };
};