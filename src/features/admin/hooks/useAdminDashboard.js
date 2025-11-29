/* src/features/admin/hooks/useAdminDashboard.js */
import { useState, useEffect, useCallback } from 'react';
import adminService from '../services/adminService';

export const useAdminDashboard = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Cargar datos del Home
  const loadHomeData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await adminService.getAdminHome();
      if (response.status) {
        setHomeData(response.extraData || {});
      } else {
        setError(response.message || 'Error al cargar datos');
      }
    } catch (err) {
      // El error ya viene procesado por axiosConfig interceptor
      const message = err.response?.data?.message || err.message || 'Error de conexión';
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Acción: Crear Rol
  const createRole = async (nombre, descripcion) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await adminService.createRole(nombre, descripcion);
      
      if (response.status) {
        setSuccessMessage(response.message || 'Rol creado exitosamente');
        // Recargar datos del home
        await loadHomeData();
        return true;
      } else {
        setError(response.message || 'Error al crear rol');
        return false;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error al crear rol';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Acción: Registrar Usuario
  const registerAdminUser = async (formData) => {
    setLoading(true);
    setError(null);
    setSuccessMessage('');
    
    try {
      const response = await adminService.registerUser(formData);
      
      if (response.status) {
        setSuccessMessage(response.message || 'Usuario registrado exitosamente');
        return true;
      } else {
        setError(response.message || 'Error al registrar usuario');
        return false;
      }
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Error al registrar usuario';
      setError(message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeData();
  }, [loadHomeData]);

  return {
    homeData,
    loading,
    error,
    successMessage,
    clearMessages: () => { 
      setError(null); 
      setSuccessMessage(''); 
    },
    createRole,
    registerAdminUser,
    refresh: loadHomeData
  };
};