// ✅ src/features/activities/hooks/useActivityManager.js
import { useState, useEffect, useCallback } from 'react';
import activityService from '../../../services/activityService';
import { handleApiError, logError } from '../../../utils/errorHandler';

export const useActivityManager = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado de UI
  const [showForm, setShowForm] = useState(false);
  const [showReports, setShowReports] = useState(false);
  const [editingActivity, setEditingActivity] = useState(null);
  const [selectedActivityForReports, setSelectedActivityForReports] = useState(null);
  
  // Estado de Filtros - ✅ INICIALIZAR CON VALORES POR DEFECTO
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    startDate: '',
    endDate: ''
  });

  // Carga inicial
  const loadActivities = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await activityService.getActivities();
      const data = response.data || [];
      setActivities(data);
      setFilteredActivities(data);
    } catch (err) {
      logError(err, 'useActivityManager.loadActivities');
      const errorInfo = handleApiError(err);
      setError(errorInfo.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  // Lógica de Filtrado
  useEffect(() => {
    let result = activities;

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(activity =>
        activity.title.toLowerCase().includes(term)
      );
    }

    if (filters.status) {
      result = result.filter(activity => activity.status === filters.status);
    }

    if (filters.startDate) {
      result = result.filter(activity =>
        new Date(activity.startDate) >= new Date(filters.startDate)
      );
    }

    if (filters.endDate) {
      result = result.filter(activity =>
        new Date(activity.endDate) <= new Date(filters.endDate)
      );
    }

    setFilteredActivities(result);
  }, [activities, searchTerm, filters]);

  // Manejadores de Acciones
  const handleCreate = () => {
    setEditingActivity(null);
    setShowForm(true);
  };

  const handleEdit = (activity) => {
    setEditingActivity(activity);
    setShowForm(true);
  };

  const handleCancelEdit = () => {
    setEditingActivity(null);
    setShowForm(false);
  };

  const handleSuccess = async () => {
    setShowForm(false);
    setEditingActivity(null);
    await loadActivities();
  };

  const handleDelete = async (activityId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta actividad?')) {
      try {
        await activityService.deleteActivity(activityId);
        await loadActivities();
      } catch (err) {
        logError(err, 'useActivityManager.handleDelete');
        const errorInfo = handleApiError(err);
        setError(errorInfo.message);
      }
    }
  };

  const handleOpenReports = (activity) => {
    setSelectedActivityForReports(activity);
    setShowReports(true);
  };

  const handleCloseReports = () => {
    setShowReports(false);
    setSelectedActivityForReports(null);
  };

  return {
    // Data
    activities: filteredActivities,
    loading,
    error,
    
    // UI State
    showForm,
    showReports,
    editingActivity,
    selectedActivityForReports,
    
    // Filters - ✅ EXPORTAR filters
    searchTerm,
    filters,
    setSearchTerm,
    setFilters,
    
    // Actions
    handleCreate,
    handleEdit,
    handleCancelEdit,
    handleSuccess,
    handleDelete,
    handleOpenReports,
    handleCloseReports
  };
};