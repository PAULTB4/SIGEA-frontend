import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import { Input, Button, Alert } from '../../../components/ui';
import styles from './authForms.module.css';

export const LoginForm = () => {
  const { loading, error, success, login, clearMessages } = useAuthForm();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    clearMessages();
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password, formData.rememberMe);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error && <Alert variant="error">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

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

      <div className={styles.rememberMeContainer}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleCheckboxChange}
            className={styles.checkbox}
          />
          <span>Mantener sesión iniciada</span>
        </label>

        <button
          type="button"
          onClick={() => window.location.href = '/auth?view=recovery'}
          className={styles.forgotPasswordLink}
        >
          ¿Olvidaste tu contraseña?
        </button>
      </div>

      <Button 
        type="submit" 
        variant="primary" 
        loading={loading}
        disabled={loading}
        fullWidth
        className={styles.submitButton}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </Button>
    </form>
  );
};

export default LoginForm;