/**
 * PhoneInput Component
 * Campo de teléfono con selector de país y bandera
 */

import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const COUNTRIES = [
  { code: 'PE', name: 'Perú', dialCode: '+51', flag: '🇵🇪', phoneLength: 9, prefix: ['9'] },
  { code: 'AR', name: 'Argentina', dialCode: '+54', flag: '🇦🇷', phoneLength: 10, prefix: null },
  { code: 'BO', name: 'Bolivia', dialCode: '+591', flag: '🇧🇴', phoneLength: 8, prefix: null },
  { code: 'BR', name: 'Brasil', dialCode: '+55', flag: '🇧🇷', phoneLength: 11, prefix: null },
  { code: 'CL', name: 'Chile', dialCode: '+56', flag: '🇨🇱', phoneLength: 9, prefix: null },
  { code: 'CO', name: 'Colombia', dialCode: '+57', flag: '🇨🇴', phoneLength: 10, prefix: null },
  { code: 'CR', name: 'Costa Rica', dialCode: '+506', flag: '🇨🇷', phoneLength: 8, prefix: null },
  { code: 'EC', name: 'Ecuador', dialCode: '+593', flag: '🇪🇨', phoneLength: 9, prefix: null },
  { code: 'SV', name: 'El Salvador', dialCode: '+503', flag: '🇸🇻', phoneLength: 8, prefix: null },
  { code: 'ES', name: 'España', dialCode: '+34', flag: '🇪🇸', phoneLength: 9, prefix: null },
  { code: 'US', name: 'Estados Unidos', dialCode: '+1', flag: '🇺🇸', phoneLength: 10, prefix: null },
  { code: 'GT', name: 'Guatemala', dialCode: '+502', flag: '🇬🇹', phoneLength: 8, prefix: null },
  { code: 'HN', name: 'Honduras', dialCode: '+504', flag: '🇭🇳', phoneLength: 8, prefix: null },
  { code: 'MX', name: 'México', dialCode: '+52', flag: '🇲🇽', phoneLength: 10, prefix: null },
  { code: 'NI', name: 'Nicaragua', dialCode: '+505', flag: '🇳🇮', phoneLength: 8, prefix: null },
  { code: 'PA', name: 'Panamá', dialCode: '+507', flag: '🇵🇦', phoneLength: 8, prefix: null },
  { code: 'PY', name: 'Paraguay', dialCode: '+595', flag: '🇵🇾', phoneLength: 9, prefix: null },
  { code: 'UY', name: 'Uruguay', dialCode: '+598', flag: '🇺🇾', phoneLength: 9, prefix: null },
  { code: 'VE', name: 'Venezuela', dialCode: '+58', flag: '🇻🇪', phoneLength: 10, prefix: null },
];

const PhoneInput = ({
  value = '',
  onChange,
  onCountryChange,
  label,
  error,
  success,
  helperText,
  required = false,
  disabled = false,
  fullWidth = false,
  defaultCountry = 'PE',
  placeholder,
  className = '',
  name = 'phone',
}) => {
  const [selectedCountry, setSelectedCountry] = useState(
    COUNTRIES.find(c => c.code === defaultCountry) || COUNTRIES[0]
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const inputId = `phone-input-${name}`;
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    onCountryChange?.(country);
  };

 const handlePhoneChange = (e) => {
  const inputValue = e.target.value;
  const numericValue = inputValue.replace(/\D/g, '');
  
  if (numericValue.length <= selectedCountry.phoneLength) {
    onChange?.({
      ...e,
      target: {
        ...e.target,
        name,
        value: numericValue,
      },
    }, selectedCountry);  // ← AGREGAR selectedCountry como segundo parámetro
  }
};

  // Estilos con valores directos (sin tokens)
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
    width: fullWidth ? '100%' : 'auto',
  };

  const inputWrapperStyles = {
    display: 'flex',
    alignItems: 'stretch',
    position: 'relative',
    borderRadius: '0.5rem',
    border: `2px solid ${
      hasError
        ? '#EF4444'
        : hasSuccess
        ? '#10B981'
        : isFocused
        ? '#3B82F6'
        : '#E5E7EB'
    }`,
    backgroundColor: disabled ? '#F9FAFB' : '#FFFFFF',
    transition: 'all 0.2s ease-in-out',
    boxShadow: isFocused ? '0 0 0 3px rgba(59, 130, 246, 0.1)' : 'none',
  };

  const countryButtonStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.75rem',
    backgroundColor: 'transparent',
    border: 'none',
    borderRight: '1px solid #E5E7EB',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '1rem',
    color: '#111827',
    outline: 'none',
    minWidth: '100px',
  };

  const phoneInputStyles = {
    flex: 1,
    padding: '0.75rem 1rem',
    border: 'none',
    outline: 'none',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    fontSize: '1rem',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    color: disabled ? '#9CA3AF' : '#111827',
    cursor: disabled ? 'not-allowed' : 'text',
  };

  const dropdownStyles = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    border: '1px solid #E5E7EB',
    borderRadius: '0.5rem',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
    maxHeight: '240px',
    overflowY: 'auto',
    zIndex: 1000,
  };

  const labelStyles = {
    fontSize: '0.875rem',
    fontWeight: 600,
    color: hasError ? '#EF4444' : '#111827',
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const helperTextStyles = {
    fontSize: '0.75rem',
    color: hasError ? '#EF4444' : hasSuccess ? '#10B981' : '#6B7280',
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
  };

  return (
    <div style={containerStyles} className={className}>
      {/* Label */}
      {label && (
        <label htmlFor={inputId} style={labelStyles}>
          {label}
          {required && (
            <span style={{ color: '#EF4444', marginLeft: '0.25rem' }}>*</span>
          )}
        </label>
      )}

      {/* Input Wrapper */}
      <div style={inputWrapperStyles}>
        {/* Country Selector */}
        <button
          type="button"
          onClick={() => !disabled && setIsDropdownOpen(!isDropdownOpen)}
          disabled={disabled}
          style={countryButtonStyles}
          aria-label="Seleccionar país"
        >
          <span style={{ fontSize: '20px' }}>{selectedCountry.flag}</span>
          <span style={{ fontWeight: 500 }}>{selectedCountry.dialCode}</span>
          <ChevronDown 
            size={16} 
            style={{ 
              color: '#6B7280',
              transform: isDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease',
            }} 
          />
        </button>

        {/* Phone Input */}
        <input
          id={inputId}
          type="tel"
          name={name}
          value={value}
          onChange={handlePhoneChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder || `Ej: ${'9'.repeat(selectedCountry.phoneLength)}`}
          disabled={disabled}
          required={required}
          maxLength={selectedCountry.phoneLength}
          aria-invalid={hasError}
          aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
          style={phoneInputStyles}
        />

        {/* Dropdown */}
        {isDropdownOpen && (
          <div style={dropdownStyles}>
            {COUNTRIES.map((country) => (
              <CountryOption
                key={country.code}
                country={country}
                onClick={() => handleCountrySelect(country)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <span id={`${inputId}-error`} role="alert" style={helperTextStyles}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M7 4v3M7 9v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </span>
      )}

      {/* Success Message */}
      {success && !error && (
        <span style={helperTextStyles}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {success}
        </span>
      )}

      {/* Helper Text */}
      {helperText && !error && !success && (
        <span id={`${inputId}-helper`} style={helperTextStyles}>
          {helperText}
        </span>
      )}
    </div>
  );
};

// Componente auxiliar para las opciones del dropdown
const CountryOption = ({ country, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const optionStyles = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.75rem 1rem',
    cursor: 'pointer',
    backgroundColor: isHovered ? '#F9FAFB' : 'transparent',
    transition: 'background-color 0.15s ease',
  };

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={optionStyles}
    >
      <span style={{ fontSize: '20px', minWidth: '24px' }}>{country.flag}</span>
      <span style={{ flex: 1, fontSize: '0.875rem', color: '#111827' }}>
        {country.name}
      </span>
      <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: 500 }}>
        {country.dialCode}
      </span>
    </div>
  );
};

export default PhoneInput;