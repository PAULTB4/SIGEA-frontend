import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Avatar = ({
  src,
  alt,
  name,
  size = 'medium',
  variant = 'circle',
  fallbackColor = colors.brand.primary,
  className = '',
}) => {
  const sizes = {
    small: '2rem',
    medium: '3rem',
    large: '4rem',
    xlarge: '6rem',
  };

  const sizeValue = sizes[size] || sizes.medium;

  // Generar iniciales del nombre
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const initials = getInitials(name);

  return (
    <div
      className={className}
      style={{
        width: sizeValue,
        height: sizeValue,
        borderRadius: variant === 'circle' ? '50%' : spacing.borderRadius.md,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fallbackColor,
        color: colors.text.inverse,
        fontSize: `calc(${sizeValue} / 2.5)`,
        fontWeight: typography.fontWeight.bold,
        flexShrink: 0,
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt || name || 'Avatar'}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};