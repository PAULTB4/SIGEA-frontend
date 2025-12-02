import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';
import { handleApiError, logError } from '../../../utils/errorHandler';
import authService from '../../../services/authService';

export const useAuthForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // ✅ NUEVO: Estados para el modal de verificación
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [registeredUserData, setRegisteredUserData] = useState(null);

  const { login: authLogin } = useAuth();

  const login = async (email, password, rememberMe = false) => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const result = await authLogin({ email, password, rememberMe });

      if (!result || !result.success) {
        const errorMessage = result?.error || 'Credenciales incorrectas';
        setError(errorMessage);
        return { success: false, error: errorMessage };
      }

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
      return { success: false, error: errorMessage };
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

    // ✅ CAMBIO: No registrar todavía. Solo guardar datos y verificar correo primero.
    try {
      // Guardar datos temporalmente para usarlos después de verificar
      setRegisteredUserData({
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        email: formData.email,
        dni: formData.dni,
        telefono: formData.telefono,
        extensionTelefonica: formData.extensionTelefonica,
        password: formData.password
      });

      setSuccess('Validando correo electrónico...');
      setShowVerificationModal(true);

      return { success: true, needsVerification: true };

    } catch (err) {
      logError(err, 'useAuthForm.register');
      setError(err.message || 'Error en el registro');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: Función para cuando se verifica el email exitosamente
  const handleVerificationSuccess = async () => {
    // No cerramos el modal inmediatamente para mostrar estado de carga si fuera necesario
    // Pero como el modal maneja su propio loading, podemos proceder

    if (!registeredUserData) {
      setError('Error: No hay datos de registro para procesar');
      setShowVerificationModal(false);
      return;
    }

    setLoading(true); // Usamos el loading del formulario principal

    try {
      // 1. Ahora sí, REGISTRAR al usuario en el backend
      await authService.register(
        registeredUserData.nombres,
        registeredUserData.apellidos,
        registeredUserData.email,
        registeredUserData.dni,
        registeredUserData.telefono,
        registeredUserData.extensionTelefonica,
        registeredUserData.password
      );

      // 2. Cerrar modal
      setShowVerificationModal(false);

      // 3. Hacer login automático
      setSuccess('¡Cuenta creada y verificada! Iniciando sesión...');

      const loginResult = await authLogin({
        email: registeredUserData.email,
        password: registeredUserData.password,
        rememberMe: false
      });

      if (loginResult.success) {
        setTimeout(() => {
          const redirectPath =
            loginResult.role === 'organizador' || loginResult.role === 'admin'
              ? '/organizer/dashboard'
              : '/participant/dashboard';

          navigate(redirectPath, { replace: true });
        }, 500);
      } else {
        // Si falla el login automático, redirigir al login manual
        setError('Registro exitoso, pero falló el inicio de sesión automático. Por favor ingresa manualmente.');
        setTimeout(() => navigate('/auth/login'), 2000);
      }

    } catch (err) {
      console.error('Error en registro post-verificación:', err);
      // Si falla el registro (ej. DNI duplicado), mostramos el error
      // Cerramos el modal para que el usuario pueda corregir los datos en el formulario
      setShowVerificationModal(false);

      let errorMessage = err.message || 'Error al crear la cuenta';
      if (err.message?.includes('DNI')) errorMessage = 'El DNI ya está registrado';
      if (err.message?.includes('correo')) errorMessage = 'El correo ya está registrado';

      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // ✅ NUEVO: Función para cuando el usuario cierra el modal sin verificar
  const handleVerificationSkip = () => {
    setShowVerificationModal(false);
    setSuccess('Registro completado. Recuerda verificar tu correo.');
  };

  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  return {
    loading,
    error,
    success,
    // ✅ NUEVO: Exportar estados y funciones del modal
    showVerificationModal,
    registeredUserData,
    handleVerificationSuccess,
    handleVerificationSkip,
    // Funciones existentes
    login,
    register,
    clearMessages
  };
};