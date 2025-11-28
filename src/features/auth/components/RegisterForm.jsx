import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import { Input, Button, Alert } from '../../../components/ui';
import styles from './authForms.module.css';

export const RegisterForm = () => {
  const { loading, error, success, register, clearMessages } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dni: '',
    password: '',
    confirmPassword: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearMessages();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <div className={styles.fieldGroup}>
        <Input
          label="Nombre Completo"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="Juan García Pérez"
          required
          fullWidth
        />

        <Input
          label="DNI"
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleInputChange}
          placeholder="12345678"
          required
          maxLength={8}
          fullWidth
        />

        <Input
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="tu@email.com"
          required
          fullWidth
        />

        <Input
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          name="password"
          value={formData.password}
          onChange={handleInputChange}
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
          label="Confirmar Contraseña"
          type={showConfirmPassword ? 'text' : 'password'}
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleInputChange}
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
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading}
        disabled={loading}
        fullWidth
        className={styles.submitButton}
      >
        {loading ? 'Registrando...' : 'Registrarse'}
      </Button>
    </form>
  );
};

export default RegisterForm;