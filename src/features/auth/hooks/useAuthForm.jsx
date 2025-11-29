import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'; 
import { handleApiError, logError } from '../../../utils/errorHandler';

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login: authLogin } = useAuth(); 

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authLogin({ email, password });
      
      if (result.success) {
        setSuccess('¡Sesión iniciada correctamente!');
        
        setTimeout(() => {
          const redirectPath = result.role === 'organizador' || result.role === 'admin'
            ? '/organizer/dashboard'
            : '/participant/dashboard';
          
          navigate(redirectPath, { replace: true });
        }, 500);
        
        return { success: true };
      }
    } catch (err) {
      logError(err, 'useAuthForm.login');
      
      let errorMessage = 'Error al iniciar sesión';
      
      if (typeof err === 'string') {
        errorMessage = err;
      } else if (err?.message) {
        errorMessage = err.message;
      } else if (err?.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      
      setError(errorMessage);
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return { success: false };
    }

    try {
      const authService = require('../../../services/authService').default;
      await authService.register(
        formData.fullName,
        formData.email,
        formData.dni,
        formData.password
      );
      
      setSuccess('Cuenta creada. Iniciando sesión...');
      
      const loginResult = await authLogin(
        { email: formData.email, password: formData.password }
      );
      
      if (loginResult.success) {
        setTimeout(() => {
          const redirectPath = loginResult.role === 'organizador' || loginResult.role === 'admin'
            ? '/organizer/dashboard'
            : '/participant/dashboard';
          
          navigate(redirectPath, { replace: true });
        }, 500);
      }
      
      return { success: true };
    } catch (err) {
      logError(err, 'useAuthForm.register');
      setError(err.message || 'Error en el registro');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    loading,
    error,
    success,
    login,
    register,
    clearMessages
  };
};