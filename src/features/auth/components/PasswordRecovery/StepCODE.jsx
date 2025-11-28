import React, { useState } from 'react';
import authService from '../../../../services/authService';
import { Input, Button, Alert } from '../../../../components/ui';
import styles from './passwordRecovery.module.css';

export const StepCode = ({ dni, onComplete }) => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!code || code.length !== 6) {
      setError('El código debe tener 6 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.verifyRecoveryCode(dni, code);
      onComplete({ code });
    } catch (err) {
      setError(err.message || 'Código inválido');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 6) {
      setCode(value);
      setError('');
    }
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError('');
    
    try {
      await authService.verifyDNI(dni);
      setError(''); 
      alert('Código reenviado exitosamente');
    } catch (err) {
      setError('No se pudo reenviar el código');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      {error && <Alert variant="error">{error}</Alert>}

      <p className={styles.stepDescription}>
        Se ha enviado un código de seguridad a tu correo electrónico. Ingrésalo aquí.
      </p>

      <Input
        label={
          <span className={styles.labelLight}>
            Código de Verificación
          </span>
        }
        type="text"
        value={code}
        onChange={handleCodeChange}
        placeholder="000000"
        required
        maxLength={6}
        fullWidth
        helperText={
          <span className={styles.helperLight}>
            Ingresa el código de 6 dígitos que recibiste por email
          </span>
        }
      />

      <button
        type="button"
        className={styles.resendLink}
        onClick={handleResendCode}
        disabled={loading}
      >
        ¿No recibiste el código? Reenviar
      </button>

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading} 
        disabled={loading || code.length !== 6} 
        fullWidth
      >
        {loading ? 'Verificando...' : 'Continuar'}
      </Button>
    </form>
  );
};

export default StepCode;
