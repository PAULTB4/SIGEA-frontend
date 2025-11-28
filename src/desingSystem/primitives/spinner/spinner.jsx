import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Spinner = ({
  size = 'medium',
  color = colors.brand.primary,
  className = '',
}) => {
  const sizes = {
    small: '1rem',
    medium: '1.5rem',
    large: '2.5rem',
  };

  const sizeValue = sizes[size] || sizes.medium;

  return (
    <div
      role="status"
      aria-label="Cargando"
      className={className}
      style={{
        width: sizeValue,
        height: sizeValue,
        border: `3px solid ${color}33`,
        borderTopColor: color,
        borderRadius: '50%',
        animation: 'spin 0.6s linear infinite',
      }}
    >
      <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden' }}>
        Cargando...
      </span>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
};