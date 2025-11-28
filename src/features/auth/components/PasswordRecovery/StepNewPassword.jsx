import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import authService from '../../../../services/authService';
import { Input, Button, Alert } from '../../../../components/ui';
import styles from './passwordRecovery.module.css';

export const StepNewPassword = ({ dni, onComplete }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmNewPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await authService.resetPassword(dni, formData.newPassword);
      setSuccess('¡Contraseña restablecida correctamente! Redirigiendo...');
      setTimeout(() => onComplete(), 1500);
    } catch (err) {
      setError(err.message || 'Error al restablecer contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.stepForm}>
      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <p className={styles.stepDescription}>
        Ingresa tu nueva contraseña.
      </p>

      <Input
        label={
          <span className={styles.labelLight}>
            Nueva Contraseña
          </span>
        }
        type={showPassword ? 'text' : 'password'}
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="••••••••"
        required
        fullWidth
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={styles.passwordToggle}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <Input
        label={
          <span className={styles.labelLight}>
            Confirmar Nueva Contraseña
          </span>
        }
        type={showConfirmPassword ? 'text' : 'password'}
        name="confirmNewPassword"
        value={formData.confirmNewPassword}
        onChange={handleChange}
        placeholder="••••••••"
        required
        fullWidth
        rightIcon={
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className={styles.passwordToggle}
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        }
      />

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading} 
        disabled={loading} 
        fullWidth
      >
        {loading ? 'Procesando...' : 'Restablecer Contraseña'}
      </Button>
    </form>
  );
};

export default StepNewPassword;
