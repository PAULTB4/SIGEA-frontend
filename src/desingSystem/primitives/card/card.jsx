/**
 * Card Primitive Component
 * Contenedor flexible con variantes de elevación
 */

import React from 'react';
import { colors, spacing, shadows } from '../../tokens';

const Card = ({
  children,
  variant = 'elevated',
  padding = 'medium',
  hoverable = false,
  onClick,
  className = '',
  style = {},
  ...props
}) => {
  // Variantes de card
  const variants = {
    elevated: {
      backgroundColor: colors.surfaces.card,
      border: 'none',
      boxShadow: shadows.semantic.card,
    },
    outlined: {
      backgroundColor: colors.surfaces.card,
      border: `2px solid ${colors.borders.light}`,
      boxShadow: 'none',
    },
    filled: {
      backgroundColor: colors.neutral[50],
      border: 'none',
      boxShadow: 'none',
    },
    dark: {
      backgroundColor: colors.surfaces.cardDark,
      border: 'none',
      boxShadow: shadows.semantic.card,
    },
  };

  // Tamaños de padding
  const paddings = {
    none: '0',
    small: spacing.spacing[4],
    medium: spacing.spacing[6],
    large: spacing.spacing[8],
  };

  const variantStyles = variants[variant] || variants.elevated;
  const paddingValue = paddings[padding] || paddings.medium;

  // Estilos base
  const baseStyles = {
    borderRadius: spacing.borderRadius.xl,
    padding: paddingValue,
    transition: 'all 0.2s ease-in-out',
    cursor: onClick || hoverable ? 'pointer' : 'default',
    ...variantStyles,
    ...style,
  };

  // Estilos hover si es hoverable
  const hoverStyles = hoverable || onClick ? {
    boxShadow: shadows.semantic.cardHover,
    transform: 'translateY(-2px)',
  } : {};

  return (
    <div
      onClick={onClick}
      className={className}
      style={baseStyles}
      onMouseEnter={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, hoverStyles);
        }
      }}
      onMouseLeave={(e) => {
        if (hoverable || onClick) {
          Object.assign(e.currentTarget.style, {
            boxShadow: variantStyles.boxShadow,
            transform: 'translateY(0)',
          });
        }
      }}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick(e);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

// Subcomponentes para estructura semántica
Card.Header = ({ children, className = '', style = {} }) => (
  <div
    className={className}
    style={{
      marginBottom: spacing.spacing[4],
      ...style,
    }}
  >
    {children}
  </div>
);

Card.Body = ({ children, className = '', style = {} }) => (
  <div
    className={className}
    style={{
      marginBottom: spacing.spacing[4],
      ...style,
    }}
  >
    {children}
  </div>
);

Card.Footer = ({ children, className = '', style = {} }) => (
  <div
    className={className}
    style={{
      marginTop: spacing.spacing[4],
      paddingTop: spacing.spacing[4],
      borderTop: `1px solid ${colors.borders.light}`,
      ...style,
    }}
  >
    {children}
  </div>
);

export default Card;