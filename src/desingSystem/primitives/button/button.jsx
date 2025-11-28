/**
 * Button Primitive Component
 * Componente de botón totalmente accesible y con variantes
 */

import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  onClick,
  type = 'button',
  ariaLabel,
  className = '',
  ...props
}) => {
  // Variantes de estilo
  const variants = {
    primary: {
      backgroundColor: colors.brand.primary,
      color: colors.text.inverse,
      border: 'none',
      hover: {
        backgroundColor: colors.brand.primaryDark,
        boxShadow: shadows.semantic.buttonHover,
      },
    },
    secondary: {
      backgroundColor: colors.brand.secondary,
      color: colors.text.inverse,
      border: 'none',
      hover: {
        backgroundColor: colors.brand.secondaryDark,
        boxShadow: shadows.semantic.buttonHover,
      },
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.brand.primary,
      border: `2px solid ${colors.brand.primary}`,
      hover: {
        backgroundColor: colors.brand.primary,
        color: colors.text.inverse,
      },
    },
    ghost: {
      backgroundColor: 'transparent',
      color: colors.brand.primary,
      border: 'none',
      hover: {
        backgroundColor: `${colors.brand.primary}15`,
      },
    },
    danger: {
      backgroundColor: colors.semantic.error,
      color: colors.text.inverse,
      border: 'none',
      hover: {
        backgroundColor: colors.semantic.errorDark,
      },
    },
  };

  // Tamaños
  const sizes = {
    small: {
      padding: `${spacing.spacing[2]} ${spacing.spacing[4]}`,
      fontSize: typography.fontSize.sm,
      gap: spacing.spacing[2],
    },
    medium: {
      padding: `${spacing.spacing[3]} ${spacing.spacing[6]}`,
      fontSize: typography.fontSize.base,
      gap: spacing.spacing[2],
    },
    large: {
      padding: `${spacing.spacing[4]} ${spacing.spacing[8]}`,
      fontSize: typography.fontSize.lg,
      gap: spacing.spacing[3],
    },
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.medium;

  // Estilos base
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: sizeStyles.gap,
    fontFamily: typography.fontFamily.sans,
    fontSize: sizeStyles.fontSize,
    fontWeight: typography.fontWeight.semibold,
    lineHeight: typography.lineHeight.none,
    letterSpacing: typography.letterSpacing.wide,
    padding: sizeStyles.padding,
    borderRadius: spacing.borderRadius.lg,
    border: variantStyles.border,
    backgroundColor: variantStyles.backgroundColor,
    color: variantStyles.color,
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled || loading ? 0.6 : 1,
    transition: 'all 0.2s ease-in-out',
    width: fullWidth ? '100%' : 'auto',
    boxShadow: shadows.semantic.button,
    textDecoration: 'none',
    userSelect: 'none',
  };

  // Determinar aria-label automático
  const autoAriaLabel = ariaLabel || (typeof children === 'string' ? children : 'Botón');

  return (
    <button
      type={type}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      aria-label={loading ? `Cargando: ${autoAriaLabel}` : autoAriaLabel}
      aria-busy={loading}
      aria-disabled={disabled}
      className={className}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, variantStyles.hover);
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !loading) {
          Object.assign(e.currentTarget.style, {
            backgroundColor: variantStyles.backgroundColor,
            color: variantStyles.color,
            boxShadow: shadows.semantic.button,
          });
        }
      }}
      {...props}
    >
      {/* Icono izquierdo */}
      {leftIcon && !loading && (
        <span aria-hidden="true">{leftIcon}</span>
      )}

      {/* Spinner de carga */}
      {loading && (
        <span
          aria-hidden="true"
          style={{
            width: '1em',
            height: '1em',
            border: `2px solid currentColor`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.6s linear infinite',
          }}
        />
      )}

      {/* Contenido */}
      {children}

      {/* Icono derecho */}
      {rightIcon && !loading && (
        <span aria-hidden="true">{rightIcon}</span>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </button>
  );
};

export default Button;