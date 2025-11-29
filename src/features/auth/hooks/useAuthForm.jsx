import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth'; 
import { handleApiError, logError } from '../../../utils/errorHandler';
import authService from '../../../services/authService'; // ✅ Import correcto

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const { login: authLogin } = useAuth(); 

  const login = async (email, password, rememberMe = false) => {
  setLoading(true);
  setError(null);
  setSuccess(null);

  try {
    const result = await authLogin({ email, password, rememberMe });

// ⬅️ SI EL LOGIN FALLA
if (!result || !result.success) {
  const errorMessage = result?.error || 'Credenciales incorrectas';
  setError(errorMessage);

  return { success: false, error: errorMessage };
}

// ⬅️ SI EL LOGIN ES EXITOSO
setSuccess('¡Sesión iniciada correctamente!');

setTimeout(() => {
  const redirectPath =
    result.role === 'organizador' || result.role === 'admin'
      ? '/organizer/dashboard'
      : '/participant/dashboard';

  navigate(redirectPath, { replace: true });
}, 500);

return { success: true };

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
    return { success: false, error: errorMessage };  // ← AGREGAR error aquí
  } finally {
    setLoading(false);
  }
};

  const register = async (formData) => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Validación de contraseñas
    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden.');
      setLoading(false);
      return { success: false };
    }

   // Validación de teléfono (debe estar completo)
if (!formData.telefono || formData.telefono.length < 8) {
  setError('Ingresa un número de teléfono válido.');
  setLoading(false);
  return { success: false };
}

// Validación adicional: solo números en DNI
if (!/^\d+$/.test(formData.dni)) {
  setError('El DNI debe contener solo números.');
  setLoading(false);
  return { success: false };
}

// Validación de teléfono (debe estar completo)
if (!formData.telefono || formData.telefono.length < 8) {
  setError('Ingresa un número de teléfono válido.');
  setLoading(false);
  return { success: false };
}

    try {
      // ✅ CORRECCIÓN: Ya no usamos require, usamos el import de arriba
      await authService.register(
        formData.nombres,
        formData.apellidos,
        formData.email,
        formData.dni,
        formData.telefono,
        formData.extensionTelefonica,
        formData.password
      );
      
      setSuccess('Cuenta creada. Iniciando sesión...');
      
      const loginResult = await authLogin(
        { email: formData.email, password: formData.password, rememberMe: false }
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