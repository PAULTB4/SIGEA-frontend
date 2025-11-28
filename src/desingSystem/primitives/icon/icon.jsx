import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Icon = ({
  children,
  size = 'medium',
  color = colors.text.primary,
  className = '',
  ...props
}) => {
  const sizes = {
    small: '1rem',
    medium: '1.5rem',
    large: '2rem',
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: sizes[size],
        height: sizes[size],
        color,
      }}
      aria-hidden="true"
      {...props}
    >
      {children}
    </span>
  );
};
