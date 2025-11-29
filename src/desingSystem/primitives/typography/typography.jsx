import React from 'react';
import { colors, typography, spacing, shadows } from '../../tokens';

export const Typography = ({
  children,
  variant = 'body',
  component,
  align = 'left',
  color,
  className = '',
  style = {},
}) => {
  const presets = typography.presets;
  const preset = presets[variant] || presets.body;

  // Mapeo automático de variante a elemento HTML
  const defaultComponents = {
    h1: 'h1', h2: 'h2', h3: 'h3', h4: 'h4', h5: 'h5', h6: 'h6',
    body: 'p', bodyLarge: 'p', bodySmall: 'p',
    caption: 'span', overline: 'span', code: 'code',
  };

  const Component = component || defaultComponents[variant] || 'p';

  return (
    <Component
      className={className}
      style={{
        ...preset,
        textAlign: align,
        color: color || (variant.startsWith('h') ? colors.text.primary : colors.text.secondary),
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Component>
  );
};