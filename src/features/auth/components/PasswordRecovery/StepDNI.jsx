import React, { useState } from 'react';
import authService from '../../../../services/authService';
import { Input, Button, Alert } from '../../../../components/ui';
import styles from './passwordRecovery.module.css';

const StepDni = ({ onComplete }) => {
  const [dni, setDni] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!dni || dni.length !== 8) {
      setError('Por favor, ingresa un DNI válido de 8 dígitos');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.verifyDNI(dni);
      onComplete({ dni });
    } catch (err) {
      setError(err.message || 'Error al verificar DNI');
    } finally {
      setLoading(false);
    }
  };

  const handleDniChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 8) {
      setDni(value);
      setError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      {error && <Alert variant="error">{error}</Alert>}

      <p className={styles.stepDescription}>
        Ingresa tu DNI para verificar tu identidad y recuperar tu contraseña.
      </p>

      <Input
        label={
          <span className={styles.labelLight}>
            DNI
          </span>
        }
        type="text"
        value={dni}
        onChange={handleDniChange}
        placeholder="12345678"
        required
        maxLength={8}
        fullWidth
        helperText={
          <span className={styles.helperLight}>
            Ingresa tu número de DNI de 8 dígitos
          </span>
        }
      />

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading} 
        disabled={loading || dni.length !== 8} 
        fullWidth
      >
        {loading ? 'Verificando...' : 'Continuar'}
      </Button>
    </form>
  );
};

export default StepDni;
