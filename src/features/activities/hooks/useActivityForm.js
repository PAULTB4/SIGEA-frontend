// src/features/activities/hooks/useActivityForm.js
import { useState, useEffect } from 'react';
import activityService from '../../../services/activityService'; // Asumiendo ruta correcta

export const useActivityForm = (userEmail, onSuccess, editingActivityId, editingActivityData) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'curso',
    estimatedDuration: '',
    startDate: '',
    startTime: '09:00',
    endDate: '',
    endTime: '17:00',
    primaryOrganizer: userEmail || '',
    coOrganizer: '',
    sponsor: '',
    description: '',
    contentFiles: [],
    coverImage: null
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  // Cargar datos de edición
  useEffect(() => {
    if (editingActivityId && editingActivityData) {
      setFormData({
        title: editingActivityData.title || '',
        type: editingActivityData.type || 'curso',
        estimatedDuration: editingActivityData.duration || '',
        startDate: editingActivityData.startDate || '',
        startTime: editingActivityData.startTime || '09:00',
        endDate: editingActivityData.endDate || '',
        endTime: editingActivityData.endTime || '17:00',
        primaryOrganizer: editingActivityData.primaryOrganizer || userEmail || '',
        coOrganizer: editingActivityData.coOrganizer || '',
        sponsor: editingActivityData.sponsor || '',
        description: editingActivityData.description || '',
        contentFiles: editingActivityData.contentFiles || [],
        coverImage: editingActivityData.coverImage || null
      });
    }
  }, [editingActivityId, editingActivityData, userEmail]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!formData.title.trim()) errors.title = 'El título es requerido';
    if (!formData.type) errors.type = 'Selecciona un tipo de actividad';
    if (!formData.estimatedDuration.trim()) errors.estimatedDuration = 'La duración estimada es requerida';
    if (!formData.startDate) errors.startDate = 'La fecha de inicio es requerida';
    if (!formData.endDate) errors.endDate = 'La fecha de fin es requerida';
    if (!formData.description.trim()) errors.description = 'La descripción es requerida';

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
      if (editingActivityId) {
        await activityService.updateActivity(editingActivityId, formData);
        setSuccess('¡Actividad actualizada exitosamente!');
      } else {
        await activityService.createActivity(formData);
        setSuccess('¡Actividad registrada exitosamente!');
      }

      setTimeout(() => {
        // Reset form logic here if needed or handle in component via onSuccess
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      setError(err.message || 'Error al procesar la solicitud.');
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
    handleInputChange,
    handleFileChange,
    removeFile,
    handleSubmit
  };
};