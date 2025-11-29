import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Badge = ({
  children,
  variant = 'primary',
  size = 'medium',
  rounded = false,
  className = '',
}) => {
  const variants = {
    primary: { bg: colors.brand.primary, color: colors.text.inverse },
    secondary: { bg: colors.brand.secondary, color: colors.text.inverse },
    success: { bg: colors.semantic.success, color: colors.text.inverse },
    warning: { bg: colors.semantic.warning, color: colors.text.inverse },
    error: { bg: colors.semantic.error, color: colors.text.inverse },
    neutral: { bg: colors.neutral[200], color: colors.text.primary },
  };

  const sizes = {
    small: { padding: `${spacing.spacing[1]} ${spacing.spacing[2]}`, fontSize: typography.fontSize.xs },
    medium: { padding: `${spacing.spacing[2]} ${spacing.spacing[3]}`, fontSize: typography.fontSize.sm },
    large: { padding: `${spacing.spacing[2]} ${spacing.spacing[4]}`, fontSize: typography.fontSize.base },
  };

  const variantStyles = variants[variant] || variants.primary;
  const sizeStyles = sizes[size] || sizes.medium;

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: typography.fontWeight.semibold,
        borderRadius: rounded ? spacing.borderRadius.full : spacing.borderRadius.base,
        backgroundColor: variantStyles.bg,
        color: variantStyles.color,
        ...sizeStyles,
      }}
    >
      {children}
    </span>
  );
};
