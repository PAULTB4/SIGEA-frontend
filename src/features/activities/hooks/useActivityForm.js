import { useState, useEffect } from 'react';
import activityService from '../../../services/activityService';
import { useAuth } from '../../auth/hooks/useAuth';

export const useActivityForm = (userEmail, onSuccess, editingActivityId, editingActivityData) => {
  const { user } = useAuth();

  // Estados para los dropdowns
  const [activityTypes, setActivityTypes] = useState([]);
  const [activityStates, setActivityStates] = useState([]);
  const [loadingDropdowns, setLoadingDropdowns] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    tipoActividadId: '',
    estimatedDuration: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '17:00',
    primaryOrganizer: userEmail || '',
    coOrganizer: '',
    sponsor: '',
    description: '',
    ubicacion: '',
    numeroYape: '',
    estadoId: '',
    organizadorId: user?.id || '',
    contentFiles: [],
    coverImage: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Cargar tipos de actividad y estados al montar
  useEffect(() => {
    const loadDropdownData = async () => {
      // ✅ Verificar que el usuario esté autenticado antes de cargar datos
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.warn('⚠️ No se puede cargar los dropdowns: usuario no autenticado');
        setLoadingDropdowns(false);
        return;
      }

      setLoadingDropdowns(true);
      try {
        const [typesResponse, statesResponse] = await Promise.all([
          activityService.getActivityTypes(),
          activityService.getActivityStates()
        ]);

        setActivityTypes(typesResponse.data || []);
        setActivityStates(statesResponse.data || []);

        // Si no hay un estado seleccionado y hay estados disponibles, seleccionar el primero
        if (!formData.estadoId && statesResponse.data?.length > 0) {
          setFormData(prev => ({
            ...prev,
            estadoId: statesResponse.data[0].id
          }));
        }

        // Si no hay un tipo seleccionado y hay tipos disponibles, seleccionar el primero
        if (!formData.tipoActividadId && typesResponse.data?.length > 0) {
          setFormData(prev => ({
            ...prev,
            tipoActividadId: typesResponse.data[0].id
          }));
        }
      } catch (err) {
        console.error('Error cargando dropdowns:', err);
        // Mejorar el mensaje de error según el tipo
        if (err.message?.includes('permisos') || err.message?.includes('403')) {
          setError('No tienes permisos para acceder a esta información. Por favor, inicia sesión nuevamente.');
        } else {
          setError('Error al cargar tipos y estados de actividad');
        }
      } finally {
        setLoadingDropdowns(false);
      }
    };

    loadDropdownData();
  }, []);

  // Actualizar organizadorId cuando cambie el user
  useEffect(() => {
    if (user?.id) {
      setFormData(prev => ({
        ...prev,
        organizadorId: user.id,
        primaryOrganizer: userEmail || user.email || ''
      }));
    }
  }, [user, userEmail]);

  // Cargar datos de edición
  useEffect(() => {
    if (editingActivityId && editingActivityData) {
      const normalized = activityService.normalizeActivityForUI(editingActivityData);

      setFormData({
        title: normalized.title || '',
        tipoActividadId: normalized.tipoActividadId || '',
        estimatedDuration: normalized.duration || '',
        startDate: normalized.startDate || '',
        startTime: normalized.startTime || '09:00',
        endDate: normalized.endDate || '',
        endTime: normalized.endTime || '17:00',
        primaryOrganizer: normalized.primaryOrganizer || userEmail || '',
        coOrganizer: normalized.coOrganizer || '',
        sponsor: normalized.sponsor || '',
        description: normalized.description || '',
        ubicacion: normalized.ubicacion || '',
        numeroYape: normalized.numeroYape || '',
        estadoId: normalized.estadoId || '',
        organizadorId: normalized.organizadorId || user?.id || '',
        contentFiles: [],
        coverImage: normalized.coverImage || null
      });
    }
  }, [editingActivityId, editingActivityData, userEmail, user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Limpiar error de validación para este campo
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    setError('');
  };

  const handleFileChange = (files, isCover = false) => {
    if (isCover) {
      setFormData(prev => ({ ...prev, coverImage: files[0] }));
    } else {
      const newFiles = Array.from(files).map(file => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: file.size,
        type: file.type,
        file: file
      }));
      setFormData(prev => ({
        ...prev,
        contentFiles: [...prev.contentFiles, ...newFiles]
      }));
    }
  };

  const removeFile = (fileId) => {
    setFormData(prev => ({
      ...prev,
      contentFiles: prev.contentFiles.filter(f => f.id !== fileId)
    }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.title.trim()) {
      errors.title = 'El título es requerido';
    }

    if (!formData.tipoActividadId) {
      errors.tipoActividadId = 'Selecciona un tipo de actividad';
    }

    if (!formData.estimatedDuration.trim()) {
      errors.estimatedDuration = 'La duración estimada es requerida';
    }

    if (!formData.startDate) {
      errors.startDate = 'La fecha de inicio es requerida';
    }

    if (!formData.endDate) {
      errors.endDate = 'La fecha de fin es requerida';
    }

    if (!formData.description.trim()) {
      errors.description = 'La descripción es requerida';
    }

    if (!formData.estadoId) {
      errors.estadoId = 'Selecciona un estado';
    }

    // Validar fechas
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(`${formData.startDate}T${formData.startTime}`);
      const endDate = new Date(`${formData.endDate}T${formData.endTime}`);

      if (endDate <= startDate) {
        errors.endDate = 'La fecha de fin debe ser posterior a la fecha de inicio';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Por favor, completa todos los campos requeridos');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Preparar datos para el backend
      const activityPayload = {
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate,
        endDate: formData.endDate,
        startTime: formData.startTime,
        endTime: formData.endTime,
        tipoActividadId: formData.tipoActividadId,
        estadoId: formData.estadoId,
        organizadorId: formData.organizadorId,
        ubicacion: formData.ubicacion,
        coOrganizer: formData.coOrganizer,
        sponsor: formData.sponsor,
        bannerUrl: formData.coverImage ? '' : '', // Por ahora vacío, se puede implementar subida de imagen después
        numeroYape: formData.numeroYape
      };

      let response;
      if (editingActivityId) {
        response = await activityService.updateActivity(editingActivityId, activityPayload);
        setSuccess('¡Actividad actualizada exitosamente!');
      } else {
        response = await activityService.createActivity(activityPayload);
        setSuccess('¡Actividad registrada exitosamente!');
      }

      // Esperar 2 segundos antes de ejecutar onSuccess
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);

    } catch (err) {
      console.error('Error al guardar actividad:', err);
      setError(err.message || 'Error al procesar la solicitud');
    } finally {
      setLoading(false);
    }
  };

  return {
    formData,
    loading,
    error,
    success,
    validationErrors,
    activityTypes,
    activityStates,
    loadingDropdowns,
    handleInputChange,
    handleFileChange,
    removeFile,
    handleSubmit
  };
};