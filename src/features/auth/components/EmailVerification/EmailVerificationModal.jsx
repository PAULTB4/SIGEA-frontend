import React, { useEffect } from 'react';
import { Mail, Clock, RefreshCw, AlertCircle } from 'lucide-react';
import { Button, Alert } from '../../../../components/ui';
import { CodeInput } from '../../../../components/ui/CodeInput';
import useEmailVerification from '../../hooks/useEmailVerification';
import styles from './emailVerification.module.css';
import { useRef } from "react";


/**
 * Modal para verificación de correo electrónico
 * Aparece después del registro exitoso
 */
export const EmailVerificationModal = ({ 
  email, 
  nombres,
  onVerificationSuccess,
  onClose 
}) => {
  const {
    loading,
    error,
    success,
    code,
    canResend,
    timeLeft,
    attempts,
    maxAttempts,
    sendError,
    sendCode,
    validateCode,
    resendCode,
    handleCodeChange,
    formatTime,
    attemptsLeft,
  } = useEmailVerification();

  // Enviar código automáticamente al montar el componente
 const codeHasBeenSent = useRef(false);

useEffect(() => {
  if (!codeHasBeenSent.current && email && nombres) {
    sendCode(email, nombres);
    codeHasBeenSent.current = true;
  }
}, [email, nombres]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const result = await validateCode(email, code);
    
    // ✅ CRÍTICO: Solo cerrar si fue exitoso
    if (result.success) {
      // Esperar un momento para que el usuario vea el mensaje de éxito
      setTimeout(() => {
        onVerificationSuccess();
      }, 1500);
    }
    // ✅ NO hacer nada si falló, solo mostrar el error
  };

  const handleResend = async () => {
    await resendCode(email, nombres);
  };

  // ✅ NUEVO: Prevenir cierre si hay error de envío
  const handleClose = () => {
    if (sendError) {
      // Si hubo error enviando el código, permitir cerrar
      onClose();
    } else {
      // Si el código se envió bien, confirmar antes de cerrar
      const confirmed = window.confirm(
        '¿Estás seguro de que quieres salir sin verificar tu correo? ' +
        'No podrás acceder al sistema hasta que lo verifiques.'
      );
      if (confirmed) {
        onClose();
      }
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.iconContainer}>
            <Mail size={32} />
          </div>
          <h2 className={styles.modalTitle}>Verifica tu correo</h2>
          <p className={styles.modalDescription}>
            Hemos enviado un código de verificación a
          </p>
          <p className={styles.emailText}>{email}</p>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className={styles.modalBody}>
          {error && (
            <Alert variant="error" className={styles.alert}>
              {error}
            </Alert>
          )}
          
          {success && (
            <Alert variant="success" className={styles.alert}>
              {success}
            </Alert>
          )}

          {/* ✅ NUEVO: Advertencia si hubo error enviando */}
          {sendError && (
            <Alert variant="warning" className={styles.alert}>
              <div className={styles.warningContent}>
                <AlertCircle size={20} />
                <div>
                  <strong>No se pudo enviar el código</strong>
                  <p>Verifica que tu correo sea válido o intenta con otro correo.</p>
                </div>
              </div>
            </Alert>
          )}

          <div className={styles.inputSection}>
            <label className={styles.label}>
              Ingresa el código de 6 dígitos
            </label>
            <CodeInput
              value={code}
              onChange={handleCodeChange}
              disabled={loading || attempts >= maxAttempts || sendError}
              error={!!error}
              autoFocus={!sendError}
            />
            
            {attemptsLeft > 0 && attemptsLeft < maxAttempts && !sendError && (
              <p className={styles.attemptsText}>
                {attemptsLeft} {attemptsLeft === 1 ? 'intento restante' : 'intentos restantes'}
              </p>
            )}

            {attempts >= maxAttempts && (
              <p className={styles.errorText}>
                Has alcanzado el máximo de intentos. Solicita un nuevo código.
              </p>
            )}
          </div>

          {/* Timer y botón de reenvío */}
          {!sendError && (
            <div className={styles.resendSection}>
              {!canResend ? (
                <div className={styles.timerContainer}>
                  <Clock size={16} />
                  <span className={styles.timerText}>
                    Reenviar código en {formatTime()}
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading}
                  className={styles.resendButton}
                >
                  <RefreshCw size={16} />
                  Reenviar código
                </button>
              )}
            </div>
          )}

          {/* Botones de acción */}
          <div className={styles.buttonGroup}>
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={loading || code.length !== 6 || attempts >= maxAttempts || sendError}
              fullWidth
            >
              {loading ? 'Verificando...' : 'Verificar código'}
            </Button>
            
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={loading}
              fullWidth
            >
              {sendError ? 'Cerrar' : 'Verificar más tarde'}
            </Button>
          </div>

          {/* Info adicional */}
          <div className={styles.infoBox}>
            <p className={styles.infoText}>
              <strong>¿No recibiste el código?</strong>
            </p>
            <ul className={styles.infoList}>
              <li>Revisa tu carpeta de spam o correo no deseado</li>
              <li>Verifica que el correo sea correcto</li>
              <li>El código expira en 10 minutos</li>
              <li>Algunos proveedores de correo pueden demorar en entregar el mensaje</li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmailVerificationModal;