// src/features/participantDashboard/components/EnrollmentForm.jsx
import React, { useState } from 'react';
import { X, AlertCircle, ArrowRight } from 'lucide-react';
import participantService from '../../../services/participantService';
import PaymentUI from './PaymentUI';

const COLORS = {
  PRIMARY: '#598AEB',
  SECONDARY: '#59C87B',
  LIGHT_ACCENT: '#A7D3EB',
  BRAND_ACCENT: '#59EBBF',
  CARD_BG: '#0F172A',
  TEXT_LIGHT: '#FFFFFF',
  TEXT_DARK: '#0F172A',
  BG_BASE: '#FFFFFF',
};

const EnrollmentForm = ({ activity, onSuccess, onCancel }) => {
  const [formStep, setFormStep] = useState('form'); // 'form' or 'payment'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    dni: '',
    email: localStorage.getItem('userEmail') || '',
    phone: '',
    institution: '',
    educationLevel: '',
  });
  const [errors, setErrors] = useState({});

  const educationLevels = [
    { value: 'primaria', label: 'Primaria' },
    { value: 'secundaria', label: 'Secundaria' },
    { value: 'pregrado', label: 'Pregrado' },
    { value: 'postgrado', label: 'Postgrado' },
    { value: 'otro', label: 'Otro' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    setError('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'El nombre completo es requerido';
    }

    if (!formData.dni.trim()) {
      newErrors.dni = 'El DNI es requerido';
    } else if (!/^\d{8}$/.test(formData.dni)) {
      newErrors.dni = 'El DNI debe tener 8 dígitos';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.institution.trim()) {
      newErrors.institution = 'La institución es requerida';
    }

    if (!formData.educationLevel) {
      newErrors.educationLevel = 'El nivel educativo es requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitEnrollment = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError('Por favor, completa todos los campos correctamente');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const result = await participantService.enrollInActivity(
        activity.id,
        formData
      );

      if (result.success && result.data) {
        setEnrollmentId(result.data.enrollmentId);
        setFormStep('payment');
      } else {
        setError(result.message || 'Error al registrar la inscripción');
      }
    } catch (err) {
      setError(err.message || 'Error al registrar la inscripción');
    } finally {
      setLoading(false);
    }
  };

  if (formStep === 'payment' && enrollmentId) {
    return (
      <PaymentUI
        enrollmentId={enrollmentId}
        activity={activity}
        onSuccess={onSuccess}
        onCancel={onCancel}
      />
    );
  }

  return (
    <div>
      {/* Header */}
      <div
        className="flex items-center justify-between p-6 border-b"
        style={{ borderColor: COLORS.LIGHT_ACCENT }}
      >
        <div>
          <h2
            className="text-2xl font-bold"
            style={{ color: COLORS.TEXT_DARK }}
          >
            Inscripción a Evento
          </h2>
          <p
            style={{ color: COLORS.PRIMARY }}
            className="text-sm mt-1"
          >
            {activity.title}
          </p>
        </div>
        <button
          onClick={onCancel}
          disabled={loading}
          className="p-2 rounded-lg transition-colors"
          style={{
            backgroundColor: COLORS.LIGHT_ACCENT + '20',
            color: COLORS.PRIMARY,
          }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Content */}
      <form onSubmit={handleSubmitEnrollment} className="p-6 space-y-6">
        {/* Error Alert */}
        {error && (
          <div
            className="p-4 rounded-lg flex items-start gap-3"
            style={{
              backgroundColor: '#DC2626' + '15',
              borderLeft: `4px solid #DC2626`,
            }}
          >
            <AlertCircle
              size={20}
              style={{ color: '#DC2626' }}
              className="flex-shrink-0 mt-0.5"
            />
            <p style={{ color: '#DC2626' }} className="text-sm">
              {error}
            </p>
          </div>
        )}

        {/* Activity Info Card */}
        <div
          className="p-4 rounded-lg border-2"
          style={{
            backgroundColor: COLORS.CARD_BG,
            borderColor: COLORS.PRIMARY,
          }}
        >
          <p
            style={{ color: COLORS.LIGHT_ACCENT }}
            className="text-sm font-semibold mb-2"
          >
            Evento Seleccionado
          </p>
          <p
            style={{ color: COLORS.TEXT_LIGHT }}
            className="font-bold"
          >
            {activity.title}
          </p>
          <p
            style={{ color: COLORS.BRAND_ACCENT }}
            className="text-sm mt-2"
          >
            Precio: S/ {activity.price.toFixed(2)}
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          {/* Full Name */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              Nombre Completo *
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.fullName
                  ? '#DC2626'
                  : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
              placeholder="Ej: Juan Pérez García"
            />
            {errors.fullName && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.fullName}
              </p>
            )}
          </div>

          {/* DNI */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              DNI/Identificación *
            </label>
            <input
              type="text"
              name="dni"
              value={formData.dni}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.dni ? '#DC2626' : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
              placeholder="Ej: 12345678"
              maxLength="8"
            />
            {errors.dni && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.dni}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              Correo Electrónico *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.email ? '#DC2626' : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              Número de Celular *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.phone ? '#DC2626' : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
              placeholder="+51 987 654 321"
            />
            {errors.phone && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* Institution */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              Institución/Centro Educativo *
            </label>
            <input
              type="text"
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.institution
                  ? '#DC2626'
                  : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
              placeholder="Ej: Universidad Nacional Autónoma"
            />
            {errors.institution && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.institution}
              </p>
            )}
          </div>

          {/* Education Level */}
          <div>
            <label
              style={{ color: COLORS.TEXT_DARK }}
              className="block text-sm font-semibold mb-2"
            >
              Nivel Educativo *
            </label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleInputChange}
              className="w-full px-4 py-2 rounded-lg border"
              style={{
                borderColor: errors.educationLevel
                  ? '#DC2626'
                  : COLORS.LIGHT_ACCENT,
                color: COLORS.TEXT_DARK,
              }}
            >
              <option value="">-- Selecciona tu nivel educativo --</option>
              {educationLevels.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
            {errors.educationLevel && (
              <p style={{ color: '#DC2626' }} className="text-xs mt-1">
                {errors.educationLevel}
              </p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div
          className="flex gap-3 pt-4 border-t"
          style={{ borderColor: COLORS.LIGHT_ACCENT }}
        >
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50"
            style={{
              backgroundColor: COLORS.LIGHT_ACCENT + '20',
              color: COLORS.PRIMARY,
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-6 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            style={{
              backgroundColor: COLORS.PRIMARY,
              color: COLORS.TEXT_LIGHT,
            }}
          >
            {loading ? 'Procesando...' : 'Continuar a Pago'}
            {!loading && <ArrowRight size={18} />}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
