import { useState, useEffect, useRef } from 'react';
import authService from '../../../services/authService';
import { logError } from '../../../utils/errorHandler';

/**
 * Hook personalizado para manejar la verificación de email
 * Incluye lógica de timer, reintentos y validación
 */
export const useEmailVerification = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [canResend, setCanResend] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos en segundos
  
  const timerRef = useRef(null);
  const MAX_ATTEMPTS = 3;
  const RESEND_COOLDOWN = 300; // 5 minutos

  /**
   * Timer para countdown de reenvío
   */
  useEffect(() => {
    if (timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timeLeft]);

  /**
   * Formatea el tiempo restante en MM:SS
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Envía código de verificación al email
   */
  const sendCode = async (email, nombres) => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.sendVerificationCode(email, nombres);
      
      setSuccess(result.message || 'Código enviado a tu correo');
      setTimeLeft(RESEND_COOLDOWN);
      setCanResend(false);
      setAttempts(0); // Reset attempts cuando se envía nuevo código
      
      return { success: true };
    } catch (err) {
      logError(err, 'useEmailVerification.sendCode');
      setError(err.message || 'Error al enviar código');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Valida el código ingresado por el usuario
   */
  const validateCode = async (email, verificationCode) => {
    // Validación básica del formato
    if (!verificationCode || verificationCode.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return { success: false };
    }

    if (!/^\d+$/.test(verificationCode)) {
      setError('El código debe contener solo números');
      return { success: false };
    }

    // Verificar intentos
    if (attempts >= MAX_ATTEMPTS) {
      setError('Has alcanzado el máximo de intentos. Solicita un nuevo código.');
      return { success: false };
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const result = await authService.validateVerificationCode(email, verificationCode);
      
      setSuccess(result.message || '¡Correo verificado exitosamente!');
      setCode('');
      
      return { success: true };
    } catch (err) {
      logError(err, 'useEmailVerification.validateCode');
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      // Mensaje específico según el tipo de error
      let errorMessage = err.message;
      
      if (err.isInvalidCode) {
        const attemptsLeft = MAX_ATTEMPTS - newAttempts;
        if (attemptsLeft > 0) {
          errorMessage = `Código incorrecto. Te quedan ${attemptsLeft} ${attemptsLeft === 1 ? 'intento' : 'intentos'}.`;
        } else {
          errorMessage = 'Has alcanzado el máximo de intentos. Solicita un nuevo código.';
        }
      } else if (err.isExpired) {
        errorMessage = 'El código ha expirado. Solicita uno nuevo.';
        setCanResend(true);
        setTimeLeft(0);
      }
      
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Maneja el cambio del código
   */
  const handleCodeChange = (value) => {
    // Solo permitir números y máximo 6 dígitos
    const numericValue = value.replace(/\D/g, '').slice(0, 6);
    setCode(numericValue);
    setError(''); // Limpiar error al escribir
  };

  /**
   * Reenvía el código
   */
  const resendCode = async (email, nombres) => {
    if (!canResend) {
      setError(`Espera ${formatTime(timeLeft)} antes de reenviar el código`);
      return { success: false };
    }

    return await sendCode(email, nombres);
  };

  /**
   * Limpia mensajes
   */
  const clearMessages = () => {
    setError('');
    setSuccess('');
  };

  /**
   * Reset completo del estado
   */
  const reset = () => {
    setCode('');
    setError('');
    setSuccess('');
    setAttempts(0);
    setTimeLeft(RESEND_COOLDOWN);
    setCanResend(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return {
    // Estado
    loading,
    error,
    success,
    code,
    attempts,
    canResend,
    timeLeft,
    maxAttempts: MAX_ATTEMPTS,
    
    // Funciones
    sendCode,
    validateCode,
    resendCode,
    handleCodeChange,
    clearMessages,
    reset,
    
    // Utilidades
    formatTime: () => formatTime(timeLeft),
    attemptsLeft: Math.max(0, MAX_ATTEMPTS - attempts),
  };
};

export default useEmailVerification;