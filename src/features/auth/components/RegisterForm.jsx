import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import { Input, Button, Alert, PhoneInput } from '../../../components/ui';
import { EmailVerificationModal } from './EmailVerification/EmailVerificationModal'; // ✅ NUEVO IMPORT
import styles from './authForms.module.css';

export const RegisterForm = () => {
  // ✅ NUEVO: Agregar los nuevos valores del hook
  const { 
    loading, 
    error, 
    success, 
    register, 
    clearMessages,
    showVerificationModal,      // ✅ NUEVO
    registeredUserData,          // ✅ NUEVO
    handleVerificationSuccess,   // ✅ NUEVO
    handleVerificationSkip       // ✅ NUEVO
  } = useAuthForm();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    email: '',
    dni: '',
    telefono: '',
    extensionTelefonica: '+51',
    password: '',
    confirmPassword: ''
  });

  const [fieldErrors, setFieldErrors] = useState({
    dni: '',
    telefono: ''
  });

  const [selectedCountry, setSelectedCountry] = useState({ 
    phoneLength: 9, 
    prefix: ['9'],
    name: 'Perú' 
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'dni') {
      const numericValue = value.replace(/\D/g, '');
      setFormData(prev => ({ ...prev, [name]: numericValue }));
      
      if (numericValue.length > 0 && numericValue.length !== 8) {
        setFieldErrors(prev => ({ ...prev, dni: 'El DNI debe tener 8 dígitos' }));
      } else {
        setFieldErrors(prev => ({ ...prev, dni: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    clearMessages();
  };

  const handlePhoneChange = (e, country) => {
    const phoneValue = e.target.value;
    setFormData(prev => ({ ...prev, telefono: phoneValue }));
    
    if (phoneValue.length > 0 && phoneValue.length !== country.phoneLength) {
      setFieldErrors(prev => ({ 
        ...prev, 
        telefono: `El teléfono de ${country.name} debe tener ${country.phoneLength} dígitos` 
      }));
      return;
    }
    
    if (country.prefix && phoneValue.length === country.phoneLength) {
      const startsWithValidPrefix = country.prefix.some(p => phoneValue.startsWith(p));
      if (!startsWithValidPrefix) {
        setFieldErrors(prev => ({ 
          ...prev, 
          telefono: `El teléfono de ${country.name} debe empezar con ${country.prefix.join(' o ')}` 
        }));
        return;
      }
    }
    
    setFieldErrors(prev => ({ ...prev, telefono: '' }));
    clearMessages();
  };

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setFormData(prev => ({ ...prev, extensionTelefonica: country.dialCode }));
    
    const phoneValue = formData.telefono;
    if (phoneValue.length > 0) {
      if (phoneValue.length !== country.phoneLength) {
        setFieldErrors(prev => ({ 
          ...prev, 
          telefono: `El teléfono de ${country.name} debe tener ${country.phoneLength} dígitos` 
        }));
      } else if (country.prefix) {
        const startsWithValidPrefix = country.prefix.some(p => phoneValue.startsWith(p));
        if (!startsWithValidPrefix) {
          setFieldErrors(prev => ({ 
            ...prev, 
            telefono: `El teléfono de ${country.name} debe empezar con ${country.prefix.join(' o ')}` 
          }));
        } else {
          setFieldErrors(prev => ({ ...prev, telefono: '' }));
        }
      } else {
        setFieldErrors(prev => ({ ...prev, telefono: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <Alert variant="error">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <div className={styles.fieldGroup}>
          <Input
            label="Nombres"
            type="text"
            name="nombres"
            value={formData.nombres}
            onChange={handleInputChange}
            placeholder="Juan Carlos"
            required
            fullWidth
          />

          <Input
            label="Apellidos"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleInputChange}
            placeholder="García Pérez"
            required
            fullWidth
          />

          <Input
            label="DNI"
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
            placeholder="73245678"
            required
            maxLength={8}
            fullWidth
            error={fieldErrors.dni}
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

          <PhoneInput
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={(e) => handlePhoneChange(e, selectedCountry)}
            onCountryChange={handleCountryChange}
            defaultCountry="PE"
            required
            fullWidth
            error={fieldErrors.telefono}
            helperText={!fieldErrors.telefono && selectedCountry.prefix 
              ? `Debe empezar con ${selectedCountry.prefix.join(' o ')}` 
              : !fieldErrors.telefono 
              ? "Ingresa tu número de teléfono sin el código de país" 
              : undefined
            }
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
            helperText="Mínimo 8 caracteres"
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

      {/* ✅ NUEVO: Modal de verificación de email */}
      {showVerificationModal && registeredUserData && (
        <EmailVerificationModal
          email={registeredUserData.email}
          nombres={registeredUserData.nombres}
          onVerificationSuccess={handleVerificationSuccess}
          onClose={handleVerificationSkip}
        />
      )}
    </>
  );
};

export default RegisterForm;