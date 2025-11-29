/**
 * Input Primitive Component
 * Campo de entrada accesible con validación visual
 */

import React, { useState } from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

const Input = ({
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder,
  label,
  helperText,
  error,
  success,
  disabled = false,
  required = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  id,
  name,
  autoComplete,
  maxLength,
  className = '',
  inputClassName = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputId = id || `input-${name || Math.random().toString(36).substr(2, 9)}`;

  // Determinar estado del input
  const hasError = !!error;
  const hasSuccess = !!success && !hasError;

  // Estilos base del input
  const inputStyles = {
    width: '100%',
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.normal,
    lineHeight: typography.lineHeight.normal,
    padding: `${spacing.spacing[3]} ${spacing.spacing[4]}`,
    paddingLeft: leftIcon ? spacing.spacing[12] : spacing.spacing[4],
    paddingRight: rightIcon ? spacing.spacing[12] : spacing.spacing[4],
    borderRadius: spacing.borderRadius.lg,
    border: `2px solid ${
      hasError
        ? colors.borders.error
        : hasSuccess
        ? colors.borders.success
        : isFocused
        ? colors.borders.focus
        : colors.borders.light
    }`,
    backgroundColor: disabled ? colors.neutral[50] : colors.surfaces.base,
    color: disabled ? colors.text.disabled : colors.text.primary,
    outline: 'none',
    transition: 'all 0.2s ease-in-out',
    cursor: disabled ? 'not-allowed' : 'text',
    boxShadow: isFocused ? shadows.semantic.inputFocus : 'none',
  };

  // Estilos del contenedor
  const containerStyles = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing.spacing[2],
    width: fullWidth ? '100%' : 'auto',
  };

  // Estilos del wrapper del input
  const inputWrapperStyles = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  // Estilos de iconos
  const iconStyles = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    color: disabled
      ? colors.text.disabled
      : hasError
      ? colors.semantic.error
      : hasSuccess
      ? colors.semantic.success
      : colors.text.tertiary,
  };

  const handleFocus = (e) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <div style={containerStyles} className={className}>
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          style={{
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            color: hasError ? colors.semantic.error : colors.text.primary,
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
        >
          {label}
          {required && (
            <span style={{ color: colors.semantic.error, marginLeft: spacing.spacing[1] }}>
              *
            </span>
          )}
        </label>
      )}

      {/* Input Wrapper */}
      <div style={inputWrapperStyles}>
        {/* Icono izquierdo */}
        {leftIcon && (
          <span
            aria-hidden="true"
            style={{
              ...iconStyles,
              left: spacing.spacing[4],
            }}
          >
            {leftIcon}
          </span>
        )}

        {/* Input */}
        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          style={inputStyles}
          className={inputClassName}
          {...props}
        />

        {/* Icono derecho */}
        {rightIcon && (
          <span
            aria-hidden="true"
            style={{
              ...iconStyles,
              right: spacing.spacing[4],
            }}
          >
            {rightIcon}
          </span>
        )}
      </div>

      {/* Mensaje de error */}
      {error && (
        <span
          id={`${inputId}-error`}
          role="alert"
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.semantic.error,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.spacing[1],
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M7 4v3M7 9v1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          {error}
        </span>
      )}

      {/* Mensaje de éxito */}
      {success && !error && (
        <span
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.semantic.success,
            display: 'flex',
            alignItems: 'center',
            gap: spacing.spacing[1],
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="2" />
            <path d="M4 7l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          {success}
        </span>
      )}

      {/* Helper text */}
      {helperText && !error && !success && (
        <span
          id={`${inputId}-helper`}
          style={{
            fontSize: typography.fontSize.xs,
            color: colors.text.secondary,
          }}
        >
          {helperText}
        </span>
      )}
    </div>
  );
};

export default Input;